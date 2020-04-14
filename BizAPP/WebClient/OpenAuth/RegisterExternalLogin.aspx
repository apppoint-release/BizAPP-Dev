<%@ page language="C#" title="Register an external login" masterpagefile="~/OpenAuth/Site.Master" autoeventwireup="true" inherits="BizAPP.Web.UI.Client.OpenAuth.RegisterExternalLogin, App_Web_registerexternallogin.aspx.a445549d" %>

<asp:content contentplaceholderid="MainContent" runat="server">
    <script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
    <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script>
	    function redirectToCaller(authResult) {
	        if (window.opener) {
	            window.opener.postMessage(authResult, '*');
	            window.close();
	        }
	        else {
	            window.parent.postMessage(authResult, '*');
	        }
	    }

	    function FetchAuthTokenAndRedirect(oAuthHostUrl, authResult) {
	        BizAPP.UI.OAuth.PreFetch(oAuthHostUrl, function () {
	            window.addEventListener('message', function (e) {
	                if (e.data.intent == 'bizappoauth') {
	                    if (e.data.success) {
	                        redirectToCaller(e.data.token);
		                }
	                    else
	                        redirectToCaller('');
	                }
	            });
	            var args = { UserName: 'OAUTH:' + authResult, Password: '' };
	            BizAPP.UI.OAuth.Login(oAuthHostUrl, 'login', args);
	        });
	    }
    </script>
    <hgroup class="title">
		<h1>Register with your <%: ProviderDisplayName %> account</h1>
		<h2><%: ProviderUserName %>.</h2>
	</hgroup>

	<asp:Label runat="server" ID="providerMessage" CssClass="field-validation-error" />

	<asp:PlaceHolder runat="server" ID="userNameForm">
		<fieldset>
			<legend>Association Form</legend>
			<p>
				You've authenticated with <strong><%: ProviderDisplayName %></strong> as
				<strong><%: ProviderUserName %></strong>. Please enter a user name below for the current site
				and click the Log in button.
			</p>
			<ol>
				<li class="email">
					<asp:Label runat="server" AssociatedControlID="userName">User name</asp:Label>
					<asp:TextBox runat="server" ID="userName" />
					<asp:RequiredFieldValidator runat="server" ControlToValidate="userName"
						Display="Dynamic" ErrorMessage="User name is required" ValidationGroup="NewUser" />

					<asp:Label runat="server" ID="userNameMessage" CssClass="field-validation-error" />

				</li>
			</ol>
<%--		
			<asp:Button runat="server" Text="Log in" ValidationGroup="NewUser" OnClick="logIn_Click" />
--%>
			<asp:Button ID="cancelButton" runat="server" Text="Cancel" CausesValidation="false" OnClick="cancel_Click" />
		</fieldset>
	</asp:PlaceHolder>
</asp:content>
