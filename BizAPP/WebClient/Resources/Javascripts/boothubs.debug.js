BizAPP.UI.Hub = {
	Boot: function (basePath, sessionId, userId, fullName, bts, callback, options) {
		addLog('Hub-Boot');
		if (basePath != "" && sessionId != "") {
			addLog('Starting push services...');
			$.when(
				$.getScript(basePath + "/signalr/hubs")/*,
				$.Deferred(function (deferred) {
					$(deferred.resolve);
				})*/
			).done(function () {
				if ($.connection.hub && $.connection.hub.state === $.signalR.connectionState.disconnected) {
					// system alerts
					var systemAlertHub = $.connection.systemAlertHub;
					systemAlertHub.client.notifyText = BizAPP.UI.Hub.SystemAlert.TextCallback;
					systemAlertHub.client.notifySystemAlert = BizAPP.UI.Hub.SystemAlert.AlertInfoCallback;

					// webrtc updates
					var webRtcHub = $.connection.webRtcHub;
					webRtcHub.client.sendWebRTCMsg = BizAPP.UI.Hub.WebRTC.MessageReceivedCallback;
					webRtcHub.client.sendReconnectedMsg = BizAPP.UI.Hub.WebRTC.ReconnectedMsgCallback;
					webRtcHub.client.sendWhiteboardMsg = BizAPP.UI.Hub.WebRTC.WhiteboardMsgCallback;
					webRtcHub.client.updateParticipantList = BizAPP.UI.Hub.WebRTC.UpdateParticipantCallback;

					// user lounge
					if (userId !== undefined && userId != "") {
						addLog('Setting up user lounge for id ID=' + userId);
						var loungeHub = $.connection.loungeHub;
						loungeHub.client.notifyActionAlert = BizAPP.UI.Hub.Lounge.ActionAlertInfoCallback;
						loungeHub.client.notifySystemAlert = BizAPP.UI.Hub.Lounge.SystemAlertInfoCallback;
						loungeHub.client.notifyEvent = BizAPP.UI.Hub.Lounge.EventInfoCallback;
						loungeHub.client.notifyProgressUpdate = BizAPP.UI.Hub.Lounge.ProgressUpdateCallback;

						var tuserId = '';
						var sessionIdSegments = sessionId.split(';');
						if (sessionIdSegments.length > 2) {
							tuserId = userId + ';' + sessionIdSegments[2];
						}

						$.connection.hub.qs = { 'sessionid': sessionId, 'userid': userId, 'tuserid': tuserId, 'fullname': fullName, 'photo': '' };

					    //chat hub
						//if (options.loadChat) {
						    var chatHub = $.connection.chatHub;
						    chatHub.client.startConversation = BizAPP.Collaboration.setChatWindow;
						    chatHub.client.sendTextMessage = BizAPP.Collaboration.addMessage;
						    chatHub.client.setPresenceStatus = BizAPP.Collaboration.setPresenceStatus;
						    chatHub.client.addUsersToConversation = BizAPP.Collaboration.setChatWindow;

						    chatHub.client.sendInfoMessage = BizAPP.Collaboration.addInfoMessage;
						    chatHub.client.sendErrorMessage = BizAPP.Collaboration.addErrorMessage;
						    chatHub.client.sendUserTypingMessage = BizAPP.Collaboration.receiveTypingMessage;
						//}
					}
					else {
						addLog('Not setting up a user lounge as user id is not there');
						$.connection.hub.qs = { "sessionid": sessionId };
					}

					//conditionally enable logging, if bizapp debug is enabled
					//$.connection.hub.logging = true;

					// Start connection...
					$.connection.hub.url = basePath + '/signalr';
					$.connection.hub.start({ waitForPageLoad: false })
						.done(function () {
							addLog('Connected with ID=' + $.connection.hub.id);
							BizAPP.UI.Hub.Initialize($.connection, options);
							if (callback) callback();
						})
						.fail(function () {
							addLog('Could not connect to BizAPP push services!');
							BizAPP.UI.Hub.Failed();
						});
				}
			});
		}
	},
	Initialize: function (c, options) {
		addLog('Hub-Initialize-' + c.hub.id);

		try {
			var userId = c.hub.qs.userid;
			if (userId !== undefined && userId != "" && options.loadChat)
				BizAPP.Collaboration.Init(userId, $.connection.chatHub);
		} catch (err) {
			addLog('error initializing hub - ' + err.message);
		}

		//Minimize chat panel on login/reload
		BizAPP.Collaboration.toggleCtrl();
	},
	Failed: function () {
		addLog('Hub-Failed');
	},
	Disconnect: function () {
		$.connection.hub.stop();
	}
};

