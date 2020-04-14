<%@ page language="C#" autoeventwireup="true" inherits="ExecuteProcess, App_Web_executeprocess.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Untitled Page</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<div>
		<asp:Panel runat="server" ID="Panel2" bizappid="Panel2" Style="height: 0; width: 0">
		</asp:Panel>
		<div id="enterpriseshell" bizappid="enterpriseshell" runat="server" style="height: 100%;
			width: 100%;">
		</div>
	</div>
	</form>
</body>
</html>
