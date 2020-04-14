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

<%@ page language="C#" autoeventwireup="true" inherits="ParameterisedQuery, App_Web_parameterisedquery.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Parameterised Query</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body style="width: 100%; height: 100%">
	<form id="form1" runat="server" style="margin: 0px; padding: 0px;
	width: 100%; height: 100%">
	<div bizappid="processing" id="processing" runat="server" style="display: none; position: absolute;
		background-color: #000000; z-index: 10001; border-width: 0; border-style: none">
	</div>
	<div bizappid="processingImage" id="processingImage" runat="server" style="display: none;
		position: absolute; background-color: #000000; z-index: 10004; border-width: 0;
		border-style: none">
		<img src="Resources/Images/Common/Processing.gif" style="position: absolute; cursor: pointer;
			height: 168px; width: 270px;" onclick="ProcessingStatus('false','true');" alt="Click To unlock" />
	</div>
	<asp:Panel runat="server" ID="group" Height="100%" Width="100%">
		<table runat="server" id="previewtable" height="100%" width="100%" cellpadding="0"
			cellspacing="0" style="vertical-align: top;">
			<tr id="TableRow1" runat="server" height="20px">
				<td id="RunContainer" runat="server" align="right">
					
				</td>
			</tr>
			<tr>
				<td runat="server" style="vertical-align: top; height: 100%;" id="ViewContainer">
				</td>
			</tr>
			<tr style="height: 100%; vertical-align: top;">
				<td>
				</td>
			</tr>
		</table>
	</asp:Panel>
	</form>
</body>
</html>
