<%@ control language="C#" autoeventwireup="true" inherits="System_Expression_Workbench, App_Web_expressionworkbench.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelQuery" runat="server" UpdateMode="Conditional">
	<ContentTemplate>
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
		</fieldset>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="btnEvaluate" />
	</Triggers>
</asp:UpdatePanel>
