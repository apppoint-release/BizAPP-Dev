<%@ page language="C#" autoeventwireup="true" inherits="DownloadPromptPage, App_Web_downloadpromptpage.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html>
<head id="Head1" runat="server">
	<title>Download</title>
	<link rel="SHORTCUT ICON" href="favicon.ico" />
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body id="Download" style="background-color: GhostWhite;" runat="server" class="downloadpage">
	<form id="form1" method="post" action="DownloadPromptPage.aspx" runat="server">
	<div style="color: Green;">
		<p>
			<asp:Label ID="Label1" runat="server" Text="If your download does not start automatically, Click the below link."></asp:Label>
		</p>
		<center style="height: 20px; padding: 2px">
			<asp:Label ID="FileName" runat="server"></asp:Label>
			<asp:Label ID="FileSize" runat="server" CssClass="fill"></asp:Label><br />
			<asp:Button ID="DownloadImg" runat="server" ToolTip="Click here to Download" Style="cursor: pointer;
				background-image: url(Resources/Images/Common/download.gif); background-repeat: no-repeat;
				width: 22px;" BorderStyle="None" BorderWidth="0" OnClick="DownloadLink_Click" />
			<asp:Button ID="DownloadLink" runat="server" Text="click to download" Style="cursor: pointer;
				background-repeat: no-repeat; background-color: Transparent; color: Blue;" BorderStyle="None"
				BorderWidth="0" OnClick="DownloadLink_Click" />
		</center>
	</div>
	</form>
</body>
</html>
