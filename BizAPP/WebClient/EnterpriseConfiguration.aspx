<%@ page language="C#" autoeventwireup="true" inherits="EnterpriseConfiguration, App_Web_enterpriseconfiguration.aspx.cdcab7d2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>BizAPP Enterprise Studio - Enterprise Configuration</title>
	<link href="Resources/CRM/JQuery/jquery-ui.css" type="text/css" rel="Stylesheet" />

	<script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>

	<script src="Resources/Javascripts/JQuery/jquery-ui.js" type="text/javascript" language="javascript"></script>

	<style type="text/css">
		body
		{
			background: url(Resources/images/appbackground.jpg);
		}
		body, form
		{
			margin: 0;
			height: 100%;
		}
		body, input, textarea, select, button, option
		{
			font-family: Segoe UI;
			font-size: 11.5px;
		}
		table
		{
			background: #DAEBF2;
			border: solid 1px #CCC;
		}
		input, select
		{
			border: solid 1px #CCC;
		}
		.curPointer
		{
			cursor: pointer;
			margin-top: 3px;
		}
		.fillWidth
		{
			width: 100%;
		}
		.fillHeight
		{
			height: 100%;
		}
		.noBrkText
		{
			white-space: nowrap;
		}
		.rightalgn
		{
			text-align: right;
		}
		fieldset
		{
			border: 0;
			border-top: 1px solid #89BFD7;
			padding: 0;
		}
		legend
		{
			border: solid 1px #89BFD7;
			font-weight: bold;
			padding: 4px;
		}
		.banner
		{
			background: url(Resources/images/banner.jpg) no-repeat center center;
			color: White;
			height: 42px;
		}
	</style>

	<script type="text/javascript">
		$(function()
		{
			$("#EnterpriseDetSection").dialog({
				autoOpen: false,
				height: 250,
				width: 650,
				modal: true,
				open: function(type, data)
				{
					$(this).parent().appendTo("#form1");
				}
			});
			$('#btnCanEnt')
			.button()
			.click(function()
			{
				$('#EnterpriseDetSection').dialog('close');
			});

			$("#LoginDetSection").dialog({
				autoOpen: false,
				height: 150,
				width: 350,
				modal: true,
				open: function(type, data)
				{
					$(this).parent().appendTo("#form1");
				}
			});
			$('#btnCanLogin')
			.button()
			.click(function()
			{
				$('#LoginDetSection').dialog('close');
			});

			$("#UploadLicenseSection").dialog({
				autoOpen: false,
				height: 120,
				width: 350,
				modal: true,
				open: function(type, data)
				{
					$(this).parent().appendTo("#form1");
				}
			});
			$('#btnCanUpload')
			.button()
			.click(function()
			{
				$('#UploadLicenseSection').dialog('close');
			});

			$(function()
			{
				$("button, input:submit").button();
			});
		});

		function addEnterprise()
		{
			$('#EnterpriseDetSection').dialog('open');
		}

		function login()
		{
			$('#LoginDetSection').dialog('open');
		}

		function uploadLicense()
		{
			$('#UploadLicenseSection').dialog('open');
		}
	</script>

