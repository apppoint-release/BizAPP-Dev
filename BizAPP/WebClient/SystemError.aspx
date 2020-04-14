<%@ page language="C#" autoeventwireup="true" inherits="SystemError, App_Web_systemerror.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>System Error</title>

    <script type="text/javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
    <script type="text/javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
    <script type="text/javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>

    <link rel="Stylesheet" type="text/css" href="<%= Page.ResolveUrl( "~/Resources/crm/jquery/jquery-ui.css" ) %>" />
    <style type="text/css">
        .portlet {
            margin: 0 1em 1em 0;
        }

        .portlet-header {
            margin: 0.3em;
            padding-bottom: 4px;
            padding-left: 0.2em;
        }

            .portlet-header .ui-icon {
                float: right;
            }

        .portlet-content {
            padding: 0.4em;
        }
    </style>

    <script type="text/javascript">
        $(function () {
            $(".portlet-header .ui-icon").click(function () {
                $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
                $(this).parents(".portlet:first").find(".portlet-content").toggle();
            });
        });
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:Panel runat="server" ID="errorContainer">
            <table style="height: 100%; width: 100%" border="1">
                <tr style="height: 50px" class="steptoolbar">
                    <td align="left" class="stepheader">System has encountered an exception. Please review the message or contact Administrator
					for further details. Click <a href="EnterpriseView.aspx" target="_top">Here </a>
                        to return to the main page.
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Table runat="server" ID="tableStack" Height="100%" Width="100%">
                        </asp:Table>
                    </td>
                </tr>
            </table>
        </asp:Panel>
    </form>
</body>
</html>
