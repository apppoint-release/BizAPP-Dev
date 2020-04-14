<%@ page language="C#" autoeventwireup="true" enableeventvalidation="false" enableviewstate="false" enableviewstatemac="false" viewstateencryptionmode="Never" %>

<%@ assembly name="BizAPP.Common" %>
<%@ assembly name="BizAPP.Runtime.Core" %>

<%@ import namespace="System" %>
<%@ import namespace="System.Collections" %>
<%@ import namespace="System.Collections.Generic" %>
<%@ import namespace="System.Linq" %>
<%@ import namespace="System.IO" %>
<%@ import namespace="System.Web" %>
<%@ import namespace="System.Web.UI" %>
<%@ import namespace="System.Web.UI.WebControls" %>
<%@ import namespace="BizAPP.Common" %>
<%@ import namespace="BizAPP.Common.Exceptions" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>BizAPP - Execute</title>
	<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
	<meta name="viewport" content="width=device-width" />
	<link href="Resources/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
	<link href="Resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
	<script src="Resources/bootstrap/js/bootstrap.min.js"></script>
	<style>
		.collapse {
			display: none;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1 id="pageTitle" runat="server">Execute</h1>
		</div>

		<div class="alert alert-info">
			<ul class="list-inline" style="font-size: large;">
				<li><i class="glyphicon glyphicon-info-sign"></i>&nbsp;<span>Thank you for the inputs, follow up actions will happen shortly. For security reasons, please close the browser window.</span></li>
			</ul>
		</div>

		<div style="display: none">
			<button class="btn btn-info" data-toggle="collapse" data-target="#moredetails">More Details</button>
			<div id="moredetails" class="collapse">
				<h3>Inputs</h3>
				<div class="panel panel-default">
					<div class="panel-body">
						<table class="table table-striped">
							<thead>
								<tr>
									<td>Item</td>
									<td>Value</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Enterprise</td>
									<td>
										<div runat="server" id="txtenterprise" clientidmode="Static"></div>
									</td>
								</tr>
								<tr>
									<td>Tenant Id</td>
									<td>
										<div runat="server" id="txttenantid" clientidmode="Static"></div>
									</td>
								</tr>
								<tr>
									<td>Context Identifier</td>
									<td>
										<div runat="server" id="txtcontextidentifier" clientidmode="Static"></div>
									</td>
								</tr>
								<tr>
									<td>RAF Instance Id</td>
									<td>
										<div runat="server" id="txtraf" clientidmode="Static"></div>
									</td>
								</tr>
								<tr>
									<td>Resume Bookmark</td>
									<td>
										<div runat="server" id="txtrafbm" clientidmode="Static"></div>
									</td>
								</tr>
								<tr>
									<td>Resume Input</td>
									<td>
										<div runat="server" id="txtrafresponse" clientidmode="Static"></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<h3>Status</h3>
				<div class="panel panel-default">
					<div class="panel-body">
						<h2 runat="server" id="processing" clientidmode="Static">Processing...</h2>

						<div class="alert alert-success" runat="server" id="successbox" visible="false" clientidmode="Static">
						</div>

						<div class="alert alert-info" runat="server" id="infobox" visible="false" clientidmode="Static">
						</div>

						<div class="alert alert-warning" runat="server" id="warningbox" visible="false" clientidmode="Static">
						</div>

						<div class="alert alert-danger" runat="server" id="errorbox" visible="false" clientidmode="Static">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
			if ( IsCrawler( Request ) ) 
			{
				m_logr.Debug( $"ExecuteRAF - Appears to be a crawler - IGNORING the request" );
				return;
			}

			var context = new BizAPP.Web.UI.Common.Context( );
			if ( context.UISession == null )
			{
				BizAPP.Web.UI.Common.BasePage.InitializeUISession( );
			}

			var enterprise = Request[ "html.enterprise" ];
			var tid = Request[ "html.tid" ];
			
			var htmlTitle = Request[ "html.title" ];
			if ( !string.IsNullOrEmpty( htmlTitle ) )
			{
				pageTitle.InnerText = htmlTitle;
				this.Title = HttpUtility.HtmlEncode( htmlTitle );
			}

			var session = context.RuntimeSession;
			if ( session != null && !session.Disposed )
			{
				var ct = session.CurrentTicket;
				enterprise = ct.Enterprise;
				tid = ct.TenantId.ToString();
			}

			if ( enterprise.IsNullOrEmpty( ) )
			{
				throw new BizAPPException( "Unable to find a valid value for - html.enterprise" );
			}
			if ( tid.IsNullOrEmpty( ) )
			{
				throw new BizAPPException( "Unable to find a valid value for - html.tid" );
			}

			var contextidentifier = Request[ "html.contextidentifier" ];
			if ( contextidentifier.IsNullOrEmpty( ) )
			{
				throw new BizAPPException( "Unable to find a valid value for - html.contextidentifier" );
			}

			var rafid = Request[ "html.rafid" ];
			if ( rafid.IsNullOrEmpty( ) )
			{
				throw new BizAPPException( "Unable to find a valid value for - html.rafid" );
			}

			var rafbm = Request[ "html.rafbm" ];
			if ( rafbm.IsNullOrEmpty( ) )
			{
				throw new BizAPPException( "Unable to find a valid value for - html.rafbm" );
			}

			var rafresponse = Request[ "html.rafres" ];

			BizAPP.Runtime.Core.RuntimeBootstrap rb = BizAPP.Runtime.Core.RuntimeBootstrap.GetTheOnlyBootstrap( BizAPP.UI.Common.Helper.AppSettingsHelper.GetHostingLocator( ), BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultLocator( ) );
			var ss = rb.GetSessionService( enterprise, int.Parse( tid ) );
			if ( ss == null )
			{
				throw new BizAPPException( "Unable to find session service, its either not present or is not configured in the enterprise - {enterprise}" );
			}

			txtenterprise.InnerHtml = enterprise;
			txttenantid.InnerHtml = tid;
			txtcontextidentifier.InnerHtml = contextidentifier;
			txtraf.InnerHtml = rafid;
			txtrafbm.InnerHtml = rafbm;
			txtrafresponse.InnerHtml = rafresponse;

			var raf = ss.GetService<BizAPP.Runtime.Core.Service.RAF.IRAFService>( );
			if ( raf == null )
			{
				throw new BizAPPException( "Unable to find robotic automation service, its either not present or is not configured in the enterprise - {enterprise}" );
			}

			raf.ResumeWorkflowInstance( rafid, rafbm, rafresponse );

			processing.Visible = false;
			successbox.Visible = true;
			successbox.InnerHtml = "Response has been processed successfully.";
		}
		catch( Exception ex )
		{
			processing.Visible = false;
			errorbox.Visible = true;
			errorbox.InnerHtml = "<strong>Failed to perform operation due to the following error</strong> - <br />" + ex.Message + "<br />" + ex.StackTrace;
		}
	}

	/// <summary>
	/// Get query/form/server variables
	/// </summary>
	/// <param name="keyName">Name of the key.</param>
	/// <returns>System.String.</returns>
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

	private static bool IsCrawler( HttpRequest request )
	{
		// Check for bots/crawlers and ignore calls
		var isCrawler = request.Browser.Crawler;
		if ( !isCrawler )
		{
			var userAgent = request.UserAgent;
			if ( !string.IsNullOrEmpty( userAgent )
				&&
				( userAgent.IndexOf( "bitlybot", System.StringComparison.OrdinalIgnoreCase ) > -1
					|| userAgent.IndexOf( "Googlebot", System.StringComparison.OrdinalIgnoreCase ) > -1
					|| userAgent.IndexOf( "Bingbot", System.StringComparison.OrdinalIgnoreCase ) > -1
				)
			)
			{
				m_logr.Debug( $"ExecuteRAF - Appears to be a BOT - ignoring - User-Agent - {userAgent}" );
				isCrawler = true;
			}
		}
		if ( !isCrawler )
		{
			var referrer = request.UrlReferrer;
			if ( referrer != null )
			{
				var domain = referrer.Host;
				if ( domain != null )
				{
					isCrawler = domain.IndexOf( "google.com", System.StringComparison.OrdinalIgnoreCase ) > -1;
				}
			}
		}
		m_logr.Debug( $"ExecuteRAF - Request - IsCrawler={isCrawler} {DumpRequestInfo( request )}" );
		return isCrawler;
	}

	private static string DumpRequestInfo( HttpRequest request )
	{
		var writer = new StringWriter();

		WriteStartLine(request, writer);
		WriteHeaders(request, writer);
		WriteBody(request, writer);

		return writer.ToString();
	}

	private static void WriteStartLine(HttpRequest request, StringWriter writer)
	{
		const string SPACE = " ";

		writer.Write(request.HttpMethod);
		writer.Write(SPACE + request.Url);
		writer.WriteLine(SPACE + request.ServerVariables["SERVER_PROTOCOL"]);
	}

	private static void WriteHeaders(HttpRequest request, StringWriter writer)
	{
		foreach (string key in request.Headers.AllKeys)
		{
			writer.WriteLine(string.Format("{0}: {1}", key, request.Headers[key]));
		}

		writer.WriteLine();
	}

	private static void WriteBody(HttpRequest request, StringWriter writer)
	{
		var reader = new StreamReader(request.InputStream);

		try
		{
			string body = reader.ReadToEnd();
			writer.WriteLine(body);
		}
		finally
		{
			reader.BaseStream.Position = 0;
		}
	}

	static BizAPP.Common.Logger m_logr = BizAPP.Common.Logger.GetInstance( "BizAPP.RAF" );
</script>
</html>
