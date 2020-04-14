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


<%@ page language="C#" autoeventwireup="true" inherits="Controls_HelpPage, App_Web_helppage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Untitled Page</title>
</head>
<body class="helppage">
	<form id="BizAPP_controls_helpform" runat="server" style="border-width:0px"> 
		<div>
			<asp:Table ID="Table1" runat="server" Height="30px" Width="200px" >
			
				<asp:TableRow>
					<asp:TableCell BackColor="#EACFC9" ForeColor="White" Font-Size="Small"><asp:Label runat="server"  Text="Action:" /></asp:TableCell>
					<asp:TableCell BackColor="#94EBEF" ID="behaviourCell" ForeColor="White" Font-Size="Small"></asp:TableCell>
				</asp:TableRow>
<%--				<asp:TableRow>
					<asp:TableCell BackColor="#EACFC9" ForeColor="White" Font-Size="Small"><asp:Label runat="server" Text="Desc:"></asp:Label></asp:TableCell>
					<asp:TableCell BackColor="#94EBEF" ID="DescriptionCell" ForeColor="White" Font-Size="Small"></asp:TableCell>
				</asp:TableRow>--%>
				</asp:Table>
		</div>
	</form>
</body>
</html>
