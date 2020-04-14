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

//***** BizAPP.UI.Collaboration.js Version 3 *******************************************************************************************************************************

var BizAPP = BizAPP || {};
BizAPP.UI = BizAPP.UI || {};
BizAPP.UI.Collaboration = {
	useSocketIO: true,
    template: '<section class="videoConference"><div class="videoConference-wrapper">\
<div class="videoConference-videoDispaly-container Left"><!--WhiteboardContainer--><!--MainVideoContainer--></div>\
<div class="videoConference-menu-container Left videoConference-landingCol-same-height">\
<div class="videoConference-menu-Link-container Left" onclick="BizAPP.UI.Collaboration.ShowAttendees();">\
<div class="videoConference-menu-Link-img-container Left videoConference-sprite videoConference-sprite-Attendees" title="Attendees">&nbsp;</div>\
<div class="videoConference-menu-Link-title-container Left">Attendees (<span class="videoConference-menu-Link-title-count">0</span>)</div></div>\
<div class="videoConference-menu-Link-container Left" onclick="BizAPP.UI.Collaboration.ShowScreens();"><div class="videoConference-menu-Link-img-container Left videoConference-sprite videoConference-sprite-Screen" title="Screen">&nbsp;</div>\
<div class="videoConference-menu-Link-title-container Left">Screen (<span class="videoConference-menu-Link-title-count">0</span>)</div></div>\
<div class="videoConference-menu-Link-container Left" onclick="BizAPP.UI.Collaboration.ShowVideos();"><div class="videoConference-menu-Link-img-container Left videoConference-sprite videoConference-sprite-Sharing" title="Video" >&nbsp;</div>\
<div class="videoConference-menu-Link-title-container Left">Video (<span class="videoConference-menu-Link-title-count">0</span>)</div></div>\
<div class="videoConference-menu-Link-container Left" onclick="BizAPP.UI.Collaboration.ShowWhiteboard();"><div class="videoConference-Whiteboard-preview-container"><div id="draw-preview" style="background:white;">\
<canvas width="700" height="500" id="drawing-canvus-preview"  style="height:50px;width:75px;"></canvas></div></div><div class="videoConference-menu-Link-title-container Left">Whiteboard</div></div>\
<div class="videoConference-submenu-container Left"><div class="videoConference-submenu-Link-container Left">\
<div class="videoConference-submenu-Link-img-container Left videoConference-sprite videoConference-sprite-Sharing" title="Sharing">&nbsp;</div>\
<div class="videoConference-submenu-Link-title-container Left">Sharing (<span class="videoConference-submenu-Link-title-count">0</span>)</div></div></div>{2}</div>\
<div class="videoConference-content-container Left videoConference-landingCol-same-height"><div class="videoConference-content-NavLinks-container" >\
<div class="videoConference-content-NavLinks-Link-container Left" style="display:none"><div class="videoConference-content-NavLinks-Link-img-container Left videoConference-sprite videoConference-sprite-AddUser" title="Add">&nbsp;</div></div>\
<div class="videoConference-content-NavLinks-Link-container Left"><div class="videoConference-content-NavLinks-Link-img-container Left videoConference-sprite videoConference-sprite-Chat" title="Chat" onclick="BizAPP.UI.Collaboration.ShowChat()">&nbsp;</div></div>\
<div class="videoConference-content-NavLinks-Link-container Left" style="display:none"><div class="videoConference-content-NavLinks-Link-img-container Left videoConference-sprite videoConference-sprite-Note" title="Artical">&nbsp;</div></div>\
<div class="videoConference-content-NavLinks-Link-container Left" style="display:none"><div class="videoConference-content-NavLinks-Link-img-container Left videoConference-sprite videoConference-sprite-Setting" title="Setting">&nbsp;</div></div>\
<div class="videoConference-content-NavLinks-Link-container Left"><div class="videoConference-content-NavLinks-Link-img-container Left videoConference-sprite-SharedFiles fa fa-2x fa-paperclip" title="Shared Files" onclick="BizAPP.UI.Collaboration.ShowSharedFiles()">&nbsp;</div><div class="videoConference-AlertCnt" style="display:none">0</div></div>{3}</div>\
<div class="videoConference-content-MiddleContent-container" style="display:inline-block;" >\
<!--AttendeeContainer-->\
<!--ChatContainer-->\
<!--WebCamContainer-->\
<!--ScreenContainer-->\
<!--SharedFileContainer-->\
<div class="bza-middle-container"><div id="extension-view-container"></div></div></div>\
<!--SwitchMediaContainer--></div>\
</div><div class="videoConference-footer" style="display:none"><div class="Left">COPYRIGHT &copy; 2015, ALL RIGHTS RESERVED</div>\
<div class="Right"><span class="videoConference-font-blue">POWERED BY</span> BART</div></div>\
</div></section>',
    _supportedMode: 'audio+video+data+screen',
    connection: null,
    channel: '',
    DetectRTC: {},
    participants: [],
    reconnect: false,
    participantsToReconnect: '',
    sessionNotStartedMsgShown: false,
    allAttendees: '',
    selector: '',
    isV3: false,
    mainVideoContainer: '<div class="videoConference-mainVideo-container"><div class="videoConference-videoDispaly-holder-container Left"><div id="main-video-container" onclick="BizAPP.UI.Collaboration.StopEventPropagation(event)"><div id="webcam-container"></div></div></div><div class="videoConference-videoDispaly-Controls-container Left"><div class="videoConference-videoDispaly-Controls-wrapper Left">\
<div class="videoConference-videoDispaly-Controls-VideoTime-container Left">00:00:00</div>\
<div class="videoConference-videoDispaly-Controls-VideoControls-container Right">\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoScreen" title="Screen" style="display:none">&nbsp;</div>\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoPlay" title="Play" style="display:none">&nbsp;</div>\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoPause" title="Pause" onclick="BizAPP.UI.Collaboration.PausePlayVideo(event);">&nbsp;</div>\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoStop" title="Stop" style="display:none">&nbsp;</div>\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoDisplayScreen" title="Display Screen" style="display:none">&nbsp;</div>\
<div class="videoConference-videoDispaly-Controls-VideoControl-container Left videoConference-sprite videoConference-sprite-VideoZoomOutIn" title="Zoom Out" onclick="BizAPP.UI.Collaboration.ZoomOutVideo(event);">&nbsp;</div></div></div></div></div><div id="extension-mainView-container" class="videoConference-customView-container" style="display: none;">',
    attendeesContainer: '<div id="attendees-container" class="bza-middle-container"><div class="videoConference-content-Title-container Left videoConference-blue-font-color Font-Size-18">\
Attendees</div><div class="videoConference-content-SearchBox-container Left" style="display:none"><div class="videoConference-content-SearchBox-TextBox-container Left">\
<input type="text" class="videoConference-content-SearchBox-TextBox"/></div>\
<div class="videoConference-content-SearchBox-SearchIcon-container Left Cursor-Pointer videoConference-sprite videoConference-sprite-Search" title="Contact Us">&nbsp;</div></div><div class="attendees-list-container"></div></div>',
    chatContainer: '<div id="chat-container" class="bza-middle-container" style="display: none;"><div class="videoConference-content-mainchat-container Left"><div class="videoConference-content-mainchat-tab-container Left"><div class="videoConference-content-mainchat-tab-livechat-container Left videoConference-content-mainchat-tab-livechat-Active"><div class="videoConference-mainchat-tab-ChatIcon-container Left videoConference-sprite videoConference-sprite-Chat"><div class="videoConference-mainchat-tab-ChatUser-status Left ChatUser-status-Active">&nbsp;</div></div><div class="videoConference-mainchat-tab-ChatCount-container Left">LIVE CHAT(<span class="videoConference-mainchat-tab-ChatCount">0</span>)</div></div><div class="videoConference-content-mainchat-tab-attendeeschat-container Left"><div class="videoConference-mainchat-tab-ChatIcon-container Left videoConference-sprite videoConference-sprite-Attendees-User">&nbsp;</div><div class="videoConference-mainchat-tab-ChatCount-container Left">(<span class="videoConference-mainchat-tab-ChatCount">0</span>)</div></div></div><div class="videoConference-content-mainchat-tab-strip-container"><div class="videoConference-content-mainchat-tab-strip videoConference-content-mainchat-tab-livechat-strip tab-strip-Active">&nbsp;</div><div class="videoConference-content-mainchat-tab-strip videoConference-content-mainchat-tab-attendeeschat-strip">&nbsp;</div></div><div class="videoConference-content-mainchat-tabcontent-container Left"><div class="videoConference-content-mainchat-tabcontent-livechat-container Left"><div class="videoConference-content-mainchat-tabcontent-livechat-groupchat-container Left"><div class="videoConference-content-mainchat-tabcontent-livechat-groupchat-body-container Left"><div id="chat-output" class="videoConference-chatting-content-container Left"></div></div><div class="videoConference-chatting-content-EditBox-container Left"><div class="videoConference-chatting-content-EditBox-Textarea-container Left"><textarea id="chat-input" class="videoConference-chatting-content-EditBox-Textarea" placeholder="Type here..." disabled></textarea></div><div class="videoConference-chatting-content-EditBox-SendIcon-container Right fa fa-2x fa-send Cursor-Pointer" onclick="BizAPP.UI.Collaboration.SendMessage();">&nbsp;</div><div class="videoConference-chatting-content-EditBox-SendIcon-container Right fa fa-2x fa-link Cursor-Pointer" onclick="BizAPP.UI.Collaboration.ShareLink();">&nbsp;</div></div></div></div><div class="videoConference-content-mainchat-tabcontent-attendeeschat-container Left"><div class="videoConference-content-Title-container Left videoConference-blue-font-color Font-Size-18">Attendees</div><div class="videoConference-content-SearchBox-container Left"><div class="videoConference-content-SearchBox-TextBox-container Left"><input type="text" class="videoConference-content-SearchBox-TextBox"/></div><div class="videoConference-content-SearchBox-SearchIcon-container Left Cursor-Pointer videoConference-sprite videoConference-sprite-Search" title="Contact Us">&nbsp;</div></div><div class="videoConference-content-Attendees-container Left"><div class="videoConference-content-Attendees-List-container Left"><div class="attendees-list-container"></div></div></div></div></div></div></div>',
    webCamContainer: '<div id="tilewebcam-container" class="bza-middle-container" style="display:none"></div>',
    screenContainer: '<div id="tileVideos-container" class="bza-middle-container" style="display:none"></div>',
    sharedFilesContainer: '<div id="sent-files" class="bza-middle-container" style="min-width: 200px;display:none"><div class="videoConference-chatting-file-attachment-container Left"><div id="drag-and-drop-zoneWebRTC" class="uploader" style="display: inline-block;border: 0;"><div class="videoConference-chatting-file-attachment-icon-container Left"><div class="browser"><table><tr><td class="uploader-btn"><label><div class="videoConference-chatting-content-EditBox-SendIcon-container Right videoConference-sprite videoConference-sprite-Attachment Cursor-Pointer" title="Browse Files">&nbsp;<input type="file" ID="uploader"></div></label></td></tr></table></div></div><div class="videoConference-chatting-file-attachment-content-container Left"><div class="videoConference-chatting-file-attachment-content-icon-container Left"><div class="videoConference-chatting-content-EditBox-SendIcon-container Right videoConference-sprite videoConference-sprite-DragMove Cursor-Pointer">&nbsp;</div></div><div class="videoConference-chatting-file-attachment-content-info-container Left">Drag and Drop your file to send</div></div></div></div><div class="files-empty">There are no shared files.</div></div>',
    switchMediaContainer: '<div class="videoConference-content-sharingScreen-container Left"><div class="videoConference-content-sharingScreen-Row-container Left">\
<div class="videoConference-content-sharingScreen-Icon-container Left videoConference-sprite videoConference-sprite-ZoomInOutArrow" onclick="BizAPP.UI.Collaboration.SwitchStreams();"></div>\
<div class="videoConference-content-sharingScreen-Title-container Left">Sharing</div></div>\
<div class="videoConference-content-sharingScreen-Img-container Left"><div id="screen-conatainer" onclick="BizAPP.UI.Collaboration.StopEventPropagation(event);"><div id="sharing-video-container"></div></div></div></div>',
    whiteboardContainer: '<div class="videoConference-Whiteboard-container" style="display: none;"><div ><div id="draw"><canvas width="700" height="500" id="drawing-canvus" style="background: white;"></canvas></div>\
<div style="margin-top:5px;"><span class="whiteboard-select">Currently selected : <a id="ink" href="javascript:void(0)">\
<i id="imgMode" class="fa fa-pencil" title="Click to select Eraser"></i></a></span><div id="dialog-form" title="Save Whiteboard"><fieldset><label for="name">Name</label>\
<input type="text" name="name" id="name" value="" class="text ui-widget-content ui-corner-all"></fieldset></div><span><a id="save-whiteboard" href="javascript:void(0)">Save</a></span><span>\
<a id="clear" href="javascript:void(0)">Clear</a></span><span class="saved-whiteboards"></span></div></div></div>',

    _promptPlugin: true,
    _pluginsc: null,
    _pluginfc: null,
	_options: null,
	ChromeScreenPlugin: function (sc, fc) {
		sc()
		return;
		if (isMobile.any()) {
			sc();
			return;
		}

		BizAPP.UI.Collaboration._pluginsc = sc;
		BizAPP.UI.Collaboration._pluginfc = fc;

    	$("head").append('<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/mkbmmkmmkppgkahchamcaaommnjpkghd">');
    	if (BizAPP.UI.currentApplication)
    		var app = JSON.parse(BizAPP.UI.currentApplication).bizappcurrentapplicationname;
    	BizAPP.UI.InlinePopup.CreateNew({
    		html: BizAPP.UI.Wizard._popupStyle + '<div class="bza-publock" popupwidth="600">Solution requires ' + app + ' Virtual Room browser extension, click install to continue<br><div class=stepcenternormal onclick="BizAPP.UI.Collaboration._pluginfc()">Not Now</div>&nbsp;<div class=stepcenternormal  onclick="chrome.webstore.install(\'\', BizAPP.UI.Collaboration._pluginsc, BizAPP.UI.Collaboration._pluginfc)">Install</div></div>'
    	});    	
    },

	Init: function (options, initiate, callback) {
		BizAPP.UI.Toast.LoadLibrary()
		if (BizAPP.UI.Collaboration.useSocketIO) {
			$.cachedScript('https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js').done(function (script, textStatus) {
				BizAPP.UI.Collaboration.selector = options.selector;
				BizAPP.UI.Collaboration.RefreshParticipants(function () {
					BizAPP.UI.Collaboration.Init1(options, initiate, callback);
				});
			});
		}
		else {
			BizAPP.UI.Collaboration.selector = options.selector;
			BizAPP.UI.Collaboration.RefreshParticipants(function () {
				BizAPP.UI.Collaboration.Init1(options, initiate, callback);
			});
		}
	},

	Init1: function (options, initiate, callback) {
		if (typeof options.blockIfNotSupported == 'undefined')
			options.blockIfNotSupported = true;
		if (options.blockIfNotSupported) {
			var versions = {
				chrome: 50,
				msie: 10000,
				safari: 10000,
				opera: 10000,
				unknown: 10000,
				firefox: 49
			};
			var opts = {
				header: 'This browser is not supported',
				paragraph1: 'You are currently using an unsupported browser.',
				paragraph2: 'Please install one of the supported browsers below to proceed:',
				closeMessage: '',
				display: ['chrome']
			};
			if (!isBrowserSupported(versions, opts))
				return;
		}
		
		$.getCss(BizAPP.UI.GetBasePath('Resources/WebRTC/jquery.qtip.min.css'));
		//$.cachedScript('https://www.webrtc-experiment.com/getMediaElement.js').done(function () {
			$.cachedScript('https://rtcmulticonnection.herokuapp.com/node_modules/fbr/FileBufferReader.js').done(function () {
				$.cachedScript('https://apppoint.blob.core.windows.net/vinay/webrtc/RTCMultiConnection.js?v=' + __bts_).done(function () {
					$.cachedScript('https://rtcmulticonnection.herokuapp.com/node_modules/recordrtc/RecordRTC.js').done(function () {
		//$.cachedScript(BizAPP.UI.GetBasePath('Resources/WebRTC/WebRTC.V3.js?v=' + __bts_)).done(function () {
						if (initiate) {
							BizAPP.UI.Collaboration.reconnect = true;
							if (options.participantList)
								BizAPP.UI.Collaboration.participantsToReconnect = options.participantList;
						}
						if (!options.channelId) {
							var guid = (function () {
								function s4() {
									return Math.floor((1 + Math.random()) * 0x10000)
											   .toString(16)
											   .substring(1);
								}
								return function () {
									return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
										   s4() + '-' + s4() + s4() + s4();
								};
							})();
							options.channelId = guid();
						}

						BizAPP.UI.Collaboration.connection = new RTCMultiConnection(options.channelId);
						if ($('.videoConference').attr('bza_wc_direction') == 'one-way')
							BizAPP.UI.Collaboration.connection.direction = 'one-way';
						BizAPP.UI.Collaboration.connection.enableLogs = false;
						BizAPP.UI.Collaboration.connection.dontCaptureUserMedia = true;
						if (typeof webkitMediaStream !== 'undefined') 
							BizAPP.UI.Collaboration.connection.attachStreams.push(new webkitMediaStream());
						else if (typeof MediaStream !== 'undefined') 
							BizAPP.UI.Collaboration.connection.attachStreams.push(new MediaStream());
			
						if (BizAPP.UI.Collaboration.useSocketIO)
							BizAPP.UI.Collaboration.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
						else
							BizAPP.UI.Collaboration.connection.setCustomSocketHandler(SignalRConnection);

						BizAPP.UI.Collaboration.connection.socketMessageEvent = options.sessionID;
						BizAPP.UI.Collaboration.connection.enableFileSharing = true;
			
						BizAPP.UI.Collaboration.connection.bandwidth = {
							audio: 50,
							video: 256,
							data: 1638400,
							screen: 300      
						};

						BizAPP.UI.Collaboration.connection.DetectRTC.load(function () {
							if (!options.partialSupportEnabled && !(BizAPP.UI.Collaboration.connection.DetectRTC && BizAPP.UI.Collaboration.connection.DetectRTC.isWebRTCSupported)) {
								options.partialSupportEnabled = true;
								BizAPP.UI.Collaboration.Init(options, initiate, callback);
							}
							else {
								BizAPP.UI.Collaboration.selector = options.selector;
								BizAPP.UI.Collaboration.isV3 = options.isV3;

								if (isMobile.any() && isMobile.any().length)
									options.screenNotDefaultForParticipant = true;

								var leftMenuString = '';
								var topMenuString = '';
								if (options.extensionLinks) {
									$.each(JSON.parse(options.extensionLinks), function (i, item) {
										if (item.isLeft) {
											leftMenuString += '<div onclick="{1}">{0}</div>'.format(item.linkText, item.linkOnClick);
										}
										else {
											topMenuString += '<div onclick="{1}">{0}</div>'.format(item.linkText, item.linkOnClick);
										}
									});
								}
								var $layout;
								if (options.layoutSelector)
									$layout = $(options.layoutSelector);
								else
									$layout = $(BizAPP.UI.Collaboration.template.format(options.user.userid, options.user.name, leftMenuString, topMenuString));

								var $commentNodes = BizAPP.UI.Control._getCommentNodes($layout);
								//Main Video
								var mainVideoNode = $commentNodes.filter(function () { return this.nodeValue == 'MainVideoContainer' });
								if (mainVideoNode.length)
									$layout.find(mainVideoNode[0]).replaceWith($(BizAPP.UI.Collaboration.mainVideoContainer));

								//Attendee
								var attendeeNode = $commentNodes.filter(function () { return this.nodeValue == 'AttendeeContainer' });
								if (attendeeNode.length)
									$layout.find(attendeeNode[0]).replaceWith($(BizAPP.UI.Collaboration.attendeesContainer));

								//Chat
								var chatNode = $commentNodes.filter(function () { return this.nodeValue == 'ChatContainer' });
								if (chatNode.length)
									$layout.find(chatNode[0]).replaceWith($(BizAPP.UI.Collaboration.chatContainer));

								//Webcam
								var webCamNode = $commentNodes.filter(function () { return this.nodeValue == 'WebCamContainer' });
								if (webCamNode.length)
									$layout.find(webCamNode[0]).replaceWith($(BizAPP.UI.Collaboration.webCamContainer));

								//Screen
								var screenNode = $commentNodes.filter(function () { return this.nodeValue == 'ScreenContainer' });
								if (screenNode.length) {
									$layout.find(screenNode[0]).replaceWith($(BizAPP.UI.Collaboration.screenContainer).
										append('<div class="lnkbtn  stepcenternormal initOnly" onclick="BizAPP.UI.Collaboration.SwitchScreen(false)"><div>Switch Screen</div></div>\
			<div class="lnkbtn stepcenternormal initOnly bza-vr-record" onclick="BizAPP.UI.Collaboration.Record()"><div>Start Recording</div></div>'));
									if (!initiate)
										$layout.find('.initOnly').hide();
								}

								//Shared File
								var sharedFileNode = $commentNodes.filter(function () { return this.nodeValue == 'SharedFileContainer' });
								if (sharedFileNode.length)
									$layout.find(sharedFileNode[0]).replaceWith($(BizAPP.UI.Collaboration.sharedFilesContainer));

								//Switch Media
								var switchMediaNode = $commentNodes.filter(function () { return this.nodeValue == 'SwitchMediaContainer' });
								if (switchMediaNode.length)
									$layout.find(switchMediaNode[0]).replaceWith($(BizAPP.UI.Collaboration.switchMediaContainer));

								//White Board
								var whiteboardNode = $commentNodes.filter(function () { return this.nodeValue == 'WhiteboardContainer' });
								if (whiteboardNode.length)
									$layout.find(whiteboardNode[0]).replaceWith($(BizAPP.UI.Collaboration.whiteboardContainer));

								if (options.selector)
									$(options.selector).prepend($layout);
								else
									$('body').prepend($layout);

								if (options.layoutSelector)
									$(options.layoutSelector).show();

								if (initiate)
									$('.experiment').not('.data-box').closest('td').hide();

								if (!isMobile.any())
									$('.videoConference-Whiteboard-container').css('margin', '1000px');
								BizAPP.UI.Collaboration.ShowWhiteboard();
								BizAPP.UI.LoadWhiteboard(function () {
									BizAPP.UI.Collaboration.GetParticipantList(function (result, b) {
										result = result || '';
										BizAPP.UI.Whiteboard1.readonly = !initiate;//TODO && $('.videoConference').attr('bza_wc_direction') == "one-way";
										BizAPP.UI.Whiteboard.Init(result, initiate);
										if (options.partialSupportEnabled) {
											$('.videoConference-mainVideo-container, .videoConference-customView-container').hide();
											$('.videoConference-Whiteboard-container').show();
										}
										setTimeout(function () { if (!isMobile.any()) $('.videoConference-Whiteboard-container').attr('style', '') }, 1000);//$('.videoConference-menu-Link-container').get(0).click(); 
									});
								});
								if (!options.partialSupportEnabled) {
									var roomsList = document.getElementById('rooms-list');

									var progressHelper = {};
									var mainContainer = document.getElementById('main-video-container') || document.body;
									var tileVideoContainer = document.getElementById('tilewebcam-container') || document.body;
									var sharingContainer = document.getElementById('sharing-video-container');
									var tileScreenContainer = document.getElementById('tileVideos-container') || document.body;
									var chatOutput = document.getElementById('chat-output'),
									   fileProgress = document.getElementById('sent-files');
									var chatInput = document.getElementById('chat-input');

									BizAPP.UI.Collaboration.connection.session = {
										audio: false,
										video: false,
										screen: false,
										data: true
									};

									BizAPP.UI.Collaboration.connection.onNewSession = function (session) {
										if (sessions[session.sessionid]) return;
										sessions[session.sessionid] = session;

										if (!initiate && options.sessionId == session.sessionid && typeof (callback) != 'undefined')
											BizAPP.UI.Collaboration.Connect(session.sessionid);
									};

									BizAPP.UI.Collaboration.connection.onstream = function (e) {
										var whiteboardInit = false;
										var buttons = ['mute-audio', 'mute-video', 'full-screen', 'volume-slider'];

										if (BizAPP.UI.Collaboration.connection.session.audio && !BizAPP.UI.Collaboration.connection.session.video) {
											buttons = ['mute-audio', 'full-screen'];
										}

										var mediaWidth;
										if (!e.stream.isVideo && !e.stream.isAudio && e.stream.isScreen == null) return;// e.stream.isScreen = true;
										if (e.stream.isScreen) {
											if (sharingContainer)
												mediaWidth = (sharingContainer.clientWidth) - 50;
											else
												mediaWidth = (mainContainer.clientWidth) - 50;
										}

										var mediaElement = getMediaElement(e.mediaElement, {
											width: mediaWidth,
											title: e.userid,
											buttons: buttons
										});

										e.extra = e.extra || e.stream.extra;
										if (e.stream.isScreen) {
											var existingStream = $(tileScreenContainer).find('.stream-owner.' + e.extra['userid']);
											if (existingStream.length)
												existingStream.remove();

											tileScreenContainer.append(mediaElement);
											$(mediaElement).wrap('<div class="stream-owner ' + e.extra['userid'] + '" style="width: 90%;display: block;margin: 5px auto;text-align: center;border: 1px solid #2D99D8;background-color: black;color: white;">');
											$(mediaElement).parent().prepend('<div>' + e.extra['session-name'] + '</div>');
											$(mediaElement.media).addClass('screen');
										}
										else {
											$(tileVideoContainer).find('.stream-owner.' + e.extra['userid']).remove();
											tileVideoContainer.insertBefore(mediaElement, tileVideoContainer.firstChild);
											$(mediaElement).wrap('<div class="stream-owner ' + e.extra['userid'] + '" style="width: 90%;display: block;margin: 5px auto;text-align: center;border: 1px solid #2D99D8;background-color: black;color: white;">')
											$(mediaElement).parent().prepend('<div>' + e.extra['session-name'] + '</div>');
											$(mediaElement.media).addClass('webcam');
										}

										if (e.type == 'local') {
											mediaElement.media.muted = true;
											mediaElement.media.volume = 0;
										}
										if (e.extra.initiator) {
											$('.videoConference-videoDispaly-holder-container').next('div.videoConference-videoDispaly-Controls-container').show();
										}

										StreamChanged(e, true);
										setTimeout(function () { BizAPP.UI.Collaboration.UpdateParticipants(initiate); BizAPP.UI.Collaboration.InitAccordion(); BizAPP.UI.Collaboration.UpdateCurrentTime(); BizAPP.UI.Collaboration.UpdateStreamCount(); }, 1000);
									};

									function StreamChanged(e, status) {
										setTimeout(function () {
											$.each($('audio:visible,video:visible'), function () {
												if ($(this).hasClass('webcam') && $(this).closest('.stream-owner').hasClass(BizAPP.UI.Collaboration.connection.extra.userid)) 
													try { this.muted = true; } catch (e) { }

												if (this.paused)
													this.play()
											})
										}, 5000)

										if (e.stream.isScreen)
											BizAPP.UI.Collaboration.ScreenChanged(status, e.extra['userid']);
										else if (e.stream.isVideo)
											BizAPP.UI.Collaboration.VideoChanged(status, e.extra['userid']);
										if (e.stream.isAudio)
											BizAPP.UI.Collaboration.AudioChanged(status, e.extra['userid']);
							
										if(status)
											$.each($('audio:visible,video:visible'), function () {
													if ($(this).closest('.stream-owner').hasClass(BizAPP.UI.Collaboration.connection.extra.userid)) 
														try { $(this).removeAttr('controls') } catch (e) { }
											})
									}

									BizAPP.UI.Collaboration.connection.onstreamended = function (e) {
										debugger;
										if (e.mediaElement) {
											if ($(e.mediaElement).closest('.stream-owner').length)
												$(e.mediaElement).closest('.stream-owner').remove();
											else
												$(e.mediaElement).closest('.media-container').remove();
										}

										BizAPP.UI.Collaboration.UpdateStreamCount();
										StreamChanged(e, false);
									};

									BizAPP.UI.Collaboration.connection.onCustomMessage = BizAPP.UI.Collaboration.connection.onmessage = function (e) {
										//console.log("%c connection.onmessage: " + JSON.stringify(e), 'background: #222; color: #bada55');

										if (e.data.startsWith && e.data.startsWith('whiteboard:')) {
											BizAPP.UI.Whiteboard.MsgCallback(e);
										}
										else if (e.data.startsWith && e.data.startsWith('js:')) {
											eval(e.data.replace('js:', ''));
										}
										else if (!initiate && typeof e.data == 'string' && e.data.startsWith('[{')) {
											BizAPP.UI.Collaboration.participants = JSON.parse(e.data);
											BizAPP.UI.Collaboration.UpdateParticipants(initiate);
										}
										else {
											if (typeof e.data == 'string') {
												BizAPP.UI.Collaboration.PostMessage(e.extra['session-name'], e.data, true, e.extra['userid']);
												$('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').addClass('blink');
											}
											console.debug(e.userid, 'posted', e.data);
											console.log('latency:', e.latency, 'ms');
										}
									};

									BizAPP.UI.Collaboration.connection.onleave = function (e) {
										BizAPP.UI.Collaboration.connection.onclose(e);
										if (e.extra.initiator) 
											BizAPP.UI.Collaboration.connection.Join(BizAPP.UI.Collaboration._options);
									}

									BizAPP.UI.Collaboration.connection.onclose = function (e) {
										//mark participant offline
										var part;
										$.each(BizAPP.UI.Collaboration.participants, function (i, n) {
											if (n.peerid == e.userid) {
												part = n;
												n.offline = true;
												n.audioShared = false;
												n.videoShared = false;
												n.screenShared = false;
												n.hasMicrophone = false;
												n.hasWebcam = false;
												n.isScreenCapturingSupported = false;
											}
										})

										if (e.extra.initiator) {
											BizAPP.UI.InlinePopup.Alert({ title: '', header: 'Error', errorMessage: 'Connection lost.. \nPlease wait while the connection is being re-established.', btnOk: true, txtOk: 'OK', type: 'error', addnInfo: '', hideAddnBtns: true });
										}
										else {
											BizAPP.UI.Collaboration.UpdateParticipants(initiate);
											if (part) {
												$('.screens .' + part.userid).remove();
												$('.videos .' + part.userid).remove();
												BizAPP.UI.Collaboration.UpdateStreamCount();
												if (System.OnlineConference.OnAttendeeStatusChanged)
													System.OnlineConference.OnAttendeeStatusChanged('left', e.extra);
											}
										}
									};

									// on data connection gets open
									BizAPP.UI.Collaboration.connection.onopen = function (e) {
										if (initiate) {
											BizAPP.UI.Collaboration.participants = $.grep(BizAPP.UI.Collaboration.participants, function (value) {
												return value.userid != e.extra['userid'];
											});
											var participant = {
												'name': e.extra['session-name'], 'userid': e.extra['userid'],
												'initiator': e.extra['initiator'], 'hasMicrophone': e.extra['hasMicrophone'],
												'hasWebcam': e.extra['hasWebcam'], 'isScreenCapturingSupported': e.extra['isScreenCapturingSupported'],
												'audioShared': e.extra['audioShared'], 'videoShared': e.extra['videoShared'], 'screenShared': e.extra['screenShared'], peerid: e.userid
											};
											if (BizAPP.UI.Collaboration.connection.dontCaptureUserMedia) {
												participant.videoShared = false;
												participant.screenShared = false;
											}
											BizAPP.UI.Collaboration.participants.splice(1, 0, participant);
											BizAPP.UI.Collaboration.connection.send(JSON.stringify(BizAPP.UI.Collaboration.participants));
											BizAPP.UI.Collaboration.UpdateParticipants(initiate);
										}
										else if (e.extra.initiator) {
											$('.bza-alrtCont').prev().remove(); $('.bza-alrtCont').remove();
											BizAPP.UI.Collaboration.connection.send('whiteboard:sync-data', e.userid);
											BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.CheckRecord("' + BizAPP.UI.Collaboration.connection.userid + '");', e.userid);
										}
										var direction = $('.videoConference').attr('bza_wc_direction');
										if (initiate || !(direction == "one-way" || direction == "one-to-one")) {
											if (document.getElementById('chat-input')) document.getElementById('chat-input').disabled = false;
											if (document.getElementById('file')) document.getElementById('file').disabled = false;
											if (document.getElementById('open-new-session')) document.getElementById('open-new-session').disabled = true;
										}

										if (System.OnlineConference.OnAttendeeStatusChanged)
											System.OnlineConference.OnAttendeeStatusChanged('joined', e.extra);
									};

									BizAPP.UI.Collaboration.connection.autoSaveToDisk = false;

									BizAPP.UI.Collaboration.connection.onFileProgress = function (chunk) {
										var value = chunk.currentPosition || chunk.maxChunks || helper.progress.max;
										$.danidemo.updateFileProgress(0, value);
									};

									BizAPP.UI.Collaboration.connection.onFileStart = function (file) {
										var div = document.createElement('div');
										div.title = file.name;
										BizAPP.UI.Collaboration.AppendDIV(div, fileProgress);
										progressHelper[file.uuid] = {
											div: div,
											progress: div.querySelector('progress'),
											label: div.querySelector('label')
										};
										$.danidemo.addFile('#demo-files', 0, file);
									};

									BizAPP.UI.Collaboration.connection.onFileEnd = function (file) {
										if (BizAPP.UI.Collaboration.connection.userid === file.extra.userid)
											file.extra = BizAPP.UI.Collaboration.connection.extra;

										$('#sent-files .files-empty').remove();
										progressHelper[file.uuid].div.innerHTML = '<i class="fa fa-download"></i>&nbsp;<a href="' + file.url + '" target="_blank" style="text-decoration:underline;color: #000080" download="' + file.name + '">' + file.name + '</a>';
										$(progressHelper[file.uuid].div).addClass('VideoConference-FileSharing-File').css('padding', '5px');
										var msg = $(progressHelper[file.uuid].div)[0].outerHTML;
										BizAPP.UI.Collaboration.PostMessage(file.extra['session-name'], msg, true, file.extra['userid']);
										if (BizAPP.UI.Collaboration.connection.extra['userid'] != file.extra['userid'])
											$('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').addClass('blink');
										$('.videoConference-AlertCnt').text($('#sent-files .VideoConference-FileSharing-File').length.toString()).show();
									};

									if (!BizAPP.UI.Collaboration.useSocketIO) {
										BizAPP.UI.Collaboration.connection.openSignalingChannel = function (config) {
											var channel = config.channel || this.channel;
											onMessageCallbacks[channel] = config.onmessage;

											if (config.onopen) setTimeout(config.onopen, 1000);
											return {
												send: function (message) {
													if ($('.videoConference').attr('bza_wc_direction') == "one-to-one") {
														message.oneToOne = true;
														BizAPP.UI.Collaboration.SendSignalRMessage(message, channel);
													}
													else {
														BizAPP.UI.Collaboration.GetParticipantList(function (result) {
															result = result || '';
															message.userList = result;
															BizAPP.UI.Collaboration.SendSignalRMessage(message, channel);
														});
													}
												}
											};
										};
									}

									BizAPP.UI.Collaboration.connection.getScreenConstraints = function (callback) {
										getScreenConstraints(function (error, screen_constraints) {
											if (screen_constraints) {
												screen_constraints = BizAPP.UI.Collaboration.connection.modifyScreenConstraints(screen_constraints);
												callback('', screen_constraints);
												return;
											}
											else {
												BizAPP.UI.Collaboration.connection.session.screen = false;
												BizAPP.UI.Collaboration.connection.extra.screenShared = false;
												console.error(error);
												callback(error);
											}
										});
									};

									BizAPP.UI.Collaboration.connection.modifyScreenConstraints = function (screen_constraints) {
										screen_constraints.mandatory.maxWidth = screen_constraints.mandatory.maxWidth/2;
										screen_constraints.mandatory.maxHeight = screen_constraints.mandatory.maxHeight/2;
										debugger;
										return screen_constraints;
									}

									BizAPP.UI.Collaboration.connection.onPresenterChange = function (message) {

									};

									chatInput.onkeypress = function (e) {
										if (e.keyCode !== 13 || !this.value) return;
										BizAPP.UI.Collaboration.SendMessage();
									};

									//BizAPP.UI.Collaboration.connection.extra = {
									//	'session-name': options.user.name || 'Anonymous',
									//	'userid': options.user.userid,
									//	'initiator': false,
									//	'hasMicrophone': false,
									//	'hasWebcam': false,
									//	'isScreenCapturingSupported': false,
									//	'audioShared': BizAPP.UI.Collaboration.connection.session.audio, 'videoShared': BizAPP.UI.Collaboration.connection.session.video, 'screenShared': BizAPP.UI.Collaboration.connection.session.screen
									//};
									//BizAPP.UI.Collaboration.connection.connect();
									BizAPP.UI.Collaboration.DisplayModeWise(options);
									BizAPP.UI.Collaboration.InitAccordion();
									BizAPP.UI.Collaboration.InitUploadControl();
									BizAPP.UI.WordEditor.renewSessionForControl('Container:webconference');
									if (typeof (callback) != 'undefined')
										callback();
								}
								//}
							}
						});
		//});
					})
				})
			})
		//})
	},
	ScreenChanged: function (added, streamUser) {
		if(added)
			$('.user-list-item[userid="' + streamUser + '"] .fa-desktop').addClass('videoConference-Screen-Active');
		else
			$('.user-list-item[userid="' + streamUser + '"] .fa-desktop').removeClass('videoConference-Screen-Active');

		for (var i = 0; i < BizAPP.UI.Collaboration.participants.length; i++) {
			if (BizAPP.UI.Collaboration.participants[i].userid == streamUser) {
				BizAPP.UI.Collaboration.participants[i].screenShared = added;
				break;
			}
		}

		if (System.OnlineConference.OnStreamChanged) {
			try {
				System.OnlineConference.OnStreamChanged('screen', added, streamUser);
			} catch (e) { }
		}
	},
	VideoChanged: function (added, streamUser) {
		if (added)
			$('.user-list-item[userid="' + streamUser + '"] .videoConference-sprite-Video').addClass('videoConference-sprite-Video-Active');
		else
			$('.user-list-item[userid="' + streamUser + '"] .videoConference-sprite-Video').removeClass('videoConference-sprite-Video-Active');

		for (var i = 0; i < BizAPP.UI.Collaboration.participants.length; i++) {
			if (BizAPP.UI.Collaboration.participants[i].userid == streamUser) {
				BizAPP.UI.Collaboration.participants[i].videoShared = added;
				break;
			}
		}

		if (System.OnlineConference.OnStreamChanged) {
			try {
				System.OnlineConference.OnStreamChanged('video', added, streamUser);
			} catch (e) { }
		}
	},
	AudioChanged: function (added, streamUser) {
		if (added)
			$('.user-list-item[userid="' + streamUser + '"] .videoConference-sprite-Voice').addClass('videoConference-sprite-Voice-Active');
		else
			$('.user-list-item[userid="' + streamUser + '"] .videoConference-sprite-Voice').removeClass('videoConference-sprite-Voice-Active');

		for (var i = 0; i < BizAPP.UI.Collaboration.participants.length; i++) {
			if (BizAPP.UI.Collaboration.participants[i].userid == streamUser) {
				BizAPP.UI.Collaboration.participants[i].audioShared = added;
				break;
			}
		}

		if (System.OnlineConference.OnStreamChanged) {
			try {
				System.OnlineConference.OnStreamChanged('audio', added, streamUser);
			} catch (e) { }
		}
	},
    Setup: function (options) {
    	BizAPP.UI.Collaboration.DetectPlugin(function (a) {
    		if (a == 'not-installed' && BizAPP.UI.Collaboration._promptPlugin) {
    			BizAPP.UI.Collaboration._promptPlugin = false;
    			var b = function () { zoomout(); BizAPP.UI.Collaboration.Setup(options) };
    			BizAPP.UI.Collaboration.ChromeScreenPlugin(b, b);
    			return;
    		}

    		BizAPP.UI.Collaboration._options = options;
            BizAPP.UI.Collaboration.Init(options, true, function () {
                var attr = $('.videoConference').attr('bza_wc_direction');//'many-to-many';
                var direction;
                switch (attr) {
                    case "one-way":
                        direction = 'one-way';
                        break;
                    case "one-to-one":
                        direction = 'many-to-many';
                        break;
                    default:
                        direction = 'many-to-many';
                }

                var _session = BizAPP.UI.Collaboration.GetConfiguredMode(options);
                var splittedSession = _session.split('+');

                var session = {};
                for (var i = 0; i < splittedSession.length; i++) {
                    if (splittedSession[i])
                        session[splittedSession[i]] = true;
                }

                var maxParticipantsAllowed = 256;

                if (direction == 'one-to-one') maxParticipantsAllowed = 1;
                if (direction == 'one-to-many') session.broadcast = true;
                if (direction == 'one-way') session.oneway = true;

                BizAPP.UI.Collaboration.connection.DetectRTC.load(function () {
                	session = { audio: false, video: false, screen: false, data: true };
                	BizAPP.UI.Collaboration.connection.extra = {
                        'session-name': options.user.name || 'Anonymous',
                        'userid': options.user.userid,
                        'initiator': true,
                        'hasMicrophone': BizAPP.UI.Collaboration.connection.DetectRTC.hasMicrophone,
                        'hasWebcam': BizAPP.UI.Collaboration.connection.DetectRTC.hasWebcam,
                        'isScreenCapturingSupported': BizAPP.UI.Collaboration.connection.DetectRTC.isScreenCapturingSupported,
                        'audioShared': session.audio, 'videoShared': session.video, 'screenShared': session.screen
                    };
                    if (BizAPP.UI.Collaboration.connection.dontCaptureUserMedia) {
                    	BizAPP.UI.Collaboration.connection.extra.videoShared = false;
                    	BizAPP.UI.Collaboration.connection.extra.screenShared = false;
                    }

                    BizAPP.UI.Collaboration.connection.session = session;
                    BizAPP.UI.Collaboration.connection.maxParticipantsAllowed = maxParticipantsAllowed;

                    BizAPP.UI.Collaboration.connection.sessionid = options.sessionID || 'Anonymous';
                    sessions[options.sessionID] = session;
                    BizAPP.UI.Collaboration.channel = BizAPP.UI.Collaboration.connection.channel;

                    //BizAPP.UI.Collaboration.participants = $.grep(BizAPP.UI.Collaboration.participants, function (value) {
                    //	return value.userid != e.extra['userid'];
                    //});
                    var participant = {
                        'name': options.user.name || 'Anonymous', 'userid': options.user.userid, 'initiator': true,
                        'hasMicrophone': BizAPP.UI.Collaboration.connection.extra['hasMicrophone'],
                        'hasWebcam': BizAPP.UI.Collaboration.connection.extra['hasWebcam'],
                        'isScreenCapturingSupported': BizAPP.UI.Collaboration.connection.extra['isScreenCapturingSupported'],
                        'audioShared': BizAPP.UI.Collaboration.connection.extra['audioShared'], 'videoShared': BizAPP.UI.Collaboration.connection.extra['videoShared'], 'screenShared': BizAPP.UI.Collaboration.connection.extra['screenShared']
                    };
                    var found = -1;
                    $.each(BizAPP.UI.Collaboration.participants, function (i, n) {
                    	if (n.userid == options.user.userid) 
                    		found = i;
                    })
                    if (found != -1)
                    	BizAPP.UI.Collaboration.participants[found] = participant;
                	BizAPP.UI.Collaboration.UpdateParticipants(true);

                    if (typeof (options.callback) != 'undefined')
                        options.callback(BizAPP.UI.Collaboration.channel, BizAPP.UI.Collaboration.connection.sessionid, options.selector);
                    BizAPP.UI.Collaboration.connection.open(BizAPP.UI.Collaboration.connection.sessionid, function () {
                    	BizAPP.UI.Collaboration.GetParticipantList(function (result) {
                    		if (BizAPP.UI.Collaboration.useSocketIO) {
                    			var message = {
                    				message: {
                    					sessionid: BizAPP.UI.Collaboration.connection.sessionid,
                    					messageFor: result,
                    					reconnected: 'true',
                    					sender: BizAPP.UI.Collaboration.connection.extra.userid,
                    					onlineconf: getObject($(BizAPP.UI.Collaboration.selector))
                    				}
                    			};
                    			$.connection.webRtcHub.server.sendReconnectedMsg(JSON.stringify(message));
                    		}
                    		else {
								var webRtcHub = $.connection.webRtcHub;
								webRtcHub.server.setSessionDetails($.connection.hub.qs.sessionid, BizAPP.UI.Collaboration.connection.sessionid, JSON.stringify(session));
								BizAPP.UI.Collaboration.connection.socket.send(session);
                    		}
                    		if (System.OnlineConference.OnHostStarted)
                    			setTimeout(System.OnlineConference.OnHostStarted, 5000);
                    	})
                    });
                });
            });
        });
    },
    Join: function (options) {
    	BizAPP.UI.Collaboration.DetectPlugin(function (a) {
    		if (a == 'not-installed' && BizAPP.UI.Collaboration._promptPlugin) {
    			BizAPP.UI.Collaboration._promptPlugin = false;
    			var b = function () { zoomout(); BizAPP.UI.Collaboration.Join(options) };
    			BizAPP.UI.Collaboration.ChromeScreenPlugin(b, b);
    			return;
    		}

    		BizAPP.UI.Collaboration._options = options;
    		BizAPP.UI.Collaboration.Init(options, false, function () {
                if (sessions[options.sessionID]) {
                	session = sessions[options.sessionID];
                    BizAPP.UI.Collaboration.Connect(options, session, options.screenNotDefaultForParticipant);
                }
                else {
                	if (BizAPP.UI.Collaboration.useSocketIO)
                		BizAPP.UI.Collaboration.Connect(options, { sessionid: options.sessionID, session: { audio: false, video: false, screen: false, data: true } }, options.screenNotDefaultForParticipant);
                	else {
                		var webRtcHub = $.connection.webRtcHub;
                		webRtcHub.server.getSessionDetails($.connection.hub.qs.sessionid, options.sessionID).done(function (result) {
                			if (result) {
                				session = JSON.parse(result);
								sessions[options.sessionID] = session;
								BizAPP.UI.Collaboration.Connect(options, { session: session, sessionid: options.sessionID }, options.screenNotDefaultForParticipant);
                			}
                			else {
                				debug("Failed to connect to the conference room, could not find the details.", "exception");
                			}
                		});
                	}
                }
            });
        });
    },
    InitiateScript: function (strJS, user) {
    	var peer;
    	if (user) {
    		$.each(BizAPP.UI.Collaboration.participants, function (i, n) {
    			if (n.userid == user)
    				peer = n.peerid;
    		});
    	}

    	BizAPP.UI.Collaboration.connection.send('js:' + strJS, peer);
    },

    Recorder: {},
    CheckRecord: function (peer) {
    	if (BizAPP.UI.Collaboration.connection.extra.recording) 
    		BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.Record();', peer);
    },
    Record: function () {
    	if (BizAPP.UI.Collaboration.connection.isInitiator)
    		BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.Record();');

        if ($('.bza-vr-record').text() == 'Stop Recording') {
        	BizAPP.UI.Collaboration.connection.extra.recording = false;
        	var file=BizAPP.UI.Collaboration.connection.extra['session-name']
        	BizAPP.UI.Collaboration.StopRecordAudio(function (a, b) {
        		if (b)
        			var afile = new File([b], file + ".wav");
        		if (BizAPP.UI.Collaboration.connection.isInitiator)
					BizAPP.UI.Collaboration.StopRecordScreen(function (c, d) {
						if(d)
							var dfile = new File([d], file + ".webm")
        				if (afile)
        					BizAPP.UI.Collaboration.UploadToServer([afile, dfile]);
        				else
							BizAPP.UI.Collaboration.UploadToServer([dfile]);
        			});
        		else {
        			if (afile)
        				BizAPP.UI.Collaboration.UploadToServer([afile]);
        		}
        	});
        	$('.bza-vr-record').text('Start Recording');
		}
        else {
        	BizAPP.UI.Collaboration.connection.extra.recording = true;
        	BizAPP.UI.Collaboration.RecordAudio();
        	if (BizAPP.UI.Collaboration.connection.isInitiator)
        		BizAPP.UI.Collaboration.RecordScreen();
            $('.bza-vr-record').text('Stop Recording');
        }
    },
    UploadToServer: function (files) {
    	BizAPP.UI.InlinePopup.Alert({
    		errorMessage: '<style>.bza-alrtContent{font-size:2rem; text-align:center}.bza-alrtFooter,.bza-alrtTitle{display:none}</style><i class="fa fa-spin fa-cog"></i> Please wait\
<div id="bza-vr-upload" type="multiple"><div id="demo-files"></div></div>',
    		type: 'info'
    	})
    	setTimeout(function () {
    		var uploader = $('#bza-vr-upload').dmUploader({
    			url: 'upload.asmx?mode=bza-vrr&roid=' + getObject($(BizAPP.UI.Collaboration.selector)) + '&advanced=upload.txt::::::false::',
    			maxFileSize: '0',
    			extFilter: '',
    			onInit: function () {
    				this.trigger($.Event('drop', { dataTransfer: { files: files } }));
    			},
    			onNewFile: function (id, file) {
    				$.danidemo.addFile('#bza-vr-upload #demo-files', id, file);
    				return true;
    			},
    			onBeforeUpload: function (id, file) {
    				$.danidemo.updateFileStatus(id, 'default', 'Uploading...');
    				return 'upload.asmx?mode=bza-vrr&roid=' + getObject($(BizAPP.UI.Collaboration.selector)) + '&advanced='+ file.name +'::::::false::'
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
    							setTimeout(function () { $('#demo-file' + id).remove(); }, 1000);
    						}
    						else {
    							$.danidemo.updateFileStatus(id, 'error', response[1]);
    							debug(response[1], 'exception', '');
    							$.danidemo.updateFileProgress(id, '0%');
    						}
    					}
    				}
    			},
    			onUploadError: function (id, message) {
    				$.danidemo.updateFileStatus(id, 'error', message);
    				$.danidemo.updateFileProgress(id, '0%');
    			},
    			onComplete: function () {
    				$('.bza-alrtCont').prev().remove();
    				$('.bza-alrtCont').remove();
    			}
    		});
    	}, 101);
    	return;

    	function xhr(url, data, callback) {
    		var request = new XMLHttpRequest();
    		request.onreadystatechange = function () {
    			if (request.readyState == 4 && request.status == 200) {
    				callback(location.href + request.responseText);
    			}
    		};
    		request.open('POST', url);
    		request.send(data);
    	}

    	var formData = new FormData();
    	formData.append(fileType + '-blob', blob, fileName);
    	xhr('upload.asmx?mode=bza-vrr&roid=' + getObject($(BizAPP.UI.Collaboration.selector)) + '&advanced=' + fileName + '::::::false::', formData, function (fName) { });
    },

    RecordScreen: function(){
        var recordRTC;
        $.each(BizAPP.UI.Collaboration.connection.attachStreams, function () {
            if (this.type == 'local' && this.isScreen) {
                BizAPP.UI.Collaboration.Recorder.screen = RecordRTC(this, {
                	type: 'video',
                	mimeType: 'video/webm',
                	disableLogs: true,
                	canvas: { width: 320, height: 240 }
                });
                BizAPP.UI.Collaboration.Recorder.screen.startRecording();
            }
        });
    },
    StopRecordScreen: function (callback) {
    	var recordRTC = BizAPP.UI.Collaboration.Recorder.screen;
    	if (recordRTC) {
    		recordRTC.stopRecording(function (audioURL) {
    			var recordedBlob = recordRTC.getBlob();
				callback('video', recordedBlob);
    		});
		}
		else
			callback('video', null);
    },
    RecordAudio: function (e) {
        $.each(BizAPP.UI.Collaboration.connection.attachStreams, function () {
            if (this.type == 'local' && (this.isAudio || (this.isVideo && !this.isScreen))) {
            	BizAPP.UI.Collaboration.Recorder.audio = RecordRTC(this, {
            		type: 'audio',
            		recorderType: StereoAudioRecorder,
            		numberOfAudioChannels: 1, bufferSize: 512
            	});
            	BizAPP.UI.Collaboration.Recorder.audio.startRecording();
            }
        });
    },
    StopRecordAudio: function (callback) {
    	var recordRTC = BizAPP.UI.Collaboration.Recorder.audio;
    	if (recordRTC) {
    		recordRTC.stopRecording(function (audioURL) {
    			var recordedBlob = recordRTC.getBlob();
				callback('audio', recordedBlob);
    		});
    	}
		else
    		callback('audio', null);
    },

    SwitchScreen: function (disable) {
    	BizAPP.UI.Collaboration.DetectPlugin(function (a) {
    		if (a == 'not-installed') {
    			BizAPP.UI.Collaboration._promptPlugin = false;
    			var b = function () { zoomout(); BizAPP.UI.Collaboration.SwitchScreen(disable) };
    			BizAPP.UI.Collaboration.ChromeScreenPlugin(b, function () {
    				zoomout();
    				//todo - error message
    			});
    			return;
    		}

    		var es = false;
    		$.each(BizAPP.UI.Collaboration.connection.attachStreams, function () {
    			if (this.type == 'local' && this.isScreen === true) {
    				es = true;
    				this.stop();
    			}
    		});
    		if (es)
    			BizAPP.UI.Collaboration.connection.attachStreams = $.grep(BizAPP.UI.Collaboration.connection.attachStreams, function (a) { return a.active; })

    		if (!disable)
    			setTimeout(function () {
    				BizAPP.UI.Collaboration.connection.addStream({
    					screen: true
    				});
    			}, es ? 2000 : 0);
    	})
    },

    RequestStream: function (user, event) {
    	// allowed only for initiator
    	if (!BizAPP.UI.Collaboration.connection.extra.initiator)
    		return;

    	peer = $(user).attr('peerid'), initiator = $(user).attr('userid');
    	if ((peer && peer != 'undefined') || (initiator && initiator == BizAPP.UI.Collaboration.connection.extra.userid)) {
    		var src = $(getSourceElement(event));
    		if (src.hasClass('fa-desktop')) {
    			var screen = src.hasClass('videoConference-Screen-Active');
    			var video = $(user).find('.videoConference-sprite-Video').hasClass('videoConference-sprite-Video-Active');
    			var audio = $(user).find('.videoConference-sprite-Voice').hasClass('videoConference-sprite-Voice-Active');
    			if (initiator && initiator == BizAPP.UI.Collaboration.connection.extra.userid)
    				BizAPP.UI.Collaboration.Reconnect(!screen, video, audio);
    			else
    				BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.EReconnect(' + !screen + ',' + video + ',' + audio + ');', peer);
    		}
    		else if (src.hasClass('videoConference-sprite-Video')) {
    			var part;
    			$.each(BizAPP.UI.Collaboration.participants, function (i, n) {
    				if (n.peerid == peer || n.userid == initiator) {
    					part = n;
    				}
    			})
    			if (part.hasWebcam) {
    				var screen = $(user).find('.fa-desktop').hasClass('videoConference-Screen-Active');
    				var video = src.hasClass('videoConference-sprite-Video-Active');
    				var audio = $(user).find('.videoConference-sprite-Voice').hasClass('videoConference-sprite-Voice-Active');
    				if (initiator && initiator == BizAPP.UI.Collaboration.connection.extra.userid)
    					BizAPP.UI.Collaboration.Reconnect(screen, !video, audio);
    				else
    					BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.EReconnect(' + screen + ',' + !video + ',' + audio + ');', peer);
    			}
    		}
    		else if (src.hasClass('videoConference-sprite-Voice')) {
    			var part;
    			$.each(BizAPP.UI.Collaboration.participants, function (i, n) {
    				if (n.peerid == peer || n.userid == initiator) {
    					part = n;
    				}
    			})
    			if (part.hasMicrophone) {
    				var screen = $(user).find('.fa-desktop').hasClass('videoConference-Screen-Active');
    				var video = $(user).find('.videoConference-sprite-Video').hasClass('videoConference-sprite-Video-Active');
    				var audio = src.hasClass('videoConference-sprite-Voice-Active');
    				if (initiator && initiator == BizAPP.UI.Collaboration.connection.extra.userid)
    					BizAPP.UI.Collaboration.Reconnect(screen, video, !audio);
    				else
    					BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.EReconnect(' + screen + ',' + video + ',' + !audio + ');', peer);
    			}
    		}
    	}
    },
    EReconnect: function (screen, video, audio) {
    	var msg = '', confirm = false;
    	if (BizAPP.UI.Collaboration.connection.extra.screenShared != screen) {
    		msg = screen ? 'Host has requested you to share your screen' : 'Host has stopped your screen'
    		confirm = screen;
    	}
    	else if (BizAPP.UI.Collaboration.connection.extra.videoShared != video) {
    		msg = video ? 'Host has requested you to share your webcam' : 'Host has stopped your webcam'
    		confirm = video;
		}
    	else if (BizAPP.UI.Collaboration.connection.extra.audioShared != audio) {
    		msg = audio ? 'Host has requested you to share your audio' : 'Host has stopped your audio'
    		confirm = audio;
		}

    	if (confirm) {
    		BizAPP.UI.InlinePopup.Confirm({
    			message: msg,
    			type: "Confirm",
    			fnOkOnclick: function () {
    				BizAPP.UI.Collaboration.Reconnect(screen, video, audio);
    			},
    			fnCancelOnclick: function () { }
    		});
    	}
    	else {
    		BizAPP.UI.InlinePopup.Alert({
    			errorMessage: '<style>.bza-alrtContent{text-align:center}.bza-alrtFooter,.bza-alrtTitle{display:none}</style>'+msg+
'<br/><br/><i class="fa fa-spin fa-cog"></i> Please wait',
    			type: 'info'
    		})
    		BizAPP.UI.Collaboration.Reconnect(screen, video, audio);
    		setTimeout(function () {
    			$('.bza-alrtCont').prev().remove();
    			$('.bza-alrtCont').remove();
    		}, 2000);
		}
    },
    Reconnect: function (screen, video, audio) {
    	debugger;
    	BizAPP.UI.Collaboration._options.reconnect = true;
    	BizAPP.UI.Collaboration._options.screen = screen;
    	BizAPP.UI.Collaboration._options.video = video;
		BizAPP.UI.Collaboration._options.audio = audio;
		BizAPP.UI.Collaboration.connection.mediaConstraints = {
			audio: audio,
			video: video ? {
				width: {
					ideal: 1280
				},
				height: {
					ideal: 720
				},
				frameRate: 30
			} : false
		}

    	if (BizAPP.UI.Collaboration.useSocketIO) {
    		BizAPP.UI.Collaboration.connection.dontCaptureUserMedia = false;

    		if (BizAPP.UI.Collaboration.connection.extra.audioShared != audio || BizAPP.UI.Collaboration.connection.extra.videoShared != video) {
    			$.each(BizAPP.UI.Collaboration.connection.attachStreams, function () {
    				if (this.type == 'local' && this.isAudio || (this.isVideo && !this.isScreen)) {
    					BizAPP.UI.Collaboration.connection.removeStream(this.streamid);
    					this.stop();
    				}
    			});
    			setTimeout(function () {
    				BizAPP.UI.Collaboration.connection.session.audio = audio;
    				BizAPP.UI.Collaboration.connection.extra.audioShared = audio;
    				BizAPP.UI.Collaboration.connection.session.video = video;
    				BizAPP.UI.Collaboration.connection.extra.videoShared = video;

    				if (audio && video)
    					BizAPP.UI.Collaboration.connection.addStream({ audio: true, video: true });
    				else if (audio)
    					BizAPP.UI.Collaboration.connection.addStream({ audio: true, video: false });
    				else if (video)
    					BizAPP.UI.Collaboration.connection.addStream({ video: true, audio:false });
    			}, 1000);
    		}
    		if (BizAPP.UI.Collaboration.connection.extra.screenShared != screen) {
    			BizAPP.UI.Collaboration.connection.session.screen = screen;
    			BizAPP.UI.Collaboration.connection.extra.screenShared = screen;

    			if (screen == false) {
    				$.each(BizAPP.UI.Collaboration.connection.attachStreams, function () {
    					if (this.type == 'local' && this.isScreen) {
    						BizAPP.UI.Collaboration.connection.removeStream(this.streamid);
    						this.stop();
    					}
    				});
    			}
    			else 
    				BizAPP.UI.Collaboration.connection.addStream({ screen: true, oneway: true });
    		}

    		BizAPP.UI.Collaboration.connection.attachStreams = $.grep(BizAPP.UI.Collaboration.connection.attachStreams, function (a) { return a.active; })
    		if (BizAPP.UI.Collaboration.connection.attachStreams.length == 0) {
    			if (typeof webkitMediaStream !== 'undefined')
    				BizAPP.UI.Collaboration.connection.attachStreams.push(new webkitMediaStream());
    			else if (typeof MediaStream !== 'undefined')
    				BizAPP.UI.Collaboration.connection.attachStreams.push(new MediaStream());
    		}
    	}
    	else {
    		BizAPP.UI.Collaboration.SwitchScreen(true);
    		BizAPP.UI.Collaboration.connection.leave();
    		BizAPP.UI.Collaboration.Join(BizAPP.UI.Collaboration._options);
    	}
    },

    SendSignalRMessage: function (message, channel) {
        message = JSON.stringify({
            message: message,
            channel: channel
        });

        var webRtcHub = $.connection.webRtcHub;
        //console.log("sent: " + BizAPP.UI.Collaboration.connection.isInitiator.toString() + "-" + message)
        webRtcHub.server.sendWebRTCMsg(message);
    },
    MakePresenter: function (screen, video, audio) {
    	BizAPP.UI.Collaboration.connection.addStream({ screen: screen, video: video, audio: audio });
    },
    StopPresenter: function(){
    	BizAPP.UI.Collaboration.Reconnect(false, false, false);
    },
    PresentAgain: function (e) {
        var uniqueid = $(e.target).closest('.user-list-item').attr('userid');
        var changePresenter = {
            presentAgain: true,
            uniqueId: uniqueid,
            extra: BizAPP.UI.Collaboration.connection.extra || {},
            userid: BizAPP.UI.Collaboration.connection.userid,
            sessionid: BizAPP.UI.Collaboration.connection.sessionid
        };
        BizAPP.UI.Collaboration.connection.socket.send2(changePresenter);
        $(BizAPP.UI.Collaboration.connection.streams.selectAll([])).each(function () {
            if (this.extra.userid == uniqueid)
                $(this.mediaElement).closest('.media-container').show();
            else
                $(this.mediaElement).closest('.media-container').hide();
        });
    },
    Connect: function (options, session, joinWithoutScreen) {
    	if (!session) alert('No room to join.');

    	
    	BizAPP.UI.Collaboration.connection.DetectRTC.load(function () {
    		if ((DetectRTC.browser.isChrome && BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource == 'screen') || joinWithoutScreen) {
    			session.session.screen = false;
    		}

    		if (!BizAPP.UI.Collaboration.connection.DetectRTC.hasMicrophone) {
    			session.session.audio = false;
    		}

    		if (!BizAPP.UI.Collaboration.connection.DetectRTC.hasWebcam) {
    			session.session.video = false;
    		}

    		if (options.reconnect) {
    			session.session.audio = options.audio;
    			session.session.video = options.video;
    			session.session.screen = options.screen;
    		}
    		else {
    			if (session.session.audio) session.session.audio = false;
    			if (session.session.video) session.session.video = false;
    			if (session.session.screen) session.session.screen = false;
    		}

    		BizAPP.UI.Collaboration.connection.extra = {
    			'session-name': options.user.name || 'Anonymous',
    			'userid': options.user.userid,
    			'initiator': false,
    			'hasMicrophone': BizAPP.UI.Collaboration.connection.DetectRTC.hasMicrophone,
    			'hasWebcam': BizAPP.UI.Collaboration.connection.DetectRTC.hasWebcam,
    			'isScreenCapturingSupported': BizAPP.UI.Collaboration.connection.DetectRTC.isScreenCapturingSupported,
    			'audioShared': session.session.audio, 'videoShared': session.session.video, 'screenShared': session.session.screen
    		};

    		BizAPP.UI.Collaboration.connection.session = session.session;
    		BizAPP.UI.Collaboration.connection.checkPresence(session.sessionid, function (started, b) {
    			if (!started) {
    				if (System.OnlineConference.HostAbsent)
    					System.OnlineConference.HostAbsent();
    			}
    			else {
    				BizAPP.UI.Collaboration.connection.join(session, function () {
    					$('.bza-alrtCont').prev().remove(); $('.bza-alrtCont').remove();
    					if (System.OnlineConference.OnConnect)
    						System.OnlineConference.OnConnect(session.session);
    				});
    			}
    		})
    		
    		$('#webcam-container').css('height', 'auto');

    	});
    },
    GetConfiguredMode: function (options) {
        var supportedMode = '';
        switch (options.mode) {
            case "ScreenOnly":
                supportedMode = "screen+";
                break;
            case "VideoOnly":
                supportedMode = "video+audio+"
                break;
            default:
                supportedMode = "screen+video+audio+"
        }
        if (options.dataEnabled)
            supportedMode = supportedMode + "data";

        return supportedMode;
    },
    DisplayModeWise: function (options) {
        switch (options.mode) {
            case "ScreenOnly":
                $('[onclick="BizAPP.UI.Collaboration.ShowVideos();"]').hide();
                $('.videoConference-content-sharingScreen-Row-container').hide();
                $('.videoConference-content-sharingScreen-container').css('min-height', '83px');
                break;
            case "VideoOnly":
                $('[onclick="BizAPP.UI.Collaboration.ShowScreens();"]').hide();
                $('.videoConference-content-sharingScreen-Row-container').hide();
                $('.videoConference-content-sharingScreen-container').css('min-height', '156px');
                break;
            default:
        }
        if (!options.dataEnabled)
            $('.videoConference-sprite-Chat').parent().hide();
    },
    ShareScreen: function (e) {
        BizAPP.UI.Collaboration.connection.addStream({
            screen: true,
            oneway: true
        });
    },
    ShareVideo: function (e) {
    	BizAPP.UI.Collaboration.connection.addStream({
            video: true
        });
    },
    ShowScreens: function (e) {
        $('.bza-middle-container').hide();
        $('#tileVideos-container').show();
    },
    ShowVideos: function (e) {
        $('.bza-middle-container').hide();
        $('#tilewebcam-container').show();
    },
    ShowWhiteboard: function (e) {
        if ($('.videoConference-Whiteboard-container').is(':visible')) {
            //$('.videoConference-Whiteboard-container, .videoConference-customView-container').hide();
            //$('.videoConference-mainVideo-container').show();
        }
        else {
            $('.videoConference-mainVideo-container, .videoConference-customView-container').hide();
            $('.videoConference-Whiteboard-container').show();
        }
    },
    WhiteboardInit: function (initiate) {
        if (initiate) {
            BizAPP.UI.Collaboration.ShowWhiteboard();
            setTimeout(BizAPP.UI.Collaboration.ShowWhiteboard(), 100);
        }
    },
    ShowConference: function (e) {
        $('.bza-middle-container').hide();
        $('#course-container').show();
    },
    ShowAttendees: function (e) {
        $('.bza-middle-container').hide();
        $('#attendees-container').show();
    },
    ShowChat: function (e) {
        $('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').removeClass('blink');
        $('.bza-middle-container').hide();
        $('#chat-container').show();
    },
    ShowSharedFiles: function (e) {
        $('.bza-middle-container').hide();
        $('#sent-files').show();
    },
    MenuLinkDrilldown: function (options) {
        options = options || { formId: '', controlname: '', context: '', linkCtrlName: '', targetViewControlName: '' };
        ajaxAsyncCall('HelperEx', ['WebConferenceLinkDrilldown', options.formId, options.controlname, options.context, options.linkCtrlName, options.targetViewControlName]);
        $('.bza-middle-container').hide();
        $('#extension-view-container').parent().show();
    },
    UpdateCurrentTime: function () {
    	return;
        $('#main-video-container').find('video').on(
        "timeupdate",
        function (event) {
            $('.videoConference-videoDispaly-Controls-VideoTime-container').text('00:' + BizAPP.UI.Collaboration.TimeFormat(this.currentTime));
        });
    },
    TimeFormat: function (seconds) {
        var m = Math.floor(seconds / 60) < 10 ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60);
        var s = Math.floor(seconds - (m * 60)) < 10 ? '0' + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
        return m + ':' + s;
    },
    UpdateStreamCount: function () {
        var videoCount = $('#tileVideos-container').find('video').length.toString();
        $('[onclick="BizAPP.UI.Collaboration.ShowScreens();"] .videoConference-menu-Link-title-count').text(videoCount);
        $('#tileVideos-container').attr('class', 'bza-middle-container c' + videoCount);

        var screenCount = $('#tilewebcam-container').find('video').length.toString()
        $('[onclick="BizAPP.UI.Collaboration.ShowVideos();"] .videoConference-menu-Link-title-count').text(screenCount);
        $('#tilewebcam-container').attr('class', 'bza-middle-container c' + screenCount);
    },
    SwitchStreams: function () {
        var cls = $('#sharing-video-container').find('video').attr('class');
        $('#main-video-container').append($('#sharing-video-container').find('.media-container'));
        $('#sharing-video-container').append($('#main-video-container').find('video').not('.' + cls).closest('.media-container'));
        $('#main-video-container').find('video').get(0).play();
        setTimeout(function () { $('#sharing-video-container').find('video').get(0).play(); }, 10);
        BizAPP.UI.Collaboration.InitAccordion();
    },
    CenterStream: function (e) {
        if ($(e.target).closest('#main-video-container').length)
            return;
        $('#main-video-container').find('.media-container').remove();
        $('#main-video-container').append($(e.target).closest('.media-container').clone(true)[0]);
        setTimeout(function () {
            var $videoElement = $('#main-video-container').find('video');
            $videoElement.get(0).play();
            $videoElement.get(0).muted = true;
            $videoElement.get(0).volume = 0;
        }, 10);

        $('.videoConference-customView-container, .videoConference-Whiteboard-container').hide();
        $('.videoConference-mainVideo-container').show();

        BizAPP.UI.Collaboration.InitAccordion();
        BizAPP.UI.Collaboration.UpdateCurrentTime();
    },
    PausePlayVideo: function (e) {
        var $target = $(e.target);
        if ($target.attr('title') == 'Play') {
            $target.removeClass('videoConference-sprite-VideoPlay');
            $target.addClass('videoConference-sprite-VideoPause');
            $('#main-video-container video').get(0).play();
            $target.attr('title', 'Pause')
        }
        else {
            $target.removeClass('videoConference-sprite-VideoPause');
            $target.addClass('videoConference-sprite-VideoPlay');
            $('#main-video-container video').get(0).pause();
            $target.attr('title', 'Play');
        }
    },
    ZoomOutVideo: function (e) {
        var $media = $('#main-video-container video');
        if ($media.attr('class') == 'webcam') {
            $('.videoConference-sprite-Sharing').click()
            $('#tilewebcam-container').find('#' + $media.attr('id')).closest('.media-container').find('.volume-control .zoom-in').click();
        }
        else {
            $('.videoConference-sprite-Screen').click()
            $('#tileVideos-container').find('#' + $media.attr('id')).closest('.media-container').find('.volume-control .zoom-in').click();
        }
    },
    EqualHeight: function (container) {
        var currentTallest = 0,
             currentRowStart = 0,
             rowDivs = new Array(),
             $el,
             topPosition = 0;

        $(container).each(function () {

            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            }
            else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    },
    ClosestEdge: function (x, y, w, h) {
        var topEdgeDist = BizAPP.UI.Collaboration.DistMetric(x, y, w / 2, 0);
        var bottomEdgeDist = BizAPP.UI.Collaboration.DistMetric(x, y, w / 2, h);
        var leftEdgeDist = BizAPP.UI.Collaboration.DistMetric(x, y, 0, h / 2);
        var rightEdgeDist = BizAPP.UI.Collaboration.DistMetric(x, y, w, h / 2);
        var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
        switch (min) {
            case leftEdgeDist:
                return "left";
            case rightEdgeDist:
                return "right";
            case topEdgeDist:
                return "top";
            case bottomEdgeDist:
                return "bottom";
        }
    },
    DistMetric: function (x, y, x2, y2) {
        var xDiff = x - x2;
        var yDiff = y - y2;
        return (xDiff * xDiff) + (yDiff * yDiff);
    },
    TabletViewInit: function () {
        $(window).resize(function () {
            if ($(window).width() <= 800) {
                $('.videoConference .videoConference-menu-Link-container').click(function () {
                    var $parentContainer = $(this).parent();
                    var $rightContainer = $parentContainer.next('.videoConference-content-container');

                    if ($rightContainer.is(':visible')) {
                        $rightContainer.hide('slide', { direction: 'right' }, 500);
                    }
                    else {
                        $rightContainer.show('slide', { direction: 'right' }, 500);
                    }
                });

                $('.videoConference-content-NavLinks-Link-img-container.videoConference-sprite-Close').click(function () {
                    var $rightContainer = $(this).closest('.videoConference .videoConference-content-container');

                    if ($rightContainer.is(':visible')) {
                        $rightContainer.hide('slide', { direction: 'right' }, 500);
                    }
                });
            }
            else {
                $('.videoConference .videoConference-content-container').show();
            }
        });

        if ($(window).width() <= 800) {
            $('.videoConference .videoConference-menu-Link-container').click(function () {
                var $parentContainer = $(this).parent();
                var $rightContainer = $parentContainer.next('.videoConference-content-container');

                if ($rightContainer.is(':visible')) {
                    $rightContainer.hide('slide', { direction: 'right' }, 500);
                }
                else {
                    $rightContainer.show('slide', { direction: 'right' }, 500);
                }
            });

            $('.videoConference-content-NavLinks-Link-img-container.videoConference-sprite-Close').click(function () {
                var $rightContainer = $(this).closest('.videoConference .videoConference-content-container');

                if ($rightContainer.is(':visible')) {
                    $rightContainer.hide('slide', { direction: 'right' }, 500);
                }
            });
        }
    },
    InitChatAccordion: function (accordionWrapper, accordianHeaderSelector, accordionActiveClass) {

        var $accordionClicker = $(accordianHeaderSelector);

        $accordionClicker.parents(accordionWrapper).find(accordianHeaderSelector).removeClass(accordionActiveClass);
        $accordionClicker.next('div').hide();

        $accordionClicker.click(function () {
            var $this = $(this);
            $accordionClicker.removeClass(accordionActiveClass);
            $accordionClicker.next('div').hide('slide', { direction: 'up' }, 200);

            if (!$this.hasClass(accordionActiveClass) && !$this.next('div').is(':visible')) {
                $this.addClass(accordionActiveClass);
                $this.next('div').show('slide', { direction: 'up' }, 800);
            }
            else {
                $this.removeClass(accordionHeader);
                $this.next('div').hide('slide', { direction: 'up' }, 500);
            }
        });
    },

    InitiateRefreshParticipants: function () {
    	BizAPP.UI.Collaboration.RefreshParticipants(BizAPP.UI.Collaboration.UpdateParticipants);
    	BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.RefreshParticipants(BizAPP.UI.Collaboration.UpdateParticipants);');
    },
    RefreshParticipants: function (callback) {
    	BizAPP.UI.Collaboration.allAttendees = null;
    	BizAPP.UI.Collaboration.GetParticipantList(function (result, b) {
    		realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetUserFullnames', result], false, function (data, textStatus, jqXHR) {
                	var fnArray = JSON.parse(data.value[1]);
                	$.each(fnArray, function (i, v) {
                		if (i) {
                			var found = false;
                			$.each(BizAPP.UI.Collaboration.participants, function (j, n) {
                				if (n.userid == i)
                					found = true;
                			});

                			if (!found) {
                				var participant = {
                					'name': v, 'userid': i,
                					'initiator': false, 'hasMicrophone': false,
                					'hasWebcam': false, 'isScreenCapturingSupported': false,
                					'audioShared': false, 'videoShared': false, 'screenShared': false, offline: true
                				};
                				BizAPP.UI.Collaboration.participants.push(participant);
                			}
                		}
                	});
                	callback();
                });
    	});
    },

    UpdateParticipants: function (initiate) {
        $('.attendees-list-container').find('div.user-list-item').remove();
        var participants = [];
        var direction = $('.videoConference').attr('bza_wc_direction');
        if (!initiate && (direction == "one-way" || direction == "one-to-one")) {
            $.each(BizAPP.UI.Collaboration.participants, function () {
                var participant = $(this)[0];
                if (participant.initiator || participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"])
                    participants.push(participant);
            });
        }
        else {
            participants = BizAPP.UI.Collaboration.participants;
        }

        $.each(participants, function () {
            var participant = $(this)[0];
            $('.attendees-list-container').append('<div class="videoConference-content-Attendees-List-Row-container Left user-list-item bza-vr-offline'+participant.offline+'" peerid="' + participant.peerid + '" userid="{0}" onclick="BizAPP.UI.Collaboration.RequestStream(this,event);"><div class="videoConference-content-Attendees-List-Row-AttendeesImg-container Left">\
			<img class="videoConference-content-Attendees-List-Row-AttendeesImg" src="testresource.aspx?resize=1&amp;h=50&amp;w=50&amp;id2=ESystema4d6a&amp;userid={0}"/></div>\
			<div class="videoConference-content-Attendees-List-Row-AttendeesName-container Left single-line-ellipsis ">{1}</div>\
			{2}{3}{4}{5}{6}</div>'.format(participant.userid, participant.name, '<div class="videoConference-content-Attendees-List-Row-AttendeesVoice-container Left videoConference-sprite\
            videoConference-sprite-Voice {0}" title="{1}">&nbsp;</div>'.format(participant.audioShared ? 'videoConference-sprite-Voice-Active' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ?
            (!participant.audioShared ? 'Share Audio' : 'Audio has been shared') : (!participant.audioShared ? 'Audio has not been shared' : 'Audio has been shared')), '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container \
            Left videoConference-sprite videoConference-sprite-Video {0}" title="{2}">&nbsp;</div>'.format(participant.videoShared ? 'videoConference-sprite-Video-Active' : '', (participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"]
            && !participant.videoShared) ? 'BizAPP.UI.Collaboration.ShareVideo(event);' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ?
            (!participant.videoShared ? 'Share Video' : 'Webcam has been shared') : (!participant.videoShared ? 'Webcam has not been shared' : 'Webcam has been shared')), '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container Left fa fa-desktop videoConference-Screen {0}" title="{2}"></div>'.format(participant.screenShared ?
                'videoConference-Screen-Active' : 'Webcam has been shared', (participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] && !participant.screenShared) ? 'BizAPP.UI.Collaboration.ShareScreen(event);' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ? (!participant.screenShared ?
                'Share Screen' : 'Screen has been shared') : (!participant.screenShared ? 'Screen has not been shared' : 'Screen has been shared')),
				'', ''));
        });
        $('[onclick="BizAPP.UI.Collaboration.ShowAttendees();"] .videoConference-menu-Link-title-count, .videoConference-mainchat-tab-ChatCount').text(participants.length.toString());
        if (BizAPP.UI.Collaboration.connection && BizAPP.UI.Collaboration.connection.extra.initiator)
        	BizAPP.UI.Collaboration.StoreParticipantList();
    },
    InitiateChat: function (roid) {
        BizAPP.Session.EvaluateExpression({
            expression: 'Session.InitiateChat("' + roid + '")',
            compute: true,
            callback: function () {
                $('.popout').click();
            }
        })
    },
    InitAccordion: function () {
        BizAPP.UI.Collaboration.EqualHeight('.videoConference-landingCol-same-height');

        $(document).resize(function () {
            BizAPP.UI.Collaboration.EqualHeight('.videoConference-landingCol-same-height');
        });

        $('.videoConference-videoDispaly-holder-container').mouseover(function (e) {
            e.stopPropagation();
            var edge = BizAPP.UI.Collaboration.ClosestEdge(e.pageX, e.pageY, $(this).width(), $(this).height());
            if (edge == 'bottom')
                $(this).next('div.videoConference-videoDispaly-Controls-container').show('slide', { direction: 'bottom' }, 500);
        });

        BizAPP.UI.Collaboration.TabletViewInit();

        var accordianHeaderSelector = '.accordian-h1';

        BizAPP.UI.Collaboration.InitChatAccordion('.tabcontent-accordion-Wrapper', accordianHeaderSelector, '.tabcontent-accordion-Active');
        $('.videoConference-content-mainchat-tab-livechat-container').click(function () {
            if (!$('.videoConference-content-mainchat-tabcontent-livechat-container').is(':visible')) {
                $('.videoConference-content-mainchat-tabcontent-attendeeschat-container').hide('slide', { direction: 'right' }, 500);
                $('.videoConference-content-mainchat-tabcontent-livechat-container').show('slide', { direction: 'left' }, 800, function () {
                    BizAPP.UI.Collaboration.EqualHeight('.videoConference-landingCol-same-height');
                });
            }
        });
        $('.videoConference-content-mainchat-tab-attendeeschat-container').click(function () {
            if (!$('.videoConference-content-mainchat-tabcontent-attendeeschat-container').is(':visible')) {
                $('.videoConference-content-mainchat-tabcontent-livechat-container').hide('slide', { direction: 'left' }, 500)
                $('.videoConference-content-mainchat-tabcontent-attendeeschat-container').show('slide', { direction: 'right' }, 800, function () {
                    BizAPP.UI.Collaboration.EqualHeight('.videoConference-landingCol-same-height');
                });
            }
        });

        if (typeof (callback) != 'undefined')
            callback();
    },
    InitUploadControl: function () {
        $.getCss(BizAPP.UI.GetBasePath('resources/uploader/uploader.css?v=' + __bts_));
        BizAPP.UI.TextEditor.LoadFontAwesomeCss();
        $.cachedScript(BizAPP.UI.GetBasePath('resources/uploader/dmuploader.js?v=' + __bts_)).done(function (script, textStatus) {
            $('#drag-and-drop-zoneWebRTC').bind('dragenter', BizAPP.UI.TextEditor.EnableImageUploader).bind('dragover', BizAPP.UI.TextEditor.EnableImageUploader)
            .bind('drop', BizAPP.UI.TextEditor.EnableImageUploader);
            var uploader = $('#drag-and-drop-zoneWebRTC').dmUploader({
                url: '',
                onInit: function () {
                    //console.log('Uploader init successfull');
                },
                onBeforeUpload: function (id) {
                    ProcessingStatus(true, true);
                },
                onNewFile: function (id, file) {
                    if (BizAPP.UI.Collaboration.participants.length > 1)
                        BizAPP.UI.Collaboration.connection.send(file);
                    else
                        debug("Files can be sent only when there are two or more participants.[type]info", "exception");
                },
                onUploadSuccess: function (id, data) {
                    ProcessingStatus(false, true);
                }
            });
        });
    },
    StoreValue: function (channnelId, sessionID, selector) {
        var $container = $(selector);
        var value = {};
        value["ChannelId"] = channnelId;
        value["SessionId"] = sessionID;
        BizAPP.RuntimeObject.SetFieldValue({ roid: getObject($container), fieldName: $container.attr('fieldname'), fieldValue: JSON.stringify(value), refreshView: false });
    },
    StoreParticipantList: function () {
        var $container = $(BizAPP.UI.Collaboration.selector);
        var value = '';
        $.each(BizAPP.UI.Collaboration.participants, function (i, v) {
            if (!v.initiator && !v.offline && v.userid)
                value += ((i == 0 ? '' : ',') + v.userid);
        });

        value = value.replace(/(^,)|(,$)/g, "");
        if (value) {
            BizAPP.RuntimeObject.SetFieldValue({ roid: getObject($container), fieldName: $container.attr('participantsfieldname'), fieldValue: value, refreshView: false });
        }
    },
    GetParticipantList: function (callback) {
        if (BizAPP.UI.Collaboration.allAttendees) {
            callback(BizAPP.UI.Collaboration.allAttendees, BizAPP.UI.Collaboration.roomList);
        }
        else {
            var $container = $(BizAPP.UI.Collaboration.selector);
            BizAPP.RuntimeObject.GetFieldValue({
                roid: getObject($container), fieldName: 'Attendees.Attendee.uniqueid', callback: function (result) {
                    //console.log('Attendees: ' + result.join(','));
                    BizAPP.RuntimeObject.GetFieldValue({
                        roid: getObject($container), fieldName: 'Host.uniqueid', callback: function (result1) {
                            //console.log('Owner: ' + result1.join(','));
                        	result.splice(0, 0, result1);
                            //console.log('Merge: ' + arr.join(','));
                            var unique = result.filter(function (itm, i, a) {
                                return i == a.indexOf(itm);
                            });
                            BizAPP.UI.Collaboration.allAttendees = unique.join(',');
                            //console.log('Unique: ' + unique.join(','));
                            if (BizAPP.UI.Collaboration.connection) {
                                var participants = $.grep(unique, function (a) {
                                    return a !== BizAPP.UI.Collaboration.connection.extra["userid"];
                                })
                                BizAPP.UI.Collaboration.allAttendees = participants.join(',');
                                //console.log('Participants: ' + BizAPP.UI.Collaboration.allAttendees);
                                if (BizAPP.UI.Whiteboard)
                                    BizAPP.UI.Whiteboard.userList = BizAPP.UI.Collaboration.allAttendees;
                            }
                            callback(BizAPP.UI.Collaboration.allAttendees, BizAPP.UI.Collaboration.roomList);
                            BizAPP.UI.Collaboration.roomList = unique.join(',');
                        }
                    });
                }
            });
        }
    },
    EnableImageUploader: function (e) {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
    },
    UpdateLabel: function (progress, label) {
        if (progress.position == -1) return;
        var position = +progress.position.toFixed(2).split('.')[1] || 100;
        $.danidemo.updateFileProgress(0, position);
    },
    GetCurrentTime: function () {
        var mid = ' am';
        var date = new Date();
        var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var hours = date.getHours();
        hours = (hours + 24) % 24;
        if (hours == 0) {
            hours = 12;
        }
        else if (hours >= 12) {
            if (hours != 12)
                hours = hours % 12;
            mid = ' pm';
        }
        return hours + ":" + mins + mid;
    },
    SendMessage: function () {
        $('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').removeClass('blink');
        var $chatInput = $('.videoConference-chatting-content-EditBox-Textarea-container #chat-input');
        BizAPP.UI.Collaboration.PostMessage(BizAPP.UI.Collaboration.connection.extra['session-name'], $chatInput.val(), false, BizAPP.UI.Collaboration.connection.extra['userid']);
        // sending text message
        BizAPP.UI.Collaboration.connection.send($chatInput.val());
        $chatInput.val('');
    },
    ShareLink: function () {
        var $chatInput = $('.videoConference-chatting-content-EditBox-Textarea-container #chat-input');
        BizAPP.UI.Collaboration.connection.send('js:BizAPP.UI.Collaboration.ActualShareLink("' + $chatInput.val() + '", "' + BizAPP.UI.Collaboration.connection.extra['session-name'] + '")');
        $chatInput.val('');
    },
    ActualShareLink: function (url, user) {
        if (url && user) {
            BizAPP.UI.InlinePopup.Confirm({
                message: user + ' shared a link with you. Do you want to open it?',
                type: "Confirm",
                fnOkOnclick: function () {
                    window.open(url);
                },
                fnCancelOnclick: function () { }
            });
        }
    },
    PostMessage: function (message, title, left, userid, systemMsg) {
        var template;
        if (systemMsg)
            template = '<div class="videoConference-chatting-content-{3}Row-container Left Padding-Top-5 Padding-Bottom-5 videoConference-chat-message"><div class="videoConference-chatting-content-ChatUser-ChatDetails-container Left" style="font-style: italic;color: #999;">{0}</div><div class="videoConference-chatting-content-ChatUser-ChatTime-container Left">{4}</div></div>';
        else
            template = '<div class="videoConference-chatting-content-{3}Row-container Left Padding-Top-5 Padding-Bottom-5 videoConference-chat-message"><div class="videoConference-chatting-content-ChatUser-Img-container {3} ">\
                        <img class="videoConference-chatting-content-ChatUser-Img" src="testresource.aspx?resize=1&amp;h=35&amp;w=35&amp;id2=ESystema4d6a&amp;userid={2}" style="margin-top: -2px;" />\
                        </div><div class="videoConference-chatting-content-ChatUser-ChatDetails-container Left"><span class="videoConference-chatting-content-ChatUser-Name">\
                        {1} : </span>{0}</div><div class="videoConference-chatting-content-ChatUser-ChatTime-container Left">{4}</div></div>'
        var formattedMsg;
        if (left)
            formattedMsg = template.format(title, message, userid, 'Left', BizAPP.UI.Collaboration.GetCurrentTime());
        else
            formattedMsg = template.format(title, message, userid, 'Right', BizAPP.UI.Collaboration.GetCurrentTime());
        $('#chat-output').append(formattedMsg);
        $('#chat-output').find('.videoConference-chat-message:last').scrollIntoView();
    },
    AppendDIV: function (div, parent, title, left) {
        var chatOutput = document.getElementById('chat-output'),
                       fileProgress = document.getElementById('sent-files');
        if (typeof div === 'string') {
            var content = div;
            div = document.createElement('div');
            if (left)
                div.className += 'msg chat_msg_left';
            else
                div.className += 'msg chat_msg_right';
            div.innerHTML = content;
        }

        if (!parent) {
            chatOutput.insertBefore(div, chatOutput.firstChild);
        }
        else $(fileProgress).append(div);

        div.tabIndex = 0;
        div.focus();
    },
    StopEventPropagation: function (e) {
        if ($(e.target).hasClass('mute-video') || $(e.target).hasClass('unmute-video'))
            e.stopPropagation();
    },
    StopEvent: function (e) {
        e.stopPropagation();
    },
    DetectPlugin: function (callback) {
    	window.RMCExtensionID = 'mkbmmkmmkppgkahchamcaaommnjpkghd';
        var isChrome = !!navigator.webkitGetUserMedia;
        var screenCallback;

        if (!isChrome) callback();

        BizAPP.UI.Collaboration.DetectRTC.screen = {
            chromeMediaSource: 'screen',
            getSourceId: function (callback) {
                if (!callback) throw '"callback" parameter is mandatory.';
                screenCallback = callback;
                window.postMessage('get-sourceId', '*');
            },
            isChromeExtensionAvailable: function (callback) {
                if (!callback) return;

                if (BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource == 'desktop') return callback(true);

                // ask extension if it is available
                window.postMessage('are-you-there', '*');

                setTimeout(function () {
                    if (BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource == 'screen') {
                        callback(false);
                    }
                    else callback(true);
                }, 2000);
            },
            onMessageCallback: function (data) {
                if (!(typeof data == 'string' || !!data.sourceId)) return;

                //console.log('chrome message', data);

                // "cancel" button is clicked
                if (data == 'PermissionDeniedError') {
                    BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource = 'PermissionDeniedError';
                    if (screenCallback) return screenCallback('PermissionDeniedError');
                    else throw new Error('PermissionDeniedError');
                }

                // extension notified his presence
                if (data == 'rtcmulticonnection-extension-loaded') {
                    BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource = 'desktop';
                }

                // extension shared temp sourceId
                if (data.sourceId) {
                    BizAPP.UI.Collaboration.DetectRTC.screen.sourceId = data.sourceId;
                    if (screenCallback) screenCallback(BizAPP.UI.Collaboration.DetectRTC.screen.sourceId);
                }
            },
            getChromeExtensionStatus: function (callback) {
                if (!!navigator.mozGetUserMedia) return callback('not-chrome');

                var extensionid = 'mkbmmkmmkppgkahchamcaaommnjpkghd';

                var image = document.createElement('img');
                image.src = 'chrome-extension://' + extensionid + '/icon.png';
                image.onload = function () {
                    BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource = 'screen';
                    window.postMessage('are-you-there', '*');
                    setTimeout(function () {
                        if (!BizAPP.UI.Collaboration.DetectRTC.screen.notInstalled) {
                            callback('installed-enabled');
                        }
                    }, 2000);
                };
                image.onerror = function () {
                    BizAPP.UI.Collaboration.DetectRTC.screen.notInstalled = true;
                    callback('not-installed');
                };
            }
        };

        // check if desktop-capture extension installed.
        if (window.postMessage && isChrome) {
            BizAPP.UI.Collaboration.DetectRTC.screen.isChromeExtensionAvailable();
        }

        BizAPP.UI.Collaboration.DetectRTC.screen.getChromeExtensionStatus(function (status) {
            if (status == 'installed-enabled') {
                BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource = 'desktop';
            }
            if (typeof (callback) != 'undefined')
                callback(status);
        });

        window.addEventListener('message', function (event) {
            if (event.origin != window.location.origin) {
                return;
            }

            BizAPP.UI.Collaboration.DetectRTC.screen.onMessageCallback(event.data);
        });
        if (isChrome)
            console.log('current chromeMediaSource', BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource);
        else {
            if (typeof (callback) != 'undefined')
                callback();
        }
    }
}

