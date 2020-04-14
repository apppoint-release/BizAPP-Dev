<%@ page language="C#" autoeventwireup="true" inherits="Date, App_Web_datepage.aspx.cdcab7d2" enableeventvalidation="false" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body style="padding: 0; margin: 0px; background-color: Transparent;" onload="return callApplyStyle( );">
	<form id="form1" runat="server">
	<table cellpadding="0" cellspacing="0" border="0" class="calendartitlestyle">
		<tr>
			<td>
				<asp:Calendar ID="calendar" runat="server" BackColor="White" BorderColor="#999999"
					CellPadding="2" DayNameFormat="Shortest" Height="180px" Width="100%" ShowGridLines="True">
					<SelectedDayStyle CssClass="calanderselecteddaystyle" />
					<TodayDayStyle CssClass="calendartodaydaystyle" />
					<SelectorStyle CssClass="calendarselectorstyle" />
					<WeekendDayStyle CssClass="calendarweekenddaystyle" />
					<OtherMonthDayStyle ForeColor="Gray" />
					<NextPrevStyle VerticalAlign="Bottom" />
					<DayHeaderStyle CssClass="calendardayheaderstyle" Font-Size="7pt" />
					<TitleStyle CssClass="calendartitlestyle" Font-Bold="True" />
				</asp:Calendar>
			</td>
		</tr>
		<tr>
			<td>
				<table cellpadding="0" cellspacing="0" border="0" width="100%" id="bottomControls"
					runat="server" class="calendartitlestyle" style="padding: 0px;">
					<tr>
						<td>
							<asp:DropDownList ID="ddlYear" CssClass="formcombobox" runat="server" AutoPostBack="True">
							</asp:DropDownList>
						</td>
						<td>
							<asp:DropDownList ID="ddlMonth" CssClass="formcombobox" runat="server" AutoPostBack="True">
							</asp:DropDownList>
						</td>
						<td>
							<asp:Button ID="btnToday" CssClass="formbutton" runat="server" Text="Today"></asp:Button>
						</td>
						<td>
							<asp:Button ID="btnClose" CssClass="formbutton" runat="server" Text="Close"></asp:Button>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	</form>
</body>
</html>
