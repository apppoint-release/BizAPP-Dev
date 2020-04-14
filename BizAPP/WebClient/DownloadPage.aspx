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

<%@ page language="C#" autoeventwireup="true" inherits="DownloadPage, App_Web_downloadpage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Download</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body id="Download" style="background-color: GhostWhite;" runat="server" class="downloadpage">
	<form id="form1" method="get" action="DownloadPage.aspx" runat="server">
	<div style="width: 300px; height: 100px; border-color: Blue;">
		<table cellpadding="0" cellspacing="0" width="100%" height="100%">
			<tr>
				<td style="color: Green; font-family: verdana; font-size: xx-small">
					<asp:Label ID="Label1" runat="server" Text="If your download does not start automatically, Click the below link."></asp:Label>
				</td>
			</tr>
			<tr>
				<td style="font-family: verdana; font-size: xx-small">
					<asp:Label ID="FileName" runat="server"></asp:Label>
				</td>
			</tr>
			<tr>
				<td>
					<table cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td style="height: 23px; width: 10px;">
								&nbsp;
							</td>
							<td style="height: 18px; width: 22px;">
								<asp:Image ID="DownloadImg" ImageUrl="Resources/Images/Common/download.gif"
									runat="server" AlternateText="Click here to Download" Style="cursor: pointer" />
							</td>
							<td style="height: 18px; width: 100px; color: Blue; font-family: verdana; text-decoration: underline;
								font-size: smaller; cursor: pointer; text-align: center">
								<asp:Label ID="DownloadLink" Text="click to download" Style="cursor: Pointer;" runat="server"></asp:Label>
							</td>
							<td style="color: Green; font-family: verdana; font-size: smaller; text-align: left">
								<asp:Label ID="FileSize" runat="server"></asp:Label>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>