// Last time updated at August 19, 2014, 14:46:23

// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - github.com/muaz-khan/WebRTC-Experiment/tree/master/getMediaElement

// Demo          - www.WebRTC-Experiment.com/getMediaElement

//document.write('<link rel="stylesheet" href="https://cdn.WebRTC-Experiment.com/getMediaElement.css">');

// __________________
// getMediaElement.js

function getMediaElement(mediaElement, config) {
	config = config || {};

	if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
		if (!mediaElement.getVideoTracks().length) {
			return getAudioElement(mediaElement, config);
		}

		var mediaStream = mediaElement;
		mediaElement = document.createElement(mediaStream.getVideoTracks().length ? 'video' : 'audio');
		mediaElement[!!navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !!navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
	}

	if (mediaElement.nodeName && mediaElement.nodeName.toLowerCase() == 'audio') {
		return getAudioElement(mediaElement, config);
	}

	mediaElement.controls = true;

	var buttons = config.buttons || ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop'];
	buttons.has = function (element) {
		return buttons.indexOf(element) !== -1;
	};

	config.toggle = config.toggle || [];
	config.toggle.has = function (element) {
		return config.toggle.indexOf(element) !== -1;
	};

	var mediaElementContainer = document.createElement('div');
	mediaElementContainer.className = 'media-container';

	var mediaControls = document.createElement('div');
	mediaControls.className = 'media-controls';
	mediaElementContainer.appendChild(mediaControls);

	if (buttons.has('mute-audio')) {
		var muteAudio = document.createElement('div');
		muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
		mediaControls.appendChild(muteAudio);

		muteAudio.onclick = function () {
			if (muteAudio.className.indexOf('unmute-audio') != -1) {
				muteAudio.className = muteAudio.className.replace('unmute-audio selected', 'mute-audio');
				mediaElement.muted = false;
				mediaElement.volume = 1;
				if (config.onUnMuted) config.onUnMuted('audio');
			} else {
				muteAudio.className = muteAudio.className.replace('mute-audio', 'unmute-audio selected');
				mediaElement.muted = true;
				mediaElement.volume = 0;
				if (config.onMuted) config.onMuted('audio');
			}
		};
	}

	if (buttons.has('mute-video')) {
		var muteVideo = document.createElement('div');
		muteVideo.className = 'control ' + (config.toggle.has('mute-video') ? 'unmute-video selected' : 'mute-video');
		mediaControls.appendChild(muteVideo);

		muteVideo.onclick = function () {
			if (muteVideo.className.indexOf('unmute-video') != -1) {
				muteVideo.className = muteVideo.className.replace('unmute-video selected', 'mute-video');
				mediaElement.muted = false;
				mediaElement.volume = 1;
				mediaElement.play();
				if (config.onUnMuted) config.onUnMuted('video');
			} else {
				muteVideo.className = muteVideo.className.replace('mute-video', 'unmute-video selected');
				mediaElement.muted = true;
				mediaElement.volume = 0;
				mediaElement.pause();
				if (config.onMuted) config.onMuted('video');
			}
		};
	}

	if (buttons.has('take-snapshot')) {
		var takeSnapshot = document.createElement('div');
		takeSnapshot.className = 'control take-snapshot';
		mediaControls.appendChild(takeSnapshot);

		takeSnapshot.onclick = function () {
			if (config.onTakeSnapshot) config.onTakeSnapshot();
		};
	}

	if (buttons.has('stop')) {
		var stop = document.createElement('div');
		stop.className = 'control stop';
		mediaControls.appendChild(stop);

		stop.onclick = function () {
			mediaElementContainer.style.opacity = 0;
			setTimeout(function () {
				if (mediaElementContainer.parentNode) {
					mediaElementContainer.parentNode.removeChild(mediaElementContainer);
				}
			}, 800);
			if (config.onStopped) config.onStopped();
		};
	}

	var volumeControl = document.createElement('div');
	volumeControl.className = 'volume-control';

	if (buttons.has('record-audio')) {
		var recordAudio = document.createElement('div');
		recordAudio.className = 'control ' + (config.toggle.has('record-audio') ? 'stop-recording-audio selected' : 'record-audio');
		volumeControl.appendChild(recordAudio);

		recordAudio.onclick = function () {
			if (recordAudio.className.indexOf('stop-recording-audio') != -1) {
				recordAudio.className = recordAudio.className.replace('stop-recording-audio selected', 'record-audio');
				if (config.onRecordingStopped) config.onRecordingStopped('audio');
			} else {
				recordAudio.className = recordAudio.className.replace('record-audio', 'stop-recording-audio selected');
				if (config.onRecordingStarted) config.onRecordingStarted('audio');
			}
		};
	}

	if (buttons.has('record-video')) {
		var recordVideo = document.createElement('div');
		recordVideo.className = 'control ' + (config.toggle.has('record-video') ? 'stop-recording-video selected' : 'record-video');
		volumeControl.appendChild(recordVideo);

		recordVideo.onclick = function () {
			if (recordVideo.className.indexOf('stop-recording-video') != -1) {
				recordVideo.className = recordVideo.className.replace('stop-recording-video selected', 'record-video');
				if (config.onRecordingStopped) config.onRecordingStopped('video');
			} else {
				recordVideo.className = recordVideo.className.replace('record-video', 'stop-recording-video selected');
				if (config.onRecordingStarted) config.onRecordingStarted('video');
			}
		};
	}

	if (buttons.has('volume-slider')) {
		var volumeSlider = document.createElement('div');
		volumeSlider.className = 'control volume-slider';
		volumeControl.appendChild(volumeSlider);

		var slider = document.createElement('input');
		slider.type = 'range';
		slider.min = 0;
		slider.max = 100;
		slider.value = 100;
		slider.onchange = function () {
			mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
		};
		volumeSlider.appendChild(slider);
	}

	if (buttons.has('full-screen')) {
		var zoom = document.createElement('div');
		zoom.className = 'control ' + (config.toggle.has('zoom-in') ? 'zoom-out selected' : 'zoom-in');

		if (!slider && !recordAudio && !recordVideo && zoom) {
			mediaControls.insertBefore(zoom, mediaControls.firstChild);
		} else volumeControl.appendChild(zoom);

		zoom.onclick = function () {
			if (zoom.className.indexOf('zoom-out') != -1) {
				zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
				exitFullScreen();
			} else {
				zoom.className = zoom.className.replace('zoom-in', 'zoom-out selected');
				launchFullscreen(mediaElementContainer);
			}
		};

		function launchFullscreen(element) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}

		function exitFullScreen() {
			if (document.fullscreen) {
				document.cancelFullScreen();
			}

			if (document.mozFullScreen) {
				document.mozCancelFullScreen();
			}

			if (document.webkitIsFullScreen) {
				document.webkitCancelFullScreen();
			}
		}

		function screenStateChange(e) {
			if (e.srcElement != mediaElementContainer) return;

			var isFullScreeMode = document.webkitIsFullScreen || document.mozFullScreen || document.fullscreen;

			mediaElementContainer.style.width = (isFullScreeMode ? (window.innerWidth - 20) : config.width) + 'px';
			mediaElementContainer.style.display = isFullScreeMode ? 'block' : 'inline-block';

			if (config.height) {
				mediaBox.style.height = (isFullScreeMode ? (window.innerHeight - 20) : config.height) + 'px';
			}

			if (!isFullScreeMode && config.onZoomout) config.onZoomout();
			if (isFullScreeMode && config.onZoomin) config.onZoomin();

			if (!isFullScreeMode && zoom.className.indexOf('zoom-out') != -1) {
				zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
				if (config.onZoomout) config.onZoomout();
			}
			setTimeout(adjustControls, 1000);
		}

		document.addEventListener('fullscreenchange', screenStateChange, false);
		document.addEventListener('mozfullscreenchange', screenStateChange, false);
		document.addEventListener('webkitfullscreenchange', screenStateChange, false);
	}

	if (buttons.has('volume-slider') || buttons.has('full-screen') || buttons.has('record-audio') || buttons.has('record-video')) {
		mediaElementContainer.appendChild(volumeControl);
	}

	var mediaBox = document.createElement('div');
	mediaBox.className = 'media-box';
	mediaElementContainer.appendChild(mediaBox);

	mediaBox.appendChild(mediaElement);

	if (!config.width) config.width = (innerWidth / 2) - 50;

	mediaElementContainer.style.width = config.width + 'px';

	if (config.height) {
		mediaBox.style.height = config.height + 'px';
	}

	mediaBox.querySelector('video').style.maxHeight = innerHeight + 'px';

	var times = 0;

	function adjustControls() {
		mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - mediaControls.clientWidth - 2) + 'px';

		if (slider) {
			slider.style.width = (mediaElementContainer.clientWidth / 3) + 'px';
			volumeControl.style.marginLeft = (mediaElementContainer.clientWidth / 3 - 30) + 'px';

			if (zoom) zoom.style['border-top-right-radius'] = '5px';
		} else {
			volumeControl.style.marginLeft = (mediaElementContainer.clientWidth - volumeControl.clientWidth - 2) + 'px';
		}

		volumeControl.style.marginTop = (mediaElementContainer.clientHeight - volumeControl.clientHeight - 2) + 'px';

		if (times < 10) {
			times++;
			setTimeout(adjustControls, 1000);
		} else times = 0;
	}

	if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
		mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function () {
			adjustControls();
			mediaControls.style.opacity = 1;
			volumeControl.style.opacity = 1;
		};

		mediaElementContainer.onmouseleave = function () {
			mediaControls.style.opacity = 0;
			volumeControl.style.opacity = 0;
		};
	} else {
		setTimeout(function () {
			adjustControls();
			setTimeout(function () {
				mediaControls.style.opacity = 1;
				volumeControl.style.opacity = 1;
			}, 300);
		}, 700);
	}

	adjustControls();

	mediaElementContainer.toggle = function (clasName) {
		if (typeof clasName != 'string') {
			for (var i = 0; i < clasName.length; i++) {
				mediaElementContainer.toggle(clasName[i]);
			}
			return;
		}

		if (clasName == 'mute-audio' && muteAudio) muteAudio.onclick();
		if (clasName == 'mute-video' && muteVideo) muteVideo.onclick();

		if (clasName == 'record-audio' && recordAudio) recordAudio.onclick();
		if (clasName == 'record-video' && recordVideo) recordVideo.onclick();

		if (clasName == 'stop' && stop) stop.onclick();

		return this;
	};

	mediaElementContainer.media = mediaElement;

	return mediaElementContainer;
}

