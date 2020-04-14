<%@ page language="C#" autoeventwireup="true" inherits="TransactionsListPage, App_Web_transactionslistpage.aspx.cdcab7d2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Pending Changes</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<style type="text/css">
		.btnCell
		{
			padding: 0 3 5 0;
		}
	</style>
</head>
<body class="transactionslistpage">
	<form id="form1" runat="server">
	<div>
		<table class="fill" cellpadding="0" cellspacing="0">
			<tr>
				<td align="left" style="padding: 4px;">
					<asp:Label ID="PageInfo" CssClass="formlabel" runat="server">Following objects are not saved :</asp:Label>
				</td>
			</tr>
			<tr class="fill">
				<td align="center" style="padding: 4px;">
					<asp:ListBox CssClass="fill formlistbox" ID="TransactionsList" bizappid="TransactionsList"
						runat="server" Border="0"></asp:ListBox>
				</td>
			</tr>
			<tr style="height: 25px;">
				<td align="right">
					<table>
						<tr>
							<td class="btnCell">
								<asp:Button ID="TransactionsListView" bizappid="TransactionsListView" Text="View"
									CssClass="formbutton" UseSubmitBehavior="false" runat="server" />
							</td>
							<td class="btnCell">
								<asp:Button ID="TransactionsListSave" bizappid="TransactionsListSave" Text="Save"
									CssClass="formbutton" runat="server" />
							</td>
							<td class="btnCell">
								<asp:Button ID="TransactionsListDontSave" bizappid="TransactionsListDontSave" Text="Dont Save"
									CssClass="formbutton" runat="server" />
							</td>
							<td class="btnCell">
								<asp:Button ID="TransactionsListCancel" bizappid="TransactionsListCancel" Text="Cancel"
									CssClass="formbutton" runat="server" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<div>
	</form>
</body>
</html>