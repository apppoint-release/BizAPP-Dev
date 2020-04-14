<%@ control language="C#" autoeventwireup="true" inherits="App_Config, App_Web_appconfig.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelMetaDataInfoContainer" runat="server">
	<ContentTemplate>
		<fieldset>
			<legend>Build Info</legend>
			<asp:Literal runat="server" ID="litBuildInfo"></asp:Literal>
		</fieldset>
		<p>
			<asp:Button ID="btnbizAppSettings" runat="server" Text="BizAPP Settings" OnClick="btnbizAppSettings_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
			<asp:Button ID="btnDebugSettings" runat="server" Text="Debug Settings" OnClick="btnDebugSettings_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
            <asp:Button ID="btnConfigSettings" runat="server" Text="Configurations" OnClick="btnConfigSettings_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
		</p>
		<fieldset>
			<legend>
				<asp:Label ID="lblHeader" runat="server" Text="Label"></asp:Label></legend>
		</fieldset>
		<div>
            <style>
                input[type=checkbox] {
                    margin: 6px 0.5ex;
                }
            </style>
            <asp:Panel ID="addNewSection" runat="server" Visible="false" style="padding-bottom: 20px;">
                <table style="width: 50%;">
                    <tr>
                         <td> 
                            <asp:Label ID="lblCategory" runat="server" Text="Category "></asp:Label>
                        </td>
                        <td> 
                            <asp:TextBox ID="txtCategory" runat="server" style="width: 90%;"></asp:TextBox>
                        </td>
                        <td> 
                            <asp:Label ID="lblName" runat="server" Text="Name "></asp:Label>
                        </td>
                        <td> 
                            <asp:TextBox ID="txtName" runat="server" style="width: 90%;"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td> 
                            <asp:Label ID="lblValue" runat="server" Text="Value "></asp:Label>
                        </td>
                        <td colspan="3"> 
                            <asp:TextBox ID="txtValue" runat="server" TextMode="MultiLine"  style="width: 96%;margin-top: 10px;"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:CheckBox ID="chkTenantSpecific" runat="server" Text="Tenant Specific" />
                        </td>
                        <td colspan="3"> 
                            <asp:Button ID="bntReloadConfig" runat="server" Text="Reload" OnClick="btnReload_Click" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
                            <asp:Button ID="btnAddNew" runat="server" Text="Add" OnClick="btnAddNew_Click" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
			<asp:DataGrid ID="gvData" runat="server" CellPadding="4" AutoGenerateColumns="false"
				OnCancelCommand="gvData_Cancel" OnUpdateCommand="gvData_Updating" OnEditCommand="gvData_Edit" OnItemCommand="ItemsGrid_Command"
				Height="100%" Width="100%" Enabled="true" EnableViewState="true">
				<HeaderStyle CssClass="viewheader" />
				<Columns>
					<asp:EditCommandColumn EditText="Edit" CancelText="Cancel" UpdateText="Update" />
					<asp:ButtonColumn HeaderText="Delete item" ButtonType="LinkButton" Text="Delete" CommandName="Delete"/>
					<asp:TemplateColumn HeaderText="Name">
						<ItemTemplate>
							<asp:Label runat="server" CssClass="dg-name" Text='<%# DataBinder.Eval( Container.DataItem, "Name" )%>' />
						</ItemTemplate>
						<EditItemTemplate>
							<asp:Label runat="server" CssClass="dg-name" Text='<%# DataBinder.Eval( Container.DataItem, "Name" )%>' />
						</EditItemTemplate>
					</asp:TemplateColumn>
					<asp:TemplateColumn HeaderText="Value">
						<ItemTemplate>
							<asp:Label runat="server" CssClass="dg-val" Text='<%# DataBinder.Eval( Container.DataItem, "Value" )%>' />
						</ItemTemplate>
						<EditItemTemplate>
							<asp:TextBox TextMode="MultiLine" CssClass="dg-val" runat="server" Text='<%# DataBinder.Eval( Container.DataItem, "Value" ).ToString() %>' />
						</EditItemTemplate>
					</asp:TemplateColumn>
				</Columns>
			</asp:DataGrid>
		</div>
	</ContentTemplate>
</asp:UpdatePanel>
