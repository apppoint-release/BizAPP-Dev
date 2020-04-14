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

<%@ page language="C#" autoeventwireup="true" inherits="OTP, App_Web_otp.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<script language="javascript" type="text/javascript">
	function callViewInitialize()
	{
		setResize( true, 'enterpise' );
	}
</script>

<body onload="initializeStartUp();" onkeypress="ProcessKey( event );">
	<form id="form1" runat="server" class="BizAPPform" enableviewstate="false">
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<div BizAPPid="replaceholder">
	</div>
	<div enterprise="enterprise" BizAPPid="enterprise" style="border-color: Green;
		border-width: 0px; border-style: solid; height: 100%; width: 100%">
		<table BizAPPid="popup" id="popup" runat="server" style="display: none; position: absolute;
			left: 100px; top: 0px; z-index: 101; border-width: 3; border-style: groove">
			<tr>
				<td>
					<iframe id="popupframe" runat="server" height="100%" width="100%"></iframe>
				</td>
			</tr>
			<tr>
				<td align="right">
					<input type="Button" value="close" onclick="closeWindow( '' );" />
				</td>
			</tr>
		</table>
		<div style="position: absolute; z-index: 101; top: 0px; left: 0px">
			<div id="ContextMenu" BizAPPid="ContextMenu" style="display: none; position: absolute;">
			</div>
		</div>
		<div BizAPPid="__Calendar_" id="__Calendar_" runat="server" style="display: none;
			position: absolute; left: 0px; top: 0px; background-color: white; z-index: 101;
			border-width: 0; border-style: none; overflow: hidden;">
			<iframe id="CalendarFrame" runat="server" height="240px" width="210px" frameborder="0"
				scrolling="no"></iframe>
		</div>
		<asp:Panel runat="server" ID="Panel2" bizappid="Panel2"  style="height:0;width:0">
		</asp:Panel>

		<div id="enterpriseshell" bizappid="enterpriseshell" runat="server" style="height: 100%;
			width: 100%;">
		</div>
	</div>
	</form>
</body>
</html>
