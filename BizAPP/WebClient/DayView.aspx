<%@ page language="C#" autoeventwireup="true" inherits="Controls_Scheduler_DayView, App_Web_dayview.aspx.cdcab7d2" %>

<%@ Register Assembly="Infragistics.WebUI.WebSchedule, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.WebUI.WebSchedule" TagPrefix="igsch" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
	<div>
		<igsch:WebScheduleInfo ID="WebScheduleInfo" runat="server">
		</igsch:WebScheduleInfo>
		<igsch:WebDayView ID="WebDayView" runat="server" WebScheduleInfoID="WebScheduleInfo"
			Style="height: 100%; width: 100%; border: solid 1px Black;    ">
		</igsch:WebDayView>
	</div>
	</form>
</body>
</html>
