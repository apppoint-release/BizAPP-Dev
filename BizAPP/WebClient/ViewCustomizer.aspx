<%@ page language="C#" autoeventwireup="true" inherits="ViewCustomizer, App_Web_viewcustomizer.aspx.cdcab7d2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>View Customizer</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/jquery/jquery-ui.js" ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<link href="<%= Page.ResolveUrl( "~/Resources/crm/jquery/jquery-ui.css" ) %>" rel="Stylesheet" />
	
	<style type="text/css">
		.leftbar
		{
			padding: 5px;
		}
		table
		{
			width: 100%;
			border-collapse: collapse;
		}
		.leftbar td, .leftbar th
		{
			height: 20px;
		}
		.toolbar
		{
		}
		#pnlToolBar div, #pnlPQ div, #pnlPC div
		{
			margin: 1px;
			border: solid 1px gray;
			cursor: pointer;
			padding: 2px;
		}
		.selectedCell
		{
			border: solid Red 1px;
			background: gray;
			color: White;
		}
		input
		{
			border: solid 1px Gray;
		}
		.content div
		{
			padding: 5px;
		}
		.mockui td
		{
			min-width: 25%;
			width: 25%;
		}
		button
		{
			background: #555;
			color: White;
			padding: 0px;
		}
		td
		{
			padding-left: 5px;
		}
	</style>
</head>
<body>
	<form id="form1" runat="server">
	<table>
		<tr valign="top">
			<td class="viewheader contact" colspan="2">
				<div class="viewtype">
					View Customizer</div>
				<div class="viewdescription">
					Home</div>
			</td>
		</tr>
		<tr valign="top">
			<td colspan="2">
				<span>Customized View Name:</span>
				<input id="vcnameTB" />
				<button onclick="return Save(event);">
					Save</button>
				<button onclick="return mergeRow(event);" style="display: none;">
					merge row</button>
			</td>
		</tr>
		<tr valign="top">
			<td width="75%">
				<div class="leftbar">
					<div class="container">
						<div class="mainheader">
							Master View Map
						</div>
						<div class="contents">
							<div>
								<asp:Table ID="tableMVM" runat="server" border="1" CellPadding="0" CellSpacing="0"
									onclick="selectMVMCell(event);">
									<asp:TableHeaderRow>
										<asp:TableHeaderCell>Key</asp:TableHeaderCell><asp:TableHeaderCell>Value</asp:TableHeaderCell>
									</asp:TableHeaderRow>
								</asp:Table>
								<br />
								<fieldset>
									<legend>Input text for the selected cell.</legend>
									<input id="mvmTB" />
									<button onclick="return addCust(event, $('#mvmTB').val());">
										Add</button>
									<button onclick="return addCust(event, '<!--customizeview-->');">
										Add Customizer</button>
									<button onclick="return addCust(event, 'body');">
										Add Customization</button></fieldset>
							</div>
						</div>
						<div class="right">
							<div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="mainheader">
							<table>
								<tr>
									<td>
										View Customization Map
									</td>
									<td>
										<div style="float: right;">
											<button onclick="return addRow(event);">
												Add Row</button>
											<button onclick="return mergeCell(event);">
												Merge</button>
											<button onclick="return clearCell(event);">
												Clear</button>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div class="contents">
							<div>
								<div class="mockui">
									<table border="1" cellpadding="0" cellspacing="0" onclick="selectCell(event);">
										<tr>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
										</tr>
										<tr>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
										</tr>
										<tr>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
											<td>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="right">
							<div>
							</div>
						</div>
					</div>
				</div>
			</td>
			<td width="25%">
				<div class="toolbar">
					<div class="dheader warning">
						Controls List</div>
					<div class="dbody">
						<h3>
							<a href="#">ViewDef Controls</a></h3>
						<asp:Panel ID="pnlToolBar" runat="server">
						</asp:Panel>
						<h3>
							<a href="#">Personalised Queries</a></h3>
						<asp:Panel ID="pnlPQ" runat="server">
						</asp:Panel>
						<%--<h3>
							<a href="#">Personalised Charts</a></h3>
						<asp:Panel ID="pnlPC" runat="server">
						</asp:Panel>--%>
					</div>
				</div>
			</td>
		</tr>
	</table>
	</form>

	<script type="text/javascript">
		var g_mvmCell;
		function addCust(event, a)
		{
			if (g_mvmCell)
			{
				a = a.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				$(g_mvmCell).html(a);
			}
			else
				alert('select a cell to add the value to.');

			event.cancelBubble = true;
			return false;
		}

		function selectMVMCell(event)
		{
			$('#tableMVM td').removeClass('selectedCell')

			var cell = getSourceElement(event);
			if (cell.nodeName.toLowerCase() == 'td' && cell.cellIndex == 1)
			{
				g_mvmCell = cell;
				$(cell).addClass('selectedCell');
			}
		}

		$('button').addClass('lnkbtn');
		$('#pnlToolBar div').click(function() { selectControl(this,false); });
		$('#pnlPQ div').click(function() { selectControl(this,true); });
