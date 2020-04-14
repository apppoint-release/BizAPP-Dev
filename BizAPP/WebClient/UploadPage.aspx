<%@ page language="C#" autoeventwireup="true" inherits="UploadPage, App_Web_uploadpage.aspx.cdcab7d2" enableeventvalidation="false" %>

<%@ Register Src="AttachmentControl.ascx" TagName="AttachmentControl" TagPrefix="uc1" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body class="uploadpage">
	<form id="form1" runat="server">
		<div>
			<uc1:AttachmentControl ID="BizAPPAttachmentControl" runat="server" />
		</div>
	</form>
</body>
</html>
