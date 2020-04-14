<%@ control language="C#" autoeventwireup="true" inherits="System_ServerVariables, App_Web_sysinfo.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelMetaDataInfoContainer" runat="server">
	<ContentTemplate>
		<p>
			<asp:Button ID="btnQueryString" runat="server" Text="Query String" OnClick="btnQueryString_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
			<asp:Button ID="btnServerVariables" runat="server" Text="Server Variables" OnClick="btnServerVariables_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
			<asp:Button ID="btnEnvironmentVariables" runat="server" Text="Environment Variables"
				OnClick="btnEnvironmentVariables_Click" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
			<asp:Button ID="btnRegistryEntries" runat="server" Text="Registry Entries" OnClick="btnRegistryEntries_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
            <asp:Button ID="btnFetchViewStack" runat="server" Text="View Stack Info" OnClick="FetchViewStack_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
            
		</p>
		<fieldset>
			<legend>
				<asp:Label ID="lblHeader" runat="server" Text="Label"></asp:Label></legend>
		</fieldset>
		<p>
            <div style="float:right;margin-bottom:10px;">
                <asp:Button ID="btnClearViewStack" runat="server" Text="Clear View Stack" OnClick="ClearViewStack_Click"
				CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"/>
            </div>
			<asp:GridView ID="gvData" runat="server" CellPadding="4" Height="100%" Width="100%">
				<HeaderStyle CssClass="viewheader" />
			</asp:GridView>
		</p>
	</ContentTemplate>
</asp:UpdatePanel>
