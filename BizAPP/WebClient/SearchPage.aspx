<%@ page language="C#" autoeventwireup="true" inherits="Controls_SearchPage, App_Web_searchpage.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Enterprise Search</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<link rel="Stylesheet" href="<%= Page.ResolveUrl( "~/Resources/CRM/JQuery/jquery-ui.css" ) %>" />
	<script type="text/javascript">
		function CreateTabs() { $("#GridContainerTabs").tabs(); }
	</script>
</head>
<body style="" class="searchpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server">
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<table style="height: 100%; width: 100%; border-width: 15px; border-style: solid;
		display: block;" class="searchpagetable" cellpadding="0" cellspacing="0">
		<tr height="50px" runat="server" id="SearchCaptionRow" class="searchcaptionrow">
			<td>
				<asp:Label ID="Label1" CssClass="searchpageheader" runat="server"></asp:Label>
			</td>
			<td>
				<asp:Label runat="server" ID="SearchCaption" CssClass="searchcaption"></asp:Label>
			</td>
			<td style="width: 100%;">
				<asp:Label runat="server" ID="Label2" CssClass="searchtypecaption"></asp:Label>
			</td>
		</tr>
		<tr style="height: 10px;">
			<td colspan="3">
			</td>
		</tr>
		<tr>
			<td colspan="3" valign="top">
				<div id="GridContainerTabs">
					<ul id="GridHeader" runat="server">
						<li><a href="#SavedGridContainer">Saved</a></li>
						<li><a href="#UnsavedGridContainer">Unsaved</a></li>
					</ul>
					<div id="SavedGridContainer" runat="server">
					</div>
					<div id="UnsavedGridContainer" runat="server">
					</div>
				</div>
			</td>
		</tr>
	</table>
	</form>
	<iframe id="postbackframe" bizappid="postbackframe" style="width: 1px; height: 1px;
		display: none;" runat="server"></iframe>
</body>
</html>
