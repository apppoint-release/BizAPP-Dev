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

<%@ page language="C#" autoeventwireup="true" inherits="DelegatePage, App_Web_delegatepage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Enterprise Search</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body style="" class="searchpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server">
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<table style="height: 100%; width: 100%; border-width: 15px; border-style: solid;
		border-color: White;" cellpadding="0" cellspacing="0">
		<tr height="50px" width="100%" runat="server" id="SearchCaptionRow" class="searchcaptionrow">
			<td>
				<table class="searchcaptionrow">
					<tr>
						<td>
							<asp:Label ID="Label1" CssClass="searchpageheader" runat="server"></asp:Label>
						</td>
						<td>
							<table>
								<tr>
									<asp:Label runat="server" ID="SearchTypeCaption" CssClass="searchtypecaption"></asp:Label>
								</tr>
								<tr>
									<td>
										<asp:Label runat="server" ID="SearchCaption" CssClass="searchcaption"></asp:Label>
									</td>
								</tr>
							</table>
						</td>
						<td width="100%" align="right">
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr style="height: 10px;">
			<td>
			</td>
		</tr>
		<tr>
			<td valign="top">
				<asp:Table CellPadding="0" CellSpacing="0" runat="server">
					<asp:TableRow>
						<asp:TableCell ID="GridContainer" runat="server" VerticalAlign="Top"></asp:TableCell>
					</asp:TableRow>
				</asp:Table>
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

