<%--*
 * Copyright (C) 2000 - 2006, AppPoint Software Solutions.
 * The program code and other information contained herein are not for public use, 
 * include confidential and proprietary information owned by AppPoint Software Solutions. 
 * Any reproduction, disclosure, reverse engineering, in whole or in part, is prohibited 
 * unless with prior explicit written consent of AppPoint Software Solutions. 
 *
 * This software is protected by local Copyright law, patent law, and international treaties.
 * Unauthorized reproduction or distribution may be subject to civil and criminal penalties and is 
 * strictly prohibited. Portions of this program code, documentation, processes, and information 
 * could be patent pending.
 * 
 *--%>

<%@ page language="C#" autoeventwireup="true" inherits="AdvancedSearchPage, App_Web_advancedsearchpage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Enterprise Search</title>

	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript">
		function CreateTabs()
		{
			$("#GridContainerTabs").tabs();
		}
	</script>
</head>
<body style="" class="searchpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server">
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<table style="height: 100%; width: 100%; border-width: 15px; border-style: solid;"
		class="searchpagetable" cellpadding="0" cellspacing="0">
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
			<td valign="top" colspan="3">
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
		<tr>
			<td valign="top" colspan="3" id="LinksGridContainer" runat="server">
			</td>
		</tr>
	</table>
	</form>
	<iframe id="postbackframe" bizappid="postbackframe" style="width: 1px; height: 1px;
		display: none;" runat="server"></iframe>
</body>
</html>

<script type="text/javascript">
</script>

