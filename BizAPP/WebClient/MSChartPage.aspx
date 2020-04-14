<%@ page language="C#" autoeventwireup="true" inherits="MSChartPage, App_Web_mschartpage.aspx.cdcab7d2" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
	Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
	<div>
		<asp:Chart ID="MSChart" runat="server">
		</asp:Chart>
	</div>
	</form>
</body>
</html>
