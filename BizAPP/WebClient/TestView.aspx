<%@ page language="C#" autoeventwireup="true" inherits="TestView, App_Web_testview.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>BizAPP Studio Enterprise</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <asp:Literal runat="server" id="favIcon"></asp:Literal>
	<%--<link rel="SHORTCUT ICON" href="favicon.ico" />--%>
    <script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body class="testviewpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server" style="height: 100%;
	width: 100%" onsubmit="return false;" onclick="closeCalendar(); callClosePopUp( 'delegationpopup' ); callClosePopUp( 'configureruntimeobjectpopup' );">
	<asp:Literal runat="server" ID="TopBanner"></asp:Literal>
	<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
	</div>
	<div bizappid="alertcontainer" id="alertcontainer" runat="server">
	</div>
	<asp:Panel runat="server" ID="Panel1">
		<table bizappid="popup" id="popup" runat="server" style="display: none; position: absolute;
			left: 100px; top: 0px; z-index: 101; border-width: 3; border-style: groove">
			<tr>
				<td>
					<iframe id="popupframe" runat="server" height="100%" width="100%"></iframe>
				</td>
			</tr>
			<tr>
				<td align="right">
					<input type="Button" value="Close" id="closeonapplytext" onclick="closeWindow( '' );return false;"
						runat="server" />
				</td>
			</tr>
		</table>
		<div style="position: absolute; z-index: 101; top: 0px; left: 0px">
			<div id="ContextMenu" bizappid="ContextMenu" style="display: none; position: absolute;">
			</div>
		</div>
		<asp:Panel runat="server" ID="Panel2" bizappid="Panel2" Style="height: 0px; width: 0px;
			position: absolute; left: 0px; top: 0px">
		</asp:Panel>
		<asp:Panel runat="server" ID="Container" bizappid="Container">
		</asp:Panel>
	</asp:Panel>
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
						<span id="Span1" class="scbtnclose" onclick="callClosePopUp( 'steppopupcontainer' );">
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
			<tr onmousedown="callMouseDown( event, 'gridexpandviewpopupcontainer' );" onmousemove="callMouseMove( 'scdetailspopuponmoving' );"
				onmouseup="callMouseUp( 'alertdetailspopup' );">
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
