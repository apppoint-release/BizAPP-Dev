<%@ control language="C#" autoeventwireup="true" inherits="System_Report_Workbench, App_Web_reportworkbench.ascx.79613827" %>
<%@ Register TagPrefix="cc1" Namespace="PerpetuumSoft.Reporting.Web" Assembly="PerpetuumSoft.Reporting.Web, Version=7.3.0.22, Culture=neutral, PublicKeyToken=8a6ae0a3e67829b5" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelQuery" runat="server" UpdateMode="Conditional">
	<ContentTemplate>
		<fieldset style="vertical-align: top">
			<legend>Report</legend>
			<p>
				<table style="width: 100%; height: 100%">
					<tr>
						<td>
							Report EID :
							<asp:TextBox ID="tbReportId" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							Context Identifier :
							<asp:TextBox ID="tbContextId" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							<asp:Button ID="btnExecuteReport" runat="server" Text="Execute" OnClick="btnExecuteReport_Click"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
						</td>
					</tr>
					<tr>
						<td>
							<iframe runat="server" id="reportResultsFrame" visible="false" style="width:100%; height:300px;">

							</iframe>
						</td>
					</tr>
				</table>
			</p>
		</fieldset>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="btnExecuteReport" />
	</Triggers>
</asp:UpdatePanel>
