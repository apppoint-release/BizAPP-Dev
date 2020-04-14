<%@ Register TagPrefix="cc1" Namespace="PerpetuumSoft.Reporting.Web" Assembly="PerpetuumSoft.Reporting.Web" %>

<%@ page language="C#" autoeventwireup="true" inherits="Controls_Pages_ReportViewer, App_Web_reportviewer.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title></title>

	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>

</head>
<body class="reportpage">
	<form id="form1" runat="server">
	<div>
		<cc1:SharpShooterWebViewer ID="ReportViewer" runat="server" Width="100%" reportnum="0"
			pageindex="0" Height="730px" CssClass="webView"
			pagercssclass="webViewPager" ImageFormat="Png" CacheTimeOut="05:00:00"></cc1:SharpShooterWebViewer>
	</div>
	</form>
</body>
</html>
