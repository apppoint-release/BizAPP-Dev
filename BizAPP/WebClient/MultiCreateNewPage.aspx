<%@ page language="C#" autoeventwireup="true" inherits="MultiCreateNewPage, App_Web_multicreatenewpage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Select objects to create</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server" style="">
		<asp:Panel ID="Panel1" runat="server" CssClass="templatebackground" GroupingText="Choose Options"
			Style="left: 10; top: 10; border-width: 1px; border-style: inset; height: 220px;
			width: 190px; overflow: auto;" BackColor="WhiteSmoke">
			<table runat="server" id="ObjectTable">
			</table>
		</asp:Panel>
		<table style="width: 100%;" cellpadding="0" cellspacing="0 ">
			<tr>
				<td align="right">
					<asp:Button runat="server" ID="AddButton" Text="Add" />
				</td>
			</tr>
		</table>
	</form>
</body>
</html>
