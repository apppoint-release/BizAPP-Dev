<%@ page language="C#" autoeventwireup="true" enableviewstate="false" inherits="LoginPage, App_Web_login.aspx.cdcab7d2" %>
<asp:literal runat="server" id="doctype"></asp:literal>
<html>
<head runat="server">
	<title>AppPoint</title>
	<link rel="SHORTCUT ICON" href="favicon.ico" />
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />

	<!-- IE10+ tiles -->
	<meta name="msapplication-TileColor" content="#ff0000" />
	<meta name="msapplication-square150x150logo" content="<%= Page.ResolveUrl( "~/Resources/images/tiles/square.png" ) %>" />
	<meta name="msapplication-wide310x150logo" content="<%= Page.ResolveUrl( "~/Resources/images/tiles/wide.png" ) %>" />
	<meta name="msapplication-square70x70logo" content="<%= Page.ResolveUrl( "~/Resources/images/tiles/tiny.png" ) %>" />
	<meta name="msapplication-square310x310logo" content="<%= Page.ResolveUrl( "~/Resources/images/tiles/large.png" ) %>" />
	<meta name="msapplication-notification" content="frequency=30;cycle=1;polling-uri=<%= Page.ResolveUrl( "~/customobjects/live-tile/0" ) %>;polling-uri2=<%= Page.ResolveUrl( "~/customobjects/live-tile/2" ) %>;polling-uri3=<%= Page.ResolveUrl( "~/customobjects/live-tile/3" ) %>;" />

	<!-- IE9 -->
	<meta name="msapplication-TileImage" content="<%= Page.ResolveUrl( "~/Resources/images/tiles/regular.png" ) %>" />
	<meta name="msapplication-task" content="name=Task 1; action-uri=<%= Page.ResolveUrl( "~/task1.xml" ) %>; icon-uri=/favicon.ico" />
	<meta name="msapplication-task" content="name=Task 2; action-uri=<%= Page.ResolveUrl( "~/task2.xml" ) %>; icon-uri=/favicon.ico" />
	<meta name="msapplication-task" content="name=Task 3; action-uri=<%= Page.ResolveUrl( "~/task3.xml" ) %>; icon-uri=/favicon.ico" />
	<%--
	<meta name="msapplication-task" content="name=Open Defects; action-uri=<%= Page.ResolveUrl( "~/enterpriseview.aspx?..." ) %>; icon-uri=<%= Page.ResolveUrl( "~/favicon.ico" ) %>" />
	<meta name="msapplication-task" content="name=Tasks; action-uri=<%= Page.ResolveUrl( "~/enterpriseview.aspx?..." ) %>; icon-uri=<%= Page.ResolveUrl( "~/favicon.ico" ) %>" />
	--%>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<link rel="Stylesheet" type="text/css" href="<%= Page.ResolveUrl( "~/Resources/themes/login/loginstyle.css" ) %>" />
	<style type="text/css">
		html, body, form {
			height: 100%;
			overflow: hidden;
		}

		.wrapper {
			min-height: 100%;
			margin: 0 auto -4em;
		}

		.footer, .push {
			height: 4em;
		}

		#LoginContainer span, nobr {
			color: White;
		}

		#LoginContainer input {
			border-color: White;
			margin: 1px;
		}

		#LoginContainer {
			border: solid 2px white;
			border-radius: 5px;
			box-shadow: 0 0 3em 0 White;
			margin: 35px;
			padding: 18px;
			width: 265px;
		}
	</style>
</head>
<body>
	<iframe id="postbackframe" bizappid="postbackframe" style="width: 1px; height: 1px; display: none;"
		runat="server"></iframe>
	<input type="hidden" id="MacIdHolder" visible="true" />
	<form id="nonajaxform" bizappid="nonajaxform" runat="server" name="nonajaxform" method="post"
		enterprise="1" onsubmit="return false;" class="loginpage">
		<div class="wrapper">
			<center>
			<table class="logincontainer" cellspacing="0" cellpadding="1" border="0">
				<tbody>
					<tr>
						<td align="center" valign="top">
							<asp:Panel ID="LoginContainer" runat="server">
							</asp:Panel>
						</td>
					</tr>
					<tr style="height: 100%;">
						<td align="center" valign="middle">
							<div style="height: 80px; background: url(resources/images/common/AppPointLogoSmall.png) no-repeat;
								width: 344px;">
							</div>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</center>
			<div class="push">
			</div>
		</div>
		<div class="footer">
			<p class="white" align="center">
				© 2001-2010 AppPoint Software&nbsp; <a class="toplink" href="">Privacy Policy</a>
				| <a class="toplink" href="">Contact Us</a> |<a class="toplink" href="">Legal</a>
			</p>
		</div>
	</form>
</body>
</html>
