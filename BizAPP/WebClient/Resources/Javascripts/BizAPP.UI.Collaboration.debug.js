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

//***** BizAPP.UI.Collaboration.js Version 2 *******************************************************************************************************************************

var BizAPP = BizAPP || {};
BizAPP.UI = BizAPP.UI || {};
BizAPP.UI.Collaboration = {
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
    chatContainer: '<div id="chat-container" class="bza-middle-container" style="display: none;"><div class="videoConference-content-mainchat-container Left"><div class="videoConference-content-mainchat-tab-container Left">\
<div class="videoConference-content-mainchat-tab-livechat-container Left videoConference-content-mainchat-tab-livechat-Active">\
<div class="videoConference-mainchat-tab-ChatIcon-container Left videoConference-sprite videoConference-sprite-Chat"><div class="videoConference-mainchat-tab-ChatUser-status Left ChatUser-status-Active">\
&nbsp;</div></div>\
<div class="videoConference-mainchat-tab-ChatCount-container Left">LIVE CHAT(<span class="videoConference-mainchat-tab-ChatCount">0</span>)</div></div>\
<div class="videoConference-content-mainchat-tab-attendeeschat-container Left"><div class="videoConference-mainchat-tab-ChatIcon-container Left videoConference-sprite videoConference-sprite-Attendees-User">&nbsp;</div>\
<div class="videoConference-mainchat-tab-ChatCount-container Left">(<span class="videoConference-mainchat-tab-ChatCount">0</span>)</div></div></div>\
<div class="videoConference-content-mainchat-tab-strip-container"><div class="videoConference-content-mainchat-tab-strip  videoConference-content-mainchat-tab-livechat-strip tab-strip-Active">&nbsp;</div>\
<div class="videoConference-content-mainchat-tab-strip videoConference-content-mainchat-tab-attendeeschat-strip">&nbsp;</div></div>\
<div class="videoConference-content-mainchat-tabcontent-container Left"><div class="videoConference-content-mainchat-tabcontent-livechat-container Left">\
<div class="videoConference-content-mainchat-tabcontent-livechat-groupchat-container Left"><div class="videoConference-content-mainchat-tabcontent-livechat-groupchat-body-container Left">\
<div id="chat-output" class="videoConference-chatting-content-container Left"></div></div><div class="videoConference-chatting-content-EditBox-container Left">\
<div class="videoConference-chatting-content-EditBox-Textarea-container Left"><textarea id="chat-input" class="videoConference-chatting-content-EditBox-Textarea" placeholder="Type here..." disabled></textarea>\
</div><div class="videoConference-chatting-content-EditBox-SendIcon-container Right videoConference-sprite videoConference-sprite-RightBlueArrow Cursor-Pointer" onclick="BizAPP.UI.Collaboration.SendMessage();">&nbsp;</div>\
</div><div class="videoConference-chatting-file-attachment-container Left"><div id="drag-and-drop-zoneWebRTC" class="uploader" style="display: inline-block;border: 0;"><div class="videoConference-chatting-file-attachment-icon-container Left">\
<div class="browser"><table><tr><td class="uploader-btn">\
<label><div class="videoConference-chatting-content-EditBox-SendIcon-container Right videoConference-sprite videoConference-sprite-Attachment Cursor-Pointer" title="Browse Files">&nbsp;<input type="file" ID="uploader"></div></label></td></tr></table></div></div>\
<div class="videoConference-chatting-file-attachment-content-container Left"><div class="videoConference-chatting-file-attachment-content-icon-container Left">\
<div class="videoConference-chatting-content-EditBox-SendIcon-container Right videoConference-sprite videoConference-sprite-DragMove Cursor-Pointer">&nbsp;</div></div>\
<div class="videoConference-chatting-file-attachment-content-info-container Left">Drag and Drop your file to send</div></div></div></div></div></div>\
<div class="videoConference-content-mainchat-tabcontent-attendeeschat-container Left"><div class="videoConference-content-Title-container Left videoConference-blue-font-color Font-Size-18">\
Attendees</div><div class="videoConference-content-SearchBox-container Left"><div class="videoConference-content-SearchBox-TextBox-container Left">\
<input type="text" class="videoConference-content-SearchBox-TextBox"/></div>\
<div class="videoConference-content-SearchBox-SearchIcon-container Left Cursor-Pointer videoConference-sprite videoConference-sprite-Search" title="Contact Us">&nbsp;</div>\
</div><div class="videoConference-content-Attendees-container Left"><div class="videoConference-content-Attendees-List-container Left"><div class="attendees-list-container"></div></div></div></div></div></div></div>',
    webCamContainer: '<div id="tilewebcam-container" class="bza-middle-container" style="display:none"></div>',
    screenContainer: '<div id="tileVideos-container" class="bza-middle-container" style="display:none"></div>',
    sharedFilesContainer: '<div id="sent-files" class="bza-middle-container" style="min-width: 200px;display:none"><div class="files-empty">There are no shared files.</div></div>',
    switchMediaContainer: '<div class="videoConference-content-sharingScreen-container Left"><div class="videoConference-content-sharingScreen-Row-container Left">\
<div class="videoConference-content-sharingScreen-Icon-container Left videoConference-sprite videoConference-sprite-ZoomInOutArrow" onclick="BizAPP.UI.Collaboration.SwitchStreams();"></div>\
<div class="videoConference-content-sharingScreen-Title-container Left">Sharing</div></div>\
<div class="videoConference-content-sharingScreen-Img-container Left"><div id="screen-conatainer" onclick="BizAPP.UI.Collaboration.StopEventPropagation(event);"><div id="sharing-video-container"></div></div></div></div>',
    whiteboardContainer: '<div class="videoConference-Whiteboard-container" style="display: none;"><div ><div id="draw"><canvas width="700" height="500" id="drawing-canvus" style="background: white;"></canvas></div>\
<div style="margin-top:5px;"><span class="whiteboard-select">Currently selected : <a id="ink" href="javascript:void(0)">\
<i id="imgMode" class="fa fa-pencil" title="Click to select Eraser"></i></a></span><div id="dialog-form" title="Save Whiteboard"><fieldset><label for="name">Name</label>\
<input type="text" name="name" id="name" value="" class="text ui-widget-content ui-corner-all"></fieldset></div><span><a id="save-whiteboard" href="javascript:void(0)">Save</a></span><span>\
<a id="clear" href="javascript:void(0)">Clear</a></span><span class="saved-whiteboards"></span></div></div></div>',
    Init: function (options, initiate, callback) {
        $.getCss(BizAPP.UI.GetBasePath('Resources/WebRTC/jquery.qtip.min.css'));
        $.cachedScript(BizAPP.UI.GetBasePath('Resources/WebRTC/WebRTC.js')).done(function () {
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
            BizAPP.UI.Collaboration.connection.DetectRTC.load(function () {
                if (!options.partialSupportEnabled && !(BizAPP.UI.Collaboration.connection.DetectRTC && BizAPP.UI.Collaboration.connection.DetectRTC.isWebRTCSupported)) {
                    if (options.blockIfNotSupported) {
                        var versions = {
                            chrome: true,
                            msie: true,
                            safari: true,
                            opera: true,
                            unknown: true
                        };
                        var opts = {
                            header: 'This browser is not supported',
                            paragraph1: 'You are currently using an unsupported browser.',
                            paragraph2: 'Please install one of the supported browsers below to proceed:',
                            closeMessage: '',
                            display: ['chrome', 'firefox']
                        };
                        isBrowserSupported(versions, opts);
                    }
                    else {
                        options.partialSupportEnabled = true;
                        BizAPP.UI.Collaboration.Init(options, initiate, callback);
                    }
                }
                else {
                    if (initiate) {
                        BizAPP.UI.Collaboration.participants = [];
                    }
                    BizAPP.UI.Collaboration.selector = options.selector;
                   
                    if (isMobile.any() && isMobile.any().length)
                        options.screenNotDefaultForParticipant = true;

                    if (!options.partialSupportEnabled && isChrome() && BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource == 'screen' && options.mode != 'VideoOnly' && !options.screenNotDefaultForParticipant) {
                        var msg = "Required browser support is not enabled, install Virtual Room Addon before you can use this feature. \n<a id=\"chromeExt\" href=\"https://chrome.google.com/webstore/detail/screen-capturing/mkbmmkmmkppgkahchamcaaommnjpkghd\" target=\"_blank\">Install chrome extension</a>";
                        if (!initiate) {
                            options.screenNotDefaultForParticipant = true;
                            msg += "\n\n Click \"Continue\" to join without sharing screen.[type]info";
                        }
                        debug(msg, "exception", '', !initiate, 'Continue', 'BizAPP.UI.Collaboration.Join(' + JSON.stringify(options) + ');');
                    }
                    else {
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
                        if (screenNode.length)
                            $layout.find(screenNode[0]).replaceWith($(BizAPP.UI.Collaboration.screenContainer));

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

                        BizAPP.UI.LoadWhiteboard(function () {
                            BizAPP.UI.Collaboration.GetParticipantList(function (result) {
                                result = result || '';
                                BizAPP.UI.Whiteboard.Init(result);
                                if (options.partialSupportEnabled) {
                                    $('.videoConference-mainVideo-container, .videoConference-customView-container').hide();
                                    $('.videoConference-Whiteboard-container').show();

                                    realAjaxAsyncCall('HelperEx', getNextRequestId(), ['GetUserFullnames', result], false,
                                        function (data, textStatus, jqXHR) {
                                            BizAPP.UI.Collaboration.participants = [];
                                            var fnArray = JSON.parse(data.value[1]);
                                            $.each(fnArray, function (i, v) {
                                                var participant = {
                                                    'name': v, 'userid': i,
                                                    'initiator': false, 'hasMicrophone': false,
                                                    'hasWebcam': false, 'isScreenCapturingSupported': false,
                                                    'audioShared': false, 'videoShared': false, 'screenShared': false
                                                };
                                                BizAPP.UI.Collaboration.participants.push(participant);
                                            });
                                            BizAPP.UI.Collaboration.UpdateParticipants(false);
                                        });
                                }
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
                                audio: true,
                                video: true
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
                                if (e.stream.isScreen)
                                    if (sharingContainer)
                                        mediaWidth = (sharingContainer.clientWidth) - 50;
                                    else
                                        mediaWidth = (mainContainer.clientWidth) - 50;

                                var mediaElement = getMediaElement(e.mediaElement, {
                                    width: mediaWidth,
                                    title: e.userid,
                                    buttons: buttons,
                                    onMuted: function (type) {
                                        BizAPP.UI.Collaboration.connection.streams[e.streamid].mute({
                                            audio: type == 'audio',
                                            video: type == 'video'
                                        });
                                    },
                                    onUnMuted: function (type) {
                                        BizAPP.UI.Collaboration.connection.streams[e.streamid].unmute({
                                            audio: type == 'audio',
                                            video: type == 'video'
                                        });
                                    },
                                    onRecordingStarted: function (type) {
                                        BizAPP.UI.Collaboration.connection.streams[e.streamid].startRecording({
                                            audio: type == 'audio',
                                            video: type == 'video'
                                        });
                                    },
                                    onRecordingStopped: function (type) {
                                        BizAPP.UI.Collaboration.connection.streams[e.streamid].stopRecording(function (blob) {
                                            if (blob.audio) BizAPP.UI.Collaboration.connection.saveToDisk(blob.audio);
                                            else if (blob.video) BizAPP.UI.Collaboration.connection.saveToDisk(blob.video);
                                            else BizAPP.UI.Collaboration.connection.saveToDisk(blob);
                                        }, type);
                                    },
                                    onStopped: function () {
                                        BizAPP.UI.Collaboration.connection.peers[e.userid].drop();
                                    }
                                });

                                if (e.stream.isScreen) {
                                    tileScreenContainer.insertBefore(mediaElement, tileScreenContainer.firstChild);
                                    $(mediaElement).wrap('<div class="stream-owner" style="width: 90%;display: block;margin: 5px auto;text-align: center;border: 1px solid #2D99D8;background-color: black;color: white;">');
                                    $(mediaElement).parent().prepend('<div>' + e.extra['session-name'] + '</div>');

                                    if (e.extra["session-name"] == BizAPP.UI.Collaboration.connection.extra["session-name"])
                                        setTimeout(function () { mediaElement.media.play(); }, 10);
                                    else
                                        setTimeout(function () { mediaElement.media.play(); }, 1000);

                                    $(mediaElement.media).addClass('screen');

                                    if (e.isInitiator) {
                                        var screen = $(mediaElement).clone(true)[0];
                                        var $screenElement;
                                        if (initiate && options.mode != 'ScreenOnly') {
                                            if (sharingContainer) {
                                                sharingContainer.insertBefore(screen, sharingContainer.firstChild);
                                                $(sharingContainer).find('video').get(0).play();
                                                $screenElement = $(sharingContainer).find('video');
                                            }
                                        }
                                        else {
                                            mainContainer.insertBefore(screen, mainContainer.firstChild);
                                            $(mainContainer).find('video').get(0).play();
                                            $screenElement = $(mainContainer).find('video');
                                            whiteboardInit = true;
                                        }
                                        if ($screenElement) {
                                            $screenElement.get(0).play();
                                            $screenElement.css('max-height', '');
                                        }
                                    }
                                }
                                else {
                                    tileVideoContainer.insertBefore(mediaElement, tileVideoContainer.firstChild);
                                    $(mediaElement).wrap('<div class="stream-owner" style="width: 90%;display: block;margin: 5px auto;text-align: center;border: 1px solid #2D99D8;background-color: black;color: white;">')
                                    $(mediaElement).parent().prepend('<div>' + e.extra['session-name'] + '</div>');
                                    if (e.extra["session-name"] == BizAPP.UI.Collaboration.connection.extra["session-name"]) {
                                        setTimeout(function () { mediaElement.media.play(); }, 10);
                                    }
                                    else
                                        setTimeout(function () { mediaElement.media.play(); }, 1000);

                                    $(mediaElement.media).addClass('webcam');
                                    if (e.isInitiator) {
                                        var video = $(mediaElement).clone(true)[0];
                                        var $videoElement;
                                        if (initiate || options.mode == 'VideoOnly') {
                                            mainContainer.insertBefore(video, mainContainer.firstChild);
                                            $videoElement = $(mainContainer).find('video')
                                            whiteboardInit = true;
                                        }
                                        else {
                                            if (sharingContainer) {
                                                sharingContainer.insertBefore(video, sharingContainer.firstChild);
                                                $videoElement = $(sharingContainer).find('video');
                                            }
                                        }
                                        if ($videoElement) {
                                            $videoElement.get(0).play();
                                            if (e.type == 'local' || e.isInitiator) {
                                                $videoElement.get(0).muted = true;
                                                $videoElement.get(0).volume = 0;
                                            }
                                            $videoElement.css('max-height', '');
                                        }
                                    }
                                }

                                $(mediaElement).css('width', 'auto');
                                $(mediaElement).find('video').css('max-height', '');
                                $('#webcam-container').css('height', 'auto');
                                $('.media-container').attr('onclick', 'BizAPP.UI.Collaboration.CenterStream(event);');
                                $(mediaElement).find('.volume-control, .media-controls').attr('onclick', 'BizAPP.UI.Collaboration.StopEvent(event);')
                                if (e.type == 'local') {
                                    mediaElement.media.muted = true;
                                    mediaElement.media.volume = 0;
                                }
                                if (e.isInitiator) {
                                    $('.videoConference-videoDispaly-holder-container').next('div.videoConference-videoDispaly-Controls-container').show();
                                }
                                setTimeout(function () { BizAPP.UI.Collaboration.UpdateParticipants(initiate); BizAPP.UI.Collaboration.InitAccordion(); BizAPP.UI.Collaboration.UpdateCurrentTime(); BizAPP.UI.Collaboration.UpdateStreamCount(); BizAPP.UI.Collaboration.WhiteboardInit(whiteboardInit); }, 1000);
                            };

                            BizAPP.UI.Collaboration.connection.onstreamended = function (e) {
                                if (e.mediaElement) {
                                    if ($(e.mediaElement).closest('.stream-owner').length)
                                        $(e.mediaElement).closest('.stream-owner').remove();
                                    else
                                        $(e.mediaElement).closest('.media-container').remove();
                                }
                                BizAPP.UI.Collaboration.UpdateStreamCount();
                            };

                            BizAPP.UI.Collaboration.connection.onmessage = function (e) {
                                if (!initiate && e.data.startsWith('[{')) {
                                    BizAPP.UI.Collaboration.participants = JSON.parse(e.data);
                                    BizAPP.UI.Collaboration.UpdateParticipants(initiate);
                                }

                                else {
                                    BizAPP.UI.Collaboration.PostMessage(e.extra['session-name'], e.data, true, e.extra['userid']);
                                    $('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').addClass('blink');
                                    console.debug(e.userid, 'posted', e.data);
                                    console.log('latency:', e.latency, 'ms');
                                }
                            };

                            BizAPP.UI.Collaboration.connection.onclose = function (e) {
                                BizAPP.UI.Collaboration.participants = $.grep(BizAPP.UI.Collaboration.participants, function (value) {
                                    return value.name != e.extra['session-name'];
                                });

                                if (e.extra.initiator) {
                                    BizAPP.UI.InlinePopup.Alert({ title: '', header: 'Error', errorMessage: 'Connection lost.. \nPlease wait while the connection is being re-established.', btnOk: true, txtOk: 'OK', type: 'error', addnInfo: '', hideAddnBtns: true });
                                }
                                else {
                                    BizAPP.UI.Collaboration.UpdateParticipants(initiate);
                                    BizAPP.UI.Collaboration.PostMessage(e.extra['session-name'], e.extra['session-name'] + ' has left the session.', true, e.extra['userid'], true);
                                    $('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').addClass('blink');
                                }
                            };

                            // on data connection gets open
                            BizAPP.UI.Collaboration.connection.onopen = function (e) {
                                if (initiate) {
                                    var participant = {
                                        'name': e.extra['session-name'], 'userid': e.extra['userid'],
                                        'initiator': e.extra['initiator'], 'hasMicrophone': e.extra['hasMicrophone'],
                                        'hasWebcam': e.extra['hasWebcam'], 'isScreenCapturingSupported': e.extra['isScreenCapturingSupported'],
                                        'audioShared': e.extra['audioShared'], 'videoShared': e.extra['videoShared'], 'screenShared': e.extra['screenShared']
                                    };
                                    BizAPP.UI.Collaboration.participants.push(participant);
                                    BizAPP.UI.Collaboration.connection.send(JSON.stringify(BizAPP.UI.Collaboration.participants));
                                    BizAPP.UI.Collaboration.UpdateParticipants(initiate);
                                }

                                var direction = $('.videoConference').attr('bza_wc_direction');
                                if (initiate || !(direction == "one-way" || direction == "one-to-one")) {
                                    if (document.getElementById('chat-input')) document.getElementById('chat-input').disabled = false;
                                    if (document.getElementById('file')) document.getElementById('file').disabled = false;
                                    if (document.getElementById('open-new-session')) document.getElementById('open-new-session').disabled = true;
                                }
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
                                $('#sent-files .files-empty').remove();
                                progressHelper[file.uuid].div.innerHTML = '<i class="fa fa-download"></i>&nbsp;<a href="' + file.url + '" target="_blank" style="text-decoration:underline;color: #000080" download="' + file.name + '">' + file.name + '</a>';
                                $(progressHelper[file.uuid].div).addClass('VideoConference-FileSharing-File').css('padding', '5px');
                                var msg = $(progressHelper[file.uuid].div)[0].outerHTML;
                                BizAPP.UI.Collaboration.PostMessage(file.extra['session-name'], msg, true, file.extra['userid']);
                                if (BizAPP.UI.Collaboration.connection.extra['userid'] != file.extra['userid'])
                                    $('[onclick="BizAPP.UI.Collaboration.ShowChat()"]').addClass('blink');
                                $('.videoConference-AlertCnt').text($('#sent-files .VideoConference-FileSharing-File').length.toString()).show();
                            };

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

                            BizAPP.UI.Collaboration.connection.onPresenterChange = function (message) {

                            };

                            chatInput.onkeypress = function (e) {
                                if (e.keyCode !== 13 || !this.value) return;
                                BizAPP.UI.Collaboration.SendMessage();
                            };

                            BizAPP.UI.Collaboration.connection.connect();
                            BizAPP.UI.Collaboration.DisplayModeWise(options);
                            BizAPP.UI.Collaboration.InitAccordion();
                            BizAPP.UI.Collaboration.InitUploadControl();
                            BizAPP.UI.WordEditor.renewSessionForControl('Container:webconference');
                            if (typeof (callback) != 'undefined')
                                callback();
                        }
                    }
                }
            });
        });
    },
    Setup: function (options) {
        BizAPP.UI.Collaboration.DetectPlugin(function () {
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
                    BizAPP.UI.Collaboration.connection.extra = {
                        'session-name': options.user.name || 'Anonymous',
                        'userid': options.user.userid,
                        'initiator': true,
                        'hasMicrophone': BizAPP.UI.Collaboration.connection.DetectRTC.hasMicrophone,
                        'hasWebcam': BizAPP.UI.Collaboration.connection.DetectRTC.hasWebcam,
                        'isScreenCapturingSupported': BizAPP.UI.Collaboration.connection.DetectRTC.isScreenCapturingSupported,
                        'audioShared': session.audio, 'videoShared': session.video, 'screenShared': session.screen
                    };

                    BizAPP.UI.Collaboration.connection.session = session;
                    BizAPP.UI.Collaboration.connection.maxParticipantsAllowed = maxParticipantsAllowed;

                    BizAPP.UI.Collaboration.connection.sessionid = options.sessionID || 'Anonymous';
                    sessions[options.sessionID] = session;
                    BizAPP.UI.Collaboration.channel = BizAPP.UI.Collaboration.connection.channel;

                    var participant = {
                        'name': options.user.name || 'Anonymous', 'userid': options.user.userid, 'initiator': true,
                        'hasMicrophone': BizAPP.UI.Collaboration.connection.extra['hasMicrophone'],
                        'hasWebcam': BizAPP.UI.Collaboration.connection.extra['hasWebcam'],
                        'isScreenCapturingSupported': BizAPP.UI.Collaboration.connection.extra['isScreenCapturingSupported'],
                        'audioShared': BizAPP.UI.Collaboration.connection.extra['audioShared'], 'videoShared': BizAPP.UI.Collaboration.connection.extra['videoShared'], 'screenShared': BizAPP.UI.Collaboration.connection.extra['screenShared']
                    };
                    BizAPP.UI.Collaboration.participants.push(participant);
                    BizAPP.UI.Collaboration.UpdateParticipants(true);

                    BizAPP.UI.Collaboration.connection.open();
                    if (typeof (options.callback) != 'undefined')
                        options.callback(BizAPP.UI.Collaboration.channel, BizAPP.UI.Collaboration.connection.sessionid, options.selector);

                });
            });
        });
    },
    Join: function (options) {
        BizAPP.UI.Collaboration.DetectPlugin(function () {
            BizAPP.UI.Collaboration.Init(options, false, function () {
                if (sessions[options.sessionID]) {
                    session = sessions[options.sessionID];
                    BizAPP.UI.Collaboration.Connect(options, session, options.screenNotDefaultForParticipant);
                }
                else {
                    var webRtcHub = $.connection.webRtcHub;
                    webRtcHub.server.getSessionDetails($.connection.hub.qs.sessionid, options.sessionID).done(function (result) {
                        if (result) {
                            session = JSON.parse(result);
                            sessions[options.sessionID] = session;
                            BizAPP.UI.Collaboration.Connect(options, session, options.screenNotDefaultForParticipant);
                        }
                        else {
                            debug("Failed to connect to the conference room, could not find the details.", "exception");
                        }
                    });
                }
            });
        });
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
    MakePresenter: function (e) {
        var uniqueid = $(e.target).closest('.user-list-item').attr('userid');
        var changePresenter = {
            makePresenter: true,
            uniqueId: uniqueid,
            extra: BizAPP.UI.Collaboration.connection.extra || {},
            userid: BizAPP.UI.Collaboration.connection.userid,
            sessionid: BizAPP.UI.Collaboration.connection.sessionid
        };
        BizAPP.UI.Collaboration.connection.socket.send2(changePresenter);
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
            if ((isChrome() && BizAPP.UI.Collaboration.DetectRTC.screen.chromeMediaSource == 'screen') || joinWithoutScreen) {
                session.session.screen = false;
            }

            if (!BizAPP.UI.Collaboration.connection.DetectRTC.hasMicrophone) {
                session.session.audio = false;
            }

            if (!BizAPP.UI.Collaboration.connection.DetectRTC.hasWebcam) {
                session.session.video = false;
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

            BizAPP.UI.Collaboration.connection.join(session);
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
            $('.videoConference-Whiteboard-container, .videoConference-customView-container').hide();
            $('.videoConference-mainVideo-container').show();
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
        $('[onclick="BizAPP.UI.Collaboration.ShowScreens();"] .videoConference-menu-Link-title-count').text($('#tileVideos-container').find('video').length.toString());
        $('[onclick="BizAPP.UI.Collaboration.ShowVideos();"] .videoConference-menu-Link-title-count').text($('#tilewebcam-container').find('video').length.toString());
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
                // 	$('.videoConference .videoConference-menu-Link-container').unbind("click");
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
            $('.attendees-list-container').append('<div class="videoConference-content-Attendees-List-Row-container Left user-list-item" userid="{0}"><div class="videoConference-content-Attendees-List-Row-AttendeesImg-container Left">\
			<img class="videoConference-content-Attendees-List-Row-AttendeesImg" src="testresource.aspx?resize=1&amp;h=50&amp;w=50&amp;id2=ESystema4d6a&amp;userid={0}"/></div>\
			<div class="videoConference-content-Attendees-List-Row-AttendeesName-container Left single-line-ellipsis ">{1}</div>\
			{2}{3}{4}{5}{6}</div>'.format(participant.userid, participant.name, '<div class="videoConference-content-Attendees-List-Row-AttendeesVoice-container Left videoConference-sprite\
            videoConference-sprite-Voice {0}" title="{1}">&nbsp;</div>'.format(participant.audioShared ? 'videoConference-sprite-Voice-Active' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ?
            (!participant.audioShared ? 'Share Audio' : 'Audio has been shared') : (!participant.audioShared ? 'Audio has not been shared' : 'Audio has been shared')), '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container \
            Left videoConference-sprite videoConference-sprite-Video {0}" title="{2}" onclick="{1}">&nbsp;</div>'.format(participant.videoShared ? 'videoConference-sprite-Video-Active' : '', (participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"]
            && !participant.videoShared) ? 'BizAPP.UI.Collaboration.ShareVideo(event);' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ?
            (!participant.videoShared ? 'Share Video' : 'Webcam has been shared') : (!participant.videoShared ? 'Webcam has not been shared' : 'Webcam has been shared')), '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container Left fa fa-desktop videoConference-Screen {0}" title="{2}" onclick="{1}"></div>'.format(participant.screenShared ?
                'videoConference-Screen-Active' : 'Webcam has been shared', (participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] && !participant.screenShared) ? 'BizAPP.UI.Collaboration.ShareScreen(event);' : '', participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ? (!participant.screenShared ?
                'Share Screen' : 'Screen has been shared') : (!participant.screenShared ? 'Screen has not been shared' : 'Screen has been shared')), '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container Left videoConference-sprite videoConference-sprite-chatAttendees {0}" title="{2}" onclick="{1}">&nbsp;</div>'.format(participant.initiator ?
                'videoConference-sprite-chatAttendees-Active' : '', (BizAPP.UI.Collaboration.connection.extra.initiator && !participant.initiator) ? 'BizAPP.UI.Collaboration.MakePresenter1(event);' : '', BizAPP.UI.Collaboration.connection.extra.initiator ? (!participant.initiator ? 'Make Presenter' : '') : (!participant.initiator ? 'Attendee' : 'Presenter')),
                participant.userid == BizAPP.UI.Collaboration.connection.extra["userid"] ? '' : '<div class="videoConference-content-Attendees-List-Row-AttendeesVideo-container Left fa fa-comment-o videoConference-Screen videoConference-Screen-Active" title="Initiate Chat" onclick="BizAPP.UI.Collaboration.InitiateChat(\'{0}\');"></div>'.format(participant.userid)));

            $('[onclick="BizAPP.UI.Collaboration.ShowAttendees();"] .videoConference-menu-Link-title-count, .videoConference-mainchat-tab-ChatCount').text(participants.length.toString());
            // if (initiate)
            // participantMarkup = participantMarkup.format( $(this)[0].initiator == true ? "BizAPP.UI.Collaboration.PresentAgain(event);" : "BizAPP.UI.Collaboration.MakePresenter(event);");
            //$('#participant-container').append(participantMarkup);
        });
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
                    console.log('Uploader init successfull');
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
            if (!v.initiator)
                value += ((i == 0 ? '' : ',') + v.userid);
        });

        value = value.replace(/(^,)|(,$)/g, "");
        if (value) {
            BizAPP.RuntimeObject.SetFieldValue({ roid: getObject($container), fieldName: $container.attr('participantsfieldname'), fieldValue: value, refreshView: false });
        }
    },
    GetParticipantList: function (callback) {
        if (BizAPP.UI.Collaboration.allAttendees) {
            callback(BizAPP.UI.Collaboration.allAttendees);
        }
        else {
            var $container = $(BizAPP.UI.Collaboration.selector);
            BizAPP.RuntimeObject.GetFieldValue({
                roid: getObject($container), fieldName: 'Attendees.Attendee.uniqueid', callback: function (result) {
                    //console.log('Attendees: ' + result.join(','));
                    BizAPP.RuntimeObject.GetFieldValue({
                        roid: getObject($container), fieldName: 'Host.uniqueid', callback: function (result1) {
                            //console.log('Owner: ' + result1.join(','));
                            result.push(result1);
                            //console.log('Merge: ' + arr.join(','));
                            var unique = result.filter(function (itm, i, a) {
                                return i == a.indexOf(itm);
                            });
                            //console.log('Unique: ' + unique.join(','));
                            var participants = $.grep(unique, function (a) {
                                return a !== BizAPP.UI.Collaboration.connection.extra["userid"];
                            })
                            BizAPP.UI.Collaboration.allAttendees = participants.join(',');
                            //console.log('Participants: ' + BizAPP.UI.Collaboration.allAttendees);
                            callback(BizAPP.UI.Collaboration.allAttendees);
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
        var $chatInput = $('.videoConference-chatting-content-EditBox-Textarea-container #chat-input');
        BizAPP.UI.Collaboration.PostMessage(BizAPP.UI.Collaboration.connection.extra['session-name'], $chatInput.val(), false, BizAPP.UI.Collaboration.connection.extra['userid']);
        // sending text message
        BizAPP.UI.Collaboration.connection.send($chatInput.val());
        $chatInput.val('');
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
        $("#chat-output").scrollTop($('#chat-output').find('.videoConference-chat-message:last').position().top);
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
        var isChrome = !!navigator.webkitGetUserMedia;
        var screenCallback;

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

                console.log('chrome message', data);

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
                callback();
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