<%@ page language="C#" autoeventwireup="true" inherits="Authenticate, App_Web_authenticate.aspx.cdcab7d2" %>

<html>
<head runat="server">
	<title>AppPoint</title>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	<link rel="SHORTCUT ICON" href="favicon.ico" />

	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>

	<link rel="Stylesheet" type="text/css" href="Resources/themes/login/loginstyle.css" />
</head>
<body>
	<form id="nonajaxform" bizappid="nonajaxform" runat="server" name="nonajaxform"
	method="post" enterprise="1" onsubmit="return false;">
	<input type="hidden" id="MacIdHolder" visible="true" />
	<asp:Panel ID="LoginContainer" runat="server">
	</asp:Panel>
	</form>
</body>
</html>
