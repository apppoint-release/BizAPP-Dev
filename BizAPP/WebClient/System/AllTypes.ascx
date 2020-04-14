<%@ control language="C#" autoeventwireup="true" inherits="System_AllTypes, App_Web_alltypes.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelAllTypes" runat="server">
	<ContentTemplate>
		<asp:GridView ID="GridViewIntegrationEndPoints" runat="server" AutoGenerateColumns="False"
			CellPadding="4" ForeColor="#333333" Width="100%">
			<RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
			<Columns>
				<asp:BoundField AccessibleHeaderText="Type Name" DataField="TypeName" HeaderText="Type Name" />
				<asp:HyperLinkField AccessibleHeaderText="ASMX" DataNavigateUrlFields="WSDLUrl" HeaderText="ASMX"
					Text="View" />
				<asp:TemplateField AccessibleHeaderText="WCF" HeaderText="WCF">
					<ItemTemplate>
						<asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl='<%# Eval("WCFSVCUrl") %>'
							Text="View"></asp:HyperLink>
					</ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField AccessibleHeaderText="REST" HeaderText="REST">
					<ItemTemplate>
						<asp:HyperLink ID="HyperLinkREST" runat="server" NavigateUrl='<%# Eval("HttpApiObject") %>'
							Text="Get Object - Type"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLinkSLREST" runat="server" NavigateUrl='<%# Eval("HttpApiObject2") %>'
							Text="Get Object - Type Id"></asp:HyperLink><br />

						<asp:HyperLink ID="HyperLink15" runat="server" NavigateUrl='<%# Eval("HttpQuery") %>'
							Text="Query(Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink16" runat="server" NavigateUrl='<%# Eval("HttpQueryNoPage") %>'
							Text="Query"></asp:HyperLink><br />

						<asp:HyperLink ID="HyperLink13" runat="server" NavigateUrl='<%# Eval("HttpQueryFields") %>'
							Text="Query - Fields(Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink14" runat="server" NavigateUrl='<%# Eval("HttpQueryFieldsNoPage") %>'
							Text="Query - Fields"></asp:HyperLink><br />

						<asp:HyperLink ID="HyperLink10" runat="server" NavigateUrl='<%# Eval("HttpQueryByEid") %>'
							Text="Query - EntepriseId(Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink11" runat="server" NavigateUrl='<%# Eval("HttpQueryByEidNoPage") %>'
							Text="Query - EntepriseId"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink12" runat="server" NavigateUrl='<%# Eval("HttpBQDL") %>'
							Text="BQDL"></asp:HyperLink><br />
					</ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField AccessibleHeaderText="REST - Public" HeaderText="REST - Public">
					<ItemTemplate>
						<asp:HyperLink ID="HyperLink5" runat="server" NavigateUrl='<%# Eval("HttpPublicQueryFields") %>'
							Text="Public Fields - Type(Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink6" runat="server" NavigateUrl='<%# Eval("HttpPublicQueryFieldsNoPage") %>'
							Text="Public Fields - Type"></asp:HyperLink>
						<asp:HyperLink ID="HyperLink4" runat="server" NavigateUrl='<%# Eval("HttpPublicQuery") %>'
							Text="Public Fields - Type(Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink7" runat="server" NavigateUrl='<%# Eval("HttpPublicQueryNoPage") %>'
							Text="Public Fields - Type"></asp:HyperLink>
						<asp:HyperLink ID="HyperLink8" runat="server" NavigateUrl='<%# Eval("HttpPublicQueryByEID") %>'
							Text="Public Query - EID (Paginated)"></asp:HyperLink><br />
						<asp:HyperLink ID="HyperLink9" runat="server" NavigateUrl='<%# Eval("HttpPublicQueryByEIDNoPage") %>'
							Text="Public Query - EID"></asp:HyperLink>
					</ItemTemplate>
				</asp:TemplateField>
			</Columns>
			<FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
			<PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
			<SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
			<HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
			<EditRowStyle BackColor="#999999" />
			<AlternatingRowStyle BackColor="White" ForeColor="#284775" />
		</asp:GridView>
	</ContentTemplate>
</asp:UpdatePanel>