//		$('#pnlPC div').click(function() { selectControl(this,true); });
		$(".dbody").accordion();
		
		function selectControl(ctrl, useValue)
		{
			if (g_Cell)
			{
				if (useValue)
					$(g_Cell).html('&lt;!--' + $(ctrl).attr('value') + '--&gt;');
				else
					$(g_Cell).html('&lt;!--' + $(ctrl).html() + '--&gt;');
			}
		}

		var g_Cell;
		function selectCell(event)
		{
			$('.mockui td').removeClass('selectedCell')

			var cell = getSourceElement(event);
			if (cell.nodeName.toLowerCase() == 'td')
			{
				g_Cell = cell;
				$(cell).addClass('selectedCell');
			}
		}
		function Save(event)
		{
			var args = new Array();
			var i = 0;

			args[i] = 'CreatePersonalisedView'; i++;
			args[i] = g_chc; i++;
			args[i] = $('#vcnameTB').val(); i++;

			$('#tableMVM tr').each(function()
			{
				if (this.cells[0].nodeName.toLowerCase() == 'td')
				{
					if ($(this.cells[1]).html() == 'body')
					{
						args[i] = $(this.cells[0]).html() + '[VS]' + '<table cellspacing="0" cellpadding ="0" class="fill">' + $('.mockui table').html() + '</table>';
						i++;
					}
					else
					{
						var a = $(this.cells[1]).html();
						if (a)
						{
							args[i] = $(this.cells[0]).html() + '[VS]' + a;
							i++;
						}
					}
				}
			});

			ajaxAsyncCall('ViewCustomizerEx', args, false, true);
			event.cancelBubble = true;
			return false;
		}
		function addRow(event)
		{
			var table = $('.mockui table')[0];
			var row = table.insertRow(table.rows.length);
			for (var i = 0; i < 4; i++)
				var cell = row.insertCell(i);

			event.cancelBubble = true;
			return false;
		}
		function mergeCell(event)
		{
			var row = g_Cell.parentNode;
			if (g_Cell && row.cells.length > 1 && g_Cell.cellIndex + 1 < row.cells.length)
			{
				var nextSpan = row.cells[g_Cell.cellIndex + 1].colSpan;
				row.deleteCell(row.cells.length - 1);
				if (nextSpan)
					g_Cell.colSpan += nextSpan;
				else
					g_Cell.colSpan += 1;
			}
			event.cancelBubble = true;
			return false;
		}
		function clearCell(event)
		{
			if (g_Cell)
				$(g_Cell).html('');
			event.cancelBubble = true;
			return false;
		}
		function getSourceElement(event)
		{
			if (event.srcElement)
				return event.srcElement;
			else if (event.target)
				return event.target;
		}
	</script>

</body>
</html>
