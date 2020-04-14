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

<%@ page language="C#" autoeventwireup="true" inherits="Template, App_Web_template.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Available Templates</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body onload="setWindowSize('250px', '380px')" >
	<form id="form1" runat="server">
		<asp:Panel ID="ContainerPanel" runat="server" CssClass="templatebackground" Height="208px"
			Width="365px" GroupingText="Choose a template" Style="left: 10; top: 10; border-width: 1px;
			border-style:inset;" BackColor="WhiteSmoke">
			<asp:ListBox ID="TemplateList" runat="server" Style="position: absolute; left: 15px;
				top: 20px;" Height="185px" Width="340px"></asp:ListBox>
		</asp:Panel>
	</form>
</body>
</html>
