<%@ page language="C#" autoeventwireup="true" inherits="Container, App_Web_container.aspx.cdcab7d2" %>
<%@ register tagprefix="dv" namespace="BizAPP.Web.UI" assembly="BizAPP.Web.UI.DV" %>

<asp:literal runat="server" id="doctype"></asp:literal>
<html>
<head runat="server">
	<title>BizAPP Container</title>
	<script type="text/javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script>
		function bza_contLoad() {
			if (isChrome()) {
				$('.igdv_IGTimeSlotLabel').height('55px');
				var appts = $('.igdv_IGAppointment');
				$.each(appts, function () {
					var t = parseInt($(this).css('top')),
						c = parseInt(t / 56);
					$(this).css('top', t - c + 'px');

					t = parseInt($(this).css('height'));
					c = parseInt(t / 56);
					$(this).css('height', t - c + 'px');
					$(this).find('[style*="height"]').css('height', '100%');
				});
			}
		}
	</script>
</head>
<body onload="bza_contLoad();">
	<form id="form1" runat="server">
		<asp:panel runat="server" id="mapuser" style="padding-top: 5px; text-align: center;" visible="false">
			<link rel="stylesheet" href="<%= Page.ResolveUrl( "~/Resources/crm/crm.css" )%>" />
			<link rel="stylesheet" href="<%= Page.ResolveUrl( "~/Resources/TextEditor/default.min.css" )%>" />
			<span id="spnRegSocial" runat="server">
				<asp:Button ID="regMicrosoft" runat="server" ToolTip="Map using Windows" class="socialwindows" Text="&#xf17a;" CommandArgument="microsoft"></asp:Button>
				<asp:Button ID="regFacebook" runat="server" ToolTip="Map using Facebook" class="socialfacebook" Text="&#xf09a;" CommandArgument="facebook"></asp:Button>
				<asp:Button ID="regGoogle" runat="server" ToolTip="Map using Google" class="socialgoogle" Text="&#xf1a0;" CommandArgument="google"></asp:Button>
				<asp:Button ID="regLinkedIn" runat="server" ToolTip="Map using LinkedIn" class="sociallinkedin" Text="&#xf0e1;" CommandArgument="linkedIn"></asp:Button>
				<asp:Button ID="regTwitter" runat="server" ToolTip="Map using Twitter" class="socialtwitter" Text="&#xf099;" CommandArgument="twitter"></asp:Button>
				<asp:Button ID="regYahoo" runat="server" ToolTip="Map using Yahoo" class="socialyahoo" Text="&#xf19e;" CommandArgument="yahoo"></asp:Button>
			</span>
		</asp:panel>
	</form>
</body>
</html>