BizAPP.UI.Hub.SystemAlert = {
	TextCallback: function (a) {
		addLog(a);
		BizAPP.UI.Toast.Notify({
			title: 'System Alert',
			text: a,
			type: 'info'
		});
	},
	AlertInfoCallback: function (a) {
		try {
			addLog(JSON.stringify(a));
			var options = {
				title: a.Title,
				text: a.Message,
				shadow: true
			};
			if (a.NonBlocking != null) {
				options.nonblock = {
					nonblock: a.NonBlocking,
					nonblock_opacity: .2
				};
			}
			options.history = {
				history: false,
				menu: false
			};
			if (a.HasHistory != null) {
				options.history.history = a.HasHistory;
				options.history.menu = a.HasHistory;
			}
			options.buttons = {
				closer: true,
				sticker: true
			};
			if (a.ShowClose != null) {
				options.buttons.closer = a.ShowClose;
			}
			if (a.ShowPin != null) {
				options.buttons.sticker = a.ShowPin;
			}
			if (a.AutoDisplay != null) {
				options.auto_display = a.AutoDisplay;
			}
			if (a.AutoHide != null) {
				options.hide = a.AutoHide;
			}
			if (a.DelayMS != null) {
				options.delay = a.DelayMS;
			}
			var icon = a.Icon.toLowerCase();
			switch (icon) {
				case "alert": {
					options.type = "notice";
					break;
				}
				default: {
					options.type = icon;
					break;
				}
			}
			BizAPP.UI.Toast.Notify(options);
		}
		catch (err) {
			addLog('error when trying to notify-' + err.message);
		}
	}
}
BizAPP.UI.Hub.WebRTC = {
	MessageReceivedCallback: function (message) {
		var message = JSON.parse(message);
		if (message.message.isV3) {
			if (message.message.data && message.message.data.message && message.message.data.message.newParticipationRequest)
				sessions[message.message.data.sender] = message.message.data.message.sessionDetails;
		}
		else {
			sessions[message.message.sessionid] = message.message;
		}

		if (onMessageCallbacks[message.channel]) {
			onMessageCallbacks[message.channel](message.message);
		}
	},
	ReconnectedMsgCallback: function (message) {
		message = JSON.parse(message);
		if (!BizAPP.UI.Collaboration.connection.isInitiator && System.OnlineConference.OnHostArrived)
			System.OnlineConference.OnHostArrived({
				oc: message.message.onlineconf,
				callback: function () {
					BizAPP.UI.Collaboration.Join(BizAPP.UI.Collaboration._options);
				}
			});
		else {
			if (BizAPP.UI.Collaboration) {
				if (!BizAPP.UI.Collaboration.connection.isInitiator && BizAPP.UI.Collaboration.connection.sessionid == message.message.sessionid)
					location.reload();
			}
			else if (message.message.sender !== $.connection.hub.qs.userid) {
				BizAPP.Session.EvaluateExpression({
					htmlFriendly: true,
					expression: '<a style="cursor:pointer; color: black" target="_blank" href="viewdetails.aspx?html.args=runtimeviewenterpriseid[NVS][!!%vieweid%!!][PMS]runtimeobjectid[NVS]' + message.message.onlineconf + '">[!!%host.fullname%!!] has invited you to join the training room "[!!%title%!!]" with id [!!%conferenceid%!!]</a>',
					contexts: message.message.onlineconf,
					callback: function (res) {
						PNotify.removeAll();
						BizAPP.UI.Toast.Notify({
							text: res,
							type: 'info',
							icon: 'fa fa-desktop',
							after_init: function (notice) {
								notice.attention('flash');
							}
						});
					}
				});
			}
		}
	},
	UpdateParticipantCallback: function (message) {
		if (BizAPP.UI.Collaboration && BizAPP.UI.Collaboration.allAttendees) {
			var message = JSON.parse(message);
			BizAPP.UI.Collaboration.allAttendees = BizAPP.UI.Collaboration.allAttendees + ',' + message.message.newUserId;
		}
	},
	WhiteboardMsgCallback: function (message) {
		BizAPP.UI.Whiteboard.MsgCallback(message);		
	}
}
BizAPP.UI.Hub.Lounge = {
	ActionAlertInfoCallback: function (a) {
		BizAPP.UI.Hub.Lounge.InternalActionAlertInfoCallback(a);
	},
	ActionAlertCallback: null,
	InternalActionAlertInfoCallback: function (a) {
		try {
			addLog(JSON.stringify(a));

			if (a.Type == "javascript") {
				eval(a.Message);
				return;
			}

			var options = {
				title: a.Title,
				text: a.Message,
				shadow: true
			};
			if (a.NonBlocking != null) {
				options.nonblock = {
					nonblock: a.NonBlocking,
					nonblock_opacity: .2
				};
			}
			options.history = {
				history: false,
				menu: false
			};
			if (a.HasHistory != null) {
				options.history.history = a.HasHistory;
				options.history.menu = a.HasHistory;
			}
			options.buttons = {
				closer: true,
				sticker: true
			};
			if (a.ShowClose != null) {
				options.buttons.closer = a.ShowClose;
			}
			if (a.ShowPin != null) {
				options.buttons.sticker = a.ShowPin;
			}
			if (a.AutoDisplay != null) {
				options.auto_display = a.AutoDisplay;
			}
			if (a.AutoHide != null) {
				options.hide = a.AutoHide;
			}
			if (a.DelayMS != null) {
				options.delay = a.DelayMS;
			}
			if (!a.Icon) a.Icon = 'alert';
			var icon = a.Icon.toLowerCase();
			switch (icon) {
				case "alert": {
					options.type = "notice";
					break;
				}
				default: {
					options.type = icon;
					break;
				}
			}
			BizAPP.UI.Toast.Notify(options);
			if (BizAPP.UI.Hub.Lounge.ActionAlertCallback)
				BizAPP.UI.Hub.Lounge.ActionAlertCallback(a);
		}
		catch (err) {
			addLog('error when trying to notify-' + err.message);
		}
	},
	SystemAlertInfoCallback: function (a, c) {
		try {
			addLog(JSON.stringify(a));
			var options = {
				title: a.Title,
				text: a.Message,
				shadow: true
			};
			if (a.NonBlocking != null) {
				options.nonblock = {
					nonblock: a.NonBlocking,
					nonblock_opacity: .2
				};
			}
			options.history = {
				history: false,
				menu: false
			};
			if (a.HasHistory != null) {
				options.history.history = a.HasHistory;
				options.history.menu = a.HasHistory;
			}
			options.buttons = {
				closer: true,
				sticker: true
			};
			if (a.ShowClose != null) {
				options.buttons.closer = a.ShowClose;
			}
			if (a.ShowPin != null) {
				options.buttons.sticker = a.ShowPin;
			}
			if (a.AutoDisplay != null) {
				options.auto_display = a.AutoDisplay;
			}
			if (a.AutoHide != null) {
				options.hide = a.AutoHide;
			}
			if (a.DelayMS != null) {
				options.delay = a.DelayMS;
			}
			var icon = a.Icon == null ? "notice" : a.Icon.toLowerCase();
			switch (icon) {
				case "alert": {
					options.type = "notice";
					break;
				}
				default: {
					options.type = icon;
					break;
				}
			}
			BizAPP.UI.Toast.Notify(options);
		}
		catch (err) {
			addLog('error when trying to notify-' + err.message);
		}
	},
	EventInfoCallback: function (a, u) {
		try {
			addLog(JSON.stringify(a));

			var message = a.Message;
			if (message == null) {
				message = '';
			}
			/*
			message += '</br></br><font size="1"><table style=\'width:100%\'><tr><td style=\'width:50%\'>' +
				new Date(Date.parse(a.CreatedOn)).toDateString() +
				'</td><td style=\'width:50%; text-align: right\'>' +
				(a.ScheduleAsString != null ? a.ScheduleAsString.toLowerCase() : '') +
				'</td></tr><table></font>';
			*/
			var options = {
				title: a.Title,
				text: message,
				shadow: true
			};
			if (a.NonBlocking != null) {
				options.nonblock = {
					nonblock: a.NonBlocking,
					nonblock_opacity: .2
				};
			}
			options.history = {
				history: false,
				menu: false
			};
			if (a.HasHistory != null) {
				options.history.history = a.HasHistory;
				options.history.menu = a.HasHistory;
			}
			options.buttons = {
				closer: true,
				sticker: true
			};
			if (a.ShowClose != null) {
				options.buttons.closer = a.ShowClose;
			}
			if (a.ShowPin != null) {
				options.buttons.sticker = a.ShowPin;
			}
			if (a.AutoDisplay != null) {
				options.auto_display = a.AutoDisplay;
			}
			if (a.AutoHide != null) {
				options.hide = a.AutoHide;
			}
			if (a.DelayMS != null) {
				options.delay = a.DelayMS;
			}
			var type = a.Type;
			switch (type) {
				case "0": {
					options.type = "info";
					break;
				}
				case "1": {
					options.type = "error";
					break;
				}
				case "2": {
					options.type = "notice";
					break;
				}
				case "3": {
					options.type = "success";
					break;
				}
				default: {
					options.type = type == null ? "info" : type.toLowerCase();
					break;
				}
			}
			BizAPP.UI.Toast.Notify(options);
			jBeep('resources/sounds/NotifyMessaging.wav');
		}
		catch (err) {
			addLog('error when trying to notify event-' + err.message);
		}
	},
	ProgressUpdateCallback: function (a, u) {
		try {
			addLog(JSON.stringify(a));

			var id = a.Id;
			var loader = null;
			$(PNotify.notices).each(function (i, notice) {
				if (notice.options.id == id) {
					loader = notice;
					return false;
				}
			});

			var title = a.Title;
			var percentage = a.PercentCompleted;

			if (loader != null) {
				if (percentage >= 100) {
					loader.remove();
					return;
				}
				else {
					loader.update({
						title: title,
					});
				}
				progress = loader.get().find("progress.progress-bar");
				progress[0].value = percentage;
			}
			else {
				var options = {
					id: id,
					title: title,
					text:
'<progress class="progress-bar" style="margin:0; width:100%; border: 0;" value="0" max="100"></progress>',
					//icon: 'fa fa-cog fa-spin',
					//icon: "fa fa-circle-o-notch fa-spin",
					//icon: "fa fa-refresh fa-spin",
					icon: "fa fa-spinner fa-spin",
					shadow: true,

					hide: false,
					buttons: {
						closer: false,
						sticker: false
					},
					history: {
						history: false
					},
					before_open: function (notice) {
						progress = notice.get().find("progress.progress-bar");
						progress[0].value = percentage;
					}
				};

				if (a.NonBlocking != null) {
					options.nonblock = {
						nonblock: a.NonBlocking,
						nonblock_opacity: .2
					};
				}
				options.history = {
					history: false,
					menu: false
				};
				//if (a.HasHistory != null) {
				//	options.history.history = a.HasHistory;
				//	options.history.menu = a.HasHistory;
				//}
				options.buttons = {
					closer: false,
					sticker: false
				};
				if (a.ShowClose != null) {
					options.buttons.closer = a.ShowClose;
				}
				if (a.ShowPin != null) {
					options.buttons.sticker = a.ShowPin;
				}
				if (a.AutoDisplay != null) {
					options.auto_display = a.AutoDisplay;
				}
				if (a.AutoHide != null) {
					options.hide = a.AutoHide;
				}
				if (a.DelayMS != null) {
					options.delay = a.DelayMS;
				}
				var type = a.Type;
				switch (type) {
					case "0": {
						options.type = "info";
						break;
					}
					case "1": {
						options.type = "error";
						break;
					}
					case "2": {
						options.type = "notice";
						break;
					}
					case "3": {
						options.type = "success";
						break;
					}
					default: {
						options.type = type == null ? "info" : type.toLowerCase();
						break;
					}
				}
				BizAPP.UI.Toast.Notify(options);
				jBeep('resources/sounds/NotifyMessaging.wav');
			}
		}
		catch (err) {
			addLog('error when trying to notify event-' + err.message);
		}
	}
};

