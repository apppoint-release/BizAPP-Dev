<%@ page language="C#" autoeventwireup="true" inherits="ThirdParty_NSELogin, App_Web_nselogin.aspx.e6ba9039" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
	<div>
		<table cellpadding="0" cellspacing="0" class="tptable">
			<tr>
				<td style="text-align: right;" class="gridexpandheader" colspan="2">
				</td>
			</tr>
			<tr>
				<td style="padding-left: 3px;">
					<asp:Label ID="Label1" CssClass="formlabel" runat="server">Member Id :</asp:Label>
				</td>
				<td style="padding-right: 3px; padding-top: 3px;">
					<asp:TextBox CssClass="formtextbox" ID="memberid" Style="width: 200px; height: 20px;"
						runat="server"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td>
					&nbsp;
				</td>
			</tr>
			<tr>
				<td style="padding-left: 3px;">
					<asp:Label ID="Label2" CssClass="formlabel" runat="server">User Name :</asp:Label>
				</td>
				<td style="padding-right: 3px;">
					<asp:TextBox CssClass="formtextbox" ID="username" Style="width: 200px; height: 20px;"
						runat="server"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td style="text-align: right; padding-top: 3px; padding-right: 3px; padding-bottom: 3px;"
					colspan="2">
					<asp:Button CssClass="loginbutton" ID="Login" runat="server" OnClick="Login_Click"
						onmouseover="callApplyCSS( this, '', 'loginbuttonhover' );" onmouseout="callApplyCSS( this, '', 'loginbutton' );" />
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>
