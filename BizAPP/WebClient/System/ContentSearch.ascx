<%@ control language="C#" autoeventwireup="true" inherits="ContentSearch_Workbench, App_Web_contentsearch.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelQuery" runat="server" UpdateMode="Conditional">
	<ContentTemplate>
		<fieldset>
			<legend>Settings</legend>
			<p>
				<table style="width: 100%;">
					<tr>
						<td style="width: 25%;">Content Folders :
						</td>
						<td>
							<asp:Label ID="labelContentFolders" runat="server" CssClass="ui-corner-all" />
						</td>
					</tr>
					<tr>
						<td style="width: 25%;">Index Folder :
						</td>
						<td>
							<asp:Label ID="labelIndexFolder" runat="server" CssClass="ui-corner-all" />
						</td>
					</tr>
				</table>
			</p>
		</fieldset>
		<fieldset>
			<legend>Documents/Types</legend>
			<p>
				<asp:Button ID="ReindexDocuments" runat="server" Text="Reindex Documents" OnClick="ReindexDocuments_Click" />
				<asp:Button ID="OptimizeDocumentDatabase" runat="server" Text="Optimize Documents" OnClick="OptimizeDocumentDatabase_Click" />
				<%--
				<br />
				<asp:Button ID="ReindexAllTypes" runat="server" Text="Reindex All Types" OnClick="ReindexAllTypes_Click" />
				<asp:Button ID="OptimizeAllTypesDatabase" runat="server" Text="Optimize All Types" OnClick="OptimizeAllTypesDatabase_Click" />
				--%>
			</p>
			<p>
				Choose Type and Content Query:
				<asp:DropDownList ID="ListOfTypes" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ListOfTypes_SelectedIndexChanged" />
				<asp:DropDownList ID="QueriesForType" AutoPostBack="true" runat="server" OnSelectedIndexChanged="QueriesForType_SelectedIndexChanged" />
				<br />
				<asp:Button ID="ReindexType" runat="server" Text="Reindex" OnClick="ReindexType_Click" Enabled="false" />
				<%--
				<asp:GridView ID="GridViewReindexTypes" runat="server" AutoGenerateColumns="False"
					CellPadding="4" ForeColor="#333333" Width="100%" OnRowCommand="GridViewReindexTypes_RowCommand" DataKeyNames="TypeId">
					<RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
					<Columns>
						<asp:ButtonField Text="Reindex"
							CommandName="ReindexType" />
						<asp:BoundField AccessibleHeaderText="Type Name" DataField="TypeName" HeaderText="Type Name" />
					</Columns>
					<FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
					<PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
					<SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
					<HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
					<EditRowStyle BackColor="#999999" />
					<AlternatingRowStyle BackColor="White" ForeColor="#284775" />
				</asp:GridView>
				--%>
			</p>
		</fieldset>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="ReindexDocuments" />
		<asp:PostBackTrigger ControlID="OptimizeDocumentDatabase" />
		<%--
		<asp:PostBackTrigger ControlID="ReindexAllTypes" />
		<asp:PostBackTrigger ControlID="OptimizeAllTypesDatabase" />
		--%>
		<asp:PostBackTrigger ControlID="ListOfTypes" />
		<asp:PostBackTrigger ControlID="QueriesForType" />
		<asp:PostBackTrigger ControlID="ReindexType" />
	</Triggers>
</asp:UpdatePanel>
