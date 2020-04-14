<%@ control language="C#" autoeventwireup="true" inherits="System_Query_Workbench, App_Web_queryworkbench.ascx.79613827" %>

<%@ register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="ajaxToolkit" %>
<asp:updatepanel id="UpdatePanelQuery" runat="server" updatemode="Conditional">
	<ContentTemplate>
		<%: Styles.Render("~/Resources/CRM/CodeMirror") %>
		<%: Scripts.Render("~/CodeMirror") %>
		<fieldset>
			<legend>Query</legend>
			<style type="text/css">
				.CodeMirror {border: 1px solid silver; border-width: 1px 2px; height:300px;}
			</style>
			<p>
				<table style="width: 100%;">
					<tr>
						<td>
							Query XML :
							<asp:TextBox ClientIDMode="Static" ID="TextBoxSQL" runat="server" Style="width: 100%;"
								TextMode="MultiLine"></asp:TextBox>
							<script type="text/javascript">
								var editor = CodeMirror.fromTextArea(document.getElementById("TextBoxSQL"), {
									mode: { name: "xml", alignCDATA: true },
									lineNumbers: true,
									matchBrackets: true,
									lineWrapping: true,
									extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
									foldGutter: true,
									gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
								});
								editor.foldCode(CodeMirror.Pos(13, 0));
								editor.foldCode(CodeMirror.Pos(1, 0));
							</script>
						</td>
					</tr>
					<tr>
						<td>
							Query EID :
							<asp:TextBox ID="tbQueryEid" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							Page Size :
							<asp:TextBox ID="tbPageSize" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							Page No :
							<asp:TextBox ID="tbPageNo" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							Context Identifier :
							<asp:TextBox ID="tbContext" runat="server" CssClass="ui-corner-all"></asp:TextBox>
							<asp:Button ID="btnExecuteQuery" runat="server" Text="Execute" OnClick="btnExecuteQuery_Click"
								OnClientClick="return executeQuery();" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
						</td>
					</tr>
					<tr>
						<td>
							Results :
							<div id="queryResults">
							</div>
							<asp:Panel ID="PanelQueryResults" runat="server" Visible="false">
								<%--<asp:Image ID="ImageQueryProcessing" runat="server" ImageUrl="../Resources/Images/JobProcessing.gif" />--%>
								<asp:TextBox ID="TextBoxQueryResults" runat="server" Style="width: 100%;" CssClass="ui-corner-all"
									ReadOnly="true"></asp:TextBox>
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
			</p>
		</fieldset>
		<fieldset>
			<legend>Expression</legend>
			<p>
				<table style="width: 100%;">
					<tr>
						<td>
							Expression
						</td>
						<td style="width: 100%;" colspan="2">
							<asp:TextBox ID="tbExpression" runat="server" Style="width: 100%;" CssClass="ui-corner-all"
								TextMode="MultiLine" Rows="2"></asp:TextBox>
						</td>
					</tr>
					<tr>
						<td>
							Context Objects (&#39;,&#39; separated identifiers)
						</td>
						<td style="width: 100%;" colspan="2">
							<asp:TextBox ID="tbContextIds" runat="server" Style="width: 100%; height: 100%" CssClass="ui-corner-all"
								TextMode="MultiLine"></asp:TextBox>
						</td>
					</tr>
					<tr>
						<td>
							<nobr><asp:CheckBox runat="server" ID="cbCompute" Text="Compute"></asp:CheckBox></nobr>
						</td>
						<td>
							<asp:CheckBox runat="server" ID="cbHtml" Text="HTML Friendly"></asp:CheckBox>
							<asp:Button ID="btnEvaluate" runat="server" Text="Evaluate" OnClientClick="evaluateExpression();return false;"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
						</td>
						<td>
						</td>
					</tr>
				</table>
				<div id="expResults">
				</div>
			</p>
			<script type="text/javascript">
				$(document).ready(function () {
					var vars = {};
					var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
						vars[key] = value;
					});

					var contextid = vars["contextid"];
					if (contextid) {
						$('[id$="tbContextIds"]').val(contextid);
						$('[id$="tbContext"]').val(contextid);
					}
				});
			</script>
		</fieldset>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="btnExecuteQuery" />
	</Triggers>
</asp:updatepanel>
