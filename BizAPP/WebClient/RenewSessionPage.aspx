<%@ page language="C#" autoeventwireup="true" inherits="RenewSessionPage, App_Web_renewsessionpage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Session About to expire</title>

	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>

</head>
<body >
	<form id="form1" runat="server">
		<table style="height: 245px; width: 390px;" cellpadding="3" cellspacing="3">
			<tr>
				<td style="height: 52px; background-color: #A7B7BA; width: 100%;">
					<table width="100%">
						<tr>
							<td>
								<asp:Image ID="ViewImage" runat="server" />
							</td>
							<td align="left">
								<asp:Label runat="server" ID="Caption" CssClass="viewcaption"></asp:Label>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr height="15px" width="100%" runat="server" id="ViewSeperationRow1" bgcolor="#ffffff">
				<td>
				</td>
			</tr>
			<tr style="vertical-align: top; height: 15px; width: 100%" runat="server" id="ViewSeperationRow2"
				>
				<td>
				</td>
			</tr>
			<tr style="height: 100px">
				<td>
					<asp:Panel ID="Panel1" runat="server" GroupingText="Renew user session" Height="100px" Width="100%" ForeColor="#990000">
						For Security Reasons, your session is about to time out. 
						
						What would you like to do ? 
					</asp:Panel>
				</td>
			</tr>
			<tr height="20px" valign="bottom">
				<td align="right" valign="bottom">
					<input type="Button" onclick="closeWindow(true);return false;" value="Continue working" />
					<input type="Button" onclick="closeWindow(false);return false;" value="Logout" />
				</td>
			</tr>
		</table>
	</form>
</body>
</html>
