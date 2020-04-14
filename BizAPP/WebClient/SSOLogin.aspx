<%@ page language="C#" autoeventwireup="true" enableviewstate="false" enableviewstatemac="false" viewstateencryptionmode="Never" %>

<%@ assembly name="BizAPP.Common.Security.HashGenerator" %>
<%@ import namespace="System" %>
<%@ import namespace="System.Collections" %>
<%@ import namespace="System.Collections.Generic" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>BizAPP - SSO</title>
	<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
	<meta name="viewport" content="width=device-width" />

	<!-- jquery -->
	<script src="Resources/Javascripts/JQuery/jquery.js"></script>

	<!-- Bootstrap core CSS -->
	<link href="Resources/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
	<link href="Resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<script src="Resources/bootstrap/js/bootstrap.min.js"></script>

	<!-- Custom styles for this template -->
	<link href="Scripts/signin.css" rel="stylesheet" />
</head>
<body>
	<form id="form1" runat="server">
		<header>
			<div class="content-wrapper">
				<div class="float-left">
					<p class="site-title"><a id="A1" runat="server" href="~/"></a></p>
				</div>
			</div>
		</header>
		<div id="body">
			<section class="content-wrapper main-content clear-fix">
				<section id="loginForm">
					<fieldset>
						<legend>Log in</legend>
						<asp:label runat="server" id="LoginDone" visible="false" forecolor="Green" text="Login completed, redirecting..." />
						<asp:label runat="server" id="LoginError" visible="false" forecolor="Red" />
					</fieldset>
				</section>
			</section>
		</div>
		<footer>
			<div class="content-wrapper">
				<div class="float-left">
					<p>&copy; <%: DateTime.Now.Year %> - BizAPP -  SSO</p>
				</div>
			</div>
		</footer>
	</form>
</body>
<script language="C#" runat="server">
	/// <summary>
	/// 
	/// </summary>
	/// <param name="sender"></param>
	/// <param name="args"></param>
	void Page_Load( object sender, System.EventArgs args )
	{
		try
		{
			string tenantId = GetRequestValue( "TenantId" );
			if ( string.IsNullOrWhiteSpace( tenantId ) )
			{
				throw new Exception( "TenantId is not specified. User does not appear to be authenticated." );
			}

			string loginId = GetRequestValue( "LoginId"  );
			if ( string.IsNullOrWhiteSpace( loginId ) )
			{
				throw new Exception( "LoginId is not specified. User does not appear to be authenticated." );
			}
			
			string hash = GetRequestValue( "Hash"  );
			if ( string.IsNullOrWhiteSpace( hash ) )
			{
				throw new Exception( "Hash is not specified. User does not appear to be authenticated." );
			}

			// Optional parameters
			string parameters = GetRequestValue( "Parameters" );

			DoLogin( tenantId, loginId, hash, parameters );
			
			LoginDone.Visible = true;

			string enterpriseviewUrl = "EnterpriseView.aspx";
			string qsparameter = GetRequestValue( "QSParameters" );
			if ( !string.IsNullOrEmpty( qsparameter ) )
			{
				enterpriseviewUrl = string.Concat( enterpriseviewUrl, '?', qsparameter );
			}

			string logouturl = GetRequestValue( "logouturl" );
			if ( !string.IsNullOrEmpty( logouturl ) )
			{
				enterpriseviewUrl = string.Concat( enterpriseviewUrl,
					string.IsNullOrEmpty( qsparameter ) ? '?' : '&',
					"html.logout=" + logouturl 
				);
			}

			logger.Debug( "Login successful - redirecting to url - {0}", enterpriseviewUrl );
			Response.Redirect( enterpriseviewUrl );
		}
		catch ( Exception ex )
		{
			throw;
			//LoginError.Visible = true;
			//LoginError.Text = "Unable to login to portal. Contact administrator for support. Actual error is - \n" + ex.Message;
		}
	}

	/// <summary>
	/// Get query/form/server variables
	/// </summary>
	/// <param name="keyName"></param>
	private string GetRequestValue( string keyName )
	{
		string value = Request.QueryString[ keyName ];
		if ( string.IsNullOrEmpty( value ) )
		{
			value = Request.Form[ keyName ];
			if ( string.IsNullOrEmpty( value ) )
			{
				value = Request.ServerVariables[ keyName ];
			}
		}

		return value;
	}

	/// <summary>
	/// Do SSO Authentication
	/// </summary>
	/// <param name="tenantId"></param>
	/// <param name="loginId"></param>
	/// <param name="hash"></param>
	/// <param name="parameters"></param>
	private void DoLogin( string tenantId, string loginId, string hash, string parameters )
	{
		logger.Debug( "DoLogin- Validate - TenantId={3} LoginId={0} Hash={1} Parameters={2}",
			loginId, hash, parameters, tenantId );

		string defaultEnterprise = Request[ "html.enterprise" ];
		if ( string.IsNullOrEmpty( defaultEnterprise ) )
		{
			logger.Debug( "DoLogin-  Get configured defaults-enterprise" );
			defaultEnterprise = BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultEnterprise( );
		}

		BizAPP.Runtime.Core.RuntimeBootstrap rb = BizAPP.Runtime.Core.RuntimeBootstrap.GetTheOnlyBootstrap( BizAPP.UI.Common.Helper.AppSettingsHelper.GetHostingLocator( ), BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultLocator( ) );
		var tenantService = rb.GetTenantService( defaultEnterprise );
		var tenantMgmtService = ( BizAPP.Runtime.Core.Service.Tenancy.ITenantManagementService )tenantService.GetService( typeof( BizAPP.Runtime.Core.Service.Tenancy.ITenantManagementService ) );
		var provider = ( BizAPP.Runtime.Core.Service.Tenancy.ITenantManagementServiceProvider )tenantMgmtService.GetService( typeof( BizAPP.Runtime.Core.Service.Tenancy.ITenantManagementServiceProvider ) );
		var tinfo = provider.Get( System.Convert.ToInt32( tenantId ) );
		
		if ( !BizAPP.Common.Security.HashGenerator.HashManager.ValidateHash( tinfo.PrivateKey, parameters, hash ) )
		{
			throw new Exception( "User credentials specified is invalid. Its possible that the key has expired or the provided values is invalid." );
		}

		BizAPP.Web.UI.Common.Context context = new BizAPP.Web.UI.Common.Context( );
		BizAPP.Runtime.Core.Service.Authentication.NetworkInformation info = new BizAPP.Runtime.Core.Service.Authentication.NetworkInformation( context.WebSession.UserHostAddress )
		{
			Platform = context.WebSession.Platform
		};

		logger.Debug( "DoLogin- Created Context" );
		
		var authProvider = "SSO";
		Hashtable credentials = new Hashtable( StringComparer.OrdinalIgnoreCase );
		credentials[ "realm" ] = authProvider;
		credentials[ "loginid" ] = loginId;
		credentials[ "username" ] = loginId;
		credentials[ "parameters" ] = parameters;
		credentials[ "hash" ] = hash;
		credentials[ "enterprisename" ] = defaultEnterprise;
		if ( !string.IsNullOrEmpty( tenantId ) )
		{
			credentials[ "tid" ] = int.Parse( tenantId );
		}

		logger.Debug( "DoLogin- Created property bag" );

		
		logger.Debug( "DoLogin- DoAuthValidation" );
		context.Login( BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultLocator( ), defaultEnterprise,
			authProvider, credentials, null, null, info );
	}

	static BizAPP.Common.Logger logger = BizAPP.Common.Logger.GetInstance( "BizAPP.Web.SSO" );
</script>
</html>
