<%@ control language="C#" autoeventwireup="true" inherits="System_BSqlWorkbench, App_Web_bsqlworkbench.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%: Styles.Render("~/Resources/CRM/CodeMirror") %>
<%: Scripts.Render("~/CodeMirror") %>
<fieldset>
	<style type="text/css">
		.CodeMirror {
			border: 1px solid silver;
			border-width: 1px 2px;
			height: 300px;
		}
	</style>
	<legend>BizAPP Structured Query Language</legend>
	<div>
		<table style="width: 100%;">
			<tr>
				<td>Sql :
					<asp:textbox clientidmode="Static" id="TextBoxBSQLEditor" runat="server" style="width: 100%; height: 150px"
						textmode="MultiLine" Text=" options includedefaultfields=false"></asp:textbox>
					<script>
						var editor = CodeMirror.fromTextArea(document.getElementById("TextBoxBSQLEditor"), {
							mode: "text/x-sql",
							indentWithTabs: true,
							smartIndent: true,
							lineNumbers: true,
							matchBrackets: true,
							autofocus: true
						});
						editor.on('blur', function () {
							editor.save();

							var targetEditor = document.getElementById("TextBoxBSQL");
							targetEditor.value = $('#TextBoxBSQLEditor')[0].value;
							console.log(targetEditor.value);
						});
					</script>
				</td>
                <td></td>
				<td>
					Samples :<br />
					<div id="samples" style="height: 300px; overflow: scroll; border: 1px solid; overflow-x: hidden">
						<asp:placeholder id="lblBsqlsamples" runat="server"></asp:placeholder>
					</div>
				</td>
			</tr>
		</table>
		<asp:updatepanel id="UpdatePanelQuery" runat="server" updatemode="Conditional">
			<ContentTemplate>
				<asp:textbox clientidmode="Static" id="TextBoxBSQL" runat="server" style="width: 0px;height:0px;"
					textmode="MultiLine"></asp:textbox>
					<table style="width: 100%;">
						<tr>
							<td>Page Size :
								<asp:TextBox ID="tbPageSize" runat="server" CssClass="ui-corner-all" Text="20"></asp:TextBox>
								Page No :
								<asp:TextBox ID="tbPageNo" runat="server" CssClass="ui-corner-all" Text="0"></asp:TextBox>
								Context Identifier :
								<asp:TextBox ID="tbContext" runat="server" CssClass="ui-corner-all"></asp:TextBox>
								<asp:Button ID="btnExecuteQuery" runat="server" Text="Execute" OnClick="btnExecuteQuery_Click"
									CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
							</td>
						</tr>
						<tr>
							<td>Results :
								<div id="queryResults">
								</div>
								<asp:Panel ID="PanelQueryResults" runat="server" Visible="false">
									<%--<asp:Image ID="ImageQueryProcessing" runat="server" ImageUrl="../Resources/Images/JobProcessing.gif" />--%>
									<table>
										<tr>
											<td>
												<asp:Button ID="ExcelExport" runat="server" Text="Export" Visible="false" OnClick="btnExcelExport_Click"
													CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
												</td>
											<td>
												<asp:Label ID="TextBoxQueryResults" runat="server" Style="width: 100%;" CssClass="ui-corner-all"
													ReadOnly="true"></asp:Label>
											</td>
										</tr>
									</table>
									<asp:GridView ID="GridViewQueryResults" runat="server" CellPadding="4" ForeColor="#333333"
										Height="100%" Width="100%">
										<RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
										<FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
										<PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
										<SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
										<HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
										<EditRowStyle BackColor="#999999" />
										<AlternatingRowStyle BackColor="White" ForeColor="#284775" />
									</asp:GridView>
								</asp:Panel>
							</td>
						</tr>
					</table>
			</ContentTemplate>
			<triggers>
				<asp:PostBackTrigger ControlID="ExcelExport" />
			</triggers>
		</asp:updatepanel>
	</div>
</fieldset>