//SignalR Chat
BizAPP.Collaboration = {
	_chatPanel: '<div id="chat-panel">\
							<div class="chat-window-title">\
									<div class="text" style="display:inline;">Chat</div>\
									<div style="float:right;display:inline;" onclick="BizAPP.Collaboration.toggleCtrl();"><div class="balloon_white">≡</div></div>\
							   </div>\
						  <div class="bza_chatuserlist chat-window" style="right: 10px;">\
							  <div class="chat-window-content">\
								  <input type="text" id="chatCtactSrch" bza_qid="ESystemae76f" bza_fields="Full Name" style="line-height:24px;padding:0;width:100%" placeholder="Search..."/>\
								   <div class="ui-icon ui-icon-arrowrefresh-1-e refresh-contact-list" title="Refresh Contact List" onclick="BizAPP.Collaboration.DisplayRecentContact($.connection.hub.qs.userid);" style="float:right;"></div>\
								  <div class="chat-window-inner-content">\
								  </div>\
							  </div>\
						  </div>\
						  <div id="chatContainer-tabs">\
							  <ul></ul>\
						  </div>\
					  </div>',
	_tabbed: true,
	_tabbedChatWindow: '<div class="bza_chat chat-window" id = "{0}" style="display: none">\
						<table class="fill">\
						<tr>\
							<td style="width:90%;">\
								<div class="inviteNewUser" style="display:none">\
									<input type="text" class="inviteUser"  bza_qid="ESystemae76f" bza_fields="Full Name" placeholder="Search..."/>\
								</div>\
								<div class="participants" style="color: #638EB5;font-weight: bold;">\
								</div>\
							</td>\
							<td>\
								<span class="icon_inviteUser" title="Add user to this chat" onclick="$(this).closest(\'tr\').find(\'.inviteNewUser\').slideToggle(200);$(this).closest(\'tr\').find(\'.participants\').slideToggle(200);"><img src = "Resources/Images/people.png" /></span>\
							</td>\
							<td>\
								<div class="popout" title="Pop-out" style="float:right;margin-right:4px;"><img src="Resources/Images/operationu.png"></div>\
							</td>\
						</tr>\
					</table>\
					<div class="chat-window-content" style="display: block;">\
						<div class="chat-window-inner-content"></div>\
						<div class="chat-window-text-box-wrapper">\
							<textarea rows="3" class="chat-window-text-box" style="overflow: hidden; word-wrap: break-word; resize: none;" autofocus></textarea>\
							<span class="hint" style="color:gray;font-style:italic;font-size:11px;float:right;">Press "Enter" to send message</span>\
						</div>\
					</div>\
				</div>',

	_chatMsg: '<div class="chat-message">\
							<div class="chat-gravatar-wrapper">\
								<img class="profile-picture" src="testresource.aspx?resize=1&h=25&w=25&id2=ESystema4d6a&userid={2}">\
							</div>\
							<div class="chat-text-wrapper">\
								<span class="sender-title" style="line-height:25px">{0}</span>\
								<p class="msg_time" style="color:#B5B5B5;font-size:11px;float:right;">{3}</p>\
								<pre>{1}</pre>\
							</div>\
						</div>',
	_msg: '<p class="msg_time" style="color:#B5B5B5;font-size:11px;text-align:right;">{1}</p><pre>{0}</pre>',
	_chatMsgCurrentUser: '<div style="padding:.5rem; border: solid 1px; border-radius:.5rem .5rem 0; max-width: 75%;background:#5D5D6D; margin-bottom: .5rem; margin-left: 25%">\
							<div class="active" style="background-color: transparent;font-size: 0.9rem;color: #ccc;">{1}</div>\
							<div style="text-align:right; font-size: 0.7rem;color: #ccc;">{3}</div>\
						</div>',
	_chatMsgOtherUser: '<div style="padding:.5rem; border: solid 1px; border-radius:.5rem .5rem .5rem 0; max-width: 75%;background:#5D5D5D; margin-bottom: .5rem">\
							<div class="active" style="background-color: transparent;font-size: 0.9rem;color: #ccc;">{1}</div>\
							<div style="text-align:right; font-size: 0.7rem;color: #ccc;">{0} - {3}</div>\
						</div>',
	_errormsg: '<pre style ="color:red;">{0}</pre>',
	_infomsg: '<pre style ="color:orange;">{0}</pre>',
	_init: false,
	_initContacts: false,
	_chatHub: null,
	currentUserId: null,
	fullName: null,
	photo: null,
	newMessage: 'new-message',
	Init: function (id, chat) {
		addLog('chat init');
		BizAPP.Collaboration.currentUserId = id;
		var isPopout = location.href.toLowerCase().indexOf('collaboration.aspx') != -1;
		if (!isPopout) {
			var isPanelExist = $('.chat-panel').length > 0;
			if (!isPanelExist) {
				$('body').append($(BizAPP.Collaboration._chatPanel));
				$('#chat-panel').click(function (event) {
					event.stopPropagation();
					BizAPP.MenuPopup.HideOrRemovePopup();
				});
				/*<button class="ui-icon-comment">Chat</button>\
				<button class="ui-icon-contact">Add To Contact</button>\
				$('button').each(function () {
					var icon = $(this).attr('class');
					$(this).button({
						icons: {
							primary: icon
						},
						text: false
					});
				})*/
			}
		}

		// Declare a proxy to reference the hub.
		if (id) {
			var conversationPopout = Persist.Stack.PeekValue('conversationPopout')
			id = isPopout && (conversationPopout != undefined) ? Persist.Stack.PeekValue('convPopoutOpener') : id;
			isPopout == true ? $('body').append($(Persist.Stack.PeekValue('existingConversation'))) : isPopout;
			isPopout == true ? $('title').text(conversationPopout) : isPopout;
		}

		//Remove persisted value from new chat window
		if (isPopout) {
			//Persist.Stack.Clear('conversationPopout');
			Persist.Stack.Clear('convPopoutOpener');
			Persist.Stack.Clear('existingConversation');
		}

		BizAPP.Collaboration._chatHub = chat;
		BizAPP.Collaboration._init = true;
		BizAPP.Collaboration.joined($.connection.hub.id, null);

		//Test - persist conversation
		BizAPP.Collaboration.StoreConversation();
		BizAPP.Collaboration.RestoreConversation();
	},
	joined: function (connectionId, userList) {
		if (!BizAPP.Collaboration._init) setTimeout(function () { BizAPP.Collaboration.joined(connectionId, userList); }, 1000);

		if (userList) {
			$(userList).each(function (index, obj) {
				var id = obj.split(',')[0],
					name = obj.split(',')[1];
				$('.bza_chatuserlist .chat-window-inner-content').append('<div class="user-list-item">\
								<div class="chat-gravatar-wrapper">\
									<img class="profile-picture" src="testresource.aspx?resize=1&h=25&w=25&id2=ESystema4d6a&userid=' + id + '" style="background:grey">\
								</div>\
								<div class="profile-status"></div>\
								<div class="content" uid="'+ id + '">' + name + '</div>\
							</div>');
			});
		}

		BizAPP.UI.Textbox.EnhanceAutoComplete({
			selector: '#chatCtactSrch', userStatus: 'true', selectCallback: function (a, b) {
				if (b.item.status == '1') {
					BizAPP.Collaboration.InitiateChat(b.item.value);
					BizAPP.Collaboration.AddUserToRecentContact(b);
				} else {
					alert('User is offline');
				}
			}
		});
		$('.bza_chatuserlist .chat-window-inner-content .user-list-item').dblclick(function () {
			var toUser = $(this).find('.content').attr('uid');
			BizAPP.Collaboration.InitiateChat(toUser);
		});

		var isPopout = location.href.toLowerCase().indexOf('collaboration.aspx') != -1;
		isPopout == true ? $('.bza_chat.chat-window').find('textarea').keydown(function (event) {
			return BizAPP.Collaboration.sndMsg(event);
		}) : isPopout;

		//Enable autocomplete
		var $chatWindows = $('.bza_chat.chat-window');
		$.each($chatWindows, function () {
			BizAPP.Collaboration.EnableAutoComplete($(this));
		});
	},
	GetOrCreateChatWindow: function (grpName, receive, username, typing) {
		var $chatWindow = $('div[chatToId="' + grpName + '"]'),
			isnew = $chatWindow.length == 0;
		username = username.trim();

		if ($chatWindow.length == 0 && !typing) {
			if (!username)
				BizAPP.Collaboration._chatHub.server.getParticipants(grpName);

			$('.chat-window-title').click();
			var $chatWindow = $(BizAPP.Collaboration._tabbedChatWindow.format(grpName));
			if (BizAPP.Collaboration._tabbed) {
				$chatWindow.attr('groupname', grpName);
				$('#chatContainer-tabs ul').append($('<li><a href="#' + grpName + '" style="outline:none;width:67%">' + username + '</a><span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>)'));
			}
			$chatWindow.attr('chatToId', grpName);
			if (receive) {
				$chatWindow.attr('groupname', grpName);
				$chatWindow.css('display', 'block');
			}

			$("#chatContainer-tabs").append($chatWindow);

			//Enable tabs of the chat window 
			$("#chatContainer-tabs").tabs({
				//textarea focus with tab selection
				activate: function (event, ui) {
					var id = ui.newTab.find('a[href]').attr('href');
					$(id).find('textarea').focus();
					ui.newTab.removeClass(BizAPP.Collaboration.newMessage);
					setTimeout(function () { ui.newTab.find('a').show() }, 700);
				}
			});
			$("#chatContainer-tabs").tabs("refresh");
			$("#chatContainer-tabs").tabs("option", "active", -1);
			$chatWindow.find('textarea').keydown(function (event) {
				return BizAPP.Collaboration.sndMsg(event);
			})
			$chatWindow.find('.popout').bind('click', function (event) {
				BizAPP.Collaboration.PopoutChatWindow($(this));
			});
		}

		//textarea focus with new window
		$chatWindow.find('textarea').focus();

		if (isnew) {
			$chatWindow.find('.popout').click(function () { BizAPP.Collaboration.PopoutChatWindow($(this)); });
			BizAPP.Collaboration.EnableAutoComplete($chatWindow);
			BizAPP.Collaboration.EnableTabClose($("#chatContainer-tabs"));
		}

		return [$chatWindow, isnew];
	},
	ShowMsg: function (chatWindow, userId, name, msg, type) {
		//Enable Chat window from system tray if it is not visible
		if ($('#chat-panel:visible').length == 0) {
			//BizAPP.SystemTray.InitChat();
			//BizAPP.SystemTray.CloseMenu();
			BizAPP.SystemTray.Highlight($('#bt-menu .fa-comments').parent());
		}

		if (type == "Error" || type == 'Info')
			chatWindow[0].find('.chat-window-inner-content .chat-text-wrapper:last').append(type == 'Error' ? BizAPP.Collaboration._errormsg.format(msg) : BizAPP.Collaboration._infomsg.format(msg));
		else {
			//Ignore user info if the last message has arrived from the same user
			var senderSame = BizAPP.Collaboration.IgnoreRepeatedUserInfo(chatWindow[0], name, msg);
			var time = BizAPP.Collaboration.GetTime();

			var temp = $('<div></div>').html(msg);
			if (temp.text() != msg) {
				msg = $('<div/>').text(msg).html();
			}

			if (userId == _userUid__)
				chatWindow[0].find('.chat-window-inner-content').append(BizAPP.Collaboration._chatMsgCurrentUser.format(name, msg, userId, time));
			else
				chatWindow[0].find('.chat-window-inner-content').append(BizAPP.Collaboration._chatMsgOtherUser.format(name, msg, userId, time));
		}
		//beep sound when you receive msg
		if (userId != $.connection.hub.qs.userid) {
			var li = $('[aria-controls="' + chatWindow[0].attr('id') + '"]');
			if (!li.hasClass('ui-state-active')) {
				li.addClass(BizAPP.Collaboration.newMessage);
				BizAPP.Collaboration.UnreadMessageHint("." + BizAPP.Collaboration.newMessage + " a");
			}

			BizAPP.Collaboration.ShowNotification(name, msg, '', 'testresource.aspx?userid=' + userId);
			jBeep('resources/sounds/notifymessaging.wav');
		}

		//Smilify
		BizAPP.Collaboration.Smilify(chatWindow[0].find('.chat-window-inner-content .chat-message pre').last());

		//renew session
		var isPopout = location.href.toLowerCase().indexOf('collaboration.aspx') != -1,
		wdw = isPopout ? window.opener : window;
		wdw.$('button.signin').click();
	},
	PopoutChatWindow: function ($chatWindow) {
		if (!$chatWindow.attr('popout')) {
			Persist.Stack.PushValue('conversationPopout', $chatWindow.closest('.bza_chat.chat-window').attr('id'));
			Persist.Stack.PushValue('convPopoutOpener', $('#chat-panel .chat-window-title').find('.text').text().trim());
			Persist.Stack.PushValue('existingConversation', $chatWindow.closest('.bza_chat.chat-window')[0].outerHTML);
			$chatWindow.attr('popout', 'fullscreen');

			//Close the tab if the popup is open
			var groupId = $chatWindow.closest('.bza_chat').attr('groupname');
			$('a[href="#' + groupId + '"]').next().click();
			$("#chatContainer-tabs").tabs("refresh");

			var popupWindow = window.open('collaboration.aspx', 'newwindow', 'width=300, height=400');
			BizAPP.Collaboration.RemoveGrpIdFromStackOnClose(popupWindow);

		}
	},
	IgnoreRepeatedUserInfo: function (chatWindow, name, msg) {
		var isSameUser = false;
		var lastMsgByUser = chatWindow.find('.chat-text-wrapper:last .sender-title').text().trim();
		var currentMsgByUser = name.trim();
		if (currentMsgByUser == lastMsgByUser) {
			isSameUser = true;
		}

		return isSameUser
	},
	addMessage: function (groupName, msgItem) {
		var userId = msgItem.SenderId,
		message = msgItem.Message,
		name = BizAPP.Collaboration.getUserName(msgItem.SenderId),
		members;
		var isPopout = location.href.toLowerCase().indexOf('collaboration.aspx') != -1;
		if (!isPopout) {
			var pVal = getPersistedValue('conversationPopout', "value");
			if (pVal) {
				pVal = JSON.parse(pVal);
				if ($.inArray(groupName, pVal) >= 0)
					return;
			}
		}

		var chatWindow = BizAPP.Collaboration.GetOrCreateChatWindow(groupName, true, '');
		if (chatWindow[0].find('[popout="fullscreen"]').length)
			return false;

		if (members) {
			//Update members name
			var users = BizAPP.Collaboration.ExcludeCurrentUser(members);
			chatWindow[0].find('.participants').text(members);
			if (!chatWindow[1]) {
				var $display = $('a[href = "#' + chatWindow[0].attr("id") + '"]');
				$display.text(users);
				$display.attr('title', users);
			}

			/*if (chatWindow[1])
				chatWindow[0].find('textarea').keydown(function (event) {
					return BizAPP.Collaboration.sndMsg(event);
				});*/
		}
		BizAPP.Collaboration.ShowMsg(chatWindow, userId, name, message);

		//Add alert to indicate new message
		if (name.trim() != $.connection.hub.qs.fullname.trim()) {
			$('.chat-window-title').find('[class*="balloon"]').addClass('blink');
			BizAPP.Collaboration.BlinkChatIcon($('.chat-window-title').find('[class*="balloon"]'));
		}
		//Always show the last message
		chatWindow[0].find('.chat-window-inner-content').scrollTop(10000);

		//Add user to recent contact list
		var obj = {};
		obj.item = { value: userId, label: ' - ' + name };
		BizAPP.Collaboration.AddUserToRecentContact(obj);

		//textarea focus ( after receiving msg )
		//chatWindow[0].find('textarea').focus();
	},
	addInfoMessage: function (groupName, msgItem) {
		var chatWindow = BizAPP.Collaboration.GetOrCreateChatWindow(groupName, true, '');
		BizAPP.Collaboration.ShowMsg(chatWindow, '', '', msgItem.Info, "Info");
	},
	addErrorMessage: function (groupName, msgItem) {
		var userId = '',
		message = msgItem.Error,
		name = '';
		var isPopout = location.href.toLowerCase().indexOf('collaboration.aspx') != -1;
		if (!isPopout) {
			var pVal = getPersistedValue('conversationPopout', "value");
			if (pVal) {
				pVal = JSON.parse(pVal);
				if ($.inArray(groupName, pVal) >= 0)
					return;
			}
		}

		var chatWindow = BizAPP.Collaboration.GetOrCreateChatWindow(groupName, true, '');
		if (chatWindow[0].find('[popout="fullscreen"]').length)
			return false;

		BizAPP.Collaboration.ShowMsg(chatWindow, userId, name, message, "Error");

		//Add alert to indicate message was undelivered
		$('.chat-window-title').find('[class*="balloon"]').addClass('blink');
		BizAPP.Collaboration.BlinkChatIcon($('.chat-window-title').find('[class*="balloon"]'));

		//Always show the last message
		chatWindow[0].find('.chat-window-inner-content').scrollTop(10000);
	},
	setPresenceStatus: function (userId, presenceStatus) {
		addLog('UserStatusChanged-' + userId + '-Status-' + presenceStatus);
		var userList = BizAPP.Collaboration.GetRecentContact($.connection.hub.qs.userid);
		if(userList)
			$.each(userList, function () {
				var item = this;
				if (item.id == userId) {
					if (presenceStatus == 1)
						$('.user-list-item .content[uid="' + userId + '"]').prev().attr('class', 'profile-status online');
					if (presenceStatus == 0)
						$('.user-list-item .content[uid="' + userId + '"]').prev().attr('class', 'profile-status offline');
				}
			});
	},
	SendTypingMessage: function (event) {
		var groupId = $(event.target).closest('.bza_chat').attr('groupname');
		addLog("sending Typing status");
		BizAPP.Collaboration._chatHub.server.sendUserTypingItem(groupId, { Id: groupId, SenderId: BizAPP.Collaboration.currentUserId, Message: "typing message" });
	},
	receiveTypingMessage: function (groupId, mesItem) {
		var chatWindow = BizAPP.Collaboration.GetOrCreateChatWindow(groupId, true, ''),
		senderid = mesItem.SenderId, name = BizAPP.Collaboration.getUserName(mesItem.SenderId);
		if (senderid != BizAPP.Collaboration.currentUserId) {
			chatWindow[0].find('.chat-user-typing').css('display', "block");
			chatWindow[0].find('.chat-user-typing').html(name + ' is typing...');
		}
		addLog("group Id " + groupId);
		addLog("message item details" + JSON.stringify(mesItem));
	},
	sndMsg: function (event) {
		if (event.keyCode && event.keyCode == '13') {
			strChatText = $(event.target).val().trim();
			if (strChatText != '') {
				var strGroupName = $(event.target).closest('.bza_chat').attr('groupname');
				if (typeof strGroupName !== 'undefined' && strGroupName !== false) {
					BizAPP.Collaboration._chatHub.server.sendTextItem(strGroupName, { Id: strGroupName, SenderId: BizAPP.Collaboration.currentUserId, Message: strChatText });
					$(event.target).val('');
				}
			}
		} else {
			return true;
		}
	},
	getUserName: function (userId) {
		if (userId == BizAPP.Collaboration.currentUserId) return $.connection.hub.qs.fullname;
		var name = $('.user-list-item .content[uid="' + userId + '"]').text();
		if (!name) {
			if (window.sessionStorage)
				name = window.sessionStorage.getItem('chat_fn_' + userId);
			if (!name) {
				name = BizAPP.Session.EvaluateExpression({ expression: '%fullname%', contexts: userId + ':uid_user:-1:', sync: true }).value[1].replace(/"/g, '');
				window.sessionStorage.setItem('chat_fn_' + userId, name);
			}
		}

		return name;
	},
	_getUserNames: function (ids) {
		var strChatTo = '';
		$.each(ids, function () {
			if (this != BizAPP.Collaboration.currentUserId) {
				if (strChatTo) strChatTo += ', ';
				strChatTo += BizAPP.Collaboration.getUserName(this);
			}
		});

		return strChatTo;
	},
	setChatWindow: function (strGroupName, ids) {
		var idsList = ids.join(',');
		var strChatTo = BizAPP.Collaboration._getUserNames(ids);

		if ($('.grpIdUpdationRequired').length > 0) {
			var grpId_1to1 = $('.grpIdUpdationRequired').attr('groupname');
			$('.grpIdUpdationRequired').attr({
				groupname: strGroupName,
				chattoid: strGroupName,
				id: strGroupName
			});
			$('.grpIdUpdationRequired').removeClass('grpIdUpdationRequired');
			$('[href="#' + grpId_1to1 + '"]').attr('href', '#' + strGroupName);
			$('[aria-controls="' + grpId_1to1 + '"]').attr('aria-controls', strGroupName);
		}

		var chatWin = BizAPP.Collaboration.GetOrCreateChatWindow(strGroupName, false, strChatTo)[0];//$('div[chatToId="' + id + '"]');
		chatWin.attr({
			groupname: strGroupName,
			chattoid: strGroupName,
			id: strGroupName
		});
		$('.ui-tabs-anchor[href="#' + idsList + '"]').attr('href', '#' + strGroupName).text(strChatTo).attr('title', strChatTo);
		chatWin.find('.participants').text($.connection.hub.qs.fullname + ',' + strChatTo);
		chatWin.css('display', 'block');

		//Tab initilization
		$("#chatContainer-tabs").find("#chatContainer-tabs").tabs();
		BizAPP.Collaboration.EnableTabClose($("#chatContainer-tabs"));
		BizAPP.Collaboration.EnableAutoComplete(chatWin);

		BizAPP.Collaboration.StoreParticipant(strGroupName, idsList);
	},
	InitiateChat: function (toUser) {
		BizAPP.Collaboration._chatHub.server.createConversation([toUser]);
	},

	toggleCtrl: function () {
		var a = $('.bza_chatuserlist');
		if (a.is(':visible')) {
			$('#chat-panel').height('0');
			$('#chat-panel').width('auto');
			$('.balloon_white').removeClass('balloon_white').addClass('balloon_blue');
			var title_section = $('.chat-window-title');
			title_section.css('background', 'none');
			title_section.find('[class*="balloon"]').text('');

			//hide chat icon & see the var also
			title_section.hide();
		}
		else {
			$('#chat-panel:not(".bza-notifn")').height('100%');
			$('#chat-panel').width('314');
			$('.balloon_blue').removeClass('balloon_blue').addClass('balloon_white');
			$('.chat-window-title').css('background', '#123F76');
			$('.chat-window-title').find('[class*="balloon"]').text('≡');

			//Grant permission for desktop notification
			if (!isIE() && Notification.permission !== "granted") {
				Notification.requestPermission();
				addLog('Permission granted for notification');
			}
		}

		$('#chat-panel .text').toggle();
		a.toggle();
		$('#chatContainer-tabs').toggle();

		//Stop blinking of chat icon
		$('.chat-window-title').find('[class*="balloon"]').removeClass('blink');

		//textarea focus ( on expand of the chat panel )
		$('.bza_chat.chat-window:visible:eq(0) textarea').focus();
	},
	InviteUser: function (toUser, groupId) {
		if (!groupId.startsWith('bzacidhash_')) {
			$.connection.chatHub.server.addUsersToConversation(groupId, [toUser])
			BizAPP.Collaboration.StoreParticipant(groupId, toUser);
			$('div[chatToId="' + groupId + '"]').addClass('grpIdUpdationRequired');
			addLog(toUser + ' successfully added in the group');
		}
		else {
			var userIds = BizAPP.Collaboration.GetParticipants(groupId);
			userIds = userIds.split(',');
			userIds.push(toUser);
			BizAPP.Collaboration._chatHub.server.createConversation(userIds);
		}
	},
	EnableAutoComplete: function ($chatWindow) {
		BizAPP.UI.Textbox.EnhanceAutoComplete({
			selector: '.inviteUser', userStatus: 'true', selectCallback: function (a, b) {
				//debugger;
				if (b.item.status == '1')
					BizAPP.Collaboration.InviteUser(b.item.value, $chatWindow.find('.inviteUser').closest('[groupname]').attr('groupname'));
				else
					alert('User is offline');

				$('.inviteUser').val('');
			}
		});
	},
	EnableTabClose: function ($tab) {
		var tabs = $tab.tabs();
		tabs.delegate("span.ui-icon-close", "click", function () {
			var panelId = $(this).closest("li").find('a').attr('href');
			$(this).closest("li").remove();
			$(panelId).remove();
			tabs.tabs("refresh");
		});
	},
	StoreConversation: function () {
		window.onunload = function () {
			BizAPP.UI.Hub.Disconnect();
			var $tabs = $('#chatContainer-tabs'), qs = $.connection.hub.qs;
			if ($tabs.find('.chat-window').length && $tabs.find('ul a').length) {
				Persist.Stack.StoreValue('openChat' + qs.userid, $tabs.html());
				Persist.Stack.StoreValue('chatSessionId' + qs.userid, qs.sessionid);
				addLog('Conversation saved for ' + qs.fullname);
			} else {
				Persist.Stack.Clear('openChat' + qs.userid);
			}
		}
	},
	RestoreConversation: function () {
		$(document).ready(function () {
			var qs = $.connection.hub.qs,
			openChat = Persist.Stack.PeekValue('openChat' + qs.userid), lastSessionId = Persist.Stack.PeekValue('chatSessionId' + qs.userid);
			if (qs.sessionid == lastSessionId) {
				if (openChat != null && openChat.length) {
					var $tabs = $('#chatContainer-tabs')
					$tabs.find('*').remove();
					$tabs.append($(openChat));
					addLog('Conversation restored for :' + qs.fullname);
					$tabs.tabs();
					BizAPP.Collaboration.EnableEvents($tabs, $tabs.find('.chat-window'));
					$tabs.find('.chat-window textarea').keydown(function (event) {
						return BizAPP.Collaboration.sndMsg(event);
					});
				} else {
					Persist.Stack.Clear('openChat' + qs.userid);
				}
			}
		});
	},
	EnableEvents: function ($tabs, $chatWindows) {
		$chatWindows.find('.popout').click(function () { BizAPP.Collaboration.PopoutChatWindow($(this)); });
		BizAPP.Collaboration.EnableTabClose($tabs);
	},
	BlinkChatIcon: function (selector) {
		if ($(selector).hasClass('blink') && $(selector).hasClass('balloon_blue')) {
			$(selector).fadeOut('slow', function () {
				$(this).fadeIn('slow', function () {
					BizAPP.Collaboration.BlinkChatIcon(this);
				});
			});
		}
	},
	GetTime: function () {
		return new Date().toString("hh:mm tt");
	},
	RemoveGrpIdFromStackOnClose: function (popupWindow) {
		var timer = setInterval(function () {
			if (popupWindow.closed) {
				clearInterval(timer);
				var conversationId = $(popupWindow.document).find('[groupname]').attr('groupname');
				var pVal = getPersistedValue('conversationPopout', "value");
				if (pVal) {
					pVal = JSON.parse(pVal);
					if ($.inArray(conversationId, pVal) >= 0) {
						pVal.splice($.inArray(conversationId, pVal), 1);
						persistValue('conversationPopout', "value", JSON.stringify(pVal));
						$('[groupname="' + conversationId + '"]').find('[popout="fullscreen"]').removeAttr('popout');
					}
				}
			}
		}, 1000);
	},
	AddUserToRecentContact: function (obj) {
		if (obj.item.value == BizAPP.Collaboration.currentUserId) return;

		var userFound = false,
			displayName = obj.item.label.split('- ')[1],
			userList = BizAPP.Collaboration.GetRecentContact(BizAPP.Collaboration.currentUserId);
		$(userList).each(function () {
			if (this.id == obj.item.value) {
				userFound = true;
				addLog(displayName + ' already exists in recent contact list');
				return;
			}
		});

		if ((!userFound) && (!userList || userList.length <= 50)) {
			var user = { id: obj.item.value, label: displayName };
			Persist.Stack.PushValue('recentContact' + BizAPP.Collaboration.currentUserId, user);
			addLog(displayName + ' is added in recent contact list');
			BizAPP.Collaboration.DisplayRecentContact(BizAPP.Collaboration.currentUserId);
		}
	},
	GetRecentContact: function (userId) {
		var recentContact = getPersistedValue('recentContact' + userId, "value");
		if (recentContact) {
			recentContact = JSON.parse(recentContact);
			recentContact = recentContact.sort(function (a, b) {
				var aName = a.label.toLowerCase();
				var bName = b.label.toLowerCase();
				return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
			});
		}

		return recentContact;
	},
	DisplayRecentContact: function (userId) {
		//Refresh the recent contact list
		$('.bza_chatuserlist .chat-window-inner-content').html('');
		var userList = BizAPP.Collaboration.GetRecentContact($.connection.hub.qs.userid),
			status = 'offline',
			userIds = null;

		if (userList) {
			userIds = jQuery.map(userList, function (obj) {
				return obj.id;
			});
		}
		if (userIds) {
			$.connection.chatHub.server.getUsersWithStatus(userIds).done(function (result) {
				$(userList).each(function (index, obj) {
					var id = obj.id,
						label = obj.label;
					status = 'offline';
					if (result && parseInt(result[userIds.indexOf(id)]))
						status = 'online';
					$('.bza_chatuserlist .chat-window-inner-content').append('<div class="user-list-item">\
									<div class="user-det"></div>\
									<div class="chat-gravatar-wrapper">\
										<img class="profile-picture" src="testresource.aspx?resize=1&h=25&w=25&id2=ESystema4d6a&userid=' + id + '">\
									</div>\
									<div class="profile-status ' + status + '"></div>\
									<div class="content" uid="'+ id + '">' + label + '</div>\
									<div class="custom-action" style="float:right;margin-right:25px;margin-top: -17px;display:none;">\
										<i class="fa fa-ellipsis-v" style="line-height: 25px; padding: 0px 0.3rem; font-size: 1.1rem;"></i>\
										<i class="fa fa-remove" style="line-height: 25px; padding: 0px 0.3rem; font-size: 1.1rem;"></i>\
									</div>\
								</div>');
				});

				$('.bza_chatuserlist .chat-window-inner-content .user-list-item').hover(
					function () {
						//$(this).find('.custom-action').css('display', 'inline');
						$(this).css('background', 'whitesmoke');
						$(this).find('.custom-action').show();
					}, function () {
						$(this).find('.custom-action').hide();
						$(this).css('background', 'none');
					});

				$('.bza_chatuserlist .chat-window-inner-content .fa-ellipsis-v').on('click', function (event) {
					event.stopPropagation();
					var popup = $(this).closest('.user-list-item').find('.bza-dropdown');
					if (popup.length > 0) {
						popup.toggleClass('open');
					}
					else
						BizAPP.UI.LoadView({
							url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemaf9ec[PMS]runtimeobjectid[NVS]' + $(this).parent().parent().find('.content').attr('uid') + ':uid_user:-1&html.jar=true', menuPopupSelector: $(this).closest('.user-list-item').find('.profile-picture'), position: 'bottom pleft'
						});
				});
				$('.bza_chatuserlist .chat-window-inner-content .fa-remove').on('click', function (event) {
					var uid = $(this).closest('.user-list-item').find('.content').attr('uid');
					var userList = BizAPP.Collaboration.GetRecentContact(BizAPP.Collaboration.currentUserId);
					var index = -1;
					$(userList).each(function (i, n) {
						if (n.id == uid) {
							index = i;
							return;
						}
					});
					if (i != -1) {
						userList.splice(index, 1);
						Persist.Stack.Clear('recentContact' + BizAPP.Collaboration.currentUserId);
						persistValue('recentContact' + BizAPP.Collaboration.currentUserId, "value", JSON.stringify(userList));
						$(this).closest('.user-list-item').remove();
					}
				});
				//Binds event to initiate chat for recent contact list
				$('.bza_chatuserlist .chat-window-inner-content .user-list-item').on('click', function (event) {
					if (!event.isPropagationStopped()) {
						var toUser = $(this).find('.content').attr('uid');
						BizAPP.Collaboration.InitiateChat(toUser);
					}
				});
			});
		} else {
			addLog('Recent contact list is empty');
		}
	},
	ShowNotification: function (title, message, tag, icon) {
		var basePath = BizAPP.UI.basePath.replace(/\/$/, '');
		if (!tag) tag = 'bizapp';
		if (!icon) icon = basePath + '/favicon.ico';
		var notification = new Notification(title, {
			body: message,
			icon: icon,
			tag: tag
		});
		notification.onclick = function () {
			window.focus();
		};
		setTimeout(function () { notification.close() }, 4000);
	},
	ExcludeCurrentUser: function (members) {
		var currentUser = $.connection.hub.qs.fullname,
			a = members.split(',');
		if ($.inArray(currentUser, a) >= 0) {
			a.splice($.inArray(currentUser, a), 1);
		}

		return a.join(',');
	},
	Smilify: function (selector) {
		$.cachedScript(BizAPP.UI.GetBasePath('Resources/Smiley/smileys.js')).done(function (script, textStatus) {
			$.getCss(BizAPP.UI.GetBasePath("Resources/Smiley/smileys.css"));
			$(selector).smilify();
		});
	},
	UnreadMessageHint: function (selector) {
		$(selector).fadeOut("slow", function () {
			$(selector).fadeIn("slow", function () {
				BizAPP.Collaboration.UnreadMessageHint(selector);
			});
		});
	},
	StoreParticipant: function (groupId, usersId) {
		var participants = Persist.Stack.PeekValue(groupId);
		if (!participants) {
			participants = usersId;
			var distinct = $.unique(participants.split(',')).join(',');
			Persist.Stack.PushValue(groupId, distinct);
		} else {
			if ($.inArray(participants.split(','), usersId) < 0) {
				participants += ',' + usersId;
			}
			var distinct = $.unique(participants.split(',')).join(',');
			Persist.Stack.PushValue(groupId, distinct);
		}
	},
	GetParticipants: function (groupId) {
		return Persist.Stack.PeekValue(groupId);
	}
}

/**
 * jBeep
 * 
 * Play WAV beeps easily in javascript!
 * Tested on all popular browsers and works perfectly, including IE6.
 * 
 * @date 10-19-2012
 * @license MIT
 * @author Everton (www.ultraduz.com.br)
 * @version 1.0
 * @params soundFile The .WAV sound path
 */
function jBeep(a) { if (!a) a = "jBeep/jBeep.wav"; var b, c, d; d = true; try { if (typeof document.createElement("audio").play == "undefined") d = false } catch (e) { d = false } c = document.getElementsByTagName("body")[0]; if (!c) c = document.getElementsByTagName("html")[0]; b = document.getElementById("jBeep"); if (b) c.removeChild(b); if (d) { b = document.createElement("audio"); b.setAttribute("id", "jBeep"); b.setAttribute("src", a); b.play() } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) { b = document.createElement("bgsound"); b.setAttribute("id", "jBeep"); b.setAttribute("loop", 1); b.setAttribute("src", a); c.appendChild(b) } else { var f; b = document.createElement("object"); b.setAttribute("id", "jBeep"); b.setAttribute("type", "audio/wav"); b.setAttribute("style", "display:none;"); b.setAttribute("data", a); f = document.createElement("param"); f.setAttribute("name", "autostart"); f.setAttribute("value", "false"); b.appendChild(f); c.appendChild(b); try { b.Play() } catch (e) { b.object.Play() } } }

