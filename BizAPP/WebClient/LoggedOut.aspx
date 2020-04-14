<%@ page language="C#" autoeventwireup="true" inherits="LoggedOut, App_Web_loggedout.aspx.cdcab7d2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Logged Out</title>
	<link rel="SHORTCUT ICON" href="favicon.ico" />
</head>
<body>
	<form id="form1" runat="server">
	<div>
		<div style="height:20px; width:100%; background-color:Silver">
			
		</div>
		<table style="width:100%" > 
			<tr align="center">
				<td>
					<h3>
						You Are Now Logged Out.
					</h3>
				</td>
			</tr>
			<tr align="center">
				<td>
					You are now logged out of your session.
					<asp:HyperLink ID="LogoutURL" runat="server"></asp:HyperLink>
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>
