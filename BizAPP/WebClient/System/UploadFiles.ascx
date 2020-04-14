<%@ control language="C#" autoeventwireup="true" inherits="Upload_Files, App_Web_uploadfiles.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelUploadFile" runat="server">
	<ContentTemplate>
		<fieldset>
			<legend>Upload Files</legend>
			<table style="width: 100%;">
				<tr>
					<td style="white-space: nowrap;">
						Directory Path On Server :
					</td>
					<td style="width: 100%;">
						<asp:TextBox ID="tbPathOnServer" runat="server" Style="width: 100%;" CssClass="ui-corner-all"></asp:TextBox>
					</td>
				</tr>
				<tr>
					<td>
						File :
					</td>
					<td>
						<asp:FileUpload ID="FileUpload" runat="server" CssClass="ui-corner-all" Style="width: 100%;" />
					</td>
				</tr>
				<tr>
					<td colspan="2" align="left">
						<asp:Button ID="btnUpload" runat="server" Text="Upload" OnClick="btnUpload_Click"
							CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
					</td>
				</tr>
			</table>
		</fieldset>
	</ContentTemplate>
</asp:UpdatePanel>
<asp:UpdatePanel ID="UpdatePanelPackageContainer" runat="server">
	<ContentTemplate>
	<fieldset>
			<legend>Upload Package</legend>
		<table style="width: 100%;">
			<tr>
				<td>
					<input id="PackageTaskId" type="hidden" runat="server" />
					<asp:FileUpload ID="FileUploadPackage" runat="server" CssClass="ui-corner-all" />
					<asp:UpdatePanel ID="UpdatePanelUploadPackage" runat="server" UpdateMode="Conditional"
						Visible="False">
						<ContentTemplate>
							<asp:Timer runat="server" ID="TimerUploadPackage" Interval="1000" Enabled="false"
								OnTick="UploadPackage_Tick" />
							<p>
								<asp:Image ID="ImageUploadPackage" runat="server" ImageUrl="../Resources/Images/JobProcessing.gif" />
							</p>
							<textarea id="UploadPackageLog" cols="100" rows="25" runat="server" style="width: 100%"></textarea>
						</ContentTemplate>
					</asp:UpdatePanel>
				</td>
			</tr>
			<tr>
				<td align="left">
					<asp:Button ID="ButtonPackageUpload" runat="server" Text="Upload Package" OnClick="btnPackageUpload_Click"
						CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
				</td>
			</tr>
		</table>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="ButtonPackageUpload" />
	</Triggers>
</asp:UpdatePanel>