</head>
<body>
	<form id="form1" runat="server">
	<center class="fillHeight">
		<div style="width: 961px; height: 100%;">
			<table class="fillWidth fillHeight" style="background: transparent; border: 0;">
				<tr>
					<td>
						<img src="Resources/Images/AppLogo.png" align="left" />
					</td>
				</tr>
				<tr class="fillHeight">
					<td>
						<!--Registry-->
						<fieldset>
							<legend>Registry Details</legend>
							<br />
							<table class="fillWidth" cellpadding="0" cellspacing="3">
								<tr>
									<td class="noBrkText">
										Port No :
									</td>
									<td class="fillWidth">
										<asp:TextBox ID="tbPortNo" runat="server" CssClass="fillWidth ui-corner-all" Text="9898"></asp:TextBox>
									</td>
								</tr>
								<tr>
									<td class="noBrkText">
										Hosting Agent Uri :
									</td>
									<td class="fillWidth">
										<asp:TextBox ID="tbHostingAgent" runat="server" CssClass="fillWidth ui-corner-all"
											Text="tcp://localhost:9005/BizAPPHostingAgent"></asp:TextBox>
									</td>
								</tr>
								<tr>
									<td class="noBrkText">
										Remote Registry :
									</td>
									<td class="fillWidth">
										<asp:TextBox ID="tbRegistry" runat="server" CssClass="fillWidth ui-corner-all" Text="tcp://localhost:9000/RegistryS"></asp:TextBox>
									</td>
								</tr>
								<tr>
									<td class="noBrkText">
										License Server :
									</td>
									<td class="fillWidth">
										<asp:TextBox ID="tbLicenseServer" runat="server" CssClass="fillWidth ui-corner-all"
											Text="127.0.0.1:13333"></asp:TextBox>
									</td>
								</tr>
								<tr>
									<td>
									</td>
									<td class="fillWidth rightalgn">
										<asp:Button ID="btnRegistrySubmit" runat="server" Text="Submit Details" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
									</td>
								</tr>
							</table>
							<br />
						</fieldset>
						<!--Enterprises-->
						<asp:Panel ID="EnterpriseSection" runat="server">
							<fieldset>
								<legend>Registered Enterprises</legend>
								<br />
								<table class="fillWidth" cellpadding="0" cellspacing="3">
									<tr>
										<td class="noBrkText">
											Registered Enterprises :
										</td>
										<td class="fillWidth">
											<asp:ListBox ID="listRegEnts" runat="server" CssClass="fillWidth fillHeight"></asp:ListBox>
										</td>
										<td align="left">
											<asp:Button ID="btnAddEnt" runat="server" Text="Add Enterprise" OnClientClick="addEnterprise();return false;"
												CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" CausesValidation="False" />
											<asp:Button ID="btnRemEnt" runat="server" Text="Remove Enterprise" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
												CausesValidation="False" />
											<asp:Button ID="btnConnectEnt" runat="server" Text="Connect To Enterprise" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
												CausesValidation="False" OnClientClick="login();return false;" />
										</td>
										<td align="left">
											<asp:Button ID="btnGetLicense" runat="server" Text="Get License Content" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
											<asp:Button ID="btnPmtUploadLicense" runat="server" Text="Upload License" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
												OnClientClick="uploadLicense();return false;" CausesValidation="False" />
										</td>
									</tr>
								</table>
								<br />
							</fieldset>
						</asp:Panel>
					</td>
				</tr>
				<tr>
					<td>
						<div class="banner" align="right">
							<table style="height: 100%; background: transparent; border: 0">
								<tr>
									<td>
										Copyright &copy; 2007-2010 AppPoint. All right reserved.
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</center>
	<!--Enterprise Details-->
	<div id="EnterpriseDetSection" title="Enterprise Details" runat="server">
		<p>
			All form fields are required.</p>
		<table class="fillWidth" cellpadding="0" cellspacing="3">
			<tr>
				<td class="noBrkText">
					Name :
				</td>
				<td class="fillWidth">
					<asp:TextBox ID="tbEntName" runat="server" CssClass="fillWidth ui-corner-all" Text=""
						EnableViewState="false"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td class="noBrkText">
					Enterprise Type :
				</td>
				<td class="fillWidth">
					<asp:DropDownList ID="ddlEnterpriseType" runat="server" CssClass="fillWidth ui-corner-all">
					</asp:DropDownList>
				</td>
			</tr>
			<tr>
				<td class="noBrkText">
					DB Provider :
				</td>
				<td class="fillWidth">
					<asp:DropDownList ID="ddlDBProvider" runat="server" CssClass="fillWidth ui-corner-all">
					</asp:DropDownList>
				</td>
			</tr>
			<tr>
				<td class="noBrkText">
					Connection String :
				</td>
				<td class="fillWidth">
					<asp:TextBox ID="tbConnStr" EnableViewState="false" runat="server" CssClass="fillWidth ui-corner-all"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td align="right" colspan="2">
					<table style="background: transparent; border: 0;">
						<tr>
							<td>
								<asp:Button ID="btnCanEnt" runat="server" Text="Cancel" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
									OnClientClick="return false;" />
							</td>
							<td>
								<asp:Button ID="btnRegEnt" runat="server" Text="Register Enterprise" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	<!--Login Details-->
	<div id="LoginDetSection" title="Login">
		<table class="fillWidth" cellpadding="0" cellspacing="3">
			<tr>
				<td class="noBrkText">
					UserName :
				</td>
				<td class="fillWidth">
					<asp:TextBox EnableViewState="false" ID="tbUserName" runat="server" CssClass="fillWidth ui-corner-all"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td class="noBrkText">
					Password :
				</td>
				<td class="fillWidth">
					<asp:TextBox EnableViewState="false" ID="tbPassword" runat="server" CssClass="fillWidth ui-corner-all"
						TextMode="Password"></asp:TextBox>
				</td>
			</tr>
			<tr>
				<td align="right" colspan="2">
					<table style="background: transparent; border: 0;">
						<tr>
							<td>
								<asp:Button ID="btnCanLogin" runat="server" Text="Cancel" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
									OnClientClick="return false;" />
							</td>
							<td>
								<asp:Button ID="btnLogin" runat="server" Text="Login" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	<!--Upload License-->
	<div id="UploadLicenseSection" title="Login">
		<table class="fillWidth" cellpadding="0" cellspacing="3">
			<tr>
				<td class="noBrkText">
					License File :
				</td>
				<td class="fillWidth">
					<asp:FileUpload ID="FileUploadLicense" runat="server" class="fillWidth" />
				</td>
			</tr>
			<tr>
				<td align="right" colspan="2">
					<table style="background: transparent; border: 0;">
						<tr>
							<td>
								<asp:Button ID="btnCanUpload" runat="server" Text="Cancel" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
									OnClientClick="return false;" />
							</td>
							<td>
								<asp:Button ID="btnUploadLic" runat="server" Text="Upload" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>