// __________________
// getAudioElement.js

function getAudioElement(mediaElement, config) {
	config = config || {};

	if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
		var mediaStream = mediaElement;
		mediaElement = document.createElement('audio');
		mediaElement[!!navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !!navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
	}

	config.toggle = config.toggle || [];
	config.toggle.has = function (element) {
		return config.toggle.indexOf(element) !== -1;
	};

	mediaElement.controls = true;
	mediaElement.play();

	var mediaElementContainer = document.createElement('div');
	mediaElementContainer.className = 'media-container';

	var mediaControls = document.createElement('div');
	mediaControls.className = 'media-controls';
	mediaElementContainer.appendChild(mediaControls);

	var muteAudio = document.createElement('div');
	muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
	mediaControls.appendChild(muteAudio);

	muteAudio.style['border-top-left-radius'] = '5px';

	muteAudio.onclick = function () {
		if (muteAudio.className.indexOf('unmute-audio') != -1) {
			muteAudio.className = muteAudio.className.replace('unmute-audio selected', 'mute-audio');
			mediaElement.muted = false;
			if (config.onUnMuted) config.onUnMuted('audio');
		} else {
			muteAudio.className = muteAudio.className.replace('mute-audio', 'unmute-audio selected');
			mediaElement.muted = true;
			if (config.onMuted) config.onMuted('audio');
		}
	};

	if (!config.buttons || (config.buttons && config.buttons.indexOf('record-audio') != -1)) {
		var recordAudio = document.createElement('div');
		recordAudio.className = 'control ' + (config.toggle.has('record-audio') ? 'stop-recording-audio selected' : 'record-audio');
		mediaControls.appendChild(recordAudio);

		recordAudio.onclick = function () {
			if (recordAudio.className.indexOf('stop-recording-audio') != -1) {
				recordAudio.className = recordAudio.className.replace('stop-recording-audio selected', 'record-audio');
				if (config.onRecordingStopped) config.onRecordingStopped('audio');
			} else {
				recordAudio.className = recordAudio.className.replace('record-audio', 'stop-recording-audio selected');
				if (config.onRecordingStarted) config.onRecordingStarted('audio');
			}
		};
	}

	var volumeSlider = document.createElement('div');
	volumeSlider.className = 'control volume-slider';
	volumeSlider.style.width = 'auto';
	mediaControls.appendChild(volumeSlider);

	var slider = document.createElement('input');
	slider.style.marginTop = '11px';
	slider.style.width = ' 200px';

	if (config.buttons && config.buttons.indexOf('record-audio') == -1) {
		slider.style.width = ' 241px';
	}

	slider.type = 'range';
	slider.min = 0;
	slider.max = 100;
	slider.value = 100;
	slider.onchange = function () {
		mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
	};
	volumeSlider.appendChild(slider);

	var stop = document.createElement('div');
	stop.className = 'control stop';
	mediaControls.appendChild(stop);

	stop.onclick = function () {
		mediaElementContainer.style.opacity = 0;
		setTimeout(function () {
			if (mediaElementContainer.parentNode) {
				mediaElementContainer.parentNode.removeChild(mediaElementContainer);
			}
		}, 800);
		if (config.onStopped) config.onStopped();
	};

	stop.style['border-top-right-radius'] = '5px';
	stop.style['border-bottom-right-radius'] = '5px';

	var mediaBox = document.createElement('div');
	mediaBox.className = 'media-box';
	mediaElementContainer.appendChild(mediaBox);

	var h2 = document.createElement('h2');
	h2.innerHTML = config.title || 'Audio Element';
	h2.setAttribute('style', 'position: absolute;color: rgb(160, 160, 160);font-size: 20px;text-shadow: 1px 1px rgb(255, 255, 255);padding:0;margin:0;');
	mediaBox.appendChild(h2);

	mediaBox.appendChild(mediaElement);

	mediaElementContainer.style.width = '329px';
	//mediaBox.style.height = '90px';

	h2.style.width = mediaElementContainer.style.width;
	h2.style.height = '50px';
	h2.style.overflow = 'hidden';

	var times = 0;

	function adjustControls() {
		mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - mediaControls.clientWidth - 7) + 'px';
		mediaControls.style.marginTop = (mediaElementContainer.clientHeight - mediaControls.clientHeight - 6) + 'px';
		if (times < 10) {
			times++;
			setTimeout(adjustControls, 1000);
		} else times = 0;
	}

	if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
		mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function () {
			adjustControls();
			mediaControls.style.opacity = 1;
		};

		mediaElementContainer.onmouseleave = function () {
			mediaControls.style.opacity = 0;
		};
	} else {
		setTimeout(function () {
			adjustControls();
			setTimeout(function () {
				mediaControls.style.opacity = 1;
			}, 300);
		}, 700);
	}

	adjustControls();

	mediaElementContainer.toggle = function (clasName) {
		if (typeof clasName != 'string') {
			for (var i = 0; i < clasName.length; i++) {
				mediaElementContainer.toggle(clasName[i]);
			}
			return;
		}

		if (clasName == 'mute-audio' && muteAudio) muteAudio.onclick();
		if (clasName == 'record-audio' && recordAudio) recordAudio.onclick();
		if (clasName == 'stop' && stop) stop.onclick();

		return this;
	};

	mediaElementContainer.media = mediaElement;

	return mediaElementContainer;
}