/**
 * Notification JS
 * Shims up the Notification API
 *
 * @author Andrew Dodson
 * @website http://adodson.com/notification.js/
 */
(function (k, m) { var c = "granted", h = "denied", p = "unknown"; var o = [], n, j = 0; function d(a) { if (o.length === 0) { o = [m.title] } o.push(a); if (!n) { n = setInterval(function () { if (o.indexOf(m.title) === -1) { o[0] = m.title } m.title = o[++j % o.length] }, 1000) } } function l() { if (o.length === 0) { return } if ("external" in k && "msSiteModeClearIconOverlay" in k.external) { k.external.msSiteModeClearIconOverlay() } clearInterval(n); n = false; m.title = o[0]; o = [] } function g(s, q, t) { if (q.match(" ")) { var b = q.split(" "); for (var r = 0; r < b.length; r++) { g(s, b[r], t) } } if (s.addEventListener) { s.removeEventListener(q, t, false); s.addEventListener(q, t, false) } else { s.detachEvent("on" + q, t); s.attachEvent("on" + q, t) } } function f() { if (("external" in k) && ("msIsSiteMode" in k.external)) { return k.external.msIsSiteMode() ? c : p } else { if ("webkitNotifications" in k) { return k.webkitNotifications.checkPermission() === 0 ? c : h } else { if ("mozNotification" in k.navigator) { return c } else { return p } } } } function e() { k.Notification.permission = f(); return k.Notification.permission } if (!Object(k.Notification).permission) { g(k, "focus scroll click", l); k.Notification = function (q, i) { if (!(this instanceof k.Notification)) { return new k.Notification(q, i) } var r, b = this; i = i || {}; this.body = i.body || ""; this.icon = i.icon || ""; this.lang = i.lang || ""; this.tag = i.tag || ""; this.close = function () { l(); if (Object(r).close) { r.close() } b.onclose() }; this.onclick = function () { }; this.onclose = function () { }; d(q); if (("external" in k) && ("msIsSiteMode" in k.external)) { if (k.external.msIsSiteMode()) { k.external.msSiteModeActivate(); if (this.icon) { k.external.msSiteModeSetIconOverlay(this.icon, q) } } } else { if ("webkitNotifications" in k) { if (k.webkitNotifications.checkPermission() === 0) { r = k.webkitNotifications.createNotification(this.icon, q, this.body); r.show(); r.onclick = function () { b.onclick(); k.focus(); setTimeout(function () { r.cancel() }, 1000) } } } else { if ("mozNotification" in k.navigator) { var a = k.navigator.mozNotification.createNotification(q, this.body, this.icon); a.show() } } } }; k.Notification.requestPermission = function (a) { a = a || function () { }; if (("external" in k) && ("msIsSiteMode" in k.external)) { try { if (!k.external.msIsSiteMode()) { k.external.msAddSiteMode(); a(p) } } catch (b) { } a(e()) } else { if ("webkitNotifications" in k) { k.webkitNotifications.requestPermission(function () { a(e()) }) } else { a(e()) } } }; e() } })(window, document);