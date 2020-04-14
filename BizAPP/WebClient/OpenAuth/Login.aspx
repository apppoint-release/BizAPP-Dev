<%@ page title="Log in" language="C#" masterpagefile="~/OpenAuth/Site.Master" autoeventwireup="true" inherits="BizAPP.Web.UI.Client.OpenAuth.Login, App_Web_login.aspx.a445549d" %>

<%@ Register Src="~/OpenAuth/OpenAuthProviders.ascx" TagPrefix="uc" TagName="OpenAuthProviders" %>

<asp:Content runat="server" ID="Content1" ContentPlaceHolderID="MainContent">
	<div class="row">
		<div class="col-md-8">
			<section id="loginForm">
				<style>
					#LOGIN td {
						padding: 0;
					}
				</style>
				<asp:Panel ID="LoginContainer" runat="server">
				</asp:Panel>
			</section>
		</div>

		<div class="col-md-4">
			<section id="socialLoginForm">
				<uc:OpenAuthProviders runat="server" ID="OpenAuthLogin" />
			</section>
		</div>
	</div>
</asp:Content>


