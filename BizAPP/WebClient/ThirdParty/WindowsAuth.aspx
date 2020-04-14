<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">
    protected void Page_Load( object sender, EventArgs e )
    {
        try
        {
            BizAPP.Web.UI.Common.Context context = new BizAPP.Web.UI.Common.Context( );
            if ( context.UISession == null )
                BizAPP.Web.UI.Common.BasePage.InitializeUISession( );
            
            string registry = BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultLocator( ),
                enterprise = Request[ BizAPP.Web.UI.Common.WellKnownUIConstants.Html.Enterprise ],
                application = Request[ BizAPP.Web.UI.Common.WellKnownUIConstants.HTML.Application ];

            if ( string.IsNullOrWhiteSpace( enterprise ) )
                enterprise = BizAPP.UI.Common.Helper.AppSettingsHelper.GetDefaultEnterprise( );

            var session = context.RuntimeSession;
            if ( session == null || session.Disposed )
            {
                BizAPP.Runtime.Core.Service.Authentication.NetworkInformation info = new BizAPP.Runtime.Core.Service.Authentication.NetworkInformation( context.WebSession.UserHostAddress )
                {
                    Platform = context.WebSession.Platform
                };

                context.LogIn( context, this.User, null, null, info, enterprise );
            }
            
            if(!string.IsNullOrWhiteSpace( application ) )
                Response.Redirect( string.Concat( "~/enterpriseview.aspx?", BizAPP.Web.UI.Common.WellKnownUIConstants.HTML.Application, "=", application ) );
            else
                Response.Redirect( "~/enterpriseview.aspx" );
        }
        catch ( Exception ex )
        {
            BizAPP.Web.UI.Common.Helper.GlobalAsaxHelper.Application_Error( HttpContext.Current.ApplicationInstance, ex );
        }
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Authenticating...</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
