<%@ page language="C#" autoeventwireup="true" inherits="RegisterPage, App_Web_registerpage.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Untitled Page</title>

	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script language="javascript" type="text/javascript">
	function callViewInitialize()
	{
		setResize( true );
		callResize();
	}
	</script>

</head>
<body style="overflow: auto;" class="registerpage">
	<form id="form1" runat="server" enterprise="1">
	<asp:Panel runat="server" ID="ViewContainer" bizappid="ViewContainer">
	</asp:Panel>
	</form>
</body>
</html>
