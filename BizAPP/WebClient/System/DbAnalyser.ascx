<%@ control language="C#" autoeventwireup="true" inherits="System_DbAnalyser, App_Web_dbanalyser.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="RunDbAnalyserContainer" runat="server">
	<ContentTemplate>
	<fieldset>
			<legend>Analyser Status</legend>
		<table style="width: 100%;">
			<tr>
				<td align="left">
					<asp:Button ID="btnRunDbAnalyser" runat="server" Text="Run Database Analyser" OnClick="btnRunDbAnalyser_Click"
						CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
				</td>
			</tr>
			<tr>
				<td>
					<input id="RunDbAnalyserTaskId" type="hidden" runat="server" />
					<asp:UpdatePanel ID="RunDbAnalyserPanel" runat="server" UpdateMode="Conditional"
						Visible="False">
						<ContentTemplate>
							<asp:Timer runat="server" ID="TimerRunDbAnalyser" Interval="1000" Enabled="false"
								OnTick="RunDbAnalyser_Tick" />
							<p>
								<asp:Image ID="ImageRunDbAnalyser" runat="server" ImageUrl="../Resources/Images/JobProcessing.gif" />
							</p>
							<textarea id="RunDbAnalyserLog" cols="100" rows="25" runat="server" style="width: 100%"></textarea>
						</ContentTemplate>
					</asp:UpdatePanel>
				</td>
			</tr>
		</table>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="btnRunDbAnalyser" />
	</Triggers>
</asp:UpdatePanel>