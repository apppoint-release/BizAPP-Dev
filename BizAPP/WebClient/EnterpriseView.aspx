<%@ page language="C#" autoeventwireup="true" inherits="EnterpriseView, App_Web_enterpriseview.aspx.cdcab7d2" enableviewstate="false" %>

<asp:literal runat="server" id="doctype"></asp:literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<asp:Literal runat="server" ID="favIcon"></asp:Literal>
	<%--<link rel="SHORTCUT ICON" href="favicon.ico" />--%>
	<script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script language="javascript" type="text/javascript">
		function callViewInitialize() {
			//			setResize(true, 'enterpise');
		}
	</script>
</head>
<body onload="initializeStartUp();" onkeydown="ProcessKey( event );" onkeypress="ProcessKey( event );"
	style="margin: 0;" class="enterpriseviewpage">
	<form id="nonajaxform" bizappid="nonajaxform" runat="server" class="BizAPPform" enableviewstate="false"
		onsubmit="return false;" onclick="closeCalendar( ); callSchedulerCalendarDisplay('SchedulerCalendarPopup'); callClosePopUp( 'viewgrouppopup' ); callClosePopUp( 'viewpopup' ); callClosePopUp( 'delegationpopup' ); callClosePopUp( 'configureruntimeobjectpopup' ); callClosePopUp( 'stickynoteconfigurepopup' );"
		onmouseup="callMouseUpOnEnterprisePopupResizing( event );">
		<div enterprise="enterprise" bizappid="enterprise" style="border-color: Green; border-width: 0px; border-style: solid; width: 100%">
			<table bizappid="popup" id="popup" runat="server" style="display: none; position: absolute; left: 100px; top: 0px; z-index: 101; border-style: groove"
				cellpadding="0" cellspacing="0">
				<tr>
					<td valign="top">
						<iframe id="popupframe" runat="server" width="100%"></iframe>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<input type="button" value="close" onclick="closeWindow('');" />
					</td>
				</tr>
			</table>
			<div bizappid="newobjectidentifier" id="newobjectidentifier" runat="server" style="position: absolute;">
			</div>
			<div style="position: absolute; z-index: 101; top: 0px; left: 0px">
				<div id="ContextMenu" bizappid="ContextMenu" style="display: none; position: absolute;">
				</div>
			</div>
			<asp:panel runat="server" id="EnterprisePageHolder" bizappid="EnterprisePageHolder"
				style="position: absolute; height: 0; width: 0">
		</asp:panel>
			<div id="enterpriseshell" bizappid="enterpriseshell" runat="server" style="width: 100%; vertical-align: top;">
				<div class="processingmaskdiv processingimage" style="left: 0px; top: 0px; position: fixed; display: block;"></div>
			</div>
		</div>
		<div bizappid="forcefocuscontainer" id="forcefocuscontainer" runat="server">
		</div>
		<div bizappid="delegationpopup" id="delegationpopup" style="position: absolute;"
			runat="server">
		</div>
		<div bizappid="configcontrolid" id="configcontrolid" style="position: absolute; display: none;"
			runat="server">
		</div>
		<div bizappid="configureruntimeobjectpopup" id="configureruntimeobjectpopup" style="position: absolute;"
			runat="server">
		</div>
		<div bizappid="stickynoteconfigurepopup" id="stickynoteconfigurepopup" style="position: absolute;"
			runat="server">
		</div>
		<div bizappid="recentviewpopup" style="position: absolute; display: none;">
		</div>
		<div id="contextmenupopupcontainer" bizappid="contextmenupopupcontainer" style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup"
			onclick="if( event )event.cancelBubble=true;">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'contextmenupopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 92%; text-align: left; padding-left: 10px;" class="gridexpandheader">
						<nobr>Add To Favourites</nobr>
					</td>
					<td style="text-align: right;" class="gridexpandheader">
						<div align="right">
							<span id="Span1" class="scbtnclose" onclick="callClosePopUp( 'contextmenupopupcontainer' );"></span>
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
					<td style="text-align: right;" class="gridexpandheader" colspan="2"></td>
				</tr>
			</table>
		</div>
		<div bizappid="stickynotepopup" id="stickynotepopup" runat="server">
		</div>
		<div bizappid="alertpopup" id="alertpopup" runat="server">
		</div>
		<div bizappid="jobcontrolpopupcontainer" id="jobcontrolpopupcontainer" style="position: absolute; display: none;"
			runat="server">
		</div>
		<div bizappid="pendingjobsinfopopupcontainer" id="pendingjobsinfopopupcontainer"
			style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup" runat="server">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'pendingjobsinfopopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 10px;" class="gridexpandheader"></td>
					<td style="text-align: right;" class="gridexpandheader">
						<div>
							<asp:label cssclass="scbtnclose" runat="server" onclick="callClosePopUp( 'pendingjobsinfopopupcontainer' );"></asp:label>
						</div>
					</td>
				</tr>
				<tr>
					<td style="width: 10px;"></td>
					<td>
						<div bizappid="pendingjobsinfopopup" id="pendingjobsinfopopup" runat="server">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div id="steppopupcontainer" bizappid="steppopupcontainer" style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup"
			onclick="if( event )event.cancelBubble=true;">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'steppopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 92%; text-align: left; padding-left: 10px;" class="gridexpandheader">
						<nobr>Promote</nobr>
					</td>
					<td style="text-align: right;" class="gridexpandheader">
						<div align="right">
							<span id="Span3" class="scbtnclose" onclick="callClosePopUp( 'steppopupcontainer' );"></span>
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
					<td style="text-align: right;" class="gridexpandheader" colspan="2"></td>
				</tr>
			</table>
		</div>
		<div id="customchartpopupcontainer" bizappid="customchartpopupcontainer" style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup"
			onclick="if( event )event.cancelBubble=true;">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'customchartpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 92%; text-align: left; padding-left: 10px;" class="gridexpandheader">
						<nobr>Select a groupby field</nobr>
					</td>
					<td style="text-align: right;" class="gridexpandheader">
						<div align="right">
							<span id="Span4" class="scbtnclose" onclick="callClosePopUp( 'customchartpopupcontainer' );"></span>
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
					<td style="text-align: right;" class="gridexpandheader" colspan="2"></td>
				</tr>
			</table>
		</div>
		<div bizappid="businessobjectformpopupcontainer" id="businessobjectformpopupcontainer"
			style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup" runat="server">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'businessobjectformpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 10px;" class="gridexpandheader"></td>
					<td style="text-align: right;" class="gridexpandheader">
						<div>
							<asp:label cssclass="scbtnclose" runat="server" onclick="callClosePopUp( 'businessobjectformpopupcontainer' );"></asp:label>
						</div>
					</td>
				</tr>
				<tr>
					<td style="width: 10px;"></td>
					<td>
						<div bizappid="businessobjectformpopup" id="businessobjectformpopup" runat="server">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div bizappid="gridexpandviewpopupcontainer" id="gridexpandviewpopupcontainer" style="display: none; position: absolute; border: solid 1 Black; background-color: White;"
			class="alertdetailspopup"
			runat="server" onclick="if( event )event.cancelBubble=true;">
			<table cellpadding="0" cellspacing="0">
				<tr onmousedown="callMouseDown( event, 'gridexpandviewpopupcontainer' );" onmouseup="callMouseUp( 'alertdetailspopup' );">
					<td style="width: 10px;" class="gridexpandheader"></td>
					<td style="text-align: right;" class="gridexpandheader">
						<div align="right">
							<asp:label id="Label1" cssclass="scbtnclose" runat="server" onclick="callClosePopUp( 'gridexpandviewpopupcontainer' );"></asp:label>
						</div>
					</td>
				</tr>
				<tr>
					<td style="width: 10px;"></td>
					<td>
						<div bizappid="gridexpandviewpopup" id="gridexpandviewpoup" runat="server">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div bizappid="profilercontainer" id="profilercontainer" style="display: none; position: absolute; border: Solid  3px #CCC; background-color: White;"
			class="alertdetailspopup"
			onclick="if( event )event.cancelBubble=true;">
			<table>
				<tr class="gridexpandheader" onmousedown="callMouseDown( event, 'profilercontainer' );"
					onmouseup="callMouseUp( 'alertdetailspopup' );" style="border-bottom: Solid  3px #CCC">
					<td style="text-align: left; padding-left: 3px;">Profile Data
					</td>
					<td>
						<div align="right">
							<span class="scbtnclose" onclick="callClosePopUp( 'profilercontainer' );"></span>
						</div>
					</td>
				</tr>
				<tr style="height: 500px; max-height: 500px; overflow: auto;">
					<td colspan="2">
						<div id="profilerDataContainer" style="overflow: auto;">
						</div>
					</td>
				</tr>
				<tr class="gridexpandheader" style="height: 20px; border-bottom: Solid  3px #CCC">
					<td colspan="2"></td>
				</tr>
			</table>
		</div>
		<div bizappid="backgroundmasker" id="backgroundmasker" style="display: none; position: absolute; background-color: Transparent; filter: alpha(opacity=0);"
			runat="server">
		</div>
		<div bizappid="replaceholder">
		</div>
	</form>
	<iframe id="postbackframe" bizappid="postbackframe" style="width: 1px; height: 1px; display: none;"
		runat="server"></iframe>
</body>
</html>
