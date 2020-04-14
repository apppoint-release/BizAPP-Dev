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

<%@ page language="C#" autoeventwireup="true" inherits="PreView, App_Web_preview.aspx.cdcab7d2" %>


<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Untitled Page</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
		<div>
			<asp:Table runat="server" ID="previewtable" Height="100%" Width="100%" BorderWidth="1"
				BorderStyle="groove">
				<asp:TableRow runat="server">
					<asp:TableCell runat="server" VerticalAlign="top" id="ViewContainer" >
					</asp:TableCell>
				</asp:TableRow>
				<asp:TableRow ID="TableRow1" runat="server" Height="20px" VerticalAlign="Top">
					<asp:TableCell ID="TableCell1" runat="server">
						<asp:Button runat="server" ID="Run" Text="Run" />
					</asp:TableCell>
				</asp:TableRow>
			</asp:Table>
		</div>
	</form>
</body>
</html>
