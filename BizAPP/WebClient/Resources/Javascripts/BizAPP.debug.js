/*!*
* Copyright (C) 2000 - 2011, AppPoint Software Solutions.
* The program code and other information contained herein are not for public use, 
* include confidential and proprietary information owned by AppPoint Software Solutions. 
* Any reproduction, disclosure, reverse engineering, in whole or in part, is prohibited 
* unless with prior explicit written consent of AppPoint Software Solutions. 
*
* This software is protected by local Copyright law, patent law, and international treaties.
* Unauthorized reproduction or distribution may be subject to civil and criminal penalties and is 
* strictly prohibited. Portions of this program code, documentation, processes, and information 
* could be patent pending.
* 
**/

/***--Ajax.js--***/
var callServer;
var sourceObj;
var ajaxArgs;
var sourceId;
var requestId = 0, loginusingbizappoauth = '';

var popUpControls = new Array();
var nonAjaxRequests = new Array();
var delegateControls = new Array();
var enterpriseBody;
var enableAjax = true;
var g_customAjax = true, g_useJSONForCustomAjax = true, g_forceSyncCalls = false;
var g_enableLog = false;
var g_activeCtrl = null;
var g_locked = false;
var exceptionStack = '';
var logStack = '';

var isPopupCalledBySilverlight = false;
var popupCallBackElementId = '';
var popupCallBackElementDetails = '';
var dependentFiles = new Array();
var onMessageCallbacks = {};
var sessions = {};

function getControlToReplace($view) {
	var $parent = $view.parent();

	var $vid = $view.attr('id');

	var $pid = $parent.attr('id');
	var $tid = $parent.attr('bza_targetid');

	while ($vid && ($vid == $pid || $vid == $tid)) {
		$view = $view.parent();
		var $parent = $view.parent();

		$pid = $view.parent().attr('id');
		$tid = $parent.attr('bza_targetid');
	}
	return $view;
}

function refreshTargetFrame(frameId, source) {
	if (!frameId && !source) {
		var frame = document.getElementById(frameId);
		if (!frame)
			frame.setAttribute("src", source);
	}
}

function validateJavaAuthenticationControl(msg, minVersion) {
	var appletContainerId = document.getElementById('BizAPPAuthenticationControlContainer');
	var AuthenticationContainer = document.getElementById('AuthenticationContainer');
	appletContainerId.style.display = 'none';
	AuthenticationContainer.style.display = 'block';
	var macAddress;

	if (deployJava && deployJava.versionCheck(minVersion + '+')) {
		var appletControl = document.getElementById('BizAPPAuthenticationControl');

		if (appletControl) {
			var macIdHolder = document.getElementById("MacIdHolder");

			if (macIdHolder) {
				macIdHolder.value = macAddress = '';
				try {
					do { } while (!appletControl.getIsReady());
					var listOfMacIds = appletControl.getMacAddresses().split(',');
					var listOf4Ips = appletControl.getIpV4Addresses().split(',');
					var listOf6Ips = appletControl.getIpV6Addresses().split(',');

					if (listOf4Ips.length > 0 && listOfMacIds.length == listOf4Ips.length && listOf4Ips.length == listOf6Ips.length) {
						for (var i = 0; i < listOfMacIds.length; i++) {
							var macId = listOfMacIds[i];
							var Ipf = listOf4Ips[i];
							var Ips = listOf6Ips[i];

							if (macId && Ipf && Ips)
								macAddress += macId + ',' + Ipf + ',' + Ips + ';';
						}
					}
					macIdHolder.value = macAddress;
				}
				catch (Error) {
					logError('failed to get macid.', Error);
				}
			}
		}
	}
	else {
		//$(appletContainerId).html('<span style="color:white;">' + msg.format(minVersion) + '</span>');
		logError(msg.format(minVersion));
	}
}
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined'
			? args[number]
			: '{' + number + '}'
			;
	});
};
if (!String.prototype.encodeHTML) {
	String.prototype.encodeHTML = function () {
		return this.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	};
}
if (g_customAjax) {
	//ajaxpro defines these methods in prototype.ashx file
	String.prototype.startsWith = function (a) { return this.substr(0, a.length) === a }
	String.prototype.endsWith = function (s) { return this.length >= s.length && this.substr(this.length - s.length) == s; };
	String.prototype.trimLeft = function () { return this.replace(/^\s*/, ''); };
	String.prototype.trimRight = function () { return this.replace(/\s*$/, ''); };
	String.prototype.trim = function () { return this.trimRight().trimLeft(); };
}

//#region JqueryExtensions
function jqExtns() {
	if (typeof jQuery != 'undefined') {
		if (!jQuery.cachedScript) {
			$(document).ajaxSend(function (event, jqxhr, settings) {
				$.ajax.mostRecentCall = jqxhr;
				$.ajax.mostRecentCall.settings = settings;
			});

			jQuery.cachedScript = function (url, options) {

				// allow user to set any option except for dataType, cache, and url
				options = $.extend(options || {}, {
					dataType: "script",
					cache: true,
					url: url
				});

				// Use $.ajax() since it is more flexible than $.getScript
				// Return the jqXHR object so we can chain callbacks
				return jQuery.ajax(options);
			};
		}

		if (!$.getCss)
			$.extend({
				getCss: function (url, callback, position) {
					if (isIE() == 8) {
						$('style[url="' + url + '"]').remove();
						$.get(url, function (data) {
							$('head').append('<style url="' + url + '">' + data + '</style>');
							if (typeof callback == 'function') callback();
						})
					}
					else {
						$('link[href="' + url + '"]').remove();
						if (position)
							var a = $(position);
						if (a && a.length > 0)
							$('<link>', { rel: 'stylesheet', type: 'text/css', 'href': url, 'media': 'screen' }).on('load', function () {
								if (typeof callback == 'function') callback();
							}).insertBefore(position);
						else
							$('<link>', { rel: 'stylesheet', type: 'text/css', 'href': url, 'media': 'screen' }).on('load', function () {
								if (typeof callback == 'function') callback();
							}).appendTo('head');
					}
				}
			});

		$.fn.findSelf = function (b) {
			var a = this.find(b);
			return (this.is(b)) ? a.add(this) : a
		}
	}
}
jqExtns();
//#endregion

function callGetCurrentTimeZoneName1() {
	tmSummer = new Date(Date.UTC(2001, 6, 30, 0, 0, 0, 0));
	so = -1 * tmSummer.getTimezoneOffset();
	tmWinter = new Date(Date.UTC(2001, 12, 30, 0, 0, 0, 0));
	wo = -1 * tmWinter.getTimezoneOffset();

	var currentTimeZone = "Greenwich Standard Time";

	if (so == 0 && wo == 0)
		currentTimeZone = "Morocco Standard Time";
	else if (so == 60 && wo == 0)
		currentTimeZone = "GMT Standard Time";
	else if (so == 0 && wo == 0)
		currentTimeZone = "Greenwich Standard Time";
	else if (so == 120 && wo == 60)
		currentTimeZone = "W. Europe Standard Time";
	else if (so == 120 && wo == 60)
		currentTimeZone = "Central Europe Standard Time";
	else if (so == 120 && wo == 60)
		currentTimeZone = "Romance Standard Time";
	else if (so == 120 && wo == 60)
		currentTimeZone = "Central European Standard Time";
	else if (so == 60 && wo == 60)
		currentTimeZone = "W. Central Africa Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "Jordan Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "GTB Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "Middle East Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "Egypt Standard Time";
	else if (so == 120 && wo == 120)
		currentTimeZone = "South Africa Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "FLE Standard Time";
	else if (so == 120 && wo == 120)
		currentTimeZone = "Israel Standard Time";
	else if (so == 180 && wo == 120)
		currentTimeZone = "E. Europe Standard Time";
	else if (so == 60 && wo == 120)
		currentTimeZone = "Namibia Standard Time";
	else if (so == 240 && wo == 180)
		currentTimeZone = "Arabic Standard Time";
	else if (so == 180 && wo == 180)
		currentTimeZone = "Arab Standard Time";
	else if (so == 240 && wo == 180)
		currentTimeZone = "Russian Standard Time";
	else if (so == 180 && wo == 180)
		currentTimeZone = "E. Africa Standard Time";
	else if (so == 180 && wo == 180)
		currentTimeZone = "Georgian Standard Time";
	else if (so == 270 && wo == 210)
		currentTimeZone = "Iran Standard Time";
	else if (so == 240 && wo == 240)
		currentTimeZone = "Arabian Standard Time";
	else if (so == 300 && wo == 240)
		currentTimeZone = "Azerbaijan Standard Time";
	else if (so == 240 && wo == 240)
		currentTimeZone = "Mauritius Standard Time";
	else if (so == 300 && wo == 240)
		currentTimeZone = "Caucasus Standard Time";
	else if (so == 270 && wo == 270)
		currentTimeZone = "Afghanistan Standard Time";
	else if (so == 360 && wo == 300)
		currentTimeZone = "Ekaterinburg Standard Time";
	else if (so == 300 && wo == 300)
		currentTimeZone = "Pakistan Standard Time";
	else if (so == 300 && wo == 300)
		currentTimeZone = "West Asia Standard Time";
	else if (so == 330 && wo == 330)
		currentTimeZone = "India Standard Time";
	else if (so == 330 && wo == 330)
		currentTimeZone = "Sri Lanka Standard Time";
	else if (so == 345 && wo == 345)
		currentTimeZone = "Nepal Standard Time";
	else if (so == 420 && wo == 360)
		currentTimeZone = "N. Central Asia Standard Time";
	else if (so == 360 && wo == 360)
		currentTimeZone = "Central Asia Standard Time";
	else if (so == 390 && wo == 390)
		currentTimeZone = "Myanmar Standard Time";
	else if (so == 420 && wo == 420)
		currentTimeZone = "SE Asia Standard Time";
	else if (so == 480 && wo == 420)
		currentTimeZone = "North Asia Standard Time";
	else if (so == 480 && wo == 480)
		currentTimeZone = "China Standard Time";
	else if (so == 540 && wo == 480)
		currentTimeZone = "North Asia East Standard Time";
	else if (so == 480 && wo == 480)
		currentTimeZone = "Singapore Standard Time";
	else if (so == 480 && wo == 480)
		currentTimeZone = "W. Australia Standard Time";
	else if (so == 480 && wo == 480)
		currentTimeZone = "Taipei Standard Time";
	else if (so == 540 && wo == 540)
		currentTimeZone = "Tokyo Standard Time";
	else if (so == 540 && wo == 540)
		currentTimeZone = "Korea Standard Time";
	else if (so == 600 && wo == 540)
		currentTimeZone = "Yakutsk Standard Time";
	else if (so == 570 && wo == 630)
		currentTimeZone = "Cen. Australia Standard Time";
	else if (so == 570 && wo == 570)
		currentTimeZone = "AUS Central Standard Time";
	else if (so == 600 && wo == 600)
		currentTimeZone = "E. Australia Standard Time";
	else if (so == 600 && wo == 660)
		currentTimeZone = "AUS Eastern Standard Time";
	else if (so == 600 && wo == 600)
		currentTimeZone = "West Pacific Standard Time";
	else if (so == 600 && wo == 660)
		currentTimeZone = "Tasmania Standard Time";
	else if (so == 660 && wo == 600)
		currentTimeZone = "Vladivostok Standard Time";
	else if (so == 660 && wo == 660)
		currentTimeZone = "Central Pacific Standard Time";
	else if (so == 720 && wo == 780)
		currentTimeZone = "New Zealand Standard Time";
	else if (so == 720 && wo == 720)
		currentTimeZone = "Fiji Standard Time";
	else if (so == 780 && wo == 780)
		currentTimeZone = "Tonga Standard Time";
	else if (so == 0 && wo == -60)
		currentTimeZone = "Azores Standard Time";
	else if (so == -60 && wo == -60)
		currentTimeZone = "Cape Verde Standard Time";
	else if (so == -60 && wo == -120)
		currentTimeZone = "Mid-Atlantic Standard Time";
	else if (so == -180 && wo == -120)
		currentTimeZone = "E. South America Standard Time";
	else if (so == -180 && wo == -180)
		currentTimeZone = "Argentina Standard Time";
	else if (so == -180 && wo == -180)
		currentTimeZone = "SA Eastern Standard Time";
	else if (so == -120 && wo == -180)
		currentTimeZone = "Greenland Standard Time";
	else if (so == -180 && wo == -120)
		currentTimeZone = "Montevideo Standard Time";
	else if (so == -150 && wo == -210)
		currentTimeZone = "Newfoundland Standard Time";
	else if (so == -180 && wo == -240)
		currentTimeZone = "Atlantic Standard Time";
	else if (so == -240 && wo == -240)
		currentTimeZone = "SA Western Standard Time";
	else if (so == -240 && wo == -180)
		currentTimeZone = "Central Brazilian Standard Time";
	else if (so == -240 && wo == -180)
		currentTimeZone = "Pacific SA Standard Time";
	else if (so == -270 && wo == -270)
		currentTimeZone = "Venezuela Standard Time";
	else if (so == -300 && wo == -300)
		currentTimeZone = "SA Pacific Standard Time";
	else if (so == -240 && wo == -300)
		currentTimeZone = "Eastern Standard Time";
	else if (so == -300 && wo == -300)
		currentTimeZone = "US Eastern Standard Time";
	else if (so == -360 && wo == -360)
		currentTimeZone = "Central America Standard Time";
	else if (so == -300 && wo == -360)
		currentTimeZone = "Central Standard Time";
	else if (so == -300 && wo == -360)
		currentTimeZone = "Central Standard Time (Mexico)";
	else if (so == -360 && wo == -360)
		currentTimeZone = "Canada Central Standard Time";
	else if (so == -420 && wo == -420)
		currentTimeZone = "US Mountain Standard Time";
	else if (so == -360 && wo == -420)
		currentTimeZone = "Mountain Standard Time (Mexico)";
	else if (so == -360 && wo == -420)
		currentTimeZone = "Mountain Standard Time";
	else if (so == -420 && wo == -480)
		currentTimeZone = "Pacific Standard Time";
	else if (so == -420 && wo == -480)
		currentTimeZone = "Pacific Standard Time (Mexico)";
	else if (so == -480 && wo == -540)
		currentTimeZone = "Alaskan Standard Time";
	else if (so == -600 && wo == -600)
		currentTimeZone = "Hawaiian Standard Time";
	else if (so == -660 && wo == -660)
		currentTimeZone = "Samoa Standard Time";
	else if (so == -720 && wo == -720)
		currentTimeZone = "Dateline Standard Time";

	return currentTimeZone;
}
function callGetCurrentTimeZoneName() {
	BizAPP.Session.SetTimeZone(callGetCurrentTimeZoneName1());
}

function initializeDebugConsole(showConsole) {
	if (showConsole == true || showConsole == "true")
		callShowLogs();
}

function clearExceptionLog(eve) {
	exceptionStack = "";
	callShowErrors();
}

function clearLog(eve) {
	logStack = "";
	callShowLogs();
}

function addExceptionLog(errorLog) {
	var excp1 = '', tab = ''; $.each(errorLog.split('Message:'), function (i, n) {
		if (n) {
			excp1 += '\n' + tab + 'Message:' + n.replace(/\n/g, '\n' + tab); tab += '\t'
		}
	});
	errorLog = excp1;
	if (window.dialogArguments)
		window.dialogArguments.exceptionStack = '<font color="red"  size="3">*** Exception Stack Begin***\n</font>' + errorLog + '\n<font color="red"  size="3">*** Exception Stack End***</font>\n\n' + '\n\n' + window.dialogArguments.exceptionStack;
	else
		exceptionStack = '<font color="red"  size="3">*** Exception Stack Begin***\n</font>' + errorLog + '\n<font color="red"  size="3">*** Exception Stack End***</font>\n\n' + '\n\n' + exceptionStack;

	//need to handle showing logs if popup is already open
	//    if (document.location.pathname.toLowerCase().endsWith("login.aspx"))
	//        callShowErrors();
}
function logError(msg, Error) {
	if (Error) {
		if (isIE())
			addLog(msg + ' : ' + Error.name + ' : ' + Error.message, true);
		else
			addLog(msg + ' : ' + Error.toString(), true);
	}
	else
		addLog(msg, true);
}
function addLog(log, isErr) {
	if (g_enableLog || location.href.toLowerCase().indexOf('enterpriseview.aspx') == -1) {
		//need to handle showing logs if popup is already open
		if (isErr)
			log = '<font color=Red>\n' + log + '</font>';
		logStack = log + logStack;
		if (typeof console != "undefined") {
			if (isErr)
				console.error(log);
			else
				console.info(log);
		}
	}
}

function setAjaxTimeout(milliSec) {
	try {
		if (typeof AjaxPro != 'undefined') {
			AjaxPro.timeoutPeriod = milliSec;
		}
	}
	catch (Error) {
		logError('Set Ajax Timeout failed', Error);
	}
}

function getNextRequestId() {
	requestId++;
	return requestId;
}
function getCurrentRequestId() {
	return requestId;
}

/***--Collapse.js--***/

function callMinimize(id) {
	toggle(id);
}
function expand(ele, height, width) {
	if (isIE()) {
		if (ele.getAttribute("maximized") != "true") {
			ele.setAttribute("maximized", "true");
			ele.setAttribute("orileft", ele.style.left);
			ele.setAttribute("oritop", ele.style.top);

			ele.style.zIndex = 110;

			if (ele.style.pixelHeight == 0) {
				var parent = getValidSizedParent(ele);
				ele.setAttribute("oriheight", parent.style.pixelHeight);
				ele.setAttribute("oriwidth", parent.style.pixelWidth);
				ele.setAttribute("oriposition", parent.style.position);
			}
			else {
				ele.setAttribute("oriheight", ele.style.pixelHeight);
				ele.setAttribute("oriwidth", ele.style.pixelWidth);
				ele.setAttribute("oriposition", ele.style.position);
			}
			ele.style.left = "0px";
			ele.style.top = "0px";

			ele.style.pixelHeight = height;
			ele.style.pixelWidth = width;
		}
		else {
			ele.setAttribute("maximized", "false");
			ele.style.zIndex = 100;
			ele.style.left = ele.getAttribute("orileft");
			ele.style.top = ele.getAttribute("oritop");

			ele.style.pixelHeight = ele.getAttribute("oriheight");
			ele.style.pixelWidth = ele.getAttribute("oriwidth");
			ele.style.position = ele.getAttribute("oriposition");
		}
	}
}
function collapseResize(ele, height, width) {
	if (ele.getAttribute("maximized") != true) {
		ele.setAttribute("maximized", true);
		ele.style.pixelHeight = height;
		ele.style.pixelWidth = width;
	}
	else {
		ele.setAttribute("maximized", false);
		ele.style.height = ele.getAttribute("oriheight");
		ele.style.width = ele.getAttribute("oriwidth");
	}
}
function callRestore(id) {
	var cShell = getElementByBizAPPId(id);
	var height = getClientHeight();
	var width = getClientWidth()
	if (cShell) {
		expand(cShell, height, width);

		var table = cShell.children[0];
		collapseResize(table, height, width);

		var background = table.children[0].children[0].children[0].children[0].children[0].children[0].children[1];
		collapseResize(background, background.style.height, width);


		var contentHeight = height - 20;
		var contentRow = table.children[0].children[1];
		collapseResize(contentRow, contentHeight, width);

		var contentCell = contentRow.children[0];
		collapseResize(contentCell, contentHeight, width);

		var contentTable = contentCell.children[0];
		collapseResize(contentTable, contentHeight, width);

		var cr = contentTable.children[0].children[0];
		collapseResize(cr, contentHeight, width);

		var cc = cr.children[0];
		collapseResize(cc, contentHeight, width);

		var content = cc.children[0];
		collapseResize(content, contentHeight, width);
	}
	document.body.innerHTML = document.body.innerHTML;
}
function callRestoreControl(id, restoreId, contextId) {
	display(id);

	if (RestoreControl != null) {
		var ajaxArgs = new Array();
		ajaxArgs[0] = "RestoreBackControl";
		ajaxArgs[1] = restoreId;
		ajaxArgs[2] = contextId;
		callMinimizeControl(ajaxArgs);
	}
}
function hide(id) {
	var obj = getElementByBizAPPId(id, 'div');
	if (obj != null) {
		obj.style.display = "none";
	}
}
function display(id) {
	var obj = getElementByBizAPPId(id, 'div');
	if (obj != null) {
		obj.style.display = "block";
	}
}
function toggle(id) {
	var obj = getElementByBizAPPId(id, 'div');
	if (obj != null) {
		if (obj.style.display != "none")
			obj.style.display = "none";
		else
			obj.style.display = "block";
	}
}

/***--Common.js--***/

var enableDebug = false;
var lastFunCall = "";
var _session__ = new Array();
var applyStepEvents = new Array();
var eventList = new Array();
var enterprise = 'enterprise';
var enableCopy = false;
var stack = new Array();
var appbuliderid = "BizAPPid";
var _sessionid__;
var _userUid__;
var _enterpriseName__, __bts_, _srServer__;
var _allowScriptTagInput__;
var activeRecordArgs;

//enum debugLevel = { exception = 0, debug, info };

// choose which of "exception, debug, info" needs to be logged 
var debugLevel = "exception;debug;info";
var showDebug = "exception;";
function debug(text, level, addnInfo, btnCancel, txtCancel, txtCancelOnclick) {
	addnInfo = addnInfo || '';
	btnCancel = btnCancel || false;
	if (enableDebug == true) {
		if (level == "info") {
			displayStatus(text);
		}
	}
	addLog(text);

	if (showDebug.indexOf(level) >= 0) {
		//displayMessage(text);
		var type = '';
		if (text.indexOf('[type]') != -1) {
			text = text.split('[type]');
			type = text[1];
			text = text[0];
		}
		try {
			BizAPP.UI.InlinePopup.Alert({ title: '', errorMessage: text, btnOk: true, txtOk: 'OK', type: type, addnInfo: addnInfo, btnCancel: btnCancel, txtCancel: txtCancel, txtCancelOnclick: txtCancelOnclick });
		}
		catch (e) {
			alert(text);
		}
	}
}

function callPopupExceptions(text) {
	text = text.replace(/\[SQ]/g, "'");
	text = text.replace(/\[NL]/g, "\n");
	text = text.replace(/\[TB]/g, "\r");

	displayMessage(text);
}

//Event Manager 
var eventManager = new Array(),
	g_customTooltip = 0;


function getSessionId() {
	return _sessionid__;
}

function getEnterpriseName() {
	return _enterpriseName__;
}

function setEnterpriseName(name, uid, sid, isDebug, df, dtf, path, fullName, bts, srServer, options) {
	if (window.localStorage) localStorage.removeItem('html.navurl');
	_enterpriseName__ = name;
	_userUid__ = uid;
	_sessionid__ = sid;
	_srServer__ = srServer;
	g_enableLog = isDebug == '0' ? false : true;
	BizAPP.Session.__dateFormat = df;
	BizAPP.Session.__datetimeFormat = dtf;
	g_appBasePath = BizAPP.UI.basePath = path;
	BizAPP.UI.appendBasePath = (options.appendbasepath == "true");
	__bts_ = bts;
	g_customTooltip = options.customtooltip;
	g_blockedExtns = options.blockedfileextensions;
	__readonlyajaxcalls = JSON.parse(options.readonlyajax);
	BizAPP.UI.controlMapping = options.UIControlMapping;
	BizAPP.UI.controlDependency = options.UIControlDependency;
	BizAPP.UI.controlSelector = options.UIControlSelector;
	_allowScriptTagInput__ = options.AllowScriptTagInput;
	BizAPP.UI.impersonateField = options.ImpersonateField;
	BizAPP.UI.widgetChartHeight = options.WidgetChartHeight;
	BizAPP.UI.InlinePopup._template = options.InlinePopupTemplate;
	BizAPP.UI.brandName = options.brandname;
	BizAPP.UI.brandUrl = options.brandurl;
	BizAPP.UI.firstAccess = options.FirstAccess
	BizAPP.UI.currentApplication = JSON.stringify(options.currentApplication);
	jqExtns();

	if (location.href.toLowerCase().indexOf('diagnostics.aspx') == -1 && location.href.toLowerCase().indexOf('navigationpage.aspx') == -1) {
		if (location.href.toLowerCase().indexOf('enterpriseview.aspx') == -1)
			callGetCurrentTimeZoneName();

		if (location.href.toLowerCase().indexOf('testview.aspx') == -1) {
			setTimeout(function () {
				localStorage.setItem('BZA_CollabdeskInfo', JSON.stringify({
					srServer: _srServer__, sessionId: _sessionid__, userUid: _userUid__, fullName: fullName, bts: __bts_
				}));
				initHub(_srServer__, _sessionid__, _userUid__, fullName, __bts_, function () { }, { loadChat: options.loadSignalr });
			}, location.href.toLowerCase().indexOf('collaboration.aspx') == -1 ? 5000 : 0);
		}
	}

	var type = BizAPP.UI.controlDependency['type'];
	if (type) {
		var jsUrl;
		switch (type) {
			case "controlset":
				//jsUrl = 'Resource.asmx?csn=' + BizAPP.UI.controlDependency['controlsetname'];
				break;
		}

		if (jsUrl) {
			$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function () {
				console.log('Control set js download.');
			});
		}
	}

	if (!isMobile.any()) {
		document.addEventListener("visibilitychange", function () {
			if (document.hidden) {
			} else {
				var ns = BizAPP.Session.EvaluateExpression({ expression: 'Session.sessionid', sync: true, compute: true }).value[1];
				if (_sessionid__ != JSON.parse(ns))
					location.reload();
			}
		});
	}
}

function initSystemTray() {
	if (location.href.toLowerCase().indexOf('diagnostics.aspx') == -1 && location.href.toLowerCase().indexOf('navigationpage.aspx') == -1
		&& location.href.toLowerCase().indexOf('collaboration.aspx') == -1) {
		$.cachedScript(BizAPP.UI.GetBasePath('Resources/SystemTray/systemTray.js?v=' + __bts_)).done(function (script, textStatus) {
			BizAPP.SystemTray.Init();
			setTimeout(function () {
				//run count query and highlight job requests icon
				if (BizAPP.UI.firstAccess) {
					BizAPP.Session.EvaluateExpression({
						expression: 'dataexist:ESystemb1686', callback: function (result) {
							var dataExist = result == 'True';
							if (dataExist) {
								//show notification
								BizAPP.UI.Toast.Notify({
									title: 'Job(s) Completed',
									text: 'You have jobs completed since your last visit.',
									type: 'info'
								});
							}
						}
					});
				}

				BizAPP.SystemTray.AddMenu({
					id: 'bza-mobile-menu',
					html: '<i class="fa fa-mobile" title="Mobile"></i>',
					click: function () {
						BizAPP.UI.LoadView({ inlinePopup: true, url: "uiview.asmx?html.jar=true&html.args=runtimeviewenterpriseid[NVS]" + BizAPP.UI.MobileSystemTrayView })
					}
				});
				BizAPP.SystemTray.AddMenu({
					id: 'bza-JR-menu',
					html: '<i class="fa fa-ticket" title="My Job Requests"></i>',
					click: function () {
						BizAPP.UI.LoadView({ inlinePopup: true, url: "uiview.asmx?html.jar=true&html.args=runtimeviewenterpriseid[NVS]" + BizAPP.UI.JobRequestSystemTrayView })
					}
				});
			}, 5000);
		});
	}
}

function initHub(srServer, sid, uid, fullName, bts, callback, options) {
	$.cachedScript(BizAPP.UI.GetBasePath('resources/javascripts/jquery.signalR.js?v=' + __bts_)).done(function (script, textStatus) {
		$.cachedScript(BizAPP.UI.GetBasePath('resources/javascripts/boothubs.js?v=' + __bts_)).done(function (script, textStatus) {
			/*Following has to be called one per page load to make sure required dependencies are setup, calling more than once after an init, is a no op*/
			BizAPP.UI.Hub.Boot((srServer ? srServer : BizAPP.UI.basePath), sid, uid, fullName, bts, callback, options);
		});
	});
}

function setSessionId(id) {
	_sessionid__ = id;
}
function pushEvent(eve) {
	stack.push(eve);
}

function popEvent(parent) {
	if (parent && parent.stack)
		return parent.stack.pop();
}

function navigateToCurrentViewWithObject(chc, roid, viewEId) {
	ajaxAsyncCall("HelperEx", ['NavigateToCurrentViewWithObject', chc, roid, viewEId], false, true);
}
function navigateToCurrentView() {
	ajaxAsyncCall("HelperEx", ['NavigateToCurrentView'], false, true);
}

function navigateToPreviousView() {
	ajaxAsyncCall("HelperEx", ['NavigateToPreviousView'], false, true);
}

function setFocus(sourceId) {
	try {
		var obj = getElementByBizAPPId(sourceId);
		if (obj != null && obj.disabled == false) {
			obj.focus();
			if (obj.tagName != "SPAN" && obj.tagName != "DIV" && obj.tagName != "SELECT" && obj.tagName != "TABLE")
				obj.select();
		}
	}
	catch (Error) { }
}

function setForceFocus(sourceId, event) {
	var ae = document.activeElement;
	if (ae && (ae.tagName == 'INPUT' || ae.tagName == 'TEXTAREA'))
		$(ae).blur();

	if (event == null)
		event = window.event;
	if (event) {
		try {
			var obj = getElementByBizAPPId(sourceId);

			if (obj != null && obj.disabled == false) {
				obj.style.position = "absolute";
				obj.style.left = event.clientX;
				obj.style.top = event.clientY;

				obj.focus();
				if (obj.tagName != "SPAN" && obj.tagName != "DIV" && obj.tagName != "SELECT" && obj.tagName != "TABLE")
					obj.select();
			}
		}
		catch (Error) { }
	}
}

function ProcessingStatus(show, maskProcessing) { ProcessingStatus1(show, maskProcessing) }
function ProcessingStatus1(show, maskProcessing) {
	if (maskProcessing == true || maskProcessing == 'true') {
		var processing = getElementByBizAPPId('Processing', 'div');
		if (processing) {
			if (show == true) {
				processing.style.left = '0';
				processing.style.top = '0';
				processing.style.display = 'block';
				if (!isIE7())
					processing.style.position = 'fixed';
			}
			else
				processing.style.display = 'none';
		}
	}
}
function activeRecordChanged(method, eventName, source, activeRecord, args) {
	activeRecordArgs = args;
	var call = method + " ( '" + eventName + "', '" + source + "', '" + activeRecord + "');";

	addLog("\n" + call);

	try {
		eval(call);
	}
	catch (Error) {
		logError('activeRecordChanged failure - ' + call, Error);
	}
}
function fireActiveRecordChanged(method, eventName, source, activeRecord) {
	var obj = getElementByBizAPPId(activeRecord, "select", false);

	var value = "";

	if (obj)
		value = obj.value;

	activeRecordChanged(method, eventName, source, value);
}
function callMinimizeControl(ajaxArgs) {
	ajaxAsyncCall("RestoreEx", ajaxArgs, false);
}
function isWebkit() {
	return /webkit/.test(navigator.userAgent.toLowerCase());
}
function isChrome() {
	return navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && navigator.userAgent.toLowerCase().indexOf('edge') == -1;
}
function isSafari() {
	return navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.indexOf('Chrome') == -1;
}
function isFirefox() {
	return navigator.userAgent.indexOf("Firefox") != -1 ? true : false;
}
function isIE() {
	var version = 0;
	if (navigator.appVersion.indexOf("MSIE") != -1) {
		temp = navigator.appVersion.split("MSIE");
		version = parseFloat(temp[1]);
	}
	//Microsft has removed msie string in IE11
	!version ? (navigator.userAgent.match(/Trident.*rv\:11\./) ? version = 11 : null) : null;

	return version;
}
function isIE6() {
	var version = isIE();
	return (version == 6);
}
function isIE7() {
	var version = isIE();
	return (version == 7);
}

function getCheckBoxValue(element) {
	var attr = "uncheckedvalue";
	var result;
	if (element.tagName.toLowerCase() == 'select') {
		var ele = element.getElementsByTagName('INPUT')[0];
		if (ele && ele.checked) {
			attr = 'checkedvalue';
		}
		result = getAttributeValue(element, attr);
	}
	else if (element.tagName.toLowerCase() == 'input') {
		if (element.checked) {
			attr = 'checkedvalue';
		}
		result = getAttributeValue(element, attr);
		if (!result) {
			result = getAttributeValue(element.parentNode, attr);
		}
	}
	return result;
}

function getRichTextBoxValue(element, type) {
	if (element.childNodes.length > 0) {
		var loc = element.childNodes[0].src;

		var richtextframe = null;
		for (var i = 0; i < document.frames.length; i++) {
			if (document.frames(i).location.href == loc) {
				richtextframe = document.frames(i);
				break;
			}
		}

		if (richtextframe) {
			switch (type) {
				case "formrichtext":
					{
						return richtextframe.frames(0).document.documentElement.childNodes[1].innerHTML;
						break;
					}
				case "forminrichtext":
					{
						var textElement = richtextframe.document.getElementById("WebHtmlEditor_tw");

						if (textElement)
							return textElement.innerHTML;

						break;
					}
			}
		}
	}
	return null;
}

var freeTextContent;

function getFreeTextBoxValue(element) {
	var freeTextBox = document.getElementById("RichText_htmlEditorArea")

	if (freeTextBox) {
		var val;

		if (isIE()) {
			val = freeTextBox.childNodes[0].innerText;
		}
		else {
			val = freeTextBox.childNodes[1].value;
		}

		freeTextContent = val;
		return val;
	}

	return null;
}

var g_ig_richtextchc;
function ig_richtextsave(oEditor, dummy, oEvent) {
	window.top.BizAPP.UI.Textbox.setValue(oEditor);
}



function getElementByGroupId(groupname, groupid) {
	var allelements = getAllElements();
	for (var i = 0; i < allelements.length; i++) {
		var element = allelements[i];
		if (element.tagName && element.getAttribute(groupname) == groupid) {
			return element;
		}
	}
}
function getElementsByGroupId(groupname, groupid) {
	var allelements = getAllElements();
	var elements = new Array();

	var i;
	var j = 0;
	for (i = 0; i < allelements.length; i++) {
		var element = allelements[i];
		if (element.tagName && element.getAttribute(groupname) == groupid) {
			elements[j++] = element;
		}
	}
	return elements;
}

function getElementByBizAPPIdFromRoot(customid, tagName) {
	return getElementByBizAPPId(customid, tagName, true);
}

function getElement(allelements, customid) {
	var elementId;
	var list = new Array();

	for (var i = 0; i < allelements.length; i++) {
		elementId = allelements[i].getAttribute("BizAPPid");

		if (elementId != null && elementId != allelements[i].id)
			list[elementId] = allelements[i].id;

		if (elementId == customid) {
			return allelements[i];
		}
	}
	return null;
}
function getElementByBizAPPId(customId) {
	return getElementByBizAPPId(customId, "DIV", false);
}

function getElementsByBizAPPId(customids, customidstr) {
	var oObjects = new Array();
	var notFoundIds = new Array();
	var j = 0;

	for (var i = 0; i < customids.length; i++) {
		var id = customids[i];
		var obj = document.getElementById(id);

		if (obj)
			oObjects[id] = obj;
		else {
			notFoundIds[j] = id;
			j = j + 1;
		}
	}

	var appbIds = null;
	if (notFoundIds.length == 1) {
		oObjects[notFoundIds[0]] = getElementByBizAPPId(notFoundIds[0]);
	}
	else if (notFoundIds.length > 1) {
		appbIds = getElementsForIE(customidstr, null);
	}

	if (appbIds) {
		for (var i = 0; i < appbIds.length; i++) {
			oObjects[appbIds[i].getAttribute("bizappid")] = appbIds[i];
		}
	}
	return oObjects;
}

function getElementByBizAPPId(customid, tagName, fromParent) {
	var obj;
	if (customid == '' || !customid)
		return obj;
	obj = document.getElementById(customid);
	if (obj && tagName)//if tag is available and they dont match continue
	{
		if (obj.nodeName.toLowerCase() != tagName.toLowerCase())
			obj = null;
	}
	if (obj != null)
		return obj;

	try {
		obj = $('[bizappid="' + customid + '"]')[0];
		if (obj != null)
			return obj;
	}
	catch (Error) { }

	obj = getElementForMozilla(customid, tagName, fromParent);
	if (isIE() && obj == null && tagName == undefined) {
		obj = getElementForIE(customid, fromParent);
	}

	return obj;
}
function getElementForMozilla(customid, tagName, fromParent) {
	if (!tagName)
		tagName = "DIV";

	var objs;
	var doc;
	if (fromParent) {
		doc = this.parent.document;
	}
	else {
		doc = document;
	}
	//getAnonymousElementByAttribute not defined in Google Chrome
	try {
		if (!isIE())
			objs = doc.getAnonymousElementByAttribute(document.documentElement, "BizAPPid", customid);
	}
	catch (Error) { }
	if (objs)
		return objs;

	objs = doc.getElementsByTagName(tagName);
	var returnElement = getElement(objs, customid);
	return returnElement;
}

function getElementsForIE(customIds) {

	var elementId;
	var list = new Array();
	var j = 0;
	var allelements = getAllElements();

	for (var i = 0; i < allelements.length && customIds.trim(); i++) {
		if (allelements[i].attributes != null) {
			elementId = allelements[i].getAttribute("bizappid");

			if (elementId && customIds.indexOf(elementId + " ") > -1) {
				list[j++] = allelements[i];

				while (customIds.indexOf(elementId + " ") > -1)
					customIds = customIds.replace(elementId + " ", "");
			}
		}
	}
	return list;
}
function getElementForIE(customid, fromParent) {
	if (customid == null || customid == "") {
		debug("Empty customid passed", "info");
	}
	else {
		try {
			if (fromParent && this.parent.document) {
				return getElement(this.parent.document.all, customid);
			}
			else {
				return getElement(document.all, customid);
			}
		} catch (Error) { }
	}
}
function evalAjaxActualCall() {
	var result = eval(lastFunCall);
	replaceControls(result);
}

function evalAjaxCall(funcName, args, context) {
	var evalCall = funcName + "( " + args + " );";
	eval(evalCall);
}

function hidePopups() {
	hideContextMenu();
	hideCalendar();
}

// Utilities 
function showDialog(page, height, width, resizable) {
	debug("Please Wait, Loading Popup", "info");

	if (resizable == null)
		resizable = "yes";

	x = document.documentElement.offsetWidth / 3;
	y = document.documentElement.offsetHeight / 2;

	try {
		var result = OpenModalDialog(page, height, width, x, y, "yes", "yes");
		return result;
	}
	catch (Error) {
		if (Error.message.trim() == "Access is denied.")
			displayMessage("Popup has been blocked, Please enable this site in the popup blockers allowed site list and try again. \n Tools - Pop-up Blocker - Pop-up Blocker Settings");
		else
			displayMessage(Error.description.trim());
	}
}

function showDialogWithOptions(page, height, width, resizable, scrollable) {

	debug("Please Wait, Loading Popup", "info");

	if (resizable == null)
		resizable = "yes";

	x = document.documentElement.offsetWidth / 3;
	y = document.documentElement.offsetHeight / 2;

	try {
		var result = OpenModalDialog(page, height, width, x, y, "yes", "yes");

		if (!result && result != null)
			result = false;
		else
			handleEvent(result);

		return result;
	}
	catch (Error) {
		if (Error.message.trim() == "Access is denied.")
			displayMessage("Popup has been blocked, Please enable this site in the popup blockers allowed site list and try again. \n Tools - Pop-up Blocker - Pop-up Blocker Settings");
		else
			displayMessage(Error.description);
	}

}

function callValidateShowDialog(chc, isValid) {
	if (!isValid)
		ajaxAsyncCall('HelperEx', ['ValidatePopupCall', chc], false);
}

function getCheckBoxSelection(ctrlName) {
	var selectedVals = getPersistedValue(g_gridStoreName, ctrlName);
	if (selectedVals)
		selectedVals = selectedVals.concat(',');
	else
		selectedVals = '';
	selectedVals = selectedVals.concat(getGridSelectedValues(ctrlName));
	removePersistedValue(g_gridStoreName, ctrlName);
	selectedVals = eliminateDuplicatesFromArray(selectedVals.split(',')).join(',');
	return selectedVals;
}
function eliminateDuplicatesFromArray(arr) {
	var i,
		len = arr.length,
		out = [],
		obj = {};

	for (i = 0; i < len; i++)
		obj[arr[i]] = 0;
	for (i in obj)
		out.push(i);

	return out;
}
function getGridSelectedValues(controlName) {
	var selectedids = '';
	var oObject;

	if (isIE())
		oObject = $('[name="BizAPP.object"][checked][type=checkbox][bizappid="' + controlName + '"]');
	else
		oObject = $('[name="BizAPP.object"][type=checkbox][bizappid="' + controlName + '"]');

	//based on whether serach is single select or multi select
	if (oObject && oObject.length == 0) {
		if (isIE())
			oObject = $('[name="BizAPP.object"][checked][type=radio][bizappid="' + controlName + '"]');
		else
			oObject = $('[name="BizAPP.object"][type=radio][bizappid="' + controlName + '"]');
	}

	if (oObject) {
		for (i = 0; i < oObject.length; i++) {
			var control = oObject[i];
			if (control.checked == true) {
				if (selectedids != '')
					selectedids = selectedids.concat(',');
				selectedids = selectedids.concat(control.id);
			}
		}

		if (selectedids)
			return selectedids;
	}

	if ((!oObject || oObject.length == 0) && isIE()) {
		oObject = document.getElementsByName('BizAPP.object');
	}
	if (!oObject || oObject.length == 0) {
		oObject = document.getElementsByTagName('INPUT');
	}
	if (oObject != null) {
		if (oObject.length != null) {
			for (i = 0; i < oObject.length; i++) {
				var control = oObject[i];
				if (control.getAttribute("BizAPPid") == controlName) {
					if (control.tagName.toLowerCase() == 'input') {
						if (control.type == 'checkbox') {
							if (control.checked == true) {
								if (selectedids != '')
									selectedids = selectedids.concat(',');
								selectedids = selectedids.concat(control.id);
							}
						}
						else if (control.type == 'radio') {
							if (control.checked == true) {
								selectedids = selectedids.concat(control.id);
							}
						}
					}
				}
			}
		}
	}
	return selectedids;
}

function getControlName(controlName) {
	switch (controlName) {
		case "ViewBusinessObjectForm":
			return "OutlineControl";
		case "ViewDataGrid":
			return "GridControl";
		case "ViewTreeControl":
			return "TreeControl";
	}
}
function getSessionValue(key) {
	return _session__[key];
}
function setSessionValue(key, keyValue) {
	_session__[key] = keyValue;
}
function getContextById(contextId) {
	return getSessionValue(contextId);
}
function getContext(control) {
	return control;
	return getSessionValue(control + "_context");
}
function bza_getSize(controlId) {
	var control = getElementByBizAPPId(controlId);
	if (control) {
		var size = getWidth(control) + "," + getHeight(control);
		return size;
	}
}

function fireEvents(events) {
	if (events) {
		if (events.length < 4) {
			var key = events;
			events = window.sessionStorage.getItem(key);
			window.sessionStorage.removeItem(key);
		}
		var evesList = new Array();
		evesList = events.split('[ES]');
		for (j = 0; j < evesList.length; j++) {
			var eve = evesList[j];
			handleEvent(eve);
		}
		handleEvents(false);
	}
}
function handleEvent(eve) {
	if (eve != null) {
		eventList.push(eve);
	}
}
//handleEvents(true);
function handleEvents(callback) {
	while (eventList.length > 0) {
		var eve = eventList.shift();
		try {
			eval(eve);
		}
		catch (Error) {
			if (Error.message === 'event is not defined') {
				var event;
				try {
					eval(eve);
				}
				catch (Error) {
					logError('Event handling failed - ' + eve, Error);
				}
			}
			else
				logError('Event handling failed - ' + eve, Error);
		}
	}

	if (callback)
		setTimeout(handleEvents, 100);
}
function getClassName(oObject) {
	var object = oObject;
	while (object != null && object.className == null) {
		object = object.parentNode;
	}
	if (object.className != null && object.className.length != 0)
		return object.className;
	if (object.parentNode)
		return object.parentNode.className;
	return null;
}
function displayDebugs(debugStr) {
	if (debugStr != null && debugStr.length > 0) {
		debug(debugStr.replace("[DBS]", "\n"), "debug");
		$.each(debugStr.split("[DBS]"), function () { addExceptionLog(this) });
	}
}
function displayExceptions(exceptionStr, debugStr) {
	if (exceptionStr != null && exceptionStr.length > 0) {
		var exceptions = exceptionStr.split("[EXS]");
		var debugs = [];
		if (debugStr)
			debugs = debugStr.split('[DBS]');
		for (var i = 0; i < exceptions.length; i++) {
			if (debugs[i]) {
				if ($.ajax.mostRecentCall && $.ajax.mostRecentCall.settings && $.ajax.mostRecentCall.settings.data) {
					if (JSON.parse($.ajax.mostRecentCall.settings.data).type != 'CredentialsEx')
						debugs[i] = debugs[i] + $.ajax.mostRecentCall.settings.data.encodeHTML();
				}
				debugs[i] = '<div id="err_tech" class="err-tech"><hr>' + debugs[i] + '</div>';
			}
			debug(exceptions[i], "exception", debugs[i]);
			//addExceptionLog(exceptions[i]);
		}
	}
}

//#region OptGrid
function callSetInMemoryObjects(cb, event, CHC) {
	ajaxAsyncCall('OptGridEx', ['SetInMemoryObjects', CHC, getcbValue(cb)], true, true);
}
function callSetDefaultQuery(event, isDefault, CHC) {
	var a, b;
	var source = getSourceElement(event);
	if (source) {
		var mqControl = source.parentNode.parentNode.previousSibling.children[0];
		a = mqControl.value;
		b = mqControl.options[mqControl.selectedIndex].getAttribute('ispq');
	}

	ajaxAsyncCall('OptGridEx', ['SetDefaultQuery', CHC, getcbValue(isDefault), a, b], true, true);
}
function getcbValue(element) {
	var attr = "uncheckedvalue";
	if (element.tagName == "input" || element.tagName == "INPUT") {
		if (element.checked)
			attr = "checkedvalue";
		return getAttributeValue(element.parentNode, attr);
	}
	else {
		for (var i = 0; i < element.childNodes.length; i++) {
			if (element.childNodes[0].tagName == "input" && element.childNodes[0].checked)
				attr = "checkedvalue";
		}
	}

	return getAttributeValue(element, attr);
}
function callSearchInline(CHC, searchSerializedArgs, controlName) {
	ajaxAsyncCall('OptGridEx', ['DoSearchInline', CHC, searchSerializedArgs, getFilter(controlName)], true, true);
}

function callOriginalGridFromSearchInline(CHC) {
	ajaxAsyncCall('OptGridEx', ['OriginalGridFromSearchInline', CHC], true, true);
}
function callMSROLink(CHC, link, postAction, runtimeObjectIds) {
	if (!runtimeObjectIds)
		return;

	ajaxSyncCall('OptGridEx', ['EvaluateMSROLink', CHC, link, postAction.replace(/\[BSQ]/g, "'")]);
}
var g_MSROContext;
function callEvaluateMultiSelectLink(link, CHC, selectAll, runtimeObjectIds, linkcontrol, isSearch) {
	if (!runtimeObjectIds) {
		displayMessage(BizAPP.UI.Localization.NoRecordsSelected);
		return;
	}

	var msbc = parseInt($(link).closest('[bza_msbc]').attr('bza_msbc'));
	if (!msbc) { msbc = 5; }

	if (!isSearch && runtimeObjectIds.split(',').length > msbc) {
		var newArr = [];
		var arr = runtimeObjectIds.split(',');
		$.each(arr, function (i, v) {
			if (i < msbc) {
				newArr.push(arr.shift());
			}
		});
		g_callBacks.push(function () {
			callEvaluateMultiSelectLink(link, CHC, selectAll, arr.join(','), linkcontrol)
		});
		InternalMultiSelectLink(link, CHC, selectAll, newArr.join(','), linkcontrol);
	}
	else {
		InternalMultiSelectLink(link, CHC, selectAll, runtimeObjectIds, linkcontrol);
	}
}
function InternalMultiSelectLink(link, CHC, selectAll, runtimeObjectIds, linkcontrol) {
	var a, b;
	a = getMSCbValue(selectAll);
	if (!a)
		a = "false";

	if (g_MSROContext) {
		b = g_MSROContext;
		g_MSROContext = undefined;
		ajaxAsyncCall('OptGridEx', ['EvaluateMultiSelectLinks', CHC, a, runtimeObjectIds, linkcontrol, b], true, true);
		return;
	}

	ajaxAsyncCall('OptGridEx', ['EvaluateMultiSelectLinks', CHC, a, runtimeObjectIds, linkcontrol], true, true);
}
function getMSCbValue(selectAll) {
	var checkAllObj = getElementByBizAPPId(selectAll);
	var result;

	if (checkAllObj) {
		if (isIE() && checkAllObj.childNodes > 0)
			result = checkAllObj.childNodes[0].checked.toString();
		else if (checkAllObj.childNodes > 1)
			result = checkAllObj.childNodes[1].checked.toString();
	}
	else {
		checkAllObj = getElementByBizAPPId(selectAll, "input");
		if (checkAllObj)
			result = checkAllObj.checked.toString();
	}

	return result;
}
function callEvaluateContextMenuLink(link, CHC, linkcontrol) {
	var a = getAttributeValue(contextMenuObj, "roid");
	hideContextMenu();

	if (a)
		ajaxAsyncCall("OptGridEx", ['EvaluateContextMenuLink', CHC, linkcontrol, a], true, true);
}
function callEvaluateAdditionalLink(link, CHC, linkcontrol) {
	ajaxAsyncCall("OptGridEx", ['EvaluateAdditionalLink', CHC, linkcontrol], true, true);
}
//#region PersonalizedQuery
function getAFChildMetaData(listItem, objectTyepId, contextHashCode) {
	var parent = $(listItem).parent();

	//toggle css
	var node = parent.children('.gExpPP');
	var css = 'collapse';
	if (node.length == 0) {
		css = 'cbExpText gExpPP';
		parent.children('div').hide();
		node = parent.children('.collapse');
	}
	else if (node.length == 1) {
		var children = parent.children('div');
		//check if it is already fetched
		if (children.length == 1) {
			children.show();
		}
		else {
			var result = ajaxSyncCallAndNoResponseHandler("OptGridEx", ['GetChildFields', contextHashCode, objectTyepId, $(listItem).attr('fieldName')]);
			$(listItem).parent().append(result.value[1]);
		}
	}
	node[0].className = css;
}
function callAddGPQuery(contextHashCode, showToAll, event) {
	if (!event)
		event = window.event;

	var source = getSourceElement(event);
	if (source) {
		source = $(source).closest('table')[0];
		var templateHeadLine = '<span>Create Query</span>';
		var templateBody = '<div class="bza-pq-cont"><input type="radio" name="type" onclick="SwitchView(false)"\
        value="addpq" checked>Add Personalized Query <input type="radio" name="type" onclick="SwitchView(true)" value="create">Create New Query\
        <div id="PersonalizedQueryContainer" class="personalize-query" style="padding:10px;"><div chc="' + contextHashCode + '" style="padding: 5px; width: 300px; height: 30px;"> <span>Query Name : </span><input class="formtextbox" id="tbQueryName" \
        style="width: 205px"></div>';
		if (showToAll.toLowerCase() == "true")
			templateBody += '<div style="padding: 5px;"><input class="formcheckbox" type="checkbox" style="margin-left: 0pt;"><span>\
                             Show Query To All Users</span></div>';
		templateBody += '<div id="CreateQueryContainer" class="create-query" style="padding:10px;display:none"></div></div>';
		var templateSteps = '<div><table cellspacing="0" cellpadding="0" align="Left" style="border-collapse:collapse;"><tbody><tr valign="top"><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="S" class="stepcenternormal" onclick="backGroundBlocker( \'true\');callAddPQuery();zoomout();" prevstate="normal">Ok</span></div></td><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="C" class="stepcenternormal cancelstep" onclick="zoomout();">Cancel</span></div></td></tr></tbody></table></div>';

		var options = { 'headline': templateHeadLine, 'body': templateBody, 'steps': templateSteps };
		var _pQueryMarkup = BizAPP.UI.InlinePopup.GetMarkupWithTemplate(options);

		BizAPP.UI.InlinePopup.CreateNew({ html: addWindowEvent(_pQueryMarkup), stropenjs: ' $(".bizappContainer").css("min-width", "");' });
	}
}
function SwitchView(createnew) {
	if (createnew) {
		$('#CreateQueryContainer').show();
		if (!$.trim($("#CreateQueryContainer").html())) {
			BizAPP.UI.LoadView({
				url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemafe33&html.jar=true',
				selector: $('#CreateQueryContainer'),
				callback: function () { $('.pqube_header').removeClass('pqube_header'); }
			});
		}
	}
	else {
		$('#CreateQueryContainer').hide();
	}
}
function callRemoveGPQuery(contextHashCode, event) {
	callGPQuery(contextHashCode, event, 'RemovePersonalizedQuery');
}
function callUpdateGPQuery(contextHashCode, event) {
	callGPQuery(contextHashCode, event, 'UpdatePersonalizedQuery');
}
function CallGPQGetFields(chc, event) {
	if (!event)
		event = window.event;

	var source = getSourceElement(event);
	BizAPP.UI.Grid._stampViewParamsOnPopup();
	BizAPP.UI.Grid.initAddnFieldsPopup('', '', $(source).closest('[bizapp_eid]').attr('bizapp_eid'), chc);
}
function showAddnFields(container, top, left) {
	var containerDiv = $(getElementByBizAPPId(container, "div"));
	containerDiv.show();
	containerDiv.css('top', top + 'px');
	containerDiv.css('left', (parseInt(left) - containerDiv.width()) + 'px');
}
function callAddPQuery() {
	var qn = $("#PersonalizedQueryContainer").find("#tbQueryName");
	if (qn) {
		contextHashCode = qn.closest('div[chc]').attr('chc');
		if (contextHashCode && qn[0].value != '') {
			var args = new Array();
			args[0] = 'AddPersonalizedQuery';
			args[1] = contextHashCode;
			args[2] = qn[0].value;
			var sa = $("#PersonalizedQueryContainer").find(".formcheckbox");
			args[3] = (sa && sa.length > 0 && sa[0].checked).toString();
			var isCreate = $("input[name=type]:checked").val() == "create";
			args[4] = isCreate.toString();
			if (isCreate)
				args[5] = BizAPP.UI.Query._editor.getValue();

			ajaxAsyncCall("OptGridEx", args, true, true);
		}
	}
}
function callGPQuery(chc, event, methodname) {
	if (!event)
		event = window.event;

	var source = getSourceElement(event);
	var qName = '';

	if (methodname == 'RemovePersonalizedQuery' || methodname == 'UpdatePersonalizedQuery') {
		qName = $(source).closest('tr').find('select[onchange*="callApplySelectedQuery"]').val();

		if (qName)
			ajaxAsyncCall("OptGridEx", [methodname, chc, qName], true, true);
	}
}
//#endregion
function grdLastPage(pagesid) {
	var cb = getElementByBizAPPId(pagesid, "select", false);
	if (cb)
		cb.selectedIndex = cb.options.length - 1;
}
function cancelBubble(event) {
	if (event)
		event.cancelBubble = true;

	return false;
}
function grdClick(event, grid, contextHashCode, EV, drlDwn) {
	if (event == null)
		event = window.event;

	cancelBubble(event);
	var roid, className, source = getSourceElement(event);

	if (source) {
		if (isIE()) {
			if (source.onclick && source.onclick.length != 0)
				return;
		}
		else {
			if (source.onclick && source.onclick.length != 1)
				return;
		}

		// This is for handling cancel bubble on RadioBox and CheckBox button
		if (source.getAttribute('type') == 'radio' || source.getAttribute('type') == 'checkbox')
			return;

		var parent = source.parentNode;
		if (parent.tagName != "TR" && parent.tagName != "tr")
			parent = parent.parentNode;

		roid = getAttributeValue(parent, 'roid');
		className = getAttributeValue(parent, 'class');
	}

	CloseAllPopups();

	if (roid != '' && roid != null && roid != "[NEWOBJECT]") {
		if (source.className == 'gEdit') {
			var caption = getAttributeValue(grid.offsetParent.offsetParent.offsetParent.offsetParent, 'bizappid');
			if (caption) {
				g_editableGrids.Add(caption, caption);
			}
			callgEdit(source);
		}
		else if (source.className == 'gCancel')
			callgCancel(source, true);
		else if (source.className == 'gCommit gCommitRow')
			return;

		else if (drlDwn && drlDwn.toString().toLocaleLowerCase() == 'true') {
			if (EV != '' && EV != '[SEP]Inline')
				handleExpandView(event, roid, EV, true);
			else {
				//if commit throws any error do not proceed
				if (commitEditableGrids() != true)
					return;

				//execution sequence drilldown handling
				var excSeqSearchBtn = $(source).closest('.grid').find('[onclick*=exeSqSearchCallBack]');
				if (excSeqSearchBtn.length > 0) {
					$(source).closest('tr').find('input').prop('checked', 'true');
					excSeqSearchBtn.click();
				}
				else {
					var valueSet = '';
					var params = new Array();
					params.push('roid[VPNVS]' + roid);
					$(parent).find('td').each(function () {
						var $td = $(this);
						var name = $td.closest('table').find('th').eq($td.index()).text().trim();
						if (name)
							params.push(name + '[VPNVS]' + $td.text().trim());
					});

					if (params.length)
						valueSet = params.join('[VPPMS]');

					ajaxAsyncCall("OptGridEx", ['GridHandler', contextHashCode, roid, className, valueSet], true, true);
				}
			}
		}
	}
	else if (roid == "[NEWOBJECT]" && source.className == 'gCancel') {
		grid.deleteRow(parent.rowIndex);
	}
}
function handleExpandView(event, roid, viewDisplayname, offsetTop) {
	var view = viewDisplayname.split('[SEP]')[0];
	var mode = viewDisplayname.split('[SEP]')[1];
	if (mode == "Popup")
		callExpandViewPopup(event, roid, view, true);
	else
		callInlineExpandView(event, roid, view);
}
function callInlineExpandView(event, roid, EV) {
	var source = getSourceElement(event);

	var tbody = source.parentNode.parentNode.parentNode;

	var existingRow = getFirstElementByAttributeValue(tbody, "TR", "expand", true);
	if (existingRow)
		tbody.removeChild(existingRow);

	var currentRow = source.parentNode.parentNode;
	var nextRow = currentRow.nextSibling;
	var newRow = currentRow.nextSibling;

	if (newRow && newRow.getAttribute("expand"))
		$(newRow).remove();
	else {
		var row = document.createElement("TR")
		var td1 = document.createElement("TD")
		var td2 = document.createElement("TD")

		row.setAttribute("expand", true);

		row.appendChild(td1);
		row.appendChild(td2);

		var div = document.createElement("DIV");

		div.appendChild(document.createTextNode("Expanding ..."))
		td2.appendChild(div);
		td2.colSpan = currentRow.cells.length;

		if (nextRow)
			tbody.insertBefore(row, nextRow);
		else
			tbody.appendChild(row);

		var rand_no = "Ctrl" + Math.floor(Math.random() * 1000);

		div.setAttribute(appbuliderid, rand_no);

		callNavigateToViewByRuntimeViewRuntimeObjectShowCaption(rand_no, EV, roid, 'false');
	}
}
function callGridExecuteProcess(CHC, roid) {
	ajaxSyncCall('OptGridEx', ['ExecuteProcess', CHC, roid]);
}

function getSourceElement(event) {
	if (!event) return null;

	if (event.srcElement)
		return event.srcElement;
	else if (event.target)
		return event.target;
}
function getAttributeValue(oElm, attrName) {
	var attrValue = oElm.getAttribute(attrName);
	try {
		if (!attrValue || attrValue == '')
			attrValue = oElm.attributes[attrName].value;
	}
	catch (Error) { }

	return attrValue;
}
function getBizAppElementsByClassName(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;

	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (oRegExp.test(oElement.className))
			arrReturnElements.push(oElement);
	}

	return (arrReturnElements);
}
function getBizAppElementByIdInParent(oParent, strChildId) {
	if (!parent)
		return null;

	var arrElements = oParent.childNodes;
	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (oElement.id == strChildId)
			return oElement;
	}
	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		var result = getBizAppElementByIdInParent(oElement, strChildId);
		if (result)
			return result;
	}
}

function getElementsByAttributeValue(oElm, strTagName, strAttributeName, strAttributeValue) {
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();

	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (getAttributeValue(oElement, strAttributeName) == strAttributeValue)
			arrReturnElements.push(oElement);
	}

	return (arrReturnElements);
}
function getFirstElementByAttributeValue(oElm, strTagName, strAttributeName, strAttributeValue) {
	var eles = getElementsByAttributeValue(oElm, strTagName, strAttributeName, strAttributeValue);

	if (eles.length > 0)
		return eles[0];

	return null;
}
function getElementInnerText(oElm) {
	var innerText;
	if (oElm) {
		if (oElm.innerText)
			innerText = oElm.innerText;
		else if (oElm.textContent)
			innerText = oElm.textContent;
	}
	return innerText;
}
function callgEdit(source) {
	source.className = 'gCancel';
	source.title = 'Cancel';

	$(source).next().css('display', 'inline-block');

	var row = $(source).closest('tr'),
		table = row.closest('table'),
		cells = row.children('td').get(),
		headers = table.find('.bza_vdg_header').children('th').get(),
		editableColumns = table.attr('ecols')
	rowOverrides = row.attr('ecols'),
		rowOverrideindexes = '';

	if (rowOverrides) {
		rowOverrides = rowOverrides.split(':');
		if (rowOverrides.length > 0) {
			$.each(headers, function (i) {
				var headerText = getElementInnerText(this);
				$.each(rowOverrides, function (j) {
					if (headerText == rowOverrides[j]) {
						rowOverrideindexes += i + ':';
						return false;
					}
				});
			});
		}
	}

	editableColumns = editableColumns.split('[IECPS]');
	rowOverrideindexes = rowOverrideindexes.split(':');

	if (rowOverrideindexes && rowOverrideindexes.length > 0) {
		for (i = 0; i < rowOverrideindexes.length; i++) {
			for (j = 0; j < editableColumns.length; j++) {
				if (rowOverrideindexes[i] == editableColumns[j].split(':')[0])
					editableColumns[j] = '';
			}
		}
	}

	var newArr = new Array();
	for (var k = 0; k <= editableColumns.length; k++) {
		var id = editableColumns[k];
		if (id) {
			newArr.push(id);
		}
	}
	replaceWithEditors1(newArr, cells, false);
}

function replaceWithEditors(editableColumns, cells, create) {
	var ids = editableColumns.split('[IECPS]');
	var newArr = new Array();
	for (var k = 0; k <= ids.length; k++) {
		var id = ids[k];
		if (id) {
			newArr.push(id);
		}
	}
	replaceWithEditors1(newArr, cells, create);
}
function replaceWithEditors1(ids, cells, create) {
	var idsLength = ids.length,
		rowIndex = $(cells[0]).parent()[0].rowIndex;
	for (var i = 0; i < idsLength; i++) {
		var IEC = ids[i].split(':');
		var cellIndex = parseInt(IEC[0]);
		if (ids[i] != '' && cellIndex != NaN) {
			var cell = cells[cellIndex];
			var text = html = '';
			if (create == true)
				text = IEC[3];
			else {
				text = getElementInnerText(cell);
				if (text != undefined)
					text = text.trim();
			}

			html = cell.innerHTML.replace(/</g, "{ST}");
			html = html.replace(/>/g, "{ET}");
			html = html.replace(/\"/g, "{QT}");
			var eleStyle = '';
			if (i == idsLength - 1 && create == false) {
				var context = $(cell).closest('.grid').find('.gCommit')[0].onclick.toString().split("'")
				eleStyle = "onkeydown=\"if(event.keyCode == '9'){callCommitRow('" + context[1] + "',this,'" + context[3] + "', event);}\"";
			}
			if (IEC[2] && IEC[2] != '')
				eleStyle += " class=\"" + IEC[2] + "\"";
			else if (typeof (BizAPP.Bootstrap) == 'undefined')
				eleStyle += " style=\"width:90%\"";

			var id = new Date().getTime().toString() + rowIndex + i;
			switch (IEC[1]) {
				case "ComboBox":
					var cb = "<select id=\"" + id + "\" " + eleStyle + " onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\"/>";
					var options = IEC[3].split('[AVL]');
					for (var k = 0; k < options.length; k++) {
						if (options[k].trim() == html || options[k].trim() == text)
							cb += "<option selected>" + options[k] + "</option>";
						else
							cb += "<option>" + options[k] + "</option>";
					}
					cb += "</select>";
					cell.innerHTML = cb;
					break;

				case "DatetimePicker":
					id = $(cell).parent()[0].rowIndex + cellIndex + IEC[0];
					editorHTML = "<input id=\"" + id + "\" " + eleStyle + " type=\"text\" onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\" value=\"" + text + "\"/>";
					if (typeof (BizAPP.Bootstrap) != 'undefined')
						editorHTML = '<div class="input-group">' + editorHTML + '<span class="input-group-addon">\
                                            <span class="glyphicon glyphicon-calendar"></span>\
                                        </span></div>'
					cell.innerHTML = editorHTML;
					BizAPP.UI.DateTime.Init(id, '', 'ShowTimePicker');
					break;

				case "Multiline":
					cell.innerHTML = "<textarea id=\"" + id + "\" " + eleStyle + " type=\"" + IEC[1] + "\" onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\"></textarea>";
					$('#' + id).val(text);
					break;

				case "CheckBox":
					if (text == "true" || text == "True" || text == "1")
						cell.innerHTML = "<input id=\"" + id + "\" " + eleStyle + " type=\"" + IEC[1] + "\" onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\" checked/>";
					else
						cell.innerHTML = "<input id=\"" + id + "\" " + eleStyle + " type=\"" + IEC[1] + "\" onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\"/>";
					break;

				default:
					if (i == 0)
						cell.innerHTML = "<input id=\"" + id + "\" " + eleStyle + " type=\"" + IEC[1] + "\"id='focusfirstitem' bizappid='focusfirstitem' onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\"/>";
					else
						cell.innerHTML = "<input id=\"" + id + "\" " + eleStyle + " type=\"" + IEC[1] + "\" onclick=\"event.cancelBubble = true;\" oldval=\"" + html + "\"/>";

					$('#' + id).val(text);

					if (IEC[4]) {
						$('#' + id).attr('bza_fields', IEC[5]).attr('bza_basefield', IEC[4]).attr('bizapp_context', $('#' + id).closest('tr').attr('roid'));

						BizAPP.UI.Textbox.EnhanceAutoComplete({
							selector: '#' + id,
							userStatus: 'false',
							selectCallback: function (a, b) {
								$(a.target).attr('bza_ieval', b.item.identifier);
							}
						});
					}

					break;
			}
			if (typeof (BizAPP.Bootstrap) != 'undefined')
				$('#' + id).addClass('form-control');
			$('#' + id).attr('oldtext', text);
		}
	}
	setFocus('focusfirstitem');
}
function callDTP(event, id) {
	BizAPP.UI.DateTime.Init(id);
	//showCalendar("datepage.aspx?[IGDTP]=true&controlid=" + id + "", event);
}

function callgCancel(source, replaceOldValue) {
	source.className = 'gEdit';
	source.title = 'Modify';
	$(source).next().hide();
	var cells = source.parentNode.parentNode.getElementsByTagName("td");
	var editableColumns = source.parentNode.offsetParent.getAttribute("ecols");
	var ids = editableColumns.split('[IECPS]');

	for (var i = 0; i < ids.length; i++) {
		try {
			var IEC = ids[i].split(':');
			if (ids[i] != '' && parseInt(IEC[0]) != NaN) {
				if (replaceOldValue && replaceOldValue != false) {
					var oldval = $(cells[parseInt(IEC[0])]).find('[oldval]').attr('oldval');
				}
				else {
					var control = $(cells[parseInt(IEC[0])]).find('[oldval]')[0];
					switch (control.type.toLowerCase()) {
						case 'checkbox':
							oldval = control.checked == true ? '1' : '0';
							break;
						case 'select-one':
						case 'combobox':
							oldval = control.options[control.selectedIndex].text;
							break;
						default:
							oldval = control.value;
							break;
					}
				}

				oldval = oldval.replace(/{ST}/g, "<");
				oldval = oldval.replace(/{ET}/g, ">");
				oldval = oldval.replace(/{QT}/g, '"');

				cells[parseInt(IEC[0])].innerHTML = oldval;
			}
		}
		catch (Error) { logError('grid cancel failed - ', Error); }
	}
}

function editGrid(controlName) {
	var grid = getElementByBizAPPId(controlName, 'DIV');
	if (grid) {
		var grids = getBizAppElementsByClassName(grid, 'DIV', 'gEdit');
		while (grids && grids.length > 0) {
			var edit = grids.pop();
			if (edit && edit.onclick) {
				try {
					if (edit.click)
						edit.click();
					else if (edit.onclick)
						edit.onclick();
				}
				catch (Error) { }
				break;
			}
		};
	}
}

function callEdit(edit, controlName) {
	if (edit.className == 'gEdit') {
		edit.className = 'gCancel';
		edit.title = 'Cancel';
		var viewdatagrid = getElementByBizAPPId(controlName, "div"),
			gridRows = $(viewdatagrid).find('table.gridcontrol div.gEdit'),
			caption = getAttributeValue(viewdatagrid, 'bizappid') || controlName;

		if (caption)
			g_editableGrids.Add(caption, caption);

		for (var i = 0; i < gridRows.length; i++)
			callgEdit(gridRows[i]);
	}
	else if (edit.className == 'gCancel') {
		edit.className = 'gEdit';
		edit.title = 'Modify';
		var viewdatagrid = getElementByBizAPPId(controlName, "div");
		var gridRows = $(viewdatagrid).find('div.gCancel');

		for (var i = 0; i < gridRows.length; i++)
			callgCancel(gridRows[i], true);

		deleteNewRows(viewdatagrid);
	}
}

function deleteNewRows(viewdatagrid) {
	var newRows = getElementsByAttributeValue(viewdatagrid, 'tr', 'roid', '[NEWOBJECT]');
	if (viewdatagrid.nodeName.toLowerCase() != 'table')
		var grid = getBizAppElementsByClassName(viewdatagrid, "TABLE", "gridcontrol")[0];
	else
		grid = viewdatagrid;
	while (newRows.length > 0) {
		var child = newRows.pop();
		grid.deleteRow(child.rowIndex);
	}
}

function callCommit(commit, context, controlName, rowLevel) {
	callCommitRefresh(commit, context, controlName, true, rowLevel);
}
function callCommitRow(context, source, controlName, event) {
	if (source) {
		var callsrvr = false;
		var row = new Array();
		row.push(source.parentNode.parentNode);
		var value = getChangedValues(row);

		if (value != '')
			callsrvr = true;

		if (callsrvr == true) {
			var args = new Array();
			args[0] = 'Commit';
			args[1] = context;
			args[2] = controlName;
			args[3] = value;
			args[4] = 'false';
			var response = ajaxSyncCallAndNoResponseHandler("OptGridEx", args);
			if (response.value[3] == '') {
				//change row to non editable state
				var gridRows = getBizAppElementsByClassName(row[0], 'div', 'gCancel');
				callgCancel(gridRows[0], false);
				if (row[0].nextSibling) {
					var ele = row[0].nextSibling.getElementsByTagName('input')[0];
					if (ele) {
						ele.focus();
					}
					else if (ele = row[0].nextSibling.getElementsByTagName('select')[0]) {
						if (ele) {
							ele.select();
						}
					}
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}
	}
}
function callCommitRefresh(commit, context, controlName, refresh, rowLevel) {
	var viewdatagrid = getElementByBizAPPId(controlName, "div");
	var changedRows;
	if (rowLevel) {
		changedRows = new Array();
		changedRows.push(commit);
	}
	else {
		changedRows = getBizAppElementsByClassName(viewdatagrid, 'div', 'gCancel');
	}

	for (var i = 0; i < changedRows.length; i++) {
		changedRows[i] = changedRows[i].parentNode.parentNode;
	}

	var callsrvr = false;
	var changedrowCount = changedRows.length;

	if (changedrowCount > 0) {
		var value = getChangedValues(changedRows);

		if (value != '')
			callsrvr = true;
		else
			return true;
	}

	if (callsrvr == true) {
		var args = ['Commit', context, controlName, value, 'true'],
			src = 'OptGridEx';
		if (refresh == true)
			ajaxAsyncCall(src, args, false, true);
		else {
			var response = ajaxSyncCall(src, args);
			if (response.value[3] == '')
				return true;
		}
	}
}

function getChangedValues(changedRows) {
	var value = '', temp = '', editableColumns, ids;
	for (var i = 0; i < changedRows.length; i++) {
		var row = changedRows[i],
			roid = row.getAttribute('roid');
		if (roid != null) {
			temp += roid + '[OS]';

			var cells = row.childNodes;
			if (!editableColumns) {
				editableColumns = row.parentNode.parentNode.getAttribute("ecols");
				ids = editableColumns.split('[IECPS]');
			}

			for (var j = 0; j < ids.length; j++) {
				var iec = ids[j].split(':');
				var iecid = parseInt(iec[0]);
				if (!isNaN(iecid)) {
					try {
						var _newval, _oldval;
						switch (iec[1]) {
							case "ComboBox":
								var cb = cells[iecid].childNodes[0];
								_newval = cb.options[cb.selectedIndex].text;
								_oldval = getAttributeValue(cb, 'oldtext');
								break;
							case "CheckBox":
								var cb = cells[iecid].childNodes[0];
								_newval = cb.checked.toString().toLowerCase();
								_oldval = getAttributeValue(cb, 'oldtext').toLowerCase();
								break;
							case "DatetimePicker":
							case "TextBox":
								var tb = $(cells[iecid]).find('input');
								_newval = tb.attr('bza_ieval') || tb.val();
								_oldval = tb.attr('oldtext');
								break;
							default:
								_newval = cells[iecid].childNodes[0].value;
								_oldval = cells[iecid].childNodes[0].getAttribute('oldtext');
								break;
						}
						if (_newval != _oldval)
							temp += iecid.toString() + '[VS]' + _newval + '[PS]';
					}
					catch (Error) { logError(Error.message); }
				}
			}
			if (temp != (row.getAttribute('roid') + '[OS]')) {
				temp += '[ORS]';
				value += temp;
			}
			temp = '';
		}
	}
	return value;
}

function callCreate(create, controlName) {
	var viewdatagrid = getElementByBizAPPId(controlName, "div");
	var grid = getBizAppElementsByClassName(viewdatagrid, "table", "gridcontrol");
	if (grid.length == 1) {
		grid = grid[0];

		insertRow(grid);
		var caption = getAttributeValue(grid.offsetParent.offsetParent.offsetParent.offsetParent, 'bizappid');
		if (caption)
			g_editableGrids.Add(caption, caption);
	}
}
function insertRow(grid) {
	var row = grid.insertRow(grid.rows.length);
	row.setAttribute("roid", "[NEWOBJECT]");
	var ediatbleColumns = grid.getAttribute("ecols");

	var cellCount = grid.rows[0].cells.length;
	try {
		var a = getBizAppElementsByClassName(grid.rows[row.rowIndex - 1], "DIV", "gEdit");
		var iconCell = a[0];
		if (!iconCell)
			iconCell = getBizAppElementsByClassName(grid.rows[row.rowIndex - 1], "DIV", "gCancel")[0];

		if (iconCell) {
			iconCell = iconCell.parentNode;
			iconCell = iconCell.cellIndex;
		}
		else {
			//this is done to ensure that cancel icon is shown when there are no records in grid
			iconCell = 0;
		}
	}
	catch (Error) { }

	for (var i = 0; i < cellCount; i++) {
		var cell = row.insertCell(i);
		if (i == iconCell)
			cell.innerHTML = '<div title="Cancel" class="gCancel">&nbsp;</div>';
		else
			cell.innerHTML = '';
	}

	replaceWithEditors(ediatbleColumns, row.cells, true);
}
function callCreateOnTab(event, grid, controlName) {
	if (event.keyCode == 9) {
		var source = getSourceElement(event);
		if (source.tagName.toLowerCase() == "input" || source.tagName.toLowerCase() == "textarea") {
			var cell = source.parentNode;
			if (cell.cellIndex == grid.rows[0].cells.length - 1) {
				var row = cell.parentNode;
				if (row.rowIndex == grid.rows.length - 1) {
					if (isIE()) {
						var context = getBizAppElementsByClassName(getElementByBizAPPId(controlName), 'DIV', 'gCommit')[0].onclick.toString().split("'")[1];
					}
					else {
						context = getBizAppElementsByClassName(getElementByBizAPPId(controlName), 'DIV', 'gCommit')[0].onclick.toString().split(",")[1];
						context = context.split('"')[1];
					}
					if (context && callCommitRefresh(null, context, controlName, false) == true) {
						grid = getBizAppElementsByClassName(getElementByBizAPPId(controlName), 'TABLE', 'gridcontrol')[0];
						insertRow(grid);
					}
				}
			}
		}
	}
}

var g_gridStoreName = 'bizapp_ui_grid';
function saveSelectionOnSearchGrid(ctrlName) {
	var newVals = getGridSelectedValues(ctrlName);
	if (!newVals) return;
	var selectedVals = getPersistedValue(g_gridStoreName, ctrlName);
	if (selectedVals)
		selectedVals = selectedVals.concat(',');
	else
		selectedVals = '';
	persistValue(g_gridStoreName, ctrlName, selectedVals.concat(newVals));
	$('<span class="bza-sg-ammsg">Selected items have been added, you can continue to add more.</span>').insertBefore('.searchsteps');
	setTimeout(function () { $('.bza-sg-ammsg').remove() }, 3000);
}
function resetSelectionOnSearchGrid(ctrlName) { removePersistedValue(g_gridStoreName, ctrlName); }
//#endregion

function callAssociate(event, functionName, contextName, runtimeObjectId, handlerType, checkAllId, serializedGrid, cloneObject) {
	setForceFocus('forcefocus', event);
	var checkAll = '';
	var checkAllObj = getElementByBizAPPId(checkAllId, "input");

	if (checkAllObj) {
		if (checkAllObj.tagName == "input" || checkAllObj.tagName == "INPUT")
			checkAll = checkAllObj.checked.toString();
		else if (isIE() && checkAllObj.childNodes > 0)
			checkAll = checkAllObj.childNodes[0].checked.toString();
		else if (checkAllObj.childNodes > 1)
			checkAll = checkAllObj.childNodes[1].checked.toString();
	}

	if (checkAll != 'true' && !runtimeObjectId) {
		displayMessage(BizAPP.UI.Localization.NoRecordsSelected);
		return;
	}

	ProcessingStatus(true, true);
	var response = ajaxSyncCall('HelperEx', [functionName, contextName, runtimeObjectId, handlerType, checkAll, serializedGrid, cloneObject]);
	if ($('.tinner #tabs').length > 0)
		$('.tinner #tabs').tabs({ active: 1 });
}

function callAssociateAdvancedGrid(event, functionName, serializedContext, handlerType) {
	setForceFocus('forcefocus', event);
	var checkBoxSelection = getAdvancedGridCheckBoxSelection();

	if (checkBoxSelection != null) {
		var response = ajaxSyncCall('HelperEx', [functionName, serializedContext, checkBoxSelection, handlerType]);
		responseHandler(response);
	}
}

function callAssociateOperation(event, functionName, contextName, runtimeObjectId, operationName, collectionBased, serializedGrid, checkAllId) {
	if (runtimeObjectId != null) {
		var checkAllObj = getElementByBizAPPId(checkAllId, 'SPAN');
		var checkAll = 'false';

		if (checkAllObj && checkAllObj.childNodes > 0)
			checkAll = checkAllObj.childNodes[0].checked.toString();
		else {
			checkAllObj = getElementByBizAPPId(checkAllId, 'INPUT');
			if (checkAllObj && checkAllObj.checked != null) {
				checkAll = checkAllObj.checked.toString();
			}
		}

		ajaxAsyncCall('HelperEx', [functionName, contextName, runtimeObjectId, operationName, collectionBased, serializedGrid, checkAll], true);
	}
}

function callAssociateAdvancedGridOperation(functionName, contextName, operationName, collectionBased, serializedGrid) {
	var response = ajaxSyncCall('HelperEx', [functionName, contextName, getAdvancedGridCheckBoxSelection(), operationName, collectionBased, serializedGrid]);
	responseHandler(response);
}

function callAssociateSearchOnly(contextName, runtimeObjectId) {
	closeWindow(runtimeObjectId);
}
function callAssociateAdvancedGridSearchOnly(contextName) {
	closeWindow(getAdvancedGridCheckBoxSelection());
}

function callAddObjects(serializedArgs, selectedTypes) {
	var response = ajaxSyncCall('HelperEx', ['AddSelectedObjects', serializedArgs, selectedTypes]);
	responseHandler(response);
}

function callAdvancedSearch(serializedArgs, searchType) {
	var response = ajaxSyncCall('SearchEx', ['AdvancedSearch', serializeArgs, BizAPP.UI.getValue(searchType, 'formcombobox')]);
	responseHandler(response);
}

function callRuntimeMethod(serializedContext) {
	ajaxSyncCall('HelperEx', ['CallRuntimeMethod', serializedContext]);
}

function callPostRuntimeMethod(serializedContext) {
	ajaxSyncCall('HelperEx', ['CallPostRuntimeMethod', serializedContext]);
}

function callHelper(functionName, serializedContext) {
	ajaxAsyncCall('HelperEx', [functionName, serializedContext], true);
}
function getPendingStatusArgs(ajaxArgs) {
	return ['PendingActionStatus', 'PendingActionStatus'];
}

function callWizard(id) {
	var node = getElementByBizAPPId(id);
	if (node != null) {
		node.click();
	}
}

function initializeStartUp() { }
function getElementByAttribute(attrName, key) {
	var allElements = getAllElements();
	if (key != null) {
		for (var i = 0; i < allElements.length; i++) {
			var obj = allElements[i];
			if (obj.getAttribute(attrName) == key) {
				return obj;
			}
		}
	}
	else {
		for (var i = 0; i < allElements.length; i++) {
			var obj = allElements[i];
			if (obj.tagName && obj.getAttribute(attrName) != null) {
				return obj;
			}
		}
	}
}
function getAllElementsForMozilla(allElements, parent) {
	for (var i = 0; i < parent.childNodes.length; i++) {
		allElements.push(parent.childNodes[i]);
	}
	for (i = 0; i < parent.childNodes.length; i++) {
		getAllElementsForMozilla(allElements, parent.childNodes[i]);
	}
}
function getAllElements() {
	if (isIE())
		return document.all;
	else {
		var allElements = new Array();
		getAllElementsForMozilla(allElements, document.documentElement);
		return allElements;
	}
}


function replaceControls(result) {
	if (result != null) {
		res = result.value;
		var resIndex = 0;
		if (res != null) {
			debug("replaceControls( " + res + " )", "info");
			var responses = new Array();
			responses = res.split('[START_OF_RESPONSE]');
			for (j = 1; j < responses.length; j++) {
				var response = responses[j].split('[END_OF_RESPONSE]')[0];

				var divIDValues = new Array();
				divIDValues = response.split('[DS]');
				var divIDValue = new Array();
				for (i = 0; i < divIDValues.length; i++) {
					divIDValue = divIDValues[i].split('[IDS]');
					var replaceMode = divIDValue[0];
					var oObject = getElementByBizAPPId(divIDValue[1], getClientTagName(divIDValue[3]));
					debug(divIDValue[2]);

					if (oObject != null) {
						var replaceStr = "oObject." + divIDValue[0] + " = divIDValue[2]";
						var obj = document.createElement(divIDValue[2]);
						eval(replaceStr);
					}
				}
			}

			if (res != null) {
				var events = new Array();
				events = res.split('[START_OF_EVENT]');

				for (i = 1; i < events.length; i++) {
					var eves = events[i].split('[END_OF_EVENT]')[0];

					var evesList = new Array();
					evesList = eves.split('[ES]');
					for (j = 0; j < evesList.length; j++) {
						var eve = evesList[j];
						handleEvent(eve);
					}
				}
			}
			if (res != null) {
				var exceptions = new Array();
				exceptions = res.split('[START_OF_EXCEPTION]');

				for (i = 1; i < exceptions.length; i++) {
					var exception = exceptions[i].split('[END_OF_EXCEPTION]')[0];
				}
			}
		}
	}
	else {
		debug("null result");
	}
}

function getClientTagName(tagName) {
	switch (tagName) {
		case "TEXTAREA":
			return "TEXTAREA";
		case "Label":
		case "TextBox":
		case "CheckBox":
		case "Radio":
		case "INPUT":
			return "INPUT";
		case "ComboBox":
		case "SELECT":
			return "SELECT";
		case "SPAN":
			return "SPAN";
		case "TR":
			return "TR";
		case "TABLE":
			return "TABLE";
		default:
			return "DIV";
	}
}

function backGroundBlocker(enable) {
	var backGroundBlockerElement = getElementByBizAPPId('backgroundmasker', 'div');
	if (backGroundBlockerElement != null) {
		if (enable == "true" || enable == "True") {
			backGroundBlockerElement.style.position = 'absolute';
			backGroundBlockerElement.style.top = 0 + "px";
			backGroundBlockerElement.style.left = 0 + "px";

			backGroundBlockerElement.style.width = window.screen.availWidth + "px";
			backGroundBlockerElement.style.height = window.screen.availHeight + "px";

			backGroundBlockerElement.style.display = "block";
		}
		else {
			backGroundBlockerElement.style.display = 'none';
		}
	}
}

function responseHandler(response) {
	addLog('*** Response Handler Begin. ***');
	ProcessingStatus(false, true);

	var backGroundBlockerElement = getElementByBizAPPId('backgroundmasker', 'div');
	if (backGroundBlockerElement != null)
		backGroundBlockerElement.style.display = "none";

	if (response != null && response.value != null) {
		var startTime = (new Date()).getTime();
		var status = response.value[0];
		var html = response.value[1];
		var events = response.value[2];
		var exceptions = response.value[3];
		var debugs = response.value[4];
		var responseId = response.value[5];

		var responseTime = response.value[6];
		var serverStartTime = response.value[7];

		var retry = true;

		if (html && html.split("IDS").length > 1)
			addLog("Response received for : " + responseId + ", Replacing " + html.split("[IDS]")[1]);
		else
			addLog("Response received for : " + responseId);

		if (!requestCancelled(responseId)) {
			if (responseTime)
				displayStatus(status);


			replaceHTML(html, retry, function () {
				displayExceptions(exceptions, debugs);
				fireEvents(events);
				BizAPP.UI.InlinePopup._setTINYPosition(true);

				if (debugs)
					displayDebugs(debugs);

				BizAPP.UI.successHandler(html);
			});
		}
	}
	IncrementRequestCount(-1);

	processResponseTime(startTime, serverStartTime, responseTime, response);
	addLog('*** Response Handler End(' + responseId + '). ***');
}
function processResponseTime(startTime, serverStartTime, responseTime, response) {
	return;
	if (responseTime && (getActiveRequests() <= 0 || g_ajaxRequests <= 0)) {
		var time = getTotalRequestTime("__TR__");
		var initTime = (new Date()).getTime();
		var clientTime = initTime - startTime;

		var ajaxTime = getTotalRequestTime("__TR1__");
		var pipeOutTime = (parseInt(serverStartTime) - getSessionValue("__TR1__")) / 1000;
		var pipeInTime = (startTime - (parseInt(serverStartTime) + parseInt(responseTime))) / 1000;
		var wireTime = pipeInTime + pipeOutTime;

		var status;
		var bytesReceived = 0;
		if (response.value[1] != null)
			bytesReceived = Math.floor(response.json.length / 1024);

		if (bytesReceived > 1)
			status = ("Network Time: " + wireTime.toString().substring(0, 5) + " s, Server Response Time: " + (responseTime / 1000).toString().substring(0, 5) + " s, Browser Response Time : " + (clientTime / 1000).toString().substring(0, 5) + " s, Bytes Received: " + bytesReceived + " KB");
		else
			status = ("Network Time: " + wireTime.toString().substring(0, 5) + " s, Server Response Time: " + (responseTime / 1000).toString().substring(0, 5) + " s, Browser Response Time : " + (clientTime / 1000).toString().substring(0, 5) + " s, Bytes Received:" + response.json.length + " B");

		addLog('\n' + status);
		displayStatus(status, true);
	}
}
function displayStatus(statusText, local) {
	if (!statusText)
		return;

	window.status = statusText;
	if (local) {
		var status = $('#displayStatus');
		if (status.length == 0)
			$('body').append('<div id="displayStatus" style="position:fixed;bottom:0;left:250px;background-color:#D8DFEA;height:9px;padding:5px 10px;"><span style="padding: 0 5px;cursor:pointer" onclick="$(this).next().toggle().text(); $(this).text($(this).text() == \'<\' ? \'>\' : \'<\');">&lt;</span><span class="stat_txt" style="display: inline;">' + statusText + '</span></div>');
		else
			status.find('.stat_txt').append('\n' + statusText);
	}
}
function callShowStatus() {
	var statusDetails = getElementByBizAPPId('_StatusDetails');
	if (statusDetails != null) {
		statusDetails.style.display = "block";
	}
}
function replaceControl(divIDValue, oObject, callback) {
	if (oObject != null) {
        /*var div = getElementByBizAPPId(divIDValue[1]);

        if (!isIE()) {
            var tag = divIDValue[2].split(' ')[0].replace('<', '');
            div = getElementByBizAPPId(divIDValue[1], tag, false);
        }*/

		BizAPP.UI.TransformUI($(divIDValue[2]), function ($html) {
			var transformedHtml = '';
			$html.each(function (i, v) {
				if (v && v.outerHTML)
					transformedHtml += v.outerHTML;

			});
			divIDValue[2] = transformedHtml;

			BizAPP.UI.PreResponseHandler(divIDValue[1]);
			var replaceStr = null;
			var subStr = "";

			var className = getClassName(oObject);
			switch (className) {
				case "formcombocolorbox":
					replaceComboBox(divIDValue, oObject);
					break;
				case "formdelete":
				case "formcreatenewbutton":
					if (isIE()) {
						replaceStr = replaceDefaultString(divIDValue[0]);
						eval(replaceStr);
					}
					else {
						replaceImage(divIDValue[2], oObject);
					}
					break;
				default:
					if (divIDValue[0] == "outerHTML") {
						if (oObject.parentElement != null && oObject.parentElement.getAttribute("styletype") == 'DUMMY')
							oObject = oObject.parentElement;
						if (isIE6())
							divIDValue[2] = "<div styletype=\"DUMMY\" style=\"height:1px;width:100%;valign:top;\">" + divIDValue[2] + "</div>";

						replaceOuterHTML(oObject, divIDValue);
					}
					else {
						if (!isIE()) {
							oObject.style.display = 'block';
							if (className != 'RichTextEx' && className != 'formrichtext')
								oObject.style.top = oObject.style.left = '0px';
						}
						try {
							oObject.innerHTML = divIDValue[2];
						}
						catch (Err) { $(oObject).html(divIDValue[2]); }
					}
					break;
			}

			BizAPP.UI.TabControl.ResponsiveInit();
			if (callback)
				callback();
		});
	}
	else if (callback)
		callback();
}
function replaceOuterHTML(oObject, divIDValue) {
	if (oObject.outerHTML)
		oObject.outerHTML = divIDValue[2];
	else if (isChrome())
		chromeOuterHTML(oObject, divIDValue[2]);
	else
		$(oObject).replaceWith(divIDValue[2]);
}
function chromeOuterHTML(oObject, divIDValue) {
	var parentNode = oObject.parentNode;
	if (!parentNode) return;

	try {
		var el = document.createElement('div');
		el.innerHTML = divIDValue;
		var range = document.createRange();
		range.selectNodeContents(el);
		var documentFragment = range.extractContents();
		parentNode.insertBefore(documentFragment, oObject);
		parentNode.removeChild(oObject);
	}
	catch (Error) {
		parentNode.replaceChild(el.children[0], oObject);
	}
}
function replaceDefaultString(replaceType) {
	var replacedString = "oObject." + replaceType + " = divIDValue[2]";
	return replacedString;
}
function removeTagNode(tag, tagName) {
	var splitStr = new Array();
	var returnArray = new Array();
	var returnStr = "";

	splitStr = tag.split("</" + tagName + ">");
	returnArray = splitStr[0].split("\">");

	if (returnArray.length > 2) {
		for (var i = 1; i < returnArray.length - 1; i++) {
			returnStr = returnStr + returnArray[i] + "\">";
		}
		returnStr = returnStr + returnArray[i];
	}
	else
		returnStr = returnArray[1];

	return returnStr;
}
function setBehaviour(oObject, value) {
	if (value == "True") {
		oObject.disabled = false;
	}
	else {
		oObject.disabled = true;
	}
}
function setCheckBoxBehaviour(oObject, value) {
	if (!isIE6())
		setBehaviour(oObject, value);
	else {
		if (value == "True") {
			oObject.disabled = false;
			if (oObject.childNodes.length == 2) {
				oObject.childNodes[0].disabled = false;
				oObject.childNodes[1].disabled = false;
			}
			else {
				oObject.parentNode.disabled = false;
			}
		}
		else {
			oObject.disabled = true;
			if (oObject.childNodes.length == 2) {
				oObject.childNodes[0].disabled = true;
				oObject.childNodes[1].disabled = true;
			}
			else {
				oObject.parentNode.disabled = true;
			}
		}
	}
}
function replaceImage(valueString, oObject) {
	var valueStr = valueString.split('src="')[1];
	if (valueStr)
		valueStr = valueStr.split('"')[0];

	oObject.src = valueStr;

	valueStr = valueString.split('class="')[1];
	if (valueStr)
		valueStr = valueStr.split('"')[0];
	setControlAttribute(oObject, "class", valueStr);

	valueStr = valueString.split('onclick="')[1];
	if (valueStr)
		valueStr = valueStr.split('"')[0];

	setControlAttribute(oObject, "onclick", valueStr);
}
function setControlAttribute(oObject, attributeName, attributeValue) {
	if (oObject.attributes[attributeName]) {
		if (attributeValue)
			oObject.attributes[attributeName].value = attributeValue;
		else
			oObject.attributes.removeNamedItem(attributeName);
	}
	else {
		var newAttribute = document.createAttribute(attributeName);
		newAttribute.value = attributeValue;
		oObject.attributes.setNamedItem(newAttribute);
	}
}

function replaceComboBox(divIDValue, oObject) {
	for (i = oObject.options.length; i >= 0; i--) {
		oObject.remove(i);
	}
	var items = divIDValue[2].split("[_IS]");

	setBehaviour(oObject, items[0]);

	for (i = 1; i < items.length; i++) {
		var item = items[i];

		var valCollection = item.split("[_TVS]");
		var text = valCollection[0];
		var value = valCollection[1];
		var selected = valCollection[2];

		var selectItem = document.createElement("OPTION");
		selectItem.text = text;
		selectItem.value = value;
		if (oObject.className == "formcombocolorbox") {
			try {
				selectItem.style.backgroundColor = value;
			}
			catch (Error) { }
		}
		if (selected == "True")
			selectItem.selected = true;

		if (isIE())
			oObject.add(selectItem);
		else
			oObject.options.add(selectItem);
	}
}
function replaceHTML(html, retry, callback) {
	if (html != null && html != 'null' && html != "") {
		var start = (new Date()).getTime();
		var activeObjName = "";
		try {
			if (document.activeElement) {
				activeObjName = $(document.activeElement).closest('[bizappid]').attr('bizappid');
			}
		} catch (Error) { }

		html = addWindowEvent(html);

		var divIDValues = new Array();
		divIDValues = html.split('[DS]');

		var divIDValue = new Array();
		var oObjects = null;

        /*var objectIdStr = "";
        var objectIds = new Array();

        for (j = 0; j < divIDValues.length; j++) {
            divIDValue = divIDValues[j].split('[IDS]');
            objectIds[j] = divIDValue[1];

            objectIdStr = objectIdStr + divIDValue[1] + " ";
        }*/

		var index = 0;
		internalReplaceHTML(index, divIDValues, retry, callback);
		try {
			if (activeObjName != null && activeObjName.length > 0) {
				var activeObj = $(getElementByBizAPPId(activeObjName));
				if (!activeObj.is(":focus")) {
					activeObj.focus();
					activeObj.select();
				}
			}
		}
		catch (Err) { }
	}
	else {
		if (callback)
			callback();
	}
}

function internalReplaceHTML(index, divIDValues, retry, callback) {
	var callback1;
	if ((index + 1) < divIDValues.length) {
		callback1 = function () { internalReplaceHTML(index + 1, divIDValues, retry, callback); }
	}
	else {
		callback1 = callback;
	}
	divIDValue = divIDValues[index].split('[IDS]');
	var oObject = getElementByBizAPPId(divIDValue[1], getClientTagName(divIDValue[3]));
	var replaceMode = divIDValue[0];

	if (!oObject) {
		logError("control replace failed : " + divIDValue[1]);

		if (retry == true || retry == "true") {
			try {
				if (window.parent != window) {
					try {
						window.parent.replaceHTML(html, retry, callback);
					}
					catch (Error) {
						replaceItems[replaceIndex] = divIDValue[2];
						setTimeout("replaceValueMode( '" + replaceMode + "', " + oObject + ", 'replaceItems[" + replaceIndex + "]', " + callback1 + " )", 100);
						replaceIndex++;

						if (replaceIndex > 5)
							replaceIndex = 1;
					}
				}
			}
			catch (Error) { }
		}
		else {
		}
	}

	if (!oObject && divIDValue.length == 5) {
		var parent = getElementByBizAPPId(divIDValue[4], getClientTagName("DIV"));
		if (parent != null) {
			var object = document.createElement(getClientTagName(divIDValue[3]));

			eval("object." + divIDValue[0] + "= divIDValue[2];");
			parent.appendChild(object);
		}
	}

	//replaceMode
	replaceValueMode(replaceMode, oObject, divIDValue, callback1);
}

var replaceItems = new Array();
var replaceIndex = 1;

function replaceValueMode(replaceMode, oObject, divIDValue, callback) {
	switch (replaceMode) {
		case "create":
			if (oObject == null) {
				oObject = document.createElement("DIV");
				document.appendChild(oObject);
			}
			divIDValue[0] = "outerHTML";
		case "innerHTML":
		case "outerHTML":
			replaceControl(divIDValue, oObject, callback);
			break;
		case "replaceHTML":
			var replaceStr = null;
			oObject.outerHTML = divIDValue[2];
			break;
	}
}
// Html updater
function updateControl(customControl, runtimeObjectId) {
	updateControl(customControl, runtimeObjectId, "")
}
function updateControl(customControl, runtimeObjectId, eventId) {
	var returnValue;
	var controltype = customControl["controltype"];
	debug("updateControl ( " + controltype + " ) ", "info");

	var ajaxArgs = new Array();
	ajaxArgs[1] = customControl["context"];

	if (getSessionValue('viewcontrol')) {
		ajaxArgs[2] = getSessionValue('viewcontrol');
		setSessionValue('viewcontrol', '');
	}
	else
		ajaxArgs[2] = customControl["context"];

	ajaxArgs[3] = runtimeObjectId;

	if (customControl["view"])
		ajaxArgs[4] = customControl["view"];

	ajaxArgs[5] = bza_getSize(customControl["context"]);
	ajaxArgs[6] = activeRecordArgs;

	switch (controltype) {
		case "ViewBusinessObjectForm":
		case "BizAPPForm":
			{
				ajaxArgs[0] = "GetRenderedOutlineControl";
				callOutline(ajaxArgs);
				break;
			}
		case "BizAPPGrid":
			{
				ajaxArgs[0] = "GetRenderedGrid";
				callGrid(ajaxArgs);
				break;
			}
		case "ViewTreeControl":
			{
				ajaxArgs[0] = "GetRenderedTree";
				callTree(ajaxArgs);
				break;
			}
		case "ViewCollectionControl":
			{
				ajaxArgs[0] = "GetRenderedViewCollection";
				callViewCollection(ajaxArgs);
				break;
			}
		case "RecentViewControl":
			{
				ajaxArgs[0] = "GetRenderedViewCollection";
				callRecentViewCollection(ajaxArgs);
				break;
			}
		case "ViewControl":
			{
				ajaxArgs[0] = "RenderView";
				callView(ajaxArgs);
				break;
			}
		case "RestoreControl":
			{
				ajaxArgs[0] = "MinimizeControl";
				callMinimizeControl(ajaxArgs);
				break;
			}
		case "ScreenControl":
			{
				ajaxArgs[0] = "ChangeFavourites";
				ajaxArgs[3] = eventId;
				callScreenControl(ajaxArgs);
				break;
			}
		case "SchedulerControl":
			{
				ajaxArgs[0] = "RenderSchedulerControl";
				ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
				break;
			}
		default:
			debug("undefined type " + customControl["controltype"], "info");
	}
}

function renderTargetControl(functionName, controlName, viewControlName, viewEnerpriseId, runtimeobjectIdentifier) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = functionName;
	ajaxArgs[1] = controlName;
	ajaxArgs[2] = viewControlName;
	ajaxArgs[3] = runtimeobjectIdentifier;
	ajaxArgs[4] = viewEnerpriseId;
	ajaxArgs[5] = "null,null";

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}

function showWindow(page) {
	window.open(page);
}
function showView(page, runtimeObjectKey) {
	var redirectPage = page + "&" + runtimeObjectKey + "=" + getSessionValue(runtimeObjectKey);
	window.open(redirectPage);
}
function displayMessage(message, inline) {
	if (inline)
		BizAPP.UI.InlinePopup.CreateNew({ html: message });
	else
		alert(message);
}

function closePopupWindowAndNavigate(args) {
	var activePopup = BizAPP.UI.InlinePopup.getActivePopup(false);
	if (!activePopup)
		closeWindow(args);
	else {
		zoomout();
		handleEvent(args);
	}
}

function closePopupWindow(popup, closeParent) {
	if (popup == true || popup == "true" || popup == "True") {
		if (location.href != window.top.location.href) {
			if (closeParent) {
				window.parent.returnValue = popup;
				window.top.close();
			}
			else {
				window.returnValue = popup;
				window.close();
			}
		}
		else
			window.top.zoomout();
	}
}
function closeWindow() {
	closeWindow("");
}
function closeWindow(returnValue) {
	closePopupWindow(true, false);
}
function closeParentWindow(returnValue) {
	closePopupWindow(returnValue, true);
}

function openInNewWindow(url, closeExistingWindow, disableAdvancedFeatures) {
	if (closeExistingWindow == 'true')
		window.close();

	if (disableAdvancedFeatures == 'true') {
		var features = "resizable=yes,scrollbars=yes,status=yes,menubar=no,titlebar=yes,location=no";
		window.open(url, "_blank", features, "");
	}
	else {
		window.open(url);
	}
}

function openInNewWindowInFullScreen(event, url) {
	if (!event)
		event = window.event;

	var width = window.document.documentElement.offsetWidth;

	if (isIE())
		width = width - 20;

	var features = "height=" + window.document.documentElement.offsetHeight + ",width=" + width + ",top=0,left=0,resizable=yes,scrollbars=yes,status=no,menubar=yes,titlebar=yes,location=no,toolbar=yes";
	window.open(url, "", features, "")
}

function getPopUp() {

	var dialog = getElementByBizAPPIdFromRoot("popup", "DIV");
	if (dialog == null) {
		dialog = this.parent.getElementByBizAPPIdFromRoot("popup", "DIV");
	}
	if (dialog) {
		return dialog;
	}
	else {
		debug('popup windows unavailable');
	}
}
function callEmbedControl(viewControlName, ctrlName, ctrlType, viewdefDisplayname, isEnterprise, displayType, runtimeobjectId, serializedString) {
	var ajaxArgs = new Array();
	var i = 0;

	ajaxArgs[i++] = "EmbedControl";
	ajaxArgs[i++] = viewControlName;
	ajaxArgs[i++] = ctrlName;
	ajaxArgs[i++] = ctrlType;
	ajaxArgs[i++] = viewdefDisplayname;
	ajaxArgs[i++] = bza_getSize(ctrlName);
	ajaxArgs[i++] = isEnterprise;
	ajaxArgs[i++] = displayType;
	ajaxArgs[i++] = runtimeobjectId;
	ajaxArgs[i++] = serializedString;
	ajaxAsyncCall("HelperEx", ajaxArgs, false);
}


function IncrementRequestCount(incr) {
	var activeRequests = getSessionValue("__AR__");
	if (activeRequests == null || activeRequests == 0) {
		activeRequests = 0;
		initiateTotalRequestTime();
	}

	activeRequests += incr;
	setSessionValue("__AR__", Math.max(0, activeRequests));
}
function getActiveRequests() {
	var activeRequests = getSessionValue("__AR__");
	return activeRequests;
}
function initiateTotalRequestTime() {
	var date = new Date();
	setSessionValue("__TR__", date.getTime());

}
function getTotalRequestTime(id) {
	var startTime = getSessionValue(id);
	var endTime = new Date();

	return (endTime.getTime() - startTime) / 1000;
}
function setHeight(obj, height) {
	if (isIE()) {
		obj.style.height = height;
	}
	else
		setHeightForMozilla(obj, height);
}
function getHeightForMozilla(obj) {
	if (obj.style) {
		var height = obj.style.height;

		if (height && height != "0px") {
			if (height.indexOf("%") == -1)
				return height.split("px")[0];
		}
	}
	return null;

	if (obj.style && obj.style.height)
		return obj.style.height;

	return obj.clientHeight;
}
function getHeight(obj) {
	if (!isIE())
		return getHeightForMozilla(obj);

	if (obj.style) {
		var height = obj.style.height;

		if (height && height != "0px") {
			if (height.indexOf("%") == -1)
				return height.split("px")[0];
		}
	}
	return null;
}
function setHeightForMozilla(obj, height) {
	if (isNaN(height))
		obj.style.height = height;
	else
		obj.style.height = height + "px";
}
function setWidthForMozilla(obj, width) {
	if (isNaN(width))
		obj.style.width = width;
	else
		obj.style.width = width + "px";

}
function setWidth(obj, width) {
	if (isIE()) {
		obj.style.width = width;
	}
	else
		setWidthForMozilla(obj, width);
}

function getWidthForMozilla(obj) {
	if (obj.style && obj.style.width)
		return obj.style.width;

	return obj.clientWidth;
}
function getWidth(obj) {
	if (!isIE())
		return getWidthForMozilla(obj);

	if (obj.style) {
		var width = obj.style.width;

		if (width && width != "0px") {
			if (width.indexOf("%") == -1)
				return width.split("px")[0];
		}
	}
	return null;
}
function setWindowSize(height, width) {
	if (window) {
		height = parseInt(height.replace("px", ""));
		width = parseInt(width.replace("px", ""));
		height += 40;
		width += 20;

		if (isIE()) {
			var screenWidth = ((window.screen.availWidth / 2) - (width) / 2);
			var screenHeight = ((window.screen.availHeight / 2) - (height) / 2);

			window.dialogTop = screenHeight + "px";
			window.dialogLeft = screenWidth + "px";

			height += 'px';
			width += 'px';
			window.dialogHeight = height;
			window.dialogWidth = width;
		}
		else {
			window.resizeTo(width, height);
		}

		if (g_SLFileUpload != undefined && g_SLFileUpload != '') {
			var ctrl = document.getElementById(g_SLFileUpload);
			if (ctrl) {
				ctrl.style.height = document.body.clientHeight - 30;
				ctrl.style.width = document.body.clientWidth;
			}
			g_SLFileUpload = '';
		}
	}
}
function setSearchWindowSize() {
	if (window) {
		if (isIE()) {
			setWindowSize("450px", "780px");
		}
		else {
			setWindowSize("480", "780");
		}
	}
}

function setDownloadPrompPageSize() {
	if (window) {
		setWindowSize("200", "300");
	}
}

function setAdvancedSearchWindowSize() {
	if (window) {
		if (isIE()) {
			setWindowSize("550px", "780px");
		}
		else {
			setWindowSize("600", "780");
		}
	}
}

function isDialog() {
	return (window.external.dialogHeight != null);
}
function redirectToPage(page) {
	try {
		if (page.toLowerCase() == "login.aspx" && document.URL.toLowerCase().indexOf("system/diagnostics.aspx") > -1)
			page = "../login.aspx";

		if (page.toLowerCase() == "enterpriseview.aspx" && document.URL.toLowerCase().indexOf("system/diagnostics.aspx") > -1)
			page = "../enterpriseview.aspx";

		if (getQSParamByName('html.redirectself').toLowerCase() == "false" && (page.indexOf('html.su=true') == -1 || page.toLowerCase().indexOf('enterpriseview.aspx') != -1))
			window.top.location.href = page;
		else {
			if (window.location.hostname == window.top.location.hostname)
				window.top.location.href = page;
			else
				window.location.href = page;
		}
	}
	catch (Error) {
		window.location.href = page;
	}
}

function callGeneratePPT() {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "GeneratePPT";

	callPPTWithProcessing(ajaxArgs);
}

function callPPTWithProcessing(ajaxArgs) {
	debug("PPT: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("PowerPointEx", ajaxArgs, false, true);
}

function ShowPPT(ppt) {
	location.href = ppt;
}
function refeshUrl() {
	window.parent.location.href = window.parent.location.href;
}

function navigate(href) {
	if (isIE()) {
		if (event.shiftKey) {
			window.open(href.href.replace("EnterpriseView.aspx", "TestView.aspx"));
			return false;
		}
		else {
			var path = href.href.search.subString(10);
			return false;
		}
	}
}
function OpenDownloadPage(url) {
	window.open(url, '', 'width=350,height=170,resizable=yes,scrollbars=yes,status=no,location=no,menubar=no');
}
function download(url) {
	//window.open(url);
	bizapp_initDwnld(url);
}
function bizapp_exportTable(table, mode) {
	if (!mode)
		mode = 'excelexport';
	setSessionVariable('bizappuiexporttable', escape($(table).html()), false);
	return bizapp_initDwnld('download.asmx?mode=' + mode);
}
function bizapp_initDwnld(url) {
	url += '&bza-transmit=1';
	url += '&html.app=' + JSON.parse(BizAPP.UI.currentApplication).bizappcurrentapplicationeid;
	if ($.fileDownload) {
		ProcessingStatus(true, true);
		$.fileDownload(url, {
			successCallback: function (url) {
				ProcessingStatus(false, true);
			},
			failCallback: function (responseHtml, url) {
				ProcessingStatus(false, true);
				alert('failed to download file')
			}
		});
	}
	else {
		var frame = bizapp_GCDwnldFrame();
		frame.src = '';
		if (url.indexOf('?') == -1)
			frame.src = url + '?v=' + new Date().getTime();
		else
			frame.src = url + '&v=' + new Date().getTime();
		return frame;
	}
}
function handleExternalLink(url) {
	if (isChrome())
		BizAPP.UI.InlinePopup.CreateNew({ iframe: url });
	else
		window.top.open(url);
}
function manualDownload(url) {
	window.close();
	download(url);
}
function labelout(obj) {
	obj.style.textDecoration = "none";
}
function labelover(obj) {
	obj.style.textDecoration = "underline";
}

//function xPath(oNodes, sXPath) {
//    if (oNodes) {
//        if (window.XMLHttpRequest) {
//            try {
//                var oXpe = new XPathEvaluator();
//                var oNsResolver = oXpe.createNSResolver(oNodes.ownerDocument == null ? oNodes.documentElement : oNodes.ownerDocument.documentElement);
//                var oResult = oXpe.evaluate(sXPath, oNodes, oNsResolver, 0, null);
//                var aFound = [];
//                var oRes;
//                while (oRes = oResult.iterateNext()) {
//                    aFound.push(oRes);
//                }
//                return aFound;
//            }
//            catch (Error) {
//                displayMessage(Error.description);
//            }
//        }
//        else {
//            try {
//                oNodes.setProperty("SelectionLanguage", "XPath")
//                var oSelectedNode = oNodes.documentElement.selectNodes(sXPath);
//                return oSelectedNode;
//            }
//            catch (Error) {
//                displayMessage(Error.description);
//            }
//        }
//    }
//}
/***--InRichText--***/

function WebHtmlEditor_Blur(oEditor) {
	this.form1.submit();
}

/***--Chart.js--***/

function displayChartTemplate(event, chc, chartEnterpriseId, query, isForm, formId, ctrlName) {
	if (event == null)
		event = window.event;

	var roid = $(this).closest('[bizapp_name]').attr('bizapp_context');
	BizAPP.UI.Grid.initChartPopup(event, chc, '', query, isForm, formId, ctrlName);
}

function callRenderChart(chc, id) {
	callChart(['RenderChart', chc, BizAPP.UI.getValue(id, "formcombobox")]);
}

function callChart(ajaxArgs) {
	ajaxAsyncCall("MSChartEx", ajaxArgs, false, false);
}

/***--Date.js--***/

// Animation levels ( none, fast, slow )
var displayMode = "both";
var showCalc = false;
var calendarId = "__Calendar_";

function closeCalendar(event) {
	//Closes chat-panel on outside click
	if ($('#chat-panel').is(':visible')) {
		try {
			if (arguments.callee.caller.toString().indexOf("bza_BaseClickHandler") > 0) { }
			else { if (typeof BizAPP.Collaboration != 'undefined') BizAPP.Collaboration.toggleCtrl(); }
		} catch (e) { BizAPP.Collaboration.toggleCtrl(); }
	}

	$('.gridcontrol .bza-dropdown').removeClass('open');
	hideExpandViewPopup();
	showHideMenu();
	BizAPP.UI.Grid.RemoveNonAppliedFilter();
	//if (event && !$(event.target).closest('.ui-datepicker-header, .ui-datepicker-calendar, .ui-timepicker-div, .ui-datepicker-buttonpane').length)
	//    BizAPP.MenuPopup.HideOrRemovePopup();
	BizAPP.MenuPopup.HideOrRemovePopup();

	$('.sort-popup').hide(); // adv list filter and sort
	if ($.danidemo)
		$.danidemo.updateFileProgress(0, '100%');
	try {
		if (isIE())
			document.parentWindow.hideCalendar();
		else
			this.parent.hideCalendar();
	}
	catch (Error) { }
}
function hideExpandViewPopup() {
	var gridExpandviewPopupContainer = getElementByBizAPPId("gridexpandviewpopupcontainer", 'div');
	if (gridExpandviewPopupContainer != null && gridExpandviewPopupContainer.style.display != 'none')
		gridExpandviewPopupContainer.style.display = 'none';
}
function hideCalendar() {
	if (showCalc) {
		showCalc = false;
	}
	var calendar = getElementByBizAPPIdFromRoot(calendarId, "DIV");

	if (calendar) {
		try {
			calendar.style.display = 'none';
			var eve = popEvent(this.parent);
			this.parent.eval(eve);
		}
		catch (Error) { }
	}
}
function showCalendar(datepage, event) {
	var calendar = getElementByBizAPPId(calendarId, 'div');
	if (calendar) {
		if (event == null)
			event = window.event;

		var source = getSourceElement(event);
		var position = getElementPosition(source);
		var left = event.clientX;
		var top = event.clientY;
		if (position) {
			left = position[0];
			top = position[1];
		}

		if (document.body.scrollHeight - top < 250)
			top = document.body.scrollHeight - 250;
		if (document.body.clientWidth - left < 213)
			left = document.body.clientWidth - 213;

		calendar.style.left = left + 'px';
		calendar.style.top = top + 'px';
		calendar.style.display = 'block';
		var inlinePopup = $(getSourceElement(event)).closest('.tbox');
		calendar.style.position = inlinePopup && inlinePopup.length > 0 ? inlinePopup.css('position') : 'absolute';

		var ifr = $('#' + calendarId).children('iframe')[0];
		ifr.src = datepage;
		ifr.height = 213;
		ifr.width = 250;
		ifr.style.display = 'block';
	}
	showCalc = true;
}

function setDateValue(controlId, date, args) {
	var control = getElementByBizAPPId(controlId, 'input');
	if (control != null) {
		if (date != null && date != "") {
			control.value = date;
		}
		control.focus();
	}

	if (date != null && date != "") {
		if (args)
			callGetDependentFields(args);
	}
}

/***--Description.js--***/

var content;
function initialize(args) {
	var richtextcontrol = document.getElementById('RichText');
	if (richtextcontrol == null) {
		// Control Might have not been loaded. try loading it after couple of minutes
		window.setTimeout("initialize( '" + args + "' )", 500);
	}
	else {
		var designEditor = document.getElementById("RichText_designEditor");
		if (designEditor != null) {
			designEditor.onblur = function () { save(args, richtextcontrol.value); };
			content = richtextcontrol.value;
		}
	}
}
function save(args, fieldValue) {
	// This would call replace controls on the current page instead of the parent form. 
	// Investigation required.

	// Enable the next line of code to set the value

	if (content != fieldValue) {
		content = fieldValue;
		parent.callSetField(args, fieldValue);
	}
}

/***--Evaluate.js--***/

function executeAtRoot(evalCall) {
	if (this.parent)
		this.parent.execute(evalCall);
}
function execute(evalCall) {
	eval(evalCall);
}

/***--EventManager.js--***/
function fireEventsOnPageLoad() {
	if (document.readyState == "complete") {
		fireEvents();
	}
	else {
		setTimeOut('fireEventsOnPageLoad', 500);
	}
}
function forceFireEventsOnPageLoad() {
	try {
		fireEvents();
	}
	catch (Error) {
		debug("cought Exception while firing " + Error.Message);
	}
}

/***--Explorer.js--***/

function callChangeExplorerView(context, id) {
	callExplorerControl(['ChangeExplorerView', context, BizAPP.UI.getValue(id, 'formcombo')]);
}
function callExplorerControl(ajaxArgs) {
	ajaxAsyncCall("ExplorerEx", ajaxArgs, true, true);
}

function lgi(obj) { }
function showSelectedRow(obj, event) {
	if (event) {
		var roid = event.srcElement.parentElement.getAttribute("roid");
		var viewid = event.srcElement.parentElement.parentElement.parentElement.getAttribute("viewid");

		if (roid) {
			nvByRF(viewid, roid, 'uniqueid');
		}
	}
}
function getCurrentSelection(group, className) {
	return getSessionValue(group + "_" + className);
}
function setCurrentSelection(group, className, rowId) {
	setSessionValue(group + "_" + className, rowId);
}
function applyClassName(group, rowId, className, removeSelection) {
	var row;
	var curSelection = getCurrentSelection(group, className);

	if (curSelection) {
		row = getElementByBizAPPId(curSelection, getClientTagName('TR'));
		if (row)
			row.className = row.getAttribute(className);
	}
	else if (removeSelection) {
		var firstSelection = getElementByGroupId("groupid", group, getClientTagName('TR'));
		if (firstSelection)
			firstSelection.className = "gridrow";
	}
	row = getElementByBizAPPId(rowId, getClientTagName('TR'));
	if (row) {
		row.setAttribute(className, row.className);
		row.className = className;
		setCurrentSelection(group, className, rowId);
	}
}

function selectGridRow(group, rowId) {
	try {
		applyClassName(group, rowId, "gridselectedrow", true);
	}
	catch (Error) { }
}

function callRefreshGrid(context, pageNum, pageCount, filter, refresh, sortColumn, controlName) {
	debug("RefreshGrid ( " + pageNum + ", " + pageCount + " );", "info");
	callGrid(['RefreshGrid', context, pageNum, pageCount, filter, refresh, sortColumn, bza_getSize(controlName)], responseHandler);
}

function callRefreshGridOnFilter(context, pageNum, pageCount, filter, refresh, sortColumn, controlName) {
	debug("RefreshGrid ( " + pageNum + ", " + pageCount + " );", "info");
	callGrid(['RefreshGrid', context, pageNum, pageCount, filter, refresh, sortColumn, bza_getSize(controlName), 'filter'], responseHandler);
}
function callApplySelectedQuery(control, chc, controlName) {
	if (control)
		callGrid(['ApplySelectedQuery', chc, '', control.value]);
}
function callApplySelectedQuery1(control, chc) {
	if (control)
		callGrid(['ApplySelectedQuery', chc, '', control.getAttribute("queryenterpriseid")]);
}
function callGridCount(src, context) {
	if (!src || src == undefined)
		src = "OptGridEx"

	ajaxAsyncCall(src, ['GetGridRowCount', context, '-1'], true, true);
}
function callDisplayExportOptions(chc) {
	BizAPP.UI.Grid._stampViewParamsOnPopup();
	callGrid(['DisplayExportOptions', chc]);
}
function callExportGridData(event, chc, isJob) {
	var source = getSourceElement(event),
		mode = $(source).closest('[mode]').attr('mode');
	if (isJob.toLowerCase() == 'true')
		BizAPP.UI.Grid.ExportAsJob(chc, mode);
	else {
		var url = 'ingridpage.aspx?mode=export' + mode + '&html.args=' + chc;
		var params = $(getSourceElement(window.event)).closest('[bza_viewparams]');
		if (params.length > 0) {
			url += '&bza_viewparams=' + encodeURIComponent(params.attr('bza_viewparams'))
		}
		bizapp_initDwnld(url);
	}
	zoomout();
}
function bizapp_GCDwnldFrame() {
	var frame = $('#downloadFrame');
	frame.remove(); frame = null;

	if (!frame || frame.length == 0) {
		frame = document.createElement('iframe');
		frame.id = 'downloadFrame';
		frame.style.display = 'none';
		document.body.appendChild(frame);
	}

	return frame;
}

g_fileuploadOptions = '<td style="font-size:0.85rem;display:none;" onclick="switchFileUploadMode(this,\'file\')"><i class="fa fa-upload" title="Upload"></i></td>\
<td style="font-size:0.85rem" onclick="switchFileUploadMode(this,\'ref\')"><i class="fa fa-link" title="External Link"></i></td>\
<td style="font-size:0.85rem"><i class="fa fa-camera" title="capture"></i></td>';
g_fileuploadExternal = '<td class="ref" style="display:none"><input class="formtextbox fill" placeholder="External Link"/></td><td><i class="fa fa-ellipsis-v" title="capture"></i></td>';

function switchFileUploadMode(ele, mode) {
	$(ele).toggle();
	$(ele).parent().children('[class*="uploader"],[class*="ref"]').toggle();
	if (mode == 'ref')
		$(ele).prev().toggle();
	else
		$(ele).next().toggle();
}

function loadUploadControl(ctrlName, roid, chc, isRemove) {
	var $this = $('[bza-ctrlid="' + ctrlName + '"]');
	var bid = $this.attr('bizappid');
	if (bid)
		$this = $(getElementByBizAPPId(bid, 'DIV'));
	var viewName = $this.closest('[bizapp_name].ViewControlEx').attr('bizappid');
	var viewdef = $this.closest('.form').attr('bizapp_eid');;
	var options = { viewdef: viewdef, controlname: ctrlName, context: roid, viewname: viewName };
	if (!isRemove)
		g_callBacks.push(function () {
			BizAPP.UI.Upload.ImgCtrlInit(ctrlName, true);
		});
	ajaxAsyncCall('HelperEx', ['LoadUploadControl', options.viewdef, options.controlname, options.context, options.viewname, chc, isRemove], true, true);
    /*realAjaxAsyncCall('HelperEx', getNextRequestId(), ['LoadUploadControl', options.viewdef, options.controlname, options.context, options.viewname, chc, isRemove], true,
            function (data, textStatus, jqXHR) {
                data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR, options);
                replaceOuterHTML($this[0], ['', '', data[1]]);
                if (!isRemove)
                    BizAPP.UI.Upload.ImgCtrlInit(ctrlName, true);
            });*/
}

var g_blockedExtns = ['exe', 'msi', 'msp', 'bat', 'dll'];
function CheckFileFormat(uploadCtrl, fileSize) {
	var ctrl = getElementByBizAPPId(uploadCtrl);
	var isValid = false;

	if (ctrl != null) {
		// file from drag-drop
		if (!ctrl.value)
			return true;

		var blockedExtns;
		if ($.isArray(g_blockedExtns))
			blockedExtns = g_blockedExtns;
		else
			blockedExtns = g_blockedExtns.split(',');

		for (var i = 0; i < blockedExtns.length; i++) {
			if (CheckIfAllowedFormat(ctrl, blockedExtns[i])) {
				displayMessage('executables cannot be uploaded - ' + blockedExtns[i]);
				return false;
			}
		}
		var formats = ctrl.getAttribute('FileFormats');

		if (formats) {
			formats = formats.split(',');

			if (formats != "") {
				for (var i = 0; i < formats.length; i++) {
					if (CheckIfAllowedFormat(ctrl, formats[i])) {
						isValid = true;
						break;
					}
				}
			}
			else {
				isValid = true;
			}
		}
		else
			isValid = true;

		if (!isValid) {
			displayMessage('Invalid file extension. Allowed formats are ' + formats + '.');
			ctrl.parentNode.innerHTML = ctrl.parentNode.innerHTML.replace('value="' + ctrl.valueOf + '"', '');
		}
		else if (fileSize > 0) {
			isValid = false;
			var actualSize = 0;
			try {
				if (ctrl.files) actualSize = ctrl.files[0].size;
				else actualSize = new ActiveXObject("Scripting.FileSystemObject").getFile(ctrl.file.value).size;
			} catch (e) { logError('file size check failed.', e); }

			if (actualSize <= fileSize) isValid = true;

			if (!isValid) {
				if (fileSize / 1024 < 1024)
					displayMessage('The selected file exceeds the maximum allowed size of {0}Kb.'.format(fileSize / 1024));
				else
					displayMessage('The selected file exceeds the maximum allowed size of {0}Mb.'.format(fileSize / (1024 * 1000)));
				ctrl.parentNode.innerHTML = ctrl.parentNode.innerHTML.replace('value="' + ctrl.valueOf + '"', '');
			}
		}

		return isValid;
	}
}
function CheckIfAllowedFormat(ctrl, format) {
	if (format != null) {
		var name = ctrl.value.split('.')
		var uploadedFormat = name[name.length - 1];

		if (format.toLowerCase() == uploadedFormat.toLowerCase())
			return true;
		else
			return false;
	}
}
function getCloneObjectSelection(controlId) {
	var checkbox = getElementByBizAPPId(controlId, "SPAN");
	if (checkbox) {
		var checkboxvalue = checkbox.childNodes[0].checked;
		return checkboxvalue.toString();
	}

	return false.toString();
}

function checkallWithMsg(checkboxId, controlName, recordsCount) {
	var checkbox = getElementByBizAPPId(checkboxId, "input");
	var checkBoxValue = checkbox.checked;

	if (checkBoxValue) {
		if (confirm('' + recordsCount + ' records will be selected. Do you want to continue ?'))
			return checkall(checkboxId, controlName);
		else
			checkbox.checked = false;
	}
	else {
		if (confirm('' + recordsCount + ' records will be deselected. Do you want to continue ?'))
			return checkall(checkboxId, controlName);
		else
			checkbox.checked = true;
	}
}

function checkall(checkboxId, controlName) {
	var checkbox = getElementByBizAPPId(checkboxId, "input");
	if (checkbox) {
		var checkboxvalue = checkbox.checked;

		var oObjects = new Array();
		var i = 0;
		var oObject = $(checkbox).closest('table').find('input[type=checkbox][BizAPPid="' + controlName + '"]').each(function () {
			if ($(this).is(":visible")) {
				this.checked = checkboxvalue;
				oObjects[i++] = this;
			}
		});

		return oObjects;
	}
}

function selectUnSelectAll(serializedContext, controlName, checkboxvalue) {
	var oObjects = new Array();
	var i = 0;
	var value = '';
	var oObject = $('input[type=checkbox][id^="' + controlName + '_"]').each(function () {
		if ($(this).is(":visible")) {
			this.checked = checkboxvalue;
			value = value + '[SEP]' + $(this).attr('checkedvalue');
			oObjects[i++] = this;
		}
	});
	_setMultipleAllowedValues(serializedContext, value, !checkboxvalue);
	return oObjects;
}

function UpdateCheckBoxesAndDisplayMessage(checkboxId, controlName, recordsCount) {
	var checkbox = getElementByBizAPPId(checkboxId);
	var checkBoxValue = checkbox.childNodes[0].checked;

	if (checkBoxValue) {
		if (confirm('' + recordsCount + ' records will be selected. Do you want to continue ?'))
			return UpdateCheckBoxes(checkboxId, controlName);
		else
			checkbox.childNodes[0].checked = false;
	}
	else {
		if (confirm('' + recordsCount + ' records will be deselected. Do you want to continue ?'))
			return UpdateCheckBoxes(checkboxId, controlName);
		else
			checkbox.childNodes[0].checked = true;
	}
}

function UpdateCheckBoxes(checkboxId, controlName) {
	var checkbox = getElementByBizAPPId(checkboxId, "SPAN");
	var checkboxvalue = null;

	for (var i = 0; i < checkbox.childNodes.length; i++) {
		if (checkbox.childNodes[i].getAttribute('type') == 'checkbox')
			checkboxvalue = checkbox.childNodes[i].checked;
	}

	var oObject = null;
	var oObjects = new Array();
	if (isIE()) {
		oObject = document.getElementsByName('BizAPP.object');
	}
	else {
		oObject = document.getElementsByTagName("input");
	}
	if (oObject != null && oObject.length != null) {
		for (i = 0; i < oObject.length; i++) {
			var control = oObject[i];

			if (control.getAttribute("BizAPPid") == controlName) {
				if (control != checkbox && control.tagName.toLowerCase() == 'input') {
					if (control.type == 'checkbox') {
						control.checked = checkboxvalue;
						oObjects[i] = control;
					}
				}
			}
		}
	}
	return oObjects;
}
function getFilter(controlName) {
	var filters = {};

	var parentControl = getElementByBizAPPId(controlName + "_Filter", 'DIV');

	if (parentControl) {
		var controlIds = parentControl.getAttribute("controlids");
		var controlIdsArr = controlIds.split(',');

		for (var i = 0; i < controlIdsArr.length; i++) {
			var filterControl = getElementByBizAPPId(controlIdsArr[i] + "_Filter", 'INPUT');

			if (filterControl) {
				filters[filterControl.getAttribute("columnname")] = filterControl.value;
			}
		}
	}
	else {
		var oObject = document.getElementsByName('BizAPP.filter');
		if (oObject != null && oObject.length > 0) {
			for (var i = 0; i < oObject.length; i++) {
				var control = oObject[i];
				if (control && control.getAttribute("BizAPPid") != null && control.value != '') {
					var controlColumn = control.getAttribute("BizAPPid");

					var columnName = controlColumn.split(',')[0];
					var ctrlName = controlColumn.split(',')[1];

					if (ctrlName == "Filter_" + controlName) {
						filters[columnName] = control.value;
					}
				}
			}
		}
	}

	return JSON.stringify(filters);
}

function callAdvancedListFilter(event, context, controlName) {
	if (event == null)
		event = window.event;

	window.event = event;
	if (event) {
		if (event.keyCode == "13") {
			event.returnValue = false;
			if (!isIE())
				event.preventDefault();
			else
				event.cancelBubble = true;

			var recordsPerPage = getElementByBizAPPId(controlName + '_RecordsPerPageList', 'select');
			var recordsCount = recordsPerPage ? recordsPerPage.value : '-1';
			var filters = getFilter(controlName);
			callRefreshGridOnFilter(context, '-1', recordsCount, filters, 'false', '', controlName);
		}
	}
}
function bizapp_advlistQkFilter(qftb, event, chc, ctrlName) {
	if (event.keyCode != "13") return;

	window.event = event;
	var a = getElementByBizAPPId(ctrlName + '_Filter');
	var b = '';
	$(a).find('input').each(function () {
		b += $(this).attr('columnname') + '[SEP]';
	});

	b += '[NVS]' + $(qftb).val();
	ajaxAsyncCall('AdvancedListEx', ['QuickFilter', chc, b]);
}

function callGridFilter(event, context, controlName) {
	if (event == null)
		event = window.event;

	if (event) {
		if (event.keyCode == "13") {
			callFilter(context, controlName);
			event.returnValue = false;

			if (!isIE())
				event.preventDefault();
			else
				event.cancelBubble = true;
		}
	}
}

function callFilter(context, controlName) {
	//if commit throws any error do not proceed
	if (commitEditableGrids() != true)
		return;

	var recordsPerPage = getElementByBizAPPId(controlName + "_RecordsPerPageList", 'select');
	var recordsCount;

	if (recordsPerPage)
		recordsCount = recordsPerPage.value;
	else
		recordsCount = "-1";

	callRefreshGridOnFilter(context, "1", recordsCount, getFilter(controlName), "false", "", controlName);
}
function callChangePage(context, controlName, pageNum, recordCount) {
	//call filter only when grid is not in inline edit mode
	var grid = getElementByBizAPPId(controlName, 'DIV');
	if (grid && getBizAppElementsByClassName(grid, 'DIV', 'gCancel').length != 0)
		return;

	pageNum = getElementByBizAPPId(pageNum, 'select');

	if (pageNum)
		pageNum = pageNum.value;

	recordCount = getElementByBizAPPId(recordCount, 'select');

	if (recordCount)
		recordCount = recordCount.value;

	callRefreshGrid(context, pageNum, recordCount, getFilter(controlName), "false", "", controlName);
}
function callRefresh(context, controlName) {
	callRefreshGrid(context, "-1", "-1", getFilter(controlName), "true", "", controlName);
}
function callRefreshReload(context, controlName) {
	callRefreshGrid(context, "-1", "-1", "", "true", "", controlName);
}
function callSort(event, context, controlName, pageNumId, recordsPerPageListId) {
	var source = getSourceElement(event);
	if (source.nodeName.toLowerCase() !== 'th')
		source = $(source).closest('.bza-filter-block').closest('th');

	if (!source) return;

	var columnName = $(source).attr('sortid');
	if (!columnName) return;

	//if commit throws any error do not proceed
	if (commitEditableGrids() != true)
		return;

	var pageObj = getElementByBizAPPId(pageNumId);
	var pageNum;

	if (pageObj)
		pageNum = pageObj.value;
	else
		pageNum = "-1";

	var recordCountObj = getElementByBizAPPId(recordsPerPageListId);
	var recordCount;

	if (recordCountObj)
		recordCount = recordCountObj.value;
	else
		recordCount = "-1";

	callRefreshGrid(context, pageNum, recordCount, getFilter(controlName), "false", columnName, controlName);
}
function callPage(context, ctrlName, func) {
	//if commit throws any error do not proceed
	if (commitEditableGrids() != true)
		return;

	callGrid([func, context, bza_getSize(ctrlName)]);
}
function callNextPage(context, controlName) {
	callPage(context, controlName, 'MoveNextPage');
}
function callPreviousPage(context, controlName) {
	callPage(context, controlName, 'MovePreviousPage');
}
function callLastPage(context, controlName) {
	callPage(context, controlName, 'MoveLastPage');
}
function callFirstPage(context, controlName) {
	callPage(context, controlName, 'MoveFirstPage');
}

function callGrid(ajaxArgs) {
	ajaxAsyncCall("OptGridEx", ajaxArgs, true, true);
}

function OnEnterKey() {
	if (event.keyCode == "13")
		return true;
	return false;
}

function evalFilter(eventString) {
	if (OnEnterKey()) {
		var splitEventString = eventString.split('-');
		var filterString = "callFilter(getSessionValue('" + splitEventString[0] + "'), getSessionValue('" + splitEventString[1] + "'),'" + splitEventString[2] + "')";
		eval(filterString);
	}
}

function callExpandView(event, currentcell, roid, noOfCols, viewDisplayname, expandViewDisplayMode) {
	if (event == null)
		event = window.event;

	if (expandViewDisplayMode == "popup" && currentcell.className == "gExpPP") {
		callExpandViewPopup(event, roid, viewDisplayname, true);
	}
	else {
		if (expandViewDisplayMode == "popup" && currentcell.childNodes[0] != null && currentcell.childNodes[0].childNodes[0] && currentcell.childNodes[0].childNodes[0].className == "gExpPP") {
			callExpandViewPopup(event, roid, viewDisplayname, false);
		}
		else if (currentcell.className == "gExp") {
			currentcell.className = "gridcollapse";

			var tbody = currentcell.parentElement.parentElement.parentElement;

			var currentRow = currentcell.parentElement.parentElement;
			var nextRow = currentRow.nextSibling;

			var newRow = currentRow.nextSibling;

			if (newRow && newRow.getAttribute("expand"))
				newRow.style.display = 'block';
			else {
				var row = document.createElement("TR")
				var td1 = document.createElement("TD")
				var td2 = document.createElement("TD")

				row.setAttribute("expand", true);

				row.appendChild(td1);
				row.appendChild(td2);

				var div = document.createElement("DIV");

				div.appendChild(document.createTextNode("Expanding ..."))
				td2.appendChild(div);
				td2.colSpan = noOfCols - 5;

				if (nextRow)
					tbody.insertBefore(row, nextRow);
				else
					tbody.appendChild(row);

				var rand_no = "Ctrl" + Math.floor(Math.random() * 1000);

				div.setAttribute(appbuliderid, rand_no);

				callNavigateToViewByRuntimeViewRuntimeObjectShowCaption(rand_no, viewDisplayname, roid, 'false');
			}
		}
		else {
			currentcell.className = "gExp"
			var currentRow = currentcell.parentElement.parentElement;

			var nextRow = currentRow.nextSibling;

			if (nextRow && nextRow.getAttribute("expand"))
				nextRow.style.display = 'none';
		}
	}
}

function callExpandViewPopup(event, roid, viewDisplayname, offsetTop) {
	var gridExpandviewPopupContainer = getElementByBizAPPId("gridexpandviewpopupcontainer", 'div');

	var gridExpandviewPopup = getElementByBizAPPId("gridexpandviewpopup", 'div');

	gridExpandviewPopupContainer.style.display = 'block';
	gridExpandviewPopupContainer.style.left = event.clientX + "px";

	var position = getElementPosition(getSourceElement(event));
	var top = event.clientY;
	if (position)
		top = position[1];
	if (offsetTop == true)
		gridExpandviewPopupContainer.style.top = top + 16 + "px";
	else
		gridExpandviewPopupContainer.style.top = top + "px";

	var ctrl = getElementByBizAPPId("Ctrl_gridexpandviewpopup", 'div');

	if (ctrl)
		gridExpandviewPopup.innerHTML = "";

	var div = document.createElement("DIV");
	div.appendChild(document.createTextNode("Initializing ..."))

	var ctrlId = "Ctrl_gridexpandviewpopup";
	div.setAttribute(appbuliderid, ctrlId);

	gridExpandviewPopup.appendChild(div);

	callNavigateToViewByRuntimeViewRuntimeObjectShowCaption(ctrlId, viewDisplayname, roid, 'false');
}

/***--KeyProcessor.js--***/

var cancelledRequests = new Array();
function ProcessKey(eve) {
	switch (eve.keyCode) {
		case 27:
			{
				//close error dialog
				if (!BizAPP.UI.InlinePopup.getActivePopup(false))
					$('.bza-alrtDefaultBtn').click();
				cancelCurrentRequest();
				break;
			}
	}
}
function requestCancelled(id) {
	if (cancelledRequests[id])
		return true;
}
function cancelCurrentRequest() {
	var id = getCurrentRequestId();
	cancelledRequests[id] = true;
}

/***--Login.js--***/

var _queryString = null;
var _locator;
var _enterprise;
var _provider;

function setLocatorValue(locator) {
	_locator = locator;
}
function setProvider(provider) {
	_provider = provider;
}
function setEnterprise(enterprise) {
	_enterprise = enterprise;
}
function setQueryString(queryString) {
	_queryString = queryString;
}
function getQueryString() {
	return _queryString;
}
function setPassword(pwdId, password) {
	var pwd = getElementByBizAPPId(pwdId, "INPUT");

	if (pwd)
		pwd.value = password;
}

function submitOnEnter(eve) {
	//    if (eve.keyCode == "13")
	//        callLogin();
}
function signOut() {
	signOutWithNoDirtyTransactionsCheck();
}
function signOutWithNoDirtyTransactionsCheck() {
	closeAllChatWindows();
	BizAPP.UI.OAuth.Logout(function () {
		ajaxAsyncCall("LogoutEx", ['LogoutWithNoDirtyTranscationsCheck'], true, true);
	});
}
function signOutWithSerializedArgs(link) {
	closeAllChatWindows();
	var $view = $(link).closest('.ViewControlEx').eq(0);
	ajaxAsyncCall("LogoutEx", ['Logout', $view.attr('bizapp_eid'), $view.attr('bizappid'), $(link).closest('[bza-ctrlid]').attr('bza-ctrlid')], true, true);
}
function pmtnClose(sPmtMsg, sCanEve) {
	if (isIE())
		window.close();

	BizAPP.UI.InlinePopup.Confirm({
		message: sPmtMsg,
		type: "Confirm",
		fnOkOnclick: function () {
			if (BizAPP.UI.InlinePopup.procVisible)
				ProcessingStatus(true, true);
			window.close();
			redirectToPage(sCanEve);
		},
		fnCancelOnclick: function () {
			redirectToPage(sCanEve);
		}
	});
}

function setLocator() {
	var locator = getElementByBizAPPId("Locator", "select");
	ajaxAsyncCall('AuthenticateEx', ['SetLocator', locator.value], false, true);
}

function callShowAuthenticate() {
	ajaxAsyncCall('AuthenticationEx', ['ShowAutheticate', _locator, _enterprise, _provider], false, true);
}

function showCredentials(showback) {
	var invalidId = getElementByBizAPPId("InvalidLogin", "div");
	invalidId.innerHTML = "";

	var locator = getElementByBizAPPId("Locator", "select").value;
	var enterprise = getElementByBizAPPId("Enterprise", "select").value;
	var provider = getElementByBizAPPId("Provider", "select").value;

	setLocatorValue(locator);
	setProvider(provider);
	setEnterprise(enterprise);

	ajaxAsyncCall('AuthenticationEx', ['ShowCredentials', locator, enterprise, provider, '' + showback], false, true);
	return false;
}

function setSLFlag() {
	ajaxAsyncCall('CredentialsEx', ['SetSLFlag', CheckSilverlightVersion()], false, true);
}
function bizapp_insertNAK(tableId, paramText) {
	if ($('#paramtable nobr').text().indexOf('Network Key') == -1) {
		var table = getElementByBizAPPId(tableId, 'table');
		var index = table.rows.length - 1;

		var row = table.insertRow(index);
		var cell = row.insertCell(0);
		$(cell).html(paramText);
		cell = row.insertCell(1);
		$(cell).html('<input name="{0}" type="text" id="{0}" onkeydown="submitOnEnter(event);" bizappid="{0}" style="width:100%;">'.format('parameter' + index));
	}
}
function callLogin() {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "Login";
	ajaxArgs[1] = _locator;
	ajaxArgs[2] = _enterprise;
	ajaxArgs[3] = _provider;
	ajaxArgs[4] = getElementByBizAPPId("rememberme").checked ? "true" : "false";
	ajaxArgs[5] = getElementByBizAPPId("notimeout").checked ? "true" : "false";
	ajaxArgs[6] = '';

	var qs = window.location.search.substring(1);
	qs.split('?');
	if (qs) {
		qs = qs.split('html.navurl=');
		if (qs.length > 1) {
			qs = qs[1].split('&')[0];
			ajaxArgs[6] = qs;
		}
	}

	ajaxArgs[7] = '';
	var macid = document.getElementById("MacIdHolder");
	if (macid && macid.value != null && macid.value != "undefined")
		ajaxArgs[7] = macid.value;

	ajaxArgs[8] = CheckSilverlightVersion();
	ajaxArgs[9] = checkIfTouchScreen().toString();
	ajaxArgs[10] = g_geoLocation;

	var i = 11;
	var j = 0;
	while (true) {
		var obj = getElementByBizAPPId("parameter" + j);

		if (obj) {
			ajaxArgs[i] = obj.value;
			i++;
			j++;
		}
		else
			break;
	}

	if (!ajaxArgs[11])
		displayMessage("Please enter valid user name and password.");
	else
		ajaxAsyncCall("CredentialsEx", ajaxArgs, false, true);
}
//callLoginWithParams({registry:"tcp://192.168.2.151:9000/RegistryS", enterprise:"QMS_User_Test", provider:"BizAPP", rememberUserName: true, noTimeout: false, UserName: "chandru", Password: "****"});
//callLoginWithParams({enterprise: "QMS_User_Test", provider: "BizAPP", UserName: "...", Password: "****" });
function callLoginWithParams(options) {
	var v = { provider: "BizAPP", rememberUserName: true, noTimeout: false, domain: '' };
	for (s in options) { v[s] = options[s] }
	options = v;

	var args = ["Login", options.registry, options.enterprise, options.provider, "false", "false", options.logouturl, "", CheckSilverlightVersion(), checkIfTouchScreen().toString(), "", options.UserName, options.Password, options.domain];
	ajaxAsyncCall("CredentialsEx", args, false, true);
}

function performRegister() {
	location.href = "../Start/RegisterUser.aspx";
}

function callRegisterPage(registerPage, locator, enterprise, popup) {
	var page = registerPage + "?html.size=" + getClientWidth() + "px, " + getClientHeight() + "px" + "&html.enterprise=" + enterprise; //"?html.args=" + locator + 

	if (popup == "true" || popup == "True" || popup == true)
		window.open(page);
	else
		window.parent.location.href = page;
}
function callForgotPasswordPage(forgotPasswordPage, locator, enterprise, popup) {
	var page = forgotPasswordPage + "?html.args=" + locator + "&html.size=" + getClientWidth() + "px, " + getClientHeight() + "px" + "&html.enterprise=" + enterprise;

	if (popup == "true" || popup == "True" || popup == true)
		window.open(page);
	else
		window.parent.location.href = page;
}
function getClientHeight() {
	if (isIE6()) {
		return document.documentElement.offsetHeight - 37;
	}
	return document.documentElement.offsetHeight - 20;
}
function getClientWidth() {
	if (isIE6()) {
		return document.documentElement.offsetWidth - 20;
	}
	return document.documentElement.offsetWidth - 2;
}

/***--Menu.js--***/

function hideContextMenu() {
	var context = getElementByBizAPPId('ContextMenu', 'div');

	if (context)
		context.style.display = 'none';
}
function callContextMenu(context, menutype) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "GetContextMenu";
	ajaxArgs[1] = context;
	ajaxArgs[2] = menutype;

	if (event.clientX > 110)
		ajaxArgs[3] = (event.clientX - 110) + ", " + event.clientY;
	else
		ajaxArgs[3] = event.clientX + ", " + event.clientY;

	ajaxAsyncCall("HelperEx", ajaxArgs, true, true);
}
function hideMenu(context) {
	var contextMenu = getElementByBizAPPId("ContextMenu", 'div');
	if (contextMenu) {
		contextMenu.releaseCapture();
		contextMenu.style.display = "none";
	}
}
function clickMenu(context) {
	var contextMenu = getElementByBizAPPId("ContextMenu", 'div');
	if (contextMenu) {
		contextMenu.releaseCapture();
		contextMenu.style.display = "none";
		var ajaxArgs = new Array();
		ajaxArgs[0] = "ApplyContextMenuStep";
		ajaxArgs[1] = context;
		ajaxArgs[2] = getParentDiv(event.srcElement).getAttribute("BizAPPid");
		ajaxArgs[3] = event.srcElement.parentElement.getAttribute("menutype");

		ajaxAsyncCall("HelperEx", ajaxArgs, true, true);
	}
}
function getParentDiv(element) {
	if (element.tagName == "DIV") {
		return element;
	}
	else {
		return getParentDiv(element.parentElement);
	}
}
function switchMenu() {
	el = event.srcElement;
	if (el.className == "menuitem") {
		el.className = "highlightitem";
	}
	else if (el.className == "highlightitem") {
		el.className = "menuitem";
	}
}

/***--Outline.js--***/

function registerForApplyStep(funName, controlName, controlType, serializedContext) {
	applyStepEvents.push(funName + "( '" + controlName + "', '" + controlType + "', '" + serializedContext + "' );");
}

function setFieldValue(controlName, controlType, serializedContext) {
	var value = BizAPP.UI.getValue(controlName, controlType);

	if (value != null)
		callSetField(serializedContext, value);
}
function setMultipleAllowedValues(serializedContext, event) {
	var source = getSourceElement(event);
	var value = '';
	if (source.checked)
		value = source.getAttribute("checkedvalue");
	else
		value = source.getAttribute("uncheckedvalue");

	_setMultipleAllowedValues(serializedContext, value);

}
function callSetMultipleAllowedValues(serializedContext, controlType, id) {
	var value = BizAPP.UI.getValue(id, controlType);
	_setMultipleAllowedValues(serializedContext, value);
}
function _setMultipleAllowedValues(serializedContext, value, removeFromCollection) {
	removeFromCollection = removeFromCollection || false;
	var ajaxArgs = ["SetMultipleAllowedValue", serializedContext, value, "True"];

	if (value.indexOf("!!") == 0 || removeFromCollection) {
		if (!removeFromCollection)
			ajaxArgs[2] = value.substring(2, value.length);
		ajaxArgs[3] = "False";
	}

	callOutline(ajaxArgs);
}
function callShowRepeatPage(serializeContext, repeatControlName, runtimeObjectId, sectionId, srcElement, displayMissingFields) {
	if (isIE() && event)
		srcElement = event.srcElement;

	var repeatPage = null;
	if (isIE())
		repeatPage = getValidBizAPPGroup(srcElement);
	else
		repeatPage = srcElement;

	ResetTabPages(getTab(repeatPage));
	SelectTabPage(repeatPage);

	var ajaxArgs = new Array();
	ajaxArgs[0] = "GetRepeatPage";
	ajaxArgs[1] = serializeContext;
	ajaxArgs[2] = repeatControlName;
	ajaxArgs[3] = runtimeObjectId;
	ajaxArgs[4] = sectionId;
	ajaxArgs[5] = displayMissingFields;

	callOutlineWithProcessing(ajaxArgs);
}
function callShowNavigateToRepeatPage(serializeContext, repeatControlName, runtimeObjectId, sectionId, srcElement, displayMissingFields, currentIndex, navigationType, repeaterControlType) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "NavigateRepeatPage";
	ajaxArgs[1] = serializeContext;
	ajaxArgs[2] = repeatControlName;
	ajaxArgs[3] = runtimeObjectId;
	ajaxArgs[4] = sectionId;
	ajaxArgs[5] = displayMissingFields;
	ajaxArgs[6] = currentIndex;
	ajaxArgs[7] = navigationType;
	ajaxArgs[8] = repeaterControlType;

	callOutlineWithProcessing(ajaxArgs);
}

function callMultiSelectDialog(multiSelectPage, serializedContext) {
	var multiPage = multiSelectPage + "?html.args=" + serializedContext;
	showDialog(multiPage, "300px", "200px", true);
	callGetDependentFields(serializedContext);
}

function getValidBizAPPGroup(element) {
	var parentEle = getParent(element);
	while (parentEle && parentEle.groupid == null) {
		parentEle = getParent(parentEle);
	}

	return parentEle;
}

function getParent(elementNode) {
	return elementNode.parentNode;
}
function callShowFirstTabPage(event, outlineArgs, tabControlName, srcElement) {
	setForceFocus('forcefocus', event);
	callOutlineWithProcessing(["GetFirstTabPage", outlineArgs, tabControlName]);
}
function callShowLastTabPage(event, outlineArgs, tabControlName, srcElement) {
	setForceFocus('forcefocus', event);
	callOutlineWithProcessing(["GetLastTabPage", outlineArgs, tabControlName]);
}
function callShowNextTabPage(event, outlineArgs, tabControlName, srcElement) {
	setForceFocus('forcefocus', event);
	callOutlineWithProcessing(["GetNextTabPage", outlineArgs, tabControlName]);
}
function callShowPreviousTabPage(event, outlineArgs, tabControlName, srcElement) {
	setForceFocus('forcefocus', event);
	callOutlineWithProcessing(["GetPreviousTabPage", outlineArgs, tabControlName]);
}
function callShowTabPage(event, outlineArgs, tabControlName, tabPageName, srcElement, conditional) {
	if (commitEditableGrids() != true) return;

	setForceFocus('forcefocus', event);

	var expp = getElementByBizAPPId('gridexpandviewpopupcontainer', 'div');
	if (expp && expp.innerHTML.indexOf(getSourceElement(event).innerHTML) == -1)
		closeCalendar();

	evalRegisteredEvents();

	srcElement = event.srcElement;

	var tabPage = null;

	if (isIE())
		tabPage = getValidBizAPPGroup(srcElement);
	else
		tabPage = srcElement;

	if (conditional == 'True') {
		var response = outlineAjaxCall(["GetTabPageEnabled", outlineArgs, tabControlName, tabPageName]);

		if (response.value[0] != "enabled") {
			displayExceptions(response.value[3], response.value[4]);
			return;
		}
	}

	ResetTabPages(getTab(tabPage));
	SelectTabPage(tabPage);
	callOutlineWithProcessing(["GetTabPage", outlineArgs, tabControlName, tabPageName]);
}

function callDisplayTab(args) {
	callOutline(["GetRenderedTab", args]);
}
function callDisplayForm(args, nodeId) {
	callOutline(["GetRenderedForm", args, nodeId]);
}
function callOutlineTreeRefresh(outlineControlName, RuntimeViewEnterpriseId) {
	callOutline(["GetOutlineTree", outlineControlName, RuntimeViewEnterpriseId]);
}
function callUploadDocument(uploadPage, outlineArgs, args) {
	var uploadPage = "UploadPage.aspx?html.args=" + args;
	window.open(uploadPage);
	callGetDependentFields(args);
}
function downloadAttachment(runtimeobjectid) {
	var downloadPage = "DownloadPage.aspx?html.args=runtimeobjectid[NVS]" + runtimeobjectid;
	window.open(downloadPage, null, "dialogWidth=10; dialogHeight=10; edge=none; status=no; unadorned=no; dialogHide=yes; scroll=yes; resizable=1; channelmode=yes; menubar=no; titlebar=no");
}
function callDownloadDocument(downloadPage, outlineArgs, args) {
	var downloadPage = "DownloadPage.aspx?html.args=" + args;
	window.open(downloadPage);
}
function callDerivedTypeDialog(derivedTypePage, args) {
	var derivedPage = derivedTypePage + "?html.args=" + args;
	var ret = showDialog(derivedPage, "210px", "367px", false);
	return ret;
}
function callCreateNewDialog(event, createNewPage, outlineArgs, args, height, width, type) {
	setForceFocus('forcefocus', event);
	createNewPage = createNewPage + "?html.args=" + args + "&runtimeobjecttypeid=" + type;

	showDialogWithOptions(createNewPage, height + "px", width + "px", "yes", "yes");
	callGetDependentFields(args, responseHandler);
}
function callScheduleDialog(e) {
	if ($(e.target).hasClass('formschedule')) {
		var htmlStr = '<div class="form-scheduler" style="width:450px;height:160px;><table class="fill" cellspacing="0" cellpadding="0" style="border-collapse:collapse;"><tr valign="top"><td><div id="tabs" style="display:none;"><table><tr><td><span>Period:</span></td><td><select id="cbPeriod" onchange="System.Cron.ShowActiveTab(this.value);"><option value="0">Minutes</option><option value="1">Hourly</option><option value="2">Daily</option><option value="3">Weekly</option><option value="4">Monthly</option><option value="5">Yearly</option></select></td></tr></table><div id="tabs-1"><table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="id3"><div class="tab-panel"><table><tbody><tr><td>Every<input style="width: 40px" value="1" name="tabbedPanel:panel:txtMinutes" id="idb3" type="text">minute(s)</td></tr></tbody></table></div></div></td></tr><tr><td height="40"><button class="stepcenternormal" name="btnGenerate" id="idf" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</strong></button></td></tr></tbody></table></td></tr></tbody></table></div><div id="tabs-2"><table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="Div1"><div class="tab-panel"><table><tbody><tr><td><input id="idbb" name="tabbedPanel:panel:radioGroup:Hourly" value="radio35" checked="checked" class="wicket-idba" type="radio">\
			</td><td>Every<input style="width: 40px" value="1" name="tabbedPanel:panel:radioGroup:txtHours" id="idbc" type="text">hour(s)</td></tr><tr><td><input id="idbd" name="tabbedPanel:panel:radioGroup:Hourly" value="radio36" class="wicket-idba" type="radio"></td><td><table cellpadding="0" cellspacing="0"><tbody><tr><td>At</td><td><span id="idbe"><table><tbody><tr><td><select name="tabbedPanel:panel:radioGroup:timeEntry:hourPart"><option value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option selected="selected" value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23</select></td><td><select name="tabbedPanel:panel:radioGroup:timeEntry:minutePart"><option selected="selected" value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23<option value="24">24<option value="25">25<option value="26">26<option value="27">27<option value="28">28<option value="29">29<option value="30">30<option value="31">31\
			<option value="32">32<option value="33">33<option value="34">34<option value="35">35<option value="36">36<option value="37">37<option value="38">38<option value="39">39<option value="40">40<option value="41">41<option value="42">42<option value="43">43<option value="44">44<option value="45">45<option value="46">46<option value="47">47<option value="48">48<option value="49">49<option value="50">50<option value="51">51<option value="52">52<option value="53">53<option value="54">54<option value="55">55<option value="56">56<option value="57">57<option value="58">58<option value="59">59</select></td></tr></tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></div></div></td></tr><tr><td height="40"><button class="stepcenternormal" name="btnGenerate" id="Button1" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</button></td></tr></tbody></table></td></tr></tbody></table></div><div id="tabs-3"><table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="Div2"><div class="tab-panel"><table><tbody><tr><td><input id="ida9" name="tabbedPanel:panel:radioGroup:Daily" value="radio33" checked="checked" class="wicket-ida8" type="radio"></td><td>Every<input style="width: 40px" value="1" name="tabbedPanel:panel:radioGroup:txtDays" id="idaa" type="text">day(s)</td></tr><tr><td><input id="idab" name="tabbedPanel:panel:radioGroup:Daily" value="radio34" class="wicket-ida8" type="radio"></td><td>Every Week Day</td>\
			</tr><tr><td colspan="2"><table><tbody><tr><td>Start time</td><td><span id="idac"><table><tbody><tr><td><select name="tabbedPanel:panel:radioGroup:startTime:hourPart"><option value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option selected="selected" value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23</select></td><td><select name="tabbedPanel:panel:radioGroup:startTime:minutePart"><option selected="selected" value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23<option value="24">24<option value="25">25<option value="26">26<option value="27">27<option value="28">28<option value="29">29<option value="30">30<option value="31">31<option value="32">32<option value="33">33<option value="34">34<option value="35">35<option value="36">36<option value="37">37<option value="38">38<option value="39">39<option value="40">40<option value="41">41<option value="42">42<option value="43">43<option value="44">44\
			<option value="45">45<option value="46">46<option value="47">47<option value="48">48<option value="49">49<option value="50">50<option value="51">51<option value="52">52<option value="53">53<option value="54">54<option value="55">55<option value="56">56<option value="57">57<option value="58">58<option value="59">59</select></td></tr></tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></div></div></td></tr><tr><td height="40"><button class="stepcenternormal" name="btnGenerate" id="Button3" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</button></td></tr></tbody></table></td></tr></tbody></table></div><div id="tabs-4"><table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="Div3"><div class="tab-panel"><table><tbody><tr><td><table><tbody><tr><td><input id="id5e" name="tabbedPanel:panel:daysSelected" value="check18" class="wicket-id5d" type="checkbox"></td><td>Monday</td></tr></tbody></table></td><td><table><tbody><tr><td><input id="id5f" name="tabbedPanel:panel:daysSelected" value="check19" class="wicket-id5d" type="checkbox"></td><td>Tuesday</td></tr></tbody></table></td><td><table><tbody><tr><td><input id="id60" name="tabbedPanel:panel:daysSelected" value="check20" class="wicket-id5d" type="checkbox"></td><td>Wednesday</td></tr></tbody></table></td><td><table><tbody><tr><td><input id="id61" name="tabbedPanel:panel:daysSelected" value="check21" class="wicket-id5d" type="checkbox"></td><td>Thursday</td>\
			</tr></tbody></table></td></tr><tr><td><table><tbody><tr><td><input id="id62" name="tabbedPanel:panel:daysSelected" value="check22" class="wicket-id5d" type="checkbox"></td><td>Friday</td></tr></tbody></table></td><td><table><tbody><tr><td><input id="id63" name="tabbedPanel:panel:daysSelected" value="check23" class="wicket-id5d" type="checkbox"></td><td>Saturday</td></tr></tbody></table></td><td><table><tbody><tr><td><input id="id64" name="tabbedPanel:panel:daysSelected" value="check24" class="wicket-id5d" type="checkbox"></td><td>Sunday</td></tr></tbody></table></td><td></td></tr><tr><td colspan="7"><table><tbody><tr><td>Start time</td><td><span id="id65"><table><tbody><tr><td><select name="tabbedPanel:panel:daysSelected:startTime:hourPart"><option value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option selected="selected" value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23</select></td><td><select name="tabbedPanel:panel:daysSelected:startTime:minutePart"><option selected="selected" value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16\
			<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23<option value="24">24<option value="25">25<option value="26">26<option value="27">27<option value="28">28<option value="29">29<option value="30">30<option value="31">31<option value="32">32<option value="33">33<option value="34">34<option value="35">35<option value="36">36<option value="37">37<option value="38">38<option value="39">39<option value="40">40<option value="41">41<option value="42">42<option value="43">43<option value="44">44<option value="45">45<option value="46">46<option value="47">47<option value="48">48<option value="49">49<option value="50">50<option value="51">51<option value="52">52<option value="53">53<option value="54">54<option value="55">55<option value="56">56<option value="57">57<option value="58">58<option value="59">59</select></td></tr></tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></div></div></td></tr><tr><td height="40"><button class="stepcenternormal" name="btnGenerate" id="Button5" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</button></td></tr></tbody></table></td></tr></tbody></table></div><div id="tabs-5"><table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="Div4"><div class="tab-panel"><table><tbody><tr><td><input id="id40" name="tabbedPanel:panel:radioGroup:Monthly" value="radio14" checked="checked" class="wicket-id3f" type="radio">\
			</td><td>Day<input style="width: 40px" value="" name="tabbedPanel:panel:radioGroup:txtFirstChoiceDay" id="id41" title="Value must be a number between 1 to 31" type="text">of every<input style="width: 40px" value="" name="tabbedPanel:panel:radioGroup:txtFirstChoiceMonth" id="id42" title="Value must be a number between 1 to 12" type="text">month(s)</td></tr><tr><td><input id="id43" name="tabbedPanel:panel:radioGroup:Monthly" value="radio15" class="wicket-id3f" type="radio"></td><td>The<select name="tabbedPanel:panel:radioGroup:rank" id="id44"><option selected="selected" value="0">First<option value="1">Second<option value="2">Third<option value="3">Fourth</select><select name="tabbedPanel:panel:radioGroup:day" id="id45"><option selected="selected" value="0">Monday<option value="1">Tuesday<option value="2">Wednesday<option value="3">Thursday<option value="4">Friday<option value="5">Saturday<option value="6">Sunday</select>of every<input size="3" value="1" name="tabbedPanel:panel:radioGroup:monthCount" id="id46" type="text">month(s)</td></tr><tr><td colspan="2"><table><tbody><tr><td>Start time</td><td><span id="id47"><table><tbody><tr><td><select name="tabbedPanel:panel:radioGroup:startTime:hourPart"><option value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option selected="selected" value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23</select></td><td><select name="tabbedPanel:panel:radioGroup:startTime:minutePart"><option selected="selected" value="0">00\
			<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23<option value="24">24<option value="25">25<option value="26">26<option value="27">27<option value="28">28<option value="29">29<option value="30">30<option value="31">31<option value="32">32<option value="33">33<option value="34">34<option value="35">35<option value="36">36<option value="37">37<option value="38">38<option value="39">39<option value="40">40<option value="41">41<option value="42">42<option value="43">43<option value="44">44<option value="45">45<option value="46">46<option value="47">47<option value="48">48<option value="49">49<option value="50">50<option value="51">51<option value="52">52<option value="53">53<option value="54">54<option value="55">55<option value="56">56<option value="57">57<option value="58">58<option value="59">59</select></td></tr></tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></div></div></td></tr><tr><td><button class="stepcenternormal" name="btnGenerate" id="Button7" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</button></td></tr></tbody></table></td></tr></tbody></table></div><div id="tabs-6">\
			<table><tbody><tr><td><table style="width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="height:92px;"><td valign="top"><div class="tabpanel4" style="width: 450px" id="Div5"><div class="tab-panel"><table><tbody><tr><td><input id="id4f" name="tabbedPanel:panel:radioGroup:Yearly" value="radio16" checked="checked" class="wicket-id4e" type="radio"></td><td>Every<select name="tabbedPanel:panel:radioGroup:selFirstChoiceMonth" id="id50"><option selected="selected" value="January">January<option value="February">February<option value="March">March<option value="April">April<option value="May">May<option value="June">June<option value="July">July<option value="August">August<option value="September">September<option value="October">October<option value="November">November<option value="December">December</select><input class="dayEntry" value="1" name="tabbedPanel:panel:radioGroup:txtFirstChoiceDay" id="id51" type="text"></td></tr><tr><td><input id="id52" name="tabbedPanel:panel:radioGroup:Yearly" value="radio17" class="wicket-id4e" type="radio"></td><td>The<select name="tabbedPanel:panel:radioGroup:secondChoiceRank" id="id53"><option selected="selected" value="First">First<option value="Second">Second<option value="Third">Third<option value="Fourth">Fourth</select><select name="tabbedPanel:panel:radioGroup:secondChoiceDay" id="id54"><option selected="selected" value="Monday">Monday<option value="Tuesday">Tuesday<option value="Wednesday">Wednesday<option value="Thursday">Thursday<option value="Friday">Friday<option value="Saturday">Saturday<option value="Sunday">Sunday</select>of<select name="tabbedPanel:panel:radioGroup:secondChoiceMonth" id="id55"><option selected="selected" value="January">January<option value="February">February\
			<option value="March">March<option value="April">April<option value="May">May<option value="June">June<option value="July">July<option value="August">August<option value="September">September<option value="October">October<option value="November">November<option value="December">December</select></td></tr><tr><td colspan="2"><table><tbody><tr><td>Start time</td><td><span id="id56"><table><tbody><tr><td><select name="tabbedPanel:panel:radioGroup:startTime:hourPart"><option value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option selected="selected" value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23</select></td><td><select name="tabbedPanel:panel:radioGroup:startTime:minutePart"><option selected="selected" value="0">00<option value="1">01<option value="2">02<option value="3">03<option value="4">04<option value="5">05<option value="6">06<option value="7">07<option value="8">08<option value="9">09<option value="10">10<option value="11">11<option value="12">12<option value="13">13<option value="14">14<option value="15">15<option value="16">16<option value="17">17<option value="18">18<option value="19">19<option value="20">20<option value="21">21<option value="22">22<option value="23">23<option value="24">24<option value="25">25<option value="26">26<option value="27">27<option value="28">28<option value="29">29<option value="30">30<option value="31">31\
			<option value="32">32<option value="33">33<option value="34">34<option value="35">35<option value="36">36<option value="37">37<option value="38">38<option value="39">39<option value="40">40<option value="41">41<option value="42">42<option value="43">43<option value="44">44<option value="45">45<option value="46">46<option value="47">47<option value="48">48<option value="49">49<option value="50">50<option value="51">51<option value="52">52<option value="53">53<option value="54">54<option value="55">55<option value="56">56<option value="57">57<option value="58">58<option value="59">59</select></td></tr></tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></div></div></td></tr><tr><td height="40"><button class="stepcenternormal" name="btnGenerate" id="Button9" onclick="System.Cron.GetExpression();">Save</button><button class="stepcenternormal" name="btnClose" id="idc" onclick="closeMenuPopup(event);">Cancel</button></td></tr></tbody></table></td></tr></tbody></table></div></div></div><div id="130554998088245823:viewControl1:linkscriptonly"><div class="linkcontrol" bizappid="130554998088245823:viewControl1:linkscriptonly" bza-ctrlid="linkscriptonly" bza-args="False[VS]ESystemaee43" onclick="BizAPP.UI.LinkControl.customLink(this, event);"><!--STARTPOMIT--><div></div><!--ENDPOMIT--></div></div></td></tr></table></div>'
		htmlStr = addWindowEvent(htmlStr);
		if (System.Cron) {
			BizAPP.MenuPopup.Create({ html: htmlStr, selector: e.target, mode: 'open', position: 'bottom pright', callback: function () { System.Cron.Init(); e.stopPropagation(); } });
		}
		else {
			BizAPP.UI.LoadScript({
				eid: 'ESystemae728', callback: function () {
					BizAPP.MenuPopup.Create({ html: htmlStr, selector: e.target, mode: 'open', position: 'bottom pright', callback: function () { System.Cron.Init(); e.stopPropagation(); } });
				}
			});
		}
	}
}
function closeMenuPopup(e) {
	e = e || window.event;
	$('.bza-dropdown').removeClass('open');
	e.stopPropagation();
}

function callSearchDialog(event, searchPage, outlineArgs, args, controlid) {
	if (event == null)
		event = window.event;

	setForceFocus('forcefocus', event);
	searchPage = searchPage + "?html.args=" + args;

	var result = showDialogWithOptions(searchPage, "0px", "0px", "no", "no");

	if (result && (result == true || result.toLowerCase() == "true"))
		callGetDependentFields(args);
	if (controlid && controlid != '') {
		try {
			var control = getElementByBizAPPId(controlid, 'input');
			if (control)
				control.focus();
		}
		catch (Error) { }
	}
}
function setSearchFocus() {
	var grid = getElementByBizAPPId('SearchControl', 'DIV');
	if (grid) {
		try {
			var tbs = getBizAppElementsByClassName(grid, 'INPUT', 'fftb');
			if (tbs[0] && tbs[0].focus)
				tbs[0].focus();

			//setWindowSize(document.body.clientHeight - 70 + "px", grid.clientWidth > 800 ? "800px" : grid.clientWidth + 30 + "px");
		}
		catch (Error) {
		}
	}
}
function callSearchDialogAndExecutePostVerb(event, searchPage, outlineArgs, args, serializedMethodArgs) {
	setForceFocus('forcefocus', event);
	searchPage = searchPage + "?html.args=" + args;

	var result = showDialogWithOptions(searchPage, "0px", "0px", "no", "no");

	if (result == true || result == "true") {
		callPostRuntimeMethod(serializedMethodArgs);

		g_enableRichTextSave = false;
		callGetDependentFields(args);
		g_enableRichTextSave = true;
	}
}

function callShowImportDialog(event, createNewPage, outlineArgs) {
	setForceFocus('forcefocus', event);
	var width = 380;

	createNewPage = createNewPage + "?html.args=" + outlineArgs + "&width=" + width;

	showDialogWithOptions(createNewPage, 5 + "px", width + "px", "yes", "yes");
}

function callDelete(event, outlineArgs, args, value) {
	setForceFocus('forcefocus', event);
	var items;

	if (value != null) {
		var div = getElementByBizAPPId(value);
		if (div != null && div.nodeName == 'DIV') {
			var listbox = div.getElementsByTagName('select')[0];

			var selItems = "";
			for (var i = 0; i < listbox.length; i++) {
				var selitem = listbox.options[i];

				if (selitem.selected)
					selItems += selitem.value + ';';
			}
			items = selItems.substring(0, selItems.length - 1).trim();
		}
		else
			items = value;
	}
	else
		items = value;

	callOutlineWithProcessing(['Delete', outlineArgs, args, items]);
}

function callCommitMoveByPlaces(outlineArgs, args, value) {
	var controlId = value;
	var items;

	if (value != null) {
		var div = getElementByBizAPPId(value);
		if (div != null) {
			var sortValues;
			var listBox = div;
			for (var i = 0; i < listBox.length; i++) {
				if (sortValues == null)
					sortValues = listBox[i].value;
				else
					sortValues = sortValues + "," + listBox[i].value;
			}

			items = sortValues;
		}
	}

	callOutline(['CommitMoveByPlaces', outlineArgs, args, items]);
}

function callMoveByPlaces(outlineArgs, args, value, moveType) {
	var controlId = value, size, items;
	if (value != null) {
		var div = getElementByBizAPPId(value);
		if (div != null) {
			value = div.value;
			size = div.style.height + "," + div.style.width;

			var sortValues;
			var listBox = div;
			for (var i = 0; i < listBox.length; i++) {
				if (sortValues == null)
					sortValues = listBox[i].value;
				else
					sortValues = sortValues + "," + listBox[i].value;
			}

			items = sortValues;
		}
	}

	callOutline(['MoveByPlaces', outlineArgs, args, moveType, controlId, value, size, items]);
}
function callMoveNext(outlineArgs, args, value) {
	_callOutlinePagination(outlineArgs, args, val, "MoveNext");
}
function callMovePrevious(outlineArgs, args, value) {
	_callOutlinePagination(outlineArgs, args, val, "MovePrevious");
}
function callMoveFirst(outlineArgs, args, value) {
	_callOutlinePagination(outlineArgs, args, val, "MoveFirst");
}
function callMoveLast(outlineArgs, args, value) {
	_callOutlinePagination(outlineArgs, args, val, "MoveLast");
}
function _callOutlinePagination(outlineArgs, args, value, func) {
	var val = value;
	if (value != null) {
		var div = getElementByBizAPPId(value);
		if (div != null)
			val = div.value;
		else
			val = value;
	}
	callOutline([func, outlineArgs, args, val]);
}
function callAddMultipleAllowedValues(outlineArgs, args, value) {
	var table = getElementByBizAPPId(value);
	callOutline(["AddMultipleAllowedValues", outlineArgs, args, table.children[0].children[0].children[0].children[0].children[0].value]);
}
function callRemoveMultipleAllowedValues(outlineArgs, args, value) {
	var table = getElementByBizAPPId(value);
	callOutline(["RemoveMultipleAllowedValues", outlineArgs, args, table.children[0].children[0].children[0].children[2].children[0].value]);
}
function callApplyCloneStep(event, chc) {
	setForceFocus('forcefocus', event);
	callOutline(['ApplyCloneStep', chc]);
}
function callApplyStepRefreshStepOnly(outlineId, args, step, type) {
	callOutline(['ApplyActionRefreshStepOnly', args, step, bza_getSize(outlineId), type]);
}
function callWizardApplyStep(event, outlineId, args, step, confirmStep, type, tabControlName) {
	setForceFocus('forcefocus', event);
	//setTimeout("realWizardApplyStep( '" + outlineId + "', '" + args + "', '" + step + "', '" + confirmStep + "', '" + type + "', '" + tabControlName + "')", 00);
	realWizardApplyStep(outlineId, args, step, confirmStep, type, tabControlName);
}

function realWizardApplyStep(outlineId, args, step, confirmStep, type, tabControlName) {
	if (confirmStep && confirmStep != null && confirmStep != "undefined") {
		BizAPP.UI.InlinePopup.Confirm({
			message: confirmStep,
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				callOutlineWithProcessing(['WizardApplyAction', args, step, bza_getSize(outlineId), type, tabControlName]);
			},
			fnCancelOnclick: function () {
				ProcessingStatus(false, true);
			}
		});
	}
	else
		callOutlineWithProcessing(['WizardApplyAction', args, step, bza_getSize(outlineId), type, tabControlName]);
}

function callApplyStep(event, outlineId, args, step, confirmStep, type, snoDelay) {
	if (!event)
		event = window.event;

	if (event && event.type == "focus" && event.altKey == false)
		return;
	BizAPP.UI.StepControl.CheckApplyStep(event, outlineId, args, step, confirmStep, type, snoDelay, function () {
		ProcessingStatus(true, true);

		if (step != 'Cancel' && step != 'ObjectCancel') {
			// find editable grids in current view and alert user
			//var grids = checkifEditable();
			//if (grids && grids.length > 0)
			//{
			//    displayMessage("Grid(s) " + grids.join(',') + ' are in editable state.');
			//    return;
			//}

			//if commit throws any error do not proceed with save
			if (commitEditableGrids() != true)
				return;
		}

		g_editableGrids.clear();

		setForceFocus('forcefocus', event);
		//confirmStep = confirmStep.replace(/'/g, "\\'");
		//hide the step control
		try {
			var source = getSourceElement(event);
			if (source) {
				$(source).closest('.StepControlEx').hide();
				g_callBacks.push(function () { $(source).closest('.StepControlEx').show(); });
			}
		} catch (Error) { }

		if (confirmStep && confirmStep != null && confirmStep != "undefined")
			realApplyStep(outlineId, args, step, confirmStep, type);
		else {
			var delay = 100;
			if ($.active)
				delay = 2000;

			ProcessingStatus(true, true);
			setTimeout("realApplyStep( '" + outlineId + "', '" + args + "', '" + step + "', '" + confirmStep + "', '" + type + "')", delay);
		}
	});
}

function callApplyPostBackStep(event, args, step, type, controlIds) {
	if (!event)
		event = window.event;

	var controlValues = '';
	var realValues = controlIds.split(',');
	for (var i = 0; i < realValues.length; i++) {
		var controlId = realValues[i].split(':')[0];
		var className = realValues[i].split(':')[1];

		controlValues += BizAPP.UI.getValue(controlId, className);
		controlValues += ",";
	}

	ajaxSyncCall('OutlineEx', ['ApplyPostBackStep', args, step, type, controlIds, controlValues]);
}

function evalRegisteredEvents() {
	while (applyStepEvents.length > 0) {
		var command = applyStepEvents.pop();
		eval(command);
	}
}

function realApplyStep(outlineId, args, step, confirmStep, type) {
	evalRegisteredEvents();

	if (confirmStep && confirmStep != null && confirmStep != "undefined") {
		BizAPP.UI.InlinePopup.Confirm({
			message: confirmStep,
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				var a = ['ApplyAction', args, step, bza_getSize(outlineId), type]
				g_callBacks.push(function (x, y, z) { BizAPP.UI.ApplyStepCallback(a, x, y, z) });
				callOutlineWithProcessing(a);
			},
			fnCancelOnclick: function () {
				backGroundBlocker(false);
				ProcessingStatus(false, true);
				if (g_callBack) g_callBack();
				BizAPP.UI.ProcessCallBacks(g_callBacks); //show the hidden step control
			}
		});
	}
	else {
		var a = ['ApplyAction', args, step, bza_getSize(outlineId), type]
		g_callBacks.push(function (x, y, z) { BizAPP.UI.ApplyStepCallback(a, x, y, z) });
		callOutlineWithProcessing(a);
	}
}

function callApplyStepSyncCall(event, outlineId, args, step, confirmStep, type) {
	if (!event)
		event = window.event;

	if (event && event.type == "focus" && event.altKey == false)
		return;

	setForceFocus('forcefocus', event);

	evalRegisteredEvents();

	if (confirmStep && confirmStep != null && confirmStep != "undefined") {
		BizAPP.UI.InlinePopup.Confirm({
			message: confirmStep,
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				ajaxSyncCall("OutlineEx", ['ApplyAction', args, step, bza_getSize(outlineId), type]);
			},
			fnCancelOnclick: function () {
				var backGroundBlockerElement = getElementByBizAPPId('backgroundmasker', 'div');
				if (backGroundBlockerElement != null)
					backGroundBlockerElement.style.display = "none";
			}
		});
	}
	else
		ajaxSyncCall("OutlineEx", ['ApplyAction', args, step, bza_getSize(outlineId), type]);
}

function callWizardApplySyncStep(event, outlineId, serializedContext, stepName, type, tabControlName) {
	setForceFocus('forcefocus', event);
	var response = outlineAjaxCall(['ApplySyncAction', serializedContext, stepName, type, tabControlName]);
	responseHandler(response);
}
function callApplySyncStep(event, outlineId, serializedContext, stepName, type, close) {
	if (!event)
		event = window.event;

	if (event && event.type == "focus" && event.altKey == false)
		return;

	setForceFocus('forcefocus', event);
	var response = outlineAjaxCall(['ApplySyncAction', serializedContext, stepName, type, close]);
	responseHandler(response);
}

function callSetAndGetDependentFields(args, fieldValue) {
	callOutline(['SetAndGetDependentFields', args, fieldValue]);
}
function callSetDependentFields(outlineArgs, args, fieldValue) {
	callSetField(args, fieldValue);
}
function assignFieldValue(roid, fieldName, fieldValue, navToCurrentView, addOrRemove, setMultiple, sync) {
	sync = sync || false;
	var hasError = false;
	if (roid == '' || roid == NaN || roid == undefined) {
		hasError = true;
		displayMessage("AssignFieldValue - ROID is empty");
	}
	if (fieldName == '' || fieldName == NaN || fieldName == undefined) {
		hasError = true;
		displayMessage("AssignFieldValue - Field Name is empty");
	}

	if (hasError == false) {
		if (typeof addOrRemove === "undefined")
			addOrRemove = 'True';
		else if (addOrRemove == true)
			addOrRemove = 'True';
		else
			addOrRemove = 'False';

		if (typeof setMultiple === "undefined")
			setMultiple = 'False';

		callOutline(['SetFieldValue', roid, fieldName, fieldValue.toString(), navToCurrentView.toString(), addOrRemove, setMultiple], sync);
	}
}
function applyStepOfType(roid, stepName, stepType) {
	var hasError = false;
	if (roid == '' || roid == NaN || roid == undefined) {
		displayMessage("ApplyStepOfType - ROID is empty");
		hasError = true;
	}
	if (stepName == '' || stepName == NaN || stepName == undefined) {
		displayMessage("ApplyStepOfType - Step Name is empty");
		hasError = true;
	}
	if (stepType == '' || stepType == NaN || stepType == undefined) {
		displayMessage("ApplyStepOfType - Step Type is empty");
		hasError = true;
	}

	if (hasError == false)
		callOutline(['ApplyStep', roid, stepName, stepType, '', '', '']);
}
function callSetField(args, fieldValue) {
	debug('callSetField ( ' + fieldValue + ' ) ');
	callOutline(['SetField', args, fieldValue]);
}
//used by word editor
function callWordSetField(args, fieldValue, htmlFieldvalue, isPopup) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "SetField";
	ajaxArgs[1] = args;
	ajaxArgs[2] = fieldValue;
	ajaxArgs[3] = htmlFieldvalue;

	ajaxSyncCall("OutlineEx", ajaxArgs);

	if (isPopup == "true" || isPopup == "True")
		setTimeout("window.returnValue = popup;window.close();", 1000);
}

function callAllDependentFields(args) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "GetAllDependentFields";
	ajaxArgs[1] = args;
	callOutline(ajaxArgs);
}

function callGetDependentFields(args) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "GetDependentFields";
	ajaxArgs[1] = args;
	callOutline(ajaxArgs);
}
function callCancel(outlineArgs, args) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "Cancel";
	ajaxArgs[1] = outlineArgs;
	ajaxArgs[2] = args;

	callOutlineWithProcessing(ajaxArgs);
}
function callSave(outlineArgs, args) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "Save";
	ajaxArgs[1] = outlineArgs;
	ajaxArgs[2] = args;

	callOutlineWithProcessing(ajaxArgs);
}
function callDraftSave(outlineArgs, args) {
	debug("DraftSave ( )");
	var ajaxArgs = new Array();
	ajaxArgs[0] = "SaveDraft";
	ajaxArgs[1] = outlineArgs;
	ajaxArgs[2] = args;

	callOutlineWithProcessing(ajaxArgs);
}

function callRefreshForm(outlineArgs) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RefreshForm";
	ajaxArgs[1] = outlineArgs;

	callOutlineWithProcessing(ajaxArgs);
}
function callReload(formId, outlineArgs) {
	debug("Reload ( )");
	var ajaxArgs = new Array();
	ajaxArgs[0] = "Reload";
	ajaxArgs[1] = outlineArgs;
	ajaxArgs[2] = bza_getSize(formId);
	callOutline(ajaxArgs);
}

function callShowErrors() {
	callClosePopUp('configcontrolid');
	//showPopup("Debug Console - Exceptions", '<button class="formbutton" style="float:right" onclick="clearExceptionLog(event);">Clear Exceptions</button><pre>' + exceptionStack + '</pre>', document.body.clientHeight - 150, document.body.clientWidth - 200, true, true);
	BizAPP.UI.InlinePopup.CreateNew({ html: '<button class="formbutton" style="float:right" onclick="clearExceptionLog(event);">Clear Exceptions</button><pre style="overflow:auto;width:' + (document.body.clientWidth - 200) + 'px">' + exceptionStack + '</pre>' });
}
function callShowLogs() {
	callClosePopUp('configcontrolid');
	showPopup("Debug Console - Logs", '<button class="formbutton" style="float:right" onclick="clearLog(event);">Clear Logs</button><pre>' + logStack + '</pre>', document.body.clientHeight - 150, document.body.clientWidth - 200, true, true);
}
function calldebugConsole(data, consoletype) {
	if (data != null && data != "undefined") {
		var exceptionsPopup = getElementByBizAPPId("exceptionspopup", 'div');

		if (exceptionsPopup) {
			exceptionsPopup.innerHTML = "<pre class=\"excpStack\">" + data + "</pre>";
		}

		var exceptionsPopupContainer = getElementByBizAPPId("exceptionspopupcontainer", 'div');

		exceptionsPopupContainer.style.display = "block";
		exceptionsPopupContainer.title = consoletype;

		var x = document.documentElement.offsetWidth / 4;
		var y = document.documentElement.offsetHeight / 2 - 150;

		exceptionsPopupContainer.style.left = x + "px";
		exceptionsPopupContainer.style.top = y + "px";
	}
}

function callShowConfigControl(eve, chc, popupId) {
	ajaxAsyncCall('ConfigControlEx', ['ConfigPopUp', chc, popupId, '50px', '50px'], false, true);
}
function callShowProfiling(event, context) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "ShowProfilerData";
	ajaxArgs[1] = context;
	ajaxAsyncCall("ConfigControlEx", ajaxArgs, false, true);
}
function callProcessProfiling(event, context, enable) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "ProcessProfilingFlag";
	ajaxArgs[1] = context;

	if (enable.toLowerCase() == "true")
		ajaxArgs[2] = 'false';
	else
		ajaxArgs[2] = 'true';

	ajaxArgs[3] = _locator;
	callClosePopUp('configcontrolid');
	ajaxAsyncCall("ConfigControlEx", ajaxArgs, false, true);
}
function showProfilerData(containerId) {
	var container = getElementByBizAPPId(containerId, 'DIV');
	container.style.display = 'block';
	container.style.position = 'absolute';

	var winl = (screen.availWidth - container.clientWidth) / 2;
	var wint = (screen.availHeight - container.clientHeight) / 2;

	container.style.top = '0px';
	container.style.left = winl + 'px';
}

function callEnableDebug(eve, serializedArgs, enable) {
	var textControl = getElementByBizAPPId("vfdebugtext");

	if (textControl != null) {
		if ($(textControl).text() == 'Enable Debug') {
			$(textControl).html('<nobr>Disable Debug</nobr>');
			g_enableLog = true;
		}
		else {
			$(textControl).html('<nobr>Enable Debug</nobr>');
			g_enableLog = false;
		}
	}

	ajaxAsyncCall('ConfigControlEx', ['EnableDebug', serializeArgs, enable], false, true);
}

function callShowVersion(outlineId, listId, outlineArgs) {
	debug("ShowVersion( )");
	var list = getElementByBizAPPId(listId);

	if (!list)
		list = event.srcElement;

	if (list)
		callOutlineWithProcessing(['ShowVersion', list.value, outlineArgs, bza_getSize(outlineId)]);
}
function callOutline(ajaxArgs, sync) {
	debug("Form: calling " + ajaxArgs[0], "info");
	if (sync)
		ajaxSyncCall('OutlineEx', ajaxArgs);
	else
		ajaxAsyncCall('OutlineEx', ajaxArgs, false, false);
}

function callOutlineWithProcessing(ajaxArgs) {
	debug("Form: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("OutlineEx", ajaxArgs, false, true);
}

function callHideHelp(frame) {
	var frameShell = getElementByBizAPPId("Frame");
	if (frameShell != null) {
		hideCalendar(frameShell.id);
	}
}
function callShowHelp(frame, height, width, url) {
	var frameShell = getElementByBizAPPId("Frame");
	if (frameShell != null) {
		frameShell.style.display = "block";

		frameShell.style.width = width;
		frameShell.style.height = height;

		frameShell.style.left = event.clientX;
		frameShell.style.top = event.clientY;

		var frame = frameShell.children[0];

		frame.src = url;
		frame.height = height;
		frame.width = width;

		frameShell.focus();
	}
}
function deligate(event) {
	if (event == null)
		event = window.event;

	var srcEl;

	if (event.srcElement == undefined)
		srcEl = event.target;
	else
		srcEl = event.srcElement;

	var funCall = srcEl.getAttribute("deligate");

	eval(funCall);
}

function registerDeligate(objId, eventId, funCall, useContextEditable, contextEditable) {
	var perform = true;

	if (useContextEditable == "True" && contextEditable == "False") {
		for (i = 0; i < delegateControls.length; i++) {
			if (delegateControls[i] == objId)
				delegateControls[i] = "";
		}

		perform = false;
	}

	if (perform && evaluateControlDelegation(objId)) {
		var obj = getElementByBizAPPId(objId, "SPAN");
		if (obj != null) {
			var child;
			if (!isIE()) {
				child = obj.getElementsByTagName('input')[0];
			}
			else {
				var child = obj.children[0];
				if (child) {
					child.setAttribute("deligate", funCall);
					if (child.addEventListener) {
						child.addEventListener('click', deligate, false);
					}
					else if (child.attachEvent) {
						child.attachEvent(eventId, deligate);
					}
				}
				else {
					obj.setAttribute("deligate", funCall);
					if (obj.addEventListener) {
						obj.addEventListener('click', deligate, false);
					}
					else if (obj.attachEvent) {
						obj.attachEvent(eventId, deligate);
					}
				}
			}
		}
	}
}

function evaluateControlDelegation(controlId) {
	if (delegateControls.length > 0) {
		for (i = 0; i < delegateControls.length; i++) {
			if (delegateControls[i] == controlId)
				return false;
		}
	}

	delegateControls[delegateControls.length] = controlId;

	return true;
}

function callSetAttribute(objId, attribName, attribValue) {
	var obj = getElementByBizAPPId(objId);
	if (obj != null) {
		obj.setAttribute(attribName, attribValue);
	}
}
function callSetClassName(objId, className) {
	var obj = getElementByBizAPPId(objId);
	if (obj != null) {
		obj.className = className;
	}
}

function highlightstep(obj) {
	for (var i = 0; i < obj.childNodes.length; i++) {
		if (obj.childNodes[i] != null) {
			if (obj.childNodes[i].className != null) {
				if (obj.childNodes[i].className.endsWith('normal')) {
					obj.childNodes[i].className = obj.childNodes[i].className.replace("normal", "hover");
					obj.childNodes[i].setAttribute("prevstate", "normal");
				}

				else if (obj.childNodes[i].className.endsWith('selected')) {
					obj.childNodes[i].className = obj.childNodes[i].className.replace("selected", "hover");
					obj.childNodes[i].setAttribute("prevstate", "selected");
				}
			}
		}
	}
}

function normalizestep(obj) {
	for (var i = 0; i < obj.childNodes.length; i++) {
		if (obj.childNodes[i] != null) {
			if (obj.childNodes[i].className != null) {

				if (obj.childNodes[i].className.endsWith('hover')) {
					if (obj.childNodes[i].getAttribute("prevstate") == "normal")
						obj.childNodes[i].className = obj.childNodes[i].className.replace("hover", "normal");
					else if (obj.childNodes[i].getAttribute("prevstate") == "selected")
						obj.childNodes[i].className = obj.childNodes[i].className.replace("hover", "selected");
				}
			}
		}
	}
}


function selectstep(step) {
	for (var i = 0; i < step.childNodes.length; i++) {
		if (step.childNodes[i] != null) {
			if (step.childNodes[i].className != null) {
				if (step.childNodes[i].className == "tabstepcenterhover")
					step.childNodes[i].className = 'tabstepcenternormalnormal';
				else if (step.childNodes[i].className == "tabstepcenterselected")
					step.childNodes[i].className = "tabstepcenternormal";
			}
		}
	}

	var innerText = getElementInnerText(step);

	var menu = step.parentNode.parentNode.parentNode.parentNode.parentNode;
	var changedMenu;

	changedMenu = menu.innerHTML;

	if (changedMenu != null) {
		changedMenu = changedMenu.replace(/selected/g, "normal");
		changedMenu = changedMenu.replace("normalnormal", "selected");
	}

	try {
		menu.innerHTML = changedMenu;
	}
	catch (Error) {
	}
}

function sltTab(obj) {
	obj.className = "tls";
	for (var i = 0; i < obj.childNodes.length; i++)
		if (obj.childNodes[i] != null & obj.childNodes[i].className != null)
			obj.childNodes[i].className = "trs";

	var tab = obj.parentNode.parentNode.parentNode.parentNode;
	var c_tab = tab.innerHTML;

	c_tab = c_tab.replace("tabRightSelected", "tabRight");
	c_tab = c_tab.replace("tabLeftSelected", "tabLeft");
	c_tab = c_tab.replace("tls", "tabLeftSelected");
	c_tab = c_tab.replace("trs", "tabRightSelected");

	tab.innerHTML = c_tab;
}

/***--Outlook.js--***/

var currentSelection = new Array();

function callExpandOutlookMenu(groupId, id, serializedContext) {
	var objects = getElementsByGroupId("groupid", groupId);
	var i = 0;
	for (i = 1; i < objects.length; i++) {
		if (objects[i].getAttribute("outlookid") == id) {
			expandOutlookMenu(objects[i], serializedContext, objects[0].getAttribute("outlooksectioncount"));
		}
		else
			objects[i].style.display = "none";
	}
}
function expandOutlookMenu(section, serializedContext, count) {
	section.style.display = "block";
	if (section.getAttribute("expanded") != "true") {
		var ajaxArgs = new Array();
		ajaxArgs[0] = "GetSection";
		ajaxArgs[1] = serializedContext;

		var contentSize = getWidth(section.parentNode) + "," + getHeight(section);
		ajaxArgs[2] = contentSize;
		ajaxArgs[3] = count;

		callOutlook(ajaxArgs);
	}
}
function callOutlook(ajaxArgs) {
	if (OutlookControl != null) {
		debug("View: calling " + ajaxArgs[0], "info");
		ajaxAsyncCall("OutlookEx", ajaxArgs, true, true);
	}
}
function callExpandSingleSectionMenu(groupId, ddlId, serializedContext, controlName, event) {
	var objects = getElementsByGroupId("groupid", groupId);
	var i = 0;
	var ddl = getElementByBizAPPId(ddlId);
	var id = ddl.options[ddl.selectedIndex].text;

	for (i = 1; i < objects.length; i++) {
		if (objects[i].getAttribute("outlookid") == id) {
			expandMultiSectionMenu(objects[i], ddl.value, objects[0].getAttribute("outlooksectioncount"));
			updateSelectedScreen(controlName, id);
		}
		else
			objects[i].style.display = "none";
	}
}
function callExpandMultiSectionMenu(groupId, id, serializedContext, controlName, eve) {
	var src = eve.target;

	if (!eve.target)
		src = eve.srcElement;

	if (currentSelection[groupId]) {
		currentSelection[groupId].className = 'outlookgroup';
	}
	else {
		var parent = src.parentElement.parentElement.parentElement;
		var firstNode = parent.children[0].children[0].children[0];
		firstNode.className = 'outlookgroup';
	}

	src.className = 'outlookselectedgroup';
	currentSelection[groupId] = event.srcElement;

	var table = src.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	var count = table.children[2].children[0].children[0].children[0].children.length;
	var childObjs = table.children[2].children[0].children[0].children[0].children;

	for (var i = 0; i < childObjs.length; i++) {
		var obj = childObjs[i].children[0].children[0];

		if (obj.getAttribute("styletype") == "DUMMY")
			obj = obj.children[0];

		var contentId = obj.getAttribute("outlookid");

		if (id == contentId) {
			obj.style.display = "block";
			var countObj = table.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
			expandMultiSectionMenu(obj, serializedContext, childObjs.length);

			table.children[1].children[0].innerText = id;
		}
		else
			obj.style.display = "none";
	}

	return;
}
function updateSelectedScreen(controlName, selectedScreenText) {
	var selectedScreen = getElementByBizAPPId("SelectedScreen" + controlName);
	if (selectedScreen != null)
		selectedScreen.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + selectedScreenText;
}
function expandMultiSectionMenu(section, serializedContext, count) {
	section.style.display = "block";
	var ajaxArgs = new Array();

	if (section.getAttribute("expanded") != "true") {
		ajaxArgs[0] = "GetSection";
		ajaxArgs[1] = serializedContext;

		var contentSize = getWidth(section.parentNode) + "," + getHeight(section);
		ajaxArgs[2] = contentSize;
		ajaxArgs[3] = "" + count;

		callMultiSection(ajaxArgs, false);
	}
	ajaxArgs[0] = "GetDefaultView";
	ajaxArgs[1] = serializedContext;

	callMultiSection(ajaxArgs, false);
}
function callMultiSection(ajaxArgs, maskable) {
	debug("View: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("MultiSectionEx", ajaxArgs, maskable, true);
}

var dragObject;
var initialPos;

function toggleOutlook(obj) {
	var col;

	if (isIE()) {
		col = obj.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0];
	}
	else {
		col = obj.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[1];
	}

	if (col.style.display != 'none') {
		obj.className = 'MiddleSectionTable';
		col.style.display = 'none';
	}
	else {
		obj.className = 'MiddleSectionTableCollapse';
		col.style.display = 'block';
	}

	document.onmouseup = null;
}
function dragStart(obj, eve) {
	dragObject = obj.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0];
	initialPos = eve.x;

	document.onmouseup = dragEnd;
}

function dragEnd(eve) {
	if (!eve)
		eve = event;
	if (!dragObject)
		return;

	if (initialPos == eve.x)
		return;

	var width = dragObject.style.width.split("px")[0];

	if (!width)
		width = parseInt(dragObject.clientWidth);
	else
		width = parseInt(width);

	width = width + eve.x - initialPos;

	if (width < 0)
		width = 0;

	dragObject.style.width = width;
	dragObject = null;

	document.onmouseup = null;
}

function toggleDivision(thisobj, maskobj) {
	var object = document.getElementById(maskobj);
	var currentObject = document.getElementById(thisobj);
	if (object.style.display == 'block') {
		object.style.display = 'none';
		currentObject.className = 'collapseicon';
	}
	else if (object.style.display == 'none') {
		object.style.display = 'block';
		currentObject.className = 'expandicon';
	}
	document.onmouseup = null;
}
function callApplyStyle() {
	var element = window.parent.document.documentElement;

	var styles = element.getElementsByTagName("link");
	for (var i = 0; i < styles.length; i++) {
		var link = document.createElement("link");
		link.href = styles[i].href;
		link.rel = styles[i].rel;
		link.type = styles[i].type;
		try {
			document.appendChild(link);
		}
		catch (Error) {
			var a = document.getElementById('form1');
			if (a)
				a.appendChild(link);
		}
	}
}

/***--Pages.js--***/

function LoadPage(src, srcType, args) {
	BizAPP.UI.PrefetchResources();
	if (!g_customAjax) {
		var obj = null;

		try {
			obj = eval(src);
		}
		catch (Error) {
			setTimeout("LoadPage( '" + src + "', '" + srcType + "', '" + args + "');", 100);
		}
	}

	if (obj || g_customAjax) {
		//BizAPP.UI.InitVue(function () {
		g_callBacks.push(initSystemTray);
		ajaxAsyncCall(srcType, ['LoadPage', args, callGetCurrentTimeZoneName1(), navigator.userAgent], !g_customAjax, true);
		//})
	}
}

/***--Personalize.js--***/

function callApplyTheme(serializedContext, theme, height, width) {
	callPersonalize(['ApplyTheme', serializedContext, theme, height, width]);
}
function callPersonalize(ajaxArgs) {
	ajaxAsyncCall("PersonalizationEx", ajaxArgs, true, true);
}

/***--Query.js--***/

function callParameterizedQuery(viewControlName, page, serializedContext) {
	if (isIE()) {
		var retVal = showDialog(page, "450px", "650px", false);
		if (retVal)
			callSerializedView(serializedContext);
	}
	else {
		var eve = "callNavigateToView( '" + serializedContext + "')";
		pushEvent(eve);
	}
}
function callParameterizedQueryRun(args) {
	callParameterizedQueryClose(args);
}
function callParameterizedQueryClose(args) {
	closeWindow(args);
}

/***--Report.js--***/
function callGenerateReport(reportIFrame, reportPage) {
	var report = getElementByBizAPPId(reportIFrame);
	report.src = reportPage;
}

function callGenerateReportBasedOnFormat(serializedArgs, formatSelectorid) {
	var formatSelector = getElementByBizAPPId(formatSelectorid, "select");

	var ajaxArgs = new Array();

	ajaxArgs[0] = "GenerateReportBasedOnFormat";
	ajaxArgs[1] = serializedArgs;

	if (formatSelector)
		ajaxArgs[2] = formatSelector.value;
	else
		ajaxArgs[2] = formatSelectorid;

	ajaxAsyncCall("ReportEx", ajaxArgs, false, true);
}

/***--Resize.js--***/

var replaceHolderId = "replaceholder";
var maximized = false;

function resizeIFrame(iframe_id) {
	var iframe = getElementByBizAPPId(iframe_id);
	if (!iframe) return;
	iframe.style.height = iframe.parentNode.clientHeight;

	if (parseInt(iframe.style.width) <= iframe.parentNode.clientWidth)
		iframe.style.width = "100%";
}
function callOnResize() {
	setResize(true, enterprise);
	callResize(enterprise);
}
function setResize(value, id) {
	setSessionValue("resize", value);
}
function getResize() {
	return getSessionValue("resize");
}
function callResize(id, maximizeObject, forceResize) {
	if (getResize() == false)
		return;

	if (!id)
		id = enterprise;

	var status = window.status;
	var height = getClientHeight();
	var width = getClientWidth();
	width = width - (isDialog() ? 0 : 10)

	var ajaxArgs = new Array();
	ajaxArgs[0] = "SetClientResolution";
	ajaxArgs[1] = "" + height;
	ajaxArgs[2] = "" + width;

	setSessionValue("CH", height);
	setSessionValue("CW", width);

	var startTime = new Date();
	var erp = getElementByBizAPPId(id)
	var objCount = 0;
	if (erp != null) {
		if (id == enterprise && getHeight(erp) == height && getWidth(erp) == width && !forceResize)
			return;

		if (height > 0 && (maximizeObject || id == enterprise))
			setHeight(erp, height);
		if (width > 10 && (maximizeObject || id == enterprise))
			setWidth(erp, width);

		displayStatus("Fetching resiable content");

		var objs = getResizableObjects(id);
		objCount = objs.length;
		displayStatus("Resiable Objects collected, Resizing");
		if (isIE()) {
			for (var i = 0; i < objCount; i++) {
				if (objs[i].BizAPPid)
					displayStatus("Resizing " + objs[i].BizAPPid);

				if (isIE6())
					resizeIE6(objs[i]);
				else if (isIE7())
					resizeIE6(objs[i]);
			}
		}
		else {
			for (var i = 0; i < objs.length; i++) {
				resize(objs[i]);
			}
		}
	}
	else {
		debug('Auto resizing unavialable', debug);
	}

	var endTime = new Date();

	setResize(false);

	var timeSpan = (endTime.getTime() - startTime.getTime()) / 1000;

	displayStatus(timeSpan + " Second(s) Elapsed Re-Aligning " + objCount + " objects");
}
function getParentHeight(obj) {
	var parentObj = obj.parentNode;
	while (parentObj) {
		var height = getHeight(parentObj);
		if (height) {
			return height;
		}
		parentObj = parentObj.parentNode;
	}
}
function getParentWidth(obj) {
	var parentObj = obj.parentNode;
	while (parentObj) {
		var width = getWidth(parentObj);
		if (width) {
			return width;
		}
		parentObj = parentObj.parentNode;
	}
}
function resizeIE6(obj) {
	var height = getParentHeight(obj);
	var width = getParentWidth(obj);

	if (!height || !width)
		return;

	fitSize(obj, height, width);
}
function resizeIE7(obj) {
	var parentObj = getValidSizedIE7Parent(obj);
	if (parentObj != null) {
		var height = parentObj.style.height.split("px")[0];
		var width = parentObj.style.width.split("px")[0];

		if (isNaN(height))
			height = parentObj.style.pixelHeight;
		if (isNaN(width))
			width = parentObj.style.pixelWidth;

		fitSize(obj, height, width);
	}
}
function resize(obj) {
	var height = getParentHeight(obj);
	var width = getParentWidth(obj);
	fitSize(obj, height, width);
}
function fitSize(obj, height, width) {
	// Debug statement. Remove while deploying 
	var appbid = obj.getAttribute("BizAPPid");

	if (height && isNaN(height))
		height = height.split("px")[0];

	if (width && isNaN(width))
		width = width.split("px")[0];

	var rh = obj.getAttribute("rh");
	if (height && rh != null && height != "") {
		var absHeight = eval(rh);
		if (absHeight != null && !isNaN(absHeight))
			setHeight(obj, Math.max(0, Math.floor(absHeight)));
	}
	var rw = obj.getAttribute("rw");
	if (width && rw != null && width != "") {
		var absWidth = eval(rw);
		if (absWidth != null && !isNaN(absWidth))
			setWidth(obj, Math.max(0, Math.floor(absWidth)));
	}
}
function getValidSizedIE6Parent(obj) {
	while (obj.parentNode != null) {
		if (obj.parentNode.style.height != "")
			return obj.parentNode;
		obj = obj.parentNode;
		return obj;
	}
	return null;
}
function getValidSizedIE7Parent(obj) {
	while (obj.parentNode != null) {
		if (obj.parentNode.style.height != "")
			return obj.parentNode;
		obj = obj.parentNode;
		return obj;
	}
	return null;
}
function getResizablechildNodes(parentObj, objs) {
	for (var i = 0; i < parentObj.childNodes.length; i++) {
		var obj = parentObj.childNodes[i];
		if (obj.tagName == "TBODY")
			getResizablechildNodes(obj, objs);

		var resizable = obj.getAttribute("resizable");
		if (resizable != null) {
			objs[objs.length] = obj;
			getResizablechildNodes(obj, objs);
		}
	}
}
function getResizableObjects(id) {
	var objs = new Array();
	var i = 0;
	var allElements = getAllElements();
	var addElements = true;
	if (id)
		addElements = false;

	for (i = 0; i < allElements.length; i++) {
		var obj = allElements[i];
		if (obj.tagName && obj.tagName != 'IFRAME' && obj.getAttribute && obj.getAttribute("resizable") != null) {
			if (!addElements && obj.getAttribute('BizAPPid') == id)
				addElements = true;

			if (addElements) {
				objs[objs.length] = obj;
			}
		}
	}
	return objs;

	var hierObjs = new Array();
	var notResizable = new Array();

	var body = document.getElementsByTagName("FORM")[0];
	for (i = 0; i < body.childNodes.length; i++) {
		var obj = body.childNodes[i];
		if (obj.getAttribute("resizable") != null) {
			hierObjs[hierObjs.length] = obj;
		}
		getResizablechildNodes(obj, hierObjs);
	}
	return hierObjs;
}


function resolveScreenSize() {
	var height = getClientHeight();
	var width = getClientWidth();

	if (getSessionValue("CH") == height && getSessionValue("CW") == width || location.href.split("?").length > 1) {
		return;
	}
	var seperator = "?";
	var nvc = new Array();
	if (location.href.split("?").count > 1) {
		var args = location.href.split("&");
		for (var i = 0; i < args.count; i++) {
			nvc[args[i].split("=")[0]] = args[i].split("=")[1];
		}
	}
	setSessionValue("CH", height);
	setSessionValue("CW", width);

	nvc["CH"] = height;
	nvc["CW"] = width;
	var href = location.href.split("?")[0];
	var initial = true;
	for (var keys in nvc) {
		if (keys != "clear" && keys != "addRange") {
			if (initial) {
				href = href + "?" + keys + "=" + nvc[keys];
				initial = false;
			}
			else
				href = href + "&" + keys + "=" + nvc[keys];
		}
	}
	location.href = href;
}
function callCheckResizability() {
	var objs = new Array();
	for (var i = 0; i < document.all.length; i++) {
		var obj = document.all[i];
		if (obj.getAttribute("resizable") != null) {
			if (obj.parentNode.getAttribute("resizable") == null)
				if (obj.parentNode.tagName != "TBODY")
					objs[objs.length] = obj;
		}
	}
	return objs;
}
function getClientHeight() {
	if (isIE6()) {
		if (isDialog())
			return document.documentElement.offsetHeight;

		return document.documentElement.offsetHeight - 20;
	}
	return document.documentElement.clientHeight;
}
function getClientWidth() {
	if (isIE6()) {
		if (isDialog())
			return document.documentElement.offsetWidth;

		return document.documentElement.offsetWidth - 20;
	}
	return document.documentElement.clientWidth - 2;
}
function callMaximize(objectId, maximize) {
	var obj = getElementByBizAPPId(objectId);

	if (maximized && maximize)
		return;

	if (maximized == true) {
		maximized = false;
		var replaceHolder = getElementByBizAPPId('maximized');

		replaceHolder.parentElement.innerHTML = obj.outerHTML;

		var erp = getElementByBizAPPId("enterpriseshell")
		erp.style.display = '';
		obj.parentElement.innerHTML = '';
	}
	else {
		maximized = true;
		var replaceHolder = getElementByBizAPPId(replaceHolderId);
		if (replaceHolder != null && obj.parentElement != replaceHolder) {
			replaceHolder.innerHTML = obj.outerHTML;

			if (obj.parentElement != null) {
				obj.parentElement.innerHTML = "<div BizAPPid='maximized' id='maximized' height='" + getHeight(obj) + "' width='" + getWidth(obj) + "'> <div>";
			}

			var erp = getElementByBizAPPId("enterpriseshell")
			erp.style.display = 'none';
		}
	}
}

/***--Screen.js--***/

function callScreenControl(ajaxArgs) {
	ajaxAsyncCall("ScreenEx", ajaxArgs, false, true);
}

function callChangeScreen(serializedArgs, controlId, viewControlName) {
	var obj = getElementByBizAPPId(controlId, "select", false);

	var value = "";

	if (obj)
		value = obj.value;

	var ajaxArgs = new Array();
	ajaxArgs[0] = "ChangeScreen";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = viewControlName;
	ajaxArgs[3] = value;

	ajaxSyncCall("ScreenEx", ajaxArgs);
}

/***--MSChart.js--***/
function callMSChartDrilldown(serializedArgs, viewParameters) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "MSChartDrilldown";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = viewParameters;

	ajaxSyncCall("MSChartEx", ajaxArgs);
}
/***--Session.js--***/

function Fire(eventId, sourceId, sourceContext) {
	fire(eventId, sourceId, sourceContext);
}
function fire(eventId, sourceId, sourceContext) {
	var source = eventManager[sourceId];
	fireEvent(eventId, eventManager[sourceId], sourceContext);
	fireEvent(eventId, eventManager["*"], sourceContext);
}
function fireEvent(eventId, source, sourceContext) {
	if (source != null) {
		var targetIds = source[eventId];
		for (var cc in targetIds) {
			if (cc != "clear" && cc != "addRange") {
				var customControl = targetIds[cc];
				debug("Firing Event " + eventId);
				updateControl(customControl, sourceContext, eventId);
			}
		}
	}
}
function register(eventId, sourceId, controlType, targetId, context) {
	debug("Register( " + eventId + ", " + sourceId + ", " + controlType + " )", "info");
	var source = eventManager[sourceId];
	if (source == null) {
		source = eventManager[sourceId] = new Array();
	}
	var evnt = source[eventId];
	if (evnt == null) {
		evnt = source[eventId] = new Array();
	}
	var target = new Array();
	target["controltype"] = controlType;
	target["context"] = context;
	evnt[targetId] = target;
}
function checkSessionExpiry(serializedContext) {
	var args = new Array();
	args[0] = "CheckSessionExpiry";
	args[1] = serializedContext;
	ajaxAsyncCall("HelperEx", args, true, true);
}

function alertSessionExpiry(renewPage, serializedContext) {
	var renew = showDialog(renewPage, "300px", "400px", false);
	if (renew) {
		var args = new Array();
		args[0] = "RenewSession";
		args[1] = serializedContext;
		ajaxAsyncCall("HelperEx", args, true, true);
	}
	else {
		var args = new Array();
		args[0] = "Logout";
		ajaxAsyncCall("HelperEx", args, true, true);
	}
}
function customLogout() {
	var args = new Array();
	args[0] = "Logout";
	ajaxSyncCallAndNoResponseHandler("HelperEx", args, true, true);
}

/***--Tab.js--***/

function getTab(tabPage) {
	if (tabPage)
		return getParent(getParent(getParent(tabPage)));
}
function ResetTabPages(tab) {
	if (tab) {
		for (var i = 0; i < tab.childNodes.length; i++) {
			var tabEle = tab.childNodes[i];
			if (tabEle.className && tabEle.className.indexOf('selected') > -1) {
				tabEle.className = tabEle.className.substr(8);
			}
			ResetTabPages(tabEle);
		}
	}
}

function SelectTabPage(tabPage) {
	if (tabPage) {
		for (var i = 0; i < tabPage.childNodes.length; i++) {
			var tabEle = tabPage.childNodes[i];
			if (tabEle.className && tabEle.className.indexOf('selected') < 0) {
				tabEle.className = 'selected' + tabEle.className;
			}
			SelectTabPage(tabEle);
		}
	}
}

/***--Theme.js--***/

function callApplyTheme(themeName) {
	callPersonalize(['ApplyTheme', themeName]);
}

function applyStyleSheets(serializedstyles) {
	var styles = serializedstyles.split(";");
	var oldStyles = document.getElementsByTagName("link");
	for (var i = 0; i < oldStyles.length; i++) {
		try {
			var parent = oldStyles[i].parentElement;
			parentElement.removeChild(oldStyles[i]);
		}
		catch (Error) { }
	}

	for (var i = 0; i < styles.length; i++) {
		var link = document.createElement("link");
		link.href = styles[i];
		link.rel = "stylesheet";
		link.type = "text/css";
		document.appendChild(link);
	}
}

/***--Timer.js--***/

var intervalKey = "__INTERVAL__";
var timerKey = "__TIMER__";

function setCustomInterval(timerId, handler, timeout) {
	var timers = getIntervalMap();
	if (timers[timerId] != null) {
		clearInterval(timers[timerId]);
	}
	timers[timerId] = setInterval(handler, timeout);
	setIntervalMap(timers);
}
function setIntervalMap(intervals) {
	setSessionValue(intervalKey, intervals);
}
function getIntervalMap() {
	var intervals = getSessionValue(intervalKey);
	if (!timers) {
		intervals = new Array();
	}
	return intervals;
}
function setCustomTimeout(timerId, handler, timeout) {
	var timers = getTimerMap();

	if (timers[timerId] != null) {
		clearTimeout(timers[timerId]);
	}
	timers[timerId] = setTimeout(handler, timeout);
	setTimerMap(timers);
}
function getTimerMap() {
	var timers = getSessionValue(timerKey);
	if (!timers) {
		timers = new Array();
	}
	return timers;
}
function setTimerMap(timers) {
	setSessionValue(timerKey, timers);
}

/***--Toolbar.js--***/

function callToolbar(ajaxArgs) {
	if (ajaxArgs != null) {
		ajaxAsyncCall("ToolbarEx", ajaxArgs, true, true);
	}
}

/***--View.js--***/

function callReloadMetaData() {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "ReloadMetaData";

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}
function callChangedReload(args) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "Reload";
	ajaxArgs[1] = args;

	callView(ajaxArgs);
}

function callReload(args) {
	callChangedReload(args);
}
function CallApplyNewType(typeId) {
	var type = document.getElementById(typeId);
	closeWindow(type.value);
}
function callApplyTemplate(templateId) {
	var template = document.getElementById(templateId);
	closeWindow(template.value);
}
function callTemplate(viewId, templatePage, serializedContext) {
	var selectedObjects = showDialogWithOptions(templatePage, "250px", "380px", "yes", "no");

	if (selectedObjects != null) {
		// Invert
		if (isIE()) {
			callRenderTemplateView(viewId, serializedContext, selectedObjects);
		}
		else {

			var eve = "callRenderTemplateView( '" + viewId + "', '" + serializedContext + "', '" + selectedObjects + "')";
			try {
				eval(eve);
			}
			catch (Error) {
			}
		}
	}
}
function callCloseTemplate(serializedContext, templateId) {
	var templateList = document.getElementById(templateId);
	if (templateList.value) {
		closeWindow(templateList);
	}
}
function callRenderTemplateView(viewId, serializedContext, template) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RenderTemplateView";
	ajaxArgs[1] = serializedContext;
	ajaxArgs[2] = template;
	ajaxArgs[3] = bza_getSize(viewId);
	ajaxSyncCall("ViewEx", ajaxArgs);
}

function callPreView(preViewPage, serializedContext) {
	var preview = serializedContext;
	result = showDialog(preViewPage, "400px", "600px");
	if (result != null) {
		var context = result;
		callNavigateToView(context);
	}
}
function callPreViewRun(serializedContext) {
	ajaxAsyncCall('HelperEx', ['PreView', serializedContext], true, true);
}
function callNavigateToViewByRuntimeView(controlName, viewDisplayName) {
	callView(['RenderViewByRuntimeView', controlName, viewDisplayName, bza_getSize(controlName)]);
}
function callNavigateToViewByRuntimeViewWithArgs(controlName, viewDisplayName, chc) {
	callView(['RenderViewByRuntimeView', controlName, viewDisplayName, bza_getSize(controlName), chc]);
}
function callNavigateToViewByRuntimeViewRuntimeObjectShowCaption(controlName, viewDisplayName, runtimeObjectId, showViewCaption) {
	callView(['RenderViewByRuntimeViewRuntimeObjectShowCaption', controlName, viewDisplayName, runtimeObjectId, showViewCaption, bza_getSize(controlName)]);
}
function callNavigateToViewByRuntimeViewRuntimeObject(controlName, viewDisplayName, runtimeObjectId) {
	callView(['RenderViewByRuntimeViewRuntimeObject', controlName, viewDisplayName, runtimeObjectId, bza_getSize(controlName)]);
}
function callNavigateToView(serializedContext, runtimeObjectId, fieldName) {
	callView(['RenderView', serializedContext, runtimeObjectId, fieldName, bza_getSize(controlName)]);
}
function callNavigateToLastView(serializedContext) {
	callView(['RenderLastView', serializedContext, bza_getSize(controlName)]);
}
function callView(ajaxArgs) { ajaxAsyncCall("ViewEx", ajaxArgs, false, true); }
function callViewSyncCall(ajaxArgs) { ajaxSyncCall("ViewEx", ajaxArgs); }

function callNavigateToNextView(viewId, serializeContext) {
	callNavigateView(['RenderNextView', serializeContext, bza_getSize(viewId)]);
}
function callNavigateToPreviousView(viewId, serializeContext) {
	callNavigateView(['RenderPreviousView', serializeContext, bza_getSize(viewId)]);
}
function callNavigateToCurrentView(viewId, serializeContext) {
	callNavigateView(['RenderCurrentView', serializeContext, bza_getSize(viewId)]);
}

function callNavigateToViewUsingViewNavigationException(CHC) {
	ajaxSyncCall("HelperEx", ['ViewNavigationException', CHC]);
}

function callNavigateToViewByRuntimeFieldWithArgs(viewId, runtimeObjectId, fieldName, drilldownView, hashCode) {
	CloseAllPopups();

	var isDrillDownView;

	if (!drilldownView)
		isDrillDownView = "false";
	else
		isDrillDownView = "true";

	var ajaxArgs = ['RenderViewByRuntimeField', viewId, runtimeObjectId, fieldName, bza_getSize(viewId), isDrillDownView, drilldownView, 'false', hashCode];
	callView(ajaxArgs);
}
function realCallNV(viewId, runtimeObjectId, fieldName, drilldownView, isDrillDownView) {
	var ajaxArgs = ['RenderViewByRuntimeField', viewId, runtimeObjectId, fieldName, bza_getSize(viewId), 'true', drilldownView, 'false'];
	callView(ajaxArgs);
}
function nvByRF(viewId, runtimeObjectId, fieldName) {
	CloseAllPopups();
	realCallNV(viewId, runtimeObjectId, fieldName, '', 'false');
}

function nvByDV(viewId, runtimeObjectId, fieldName, drilldownView) {
	realCallNV(viewId, runtimeObjectId, fieldName, drilldownView, 'true');
}

function callNavigateToViewByDrilldownViewPopup(viewId, runtimeObjectId, fieldName, drilldownView) {
	nvByDV(viewId, runtimeObjectId, fieldName, drilldownView);
}

function callNavigateView(ajaxArgs) {
	debug("ViewNavigation: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("ViewNavigationEx", ajaxArgs, false, true);
}

function callViewCollection(ajaxArgs) {
	debug("ViewNavigation: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("ViewCollectionEx", ajaxArgs, false, true);
}
function callRecentViewCollection(ajaxArgs) {
	debug("RecentViewCollection: calling " + ajaxArgs[0], "info");
	ajaxAsyncCall("RecentEx", ajaxArgs, true, true);
}
function callListNavigateToView(serializedArgs, elementId, viewControlName, isPopup) {
	var obj = getElementByBizAPPId(elementId, 'select');
	if (obj != null && obj.value) {
		var ajaxArgs = new Array();
		ajaxArgs[0] = "RenderViewByRuntimeObject";
		ajaxArgs[1] = serializedArgs;
		ajaxArgs[2] = viewControlName;
		ajaxArgs[3] = obj.value;
		ajaxArgs[4] = bza_getSize(viewControlName);
		ajaxArgs[5] = isPopup;
		callView(ajaxArgs);
	}
}
function callListBoxAttachmentDownload(elementId) {
	var obj = getElementByBizAPPId(elementId);
	if (obj != null && obj.value) {
		var ajaxArgs = new Array();
		ajaxArgs[0] = "RenderListBoxAttachmentDownload";
		ajaxArgs[1] = obj.value;

		ajaxAsyncCall("ViewEx", ajaxArgs, false, true);
	}
}
function callSerializedView(serializedView) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RenderSerializedView";
	ajaxArgs[1] = serializedView;

	ajaxSyncCall("ViewEx", ajaxArgs);
}
function callViewInitialize(id) {
	setResize(true, id);
	callResize(null, false, true);
}
function embedView(ctrlName, viewDisplayName) {
	var viewHolder = getElementByBizAPPId(ctrlName);
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RenderViewByDisplayName";
	ajaxArgs[1] = ctrlName;
	ajaxArgs[2] = viewDisplayName;

	ajaxArgs[3] = bza_getSize(ctrlName);
	callView(ajaxArgs);
}

function callStartView(viewable, viewControlName, displayType) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RenderViewByViewableUIObject";
	ajaxArgs[1] = viewControlName;
	ajaxArgs[2] = viewable;
	ajaxArgs[3] = bza_getSize(viewControlName);
	ajaxArgs[4] = displayType;
	callView(ajaxArgs);
}

function callTree(ajaxArgs) {
	ajaxAsyncCall("TreeEx", ajaxArgs, true, true);
}

function callHighlightNavigation(obj) {
	if (obj.className.indexOf("highlight") == -1)
		obj.className = "highlight" + obj.className;
}
function callNormalizeNavigation(obj) {
	if (obj.className.indexOf("highlight") == 0)
		obj.className = obj.className.substring(9);
}

/***--QuickCreate.js--***/

function callQuickCreateObject(serializedContext, id, fireActiveRecordChange) {
	var quickCreate = getElementByBizAPPId(id);

	var ajaxArgs = new Array();
	ajaxArgs[0] = "QuickCreateObject";
	ajaxArgs[1] = serializedContext;
	ajaxArgs[2] = quickCreate.value;
	ajaxArgs[3] = fireActiveRecordChange;

	ajaxAsyncCall("QuickCreateEx", ajaxArgs, false, true);
}

/***--Search Control.js--***/

function callSubmitToSearch(event, serializedArgs, objectTypeId, fieldNameId, fieldValueId) {
	if (event == null)
		event = window.event;

	if (event.keyCode == "13")
		callSearch(serializedArgs, objectTypeId, fieldNameId, fieldValueId);
}


function callSearch(serializedArgs, objectTypeId, fieldNameId, fieldValueId) {
	var objectTypeObject = getElementByBizAPPId(objectTypeId, "select", false);
	var objectType;

	if (objectTypeObject != null)
		objectType = objectTypeObject.value;

	var fieldNameObject = getElementByBizAPPId(fieldNameId, "select", false);
	var fieldName;

	if (fieldNameObject != null)
		fieldName = fieldNameObject.value;

	var fieldValueObject = getElementByBizAPPId(fieldValueId, "input", false);
	var fieldValue;

	if (fieldValueObject != null)
		fieldValue = fieldValueObject.value;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "Search";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = objectType;
	ajaxArgs[3] = fieldName;
	ajaxArgs[4] = fieldValue;

	callSearchControl(ajaxArgs);
}

function callSearchObjectTypeChanged(serializedArgs, objectTypeId) {
	var objectTypeObject = getElementByBizAPPId(objectTypeId);
	var objectType;

	if (objectTypeObject != null)
		objectType = objectTypeObject.value;

	ajaxAsyncCall('SearchEx', ['SearchObjectTypeChanged', serializeArgs, objectType], false, true);
}

/***--SchedulerCalendar.js--***/
var g_schedulerchc;
function scheduler_init(chc, isMonthView) {
	g_schedulerchc = chc;

	if (isMonthView)
		$(document.body).find('[uie="APPTAREA"]').css({ 'overflow': '', 'overflow-x': '' })
}
function scheduler_dblClick(oSchedulerView, evt, elem) {
	evt.cancel = true;
	if (g_schedulerchc) {
		var selectedApp = oSchedulerView._selectedAppt;
		if (selectedApp && !selectedApp.elem)//week and month view
			selectedApp = null;
		else if (oSchedulerView._selectedApp)//day view
			selectedApp = oSchedulerView._selectedApp;

		var selectedAppKey = '';
		if (selectedApp)
			selectedAppKey = selectedApp.key;
		else if (oSchedulerView._selectedAD)
			selectedAppKey = oSchedulerView._selectedAD.getAttribute('key');

		if (selectedAppKey) { }
		else {
			var selectedDate = '';
			var thisDate = new Date();

			if (oSchedulerView._id == 'WebMonthView') {
				var wsi = ig_getWebScheduleInfoById('WebScheduleInfo');
				if (wsi)
					thisDate = wsi.getActiveDay();
			}
			else {
				var attr = elem.getAttribute('date'), dateParts;
				if (attr != null)  //month view
					dateParts = attr.split(',');
				else //day view
				{
					if ($(elem).attr('day'))//multi-day(week) view in cases where we are not performing actions on the first day
						thisDate = new Date(oSchedulerView._days[$(elem).attr('day')].time);
					else
						dateParts = oSchedulerView._props[3].split('-');

					var a = (oSchedulerView._getUieFromElem(elem).replace('SLOT', '') / 2);
					thisDate.setHours(a, a % 1 ? 30 : 0);
				}

				if (dateParts != null) {
					var yyyy = parseInt(dateParts[0]);
					var mm = parseInt(dateParts[1]);
					var dd = parseInt(dateParts[2]);
					thisDate.setFullYear(yyyy, mm, dd);
				}
			}

			if (attr != null)  //month view
				selectedDate = thisDate.toDateString();
			else //day view
				selectedDate = thisDate.toDateString() + ' ' + thisDate.getHours() + ':' + thisDate.getMinutes();
		}

		window.parent.ajaxAsyncCall('SchedulerEx', ['Drilldown', g_schedulerchc, selectedAppKey, selectedDate], false, true);
		return cancelBubble(evt);
	}
}
function callNavigateToScheduler(serializedArgs, controlName, viewDisplayName) {
	ajaxAsyncCall('SchedulerCalendarEx', ['RenderSchedulerView', serializeArgs, controlName, viewDisplayName, bza_getSize(controlName)], true, true);
}

function callSchedulerCalendarPopUp(event, serializedArgs, popupId) {
	if (event == null)
		event = window.event;

	var height, width;

	if ((document.documentElement.offsetWidth - event.clientX) < 200)
		width = document.documentElement.offsetWidth - 230 + "px";
	else
		width = event.clientX.toString() + "px";

	if ((document.documentElement.offsetHeight - event.clientY) < 230)
		height = document.documentElement.offsetHeight - 230 + "px";
	else
		height = event.clientY.toString() + "px";

	ajaxAsyncCall('SchedulerCalendarEx', ['SchedulerCalendarPopUp', serializedArgs, popupId, height, width], false, true);
}

function callSchedulerCalendarDisplay(id) {
	var div = getElementByBizAPPId(id, 'div');

	if (div) {
		div.style.display = 'none';
		div.style.position = 'absolute';
	}
}

/***--SchedulerControl.js--***/

var popupId;


function isChartMode() {
	return "false";
}

function callSchedulerUserType(serializedArgs, isCurrentUser) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerChangeUserType', serializedArgs, isCurrentUser, isChartMode()], false, true);
}

function callSchedulerSelectedUser(serializedArgs, id, filterType) {
	var ucVal = '';
	var usersControl = getElementByBizAPPId(id);
	if (usersControl)
		ucVal = usersControl.value;

	ajaxAsyncCall('SchedulerEx', ['SchedulerSelectedUser', serializedArgs, ucVal, filterType, isChartMode()], false, true);
}
function callSchedulerDayView(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerDayView', serializedArgs, isChartMode()], false, true);
}

function callSchedulerWeekView(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerWeekView', serializedArgs, isChartMode()], false, true);
}

function callSchedulerMonthView(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerMonthView', serializedArgs, isChartMode()], false, true);
}

function callSchedulerGantChartView(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerGantChartView', serializedArgs], false, true);
}

function callSchedulerNavigateToNext(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerNavigateToNext', serializedArgs, isChartMode()], false, true);
}

function callSchedulerNavigateToPrevious(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerNavigateToPrevious', serializeArgs, isChartMode()], false, true);
}

function callSchedulerToday(serializedArgs) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerToday', serializedArgs, isChartMode()], false, true);
}

function callSchedulerStateSelector(serializedArgs, id) {
	var ssVal = '';
	var stateSelector = getElementByBizAPPId(id);
	if (stateSelector)
		ssVal = stateSelector.value;

	ajaxAsyncCall('SchedulerEx', ['SchedulerStateSelector', serializeArgs, , isChartMode()], false, true);
}

function callSchedulerThumbnailStateSelector(serializedArgs, state) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerStateSelector', serializedArgs, state, isChartMode()], false, true);
}

function callSchedulerDayViewDrilldown(serializedArgs, selectedDate) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerDayViewDrilldown', serializedArgs, selectedDate, isChartMode()], false, true);
}

function callSchedulerWeekViewDrilldown(serializedArgs, startDate, endDate) {
	ajaxAsyncCall('SchedulerEx', ['SchedulerWeekViewDrilldown', serializeArgs, startDate, endDate], false, true);
}

function callApplySchedulerSelectedQuery(control, serializedArgs) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "SchedulerSelectedQuery";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = isChartMode();

	if (control != null)
		ajaxArgs[3] = control.value;

	ajaxAsyncCall("SchedulerEx", ajaxArgs, false, true);
}

function callSchedulerUsersPopupOnMouseClick(serializedArgs, id) {
	var div = getElementByBizAPPId(id, 'div');

	if (div) {
		div.style.position = "absolute";

		div.style.top = "0px";
		div.style.left = "0px";

		div.style.height = "25px";
		div.style.width = "200px"

		div.style.display = 'inline';
	}
}

function callSchedulerDetailsPopupOnMouseOver(serializedArgs, id) {
	if (popupId)
		callSchedulerDetailsPopupOnMouseOut(serializedArgs, popupId);

	popupId = id;

	var div = getElementByBizAPPId(id, 'div');

	if (div) {
		div.style.position = "absolute";

		div.style.top = "0px";
		div.style.left = "0px";

		div.style.height = "200px";
		div.style.width = "300px"

		div.style.display = 'block';
	}
}

function callSchedulerDetailsPopupOnMouseOut(serializedArgs, id) {
	var div = getElementByBizAPPId(id, 'div');

	if (div) {
		div.style.position = "absolute";

		div.style.top = "0px";
		div.style.left = "0px";

		div.style.height = "0px";
		div.style.width = "0px"

		div.style.display = 'none';
	}
}

function callSchedulerDetailsPopupOnMouseClick(event, serializedArgs, popupId, objectId, controlId, color) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "SchedulerPopUp";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;
	ajaxArgs[3] = objectId;
	ajaxArgs[4] = event.y.toString() + "px";
	ajaxArgs[5] = event.x.toString() + "px";
	ajaxArgs[6] = color;

	var control = getElementByBizAPPId(controlId, 'div');

	if (control) {
		var availableWidth = control.offsetWidth - event.x;
		var availableHeight = control.offsetHeight - event.y;

		if (availableHeight < 220)
			ajaxArgs[4] = (control.offsetHeight - 220) + "px";

		if (availableWidth < 300)
			ajaxArgs[5] = (control.offsetWidth - 300) + "px";
	}

	ajaxAsyncCall("SchedulerEx", ajaxArgs, false, true);
}

function callSchedulerGanttDetailsPopUpOnMouseClick(event, serializedArgs, popupId, objectId, controlId, color, recalculateHeight) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "SchedulerPopUp";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;
	ajaxArgs[3] = objectId;
	ajaxArgs[4] = event.y.toString() + "px";
	ajaxArgs[5] = event.x.toString() + "px";
	ajaxArgs[6] = color;

	var control = getElementByBizAPPId(controlId, 'div');

	if (control) {
		if (recalculateHeight == true || recalculateHeight == "true" || recalculateHeight == "True") {
			var availableHeight = control.offsetHeight - event.y;
			if (availableHeight < 220)
				ajaxArgs[4] = (control.offsetHeight - 220) + "px";
		}

		var availableWidth = control.offsetWidth - event.x;
		if (availableWidth < 300)
			ajaxArgs[5] = (control.offsetWidth - 300) + "px";
	}

	ajaxAsyncCall("SchedulerEx", ajaxArgs, false, true);
}


/***--TransactionListPage.js--***/
function transactionListHandler(event, args) {
	var source = getSourceElement(event);
	var mode = $(source).attr('mode');

	if (mode == 'save')
		ajaxSyncCall('HelperEx', ['CloseTransactionsPageAndLogout', 'Save']);
	else if (mode == 'dontsave')
		signOutWithNoDirtyTransactionsCheck();
	else if (mode == "view") {
		var listControl = getElementByBizAPPId('TransactionsList');

		if (listControl.value)
			ajaxSyncCall('HelperEx', ['NavigateToPendingTransaction', args, listControl.value]);
	}
}
function callCloseTransactionsPage(type, serializedArgs) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "CloseTransactionsPageAndLogout";
	ajaxArgs[1] = type;

	if (type == "Save")
		ajaxSyncCall("HelperEx", ajaxArgs);
	else if (type == "DontSave")
		closeWindow("signOutWithNoDirtyTransactionsCheck");
	else if (type == "Cancel")
		closeWindow(false);
	else if (type == "View") {
		var listControl = getElementByBizAPPId("TransactionsList");
		if (listControl.value) {
			var selectedValue = "View" + "," + listControl.value + "," + serializedArgs;
			closeWindow(selectedValue);
		}
	}
}

function callTransactionListPage(page, context) {
	var height = "271px";
	var width = "370px";

	var returnValue = showDialog(page, height, width, "no");

	if (returnValue == true || returnValue == "true")
		signOut(context);
	else if (returnValue == "signOutWithNoDirtyTransactionsCheck")
		signOutWithNoDirtyTransactionsCheck();
	else if (returnValue != null && returnValue != "undefined" && returnValue != false && returnValue.split(",")[0] == "View") {
		var ajaxArgs = new Array();

		ajaxArgs[0] = "NavigateToPendingTransaction";
		ajaxArgs[1] = returnValue.split(",")[2];
		ajaxArgs[2] = returnValue.split(",")[1];

		ajaxSyncCall("HelperEx", ajaxArgs);
	}
}

/***--Configure RuntimeObject.js--***/

function callRenderSteps(serializedArgs, controlName, eve) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "RenderSteps";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = controlName;

	ajaxSyncCall("HelperEx", ajaxArgs);
}

function callConfigureRuntimeObject(serializedArgs, popupId, eve) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "ConfigureRuntimeObject";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;

	var x;
	var y;

	if (eve) {

		x = eve.clientX;
		y = eve.clientY + 10;

		if (x)
			x = x.toString() + "px";

		if (y)
			y = y.toString() + "px";

		ajaxArgs[3] = y;
		ajaxArgs[4] = x;

		ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
	}
}

/***--Delegation Control.js--***/

function callDelegationPopup(serializedArgs, popupId, posLeft, posTop, eve) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "DelegationPopup";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;

	var x;
	var y;

	if (eve) {

		x = eve.clientX;
		y = eve.clientY;

		if (x)
			x = x.toString() + "px";

		if (posLeft)
			x = posLeft;

		if (y)
			y = y.toString() + "px";

		if (posTop)
			y = posTop;

		ajaxArgs[3] = y;
		ajaxArgs[4] = x;

		ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
	}
}

function callDelegationItemOnClick(serializedArgs, identifier, eve) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "DelegationItemClick";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = identifier;

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}

function callUnDelegationItemOnClick(serializedArgs, identifier, eve) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "UnDelegationItemClick";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = identifier;

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}

/***--BusinessObjectForm.js--***/

function callShowBusinessObjectForm(serializedArgs) {
	var businessobjectFormPopupContainer = getElementByBizAPPId("businessobjectformpopupcontainer", 'div');

	businessobjectFormPopupContainer.style.display = "block";

	var x = document.documentElement.offsetWidth / 4;
	var y = document.documentElement.offsetHeight / 2 - 150;

	businessobjectFormPopupContainer.style.left = x + "px";
	businessobjectFormPopupContainer.style.top = y + "px";

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ShowBusinessObjectForm";
	ajaxArgs[1] = serializedArgs;

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}

//#region StepControl
function callShowPendingJobsInfo(serializedArgs) {
	var pendingJobsInfoPopupContainer = getElementByBizAPPId("pendingjobsinfopopupcontainer", 'div');

	pendingJobsInfoPopupContainer.style.diplay = "block";

	var x = document.documentElement.offsetWidth / 4;
	var y = document.documentElement.offsetHeight / 2 - 150;

	pendingJobsInfoPopupContainer.style.left = x + "px";
	pendingJobsInfoPopupContainer.style.top = y + "px";

	ajaxAsyncCall('HelperEx', ['ShowPendingJobsInfo', serializedArgs, y + 'px', x + 'px'], false, true);
}

function bizapp_evalDefaultActionLink(event, chc, cType) {
	var source = getSourceElement(event);
	var type = $(source).closest('li').attr('type');
	ajaxAsyncCall('HelperEx', ['ExecuteDefaultActionLink', chc, cType, type], false, true);
}
//#endregion

/***--Alert Control.js--***/

var messageId;
var newMessage;

var persistAlertPopupPosition = false;
var persistStickyNotePopupPosition = false;

function callAlertDetailsPopup(event, serializedArgs, popupId) {
	messageId = "";

	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "AlertPopUp";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;

	var x;
	var y;

	if (!isIE())
		persistAlertPopupPosition = false;

	if (!persistAlertPopupPosition) {
		persistAlertPopupPosition = true;

		if (event) {
			x = Math.min(event.clientX, document.documentElement.offsetWidth - 420);
			y = event.clientY;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			x = x.toString() + "px";

		if (y)
			y = y.toString() + "px";
	}
	else {
		var popupControl = getElementByBizAPPId("alertpopup", 'div');

		if (popupControl) {
			x = popupControl.style.left;
			y = popupControl.style.top;

			x = x.toString();
			y = y.toString();
		}
	}

	ajaxArgs[3] = y;
	ajaxArgs[4] = x;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
}

function callRefreshAlertControl(contextHashCode) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "RefreshAlertControl";
	ajaxArgs[1] = contextHashCode;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, false);
}

function callStickyNoteDetailsPopup(event, serializedArgs, popupId) {
	if (event == null)
		event = window.event;

	messageId = "";
	var ajaxArgs = new Array();

	ajaxArgs[0] = "StickyNotePopUp";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;

	var x;
	var y;

	if (!isIE())
		persistStickyNotePopupPosition = false;

	if (!persistStickyNotePopupPosition) {
		persistStickyNotePopupPosition = true;

		if (event) {
			x = Math.min(event.clientX, document.documentElement.offsetWidth - 450);
			y = event.clientY;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			x = x.toString() + "px";

		if (y)
			y = y.toString() + "px";
	}
	else {
		var popupControl = getElementByBizAPPId("stickynotepopup", 'div');

		if (popupControl) {
			x = popupControl.style.left;
			y = popupControl.style.top;

			x = x.toString();
			y = y.toString();
		}
	}

	ajaxArgs[3] = y;
	ajaxArgs[4] = x;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
}

function callStickyNoteConfigure(serializedArgs, popupId, posLeft, posTop, event) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ConfigureStickyNotes";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = popupId;

	var x;
	var y;

	if (event) {
		x = Math.min(event.clientX, document.documentElement.offsetWidth - 50);
		y = event.clientY;

		if (x)
			x = x.toString() + "px";

		if (posLeft)
			x = posLeft;

		if (y)
			y = y.toString() + "px";

		if (posTop)
			y = posTop;


		ajaxArgs[3] = y;
		ajaxArgs[4] = x;

		ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
	}
}

function callApplyConfiguration(serializedArgs, popupId, itemId, event) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ApplyConfiguration";
	ajaxArgs[1] = serializedArgs;

	var checkItem = getElementByBizAPPId(itemId);
	var checked = checkItem.childNodes[0].checked;

	ajaxArgs[2] = checked.toString();

	callClosePopUp(popupId);

	ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
}

function callClosePopUp(popupId) {
	var div = getElementByBizAPPId(popupId, 'div');
	closeCalendar();
	if (div)
		div.style.display = 'none';
}

function callDeleteMessage(event, serializedArgs, objectId, posTop, posLeft, controlType) {
	messageId = "";

	if (!isIE()) {
		if (event == null)
			event = window.event;

		if (event) {
			x = posLeft;
			y = posTop;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			posLeft = x.toString();

		if (y)
			posTop = y.toString();
	}
	else {
		if (controlType == "Alert")
			popupControl = getElementByBizAPPId("alertpopup", 'div');
		else
			popupControl = getElementByBizAPPId("stickynotepopup", 'div');

		if (popupControl) {
			posTop = popupControl.style.top;
			posLeft = popupControl.style.left;
		}
	}

	var ajaxArgs = new Array();

	ajaxArgs[0] = "DeleteMessage";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = objectId;
	ajaxArgs[3] = posTop;
	ajaxArgs[4] = posLeft;
	ajaxArgs[5] = controlType;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
}

function callShowAllMessages(event, serializedArgs, posTop, posLeft, controlType) {
	messageId = "";
	var popupControl;

	if (!isIE()) {
		if (event == null)
			event = window.event;

		if (event) {
			x = posLeft;
			y = posTop;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			posLeft = x.toString();

		if (y)
			posTop = y.toString();
	}
	else {
		if (controlType == "Alert")
			popupControl = getElementByBizAPPId("alertpopup", 'div');
		else
			popupControl = getElementByBizAPPId("stickynotepopup", 'div');

		if (popupControl) {
			posTop = popupControl.style.top;
			posLeft = popupControl.style.left;
		}
	}

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ShowAllMessages";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = posTop;
	ajaxArgs[3] = posLeft;
	ajaxArgs[4] = controlType;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, true);
}

function callPageNavigation(event, serializedArgs, posTop, posLeft, controlType, navigationType, pageNumber) {
	messageId = "";

	if (!isIE()) {
		if (event == null)
			event = window.event;

		if (event) {
			x = posLeft;
			y = posTop;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			posLeft = x.toString();

		if (y)
			posTop = y.toString();
	}
	else {

		if (controlType == "Alert")
			popupControl = getElementByBizAPPId("alertpopup", 'div');
		else
			popupControl = getElementByBizAPPId("stickynotepopup", 'div');

		if (popupControl) {
			posTop = popupControl.style.top;
			posLeft = popupControl.style.left;
		}
	}

	var ajaxArgs = new Array();

	ajaxArgs[0] = "PageNavigation";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = posTop;
	ajaxArgs[3] = posLeft;
	ajaxArgs[4] = controlType;
	ajaxArgs[5] = navigationType;

	ajaxAsyncCall("AlertEx", ajaxArgs, false, false);
}

function callShowHideMessage(id, createNewAlertId) {
	if (!messageId)
		messageId = id.split(";")[0];

	var preDiv = getElementByBizAPPId(messageId, 'div');

	callSetContainerToNormal(messageId, 'true');
	callSetContainerToNormal(createNewAlertId, 'true');

	if (preDiv)
		preDiv.style.display = 'none';

	if (newMessage) {
		var newMessageDiv = getElementByBizAPPId(newMessage, 'div');

		if (newMessageDiv)
			newMessageDiv.style.display = 'none';
	}

	var msgId = id.split(";")[1];

	if (msgId != null)
		messageId = msgId;

	callRezizeContainer(messageId, 'false', 'false');

	var div = getElementByBizAPPId(id.split(";")[1]);

	if (div)
		div.style.display = 'block';
}

function callRezizeContainer(id, doOperation, isCreateNew) {
	var controlId = "td_" + id;
	var tdControl = getElementByBizAPPId(controlId, "TD");

	if (tdControl) {
		var attrib = tdControl.getAttribute("reply");
		if (doOperation == 'true') {
			tdControl.style.height = "400px";
			tdControl.style.width = "100%";
			tdControl.setAttribute("reply", "alive");
		}
		else if (attrib == "alive") {
			tdControl.style.height = "400px";
			tdControl.style.width = "100%";
		}
	}

	if (isCreateNew == 'true')
		callSetContainerToNormal(messageId, 'true');;
}

function callSetContainerToNormal(id, doOperation) {
	var controlId = "td_" + id;
	var tdControl = getElementByBizAPPId(controlId, "TD");

	if (tdControl) {
		if (doOperation == 'true') {
			tdControl.style.height = "100%";
			tdControl.style.width = "100%";
		}
	}
}

function callCreateMessage(serializedArgs, type, id, divid) {
	callShowHideMessage(id, '');

	if (messageId != null)
		callRezizeContainer(messageId, '', 'true');

	newMessage = divid;
	ajaxAsyncCall("AlertEx", ['CreateNewMessage', serializedArgs, type], false, false);
}

function callEditMessage(serializedArgs, type, id, divid, newAlertMessageId) {
	callShowHideMessage(id, newAlertMessageId);
	newMessage = divid;

	ajaxAsyncCall("AlertEx", ['EditMessage', serializedArgs, type, divid], false, false);
}

function callMarkAsRead(serializedArgs, id, type) {
	ajaxAsyncCall('AlertEx', ['MarkAsRead', serializedArgs, id, type], false, false);
}

function callMarkAllAsRead(event, serializedArgs, posTop, posLeft, controlType) {
	messageId = "";
	var popupControl;


	if (controlType == "Alert") {
		popupControl = getElementByBizAPPId("alertpopup", 'div');
		callClosePopUp("alertpopup");
	}
	else {
		popupControl = getElementByBizAPPId("stickynotepopup", 'div');
		callClosePopUp("stickynotepopup");
	}

	if (!isIE()) {
		if (event == null)
			event = window.event;

		if (event) {
			x = posLeft;
			y = posTop;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		if (x)
			posLeft = x.toString();

		if (y)
			posTop = y.toString();
	}
	else {
		if (popupControl) {
			posTop = popupControl.style.top;
			posLeft = popupControl.style.left;
		}
	}

	ajaxAsyncCall('AlertEx', ['MarkAllAsRead', serializedArgs, posTop, posLeft, controlType], false, true);
}

function callRefreshCounter(serializedArgs, type) {
	ajaxAsyncCall('AlertEx', ['RefreshCounter', serializedArgs, type], false, false);
}

/***--ViewCollectionEx--***/
function callViewCollectionPopup(event, serializedContext, identifiers, popupId) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ViewCollectionPopup";
	ajaxArgs[1] = serializedContext;
	ajaxArgs[2] = identifiers;
	ajaxArgs[3] = popupId;

	var x;
	var y;

	if (event) {
		x = event.clientX;
		y = event.clientY;

		var position = getElementPosition(getSourceElement(event));
		if (position)
			y = position[1];

		if ((document.documentElement.offsetWidth - event.clientX) < 100)
			x = document.documentElement.offsetWidth - 100;

		if ((document.documentElement.offsetHeight - y) < 230)
			y = document.documentElement.offsetHeight - 230;
	}
	else {
		x = document.documentElement.offsetWidth / 2 - 195;
		y = document.documentElement.offsetHeight / 2 - 144;
	}

	ajaxArgs[4] = '';
	if (!isIE())
		ajaxArgs[4] = y.toString();
	ajaxArgs[5] = x.toString();

	ajaxAsyncCall("ViewCollectionEx", ajaxArgs, false, true);
}

function callChangeViewCollectionMenuItemAppearnce(menuItemId, cssClass) {
	var menuItem = getElementByBizAPPId(menuItemId, "td");

	if (menuItem)
		menuItem.className = cssClass
}

//#region Job Control
function callExecuteJob(contextHashCode) {
	var pendingJobsInfoPopupContainer = getElementByBizAPPId('jobcontrolpopupcontainer', 'div');
	var x;
	var y;

	if (pendingJobsInfoPopupContainer) {
		x = document.documentElement.offsetWidth / 5;
		y = document.documentElement.offsetHeight / 2 - 150;

		pendingJobsInfoPopupContainer.style.left = x + 'px';
		pendingJobsInfoPopupContainer.style.top = y + 'px';
	}

	ajaxAsyncCall('JobControlEx', ['ExecuteJob', contextHashCode, y + 'px', x + 'px'], false, false);
}

function callExecuteReportViewJob(contextHashCode) {
	ajaxAsyncCall('JobControlEx', ['ExecuteJob', contextHashCode, '', ''], false, false);
}

function callRefreshJobControl(contextHashCode, refreshInterval) {
	var refresh = true;

	var pendingJobsInfoPopupContainer = getElementByBizAPPId("jobcontrolpopupcontainer", 'div');

	if (pendingJobsInfoPopupContainer) {
		if (pendingJobsInfoPopupContainer.style.display != "block")
			refresh = false;
	}

	if (refresh) {
		ajaxAsyncCall('JobControlEx', ['RefreshJobControl', contextHashCode], false, false);
	}
}

function callRefreshJobReportViewControl(contextHashCode, controlName) {
	var pendingJobsInfoPopupContainer = getElementByBizAPPId(controlName);

	if (pendingJobsInfoPopupContainer) {
		ajaxAsyncCall('JobControlEx', ['RefreshJobControl', contextHashCode], false, false);
	}
}

function showPendingJobsContainer(show) {
	var pendingJobsInfoPopupContainer = getElementByBizAPPId("jobcontrolpopupcontainer", 'div');

	if (pendingJobsInfoPopupContainer) {
		if (show.toLowerCase() == "true")
			pendingJobsInfoPopupContainer.style.diplay = "block";
		else
			pendingJobsInfoPopupContainer.style.diplay = "none";
	}
}
//#endregion

/***--ReportViewerEx--***/

function callRefreshReportViewer(serializedArgs, reportFormatId, reportViewModeId) {
	var ajaxArgs = new Array();

	ajaxArgs[0] = "RefreshReportViewer";
	ajaxArgs[1] = serializedArgs;

	var reportFormatChanger = getElementByBizAPPId(reportFormatId);

	if (reportFormatChanger)
		ajaxArgs[2] = reportFormatChanger.value;
	else
		ajaxArgs[2] = "";

	var reportViewModeChanger = getElementByBizAPPId(reportViewModeId);

	if (reportViewModeChanger)
		ajaxArgs[3] = reportViewModeChanger.value;
	else
		ajaxArgs[3] = "";

	ajaxAsyncCall("ReportViewerEx", ajaxArgs, false, true);
}
/***--AdvancedList.js--***/

function callEvaluateLink(serializedArgs, runtimeObjectID, linkControl) {
	//if commit throws any error do not proceed
	if (commitEditableGrids() != true)
		return;

	ajaxAsyncCall("AdvancedListEx", ['ExecuteLink', serializedArgs, runtimeObjectID, linkControl], false, true);
}

function callDisplayItems(id) {
	var control = getElementByBizAPPId(id, 'DIV');

	if (control)
		$(control).toggle();
}

function callHighLightItem(event, type, normal, highlighted) {
	var ctrl = getSourceElement(event);
	if (ctrl) {
		ctrl = $(ctrl).closest('div')[0];
		if (type == "onmouseover")
			ctrl.className = highlighted;
		else
			ctrl.className = normal;
	}
}

function callChangeFilterToAddText(event, id, type, attributeName) {
	var item = getElementByBizAPPId(id, 'DIV');

	if (item) {
		var attributeValue = item.getAttribute(attributeName);

		if (type == "onclick") {
			var textBoxId = attributeValue + "Filter";
			textBoxId = textBoxId.replace(" ", "");

			var fun = "callChangeFilterToAddText( event, '" + textBoxId + "','onkeydown', 'itemname' );";
			item.innerHTML = "<input class=\"formtextbox\" itemname=\"" + attributeValue + "\" id=\"" + textBoxId + "\" parentId=\"" + id + "\" style=\"width: 100%\" onkeydown=\"" + fun + "\" onclick=\"if( event )event.cancelBubble=true;\" title=\"" + attributeValue + "\"/>";

			setFocus(textBoxId);
		}
		else if (type == "onkeydown") {
			if (event.keyCode == '9') {
				var parentID = item.getAttribute('parentId');
				var parentObj = getElementByBizAPPId(parentID, 'DIV');

				if (item.value && item.value != "" && item.value != undefined)
					parentObj.innerHTML = attributeValue + "[" + item.value + "]";
				else
					parentObj.innerHTML = attributeValue;
			}
		}
	}
}

/***--AdvancedGrid.js--***/

function getAdvancedGridCheckBoxSelection() {
	return igtbl_selectColumn_BizAPP("UltraWebGrid", "UltraWebGrid_c_0_0", "UltraWebGrid_c_0_1", "UltraWebGrid_c_0_2", "UltraWebGrid_c_0_3");
}
function advancedGridRefresh(serializedArgs) {
	ajaxAsyncCall("HelperEx", ['AdvancedGridRefresh', serializeArgs], false, true);
}


/***--ViewPicker.js--***/

function callChangeViewByObjectPicker(viewId, runtimeObjectId, fieldName) {
	if (runtimeObjectId && runtimeObjectId != '' && runtimeObjectId != NaN && runtimeObjectId != undefined) {
		if (isIE()) {
			if (event && (event.shiftKey || event.ctrlKey)) {
				if (runtimeObjectId.split(":")[2] == -1)
					showWindow("TestView.aspx?html.args=runtimeobjectid[NVS]" + runtimeObjectId);
				else
					showWindow("TestView.aspx?html.args=runtimeisversion[NVS]True[PMS]runtimeobjectid[NVS]" + runtimeObjectId);

				return;
			}

			if (document.activeElement.className == "formtextbox" && document.activeElement.disabled == false)
				return;
		}

		callViewSyncCall(['RenderViewByRuntimeField', viewId, runtimeObjectId, fieldName, bza_getSize(viewId), 'false']);
	}
}

function callSearchFilteredValue(searchPage, outlineArgs, args) {
	searchPage = searchPage + "?html.args=" + args;

	var selectedObjects;

	if (isIE6())
		selectedObjects = showDialogWithOptions(searchPage, "480px", "600px", "yes", "no");
	else
		selectedObjects = showDialogWithOptions(searchPage, "450px", "600px", "yes", "no");

	// Invert
	if (selectedObjects != null) {
		if (!isIE()) {
			var eve = "showObject( '" + selectedObjects + "', '" + args + "' )";
			eval(eve);
		}
		else
			showObject(selectedObjects, args);
	}
}
function callSearchControl(ajaxArgs) { ajaxAsyncCall("SearchEx", ajaxArgs, false, true); }
function showObject(selectedObjects, args) { callSearchControl(['ShowObjects', selectedObjects, args]); }

//#region CustomSearch
//variable which holds the control's id from where serach isinitiated
var g_custSearchInit;
var g_searchCHC;//variable which holds originating CHC
function callCustomSearchDialog(CHC, controlid) {
	g_custSearchInit = controlid;
	g_searchCHC = CHC;
	ajaxAsyncCall('HelperEx', ['ShowCustomSearchGrid', g_searchCHC], false, true);
}
function callCustAdvSrhDlg(chc, ctrlid) {
	g_custSearchInit = ctrlid;
	g_searchCHC = chc;
	ajaxAsyncCall('HelperEx', ['ShowCustomAdvSearch', g_searchCHC], false, true);
}
function showAdvSearchDialog(html, openjs) {
	showDialogDQ('', html, 550, 800, false, openjs);
}
function custSearchCompleteHandler(CHC) {
	zoomout();

	if (g_searchCHC) {
		CHC = g_searchCHC;
		g_searchCHC = '';
	}

	//dependent fields call
	callOutline(['GetDependentFieldsInfo', CHC]);

	//get focus back to the search initiator
	if (g_custSearchInit) {
		try {
			g_custSearchInit = '';
			var control = getElementByBizAPPId(g_custSearchInit, 'input');
			if (control)
				control.focus();
		}
		catch (Error) { logError('', Error); }
	}
}
function verbTypeSearchCompleteHandler(CHC) {
	zoomout();

	if (g_searchCHC) {
		CHC = g_searchCHC;
		g_searchCHC = '';
	}

	BizAPP.UI.LoadControlUsingContext(CHC);
}
//#endregion

//#region ObjectPicker
function callObjectPickerCallBack(args, roid) {
	if (roid && roid != '' && roid != NaN && roid != undefined)
		ajaxSyncCall('ObjectPickerEx', ['ObjectPickerCallBack', args, roid]);
}
function getObjectPickerValueForScheduler(args, opid) { callObjectPicker(['ObjectPickerValueForScheduler', args, getObjectPickerValue(opid)]); }
function callViewPicker(CHC) { callObjectPicker(['ShowSearchGrid', CHC]); }
function refreshViewPicker(args, selectedViews) {
	zoomout();
	if (selectedViews)
		callObjectPicker(['AddToObjectPicker', args, selectedViews]);
}
function callDeleteOnObjectPicker(args, objectPickerListId) {
	var objectPickerValue = getObjectPickerValue(objectPickerListId);
	if (objectPickerValue)
		callObjectPicker(['DeleteSelectedValue', args, objectPickerValue]);
}
function getObjectPickerValue(objectPickerListId) { return getElementByBizAPPId(objectPickerListId, 'select').value; }
function callObjectPicker(args) { ajaxAsyncCall('ObjectPickerEx', args, false, true); }
//#endregion

//#region Impersonation Control
function callSearchUsersForImpersonation() {
	ajaxAsyncCall('ImpersonationControlEx', ['ShowSearchGrid'], false, true);
}
function showImpDialog(grid, openjs) {
	showDialogDQ('', grid, 500, 800, true, openjs);
}

function showDialogDQ(title, html, height, width, bSearch, openjs) {
	html = html.replace(/\[BSQ]/g, "'");
	html = html.replace(/\[BDQ]/g, '"');
	showPopup(title, html, height, width, true, false, bSearch, openjs);
}
function bizapp_showDlg(html, height, width, bSearch, closeJs, openJs, hideClose) {
	if (html)
		html = html.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"').replace(/\[BSRQ]/g, '\r').replace(/\[BSNQ]/g, '\n').replace(/\[BSTQ]/g, '\t');
	if (closeJs)
		closeJs = closeJs.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"');
	if (openJs)
		openJs = openJs.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"');

	var options = getTinyBoxOptions(html, height, width, '', bSearch, hideClose);
	if (closeJs) {
		options.closejs = function () { };
		options.strclosejs = closeJs;
	}
	if (openJs) {
		options.openjs = function () { };
		options.stropenjs = openJs;
	}
	showTinyBoxWithOptions(options);
}
function refreshImpersonationControl(args, selectedViews) {
	zoomout();
	if (selectedViews)
		ajaxAsyncCall('ImpersonationControlEx', ['AddToObjectPicker', args, selectedViews], false, true);
}

function callImpersonate(impersonationControlListId) {
	var selectedUser = getImpersonationControlValue(impersonationControlListId);
	if (selectedUser)
		ajaxAsyncCall('ImpersonationControlEx', ['Impersonate', selectedUser], false, true);
}

function getImpersonationControlValue(impersonationControlListId) {
	return getElementByBizAPPId(impersonationControlListId, 'select').value;
}

function callDeleteOnImpersonationControl(args, impersonationControlListId) {
	var selectedUser = getImpersonationControlValue(impersonationControlListId);
	if (selectedUser)
		ajaxAsyncCall('ImpersonationControlEx', ['DeleteSelectedValue', args, selectedUser], false, true);
}
function callImpPrev(chc) {
	ajaxAsyncCall('ImpersonationControlEx', ['SwitchToImpersonatingUser', chc], false, true);
}
//#endregion

//#region Label
var g_hasSysAdminResp = false, g_hasAppAdminResp = false;
function bza_BaseClickHandler(event) {
	if (!event) event = window.event;
	closeCalendar(event);
	var source = getSourceElement(event);
	if (!source) return;
	source = $(source);

	if (source.hasClass('bza-pivot')) {
		var qid = source.attr('bza-pivotqid');
		if (qid)
			BizAPP.UI.PivotTable.ShowPivotOptions(qid);
	}

	if (source.attr('bza-userid') && !source.is('[readonly]')) {
		position = 'bottom pright'
		if ((window.innerWidth - event.target.getBoundingClientRect().left) < 350)
			position = 'bottom pleft'
		var $target = $(event.target);
		BizAPP.UI.LoadView({
			url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemaf9ec[PMS]runtimeobjectid[NVS]' + $target.attr('bza-userid') + '&html.jar=true',
			selector: $('dummydiv'), menuPopupSelector: event.target, position: position
		});
	}

	var rowid = source.closest('tr').attr('rowid');
	if (rowid) {
		BizAPP.UI.LoadView({ url: 'uiview.asmx?html.jar=true&html.args=runtimeobjectid[NVS]' + rowid, inlinePopup: true, showprocessing: true, callback: null });
	}
}
function bza_BaseDblClickHandler(event) {
	if (!g_hasSysAdminResp) return;
	if (!event) event = window.event;
	var source = getSourceElement(event);
	if (!source) return;
	source = $(source);
	var resId = source.attr('bizappresid');
	if (resId) {
		ajaxAsyncCall('HelperEx', ['ObjectDrilldownCallback', '', 'resource', resId]);
		return;
	}

	resId = source.attr('bizapproid');
	if (resId) {
		ajaxAsyncCall('HelperEx', ['ObjectDrilldownCallback', '', '', resId, 'displayName']);
		return;
	}

	if (g_enableLog && !source.is('input, select'))
		BizAPP.UI.ShowDebugDetails(source);
}
//#endregion

/***--Others.js--***/

function callRefreshTree(serializedArgs) {
	ajaxAsyncCall("TreeEx", ['RefreshTree', serializedArgs], false, true);
}

function callApplyCSS(control, controlId, cssClass) {
	if (!control)
		control = getElementByBizAPPId(controlId);

	if (control)
		control.className = cssClass
}

/***--Div Mover with Animation.js--***/

var elementId;

function callMouseDown(event, moveableElementId) {
	elementId = getElementByBizAPPId(moveableElementId, 'div');

	if (event == null)
		event = window.event;

	if (elementId.style.left == "")
		pleft = "0";
	else
		pleft = elementId.style.left;

	if (elementId.style.top == "")
		ptop = "0";
	else
		ptop = elementId.style.top;

	pleft = parseInt(pleft);
	ptop = parseInt(ptop);

	xcoor = event.clientX;
	ycoor = event.clientY;

	document.onmousemove = callMouseMove;

	return false;
}


function callMouseMove(event) {
	if (event == null)
		event = window.event;

	elementId.style.left = pleft + event.clientX - xcoor + "px";
	elementId.style.top = ptop + event.clientY - ycoor + "px";

	return false;
}


function callMouseUp(cssClass) {
	elementId = null;
	document.onmousemove = null;
}

/***--Div Mover Point to Point.js--***/
var popupElement;

function callMouseDownOnPopup(popupid, cssClass) {
	popupElement = getElementByBizAPPId(popupid, 'div');

	if (popupElement.style.display == "block") {
		popupElement.className = cssClass;
		clicked = true;
	}
	else
		popupElement = null;
}
function callMouseUpOnpopup(cssClass) {
	if (clicked == true && popupElement != null) {
		popupElement.className = cssClass;

		clicked = false;
		popupElement = null;
	}
}

function callMouseUpOnEnterprise(eve, cssClass) {
	if (clicked == true && popupElement != null) {
		popupElement.className = cssClass;

		popupElement.style.left = eve.clientX + "px";
		popupElement.style.top = eve.clientY + "px";

		clicked = false;
		popupElement = null;
	}
}

/***--Div Resize Point to Point.js--***/
var resizeclick = false;
var popupElementResize;

function callMouseDownOnPopupResizing(popupid) {
	popupElementResize = document.getElementById(popupid);

	if (popupElementResize.style.display == "block")
		resizeclick = true;
	else
		popupElement = null;
}
function callMouseUpOnpopupResizing() {
	if (resizeclick == true && popupElementResize != null) {
		resizeclick = false;
		popupElementResize = null;
	}
}
function callMouseUpOnEnterprisePopupResizing(eve) {
	if (resizeclick == true && popupElementResize != null) {
		var exceptionsPopup = getElementByBizAPPId("exceptionspopup", 'div');

		popupElementResize.style.width = eve.clientX + "px";
		exceptionsPopup.style.width = eve.clientX - 3 + "px";

		resizeclick = false;
		popupElementResize = null;
	}
}

//#region AttachmentControl
function getLastResponse(responseId) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "GetLastResponse";
	ajaxArgs[1] = responseId;

	callOutlineWithProcessing(ajaxArgs);
}

function ResizeFileUploadControl(uploadCtrlId, attachCtrlId, frameWidth) {
	var upload = document.getElementById(uploadCtrlId);
	if (upload) {
		var attach = document.getElementById(attachCtrlId);
		if (attach) {
			var attachdims = attach.getClientRects()[0];
			upload.size = (frameWidth - ((attachdims.right - attachdims.left))) / 7.5;
			upload.style.height = '100%';
		}
	}
}

var g_SLFileUpload;
function resizeSLAttachment(id) {
	g_SLFileUpload = id;
}
//#endregion

/*** DerivedTypes ***/

function callDerivedTemplate(viewId, templatePage, serializedContext) {
	var height = "300px";

	if (isIE6())
		height = "350px";

	var selectedObjects = showDialogWithOptions(templatePage, height, "380px", "no", "no");

	if (selectedObjects != null) {
		// Invert
		if (isIE()) {
			callRenderDerivedTemplateView(viewId, serializedContext, selectedObjects);
		}
		else {
			var eve = "callRenderDerivedTemplateView( '" + viewId + "', '" + serializedContext + "', '" + selectedObjects + "')";
			try {
				eval(eve);
			}
			catch (Error) {
			}
		}
	}
}

function callRenderDerivedTemplateView(viewId, serializedContext, selectedObjects) {
	var ajaxArgs = new Array();
	ajaxArgs[0] = "RenderDerivedTemplateView";
	ajaxArgs[1] = serializedContext;
	ajaxArgs[2] = selectedObjects;
	ajaxArgs[3] = bza_getSize(viewId);
	ajaxSyncCall("ViewEx", ajaxArgs);
}

function callDerivedObjectTemplates(serializedArgs, controlId) {
	var selectedValue = getDropdownListValue(controlId);
	var ajaxArgs = new Array();

	ajaxArgs[0] = "DerivedObjectTemplates";
	ajaxArgs[1] = serializedArgs;
	ajaxArgs[2] = selectedValue;

	ajaxAsyncCall("HelperEx", ajaxArgs, false, true);
}

function getDropdownListValue(controlId) {
	var control = getElementByBizAPPId(controlId, 'select');
	return control.value;
}

function callApplyDerivedTemplate(type, templateId) {
	var template = document.getElementById(templateId);
	var returnValue = type + ";" + template.value;

	closeWindow(returnValue);
}

/***--EOCC.js--***/

function callInvokeEOCCView(serializedArgs) {
	ajaxAsyncCall('ExtendedObjectControlEx', ['EOCCView', serializedArgs], false, true);
}

/***--Time Control.js--***/

function callTimeSetFieldValue(serializedArgs, controlName) {
	ajaxAsyncCall('TimeControlEx', ['TimeSetFieldValue', serializedArgs, controlName, getDropdownListValue(controlName)], false, true);
}

/***--NonAjax.js--***/

function addNewObjectIdentifier(identifier) {
	var divObject = getElementByBizAPPId("newobjectidentifier");

	if (divObject)
		divObject.innerHtml = identifier;
}


function nonAjaxCall(source, id, args, maskProcessing) {
	var frame = window.parent.getElementByBizAPPId("postbackframe");
	var nonAjaxRequest = new Array();

	nonAjaxRequest[0] = source;
	nonAjaxRequest[1] = id;
	nonAjaxRequest[2] = args;
	nonAjaxRequest[3] = maskProcessing;
	nonAjaxRequest[4] = getEnterpriseName();
	nonAjaxRequest[5] = getSessionId();

	nonAjaxRequests[nonAjaxRequests.length] = nonAjaxRequest;

	if (frame != null) {
		if (enterpriseBody == null)
			enterpriseBody = getElementByBizAPPId("nonajaxform");

		for (var i = 0; i < nonAjaxRequests.length; i++) {
			var nonAjaxReq = new Array();
			nonAjaxReq = nonAjaxRequests[i];

			var isource = "Responder.aspx?html.args=" + nonAjaxReq[0] + "[PMS]" + nonAjaxReq[4] + "[PMS]" + nonAjaxReq[5] + "[PMS]" + nonAjaxReq[1] + "[PMS]" + serializeArgs(nonAjaxReq[2]);
			createIframe(isource, nonAjaxReq[1]);
		}

		if (nonAjaxRequests != null && nonAjaxRequests.length > 0) {
			try {
				nonAjaxRequests.clear();
			}
			catch (Error) {
			}
		}

		return frame;
	}
}

function serializeArgs(args) {
	var serializedArgs;
	for (var i = 0; i < args.length; i++) {
		if (serializedArgs == null)
			serializedArgs = (args[i] + "[PMS]");
		else
			serializedArgs += (args[i] + "[PMS]");
	}

	return serializedArgs;
}

function createIframe(source, id) {
	ifrm = document.createElement("IFRAME");
	ifrm.id = ifrm.bizappid = "nonajaxmode_" + id;
	ifrm.setAttribute("src", source);
	ifrm.style.width = 1 + "px";
	ifrm.style.height = 1 + "px";
	ifrm.style.display = "none";

	if (enterpriseBody == null)
		enterpriseBody = window.parent.getElementByBizAPPId("nonajaxform");

	try {
		enterpriseBody.appendChild(ifrm);
	}
	catch (Error) {
	}
}

function removeIFrame(id) {
	try {
		var iframeElement = window.parent.getElementByBizAPPId(id);

		if (enterpriseBody == null)
			enterpriseBody = window.parent.getElementByBizAPPId("nonajaxform");

		enterpriseBody.removeChild(iframeElement);
	}
	catch (Error) { }
}

function responseCompleteHandler() {
	var values = new Array();

	values[0] = getElementByBizAPPId("status").innerHTML;
	values[1] = getElementByBizAPPId("html").innerHTML;
	values[2] = getElementByBizAPPId("events").innerHTML;
	values[3] = getElementByBizAPPId("exceptions").innerHTML;
	values[4] = getElementByBizAPPId("debugs").innerHTML;

	window.parent.responseHandlerForValue(values);

	removeIFrame(getElementByBizAPPId("status").parentNode.bizappid);
}

function responseHandlerForValue(values) {
	ProcessingStatus(false, true);
	var bytesReceived = 0;

	var startTime = (new Date()).getTime();
	var status = values[0];
	var html = values[1];
	var events = values[2];
	var exceptions = values[3];
	var debugs = values[4];
	var responseId = values[5];
	var retry = true;

	if (!requestCancelled(responseId)) {
		displayStatus(status);
		replaceHTML(html, retry, function () {
			displayExceptions(exceptions, debugs);
			fireEvents(events);
			displayDebugs(debugs);
		});

		if (html != null)
			bytesReceived = Math.floor(html.length / 1024);
	}

	IncrementRequestCount(-1);

	if (getActiveRequests() <= 0) {
		var time = getTotalRequestTime("__TR__");
		var clientTime = (new Date()).getTime() - startTime;
		if (bytesReceived > 1)
			displayStatus("Server Response Time: " + time + " Seconds, Client Response Time : " + clientTime / 1000 + " Seconds, Bytes Received: " + bytesReceived + " KB");
		else
			displayStatus("Server Response Time: " + time + " Seconds, Client Response Time : " + clientTime / 1000 + " Seconds");
	}
}

function keepAlive(url, timeout) {
	var iframe = getElementByBizAPPId("keepalive");

	if (iframe == null) {
		iframe = document.createElement("IFRAME");
		iframe.setAttribute("BizAPPid", "keepalive");

		iframe.style.height = "0";
		iframe.style.width = "0";

		iframe.style.display = "none";

		var container = getElementByBizAPPId("ProcessingImage");
		if (container)
			container.appendChild(iframe);
	}

	iframe.src = url;
	setTimeout("keepAlive ( '" + url + "', " + timeout + " );", timeout);
}

function ResizeImportControl(uploadCtrlId, frameWidth) {
	var upload = document.getElementById(uploadCtrlId);
	if (upload) {
		upload.size = frameWidth / 6.5;
		upload.style.height = '100%';
	}
}

/*Custom.js*/

function closeAllPopups() {
	for (var i = 0; i < popUpControls.length; i++) {
		var obj = getElementByBizAPPId(popUpControls[i], "div");

		if (obj)
			obj.style.display = 'none';
	}
}
function showpopup(id, event, size, top) {
	closeAllPopups();

	event.cancelBubble = true;
	var obj = getElementByBizAPPId(id, 'div');

	if (obj) {
		if (obj.style.display == "none")
			obj.style.display = "Block";
		else
			obj.style.display = "none";

		obj.style.left = Math.min(event.clientX, document.documentElement.offsetWidth - size);
		obj.style.top = top;
	}
}


var menuarray = new Array();
var openMenu;

function showMenu(menuid, id, event, dispx, dispy) {
	if (openMenu) {
		var obj1 = getElementByBizAPPId(openMenu);

		if (obj1)
			obj1.style.display = "none";
	}

	var obj = getElementByBizAPPId(id);

	if (obj)
		obj.style.display = "Block";

	openMenu = id;
}

//#region chart zoom
var newImg;
function zoomin(img, event, charttitle) {
	if (newImg)
		newImg.src = '';
	else
		newImg = new Image();

	newImg.src = img.getAttribute("src");
	if (isWebkit())
		setTimeout('zoominHelper("' + charttitle + '");', 200);
	else
		zoominHelper(charttitle);
}
function zoominHelper(charttitle) {
	showTinyBox('', null, null, $(newImg).attr('src'));
}

function zoomout() {
	var popup = BizAPP.UI.InlinePopup.getActivePopup(false);
	if (popup)
		popup.hide(null, true);
	HandleCallbacks();
}

function HandleCallbacks() {

	if (popupCallBackElementId != null && popupCallBackElementId != "") {

		if (isPopupCalledBySilverlight) {

			var control = document.getElementById(popupCallBackElementId);
			var silverLightObject = control.children[0];
			popupCallBackElementId = "";
			silverLightObject.Content.CallBackHandler.HandleResponse("closed", popupCallBackElementDetails);
		}
	}
}

function getElementPosition(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			//needed when the actual obj is in a scroll container
			if (obj.style.overflow == 'auto' && obj.scrollHeight > obj.clientHeight)
				curtop -= obj.scrollTop;

			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
		while (obj = obj.offsetParent);
	}

	return [curleft, curtop];
}
//#endregion

//#region datetime
function filltime(comboboxid, is12hourFormat, showSeconds, interval, currentDate, currentTime) {
	if (!interval && interval == '0')
		return;

	var cb = document.getElementById(comboboxid);
	interval = parseInt(interval);
	is12hourFormat = is12hourFormat == "true";
	showSeconds = showSeconds == "true";

	cb.setAttribute("currentDate", currentDate);

	var now = new Date();
	now.setHours(0, 0, 0, 0);
	var hour;
	var min;
	var sec;
	var add = "AM";
	var HTML = '';
	var selected = false;

	if (currentTime == "00:00 AM") {
		addTimeEntry(cb, HTML, true);
		selected = true;
	}


	while (now.getDate() == new Date().getDate()) {
		hour = now.getHours();
		min = now.getMinutes();
		sec = now.getSeconds();
		var shour, smin, ssec;
		if (is12hourFormat && hour > 12) {
			hour -= 12;
			add = "PM";
		}

		smin = min <= 9 ? "0" + min : min.toString();
		ssec = sec <= 9 ? "0" + sec : sec.toString();
		shour = hour < 10 ? "0" + hour : hour.toString();

		if (is12hourFormat) {
			if (hour == 12)
				add = "PM";
			sec += " " + add;
		}

		if (showSeconds)
			HTML = shour + ":" + smin + ":" + ssec;
		else
			HTML = shour + ":" + smin + " " + add;

		if (!selected) {
			selected = HTML == currentTime;
			addTimeEntry(cb, HTML, true);
		}
		else
			addTimeEntry(cb, HTML, false);

		now.setMinutes(now.getMinutes() + interval, 0, 0);
	}

	if (!selected)
		addTimeEntry(cb, currentTime, true);
}
function addTimeEntry(cb, text, selected, i) {
	var oOption = document.createElement("OPTION");
	oOption.text = text;
	oOption.value = text;
	if (selected == true)
		oOption.setAttribute("selected", "selected");
	try {
		cb.add(oOption, i);
	}
	catch (Error) {
		cb.appendChild(oOption);
	}
}
//#endregion

//#region ActiveXControl
function callMapBizAPPFieldToActiveXProperty(contextHashCode, controlId, fieldPropertyMap) {
	var activex = document.getElementById(controlId);

	if (activex) {
		var fieldPropertyMapValue = "";
		var fieldsPropertyMaps = fieldPropertyMap.split(',');

		for (var i = 0; i < fieldsPropertyMaps.length; i++) {
			var activeXProperty = fieldsPropertyMaps[i].split(':')[1];
			if (activeXProperty) {
				var value = fieldsPropertyMaps[i].split(':')[0] + ":" + activex[activeXProperty];

				if (i != fieldsPropertyMaps.length - 1)
					value += ",";

				fieldPropertyMapValue += value;
			}
		}

		var ajaxArgs = new Array();

		ajaxArgs[0] = "MapBizAPPFieldToActiveXProperty";
		ajaxArgs[1] = contextHashCode;
		ajaxArgs[2] = fieldPropertyMapValue;

		ajaxAsyncCall("ActiveXControlEx", ajaxArgs, false, true);
	}
}

function callMapActiveXPropertyToBizAPPField(activeXControlId, fieldPropertyMap) {
	var activex = document.getElementById(activeXControlId);

	if (activex) {
		var fieldsPropertyMaps = fieldPropertyMap.split(',');

		for (var i = 0; i < fieldsPropertyMaps.length; i++) {
			var activeXProperty = fieldsPropertyMaps[i].split(':')[1];
			if (activeXProperty)
				activex[activeXProperty] = fieldsPropertyMaps[i].split(':')[0];
		}
	}
}

function loadActiveXObject(containerId, activeXControlId, obj, fieldPropertyMap) {
	var container = document.getElementById(containerId);
	if (container) {
		container.innerHTML = "";
		container.innerHTML = obj;

		if (fieldPropertyMap)
			callMapActiveXPropertyToBizAPPField(activeXControlId, fieldPropertyMap);
	}
}
//#endregion

//#region Grid Scrolling
function initializeScrolling(ctrlName, direction) {
	if (!direction)
		direction = 'up';

	var obj = getElementByBizAPPId(ctrlName, 'div');
	if (obj) {
		var gsInitValue = obj.clientHeight;
		var width = obj.clientWidth;

		if (gsInitValue == 0)
			gsInitValue = obj.parentNode.clientHeight;
		if (width == 0)
			width = obj.parentNode.clientWidth;

		if (isIE())
			obj.outerHTML = "<marquee behavior='scroll' width=\"" + width + "px\" height=\"" + gsInitValue + "px\" direction='" + direction + "' scrollamount='1' scrolldelay='50' onmouseover='this.stop()' onmouseout='this.start()'>" + obj.outerHTML + "</marquee>";
		else
			obj.parentNode.innerHTML = "<marquee behavior='scroll' width=\"" + width + "px\" height=\"" + gsInitValue + "px\" direction='" + direction + "' scrollamount='1' scrolldelay='20' onmouseover='this.stop()' onmouseout='this.start()'>" + obj.parentNode.innerHTML + "</marquee>";

		var obj = getElementByBizAPPId(ctrlName, 'div');
		if (!isIE())
			obj.parentNode.start();
	}
}
function setupSlider(itemSelector, containerSelector) {
	setupPaging(itemSelector, containerSelector);
	showElement(0, itemSelector, containerSelector);
}

function showElement(index, itemSelector, containerSelector) {
	$(itemSelector).hide();
	if (!$(itemSelector)[index])
		index = 0;
	$($(itemSelector)[index]).show('slow');
	$(containerSelector).children('ol').children('li').removeClass('current');
	$(containerSelector).children('ol').children('li[index="' + index + '"]').addClass('current');
	setTimeout('showElement(' + (index + 1) + ',"' + itemSelector + '","' + containerSelector + '");', 5000);
}

function setupPaging(itemSelector, containerSelector) {
	var itemsCount = $(itemSelector).length;
	var list = document.createElement('ol');
	$(list)
		.addClass('controls')
		.appendTo($(containerSelector));

	for (var i = 0; i < itemsCount; i++) {
		$(document.createElement("li"))
			.attr('index', i)
			.html('<a>' + (i + 1) + '</a>')
			.click(function () { showElement($(this).attr('index'), itemSelector, containerSelector); })
			.appendTo($(list));
	}
}
//#endregion

//#region ContextMenu
var contextMenuObj;
var MSIE = navigator.userAgent.indexOf('MSIE') ? true : false;
var navigatorVersion = navigator.appVersion.replace(/.*?MSIE (\d\.\d).*/g, '$1') / 1;
var activeContextMenuItem = false;

function highlightContextMenuItem() {
	this.className = 'contextMenuHighlighted';
}

function deHighlightContextMenuItem() {
	this.className = '';
}

function showContextMenu(event, control) {
	contextMenuObj = control.parentNode.parentNode.parentNode.getElementsByTagName('UL')[0];
	contextMenuSource = this;
	if (activeContextMenuItem) activeContextMenuItem.className = '';
	if (!event) event = window.event;

	initContextMenu(control, event);

	var xPos = event.clientX;
	if (xPos + contextMenuObj.offsetWidth > (document.documentElement.offsetWidth - 20))
		xPos = xPos + (document.documentElement.offsetWidth - (xPos + contextMenuObj.offsetWidth)) - 20;

	var yPos = event.clientY;
	if (window.document.body.scrollTop > 0)
		//yPos = (window.screen.Height) ? e.clientY + window.document.body.scrollTop - 20 : e.clientY - 20;
		yPos = event.clientY + window.document.body.scrollTop - 20;

	else if (window.pageYOffset)
		yPos = (window.pageYOffset > 0) ? event.clientY + window.pageYOffset - 20 : event.clientY - 20;

	else
		yPos = event.clientY - 20;

	contextMenuObj.style.left = xPos + 'px';
	contextMenuObj.style.top = yPos + 'px';
	contextMenuObj.style.display = 'block';

	cancelBubble(event);
	return false;
}

function hideContextMenu(e) {
	if (contextMenuObj) {
		if (document.all) e = event;
		if (e) {
			if (e.button == 0 && !MSIE) { }
			else
				contextMenuObj.style.display = 'none';
		}
		else
			contextMenuObj.style.display = 'none';
	}
	document.oncontextmenu = '';
}

function initContextMenu(control, event) {
	contextMenuObj = control.parentNode.parentNode.parentNode.getElementsByTagName('UL')[0];

	contextMenuObj.setAttribute("roid", getAttributeValue(control, "roid"));

	contextMenuObj.style.display = 'block';
	var menuItems = contextMenuObj.getElementsByTagName('LI');
	for (var no = 0; no < menuItems.length; no++) {
		menuItems[no].onmouseover = highlightContextMenuItem;
		menuItems[no].onmouseout = deHighlightContextMenuItem;

		var aTag = menuItems[no].getElementsByTagName('SPAN')[0];

		var img = menuItems[no].getElementsByTagName('IMG')[0];
		if (img) {
			var div = document.createElement('DIV');
			div.className = 'imageBox';
			div.appendChild(img);

			if (MSIE && navigatorVersion < 6) {
				aTag.style.paddingLeft = '0px';
			}

			var divTxt = document.createElement('DIV');
			divTxt.className = 'itemTxt';
			divTxt.innerHTML = aTag.innerHTML;

			aTag.innerHTML = '';
			aTag.appendChild(div);
			aTag.appendChild(divTxt);
			if (MSIE && navigatorVersion < 6) {
				div.style.position = 'absolute';
				div.style.left = '2px';
				divTxt.style.paddingLeft = '15px';
			}

			if (!document.all) {
				var clearDiv = document.createElement('DIV');
				clearDiv.style.clear = 'both';
				aTag.appendChild(clearDiv);
			}
		}
		else {
			if (MSIE && navigatorVersion < 6)
				aTag.style.paddingLeft = '15px';
			else
				aTag.style.paddingLeft = '30px';
		}
	}
	contextMenuObj.style.display = 'none';
	document.documentElement.onclick = hideContextMenu;
}
//#endregion

//#region GanttChart
var g;
function InitGanttChart(xml, gcHostId, events) {
	g = new JSGantt.GanttChart('g', getElementByBizAPPId(gcHostId), 'week');
	try {
		JSGantt.XMLParse(g, xml);
	}
	catch (Error) { }

	g.Draw();
	g.DrawDependencies();
	if (events)
		fireEvents(events);
}
function changeGanttFormat(cb) {
	if (g) {
		g.setFormat(cb.value);
		g.DrawDependencies();
	}
	else { displayMessage('Chart undefined'); };
}
//#endregion

//#region EnterpriseToolBar Control
function handleEnterpriseToolBar(chc, handlerType) { callEnterpriseToolBar(['HandleEnterpriseToolbar', chc, handlerType]); }
function handleEnterpriseLinkCollection(chc, handlerType, linkControlName) { callEnterpriseToolBar(['HandleEnterpriseToolbar', chc, handlerType, linkControlName]); }
function callEnterpriseToolBar(args) { ajaxAsyncCall('EnterpriseToolBarEx', args, false, true); }
//#endregion

function CloseAllPopups() {
	callClosePopUp('viewgrouppopup');
	callClosePopUp('viewpopup');
}

function positionContainer(event, id) {
	if (event == null)
		event = window.event;

	var control = document.getElementById(id);

	if (control) {
		var x;
		var y;

		if (event) {
			x = event.clientX;
			y = event.clientY;

			var position = getElementPosition(getSourceElement(event));
			if (position)
				y = position[1];

			if ((document.documentElement.offsetWidth - event.clientX) < 100)
				x = document.documentElement.offsetWidth - 100;

			if ((document.documentElement.offsetHeight - y) < 230)
				y = document.documentElement.offsetHeight - 230;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		control.style.top = y + "px";
		//control.style.left = x + "px";
	}
}

function callOpenPopUp(popupId) {
	var div = getElementByBizAPPId(popupId, 'div');
	if (div)
		div.style.display = 'block';
}

//#region TouchScreen
function checkIfTouchScreen() {
	return false;
}

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
//#endregion

//#region Silverlight
function CheckSilverlightVersion() {
	//try firefox etc.
	var nav = navigator.plugins["Silverlight Plug-In"];
	if (nav) {
		return nav.description;
	}
	else {
		//try the IE one...
		try {
			var control = new ActiveXObject('AgControl.AgControl');

			var vers = Array(1, 0, 0, 0);
			loopMatch(control, vers, 0, 1);
			loopMatch(control, vers, 1, 1);
			loopMatch(control, vers, 2, 10000);
			loopMatch(control, vers, 2, 1000);
			loopMatch(control, vers, 2, 100);
			loopMatch(control, vers, 2, 10);
			loopMatch(control, vers, 2, 1);
			loopMatch(control, vers, 3, 1);

			return vers[0] + "." + vers[1] + "." + vers[2] + "." + vers[3];
		}
		catch (e) {
		}
	}
}
function loopMatch(control, vers, idx, inc) {
	while (IsSupported(control, vers)) {
		vers[idx] += inc;
	}
	vers[idx] -= inc;
}
function IsSupported(control, ver) {
	return control.isVersionSupported(ver[0] + "." + ver[1] + "." + ver[2] + "." + ver[3]);
}
function evalJS(func) {
	eval(func);
}
//#endregion

//#region back persist screen and view collection
function fireScreenChange(screenId, screenValue) {
	var screen = getElementByBizAPPId(screenId, 'DIV', false);
	if (screen) {
		var dd = screen.getElementsByTagName('SELECT')[0];
		if (dd) {
			dd.value = screenValue;
			dd.onchange();
		}
	}
}
function fireViewCollectionChange(vcId, vcValue) {
	var vcConatiner = getElementByBizAPPId(vcId);
	var vcTable = getFirstElementByAttributeValue(vcConatiner, 'TABLE', 'class', 'screentable');
	if (vcTable) {
		var vcEles = vcTable.getElementsByTagName('TD');
		var vcLength = vcEles.length;

		for (var i = 0; i < vcLength; i++) {
			var cell = vcEles[i];
			if (getAttributeValue(cell, 'onclick').toString().indexOf(vcValue) > 0) {
				sltTab(cell);
				break;
			}
		}
	}
}
//#endregion

//#region Pivot Table
function callPivotTable(table, event, chc) {
	var source = getSourceElement(event);
	if (source.tagName.toLowerCase() == 'td') {
		if (source.cellIndex === 0)
			return;
		var a = source.parentNode.cells[0].innerHTML;
		var b = source.parentNode.parentNode.parentNode.rows[0].cells[source.cellIndex].innerHTML;

		ajaxAsyncCall('PivotTableEx', ['PivotTableClickHandler', chc, a, b], false, true);
	}
}
//#endregion

//#region Menu Control*/
function initializeMenu(nav, bClick) {
	var navroot = document.getElementById(nav);
	if (navroot) {
		var a = getBizAppElementsByClassName(navroot, 'DIV', 'm-c');
		if (a.length > 0) $(navroot).addClass('m-dummy');

		if ((isIE() && navroot.currentStyle) || bClick) {
			if (!bClick && a.length == 0) navroot.style.position = 'relative';

			/* Get all the list items within the menu */
			var lis = navroot.getElementsByTagName("LI");
			var listLength = lis.length;

			for (i = 0; i < listLength; i++) {
				/* If the LI has another menu level */
				try {
					var listItem = lis[i];
					if (listItem.lastChild.tagName == 'UL') {
						if (bClick) { listItem.onclick = showHideMenu; }
						else {
							/* assign the function to the LI */
							listItem.onmouseover = menuMouseOver;
							listItem.onmouseout = menuMouseOut;
						}
					}
				}
				catch (Error) { }
			}
		}
	}
}
var g_activeMenu;
function showHideMenu(event) {
	if (!event)
		event = window.event || arguments[0];

	if (g_activeMenu && $(g_activeMenu.lastChild).is(":visible")) {
		var hideMenu = isIE() ? this.uniqueID != g_activeMenu.uniqueID : this != g_activeMenu;

		if (hideMenu) {
			$(g_activeMenu.lastChild).hide();
			g_activeMenu = null;
		}
	}

	if (this && this.lastChild && this.lastChild.tagName == 'UL' && !$(this.lastChild).is(":visible")) {
		g_activeMenu = this;
		$(g_activeMenu.lastChild).show();

		cancelBubble(event);
		return false;
	}
}
function menuMouseOver() {
	this.lastChild.style.display = "block";
}
function menuMouseOut() {
	this.lastChild.style.display = "none";
}
//#endregion

//#region Editable Grids
var g_editableGrids = new Dictionary();
function commitEditableGrids() {
	var result = true;
	for (var i = 0; i < g_editableGrids.Keys.length && result != false; i++) {
		var key = g_editableGrids.Keys[i];
		var gridID = g_editableGrids.Lookup(key);
		var grid = getElementByBizAPPId(gridID);
		//check if grid is editable
		if (grid && getBizAppElementsByClassName(grid, 'DIV', 'gCancel').length > 0) {
			//get context hashcode
			if (isIE()) {
				var context = getBizAppElementsByClassName(grid, 'DIV', 'gCommit')[0].onclick.toString().split("'")[1];
			}
			else {
				context = getBizAppElementsByClassName(grid, 'DIV', 'gCommit')[0].onclick.toString().split(",")[1];
				if (context.indexOf('"') != -1)
					context = context.split('"')[1];
				else
					context = context.split('\'')[1];
			}
			//call commit, if it throws error stop and wait for user to rectify
			if (callCommitRefresh(null, context, gridID, false) != true) {
				result = false;
			}
		}
	}

	return result;
}
function checkifEditable() {
	for (var i = 0; i < g_editableGrids.Keys.length; i++) {
		var key = g_editableGrids.Keys[i];
		var grid = getElementByBizAPPId(g_editableGrids.Lookup(key));
		var editGrids = new Array();
		if (grid && getBizAppElementsByClassName(grid, 'DIV', 'gCancel').length > 0) {
			editGrids.push(key);
		}
	}
	return editGrids;
}
function Lookup(key) {
	return (this[key]);
}
function clear() {
	this.Keys = new Array();
}
function Delete() {
	for (c = 0; c < Delete.arguments.length; c++) {
		this[Delete.arguments[c]] = null;
	}
	var keys = new Array()
	for (var i = 0; i < this.Keys.length; i++) {
		if (this[this.Keys[i]] != null)
			keys[keys.length] = this.Keys[i];
	}
	this.Keys = keys;
}
function Add() {
	for (c = 0; c < Add.arguments.length; c += 2) {
		this[Add.arguments[c]] = Add.arguments[c + 1];
		this.Keys[this.Keys.length] = Add.arguments[c];
	}
}
function Dictionary() {
	this.clear = clear;
	this.Add = Add;
	this.Lookup = Lookup;
	this.Delete = Delete;
	this.Keys = new Array();
}
//#endregion

//#region Form Focus*/
function bza_frmProps(formid, setFocus, autotaborder) {
	var form;
	if (setFocus) {
		form = $(getElementByBizAPPId(formid));
		var a = form.find('input:visible,select:visible').not('[readonly]');
		if (a.length > 0) a[0].select();
	}
	if (autotaborder) {
		if (!form)
			form = $(getElementByBizAPPId(formid));

		var $groupbox = form.find('formgroupbox');
		$groupbox.each(function () {
			if (!this.hasAttribute('tabprocessed')) {
				var $eles = $(this).find('textarea:visible,input:visible,select:visible');
				$eles.sort(function (a, b) {
					var atop = parseInt($(a).css('top')),
						btop = parseInt($(b).css('top'));
					if (atop == btop) {
						atop = parseInt($(a).css('left')),
							btop = parseInt($(b).css('left'));
						return atop - btop;
					}
					else {
						return atop - btop;
					}
				});
				$eles.detach().appendTo($(this));
				$(this).attr('tabprocessed', 'true');
			}
		});
	}
}
//#endregion

//#region  Tabbed Document
function handleRemoveTabbedDocument(chc) { callTabbedDoc(['HandleRemoveTabbedDocument', chc]); }
function handleRemoveAllTabbedDocuments(chc) { callTabbedDoc(['HandleRemoveAllTabbedDocuments', chc]); }
function callTabbedDoc(args) { ajaxAsyncCall('TabbedDocumentEx', args, false, true); }
//#endregion

//#region Import Control start
function showImportOpts(title, html) { BizAPP.UI.Grid.ShowImportExportPopup(title, html); }
function showImport(title, html) { showDialogDQ(title, html, 400, 750); }
function handleInlinePopupImport(event, CHC, gCHC, gCN) { callImport(['HandleInlinePopupImport', CHC, gCHC, gCN]); }
function displayImportTemplate(event, control, CHC, gCHC, gCN) { callImport(['DisplayImportTemplate', CHC, gCHC, gCN]); }
function handleImportTemplate(event, control, CHC, gCHC, gCN) {
	var source = getSourceElement(event)
	var type = $(source).closest('[mode]').attr('mode');
	callImport(['HandleImportTemplate', CHC, gCHC, gCN, type]);
	zoomout();
}
function callImport(args) { ajaxAsyncCall('ImportEx', args, false, true); }
function showColumnMapPopup(title, html) { zoomout(); showDialogDQ(title, html, 200, 700); }

function mapActions(event) {
	event.cancelBubble = true;
	var source = getSourceElement(event);

	if (source) {
		if (source.className == "edtMap")
			editMap(source);
		else if (source.className == "saveMap")
			saveMap(source);
		else if (source.className == "canMap")
			canMap(source);
		else if (source.className == "ignoreMap")
			ignoreMap(source);
	}
}

function canMap(source) {
	var headCell = $(source).parent();
	headCell.children('.headerMap').show();
	headCell.children('.edtMap').show();
	headCell.children('.ignoreMap').show();
	headCell.children('.saveMap').hide();
	headCell.children('.canMap').hide();
	headCell.children('select').hide();
	highLightCell(headCell[0], false);
}
function editMap(source) {
	$('#mapTable').find('th').each(function () {
		canMap($(this).children('.canMap')[0]);
	});

	var headCell = $(source).parent();
	highLightCell(headCell[0], true);
	headCell.removeAttr('ignore');
	headCell.removeClass('ignore');
	headCell.children('.headerMap').hide();
	headCell.children('.edtMap').hide();
	headCell.children('.ignoreMap').hide();
	headCell.children('.saveMap').show();
	headCell.children('.canMap').show();

	var fields = headCell.closest('table').attr('fields');
	fields = fields.split('[VS]');
	fields.unshift('');

	var header = headCell.children('.headerMap').html();
	if (headCell.children('select').length == 0) {
		var select = document.createElement("select");
		for (var i = 0; i < fields.length; i++) {
			var option = document.createElement("option");
			option.value = option.text = fields[i];
			if (header == option.value)
				option.selected = true;

			try {
				select.add(option, null); //Standard
			}
			catch (error) {
				select.add(option); // IE only
			}
		}

		$(source).after($(select));
	}
	else {
		var $select = headCell.children('select')
		$select.val(header);
		$select.show();
	}

	headCell.children('select')[0].scrollIntoView();
}
function saveMap(source) {
	var headCell = $(source).parent();
	canMap(source);

	if (!headCell.attr('originalVal'))
		headCell.attr('originalVal', headCell.children('.headerMap').html());

	var value = headCell.children('select').val();
	if (value) {
		headCell.addClass('bza-col-map');
		headCell.children('.headerMap').html(headCell.children('select').val());
	}

	//edit the next cell and scroll to it if needed
	var next = headCell.next();
	if (next && next.length > 0)
		editMap(next.children('.edtMap')[0]);
}
function ignoreMap(source) {
	var headCell = $(source).parent();
	headCell.attr('ignore', 'ignore');
	headCell.addClass('ignore');

	if (!headCell.attr('originalVal'))
		headCell.attr('originalVal', headCell.children('.headerMap').html());
}
function getMapInfo(chc) {
	var mapping = '', ignore = '';
	$('#mapTable').find('th').each(function () {
		var key = $(this).attr('originalVal');

		if ($(this).attr('ignore'))
			ignore += key + '[VS]';
		else if (key) {
			var value = $(this).children('.headerMap').html();
			if (key != value)
				mapping += key + '[NVS]' + value + '[PMS]';
		}
	});

	callImport(['ImportWithMapInfo', chc, mapping, ignore]);
}
function highLightCell(cell, highlight) {
	$('#mapTable').find('th').each(function () {
		$(this).removeClass('active');
	});

	if (highlight) {
		$(cell).addClass('active');
	}
}

//wizard
function importWizardLoad() {
	var stepNum = $('#hfCurrentStep').val();
	if (stepNum)
		stepNum--;
	else
		stepNum = 0;

	$('#pnlImportWizard').smartWizard(
		{
			transitionEffect: 'slideleft',
			enableFinishButton: true,
			onLeaveStep: importLeaveStepCallback,
			onShowStep: importShowStepCallback,
			onFinish: importFinishCallback,
			selected: stepNum
		});
	setTimeout("$('#pnlImportWizard').smartWizard('reinit', { stepNum: " + stepNum + " });", 500);
}
function importShowStepCallback(obj) {
	var step_num = obj.attr('rel');
	$('#hfCurrentStep').val(step_num);

	if (step_num == 2) {
		if ($('#hfMode').val() == 'upload') {
			$('#paste').hide();
			$('#Load').show();
		}
		else {
			$('#Load').hide();
			$('#paste').show();
		}
	}
}
function importLeaveStepCallback(obj) {
	var step_num = obj.attr('rel');
	var isValid = validateSteps(step_num);

	if (isValid) {
		$('#pnlImportWizard').smartWizard('hideMessage');

		if (step_num == 1) {
			if ($('#hfMode').val() == 'upload') {
				$('#paste').hide();
				$('#Load').show();
			}
			else {
				$('#Load').hide();
				$('#paste').show();
			}
		}
		else if (step_num == 2) {
			if ($('#hfMode').val() != 'upload') {
				callImport([
					'LoadExcelContent',
					getQSParamByName('html.args'),
					getQSParamByName('gridhashcode'),
					getQSParamByName('gridctrlname'),
					$('#excelTxt').val(),
					$('#tbCPDelimiter').val()]);
			}
			else {
				$('#btnUpload').click();
			}
		}
	}

	return isValid;
}
function importFinishCallback() {
	if (validateAllSteps())
		getMapInfo(importCopyExcelContext);
}

function validateAllSteps() {
	return true;
	var result;

	result = validateStep1();
	if (result.isValid)
		result = validateStep2();
	if (result.isValid)
		result = validateStep3();

	if (!result.isValid)
		$('#pnlImportWizard').smartWizard('showMessage', 'Please correct the errors in the steps and continue');

	return result.isValid;
}
function validateSteps(step) {
	var result;

	if (step == 1)
		result = validateStep1();
	else if (step == 2)
		result = validateStep2();
	else if (step == 3)
		result = validateStep3();

	if (!result.isValid)
		$('#pnlImportWizard').smartWizard('showMessage', result.msg);

	$('#pnlImportWizard').smartWizard('setError', { stepnum: step, iserror: !result.isValid });

	return result.isValid;
}
function validateStep1() {
	var isValid = true, msg;

	if (!$('#hfMode').val()) {
		isValid = false;
		msg = 'Choose an option to continue.'
	}

	return { isValid: isValid, msg: msg };
}

function validateStep2() {
	var isValid = true, msg;
	var cp = $('#excelTxt').val();
	var mode = $('#hfMode').val();

	if (mode != 'upload' && !cp && cp.length <= 0) {
		isValid = false;
		msg = 'Copy/Paste content from an excel file.';
	}
	else if (mode == 'upload' && $('#CSVFileUpoad').val().length <= 0) {
		isValid = false;
		msg = 'Please select a file to upload.';
	}
	return { isValid: isValid, msg: msg };
}

function validateStep3() { return { isValid: true, msg: '' }; }
//#endregion

function callRefreshControl(chc, controlId, controlType, refreshInterval) {
	//if user is working with the control donot refresh
	try {
		var cbs = $('[type=checkbox][bizappid~=' + controlId + ']');
		if (cbs.length > 0) {
			for (var i = 0; i < cbs.length; i++) {
				if (cbs[i].checked)
					return;
			}
		}
	}
	catch (e) { addLog('', e) }

	var control = getElementByBizAPPId(controlId);

	if (control)
		ajaxAsyncCall('HelperEx', ['RefreshControl', chc, controlType], false, false);
}

/*Utilities*/
function OpenModalDialog(sURL, sHeight, sWidth, XPos, YPos, resizable, scroll) {
	if (!window.showModalDialog)
		window.showModalDialog = function () { alert('Browser does not support popup\'s, use inline popup\'s instead.'); }
	var vReturnValue;
	vReturnValue = window.showModalDialog(sURL, window, GetDialogFeatures(sWidth, sHeight, resizable, scroll));

	return vReturnValue;
}

/*
objectName - name of the silverlight object tag
sURL - url to show popup
controlRefString - used by process designer to find the caller reference
*/
function ShowProcessConfiguration(sObjectName, sURL, sControlRefString, sHeight, sWidth, XPos, YPos) {
	var vReturnValue;
	vReturnValue = window.showModalDialog(sURL, window, GetDialogFeatures(sWidth, sHeight, true));

	//if (vReturnValue == undefined)
	//    vReturnValue = "";    

	//var control = document.getElementById(sObjectName);
	//var silverLightObject = control.children[0];
	//silverLightObject.Content.ProcessControl.HandleResponse(vReturnValue.toString(), sControlRefString);
	return vReturnValue;
}

function GetDialogFeatures(dialogWidth, dialogHeight, resizable, scroll) {
	var options = "center:yes;dialogWidth: " + dialogWidth + "px;dialogHeight: " + dialogHeight + "px;status: no;unadorned: yes;scroll:" + scroll + ";help: no;" + (resizable ? "resizable: yes;" : "");

	if (isFirefox()) {
		var width = $(document).width();
		var height = window.screen.availHeight;
		var dialogWidth = dialogWidth.replace("px", "");
		var dialogHeight = dialogHeight.replace("px", "");
		var dialogLeft = (width - dialogWidth) / 2;
		var dialogTop = (height - dialogHeight) / 2;

		options += "dialogLeft: " + dialogLeft + "; ";
		options += "dialogTop: " + dialogTop + "; ";
	}

	return options;
}

//#region AJAX
var g_appBasePath, g_ajaxRequests = 0, g_callBack, g_readOnly, g_callBacks = [], g_headers;
var __readonlyajaxcalls = new Object();
function customAjaxCall(source, enterprise, session, args, reqId, bAsyncCall, responseCallback, batchCall) {
	if (BizAPP.UI._promptEditLoss()) {
		BizAPP.UI.InlinePopup.Confirm({
			message: "You have data that has not yet been saved. Do you still want to continue?",
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				customAjaxCall1(source, enterprise, session, args, reqId, bAsyncCall, responseCallback, batchCall);
			},
			fnCancelCallback: function () { ProcessingStatus(false, true); }
		});
	}
	else
		return customAjaxCall1(source, enterprise, session, args, reqId, bAsyncCall, responseCallback, batchCall);
}
function customAjaxCall1(source, enterprise, session, args, reqId, bAsyncCall, responseCallback, batchCall) {
	if (enterprise == undefined)
		enterprise = '';
	if (session == undefined)
		session = '';
	if (g_appBasePath && !g_appBasePath.endsWith('/'))
		g_appBasePath = g_appBasePath + '/';

	var serviceUrl, DTO, result, ajaxData;

	if (g_useJSONForCustomAjax) {
		serviceUrl = batchCall ? 'silverlightdataaccess.asmx/JSONBatchCall' : 'silverlightdataaccess.asmx/jsonajaxcall';
		if (g_appBasePath)
			serviceUrl = g_appBasePath + serviceUrl;

		DTO = JSON.stringify({ 'type': source, 'enterpriseName': enterprise, 'sessionId': session, 'args': args, 'id': reqId });
		if (g_enableLog) serviceUrl += '?' + reqId;
		ajaxData = {
			async: bAsyncCall == undefined ? true : bAsyncCall,
			contentType: 'application/json; charset=utf-8',
			type: 'POST',
			url: serviceUrl,
			data: DTO,
			dataType: 'text',
			success: bAsyncCall ? customAjaxAsyncSuccess : function (data, textStatus, jqXHR) { result = customAjaxSyncSuccess(data, textStatus, jqXHR); },
			error: customAjaxFailed,
			context: { callback: responseCallback }
		};
	}
	else {
		serviceUrl = 'SilverlightDataAccess.asmx/AjaxCall';
		if (g_appBasePath)
			serviceUrl = g_appBasePath + serviceUrl;

		DTO = 'type=' + source + '&enterpriseName=' + enterprise + '&sessionId=' + session + '&args=' + args.join('[BAS]') + '&id=' + reqId;
		ajaxData = {
			async: bAsyncCall == undefined ? true : bAsyncCall,
			type: 'POST',
			url: serviceUrl,
			data: DTO,
			success: bAsyncCall ? customAjaxAsyncSuccess : function (data, textStatus, jqXHR) { result = customAjaxSyncSuccess(data, textStatus, jqXHR); },
			error: customAjaxFailed,
			context: { callback: responseCallback }
		};
	}

	if (BizAPP.UI.currentApplication) {
		if (!g_headers)
			g_headers = "{currentApplication: '" + BizAPP.UI.currentApplication + "'}";
		else {
			var a = JSON.parse(g_headers);
			a["currentApplication"] = BizAPP.UI.currentApplication;
			g_headers = JSON.stringify(a);
		}
	}

	ajaxData.beforeSend = function (xhr) {
		if ((args && $.inArray(args[0], __readonlyajaxcalls[source]) != -1) || g_readOnly) {
			g_readOnly = false;
			xhr.setRequestHeader('X-Bza-Type', 'read-only')
		}

		if (g_headers) {
			var a = g_headers;
			xhr.setRequestHeader('Bza-Options', a);
			g_headers = '';
		}
	};

	if (g_callBack) {
		ajaxData.context.requestCallback = g_callBack;
		g_callBack = null;
	}

	if (g_callBacks.length) {
		ajaxData.context.requestCallBacks = g_callBacks;
		g_callBacks = [];
	}

	makeAjaxCall(ajaxData);
	return result;
}
function makeAjaxCall(ajaxData) {
	//if ($.active > 0 && g_ajaxRequests > 0)
	//    setTimeout(function () { makeAjaxCall(ajaxData); }, 100);
	//else
	makeAjaxCall1(ajaxData);
}
function makeAjaxCall1(ajaxData) {
	g_ajaxRequests++;
	//xmlAjaxCall(ajaxData);
	$.ajax(ajaxData);
}

function xmlAjaxCall(ajaxData) {
	var xmlhttp;
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	xmlhttp.open(ajaxData.type, ajaxData.url, ajaxData.async);
	xmlhttp.setRequestHeader("Content-type", ajaxData.contentType || "application/x-www-form-urlencoded");

	xmlhttp.onreadystatechange = function (aEvt) {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200)
				ajaxData.success(xmlhttp.response, xmlhttp.statusText, xmlhttp);
			else
				ajaxData.error(xmlhttp.response, xmlhttp.statusText, xmlhttp);
		}
	};

	xmlhttp.send(ajaxData.data);
}
function customAjaxFailed(jqXHR, textStatus, result) {
	if (g_ajaxRequests > 0) g_ajaxRequests--;
	BizAPP.UI._handleFailedResponse(jqXHR, textStatus, result);
}
function customAjaxAsyncSuccess(data, textStatus, jqXHR) {
	var response = customAjaxSyncSuccess(data, textStatus, jqXHR);

	if ((textStatus == 'success' || textStatus == 'OK') && typeof this.callback == 'undefined' && (typeof this.context == 'undefined' || typeof this.context.callback == 'undefined')) {
		responseHandler(response);
	}
	else if (typeof this.context == 'undefined')
		this.callback(response, textStatus, jqXHR);
	else
		this.context.callback(response, textStatus, jqXHR);

	if (typeof (this.requestCallback) != 'undefined') {
		try {
			this.requestCallback(response, textStatus, jqXHR);
		}
		catch (Error) { logError('request call back failed.', Error); }
	}

	BizAPP.UI.ProcessCallBacks(this.requestCallBacks, response, textStatus, jqXHR);

	return false;
}
function customAjaxSyncSuccess(data, textStatus, jqXHR) {
	if (g_ajaxRequests > 0) g_ajaxRequests--;
	if (textStatus == 'success' || textStatus == 'OK') {
		var response;
		var json;
		var value;

		if (g_useJSONForCustomAjax) {
			json = data;
			data = JSON.parse(data);
			value = data.d || data;
		}
		else {
			json = data;
			if (isIE())
				value = data.text.split('[BACS]');
			else
				value = data.childNodes[0].textContent.split('[BACS]');
		}

		response = { value: value, json: json };
		$.ajax.mostRecentCall = jqXHR;
		return response;
	}
	else
		customAjaxFailed(jqXHR, textStatus, data);
}

//#region Sync Calls
function outlineAjaxCall(args) {
	ajaxEntryCall('OutlineEx', args, false, false);
}
function ajaxSyncCall(source, args) {
	return ajaxEntryCall(source, args, true);
}
function ajaxSyncCallAndNoResponseHandler(source, args) {
	return ajaxEntryCall(source, args, false, true);
}
function ajaxEntryCall(source, args, bHandleResponse, bHandleExceptions) {
	fireRichTextSave(true);

	if (enableAjax) {
		addLog("\nSychronous Call : " + source + "  Method Name : <b>" + args[0] + '</b>');
		if (g_customAjax == true)
			var result = customAjaxCall(source, getEnterpriseName(), getSessionId(), args, getNextRequestId(), false);
		else
			result = BizAPP.Web.UI.View.Control.HelperEx.AjaxCall(source, getEnterpriseName(), getSessionId(), args, getNextRequestId());

		if (bHandleResponse)
			responseHandler(result);
		else if (bHandleExceptions)
			displayExceptions(result.value[3], result.value[4]);

		return result;
	}
	else {
		ajaxAsyncCall(source, args, false, true);
	}
}
//#endregion

function ajaxAsyncCall(source, args) {
	ajaxAsyncCall(source, args, true);
}
function ajaxAsyncCall(source, args, maskEvent, maskProcessing) {
	if (g_forceSyncCalls) {
		ajaxSyncCall(source, args);
		return;
	}

	if (!maskEvent || g_customAjax) {
		realAjaxAsyncCall(source, getNextRequestId(), args, maskProcessing);
	}
	else {
		if (!callServer) {
			callServer = true;
			sourceObj = source;
			ajaxArgs = args;
			setTimeout(ajaxCallBack, 000);
			sourceId = getNextRequestId();
		}
	}
}

function ajaxCallBack() {
	callServer = false;
	realAjaxAsyncCall(sourceObj, sourceId, ajaxArgs, true);
}

function realAjaxAsyncCall(source, id, args, maskProcessing, responseCallback, batchCall) {
	ProcessingStatus(true, maskProcessing);
	fireRichTextSave(false);

	if (!enableAjax) {
		nonAjaxCall(source, id, args, maskProcessing);
	}
	else {
		IncrementRequestCount(1);
		addLog("\nAsychronous Call : " + source + "  Method Name : " + args[0] + ", Request ID :" + id);

		var date = new Date();
		setSessionValue("__TR1__", date.getTime());

		//if (responseCallback) {
		if (g_customAjax == true)
			customAjaxCall(source, getEnterpriseName(), getSessionId(), args, getNextRequestId(), true, responseCallback, batchCall);
		else
			BizAPP.Web.UI.View.Control.HelperEx.AjaxCall(source, getEnterpriseName(), getSessionId(), args, id, responseCallback);
		//}
		//else {
		//    if (g_customAjax == true)
		//        customAjaxCall(source, getEnterpriseName(), getSessionId(), args, getNextRequestId(), true, null, batchCall);
		//    else
		//        BizAPP.Web.UI.View.Control.HelperEx.AjaxCall(source, getEnterpriseName(), getSessionId(), args, id, responseHandler);
		//}
	}
}

var g_enableRichTextSave = true;
function fireRichTextSave(sync) {
	if (g_isChatRefreshCall || !g_enableRichTextSave)
		return;

	setupReauthTimer();
	var rtes = $('.RichTextEx[chc]');

	if (rtes.length > 0) {
		g_enableRichTextSave = false;

		rtes.each(function () {
			if (this.className != 'RichTextEx')
				return;

			var rteVal, iframe;
			var ctrlId = $(this).attr('bizappid');
			if (!ctrlId) {
				ctrlId = $(this).attr('id');
				iframe = $('#' + ctrlId + ' > tbody > tr > td > iframe');
			}
			else
				iframe = $('[bizappid="' + ctrlId + '"] > tbody > tr > td > iframe');

			//TODO: check if dirty
			//check if IG rich text 
			if (iframe.attr('src').indexOf('igrt') > -1)
				return;
			rteVal = iframe.contents().find('#RichText_htmlEditorArea').children().val();
			var chc = $(this).attr('chc');

			var args = ['SetFieldValue', chc, rteVal];
			if (sync)
				ajaxSyncCall('OutlineEx', args);
			else
				ajaxAsyncCall('OutlineEx', args, false, false);
		});
		g_enableRichTextSave = true;
	}
}
//#endregion

//remove css from previous application
function cleanupAppCss() { cleanupCss('appcss') }
function cleanupCss(type) { $('head > link.' + type).remove(); }
function loadjscssfile(filename, filetype) {
	if (filetype == 'js') {
		//check if script is already referenced
		var refExists = $('script[src="' + filename + '"]').length > 0;

		if (!refExists) {
			//if filename is a external JavaScript file
			var fileref = document.createElement('script');
			fileref.setAttribute('type', 'text/javascript');
			fileref.setAttribute("src", filename);
		}
	}
	else {
		//if filename is an external CSS file
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);

		if (filetype !== 'css')
			fileref.setAttribute('class', filetype);
	}

	if (typeof fileref != 'undefined') {
		var tag = 'head';
		if (filetype == 'js')
			tag = 'body';

		var tagNode = document.getElementsByTagName(tag)[0];
		tagNode.appendChild(fileref);
	}
}
function insertScript(id, scriptPath) {
	loadjscssfile(scriptPath, 'js');
}
/*Utilities*/

//#region Help On View
function showHelpClick(CHC) {
	ajaxAsyncCall('ViewEx', ['HandleShowHelp', CHC], false, true);
}

function showHelpContent(title, helpContent) {
	helpContent = '<div class="viewHelp">' + helpContent + '</div>';
	showPopup(title, helpContent, null, null, true, false);
}
//#endregion

//#region Async Task Trigger
function updateProcessStatus(status) {
	if (status != '') {
		if (isIE())
			status = status.replace(/\r\n/g, '<br/>');

		var ele = document.createElement('div');
		$(ele).html(status);
		$('#AsyncStatus').append(ele);
		ele.scrollIntoView();
	}
}

function showProcessStatus(heading, status) {
	if (heading == '')
		heading = 'Task Name';
	if (status == '')
		status = 'Processing...';
	var msg = '<div style="width: 100%;text-align:center;">' +
		'<h3>' + heading + '</h3> ' +
		'<img id="AsyncProcessing" alt="Processing..." src="resources/images/jobprocessing.gif" style="margin:20px;">' +
		'<br/>' +
		'<pre class="asyncStatus" style="height:' + (document.body.clientHeight - 250) + 'px;" id="AsyncStatus" value="' + status + '"></pre>' +
		'</div>';

	showPopup('', msg, document.body.clientHeight - 100, document.body.clientWidth - 200, true, false);
}

var AsyncTaskStatus = false;
function callAsyncHandler(CHC) {
	if (AsyncTaskStatus == false) {
		setTimeout("callAsyncHandler( '" + CHC + "' );", 2000);

		var ajaxArgs = new Array();
		ajaxArgs[0] = "AsyncTaskCallBack";
		ajaxArgs[1] = CHC;
		ajaxAsyncCall('OutlineEx', ajaxArgs, false, false);
	}
	else {
		$('#AsyncStatus').html($('#AsyncStatus').html() + '\r\nComplete.');
		$('#AsyncProcessing').replaceWith('<h4>Complete</h4>');
		AsyncTaskStatus = true;
	}
}
//#endregion

//#region image Control
function imageClick(img) {
	var ifr = getAttributeValue(img, 'uploader');
	if (ifr != '' && ifr != undefined && ifr != NaN) {
		showPopup('Upload Image', ifr, 100, 350, true, true);
	}
}
function showRTE(chc) {
	var size = getWindowSize();
	ajaxAsyncCall('RichTextEx', ['ShowRTE', chc, Math.round(size.height * 0.7).toString(), Math.round(size.width * 0.8).toString()], true, true);
}

function getWindowSize() {
	var winW = 630, winH = 460;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}

	return size =
		{
			height: winH,
			width: winW
		};
}

function showConfigurationPopup(sTitle, sMessage, fHeight, fWidth, bModal, bShowEmptyTitle, bIsPopupCalledBySilverlight, sPopupCallBackElementId, sPopupCallBackElementDetails) {
	showPopup(sTitle, sMessage, fHeight, fWidth, bModal, bShowEmptyTitle);
	isPopupCalledBySilverlight = bIsPopupCalledBySilverlight;
	popupCallBackElementId = sPopupCallBackElementId;
	popupCallBackElementDetails = sPopupCallBackElementDetails;
}
var g_activeTINYPopup;
function showTinyBoxWithOptions(options) {
	BizAPP.UI.InlinePopup.CreateNew(options);
}
function showTinyBox(sMsg, fHeight, fWidth, sImage, bSearch, openjs) {
	var options = getTinyBoxOptions(sMsg, fHeight, fWidth, sImage, bSearch);
	options.stropenjs = openjs;
	showTinyBoxWithOptions(options);
}
function getTinyBoxOptions(sMsg, fHeight, fWidth, sImage, bSearch, hideClose) {
	var options;
	if (sImage)
		options = { image: $(newImg).attr('src') };
	else {
		options = { html: sMsg, height: 0, width: 0 };

		if (fHeight)
			options.height = fHeight;
		if (fWidth)
			options.width = fWidth;
	}

	options.hideClose = hideClose;
	options.bSearch = bSearch;
	return options;
}

function showPopup(sTitle, sMessage, fHeight, fWidth, bModal, bShowEmptyTitle, bSearch, openjs) {
	showTinyBox(sMessage, fHeight, fWidth, '', bSearch, openjs);
}
//#endregion

//#region watermark TextBox
function textBoxFocus(obj) {
	if (!obj) obj = this;
	var waterMarkText = $(obj).attr('placeholder');
	if (obj.value == waterMarkText) {
		obj.value = "";
		obj.className = "formtextbox";
	}
}
function textBoxBlur(obj) {
	if (!obj) obj = this;
	if (obj.value == "") {
		var waterMarkText = $(obj).attr('placeholder');
		obj.value = waterMarkText;
		obj.className = "formwatermarkedtextbox";
	}
	else {
		obj.className = "formtextbox";
	}
}
//#endregion

//#region Step Control
function displayPromoteTemplate(event, contextHashCode) {
	if (event == null)
		event = window.event;

	var ajaxArgs = new Array();

	ajaxArgs[0] = "DisplayPromoteTemplate";
	ajaxArgs[1] = contextHashCode;

	callServerPromote(event, ajaxArgs, "steppopupcontainer");
}

function handlePromote(event, contextHashCode) {
	if (event == null)
		event = window.event;

	callClosePopUp('steppopupcontainer');

	var ajaxArgs = new Array();

	ajaxArgs[0] = "ApplyPromoteStep";
	ajaxArgs[1] = contextHashCode;
	ajaxArgs[2] = '';

	var radioControl = document.getElementsByName("PromoteItemTemplate");

	if (radioControl) {
		for (var i = 0; i < radioControl.length; i++) {
			if (radioControl[i].checked) {
				ajaxArgs[2] = radioControl[i].id;
				break;
			}
		}
	}

	callOutline(ajaxArgs);
}

function callServerPromote(event, ajaxArgs, containerId) {
	var x;
	var y;

	if (event) {
		x = event.clientX;
		y = event.clientY;

		var position = getElementPosition(getSourceElement(event));
		if (position)
			y = position[1];

		if ((document.documentElement.offsetWidth - event.clientX) < 440)
			x = document.documentElement.offsetWidth - 440;

		if ((document.documentElement.offsetHeight - y) < 140)
			y = document.documentElement.offsetHeight - 140;
	}
	else {
		x = document.documentElement.offsetWidth / 2 - 195;
		y = document.documentElement.offsetHeight / 2 - 144;
	}

	var contextmenuContainer = getElementByBizAPPId(containerId, 'div');

	if (contextmenuContainer) {
		contextmenuContainer.style.display = "block";
		contextmenuContainer.style.left = x + "px";
		contextmenuContainer.style.top = y + "px";

		callOutline(ajaxArgs);
	}
}

function callShowObjectWithTag(cbObjTag, context) {
	var tag = cbObjTag.value;
	if (tag) {
		var ajaxArgs = new Array();

		ajaxArgs[0] = "ShowObjectWithTag";
		ajaxArgs[1] = context;
		ajaxArgs[2] = tag;
		callOutline(ajaxArgs);
	}
}
function callAddRemoveTag(btn, sroid, bAdd) {
	if (roid && roid != '' && roid != undefined && roid != NaN) {
		var ajaxArgs = new Array();
		ajaxArgs[0] = "AddRemoveTag";
		ajaxArgs[1] = roid;
		ajaxArgs[2] = bAdd.toString();
		ajaxArgs[3] = btn.previousSibling.value;

		callOutline(ajaxArgs);
	}
}
function toggleTag(tagDetailsId) {
	var tagDetails = document.getElementById(tagDetailsId);
	$(tagDetails).slideToggle("fast");
	if (tagDetails.style.display == 'block')
		tagDetails.style.display = 'table';
}
//#endregion

//#region Recent View Control
function callRecentViewContextMenu(event, viewControlName, runtimeObjectIdentifier, viewEnterpriseId, contextHashCode) {
	if (!isIE())
		return;

	if (event == null)
		event = window.event;

	var x; //left
	var y; //top

	if (event) {
		x = event.clientX;
		y = event.clientY;

		var position = getElementPosition(getSourceElement(event));
		if (position)
			y = position[1];

		if ((document.documentElement.offsetWidth - event.clientX) < 440)
			x = document.documentElement.offsetWidth - 440;

		if ((document.documentElement.offsetHeight - y) < 140)
			y = document.documentElement.offsetHeight - 140;
	}
	else {
		x = document.documentElement.offsetWidth / 2 - 195;
		y = document.documentElement.offsetHeight / 2 - 144;
	}

	var ajaxArgs = new Array();

	ajaxArgs[0] = "RecentViewContextMenu";
	ajaxArgs[1] = viewControlName;
	ajaxArgs[2] = runtimeObjectIdentifier;
	ajaxArgs[3] = viewEnterpriseId;
	ajaxArgs[4] = contextHashCode;
	ajaxArgs[5] = y + "px";
	ajaxArgs[6] = x + "px";

	callRecentViewCollection(ajaxArgs);
}

function callCopyRecentViewlinkToClipBoard(uri, viewControlName, runtimeObjectIdentifier, viewEnterpriseId, contextHashCode) {
	var copyuri = uri;
	var htmlargs = '?html.args=';
	var viewControlArgs = '&html.viewcontrolname=';
	var contextHashCodeArgs = '&html.chc=';

	if (runtimeObjectIdentifier && runtimeObjectIdentifier != undefined && runtimeObjectIdentifier != '')
		htmlargs += 'runtimeobjectid[NVS]' + runtimeObjectIdentifier;

	if (viewEnterpriseId && viewEnterpriseId != undefined && viewEnterpriseId != '') {
		if (htmlargs != '?html.args=')
			htmlargs += "[PMS]";

		htmlargs += 'runtimeviewenterpriseid[NVS]' + viewEnterpriseId;
	}

	if (viewControlName && viewControlName != undefined && viewControlName != '')
		viewControlArgs += viewControlName;

	if (contextHashCode && contextHashCode != undefined && contextHashCode != '')
		contextHashCodeArgs += contextHashCode;

	copyuri += htmlargs;

	if (viewControlArgs != '&html.viewcontrolname=')
		copyuri += viewControlArgs;

	if (contextHashCodeArgs != '&html.chc=')
		copyuri += contextHashCodeArgs;

	callClosePopUp('recentviewpopup');
}
//#endregion

//#region favourite bar control
function initFavDel(CHC) {
	$('.gRemovePQ[fid]').click(
		function (event) {
			if (!event)
				event = window.event;

			if (event) {
				var src = getSourceElement(event);
				if (src) {
					var fid = $(src).attr('fid');

					var ajaxArgs = new Array();

					ajaxArgs[0] = "RemoveFavourite";
					ajaxArgs[1] = CHC;
					ajaxArgs[2] = fid;
					ajaxAsyncCall("FavouriteBarControlEx", ajaxArgs, true, true);
				}
			}
		}
	);
}

function callShowFavDialog(event, favPage, outlineArgs) {
	setForceFocus('forcefocus', event);
	favPage = favPage + "?html.args=" + outlineArgs;

	showDialogWithOptions(favPage, 40 + "px", 180 + "px", "no", "no");
}
//#endregion

//#region collaboration control
var g_chatWindows = new Dictionary();
function openChatWindow(surl, sfeatures) {
	var childWindow = window.open(surl, '', sfeatures, '');
	g_chatWindows.Add(surl, childWindow);
}
function closeAllChatWindows() {
	var length = g_chatWindows.Keys.length;

	for (var i = 0; i < length; i++) {
		var key = g_chatWindows.Keys[i];
		g_chatWindows[key].close();
	}
}
function refreshCallBack(CHC) {
	setTimeout('refreshColl("' + CHC + '", true);', 30000);
}

var g_isChatRefreshCall = false;
function refreshColl(CHC, bReregister) {
    /*var ajaxArgs = ['Refresh', CHC, bReregister.toString()];

    g_isChatRefreshCall = true;
    ajaxAsyncCall("CollaborationEx", ajaxArgs, false, false);
    g_isChatRefreshCall = false;*/
}

//#region Desktop Alerts
var g_dkTitle, g_dkBody;
var g_dkHtmlNotification;
function RequestPermission(callback) {
	if (window.webkitNotifications)
		window.webkitNotifications.requestPermission(callback);
}
function showDesktopNotification(sTitle, sText) {
	g_dkTitle = sTitle;
	g_dkBody = sText;
	notification();
}
function notification() {
	if (!window.webkitNotifications)
		return;

	if (window.webkitNotifications.checkPermission() > 0)
		RequestPermission(notification);

	var icon = 'bizapp.ico';
	var title = g_dkTitle;
	var body = g_dkBody;

	var popup = window.webkitNotifications.createNotification(icon, title, body);
	popup.show();
	setTimeout(function () {
		popup.cancel();
	}, '15000');
}

function HTMLnotification() {
	if (!g_dkHtmlNotification)
		return;
	if (!window.webkitNotifications)
		return;

	if (window.webkitNotifications.checkPermission() > 0)
		RequestPermission(HTMLnotification);

	var popup = window.webkitNotifications.createHTMLNotification(g_dkHtmlNotification);
	popup.show();
	setTimeout(function () {
		popup.cancel();
	}, '15000');
}
//#endregion

function showContacts(CHC) {
	var args = ['ShowContacts', CHC];
	ajaxAsyncCall("CollaborationEx", args);
}
function updateConversation(str) {
	if (!str)
		return;

	var msgs = $('#messages');
	msgs.append(str);
	msgs[0].scrollTop = msgs[0].scrollHeight;
}
function updateParticipants(partsList) {
	document.title = partsList;
	var list = '';
	var parts = partsList.split(',');
	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];
		if (part) {
			if (i == 0)
				part = '<b>' + part + '</b>';
			list += '<div><span class="available">' + part + '</span></div>';
		}
	}
	$('#participants').html(list);
}
function refreshConversation(CHC, convId) {
	if (isFirefox())
		$('#messages').css('height', '225px');
	setTimeout('realRefreshConversation("' + CHC + '", "' + convId + '");', 5000);
}
function realRefreshConversation(CHC, convId) {
	var ajaxArgs = ['RefreshConversation', CHC, convId];
	result = ajaxSyncCall("CollaborationEx", ajaxArgs, false, false);

	refreshConversation(CHC, convId);
}
function startConv(CHC, ulids) {
	if (CHC && ulids) {
		var ajaxArgs = ['StartConversation', CHC, ulids];
		ajaxAsyncCall("CollaborationEx", ajaxArgs, true, true);
	}
}

function sendMsg(event) {
	if (!event)
		event = window.event;

	if (event.keyCode != 13)
		return;

	if (event) {
		var src = getSourceElement(event);
		realSendMsg(src);
	}
	return false;
}
function realSendMsg(src) {
	if (src && src.value) {
		var ajaxArgs = ['SendMessage', getQSParamByName('s'), getQSParamByName('c'), src.value];
		ajaxAsyncCall("CollaborationEx", ajaxArgs);
		src.value = '';
	}
}
function saveConv() {
	var cParam = getQSParamByName('c');

	if (cParam) {
		var msgs = $('#messages').html();
		if (msgs) {
			var ajaxArgs = ['SaveConversation', cParam, msgs];
			ajaxAsyncCall("CollaborationEx", ajaxArgs);
		}
	}
}
function addParticipants() {
	var ajaxArgs = ['AddParticipants', getQSParamByName('s'), getQSParamByName('c')];
	ajaxAsyncCall("CollaborationEx", ajaxArgs);
}
function addConvParts(CHC, convId, ulids) {
	if (CHC && convId && ulids) {
		var ajaxArgs = ['AddParticipantsToConversation', CHC, convId, ulids];
		ajaxAsyncCall("CollaborationEx", ajaxArgs, true, true);
	}
}
function updateConvParts(CHC, convId, ulids) {
	if (CHC && ulids) {
		var ajaxArgs = ['UpdateConversationParticipants', CHC, convId, ulids];
		ajaxAsyncCall("CollaborationEx", ajaxArgs, true, true);
	}
}
function getQSParamByName(name, url) {
	if (!url) url = window.location.href
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function confirmConversationExit() {
	var ajaxArgs = ['LeaveConversation', getQSParamByName('s'), getQSParamByName('c')];
	ajaxSyncCallAndNoResponseHandler("CollaborationEx", ajaxArgs);
	window.close();
}
function leaveConv() {
	var ajaxArgs = ['LeaveConversation', getQSParamByName('s'), getQSParamByName('c')];
	ajaxSyncCall("CollaborationEx", ajaxArgs);
}
function delContacts(sMsg, sCHC, sCN) {
	if (sCHC && sCN) {
		var ulids = getCheckBoxSelection(sCN);
		if (!ulids)
			return;

		if (!confirm(sMsg))
			return;

		ajaxSyncCall("CollaborationEx", ['RemoveContacts', sCHC, ulids]);
		callRefresh(sCHC, sCN);
	}
}
//#endregion

//#region ViewCustomization
function customizeView(ifr) {
	ifr = '<iframe src="viewcustomizer.aspx?chc=' + ifr + '" height="99%" width="99%"/>';
	showPopup('', ifr, document.body.clientHeight - 150, document.body.clientWidth - 300, true, false);
}
function removeCustView(CHC) {
	var custView;
	if (custView) {
		ajaxAsyncCall("ViewCustomizerEx", ['RemoveCustomizedView', CHC, src.getAttribute('cid')], true, true);
	}
}
function changeCustView(CHC, event) {
	var source = getSourceElement(event);
	g_currentView = source.value;
	ajaxAsyncCall("ViewCustomizerEx", ['ChangePersonalisedView', CHC, g_currentView], true, true);
}
//holds the current personalised view
var g_currentView;
function removeCustView(CHC, event) {
	if (g_currentView) {
		ajaxAsyncCall("ViewCustomizerEx", ['RemovePersonalisedView', CHC, g_currentView], true, true);
	}
}
//#endregion

function togglemAct(menu) {
	var menuActions = $(menu).next();
	if (menuActions.css('display') == 'none') {
		menuActions.css('display', 'inline-block');

		if (menuActions.width() < menu.clientWidth) {
			menuActions.width(menu.clientWidth);
			menuActions.children().width(menu.clientWidth);
		}

		if (isIE())
			menuActions.css('background', '#E3E3E3');
		var position = $(menu).position();
		menuActions.css('left', position.left);
		menuActions.css('top', position.top + $(menu).height() + 7);
	}
	else
		menuActions.css('display', 'none');
}
function callSaveChart(btn, CHC, id) {
	ajaxAsyncCall("MSChartEx", ['SaveChart', CHC, $(btn).parent().prev().children()[0].value, id], false, true);
}
function loadSelectedChart(ddl) {
	ajaxAsyncCall('MSChartEx', ['LoadChart', $(ddl).val()], false, true);
}
function evalFunctionIfKey(event, postHandler, bCtrl, bAlt, bShift) {
	var shouldEval = bCtrl || bAlt || bShift;
	if (shouldEval) {
		var spKeyStatus = specialKeyStatus(event);
		var ctrlPressed = spKeyStatus.ctrlPressed,
			altPressed = spKeyStatus.altPressed,
			shiftPressed = spKeyStatus.shiftPressed;

		if (bCtrl)
			shouldEval = ctrlPressed ? true : false;
		if (shouldEval && bAlt)
			shouldEval = altPressed ? true : false;
		if (shouldEval && bShift)
			shouldEval = shiftPressed ? true : false;

		if (shouldEval) {
			postHandler = postHandler.replace(/\[BSQ]/g, "'");
			eval(postHandler);
		}
	}
	return true;
}
function specialKeyStatus(event) {
	var ctrlPressed = 0, altPressed = 0, shiftPressed = 0;

	if (parseInt(navigator.appVersion) > 3) {
		if (navigator.appName == "Netscape" && parseInt(navigator.appVersion) == 4) {
			// NETSCAPE 4 CODE
			var mString = (event.modifiers + 32).toString(2).substring(3, 6);
			shiftPressed = (mString.charAt(0) == "1");
			ctrlPressed = (mString.charAt(1) == "1");
			altPressed = (mString.charAt(2) == "1");
		}
		else {
			// NEWER BROWSERS [CROSS-PLATFORM]
			shiftPressed = event.shiftKey;
			altPressed = event.altKey;
			ctrlPressed = event.ctrlKey;
		}
	}

	return { ctrlPressed: ctrlPressed, altPressed: altPressed, shiftPressed: shiftPressed };
}
function setSessionVariable(sKey, sValue, bIsGlobal, sConfirmationMsg) {
	ajaxSyncCall('HelperEx', ['SetSessionVariable', sKey, sValue, bIsGlobal.toString(), sConfirmationMsg]);
}
function fireSubmitEvent(event, sctrlName) {
	if (event && event.keyCode == '13') {
		var tb = getSourceElement(event);
		if (tb) {
			try {
				if (tb.onchange)
					tb.onchange();
				else if (tb.change)
					tb.change();
			}
			catch (Error) { }
		}

		setTimeout('fireLink("' + sctrlName + '");', 100);
	}
}
function fireLink(sctrlName) {
	var link = getElementByBizAPPId(sctrlName, 'DIV');
	if (link) {
		var link = $(link).children('.linkcontrol')[0];
		try {
			if (link.onclick)
				link.onclick();
			else if (link.click)
				link.click();
		}
		catch (Error) { }
	}
}
//function detectPopupBlocker() 
//{
//    var myTest = window.open("about:blank", "", "directories=no,height=10,width=10,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");
//    if (!myTest) 
//    {
//        alert("A popup blocker was detected. Please Make sure that popups are enabled.");
//    } else 
//    {
//        myTest.close();
//    }
//}
//window.onload = detectPopupBlocker;
function settabs(atab1) {
	$('#' + atab1).parent().children('LI').attr('class', 'inactive');
	$('#' + atab1).attr('class', 'active');
}
function showonlyones(thechose) {
	$('#' + thechose).parent().children([name = 'newbox']).hide();
	$('#' + thechose).show();
}

//#region Client Persist Framework
Persist = (function () {
	var VERSION = '0.1.0', P, B, esc, init, empty, ec; ec = (function () {
		var EPOCH = 'Thu, 01-Jan-1970 00:00:01 GMT', RATIO = 1000 * 60 * 60 * 24, KEYS = ['expires', 'path', 'domain'], esc = escape, un = unescape, doc = document, me; var get_now = function () { var r = new Date(); r.setTime(r.getTime()); return r; }
		var cookify = function (c_key, c_val) {
			var i, key, val, r = [], opt = (arguments.length > 2) ? arguments[2] : {}; r.push(esc(c_key) + '=' + esc(c_val)); for (i = 0; i < KEYS.length; i++) {
				key = KEYS[i]; if (val = opt[key])
					r.push(key + '=' + val);
			}
			if (opt.secure)
				r.push('secure'); return r.join('; ');
		}
		var alive = function () { var k = '__EC_TEST__', v = new Date(); v = v.toGMTString(); this.set(k, v); this.enabled = (this.remove(k) == v); return this.enabled; }
		me = {
			set: function (key, val) {
				var opt = (arguments.length > 2) ? arguments[2] : {}, now = get_now(), expire_at, cfg = {}; if (opt.expires) { opt.expires *= RATIO; cfg.expires = new Date(now.getTime() + opt.expires); cfg.expires = cfg.expires.toGMTString(); }
				var keys = ['path', 'domain', 'secure']; for (i = 0; i < keys.length; i++)
					if (opt[keys[i]])
						cfg[keys[i]] = opt[keys[i]]; var r = cookify(key, val, cfg); doc.cookie = r; return val;
			}, has: function (key) { key = esc(key); var c = doc.cookie, ofs = c.indexOf(key + '='), len = ofs + key.length + 1, sub = c.substring(0, key.length); return ((!ofs && key != sub) || ofs < 0) ? false : true; }, get: function (key) {
				key = esc(key); var c = doc.cookie, ofs = c.indexOf(key + '='), len = ofs + key.length + 1, sub = c.substring(0, key.length), end; if ((!ofs && key != sub) || ofs < 0)
					return null; end = c.indexOf(';', len); if (end < 0)
					end = c.length; return un(c.substring(len, end));
			}, remove: function (k) { var r = me.get(k), opt = { expires: EPOCH }; doc.cookie = cookify(k, '', opt); return r; }, keys: function () {
				var c = doc.cookie, ps = c.split('; '), i, p, r = []; for (i = 0; i < ps.length; i++) { p = ps[i].split('='); r.push(un(p[0])); }
				return r;
			}, all: function () {
				var c = doc.cookie, ps = c.split('; '), i, p, r = []; for (i = 0; i < ps.length; i++) { p = ps[i].split('='); r.push([un(p[0]), un(p[1])]); }
				return r;
			}, version: '0.2.1', enabled: false
		}; me.enabled = alive.call(me); return me;
	}()); empty = function () { }; esc = function (str) { return 'PS' + str.replace(/_/g, '__').replace(/ /g, '_s'); }; C = { search_order: ['gears', 'localstorage', 'whatwg_db', 'globalstorage', 'flash', 'ie', 'cookie'], name_re: /^[a-z][a-z0-9_ -]+$/i, methods: ['init', 'get', 'set', 'remove', 'load', 'save'], sql: { version: '1', create: "CREATE TABLE IF NOT EXISTS persist_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)", get: "SELECT v FROM persist_data WHERE k = ?", set: "INSERT INTO persist_data(k, v) VALUES (?, ?)", remove: "DELETE FROM persist_data WHERE k = ?" }, flash: { div_id: '_persist_flash_wrap', id: '_persist_flash', path: 'persist.swf', size: { w: 1, h: 1 }, args: { autostart: true } } }; B = {
		gears: {
			size: -1, test: function () { return (window.google && window.google.gears) ? true : false; }, methods: {
				transaction: function (fn) { var db = this.db; db.execute('BEGIN').close(); fn.call(this, db); db.execute('COMMIT').close(); }, init: function () { var db; db = this.db = google.gears.factory.create('beta.database'); db.open(esc(this.name)); db.execute(C.sql.create).close(); }, get: function (key, fn, scope) {
					var r, sql = C.sql.get; if (!fn)
						return; this.transaction(function (t) {
							r = t.execute(sql, [key]); if (r.isValidRow())
								fn.call(scope || this, true, r.field(0)); else
								fn.call(scope || this, false, null); r.close();
						});
				}, set: function (key, val, fn, scope) {
					var rm_sql = C.sql.remove, sql = C.sql.set, r; this.transaction(function (t) {
						t.execute(rm_sql, [key]).close(); t.execute(sql, [key, val]).close(); if (fn)
							fn.call(scope || this, true, val);
					});
				}, remove: function (key, fn, scope) {
					var get_sql = C.sql.get; sql = C.sql.remove, r, val; this.transaction(function (t) {
						if (fn) {
							r = t.execute(get_sql, [key]); if (r.isValidRow()) { val = r.field(0); t.execute(sql, [key]).close(); fn.call(scope || this, true, val); } else { fn.call(scope || this, false, null); }
							r.close();
						} else { t.execute(sql, [key]).close(); }
					});
				}
			}
		}, whatwg_db: {
			size: 200 * 1024, test: function () {
				var name = 'PersistJS Test', desc = 'Persistent database test.'; if (!window.openDatabase)
					return false; if (!window.openDatabase(name, C.sql.version, desc, B.whatwg_db.size))
					return false; return true;
			}, methods: {
				transaction: function (fn) {
					if (!this.db_created) { var sql = C.sql.create; this.db.transaction(function (t) { t.executeSql(sql, [], function () { this.db_created = true; }); }, empty); }
					this.db.transaction(fn);
				}, init: function () { var desc, size; desc = this.o.about || "Persistent storage for " + this.name; size = this.o.size || B.whatwg_db.size; this.db = openDatabase(this.name, C.sql.version, desc, size); }, get: function (key, fn, scope) {
					var sql = C.sql.get; if (!fn)
						return; scope = scope || this; this.transaction(function (t) {
							t.executeSql(sql, [key], function (t, r) {
								if (r.rows.length > 0)
									fn.call(scope, true, r.rows.item(0)['v']); else
									fn.call(scope, false, null);
							});
						});
				}, set: function (key, val, fn, scope) {
					var rm_sql = C.sql.remove, sql = C.sql.set; this.transaction(function (t) {
						t.executeSql(rm_sql, [key], function () {
							t.executeSql(sql, [key, val], function (t, r) {
								if (fn)
									fn.call(scope || this, true, val);
							});
						});
					}); return val;
				}, remove: function (key, fn, scope) { var get_sql = C.sql.get; sql = C.sql.remove; this.transaction(function (t) { if (fn) { t.executeSql(get_sql, [key], function (t, r) { if (r.rows.length > 0) { var val = r.rows.item(0)['v']; t.executeSql(sql, [key], function (t, r) { fn.call(scope || this, true, val); }); } else { fn.call(scope || this, false, null); } }); } else { t.executeSql(sql, [key]); } }); }
			}
		}, globalstorage: {
			size: 5 * 1024 * 1024, test: function () { return window.globalStorage ? true : false; }, methods: {
				key: function (key) { return esc(this.name) + esc(key); }, init: function () { this.store = globalStorage[this.o.domain]; }, get: function (key, fn, scope) {
					key = this.key(key); if (fn)
						fn.call(scope || this, true, this.store.getItem(key));
				}, set: function (key, val, fn, scope) {
					key = this.key(key); this.store.setItem(key, val); if (fn)
						fn.call(scope || this, true, val);
				}, remove: function (key, fn, scope) {
					var val; key = this.key(key); val = this.store[key]; this.store.removeItem(key); if (fn)
						fn.call(scope || this, (val !== null), val);
				}
			}
		}, localstorage: {
			size: -1, test: function () { return window.localStorage ? true : false; }, methods: {
				key: function (key) { return esc(this.name) + esc(key); }, init: function () { this.store = localStorage; }, get: function (key, fn, scope) {
					key = this.key(key); if (fn)
						fn.call(scope || this, true, this.store.getItem(key));
				}, set: function (key, val, fn, scope) {
					key = this.key(key); this.store.setItem(key, val); if (fn)
						fn.call(scope || this, true, val);
				}, remove: function (key, fn, scope) {
					var val; key = this.key(key); val = this.get(key); this.store.removeItem(key); if (fn)
						fn.call(scope || this, (val !== null), val);
				}
			}
		}, ie: {
			prefix: '_persist_data-', size: 64 * 1024, test: function () { return window.ActiveXObject ? true : false; }, make_userdata: function (id) { var el = document.createElement('div'); el.id = id; el.style.display = 'none'; el.addBehavior('#default#userData'); document.body.appendChild(el); return el; }, methods: {
				init: function () {
					var id = B.ie.prefix + esc(this.name); this.el = B.ie.make_userdata(id); if (this.o.defer)
						this.load();
				}, get: function (key, fn, scope) {
					var val; key = esc(key); if (!this.o.defer)
						this.load(); val = this.el.getAttribute(key); if (fn)
						fn.call(scope || this, val ? true : false, val);
				}, set: function (key, val, fn, scope) {
					key = esc(key); this.el.setAttribute(key, val); if (!this.o.defer)
						this.save(); if (fn)
						fn.call(scope || this, true, val);
				}, load: function () { this.el.load(esc(this.name)); }, save: function () { this.el.save(esc(this.name)); }
			}
		}, cookie: {
			delim: ':', size: 4000, test: function () { return P.Cookie.enabled ? true : false; }, methods: {
				key: function (key) { return this.name + B.cookie.delim + key; }, get: function (key, val, fn, scope) {
					key = this.key(key); val = ec.get(key); if (fn)
						fn.call(scope || this, val != null, val);
				}, set: function (key, val, fn, scope) {
					key = this.key(key); ec.set(key, val, this.o); if (fn)
						fn.call(scope || this, true, val);
				}, remove: function (key, val, fn, scope) {
					var val; key = this.key(key); val = ec.remove(key)
					if (fn)
						fn.call(scope || this, val != null, val);
				}
			}
		}, flash: {
			test: function () {
				if (!window.SWFObject || !deconcept || !deconcept.SWFObjectUtil)
					return false; var major = deconcept.SWFObjectUtil.getPlayerVersion().major; return (major >= 8) ? true : false;
			}, methods: {
				init: function () {
					if (!B.flash.el) {
						var o, key, el, cfg = C.flash; el = document.createElement('div'); el.id = cfg.div_id; document.body.appendChild(el); o = new SWFObject(this.o.swf_path || cfg.path, cfg.id, cfg.size.w, cfg.size.h, '8'); for (key in cfg.args)
							o.addVariable(key, cfg.args[key]); o.write(el); B.flash.el = document.getElementById(cfg.id);
					}
					this.el = B.flash.el;
				}, get: function (key, fn, scope) {
					var val; key = esc(key); val = this.el.get(this.name, key); if (fn)
						fn.call(scope || this, val !== null, val);
				}, set: function (key, val, fn, scope) {
					var old_val; key = esc(key); old_val = this.el.set(this.name, key, val); if (fn)
						fn.call(scope || this, true, val);
				}, remove: function (key, fn, scope) {
					var val; key = esc(key); val = this.el.remove(this.name, key); if (fn)
						fn.call(scope || this, true, val);
				}
			}
		}
	}; var init = function () {
		var i, l, b, key, fns = C.methods, keys = C.search_order; for (i = 0, l = fns.length; i < l; i++)
			P.Store.prototype[fns[i]] = empty; P.type = null; P.size = -1; for (i = 0, l = keys.length; !P.type && i < l; i++) {
				b = B[keys[i]]; if (b.test()) {
					P.type = keys[i]; P.size = b.size; for (key in b.methods)
						P.Store.prototype[key] = b.methods[key];
				}
			}
		P._init = true;
	}; P = {
		VERSION: VERSION, type: null, size: 0, add: function (o) { B[o.id] = o; C.search_order = [o.id].concat(C.search_order); init(); }, remove: function (id) {
			var ofs = C.search_order.indexOf(id); if (ofs < 0)
				return; C.search_order.splice(ofs, 1); delete B[id]; init();
		}, Cookie: ec, Store: function (name, o) {
			if (!C.name_re.exec(name))
				throw new Error("Invalid name"); if (!P.type)
				throw new Error("No suitable storage found"); o = o || {}; this.name = name; o.domain = o.domain || location.hostname || '192.168.2.151.localdomain'; this.o = o; o.expires = o.expires || 365 * 2; o.path = o.path || '/'; this.init();
		}
	}; init(); return P;
})();

function getOrCreateStore(storeName) {
	return new Persist.Store('BizAPP_' + storeName);
}
function persistValue(sstoreName, skey, svalue) {
	skey = skey.replace(/:/g, '');	//ie7
	var store = getOrCreateStore(sstoreName);
	store.set(skey, svalue);
}
function getPersistedValue(sstoreName, skey) {
	skey = skey.replace(/:/g, '');	//ie7
	var store = getOrCreateStore(sstoreName);
	var value;
	store.get(skey, function (ok, val) {
		if (ok)
			value = val;
	});
	return value;
}
function removePersistedValue(sstoreName, skey) {
	skey = skey.replace(/:/g, '');	//ie7
	var store = getOrCreateStore(sstoreName);
	store.remove(skey, function (ok, val) { });
}

Persist.Stack = {
	PushValue: function (storeName, value) {
		var pVal = getPersistedValue(storeName, "value");
		if (!pVal)
			pVal = [];
		else
			pVal = JSON.parse(pVal);

		pVal.push(value);

		persistValue(storeName, "value", JSON.stringify(pVal));
	},
	PopValue: function (storeName) {
		var pVal = getPersistedValue(storeName, "value");

		if (pVal) {
			pVal = JSON.parse(pVal);
			var retVal = pVal.pop();
			persistValue(storeName, "value", JSON.stringify(pVal));
			return retVal;
		}
	},
	PeekValue: function (storeName) {
		var pVal = getPersistedValue(storeName, "value");
		if (pVal) {
			pVal = JSON.parse(pVal);
			return pVal[pVal.length - 1];
		}
	},
	Clear: function (storeName) {
		removePersistedValue(storeName, "value");
	}
}
//#endregion

//#region GeoLoacation
var g_geoLocation = '';
function getGeoLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			processPosition,
			function (error) { logError("geolocation - something went wrong: ", error); },
			{
				timeout: (5 * 1000),
				maximumAge: (1000 * 60 * 15),
				enableHighAccuracy: true
			});
	}
}
function processPosition(position) {
	g_geoLocation = 'Latitude={0};Longitude={1}'.format(position.coords.latitude.toString(), position.coords.longitude.toString());
	addLog('GEOLOCATION (lat, long) -' + g_geoLocation);
}
//#endregion

var BizAPP = BizAPP || {};
BizAPP.Session = {
	SetTimeZone: function (currentTimeZone) {
		ajaxAsyncCall("HelperEx", ["SetCurrentTimeZone", currentTimeZone], false, true);
	},

	/*{"qid" : "q1", "sortcolumn" : "s1", "pageno" : 1, "pagesize" : 20, "sortorder" : 1, "filtertype" : 0, "filters" : { "f1" : "v1", "f2" : "v2" }        }*/
	GetQueryResults: function (options, callback) {
		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);
		var args = ['GetQueryResults', JSON.stringify(options)];
		realAjaxAsyncCall('HelperEx', getNextRequestId(), args, true,
			function (data, textStatus, jqXHR) {
				var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				if (response[1])
					var result = JSON.parse(response[1]);

				if (callback)
					callback(result);
			});
	},
	//BizAPP.Session.ExecuteQuery({queryEid:'EAppPoint1007a4', contexts:'', pageSize: 20, pageNo: 0, identifiersOnly: false, handleResponse:true})
	ExecuteQuery: function (options) {
		var result;

		if (!options.contexts) options.contexts = '';
		if (!options.pageSize || isNaN(options.pageSize)) options.pageSize = 20;
		if (!options.pageNo || isNaN(options.pageNo)) options.pageNo = 0;
		if (!options.identifiersOnly || isNaN(options.identifiersOnly)) options.identifiersOnly = false;

		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);
		var args = ['ExecuteQuery', options.queryEid, options.contexts, options.pageSize.toString(), options.pageNo.toString(), options.identifiersOnly.toString()];

		if (options.callback) {
			realAjaxAsyncCall('HelperEx', getNextRequestId(), args, true,
				function (data, textStatus, jqXHR) {
					var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
					if (response[1])
						var result = JSON.parse(response[1]);

					options.callback(result);
				});
		}
		else {
			var response = ajaxEntryCall('HelperEx', args, false, false);
			result = JSON.parse(response.value[1]);

			if (options.handleResponse)
				responseHandler(response);

			return result;
		}
	},
	//BizAPP.Session.EvaluateExpression({expression:'Session.CurrentUserResponsibilities', compute:true, htmlFriendly: false, contexts: '', excpAsResp: false})
	EvaluateExpression: function (options) {
		if (!options.expression)
			return options.expression;

		options = options || { expression: '', compute: false, htmlFriendly: false, contexts: '', callback: function (result) { return result; }, excpAsResp: false };

		if (!options.contexts) options.contexts = '';
		if (!options.compute) options.compute = false;
		if (!options.htmlFriendly) options.htmlFriendly = false;
		if (!options.excpAsResp) options.excpAsResp = false;

		if (options.expression.toLowerCase().indexOf('session.') == -1 &&
			options.expression.toLowerCase().indexOf('this.') == -1 &&
			options.expression.toLowerCase().indexOf('embedview:') == -1)
			g_readOnly = true;
		var args = ['EvaluateExpression', options.expression, options.compute.toString(), options.htmlFriendly.toString(), options.contexts, options.excpAsResp];

		if (options.sync)
			return ajaxSyncCallAndNoResponseHandler('HelperEx', args);
		else
			realAjaxAsyncCall('HelperEx', getNextRequestId(), args, false,
				function (data, textStatus, jqXHR) {
					var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
					if (response[1])
						var result = JSON.parse(response[1]);

					if (options.callback)
						options.callback(result, data);

					return result;
				});
	},
	//BizAPP.Session.InvokeStaticMethod({ type: 'SystemUnit.SystemModule.Attachment', method: 'Upload', args: [], passSession:'true/false', callback: function(){...} })
	InvokeStaticMethod: function (options) {
		g_callBacks.push(options.callback);
		ajaxAsyncCall('HelperEx', ['InvokeMethodOnBO', options.type, options.method, options.args, options.passSession]);
	},
	InvokeMapper: function (options) {
		throw 'not implemented.';
	},
	InvokeProcess: function (options) {
		throw 'not implemented.';
	},

	//session datetime formats
	__dateFormat: null,
	__datetimeFormat: null,

	__lastCallTime: null,
	__timeoutInterval: null,
	__alertPopup: null,
	AlertTimeout: function (interval) {
		if (!(isIE() && isIE() < 9)) {
			if (interval)
				BizAPP.Session.__timeoutInterval = interval;

			BizAPP.Session.__alertTimeout();
		}
	},
	__alertTimeout: function () {
		if (window.localStorage)
			BizAPP.Session.__lastCallTime = new Date(localStorage.getItem("BizAPP.Session.__lastCallTime"));

		if (BizAPP.Session.__timeoutInterval) {// confirm if check needs to be performed
			var now = new Date(),
				timeSinceLastCall = ((now - BizAPP.Session.__lastCallTime) / 1000) / 60;
			timeSinceLastCall = BizAPP.Session.__timeoutInterval - timeSinceLastCall;

			if (0 < timeSinceLastCall && timeSinceLastCall < 7) {
				if (!(BizAPP.UI.InlinePopup.getActivePopup(false) && $(BizAPP.UI.InlinePopup.getActivePopup(false).tinner()).find('.bza_timeout_alert').length))
					BizAPP.Session.ShowAlertTimeout(timeSinceLastCall * 60);
			}
			else {
				if (BizAPP.UI.InlinePopup.getActivePopup(false) && $(BizAPP.UI.InlinePopup.getActivePopup(false).tinner()).find('.bza_timeout_alert').length) {
					BizAPP.UI.InlinePopup.getActivePopup(false).hide();
				}
				else
					setTimeout(BizAPP.Session.__alertTimeout, 1000 * 60);
			}
		}
	},
	ShowAlertTimeout: function (timeLeft) {
		var options = {
			html: '<div class="bza_timeout_alert"><div class="text"><div style="line-height: 30px;"><span>Your session is about to expire!</span></div><div>You will be logged out in <span class="timeleft"></span><br/></div><div> Do you want to stay signed in?</div></div><button class="signin" onclick="g_callBacks.push(zoomout);ajaxAsyncCall(\'HelperEx\', [\'PingSession\'], false, true);">Yes, keep me signed in</button><button class="signout" onclick="ajaxAsyncCall(\'LogoutEx\', [\'LogoutWithNoDirtyTranscationsCheck\',\'true\'], true, true);">Sign out</button></div>',
			strclosejs: 'BizAPP.Session._counter.b.resolve();clearInterval(BizAPP.Session._counter.c);setTimeout(BizAPP.Session.__alertTimeout, 1000 * 10);BizAPP.Session.__alertPopup = null;',
			stropenjs: 'BizAPP.Session._counter=BizAPP.Session._countdown($(".bza_timeout_alert .timeleft"), 0,' + Math.round(timeLeft - 120) + ',signOutWithNoDirtyTransactionsCheck);',
			width: 300
		};
		BizAPP.Session.__alertPopup = BizAPP.UI.InlinePopup.CreateNew(options);
	},
	_counter: null,
	_countdown: function (element, initialMinutes, initialSeconds, completeHandler) {
		if (initialSeconds > 60) {
			initialMinutes += Math.floor(initialSeconds / 60);
			initialSeconds = initialSeconds % 60;
		}
		var dfd = $.Deferred(),
			minutes = initialMinutes,
			seconds = initialSeconds;
		var interval = setInterval(function () {
			if (seconds <= 0) {
				if (minutes <= 0) {
					dfd.resolve();
					clearInterval(interval);
					completeHandler();
					return;
				} else {
					minutes--;
					seconds = 60;
				}
				BizAPP.Session.__alertTimeout();
			}
			if (minutes > 0) {
				var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
			} else {
				var minute_text = '';
			}
			var second_text = seconds > 1 ? 'seconds' : 'second';
			element.text(minute_text + ' ' + seconds + ' ' + second_text);
			BizAPP.UI.InlinePopup._setTINYPosition(true);
			seconds--;
		}, 1000);
		return { a: dfd.promise(), b: dfd, c: interval };
	},
	_updateLastCallTime: function () {
		var date = BizAPP.Session.__lastCallTime = new Date();
		try {
			if (window.localStorage)
				localStorage.setItem("BizAPP.Session.__lastCallTime", date.toISOString());
		} catch (e) { }
	}
}

BizAPP.RuntimeObject = {
	//BizAPP.RuntimeObject.GetFieldValue({roid:'a:b:c', fieldName: 'Name', callback: function(r){}});
	GetFieldValue: function (options) {
		return BizAPP.Session.EvaluateExpression({ expression: '%' + options.fieldName + '%', contexts: options.roid, callback: options.callback });
	},
	//BizAPP.RuntimeObject.SetFieldValue({roid:'a:b:c', fieldName: 'Name', fieldValue: 'Test', addOrRemove:true/false/'', setMultiple:true/false/'', callback: function(){}});
	SetFieldValue: function (options) {
		options.sync = options.sync || false;
		if (!options.refreshView)
			options.refreshView = false;
		if (typeof (options.callback) != 'undefined')
			g_callBacks.push(options.callback);
		assignFieldValue(options.roid, options.fieldName, options.fieldValue, options.refreshView, options.addOrRemove, options.setMultiple, options.sync);
		//return this.getFieldValue(options);
	},
	ApplyStep: function (options) {
		applyStepOfType(options.roid, options.stepname, options.steptype);
	}
}

BizAPP.UI = {
	/*InitVue: function (callback) {
		$.cachedScript('https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.js').done(function () {
			$.cachedScript('https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.min.js').done(function () {
				$.cachedScript('https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.6/vue-router.min.js').done(function () {

					const routes = []
					const vueRouter = new VueRouter({ routes });

					const vueStore = new Vuex.Store({
						state: {
						},
						actions: {
							getData(store, data) {
								return new Promise((resolve, reject) => {
									if (store.state[data.key])
										if (data.id)
											resolve(store.state[data.key][data.id])
										else
											resolve(store.state[data.key])
									else
										resolve({})
								})
							},

							addData(context, q) {
								context.commit('_addData', q)
							}
						},
						mutations: {
							_addData(state, data) {
								Vue.set(state, data.key, data.data)
							}
						}
					})

					const app = new Vue({
						el: '#enterpriseshell',
						store: vueStore,
						router: vueRouter,
						template: '<div id="enterpriseshell" bizappid="enterpriseshell" runat="server" style="width: 100%; vertical-align: top;">\
						< div class= "processingmaskdiv processingimage" style="left: 0px; top: 0px; position: fixed; display: block;" ></div>\
						<router-view></router-view>\
					</div >'
					})

					function navigate(link) {
						vueRouter.push($(link).attr('bza-href'))
					}

					if (callback) callback();
				})
			})
		})
	},*/

	SerializeContext: function (context) {
		var ctxt = '';
		$.each(context, function (name, value) {
			if (ctxt)
				ctxt += '[PMS]';
			ctxt += name + '[NVS]' + value
		})

		return ctxt;
	},
	MobileSystemTrayView: 'ESystemb13d8',
	JobRequestSystemTrayView: 'ESystemb1688',

	controlMapping: {},
	controlDependency: {},
	controlSelector: {},
	impersonateField: '',
	widgetChartHeight: '',
	brandName: '',
	brandUrl: '',
	firstAccess: false,
	basePath: '',
	retryIndex: 0,
	appendBasePath: false,
	currentApplication: null,
	GetBasePath: function (path) {
		//Allow external urls.
		var regex = new RegExp('^(?:[a-z]+:)?//', 'i');
		if (regex.test(path)) {
			return path;
		}

		if (BizAPP.UI.appendBasePath)
			return BizAPP.UI.basePath.replace(/\/$/, '').concat('/', path);
		else if (location.href.toLowerCase().indexOf('system/diagnostics.aspx') > -1)
			return '../' + path;
		else
			return path;
	},
	PreResponseHandler: function (id) { },
	ApplyStepCallback: function (args) { },

	g_popupRead: false,
	g_initPopState: false,
	successHandler: function (content) {
		if (getQSParamByName('html.skipstate') == 'true') return;
		if (!BizAPP.UI.g_initPopState) {
			window.addEventListener('popstate', BizAPP.UI.NavigateBack, false);
			BizAPP.UI.g_initPopState = true;
		}
		$('a[href="#"]').attr('href', 'javascript:void(0)');
		if (location.href.indexOf('html.popup') != -1 && !BizAPP.UI.g_popupRead) {
			BizAPP.UI.g_popupRead = true;
			var popupParams = getQSParamByName('html.popup');
			BizAPP.UI.LoadView({
				inlinePopup: true,
				url: 'uiview.asmx?html.jar=true&html.insertjscss=false&html.vcn=CMW&html.svs=true&html.args=' + popupParams
			});
		}

		if (content.indexOf('ViewControlEx') > -1) {
			var $vparams = BizAPP.UI.GetViewUrl();
			var pageName = window.location.pathname.split('/').pop();
			var currentApp = JSON.parse(BizAPP.UI.currentApplication);
			var $views = pageName + "?html.app=" + (currentApp ? currentApp.bizappcurrentapplicationeid : "") + "&html.views=" + $vparams;

			if (pageName.toLowerCase().indexOf('enterpriseview.aspx') == -1) {
				var $vw = BizAPP.UI.GetViews()[0];
				$views += "&html.args=navigationcontrol.ignoreprocess[NVS]true[PMS]runtimeviewenterpriseid[NVS]" + $vw.view + "[PMS]runtimeobjectid[NVS]" + $vw.context + "";
			}

			if (history && history.pushState) {
				if (!history.state) {
					history.pushState({
						name: '',
						url: $vparams
					}, pageName, $views);
				} else if ($vparams == history.state.url) {
					//skip
				} else if ($vparams.indexOf(history.state.url) > -1) {
					history.replaceState({
						name: '',
						url: $vparams
					}, pageName, $views);
				} else if ($vparams != history.state.url) {
					history.pushState({
						name: '',
						url: $vparams
					}, pageName, $views);
				}
			}
		}
	},
	GetViews: function (options) {
		var views = [];
		var $list = options && options.control ? options.control.parents('.ViewControlEx[bizapp_eid]') : $('.ViewControlEx[bizapp_eid]');

		$.each($list, function () {
			var $v = $(this);
			addLog({ id: $(this).attr('bizapp_eid'), name: $(this).attr('bizapp_name'), vcn: $(this).attr('bizappid'), ele: this })
			if ($v.find('.viewlet').length == 0 || ($v.find('.ViewControlEx').length > 0 && $v.find('.viewlet').length <= $v.find('.ViewControlEx').find('.viewlet').length)) {
				addLog({ id: $(this).attr('bizapp_eid'), name: $(this).attr('bizapp_name'), vcn: $(this).attr('bizappid'), ele: this })
				var context = $v.attr('bizapp_context');

				if (context && context.indexOf('UID_RuntimeEnterprise') > 0)
					context = '';
				if (context)
					context = context.split(/\n/)[0];
				if (context)
					context = context.substring(0, context.lastIndexOf(':')) + ':-1';

				if (!context)
					context = '';

				var $id = $v.attr('bizappid');

				if ($id) {
					var index = -1;
					for (var i = 0; i < views.length; i++)
						index = views[i].id == $id ? i : index;

					if (index == -1)
						views.push({
							id: $id,
							context: context,
							view: $v.attr('bizapp_eid'),
							name: $v.attr('bizapp_name')
						});
					else {
						views[index].context = context;
						views[index].view = $v.attr('bizapp_eid');
					}
				}
			}
		});

		return views;
	},
	GetViewUrl: function (options) {
		var a = '';
		var $views = BizAPP.UI.GetViews(options);
		for (var i = 0; i < $views.length; i++) {
			var $v = $views[i];
			a += $v.id + ',' + $v.view + ',' + $v.context + ';'
		}

		return a;
	},
	NavigateBack: function (event) {
		if (BizAPP.UI.InlinePopup.getActivePopup(false)) {
			return;
		}
		var ids = '';
		var views = BizAPP.UI.GetViewUrl({});

		var hasDiff = false;
		var roid, view, id;

		if (event.state) {
			if (views.indexOf(event.state.url) > -1) {
			}
			else {
				var cvs = event.state.url.split(';');

				for (var i = 0; i < cvs.length; i++) {
					if (views.indexOf(cvs[i]) < 0 || hasDiff) {

						if (!ids) {
							var idss = cvs[i].split(',');
							id = idss[0]; view = idss[1]; roid = idss[2];
						}

						ids += cvs[i] + ';';
						hasDiff = true;
					}
				}
				console.log('navigating -' + ids);

				if (ids) {
					var ctrl = getControlToReplace($(getElementByBizAPPId(id)));
					PQube.View.LoadView({ readonly: false, shs: true, roid: roid, vieweid: view, target: id, control: ctrl, views: ids });
				}
			}
		}
		else {
			//causing strack overflow
			//window.location.href= window.location.href;
		}
	},

	_promptEditLoss: function () {
		var source1 = getSourceElement(window.event);

		if (source1 && source1 instanceof HTMLElement && $.contains(document.documentElement, source1)) {
			setForceFocus('forcefocus', window.event);
			var $src = $(source1);
			var params = $src.closest('[bza_viewparams]');
			if (params.length > 0)
				g_headers = JSON.stringify({ viewparams: JSON.parse(params.attr('bza_viewparams')) });

			if ($src.closest('.ui-datepicker').length > 0 ||
				$src.closest('.ui-autocomplete').length > 0 ||
				$src.closest('.tbox').length > 0 ||
				$src.closest('.bza-alrtCont').length > 0 ||
				$src.attr('onclick') && $src.attr('onclick').indexOf('callAssociate') != -1 ||
				$src.attr('onclick') && $src.attr('onclick').indexOf('custSearchCompleteHandler') != -1 ||
				$src.attr('onclick') && $src.attr('onclick').indexOf('exeSqSearchCallBack') != -1 ||
				$src.parent().length == 0)
				return false;

			var editableViews = [];
			var a = $.grep($('.form'), function (n, i) { var $n = $(n); return !($n.hasClass('bza-noteditable') || $n.hasClass('bza-virtual') || $n.parents('.tcontent').length) });
			$.each(a, function (i, n) {
				var view = $(n).closest('.ViewControlEx');
				if (view.length > 0 && $.inArray(view.get(0), editableViews) == -1) {
					if (editableViews.length > 0 && $.contains(editableViews[0], view.get(0))) //ignore child views if parent view is already in list
						return;
					editableViews.push(view.get(0));
				}
			});

			if (editableViews.length > 0) {
				var block = false;
				$.each(editableViews, function (i, n) {
					if (!$.contains(n, source1)) { block = true; return false; }
				});

				return block;
			}
		}
	},
	//for internal use
	_handleFailedResponse: function (jqXHR, textStatus, data) {
		ProcessingStatus(false, true);
		logError('Ajax Call failed.' + ' : status text :' + textStatus);
		logError('ready state : ' + jqXHR.readyState + 'status : ' + jqXHR.status + 'response : ' + jqXHR.responseText);

		if (jqXHR.readyState == 0 && jqXHR.status == 0 && !jqXHR.responseText) {
			//displayMessage('Server not reachable, please try refreshing the page after some time.', true);
			addLog('Server not reachable, please try refreshing the page after some time.', true);
		}

		if (this.callback)
			this.callback(data, textStatus, jqXHR);
		else if (this.context && this.context.callback)
			this.context.callback(data, textStatus, jqXHR);
	},
	//for internal use
	_handleSuccessResponse: function (data, textStatus, jqXHR, options) {
		data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR, options);
		options = options || {};
		options.callback = options.callback || this.callback;
		options.selector = options.selector || this.selector
		options.popup = options.popup || this.popup;
		BizAPP.UI.TransformUI($(data[1]), function ($html) {
			var transformedHtml = '';
			$html.each(function (i, v) {
				if (v && v.outerHTML)
					transformedHtml += v.outerHTML;

			});
			data[1] = transformedHtml;
			if (data[1]) {
				if (options && options.popup)
					showTinyBox(data[1]);
				else if (options.inlinePopup) { }
				else {
					if (!this.selector && (!options || !options.selector)) {
						this.selector = '#' + $(data[1]).attr('id').replace(/:/g, '\\:');
					}

					if (options && options.selector) {
						var outer = false;
						try {
							if ($(options.selector).attr('id') == $(data[1]).attr('id')) {
								$(options.selector).replaceWith(data[1])
								outer = true;
							}
						} catch (e) { addLog(e.Message, true) }
						if (!outer) {
							if (typeof options.selector == 'object' && options.selector.length > 0 && isIE() == 8)
								options.selector[0].innerHTML = data[1];
							else
								$(options.selector).html(data[1]);
						}
						BizAPP.UI.TabControl.ResponsiveInit();
						BizAPP.UI.InlinePopup._setTINYPosition(true);
					}
					else if (this.selector) {
						$(this.selector).html(data[1]);
						BizAPP.UI.TabControl.ResponsiveInit();
						BizAPP.UI.InlinePopup._setTINYPosition(true);
					}
				}
			}

			setTimeout(function () {
				if (options && options.callback)
					options.callback(data, textStatus, jqXHR);
				else if (this.callback)
					this.callback(data, textStatus, jqXHR);
				else if (this.context && this.context.callback)
					this.context.callback(data, textStatus, jqXHR);

				BizAPP.UI.successHandler(data[1]);
			}, 20);

			return data;
		});
	},
	_handleEventsAndExceptions: function (data, textStatus, jqXHR, options) {
		var startTime = (new Date()).getTime();

		if (textStatus != 'success' && textStatus != 'OK')
			BizAPP.UI._handleFailedResponse(jqXHR, textStatus, data);
		else {
			ProcessingStatus(false, true);
			if (!data.value)
				data = JSON.parse(data);
			else
				data = data.value;

			if (data[1].indexOf('[DS]') != -1) {
				var temp = '';

				$.each(data[1].split('[DS]'), function () {
					if (temp)
						temp += '[DS]';

					temp += this.toString().indexOf('[IDS]') != -1 ? this.split('[IDS]')[2] : this.toString();
				});

				data[1] = temp;
			}

			if (data[1].indexOf('[IDS]') != -1)
				data[1] = data[1].split('[IDS]')[2];

			data[1] = addWindowEvent(data[1]);

			displayExceptions(data[3], data[4]);
			if (options && (options.inlinePopup || options.menuPopupSelector)) { }
			else {

				setTimeout(function () { fireEvents(data[2]) }, 10);
			}
			processResponseTime(startTime, data[7], data[6], { value: data, json: JSON.stringify(data) });
			return data;
		}
	},
	//BizAPP.UI.LoadView({ url:'', selector: this/'#containerDiv', inlinePopup:true/false, showprocessing:true/false, menuPopupSelector:this/$('#referenceElement'), position:'bottom pright', callback: function(){} });
	LoadView: function (options) {
		if (BizAPP.UI._promptEditLoss()) {
			BizAPP.UI.InlinePopup.Confirm({
				message: "You have data that has not yet been saved. Do you still want to continue?",
				type: "Confirm",
				fnOkOnclick: function () {
					if (BizAPP.UI.InlinePopup.procVisible)
						ProcessingStatus(true, true);
					BizAPP.UI.LoadView1(options);
				},
				fnCancelCallback: function () { ProcessingStatus(false, true); }
			});
		}
		else
			BizAPP.UI.LoadView1(options);
	},
	LoadView1: function (options) {
		options.inlinePopup = options.inlinePopup || false;
		options.menuPopupSelector = options.menuPopupSelector || false;
		if (!options.url) {
			options.url = 'uiview.asmx?html.jar=true&html.args=';
			if (options.roid)
				options.url += 'runtimeobjectid[NVS]' + options.roid + '[PMS]'
			if (options.viewId)
				options.url += 'runtimeviewenterpriseid[NVS]' + options.viewId + '[PMS]'
			if (options.target)
				options.url += '&html.vcn=' + options.target;
		}

		if (!options.inlinePopup && !options.menuPopupSelector && !getQSParamByName('html.vcn', options.url))
			throw 'value cannot be null, html.vcn';

		if (options.showprocessing)
			ProcessingStatus(true, true);

		var successHandler;
		if (options.inlinePopup)
			successHandler = function (data, textStatus, jqXHR) {
				var callback = options.callback;
				options.callback = function (data, textStatus, jqXHR) {
					if (data[2]) {
						data[2] = data[2].replace(/["]/g, '\\"').replace(/\r?\n|\r/g, '');
						if (window.sessionStorage) {
							var key = getNextRequestId().toString();
							window.sessionStorage.setItem(key, data[2]);
							data[2] = key;
						}
					}
					BizAPP.UI.InlinePopup.CreateNew($.extend(options.inlinepopupoptions, {
						html: data[1],
						stropenjs: (options.inlinepopupoptions && options.inlinepopupoptions.stropenjs) ? options.inlinepopupoptions.stropenjs + ';' + 'fireEvents(\"' + data[2] + '\");' : 'fireEvents(\"' + data[2] + '\");'
					}));
					if (callback)
						callback();
				}
				data = BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			};
		else if (options.menuPopupSelector)
			successHandler = function (data, textStatus, jqXHR) {
				var callback = options.callback;
				options.callback = function (data, textStatus, jqXHR) {
					BizAPP.MenuPopup.Create({
						html: data[1], autodeleteonclose: options.autodeleteonclose, selector: $(options.menuPopupSelector), mode: 'open', position: options.position, callback: function () {
							if (event)
								event.stopPropagation();
							setTimeout(function () { fireEvents(data[2]) }, 10);
						}
					});

					if (callback)
						callback();
				}
				data = BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			};
		else
			successHandler = BizAPP.UI._handleSuccessResponse;

		options.url = options.url + '&html.popup={0}'.format((options.inlinePopup || options.menuPopupSelector).toString());
		var ajaxData = {
			contentType: 'application/json; charset=utf-8',
			url: options.url,
			dataType: 'text',
			success: successHandler,
			error: BizAPP.UI._handleFailedResponse,
			context: options,
			cache: false
		};

		ajaxData.beforeSend = function (xhr) {
			if (options.readonly == false)
				xhr.setRequestHeader('X-Bza-Type', 'read-write');

			var a = JSON.stringify(options, BizAPP.UI._JSONreplacer);
			if (BizAPP.UI.currentApplication) {
				if (!a)
					a = "{currentApplication: '" + BizAPP.UI.currentApplication + "'}";
				else {
					var a = JSON.parse(a);
					a["currentApplication"] = BizAPP.UI.currentApplication;
					a = JSON.stringify(a);
				}
			}
			xhr.setRequestHeader('Bza-Options', a);
		};
		$.ajax(ajaxData);
	},
	ExecuteReportInContext: function (options) {
		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);
		var htmlArgs = 'runtimeobjectid[NVS]' + options.context + '[PMS]navigationcontrol.ignoreprocess[NVS]true';

		realAjaxAsyncCall('ViewNavigationEx', getNextRequestId(), ['PreviewView', htmlArgs, options.vcn, 'true', '', 'false', '', options.report, '', 'false'], true,
			function (data, textStatus, jqXHR) {
				BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options)
			});
	},

	//BizAPP.UI.ExecuteLink({ viewdef:'EAppPoint12345', controlname: 'linkControl1', context: '[Identifier]', viewname: 'viewdef:viewControl1', selector: this/'#containerDiv', callback: null });
	ExecuteLink: function (options) {
		setForceFocus('forcefocus', window.event);
		options = $.extend({ viewdef: '', controlname: '', context: '', viewname: '', callback: null, processifvisible: '', formtype: '' }, options);
		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);

		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['ExecuteLink', options.viewdef, options.controlname, options.context, options.viewname, options.processifvisible, options.formtype], true,
			function (data, textStatus, jqXHR) {
				BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			});
	},
	//BizAPP.UI.LoadControl({ viewdef:'EAppPoint12345', controlname: 'viewDataGrid1', context: '[Identifier]', viewname: 'viewdef:viewControl1', selector: this/'#containerDiv', callback: function(){} });
	LoadControl: function (options) {
		options = options || { viewdef: '', controlname: '', context: '', viewname: '', selector: '' };
		if (!options.controlname)
			throw 'value cannot be null, controlname';
		if (!options.viewdef)
			throw 'value cannot be null, def';

		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);

		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['LoadControl', options.viewdef, options.controlname, options.context, options.viewname, options.formtype], true,
			function (data, textStatus, jqXHR) {
				BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			});
	},
	//BizAPP.UI.LoadControlUsingContext('...');
	LoadControlUsingContext: function (chc) {
		ajaxAsyncCall('HelperEx', ['RenderControlUsingContext', chc], false, false);
	},
	//BizAPP.UI.LoadWidget({ vieweid:'EAppPoint12345', context: '[Identifier]', vcn: 'viewdef:viewControl1', selector: this/'#containerDiv', callback: function(){} });
	LoadWidget: function (options) {
		options = options || { vieweid: '', controlname: '', context: '', vcn: '', selector: '', widget: '' };
		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);

		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['LoadWidget', options.vieweid, options.context, options.vcn, options.widget], true,
			function (data, textStatus, jqXHR) {
				BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			});
	},
	//BizAPP.UI.LoadGlobalWidget({ vieweid:'EAppPoint12345', context: '[Identifier]', viewname: 'viewdef:viewControl1', selector: this/'#containerDiv', callback: function(){} });
	LoadGlobalWidget: function (options) {
		options = options || { vieweid: '', context: '', vcn: '', selector: '' };
		g_headers = JSON.stringify(options, BizAPP.UI._JSONreplacer);

		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['LoadGlobalWidget', options.vieweid, options.context, options.vcn], true,
			function (data, textStatus, jqXHR) {
				BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options);
			});
	},
	_JSONreplacer: function (key, value) {
		if (key == "selector" || key == "callback" || key == "control")
			return undefined;
		else
			return value;
	},
	GetCharts: function (optionsArr) {
		args = [];
		$.each(optionsArr, function () {
			var options = this;
			args.push(['LoadChart', options.title, options.size, options.objecttypeid, options.fieldname, options.filterqueryid, options.seriesfield, options.aggregatefunction, options.roid, options.contextfieldname, options.color, options.seriestype, options.functionfield, options.isForm, options.formId, options.ctrlName, options.container]);
		});

		realAjaxAsyncCall('HelperEx', getNextRequestId(), args, true,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				if (optionsArr.callback)
					optionsArr.callback(data);
				else
					BizAPP.UI.InlinePopup.CreateNew({ html: data[1] });
			}, true);
	},

	//Loads the chart.
	//1 - Title
	//2 - Size
	//3 - ObjectTypeId
	//4 - FieldName
	//5 - FilterQueryId
	//6 - series fields
	//7 - aggregate function type
	//8 - roid
	//9 - context field name
	//10 - color
	//11 - series type
	//12 - function field
	GetChart: function (options) {
		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['LoadChart', options.title, options.size, options.objecttypeid, options.fieldname, options.filterqueryid, options.seriesfield, options.aggregatefunction, options.roid, options.contextfieldname, options.color, options.seriestype, options.functionfield, options.isForm, options.formId, options.ctrlName, options.container], true,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				if (options.callback)
					options.callback(data);
				else if (data[1])
					BizAPP.UI.InlinePopup.CreateNew({ html: data[1] });
				//BizAPP.UI.InlinePopup.CreateNew({ html: '<div id="chartGrid"></div>' });

			});
	},

	Prompt: function (msg, successHandler, failureHandler, event) {
		BizAPP.UI.InlinePopup.Confirm({
			message: msg.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"'),
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				eval(successHandler.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"'));
			},
			fnCancelOnclick: function () { eval(failureHandler.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"')); }
		});
	},
	ShowDebugDetails: function (ctrl) {
		var view = ctrl.parents('[bizapp_name]'),
			msg = '<table class="gridcontrol">';

		$.each(view, function (i, n1) {
			var n = $(n1);
			var details = {
				Type: n.attr('class').replace('fill', ''),
				ControlName: n.attr('bza-ctrlid'),
				Name: n.attr('bizapp_name'),
				Id: "",
				Context: n.attr('bizapp_context')
			};
			var drillType;
			if (details.Type.indexOf("ViewControlEx") != -1) {
				drillType = "Views";
				details.Type = 'View';
			}
			else if (details.Type.indexOf("form") != -1) {
				drillType = "Forms";
				details.Type = 'Form';
			}
			else
				drillType = "Queries";

			var eid = n.attr('bizapp_eid');
			details.Id = eid + '<br/><a style="color: blue; text-decoration: underline;cursor:pointer;" target="_blank" href="system/diagnostics.aspx?ctl=MetadataInfo&h=Metadata%20Information&Type=' + drillType + '&Id=' + eid + '">More...</a>'
			if (details.Context)
				details.Context += '<br/><a style="color: blue; text-decoration: underline;cursor:pointer;" target="_blank" href="system/diagnostics.aspx?ctl=QueryWorkbench&h=Query%20Workbench&contextid=' + details.Context.split('\n')[0] + '">More...</a>';
			if (i == 0) {
				msg += '<thead><tr>';
				$.each(details, function (a, b) {
					msg += '<th><b>{0}</b></th>'.format(a);
				});
				msg += '</tr></thead>';
			}
			msg += '<tr class="gr">';
			$.each(details, function (a, b) {
				msg += '<td>{0}</td>'.format(b || '-');
			});
			msg += '</tr>';
		});

		msg += '</table>';
		if (view.length > 0)
			BizAPP.UI.InlinePopup.CreateNew({ html: msg });
	},

	LoadThemes: function (options, i, handler) {
		if (!i) i = 0;
		var a = options[i++];
		var b = function () {
			if (i < options.length)
				BizAPP.UI.LoadThemes(options, i, handler);
			else
				eval(handler);
		};

		if (!a.Key) b();
		if (!$.getCss) jqExtns();
		$.getCss(a.Key, b);
	},
	_loadedScripts: [],
	LoadScript: function (options) {
		if (!options.version)
			options.version = 0;

		var url = options.eid + options.version + '/file.asmx?mode=scriptlibrary&id=' + options.eid;
		if (BizAPP.UI._loadedScripts.indexOf(url) != -1) {
			options.callback();
			return;
		}
		jqExtns();
		$.cachedScript(BizAPP.UI.GetBasePath(url + '&v=' + __bts_)).done(function (script, textStatus) {
			addLog(textStatus);
			BizAPP.UI._loadedScripts.push(url);
			options.callback();
			jqExtns();
		});
	},
	LoadTheme: function (options) {
		if (!options.version)
			options.version = 0;

		var url = options.eid + options.version + '/file.asmx?mode=theme&id=' + options.eid;
		jqExtns();
		$.getCss(BizAPP.UI.GetBasePath(url + '&v=' + __bts_), function () {
			options.callback();
		});
	},
	LoadDependentFile: function (filename, callback) {
		if ($.inArray(filename, dependentFiles) < 0) {
			switch (filename) {
				case "vue.js":
					$.cachedScript(BizAPP.UI.GetBasePath('https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.8/vue.min.js')).done(function (script, textStatus) {
						dependentFiles.push(filename);
						callback();
					});
					break;
				case "tablesaw.js":
					$.cachedScript(BizAPP.UI.GetBasePath('Resources/ResponsiveGrid/tablesaw.js?v=' + __bts_)).done(function (script, textStatus) {
						dependentFiles.push(filename);
						callback();
					});
					break;
				case "zeroclipboard.js":
					$.cachedScript(BizAPP.UI.GetBasePath('Resources/ZeroClipboard/ZeroClipboard.js?v=' + __bts_)).done(function (script, textStatus) {
						dependentFiles.push(filename);
						callback();
					});
					break;
				case "default.min.css":
					$.getCss(BizAPP.UI.GetBasePath('resources/texteditor/default.min.css?v=' + __bts_));
					dependentFiles.push(filename);
					break;
				case "font-awesome.min.css":
					$.getCss(BizAPP.UI.GetBasePath('Resources/TextEditor/font-awesome.min.css?v=' + __bts_));
					dependentFiles.push(filename);
					break;
				case "bootstrap.min.js":
					BizAPP.UI.TextEditor.LoadFontAwesomeCss();
					if (typeof $.fn.popover == 'function') {
						dependentFiles.push(filename);
						if (callback)
							callback();
					}
					else {
						$.getCss(BizAPP.UI.GetBasePath('resources/bootstrap/css/bootstrap.min.css?v=' + __bts_), function () { }, 'link[href*="appcss"]');
						$.getCss(BizAPP.UI.GetBasePath('resources/bootstrap/css/bootstrap-theme.min.css?v=' + __bts_), function () { }, 'link[href*="appcss"]');

						$.cachedScript(BizAPP.UI.GetBasePath('resources/bootstrap/js/bootstrap.min.js?v=' + __bts_)).done(function () {
							dependentFiles.push(filename);
							if (callback)
								callback();
						});
					}
					break;
			}
		}
		else {
			if (callback)
				callback();
		}
	},
	//BizAPP.UI.VisitTracker({viewid:'...', action: 'get/set', value: 'true\false'});
	VisitTracker: function (options) {
		if (!options.viewid) return;
		options = $.extend(options || {}, {
			action: 'set',
			value: 'true'
		});
		ajaxAsyncCall("ViewEx", ['VisitTracker', options.viewid, options.action, options.value.toString()], true, true);
	},
	ClearRecentViewItem: function (roid, viewid) {
		realAjaxAsyncCall('RecentEx', getNextRequestId(), ['ClearRecentViewItem', roid, viewid], false);
	},
	LoadInfragistics: function (callback) {
		if ($.ig) callback();
		else
			$.cachedScript(BizAPP.UI.GetBasePath('Resources/Javascripts/Infragistics/infragistics.core.js?v=' + __bts_)).done(function () {
				$.cachedScript(BizAPP.UI.GetBasePath('Resources/Javascripts/Infragistics/infragistics.lob.js?v=' + __bts_)).done(function () {
					$.getCss(BizAPP.UI.GetBasePath('Resources/CRM/Infragistics/themes/infragistics/infragistics.theme.css?v=' + __bts_));
					$.getCss(BizAPP.UI.GetBasePath('Resources/CRM/Infragistics/structure/infragistics.css?v=' + __bts_));
					callback();
				});
			});
	},
	LoadCollaboration: function (callback, isV3) {
		if (BizAPP.UI.retryIndex < 8) {
			if ($.connection && $.connection.hub.state) {
				if (BizAPP.UI.Collaboration) {
					BizAPP.UI.retryIndex = 0;
					callback();
				}
				else {
					var jsPath;
					if (isV3)
						jsPath = 'resources/javascripts/BizAPP.UI.Collaboration.V3.js?v=';
					else
						jsPath = 'resources/javascripts/BizAPP.UI.Collaboration.js?v=';

					$.cachedScript(BizAPP.UI.GetBasePath(jsPath + __bts_)).done(function (script, textStatus) {
						BizAPP.UI.retryIndex = 0;
						callback();
					});
				}
			}
			else setTimeout(function () {
				BizAPP.UI.retryIndex++;
				BizAPP.UI.LoadCollaboration(callback, isV3);
			}, 5000);
		}
		else {
			debug("Failed to initialize communication channel.", "debug");
		}
	},
	LoadViewCustomization: function (callback) {
		if (BizAPP.ViewCustomization) callback();
		else
			$.cachedScript(BizAPP.UI.GetBasePath('resources/javascripts/BizAPP.ViewCustomization.js?v=' + __bts_)).done(function (script, textStatus) {
				callback();
			});
	},
	TransformUI: function ($html, callback) {
		var controls = [];
		for (var ctrl in BizAPP.UI.controlSelector) {
			controls.push(ctrl);
		}
		BizAPP.UI.SubTransformUI(controls, $html, callback);
	},
	SubTransformUI: function (controls, $html, callback) {
		if (controls.length) {
			var key = controls.pop();
			var type = BizAPP.UI.controlDependency['type'];
			if (type) {
				var jsUrl;
				switch (type) {
					case "controlmap":
						if (BizAPP.UI.controlDependency[key])
							jsUrl = BizAPP.UI.controlDependency[key] + '?v=' + __bts_;

						if (jsUrl) {
							if ($html.find(BizAPP.UI.controlSelector[key]).length > 0 || $html.is(BizAPP.UI.controlSelector[key])) {
								$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function () {
									BizAPP.UI.InternalTransformUI($html, key, controls, callback);
								});
							}
							else
								BizAPP.UI.SubTransformUI(controls, $html, callback);
						}
						else
							BizAPP.UI.SubTransformUI(controls, $html, callback);
						break;
					case "controlset":
						$html = $('<div></div>').append($html)
						if ($html.find(BizAPP.UI.controlSelector[key]).length > 0 || $html.is(BizAPP.UI.controlSelector[key])) {
							BizAPP.UI.InternalTransformUI($html.children(), key, controls, callback);
						}
						else
							BizAPP.UI.SubTransformUI(controls, $html.children(), callback);
						break;
				}
			}
			else
				BizAPP.UI.SubTransformUI(controls, $html, callback);
		}
		else {
			if (callback)
				callback($html);
		}
	},
	InternalTransformUI: function ($html, key, controls, callback) {
		switch (key) {
			case "searchbutton":
			case "textbox":
				BizAPP.UI.Textbox.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "combobox":
				BizAPP.UI.ComboBox.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "datetimepicker":
				BizAPP.UI.DateTimePicker.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "stepcontrol":
				BizAPP.UI.StepControl.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "tabcontrol":
				BizAPP.UI.TabControl.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "checkbox":
				BizAPP.UI.CheckBox.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "radiobutton":
				BizAPP.UI.RadioButton.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
			case "attachmentcontrol":
				BizAPP.UI.AttachmentControl.Init($html, BizAPP.UI.controlSelector[key], function ($html) {
					BizAPP.UI.SubTransformUI(controls, $html, callback);
				});
				break;
		}
	},
	getValue: function (customid, className) {
		var element;
		if (className)
			className = className.split(' ')[0];

		switch (className) {
			case 'formtimecombobox':
				element = getElementByBizAPPId(customid, 'SELECT');
				return element.getAttribute('currentDate') + ' ' + element.value;
				break;
			case 'formdatetextbox':
				element = getElementByBizAPPId(customid, 'INPUT');
				var date = element.value,
					time = element.getAttribute('currentTime');

				try {
					if (BizAPP.Session.__dateFormat) {
						var jsFormat = ['dd-M-yy'];

						if (BizAPP.Session.__dateFormat == 'dd-MMM-yyyy'
							|| BizAPP.Session.__dateFormat == 'dd/MMM/yyyy'
							|| BizAPP.Session.__dateFormat == 'dd/mm/yyyy') {
							jsFormat[1] = 'dd/m/yy';
						}
						else if (BizAPP.Session.__dateFormat == 'MMM-dd-yyyy'
							|| BizAPP.Session.__dateFormat == 'MMM/dd/yyyy'
							|| BizAPP.Session.__dateFormat == 'mm/dd/yyyy') {
							jsFormat[1] = 'm/dd/yy';
						}

						if (jsFormat) {
							if (date.indexOf('/') != -1)
								date = $.datepicker.parseDate(jsFormat[1], '12/05/2013');

							date = $.datepicker.formatDate(jsFormat[0], date);
						}
					}
				}
				catch (Error) {
					logError('failed to parse date', Error);
					date = element.value;
				}

				if (time)
					return date + ' ' + time;
				else
					return date;
				break;
			case "formwordeditor":
				element = document.getElementById(customid);
				if (element)
					return element.WordContentBase64;
				return null;
				break;
			case "formcheckbox":
				element = getElementByBizAPPId(customid, "INPUT");
				return getCheckBoxValue(element);
				break;

			case "formrichtext":
				element = getElementByBizAPPId(customid, "INPUT");

				if (!element)
					return null;

				return getRichTextBoxValue(element, className);

				break;
			case "formrichtextmousemove":
				element = getElementByBizAPPId(customid, "INPUT");

				if (!element)
					return null;

				return getFreeTextBoxValue(element, className);

				break;

			case "forminrichtext":
				element = getElementByBizAPPId(customid, "INPUT");

				if (element)
					return element.innerHTML;

				break;
			case "formradio":
				element = getElementByBizAPPId(customid, "INPUT");

				var checkedValue = element.parentNode.getAttribute("checkedvalue");
				if (!checkedValue)
					checkedValue = element.getAttribute("checkedvalue");

				return checkedValue;
				break;

			case "formtextbox":
			case "formwatermarkedtextbox":
				element = getElementByBizAPPId(customid, "INPUT");
				return element.value;
				break;
			case "formmultilinetextbox":
				element = getElementByBizAPPId(customid, "TEXTAREA");
				return element.value;
				break;
			case "formcombocolorbox":
			case "formcombobox":
				element = getElementByBizAPPId(customid, "SELECT");
				return element.value;
				break;
			default:
				element = getElementByBizAPPId(customid, "DIV");
				return element.value;

			case "formlistbox":
				element = getElementByBizAPPId(customid, "SELECT");
				var selectedItems = "";
				for (i = 0; i < element.options.length; i++) {
					if (element.options[i].selected == true) {
						if (selectedItems == "")
							selectedItems = element.options[i].value;
						else
							selectedItems += ";" + element.options[i].value;
					}
				}
				return selectedItems;

		}
		return null;
	},

	LoadQueryDesigner: function (callback) {
		var jsUrl = 'Script.asmx?csn=bizapp&cn=query&v=' + __bts_;
		$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function () {
			callback();
		});
	},
	LoadWhiteboard: function (callback) {
		var jsUrl = 'Script.asmx?csn=bizapp&cn=whiteboard&v=' + __bts_;
		$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function () {
			callback();
		});
	},
	LoadQueryFieldNames: function (selector, systemQId, dynamicQId) {
		var qid = dynamicQId;
		if (!qid)
			qid = systemQId;
		if (qid) {
			realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetQueryFieldNames', qid], false,
				function (data, textStatus, jqXHR) {
					var availableFileds = JSON.parse(data.value[1])
					$(selector).each(function () {
						var $this = $(this);
						$this.autocomplete({
							source: availableFileds,
							minLength: 0,
							select: function (event, ui) {
								if (event.preventDefault)
									event.preventDefault();
								else
									event.returnValue = false;

								this.value = ui.item.value;
								$this.change();
							}
						});
						$this.focus(function () {
							$(this).autocomplete("search");
						});
					});
				});
		}
	},
	ProcessCallBacks: function (callBacks, response, textStatus, jqXHR) {
		if (typeof (callBacks) != 'undefined' && callBacks.length) {
			$.each(callBacks, function (index, value) {
				try {
					if (typeof (value) != 'undefined')
						value(response, textStatus, jqXHR);
				}
				catch (Error) { logError('call back failed.', Error); }
			});
		}
	},
	PrefetchResources: function () {
		var json = {
			'systemTray.js': 'Resources/SystemTray/systemTray.js',
			'json.js': 'Resources/Javascripts/JSON/JSON.js',
			'default.min.css': 'Resources/TextEditor/default.min.css',
			'jquery-ui.js': 'Resources/Javascripts/JQuery/jquery-ui.js',//'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js'
			'jquery-ui-timepicker-addon.js': 'Resources/Javascripts/jquery/jquery-ui-timepicker-addon.js',
			'jquery.signalR.js': 'resources/javascripts/jquery.signalR.js',
			'jquery.pnotify.min.js': 'resources/javascripts/jquery/jquery.pnotify.min.js',
			'boothubs.js': 'resources/javascripts/boothubs.js',
			'jquery.pnotify.default.css': 'resources/javascripts/jquery/jquery.pnotify.default.css',
			'jquery.pnotify.default.icons.css': 'resources/javascripts/jquery/jquery.pnotify.default.icons.css',
			'BizAPP.ViewCustomization.js': 'resources/javascripts/BizAPP.ViewCustomization.js',
			'jquery.reject.js': 'resources/jReject/jquery.reject.js',
			'tablesaw.js': 'Resources/ResponsiveGrid/tablesaw.js',
			'tablesaw.css': 'Resources/ResponsiveGrid/tablesaw.css',
			'zeroclipboard.js': 'Resources/ZeroClipboard/ZeroClipboard.js',
			'infragistics.core.js': 'Resources/Javascripts/Infragistics/infragistics.core.js',
			'infragistics.lob.js': 'Resources/Javascripts/Infragistics/infragistics.lob.js',
			'infragistics.theme.css': 'Resources/CRM/Infragistics/themes/infragistics/infragistics.theme.css',
			'infragistics.css': 'Resources/CRM/Infragistics/structure/infragistics.css',
			'infragistics.dv.js': 'Resources/Javascripts/Infragistics/infragistics.dv.js',
		}
		var $head = $('head');
		$.each(json, function (k, v) {
			var url;
			if (BizAPP.UI.IsAbsolutePath(v))
				url = v;
			else
				url = v + '?v={0}'.format(__bts_);
			$head.append('<link rel="prefetch" href="{0}"/>'.format(url));
		});
	},
	IsAbsolutePath: function (url) {
		var r = new RegExp('^(?:[a-z]+:)?//', 'i');
		return r.test(url);
	}
}

BizAPP.UI.Toast = {
	LoadLibrary: function (callback) {
		$.getCss('resources/javascripts/jquery/jquery.pnotify.default.css?v=' + __bts_);
		$.getCss('resources/javascripts/jquery/jquery.pnotify.default.icons.css?v=' + __bts_);

		$.cachedScript(BizAPP.UI.GetBasePath('resources/javascripts/jquery/jquery.pnotify.min.js?v=' + __bts_)).done(function (script, textStatus) {
			PNotify.prototype.options.styling = "brighttheme";
			PNotify.prototype.options.history = {
				maxonscreen: 5,
				history: false,
				menu: false,
				fixed: true,
				labels: { redisplay: "Redisplay", all: "All", last: "Last" }
			};
			callback(script, textStatus);
		});
	},
	Notify: function (o) {
		if (typeof PNotify == 'undefined') {
			BizAPP.UI.Toast.LoadLibrary(function (script, textStatus) {
				BizAPP.UI.Toast._notify(o);
			});
		} else
			BizAPP.UI.Toast._notify(o);
	},
	_notify: function (o) {
		if (!o.keepPrevious)
			PNotify.removeAll();
		addLog(JSON.stringify(o));
		if (!$('#chat-panel.bza-notifn').length) {
			$('body').append($('<div id="chat-panel" class="bza-notifn" style="height: auto; width: 314px; background: transparent; display: none;"><div class="bza-notifn-window" style="right: 10px; display: block;"></div></div>'));
			$('#chat-panel.bza-notifn .bza-notifn-window.chat-window').css('max-height', $(window).height().toString() + 'px').css('overflow', 'auto');
		}
		new PNotify(o);
		BizAPP.SystemTray.AddMenu({ id: 'bza-notifn-menu', html: '<i class="fa fa-bell" title="Events & Alerts"></i>', click: function () { $('#chat-panel.bza-notifn').toggle(); } });
		$('#chat-panel.bza-notifn').show();
		//BizAPP.Collaboration.ShowNotification('System Alert', a);
	}
}

BizAPP.UI.AdvList = {
	loadMore: function (chc, ctrlId) {
		var grid = getElementByBizAPPId(ctrlId, 'DIV');

		realAjaxAsyncCall('AdvancedListEx', getNextRequestId(), ['LoadMore', chc], true,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				var content = data[1].split('[DS]'),
					$grd = $(grid),
					lastRow = $grd.find('.al-lr').last();

				if ($(content[0]).is('div')) {//displaymode = none
					//if ($grd.find('[bizapp_eid]').find('table').length == 0)
					$grd.find('[bizapp_eid]').find('.select-filters-sort-bottom').parent().before($(content[0]).html());
					//else
					//    $grd.find('[bizapp_eid]').find('table').last().parent().before($(content[0]).html());
				}
				else if (lastRow.length == 0) {
					$grd.find('[bizapp_eid]').find('table').last().after(content[0]);
					$grd.find('[bizapp_eid]').find('table').height('auto');
				}
				else
					lastRow.closest('table').parent().closest('table').after(content[0]);

				$grd.find('.loadmore').replaceWith(content[1]);
			});
	},
	CreateSortUI: function (controlName) {
		var advList = $('[id$="' + controlName + '"]:eq(0)'),
			textContainer = advList.find('.filtertextcontainer');

		if (textContainer && !textContainer.find('.sort-decreasing-order').length) {
			var sortIcons = '<div class="bza-sort-ext"><span class="sort-increasing-order ui-icon ui-icon-carat-1-n" controlname="' + controlName + '" onclick="BizAPP.UI.AdvList.Sort(this, true);"></span>\
                             <span class="sort-decreasing-order ui-icon ui-icon-carat-1-s" controlname="' + controlName + '" onclick="BizAPP.UI.AdvList.Sort(this, false);"></span></div>';
			textContainer.append(addWindowEvent(sortIcons));

			//Resize td to fit the newly added icons
			textContainer.find('.filtertextbox').css('width', '89%');

			//Hover effect
			advList.find('[class*="creasing-order"]').hover(function () { $(this).css('transform', 'scale(1.5)'); }, function () { $(this).css('transform', 'scale(1)'); });
			$('body').on('hover', '[class*="creasing-order"][onclick="null"]', function () { $(this).css('border', 'initial'); });
		}
	},

	Sort: function (link, isIncreasing) {
		var ctrlName = $(link).attr('controlname');
		advList = $('[id$="' + $(link).attr('controlname') + '"][bza_data]:eq(0)'),
			sortBy = $(link).parent().prev().attr('columnname');

		if (isIncreasing) {
			//callSort
			$(link).next().attr('onclick', 'BizAPP.UI.AdvList.Sort(this, false)');
			console.log('Sorted by "' + sortBy + '" in increasing order');
		} else {
			//callSort
			$(link).prev().attr('onclick', 'BizAPP.UI.AdvList.Sort(this, true)');
			console.log('Sorted by "' + sortBy + '" in decreasing order');
		}

		//make it non clickable
		$(link).attr('onclick', 'null');

		var gridData = JSON.parse(advList.attr('bza_data'));
		gridData.sortod = isIncreasing;
		gridData.sortcn = sortBy;
		gridData.filters = getFilter(ctrlName);

		ajaxAsyncCall("AdvancedListEx", ['UpdateGridProps', JSON.stringify(gridData)], true, true);
	},
	Render: function (options) {
		var content = BizAPP.UI.AdvList._render(options.template, options.data);
		if (!content) content = options.ert;
		$(getElementByBizAPPId(options.ctrlid, 'DIV')).find('.bza_al_dc').first().append(content);
	},
	_render: function (template, data) {
		var content = '';
		var _temp = typeof data == 'string' ? JSON.parse(data) : data;
		$.each(_temp, function (i, n) {
			content += template.replace(/\#([\w\.\s]*)\#/g, function (str, key) {
				var keys = key.split("."), v = n[keys.shift()];
				for (i = 0, l = keys.length; i < l; i++)
					v = v[i];
				return (typeof v !== "undefined" && v !== null) ? v : "";
			}).replace(/{{([\w\.\s]*)}}/g, function (str, key) {
				var keys = key.split("."), v = n[keys.shift()];
				for (i = 0, l = keys.length; i < l; i++)
					v = v[i];
				return (typeof v !== "undefined" && v !== null) ? v : "";
			});
		});

		return content;
	}
}

BizAPP.UI.InlinePopup = {
	ActivePopupStack: [],
	_template: '',
	_excpList: [],
	_alertHTML: '<div class="tmask" style="opacity: 0.7; display: block;"></div>\
                        <div class="bza-alrtCont" style="text-align:left;display:none;">\
                        <div class="bza-alrtTitle"><span class="ui-icon ui-icon-alert" style="display: inline-block;vertical-align:bottom;float:left;"></span><span style="float:left;">Error</span><div id="next_prev" style="display:inline!important;font-size:11px;"><span class="next" title="Next" style="float:right;cursor:pointer;padding-left:2px" onclick="">></span><span class="prev" title="Prev" style="float:right;cursor:pointer;" onclick=""><  <span id="status"></span></span></div></div>\
                        <div class="bza-alrtBody">\
                        <div class="bza-alrtContent" exception="0" style="max-height:300px;overflow:auto;">\
                        <pre style="display:block;overflow:auto;"></pre></div>\
                        <div class="bza-alrtFooter">\
                        <div class="right" onclick="$(this).closest(\'.bza-alrtCont\').prev().remove();$(this).closest(\'.bza-alrtCont\').remove();return cancelBubble(event);" style="height:27px;width:auto;background-color:#F0F0F0!important">\
                        <div class="bza-alrtDefaultBtn"><div></div></div>\
                        <div class="bza-alrtAddnBtn" onclick="zoomout();"><div></div></div></div>\
                        <div id="bza_td" class="bza-alrtAddnBtn" title="Technical Details" style="float: left;" onclick="$(\'.bza-alrtContent .err-tech\').toggle(\'Fade\')">\
                        <div style="font-weight: normal"><i class="fa fa-ellipsis-h"></i></div></div>&nbsp;\
						<div id="bza_cb" class="bza-alrtAddnBtn bza-cb" title="Copy" data-clipboard-target="" data-clipboard-text="" style="float: left;">\
                        <div style="font-weight: normal"><i class="fa fa-clipboard"></i></div></div><span class="bza-alrtMsg"></span></div></div></div><style>.err-tech{display:none; padding-top: 1rem; font-size: .8rem;}</style>',
	Alert: function (options) {
		options.addnInfo = options.addnInfo || '';
		if ($('.bza-alrtCont').length == 0) {
			BizAPP.UI.InlinePopup._excpList = [];
			$('body').append(BizAPP.UI.InlinePopup._alertHTML);
			var el = $('.bza-alrtCont');
			if (!options.type)
				options.type = 'Error';
			el.addClass('bza-alrtCont-' + options.type.toLowerCase());
			el.find('.bza-alrtTitle span')[1].innerHTML = options.type;

			el.prev().css({
				width: $(document).width(),
				height: $(document).height()
			});

			if (options.title) {
				$('.bza-alrtContent').prepend(options.title);
			}
			if (options.header) {
				el.find('.bza-alrtTitle span')[1].innerHTML = options.header;
			}
			if (options.errorMessage) {
				$('.bza-alrtContent pre').append(options.errorMessage + "\r\n" + options.addnInfo);
				BizAPP.UI.InlinePopup._excpList.push(options.errorMessage + "\r\n" + options.addnInfo);
			}
			if (!options.btnOk) {
				$('.bza-alrtDefaultBtn').css('display', 'none');
			} else {
				$('.bza-alrtDefaultBtn div').append(options.txtOk);
				if (options.txtOkOnclick)
					$('.bza-alrtDefaultBtn div').attr('onclick', options.txtOkOnclick);
				else if (options.fnOkOnclick)
					$('.bza-alrtDefaultBtn div').on('click', options.fnOkOnclick);
			}
			if (!options.btnCancel) {
				$($('.bza-alrtAddnBtn')[0]).css('display', 'none');
			} else {
				$($('.bza-alrtAddnBtn div')[0]).append(options.txtCancel);
				if (options.txtCancelOnclick)
					$($('.bza-alrtAddnBtn div')[0]).attr('onclick', options.txtCancelOnclick);
				else if (options.fnCancelOnclick)
					$($('.bza-alrtAddnBtn div')[0]).on('click', options.fnCancelOnclick);
			}
			if (options.hideAddnBtns)
				$('.bza-alrtAddnBtn').hide();

			setTimeout(function () {
				el.css({
					position: 'fixed',
					left: ($(window).width() - el.outerWidth()) / 2,
					display: 'block',
					top: '30px'
				});
			}, 1000);
		} else {
			BizAPP.UI.InlinePopup._excpList.push(options.errorMessage);
		}

		if (BizAPP.UI.InlinePopup._excpList.length == 1)
			$('#next_prev').hide();
		else {
			$('#next_prev #status').html("1/" + BizAPP.UI.InlinePopup._excpList.length).show();//Optimize it

			// Next
			$('#next_prev .next').unbind('click').click(function () {
				var exception = $('.bza-alrtContent');
				var current = exception.attr('exception');
				var len = BizAPP.UI.InlinePopup._excpList.length;
				if (parseInt(current) < len - 1) {
					$('.bza-alrtContent pre').html(BizAPP.UI.InlinePopup._excpList[parseInt(current) + 1]);
					exception.attr('exception', parseInt(current) + 1);
					var status = parseInt(current) + 1 + 1;
					$('#next_prev #status').html(status + "/" + len);
				}
			});

			// Prev
			$('#next_prev .prev').unbind('click').click(function () {
				var exception = $('.bza-alrtContent');
				var current = exception.attr('exception');
				if (parseInt(current) > 0) {
					$('.bza-alrtContent pre').html(BizAPP.UI.InlinePopup._excpList[parseInt(current) - 1]);
					exception.attr('exception', parseInt(current) - 1);
					var status = parseInt(current);
					$('#next_prev #status').html(status + "/" + BizAPP.UI.InlinePopup._excpList.length);
				}
			});
			$('#next_prev').show();
		}
		jqExtns();
		if (!options.hideTechnicalDetails)
			BizAPP.UI.ClipBoard.Init($('#bza_cb'), $('#err_tech'));
		else
			$('#bza_td, #bza_cb').hide();
	},
	procVisible: false,
	//BizAPP.UI.InlinePopup.Confirm({ message:"Do you want to continue ? ", type:"Confirm", okCallback: "alert('OK clicked!');", cancelCallback: "alert('Cancel clicked!');" });
	Confirm: function (options) {
		BizAPP.UI.InlinePopup.procVisible = $('div#Processing:visible').length > 0;
		if (BizAPP.UI.InlinePopup.procVisible)
			ProcessingStatus(false, true);
		if (!options.type)
			options.type = 'Confirm';

		var okOnClick = options.okCallback;
		var cancelOnClick = options.cancelCallback;

		BizAPP.UI.InlinePopup.Alert({
			title: '', errorMessage: options.message, type: options.type, hideTechnicalDetails: true, btnOk: true, txtOk: 'OK',
			txtOkOnclick: okOnClick, btnCancel: true, txtCancel: 'Cancel', txtCancelOnclick: cancelOnClick,
			fnOkOnclick: options.fnOkOnclick, fnCancelOnclick: options.fnCancelOnclick
		});
	},
	getActivePopup: function (remove) {
		if (BizAPP.UI.InlinePopup.ActivePopupStack.length == 0)
			return g_activeTINYPopup;
		else if (remove)
			return BizAPP.UI.InlinePopup.ActivePopupStack.pop();
		else
			return BizAPP.UI.InlinePopup.ActivePopupStack[BizAPP.UI.InlinePopup.ActivePopupStack.length - 1];
	},
	CreateNew: function (options) {
		if (!options.height)
			options.height = 0;
		if (!options.width)
			options.width = 0;
		if (options.html)
			options.html = options.html.replace(/\[BSQ]/g, "'").replace(/\[BDQ]/g, '"').replace(/\[BSRQ]/g, '\r').replace(/\[BSNQ]/g, '\n').replace(/\[BSTQ]/g, '\t');
		BizAPP.UI.TransformUI($(options.html), function ($html) {
			var transformedHtml = '';
			$html.each(function (i, v) {
				if (v && v.outerHTML)
					transformedHtml += v.outerHTML;
			});
			options.html = transformedHtml;
			if (options.iframe && options.iframe.toLowerCase().indexOf('uploadpage.aspx') == -1) {
				if (!options.height)
					options.height = window.innerHeight - 100;
				if (!options.width)
					options.width = window.innerWidth - 200;
			}
			//options.draggable = (typeof options.draggable !== 'undefined') ? options.draggable : true;

			options.closejs = function () {
				if (options.strclosejs)
					execute(options.strclosejs);

				options.instance.remove();
				delete options.instance;

				BizAPP.UI.InlinePopup.getActivePopup(true);
				var ap = BizAPP.UI.InlinePopup.getActivePopup(false);
				if (ap) $(ap.tinner()).closest('.tbox').toggle();
				BizAPP.UI.InlinePopup._setTINYPosition();
			};

			options.openjs = function () {
				BizAPP.UI.InlinePopup.ActivePopupStack.push(a);

				if (options.stropenjs)
					execute(options.stropenjs);

				BizAPP.UI.TabControl.ResponsiveInit();
				BizAPP.UI.InlinePopup._setTINYPosition();

				//if (options.draggable)
				//	$(a.tinner()).closest('.tbox').draggable({
				//		handle: $(a.tinner()).find('.pqube_header,.searchcaptionrow')
				//	});
			};


			var ap = BizAPP.UI.InlinePopup.getActivePopup(false);
			if (ap) $(ap.tinner()).closest('.tbox').toggle();

			var a = TINYBOX();
			options.instance = a;
			a.show(options);
			return a;
		});
	},
	_setTINYPosition: function (autosize) {
		var activePopup = BizAPP.UI.InlinePopup.getActivePopup(false);
		if (!activePopup)
			return;

		var tinner = $(activePopup.tinner()),
			maxWidth = null,
			maxHeight = null,
			isDimSpecified = tinner.find('[popupwidth]').length > 0,
			tcontent = $(tinner).find('.tcontent');

		var isHScroll = false,
			isVScroll = false,
			allElement = $.grep(tcontent.find('*:visible'), function (a) {
				return $(a).closest('div.grid[bizapp_eid]').length == 0;
			});
		$.each(allElement, function () {
			if (!isHScroll && (this && $(this).css('overflow') != 'visible' && this.scrollWidth > $(this).innerWidth())) {
				isHScroll = true;
			}
			if (!isVScroll && (this && $(this).css('overflow') != 'visible' && this.scrollHeight > $(this).innerHeight())) {
				isVScroll = true;
			}
		});

		allElement = $(allElement);
		tinner.find('[popupwidth]').length > 0 ? maxWidth = tinner.find('[popupwidth]').attr('popupwidth') : maxWidth = Math.max.apply(null, allElement.map(function () {
			var w = $(this).width();

			if (isHScroll && this != tcontent.children()) {
				var parents = $(this).parentsUntil(tcontent);
				$.each(parents, function () {
					if (this && $(this).css('overflow') != 'visible' && this.scrollWidth > $(this).innerWidth()) {
						w = 0;
						return false;
					}
				});
			}
			return w
		}).get());

		tinner.find('[popupheight]').length > 0 ? maxHeight = tinner.find('[popupheight]').attr('popupheight') : maxHeight = Math.max.apply(null, allElement.map(function () {
			var h = $(this).outerHeight(true);

			if (isVScroll && this != tcontent.children()) {
				var parents = $(this).parentsUntil(tcontent);
				$.each(parents, function () {
					if (this && $(this).css('overflow') != 'visible' && this.scrollHeight > $(this).innerHeight()) {
						h = 0;
						return false;
					}
				});
			}
			return h
		}).get());

		var resize = false;
		var useActual = tinner.find('[bza-ctrlid="SearchControl"]').length > 0;
		var isSearchCaption = tinner.find('.searchcaptionrow').length > 0;

		if (isDimSpecified) {
			maxWidth = parseInt(maxWidth),
				maxHeight = parseInt(maxHeight);
			tinner.height(maxHeight);
			tinner.width(maxWidth);
			resize = true;
		} else {
			//if (tinner.height() < maxHeight) {
			useActual = isSearchCaption ? false : useActual;
			tinner.height(useActual ? maxHeight : 'auto');
			resize = true;
			//}
			//if (tinner.width() < maxWidth) {
			tinner.width(maxWidth);
			resize = true;
			//}
		}

		if (tinner.innerHeight() > (window.innerHeight - 40)
			|| tinner.innerHeight() > (document.documentElement.clientHeight - 40)
			|| tinner.innerHeight() > (document.body.clientHeight - 40)) {
			tinner.parent('.tbox').css('position', 'absolute');
			resize = true;
		}

		if (tinner.innerWidth() > (window.innerWidth - 40)
			|| tinner.innerWidth() > (document.documentElement.clientWidth - 40)
			|| tinner.innerWidth() > (document.body.clientWidth - 40)) {
			tinner.parent('.tbox').css('position', 'absolute');
			resize = true;
		}

		if (resize) {
			activePopup.resize();
		}
	},
	DisableAnimate: function () {
		var _isIE = isIE();
		return (_isIE > 0 && _isIE < 8);
	},
	GetMarkupWithTemplate: function (options) {
		if (!BizAPP.UI.InlinePopup._template) {
			BizAPP.UI.InlinePopup._template = '<style>.pqube_popup { min-width:500px;}\
	        .pqube_header {margin-bottom: 5px;padding: 10px;background: #123F76;color: white;}\
            .pqube_header_title {max-width:800px; text-overflow: ellipsis; overflow: hidden; white-space:nowrap; }\
            .pqube_popupbody { max-height:400px;overflow:auto; }\
            .stepcontainer { border-top:solid 2px black;margin:5px;padding-top:5px; }\
            .stepcenternormal{ padding:5px!important;margin:5px!important; }\
            .tinner { padding:0 }\
            .tclose { display:none }\
            </style><div class="pqube_popup"><table class="fill"><tr><td><div class="pqube_header"><div class="pqube_header_title"><!--headline--></div></div></td></tr><tr><td><div class="pqube_popupbody"><!--body--></div></td></tr><tr><td><div class="stepcontainer"><div class="left-footer" style="float:left"><!--leftlinks--></div><div class="right-footer" style="float:right"><table><tr><td><!--steps--></td><td><!--close--></td></tr></table></div></div></td></tr></table></div>'
		}

		options = $.extend({ headline: '', body: '', steps: '' }, options);
		var $template = $(BizAPP.UI.InlinePopup._template);

		//headline
		var headlineNode = BizAPP.UI.Control._getCommentNodes($template).filter(function () { return this.nodeValue == 'headline' });
		if (headlineNode.length)
			$template.find(headlineNode[0]).replaceWith($(options.headline));

		//body
		var bodyNode = BizAPP.UI.Control._getCommentNodes($template).filter(function () { return this.nodeValue == 'body' });
		if (bodyNode.length)
			$template.find(bodyNode[0]).replaceWith($(options.body));

		//steps
		var stepsNode = BizAPP.UI.Control._getCommentNodes($template).filter(function () { return this.nodeValue == 'steps' });
		if (stepsNode.length)
			$template.find(stepsNode[0]).replaceWith($(options.steps));

		var markup = '';
		$template.each(function (i, v) {
			if (v && v.outerHTML)
				markup += v.outerHTML;
		});
		return markup;
	},

	ShowConfMsg: function (msg) {
		debug(msg, 'exception');
	}
}

BizAPP.UI.Control = {
	CheckParentControl: function (type, parentSel, id) {
		var selector = parentSel == 'replaceself' ? id : parentSel,
			parent = getElementByBizAPPId(selector);

		if (!parent) {
			var msg = type + " - parent with id '" + selector + "' not found.";
			addLog(msg, true);
			throw msg;
		}

		return parent;
	},
	SetAttributes: function (jqCtrl, attributes) {
		if (attributes)
			$.each(attributes, function (k, v) {
				jqCtrl.attr(k, v);
			});
	},
	_getCommentNodes: function (jqCtrl) {
		return jqCtrl.find('*').contents().filter(function () {
			return this.nodeType == 8;
		});
	},
	_getPlaceHolderCommentNodes: function (jqCtrl) {
		return BizAPP.UI.Control._getCommentNodes(jqCtrl).filter(function () { return this.nodeValue != 'STARTPOMIT' && this.nodeValue != 'ENDPOMIT' });
	}
}

BizAPP.UI.Label = {
	templatetext: '<span id="{0}" tabindex="-1" class="{1}" bizappid="{0}" bza-ctrlid="{2}" style="display:inline-block;font-weight:normal;height:{4};width:{5};position:absolute;left:{7};top:{6}">{3}</span>',
	Create: function (parentSel, id, css, ctrlid, text, height, width, top, left) {
		var parent = BizAPP.UI.Control.CheckParentControl('label', parentSel, id);
		css = "LabelEx " + css;
		var lbl = BizAPP.UI.Label.templatetext.format(id, css, ctrlid, text, height, width, top, left);

		if (parentSel == 'replaceself')
			$(parent).replaceWith(lbl);
		else
			$(parent).append(lbl);
	}
}

BizAPP.UI.Textbox = {
	sltemplatetext: '<input type="text" id="{0}" class="{1}" bizappid="{0}" bza-ctrlid="{2}" style="height:{4};width:{5};position:absolute;left:{7};top:{6};" tabindex="{8}" onclick="{9}">',
	mltemplatetext: '<textarea rows="2" cols="20" id="{0}" class="{1}" bizappid="{0}" bza-ctrlid="{2}" style="height:{4};width:{5};position:absolute;left:{7};top:{6};" tabindex="{8}" onclick="{9}"></textarea>',
	Create: function (parentSel, id, css, ctrlid, text, height, width, top, left, tabindex, click, multiline, value, attributes) {
		var parent = BizAPP.UI.Control.CheckParentControl('textbox', parentSel, id),
			tb = '';
		css = "TextboxEx " + css;

		tb = typeof multiline === "string" && multiline === "true" ? BizAPP.UI.Textbox.mltemplatetext : BizAPP.UI.Textbox.sltemplatetext;
		tb = tb.format(id, css, ctrlid, text, height, width, top, left, tabindex, click);

		if (parentSel == 'replaceself')
			$(parent).replaceWith(tb);
		else
			$(parent).append(tb);

		var ctrl = $(getElementByBizAPPId(id));
		ctrl.val(value);
		BizAPP.UI.Control.SetAttributes(ctrl, attributes);
	},
	AutoComplete: function (ctrlId) {
		var ctrl = $(getElementByBizAPPId(ctrlId, "input"));
		if (!ctrl || ctrl.length == 0)
			return;

		addLog('autocomplete {0} '.format(ctrlId));
		ctrl.autocomplete({
			minLength: 1,
			open: function () {
				if (!$(this).attr('bza-ac')) {
					$(this).attr('bza-ac', $(this).attr('onchange'));
					$(this).removeAttr('onchange');
				}
			},
			close: function () {
				setTimeout(function () {
					$(this).attr('onchange', $(this).attr('bza-ac'));
					$(this).removeAttr('bza-ac');
				}, 1000);
			},
			source: function (request, response) {
				realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetAutoCompleteResults', ctrl.closest('[bizapp_context]').attr('bizapp_context').split('\n')[0], request.term, ctrl.closest('[bizapp_context]').attr('bizapp_eid'), ctrl.attr('bza-ctrlid')], false,
					function (data, textStatus, jqXHR) {
						data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
						var a = $.map(JSON.parse(data[1]), function (item) {
							return { value: item.value || item.Value, label: item.autocompletelabel || item.label || item.DisplayValue || item.value || item.Value };
						});
						if (ctrl.attr('bza-create') == 1)
							a.push({ value: 'bza-create', label: ' -- Create New -- ' })
						response(a);

						if (a.length == 0) {
							ctrl.attr('onchange', ctrl.attr('bza-ac'));
							ctrl.removeAttr('bza-ac');
						}
					});
			},
			select: function (event, ui) {
				if (event.preventDefault)
					event.preventDefault();
				else
					event.returnValue = false;

				if (ui.item.value == 'bza-create') {
					var a = ctrl.attr('bizappid').slice(0, -1) + '2';
					a = getElementByBizAPPId(a, 'SPAN');
					$(a).click();
				}
				else {
					this.value = ui.item.value;
					eval($(this).attr('bza-ac'));
				}
			},
			focus: function (event, ui) {
				if (event.preventDefault)
					event.preventDefault();
				else
					event.returnValue = false;
				$(this).val(ui.item.label);
			}
		});
	},

	setValue: function (ctrl) {
		var is_RT = false, tb;
		if (!g_locked) {
			if (ctrl.getText) {
				is_RT = true;
				g_locked = true;
				var ids = ctrl.ID.split('[sep]');
				var tbs = $('[bza-ctrlid="' + ids[1] + '"]');
				if (tbs.length == 1) {
					tb = $(tbs[0]);
				}
				else if (tbs.length > 1) {
					$.each(tbs, function () {
						if ($(this).closest('[bizapp_name]').attr('bizapp_eid') == ids[0]) {
							tb = $(this);
							return false;
						}
					});
				}
			}

			tb = is_RT ? tb : $(ctrl),
				container = tb.closest('[bizapp_name]'),
				view = container.hasClass('ViewControlEx') ? container : tb.closest('[bizapp_name].ViewControlEx'),
				text = is_RT ? ctrl.getText() : tb.val();
			if (!container.length) {
				g_locked = false;
				return;
			}
			if (text == '<br>')
				text = '';

			if (!_allowScriptTagInput__ && text.toLowerCase().indexOf('<script>') != -1) {
				debug('A potentially dangerous Request value was detected from the client.', "exception");
				g_locked = false;
				return;
			}

			var params = ['SetAndRefreshDependentFields',
				'',
				(!container.hasClass('ViewControlEx')).toString(), //is form
				container.attr('bizapp_eid'), //form id
				tb.hasClass('hasDatepicker') ? tb.parent().attr('bza-ctrlid') : tb.attr('bza-ctrlid'), //control id
				container.attr('bizapp_context') ? container.attr('bizapp_context').split('\n')[0] : '', //roid
				view.attr('bizapp_eid'), // view id
				view.attr('bizappid'), // view ctrl name
				text
			];
			g_callBacks.push(function () { g_locked = false; });
			callOutline(params);
		}
	},

	//BizAPP.UI.Textbox.EnhanceAutoComplete({selector:'#abc',selectCallback:function(){});
	//attributes - bza_fields, bza_qid, bizapp_context, bza_basefield(if query is not specified, related field on whose type query is run)
	EnhanceAutoComplete: function (options) {
		options.passValueSet = options.passValueSet || false;
		var ctrl = $(options.selector);
		var minLength = options.minLength;
		if (minLength == undefined) minLength = 1;
		ctrl.autocomplete({
			minLength: minLength,
			source: function (request, response) {
				var fields = ctrl.attr('bza_fields'), args;
				if (ctrl.attr('bza_qid')) {
					if (options.passValueSet)
						args = ['GetAutoCompleteSugestions', ctrl.attr('bza_qid'), request.term, fields, options.userStatus, ctrl.attr('bizapp_context'), BizAPP.ViewCustomization.DynamicReport.ConstructValueSet()];
					else
						args = ['GetAutoCompleteSugestions', ctrl.attr('bza_qid'), request.term, fields, options.userStatus, ctrl.attr('bizapp_context')];
				}
				else if (ctrl.attr('bizapp_context'))
					args = ['GetAutoCompleteResults', ctrl.attr('bizapp_context'), request.term, '', fields, ctrl.attr('bza_basefield'), ctrl.attr('bza_typeid')];
				else {
					displayMessage('query or context is mandatory');
					return;
				}

				realAjaxAsyncCall('HelperEx', getNextRequestId(), args, false,
					function (data, textStatus, jqXHR) {
						data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
						fields = fields.split(',');

						var a = null;

						if (ctrl.attr('bza_qid'))
							a = $.map(JSON.parse(data[1]), function (item) {
								var value = '';
								if (fields.length == 1)
									value = item[fields[0]];
								else {
									if (options.format) {
										if (!value) value = options.format;
										$.each(fields, function (index) {
											value = value.replace('{' + index.toString() + '}', '{0}');
											value = value.format(item[fields[index]]);
										});
									}
									else {
										$.each(fields, function () {
											if (value) value += ', ';
											value += this + ' : ' + item[this];
										});
									}
								}
								if (options.userStatus == 'true')
									value = (item['Status'] == '1' ? '?' : '?') + ' - ' + value;
								return { 'value': options.value ? item[options.value] : item.uniqueid, 'label': value, status: item['Status'], identifier: item.uniqueid + ':' + item.objecttype + ':-1', addnData: item };
							});
						else
							a = $.map(JSON.parse(data[1]), function (item) {
								return { value: item.label || item.value || item.Value, label: item.autocompletelabel || item.label || item.value || item.Value, identifier: item.value || item.Value };
							});

						response(a);
					});
			},
			position: { collision: "flip" },
			select: function (event, ui) {
				console.log(ui.item);
				options.selectCallback(event, ui);
				if (options.passValueSet)
					event.stopPropagation();
				if (options.userStatus == 'true') {
					ctrl.val('');
					return false;
				}
			}
		});

        /*$["ui"]["autocomplete"].prototype["_renderItem"] = function (ul, item) {
            return $('<li class="ui-menu-item"></li>')
            .data("item.autocomplete", item)
            .append(item.label)
            .appendTo(ul);
        };*/

	},

	StaticEnhanceAutoComplete: function (options) {
		if (typeof options.selectionValues != "undefined" || options.consumeSearchTerm) {
			BizAPP.UI.Textbox.InnerStaticEnhanceAutoComplete(options);
			options.callback();
			return;
		}
		BizAPP.UI.Textbox.FetchAutoCompleteResult(options, "", function (data) {
			var d = typeof data[1] != "string" ? JSON.stringify(data[1]) : data[1];
			options.selectionValues = d;
			BizAPP.UI.Textbox.InnerStaticEnhanceAutoComplete(options);
			if (options.callback)
				options.callback(data[1]);
		});
	},
	FetchAutoCompleteResult: function (options, searchTerm, callback) {
		options.passValueSet = options.passValueSet || false;
		var ctrl = $(options.selector);
		var fields = ctrl.attr('bza_fields'), args;

		//if no selection values are passed fetch it from server.
		if (ctrl.attr('bza_qid')) {
			if (options.passValueSet)
				args = ['GetAutoCompleteSugestions', ctrl.attr('bza_qid'), searchTerm, fields, options.userStatus, ctrl.attr('bizapp_context'), BizAPP.ViewCustomization.DynamicReport.ConstructValueSet()];
			else
				args = ['GetAutoCompleteSugestions', ctrl.attr('bza_qid'), searchTerm, fields, options.userStatus, ctrl.attr('bizapp_context')];
		}
		else if (ctrl.attr('bizapp_context'))
			args = ['GetAutoCompleteResults', ctrl.attr('bizapp_context'), searchTerm, '', fields, ctrl.attr('bza_basefield'), ctrl.attr('bza_typeid')];
		else {
			displayMessage('query or context is mandatory');
			return;
		}

		realAjaxAsyncCall('HelperEx', getNextRequestId(), args, false,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				callback(data);
			});
	},

	FormatAutoCompleteResponse: function (data, options) {
		if (!data)
			return;
		var ctrl = $(options.selector);
		var fields = ctrl.attr('bza_fields');
		var a = null;
		if (ctrl.attr('bza_qid'))
			a = $.map(JSON.parse(data), function (item) {
				var value = '';
				if (fields.length == 1)
					value = item[fields[0]];
				else {
					if (options.format) {
						if (!value) value = options.format;
						$.each(fields, function (index) {
							value = value.replace('{' + index.toString() + '}', '{0}');
							value = value.format(item[fields[index]]);
						});
					}
					else {
						$.each(fields, function () {
							if (value) value += ', ';
							value += this + ' : ' + item[this];
						});
					}
				}
				if (options.userStatus == 'true')
					value = (item['Status'] == '1' ? '?' : '?') + ' - ' + value;
				return { 'value': options.value ? item[options.value] : item.uniqueid, 'label': value, status: item['Status'], identifier: item.uniqueid + ':' + item.objecttype + ':-1', addnData: item };
			});
		else
			a = $.map(JSON.parse(data), function (item) {
				return { value: item.label || item.value || item.Value, label: item.autocompletelabel || item.label || item.value || item.Value, identifier: typeof item.value != 'undefined' ? item.value : item.Value };
			});
		return (a);
	},
	InnerStaticEnhanceAutoComplete: function (options) {
		options.passValueSet = options.passValueSet || false;
		var ctrl = $(options.selector);
		var minLength = options.minLength;
		if (minLength == undefined) minLength = 1;
		ctrl.autocomplete({
			minLength: minLength,
			source: function (request, response) {
				if (!options.consumeSearchTerm) {
					var a = BizAPP.UI.Textbox.FormatAutoCompleteResponse(options.selectionValues, options);
					response(a);
				}
				else {
					var searchTerm = request.term.split(/,\s*/).pop();
					BizAPP.UI.Textbox.FetchAutoCompleteResult(options, searchTerm, function (data) {
						var d = typeof data[1] != "string" ? JSON.stringify(data[1]) : data[1];
						var a = BizAPP.UI.Textbox.FormatAutoCompleteResponse(d, options);
						response(a);
					});
				}
			},
			position: { collision: "flip" },
			select: function (event, ui) {
				console.log(ui.item);
				options.selectCallback(event, ui);
				if (options.passValueSet)
					event.stopPropagation();
				if (options.userStatus == 'true') {
					ctrl.val('');
					return false;
				}
			}
		});

	},

	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.DateTime = {
	g_default: {},
	Init: function (id, wm, mode, interval, addnInfo) {
		var dp = $(getElementByBizAPPId(id, 'input'));
		//watermark
		if (wm) {
            /*dp.addClass('formwatermarkedtextbox');
            dp.val(wm);*/
			dp.attr('title', wm);
			dp.attr('placeholder', wm);
		}
		var options = {
			showButtonPanel: true,
			changeMonth: true,
			changeYear: true,
			dateFormat: 'dd-M-yy',
			showOn: 'button',
			buttonImage: 'resources/images/common/date.png',
			buttonImageOnly: true,
			yearRange: "1900:2100"
		};
		if (addnInfo) {
			addnInfo = JSON.parse(addnInfo);
			if (addnInfo.minDate)
				options.minDate = addnInfo.minDate;
			if (addnInfo.maxDate)
				options.maxDate = addnInfo.maxDate;
		}

		//timezone control
		var tzdd = dp.closest('.DateEx').find('select');
		if (tzdd.length > 0) {
			var parent = dp.closest('.DateEx');
			parent.html('<table cellspacing="0" cellpadding="0"><tr><td></td><td></td></tr></table>');
			$(parent.find('td').get(0)).html(dp);
			$(parent.find('td').get(1)).html(tzdd);
			tzdd.width(parent.width() / 2);
			dp.width((parent.width() / 2) - 20);
		}

		if (mode == 'ShowTimePicker') {
			options.controlType = 'select';
			options.timeFormat = 'hh:mm TT';
			options.showTime = false;
			options.showOn = 'both';
			options.onClose = function (dateText, inst) {
				if (dateText != dp.attr('oldval')) {
					eval($(this).attr("bza-oc"));
				}
			};
			options.stepMinute = interval;

			dp.attr('bza-oc', dp.attr('onchange'));
			dp.removeAttr('onchange');
			dp.attr('oldval', dp.attr('value'));
			dp.datetimepicker(options);
			dp[0].readOnly = true;
			dp.on('click', function () {
				dp.next().click();
			});
			dp.on('keyup', function (e) {
				if (e.keyCode == 8 || e.keyCode == 46) {
					$(this).val(null);
				}
				e.stopPropagation();
			});
		}
		else if (mode == 'MultiDatesPicker') {
			$.cachedScript(BizAPP.UI.GetBasePath('resources/javascripts/jquery/jquery-ui.multidatespicker.js')).done(function (script, textStatus) {
				dp.addClass("hasDatepicker").hide();
				dp.parent().append($('<div></div>'));
				dp = dp.parent().find('div');

				options.altField = '[bizappid="' + id + '"]';
				options.onSelect = function (dateText, inst) {
					var oldval = $(dp.context).attr('oldval');
					if (oldval) {
						BizAPP.UI.DateTime.g_default[id] = $($(dp.context).val().split(',')).not(oldval.split(',')).get();
						if (BizAPP.UI.DateTime.g_default[id] && !BizAPP.UI.DateTime.g_default[id][0])
							BizAPP.UI.DateTime.g_default[id] = $(oldval.split(',')).not($(dp.context).val().split(',')).get();
					}
					$('[bizappid="' + id + '"]').change();
				};

				var dates = $(dp.context).val();
				if (dates) {
					$(dp.context).attr('oldval', dates);
					options.addDates = $.map(dates.split(','), $.trim);
				}

				if (BizAPP.UI.DateTime.g_default[id] && BizAPP.UI.DateTime.g_default[id][0])
					options.defaultDate = $.datepicker.parseDate('dd-M-yy', BizAPP.UI.DateTime.g_default[id][0].trim());

				dp.multiDatesPicker(options);
				dp.parent().find('img').hide();
			});
		}
		else {
            /*if (wm) {
                dp.attr('onfocus', 'textBoxFocus(this,\'' + wm, + '\')');
                dp.attr('onblur', 'textBoxBlur(this,\'' + wm, + '\')');
            }*/
			dp.datepicker(options);
		}
	}
}

//TODO - Dynamic pivot localization, content formatting
BizAPP.UI.PivotTable = {
	headerTemplate: '<fieldset><legend>{0}</legend></fieldset>',
	subheaderTemplate: '    <td><strong>{0}</strong></td>',
	itemTemplate: '<td><select name="{0}" style="width: 300px;"> {1} </select><td>',
	subItemTemplate: ' <option value="{0}"> {1} </option>',
	resultsBtn: '<td colspan="2"><input type="submit" value="Show Results" onclick="BizAPP.UI.PivotTable.ConstructPivot(\'{0}\');return false;" class="ui-state-default ui-corner-all curPointer ui-button ui-widget"/></td></tr><tr><td colspan="2"><div id="pivottable"></div></td>',
	formats: ['Append', 'Sum', 'Average', 'Count'],

	ShowPivotOptions: function (qid) {
		realAjaxAsyncCall('PivotTableEx', getNextRequestId(), ['ShowPivotOptions', qid], true,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				var content = JSON.parse(data[1]),
					header = BizAPP.UI.PivotTable.headerTemplate.format('Configuration Parameters'),
					xaxis = BizAPP.UI.PivotTable.subheaderTemplate.format('X Axis : '),
					yaxis = BizAPP.UI.PivotTable.subheaderTemplate.format('Y Axis : '),
					value = BizAPP.UI.PivotTable.subheaderTemplate.format('Value : '),
					format = BizAPP.UI.PivotTable.subheaderTemplate.format('Format : ');

				var formatOpt = '', xaxisOpt = '', yaxisOpt = '', valueOpt = '';

				$.each(BizAPP.UI.PivotTable.formats, function () {
					formatOpt += BizAPP.UI.PivotTable.subItemTemplate.format(this, this);
				});
				$.each(content, function (k, v) {
					xaxisOpt += BizAPP.UI.PivotTable.subItemTemplate.format(k, k);
					yaxisOpt += BizAPP.UI.PivotTable.subItemTemplate.format(k, k);
					valueOpt += BizAPP.UI.PivotTable.subItemTemplate.format(k, k);
				});

				xaxis += BizAPP.UI.PivotTable.itemTemplate.format('xaxis', xaxisOpt);
				yaxis += BizAPP.UI.PivotTable.itemTemplate.format('yaxis', yaxisOpt);
				value += BizAPP.UI.PivotTable.itemTemplate.format('value', valueOpt);
				format += BizAPP.UI.PivotTable.itemTemplate.format('format', formatOpt);

				BizAPP.UI.InlinePopup.CreateNew({
					html: '<div>' + header + '<table><tr>' + xaxis + '</tr><tr>' + yaxis + '</tr><tr>' + value + '</tr><tr>' + format + '</tr><tr>' +
						BizAPP.UI.PivotTable.resultsBtn.format(qid) + '</tr></table></div>'
				});
			});
	},
	ConstructPivot: function (qid) {
		var xaxis = $('select[name=xaxis]').val();
		var yaxis = $('select[name=yaxis]').val();
		var value = $('select[name=value]').val();
		var format = $('select[name=format]').val();

		realAjaxAsyncCall('PivotTableEx', getNextRequestId(), ['ConstructPivot', qid, xaxis, yaxis, value, format], true,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				$('#pivottable').html(BizAPP.UI.PivotTable.headerTemplate.format('Results') + data[1]);
				var a = $(BizAPP.UI.InlinePopup.getActivePopup().tinner());
				a.children('.tcontent').css('min-width', a.find('.gridcontrol').width());
				BizAPP.UI.InlinePopup._setTINYPosition(true);

				if (format !== BizAPP.UI.PivotTable.formats[0]) {//!Append
					var cells = $('#pivottable td').filter(function () {
						var a = $(this).text().trim();
						if (a) {
							if (format === BizAPP.UI.PivotTable.formats[1] || format === BizAPP.UI.PivotTable.formats[2]) {
								if (a.indexOf(',') != -1)
									return true;
							}
							else
								return true;
						}
						return false;
					});

					$.each(cells, function () {
						var values = $(this).text().split(','),
							value = '';

						if (format === BizAPP.UI.PivotTable.formats[1] || format === BizAPP.UI.PivotTable.formats[2]) {
							value = 0;
							$.each(values, function () {
								value += parseInt(this);
							});

							if (format === BizAPP.UI.PivotTable.formats[2])
								value = value / values.length
						}
						else
							value = values.length;

						$(this).html(value);
					});
				}
			}
		);
	}
}

//#region ReAuth
var g_reauthCHC, g_reauthinterval, g_reauthActive = false;
BizAPP.UI.ReAuth = {
	Prompt: function (options) {
		if (!g_reauthActive) {
			g_reauthActive = true;
			BizAPP.UI.ReAuth._options = options
			if (options.type == 8)
				options.html = '<div style="width:300px;"><p><i class="fa fa-3x fa-key" style="float:left; padding-right:.5rem"></i><b>A code has been sent to your emailid.<br>Enter the code to continue</b></p><input id="reauthcode" style="padding:.5rem;width:90%" type="number" class="formtextbox" placeholder="Code"></input><p style="text-align:right"><span class="stepcenternormal lnkbtn" onclick="BizAPP.UI.ReAuth.SubmitVerificationCode();">Continue</span></p></div>'
			BizAPP.UI.InlinePopup.CreateNew(options);
		}
	},
	_options: null,
	SubmitVerificationCode: function () {
		var options = BizAPP.UI.ReAuth._options
		ajaxAsyncCall('HelperEx', ['ReAuthenticate', options.chc, $('#reauthcode').val(), options.mode, options.type], false, true);
	}
}
function callReAuthPrompt() { callHelper('PromptForReAuthentication', g_reauthCHC); $.idleTimer('destroy'); }
function setUpReAuthIdleTimer(interval, chc) {
	g_reauthCHC = chc;
	g_reauthinterval = interval;
	startReauthTimer();
}
function setupReauthTimer() {
	if (g_reauthinterval) {
		var idleTimerObj = $.data(document, 'idleTimerObj');
		if (idleTimerObj) {
			if (idleTimerObj.idle)
				return;

			idleTimerObj.olddate = ''; //reset
		}

		startReauthTimer();
	}
}
function startReauthTimer() {
	$(document).bind('idle.idleTimer', callReAuthPrompt);
	$.idleTimer(g_reauthinterval * 1000);
}
function callAuthenticate(chc, mode) {
	var pw = $('.reauthTable').find('[type=password]').val();
	ajaxAsyncCall('HelperEx', ['ReAuthenticate', chc, pw, mode]);
}
function callContinueApplyAction(chc, mode) {
	var reason = $('#bizappRejctReason').val();
	ajaxAsyncCall('OutlineEx', ['ContinueApplyAction', chc, reason, mode], false, true);
}
var g_reauthenticated = false;
function reauthCompleteHandler(chc, key) {
	if (!g_reauthenticated)
		callCleanupExecutionSeq(chc, key);
}
function callCleanupExecutionSeq(chc, key) {
	ajaxAsyncCall('HelperEx', ['CleanupExecutionSequence', chc, key], false, true);
}
//#endregion

BizAPP.UI.Profiler = {
	Process: function (viewid) {
		//var view = getElementByBizAPPId(viewid, 'div');

		$.each($('[bza-inittime]:not([bza-profproc])'), function () {
			var time = $(this).attr('bza-inittime'),
				css = 'ui-icon',
				parentcss = 'ui-state-highlight';
			time = parseInt(time);

			if (time > 100) {
				css += ' ui-icon-alert';
				parentcss = 'ui-state-error';
			}
			else if (time > 50) {
				css += ' ui-icon-notice'
				parentcss = 'ui-state-error';
			}
			else
				css += ' ui-icon-info';

			$(this).attr('bza-profproc', '');
			time = $(this).attr('bza-ctrlid') + ' - ' + time;
			$(this).prepend('<span class="{2}" style="display:inline-block;cursor:pointer"><span class="{0}" title="{1} ms"></span></span>'.format(css, time, parentcss));
		});
	}
}

BizAPP.UI.Tree = {
	_initLoader: function (callback) {
		BizAPP.UI.LoadInfragistics(callback);
	},
	Drilldown: function (node) {
		ajaxAsyncCall('TreeEx', ['Drilldown', $(node).attr('bza-roid'), $(node).attr('bza-view'), $(node).attr('bza-viewname')], false, false);
	},
	Create: function (id, data, triState, baseurl, chc, isGrid) {
		BizAPP.UI.LoadInfragistics(function () {
			var tree = $(getElementByBizAPPId(id));
			tree.attr('bza-baseurl', baseurl);
			tree.attr('bza-chc', chc);

			if (isGrid) {
				$("#treegrid").igTreeGrid({
					dataSource: "http://localhost:52152/WebService.asmx/GetData",
					childDataKey: "childData",
					enableRemoteLoadOnDemand: true,
					autoGenerateColumns: false,
					primaryKey: "Name",
					responseDataKey: "Records",

					columns: [
						{ headerText: "Name", key: "Name" },
						{ headerText: "Employee ID", key: "ID" },
						{ headerText: "Price", key: "Price" }
					]
				});
			}
			else {
				tree.igTree({
					dataSourceType: 'json',
					dataSource: [],
					checkboxMode: triState ? 'triState' : 'off',
					bindings: {
						textKey: 'Text',
						valueKey: 'Value',
						imageUrlKey: 'ImageUrl',
						childDataProperty: 'Nodes'
					},
					nodeClick: function (event, ui) {
						var value = ui.node.element.attr('data-value');
						if (!value)
							return;

						if ($(ui.node.element).find('>a [onclick]').length > 0) return;

						value = value.split('[VS]');
						ajaxAsyncCall('TreeEx', ['Drilldown', value[0], value[1], value[2]], false, false);
					},
					nodeExpanded: function (event, ui) {
						var a = ui.node.element.attr('bza-populated');
						if (a == 'true')
							return;
						else
							ui.node.element.attr('bza-populated', 'true');

						var value = ui.node.element.attr('data-value');
						if (!value)
							return;

						value = value.split('[VS]');
						realAjaxAsyncCall('TreeEx', getNextRequestId(), ['Expand', ui.owner.element.attr('bza-chc'), value[0]], false, function (data, textStatus, jqXHR) {
							var expHandle = tree.closest('[bza-nodeexpanded]').attr('bza-nodeexpanded');
							if (expHandle) {
								var fn = window[expHandle];

								if (fn)
									fn(ui.node.element);
							}

							data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
							ui.owner.element.igTree('removeAt', ui.node.path + '_0');
							BizAPP.UI.Tree.AddNode(id, JSON.parse(data[1]), ui.node.element);
							ui.owner.element.igTree('expand', ui.node.element);
						});
					}
				});
				BizAPP.UI.Tree.AddNode(id, data);
			}
		});
	},
	AddNode: function (id, data, parent) {
		var tree = $(getElementByBizAPPId(id));

		if (typeof data === 'string')
			data = JSON.parse(data);

		var baseurl = tree.attr('bza-baseurl'),
			loaderImg = BizAPP.UI.GetBasePath('resources/images/common/loading.gif');
		$.each(data, function () {
			this.Value = this.Value + '[VS]' + $(parent).attr('data-path');

			if (this.HasCN == 'true')
				this.Nodes = [{ ImageUrl: loaderImg, Text: 'Loading...' }];
		});

		tree.igTree('addNode', data, parent);
		$.each(data, function () {
			if (this.Tristate != 'true') {
				var newnode = tree.igTree('nodesByValue', this.Value);
				newnode.find('span[data-role="checkbox"]').hide();
			}
		});
	},
	GetSelection: function (id) {
		var tree;
		if (typeof id == 'string')
			tree = $(getElementByBizAPPId(id));
		else
			tree = $(id);
		var nodes = tree.igTree('checkedNodes'),
			result = '';

		$.each(nodes, function () {
			if (this.data.Tristate != 'true')
				return true;
			var value = this.data.Value.split('[VS]');

			if (result)
				result += ',' + value[0];
			else
				result = value[0];
		});

		return result;
	}
}

//#region LINK CONTROL
BizAPP.UI.LinkControl = {
	customLink: function (link, event, serializedArgs, pmptMsg) {
		if (pmptMsg) {
			BizAPP.UI.InlinePopup.Confirm({
				message: pmptMsg,
				type: "Confirm",
				fnOkOnclick: function () {
					if (BizAPP.UI.InlinePopup.procVisible)
						ProcessingStatus(true, true);
					BizAPP.UI.LinkControl.customLink1(link, event, serializedArgs);
				}
			});
		}
		else
			BizAPP.UI.LinkControl.customLink1(link, event, serializedArgs);
	},
	customLink1: function (link, event, serializedArgs) {
		var args;
		var ctrlPressed = false;
		if (event) {
			var spKeyStatus = specialKeyStatus(event);
			if (spKeyStatus.ctrlPressed)
				ctrlPressed = spKeyStatus.ctrlPressed;
		}

		if (link) {
			var params = BizAPP.UI.LinkControl._getParams(link);
			args = ['CustomLink', ctrlPressed.toString()].concat(params);//ctrlid, ro, vieweid, vcn
		}
		else {
			args = ['LinkControlCallBack', serializedArgs, ctrlPressed.toString()];
		}
		BizAPP.UI.LinkControl._callLink(args);
	},
	sequentialLink: function (link, event, CHC, pmptMsg, isInlinePopup) {
		if (pmptMsg) {
			BizAPP.UI.InlinePopup.Confirm({
				message: pmptMsg,
				type: "Confirm",
				fnOkOnclick: function () {
					if (BizAPP.UI.InlinePopup.procVisible)
						ProcessingStatus(true, true);
					BizAPP.UI.LinkControl.sequentialLink1(link, event, CHC, isInlinePopup);
				}
			});
		}
		else
			BizAPP.UI.LinkControl.sequentialLink1(link, event, CHC, isInlinePopup);
	},
	sequentialLink1: function (link, event, CHC, isInlinePopup) {
		var args;
		if (link) {
			var params = BizAPP.UI.LinkControl._getParams(link);
			params.push(isInlinePopup);
			args = ['SequentialLink', null].concat(params);//ctrlid, ro, vieweid, vcn
		}
		else {
			args = ['ExecuteSequence', CHC];
		}
		BizAPP.UI.LinkControl._callLink(args);
		return cancelBubble(event);
	},
	_getParams: function (link) {
		var params = $(link).attr('bza-args').split('[VS]');
		params.push($(link).attr('bza-ctrlid'));
		var container = $(link).closest('[bizapp_name]'),
			view = container.hasClass('ViewControlEx') ? container : $(link).closest('[bizapp_name].ViewControlEx');

		params.push(container.attr('bizapp_context') ? container.attr('bizapp_context').split('\n')[0] : '');
		params.push(view.attr('bizapp_eid'));
		params.push(view.attr('bizappid'));
		return params;
	},
	_callLink: function (args) {
		setForceFocus('forcefocus', window.event);
		setTimeout(function () {
			ajaxAsyncCall('LinkControlEx', args, false, true);
		}, 600)
	},
	PromptAndContinueSequence: function (options) {
		BizAPP.UI.InlinePopup.Confirm({
			message: options.msg,
			type: "Confirm",
			fnOkOnclick: function () {
				if (BizAPP.UI.InlinePopup.procVisible)
					ProcessingStatus(true, true);
				ajaxAsyncCall('HelperEx', ['ContinueSequence', options.chc, options.key, options.index], false, true);
			}
		});
	}
}
function callLnkExeSeq(event, CHC) {
	BizAPP.UI.LinkControl.sequentialLink(null, event, CHC);
}
function exeSqSearchCallBack(event, CHC, roids) {
	if (!roids) {
		displayMessage(BizAPP.UI.Localization.NoRecordsSelected);
		return;
	}

	g_callBacks.push(zoomout);
	ajaxAsyncCall('HelperEx', ['ExecutionSequenceSearchCallBack', CHC, roids], false, true);
	return cancelBubble(event);
}
function getRssUrl(event, CHC) {
	ajaxAsyncCall('LinkControlEx', ['GetRssUrl', CHC], false, true);
	return cancelBubble(event);
}
function handlePrintOption(event, contextHashCode, sviewId) {
	var prtContent = getElementByBizAPPId(sviewId, 'DIV');
	var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
	WinPrint.document.write(prtContent.innerHTML);
	WinPrint.document.close();
	WinPrint.focus();
	WinPrint.print();
	return;

	if (event == null)
		event = window.event;

	var html;
	if (sviewId) {
		var view = getElementByBizAPPId(sviewId, 'DIV');
		html = view.innerHTML;
	}

	if (html && html != undefined && html != NaN && html != '')
		ajaxAsyncCall('LinkControlEx', ['HandlePrintOption', contextHashCode, window.location.href.trim('#'), html], false, true);

}

function handleContextMenuOnLinkControl(event, contextHashCode) {
	if (event == null)
		event = window.event;

	var contextmenuContainer = getElementByBizAPPId("contextmenupopupcontainer", 'div');

	if (contextmenuContainer) {
		var x;
		var y;

		if (event) {
			x = event.clientX;
			y = event.clientY;

			var position = getElementPosition(getSourceElement(event));
			if (position)
				y = position[1];

			if ((document.documentElement.offsetWidth - event.clientX) < 390)
				x = document.documentElement.offsetWidth - 390;

			if ((document.documentElement.offsetHeight - y) < 230)
				y = document.documentElement.offsetHeight - 230;
		}
		else {
			x = document.documentElement.offsetWidth / 2 - 195;
			y = document.documentElement.offsetHeight / 2 - 144;
		}

		contextmenuContainer.style.display = "block";
		contextmenuContainer.style.left = x + "px";
		contextmenuContainer.style.top = y + "px";

		ajaxAsyncCall("LinkControlEx", ['HandleContextMenuOnLinkControl', contextHashCode, y.toString(), x.toString()], false, true);
	}
}

function callRefreshView(serializedArgs) {
	ajaxAsyncCall('HelperEx', ['RefreshView', serializedArgs], false, true);
}

function callRefreshListView(serializedArgs) {
	ajaxAsyncCall('HelperEx', ['RefreshListView', serializedArgs], false, true);
}

function callLinkControlPostVerb(serializedArgs) {
	ajaxAsyncCall('LinkControlEx', ['CallLinkControlPostVerb', serializedArgs], false, true);
}

function lcConfirmMsg(sourceContext, targetContext) {
	ajaxAsyncCall('LinkControlEx', ['ShowConfirmationMessage', sourceContext, targetContext], false, true);
}

function callLinkControlCallBack(event, serializedArgs) {
	BizAPP.UI.LinkControl.customLink(null, event, serializedArgs);
}
function callLinkControlPrompt(event, serializedArgs, message) {
	BizAPP.UI.LinkControl.customLink(null, event, serializedArgs, message);
}

function isBrowserSupported(versions, options) {
	if (isMobile.any()) {
		BizAPP.UI.LoadScript({
			eid: 'ESystemb625e',
			version: '1',
			callback: function () {
				BSO.MobileBanner.Create({
					appname: JSON.parse(BizAPP.UI.currentApplication).bizappcurrentapplicationname,
					logo: 'testresource.aspx?appid=' + JSON.parse(BizAPP.UI.currentApplication).bizappcurrentapplicationuid + '&V=' + __bts_
				});
			}
		});
	}

	options = options || {};
	var isBlocked = false;
	if (!versions)
		versions = {
			//It blocks specified version & below
			chrome: 26,
			firefox: 22,
			msie: 8,
			safari: 6,
			opera: 21,
		};
	options.reject = versions
	$.cachedScript(BizAPP.UI.GetBasePath('resources/jReject/jquery.reject.js')).done(function (script, textStatus) {
		isBlocked = $.reject(options);

		if (isBlocked) {
			$.getCss(BizAPP.UI.GetBasePath('resources/jReject/jquery.reject.css'));
		}
	});

	return !isBlocked;
}

function addWindowEvent(template) {
	var isff = typeof isFirefox == "function" ? isFirefox() : isFirefox
	if (template && isff)
		template = template.replace(/onclick="/g, 'onclick="window.event=event;').replace(/onchange="/g, 'onchange="window.event=event;');

	return template;
}

BizAPP.UI.TextEditor = {
	$textArea: null,
	watermark: "<span class='bza-rte-watermark' style='color:#ccc;'>{0}</span>",
	_imageUploaderUI: '<div id="drag-and-drop-zoneupload-image" class="uploader" field="Uri" advanced="::0:false:"><div class="browser"><table><tbody><tr style="height:32px;"><td class="uploader-btn"><label><i class="fa fa-folder-open" style="color: #92AAB0;" title="Browse Files"><input type="file" id="uploader" defid="EAppPointd693f" name="files[]" bizappid="AttachmentFileUpload" fileformats="" title="Click to Add files"></i></label></td><td class="uploader-bar"><div id="demo-files"><span class="demo-note">Drop Image Here</span></div></td></td></tr></tbody></table></div></div>',
	_imageUploaderFound: false,
	_url: null,
	_target: null,
	Init: function (options) {
		var type = BizAPP.UI.controlDependency['type'];
		if (type && !options.fromControlSet) {
			var jsUrl;
			var key = 'richtextcontrol';
			switch (type) {
				case "controlmap":
					jsUrl = BizAPP.UI.controlDependency[key];
					if (jsUrl) {
						jsUrl = jsUrl + '?v=' + __bts_;
						$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function (script, textStatus) {
							BizAPP.UI.TextEditor.Init(options);
						});
					}
					else {
						BizAPP.UI.TextEditor.InternalInit(options);
					}
					break;
				case "controlset":
					options.fromControlSet = true;
					BizAPP.UI.TextEditor.Init(options);
					break;
			}
		}
		else {
			BizAPP.UI.TextEditor.InternalInit(options);
		}
	},
	InternalInit: function (options) {
		BizAPP.UI.TextEditor.LoadFontAwesomeCss();
		$.cachedScript(BizAPP.UI.GetBasePath('resources/texteditor/jquery.sceditor.bbcode.min.js?v=' + __bts_)).done(function (script, textStatus) {
			options = options || { ctrlId: '', isReadOnly: false, autoSize: false, showClipboardOptions: true, showFontOptions: true, showFormatOptions: true, showAlignmentOptions: true };
			var $textarea = $('.RichTextEx[bza-ctrlid="' + options.ctrlId + '"]').find('[name="bbcode_field"]');
			$textarea.sceditor({
				readOnly: options.isReadOnly,
				emoticonsEnabled: false
			});
			$textarea.attr('oldval', options.text);
			var $richtextInstance = $textarea.sceditor('instance');
			if (options.text)
				$richtextInstance.setWysiwygEditorValue(options.text);

			if (options.isReadOnly)
				$('div.sceditor-toolbar').hide();
			else {
				$richtextInstance.blur(function (e) {
					var text;
					var inSourceMode = $richtextInstance.inSourceMode();
					if (inSourceMode)
						text = $richtextInstance.getSourceEditorValue();
					else
						text = $richtextInstance.getWysiwygEditorValue();

					var roid = $textarea.attr('roid');
					var name = $textarea.attr('ctrlname');

					if (text.indexOf('bza-rte-watermark') == -1) {
						if ($textarea.attr('oldval') !== text) {
							BizAPP.RuntimeObject.SetFieldValue({
								roid: roid, fieldName: name, fieldValue: text, addOrRemove: false, callback: function () {
									$textarea.attr('oldval', text);
								}
							});
						}
					}

					//Adds watermark if the text editor is empty
					if ((!options.isReadOnly) && (text.toString().trim() == '') && options.watermark) {
						if (inSourceMode)
							$richtextInstance.setSourceEditorValue(BizAPP.UI.TextEditor.watermark.format(options.watermark));
						else
							$richtextInstance.setWysiwygEditorValue(BizAPP.UI.TextEditor.watermark.format(options.watermark));

						if (inSourceMode)
							text = $richtextInstance.getSourceEditorValue();
						else
							text = $richtextInstance.getWysiwygEditorValue();
					}
				});

				//BizAPP.UI.TextEditor.AddCustomLinkInToolbar();
				if (!options.showAlignmentOptions)
					$('[data-sceditor-command="left"]').parent().hide();
				if (!options.showFontOptions)
					$('[data-sceditor-command="font"]').parent().hide();
				if (!options.showFormatOptions) {
					$('[data-sceditor-command="bold"]').parent().hide();
					$('[data-sceditor-command="bulletlist"]').parent().hide();
					$('[data-sceditor-command="horizontalrule"]').parent().hide();
					$('[data-sceditor-command="table"]').parent().hide();
					$('[data-sceditor-command="youtube"]').parent().hide();
				}

				if (options.allowImageInsert && (!(isIE() && isIE() < 10))) {
					//Upload Control Initialization
					//BizAPP.UI.TextEditor.ReplaceImageUploader();
					var $target = $('.sceditor-container iframe').contents().find('[contenteditable]');
					$target.bind('paste', BizAPP.UI.TextEditor.PasteImage);
					$target.attr('roid', '').attr('field', '');
					BizAPP.UI.Upload.RegisterDragDrop($target, function (aid) {
						var src = 'testresource.aspx?aid=' + aid;
						var $richtextInstance = $('[name="bbcode_field"]').sceditor('instance');
						$($richtextInstance.currentBlockNode()).append($('<div><br></div><img src="' + src + '"' + '/><div><br></div>'));
					});
				}
			}

			BizAPP.UI.TextEditor.ImportThemeCss();

			if (isIE() == 11) {
				var $iframe = $('.sceditor-container iframe');
				$iframe.contents().find("body,html").height('100%');
			}

			if (options.autoSize)
				BizAPP.UI.TextEditor.AdjustHeight();

			if (!options.isReadOnly) {
				$textarea.sceditor('instance').focus(function (e) {
					var txt = $textarea.sceditor('instance').getWysiwygEditorValue();
					if (txt.indexOf('bza-rte-watermark') > 0)
						$richtextInstance.setWysiwygEditorValue('');
				});
			}

			//Adds watermark if the text editor is empty
			var text = options.text;
			if ((!options.isReadOnly) && (text.toString().trim() == '') && options.watermark) {
				$richtextInstance.setWysiwygEditorValue(BizAPP.UI.TextEditor.watermark.format(options.watermark));
				$richtextInstance.setSourceEditorValue(BizAPP.UI.TextEditor.watermark.format(options.watermark));
			}
		});
	},
	AdjustHeight: function () {
		var $iframe = $('.sceditor-container iframe');
		$iframe.css('min-height', $('[name="bbcode_field"]').height() - 78);
		$iframe.height($iframe.contents().find("body").height() + 40);

		var $body = $iframe.contents().find('body');
		$body.css({ 'overflow': 'hidden' });
		$body.keyup(function (e) {
			$iframe.height($body.height() + 40);
		});
	},
	ImportThemeCss: function () {
		var $iframe = $('.sceditor-container iframe');
		var $head = $iframe.contents().find('head');
		var $css = $('[type="text/css"][class]').clone();
		$head.append($css);

		var $body = $iframe.contents().find('body');
		$body.css('min-height', $('[name="bbcode_field"]').height() - 78);
	},
	AddCustomLinkInToolbar: function () {
		var str = "Custom Link Clicked";
		var $toolbar = $('.sceditor-toolbar');
		$toolbar.append($('<div class="sceditor-group"><a class="sceditor-button sceditor-button-link text-icon" onclick="alert(\'Custom Link Clicked\');" unselectable="on" title="Custom Link"><div unselectable="on">Custom Link</div></a></div>'));
	},
	LoadFontAwesomeCss: function () {
		BizAPP.UI.LoadDependentFile("font-awesome.min.css");
		BizAPP.UI.LoadDependentFile("default.min.css");
	},
	ReplaceImageUploader: function () {
		$('.sceditor-button-image').on('click', function (event) {
			$('.sceditor-insertimage div:eq(0)').append(BizAPP.UI.TextEditor._imageUploaderUI);
			BizAPP.UI.Upload.InitUploadControl('#drag-and-drop-zoneupload-image', location.href.toLowerCase().split('enterpriseview.aspx')[0] + 'upload.asmx?roid=&field=&skipsave=false&mode=file&advanced=', '0');
		});
	},
	PasteImage: function (event) {
		var clipboardData, found;
		found = false;
		clipboardData = event.originalEvent.clipboardData;
		$.each(clipboardData.types, function (i, type) {
			var file, reader;
			if (found) {
				return;
			}
			if (clipboardData.items[i].type.indexOf("image") !== -1) {
				file = clipboardData.items[i].getAsFile();
				reader = new FileReader();
				var img = $('<img></img>');
				reader.onload = function (evt) {
					img.attr('src', evt.target.result);
				};
				reader.readAsDataURL(file);
				var $richtextInstance = $('[name="bbcode_field"]').sceditor('instance');
				$($richtextInstance.currentBlockNode()).append($('<div><br></div>')).append(img).append($('<div><br></div>'));
				return found = true;
			}
		});
	}
}
//#endregion

BizAPP.UI.Tab = {
	_switchPage: function (table, event) {
		var tabPage = getSourceElement(event);
		if (tabPage.nodeName.toLowerCase() != 'td')
			tabPage = $(tabPage).closest('[groupid]');
		tabPage = $(tabPage);
		var pageArgs = tabPage.attr('bza-args').split('[VS]');

		callShowTabPage(event, $(table).attr('bza-args'), tabPage.attr('groupid'), pageArgs[0], tabPage[0], pageArgs[1]);
		sltTab(tabPage[0]);
	}
}

BizAPP.UI.Grid = {
	_queryContainer: '<div class="sort-container sort-container-border" onclick="closeCalendar();callDisplayItems( \'{0}_multiquery\' );event.stopPropagation();"><span class="action-indicator">{1}</span><div class="sort-popup action-menu" id="{0}_multiquery" style="position: absolute;display:none">{2}</div></div>',
	_queryItem: '<div class="item-normal" onclick="BizAPP.UI.Grid._changeMQValue(\'{2}\',\'{0}\');" onmouseover="callHighLightItem( event, \'onmouseover\', \'item-normal\', \'item-highlighted\' );" onmouseout="callHighLightItem( event, \'onmouseout\', \'item-normal\', \'item-highlighted\' );">{1}</div>',

	EnhanceGrid: function (id, mq, paginator, count, filter, qkFilter) {
		if (mq)
			BizAPP.UI.Grid._enhanceMultiQuery(id);
		if (paginator)
			BizAPP.UI.Grid._enhancePaginator(id);
		if (count)
			BizAPP.UI.Grid._enhanceShowCount(id);
		if (filter)
			BizAPP.UI.Grid._enhanceFilter(id, qkFilter);
	},

	//BizAPP.UI.Grid.CombineLinks({selector:'[bza-ctrlid="Query_PendingVerification"]'});
	CombineLinks: function (options) {
		var a = [],
			grpname = [],
			$table = $(options.selector + ' table[ecols]');

		$table.find('tr').last().find('[bza_lnkgrp]').each(function () {
			var $name = $(this).attr('bza_lnkgrp');
			if ($.inArray($name, grpname) == -1) {
				grpname.push($name);
			}
		});

		$.each(grpname, function (i, v) {
			var col = new Array();
			$.each($table.find('tr').last().find('td[onclick*="callEvaluateLink"][bza_lnkgrp="' + v + '"]'), function (i, n) {
				col.push(n.cellIndex);
				$(n).attr('processed', 'true')
			});
			if (col.length > 1)
				BizAPP.UI.Grid.GroupLinks(col, options.selector, v);
		});
		//get links
		$.each($table.find('tr').last().find('td[onclick*="callEvaluateLink"]:not([processed])'), function (i, n) {
			if (!n.hasAttribute('bza_lnkgrp_exclude')) {
				a.push(n.cellIndex);
			}
		});
		if (a.length > 1)
			BizAPP.UI.Grid.GroupLinks(a, options.selector, "Menu");
	},
	GroupLinks: function (a, selector, groupname) {
		var $table = $(selector + ' table[ecols]');
		$.each($table.find('tr'), function (i, n) {
			//hide existing column
			$.each(a, function (i, n1) {
				$(n.cells[n1]).hide();
			});

			if (i == 0)
				$(n).find('th:nth-child(' + ($(a).last()[0] + 1) + ')').after('<th>Action</th>'); //header
			else if ($(n).attr('roid')) {
				var links = '';
				$.each(a, function (i, n1) {
					links += '<div class="clearfix ms_bb1a bdr-5 ms_pb1 ms_pt1" bza-ci="{1}">{0}</div>'.format($(n.cells[n1]).html(), n1);
				});
				var cell = $('<td class="bza-link-group">' + groupname + '</td>');
				$(n).find('td:nth-child(' + ($(a).last()[0] + 1) + ')').after(cell);

				BizAPP.MenuPopup.Create({ html: links, selector: cell });

				$(n).find('[bza-ci]').on('click', function (event) {
					event.stopPropagation();
					$(this).closest('tr')[0].cells[parseInt($(this).attr('bza-ci'))].click();
				});
			}
			else
				$(n).find('td:nth-child(' + ($(a).last()[0] + 1) + ')').after('<td></td>');
		});
	},
	_enhanceMultiQuery: function (id) {
		var grid = $(getElementByBizAPPId(id, 'div')),
			mqs = grid.find('select[onchange*="callApplySelectedQuery"]'),
			b = '';

		if (!mqs || mqs.length == 0)
			return;

		$.each(mqs.find('option'), function () {
			b += BizAPP.UI.Grid._queryItem.format(this.value, this.innerHTML, id);
		});

		mqs.hide();
		BizAPP.UI.Grid._getPlaceHolder(grid, 'multiquery').replaceWith(BizAPP.UI.Grid._queryContainer.format(id, mqs.find("option:selected").text(), b));
	},
	_getPlaceHolder: function (jqCtrl, placeHolder) {
		return BizAPP.UI.Control._getPlaceHolderCommentNodes(jqCtrl).filter(function () { return this.nodeValue == placeHolder });
	},
	_changeMQValue: function (id, value) {
		var mqs = $(getElementByBizAPPId(id, 'div')).find('select[onchange*="callApplySelectedQuery"]');
		mqs.val(value).change();
	},

	_enhancePaginator: function (id) {
		var grid = $(getElementByBizAPPId(id, 'div')),
			pager = grid.find('.gpr [class*=gridmovefirst]').closest('table');
		BizAPP.UI.Grid._getPlaceHolder(grid, 'paginate').replaceWith(pager);
	},
	_enhanceShowCount: function (id) {
		var grid = $(getElementByBizAPPId(id, 'div')),
			showCount = grid.find('.gridcountresult');
		BizAPP.UI.Grid._getPlaceHolder(grid, 'showcount').replaceWith(showCount);
	},

	_enhanceFilter: function (id, val) {
		var grid = $(getElementByBizAPPId(id, 'div'));
		BizAPP.UI.Grid._getPlaceHolder(grid, 'filter').replaceWith('<input class="formtextbox qkfilter" onkeypress="BizAPP.UI.Grid._quickFilter(event,\'{0}\');" value="{1}"/>'.format(id, val));
	},
	_quickFilter: function (event, id) {
		if (event == null)
			event = window.event;

		if (event && event.keyCode == "13") {
			var grid = $(getElementByBizAPPId(id, 'div')),
				qftb = grid.find('.qkfilter'),
				filters = grid.find('[name="BizAPP.filter"]');

			var b = '';
			filters.each(function () {
				b += $(this).attr('bizappid').split(',')[0] + '[SEP]';
			});

			b += '[NVS]' + $(qftb).val();
			var chc = grid.find('.gridFilter')[0].onclick.toString().split('callFilter(\'')[1].split('\'')[0];
			ajaxAsyncCall('AdvancedListEx', ['QuickFilter', chc, b]);
		}
	},
	_addnFieldsMarkupHeadLine: '<span>Additional Fields</span>',
	_addnFieldsMarkupBody: '<div id="bza_adnFlds_Table">\
<table cellspacing="0" style="width: 100%; height: 300px;">\
        <tr valign="top">\
            <td>\
                <table>\
                    <tr>\
                        <td>Field Name : </td>\
                        <td>\
                            <input type="textbox" id="fn" class="formtextbox"/></td>\
                        <td rowspan="2" style="width: 1%;" class="swmain"><i class="fa fa-angle-double-right btn btn-default" style="float: right;width:auto" onclick="BizAPP.UI.Grid._addNodesToStack();"></i></td>\
                    </tr>\
                    <tr>\
                        <td>Field Alias : </td>\
                        <td>\
                            <input type="textbox" id="fa" class="formtextbox"/></td>\
                    </tr>\
                </table>\
            </td>\
            <td rowspan="2" style="border-left: 1px solid gray;">\
                Selected Fields (uncheck to remove from list)\
                <div class="containerTree" style="width: 100%; height: 100%;">\
                    <div id="left">\
                        <div id="tree2">\
                        </div>\
                    </div>\
                </div>\
            </td>\
        </tr>\
        <tr valign="top">\
            <td style="height: 100%;">\
                <div class="containerTree" style="height: 100%;">\
                    <div id="left">\
                        <div id="tree">\
                        </div>\
                    </div>\
                </div>\
            </td>\
        </tr>\
</table>\
</div>',
	_addnFieldsMarkupSteps: '<div><table cellspacing="0" cellpadding="0" align="Left" style="border-collapse:collapse;"><tbody><tr valign="top"><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="S" class="stepcenternormal" onclick="backGroundBlocker( \'true\');BizAPP.UI.Grid._addFields();" prevstate="normal">Ok</span></div></td><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="C" class="stepcenternormal cancelstep" onclick="zoomout();">Cancel</span></div></td></tr></tbody></table></div>',
	initAddnFieldsPopup: function (typeid, parent, query, chc) {
		BizAPP.UI.Tree._initLoader(function () {
			var options = { 'headline': BizAPP.UI.Grid._addnFieldsMarkupHeadLine, 'body': BizAPP.UI.Grid._addnFieldsMarkupBody, 'steps': BizAPP.UI.Grid._addnFieldsMarkupSteps };
			var _addnFieldsMarkup = BizAPP.UI.InlinePopup.GetMarkupWithTemplate(options);
			BizAPP.UI.InlinePopup.CreateNew({ html: _addnFieldsMarkup, stropenjs: '$("#bza_adnFlds_Table").attr("chc","' + chc + '");BizAPP.UI.Grid.getFields("' + chc + '","' + typeid + '","' + parent + '",null,"' + query + '");' });
		});
	},
	getFields: function (chc, typeid, parent, parentNode, query, includeExistingFields, checkboxMode, displayFieldName, includeSystemFields, callback) {
		checkboxMode = checkboxMode || 'biState';
		displayFieldName = displayFieldName || false;
		includeExistingFields = includeExistingFields || false;
		if (typeof (includeSystemFields) == 'undefined')
			includeSystemFields = true;
		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetAdditionalFieldNodes', chc, typeid, parent, query, includeExistingFields, includeSystemFields], true,
			function (data, textStatus, jqXHR) {
				var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				var res = JSON.parse(response[1]);
				var result = res.allFields;
				var result1 = res.pqFields;

				if (!parentNode) {
					BizAPP.UI.LoadInfragistics(function () {
						$('#bza_adnFlds_Table #tree').igTree({
							dataSourceType: 'json',
							dataSource: [],
							checkboxMode: checkboxMode,
							bindings: {
								textKey: 'Text',
								valueKey: 'Value',
								childDataProperty: 'Nodes'
							},
							nodeExpanded: function (event, ui) {
								var a = ui.node.element.attr('bza-populated');
								if (a == 'true')
									return;
								else
									ui.node.element.attr('bza-populated', 'true');

								BizAPP.UI.Grid.getFields(chc, ui.node.data.Value, ui.node.data.FN, ui, query, includeExistingFields, checkboxMode, displayFieldName, includeSystemFields, callback);
							},
							nodeCheckstateChanged: function (evt, ui) {
								BizAPP.UI.Grid._addNodesToStack(ui);
							},
							nodeClick: function (event, ui) {
								$(event.currentTarget).attr('bza-type', ui.node.data.Type);
							},
						});

						$('#bza_adnFlds_Table #tree2').igTree({
							dataSourceType: 'json',
							dataSource: [],
							checkboxMode: 'biState',
							bindings: {
								textKey: 'Text',
								valueKey: 'Value'
							},
							nodeCheckstateChanged: function (evt, ui) {
								if (ui.newState !== 'on') {
									$("#bza_adnFlds_Table #tree2").igTree("removeAt", ui.node.path);
								}
							}
						});

						BizAPP.UI.Grid._loadNodes(result, result1, parent, parentNode, displayFieldName, callback);
					});
				}
				else {
					parentNode.owner.element.igTree('removeAt', parentNode.node.path + '_0');
					BizAPP.UI.Grid._loadNodes(result, null, parent, parentNode.node.element, displayFieldName, callback);
					parentNode.owner.element.igTree('expand', parentNode.node.element);
				}
			});
	},
	_loadNodes: function (result, result1, parent, parentNode, displayFieldName, callback) {
		$.each(result, function (i, n) {
			var fn = parent ? parent + '.' + i : i;
			var text = displayFieldName ? i : fn;
			if (!n[1]) n[1] = '';
			var node = { Text: displayFieldName ? '<span fielname="{1}" fieldtype="{2}" title="{3}">{0}</span>'.format(text + (n[2] != null ? ' ({0})'.format(n[2]) : ""), fn, n[3], n[1]) : (n[2] != null ? n[2] : i.replace(/([A-Z])/g, ' $1')), FN: fn, Type: n[3], AddnData: n },
				value = n[0];

			if (value) {
				node.Value = value;
				node.Nodes = [{ Text: 'Loading...' }];
			}

			$('#bza_adnFlds_Table #tree').igTree("addNode", node, parentNode);
		});

		if (result1) {
			$.each(result1.split('[_IS]'), function () {
				if (this && this.length > 0) {
					var text = this.split('[_TVS]');
					var node = { Text: text[1], FN: text[0] };
					$('#bza_adnFlds_Table #tree2').igTree("addNode", node);
				}
			});

			//check newly added nodes 
			$.each($('#bza_adnFlds_Table #tree2').igTree("uncheckedNodes"), function () {
				$('#bza_adnFlds_Table #tree2').igTree("toggleCheckstate", this.element)
			});
		}

		if (parentNode)
			$(parentNode).find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
		else
			$('#bza_adnFlds_Table #tree').find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();

		if (callback) {
			callback();
			BizAPP.UI.InlinePopup._setTINYPosition(true);
		}
	},
	_addNodesToStack: function (ui) {
		var checkedNodes = $("#bza_adnFlds_Table #tree").igTree("checkedNodes");
		var allStackNodes = $("#bza_adnFlds_Table #tree2").igTree("checkedNodes");

		for (var i = 0; i < checkedNodes.length; i++) {
			if (checkedNodes[i].data) {
				var a = ui.node.path, b = '', c = '';
				$.each(a.split('_'), function (i, n) {
					if (i == a.split('_').length - 1) return;
					if (i != 0) b += '_';
					b += n;

					c += ui.owner.nodeFromElement(ui.owner.nodeByPath(b)).data.Text + '.';
				})

				c += checkedNodes[i].data.Text;
				var data = { FN: checkedNodes[i].data.FN, Text: c.replace(/\. /g, '.') }
				$("#bza_adnFlds_Table #tree2").igTree("addNode", data);
			}
		}

		var fn = $("#bza_adnFlds_Table #fn").val();
		if (fn) {
			var fa = $("#bza_adnFlds_Table #fa").val();
			var data = { FN: fn, Text: fa ? fa : fn.replace(/([A-Z])/g, ' $1').replace(/\. /g, '.') }
			$("#bza_adnFlds_Table #tree2").igTree("addNode", data);
			$("#bza_adnFlds_Table #fn").val('');
			$("#bza_adnFlds_Table #fa").val('');
		}

		//Remove repeated node
		for (var i = 0; i < checkedNodes.length; i++) {
			if (!checkedNodes[i].data)
				continue;
			var node = { Text: checkedNodes[i].data.Text };

			for (var j = 0; j < allStackNodes.length; j++) {
				if (allStackNodes[j].data && allStackNodes[j].data.Text == node.Text) {
					$('#bza_adnFlds_Table #tree2').igTree("removeAt", allStackNodes[j].path);
					allStackNodes = $("#bza_adnFlds_Table #tree2").igTree("checkedNodes");
				}
			}
		}

		//check newly added nodes 
		$.each($('#bza_adnFlds_Table #tree2').igTree("uncheckedNodes"), function () {
			$('#bza_adnFlds_Table #tree2').igTree("toggleCheckstate", this.element)
		});
		//uncheck selected nodes in fields tree
		$.each(checkedNodes, function () {
			$('#bza_adnFlds_Table #tree').igTree("toggleCheckstate", this.element)
		});
		BizAPP.UI.InlinePopup._setTINYPosition(true);
	},
	_addFields: function () {
		var allStackNodes = $("#bza_adnFlds_Table #tree2").igTree("checkedNodes");
		var a = '';
		if (allStackNodes.length > 0)
			$.each(allStackNodes, function () {
				if (this.data)
					a += this.data.FN + "[_TVS]" + this.data.Text + "[_IS]";
			});

		g_callBacks.push(zoomout);
		ajaxAsyncCall("OptGridEx", ['ApplyAdditionalFields', $('#bza_adnFlds_Table').attr('chc'), a], true, true);
	},
	_chartTemplateHeadLine: '<span>Chart</span>',
	_chartTemplateBody: '<div id="bza_adnFlds_Table" chc="{0}">\
            <table class="fill" style="table-layout: fixed;"><tr style="font-weight:bold;text-align: center;"><td style="padding-top:5px">Group By</td><td style="padding-top:5px">Series</td></tr><tr style="font-weight: bold;"><td colspan="2">Query Fields</td></tr><tr><td colspan="2"><hr style="margin-top: auto;margin-bottom: 5px;"/></td></tr><tr><td><div id="treeGroupBy" style="max-height: 100px;overflow: auto;overflow-x: hidden;"></div></td><td><div id="treeSeries" style="max-height: 100px;overflow: auto;overflow-x: hidden;"></div></td></tr><tr><td colspan="2"><hr style="margin-bottom: auto;border-top:0;display:none"/></td></tr><tr style="font-weight: bold;"><td colspan="2">All Fields</td></tr><tr><td colspan="2"><hr style="margin-top: auto;margin-bottom: 5px;"/></td></tr><tr><td><div id="tree1" style="max-height: 200px;overflow: auto;overflow-x: hidden;"></div></td><td><div id="tree2" style="max-height: 200px;overflow: auto;overflow-x: hidden;"></div></td></tr></table>\
        </div>',
	_chartTemplateSteps: '<div><table cellspacing="0" cellpadding="0" align="Left" style="border-collapse:collapse;"><tbody><tr valign="top"><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="S" class="stepcenternormal" onclick="backGroundBlocker( \'true\');BizAPP.UI.Grid._displayChart(\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\',\'{6}\');" prevstate="normal">Ok</span></div></td><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="C" class="stepcenternormal cancelstep" onclick="zoomout();">Cancel</span></div></td></tr></tbody></table></div>',
	_chartFieldNode: null,
	initChartPopup: function (event, chc, chartEnterpriseId, query, isForm, formId, ctrlName) {
		if (event == null)
			event = window.event;

		var parent = '';
		var typeid = '';
		var $chart = $(getSourceElement(event)),
			$container = $chart.closest('[bizapp_name]');

		var roid = '';
		if ($container.length > 0 && $container.attr('bizapp_context'))
			roid = $container.attr('bizapp_context').split('\n')[0];

		BizAPP.UI.Tree._initLoader(function () { });
		var options = { 'headline': BizAPP.UI.Grid._chartTemplateHeadLine, 'body': BizAPP.UI.Grid._chartTemplateBody, 'steps': BizAPP.UI.Grid._chartTemplateSteps };
		var _chartMarkup = BizAPP.UI.InlinePopup.GetMarkupWithTemplate(options);
		BizAPP.UI.InlinePopup.CreateNew({
			html: _chartMarkup.format(chc, $chart.attr('bza-typeid'), query, roid, isForm, formId, ctrlName),
			stropenjs: 'BizAPP.UI.Grid.getChartFields("' + chc + '","' + typeid + '","' + parent + '",null,"' + query + '", true);',
			strclosejs: 'BizAPP.UI.Grid.__chartFieldNode=null'
		});
	},
	getChartFields: function (chc, typeid, parent, parentNode, query, includeExistingFields) {
		includeExistingFields = includeExistingFields || false;
		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetAdditionalFieldNodes', chc, typeid, parent, query, includeExistingFields], true,
			function (data, textStatus, jqXHR) {
				var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				var res = JSON.parse(response[1]);
				var result1 = res.allFields;
				var result2 = res.pqFields;

				if (!parentNode) {
					BizAPP.UI.LoadInfragistics(function () {
						$('#bza_adnFlds_Table #tree1').igTree({
							dataSourceType: 'json',
							dataSource: [],
							checkboxMode: 'biState',
							bindings: {
								textKey: 'Text',
								valueKey: 'Value',
								childDataProperty: 'Nodes'
							},
							nodeExpanded: function (event, ui) {
								var a = ui.node.element.attr('bza-populated');
								if (a == 'true')
									return;
								else
									ui.node.element.attr('bza-populated', 'true');

								BizAPP.UI.Grid.getChartFields(chc, ui.node.data.Value, ui.node.data.FN, ui, query);
							},

							nodeCheckstateChanged: function (evt, ui) {
								if (ui.newState == 'on') {
									if (BizAPP.UI.Grid.__chartFieldNode && BizAPP.UI.Grid.__chartFieldNode.node.path == ui.node.path)
										return;

									BizAPP.UI.Grid.__chartFieldNode = ui;
									var $tree = $('#bza_adnFlds_Table #tree1');
									$.each($tree.igTree('checkedNodes'), function () {
										$tree.igTree('toggleCheckstate', this.element)
									});

									$tree.igTree('toggleCheckstate', ui.node.element);
								}
							}
						});

						$('#bza_adnFlds_Table #tree2').igTree({
							dataSourceType: 'json',
							dataSource: [],
							checkboxMode: 'biState',
							bindings: {
								textKey: 'Text',
								valueKey: 'Value',
								childDataProperty: 'Nodes'
							},

							nodeExpanded: function (event, ui) {
								var a = ui.node.element.attr('bza-populated');
								if (a == 'true')
									return;
								else
									ui.node.element.attr('bza-populated', 'true');

								BizAPP.UI.Grid.getChartFields(chc, ui.node.data.Value, ui.node.data.FN, ui, query);
							},
						});

						BizAPP.UI.Grid._loadNodesForChart(result1, result2, parent, parentNode);
					});
				}

				else {
					parentNode.owner.element.igTree('removeAt', parentNode.node.path + '_0');
					BizAPP.UI.Grid._loadNodesForChart(result1, null, parent, parentNode.node.element);
					parentNode.owner.element.igTree('expand', parentNode.node.element);
				}

				realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetGridFieldNodes', chc, typeid, parent, query], true,
					function (data, textStatus, jqXHR) {
						var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
						var res = JSON.parse(response[1]);
						var result1 = res.allFields;
						var result2 = res.pqFields;

						if (!parentNode) {
							$('#bza_adnFlds_Table #treeGroupBy').igTree({
								dataSourceType: 'json',
								dataSource: [],
								checkboxMode: 'biState',
								bindings: {
									textKey: 'Text',
									valueKey: 'Value',
									childDataProperty: 'Nodes'
								},
								nodeExpanded: function (event, ui) {
									var a = ui.node.element.attr('bza-populated');
									if (a == 'true')
										return;
									else
										ui.node.element.attr('bza-populated', 'true');

									BizAPP.UI.Grid.getChartFields(chc, ui.node.data.Value, ui.node.data.FN, ui, query);
								},
								nodeCheckstateChanged: function (evt, ui) {
									if (ui.newState == 'on') {
										if (BizAPP.UI.Grid.__chartFieldNode && BizAPP.UI.Grid.__chartFieldNode.node.path == ui.node.path)
											return;

										BizAPP.UI.Grid.__chartFieldNode = ui;
										var $tree = $('#bza_adnFlds_Table #tree1');
										$.each($tree.igTree('checkedNodes'), function () {
											$tree.igTree('toggleCheckstate', this.element)
										});
										$tree.igTree('toggleCheckstate', ui.node.element);
									}
								}
							});

							$('#bza_adnFlds_Table #treeSeries').igTree({
								dataSourceType: 'json',
								dataSource: [],
								checkboxMode: 'biState',
								bindings: {
									textKey: 'Text',
									valueKey: 'Value',
									childDataProperty: 'Nodes'
								},
								nodeExpanded: function (event, ui) {
									var a = ui.node.element.attr('bza-populated');
									if (a == 'true')
										return;
									else
										ui.node.element.attr('bza-populated', 'true');

									BizAPP.UI.Grid.getChartFields(chc, ui.node.data.Value, ui.node.data.FN, ui, query);
								},
							});

							BizAPP.UI.Grid._loadNodesForGridFieldsChart(result1, result2, parent, parentNode);
						}
						else {
							parentNode.owner.element.igTree('removeAt', parentNode.node.path + '_0');
							BizAPP.UI.Grid._loadNodesForGridFieldsChart(result1, null, parent, parentNode.node.element);
							parentNode.owner.element.igTree('expand', parentNode.node.element);
						}

						BizAPP.UI.InlinePopup._setTINYPosition(true);
					});
			});
	},
	_loadNodesForChart: function (result, result1, parent, parentNode) {
		$.each(result, function (i, n) {
			var text = parent ? parent + '.' + i : i;
			var node = { Text: n[2] != null ? n[2] : i.replace(/([A-Z])/g, ' $1'), FN: text },
				value = n[0];

			if (value) {
				node.Value = value;
				node.Nodes = [{ Text: 'Loading...' }];
			}

			if (parentNode)
				$('#bza_adnFlds_Table #tree1').igTree("addNode", node, parentNode);
			else {
				$('#bza_adnFlds_Table #tree1').igTree("addNode", node, parentNode);
				$('#bza_adnFlds_Table #tree2').igTree("addNode", node, parentNode);
			}
		});

		if (parentNode)
			$(parentNode).find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
		else {
			$('#bza_adnFlds_Table #tree1').find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
			$('#bza_adnFlds_Table #tree2').find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
		}
	},

	_loadNodesForGridFieldsChart: function (result, result1, parent, parentNode) {
		$.each(result, function (i, n) {
			var text = parent ? parent + '.' + i : i;
			var node = { Text: n[2] != null ? n[2] : i.replace(/([A-Z])/g, ' $1'), FN: text },
				value = n[0];

			if (value) {
				node.Value = value;
				node.Nodes = [{ Text: 'Loading...' }];
			}

			if (parentNode) {
				$('#bza_adnFlds_Table #treeGroupBy').igTree("addNode", node, parentNode);
			}
			else {
				$('#bza_adnFlds_Table #treeGroupBy').igTree("addNode", node, parentNode);
				$('#bza_adnFlds_Table #treeSeries').igTree("addNode", node, parentNode);
			}
		});

		if (parentNode)
			$(parentNode).find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
		else {
			$('#bza_adnFlds_Table #treeGroupBy').find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
			$('#bza_adnFlds_Table #treeSeries').find('.ui-igtree-parentnode').find('span[data-role="checkbox"]').remove();
		}
	},
	_displayChart: function (typeId, query, roid, isForm, formId, ctrlName) {
		var field, fields = '';
		$.each($('#bza_adnFlds_Table #tree1').igTree('checkedNodes'), function () { if (this.data) field = this.data.FN });
		$.each($('#bza_adnFlds_Table #treeGroupBy').igTree('checkedNodes'), function () { if (this.data) field = this.data.FN });

		if (field) {
			$.each($('#bza_adnFlds_Table #tree2').igTree('checkedNodes'), function () { if (this.data) fields += "," + this.data.FN });
			$.each($('#bza_adnFlds_Table #treeSeries').igTree('checkedNodes'), function () { if (this.data) fields += "," + this.data.FN });
			BizAPP.UI.GetChart({ objecttypeid: typeId, fieldname: field, filterqueryid: query, seriesfield: fields, roid: roid, isForm: isForm, formId: formId, ctrlName: ctrlName, container: 'fromGrid' });
		}
	},
	Init: function (selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, fromControlSet, dateColumns) {
		var type = BizAPP.UI.controlDependency['type'];
		if (type && !fromControlSet) {
			var jsUrl;
			var key = 'grid';
			switch (type) {
				case "controlmap":
					jsUrl = BizAPP.UI.controlDependency[key];
					if (jsUrl) {
						jsUrl = jsUrl + '?v=' + __bts_;
						$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function (script, textStatus) {
							BizAPP.UI.Grid.Init(selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, fromControlSet, dateColumns);
						});
					}
					else {
						BizAPP.UI.Grid.InternalInit(selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, dateColumns);
					}
					break;
				case "controlset":
					BizAPP.UI.Grid.Init(selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, true, dateColumns);
					break;
			}
		}
		else {
			BizAPP.UI.Grid.InternalInit(selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, dateColumns);
		}
	},
	InternalInit: function (selector, enhanceFilter, isResponsive, mq, paginator, count, filter, qkFilter, dateColumns) {
		var grid = getElementByBizAPPId(selector);
		if (enhanceFilter)
			BizAPP.UI.Grid.EnhanceGridFilter({ selector: grid });
		if (isResponsive)
			BizAPP.UI.ResponsiveGrid.Init(selector);

		BizAPP.UI.Grid.FormatDateTimeColumns({ bizappid: selector, DateColumns: dateColumns });

		BizAPP.UI.Grid.EnhanceGrid(selector, mq, paginator, count, filter, qkFilter);
		try {
			BizAPP.UI.Grid.PreProcessStub(selector);
		} catch (e) {
			addLog('grid pre process failed', e);
		}
		grid = $(grid);
		if (grid.css('display') == 'none')
			grid.show();
		else
			grid.find('[id="' + selector.replace(/:/g, '\\:') + '"]:hidden').show();

		if (grid.closest('.tinner').length)
			BizAPP.UI.InlinePopup._setTINYPosition(true);
	},
	PreProcessStub: function (selector) { },
	EnhanceGridFilter: function (option) {
		if (isIE() == 8) return;
		var grid = $(option.selector),
			filters = grid.find('[onkeypress*="callGridFilter"] [name="BizAPP.filter"]'),
			pos = 1;

		if (!grid.find('.bza_vdg_header').length) return;
		//Hide existing filter row
		grid.find('[onkeypress*="callGridFilter"]').hide();
		BizAPP.UI.TextEditor.LoadFontAwesomeCss();

		$.each(filters, function () {
			var td = $(this).parent(),
				th = td.closest('table').find('.bza_vdg_header').find('th:eq(' + $(td).index() + ')');

			$(th).click(function (event) {
				if (!this.hasAttribute('filtermenu')) {
					var $col = $(this);
					$('.bza-dropdown').removeClass('open');
					BizAPP.MenuPopup.Create({ html: BizAPP.UI.Grid.GetFilterNSortAsHTML($col), selector: $col, position: 'bottom', mode: 'open', callback: function () { setTimeout(function () { $col.find('.filter-textbox').focus(); }, 50) } });
					BizAPP.UI.Grid.CreateFilterOperators({ control: $col, placeholder: '.bza-operators' });
					BizAPP.UI.Grid.AlignFilterPopup($col);
					BizAPP.UI.Grid.DisplayPreSelectedFilter($col);

					//Hide the row if the allowed value is empty
					var isAllowedValueFound = $col.find('.allowed-values *').length > 0;
					if (!isAllowedValueFound)
						$col.find('.allowed-values').closest('tr').hide();

					$col.attr('filtermenu', 'created');
					event.stopPropagation();

					//Update text on uncheck event
					$col.find('.dropdown-menu input[type=checkbox]').click(function () {
						var cb = $(this);
						if (!cb.is(':checked')) {
							var tb = cb.closest('.dropdown-menu').find('.filter-textbox');
							tb.val(tb.val().replace(cb.val(), ''));
							tb.val(tb.val().replace(/^\,/g, '').replace(/\,$/g, ''));
						}
					});
				}
			});
			BizAPP.UI.Grid.DisplayPreSelectedFilter($(th));
		});

		//Bind enter events on input text box
		grid.on('keyup', "input.filter-textbox", function (event) {
			if (event.keyCode == 13) {
				var _block = $(this).closest('.bza-filter-block');
				_block.find('.btn-filter,.fa-filter')[0].click();
			}
		});
	},
	AlignFilterPopup: function ($th) {
		var prevWidth = 0;
		$th.prevAll().each(function () { prevWidth += $(this).width(); });
		prevWidth += $th.width();

		if ($th.find('.dropdown-menu').width() > prevWidth) {
			$th.find('.dropdown-menu.bottom,.bza-caret.bottom').addClass('pright');
		}
	},
	GetFilterNSortAsHTML: function (colSelector) {
		var option = '<div style="padding: 3px 15px 3px 0px;white-space: nowrap;color: black;font-style: normal;text-align:left;">\
			<label onclick="event.cancelBubble = true;"  title="{0}"><input type="checkbox" class="bza-filter-checkbox" name="checkbox" value="{0}" onclick="event.cancelBubble = true;" style="height:auto!important;">{0}\</label>\
		</div>';
		var grid = $(colSelector).closest('table.gridcontrol');
		/*
		var cells = $.grep(grid.children('tbody').children('tr').children('td'), function (n) { return n.cellIndex == $(colSelector).index() }),
            columnValues = [];

        $.each(cells, function () {
            if (($(this).text() != "" && $(this).html() != "&nbsp;") && ($(this).text() != "Filter") && $(this).attr('td') == null) {
                var text = $(this).text().trim();
                if ($.inArray(text, columnValues) < 0)
                    columnValues.push(text);
            }
        });
		*/
		var html = '';
		/*
        $.each(columnValues, function () {
            html += option.format(this)
        });
		*/

		var filterBlock = typeof (BizAPP.Bootstrap) == 'undefined' ?
			('<div class="bza-filter-block">\
						<table>\
							<tr><td style="border: none; padding: 0px!important; " td="td"><input type="text" class="filter-textbox" onclick="event.cancelBubble = true;" placeholder="Type Here..." style="float:left;width:80%"/>\
								<div style="float: right;">\
									<span class="sort-increasing-order ui-icon ui-icon-carat-1-n" onclick="BizAPP.UI.Grid.Sort(this, true, event)" title="Sort Ascending"></span>\
									<span class="sort-decreasing-order ui-icon ui-icon-carat-1-s" onclick="BizAPP.UI.Grid.Sort(this, false, event)"  title="Sort Descending" style="margin-left: -1px;margin-top: -6px;"></span>\
								</div>\
							</td></tr>\
							<tr><td style="border: solid 1px #e2e2e2;"><div class="allowed-values">' + html + '</div></td></tr>\
							<tr><td style="border: none;" td="td"><a class="stepcenternormal btn-filter" onclick="BizAPP.UI.Grid.InvokeFilter(this);" style="font-style: auto;">Filter</a>\
                            <a class="stepcenternormal btn-clear" onclick="BizAPP.UI.Grid.RemoveSelectedFilter(this);" style="font-style:auto;margin-left:3px;">Clear</a>\
                            </td></tr>\
						</table>\
					</div>') : (
				'<div class="bza-filter-block" style="min-width: 250px">\
						<table style="width:100%">\
							<tr><td style="border: none;padding: 0px;">\
                                <select class="form-control bza-operators" onchange="BizAPP.UI.Grid.FilterOperatorOnChangeEvent(this)">\
								</select>\
							</td></tr>\
							<tr><td style="border: none;" td="td">\
                            <div class="input-group">\
                                <input type="text" class="form-control filter-textbox" placeholder="Search for...">\
								<span class="input-group-btn" style="display:none">\
									<button class="btn btn-default fa fa-eraser" type="button" onclick="BizAPP.UI.Grid.RemoveSelectedFilter(this);" title="Clear"></button>\
                                </span>\
								<span class="input-group-btn">\
									<button class="btn btn-default" type="button" onclick="BizAPP.UI.Grid.InvokeFilter(this);" title="Filter"><i class="fa fa-filter"></i></button>\
                                </span>\
								<span class="input-group-btn">\
									<span class="sort-increasing-order ui-icon ui-icon-carat-1-n" onclick="BizAPP.UI.Grid.Sort(this, true, event)" title="Sort Ascending"></span>\
									<span class="sort-decreasing-order ui-icon ui-icon-carat-1-s" onclick="BizAPP.UI.Grid.Sort(this, false, event)"  title="Sort Descending" style="margin-left: -1px;margin-top: -6px;"></span>\
                                </span>\
							</div>\
							</td></tr>\
							<tr><td style="border: solid 1px #e2e2e2;"><div class="allowed-values">' + html + '</div></td></tr>\
						</table>\
					</div>'
			);
		//Disable click handler on header row
		grid.find('th:eq(0)').parent().attr('onclick', 'null');

		filterBlock = addWindowEvent(filterBlock);
		return filterBlock;
	},
	Sort: function (link, isIncreasing, event) {
		var grid = $(link).closest('.grid'),
			header = $(link).closest('.bza-filter-block').closest('th');
		if (isIncreasing) {
			//call Filter
			$(link).next().attr('onclick', 'BizAPP.UI.Grid.Sort(this, false, event)');
			header.removeClass('gridsortdescending').addClass('gridsortascending');
		} else {
			//call Filter
			$(link).prev().attr('onclick', 'BizAPP.UI.Grid.Sort(this, true, event)');
			header.removeClass('gridsortascending').addClass('gridsortdescending');
		}

		var ctrlName = header.closest('[bza_data]').attr('id');
		var json = JSON.parse(header.closest('[bza_data]').attr('bza_data'));
		callSort(event, json.chc, ctrlName, ctrlName + '_Pages', ctrlName + '_RecordsPerPageList');

		//make it non clickable
		$(link).attr('onclick', 'null');
	},
	_filteredText: '',
	InvokeFilter: function (btnFilter) {
		var searchText = $(btnFilter).closest('table').find('.filter-textbox').val();
		if (!(!searchText || /\S/.test(searchText)))
			return;

		var diff = BizAPP.UI.Grid._filteredText.replace(searchText, '');
		var split = diff.split(',');
		var checkboxGrp = $(btnFilter).closest('table');
		$.each(split, function (k, v) {
			if (v.indexOf("\\") >= 0)
				v = v.replace(/\\/g, "\\\\");

			checkboxGrp.find('[title="' + v + '"] input:checked').click();
		});

		var values = searchText.split(',');
		$(btnFilter).closest('table').find('.bza-filter-checkbox:input').each(function () {
			if (this.checked && values.indexOf(this.value) < 0) {
				if (searchText)
					searchText = searchText + ',' + this.value;
				else
					searchText = this.value;
			}
		});
		var th = $(btnFilter).closest('th');
		var input_filter = th.closest('table').find('[onkeypress]').find('td:eq(' + $(th).index() + ')').find('input');

		var operators = BizAPP.UI.Grid.GetOperators(th);
		var operatorVal = operators[$(btnFilter).closest('table').find('.bza-operators').val()];
		if (!!searchText || operatorVal == 'ISNULL')
			searchText = BizAPP.UI.Grid.AttachFilterOperator({ text: searchText, operator: operatorVal, datatype: th.attr('data-type') });

		input_filter.val(searchText);
		input_filter.trigger(jQuery.Event('keypress', { keyCode: 13 }));

		BizAPP.UI.Grid._filteredText = searchText;
	},

	DefaultOperators: { Contains: 'Contains', 'Is Null': 'ISNULL', 'Starts With': 'StartsWith', 'Ends With': 'EndsWith', Equal: '=', 'Not Equal': '!' },
	NumberOperators: { Equal: '=', 'Not Equal': '!', 'Greater Than': '>', 'Greater Than Or Equal': '>=', 'Less Than': '<', 'Less Than Or Equal': '<=' },
	DateTimeOperators: { Equal: '=', 'Not Equal': '!', 'After Or Equal': '>=', 'Before Or Equal': '<=' },
	BooleanOperators: { Equal: '=', 'Not Equal': '!' },
	//BizAPP.UI.Grid.CreateFilterOperators({control:this,placeholder:'.bza-operators'});
	CreateFilterOperators: function (options) {
		var th = $(options.control);
		var operators = BizAPP.UI.Grid.GetOperators(th);

		var opt = '<option>{0}</option>',
			listItems = '';

		$.each(operators, function (k, v) {
			listItems += opt.format(k);
		});

		th.find(options.placeholder).html('').append(listItems);
	},
	GetOperators: function (th) {
		var operators = BizAPP.UI.Grid.DefaultOperators;
		var type = $(th).attr('data-type');

		if (!type) type = 'String'

		switch (type) {
			case 'Int32':
			case 'number':
				operators = BizAPP.UI.Grid.NumberOperators;
				break;

			case 'String':
			case 'Object':
				operators = BizAPP.UI.Grid.DefaultOperators;
				break;

			case 'Boolean':
				operators = BizAPP.UI.Grid.BooleanOperators;
				break;

			case 'DateTime':
			case 'Date':
				operators = BizAPP.UI.Grid.DateTimeOperators;

				var sel = '.filter-textbox';
				var calImg = $('<span class="input-group-addon" onclick="$(this).find(\'img\').click();"><span class="fa fa-calendar"></span></span>');
				$(th).find(sel).parent().find('.input-group-addon').remove();
				calImg.insertAfter($(th).find(sel));

				var col = $(th).attr('sortid').replace(/ /g, '');
				var id = 'id-' + col;
				$(th).find(sel).attr('id', id);
				BizAPP.UI.DateTime.Init(id, '', 'ShowDatePicker', 15, '{"maxDate":"","minDate":""}');

				break;

			//Add here for more datatypes 
		}

		return operators;
	},
	AttachFilterOperator: function (options) {
		var text = options.text,
			operator = options.operator;

		switch (operator) {
			case 'Contains':
				break;

			case '=':
			case '>=':
			case '<=':
			case '>':
			case '<':
			case '!':
				text = operator + text;
				break;

			case 'ISNULL':
				text = operator;
				break;

			case 'StartsWith':
				text = text + '%';
				break;

			case 'EndsWith':
				text = '%' + text;
				break;
		}

		return text;
	},
	RemoveFilterOperators: function (options) {
		var el = $(options.control),
			text = options.text,
			retVal = text,
			operator = null;

		var regex1 = new RegExp('>=|<=');
		var regex2 = new RegExp('>|!|=|<');

		if (text.search(regex1) == 0) {
			retVal = retVal.substr(2);
			operator = text.substr(0, 2);
		} else if (text.search(regex2) == 0) {
			retVal = retVal.substr(1);
			operator = text[0];
		} else if (text.endsWith('%')) {
			var len = retVal.length;
			retVal = retVal.substr(0, len - 1);
			operator = 'StartsWith';
		} else if (text.startsWith('%')) {
			retVal = retVal.substr(1);
			operator = 'EndsWith';
		} else if (text == 'ISNULL') {
			retVal = '';
			operator = text;
		}

		//Sets operators dropdown.
		if (operator != null) {
			var operators = BizAPP.UI.Grid.GetOperators(el);
			$.each(operators, function (k, v) {
				if (v == operator) {
					el.find('.bza-operators').val(k);
					el.find('.filter-textbox').prop('disabled', operator == 'ISNULL');
					return false;
				}
			});
		}

		return retVal;
	},
	FilterOperatorOnChangeEvent: function (selector) {
		var filterBlock = $(selector).closest('.bza-filter-block');
		var _isNull = filterBlock.find('.bza-operators').val() == 'Is Null';
		filterBlock.find('.filter-textbox').prop('disabled', _isNull);

		if (_isNull)
			filterBlock.find('.filter-textbox').val('');
	},
	DisplayPreSelectedFilter: function (selector) {
		var th = $(selector),
			input_filter = th.closest('table').find('[onkeypress]').find('td:eq(' + $(th).index() + ')').find('input'),
			checkbox = $(selector).find('.bza-filter-checkbox:input:visible');
		checkbox.each(function () {
			if ($.inArray(this.value, input_filter.val().split(',')) > -1) {
				$(this).prop('checked', true);
			}
		});

		var plainText = BizAPP.UI.Grid.RemoveFilterOperators({ control: th, text: input_filter.val() });
		$(selector).find('.filter-textbox').val(plainText);

		if (th.find('.bza-filter-icon').length == 0 && input_filter.val().length > 0) {
			$(th).prepend('<span class="bza-filter-icon filter-icon-visible filter-icon-fa"></span>');
			$(th).css('min-width', '6em');
		}
	},
	RemoveSelectedFilter: function (btnClear) {
		var _block = $(btnClear).closest('.bza-filter-block');
		_block.find('.filter-textbox').val('');
		_block.find('[type="checkbox"]').prop('checked', false);

		//Click on the filter text box with empty value
		var th = $(btnClear).closest('th'),
			inputFilter = th.closest('table').find('[onkeypress]').find('td:eq(' + $(th).index() + ')').find('input');
		inputFilter.val('');
		inputFilter.trigger(jQuery.Event('keypress', { keyCode: 13 }));
	},
	RemoveNonAppliedFilter: function () {
		//
		var txtbox = $('.bza-dropdown.open').find('.filter-textbox'),
			input_filter = txtbox.closest('th').closest('table').find('[onkeypress]').find('td:eq(' + txtbox.closest('th').index() + ')').find('input');
		if (input_filter.val() == "") {
			txtbox.val('');
			var _block = txtbox.closest('.bza-filter-block');
			_block.find('[type="checkbox"]').prop('checked', false);
		}
	},
	ExportAsJob: function (chc, format) {
		g_callBacks.push(function (res) {
			BizAPP.UI.Toast.Notify({
				title: 'Export To Excel',
				text: 'Request to export document accepted. It will be processed shortly.',
				type: 'info'
			});
		});
		ajaxAsyncCall('HelperEx', ['ExportAsJob', chc, format], true);
	},
	ImportCallback: function () {
		console.log('BizAPP.UI.Grid.ImportCallback called.')
	},
	ShowImportExportPopup: function (title, body) {
		title = '<span>{0}</span>'.format(title);
		body = body.replace(/\[BSQ]/g, "'");
		body = body.replace(/\[BDQ]/g, '"');
		var steps = '<div><table cellspacing="0" cellpadding="0" align="Left" style="border-collapse:collapse;"><tbody><tr valign="top"><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="C" class="stepcenternormal cancelstep" onclick="zoomout();">Close</span></div></td></tr></tbody></table></div>'
		var options = { 'headline': title, 'body': body, 'steps': steps };
		var _popupMarkup = BizAPP.UI.InlinePopup.GetMarkupWithTemplate(options);

		BizAPP.UI.InlinePopup.CreateNew({
			html: _popupMarkup
		});
	},

	_stampViewParamsOnPopup: function () {
		var params = $(getSourceElement(window.event)).closest('[bza_viewparams]');
		if (params.length > 0) {
			g_callBacks.push(function (a, b, c) {
				setTimeout(function () {
					var popup = BizAPP.UI.InlinePopup.getActivePopup(false);
					if (popup)
						$(popup.tinner()).attr('bza_viewparams', params.attr('bza_viewparams'));
				}, 1000);
			});
		}
	},
	//BizAPP.UI.Grid.FormatDateTimeColumns({bizappid:'bizappid value', DateColumns:'col1,col2,col3,...'});
	FormatDateTimeColumns: function (options) {

		if (!options || typeof (moment) == 'undefined')
			return;

		var $grid = $(getElementByBizAPPId(options.bizappid));
		var colNames = options.DateColumns.split(',');
		var colSelectors = [];
		$.each(colNames, function (k, v) {
			colSelectors.push('[sortid="{0}"]'.format(v.trim()));
		});

		var $ignoreCols = $grid.find(colSelectors.join(','));
		var $cols = $grid.find('[data-type="DateTime"],[data-type="Date"]');
		var dateFormat = BizAPP.Session.__dateFormat.toLocaleUpperCase();
		$.each($cols, function (k, v) {
			if ($.inArray($(v).attr('sortid'), colNames) > -1) {
				return;
			}
			var index = $(v).index();
			$grid.find('tr[roid]').each(function () {
				var $col = $(this).find('td').eq(index);
				var colText = $col.text();
				if (colText) {
					colText = moment(colText, dateFormat + ' HH:mm:ss A').format(dateFormat);
					if (colText != "Invalid date")
						$col.text(colText);
				}
			});
		});
	}
}

BizAPP.UI.IgChart = {
	g_igChartLoading: false,
	g_igChartLoaded: false,
	g_callbacks: [],
	_initLoader: function (callback) {
		if (BizAPP.UI.IgChart.g_igChartLoading && !BizAPP.UI.IgChart.g_igChartLoaded)
			BizAPP.UI.IgChart.g_callbacks.push(callback);
		else if (!BizAPP.UI.IgChart.g_igChartLoaded && !BizAPP.UI.IgChart.g_igChartLoading) {
			BizAPP.UI.IgChart.g_igChartLoading = true;
			$.cachedScript(BizAPP.UI.GetBasePath('Resources/Javascripts/Infragistics/infragistics.core.js?v=' + __bts_)).done(function () {
				$.cachedScript(BizAPP.UI.GetBasePath('Resources/Javascripts/Infragistics/infragistics.dv.js?v=' + __bts_)).done(function () {
					BizAPP.UI.IgChart.g_igChartLoaded = true;
					callback();
					$.each(BizAPP.UI.IgChart.g_callbacks, function () { this(); });
				})
			})
		}
		else {
			callback();
		}
	},
	Create: function (data, options, type) {
		type = type || 'column';
		var container, divId;
		if (options.container == 'fromGrid') {
			var formattedData = [];
			var lookup = {};
			var result = [];

			for (var item, i = 0; item = data[i++];) {
				var label = options.axes[0].label;
				var category = item[label];
				if (!(category in lookup)) {
					lookup[category] = 1;
					result.push(category);
				}
			}

			var valuePath = [];
			var lookup2 = {};
			for (var i = 0; i < result.length; i++) {
				item = result[i];
				var myObject = new Object();
				var label = options.axes[0].label;
				myObject[label] = item;
				$.each(data, function (i, v) {
					if (v[label] == item) {
						var key = v[options.series[0].name];
						if (typeof key == 'boolean')
							key = key.toString();
						if (!key)
							key = 'Aggregate';
						myObject[key] = v.Aggregate;
						if (!(key in lookup2)) {
							lookup2[key] = 1;
							valuePath.push(key);
						}
					}
				});
				formattedData.push(myObject);
			}
			actualSeries = [];
			for (var item, i = 0; item = valuePath[i++];) {
				var myObject = new Object();
				myObject["showTooltip"] = true;
				myObject["name"] = item;
				myObject["type"] = options.series[0].type;
				myObject["title"] = item;
				myObject["xAxis"] = options.series[0].xAxis;
				myObject["yAxis"] = options.series[0].yAxis;
				myObject["valueMemberPath"] = item;
				myObject["isTransitionInEnabled"] = options.series[0].isTransitionInEnabled;
				myObject["isHighlightingEnabled"] = options.series[0].isHighlightingEnabled;
				actualSeries.push(myObject);
			}
			options["series"] = actualSeries;
			options.dataSource = formattedData;
			BizAPP.UI.IgChart._createChartInPopup(options);
		}
		else if (options.container.match("^#chartWidget")) {
			BizAPP.UI.IgChart._createWidgetChart(data, options);
		}
		else if (options.container == 'fromWidget') {
			if (data)
				options.dataSource = data;
			BizAPP.UI.IgChart._createChartInPopup(options);
		}
		else {
			options.width = "150px";
			options.height = "100px";
			options.dataSource = data;

			options.series[0].brush = BizAPP.UI.IgChart.GetRandomColor();

			container = $(options.container);
			var fnSplit = options.container.split('=');
			var chartname = $(options.container).attr('chartname');
			if (!chartname)
				chartname = fnSplit[1].substring(1, fnSplit[1].length - 2);
			else
				chartname = chartname.split(" ").join("");
			divId = "chart" + chartname;
			container.html('<div id=' + divId + '></div>');
			$('#' + divId).igDataChart(options);
		}
	},
	_createChartInPopup: function (options) {
		options.width = "600px";
		options.height = "400px";
		options["legend"] = { element: "lineLegend" };
		BizAPP.UI.IgChart.DrawChart(options.series[0].type, false, options);
	},
	_createWidgetChart: function (data, options) {
		if (data)
			options.dataSource = data;

		$.extend(options, { 'height': BizAPP.UI.widgetChartHeight, 'width': '100%' });
		var id = options.container.substring(1);
		var legendId = "lineLegend" + id;
		var containerId = "chart" + id;
		$(options.container).before('<div class="selectionOptions" bza-charttype="" bza-chartdata="" >\
            <table class="fill"><tr><td id="{1}" class="fill chartElement"></td><td id="{0}"/></tr></table></div>'.format(legendId, containerId));
		$('#' + containerId).append($(options.container));

		if (!options.series[0].valueMemberPath && options.axes[1].val)
			options.series[0].valueMemberPath = options.series[0].name = options.series[0].title = options.axes[1].val;

		var type = options.series[0].type;
		if (type == 'pie') {
			options.valueMemberPath = options.series[0].valueMemberPath;
			options.labelMemberPath = options.axes[0].label;
			options.labelsPosition = "outsideEnd";
			options.leaderLineType = "arc";
			options.labelExtent = 40;
			options.othersCategoryThreshold = 0;
			options.showTooltip = true,
				options.tooltipTemplate = "<div class='ui-chart-tooltip'><div class='bold'>${item." + options.axes[0].label + "}</div><div>Count: <label class='bold'>${item." + options.series[0].valueMemberPath + "}</label></div></div>";
			delete options.axes;
			delete options.series;
			delete options.title;
			delete options.subtitle;
			options["legend"] = { element: legendId, type: "item" };
			$(options.container).igPieChart(options);
		}
		else if (type == 'doughnut') {
			delete options.legend;
			options.series[0].dataSource = options.dataSource;
			options.series[0].labelMemberPath = options.axes[0].label;
			$(options.container).igDoughnutChart(options);
		}
		else if (type == 'funnel') {
			delete options.legend;
			options.innerLabelMemberPath = options.series[0].valueMemberPath;
			options.innerLabelVisibility = "visible";
			options.outerLabelMemberPath = options.axes[0].label;
			options.outerLabelVisibility = "visible";
			$(options.container).igFunnelChart(options);
		}
		else {
			options["legend"] = { element: legendId };
			options.axes[0].labelAngle = 90;
			$(options.container).igDataChart(options);
		}
		delete options.legend;
		BizAPP.UI.IgChart.PersistCurrentOptions(type, JSON.stringify(options));
	},
	_internalCreate: function (stropenjs, strOpts, type) {
		stropenjs += '$("#seriesType").val(\'' + type + '\');$(\'.selectionOptions[bza-charttype]\').attr(\'bza-charttype\',\'' + type + '\');$(\'.selectionOptions[bza-chartdata]\').attr(\'bza-chartdata\',\'' + strOpts + '\');setTimeout(function() { $(".tinner").css("width", "auto");}, 10);$("#seriesType").change(function (e) {BizAPP.UI.IgChart.RedrawChart($(this).val())});';
		BizAPP.UI.InlinePopup.CreateNew({
			html: '<div class="selectionOptions" bza-charttype="" bza-chartdata="" style="padding: 20px;">\
                Type:\
                <select id="seriesType" class="selectBounds">\
                    <option value="area">Area</option>\
                    <option value="column" selected="selected">Column</option>\
                    <option value="line">Line</option>\
                    <option value="splineArea">Spline Area</option>\
                    <option value="spline">Spline</option>\
                    <option value="stepArea">Step Area</option>\
                    <option value="stepLine">Step Line</option>\
                    <option value="point">Point</option>\
                    <option value="pie">Pie</option>\
                    <option value="doughnut">Doughnut</option>\
                    <option value="funnel">Funnel</option>\
                </select>\
            <table><tr><td id="chart" class="chartElement"><div id="chartGrid"></div></td><td id="lineLegend"></td></tr></table></div>', stropenjs: stropenjs
		});
	},
	Init: function (data, options, type) {
		BizAPP.UI.IgChart._initLoader(function () {
			BizAPP.UI.IgChart.Create(data, options, type);
		});
	},
	RedrawChart: function (type, fromWidget) {
		var oldType = $('.selectionOptions[bza-charttype]').attr('bza-charttype');
		var strOpts = $('.selectionOptions[bza-chartdata]').attr('bza-chartdata');
		var options = JSON.parse(strOpts);

		if (oldType == 'pie')
			$(options.container).igPieChart("destroy");
		else if (oldType == 'doughnut')
			$(options.container).igDoughnutChart("destroy");
		else if (oldType == 'funnel')
			$(options.container).igFunnelChart("destroy");
		else
			$(options.container).igDataChart("destroy");

		BizAPP.UI.IgChart.DrawChart(type, fromWidget, options);
	},
	DrawChart: function (type, fromWidget, options) {
		var stropenjs;
		if (!options.series[0].valueMemberPath && options.axes[1].val)
			options.series[0].valueMemberPath = options.series[0].name = options.series[0].title = options.axes[1].val;
		var strOpts = JSON.stringify(options);

		if (type == 'pie') {
			options.valueMemberPath = options.series[0].valueMemberPath;
			options.labelMemberPath = options.axes[0].label;
			options.labelsPosition = "outsideEnd";
			options.leaderLineType = "arc";
			options.labelExtent = 40;
			options.othersCategoryThreshold = 0;
			options.showTooltip = true,
				options.tooltipTemplate = "<div class='ui-chart-tooltip'><div class='bold'>${item." + options.axes[0].label + "}</div><div>Count: <label class='bold'>${item." + options.series[0].valueMemberPath + "}</label></div></div>";
			delete options.axes;
			delete options.series;
			delete options.title;
			delete options.subtitle;
			options["legend"] = { element: "lineLegend", type: "item" };
			stropenjs = '$("#chartGrid").igPieChart(' + JSON.stringify(options) + ');';
		}
		else if (type == 'doughnut') {
			delete options.legend;
			options.series[0].dataSource = options.dataSource;
			options.series[0].labelMemberPath = options.axes[0].label;
			stropenjs = '$("#chartGrid").igDoughnutChart(' + JSON.stringify(options) + ');';
		}
		else if (type == 'funnel') {
			delete options.legend;
			options.innerLabelMemberPath = options.series[0].valueMemberPath;
			options.innerLabelVisibility = "visible";
			options.outerLabelMemberPath = options.axes[0].label;
			options.outerLabelVisibility = "visible";
			stropenjs = '$("#chartGrid").igFunnelChart(' + JSON.stringify(options) + ');';
		}
		else {
			options["legend"] = { element: "lineLegend" };
			options.axes[0].labelAngle = 90;
			$.each(options.series, function (i, n) {
				n.type = type;
			});
			stropenjs = '$("#chartGrid").igDataChart(' + JSON.stringify(options) + ');';
		}

		if (fromWidget) {
			options.series[0].type = type;
			BizAPP.UI.IgChart._createWidgetChart(null, options);
		}
		else {
			zoomout();
			BizAPP.UI.IgChart._internalCreate(stropenjs, strOpts, type);
		}
	},
	PersistCurrentOptions: function (type, strOpts) {
		$("#seriesType").val(type);
		$('.selectionOptions[bza-charttype]').attr('bza-charttype', type).attr('bza-chartdata', strOpts);
		$("#seriesType").change(function (e) { BizAPP.UI.IgChart.RedrawChart($(this).val(), true) });
	},
	GetRandomColor: function () {
		var colors = ["#C91F37", "#C93756", "#763568", "#22A7F0", "#003171", "#7A942E", "#006442", "#F3C13A", "#F9690E", "#6C7A89"];
		return colors[Math.floor(Math.random() * (colors.length) + 1)];
	}
}

BizAPP.UI.ResponsiveGrid = {
	Init: function (selector) {
		if (isIE() == 8) return;
		BizAPP.UI.ResponsiveGrid.LoadDependency(function () {
			var $tableList = $(getElementByBizAPPId(selector)).find('table.gridcontrol');
			$tableList.each(function () {
				var $table = $(this);
				if ($table.find('thead').length == 0) {
					var $header = $table.find('tr:eq(0)');
					$table.prepend($('<thead></thead>'));
					$table.find('thead').append($header);
				}

				$table.find('th[sortid]').each(function (i) {
					var index = (i + 1 > 6) ? 6 : i + 1;
					$(this).attr('data-priority', index);
				});

				$table.addClass('tablesaw')
					.addClass('tablesaw-columntoggle')
					.attr('data-mode', 'columntoggle')
					.attr('data-mode-switch', '')
					.attr('data-minimap', '');

				$table.parent().trigger("enhance.tablesaw");
			});

			$(window).unbind('resize').bind('resize', function () {
				BizAPP.UI.ResponsiveGrid.ShowDetails();
			});
			BizAPP.UI.ResponsiveGrid.ShowDetails();
		});
	},
	ShowDetails: function () {
		$('.gridcontrol.tablesaw').each(function () {
			var table = $(this);
			var trdetail = '<tr class="row-detail" style="display: none;">\
						<td class="row-detail-cell" colspan="100"></td>\
					  </tr>',
				info = '<div class="row-detail-item" style="display:table-row;">\
								<div class="row-detail-name" style="font-weight:bold;display:table-cell;">{0}</div>\
								<div class="row-detail-value style="display:table-cell;">&nbsp;<b>:</b>&emsp;{1}</div>\
							</div>';
			var rows = table.find('tr[roid]').not('[onkeypress]');
			if (rows) {
				table.find('.row-detail').remove();
				rows.each(function () {
					var row = $(this),
						hidden_td = $(row).find('td').filter(function () { return $(this).css('display') == 'none' });
					var $td = $(row).find('td.griditemtext, td.griditemtextdisable');
					$td.find('.fa-plus,.fa-minus').remove();
					if (hidden_td.length) {
						//hide selector column to save space
						table.find('.gSel').parent().remove();
						table.find('thead th:first').remove()

						$(trdetail).insertAfter($(row));
						var $tdDetail = $(row).next().find('td');
						hidden_td.each(function () {
							var $td = $(this);
							var title = $td.closest('table').find('th:eq(' + $td.index() + ')').text(),
								value = $td.text().trim();
							$tdDetail.append(info.format(title, value));
						});

						$td.prepend('<span class="fa-plus" onclick="BizAPP.UI.ResponsiveGrid.Toggle(event);" style="font: normal normal normal 14px/1 FontAwesome;color:gray;padding:5px;"></span>')
						$tdDetail.css('padding-left', ($td.position().left - $td.closest('table').position().left + 25) + 'px');
					}
				});
			}
		});
	},
	LoadDependency: function (callback) {
		BizAPP.UI.LoadDependentFile("tablesaw.js", function (script, textStatus) {
			$.getCss(BizAPP.UI.GetBasePath('Resources/ResponsiveGrid/tablesaw.css?v=' + __bts_), function () {
				callback();
			});
			BizAPP.UI.TextEditor.LoadFontAwesomeCss();
		});
	},
	Toggle: function (e) {
		var $target = $(e.target);
		if ($target.hasClass('fa-plus')) {
			$target.removeClass('fa-plus')
				.addClass('fa-minus')
				.closest('tr').next().show();
		}
		else {
			$target.removeClass('fa-minus')
				.addClass('fa-plus')
				.closest('tr').next().hide();
		}
		e.stopPropagation();
	}
}

BizAPP.UI.Upload = {
	_imageUploaderFound: false,
	_url: null,
	_target: null,
	_callback: null,
	_validationText: '',
	g_ImgCrop: null,
	g_aspRatio: null,
	g_width: null,
	g_height: null,
	g_fileuploadOptions: '<td style="display:none;" onclick="BizAPP.UI.Upload.SwitchFileUploadMode(this,\'file\')"><i class="fa fa-arrow-circle-left" title="Back"></i></td>\
<td onclick="BizAPP.UI.Upload.SwitchFileUploadMode(this,\'ref\')"><i class="fa fa-link" title="External Link"></i></td>\
<td onclick="BizAPP.UI.Upload.ShowWebCam(event)"><i class="fa fa-camera" title="Capture"></i></td>',
	g_vimeoUpload: '<td onclick="BizAPP.UI.Upload.UploadToVimeo(event)"><i class="fa fa-vimeo" title="Upload to Vimeo"></i></td>',
	g_fileuploadExternal: '<td class="ref" style="display:none"><input class="formtextbox fill" placeholder="External Link"/></td>\
<td class="ext-upload" style="display:none" onclick="BizAPP.UI.Upload.SaveExternalLink(event)"><i class="fa fa-upload" title="Upload"></i></td><td onclick="BizAPP.UI.Upload.ShowAdvancedOptions(event)"><i class="fa fa-ellipsis-v" title="Advanced Options"></i></td>',
	SwitchFileUploadMode: function (ele, mode) {
		$(ele).toggle();
		$(ele).parent().children('[class*="uploader"],[class*="ref"],[class*="ext-upload"]').toggle();
		if (mode == 'ref')
			$(ele).prev().toggle();
		else
			$(ele).next().toggle();
	},
	InitUploadControl: function (selector, url, maxfilesize, validationText, options) {
		BizAPP.UI.TextEditor.LoadFontAwesomeCss();
		BizAPP.UI.Upload.LoadDependency(function () {
			BizAPP.UI.Upload._validationText = validationText;
			var formats = $(selector).find('[bizappid="AttachmentFileUpload"]').attr('fileformats');
			if (formats)
				formats = formats.replace(/,/g, ';');
			var uploader = $(selector).dmUploader({
				url: url,
				maxFileSize: maxfilesize,
				extFilter: formats,
				//allowedTypes: 'image/*',
				onInit: function () {
					console.log('Uploader init successfull');
					$(selector).find('.browser>table tr').prepend(BizAPP.UI.Upload.g_fileuploadOptions + (options.vimeo ? BizAPP.UI.Upload.g_vimeoUpload : ''));
					$(selector).find('.browser>table tr').append(BizAPP.UI.Upload.g_fileuploadExternal);
					if (!(BizAPP.UI.Upload.HasGetUserMedia())) {
						$(selector).find('.fa-camera').closest('td').hide();
					}
				},
				onBeforeUpload: function (id) {
					$.danidemo.updateFileStatus(id, 'default', 'Uploading...');
					return url + '&mode=file&chc=' + $(selector).closest('[id^="drag-and-drop-zone"]').attr('chc') + '&advanced=' + encodeURIComponent($(selector).closest('[id^="drag-and-drop-zone"]').attr('advanced'));
				},
				onNewFile: function (id, file) {
					if (CheckFileFormat('AttachmentFileUpload', maxfilesize)) {
						$.danidemo.addFile(selector + ' #demo-files', id, file);
						return true;
					}
					else
						return false;
				},
				onUploadProgress: function (id, percent) {
					var percentStr = percent + '%';
					$.danidemo.updateFileProgress(id, percentStr);
				},
				onUploadSuccess: function (id, data) {
					try {
						responseHandler({ value: JSON.parse(data) });
					} catch (e) {
						var response = data.split('-');
						if (response.length > 1) {
							if (response[0] != "Error") {
								var src = 'testresource.aspx?aid=' + data;
								$('.sceditor-insertimage #image').val(src);
								$.danidemo.updateFileStatus(0, 'success', 'Complete');
								$.danidemo.updateFileProgress(0, '100%');
							}
							else {
								$.danidemo.updateFileStatus(id, 'error', response[1]);
								debug(response[1], 'exception', '');
								$.danidemo.updateFileProgress(id, '95%');
							}
						}
					}
				},
				onFileTypeError: function (file) {
					alert('File \'' + file.name + '\' cannot be added: file type not allowed');
				},
				onFileSizeError: function (file) {
					if (maxfilesize / 1024 < 1024)
						displayMessage('The selected file exceeds the maximum allowed size of {0}Kb.'.format(maxfilesize / 1024));
					else
						displayMessage('The selected file exceeds the maximum allowed size of {0}Mb.'.format(maxfilesize / (1024 * 1000)));
				},
				onFileExtError: function (file) {
					displayMessage('Invalid file extension. Allowed formats are ' + formats + '.');
				},
				onUploadError: function (id, message) {
					$.danidemo.updateFileStatus(id, 'error', message);
					$.danidemo.updateFileProgress(id, '95%');
				}
			});
		});
	},
	_uploaderLoaded: 0,
	LoadDependency: function (callback) {
		if (BizAPP.UI.Upload._uploaderLoaded) {
			if (callback)
				callback();
		}
		else {
			$.getCss(BizAPP.UI.GetBasePath('resources/uploader/uploader.css?v=' + __bts_));
			$.cachedScript(BizAPP.UI.GetBasePath('resources/uploader/dmuploader.js?v=' + __bts_)).done(function (script, textStatus) {
				BizAPP.UI.Upload._uploaderLoaded = 1;
				if (callback)
					callback();
			});
		}
	},
	HasGetUserMedia: function () {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	},
	RefreshControl: function (chc, selector) {
		$.danidemo.updateFileStatus(0, 'success', 'Complete');
		$.danidemo.updateFileProgress(0, '100%');
		var $div = $(selector).closest('[id^="drag-and-drop-zone"]');
		var ctrlName = $div.closest('[bza-ctrlid]').attr('bza-ctrlid'),
			roid = $div.attr('roid');
		loadUploadControl(ctrlName, roid, chc, false)
	},
	ShowAdvancedOptions: function (e) {
		var htmlStr = '<div class="upload-advanced-options">\
		<div class="advanced-name"><div class="pq_groupbox" ><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td><span class="pq_title" style="color:black;float:left;">Name</span></td></tr></tbody></table></div>\
		<div class="pq_content"><div id="gbName" class="formgroupbox"><div class="fill"><input rows="2" cols="20" id="tbName" class="formtextbox form-control" onchange = "BizAPP.UI.Upload.SaveAdvacedOption(event);" style="width:350px;"></input></div></div></div></div>\
		<div class="pq_groupbox" processed="1"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td><span class="pq_title" style="color:black;float:left;">Description</span></td></tr></tbody></table></div>\
		<div class="pq_content"><div id="gbDescription" class="formgroupbox"><div class="fill" style="height:70px;width:385px;position:relative;"><textarea rows="2" cols="20" id="tbDescription" class="formmultilinetextbox form-control" onchange = "BizAPP.UI.Upload.SaveAdvacedOption(event);" style="height:70px;width:350px;"></textarea></div></div></div>\
		<div><table><tr><td><div class="pq_groupbox" processed="1"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td><span class="pq_title" style="color:black;float:left;">Sort Order</span></td></tr></tbody></table></div>\
		<div class="pq_content"><div id="gbSortOrder" class="formgroupbox" style="padding-left:15px;float:left;"><div class="fill"><input rows="2" cols="20" id="tbSortOrder" class="formtextbox form-control" onchange = "BizAPP.UI.Upload.SaveAdvacedOption(event);" style="width:50px;"></input></div></div></div></td>\
		<td><input type="checkbox" id="chk-viewonly" class="viewonly" onclick = "BizAPP.UI.Upload.SaveAdvacedOption(event);" name="viewonly" style="margin-left:220px;"/><span class="viewonly" style="color:black;font-weight:bold;">View Only</span></td></tr></table></div></div>'

		BizAPP.MenuPopup.Create({ html: htmlStr, selector: e.target, mode: 'open', position: 'bottom', callback: function () { BizAPP.UI.Upload.InitAdvancedOptions(e); } });
	},
	InitAdvancedOptions: function (e) {
		if ($('[class="ref"]').is(":hidden")) {
			$('.viewonly').show();
			$('.advanced-name').hide();
		}
		else {
			$('.viewonly').hide();
			$('.advanced-name').show();
		}
		var initString = $(e.target).closest('[id^="drag-and-drop-zone"]').attr('advanced');
		if (initString) {
			var splitStr = initString.split('::');
			$(e.target).find('#tbName').val(splitStr[0]);
			$(e.target).find('#tbDescription').val(splitStr[1]);
			$(e.target).find('#tbSortOrder').val(splitStr[2]);
			$(e.target).find('#chk-viewonly').prop('checked', (splitStr[3] === 'true'));
		}
		e.stopPropagation();
	},
	ShowWebCam: function (e) {
		$.cachedScript(BizAPP.UI.GetBasePath('resources/uploader/getUserMedia.js?v=' + __bts_)).done(function (script, textStatus) {
			var htmlStr = '<div class="container" style="background-color:white;"><button  id="takeSnapshot">Capture</button>\
			<table class="bza_webcam"><tr><td><div id="webcam"></div></td><td><canvas id="canvas"  height="240" width="320" style="height:240px;width:320px;"></canvas></td></tr></table></div>';
			BizAPP.MenuPopup.Create({
				html: htmlStr, selector: e.target, mode: 'open', position: 'bottom'
			});
			BizAPP.UI.Webcam.init();
			$.danidemo.updateFileProgress(0, '0%');
		});
	},
	SaveAdvacedOption: function (e) {
		var $attachment = $(e.target).closest('[id^="drag-and-drop-zone"]');
		var $name = $attachment.find('#tbName'), $desc = $attachment.find('#tbDescription'), $sortorder = $attachment.find('#tbSortOrder'), $viewOnly = $attachment.find('#chk-viewonly');
		var $uri = $attachment.find('.ref').find('input');
		$attachment.attr('advanced', ($name.length > 0 ? $name.val().trim() : '') + '::' + ($desc.length > 0 ? $desc.val().trim() : '') + '::' + ($sortorder.length > 0 ? $sortorder.val().trim() : '') + '::' + $viewOnly.is(':checked').toString() + '::' + ($uri.length > 0 ? $uri.val().trim() : ''));
	},
	SaveExternalLink: function (e) {
		BizAPP.UI.Upload.SaveAdvacedOption(e);
		var $url = BizAPP.UI.Upload.ConstructUrl(e, 'external');
		$.ajax({
			type: "POST",
			url: $url,
			data: {},
			cache: false,
			success: function (data) {
				try {
					BizAPP.UI.ProcessCallBacks(g_callBacks);
					responseHandler({ value: JSON.parse(data) });
				} catch (e) {
					if (data.split('-')[0] != "Error") {
						var chc = data.split('-')[1].trim();
						BizAPP.UI.Upload.RefreshControl(chc, e.target)
					}
				}
			},
			error: function (data, status, err) {
				$.danidemo.updateFileStatus(0, 'error', err);
			}
		});
	},
	UploadWebcamImage: function (e) {
		var $url = BizAPP.UI.Upload.ConstructUrl(e, 'webcam');
		var dto = { webcamimg: BizAPP.UI.Webcam.getImageData() }
		$.ajax({
			type: "POST",
			url: $url,
			data: dto,
			cache: false,
			success: function (data) {
				if (data.split('-')[0] != "Error") {
					customAjaxAsyncSuccess(data, 'OK', '', ''); return;
					var chc = data.split('-')[1].trim();
					BizAPP.UI.Upload.RefreshControl(chc, e.target)
				}
			},
			error: function (data, status, err) {
				$.danidemo.updateFileStatus(0, 'error', err);
			}
		});
	},
	ConstructUrl: function (e, mode) {
		var $go = $(e.target).closest('[id^="drag-and-drop-zone"]');
		var roid = '',
			field = '',
			type = $go.attr('type'),
			chc = $go.attr('chc');

		if ($go[0].hasAttribute('roid')) {
			roid = $go.attr('roid');
			field = $go.attr('field');
		}

		var $url = "Upload.asmx" + "?roid=" + roid + "&field=" + field +
			"&type=" + type + "&mode=" + mode + "&chc=" + chc + "&skipsave=true&getchc=true&advanced=" + encodeURIComponent($go.attr('advanced'));
		return $url;
	},
	RegisterDragDrop: function (target, callback, callback1, options) {
		if (!options) options = {};
		var data = { target: target, callback: callback, callback1: callback1, options: options };
		target.bind('dragenter', data, BizAPP.UI.Upload.EnableImageUploader).bind('dragover', data, BizAPP.UI.Upload.EnableImageUploader).bind('drop', data, BizAPP.UI.Upload.EnableImageUploader);
		$(target).triggerHandler('dragenter', data)
	},
	EnableImageUploader: function (e) {
		if (e.data.callback1)
			e.data.callback1(e.originalEvent);

		if (e.originalEvent) {
			e.originalEvent.stopPropagation();
			e.originalEvent.preventDefault();
		}

		var $target = $(e.data.target);
		var clsImageUploaderEnabled = 'imageUploaderEnabled';
		var addImageUploader = !($target.hasClass(clsImageUploaderEnabled));
		if (!BizAPP.UI.Upload._imageUploaderFound || addImageUploader) {

			$target.addClass(clsImageUploaderEnabled);
			var roid = '', field = '', atype = '',
				skipsave = e.data.target.attr('skipsave');
			if (e.data.target[0].hasAttribute('roid')) {
				roid = e.data.target.attr('roid');
				field = e.data.target.attr('field');
			}
			else if (e.data.target[0].hasAttribute('atype'))
				atype = e.data.target.attr('atype');

			var url = e.data.options.url ? e.data.options.url : location.href.toLowerCase();
			if (url.indexOf('enterpriseview.aspx') != -1)
				url = url.split('enterpriseview.aspx')[0];
			else if (url.indexOf('testview.aspx') != -1)
				url = url.split('testview.aspx')[0];
			else
				url = url.split('viewdetails.aspx')[0];

			BizAPP.UI.Upload._url = url + 'upload.asmx?roid=' + roid + '&field=' + field + '&atype=' + atype + '&type=' + e.data.target.attr('type') + '&skipsave=' + skipsave + '&mode=file&advanced=' + encodeURIComponent('::::0::false::');

			BizAPP.UI.Upload.LoadDependency(function () {
				e.data.target.dmUploader({
					url: BizAPP.UI.Upload._url,
					maxFileSize: '0',
					extFilter: '',
					onInit: function () {
						BizAPP.UI.Upload._imageUploaderFound = true;
					},
					onBeforeUpload: function (id) {
						ProcessingStatus(true, true);
						return BizAPP.UI.Upload._url;
					},
					onNewFile: function (id, file) {
						return true;
					},
					onUploadSuccess: function (id, data, file) {
						var response = data.split('-');
						if (!(response.length > 1)) {
							if (e.data.callback)
								e.data.callback(response, $(e.data.target), file);
						}
						console.log(data);
						BizAPP.UI.Upload._imageUploaderFound = false;
						ProcessingStatus(false, true);
					}
				});
			});
		}
	},
	ImgCtrlInit: function (ctrlid, newControl) {
		var $attach;
		if (newControl) {
			$attach = $('div[bza-ctrlid="' + ctrlid + '"]').find('input[onclick*="bizapp_initDwnld"]');
		}
		else {
			$attach = $('[id*="' + ctrlid + '_frame"]').contents().find('input[onclick*="bizapp_initDwnld"]');
		}
		if ($attach.length != 0) {
			var onclick = $attach.attr('onclick'),
				aid = onclick.split('runtimeobjectid[NVS]')[1].split('[PMS]')[0];
			aid = aid.split("'")[0];
		}

		if (aid) {
			var $crop;
			var $position;
			if (newControl) {
				var $crop = $('<td><input type="submit" class="formbutton" value="Crop"></td>');
				$position = $('div[bza-ctrlid="' + ctrlid + '"]').find('[value="Remove"]').closest('tr');
			}
			else {
				var $crop = $('<input type="button" class="formbutton" value="Crop">');
				$crop.css({
					'border': '2px outset buttonface',
					'border-color': '#d0cbef',
					'border-bottom': 'solid 1px #5c5d61'
				});
				$position = $('[id*="' + ctrlid + '_frame"]').contents().find('body [value="Remove"]').parent().next();
			}
			$position.append($crop);
			$crop.find('[value="Crop"]').attr('onclick', 'BizAPP.UI.Upload.startCropping(\'' + aid + '\', 200, 200);');
		}
	},

	startCropping: function (aIdentifier, width, height) {
		BizAPP.UI.LoadScript({
			eid: 'EAppPoint1856e7',
			callback: function () {
				BizAPP.UI.LoadTheme({
					eid: 'EAppPoint1856db',
					callback: function () {
						var inlinepopupoptions = {
							width: 700,
							stropenjs: "BizAPP.UI.Upload.Init('" + aIdentifier + "');",
							strclosejs: "BizAPP.UI.Upload.g_ImgCrop.remove();"
						};
						BizAPP.UI.Upload.g_aspRatio = (width / height) + ':1';
						BizAPP.UI.Upload.g_width = width;
						BizAPP.UI.Upload.g_height = height;
						PQube.View.LoadView({
							vieweid: 'EAppPoint1856eb',
							inlinePopup: true,
							inlinepopupoptions: inlinepopupoptions,
							target: 'dummy'
						});
					}
				})
			}
		});
	},
	Init: function (aIdentifier) {
		if (!aIdentifier) {
			throw 'Attachment Identifier not specified.';
			return;
		}
		if (isIE() == 8) {
			var img = $('.ImgCrop #photo');
			img.removeAttr('width');
			img.attr('min-width', '300px');
		}
		$('.ImgCrop #photo').attr('aid', aIdentifier);
		$('.ImgCrop #photo').attr('src', 'download.asmx?aid=' + aIdentifier + '&bza-transmit=1');
		$('.ImgCrop #preview img').attr('src', 'download.asmx?aid=' + aIdentifier + '&bza-transmit=1');
		var wdt = (150 * (BizAPP.UI.Upload.g_width / BizAPP.UI.Upload.g_height)) + 'px';
		$('.ImgCrop #preview img').css({
			'height': '150px',
			'width': wdt,
			'max-width': 'none'
		});
		$('.ImgCrop #preview').css({
			'height': '150px',
			'width': wdt
		});
		$('.ImgCrop #preview').parent().css({
			'height': '150px',
			'width': wdt
		});

		BizAPP.UI.Upload.g_ImgCrop = $('.ImgCrop #photo').imgAreaSelect({
			handles: true,
			onSelectChange: BizAPP.UI.Upload._preview,
			instance: true/*,
                                                                aspectRatio : BizAPP.UI.Upload.g_aspRatio*/
		});

		PQube.ImageCrop.g_ImgCrop = BizAPP.UI.Upload.g_ImgCrop;
		PQube.ImageCrop.g_aspRatio = BizAPP.UI.Upload.g_aspRatio;
		PQube.ImageCrop.g_width = BizAPP.UI.Upload.g_width;
		PQube.ImageCrop.g_height = BizAPP.UI.Upload.g_height;
	},
	_preview: function (img, selection) {
		var co = BizAPP.UI.Upload.g_ImgCrop.getSelection();

		if (!selection.width || !selection.height)
			return;
		//console.log('abc');
		var scaleX = (150 * (BizAPP.UI.Upload.g_width / BizAPP.UI.Upload.g_height)) / selection.width;
		var scaleY = 150 / selection.height;

		$('.ImgCrop #preview img').css({
			width: Math.round(scaleX * 300),
			height: Math.round(scaleY * img.height),
			marginLeft: -Math.round(scaleX * selection.x1),
			marginTop: -Math.round(scaleY * selection.y1)
		});
	},
	getCoordinates: function () {
		var a = BizAPP.UI.Upload.g_ImgCrop.getSelection(),
			scalex = $('.ImgCrop #photo')[0].naturalWidth / $('.ImgCrop #photo').width(),
			scaley = $('.ImgCrop #photo')[0].naturalHeight / $('.ImgCrop #photo').height();
		g_callBacks.push(zoomout);
		BizAPP.RuntimeObject.SetFieldValue({
			roid: $('.ImgCrop #photo').attr('aid'),
			fieldName: "Extras",
			fieldValue: Math.round(a.x1 * scalex * 100) / 100 + ',' + Math.round(a.y1 * scaley * 100) / 100 + ',' + Math.round(a.x2 * scalex * 100) / 100 + ',' + Math.round(a.y2 * scaley * 100) / 100
		});
	},

	UploadToVimeo: function () {
		$('.fa-ellipsis-v').click();
		BizAPP.UI.LoadView({ inlinePopup: true, url: "uiview.asmx?html.jar=true&html.args=runtimeviewenterpriseid[NVS]ESystemb4e69" });
	},
	GetVimeoUploadParams: function (callback) {
		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetVimeoUploadKey'], false,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				if (callback)
					callback(data);
			});
	},
	CompleteVimeoUpload: function (options, callback) {
		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['CompleteVimeoUpload', options.complete_url, options.name, options.description], false,
			function (data, textStatus, jqXHR) {
				data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
				if (callback)
					callback(data);
			});
	},
	SaveVimeo: function (options) {
		$('.fa-ellipsis-v').click();
		$('.fa-link').click();
		$('.ref').find('input').val(options.url);
		$('#tbName').val(options.name);
		$('#tbDescription').val(options.description);
		g_callBacks.push(zoomout);
		$('.ext-upload').click();
	}
}

BizAPP.UI.Webcam = {
	localStream: null,
	init: function () {
		if (!!this.options) {

			this.pos = 0;
			this.cam = null;
			this.filter_on = false;
			this.filter_id = 0;
			this.canvas = document.getElementById("canvas");
			this.ctx = this.canvas.getContext("2d");
			this.img = new Image();
			this.ctx.clearRect(0, 0, this.options.width, this.options.height);
			this.image = this.ctx.getImageData(0, 0, this.options.width, this.options.height);
			this.snapshotBtn = document.getElementById('takeSnapshot');

			// Initialize getUserMedia with options
			getUserMedia(this.options, this.success, this.deviceError);

			// Initialize webcam options for fallback
			window.webcam = this.options;

			// Trigger a snapshot
			this.addEvent('click', this.snapshotBtn, this.getSnapshot);

		} else {
			alert('No options were supplied to the shim!');
		}
	},
	addEvent: function (type, obj, fn) {
		if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn] = function () {
				obj['e' + type + fn](window.event);
			}
			obj.attachEvent('on' + type, obj[type + fn]);
		} else {
			obj.addEventListener(type, fn, false);
		}
	},

	options: {
		"audio": false, //OTHERWISE FF nightlxy throws an NOT IMPLEMENTED error
		"video": true,
		el: "webcam",

		extern: null,
		append: true,

		width: 320,
		height: 240,

		mode: "callback",
		// callback | save | stream
		swffile: "lib/dist/fallback/jscam_canvas_only.swf",
		quality: 85,
		context: "",

		debug: function () { },
		onCapture: function () {
			window.webcam.save();
		},
		onTick: function () { },
		onSave: function (data) {

			var col = data.split(";"),
				img = BizAPP.UI.Webcam.image,
				tmp = null,
				w = this.width,
				h = this.height;

			for (var i = 0; i < w; i++) {
				tmp = parseInt(col[i], 10);
				img.data[BizAPP.UI.Webcam.pos + 0] = (tmp >> 16) & 0xff;
				img.data[BizAPP.UI.Webcam.pos + 1] = (tmp >> 8) & 0xff;
				img.data[BizAPP.UI.Webcam.pos + 2] = tmp & 0xff;
				img.data[BizAPP.UI.Webcam.pos + 3] = 0xff;
				BizAPP.UI.Webcam.pos += 4;
			}

			if (BizAPP.UI.Webcam.pos >= 4 * w * h) {
				BizAPP.UI.Webcam.ctx.putImageData(img, 0, 0);
				BizAPP.UI.Webcam.pos = 0;
			}

		},
		onLoad: function () { }
	},

	success: function (stream) {
		if (BizAPP.UI.Webcam.options.context === 'webrtc') {
			var video = BizAPP.UI.Webcam.options.videoEl;
			video.srcObject = stream;
			video.onloadedmetadata = function (e) {
				video.play();
			};
		} else {
			// flash context
		}

		//Keep a reference to close later
		BizAPP.UI.Webcam.localStream = stream;
	},

	deviceError: function (error) {
		alert('No camera available.');
		console.error('An error occurred: [CODE ' + error.code + ']');
	},

	changeFilter: function () {
		if (this.filter_on) {
			this.filter_id = (this.filter_id + 1) & 7;
		}
	},

	getSnapshot: function () {
		// If the current context is WebRTC/getUserMedia (something
		// passed back from the shim to avoid doing further feature
		// detection), we handle getting video/images for our canvas 
		// from our HTML5 <video> element.
		if (BizAPP.UI.Webcam.options.context === 'webrtc') {
			var video = document.getElementsByTagName('video')[0];
			BizAPP.UI.Webcam.canvas.width = video.videoWidth;
			BizAPP.UI.Webcam.canvas.height = video.videoHeight;
			BizAPP.UI.Webcam.canvas.getContext('2d').drawImage(video, 0, 0);
			BizAPP.UI.Upload.UploadWebcamImage(event);
			// Otherwise, if the context is Flash, we ask the shim to
			// directly call window.webcam, where our shim is located
			// and ask it to capture for us.
		} else if (BizAPP.UI.Webcam.options.context === 'flash') {

			window.webcam.capture();
			BizAPP.UI.Webcam.changeFilter();
			BizAPP.UI.Upload.UploadWebcamImage(event);
		}
		else {
			alert('No context was supplied to getSnapshot()');
		}
	},
	getImageData: function () {
		var canvas = document.getElementById("canvas");
		return canvas.toDataURL();

	},
	stop: function () {
		if (BizAPP.UI.Webcam.localStream != null)
			BizAPP.UI.Webcam.localStream.stop();
	}
}

BizAPP.UI.JsonEditor = {
	json1: {
		"height": "100%",
		"width": "100%",
		"dataSource": "",
		"title": "",
		"axes": [{ "title": null, "type": "categoryX", "label": "Status", "name": "NameAxis" }, { "title": "", "minimumValue": 0, "type": "numericY", "name": "PopulationAxis" }],
		"subtitle": "",
		"series": [{ "xAxis": "NameAxis", "yAxis": "PopulationAxis", "valueMemberPath": "Aggregate", "thickness": 5, "isTransitionInEnabled": true, "type": "column", "name": "Issues", "title": "Issues", "isHighlightingEnabled": true }],
		"container": "fromWidget"
	},
	json: '',
	selector: null,
	_html: '<div id="json-editor"><ul class="tbar">\
	<li id="vctab2" page="vcpage2" class="tbn tbact" onclick="BizAPP.UI.JsonEditor.ToggleActiveTab(this.id);">Editor</li>\
	<li id="vctab1" page="vcpage1" class="tbn" onclick="BizAPP.UI.JsonEditor.ToggleActiveTab(this.id);">JSON</li></ul>\
	<div id="vcpage1" rettab="true" class="tp"><div class="editor" style=""></div></div>\
	<div id="vcpage2" rettab="true" class="tp"><div class="json-string" style="">\
	<div id="editor" class="json-editor"></div></div></div>',
	Init: function (selector, callback) {
		BizAPP.UI.JsonEditor.selector = getElementByBizAPPId(selector, "input");
		var ctrl = $(getElementByBizAPPId(selector, "input"));
		ctrl.after(BizAPP.UI.JsonEditor._html);
		BizAPP.UI.JsonEditor.LoadDependency(function () {
			$('#vcpage1').append(ctrl);
			$('#editor').css('height', ctrl.css('height'));
			$('#editor').css('overflow-y', 'auto');
			BizAPP.UI.JsonEditor.ToggleActiveTab('vctab2');
			var val = $(BizAPP.UI.JsonEditor.selector).val();
			if (val) {
				try { BizAPP.UI.JsonEditor.json = JSON.parse(val); }
				catch (e) { alert('Error in parsing json. ' + e); }
			}
			$(document).ready(function () {
				$('#rest > button').click(function () {
					var url = $('#rest-url').val();
					$.ajax({
						url: url,
						dataType: 'jsonp',
						jsonp: $('#rest-callback').val(),
						success: function (data) {
							BizAPP.UI.JsonEditor.json = data;
							$('#editor').jsonEditor(BizAPP.UI.JsonEditor.json, { change: BizAPP.UI.JsonEditor.updateJSON, propertyclick: BizAPP.UI.JsonEditor.showPath });
							BizAPP.UI.JsonEditor.printJSON();
						},
						error: function () {
							alert('Something went wrong, double-check the URL and callback parameter.');
						}
					});
				});

				$(BizAPP.UI.JsonEditor.selector).change(function () {
					var val = $(BizAPP.UI.JsonEditor.selector).val();
					if (val) {
						try { BizAPP.UI.JsonEditor.json = JSON.parse(val); }
						catch (e) { alert('Error in parsing json. ' + e); }
					} else {
						BizAPP.UI.JsonEditor.json = {};
					}
					$('#editor').jsonEditor(BizAPP.UI.JsonEditor.json, { change: BizAPP.UI.JsonEditor.updateJSON, propertyclick: BizAPP.UI.JsonEditor.showPath });
				});

				BizAPP.UI.JsonEditor.printJSON(1);
				$('#editor').jsonEditor(BizAPP.UI.JsonEditor.json, { change: BizAPP.UI.JsonEditor.updateJSON, propertyclick: BizAPP.UI.JsonEditor.showPath });
				BizAPP.UI.JsonEditor.expandAll();
				$('.expander').click(function () {
					var $this = $(this);
					if ($this.hasClass('fa-minus'))
						$this.removeClass('fa-minus').addClass('fa-plus');
					else
						$this.removeClass('fa-plus').addClass('fa-minus');
				});
				if (callback)
					callback();
			});
		});
	},
	expandAll: function () {
		$('.array,.object').addClass('expanded');
		$('.expander').closest('.expanded').each(function () {
			var $this = $(this).find('.expander').first();
			$this.removeClass('fa-plus').addClass('fa-minus');
		});
	},
	updateJSON: function (data) {
		BizAPP.UI.JsonEditor.json = data;
		BizAPP.UI.JsonEditor.printJSON();
	},
	printJSON: function (a) {
		var $tb = $(BizAPP.UI.JsonEditor.selector);
		$tb.val(JSON.stringify(BizAPP.UI.JsonEditor.json, null, "\t"));
		if (!a)
			$tb.change();
	},
	showPath1: function () {
		$('#path').text(path);
	},
	ToggleActiveTab: function (id) {
		var pageToHide = $('#json-editor').find('.tbact').attr('page');
		$('#json-editor').find('#' + pageToHide).hide();
		$('#json-editor').find('.tbact').removeClass('tbact');

		var pageName = $('#' + id).attr('page');
		$('#json-editor').find('#' + pageName).show();
		$('#json-editor').find('#' + id).addClass('tbact');

		BizAPP.UI.JsonEditor.expandAll();
		$(BizAPP.UI.JsonEditor.selector).css('top', '30px');
	},
	LoadDependency: function (callback) {
		$.cachedScript(BizAPP.UI.GetBasePath('Resources/JsonEditor/jquery.jsoneditor.min.js')).done(function (script, textStatus) {
			$.getCss(BizAPP.UI.GetBasePath('Resources/JsonEditor/jsoneditor.css'));
			BizAPP.UI.TextEditor.LoadFontAwesomeCss();
			setTimeout(callback, 10);
		});
	}
}

BizAPP.UI.TagEditor = {
	Init: function (selector, readonly) {
		var $control = $(getElementByBizAPPId(selector, "input"));
		$control.css('display', 'block').removeData('options').next('.tag-editor').remove();
		BizAPP.UI.TagEditor.LoadDependency(function () {
			$control.tagEditor({
				initialTags: [],
				readOnly: readonly,
				autocomplete: {
					minLength: 0,
					source: function (request, response) {
						var formId = $control.closest('.form').attr('bizapp_eid');
						if (!$control || $control.length == 0)
							return;
						realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetAutoCompleteResults', $control.closest('[bizapp_context]').attr('bizapp_context').split('\n')[0], request.term, formId, $control.attr('bza-ctrlid')], false,
							function (data, textStatus, jqXHR) {
								data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
								var a = $.map(JSON.parse(data[1]), function (item) {
									return { value: item.value || item.Value, label: item.autocompletelabel || item.label || item.value || item.Value };
								});
								response(a);
							});
					},
					select: function (event, ui) {
						if (event) {
							if (event.preventDefault)
								event.preventDefault();
							else
								event.returnValue = false;
						}
						this.value = ui.item.label;
						$control.val(ui.item.value);

						if ($control[0].hasAttribute('bza-tagappend'))
							$control.val($control.attr('bza-tagappend') + '[SEP]' + ui.item.value);

						g_activeCtrl = $control.attr('bizappid');
						$control.change();
					}
				},
				forceLowercase: false,
				//placeholder: 'Programming languages ...',
				onChange: function (field, editor, tags, tag_ids, delId) {
					if (delId) {
						var tag = new Object();
						$.each(tags, function (i, v) {
							tag[v] = v;
						});
						$control.attr('bza-tag', JSON.stringify(tag));
						$control.attr('bza-tagappend', tags.join('[SEP]'));
						var roid = $control.closest('[bizapp_name]').attr('bizapp_context').split('\n')[0];
						var fieldName = $control.attr('bza-fieldname');
						assignFieldValue(roid, fieldName, delId, false, false, true);
					}
				},
				beforeTagSave: function (field, editor, tags, tag, val) {
					try { editor.find('div.active').closest('li').remove(); } catch (e) { }
				},
				beforeTagDelete: function (field, editor, tags, val) {
				}
			});
			if (g_activeCtrl) {
				$('[bizappid="' + g_activeCtrl + '"]').next().click();
				g_activeCtrl = null;
			}
			$('.tag-editor').attr('style', $control.attr('style')).show().addClass('formtextbox');
			if (typeof (BizAPP.Bootstrap) != 'undefined') $('.tag-editor').addClass('form-control');
			$('.tag-editor').css('height', $control.css('height')).css('min-width', $control.css('width')).css('width', 'auto').css('overflow', 'auto');
		});
	},
	LoadDependency: function (callback) {
		$.cachedScript(BizAPP.UI.GetBasePath('Resources/TagEditor/jquery.tag-editor.js')).done(function (script, textStatus) {
			$.getCss(BizAPP.UI.GetBasePath('Resources/TagEditor/jquery.tag-editor.css'));
			setTimeout(callback, 10);
		});
	}
}

BizAPP.UI.Localization = {
	NoRecordsSelected: 'No records selected',
	NoFileTAttach: 'Select a file to upload'
}
BizAPP.MenuPopup = {
	_template: '<i class="bza-dropdown dropdown-toggle {1}" data-toggle="toggle">{3}\
                            <div class="dropdown-menu {2}" onclick="BizAPP.MenuPopup.SuppressEvent(event)">\
			                    {0}<div class="bza-caret {2}"><i></i></div>\
                            </div>\
                        </i>',
	Create: function (option) {
		if (!option.selector) {
			$('body').append($(BizAPP.MenuPopup._template.format(option.html, option.mode, option.position, '')));
			return;
		} else if ($(option.selector).find('.bza-dropdown').length) {
			return;
		}

		option = $.extend({
			position: ''
		}, option || {});

		if (option.autodeleteonclose)
			option.position += ' bza-autoclose';

		var type = option.type || $(option.selector)[0].tagName.toLowerCase();
		switch (type) {
			case 'input':
			case 'textarea':
			case 'img':
				{
					if ($(option.selector).next().hasClass('bza-dropdown')) {
						return;
					}
					$($(BizAPP.MenuPopup._template.format(option.html, option.mode, option.position, ''))).insertAfter($(option.selector));
					var _pos = BizAPP.MenuPopup._findPos($(option.selector));

					var popup = $(option.selector).next().find('.dropdown-menu');
					if (option.position.indexOf('pleft') != -1)
						_pos.left -= (popup.width() - 30);

					popup.css({ left: _pos.left + 'px', top: _pos.top + 'px', right: 'inherit', position: 'fixed' });
					break;
				}
			default:
				{
					//Set text empty
					var txt = $(option.selector).html();
					$(option.selector).text('');

					$(option.selector).append($(BizAPP.MenuPopup._template.format(option.html, option.mode, option.position, txt)));
					$(option.selector).css({ position: 'relative' });

					$(option.selector).on('click', function (e) {
						e.stopPropagation();
						BizAPP.UI.Grid.RemoveNonAppliedFilter();
						$('.bza-dropdown').removeClass('open');
						$(this).find(".bza-dropdown").toggleClass('open');
						if (typeof (option.callback) != 'undefined')
							option.callback();
					});
				}
		}

		if (typeof (option.callback) != 'undefined')
			option.callback();
	},
	_findPos: function (obj) {
		var pos = $(obj).offset();
		pos.top += obj[0].offsetHeight;

		return {
			left: pos.left - Math.floor($(window).scrollLeft()),
			top: pos.top - Math.floor($(window).scrollTop())
		};
	},
	HideOrRemovePopup: function () {
		$('.bza-dropdown').each(function () {
			if ($(this).find('.bza-autoclose').length > 0) {
				$(this).parent().append($(this).children()[0]);
				$(this).remove();
			}
		});
		// Remove popup for input type elements...create new one always

		$('input ~ .bza-dropdown').remove();
		$('textarea ~ .bza-dropdown').remove();
		$('.bza-dropdown').removeClass('open');
	},
	SuppressEvent: function (e) {
		e.stopPropagation();
	}
}

BizAPP.UI.TileManager = {
	Init: function (options) {
		BizAPP.UI.LoadInfragistics(function () {
			options = $.extend(options || {}, {
				columnWidth: '25%',
				marginLeft: 10,
				marginTop: 10
			});

			$(options.selector).igTileManager(options);
		});
	}
}

BizAPP.UI.Image = {
	_target: null,
	Init: function (controlId, roid, field) {
		var $image = $('[bza-ctrlid="' + controlId + '"]');
		BizAPP.UI.Image._target = $image.wrap('<div id="container' + controlId + '" roid="' + roid + '" field="' + field + '"></div>').parent();
		BizAPP.UI.Upload.RegisterDragDrop(BizAPP.UI.Image._target, function (aid) {
			BizAPP.UI.Image._target.find('img').attr('src', 'testresource.aspx?aid=' + aid);
		});
	}
}

BizAPP.UI.OAuth = {
	prefetchState: null,
	PreFetch: function (baseUrl, callback) {
		if (BizAPP.UI.OAuth.prefetchState == 'done')
			callback();

		BizAPP.UI.OAuth.prefetchState = 'started';
		$.get(baseUrl + "/resources/javascripts/jquery/jquery.js", function () { }, "text").done(function () {
			$.get(baseUrl + "/oauthproviderhost.html?v=" + __bts_).done(function () {
				BizAPP.UI.OAuth.prefetchState = 'done';
				$('#bizappoauthiframe').remove();
				$('body').append('<iframe style="height:1px;width:1px" id="bizappoauthiframe" src="' + baseUrl + '/oauthproviderhost.html?v=' + __bts_ + '"></iframe>');
				setTimeout(callback, 500);
			})
		});
	},
	StartPrefetch: function (baseUrl) {
		BizAPP.UI.OAuth.PreFetch(baseUrl, function () {
			ProcessingStatus(true, true);

			window.addEventListener('message', function (e) {
				if (e.data.intent == 'bizappoauth') {
					if (e.data.success == 0) {
						ProcessingStatus(false, true);
						if (e.data.error == 'invalid_grant')
							displayExceptions('Invalid username or password', '');
						BizAPP.UI.ProcessCallBacks(g_callBacks);
						$('.loginContainer').show();
					}
					else if (e.data.success) {
						if (e.data.token) {
							var args = { registry: '', enterprise: '', provider: '', UserName: '', Password: '', logouturl: '', domain: '', token: e.data.token };
							BizAPP.UI.OAuth.Login1(args, baseUrl);
						}
						else
							customAjaxAsyncSuccess(JSON.stringify(e.data.d), 'OK');
					}
				}
			});

			var args = { registry: '', enterprise: '', provider: '', UserName: '', Password: '', logouturl: '', domain: '' };
			BizAPP.UI.OAuth.Login(baseUrl, '', args);
		});
	},
	Login: function (baseUrl, msg, args) {
		$('#bizappoauthiframe')[0].contentWindow.postMessage({ intent: 'bizappoauth', msg: msg, args: args }, baseUrl);
	},
	Login1: function (args, baseUrl) {
		var ajaxParams = {
			type: 'POST',
			url: 'silverlightdataaccess.asmx/jsonajaxcall',
			dataType: 'text',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				'type': 'CredentialsEx',
				'enterpriseName': '',
				'sessionId': '',
				'args': ['LoginWithOauthToken', args.registry, args.enterprise, args.provider, args.token, args.logouturl],
				'id': 1
			})
		};

		realAjaxAsyncCall('CredentialsEx', getNextRequestId(), ['LoginWithOauthToken', args.registry, args.enterprise, args.provider, args.token, args.logouturl], true, function (a, b, c) {
			var response = BizAPP.UI._handleEventsAndExceptions(a, b, c);
			if (a.value[3]) {
				BizAPP.UI.OAuth.Logout(function () { });
				BizAPP.UI.ProcessCallBacks(g_callBacks);
				$('.loginContainer').show();
			}
			else
				localStorage.setItem('bizapp_oauthhost', baseUrl);
		});
	},
	Logout: function (callback) {
		var baseUrl = localStorage.getItem('bizapp_oauthhost');
		if (!baseUrl) { callback(); return; }
		BizAPP.UI.OAuth.PreFetch(baseUrl, function () {
			$('#bizappoauthiframe')[0].contentWindow.postMessage({ intent: 'bizappoauth', msg: 'clear' }, baseUrl);
			callback();
		});

		localStorage.removeItem('bizapp_oauthhost');
	}
}

BizAPP.UI.User = {
	DisplayOpenAuthProviders: function (e) {
		var htmlStr = '<iframe src="container.aspx?mode=oauth&callbackurl=' + encodeURIComponent(window.parent.location.href) + '" style="height:40px;width:180px;border:0;"></iframe>';
		BizAPP.MenuPopup.Create({
			html: htmlStr, selector: $(e.target).closest('.bza-lnk-map-user').closest('td'), mode: 'open', position: 'bottom', callback: function () {
				e.stopPropagation();
			}
		});
	},
	RequestOAuth: function (url, callback) {
		window.onmessage = function (e) {
			zoomout();
			ProcessingStatus(true, true);

			if (callback)
				realAjaxAsyncCall('CredentialsEx', getNextRequestId(), ['ProcessProviderResult', e.data, BizAPP.UI.User.GetNavUrl(BizAPP.UI.User.GetLoginUrl(true))], true, function () {
					if (callback)
						callback();
				});
			else {
				if (loginusingbizappoauth.toLowerCase() == 'true') {
					$('.loginContainer').hide();
					BizAPP.UI.OAuth.StartPrefetch(oAuthHostUrl);
				}
				else
					ajaxAsyncCall('CredentialsEx', ['ProcessProviderResult', e.data, BizAPP.UI.User.GetNavUrl(BizAPP.UI.User.GetLoginUrl(true))]);
			}
		};
		window.open(url + '&v=' + new Date().getTime(), "oauth", "scrollbars=yes,resizable=yes,top=50,left=450,width=500,height=600");
		return false;
	},
	GetLoginUrl: function (encode) {
		var loginUrl = (window.location != window.parent.location)
			? document.referrer
			: document.location.href;

		try {
			loginUrl = loginUrl.replace('html.navurl=' + loginUrl.split('html.navurl=')[1].split('&')[0], '')
		} catch (e) { }

		return encode ? encodeURIComponent(loginUrl) : loginUrl;
	},
	GetNavUrl: function (loginUrl) {
		var qs = window.location.search.substring(1), navurl = '';
		qs.split('?');
		if (qs) {
			qs = qs.split('html.navurl=');
			if (qs.length > 1) {
				navurl = qs[1].split('&')[0];
			}
		}

		if (!navurl && window.localStorage)
			navurl = localStorage.getItem('html.navurl');

		if (!navurl)
			navurl = 'enterpriseview.aspx?html.logout=' + loginUrl;
		else if (navurl.indexOf('html.logout') == -1)
			navurl += (decodeURIComponent(navurl).indexOf('?') == -1 ? '?' : '&') + 'html.logout=' + loginUrl;

		return navurl;
	},
	GetAddress: function (callback) {
    	/*$.cachedScript('https://cdnjs.cloudflare.com/ajax/libs/geolocator/2.1.1/geolocator.min.js').done(function () {
    		geolocator.config({
    			language: "en",
    			google: {
    				version: "3",
    				key: "AIzaSyC6-AJMzxalcepy-mIvuV2yTRIN6uXG6-I"
    			}
    		});
    		geolocator.locate({
    			fallbackToIP: true,
    			addressLookup: true,
    		}, function (a, b) {
    			console.log(b.formattedAddress)
    		})
		})*/

		$.get('http://api.ipstack.com/check?access_key=d4598765c739e9fa09f284283dcb7d7d', function (a) {
			console.log(a);
			callback(a);
		})
	}
}

BizAPP.UI.Scheduler = {
	OptionsHTML: '<div class="scheduler-list-options popup-container" onclick="BizAPP.UI.Scheduler.ListOptions(event);">Options <i class="fa fa-sort-desc scheduler-option-icon"></i></div>',
	listOptionTemplate: '<div class="scheduler-list-options"><div class="scheduler-fldiv scheduler-day-view" onclick="BizAPP.UI.Scheduler.SelectOption(\'DayView\');"><span class="fa-stack fa-1x"><i class="fa fa-calendar-o"></i><span class="fa-stack-1x calendar-text">1</span></span>Day View</div>\
                        <div class="scheduler-fldiv scheduler-week-view" onclick="BizAPP.UI.Scheduler.SelectOption(\'WeekView\');"><span class="fa-stack fa-1x"><i class="fa fa-calendar-o"></i><span class="fa-stack-1x calendar-text">7</span></span>Week View</div>\
                        <div class="scheduler-fldiv scheduler-month-view" onclick="BizAPP.UI.Scheduler.SelectOption(\'MonthView\');"><span class="fa-stack fa-1x"><i class="fa fa-calendar-o"></i><span class="fa-stack-1x calendar-text">30</span></span>Month View</div>\
                        <div class="flsep scheduler-flsep"></div>{0}<div class="flsep scheduler-flsep"></div><div class="scheduler-fldiv scheduler-current-user" onclick="BizAPP.UI.Scheduler.SelectOption(\'CurrentUser\');"><i class="fa fa-user scheduler-user-icon"></i>&nbsp; Current User</div>\
                        <div class="scheduler-fldiv scheduler-all-users" onclick="BizAPP.UI.Scheduler.SelectOption(\'AllUsers\');"><i class="fa fa-users scheduler-users-icon"></i>&nbsp; All Users</div></div>',
	CreateUI: function () {
		$('.sccontrolscontainer').closest('tr').hide();
		if (!$('.scsecondcontrolstablecell').length)
			$('<tr valign="top"><td style="height:30px;"><table class="scsecondcontrolstable" cellspacing="0" cellpadding="0" style="border-color:Black;border-width:1px;border-style:Solid;border-collapse:collapse;"><tbody><tr valign="top" class="scheduler-legend-row"><td class="scsecondcontrolstablecell"></td><td style="width:5px;"></td></tr></tbody></table></td></tr>').insertAfter($('.sccontrolscontainer').closest('tr').next());
		$('.scsecondcontrolstablecell').append(BizAPP.UI.Scheduler.OptionsHTML);
		$('td.scsecondcontrolstablecell').closest('tr').addClass('scheduler-legend-row');
	},
	ListOptions: function (e) {
		var multiQueryTemplate = '';
		var multiQuerySubTemplate = '<div class="scheduler-fldiv scheduler-qry" onclick="BizAPP.UI.Scheduler.SelectQuery(event);"><i class="fa fa-bookmark-o scheduler-qry-icon"></i>&nbsp; {0}</div>';
		$('#Scheduler_MultiQueryPickerId option').each(function () {
			if ($(this).text())
				multiQueryTemplate = multiQueryTemplate + multiQuerySubTemplate.format($(this).text());
		});
		BizAPP.UI.Scheduler.listOptionTemplate = BizAPP.UI.Scheduler.listOptionTemplate.format(multiQueryTemplate);
		var selector = $(e.target).closest('.scsecondcontrolstablecell').find('.scheduler-list-options.popup-container');
		BizAPP.MenuPopup.Create({
			html: BizAPP.UI.Scheduler.listOptionTemplate, selector: selector, mode: 'open', position: 'bottom', callback: function () {
				if (!g_hasSysAdminResp)
					$('.scheduler-all-users').hide();
				e.stopPropagation();
			}
		});
	},
	SelectOption: function (mode) {
		switch (mode) {
			case "CurrentUser":
				$('.scbtncurrentuser').click();
				break;
			case "AllUsers":
				$('.scbtnalluser').click();
				break;
			case "DayView":
				$('.scbtndayview').click();
				break;
			case "WeekView":
				$('.scbtnweekview').click();
				break;
			case "MonthView":
				$('.scbtnmonthview').click();
				break;
			default:
		}
	},
	SelectQuery: function (e) {
		$('[bizappid="Scheduler_MultiQueryPickerId"] option[selected]').removeAttr('selected');
		$('[bizappid="Scheduler_MultiQueryPickerId"] option').filter(function () {
			return ($(this).text() == $(e.target).text());
		}).attr('selected', 'selected');
		$('[bizappid="Scheduler_MultiQueryPickerId"]').change();
	},

	Init: function (options) {
		options = JSON.parse(options);
		var $sch = $(getElementByBizAPPId(options.id, 'div'));
		if ($sch.length == 0)
			$sch = $('[bza-ctrlid="' + options.id + '"]');
		if ($sch.length == 0)
			return;

		$.cachedScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js').done(function (script, textStatus) {
			$.cachedScript('http://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.4.0/fullcalendar.min.js').done(function (script, textStatus) {
				$.getCss('http://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.4.0/fullcalendar.min.css', function () {
					events = [];
					$.each(options.data, function () {
						events.push({
							id: this.uniqueid + ':' + this.objecttype + ':' + this.version,
							title: this.Subject,
							start: this.PlannedStartDate,
							end: this.PlannedEndDate,
							allDay: new Date(this.PlannedStartDate).toDateString() != new Date(this.PlannedEndDate).toDateString()
						});
					})
					$($sch).fullCalendar({
						header: {
							left: 'prev,next today',
							center: 'title',
							right: 'month,agendaWeek,agendaDay'
						},
						eventLimit: true,
						events: function (sd, ed, tz, callback) {
							if (events) {
								events = null;
								callback(events);
							}
							else {
								//callserver
							}
						},
						dayClick: function (date1, jsEvent, view) {
							var date = date1._d;
							if (view.name == 'month')  //month view
								selectedDate = date.toDateString();
							else //day view
								selectedDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes();

							//alert('Clicked on: ' + selectedDate + ', Current view: ' + view.name);
							ajaxAsyncCall('SchedulerEx', ['Drilldown', null, selectedDate, options.isform, options.formeid, options.ctrlname, $sch.closest('[bizapp_name].').attr('bizappid')], false, true);
						},
						eventClick: function (calEvent, jsEvent, view) {
							//alert('Event: ' + calEvent.title + ', View: ' + view.name);
							ajaxAsyncCall('SchedulerEx', ['Drilldown', calEvent.id, null, options.isform, options.formeid, options.ctrlname, $sch.closest('[bizapp_name].').attr('bizappid')], false, true);
						}
					});
				});
			});
		});
	}
}

BizAPP.UI.ClipBoard = {
	Init: function (source, target) {
		BizAPP.UI.LoadDependentFile("zeroclipboard.js", function (script, textStatus) {
			var clip = new ZeroClipboard(source);
			clip.on("ready", function () {
				console.log("Flash movie loaded and ready.");

				this.on("copy", function (event) {
					var clipboard = event.clipboardData;
					clipboard.setData("text/plain", target.text());
				});

				this.on("aftercopy", function (event) {
					if (event.data["text/plain"]) {
						$('.bza-alrtMsg').text('Copied');
						$('.bza-alrtMsg').delay(2000).fadeOut();
					}
				});
			});
		});
	}
}

BizAPP.UI.ComboBox = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.DateTimePicker = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.StepControl = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	},
	CheckApplyStep: function (event, outlineId, args, step, confirmStep, type, snoDelay, callApplyStepCallback) {
		callApplyStepCallback();
	}
}

BizAPP.UI.TabControl = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	},
	ResponsiveInit: function () { }
}

BizAPP.UI.CheckBox = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.RadioButton = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.AttachmentControl = {
	Init: function ($html, selector, callback) {
		if (callback)
			callback($html);
	}
}

BizAPP.UI.Chart = {
	PopulateData: function () {
		var jsUrl = 'Script.asmx?csn=bizapp&cn=chart&v=' + __bts_;
		$.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function () {
			console.log('Chart js downloaded.');
			BizAPP.UI.Chart.PopulateData();
		});
	}
}

BizAPP.UI.ViewPersonalization = {
	Init: function () {
		console.log('BizAPP.UI.ViewPersonalization.Init called.');
	}
}

BizAPP.UI.MFA = {
	_template: '<div class="bza-mfa-cont"><span id="lblCookiePromptMsg" class="fp-msg-text">A mail containing the login cookie(valid for 30 minutes) has been sent to the registered email id.</span>\
        <br>Please enter the code below to continue<br><br>\
        <input type="text" class="bza-mfa-token" title="" placeholder="Enter the token"></input><br>\
        <input type="submit" name="btnSubmitToken" value="Continue" onclick="BizAPP.UI.MFA.Validate();" id="btnSubmitToken" class="btn-submit">\
	    <input type="submit" name="btnFPWCanToken" value="Cancel" onclick="" id="btnFPWCanToken" class="btn-submit canBtn" formnovalidate=""></div>',
	_popupTemplate: '<div class="tmask" style="opacity: 0.7; display: block;"></div>\
                      <div class="bza-alrtCont1 bza-alrtCont-warning1">\
	                    <div class="bza-alrtTitle">\
		                    <span class="ui-icon ui-icon-alert" style="display: inline-block;vertical-align:bottom;float:left;"></span>\
		                    <span style="float:left;">Validation</span>\
	                    </div>\
	                    <div class="bza-alrtBody">\
		                    <div class="bza-mfa-alrtBody">\
			                </div>\
	                    </div>\
                     </div>\
                    </div>',
	Init: function (selector) {
		$(selector).append(BizAPP.UI.MFA._template);
	},
	Validate: function () {
		var token = $('.bza-mfa-token').val().trim();
		ajaxAsyncCall('CredentialsEx', ['ValidateCookie', token, ''], false, true);
	},
	PromptTokenInPopup: function () {
		BizAPP.UI.InlinePopup.CreateNew({ width: 500, html: BizAPP.UI.MFA._popupTemplate, stropenjs: 'BizAPP.UI.MFA.Init(\'.bza-mfa-alrtBody\');' });
	},

	_impvc: null,
	Impersonate: function (loginId, code) {
		BizAPP.UI.LoadDependentFile('vue.js', function () {
			if (!BizAPP.UI.MFA._impvc)
				BizAPP.UI.MFA._impvc = Vue.component('impersonateMFA', {
					template: '<div class="modal fade" tabindex="-1" role="dialog" id="impMFA">\
                            <div class="modal-dialog" role="document">\
                                <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                        <span aria-hidden="true">&times;</span>\
                                    </button>\
                                    <h4 class="modal-title">Impersonate</h4>\
                                </div>\
                                <div class="modal-body">\
                                    <div class="form-group"><label>User to impersonate</label><input :readonly="step != 1" v-model="loginId" type="text" class="formtextbox form-control"></div>\
                                    <button v-if="step == 1" class="btn btn-primary" v-on:click="requestCode">Request Code</button>\
                                    <div v-if="step != 1" class="form-group"><label>Code (sent to the user\'s primary email)</label><input v-model="code" type="text" class="formtextbox form-control"></div>\
                                    <span v-if="step != 1" class="btn btn-primary" v-on:click="impersonate">Impersonate</span>\
                                </div>\
                                </div>\
                            </div>\
                        </div>',
					data: function () {
						return {
							loginId: loginId,
							code: '',
							step: loginId ? 2 : 1
						}
					},
					methods: {
						requestCode: function () {
							if (!this.loginId) return;
							var imp = this
							g_callBacks.push(function () {
								imp.step = 2
							})
							ajaxAsyncCall('ImpersonationControlEx', ['ImpersonateFromLoginId', imp.loginId], false, true);
						},
						impersonate: function () {
							ajaxAsyncCall('ImpersonationControlEx', ['ImpersonateFromLoginId', this.loginId, this.code], false, true);
						}
					},
					mounted: function () {
						$('#impMFA').modal({ show: 1 })
					}
				})

			if ($('#impMFA').length == 0)
				$('body').append('<div id="impMFA"></div>');

			var a = new BizAPP.UI.MFA._impvc();
			a.loginId = loginId;
			a.$mount('#impMFA')
		})
	}
}

BizAPP.UI.WordEditor = {
	Init: function (options) {
		if (BizAPP.UI.controlMapping && BizAPP.UI.controlMapping.wordeditor) {
			var jsUrl = BizAPP.UI.controlDependency[BizAPP.UI.controlMapping.wordeditor];
			if (jsUrl) {
				$.cachedScript(BizAPP.UI.GetBasePath(jsUrl + '?v=' + __bts_)).done(function (script, textStatus) {
					BizAPP.UI.WordEditor.Init(options);
				});
			}
			else {
				BizAPP.UI.WordEditor.InternalInit(options);
			}
		}
		else {
			BizAPP.UI.WordEditor.InternalInit(options);
		}
	},
	InternalInit: function (options) {
		BizAPP.UI.WordEditor.showToolBar(options.ctrlId, '0');
		BizAPP.UI.WordEditor.renewSessionForControl(options.ctrlId);
		BizAPP.UI.WordEditor.loadObject(options.containerId, options.obj);
		BizAPP.UI.WordEditor.loadDocument(options.ctrlId, options.data, options.font);
	},
	renewSessionForControl: function (ctrlId) {
		if (getElementByBizAPPId(ctrlId, 'OBJECT') != null) {
			ajaxAsyncCall("HelperEx", ['PingSession'], false, true);
			setTimeout("BizAPP.UI.WordEditor.renewSessionForControl('" + ctrlId + "');", 5 * 60 * 1000);
		}
	},
	loadDocument: function (controlId, data, font) {
		var actX = BizAPP.UI.WordEditor.getWordObj(controlId);

		if (actX) {
			actX.WordContentBase64 = data;
			if (font && font != '' && font != NaN && font != undefined)
				actX.FontName = font;
		}
	},
	showToolBar: function (controlId, data) {
		var actX = BizAPP.UI.WordEditor.getWordObj(controlId);

		if (actX)
			actX.Toolbars = data;
	},
	setReadOnly: function (controlId) {
		//    var actX = document.getElementById(controlId);
		//    if (actX)
		//        actX.IsReadOnly = true;
	},
	loadObject: function (containerId, obj) {
		var container = BizAPP.UI.WordEditor.getWordObj(containerId);
		if (container) {
			container.innerHTML = "";
			container.innerHTML = obj;
		}
	},
	getWordObj: function (containerId) {
		var container = document.getElementById(containerId);
		if (!container) {
			wordControls = getBizAppElementsByClassName(document.body, "div", "WordEditorEx");
			for (var i = 0; i < wordControls.length; i++) {
				if (wordControls[i].id.indexOf(containerId) != -1) {
					container = wordControls[i];
					break;
				}
			}
		}
		return container;
	},
	getHTMLValue: function (controlId) {
		var actX = BizAPP.UI.WordEditor.getWordObj(controlId);
		if (actX) {
			for (var i = 0; i < 50; i++) {
				try {
					return actX.HTMLContent;
				}
				catch (Error) { logError('get Word HTML value failed.', Error); }
			}
		}
	}
}

BizAPP.UI.AdvancedTab = {
	LoadDefaultTab: function (id) {
		$('[id="{0}"]'.format(id)).find('.tabLeftSelected').click();
	}
}

BizAPP.UI.DocumentViewer = {
	Loaded: function (sender, e) {
		console.log("viewer loaded");
	},
	PageChange: function (sender, e) {
		console.log("Viewing page " + e.pageNumber);
	},
	LoadPage: function (pageNo) {
		$('iframe[src*="dv.aspx"]')[0].contentWindow.BizAPP.UI.DocumentViewer.LoadPage(pageNo);
	},
	GetTotalPageCount: function () {
		return $('iframe[src*="dv.aspx"]')[0].contentWindow.BizAPP.UI.DocumentViewer.GetTotalPageCount();
	},
	SearchText: function (text) {
		return $('iframe[src*="dv.aspx"]')[0].contentWindow.BizAPP.UI.DocumentViewer.SearchText(text);
	},
	PrintStart: function (sender, e) {
		console.log("PrintStart ");
	},
	Print: function (sender, e) {
		console.log("Print");
	}
}

BizAPP.UI.Drawing = {
	_drawings: {},
	Init: function (selector) {
		$.cachedScript('https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js').done(function () {
			var drawing = $(selector).find('canvas');
			if (!drawing.length) {
				$(selector).html('<canvas class="fill"></canvas>');
				drawing = $(selector).find('canvas');
			}

			BizAPP.UI.Drawing._drawings[selector] = new SignaturePad(drawing[0]);
		})
	},
	GetDrawing: function (selector, format) {
		return BizAPP.UI.Drawing._drawings[selector].toDataURL(format);
	}
}

BizAPP.Facebook = {
	_loaded: false,
	LoadFacebook: function (appId, callback) {
		if (!appId) throw 'appId not specified';
		if (!BizAPP.Facebook._loaded) {
			$.cachedScript('//connect.facebook.net/en_US/sdk.js').done(function () {
				FB.init({
					appId: appId,
					version: 'v2.10' // or v2.1, v2.2, v2.3, ...
				});
				BizAPP.Facebook._loaded = true;
				callback();
			});
		}
		else
			callback();
	},
    /*
        post - {
                    method: 'share',
                    quote: 'Any text content goes here',
                    href: 'https://staging.viome.com/?refcode=Srinivas49685'
                }
    */
	CreatePost: function (appId, post, callback) {
		BizAPP.Facebook.LoadFacebook(appId, function () {
			FB.login(function (res) {

				if (!res.authResponse) return;

				FB.ui(post, function (response) {
					if (!response || response.error_message)
						addLog('FB Post - Error occured: ' + response.error_message);
					else
						addLog('FB Post ID: ' + response.post_id);

					callback(response);
				});
			});
		});
	}
}