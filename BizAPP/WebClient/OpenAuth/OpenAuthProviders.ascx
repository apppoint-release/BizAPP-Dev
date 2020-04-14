<%@ control language="C#" autoeventwireup="true" inherits="BizAPP.Web.UI.Client.OpenAuth.OpenAuthProviders, App_Web_openauthproviders.ascx.a445549d" %>
<%@ Import Namespace="System.Linq" %>

<fieldset class="open-auth-providers">
	<h4>Use another service to log in.</h4>
	<hr />
	<asp:ListView runat="server" ID="providersList" ViewStateMode="Disabled">
		<ItemTemplate>
			<button type="submit" name="provider" value="<%# HttpUtility.HtmlAttributeEncode(Item<BizAPP.Web.UI.MembershipProvider.OpenAuth.ProviderDetails>().ProviderName) %>"
				title="Log in using your <%# HttpUtility.HtmlAttributeEncode(Item<BizAPP.Web.UI.MembershipProvider.OpenAuth.ProviderDetails>().ProviderDisplayName) %> account.">
				<%# HttpUtility.HtmlEncode(Item<BizAPP.Web.UI.MembershipProvider.OpenAuth.ProviderDetails>().ProviderDisplayName) %>
			</button>
		</ItemTemplate>

		<EmptyDataTemplate>
			<div class="message-info">
				<p>There are no external authentication services configured.</p>
			</div>
		</EmptyDataTemplate>
	</asp:ListView>
</fieldset>
