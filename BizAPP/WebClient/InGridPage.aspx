<%@ page language="C#" autoeventwireup="true" inherits="InGridPage, App_Web_ingridpage.aspx.cdcab7d2" %>

<%@ Register Assembly="Infragistics.Web, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.Web.UI.GridControls" TagPrefix="igtbl" %>
<%@ Register Assembly="Infragistics.Web, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.Web.UI.GridControls" TagPrefix="igtblexcelexp" %>
<%@ Register Assembly="Infragistics.Web, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.Web.UI.GridControls" TagPrefix="igtblwordexp" %>
<%@ Register Assembly="Infragistics.Web, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.Web.UI.GridControls" TagPrefix="igtbldocexp" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Untitled Page</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body style="padding: 0; margin: 0px; border-style: none;">
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div>
		<table cellpadding="0" cellspacing="0" style="height: 100%">
			<tr>
				<td>
					<asp:Table ID="Table2" CellPadding="0" CellSpacing="0" runat="server">
						<asp:TableRow ID="TopActionRow" runat="server">
						</asp:TableRow>
					</asp:Table>
				</td>
				<td style="vertical-align: top;">
					<asp:Table ID="ControlsContainer" CellPadding="0" CellSpacing="0" Height="17px" Width="100%"
						runat="server">
						<asp:TableRow>
							<asp:TableCell Style="text-align: left; vertical-align: top;">
								<asp:Panel ID="SearchableRow" runat="server">
								</asp:Panel>
							</asp:TableCell>
							<asp:TableCell Style="text-align: left; vertical-align: top;">
								<asp:Panel ID="CreateNewRow" runat="server">
								</asp:Panel>
							</asp:TableCell>
							<asp:TableCell Style="text-align: left; vertical-align: top;">
								<asp:Panel ID="RefreshRow" runat="server">
								</asp:Panel>
							</asp:TableCell>
							<asp:TableCell Style="text-align: right; vertical-align: top;" Width="95%">
								<asp:DropDownList ID="DDLExportTypes" EnableViewState="true" runat="server">
								</asp:DropDownList>
							</asp:TableCell>
							<asp:TableCell Style="text-align: right; vertical-align: top;">
								<asp:ImageButton ID="BtnExport" ImageUrl="~/Resources/Images/Common/export.png" CssClass="exportgridcontents"
									runat="server" />
							</asp:TableCell>
						</asp:TableRow>
					</asp:Table>
				</td>
			</tr>
			<tr>
				<td style="vertical-align: top;" colspan="2">
					<igtbl:WebDataGrid ID="WebDataGrid" runat="server" Height="200px" Width="100%">
					</igtbl:WebDataGrid>
					<igtbldocexp:WebDocumentExporter ID="WebDocumentExporter" ExportMode="Download" runat="server"
						DownloadName="ExportData">
					</igtbldocexp:WebDocumentExporter>
					<igtblwordexp:WebWordExporter ID="WebWordExporter" runat="server" DownloadName="ExportData">
					</igtblwordexp:WebWordExporter>
					<igtblexcelexp:WebExcelExporter ID="WebExcelExporter" runat="server" DownloadName="ExportData">
					</igtblexcelexp:WebExcelExporter>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="height: 3px">
				</td>
			</tr>
			<tr>
				<td colspan="2" style="height: 17px;">
					<asp:Table ID="Table1" CellPadding="0" CellSpacing="0" runat="server">
						<asp:TableRow ID="BottomActionRow" runat="server">
						</asp:TableRow>
					</asp:Table>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="height: 0px">
					<div style="display: none;">
						<asp:TextBox ID="serializedStringHolder" bizappid="serializedStringHolder" runat="server"
							EnableViewState="true"></asp:TextBox>
					</div>
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>
