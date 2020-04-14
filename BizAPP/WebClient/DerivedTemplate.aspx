<%--*
 * Copyright (C) 2000 - 2009, AppPoint Software Solutions.
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

<%@ page language="C#" autoeventwireup="true" inherits="Controls_Pages_DerivedTemplate, App_Web_derivedtemplate.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Templates</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
	<table style="height: 250px; width: 365px; border-width: 15px; border-style: solid; border-color:White;  display: block;" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td style="height:20px;">
				<asp:Panel runat="server" CssClass="formgroupbox" Height="45px" Width="355px"
					GroupingText="Select type">
					<asp:DropDownList ID="DerivedObjectsList" bizappid="DerivedObjectsList" runat="server"
						Height="20px" Width="340px" CssClass="formcombobox" Style="left: 15px;">
					</asp:DropDownList>
				</asp:Panel>
			</td>
		</tr>
		<tr>
			<td style="height:185px;">
				<asp:Panel runat="server" Id="ContainerPanel" CssClass="formgroupbox" Height="210px" Width="355px"
					GroupingText="Choose a template">
					<asp:ListBox ID="TemplateList" bizappid="TemplateList" runat="server" Style="position: absolute;
						left: 15px;" Height="185px" Width="340px" CssClass="formlistbox"></asp:ListBox>
				</asp:Panel>
			</td>
		</tr>
		<tr>
			<td style="width: 336px; text-align: right;">
				<asp:Button ID="ApplyTemplate" bizappid="ApplyTemplate" Text="Apply" ToolTip="Click to apply template" CssClass="formbutton"
					runat="server" />
			</td>
		</tr>
	</table>
	</form>
</body>
</html>