//***** SignalRConnection ***********************************************************************************************************************************

// https://github.com/muaz-khan/RTCMultiConnection/issues/137#issuecomment-213770626

function SignalRConnection(connection, connectCallback) {
    connection.socket = {
        send: function (data) {
            var channel = BizAPP.UI.Collaboration.connection.channel || this.channel;
            onMessageCallbacks[channel] = BizAPP.UI.Collaboration.connection.socket.onmessage;

            //if (config.onopen) setTimeout(config.onopen, 1000);
            if ($('.videoConference').attr('bza_wc_direction') == "one-to-one") {
                data.oneToOne = true;
                data.isV3 = BizAPP.UI.Collaboration.isV3;
                if (data.data && data.data.remoteUserId)
                    data.messageFor = sessions[data.data.remoteUserId].userid;
                BizAPP.UI.Collaboration.SendSignalRMessage(data, channel);

                if (BizAPP.UI.Collaboration.reconnect && data.sessionid) {
                	var reconnectMsg = '{"message":{"channel":"' + channel + '","messageFor":"' + sessions[data.data.remoteUserId].userid + '","reconnected":"true", "sender":"' + BizAPP.UI.Collaboration.connection.extra.userid + '"}}';
                    $.connection.webRtcHub.server.sendReconnectedMsg(reconnectMsg);
                }
            }
            else {
                BizAPP.UI.Collaboration.GetParticipantList(function (result) {
                    result = result || '';
                    data.userList = result;
                    BizAPP.UI.Collaboration.SendSignalRMessage(data, channel);

                    if (BizAPP.UI.Collaboration.reconnect && data.sessionid) {
                    	var message = {
                    		message: {
                    			channel: channel,
                    			messageFor: result,
                    			reconnected: 'true',
                    			sender: BizAPP.UI.Collaboration.connection.extra.userid,
                    			onlineconf: getObject($(BizAPP.UI.Collaboration.selector))
                    		}
                    	};
                    	var reconnectMsg = JSON.stringify(message);
                    	//var reconnectMsg = '{"message":{"channel":"' + channel + '","messageFor":"' + result + '","reconnected":"true", "sender":"' + BizAPP.UI.Collaboration.connection.extra.userid + '"}}';
                        $.connection.webRtcHub.server.sendReconnectedMsg(reconnectMsg);
                    }
                });
            }
        }
    };

    connection.socket.onmessage = function (data) {
        //console.log("%c recieved: " + connection.isInitiator.toString() + "-" + JSON.stringify(data), 'background: #222; color: #bada55');
        if (data.eventName === connection.socketMessageEvent) {
            onMessagesCallback(data.data);
        }

        if (data.eventName === 'presence') {
            data = data.data;
            if (data.userid === connection.userid) return;
            connection.onUserStatusChanged({
                userid: data.userid,
                status: data.isOnline === true ? 'online' : 'offline',
                extra: connection.peers[data.userid] ? connection.peers[data.userid].extra : {}
            });
        }
    };

    connection.socket.emit = function (eventName, data, callback) {
        if (eventName === 'changed-uuid') return;
        if (data.message && data.message.shiftedModerationControl) return;

        connection.socket.send({
            eventName: eventName,
            data: data
        });

        if (callback) {
            callback();
        }
    };

    var mPeer = connection.multiPeersHandler;

    function isData(session) {
        return !session.audio && !session.video && !session.screen && session.data;
    }

    function onMessagesCallback(message) {
        if (message.remoteUserId != connection.userid) return;

        if (message.message.sessionDetails && message.sender !== connection.userid && message.message.sessionDetails.userid) {
            if (BizAPP.UI.Collaboration.allAttendees.indexOf(message.message.sessionDetails.userid) == -1) {
                BizAPP.UI.Collaboration.allAttendees = null;
                BizAPP.UI.Collaboration.GetParticipantList(function (result, b) {
                    if (result.indexOf(message.message.sessionDetails.userid) != -1)
                        onMessagesCallback(message);
                });
                return;
            }
        }


        if (message.message.extra)
            message.extra = message.message.extra;
        if (message.extra && connection.peers[message.sender] && connection.peers[message.sender].extra != message.extra) {
            connection.peers[message.sender].extra = message.extra;
            connection.onExtraDataUpdated({
                userid: message.sender,
                extra: message.extra
            });
        }

        if (message.message.streamSyncNeeded && connection.peers[message.sender]) {
            var stream = connection.streamEvents[message.message.streamid];
            if (!stream || !stream.stream) {
                return;
            }

            var action = message.message.action;

            if (action === 'ended' || action === 'stream-removed') {
                connection.onstreamended(stream);
                return;
            }

            var type = message.message.type != 'both' ? message.message.type : null;
            stream.stream[action](type);
            return;
        }

        if (message.message === 'connectWithAllParticipants') {
            if (connection.broadcasters.indexOf(message.sender) === -1) {
                connection.broadcasters.push(message.sender);
            }

            mPeer.onNegotiationNeeded({
                allParticipants: connection.getAllParticipants(message.sender)
            }, message.sender);
            return;
        }

        if (message.message === 'removeFromBroadcastersList') {
            if (connection.broadcasters.indexOf(message.sender) !== -1) {
                delete connection.broadcasters[connection.broadcasters.indexOf(message.sender)];
                connection.broadcasters = removeNullEntries(connection.broadcasters);
            }
            return;
        }

        if (message.message === 'dropPeerConnection') {
            connection.deletePeer(message.sender);
            return;
        }

        if (message.message.allParticipants) {
            if (message.message.allParticipants.indexOf(message.sender) === -1) {
                message.message.allParticipants.push(message.sender);
            }

            message.message.allParticipants.forEach(function (participant) {
                mPeer[!connection.peers[participant] ? 'createNewPeer' : 'renegotiatePeer'](participant, {
                    localPeerSdpConstraints: {
                        OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                    },
                    remotePeerSdpConstraints: {
                        OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                    },
                    isOneWay: !!connection.session.oneway || connection.direction === 'one-way',
                    isDataOnly: isData(connection.session)
                });
            });
            return;
        }

        if (message.message.newParticipant) {
            if (message.message.newParticipant == connection.userid) return;
            if (!!connection.peers[message.message.newParticipant]) return;

            mPeer.createNewPeer(message.message.newParticipant, message.message.userPreferences || {
                localPeerSdpConstraints: {
                    OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                },
                remotePeerSdpConstraints: {
                    OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                },
                isOneWay: !!connection.session.oneway || connection.direction === 'one-way',
                isDataOnly: isData(connection.session)
            });
            return;
        }

        if (message.message.readyForOffer || message.message.addMeAsBroadcaster) {
            connection.addNewBroadcaster(message.sender);
        }

        if (message.message.newParticipationRequest && message.sender !== connection.userid) {
            if (connection.peers[message.sender]) {
                connection.deletePeer(message.sender);
            }

            var userPreferences = {
                extra: message.extra || {},
                localPeerSdpConstraints: message.message.remotePeerSdpConstraints || {
                    OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                },
                remotePeerSdpConstraints: message.message.localPeerSdpConstraints || {
                    OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                },
                isOneWay: typeof message.message.isOneWay !== 'undefined' ? message.message.isOneWay : !!connection.session.oneway || connection.direction === 'one-way',
                isDataOnly: typeof message.message.isDataOnly !== 'undefined' ? message.message.isDataOnly : isData(connection.session),
                dontGetRemoteStream: typeof message.message.isOneWay !== 'undefined' ? message.message.isOneWay : !!connection.session.oneway || connection.direction === 'one-way',
                dontAttachLocalStream: !!message.message.dontGetRemoteStream,
                connectionDescription: message,
                successCallback: function () {
                    // if its oneway----- todo: THIS SEEMS NOT IMPORTANT.
                    if (typeof message.message.isOneWay !== 'undefined' ? message.message.isOneWay : !!connection.session.oneway || connection.direction === 'one-way') {
                        connection.addNewBroadcaster(message.sender, userPreferences);
                    }

                    if (!!connection.session.oneway || connection.direction === 'one-way' || isData(connection.session)) {
                        connection.addNewBroadcaster(message.sender, userPreferences);
                    }
                }
            };

            connection.onNewParticipant(message.sender, userPreferences);
            return;
        }

        if (message.message.shiftedModerationControl) {
            connection.onShiftedModerationControl(message.sender, message.message.broadcasters);
            return;
        }

        if (message.message.changedUUID) {
            if (connection.peers[message.message.oldUUID]) {
                connection.peers[message.message.newUUID] = connection.peers[message.message.oldUUID];
                delete connection.peers[message.message.oldUUID];
            }
        }

        if (message.message.userLeft) {
            mPeer.onUserLeft(message.sender);

            if (!!message.message.autoCloseEntireSession) {
                connection.leave();
            }

            return;
        }

        mPeer.addNegotiatedMessage(message.message, message.sender);
    }

    window.addEventListener('beforeunload', function () {
        connection.socket.emit('presence', {
            userid: connection.userid,
            isOnline: false
        });
    }, false);
}