<%@ control language="C#" autoeventwireup="true" inherits="System_PowerShell, App_Web_powershell.ascx.79613827" %>
<%@ register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="ajaxToolkit" %>
<asp:updatepanel id="UpdatePanelQuery" runat="server" updatemode="Conditional">
	<contenttemplate>
		<%: Styles.Render("~/Resources/CRM/CodeMirror") %>
		<%: Scripts.Render("~/CodeMirror") %>
		<fieldset>
			<legend>PowerShell</legend>
			<style type="text/css">
				.CodeMirror {border: 1px solid silver; border-width: 1px 2px; height:300px;}
			</style>
			<p>
				<table style="width: 100%;">
					<tr>
						<td style="width: 75%;"><b>Script</b>
							<asp:TextBox ClientIDMode="Static" ID="tbScript" runat="server" Style="width: 100%;" CssClass="ui-corner-all"
								TextMode="MultiLine" Rows="15"></asp:TextBox>
							<script type="text/javascript">
								var editor1 = CodeMirror.fromTextArea(document.getElementById("tbScript"), {
									mode: {
										name: "powershell",
										version: 2,
										singleLineStringErrors: false
									},
									lineNumbers: true,
									indentUnit: 4,
									tabMode: "shift",
									matchBrackets: true
								});
							</script>
						</td>
						<td style="width: 25%;" rowspan="3" valign="top"><b>Samples</b>
							<div style="overflow:auto; font-size: small;">
								<ul type="square">
									<li>Print Current Time</li>
									<ul type="circle">
										<li><div>[System.DateTime]::Now.ToString( "dd/MMM/yyyy" )</div></li>
									</ul>
								</ul>
								<ul type="square">
									<li>Print Server DateTime Regional Settings</li>
									<ul type="circle">
										<li><div>[System.Globalization.DateTimeFormatInfo]::CurrentInfo | Out-String</div></li>
									</ul>
								</ul>
								<ul type="square">
									<li>Print Current Server Culture</li>
									<ul type="circle">
										<li><div>[System.Globalization.DateTimeFormatInfo]::CurrentInfo | Out-String</div></li>
									</ul>
								</ul>
								<ul type="square">
									<li>Print Current Server UI Culture</li>
									<ul type="circle">
										<li><div>[System.Threading.Thread]::CurrentThread.CurrentUICulture | Out-String</div></li>
									</ul>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td><br />$session is predefined variable
							<asp:Button ID="btnExecute" runat="server" Text="Execute"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClick="btnExecute_Click" />
						</td>
					</tr>
					<tr>
						<td style="width: 100%;">
							<b>Results</b>
							<asp:TextBox ID="tbResults" runat="server" Style="width: 100%; height: 100%" CssClass="ui-corner-all"
								TextMode="MultiLine" Rows="15"></asp:TextBox>
						</td>
					</tr>
				</table>
		</fieldset>
	</contenttemplate>
	<triggers>
		<asp:PostBackTrigger ControlID="btnExecute" />
	</triggers>
</asp:updatepanel>
