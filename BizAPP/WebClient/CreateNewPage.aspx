<%@ page language="C#" autoeventwireup="true" inherits="Controls_CreateNewPage, App_Web_createnewpage.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Create New</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body onload="initializeStartUp();" onclick="hidePopups(); callClosePopUp( 'delegationpopup' ); callClosePopUp( 'configureruntimeobjectpopup' ); callClosePopUp( 'stickynoteconfigurepopup' );"
	style="width: 100%; height: 100%" class="createnewpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server" style="margin: 0px;
	padding: 0px; width: 100%; height: 100%" enableviewstate="false">
	<asp:Panel runat="server" ID="HeaderPanel" bizappid="HeaderPanel" Style="height: 100%;
		width: 100%; left: 0px; top: 0px; position:absolute;">
	</asp:Panel>
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<div bizappid="alertcontainer" id="alertcontainer" runat="server">
	</div>
	<div style="position: absolute; z-index: 101; top: 0px; left: 0px">
		<div id="ContextMenu" bizappid="ContextMenu" style="display: none;">
		</div>
	</div>
	<div bizappid="Calendar" id="Calendar" runat="server" style="display: none; position: absolute;
		left: 0px; top: 0px; background-color: white; z-index: 101; border-width: 3;
		border-style: groove">
		<iframe id="CalendarFrame" runat="server" height="180px" width="200px"></iframe>
	</div>
	<asp:Panel runat="server" ID="Panel2" bizappid="Panel2" Style="height: 0px; width: 0px;
		position: absolute; left: 0px; top: 0px">
	</asp:Panel>
	<div runat="server" id="ViewContainer">
	</div>
	<asp:Literal runat="server" ID="SizeResolver"></asp:Literal>
	<asp:Literal runat="server" ID="closeWindow"></asp:Literal>
	<div bizappid="delegationpopup" id="delegationpopup" style="position: absolute;"
		runat="server">
	</div>
	<div bizappid="configureruntimeobjectpopup" id="configureruntimeobjectpopup" style="position: absolute;"
		runat="server">
	</div>
	<div bizappid="stickynoteconfigurepopup" id="stickynoteconfigurepopup" style="position: absolute;"
		runat="server">
	</div>
	<div bizappid="stickynotepopup" id="stickynotepopup" runat="server">
	</div>
	<div bizappid="jobcontrolpopupcontainer" id="jobcontrolpopupcontainer" style="position: absolute; display: none;" runat="server">
	</div>
	<div bizappid="recentviewpopup" style="position: absolute; display:none;">
	</div>
	<div id="contextmenupopupcontainer" bizappid="contextmenupopupcontainer" style="display: none;
		position: absolute; border: solid 1 Black; background-color: White;" class="alertdetailspopup"
		onclick="if( event )event.cancelBubble=true;">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'contextmenupopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 92%; text-align:left; padding-left:10px; " class="gridexpandheader">
					<nobr>Add To Favourites</nobr>
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div align="right">
						<span id="Span1" class="scbtnclose" onclick="callClosePopUp( 'contextmenupopupcontainer' );">
						</span>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div style="padding-left: 10px; padding-top: 10px;" id="contextmenupopup" bizappid="contextmenupopup">
					</div>
				</td>
			</tr>
			<tr>
				<td style="text-align: right;" class="gridexpandheader" colspan="2">
				</td>
			</tr>
		</table>
	</div>
	<div id="steppopupcontainer" bizappid="steppopupcontainer" style="display: none;
		position: absolute; border: solid 1 Black; background-color: White;" class="alertdetailspopup"
		onclick="if( event )event.cancelBubble=true;">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'steppopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 92%; text-align: left; padding-left: 10px;" class="gridexpandheader">
					<nobr>Promote</nobr>
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div align="right">
						<span id="Span3" class="scbtnclose" onclick="callClosePopUp( 'steppopupcontainer' );">
						</span>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div style="padding-left: 10px; padding-top: 10px;" id="steppopup" bizappid="steppopup">
					</div>
				</td>
			</tr>
			<tr>
				<td style="text-align: right;" class="gridexpandheader" colspan="2">
				</td>
			</tr>
		</table>
	</div>
	<div id="customchartpopupcontainer" bizappid="customchartpopupcontainer" style="display: none;
		position: absolute; border: solid 1 Black; background-color: White;" class="alertdetailspopup"
		onclick="if( event )event.cancelBubble=true;">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'customchartpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 92%; text-align: left; padding-left: 10px;" class="gridexpandheader">
					<nobr>Select a groupby field</nobr>
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div align="right">
						<span id="Span4" class="scbtnclose" onclick="callClosePopUp( 'customchartpopupcontainer' );">
						</span>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div style="padding-left: 10px; padding-top: 10px;" id="customchartpopup" bizappid="customchartpopup">
					</div>
				</td>
			</tr>
			<tr>
				<td style="text-align: right;" class="gridexpandheader" colspan="2">
				</td>
			</tr>
		</table>
	</div>
	<div bizappid="pendingjobsinfopopupcontainer" id="pendingjobsinfopopupcontainer"
		style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
		class="alertdetailspopup" runat="server">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'pendingjobsinfopopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 10px;" class="gridexpandheader">
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div>
						<asp:Label CssClass="scbtnclose" runat="server" onclick="callClosePopUp( 'pendingjobsinfopopupcontainer' );"></asp:Label>
					</div>
				</td>
			</tr>
			<tr>
				<td style="width: 10px;">
				</td>
				<td>
					<div bizappid="pendingjobsinfopopup" id="pendingjobsinfopopup" runat="server">
					</div>
				</td>
			</tr>
		</table>
	</div>
	<div bizappid="businessobjectformpopupcontainer" id="businessobjectformpopupcontainer"
		style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
		class="alertdetailspopup" runat="server">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'businessobjectformpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 10px;" class="gridexpandheader">
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div>
						<asp:Label CssClass="scbtnclose" runat="server" OnClick="callClosePopUp( 'businessobjectformpopupcontainer' );"></asp:Label>
					</div>
				</td>
			</tr>
			<tr>
				<td style="width: 10px;">
				</td>
				<td>
					<div bizappid="businessobjectformpopup" id="Div2" runat="server">
					</div>
				</td>
			</tr>
		</table>
	</div>
	<div bizappid="gridexpandviewpopupcontainer" id="gridexpandviewpopupcontainer" style="display: none;
		position: absolute; border: solid 1 Black; background-color: White;" class="alertdetailspopup"
		runat="server" onclick="if( event )event.cancelBubble=true;">
		<table cellpadding="0" cellspacing="0">
			<tr onmousedown="callMouseDown( event, 'gridexpandviewpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
				<td style="width: 10px;" class="gridexpandheader">
				</td>
				<td style="text-align: right;" class="gridexpandheader">
					<div>
						<asp:Label ID="Label1" CssClass="scbtnclose" runat="server" OnClick="callClosePopUp( 'gridexpandviewpopupcontainer' );"></asp:Label>
					</div>
				</td>
			</tr>
			<tr>
				<td style="width: 10px;">
				</td>
				<td>
					<div bizappid="gridexpandviewpopup" id="gridexpandviewpoup" runat="server">
					</div>
				</td>
			</tr>
		</table>
	</div>
		<div bizappid="backgroundmasker" id="backgroundmasker" style="display: none; position: absolute;
		background-color: White; filter: alpha(opacity=0);" runat="server">
	</div>
	</form>
	<iframe id="postbackframe" bizappid="postbackframe" style="width: 1px; height: 1px;
		display: none;" runat="server"></iframe>
</body>
</html>
