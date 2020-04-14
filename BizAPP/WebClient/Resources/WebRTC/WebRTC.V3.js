//***** WebRTC Version 3 *************************************************************************************************************************

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

//****************************************************************************************************************************************************

// Last time updated: 2016-11-25 6:09:38 PM UTC

// _________________________
// RTCMultiConnection v3.4.2

// Open-Sourced: https://github.com/muaz-khan/RTCMultiConnection

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

'use strict';

(function () {

	// RTCMultiConnection.js

	function RTCMultiConnection(roomid, forceOptions) {
		forceOptions = forceOptions || {
			useDefaultDevices: true
		};

		var connection = this;

		connection.channel = connection.sessionid = (roomid || location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')) + '';

		var mPeer = new MultiPeers(connection);

		mPeer.onGettingLocalMedia = function (stream) {
			stream.type = 'local';

			connection.setStreamEndHandler(stream);

			getRMCMediaElement(stream, function (mediaElement) {
				mediaElement.id = stream.streamid;
				mediaElement.muted = true;
				mediaElement.volume = 0;

				if (connection.attachStreams.indexOf(stream) === -1) {
					connection.attachStreams.push(stream);
				}

				if (typeof StreamsHandler !== 'undefined') {
					StreamsHandler.setHandlers(stream, true, connection);
				}

				connection.streamEvents[stream.streamid] = {
					stream: stream,
					type: 'local',
					mediaElement: mediaElement,
					userid: connection.userid,
					extra: connection.extra,
					streamid: stream.streamid,
					blobURL: mediaElement.src || URL.createObjectURL(stream),
					isAudioMuted: true
				};

				setHarkEvents(connection, connection.streamEvents[stream.streamid]);
				setMuteHandlers(connection, connection.streamEvents[stream.streamid]);

				connection.onstream(connection.streamEvents[stream.streamid]);
			}, connection);
		};

		mPeer.onGettingRemoteMedia = function (stream, remoteUserId) {
			stream.type = 'remote';

			connection.setStreamEndHandler(stream, 'remote-stream');

			getRMCMediaElement(stream, function (mediaElement) {
				mediaElement.id = stream.streamid;

				if (typeof StreamsHandler !== 'undefined') {
					StreamsHandler.setHandlers(stream, false, connection);
				}

				connection.streamEvents[stream.streamid] = {
					stream: stream,
					type: 'remote',
					userid: remoteUserId,
					extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
					mediaElement: mediaElement,
					streamid: stream.streamid,
					blobURL: mediaElement.src || URL.createObjectURL(stream)
				};

				setMuteHandlers(connection, connection.streamEvents[stream.streamid]);
				
				connection.onstream(connection.streamEvents[stream.streamid]);
			}, connection);
		};

		mPeer.onRemovingRemoteMedia = function (stream, remoteUserId) {
			var streamEvent = connection.streamEvents[stream.streamid];
			if (!streamEvent) {
				streamEvent = {
					stream: stream,
					type: 'remote',
					userid: remoteUserId,
					extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
					streamid: stream.streamid,
					mediaElement: connection.streamEvents[stream.streamid] ? connection.streamEvents[stream.streamid].mediaElement : null
				};
			}

			connection.onstreamended(streamEvent);

			delete connection.streamEvents[stream.streamid];
		};

		mPeer.onNegotiationNeeded = function (message, remoteUserId, callback) {
			connectSocket(function () {
				connection.socket.emit(connection.socketMessageEvent, 'password' in message ? message : {
					remoteUserId: message.remoteUserId || remoteUserId,
					message: message,
					sender: connection.userid
				}, callback || function () { });
			});
		};

		function onUserLeft(remoteUserId) {
			connection.deletePeer(remoteUserId);
		}

		mPeer.onUserLeft = onUserLeft;
		mPeer.disconnectWith = function (remoteUserId, callback) {
			if (connection.socket) {
				connection.socket.emit('disconnect-with', remoteUserId, callback || function () { });
			}

			connection.deletePeer(remoteUserId);
		};

		connection.broadcasters = [];

		connection.socketOptions = {
			// 'force new connection': true, // For SocketIO version < 1.0
			// 'forceNew': true, // For SocketIO version >= 1.0
			'transport': 'polling' // fixing transport:unknown issues
		};

		function connectSocket(connectCallback) {
			connection.socketAutoReConnect = true;

			if (connection.socket) { // todo: check here readySate/etc. to make sure socket is still opened
				if (connectCallback) {
					connectCallback(connection.socket);
				}
				return;
			}

			if (typeof SocketConnection === 'undefined') {
				if (typeof FirebaseConnection !== 'undefined') {
					window.SocketConnection = FirebaseConnection;
				} else if (typeof PubNubConnection !== 'undefined') {
					window.SocketConnection = PubNubConnection;
				} else {
					throw 'SocketConnection.js seems missed.';
				}
			}

			new SocketConnection(connection, function (s) {
				if (connectCallback) {
					connectCallback(connection.socket);
				}
			});
		}

		connection.openOrJoin = function (localUserid, password) {
			connection.checkPresence(localUserid, function (isRoomExists, roomid) {
				if (typeof password === 'function') {
					password(isRoomExists, roomid);
					password = null;
				}

				if (isRoomExists) {
					connection.sessionid = roomid;

					var localPeerSdpConstraints = false;
					var remotePeerSdpConstraints = false;
					var isOneWay = !!connection.session.oneway;
					var isDataOnly = isData(connection.session);

					remotePeerSdpConstraints = {
						OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
						OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
					}

					localPeerSdpConstraints = {
						OfferToReceiveAudio: isOneWay ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
						OfferToReceiveVideo: isOneWay ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
					}

					var connectionDescription = {
						remoteUserId: connection.sessionid,
						message: {
							newParticipationRequest: true,
							isOneWay: isOneWay,
							isDataOnly: isDataOnly,
							localPeerSdpConstraints: localPeerSdpConstraints,
							remotePeerSdpConstraints: remotePeerSdpConstraints
						},
						sender: connection.userid,
						password: password || false
					};

					beforeJoin(connectionDescription.message, function () {
						mPeer.onNegotiationNeeded(connectionDescription);
					});
					return;
				}

				var oldUserId = connection.userid;
				connection.userid = connection.sessionid = localUserid || connection.sessionid;
				connection.userid += '';

				connection.socket.emit('changed-uuid', connection.userid);

				if (password) {
					connection.socket.emit('set-password', password);
				}

				connection.isInitiator = true;

				if (isData(connection.session)) {
					return;
				}

				connection.captureUserMedia();
			});
		};

		connection.open = function (localUserid, isPublicModerator) {
			var oldUserId = connection.userid;
			connection.userid = connection.sessionid = localUserid || connection.sessionid;
			connection.userid += '';

			connection.isInitiator = true;

			connectSocket(function () {
				connection.socket.emit('changed-uuid', connection.userid);

				if (isPublicModerator == true) {
					connection.becomePublicModerator();
				}
			});

			if (isData(connection.session)) {
				if (typeof isPublicModerator === 'function') {
					isPublicModerator();
				}
				return;
			}

			connection.captureUserMedia(typeof isPublicModerator === 'function' ? isPublicModerator : null);
		};

		connection.becomePublicModerator = function () {
			if (!connection.isInitiator) return;
			connection.socket.emit('become-a-public-moderator');
		};

		connection.dontMakeMeModerator = function () {
			connection.socket.emit('dont-make-me-moderator');
		};

		connection.deletePeer = function (remoteUserId) {
			if (!remoteUserId) {
				return;
			}

			connection.onleave({
				userid: remoteUserId,
				extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {}
			});

			if (!!connection.peers[remoteUserId]) {
				connection.peers[remoteUserId].streams.forEach(function (stream) {
					stream.stop();
				});

				var peer = connection.peers[remoteUserId].peer;
				if (peer && peer.iceConnectionState !== 'closed') {
					try {
						peer.close();
					} catch (e) { }
				}

				if (connection.peers[remoteUserId]) {
					connection.peers[remoteUserId].peer = null;
					delete connection.peers[remoteUserId];
				}
			}

			if (connection.broadcasters.indexOf(remoteUserId) !== -1) {
				var newArray = [];
				connection.broadcasters.forEach(function (broadcaster) {
					if (broadcaster !== remoteUserId) {
						newArray.push(broadcaster);
					}
				});
				connection.broadcasters = newArray;
				keepNextBroadcasterOnServer();
			}
		}

		connection.rejoin = function (connectionDescription) {
			if (connection.isInitiator || !connectionDescription || !Object.keys(connectionDescription).length) {
				return;
			}

			var extra = {};

			if (connection.peers[connectionDescription.remoteUserId]) {
				extra = connection.peers[connectionDescription.remoteUserId].extra;
				connection.deletePeer(connectionDescription.remoteUserId);
			}

			if (connectionDescription && connectionDescription.remoteUserId) {
				connection.join(connectionDescription.remoteUserId);

				connection.onReConnecting({
					userid: connectionDescription.remoteUserId,
					extra: extra
				});
			}
		};

		connection.join = connection.connect = function (remoteUserId, options) {
			connection.sessionid = (remoteUserId ? remoteUserId.sessionid || remoteUserId.remoteUserId || remoteUserId : false) || connection.sessionid;
			connection.sessionid += '';

			var localPeerSdpConstraints = false;
			var remotePeerSdpConstraints = false;
			var isOneWay = false;
			var isDataOnly = false;

			if ((remoteUserId && remoteUserId.session) || !remoteUserId || typeof remoteUserId === 'string') {
				var session = remoteUserId ? remoteUserId.session || connection.session : connection.session;

				isOneWay = !!session.oneway;
				isDataOnly = isData(session);

				remotePeerSdpConstraints = {
					OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
					OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
				};

				localPeerSdpConstraints = {
					OfferToReceiveAudio: isOneWay ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
					OfferToReceiveVideo: isOneWay ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
				};
			}

			options = options || {};

			var cb = function () { };
			if (typeof options === 'function') {
				cb = options;
				options = {};
			}

			if (typeof options.localPeerSdpConstraints !== 'undefined') {
				localPeerSdpConstraints = options.localPeerSdpConstraints;
			}

			if (typeof options.remotePeerSdpConstraints !== 'undefined') {
				remotePeerSdpConstraints = options.remotePeerSdpConstraints;
			}

			if (typeof options.isOneWay !== 'undefined') {
				isOneWay = options.isOneWay;
			}

			if (typeof options.isDataOnly !== 'undefined') {
				isDataOnly = options.isDataOnly;
			}

			var connectionDescription = {
				remoteUserId: connection.sessionid,
				message: {
					newParticipationRequest: true,
					isOneWay: isOneWay,
					isDataOnly: isDataOnly,
					localPeerSdpConstraints: localPeerSdpConstraints,
					remotePeerSdpConstraints: remotePeerSdpConstraints
				},
				sender: connection.userid,
				password: false
			};

			beforeJoin(connectionDescription.message, function () {
				connectSocket(function () {
					if (!!connection.peers[connection.sessionid]) {
						// on socket disconnect & reconnect
						return;
					}

					mPeer.onNegotiationNeeded(connectionDescription);
					cb();
				});
			});
			return connectionDescription;
		};

		function beforeJoin(userPreferences, callback) {
			if (connection.dontCaptureUserMedia || userPreferences.isDataOnly) {
				callback();
				return;
			}

			var localMediaConstraints = {};

			if (userPreferences.localPeerSdpConstraints.OfferToReceiveAudio) {
				localMediaConstraints.audio = connection.mediaConstraints.audio;
			}

			if (userPreferences.localPeerSdpConstraints.OfferToReceiveVideo) {
				localMediaConstraints.video = connection.mediaConstraints.video;
			}

			var session = userPreferences.session || connection.session;

			if (session.oneway && session.audio !== 'two-way' && session.video !== 'two-way' && session.screen !== 'two-way') {
				callback();
				return;
			}

			if (session.oneway && session.audio && session.audio === 'two-way') {
				session = {
					audio: true
				};
			}

			if (session.audio || session.video || session.screen) {
				if (session.screen) {
					connection.getScreenConstraints(function (error, screen_constraints) {
						connection.invokeGetUserMedia({
							audio: isAudioPlusTab(connection) ? getAudioScreenConstraints(screen_constraints) : false,
							video: screen_constraints,
							isScreen: true
						}, (session.audio || session.video) && !isAudioPlusTab(connection) ? connection.invokeGetUserMedia(null, callback) : callback);
					});
				} else if (session.audio || session.video) {
					connection.invokeGetUserMedia(null, callback, session);
				}
			}
		}

		connection.connectWithAllParticipants = function (remoteUserId) {
			mPeer.onNegotiationNeeded('connectWithAllParticipants', remoteUserId || connection.sessionid);
		};

		connection.removeFromBroadcastersList = function (remoteUserId) {
			mPeer.onNegotiationNeeded('removeFromBroadcastersList', remoteUserId || connection.sessionid);

			connection.peers.getAllParticipants(remoteUserId || connection.sessionid).forEach(function (participant) {
				mPeer.onNegotiationNeeded('dropPeerConnection', participant);
				connection.deletePeer(participant);
			});

			connection.attachStreams.forEach(function (stream) {
				stream.stop();
			});
		};

		connection.getUserMedia = connection.captureUserMedia = function (callback, sessionForced) {
			callback = callback || function () { };
			var session = sessionForced || connection.session;

			if (connection.dontCaptureUserMedia || isData(session)) {
				callback();
				return;
			}

			if (session.audio || session.video || session.screen) {
				if (session.screen) {
					connection.getScreenConstraints(function (error, screen_constraints) {
						if (error) {
							throw error;
						}

						connection.invokeGetUserMedia({
							audio: isAudioPlusTab(connection) ? getAudioScreenConstraints(screen_constraints) : false,
							video: screen_constraints,
							isScreen: true
						}, function (stream) {
							if ((session.audio || session.video) && !isAudioPlusTab(connection)) {
								var nonScreenSession = {};
								for (var s in session) {
									if (s !== 'screen') {
										nonScreenSession[s] = session[s];
									}
								}
								connection.invokeGetUserMedia(sessionForced, callback, nonScreenSession);
								return;
							}
							callback(stream);
						});
					});
				} else if (session.audio || session.video) {
					connection.invokeGetUserMedia(sessionForced, callback, session);
				}
			}
		};

		function beforeUnload(shiftModerationControlOnLeave, dontCloseSocket) {
			if (!connection.closeBeforeUnload) {
				return;
			}

			if (connection.isInitiator === true) {
				connection.dontMakeMeModerator();
			}

			connection.peers.getAllParticipants().forEach(function (participant) {
				mPeer.onNegotiationNeeded({
					userLeft: true
				}, participant);

				if (connection.peers[participant] && connection.peers[participant].peer) {
					connection.peers[participant].peer.close();
				}

				delete connection.peers[participant];
			});

			if (!dontCloseSocket) {
				connection.closeSocket();
			}

			connection.broadcasters = [];
			connection.isInitiator = false;
		}

		connection.closeBeforeUnload = true;
		window.addEventListener('beforeunload', beforeUnload, false);

		connection.userid = getRandomString();
		connection.changeUserId = function (newUserId, callback) {
			connection.userid = newUserId || getRandomString();
			connection.socket.emit('changed-uuid', connection.userid, callback || function () { });
		};

		connection.extra = {};
		connection.attachStreams = [];

		connection.session = {
			audio: true,
			video: true
		};

		connection.enableFileSharing = false;

		// all values in kbps
		connection.bandwidth = {
			screen: 512,
			audio: 128,
			video: 512
		};

		connection.codecs = {
			audio: 'opus',
			video: 'VP9'
		};

		connection.processSdp = function (sdp) {
			if (isMobileDevice || isFirefox) {
				return sdp;
			}

			sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, connection.bandwidth, !!connection.session.screen);
			sdp = CodecsHandler.setVideoBitrates(sdp, {
				min: connection.bandwidth.video * 8 * 1024,
				max: connection.bandwidth.video * 8 * 1024
			});
			sdp = CodecsHandler.setOpusAttributes(sdp, {
				maxaveragebitrate: connection.bandwidth.audio * 8 * 1024,
				maxplaybackrate: connection.bandwidth.audio * 8 * 1024,
				stereo: 1,
				maxptime: 3
			});

			if (connection.codecs.video === 'VP9') {
				sdp = CodecsHandler.preferVP9(sdp);
			}

			if (connection.codecs.video === 'H264') {
				sdp = CodecsHandler.removeVPX(sdp);
			}

			if (connection.codecs.audio === 'G722') {
				sdp = CodecsHandler.removeNonG722(sdp);
			}

			return sdp;
		};

		if (typeof CodecsHandler !== 'undefined') {
			connection.BandwidthHandler = connection.CodecsHandler = CodecsHandler;
		}

		connection.mediaConstraints = {
			audio: {
				mandatory: {},
				optional: [{
					bandwidth: connection.bandwidth.audio * 8 * 1024 || 128 * 8 * 1024
				}]
			},
			video: {
				mandatory: {
					maxWidth: 300,
					maxFrameRate: 25
				},
				optional: [{
					bandwidth: connection.bandwidth.video * 8 * 1024 || 128 * 8 * 1024
				}, {
					facingMode: 'user'
				}]
			}
		};

		if (isFirefox) {
			connection.mediaConstraints = {
				audio: true,
				video: true
			};
		}

		if (!forceOptions.useDefaultDevices && !isMobileDevice) {
			DetectRTC.load(function () {
				var lastAudioDevice, lastVideoDevice;
				// it will force RTCMultiConnection to capture last-devices
				// i.e. if external microphone is attached to system, we should prefer it over built-in devices.
				DetectRTC.MediaDevices.forEach(function (device) {
					if (device.kind === 'audioinput' && connection.mediaConstraints.audio !== false) {
						lastAudioDevice = device;
					}

					if (device.kind === 'videoinput' && connection.mediaConstraints.video !== false) {
						lastVideoDevice = device;
					}
				});

				if (lastAudioDevice) {
					if (isFirefox) {
						if (connection.mediaConstraints.audio !== true) {
							connection.mediaConstraints.audio.deviceId = lastAudioDevice.id;
						} else {
							connection.mediaConstraints.audio = {
								deviceId: lastAudioDevice.id
							}
						}
						return;
					}

					if (connection.mediaConstraints.audio == true) {
						connection.mediaConstraints.audio = {
							mandatory: {},
							optional: []
						}
					}

					if (!connection.mediaConstraints.audio.optional) {
						connection.mediaConstraints.audio.optional = [];
					}

					var optional = [{
						sourceId: lastAudioDevice.id
					}];

					connection.mediaConstraints.audio.optional = optional.concat(connection.mediaConstraints.audio.optional);
				}

				if (lastVideoDevice) {
					if (isFirefox) {
						if (connection.mediaConstraints.video !== true) {
							connection.mediaConstraints.video.deviceId = lastVideoDevice.id;
						} else {
							connection.mediaConstraints.video = {
								deviceId: lastVideoDevice.id
							}
						}
						return;
					}

					if (connection.mediaConstraints.video == true) {
						connection.mediaConstraints.video = {
							mandatory: {},
							optional: []
						}
					}

					if (!connection.mediaConstraints.video.optional) {
						connection.mediaConstraints.video.optional = [];
					}

					var optional = [{
						sourceId: lastVideoDevice.id
					}];

					connection.mediaConstraints.video.optional = optional.concat(connection.mediaConstraints.video.optional);
				}
			});
		}

		connection.sdpConstraints = {
			mandatory: {
				OfferToReceiveAudio: true,
				OfferToReceiveVideo: true
			},
			optional: [{
				VoiceActivityDetection: false
			}]
		};

		connection.rtcpMuxPolicy = 'negotiate'; // or "required"
		connection.iceTransportPolicy = null; // "relay" or "all"
		connection.optionalArgument = {
			optional: [{
				DtlsSrtpKeyAgreement: true
			}, {
				googImprovedWifiBwe: true
			}, {
				googScreencastMinBitrate: 300
			}, {
				googIPv6: true
			}, {
				googDscp: true
			}, {
				googCpuUnderuseThreshold: 55
			}, {
				googCpuOveruseThreshold: 85
			}, {
				googSuspendBelowMinBitrate: true
			}, {
				googCpuOveruseDetection: true
			}],
			mandatory: {}
		};

		connection.iceServers = IceServersHandler.getIceServers(connection);

		connection.candidates = {
			host: true,
			stun: true,
			turn: true
		};

		connection.iceProtocols = {
			tcp: true,
			udp: true
		};

		// EVENTs
		connection.onopen = function (event) {
			if (!!connection.enableLogs) {
				console.info('Data connection has been opened between you & ', event.userid);
			}
		};

		connection.onclose = function (event) {
			if (!!connection.enableLogs) {
				console.warn('Data connection has been closed between you & ', event.userid);
			}
		};

		connection.onerror = function (error) {
			if (!!connection.enableLogs) {
				console.error(error.userid, 'data-error', error);
			}
		};

		connection.onmessage = function (event) {
			if (!!connection.enableLogs) {
				console.debug('data-message', event.userid, event.data);
			}
		};

		connection.send = function (data, remoteUserId) {
			connection.peers.send(data, remoteUserId);
		};

		connection.close = connection.disconnect = connection.leave = function () {
			beforeUnload(false, true);
		};

		connection.closeEntireSession = function (callback) {
			callback = callback || function () { };
			connection.socket.emit('close-entire-session', function looper() {
				if (connection.getAllParticipants().length) {
					setTimeout(looper, 100);
					return;
				}

				connection.onEntireSessionClosed({
					sessionid: connection.sessionid,
					userid: connection.userid,
					extra: connection.extra
				});

				connection.changeUserId(null, function () {
					connection.close();
					callback();
				});
			});
		};

		connection.onEntireSessionClosed = function (event) {
			if (!connection.enableLogs) return;
			console.info('Entire session is closed: ', event.sessionid, event.extra);
		};

		connection.onstream = function (e) {
			var parentNode = connection.videosContainer;
			parentNode.insertBefore(e.mediaElement, parentNode.firstChild);
			e.mediaElement.play();
			setTimeout(function () {
				e.mediaElement.play();
			}, 5000);
		};

		connection.onstreamended = function (e) {
			if (!e.mediaElement) {
				e.mediaElement = document.getElementById(e.streamid);
			}

			if (!e.mediaElement || !e.mediaElement.parentNode) {
				return;
			}

			e.mediaElement.parentNode.removeChild(e.mediaElement);
		};

		connection.direction = 'many-to-many';

		connection.removeStream = function (streamid) {
			var stream;
			connection.attachStreams.forEach(function (localStream) {
				if (localStream.id === streamid) {
					stream = localStream;
				}
			});

			if (!stream) {
				console.warn('No such stream exists.', streamid);
				return;
			}

			connection.peers.getAllParticipants().forEach(function (participant) {
				var user = connection.peers[participant];
				try {
					user.peer.removeStream(stream);
				} catch (e) { }
			});

			connection.renegotiate();
		};

		connection.addStream = function (session, remoteUserId) {
			if (!!session.getAudioTracks) {
				if (connection.attachStreams.indexOf(session) === -1) {
					if (!session.streamid) {
						session.streamid = session.id;
					}

					connection.attachStreams.push(session);
				}
				connection.renegotiate(remoteUserId);
				return;
			}

			if (isData(session)) {
				connection.renegotiate(remoteUserId);
				return;
			}

			if (session.audio || session.video || session.screen) {
				if (session.screen) {
					connection.getScreenConstraints(function (error, screen_constraints) {
						if (error) {
							if (error === 'PermissionDeniedError') {
								if (session.streamCallback) {
									session.streamCallback(null);
								}
								if (connection.enableLogs) {
									console.error('User rejected to share his screen.');
								}
								return;
							}
							return alert(error);
						}

						connection.invokeGetUserMedia({
							audio: isAudioPlusTab(connection) ? getAudioScreenConstraints(screen_constraints) : false,
							video: screen_constraints,
							isScreen: true
						}, (session.audio || session.video) && !isAudioPlusTab(connection) ? connection.invokeGetUserMedia(null, gumCallback, session) : gumCallback);
					});
				} else if (session.audio || session.video) {
					connection.invokeGetUserMedia(null, gumCallback, session);
				}
			}

			function gumCallback(stream) {
				if (session.streamCallback) {
					session.streamCallback(stream);
				}

				connection.renegotiate(remoteUserId);
			}
		};

		connection.invokeGetUserMedia = function (localMediaConstraints, callback, session) {
			if (!session) {
				session = connection.session;
			}

			if (!localMediaConstraints) {
				localMediaConstraints = connection.mediaConstraints;
			}

			getUserMediaHandler({
				onGettingLocalMedia: function (stream) {
					var videoConstraints = localMediaConstraints.video;
					if (videoConstraints) {
						if (videoConstraints.mediaSource || videoConstraints.mozMediaSource) {
							stream.isScreen = true;
						} else if (videoConstraints.mandatory && videoConstraints.mandatory.chromeMediaSource) {
							stream.isScreen = true;
						}
					}

					if (!stream.isScreen) {
						stream.isVideo = stream.getVideoTracks().length;
						stream.isAudio = stream.getAudioTracks().length;
					}

					mPeer.onGettingLocalMedia(stream);

					if (callback) {
						callback(stream);
					}
				},
				onLocalMediaError: function (error, constraints) {
					mPeer.onLocalMediaError(error, constraints);
				},
				localMediaConstraints: session.screen ? localMediaConstraints : {
					audio: session.audio ? localMediaConstraints.audio : false,
					video: session.video ? localMediaConstraints.video : false
				}
			});
		};

		function applyConstraints(stream, mediaConstraints) {
			if (!stream) {
				if (!!connection.enableLogs) {
					console.error('No stream to applyConstraints.');
				}
				return;
			}

			if (mediaConstraints.audio) {
				stream.getAudioTracks().forEach(function (track) {
					track.applyConstraints(mediaConstraints.audio);
				});
			}

			if (mediaConstraints.video) {
				stream.getVideoTracks().forEach(function (track) {
					track.applyConstraints(mediaConstraints.video);
				});
			}
		}

		connection.applyConstraints = function (mediaConstraints, streamid) {
			if (!MediaStreamTrack || !MediaStreamTrack.prototype.applyConstraints) {
				alert('track.applyConstraints is NOT supported in your browser.');
				return;
			}

			if (streamid) {
				var stream;
				if (connection.streamEvents[streamid]) {
					stream = connection.streamEvents[streamid].stream;
				}
				applyConstraints(stream, mediaConstraints);
				return;
			}

			connection.attachStreams.forEach(function (stream) {
				applyConstraints(stream, mediaConstraints);
			});
		};

		function replaceTrack(track, remoteUserId, isVideoTrack) {
			if (remoteUserId) {
				mPeer.replaceTrack(track, remoteUserId, isVideoTrack);
				return;
			}

			connection.peers.getAllParticipants().forEach(function (participant) {
				mPeer.replaceTrack(track, participant, isVideoTrack);
			});
		}

		connection.replaceTrack = function (session, remoteUserId, isVideoTrack) {
			session = session || {};

			if (!RTCPeerConnection.prototype.getSenders) {
				connection.addStream(session);
				return;
			}

			if (session instanceof MediaStreamTrack) {
				replaceTrack(session, remoteUserId, isVideoTrack);
				return;
			}

			if (session instanceof MediaStream) {
				if (session.getVideoTracks().length) {
					replaceTrack(session.getVideoTracks()[0], remoteUserId, true);
				}

				if (session.getAudioTracks().length) {
					replaceTrack(session.getAudioTracks()[0], remoteUserId, false);
				}
				return;
			}

			if (isData(session)) {
				throw 'connection.replaceTrack requires audio and/or video and/or screen.';
				return;
			}

			if (session.audio || session.video || session.screen) {
				if (session.screen) {
					connection.getScreenConstraints(function (error, screen_constraints) {
						if (error) {
							return alert(error);
						}

						connection.invokeGetUserMedia({
							audio: isAudioPlusTab(connection) ? getAudioScreenConstraints(screen_constraints) : false,
							video: screen_constraints,
							isScreen: true
						}, (session.audio || session.video) && !isAudioPlusTab(connection) ? connection.invokeGetUserMedia(null, gumCallback, session) : gumCallback);
					});
				} else if (session.audio || session.video) {
					connection.invokeGetUserMedia(null, gumCallback, session);
				}
			}

			function gumCallback(stream) {
				connection.replaceTrack(stream, remoteUserId, isVideoTrack || session.video || session.screen);
			}
		};

		connection.resetTrack = function (remoteUsersIds, isVideoTrack) {
			if (!remoteUsersIds) {
				remoteUsersIds = connection.getAllParticipants();
			}

			if (typeof remoteUsersIds == 'string') {
				remoteUsersIds = [remoteUsersIds];
			}

			remoteUsersIds.forEach(function (participant) {
				var peer = connection.peers[participant].peer;

				if ((typeof isVideoTrack === 'undefined' || isVideoTrack === true) && peer.lastVideoTrack) {
					connection.replaceTrack(peer.lastVideoTrack, participant, true);
				}

				if ((typeof isVideoTrack === 'undefined' || isVideoTrack === false) && peer.lastAudioTrack) {
					connection.replaceTrack(peer.lastAudioTrack, participant, false);
				}
			});
		};

		connection.renegotiate = function (remoteUserId) {
			if (remoteUserId) {
				mPeer.renegotiatePeer(remoteUserId);
				return;
			}

			connection.peers.getAllParticipants().forEach(function (participant) {
				mPeer.renegotiatePeer(participant);
			});
		};

		connection.setStreamEndHandler = function (stream, isRemote) {
			if (!stream || !stream.addEventListener) return;

			isRemote = !!isRemote;

			if (stream.alreadySetEndHandler) {
				return;
			}
			stream.alreadySetEndHandler = true;

			var streamEndedEvent = 'ended';

			if ('oninactive' in stream) {
				streamEndedEvent = 'inactive';
			}

			stream.addEventListener(streamEndedEvent, function () {
				if (stream.idInstance) {
					currentUserMediaRequest.remove(stream.idInstance);
				}

				if (!isRemote) {
					// reset attachStreams
					var streams = [];
					connection.attachStreams.forEach(function (s) {
						if (s.id != stream.id) {
							streams.push(s);
						}
					});
					connection.attachStreams = streams;
				}

				// connection.renegotiate();

				var streamEvent = connection.streamEvents[stream.streamid];
				if (!streamEvent) {
					streamEvent = {
						stream: stream,
						streamid: stream.streamid,
						type: isRemote ? 'remote' : 'local',
						userid: connection.userid,
						extra: connection.extra,
						mediaElement: connection.streamEvents[stream.streamid] ? connection.streamEvents[stream.streamid].mediaElement : null
					};
				}

				if (isRemote && connection.peers[streamEvent.userid]) {
					// reset remote "streams"
					var peer = connection.peers[streamEvent.userid].peer;
					var streams = [];
					peer.getRemoteStreams().forEach(function (s) {
						if (s.id != stream.id) {
							streams.push(s);
						}
					});
					connection.peers[streamEvent.userid].streams = streams;
				}

				if (streamEvent.userid === connection.userid && streamEvent.type === 'remote') {
					return;
				}

				connection.onstreamended(streamEvent);

				delete connection.streamEvents[stream.streamid];
			}, false);
		};

		connection.onMediaError = function (error, constraints) {
			if (!!connection.enableLogs) {
				console.error(error, constraints);
			}
		};

		connection.addNewBroadcaster = function (broadcasterId, userPreferences) {
			if (connection.socket.isIO) {
				return;
			}

			if (connection.broadcasters.length) {
				setTimeout(function () {
					mPeer.connectNewParticipantWithAllBroadcasters(broadcasterId, userPreferences, connection.broadcasters.join('|-,-|'));
				}, 10 * 1000);
			}

			if (!connection.session.oneway && !connection.session.broadcast && connection.direction === 'many-to-many' && connection.broadcasters.indexOf(broadcasterId) === -1) {
				connection.broadcasters.push(broadcasterId);
				keepNextBroadcasterOnServer();
			}
		};

		connection.autoCloseEntireSession = false;

		function keepNextBroadcasterOnServer() {
			if (!connection.isInitiator) return;

			if (connection.session.oneway || connection.session.broadcast || connection.direction !== 'many-to-many') {
				return;
			}

			var firstBroadcaster = connection.broadcasters[0];
			var otherBroadcasters = [];
			connection.broadcasters.forEach(function (broadcaster) {
				if (broadcaster !== firstBroadcaster) {
					otherBroadcasters.push(broadcaster);
				}
			});

			if (connection.autoCloseEntireSession) return;
			connection.shiftModerationControl(firstBroadcaster, otherBroadcasters, true);
		};

		connection.filesContainer = connection.videosContainer = document.body || document.documentElement;
		connection.isInitiator = false;

		connection.shareFile = mPeer.shareFile;
		if (typeof FileProgressBarHandler !== 'undefined') {
			FileProgressBarHandler.handle(connection);
		}

		if (typeof TranslationHandler !== 'undefined') {
			TranslationHandler.handle(connection);
		}

		connection.token = getRandomString;

		connection.onNewParticipant = function (participantId, userPreferences) {
			connection.acceptParticipationRequest(participantId, userPreferences);
		};

		connection.acceptParticipationRequest = function (participantId, userPreferences) {
			if (userPreferences.successCallback) {
				userPreferences.successCallback();
				delete userPreferences.successCallback;
			}

			mPeer.createNewPeer(participantId, userPreferences);
		};

		connection.onShiftedModerationControl = function (sender, existingBroadcasters) {
			connection.acceptModerationControl(sender, existingBroadcasters);
		};

		connection.acceptModerationControl = function (sender, existingBroadcasters) {
			connection.isInitiator = true; // NEW initiator!

			connection.broadcasters = existingBroadcasters;
			connection.peers.getAllParticipants().forEach(function (participant) {
				mPeer.onNegotiationNeeded({
					changedUUID: sender,
					oldUUID: connection.userid,
					newUUID: sender
				}, participant);
			});
			connection.userid = sender;
			connection.socket.emit('changed-uuid', connection.userid);
		};

		connection.shiftModerationControl = function (remoteUserId, existingBroadcasters, firedOnLeave) {
			mPeer.onNegotiationNeeded({
				shiftedModerationControl: true,
				broadcasters: existingBroadcasters,
				firedOnLeave: !!firedOnLeave
			}, remoteUserId);
		};

		if (typeof StreamsHandler !== 'undefined') {
			connection.StreamsHandler = StreamsHandler;
		}

		connection.onleave = function (userid) { };

		connection.invokeSelectFileDialog = function (callback) {
			var selector = new FileSelector();
			selector.accept = '*.*';
			selector.selectSingleFile(callback);
		};

		connection.getPublicModerators = function (userIdStartsWith, callback) {
			if (typeof userIdStartsWith === 'function') {
				callback = userIdStartsWith;
			}

			connectSocket(function () {
				connection.socket.emit(
                    'get-public-moderators',
                    typeof userIdStartsWith === 'string' ? userIdStartsWith : '',
                    callback
                );
			});
		};

		connection.onmute = function (e) {
			if (!e || !e.mediaElement) {
				return;
			}

			if (e.muteType === 'both' || e.muteType === 'video') {
				e.mediaElement.src = null;
				e.mediaElement.pause();
				e.mediaElement.poster = e.snapshot || 'https://cdn.webrtc-experiment.com/images/muted.png';
			} else if (e.muteType === 'audio') {
				e.mediaElement.muted = true;
			}
		};

		connection.onunmute = function (e) {
			if (!e || !e.mediaElement || !e.stream) {
				return;
			}

			if (e.unmuteType === 'both' || e.unmuteType === 'video') {
				e.mediaElement.poster = null;
				e.mediaElement.src = URL.createObjectURL(e.stream);
				e.mediaElement.play();
			} else if (e.unmuteType === 'audio') {
				e.mediaElement.muted = false;
			}
		};

		connection.onExtraDataUpdated = function (event) {
			event.status = 'online';
			connection.onUserStatusChanged(event, true);
		};

		connection.onJoinWithPassword = function (remoteUserId) {
			console.warn(remoteUserId, 'is password protected. Please join with password.');
		};

		connection.onInvalidPassword = function (remoteUserId, oldPassword) {
			console.warn(remoteUserId, 'is password protected. Please join with valid password. Your old password', oldPassword, 'is wrong.');
		};

		connection.onPasswordMaxTriesOver = function (remoteUserId) {
			console.warn(remoteUserId, 'is password protected. Your max password tries exceeded the limit.');
		};

		connection.getAllParticipants = function (sender) {
			return connection.peers.getAllParticipants(sender);
		};

		if (typeof StreamsHandler !== 'undefined') {
			StreamsHandler.onSyncNeeded = function (streamid, action, type) {
				connection.peers.getAllParticipants().forEach(function (participant) {
					mPeer.onNegotiationNeeded({
						streamid: streamid,
						action: action,
						streamSyncNeeded: true,
						type: type || 'both'
					}, participant);
				});
			};
		}

		connection.connectSocket = function (callback) {
			connectSocket(callback);
		};

		connection.closeSocket = function () {
			try {
				io.sockets = {};
			} catch (e) { };

			if (!connection.socket) return;

			if (typeof connection.socket.disconnect === 'function') {
				connection.socket.disconnect();
			}

			if (typeof connection.socket.resetProps === 'function') {
				connection.socket.resetProps();
			}

			connection.socket = null;
		};

		connection.getSocket = function (callback) {
			if (!connection.socket) {
				connectSocket(callback);
			} else if (callback) {
				callback(connection.socket);
			}

			return connection.socket;
		};

		connection.getRemoteStreams = mPeer.getRemoteStreams;

		var skipStreams = ['selectFirst', 'selectAll', 'forEach'];

		connection.streamEvents = {
			selectFirst: function (options) {
				if (!options) {
					// in normal conferencing, it will always be "local-stream"
					var firstStream;
					for (var str in connection.streamEvents) {
						if (skipStreams.indexOf(str) === -1 && !firstStream) {
							firstStream = connection.streamEvents[str];
							continue;
						}
					}
					return firstStream;
				}
			},
			selectAll: function () { }
		};

		connection.socketURL = '/'; // generated via config.json
		connection.socketMessageEvent = 'RTCMultiConnection-Message'; // generated via config.json
		connection.socketCustomEvent = 'RTCMultiConnection-Custom-Message'; // generated via config.json
		connection.DetectRTC = DetectRTC;

		connection.setCustomSocketEvent = function (customEvent) {
			if (customEvent) {
				connection.socketCustomEvent = customEvent;
			}

			if (!connection.socket) {
				return;
			}

			connection.socket.emit('set-custom-socket-event-listener', connection.socketCustomEvent);
		};

		connection.getNumberOfBroadcastViewers = function (broadcastId, callback) {
			if (!connection.socket || !broadcastId || !callback) return;

			connection.socket.emit('get-number-of-users-in-specific-broadcast', broadcastId, callback);
		};

		connection.onNumberOfBroadcastViewersUpdated = function (event) {
			if (!connection.enableLogs || !connection.isInitiator) return;
			console.info('Number of broadcast (', event.broadcastId, ') viewers', event.numberOfBroadcastViewers);
		};

		connection.onUserStatusChanged = function (event, dontWriteLogs) {
			if (!!connection.enableLogs && !dontWriteLogs) {
				console.info(event.userid, event.status);
			}
		};

		connection.getUserMediaHandler = getUserMediaHandler;
		connection.multiPeersHandler = mPeer;
		connection.enableLogs = true;
		connection.setCustomSocketHandler = function (customSocketHandler) {
			if (typeof SocketConnection !== 'undefined') {
				SocketConnection = customSocketHandler;
			}
		};

		// default value is 15k because Firefox's receiving limit is 16k!
		// however 64k works chrome-to-chrome
		connection.chunkSize = 65 * 1000;

		connection.maxParticipantsAllowed = 1000;

		// eject or leave single user
		connection.disconnectWith = mPeer.disconnectWith;

		connection.checkPresence = function (remoteUserId, callback) {
			if (!connection.socket) {
				connection.connectSocket(function () {
					connection.checkPresence(remoteUserId, callback);
				});
				return;
			}
			connection.socket.emit('check-presence', (remoteUserId || connection.sessionid) + '', callback);
		};

		connection.onReadyForOffer = function (remoteUserId, userPreferences) {
			connection.multiPeersHandler.createNewPeer(remoteUserId, userPreferences);
		};

		connection.setUserPreferences = function (userPreferences) {
			if (connection.dontAttachStream) {
				userPreferences.dontAttachLocalStream = true;
			}

			if (connection.dontGetRemoteStream) {
				userPreferences.dontGetRemoteStream = true;
			}

			return userPreferences;
		};

		connection.updateExtraData = function () {
			connection.socket.emit('extra-data-updated', connection.extra);
		};

		connection.enableScalableBroadcast = false;
		connection.maxRelayLimitPerUser = 3; // each broadcast should serve only 3 users

		connection.dontCaptureUserMedia = false;
		connection.dontAttachStream = false;
		connection.dontGetRemoteStream = false;

		connection.onReConnecting = function (event) {
			if (connection.enableLogs) {
				console.info('ReConnecting with', event.userid, '...');
			}
		};

		connection.beforeAddingStream = function (stream) {
			return stream;
		};

		connection.beforeRemovingStream = function (stream) {
			return stream;
		};

		if (typeof isChromeExtensionAvailable !== 'undefined') {
			connection.checkIfChromeExtensionAvailable = isChromeExtensionAvailable;
		}

		if (typeof isFirefoxExtensionAvailable !== 'undefined') {
			connection.checkIfChromeExtensionAvailable = isFirefoxExtensionAvailable;
		}

		if (typeof getChromeExtensionStatus !== 'undefined') {
			connection.getChromeExtensionStatus = getChromeExtensionStatus;
		}

		connection.getScreenConstraints = function (callback, audioPlusTab) {
			if (isAudioPlusTab(connection, audioPlusTab)) {
				audioPlusTab = true;
			}

			getScreenConstraints(function (error, screen_constraints) {
				if (!error) {
					screen_constraints = connection.modifyScreenConstraints(screen_constraints);
					callback(error, screen_constraints);
				}
			}, audioPlusTab);
		};

		connection.modifyScreenConstraints = function (screen_constraints) {
			return screen_constraints;
		};

		connection.onPeerStateChanged = function (state) {
			if (connection.enableLogs) {
				if (state.iceConnectionState.search(/closed|failed/gi) !== -1) {
					console.error('Peer connection is closed between you & ', state.userid, state.extra, 'state:', state.iceConnectionState);
				}
			}
		};

		connection.isOnline = true;

		listenEventHandler('online', function () {
			connection.isOnline = true;
		});

		listenEventHandler('offline', function () {
			connection.isOnline = false;
		});

		connection.isLowBandwidth = false;
		if (navigator && navigator.connection && navigator.connection.type) {
			connection.isLowBandwidth = navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g) !== -1;
			if (connection.isLowBandwidth) {
				connection.bandwidth = {
					audio: 30,
					video: 30,
					screen: 30
				};

				if (connection.mediaConstraints.audio && connection.mediaConstraints.audio.optional && connection.mediaConstraints.audio.optional.length) {
					var newArray = [];
					connection.mediaConstraints.audio.optional.forEach(function (opt) {
						if (typeof opt.bandwidth === 'undefined') {
							newArray.push(opt);
						}
					});
					connection.mediaConstraints.audio.optional = newArray;
				}

				if (connection.mediaConstraints.video && connection.mediaConstraints.video.optional && connection.mediaConstraints.video.optional.length) {
					var newArray = [];
					connection.mediaConstraints.video.optional.forEach(function (opt) {
						if (typeof opt.bandwidth === 'undefined') {
							newArray.push(opt);
						}
					});
					connection.mediaConstraints.video.optional = newArray;
				}
			}
		}

		connection.getExtraData = function (remoteUserId) {
			if (!remoteUserId) throw 'remoteUserId is required.';
			if (!connection.peers[remoteUserId]) return {};
			return connection.peers[remoteUserId].extra;
		};

		if (!!forceOptions.autoOpenOrJoin) {
			connection.openOrJoin(connection.sessionid);
		}

		connection.onUserIdAlreadyTaken = function (useridAlreadyTaken, yourNewUserId) {
			if (connection.enableLogs) {
				console.warn('Userid already taken.', useridAlreadyTaken, 'Your new userid:', yourNewUserId);
			}

			connection.join(useridAlreadyTaken);
		};

		connection.onRoomFull = function (roomid) {
			if (connection.enableLogs) {
				console.warn(roomid, 'is full.');
			}
		};

		connection.trickleIce = true;
		connection.version = '3.4.2';

		connection.onSettingLocalDescription = function (event) {
			if (connection.enableLogs) {
				console.info('Set local description for remote user', event.userid);
			}
		};
	}

	function SocketConnection(connection, connectCallback) {
		var parameters = '';

		parameters += '?userid=' + connection.userid;
		parameters += '&msgEvent=' + connection.socketMessageEvent;
		parameters += '&socketCustomEvent=' + connection.socketCustomEvent;

		parameters += '&maxParticipantsAllowed=' + connection.maxParticipantsAllowed;

		if (connection.enableScalableBroadcast) {
			parameters += '&enableScalableBroadcast=true';
			parameters += '&maxRelayLimitPerUser=' + (connection.maxRelayLimitPerUser || 2);
		}

		if (connection.socketCustomParameters) {
			parameters += connection.socketCustomParameters;
		}

		try {
			io.sockets = {};
		} catch (e) { };

		if (!connection.socketURL) {
			connection.socketURL = '/';
		}

		if (connection.socketURL.substr(connection.socketURL.length - 1, 1) != '/') {
			// connection.socketURL = 'https://domain.com:9001/';
			throw '"socketURL" MUST end with a slash.';
		}

		if (connection.enableLogs) {
			if (connection.socketURL == '/') {
				console.info('socket.io is connected at: ', location.origin + '/');
			} else {
				console.info('socket.io is connected at: ', connection.socketURL);
			}
		}

		try {
			connection.socket = io(connection.socketURL + parameters);
		} catch (e) {
			connection.socket = io.connect(connection.socketURL + parameters, connection.socketOptions);
		}

		// detect signaling medium
		connection.socket.isIO = true;

		var mPeer = connection.multiPeersHandler;

		connection.socket.on('extra-data-updated', function (remoteUserId, extra) {
			if (!connection.peers[remoteUserId]) return;
			connection.peers[remoteUserId].extra = extra;

			connection.onExtraDataUpdated({
				userid: remoteUserId,
				extra: extra
			});
		});

		connection.socket.on(connection.socketMessageEvent, function (message) {
			if (message.remoteUserId != connection.userid) return;

			if (connection.peers[message.sender] && connection.peers[message.sender].extra != message.message.extra) {
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

				if (action === 'ended' || action === 'inactive' || action === 'stream-removed') {
					connection.onstreamended(stream);
					return;
				}

				var type = message.message.type != 'both' ? message.message.type : null;

				if (typeof stream.stream[action] == 'function') {
					stream.stream[action](type);
				}
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
		});

		connection.socket.on('user-left', function (userid) {
			onUserLeft(userid);

			connection.onUserStatusChanged({
				userid: userid,
				status: 'offline',
				extra: connection.peers[userid] ? connection.peers[userid].extra || {} : {}
			});

			connection.onleave({
				userid: userid,
				extra: {}
			});
		});

		var alreadyConnected = false;

		connection.socket.resetProps = function () {
			alreadyConnected = false;
		};

		connection.socket.on('connect', function () {
			if (alreadyConnected) {
				return;
			}
			alreadyConnected = true;

			if (connection.enableLogs) {
				console.info('socket.io connection is opened.');
			}

			setTimeout(function () {
				connection.socket.emit('extra-data-updated', connection.extra);

				if (connectCallback) {
					connectCallback(connection.socket);
				}
			}, 1000);
		});

		connection.socket.on('disconnect', function () {
			if (connection.enableLogs) {
				console.warn('socket.io connection is closed');
			}
		});

		connection.socket.on('join-with-password', function (remoteUserId) {
			connection.onJoinWithPassword(remoteUserId);
		});

		connection.socket.on('invalid-password', function (remoteUserId, oldPassword) {
			connection.onInvalidPassword(remoteUserId, oldPassword);
		});

		connection.socket.on('password-max-tries-over', function (remoteUserId) {
			connection.onPasswordMaxTriesOver(remoteUserId);
		});

		connection.socket.on('user-disconnected', function (remoteUserId) {
			if (remoteUserId === connection.userid) {
				return;
			}

			connection.onUserStatusChanged({
				userid: remoteUserId,
				status: 'offline',
				extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra || {} : {}
			});

			connection.deletePeer(remoteUserId);
		});

		connection.socket.on('user-connected', function (userid) {
			if (userid === connection.userid) {
				return;
			}

			connection.onUserStatusChanged({
				userid: userid,
				status: 'online',
				extra: connection.peers[userid] ? connection.peers[userid].extra || {} : {}
			});
		});

		connection.socket.on('closed-entire-session', function (sessionid, extra) {
			connection.leave();
			connection.onEntireSessionClosed({
				sessionid: sessionid,
				userid: sessionid,
				extra: extra
			});
		});

		connection.socket.on('userid-already-taken', function (useridAlreadyTaken, yourNewUserId) {
			connection.isInitiator = false;
			connection.userid = yourNewUserId;

			connection.onUserIdAlreadyTaken(useridAlreadyTaken, yourNewUserId);
		})

		connection.socket.on('logs', function (log) {
			if (!connection.enableLogs) return;
			console.debug('server-logs', log);
		});

		connection.socket.on('number-of-broadcast-viewers-updated', function (data) {
			connection.onNumberOfBroadcastViewersUpdated(data);
		});

		connection.socket.on('room-full', function (roomid) {
			connection.onRoomFull(roomid);
		});
	}

	// MultiPeersHandler.js

	function MultiPeers(connection) {
		var self = this;

		var skipPeers = ['getAllParticipants', 'getLength', 'selectFirst', 'streams', 'send', 'forEach'];
		connection.peers = {
			getLength: function () {
				var numberOfPeers = 0;
				for (var peer in this) {
					if (skipPeers.indexOf(peer) == -1) {
						numberOfPeers++;
					}
				}
				return numberOfPeers;
			},
			selectFirst: function () {
				var firstPeer;
				for (var peer in this) {
					if (skipPeers.indexOf(peer) == -1) {
						firstPeer = this[peer];
					}
				}
				return firstPeer;
			},
			getAllParticipants: function (sender) {
				var allPeers = [];
				for (var peer in this) {
					if (skipPeers.indexOf(peer) == -1 && peer != sender) {
						allPeers.push(peer);
					}
				}
				return allPeers;
			},
			forEach: function (callbcak) {
				this.getAllParticipants().forEach(function (participant) {
					callbcak(connection.peers[participant]);
				});
			},
			send: function (data, remoteUserId) {
				var that = this;

				if (!isNull(data.size) && !isNull(data.type)) {
					self.shareFile(data, remoteUserId);
					return;
				}

				if (data.type !== 'text' && !(data instanceof ArrayBuffer) && !(data instanceof DataView)) {
					TextSender.send({
						text: data,
						channel: this,
						connection: connection,
						remoteUserId: remoteUserId
					});
					return;
				}

				if (data.type === 'text') {
					data = JSON.stringify(data);
				}

				if (remoteUserId) {
					var remoteUser = connection.peers[remoteUserId];
					if (remoteUser) {
						if (!remoteUser.channels.length) {
							connection.peers[remoteUserId].createDataChannel();
							connection.renegotiate(remoteUserId);
							setTimeout(function () {
								that.send(data, remoteUserId);
							}, 3000);
							return;
						}

						remoteUser.channels.forEach(function (channel) {
							channel.send(data);
						});
						return;
					}
				}

				this.getAllParticipants().forEach(function (participant) {
					if (!that[participant].channels.length) {
						connection.peers[participant].createDataChannel();
						connection.renegotiate(participant);
						setTimeout(function () {
							that[participant].channels.forEach(function (channel) {
								channel.send(data);
							});
						}, 3000);
						return;
					}

					that[participant].channels.forEach(function (channel) {
						channel.send(data);
					});
				});
			}
		};

		this.uuid = connection.userid;

		this.getLocalConfig = function (remoteSdp, remoteUserId, userPreferences) {
			if (!userPreferences) {
				userPreferences = {};
			}

			return {
				streamsToShare: userPreferences.streamsToShare || {},
				rtcMultiConnection: connection,
				connectionDescription: userPreferences.connectionDescription,
				userid: remoteUserId,
				localPeerSdpConstraints: userPreferences.localPeerSdpConstraints,
				remotePeerSdpConstraints: userPreferences.remotePeerSdpConstraints,
				dontGetRemoteStream: !!userPreferences.dontGetRemoteStream,
				dontAttachLocalStream: !!userPreferences.dontAttachLocalStream,
				renegotiatingPeer: !!userPreferences.renegotiatingPeer,
				peerRef: userPreferences.peerRef,
				channels: userPreferences.channels || [],
				onLocalSdp: function (localSdp) {
					self.onNegotiationNeeded(localSdp, remoteUserId);
				},
				onLocalCandidate: function (localCandidate) {
					localCandidate = OnIceCandidateHandler.processCandidates(connection, localCandidate)
					if (localCandidate) {
						self.onNegotiationNeeded(localCandidate, remoteUserId);
					}
				},
				remoteSdp: remoteSdp,
				onDataChannelMessage: function (message) {
					if (!connection.fbr && connection.enableFileSharing) initFileBufferReader();

					if (typeof message == 'string' || !connection.enableFileSharing) {
						self.onDataChannelMessage(message, remoteUserId);
						return;
					}

					var that = this;

					if (message instanceof ArrayBuffer || message instanceof DataView) {
						connection.fbr.convertToObject(message, function (object) {
							that.onDataChannelMessage(object);
						});
						return;
					}

					if (message.readyForNextChunk) {
						connection.fbr.getNextChunk(message, function (nextChunk, isLastChunk) {
							connection.peers[remoteUserId].channels.forEach(function (channel) {
								channel.send(nextChunk);
							});
						}, remoteUserId);
						return;
					}

					if (message.chunkMissing) {
						connection.fbr.chunkMissing(message);
						return;
					}

					connection.fbr.addChunk(message, function (promptNextChunk) {
						connection.peers[remoteUserId].peer.channel.send(promptNextChunk);
					});
				},
				onDataChannelError: function (error) {
					self.onDataChannelError(error, remoteUserId);
				},
				onDataChannelOpened: function (channel) {
					self.onDataChannelOpened(channel, remoteUserId);
				},
				onDataChannelClosed: function (event) {
					self.onDataChannelClosed(event, remoteUserId);
				},
				onRemoteStream: function (stream) {
					if (connection.peers[remoteUserId]) {

						//BIZAPP
						//var found = false;
						//$.each(connection.peers[remoteUserId].streams, function (i,n) {
						//	if (n.id == stream.id)
						//		found = true;
						//});
						//if (found) return;

						connection.peers[remoteUserId].streams.push(stream);
					}

					if (isPluginRTC && window.PluginRTC) {
						var mediaElement = document.createElement('video');
						var body = connection.videosContainer;
						body.insertBefore(mediaElement, body.firstChild);
						setTimeout(function () {
							window.PluginRTC.attachMediaStream(mediaElement, stream);
						}, 3000);
						return;
					}

					self.onGettingRemoteMedia(stream, remoteUserId);
				},
				onRemoteStreamRemoved: function (stream) {
					self.onRemovingRemoteMedia(stream, remoteUserId);
				},
				onPeerStateChanged: function (states) {
					self.onPeerStateChanged(states);

					if (states.iceConnectionState === 'new') {
						self.onNegotiationStarted(remoteUserId, states);
					}

					if (states.iceConnectionState === 'connected') {
						self.onNegotiationCompleted(remoteUserId, states);
					}

					if (states.iceConnectionState.search(/closed|failed/gi) !== -1) {
						self.onUserLeft(remoteUserId);
						self.disconnectWith(remoteUserId);
					}
				}
			};
		};

		this.createNewPeer = function (remoteUserId, userPreferences) {
			if (connection.maxParticipantsAllowed <= connection.getAllParticipants().length) {
				return;
			}

			userPreferences = userPreferences || {};

			if (connection.isInitiator && !!connection.session.audio && connection.session.audio === 'two-way' && !userPreferences.streamsToShare) {
				userPreferences.isOneWay = false;
				userPreferences.isDataOnly = false;
				userPreferences.session = connection.session;
			}

			if (!userPreferences.isOneWay && !userPreferences.isDataOnly) {
				userPreferences.isOneWay = true;
				this.onNegotiationNeeded({
					enableMedia: true,
					userPreferences: userPreferences
				}, remoteUserId);
				return;
			}

			userPreferences = connection.setUserPreferences(userPreferences, remoteUserId);
			var localConfig = this.getLocalConfig(null, remoteUserId, userPreferences);
			connection.peers[remoteUserId] = new PeerInitiator(localConfig);
		};

		this.createAnsweringPeer = function (remoteSdp, remoteUserId, userPreferences) {
			userPreferences = connection.setUserPreferences(userPreferences || {}, remoteUserId);

			var localConfig = this.getLocalConfig(remoteSdp, remoteUserId, userPreferences);
			connection.peers[remoteUserId] = new PeerInitiator(localConfig);
		};

		this.renegotiatePeer = function (remoteUserId, userPreferences, remoteSdp) {
			if (!connection.peers[remoteUserId]) {
				if (connection.enableLogs) {
					console.error('This peer (' + remoteUserId + ') does not exists. Renegotiation skipped.');
				}
				return;
			}

			if (!userPreferences) {
				userPreferences = {};
			}

			userPreferences.renegotiatingPeer = true;
			userPreferences.peerRef = connection.peers[remoteUserId].peer;
			userPreferences.channels = connection.peers[remoteUserId].channels;

			var localConfig = this.getLocalConfig(remoteSdp, remoteUserId, userPreferences);

			connection.peers[remoteUserId] = new PeerInitiator(localConfig);
		};

		this.replaceTrack = function (track, remoteUserId, isVideoTrack) {
			if (!connection.peers[remoteUserId]) {
				throw 'This peer (' + remoteUserId + ') does not exists.';
			}

			var peer = connection.peers[remoteUserId].peer;

			if (!!peer.getSenders && typeof peer.getSenders === 'function' && peer.getSenders().length) {
				peer.getSenders().forEach(function (rtpSender) {
					if (isVideoTrack && rtpSender.track instanceof VideoStreamTrack) {
						connection.peers[remoteUserId].peer.lastVideoTrack = rtpSender.track;
						rtpSender.replaceTrack(track);
					}

					if (!isVideoTrack && rtpSender.track instanceof AudioStreamTrack) {
						connection.peers[remoteUserId].peer.lastAudioTrack = rtpSender.track;
						rtpSender.replaceTrack(track);
					}
				});
				return;
			}

			console.warn('RTPSender.replaceTrack is NOT supported.');
			this.renegotiatePeer(remoteUserId);
		};

		this.onNegotiationNeeded = function (message, remoteUserId) { };
		this.addNegotiatedMessage = function (message, remoteUserId) {
			if (message.type && message.sdp) {
				if (message.type == 'answer') {
					if (connection.peers[remoteUserId]) {
						connection.peers[remoteUserId].addRemoteSdp(message);
					}
				}

				if (message.type == 'offer') {
					if (message.renegotiatingPeer) {
						this.renegotiatePeer(remoteUserId, null, message);
					} else {
						this.createAnsweringPeer(message, remoteUserId);
					}
				}

				if (connection.enableLogs) {
					console.log('Remote peer\'s sdp:', message.sdp);
				}
				return;
			}

			if (message.candidate) {
				if (connection.peers[remoteUserId]) {
					connection.peers[remoteUserId].addRemoteCandidate(message);
				}

				if (connection.enableLogs) {
					console.log('Remote peer\'s candidate pairs:', message.candidate);
				}
				return;
			}

			if (message.enableMedia) {
				connection.session = message.userPreferences.session || connection.session;

				if (connection.session.oneway && connection.attachStreams.length) {
					connection.attachStreams = [];
				}

				if (message.userPreferences.isDataOnly && connection.attachStreams.length) {
					connection.attachStreams.length = [];
				}

				var streamsToShare = {};
				connection.attachStreams.forEach(function (stream) {
					streamsToShare[stream.streamid] = {
						isAudio: !!stream.isAudio,
						isVideo: !!stream.isVideo,
						isScreen: !!stream.isScreen
					};
				});
				message.userPreferences.streamsToShare = streamsToShare;

				self.onNegotiationNeeded({
					readyForOffer: true,
					userPreferences: message.userPreferences
				}, remoteUserId);
			}

			if (message.readyForOffer) {
				connection.onReadyForOffer(remoteUserId, message.userPreferences);
			}

			function cb(stream) {
				gumCallback(stream, message, remoteUserId);
			}
		};

		function gumCallback(stream, message, remoteUserId) {
			var streamsToShare = {};
			connection.attachStreams.forEach(function (stream) {
				streamsToShare[stream.streamid] = {
					isAudio: !!stream.isAudio,
					isVideo: !!stream.isVideo,
					isScreen: !!stream.isScreen
				};
			});
			message.userPreferences.streamsToShare = streamsToShare;

			self.onNegotiationNeeded({
				readyForOffer: true,
				userPreferences: message.userPreferences
			}, remoteUserId);
		}

		this.connectNewParticipantWithAllBroadcasters = function (newParticipantId, userPreferences, broadcastersList) {
			if (connection.socket.isIO) {
				return;
			}

			broadcastersList = (broadcastersList || '').split('|-,-|');

			if (!broadcastersList.length) {
				return;
			}

			var firstBroadcaster;

			var remainingBroadcasters = [];
			broadcastersList.forEach(function (list) {
				list = (list || '').replace(/ /g, '');
				if (list.length) {
					if (!firstBroadcaster) {
						firstBroadcaster = list;
					} else {
						remainingBroadcasters.push(list);
					}
				}
			});

			if (!firstBroadcaster) {
				return;
			}

			self.onNegotiationNeeded({
				newParticipant: newParticipantId,
				userPreferences: userPreferences || false
			}, firstBroadcaster);

			if (!remainingBroadcasters.length) {
				return;
			}

			setTimeout(function () {
				self.connectNewParticipantWithAllBroadcasters(newParticipantId, userPreferences, remainingBroadcasters.join('|-,-|'));
			}, 3 * 1000);
		};

		this.onGettingRemoteMedia = function (stream, remoteUserId) { };
		this.onRemovingRemoteMedia = function (stream, remoteUserId) { };
		this.onGettingLocalMedia = function (localStream) { };
		this.onLocalMediaError = function (error, constraints) {
			connection.onMediaError(error, constraints);
		};

		function initFileBufferReader() {
			connection.fbr = new FileBufferReader();
			connection.fbr.onProgress = function (chunk) {
				connection.onFileProgress(chunk);
			};
			connection.fbr.onBegin = function (file) {
				connection.onFileStart(file);
			};
			connection.fbr.onEnd = function (file) {
				connection.onFileEnd(file);
			};
		}

		this.shareFile = function (file, remoteUserId) {
			if (!connection.enableFileSharing) {
				throw '"connection.enableFileSharing" is false.';
			}

			initFileBufferReader();

			connection.fbr.readAsArrayBuffer(file, function (uuid) {
				var arrayOfUsers = connection.getAllParticipants();

				if (remoteUserId) {
					arrayOfUsers = [remoteUserId];
				}

				arrayOfUsers.forEach(function (participant) {
					connection.fbr.getNextChunk(uuid, function (nextChunk) {
						connection.peers[participant].channels.forEach(function (channel) {
							channel.send(nextChunk);
						});
					}, participant);
				});
			}, {
				userid: connection.userid,
				// extra: connection.extra,
				chunkSize: isFirefox ? 15 * 1000 : connection.chunkSize || 0
			});
		};

		if (typeof 'TextReceiver' !== 'undefined') {
			var textReceiver = new TextReceiver(connection);
		}

		this.onDataChannelMessage = function (message, remoteUserId) {
			textReceiver.receive(JSON.parse(message), remoteUserId, connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {});
		};

		this.onDataChannelClosed = function (event, remoteUserId) {
			event.userid = remoteUserId;
			event.extra = connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {};
			connection.onclose(event);
		};

		this.onDataChannelError = function (error, remoteUserId) {
			error.userid = remoteUserId;
			event.extra = connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {};
			connection.onerror(error);
		};

		this.onDataChannelOpened = function (channel, remoteUserId) {
			// keep last channel only; we are not expecting parallel/channels channels
			if (connection.peers[remoteUserId].channels.length) {
				connection.peers[remoteUserId].channels = [channel];
				return;
			}

			connection.peers[remoteUserId].channels.push(channel);
			connection.onopen({
				userid: remoteUserId,
				extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
				channel: channel
			});
		};

		this.onPeerStateChanged = function (state) {
			connection.onPeerStateChanged(state);
		};

		this.onNegotiationStarted = function (remoteUserId, states) { };
		this.onNegotiationCompleted = function (remoteUserId, states) { };

		this.getRemoteStreams = function (remoteUserId) {
			remoteUserId = remoteUserId || connection.peers.getAllParticipants()[0];
			return connection.peers[remoteUserId] ? connection.peers[remoteUserId].streams : [];
		};

		this.isPluginRTC = connection.isPluginRTC = isPluginRTC;
	}

	// globals.js

	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isFirefox = typeof window.InstallTrigger !== 'undefined';
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !!window.chrome && !isOpera;
	var isIE = !!document.documentMode;

	var isMobileDevice = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

	if (typeof cordova !== 'undefined') {
		isMobileDevice = true;
		isChrome = true;
	}

	if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Crosswalk') !== -1) {
		isMobileDevice = true;
		isChrome = true;
	}

	var isPluginRTC = !isMobileDevice && (isSafari || isIE);

	if (isPluginRTC && typeof URL !== 'undefined') {
		URL.createObjectURL = function () { };
	}

	// detect node-webkit
	var isNodeWebkit = !!(window.process && (typeof window.process === 'object') && window.process.versions && window.process.versions['node-webkit']);

	var chromeVersion = 50;
	var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	if (isChrome && matchArray && matchArray[2]) {
		chromeVersion = parseInt(matchArray[2], 10);
	}

	var firefoxVersion = 50;
	matchArray = navigator.userAgent.match(/Firefox\/(.*)/);
	if (isFirefox && matchArray && matchArray[1]) {
		firefoxVersion = parseInt(matchArray[1], 10);
	}

	function fireEvent(obj, eventName, args) {
		if (typeof CustomEvent === 'undefined') {
			return;
		}

		var eventDetail = {
			arguments: args,
			__exposedProps__: args
		};

		var event = new CustomEvent(eventName, eventDetail);
		obj.dispatchEvent(event);
	}

	function setHarkEvents(connection, streamEvent) {
		if (!connection || !streamEvent) {
			throw 'Both arguments are required.';
		}

		if (!connection.onspeaking || !connection.onsilence) {
			return;
		}

		if (typeof hark === 'undefined') {
			throw 'hark.js not found.';
		}

		hark(streamEvent.stream, {
			onspeaking: function () {
				connection.onspeaking(streamEvent);
			},
			onsilence: function () {
				connection.onsilence(streamEvent);
			},
			onvolumechange: function (volume, threshold) {
				if (!connection.onvolumechange) {
					return;
				}
				connection.onvolumechange(merge({
					volume: volume,
					threshold: threshold
				}, streamEvent));
			}
		});
	}

	function setMuteHandlers(connection, streamEvent) {
		if (!streamEvent.stream || !streamEvent.stream || !streamEvent.stream.addEventListener) return;

		streamEvent.stream.addEventListener('mute', function (event) {
			event = connection.streamEvents[streamEvent.streamid];

			event.session = {
				audio: event.muteType === 'audio',
				video: event.muteType === 'video'
			};

			connection.onmute(event);
		}, false);

		streamEvent.stream.addEventListener('unmute', function (event) {
			event = connection.streamEvents[streamEvent.streamid];

			event.session = {
				audio: event.unmuteType === 'audio',
				video: event.unmuteType === 'video'
			};

			connection.onunmute(event);
		}, false);
	}

	function getRandomString() {
		if (_userUid__) return _userUid__;
		if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
			var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
			for (var i = 0, l = a.length; i < l; i++) {
				token += a[i].toString(36);
			}
			return token;
		} else {
			return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
		}
	}

	// Get HTMLAudioElement/HTMLVideoElement accordingly

	function getRMCMediaElement(stream, callback, connection) {
		var isAudioOnly = false;
		if (!!stream.getVideoTracks && !stream.getVideoTracks().length) {
			isAudioOnly = true;
		}

		var mediaElement = document.createElement(isAudioOnly ? 'audio' : 'video');

		if (isPluginRTC && window.PluginRTC) {
			connection.videosContainer.insertBefore(mediaElement, connection.videosContainer.firstChild);

			setTimeout(function () {
				window.PluginRTC.attachMediaStream(mediaElement, stream);
				callback(mediaElement);
			}, 1000);

			return;
		}

		// "mozSrcObject" is always preferred over "src"!!
		mediaElement[isFirefox ? 'mozSrcObject' : 'src'] = isFirefox ? stream : window.URL.createObjectURL(stream);
		mediaElement.controls = true;

		// http://goo.gl/WZ5nFl
		// Firefox don't yet support onended for any stream (remote/local)
		if (isFirefox) {
			var streamEndedEvent = 'ended';

			if ('oninactive' in stream) {
				streamEndedEvent = 'inactive';
			}

			mediaElement.addEventListener(streamEndedEvent, function () {
				// fireEvent(stream, 'ended', stream);
				currentUserMediaRequest.remove(stream.idInstance);

				if (stream.type === 'local') {
					StreamsHandler.onSyncNeeded(stream.streamid, streamEndedEvent);

					connection.attachStreams.forEach(function (aStream, idx) {
						if (stream.streamid === aStream.streamid) {
							delete connection.attachStreams[idx];
						}
					});

					var newStreamsArray = [];
					connection.attachStreams.forEach(function (aStream) {
						if (aStream) {
							newStreamsArray.push(aStream);
						}
					});
					connection.attachStreams = newStreamsArray;

					var streamEvent = connection.streamEvents[stream.streamid];

					if (streamEvent) {
						connection.onstreamended(streamEvent);
						return;
					}
					if (this.parentNode) {
						this.parentNode.removeChild(this);
					}
				}
			}, false);
		}

		mediaElement.play();
		callback(mediaElement);
	}

	// if IE
	if (!window.addEventListener) {
		window.addEventListener = function (el, eventName, eventHandler) {
			if (!el.attachEvent) {
				return;
			}
			el.attachEvent('on' + eventName, eventHandler);
		};
	}

	function listenEventHandler(eventName, eventHandler) {
		window.removeEventListener(eventName, eventHandler);
		window.addEventListener(eventName, eventHandler, false);
	}

	window.attachEventListener = function (video, type, listener, useCapture) {
		video.addEventListener(type, listener, useCapture);
	};

	function removeNullEntries(array) {
		var newArray = [];
		array.forEach(function (item) {
			if (item) {
				newArray.push(item);
			}
		});
		return newArray;
	}


	function isData(session) {
		return !session.audio && !session.video && !session.screen && session.data;
	}

	function isNull(obj) {
		return typeof obj === 'undefined';
	}

	function isString(obj) {
		return typeof obj === 'string';
	}

	var MediaStream = window.MediaStream;

	if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
		MediaStream = webkitMediaStream;
	}

	/*global MediaStream:true */
	if (typeof MediaStream !== 'undefined') {
		if (!('getVideoTracks' in MediaStream.prototype)) {
			MediaStream.prototype.getVideoTracks = function () {
				if (!this.getTracks) {
					return [];
				}

				var tracks = [];
				this.getTracks.forEach(function (track) {
					if (track.kind.toString().indexOf('video') !== -1) {
						tracks.push(track);
					}
				});
				return tracks;
			};

			MediaStream.prototype.getAudioTracks = function () {
				if (!this.getTracks) {
					return [];
				}

				var tracks = [];
				this.getTracks.forEach(function (track) {
					if (track.kind.toString().indexOf('audio') !== -1) {
						tracks.push(track);
					}
				});
				return tracks;
			};
		}

		if (!('stop' in MediaStream.prototype)) {
			MediaStream.prototype.stop = function () {
				this.getAudioTracks().forEach(function (track) {
					if (!!track.stop) {
						track.stop();
					}
				});

				this.getVideoTracks().forEach(function (track) {
					if (!!track.stop) {
						track.stop();
					}
				});
			};
		}
	}

	function isAudioPlusTab(connection, audioPlusTab) {
		if (connection.session.audio && connection.session.audio === 'two-way') {
			return false;
		}

		if (isFirefox && audioPlusTab !== false) {
			return true;
		}

		if (!isChrome || chromeVersion < 50) return false;

		if (typeof audioPlusTab === true) {
			return true;
		}

		if (typeof audioPlusTab === 'undefined' && connection.session.audio && connection.session.screen && !connection.session.video) {
			audioPlusTab = true;
			return true;
		}

		return false;
	}

	function getAudioScreenConstraints(screen_constraints) {
		if (isFirefox) {
			return true;
		}

		if (!isChrome) return false;

		return {
			mandatory: {
				chromeMediaSource: screen_constraints.mandatory.chromeMediaSource,
				chromeMediaSourceId: screen_constraints.mandatory.chromeMediaSourceId
			}
		};
	}

	// Last time updated: 2016-11-12 6:02:08 AM UTC

	// Latest file can be found here: https://cdn.webrtc-experiment.com/DetectRTC.js

	// Muaz Khan     - www.MuazKhan.com
	// MIT License   - www.WebRTC-Experiment.com/licence
	// Documentation - github.com/muaz-khan/DetectRTC
	// ____________
	// DetectRTC.js

	// DetectRTC.hasWebcam (has webcam device!)
	// DetectRTC.hasMicrophone (has microphone device!)
	// DetectRTC.hasSpeakers (has speakers!)

	(function () {

		'use strict';

		var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

		(function (that) {
			if (typeof window !== 'undefined') {
				return;
			}

			if (typeof window === 'undefined' && typeof global !== 'undefined') {
				global.navigator = {
					userAgent: browserFakeUserAgent,
					getUserMedia: function () { }
				};

				/*global window:true */
				that.window = global;
			} else if (typeof window === 'undefined') {
				// window = this;
			}

			if (typeof document === 'undefined') {
				/*global document:true */
				that.document = {};

				document.createElement = document.captureStream = document.mozCaptureStream = function () {
					return {};
				};
			}

			if (typeof location === 'undefined') {
				/*global location:true */
				that.location = {
					protocol: 'file:',
					href: '',
					hash: ''
				};
			}

			if (typeof screen === 'undefined') {
				/*global screen:true */
				that.screen = {
					width: 0,
					height: 0
				};
			}
		})(typeof global !== 'undefined' ? global : window);

		/*global navigator:true */
		var navigator = window.navigator;

		if (typeof navigator !== 'undefined') {
			if (typeof navigator.webkitGetUserMedia !== 'undefined') {
				navigator.getUserMedia = navigator.webkitGetUserMedia;
			}

			if (typeof navigator.mozGetUserMedia !== 'undefined') {
				navigator.getUserMedia = navigator.mozGetUserMedia;
			}
		} else {
			navigator = {
				getUserMedia: function () { },
				userAgent: browserFakeUserAgent
			};
		}

		var isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));

		var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		var isFirefox = typeof window.InstallTrigger !== 'undefined';
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		var isChrome = !!window.chrome && !isOpera;
		var isIE = !!document.documentMode && !isEdge;

		// this one can also be used:
		// https://www.websocket.org/js/stuff.js (DetectBrowser.js)

		function getBrowserInfo() {
			var nVer = navigator.appVersion;
			var nAgt = navigator.userAgent;
			var browserName = navigator.appName;
			var fullVersion = '' + parseFloat(navigator.appVersion);
			var majorVersion = parseInt(navigator.appVersion, 10);
			var nameOffset, verOffset, ix;

			// In Opera, the true version is after 'Opera' or after 'Version'
			if (isOpera) {
				browserName = 'Opera';
				try {
					fullVersion = navigator.userAgent.split('OPR/')[1].split(' ')[0];
					majorVersion = fullVersion.split('.')[0];
				} catch (e) {
					fullVersion = '0.0.0.0';
					majorVersion = 0;
				}
			}
				// In MSIE, the true version is after 'MSIE' in userAgent
			else if (isIE) {
				verOffset = nAgt.indexOf('MSIE');
				browserName = 'IE';
				fullVersion = nAgt.substring(verOffset + 5);
			}
				// In Chrome, the true version is after 'Chrome' 
			else if (isChrome) {
				verOffset = nAgt.indexOf('Chrome');
				browserName = 'Chrome';
				fullVersion = nAgt.substring(verOffset + 7);
			}
				// In Safari, the true version is after 'Safari' or after 'Version' 
			else if (isSafari) {
				verOffset = nAgt.indexOf('Safari');
				browserName = 'Safari';
				fullVersion = nAgt.substring(verOffset + 7);

				if ((verOffset = nAgt.indexOf('Version')) !== -1) {
					fullVersion = nAgt.substring(verOffset + 8);
				}
			}
				// In Firefox, the true version is after 'Firefox' 
			else if (isFirefox) {
				verOffset = nAgt.indexOf('Firefox');
				browserName = 'Firefox';
				fullVersion = nAgt.substring(verOffset + 8);
			}

				// In most other browsers, 'name/version' is at the end of userAgent 
			else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
				browserName = nAgt.substring(nameOffset, verOffset);
				fullVersion = nAgt.substring(verOffset + 1);

				if (browserName.toLowerCase() === browserName.toUpperCase()) {
					browserName = navigator.appName;
				}
			}

			if (isEdge) {
				browserName = 'Edge';
				// fullVersion = navigator.userAgent.split('Edge/')[1];
				fullVersion = parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10).toString();
			}

			// trim the fullVersion string at semicolon/space if present
			if ((ix = fullVersion.indexOf(';')) !== -1) {
				fullVersion = fullVersion.substring(0, ix);
			}

			if ((ix = fullVersion.indexOf(' ')) !== -1) {
				fullVersion = fullVersion.substring(0, ix);
			}

			majorVersion = parseInt('' + fullVersion, 10);

			if (isNaN(majorVersion)) {
				fullVersion = '' + parseFloat(navigator.appVersion);
				majorVersion = parseInt(navigator.appVersion, 10);
			}

			return {
				fullVersion: fullVersion,
				version: majorVersion,
				name: browserName,
				isPrivateBrowsing: false
			};
		}

		// via: https://gist.github.com/cou929/7973956

		function retry(isDone, next) {
			var currentTrial = 0,
                maxRetry = 50,
                interval = 10,
                isTimeout = false;
			var id = window.setInterval(
                function () {
                	if (isDone()) {
                		window.clearInterval(id);
                		next(isTimeout);
                	}
                	if (currentTrial++ > maxRetry) {
                		window.clearInterval(id);
                		isTimeout = true;
                		next(isTimeout);
                	}
                },
                10
            );
		}

		function isIE10OrLater(userAgent) {
			var ua = userAgent.toLowerCase();
			if (ua.indexOf('msie') === 0 && ua.indexOf('trident') === 0) {
				return false;
			}
			var match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
			if (match && parseInt(match[1], 10) >= 10) {
				return true;
			}
			return false;
		}

		function detectPrivateMode(callback) {
			var isPrivate;

			if (window.webkitRequestFileSystem) {
				window.webkitRequestFileSystem(
                    window.TEMPORARY, 1,
                    function () {
                    	isPrivate = false;
                    },
                    function (e) {
                    	isPrivate = true;
                    }
                );
			} else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
				var db;
				try {
					db = window.indexedDB.open('test');
					db.onerror = function () {
						return true;
					};
				} catch (e) {
					isPrivate = true;
				}

				if (typeof isPrivate === 'undefined') {
					retry(
                        function isDone() {
                        	return db.readyState === 'done' ? true : false;
                        },
                        function next(isTimeout) {
                        	if (!isTimeout) {
                        		isPrivate = db.result ? false : true;
                        	}
                        }
                    );
				}
			} else if (isIE10OrLater(window.navigator.userAgent)) {
				isPrivate = false;
				try {
					if (!window.indexedDB) {
						isPrivate = true;
					}
				} catch (e) {
					isPrivate = true;
				}
			} else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
				try {
					window.localStorage.setItem('test', 1);
				} catch (e) {
					isPrivate = true;
				}

				if (typeof isPrivate === 'undefined') {
					isPrivate = false;
					window.localStorage.removeItem('test');
				}
			}

			retry(
                function isDone() {
                	return typeof isPrivate !== 'undefined' ? true : false;
                },
                function next(isTimeout) {
                	callback(isPrivate);
                }
            );
		}

		var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry|BB10/i);
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
			},
			getOsName: function () {
				var osName = 'Unknown OS';
				if (isMobile.Android()) {
					osName = 'Android';
				}

				if (isMobile.BlackBerry()) {
					osName = 'BlackBerry';
				}

				if (isMobile.iOS()) {
					osName = 'iOS';
				}

				if (isMobile.Opera()) {
					osName = 'Opera Mini';
				}

				if (isMobile.Windows()) {
					osName = 'Windows';
				}

				return osName;
			}
		};

		// via: http://jsfiddle.net/ChristianL/AVyND/
		function detectDesktopOS() {
			var unknown = '-';

			var nVer = navigator.appVersion;
			var nAgt = navigator.userAgent;

			var os = unknown;
			var clientStrings = [{
				s: 'Windows 10',
				r: /(Windows 10.0|Windows NT 10.0)/
			}, {
				s: 'Windows 8.1',
				r: /(Windows 8.1|Windows NT 6.3)/
			}, {
				s: 'Windows 8',
				r: /(Windows 8|Windows NT 6.2)/
			}, {
				s: 'Windows 7',
				r: /(Windows 7|Windows NT 6.1)/
			}, {
				s: 'Windows Vista',
				r: /Windows NT 6.0/
			}, {
				s: 'Windows Server 2003',
				r: /Windows NT 5.2/
			}, {
				s: 'Windows XP',
				r: /(Windows NT 5.1|Windows XP)/
			}, {
				s: 'Windows 2000',
				r: /(Windows NT 5.0|Windows 2000)/
			}, {
				s: 'Windows ME',
				r: /(Win 9x 4.90|Windows ME)/
			}, {
				s: 'Windows 98',
				r: /(Windows 98|Win98)/
			}, {
				s: 'Windows 95',
				r: /(Windows 95|Win95|Windows_95)/
			}, {
				s: 'Windows NT 4.0',
				r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
			}, {
				s: 'Windows CE',
				r: /Windows CE/
			}, {
				s: 'Windows 3.11',
				r: /Win16/
			}, {
				s: 'Android',
				r: /Android/
			}, {
				s: 'Open BSD',
				r: /OpenBSD/
			}, {
				s: 'Sun OS',
				r: /SunOS/
			}, {
				s: 'Linux',
				r: /(Linux|X11)/
			}, {
				s: 'iOS',
				r: /(iPhone|iPad|iPod)/
			}, {
				s: 'Mac OS X',
				r: /Mac OS X/
			}, {
				s: 'Mac OS',
				r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
			}, {
				s: 'QNX',
				r: /QNX/
			}, {
				s: 'UNIX',
				r: /UNIX/
			}, {
				s: 'BeOS',
				r: /BeOS/
			}, {
				s: 'OS/2',
				r: /OS\/2/
			}, {
				s: 'Search Bot',
				r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
			}];
			for (var id in clientStrings) {
				var cs = clientStrings[id];
				if (cs.r.test(nAgt)) {
					os = cs.s;
					break;
				}
			}

			var osVersion = unknown;

			if (/Windows/.test(os)) {
				if (/Windows (.*)/.test(os)) {
					osVersion = /Windows (.*)/.exec(os)[1];
				}
				os = 'Windows';
			}

			switch (os) {
				case 'Mac OS X':
					if (/Mac OS X (10[\.\_\d]+)/.test(nAgt)) {
						osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
					}
					break;
				case 'Android':
					if (/Android ([\.\_\d]+)/.test(nAgt)) {
						osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
					}
					break;
				case 'iOS':
					if (/OS (\d+)_(\d+)_?(\d+)?/.test(nAgt)) {
						osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
						osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
					}
					break;
			}

			return {
				osName: os,
				osVersion: osVersion
			};
		}

		var osName = 'Unknown OS';
		var osVersion = 'Unknown OS Version';

		if (isMobile.any()) {
			osName = isMobile.getOsName();
		} else {
			var osInfo = detectDesktopOS();
			osName = osInfo.osName;
			osVersion = osInfo.osVersion;
		}

		var isCanvasSupportsStreamCapturing = false;
		var isVideoSupportsStreamCapturing = false;
		['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function (item) {
			if (!isCanvasSupportsStreamCapturing && item in document.createElement('canvas')) {
				isCanvasSupportsStreamCapturing = true;
			}

			if (!isVideoSupportsStreamCapturing && item in document.createElement('video')) {
				isVideoSupportsStreamCapturing = true;
			}
		});

		// via: https://github.com/diafygi/webrtc-ips
		function DetectLocalIPAddress(callback) {
			if (!DetectRTC.isWebRTCSupported) {
				return;
			}

			if (DetectRTC.isORTCSupported) {
				return;
			}

			getIPs(function (ip) {
				//local IPs
				if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
					callback('Local: ' + ip);
				}

					//assume the rest are public IPs
				else {
					callback('Public: ' + ip);
				}
			});
		}

		//get the IP addresses associated with an account
		function getIPs(callback) {
			var ipDuplicates = {};

			//compatibility for firefox and chrome
			var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
			var useWebKit = !!window.webkitRTCPeerConnection;

			// bypass naive webrtc blocking using an iframe
			if (!RTCPeerConnection) {
				var iframe = document.getElementById('iframe');
				if (!iframe) {
					//<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
					throw 'NOTE: you need to have an iframe in the page right above the script tag.';
				}
				var win = iframe.contentWindow;
				RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
				useWebKit = !!win.webkitRTCPeerConnection;
			}

			// if still no RTCPeerConnection then it is not supported by the browser so just return
			if (!RTCPeerConnection) {
				return;
			}

			//minimal requirements for data connection
			var mediaConstraints = {
				optional: [{
					RtpDataChannels: true
				}]
			};

			//firefox already has a default stun server in about:config
			//    media.peerconnection.default_iceservers =
			//    [{"url": "stun:stun.services.mozilla.com"}]
			var servers;

			//add same stun server for chrome
			if (useWebKit) {
				servers = {
					iceServers: [{
						urls: 'stun:stun.services.mozilla.com'
					}]
				};

				if (typeof DetectRTC !== 'undefined' && DetectRTC.browser.isFirefox && DetectRTC.browser.version <= 38) {
					servers[0] = {
						url: servers[0].urls
					};
				}
			}

			//construct a new RTCPeerConnection
			var pc = new RTCPeerConnection(servers, mediaConstraints);

			function handleCandidate(candidate) {
				//match just the IP address
				var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
				var match = ipRegex.exec(candidate);
				if (!match) {
					console.warn('Could not match IP address in', candidate);
					return;
				}
				var ipAddress = match[1];

				//remove duplicates
				if (ipDuplicates[ipAddress] === undefined) {
					callback(ipAddress);
				}

				ipDuplicates[ipAddress] = true;
			}

			//listen for candidate events
			pc.onicecandidate = function (ice) {
				//skip non-candidate events
				if (ice.candidate) {
					handleCandidate(ice.candidate.candidate);
				}
			};

			//create a bogus data channel
			pc.createDataChannel('');

			//create an offer sdp
			pc.createOffer(function (result) {

				//trigger the stun server request
				pc.setLocalDescription(result, function () { }, function () { });

			}, function () { });

			//wait for a while to let everything done
			setTimeout(function () {
				//read candidate info from local description
				var lines = pc.localDescription.sdp.split('\n');

				lines.forEach(function (line) {
					if (line.indexOf('a=candidate:') === 0) {
						handleCandidate(line);
					}
				});
			}, 1000);
		}

		var MediaDevices = [];

		var audioInputDevices = [];
		var audioOutputDevices = [];
		var videoInputDevices = [];

		if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
			// Firefox 38+ seems having support of enumerateDevices
			// Thanks @xdumaine/enumerateDevices
			navigator.enumerateDevices = function (callback) {
				navigator.mediaDevices.enumerateDevices().then(callback).catch(function () {
					callback([]);
				});
			};
		}

		// Media Devices detection
		var canEnumerate = false;

		/*global MediaStreamTrack:true */
		if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
			canEnumerate = true;
		} else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
			canEnumerate = true;
		}

		var hasMicrophone = false;
		var hasSpeakers = false;
		var hasWebcam = false;

		var isWebsiteHasMicrophonePermissions = false;
		var isWebsiteHasWebcamPermissions = false;

		// http://dev.w3.org/2011/webrtc/editor/getusermedia.html#mediadevices
		function checkDeviceSupport(callback) {
			if (!canEnumerate) {
				if (callback) {
					callback();
				}
				return;
			}

			if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
				navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
			}

			if (!navigator.enumerateDevices && navigator.enumerateDevices) {
				navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
			}

			if (!navigator.enumerateDevices) {
				if (callback) {
					callback();
				}
				return;
			}

			MediaDevices = [];

			audioInputDevices = [];
			audioOutputDevices = [];
			videoInputDevices = [];

			// to prevent duplication
			var alreadyUsedDevices = {};

			navigator.enumerateDevices(function (devices) {
				devices.forEach(function (_device) {
					var device = {};
					for (var d in _device) {
						try {
							if (typeof _device[d] !== 'function') {
								device[d] = _device[d];
							}
						} catch (e) { }
					}

					if (alreadyUsedDevices[device.deviceId]) {
						return;
					}

					// if it is MediaStreamTrack.getSources
					if (device.kind === 'audio') {
						device.kind = 'audioinput';
					}

					if (device.kind === 'video') {
						device.kind = 'videoinput';
					}

					if (!device.deviceId) {
						device.deviceId = device.id;
					}

					if (!device.id) {
						device.id = device.deviceId;
					}

					if (!device.label) {
						device.label = 'Please invoke getUserMedia once.';
						if (location.protocol !== 'https:') {
							if (document.domain.search && document.domain.search(/localhost|127.0./g) === -1) {
								device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
							}
						}
					} else {
						if (device.kind === 'videoinput' && !isWebsiteHasWebcamPermissions) {
							isWebsiteHasWebcamPermissions = true;
						}

						if (device.kind === 'audioinput' && !isWebsiteHasMicrophonePermissions) {
							isWebsiteHasMicrophonePermissions = true;
						}
					}

					if (device.kind === 'audioinput') {
						hasMicrophone = true;

						if (audioInputDevices.indexOf(device) === -1) {
							audioInputDevices.push(device);
						}
					}

					if (device.kind === 'audiooutput') {
						hasSpeakers = true;

						if (audioOutputDevices.indexOf(device) === -1) {
							audioOutputDevices.push(device);
						}
					}

					if (device.kind === 'videoinput') {
						hasWebcam = true;

						if (videoInputDevices.indexOf(device) === -1) {
							videoInputDevices.push(device);
						}
					}

					// there is no 'videoouput' in the spec.
					MediaDevices.push(device);

					alreadyUsedDevices[device.deviceId] = device;
				});

				if (typeof DetectRTC !== 'undefined') {
					// to sync latest outputs
					DetectRTC.MediaDevices = MediaDevices;
					DetectRTC.hasMicrophone = hasMicrophone;
					DetectRTC.hasSpeakers = hasSpeakers;
					DetectRTC.hasWebcam = hasWebcam;

					DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions;
					DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions;

					DetectRTC.audioInputDevices = audioInputDevices;
					DetectRTC.audioOutputDevices = audioOutputDevices;
					DetectRTC.videoInputDevices = videoInputDevices;
				}

				if (callback) {
					callback();
				}
			});
		}

		// check for microphone/camera support!
		checkDeviceSupport();

		var DetectRTC = window.DetectRTC || {};

		// ----------
		// DetectRTC.browser.name || DetectRTC.browser.version || DetectRTC.browser.fullVersion
		DetectRTC.browser = getBrowserInfo();

		detectPrivateMode(function (isPrivateBrowsing) {
			DetectRTC.browser.isPrivateBrowsing = !!isPrivateBrowsing;
		});

		// DetectRTC.isChrome || DetectRTC.isFirefox || DetectRTC.isEdge
		DetectRTC.browser['is' + DetectRTC.browser.name] = true;

		var isNodeWebkit = !!(window.process && (typeof window.process === 'object') && window.process.versions && window.process.versions['node-webkit']);

		// --------- Detect if system supports WebRTC 1.0 or WebRTC 1.1.
		var isWebRTCSupported = false;
		['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function (item) {
			if (isWebRTCSupported) {
				return;
			}

			if (item in window) {
				isWebRTCSupported = true;
			}
		});
		DetectRTC.isWebRTCSupported = isWebRTCSupported;

		//-------
		DetectRTC.isORTCSupported = typeof RTCIceGatherer !== 'undefined';

		// --------- Detect if system supports screen capturing API
		var isScreenCapturingSupported = false;
		if (DetectRTC.browser.isChrome && DetectRTC.browser.version >= 35) {
			isScreenCapturingSupported = true;
		} else if (DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 34) {
			isScreenCapturingSupported = true;
		}

		if (location.protocol !== 'https:') {
			isScreenCapturingSupported = false;
		}
		DetectRTC.isScreenCapturingSupported = isScreenCapturingSupported;

		// --------- Detect if WebAudio API are supported
		var webAudio = {
			isSupported: false,
			isCreateMediaStreamSourceSupported: false
		};

		['AudioContext', 'webkitAudioContext', 'mozAudioContext', 'msAudioContext'].forEach(function (item) {
			if (webAudio.isSupported) {
				return;
			}

			if (item in window) {
				webAudio.isSupported = true;

				if (window[item] && 'createMediaStreamSource' in window[item].prototype) {
					webAudio.isCreateMediaStreamSourceSupported = true;
				}
			}
		});
		DetectRTC.isAudioContextSupported = webAudio.isSupported;
		DetectRTC.isCreateMediaStreamSourceSupported = webAudio.isCreateMediaStreamSourceSupported;

		// ---------- Detect if SCTP/RTP channels are supported.

		var isRtpDataChannelsSupported = false;
		if (DetectRTC.browser.isChrome && DetectRTC.browser.version > 31) {
			isRtpDataChannelsSupported = true;
		}
		DetectRTC.isRtpDataChannelsSupported = isRtpDataChannelsSupported;

		var isSCTPSupportd = false;
		if (DetectRTC.browser.isFirefox && DetectRTC.browser.version > 28) {
			isSCTPSupportd = true;
		} else if (DetectRTC.browser.isChrome && DetectRTC.browser.version > 25) {
			isSCTPSupportd = true;
		} else if (DetectRTC.browser.isOpera && DetectRTC.browser.version >= 11) {
			isSCTPSupportd = true;
		}
		DetectRTC.isSctpDataChannelsSupported = isSCTPSupportd;

		// ---------

		DetectRTC.isMobileDevice = isMobileDevice; // "isMobileDevice" boolean is defined in "getBrowserInfo.js"

		// ------
		var isGetUserMediaSupported = false;
		if (navigator.getUserMedia) {
			isGetUserMediaSupported = true;
		} else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			isGetUserMediaSupported = true;
		}
		if (DetectRTC.browser.isChrome && DetectRTC.browser.version >= 46 && location.protocol !== 'https:') {
			DetectRTC.isGetUserMediaSupported = 'Requires HTTPs';
		}
		DetectRTC.isGetUserMediaSupported = isGetUserMediaSupported;

		// -----------
		DetectRTC.osName = osName;
		DetectRTC.osVersion = osVersion;

		var displayResolution = '';
		if (screen.width) {
			var width = (screen.width) ? screen.width : '';
			var height = (screen.height) ? screen.height : '';
			displayResolution += '' + width + ' x ' + height;
		}
		DetectRTC.displayResolution = displayResolution;

		// ----------
		DetectRTC.isCanvasSupportsStreamCapturing = isCanvasSupportsStreamCapturing;
		DetectRTC.isVideoSupportsStreamCapturing = isVideoSupportsStreamCapturing;

		if (DetectRTC.browser.name == 'Chrome' && DetectRTC.browser.version >= 53) {
			if (!DetectRTC.isCanvasSupportsStreamCapturing) {
				DetectRTC.isCanvasSupportsStreamCapturing = 'Requires chrome flag: enable-experimental-web-platform-features';
			}

			if (!DetectRTC.isVideoSupportsStreamCapturing) {
				DetectRTC.isVideoSupportsStreamCapturing = 'Requires chrome flag: enable-experimental-web-platform-features';
			}
		}

		// ------
		DetectRTC.DetectLocalIPAddress = DetectLocalIPAddress;

		DetectRTC.isWebSocketsSupported = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;
		DetectRTC.isWebSocketsBlocked = !DetectRTC.isWebSocketsSupported;

		DetectRTC.checkWebSocketsSupport = function (callback) {
			callback = callback || function () { };
			try {
				var websocket = new WebSocket('wss://echo.websocket.org:443/');
				websocket.onopen = function () {
					DetectRTC.isWebSocketsBlocked = false;
					callback();
					websocket.close();
					websocket = null;
				};
				websocket.onerror = function () {
					DetectRTC.isWebSocketsBlocked = true;
					callback();
				};
			} catch (e) {
				DetectRTC.isWebSocketsBlocked = true;
				callback();
			}
		};

		// -------
		DetectRTC.load = function (callback) {
			callback = callback || function () { };
			checkDeviceSupport(callback);
		};

		DetectRTC.MediaDevices = MediaDevices;
		DetectRTC.hasMicrophone = hasMicrophone;
		DetectRTC.hasSpeakers = hasSpeakers;
		DetectRTC.hasWebcam = hasWebcam;

		DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions;
		DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions;

		DetectRTC.audioInputDevices = audioInputDevices;
		DetectRTC.audioOutputDevices = audioOutputDevices;
		DetectRTC.videoInputDevices = videoInputDevices;

		// ------
		var isSetSinkIdSupported = false;
		if ('setSinkId' in document.createElement('video')) {
			isSetSinkIdSupported = true;
		}
		DetectRTC.isSetSinkIdSupported = isSetSinkIdSupported;

		// -----
		var isRTPSenderReplaceTracksSupported = false;
		if (DetectRTC.browser.isFirefox && typeof mozRTCPeerConnection !== 'undefined' /*&& DetectRTC.browser.version > 39*/) {
			/*global mozRTCPeerConnection:true */
			if ('getSenders' in mozRTCPeerConnection.prototype) {
				isRTPSenderReplaceTracksSupported = true;
			}
		} else if (DetectRTC.browser.isChrome && typeof webkitRTCPeerConnection !== 'undefined') {
			/*global webkitRTCPeerConnection:true */
			if ('getSenders' in webkitRTCPeerConnection.prototype) {
				isRTPSenderReplaceTracksSupported = true;
			}
		}
		DetectRTC.isRTPSenderReplaceTracksSupported = isRTPSenderReplaceTracksSupported;

		//------
		var isRemoteStreamProcessingSupported = false;
		if (DetectRTC.browser.isFirefox && DetectRTC.browser.version > 38) {
			isRemoteStreamProcessingSupported = true;
		}
		DetectRTC.isRemoteStreamProcessingSupported = isRemoteStreamProcessingSupported;

		//-------
		var isApplyConstraintsSupported = false;

		/*global MediaStreamTrack:true */
		if (typeof MediaStreamTrack !== 'undefined' && 'applyConstraints' in MediaStreamTrack.prototype) {
			isApplyConstraintsSupported = true;
		}
		DetectRTC.isApplyConstraintsSupported = isApplyConstraintsSupported;

		//-------
		var isMultiMonitorScreenCapturingSupported = false;
		if (DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 43) {
			// version 43 merely supports platforms for multi-monitors
			// version 44 will support exact multi-monitor selection i.e. you can select any monitor for screen capturing.
			isMultiMonitorScreenCapturingSupported = true;
		}
		DetectRTC.isMultiMonitorScreenCapturingSupported = isMultiMonitorScreenCapturingSupported;

		DetectRTC.isPromisesSupported = !!('Promise' in window);

		if (typeof DetectRTC === 'undefined') {
			window.DetectRTC = {};
		}

		var MediaStream = window.MediaStream;

		if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
			MediaStream = webkitMediaStream;
		}

		if (typeof MediaStream !== 'undefined') {
			DetectRTC.MediaStream = Object.keys(MediaStream.prototype);
		} else DetectRTC.MediaStream = false;

		if (typeof MediaStreamTrack !== 'undefined') {
			DetectRTC.MediaStreamTrack = Object.keys(MediaStreamTrack.prototype);
		} else DetectRTC.MediaStreamTrack = false;

		var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

		if (typeof RTCPeerConnection !== 'undefined') {
			DetectRTC.RTCPeerConnection = Object.keys(RTCPeerConnection.prototype);
		} else DetectRTC.RTCPeerConnection = false;

		window.DetectRTC = DetectRTC;

		if (typeof module !== 'undefined' /* && !!module.exports*/) {
			module.exports = DetectRTC;
		}

		if (typeof define === 'function' && define.amd) {
			define('DetectRTC', [], function () {
				return DetectRTC;
			});
		}
	})();

	// ios-hacks.js

	function setCordovaAPIs() {
		if (DetectRTC.osName !== 'iOS') return;
		if (typeof cordova === 'undefined' || typeof cordova.plugins === 'undefined' || typeof cordova.plugins.iosrtc === 'undefined') return;

		var iosrtc = cordova.plugins.iosrtc;
		window.webkitRTCPeerConnection = iosrtc.RTCPeerConnection;
		window.RTCSessionDescription = iosrtc.RTCSessionDescription;
		window.RTCIceCandidate = iosrtc.RTCIceCandidate;
		window.MediaStream = iosrtc.MediaStream;
		window.MediaStreamTrack = iosrtc.MediaStreamTrack;
		navigator.getUserMedia = navigator.webkitGetUserMedia = iosrtc.getUserMedia;

		iosrtc.debug.enable('iosrtc*');
		iosrtc.registerGlobals();
	}

	document.addEventListener('deviceready', setCordovaAPIs, false);
	setCordovaAPIs();

	// RTCPeerConnection.js

	var defaults = {};

	function setSdpConstraints(config) {
		var sdpConstraints;

		var sdpConstraints_mandatory = {
			OfferToReceiveAudio: !!config.OfferToReceiveAudio,
			OfferToReceiveVideo: !!config.OfferToReceiveVideo
		};

		sdpConstraints = {
			mandatory: sdpConstraints_mandatory,
			optional: [{
				VoiceActivityDetection: false
			}]
		};

		if (!!navigator.mozGetUserMedia && firefoxVersion > 34) {
			sdpConstraints = {
				OfferToReceiveAudio: !!config.OfferToReceiveAudio,
				OfferToReceiveVideo: !!config.OfferToReceiveVideo
			};
		}

		return sdpConstraints;
	}

	var RTCPeerConnection;
	if (typeof window.RTCPeerConnection !== 'undefined') {
		RTCPeerConnection = window.RTCPeerConnection;
	} else if (typeof mozRTCPeerConnection !== 'undefined') {
		RTCPeerConnection = mozRTCPeerConnection;
	} else if (typeof webkitRTCPeerConnection !== 'undefined') {
		RTCPeerConnection = webkitRTCPeerConnection;
	}

	var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
	var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
	var MediaStreamTrack = window.MediaStreamTrack;

	window.onPluginRTCInitialized = function () {
		MediaStreamTrack = window.PluginRTC.MediaStreamTrack;
		RTCPeerConnection = window.PluginRTC.RTCPeerConnection;
		RTCIceCandidate = window.PluginRTC.RTCIceCandidate;
		RTCSessionDescription = window.PluginRTC.RTCSessionDescription;
	}

	if (typeof window.PluginRTC !== 'undefined') {
		window.onPluginRTCInitialized();
	}

	function PeerInitiator(config) {
		if (!RTCPeerConnection) {
			throw 'WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.';
		}

		var connection = config.rtcMultiConnection;

		this.extra = config.remoteSdp ? config.remoteSdp.extra : connection.extra;
		this.userid = config.userid;
		this.streams = [];
		this.channels = config.channels || [];
		this.connectionDescription = config.connectionDescription;

		var self = this;

		if (config.remoteSdp) {
			this.connectionDescription = config.remoteSdp.connectionDescription;
		}

		var allRemoteStreams = {};

		defaults.sdpConstraints = setSdpConstraints({
			OfferToReceiveAudio: true,
			OfferToReceiveVideo: true
		});

		var peer;

		var renegotiatingPeer = !!config.renegotiatingPeer;
		if (config.remoteSdp) {
			renegotiatingPeer = !!config.remoteSdp.renegotiatingPeer;
		}

		var localStreams = [];
		connection.attachStreams.forEach(function (stream) {
			if (!!stream) {
				localStreams.push(stream);
			}
		});

		if (!renegotiatingPeer) {
			var iceTransports = 'all';
			if (connection.candidates.turn || connection.candidates.relay) {
				if (!connection.candidates.stun && !connection.candidates.reflexive && !connection.candidates.host) {
					iceTransports = 'relay';
				}
			}

			peer = new RTCPeerConnection(navigator.onLine ? {
				iceServers: connection.iceServers,
				iceTransportPolicy: connection.iceTransportPolicy || iceTransports,
				rtcpMuxPolicy: connection.rtcpMuxPolicy || 'negotiate'
			} : null, window.PluginRTC ? null : connection.optionalArgument);

			if (!connection.iceServers.length) {
				peer = new RTCPeerConnection(null, null);
			}
		} else {
			peer = config.peerRef;
		}

		function getLocalStreams() {
			// if-block is temporarily disabled
			if (false && 'getSenders' in peer && typeof peer.getSenders === 'function') {
				var streamObject2 = new MediaStream();
				peer.getSenders().forEach(function (sender) {
					streamObject2.addTrack(sender.track);
				});
				return streamObject2;
			}
			return peer.getLocalStreams();
		}

		peer.onicecandidate = function (event) {
			if (!event.candidate) {
				if (!connection.trickleIce) {
					var localSdp = peer.localDescription;
					config.onLocalSdp({
						type: localSdp.type,
						sdp: localSdp.sdp,
						remotePeerSdpConstraints: config.remotePeerSdpConstraints || false,
						renegotiatingPeer: !!config.renegotiatingPeer || false,
						connectionDescription: self.connectionDescription,
						dontGetRemoteStream: !!config.dontGetRemoteStream,
						extra: connection ? connection.extra : {},
						streamsToShare: streamsToShare,
						isFirefoxOffered: isFirefox
					});
				}
				return;
			}

			if (!connection.trickleIce) return;
			config.onLocalCandidate({
				candidate: event.candidate.candidate,
				sdpMid: event.candidate.sdpMid,
				sdpMLineIndex: event.candidate.sdpMLineIndex
			});
		};

		var isFirefoxOffered = !isFirefox;
		if (config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.isFirefoxOffered) {
			isFirefoxOffered = true;
		}

		localStreams.forEach(function (localStream) {
			if (config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.dontGetRemoteStream) {
				return;
			}

			if (config.dontAttachLocalStream) {
				return;
			}

			localStream = connection.beforeAddingStream(localStream);

			if (!localStream) return;

			if (getLocalStreams().forEach) {
				getLocalStreams().forEach(function (stream) {
					if (localStream && stream.id == localStream.id) {
						localStream = null;
					}
				});
			}

			if (localStream) {
				peer.addStream(localStream);
			}
		});

		peer.oniceconnectionstatechange = peer.onsignalingstatechange = function () {
			var extra = self.extra;
			if (connection.peers[self.userid]) {
				extra = connection.peers[self.userid].extra || extra;
			}

			if (!peer) {
				return;
			}

			config.onPeerStateChanged({
				iceConnectionState: peer.iceConnectionState,
				iceGatheringState: peer.iceGatheringState,
				signalingState: peer.signalingState,
				extra: extra,
				userid: self.userid
			});
		};

		var sdpConstraints = {
			OfferToReceiveAudio: !!localStreams.length,
			OfferToReceiveVideo: !!localStreams.length
		};

		if (config.localPeerSdpConstraints) sdpConstraints = config.localPeerSdpConstraints;

		defaults.sdpConstraints = setSdpConstraints(sdpConstraints);

		var remoteStreamAddEvent = 'addstream';
		if ('ontrack' in peer) {
			// temporarily disabled
			// remoteStreamAddEvent = 'track';
		}

		var streamObject;
		peer.addEventListener(remoteStreamAddEvent, function (event) {
			if (!event) return;
			if (event.streams && event.streams.length && !event.stream) {
				if (!streamObject) {
					streamObject = new MediaStream();
					return;
				}

				event.streams.forEach(function (stream) {
					if (stream.getVideoTracks().length) {
						streamObject.addTrack(stream.getVideoTracks()[0]);
					}
					if (stream.getAudioTracks().length) {
						streamObject.addTrack(stream.getAudioTracks()[0]);
					}
				});
				event.stream = streamObject;

				if (connection.session.audio && connection.session.video && (!streamObject.getVideoTracks().length || !streamObject.getAudioTracks().length)) {
					return;
				}

				streamObject = null;
			}

			var streamsToShare = {};
			if (config.remoteSdp && config.remoteSdp.streamsToShare) {
				streamsToShare = config.remoteSdp.streamsToShare;
			} else if (config.streamsToShare) {
				streamsToShare = config.streamsToShare;
			}

			var streamToShare = streamsToShare[event.stream.id];
			if (streamToShare) {
				event.stream.isAudio = streamToShare.isAudio;
				event.stream.isVideo = streamToShare.isVideo;
				event.stream.isScreen = streamToShare.isScreen;
			}
			event.stream.streamid = event.stream.id;
			if (!event.stream.stop) {
				event.stream.stop = function () {
					if (isFirefox) {
						var streamEndedEvent = 'ended';

						if ('oninactive' in event.stream) {
							streamEndedEvent = 'inactive';
						}
						fireEvent(event.stream, streamEndedEvent);
					}
				};
			}
			allRemoteStreams[event.stream.id] = event.stream;
			config.onRemoteStream(event.stream);
		}, false);

		peer.onremovestream = function (event) {
			event.stream.streamid = event.stream.id;

			if (allRemoteStreams[event.stream.id]) {
				delete allRemoteStreams[event.stream.id];
			}

			config.onRemoteStreamRemoved(event.stream);
		};

		this.addRemoteCandidate = function (remoteCandidate) {
			peer.addIceCandidate(new RTCIceCandidate(remoteCandidate));
		};

		this.addRemoteSdp = function (remoteSdp, cb) {
			remoteSdp.sdp = connection.processSdp(remoteSdp.sdp);
			peer.setRemoteDescription(new RTCSessionDescription(remoteSdp), cb || function () { }, function (error) {
				if (!!connection.enableLogs) {
					console.error(JSON.stringify(error, null, '\t'), '\n', remoteSdp.type, remoteSdp.sdp);
				}
			});
		};

		var isOfferer = true;

		if (config.remoteSdp) {
			isOfferer = false;
		}

		this.createDataChannel = function () {
			var channel = peer.createDataChannel('sctp', {});
			setChannelEvents(channel);
		};

		if (connection.session.data === true && !renegotiatingPeer) {
			if (!isOfferer) {
				peer.ondatachannel = function (event) {
					var channel = event.channel;
					setChannelEvents(channel);
				};
			} else {
				this.createDataChannel();
			}
		}

		if (config.remoteSdp) {
			if (config.remoteSdp.remotePeerSdpConstraints) {
				sdpConstraints = config.remoteSdp.remotePeerSdpConstraints;
			}
			defaults.sdpConstraints = setSdpConstraints(sdpConstraints);
			this.addRemoteSdp(config.remoteSdp, function () {
				createOfferOrAnswer('createAnswer');
			});
		}

		function setChannelEvents(channel) {
			// force ArrayBuffer in Firefox; which uses "Blob" by default.
			channel.binaryType = 'arraybuffer';

			channel.onmessage = function (event) {
				config.onDataChannelMessage(event.data);
			};

			channel.onopen = function () {
				config.onDataChannelOpened(channel);
			};

			channel.onerror = function (error) {
				config.onDataChannelError(error);
			};

			channel.onclose = function (event) {
				config.onDataChannelClosed(event);
			};

			channel.internalSend = channel.send;
			channel.send = function (data) {
				if (channel.readyState !== 'open') {
					return;
				}

				channel.internalSend(data);
			};

			peer.channel = channel;
		}

		if (connection.session.audio == 'two-way' || connection.session.video == 'two-way' || connection.session.screen == 'two-way') {
			defaults.sdpConstraints = setSdpConstraints({
				OfferToReceiveAudio: connection.session.audio == 'two-way' || (config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio),
				OfferToReceiveVideo: connection.session.video == 'two-way' || connection.session.screen == 'two-way' || (config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio)
			});
		}

		var streamsToShare = {};
		if (getLocalStreams().forEach) {
			getLocalStreams().forEach(function (stream) {
				streamsToShare[stream.streamid] = {
					isAudio: !!stream.isAudio,
					isVideo: !!stream.isVideo,
					isScreen: !!stream.isScreen
				};
			});
		}

		function createOfferOrAnswer(_method) {
			peer[_method](function (localSdp) {
				localSdp.sdp = connection.processSdp(localSdp.sdp);
				peer.setLocalDescription(localSdp, function () {
					if (!connection.trickleIce) return;
					config.onLocalSdp({
						type: localSdp.type,
						sdp: localSdp.sdp,
						remotePeerSdpConstraints: config.remotePeerSdpConstraints || false,
						renegotiatingPeer: !!config.renegotiatingPeer || false,
						connectionDescription: self.connectionDescription,
						dontGetRemoteStream: !!config.dontGetRemoteStream,
						extra: connection ? connection.extra : {},
						streamsToShare: streamsToShare,
						isFirefoxOffered: isFirefox
					});

					connection.onSettingLocalDescription(self);
				}, function (error) {
					if (!connection.enableLogs) return;
					console.error('setLocalDescription error', error);
				});
			}, function (error) {
				if (!!connection.enableLogs) {
					console.error('sdp-error', error);
				}
			}, defaults.sdpConstraints);
		}

		if (isOfferer) {
			createOfferOrAnswer('createOffer');
		}

		peer.nativeClose = peer.close;
		peer.close = function () {
			if (!peer) {
				return;
			}

			try {
				if (peer.iceConnectionState.search(/closed|failed/gi) === -1) {
					peer.getRemoteStreams().forEach(function (stream) {
						stream.stop();
					});
				}
				peer.nativeClose();
			} catch (e) { }

			peer = null;
			self.peer = null;
		};

		this.peer = peer;
	}

	// CodecsHandler.js

	var CodecsHandler = (function () {
		var isMobileDevice = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);
		if (typeof cordova !== 'undefined') {
			isMobileDevice = true;
		}

		if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Crosswalk') !== -1) {
			isMobileDevice = true;
		}

		// "removeVPX" and "removeNonG722" methods are taken from github/mozilla/webrtc-landing
		function removeVPX(sdp) {
			if (!sdp || typeof sdp !== 'string') {
				throw 'Invalid arguments.';
			}

			// this method is NOT reliable

			sdp = sdp.replace('a=rtpmap:100 VP8/90000\r\n', '');
			sdp = sdp.replace('a=rtpmap:101 VP9/90000\r\n', '');

			sdp = sdp.replace(/m=video ([0-9]+) RTP\/SAVPF ([0-9 ]*) 100/g, 'm=video $1 RTP\/SAVPF $2');
			sdp = sdp.replace(/m=video ([0-9]+) RTP\/SAVPF ([0-9 ]*) 101/g, 'm=video $1 RTP\/SAVPF $2');

			sdp = sdp.replace(/m=video ([0-9]+) RTP\/SAVPF 100([0-9 ]*)/g, 'm=video $1 RTP\/SAVPF$2');
			sdp = sdp.replace(/m=video ([0-9]+) RTP\/SAVPF 101([0-9 ]*)/g, 'm=video $1 RTP\/SAVPF$2');

			sdp = sdp.replace('a=rtcp-fb:120 nack\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:120 nack pli\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:120 ccm fir\r\n', '');

			sdp = sdp.replace('a=rtcp-fb:101 nack\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:101 nack pli\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:101 ccm fir\r\n', '');

			return sdp;
		}

		function disableNACK(sdp) {
			if (!sdp || typeof sdp !== 'string') {
				throw 'Invalid arguments.';
			}

			sdp = sdp.replace('a=rtcp-fb:126 nack\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:126 nack pli\r\n', 'a=rtcp-fb:126 pli\r\n');
			sdp = sdp.replace('a=rtcp-fb:97 nack\r\n', '');
			sdp = sdp.replace('a=rtcp-fb:97 nack pli\r\n', 'a=rtcp-fb:97 pli\r\n');

			return sdp;
		}

		function prioritize(codecMimeType, peer) {
			if (!peer || !peer.getSenders || !peer.getSenders().length) {
				return;
			}

			if (!codecMimeType || typeof codecMimeType !== 'string') {
				throw 'Invalid arguments.';
			}

			peer.getSenders().forEach(function (sender) {
				var params = sender.getParameters();
				for (var i = 0; i < params.codecs.length; i++) {
					if (params.codecs[i].mimeType == codecMimeType) {
						params.codecs.unshift(params.codecs.splice(i, 1));
						break;
					}
				}
				sender.setParameters(params);
			});
		}

		function removeNonG722(sdp) {
			return sdp.replace(/m=audio ([0-9]+) RTP\/SAVPF ([0-9 ]*)/g, 'm=audio $1 RTP\/SAVPF 9');
		}

		function setBAS(sdp, bandwidth, isScreen) {
			if (!bandwidth) {
				return sdp;
			}

			if (typeof isFirefox !== 'undefined' && isFirefox) {
				return sdp;
			}

			if (isMobileDevice) {
				return sdp;
			}

			if (isScreen) {
				if (!bandwidth.screen) {
					console.warn('It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.');
				} else if (bandwidth.screen < 300) {
					console.warn('It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.');
				}
			}

			// if screen; must use at least 300kbs
			if (bandwidth.screen && isScreen) {
				sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
				sdp = sdp.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + bandwidth.screen + '\r\n');
			}

			// remove existing bandwidth lines
			if (bandwidth.audio || bandwidth.video || bandwidth.data) {
				sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
			}

			if (bandwidth.audio) {
				sdp = sdp.replace(/a=mid:audio\r\n/g, 'a=mid:audio\r\nb=AS:' + bandwidth.audio + '\r\n');
			}

			if (bandwidth.video) {
				sdp = sdp.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + (isScreen ? bandwidth.screen : bandwidth.video) + '\r\n');
			}

			return sdp;
		}

		// Find the line in sdpLines that starts with |prefix|, and, if specified,
		// contains |substr| (case-insensitive search).
		function findLine(sdpLines, prefix, substr) {
			return findLineInRange(sdpLines, 0, -1, prefix, substr);
		}

		// Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
		// and, if specified, contains |substr| (case-insensitive search).
		function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
			var realEndLine = endLine !== -1 ? endLine : sdpLines.length;
			for (var i = startLine; i < realEndLine; ++i) {
				if (sdpLines[i].indexOf(prefix) === 0) {
					if (!substr ||
                        sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
						return i;
					}
				}
			}
			return null;
		}

		// Gets the codec payload type from an a=rtpmap:X line.
		function getCodecPayloadType(sdpLine) {
			var pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
			var result = sdpLine.match(pattern);
			return (result && result.length === 2) ? result[1] : null;
		}

		function setVideoBitrates(sdp, params) {
			if (isMobileDevice) {
				return sdp;
			}

			params = params || {};
			var xgoogle_min_bitrate = params.min;
			var xgoogle_max_bitrate = params.max;

			var sdpLines = sdp.split('\r\n');

			// VP8
			var vp8Index = findLine(sdpLines, 'a=rtpmap', 'VP8/90000');
			var vp8Payload;
			if (vp8Index) {
				vp8Payload = getCodecPayloadType(sdpLines[vp8Index]);
			}

			if (!vp8Payload) {
				return sdp;
			}

			var rtxIndex = findLine(sdpLines, 'a=rtpmap', 'rtx/90000');
			var rtxPayload;
			if (rtxIndex) {
				rtxPayload = getCodecPayloadType(sdpLines[rtxIndex]);
			}

			if (!rtxIndex) {
				return sdp;
			}

			var rtxFmtpLineIndex = findLine(sdpLines, 'a=fmtp:' + rtxPayload.toString());
			if (rtxFmtpLineIndex !== null) {
				var appendrtxNext = '\r\n';
				appendrtxNext += 'a=fmtp:' + vp8Payload + ' x-google-min-bitrate=' + (xgoogle_min_bitrate || '228') + '; x-google-max-bitrate=' + (xgoogle_max_bitrate || '228');
				sdpLines[rtxFmtpLineIndex] = sdpLines[rtxFmtpLineIndex].concat(appendrtxNext);
				sdp = sdpLines.join('\r\n');
			}

			return sdp;
		}

		function setOpusAttributes(sdp, params) {
			if (isMobileDevice) {
				return sdp;
			}

			params = params || {};

			var sdpLines = sdp.split('\r\n');

			// Opus
			var opusIndex = findLine(sdpLines, 'a=rtpmap', 'opus/48000');
			var opusPayload;
			if (opusIndex) {
				opusPayload = getCodecPayloadType(sdpLines[opusIndex]);
			}

			if (!opusPayload) {
				return sdp;
			}

			var opusFmtpLineIndex = findLine(sdpLines, 'a=fmtp:' + opusPayload.toString());
			if (opusFmtpLineIndex === null) {
				return sdp;
			}

			var appendOpusNext = '';
			appendOpusNext += '; stereo=' + (typeof params.stereo != 'undefined' ? params.stereo : '1');
			appendOpusNext += '; sprop-stereo=' + (typeof params['sprop-stereo'] != 'undefined' ? params['sprop-stereo'] : '1');

			if (typeof params.maxaveragebitrate != 'undefined') {
				appendOpusNext += '; maxaveragebitrate=' + (params.maxaveragebitrate || 128 * 1024 * 8);
			}

			if (typeof params.maxplaybackrate != 'undefined') {
				appendOpusNext += '; maxplaybackrate=' + (params.maxplaybackrate || 128 * 1024 * 8);
			}

			if (typeof params.cbr != 'undefined') {
				appendOpusNext += '; cbr=' + (typeof params.cbr != 'undefined' ? params.cbr : '1');
			}

			if (typeof params.useinbandfec != 'undefined') {
				appendOpusNext += '; useinbandfec=' + params.useinbandfec;
			}

			if (typeof params.usedtx != 'undefined') {
				appendOpusNext += '; usedtx=' + params.usedtx;
			}

			if (typeof params.maxptime != 'undefined') {
				appendOpusNext += '\r\na=maxptime:' + params.maxptime;
			}

			sdpLines[opusFmtpLineIndex] = sdpLines[opusFmtpLineIndex].concat(appendOpusNext);

			sdp = sdpLines.join('\r\n');
			return sdp;
		}

		function preferVP9(sdp) {
			if (sdp.indexOf('SAVPF 100 101') === -1 || sdp.indexOf('VP9/90000') === -1) {
				return sdp;
			}

			return sdp.replace('SAVPF 100 101', 'SAVPF 101 100');
		}

		// forceStereoAudio => via webrtcexample.com
		// requires getUserMedia => echoCancellation:false
		function forceStereoAudio(sdp) {
			var sdpLines = sdp.split('\r\n');
			var fmtpLineIndex = null;
			for (var i = 0; i < sdpLines.length; i++) {
				if (sdpLines[i].search('opus/48000') !== -1) {
					var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
					break;
				}
			}
			for (var i = 0; i < sdpLines.length; i++) {
				if (sdpLines[i].search('a=fmtp') !== -1) {
					var payload = extractSdp(sdpLines[i], /a=fmtp:(\d+)/);
					if (payload === opusPayload) {
						fmtpLineIndex = i;
						break;
					}
				}
			}
			if (fmtpLineIndex === null) return sdp;
			sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat('; stereo=1; sprop-stereo=1');
			sdp = sdpLines.join('\r\n');
			return sdp;
		}

		return {
			removeVPX: removeVPX,
			disableNACK: disableNACK,
			prioritize: prioritize,
			removeNonG722: removeNonG722,
			setApplicationSpecificBandwidth: function (sdp, bandwidth, isScreen) {
				return setBAS(sdp, bandwidth, isScreen);
			},
			setVideoBitrates: function (sdp, params) {
				return setVideoBitrates(sdp, params);
			},
			setOpusAttributes: function (sdp, params) {
				return setOpusAttributes(sdp, params);
			},
			preferVP9: preferVP9,
			forceStereoAudio: forceStereoAudio
		};
	})();

	// backward compatibility
	window.BandwidthHandler = CodecsHandler;

	// OnIceCandidateHandler.js

	var OnIceCandidateHandler = (function () {
		function processCandidates(connection, icePair) {
			var candidate = icePair.candidate;

			var iceRestrictions = connection.candidates;
			var stun = iceRestrictions.stun;
			var turn = iceRestrictions.turn;

			if (!isNull(iceRestrictions.reflexive)) {
				stun = iceRestrictions.reflexive;
			}

			if (!isNull(iceRestrictions.relay)) {
				turn = iceRestrictions.relay;
			}

			if (!iceRestrictions.host && !!candidate.match(/typ host/g)) {
				return;
			}

			if (!turn && !!candidate.match(/typ relay/g)) {
				return;
			}

			if (!stun && !!candidate.match(/typ srflx/g)) {
				return;
			}

			var protocol = connection.iceProtocols;

			if (!protocol.udp && !!candidate.match(/ udp /g)) {
				return;
			}

			if (!protocol.tcp && !!candidate.match(/ tcp /g)) {
				return;
			}

			if (connection.enableLogs) {
				console.debug('Your candidate pairs:', candidate);
			}

			return {
				candidate: candidate,
				sdpMid: icePair.sdpMid,
				sdpMLineIndex: icePair.sdpMLineIndex
			};
		}

		return {
			processCandidates: processCandidates
		};
	})();

	// IceServersHandler.js

	var iceFrame, loadedIceFrame;

	function loadIceFrame(callback, skip) {
		if (loadedIceFrame) return;
		if (!skip) return loadIceFrame(callback, true);

		loadedIceFrame = true;

		var iframe = document.createElement('iframe');
		iframe.onload = function () {
			iframe.isLoaded = true;

			listenEventHandler('message', iFrameLoaderCallback);

			function iFrameLoaderCallback(event) {
				if (!event.data || !event.data.iceServers) return;
				callback(event.data.iceServers);
				window.removeEventListener('message', iFrameLoaderCallback);
			}

			iframe.contentWindow.postMessage('get-ice-servers', '*');
		};
		iframe.src = 'https://cdn.webrtc-experiment.com/getIceServers/';
		iframe.style.display = 'none';
		(document.body || document.documentElement).appendChild(iframe);
	}

	if (typeof window.getExternalIceServers !== 'undefined' && window.getExternalIceServers == true) {
		loadIceFrame(function (externalIceServers) {
			if (!externalIceServers || !externalIceServers.length) return;
			window.RMCExternalIceServers = externalIceServers;

			if (window.iceServersLoadCallback && typeof window.iceServersLoadCallback === 'function') {
				window.iceServersLoadCallback(externalIceServers);
			}
		});
	}

	function getSTUNObj(stunStr) {
		var urlsParam = 'urls';
		if (isPluginRTC) {
			urlsParam = 'url';
		}

		var obj = {};
		obj[urlsParam] = stunStr;
		return obj;
	}

	function getTURNObj(turnStr, username, credential) {
		var urlsParam = 'urls';
		if (isPluginRTC) {
			urlsParam = 'url';
		}

		var obj = {
			username: username,
			credential: credential
		};
		obj[urlsParam] = turnStr;
		return obj;
	}

	function getExtenralIceFormatted() {
		var iceServers = [];
		window.RMCExternalIceServers.forEach(function (ice) {
			if (!ice.urls) {
				ice.urls = ice.url;
			}

			if (ice.urls.search('stun|stuns') !== -1) {
				iceServers.push(getSTUNObj(ice.urls));
			}

			if (ice.urls.search('turn|turns') !== -1) {
				iceServers.push(getTURNObj(ice.urls, ice.username, ice.credential));
			}
		});
		return iceServers;
	}

	var IceServersHandler = (function () {
		function getIceServers(connection) {
			var iceServers = [];

			iceServers.push(getSTUNObj('stun:stun.l.google.com:19302'));

			iceServers.push(getTURNObj('stun:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
			iceServers.push(getTURNObj('turn:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
			iceServers.push(getTURNObj('turn:webrtcweb.com:8877', 'muazkh', 'muazkh')); // coTURN

			iceServers.push(getTURNObj('turns:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
			iceServers.push(getTURNObj('turns:webrtcweb.com:8877', 'muazkh', 'muazkh')); // coTURN

			// iceServers.push(getTURNObj('turn:webrtcweb.com:3344', 'muazkh', 'muazkh')); // resiprocate
			// iceServers.push(getTURNObj('turn:webrtcweb.com:4433', 'muazkh', 'muazkh')); // resiprocate

			iceServers.push(getTURNObj('stun:webrtcweb.com:4455', 'muazkh', 'muazkh')); // restund
			iceServers.push(getTURNObj('turn:webrtcweb.com:4455', 'muazkh', 'muazkh')); // restund
			iceServers.push(getTURNObj('turn:webrtcweb.com:5544?transport=tcp', 'muazkh', 'muazkh')); // restund

			if (window.RMCExternalIceServers) {
				iceServers = iceServers.concat(getExtenralIceFormatted());
			} else if (typeof window.getExternalIceServers !== 'undefined' && window.getExternalIceServers == true) {
				connection.iceServers = iceServers;
				window.iceServersLoadCallback = function () {
					connection.iceServers = connection.iceServers.concat(getExtenralIceFormatted());
				};
			}

			return iceServers;
		}

		return {
			getIceServers: getIceServers
		};
	})();

	// getUserMediaHandler.js

	function setStreamType(constraints, stream) {
		if (constraints.mandatory && constraints.mandatory.chromeMediaSource) {
			stream.isScreen = true;
		} else if (constraints.mozMediaSource || constraints.mediaSource) {
			stream.isScreen = true;
		} else if (constraints.video) {
			stream.isVideo = true;
		} else if (constraints.audio) {
			stream.isAudio = true;
		}
	}

	// allow users to manage this object (to support re-capturing of screen/etc.)
	window.currentUserMediaRequest = {
		streams: [],
		mutex: false,
		queueRequests: [],
		remove: function (idInstance) {
			this.mutex = false;

			var stream = this.streams[idInstance];
			if (!stream) {
				return;
			}

			stream = stream.stream;

			var options = stream.currentUserMediaRequestOptions;

			if (this.queueRequests.indexOf(options)) {
				delete this.queueRequests[this.queueRequests.indexOf(options)];
				this.queueRequests = removeNullEntries(this.queueRequests);
			}

			this.streams[idInstance].stream = null;
			delete this.streams[idInstance];
		}
	};

	function getUserMediaHandler(options) {
		if (currentUserMediaRequest.mutex === true) {
			currentUserMediaRequest.queueRequests.push(options);
			return;
		}
		currentUserMediaRequest.mutex = true;

		// easy way to match
		var idInstance = JSON.stringify(options.localMediaConstraints);

		function streaming(stream, returnBack) {
			setStreamType(options.localMediaConstraints, stream);
			options.onGettingLocalMedia(stream, returnBack);

			var streamEndedEvent = 'ended';

			if ('oninactive' in stream) {
				streamEndedEvent = 'inactive';
			}
			stream.addEventListener(streamEndedEvent, function () {
				delete currentUserMediaRequest.streams[idInstance];

				currentUserMediaRequest.mutex = false;
				if (currentUserMediaRequest.queueRequests.indexOf(options)) {
					delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(options)];
					currentUserMediaRequest.queueRequests = removeNullEntries(currentUserMediaRequest.queueRequests);
				}
			}, false);

			currentUserMediaRequest.streams[idInstance] = {
				stream: stream
			};
			currentUserMediaRequest.mutex = false;

			if (currentUserMediaRequest.queueRequests.length) {
				getUserMediaHandler(currentUserMediaRequest.queueRequests.shift());
			}
		}

		if (currentUserMediaRequest.streams[idInstance]) {
			streaming(currentUserMediaRequest.streams[idInstance].stream, true);
		} else {
			if (isPluginRTC && window.PluginRTC) {
				var mediaElement = document.createElement('video');
				window.PluginRTC.getUserMedia({
					audio: true,
					video: true
				}, function (stream) {
					stream.streamid = stream.id || getRandomString();
					streaming(stream);
				}, function (error) { });

				return;
			}

			var isBlackBerry = !!(/BB10|BlackBerry/i.test(navigator.userAgent || ''));
			if (isBlackBerry || typeof navigator.mediaDevices === 'undefined' || typeof navigator.mediaDevices.getUserMedia !== 'function') {
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				navigator.getUserMedia(options.localMediaConstraints, function (stream) {
					stream.streamid = stream.streamid || stream.id || getRandomString();
					stream.idInstance = idInstance;
					streaming(stream);
				}, function (error) {
					options.onLocalMediaError(error, options.localMediaConstraints);
				});
				return;
			}

			navigator.mediaDevices.getUserMedia(options.localMediaConstraints).then(function (stream) {
				stream.streamid = stream.streamid || stream.id || getRandomString();
				stream.idInstance = idInstance;
				streaming(stream);
			}).catch(function (error) {
				options.onLocalMediaError(error, options.localMediaConstraints);
			});
		}
	}

	// StreamsHandler.js

	var StreamsHandler = (function () {
		function handleType(type) {
			if (!type) {
				return;
			}

			if (typeof type === 'string' || typeof type === 'undefined') {
				return type;
			}

			if (type.audio && type.video) {
				return null;
			}

			if (type.audio) {
				return 'audio';
			}

			if (type.video) {
				return 'video';
			}

			return;
		}

		function setHandlers(stream, syncAction, connection) {
			if (!stream || !stream.addEventListener) return;

			if (typeof syncAction == 'undefined' || syncAction == true) {
				var streamEndedEvent = 'ended';

				if ('oninactive' in stream) {
					streamEndedEvent = 'inactive';
				}

				stream.addEventListener(streamEndedEvent, function () {
					StreamsHandler.onSyncNeeded(this.streamid, streamEndedEvent);
				}, false);
			}

			stream.mute = function (type, isSyncAction) {
				type = handleType(type);

				if (typeof isSyncAction !== 'undefined') {
					syncAction = isSyncAction;
				}

				if (typeof type == 'undefined' || type == 'audio') {
					stream.getAudioTracks().forEach(function (track) {
						track.enabled = false;
						connection.streamEvents[stream.streamid].isAudioMuted = true;
					});
				}

				if (typeof type == 'undefined' || type == 'video') {
					stream.getVideoTracks().forEach(function (track) {
						track.enabled = false;
					});
				}

				if (typeof syncAction == 'undefined' || syncAction == true) {
					StreamsHandler.onSyncNeeded(stream.streamid, 'mute', type);
				}

				connection.streamEvents[stream.streamid].muteType = type || 'both';

				fireEvent(stream, 'mute', type);
			};

			stream.unmute = function (type, isSyncAction) {
				type = handleType(type);

				if (typeof isSyncAction !== 'undefined') {
					syncAction = isSyncAction;
				}

				graduallyIncreaseVolume();

				if (typeof type == 'undefined' || type == 'audio') {
					stream.getAudioTracks().forEach(function (track) {
						track.enabled = true;
						connection.streamEvents[stream.streamid].isAudioMuted = false;
					});
				}

				if (typeof type == 'undefined' || type == 'video') {
					stream.getVideoTracks().forEach(function (track) {
						track.enabled = true;
					});

					// make sure that video unmute doesn't affects audio
					if (typeof type !== 'undefined' && type == 'video' && connection.streamEvents[stream.streamid].isAudioMuted) {
						(function looper(times) {
							if (!times) {
								times = 0;
							}

							times++;

							// check until five-seconds
							if (times < 100 && connection.streamEvents[stream.streamid].isAudioMuted) {
								stream.mute('audio');

								setTimeout(function () {
									looper(times);
								}, 50);
							}
						})();
					}
				}

				if (typeof syncAction == 'undefined' || syncAction == true) {
					StreamsHandler.onSyncNeeded(stream.streamid, 'unmute', type);
				}

				connection.streamEvents[stream.streamid].unmuteType = type || 'both';

				fireEvent(stream, 'unmute', type);
			};

			function graduallyIncreaseVolume() {
				if (!connection.streamEvents[stream.streamid].mediaElement) {
					return;
				}

				var mediaElement = connection.streamEvents[stream.streamid].mediaElement;
				mediaElement.volume = 0;
				afterEach(200, 5, function () {
					try {
						mediaElement.volume += .20;
					} catch (e) {
						mediaElement.volume = 1;
					}
				});
			}
		}

		function afterEach(setTimeoutInteval, numberOfTimes, callback, startedTimes) {
			startedTimes = (startedTimes || 0) + 1;
			if (startedTimes >= numberOfTimes) return;

			setTimeout(function () {
				callback();
				afterEach(setTimeoutInteval, numberOfTimes, callback, startedTimes);
			}, setTimeoutInteval);
		}

		return {
			setHandlers: setHandlers,
			onSyncNeeded: function (streamid, action, type) { }
		};
	})();

	// Last time updated at Nov 07, 2016, 08:32:23

	// Latest file can be found here: https://cdn.webrtc-experiment.com/Screen-Capturing.js

	// Muaz Khan     - www.MuazKhan.com
	// MIT License   - www.WebRTC-Experiment.com/licence
	// Documentation - https://github.com/muaz-khan/Chrome-Extensions/tree/master/Screen-Capturing.js
	// Demo          - https://www.webrtc-experiment.com/Screen-Capturing/

	// ___________________
	// Screen-Capturing.js

	// Listen for postMessage handler
	// postMessage is used to exchange "sourceId" between chrome extension and you webpage.
	// though, there are tons other options as well, e.g. XHR-signaling, websockets, etc.
	window.addEventListener('message', function (event) {
		if (event.origin != window.location.origin) {
			return;
		}

		onMessageCallback(event.data);
	});

	// via: https://bugs.chromium.org/p/chromium/issues/detail?id=487935#c17
	// you can capture screen on Android Chrome >= 55 with flag: "Experimental ScreenCapture android"
	window.IsAndroidChrome = false;
	try {
		if (navigator.userAgent.toLowerCase().indexOf("android") > -1 && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
			window.IsAndroidChrome = true;
		}
	} catch (e) { }

	// and the function that handles received messages

	function onMessageCallback(data) {
		// "cancel" button is clicked
		if (data == 'PermissionDeniedError') {
			chromeMediaSource = 'PermissionDeniedError';
			if (screenCallback) {
				return screenCallback('PermissionDeniedError');
			} else {
				throw new Error('PermissionDeniedError: User rejected to share his screen.');
			}
		}

		// extension notified his presence
		if (data == 'rtcmulticonnection-extension-loaded') {
			chromeMediaSource = 'desktop';
		}

		// extension shared temp sourceId
		if (data.sourceId && screenCallback) {
			sourceId = data.sourceId;
			screenCallback(sourceId);
		}
	}

	// global variables
	var chromeMediaSource = 'screen';
	var sourceId;
	var screenCallback;

	// this method can be used to check if chrome extension is installed & enabled.
	function isChromeExtensionAvailable(callback) {
		if (!callback) return;

		if (isFirefox) return isFirefoxExtensionAvailable(callback);

		if (window.IsAndroidChrome) {
			chromeMediaSource = 'screen';
			callback(true);
			return;
		}

		if (chromeMediaSource == 'desktop') {
			callback(true);
			return;
		}

		// ask extension if it is available
		window.postMessage('are-you-there', '*');

		setTimeout(function () {
			if (chromeMediaSource == 'screen') {
				callback(false);
			} else callback(true);
		}, 2000);
	}

	function isFirefoxExtensionAvailable(callback) {
		if (!callback) return;

		if (!isFirefox) return isChromeExtensionAvailable(callback);

		var isFirefoxAddonResponded = false;

		function messageCallback(event) {
			var addonMessage = event.data;

			if (!addonMessage || typeof addonMessage.isScreenCapturingEnabled === 'undefined') return;

			isFirefoxAddonResponded = true;

			if (addonMessage.isScreenCapturingEnabled === true) {
				callback(true);
			} else {
				callback(false);
			}

			window.removeEventListener("message", messageCallback, false);
		}

		window.addEventListener("message", messageCallback, false);

		window.postMessage({
			checkIfScreenCapturingEnabled: true,
			domains: [document.domain]
		}, "*");

		setTimeout(function () {
			if (!isFirefoxAddonResponded) {
				callback(true); // can be old firefox extension
			}
		}, 2000); // wait 2-seconds-- todo: is this enough limit?
	}

	// this function can be used to get "source-id" from the extension
	function getSourceId(callback, audioPlusTab) {
		if (!callback) throw '"callback" parameter is mandatory.';
		if (sourceId) {
			callback(sourceId);
			sourceId = null;
			return;
		}

		screenCallback = callback;

		if (!!audioPlusTab) {
			window.postMessage('audio-plus-tab', '*');
			return;
		}
		window.postMessage('get-sourceId', '*');
	}

	function getChromeExtensionStatus(extensionid, callback) {
		if (window.IsAndroidChrome) {
			chromeMediaSource = 'screen';
			callback('installed-enabled');
			return;
		}

		if (arguments.length != 2) {
			callback = extensionid;
			extensionid = window.RMCExtensionID || 'ajhifddimkapgcifgcodmmfdlknahffk'; // default extension-id
		}

		if (isFirefox) return callback('not-chrome');

		var image = document.createElement('img');
		image.src = 'chrome-extension://' + extensionid + '/icon.png';
		image.onload = function () {
			sourceId = null;
			chromeMediaSource = 'screen';
			window.postMessage('are-you-there', '*');
			setTimeout(function () {
				if (chromeMediaSource == 'screen') {
					callback(extensionid == extensionid ? 'installed-enabled' : 'installed-disabled');
				} else callback('installed-enabled');
			}, 2000);
		};
		image.onerror = function () {
			callback('not-installed');
		};
	}

	// this function explains how to use above methods/objects
	function getScreenConstraints(callback, audioPlusTab) {
		var firefoxScreenConstraints = {
			mozMediaSource: 'window',
			mediaSource: 'window',
			width: 29999,
			height: 8640
		};

		if (isFirefox) return callback(null, firefoxScreenConstraints);

		// support recapture again & again
		sourceId = null;

		isChromeExtensionAvailable(function (isAvailable) {
			// this statement defines getUserMedia constraints
			// that will be used to capture content of screen
			var screen_constraints = {
				mandatory: {
					chromeMediaSource: chromeMediaSource,
					maxWidth: 8,
					maxHeight: 6,
					minFrameRate: 20,
					maxFrameRate: 30,
					minAspectRatio: 1.77 // 2.39
				},
				optional: []
			};

			if (window.IsAndroidChrome) {
				// now invoking native getUserMedia API
				callback(null, screen_constraints);
				return;
			}

			// this statement verifies chrome extension availability
			// if installed and available then it will invoke extension API
			// otherwise it will fallback to command-line based screen capturing API
			if (chromeMediaSource == 'desktop' && !sourceId) {
				getSourceId(function () {
					screen_constraints.mandatory.chromeMediaSourceId = sourceId;
					callback(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
					sourceId = null;
				}, audioPlusTab);
				return;
			}

			// this statement sets gets 'sourceId" and sets "chromeMediaSourceId"
			if (chromeMediaSource == 'desktop') {
				screen_constraints.mandatory.chromeMediaSourceId = sourceId;
			}

			sourceId = null;
			chromeMediaSource = 'screen'; // maybe this line is redundant?
			screenCallback = null;

			// now invoking native getUserMedia API
			callback(null, screen_constraints);
		});
	}

	// TextReceiver.js & TextSender.js

	function TextReceiver(connection) {
		var content = {};

		function receive(data, userid, extra) {
			// uuid is used to uniquely identify sending instance
			var uuid = data.uuid;
			if (!content[uuid]) {
				content[uuid] = [];
			}

			content[uuid].push(data.message);

			if (data.last) {
				var message = content[uuid].join('');
				if (data.isobject) {
					message = JSON.parse(message);
				}

				// latency detection
				var receivingTime = new Date().getTime();
				var latency = receivingTime - data.sendingTime;

				var e = {
					data: message,
					userid: userid,
					extra: extra,
					latency: latency
				};

				if (connection.autoTranslateText) {
					e.original = e.data;
					connection.Translator.TranslateText(e.data, function (translatedText) {
						e.data = translatedText;
						connection.onmessage(e);
					});
				} else {
					connection.onmessage(e);
				}

				delete content[uuid];
			}
		}

		return {
			receive: receive
		};
	}

	// TextSender.js
	var TextSender = {
		send: function (config) {
			var connection = config.connection;

			var channel = config.channel,
                remoteUserId = config.remoteUserId,
                initialText = config.text,
                packetSize = connection.chunkSize || 1000,
                textToTransfer = '',
                isobject = false;

			if (!isString(initialText)) {
				isobject = true;
				initialText = JSON.stringify(initialText);
			}

			// uuid is used to uniquely identify sending instance
			var uuid = getRandomString();
			var sendingTime = new Date().getTime();

			sendText(initialText);

			function sendText(textMessage, text) {
				var data = {
					type: 'text',
					uuid: uuid,
					sendingTime: sendingTime
				};

				if (textMessage) {
					text = textMessage;
					data.packets = parseInt(text.length / packetSize);
				}

				if (text.length > packetSize) {
					data.message = text.slice(0, packetSize);
				} else {
					data.message = text;
					data.last = true;
					data.isobject = isobject;
				}

				channel.send(data, remoteUserId);

				textToTransfer = text.slice(data.message.length);

				if (textToTransfer.length) {
					setTimeout(function () {
						sendText(null, textToTransfer);
					}, connection.chunkInterval || 100);
				}
			}
		}
	};

	// FileProgressBarHandler.js

	var FileProgressBarHandler = (function () {
		function handle(connection) {
			var progressHelper = {};

			// www.RTCMultiConnection.org/docs/onFileStart/
			connection.onFileStart = function (file) {
				var div = document.createElement('div');
				div.title = file.name;
				div.innerHTML = '<label>0%</label> <progress></progress>';

				if (file.remoteUserId) {
					div.innerHTML += ' (Sharing with:' + file.remoteUserId + ')';
				}

				if (!connection.filesContainer) {
					connection.filesContainer = document.body || document.documentElement;
				}

				connection.filesContainer.insertBefore(div, connection.filesContainer.firstChild);

				if (!file.remoteUserId) {
					progressHelper[file.uuid] = {
						div: div,
						progress: div.querySelector('progress'),
						label: div.querySelector('label')
					};
					progressHelper[file.uuid].progress.max = file.maxChunks;
					return;
				}

				if (!progressHelper[file.uuid]) {
					progressHelper[file.uuid] = {};
				}

				progressHelper[file.uuid][file.remoteUserId] = {
					div: div,
					progress: div.querySelector('progress'),
					label: div.querySelector('label')
				};
				progressHelper[file.uuid][file.remoteUserId].progress.max = file.maxChunks;
			};

			// www.RTCMultiConnection.org/docs/onFileProgress/
			connection.onFileProgress = function (chunk) {
				var helper = progressHelper[chunk.uuid];
				if (!helper) {
					return;
				}
				if (chunk.remoteUserId) {
					helper = progressHelper[chunk.uuid][chunk.remoteUserId];
					if (!helper) {
						return;
					}
				}

				helper.progress.value = chunk.currentPosition || chunk.maxChunks || helper.progress.max;
				updateLabel(helper.progress, helper.label);
			};

			// www.RTCMultiConnection.org/docs/onFileEnd/
			connection.onFileEnd = function (file) {
				var helper = progressHelper[file.uuid];
				if (!helper) {
					console.error('No such progress-helper element exists.', file);
					return;
				}

				if (file.remoteUserId) {
					helper = progressHelper[file.uuid][file.remoteUserId];
					if (!helper) {
						return;
					}
				}

				var div = helper.div;
				if (file.type.indexOf('image') != -1) {
					div.innerHTML = '<a href="' + file.url + '" download="' + file.name + '">Download <strong style="color:red;">' + file.name + '</strong> </a><br /><img src="' + file.url + '" title="' + file.name + '" style="max-width: 80%;">';
				} else {
					div.innerHTML = '<a href="' + file.url + '" download="' + file.name + '">Download <strong style="color:red;">' + file.name + '</strong> </a><br /><iframe src="' + file.url + '" title="' + file.name + '" style="width: 80%;border: 0;height: inherit;margin-top:1em;"></iframe>';
				}
			};

			function updateLabel(progress, label) {
				if (progress.position === -1) {
					return;
				}

				var position = +progress.position.toFixed(2).split('.')[1] || 100;
				label.innerHTML = position + '%';
			}
		}

		return {
			handle: handle
		};
	})();

	// TranslationHandler.js

	var TranslationHandler = (function () {
		function handle(connection) {
			connection.autoTranslateText = false;
			connection.language = 'en';
			connection.googKey = 'AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE';

			// www.RTCMultiConnection.org/docs/Translator/
			connection.Translator = {
				TranslateText: function (text, callback) {
					// if(location.protocol === 'https:') return callback(text);

					var newScript = document.createElement('script');
					newScript.type = 'text/javascript';

					var sourceText = encodeURIComponent(text); // escape

					var randomNumber = 'method' + connection.token();
					window[randomNumber] = function (response) {
						if (response.data && response.data.translations[0] && callback) {
							callback(response.data.translations[0].translatedText);
						}

						if (response.error && response.error.message === 'Daily Limit Exceeded') {
							warn('Text translation failed. Error message: "Daily Limit Exceeded."');

							// returning original text
							callback(text);
						}
					};

					var source = 'https://www.googleapis.com/language/translate/v2?key=' + connection.googKey + '&target=' + (connection.language || 'en-US') + '&callback=window.' + randomNumber + '&q=' + sourceText;
					newScript.src = source;
					document.getElementsByTagName('head')[0].appendChild(newScript);
				}
			};
		}

		return {
			handle: handle
		};
	})();

	window.RTCMultiConnection = RTCMultiConnection;
})();


//********************************************************************************************************************************************

// Last time updated: 2016-11-04 7:11:11 AM UTC

// ________________
// FileBufferReader

// Open-Sourced: https://github.com/muaz-khan/FileBufferReader

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

'use strict';

(function () {

	function FileBufferReader() {
		var fbr = this;
		var fbrHelper = new FileBufferReaderHelper();

		fbr.chunks = {};
		fbr.users = {};

		fbr.readAsArrayBuffer = function (file, callback, extra) {
			var options = {
				file: file,
				earlyCallback: function (chunk) {
					callback(fbrClone(chunk, {
						currentPosition: -1
					}));
				},
				extra: extra || {
					userid: 0
				}
			};

			fbrHelper.readAsArrayBuffer(fbr, options);
		};

		fbr.getNextChunk = function (fileUUID, callback, userid) {
			var currentPosition;

			if (typeof fileUUID.currentPosition !== 'undefined') {
				currentPosition = fileUUID.currentPosition;
				fileUUID = fileUUID.uuid;
			}

			var allFileChunks = fbr.chunks[fileUUID];
			if (!allFileChunks) {
				return;
			}

			if (typeof userid !== 'undefined') {
				if (!fbr.users[userid + '']) {
					fbr.users[userid + ''] = {
						fileUUID: fileUUID,
						userid: userid,
						currentPosition: -1
					};
				}

				if (typeof currentPosition !== 'undefined') {
					fbr.users[userid + ''].currentPosition = currentPosition;
				}

				fbr.users[userid + ''].currentPosition++;
				currentPosition = fbr.users[userid + ''].currentPosition;
			} else {
				if (typeof currentPosition !== 'undefined') {
					fbr.chunks[fileUUID].currentPosition = currentPosition;
				}

				fbr.chunks[fileUUID].currentPosition++;
				currentPosition = fbr.chunks[fileUUID].currentPosition;
			}

			var nextChunk = allFileChunks[currentPosition];
			if (!nextChunk) {
				delete fbr.chunks[fileUUID];
				fbr.convertToArrayBuffer({
					chunkMissing: true,
					currentPosition: currentPosition,
					uuid: fileUUID
				}, callback);
				return;
			}

			nextChunk = fbrClone(nextChunk);

			if (typeof userid !== 'undefined') {
				nextChunk.remoteUserId = userid + '';
			}

			if (!!nextChunk.start) {
				fbr.onBegin(nextChunk);
			}

			if (!!nextChunk.end) {
				fbr.onEnd(nextChunk);
			}

			fbr.onProgress(nextChunk);

			fbr.convertToArrayBuffer(nextChunk, function (buffer) {
				if (nextChunk.currentPosition == nextChunk.maxChunks) {
					callback(buffer, true);
					return;
				}

				callback(buffer, false);
			});
		};

		var fbReceiver = new FileBufferReceiver(fbr);

		fbr.addChunk = function (chunk, callback) {
			if (!chunk) {
				return;
			}

			fbReceiver.receive(chunk, function (chunk) {
				fbr.convertToArrayBuffer({
					readyForNextChunk: true,
					currentPosition: chunk.currentPosition,
					uuid: chunk.uuid
				}, callback);
			});
		};

		fbr.chunkMissing = function (chunk) {
			delete fbReceiver.chunks[chunk.uuid];
			delete fbReceiver.chunksWaiters[chunk.uuid];
		};

		fbr.onBegin = function () { };
		fbr.onEnd = function () { };
		fbr.onProgress = function () { };

		fbr.convertToObject = FileConverter.ConvertToObject;
		fbr.convertToArrayBuffer = FileConverter.ConvertToArrayBuffer

		// for backward compatibility----it is redundant.
		fbr.setMultipleUsers = function () { };

		// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
		function fbrClone(from, to) {
			if (from == null || typeof from != "object") return from;
			if (from.constructor != Object && from.constructor != Array) return from;
			if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
                from.constructor == String || from.constructor == Number || from.constructor == Boolean)
				return new from.constructor(from);

			to = to || new from.constructor();

			for (var name in from) {
				to[name] = typeof to[name] == "undefined" ? fbrClone(from[name], null) : to[name];
			}

			return to;
		}
	}

	function FileBufferReaderHelper() {
		var fbrHelper = this;

		function processInWebWorker(_function) {
			var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
			], {
				type: 'application/javascript'
			}));

			var worker = new Worker(blob);
			return worker;
		}

		fbrHelper.readAsArrayBuffer = function (fbr, options) {
			var earlyCallback = options.earlyCallback;
			delete options.earlyCallback;

			function processChunk(chunk) {
				if (!fbr.chunks[chunk.uuid]) {
					fbr.chunks[chunk.uuid] = {
						currentPosition: -1
					};
				}

				options.extra = options.extra || {
					userid: 0
				};

				chunk.userid = options.userid || options.extra.userid || 0;
				chunk.extra = options.extra;

				fbr.chunks[chunk.uuid][chunk.currentPosition] = chunk;

				if (chunk.end && earlyCallback) {
					earlyCallback(chunk.uuid);
					earlyCallback = null;
				}

				// for huge files
				if ((chunk.maxChunks > 200 && chunk.currentPosition == 200) && earlyCallback) {
					earlyCallback(chunk.uuid);
					earlyCallback = null;
				}
			}
			if (false && typeof Worker !== 'undefined') {
				var webWorker = processInWebWorker(fileReaderWrapper);

				webWorker.onmessage = function (event) {
					processChunk(event.data);
				};

				webWorker.postMessage(options);
			} else {
				fileReaderWrapper(options, processChunk);
			}
		};

		function fileReaderWrapper(options, callback) {
			callback = callback || function (chunk) {
				postMessage(chunk);
			};

			var file = options.file;
			if (!file.uuid) {
				file.uuid = (Math.random() * 100).toString().replace(/\./g, '');
			}

			var chunkSize = options.chunkSize || 15 * 1000;
			if (options.extra && options.extra.chunkSize) {
				chunkSize = options.extra.chunkSize;
			}

			var sliceId = 0;
			var cacheSize = chunkSize;

			var chunksPerSlice = Math.floor(Math.min(100000000, cacheSize) / chunkSize);
			var sliceSize = chunksPerSlice * chunkSize;
			var maxChunks = Math.ceil(file.size / chunkSize);

			file.maxChunks = maxChunks;

			var numOfChunksInSlice;
			var currentPosition = 0;
			var hasEntireFile;
			var chunks = [];

			callback({
				currentPosition: currentPosition,
				uuid: file.uuid,
				maxChunks: maxChunks,
				size: file.size,
				name: file.name,
				type: file.type,
				lastModifiedDate: file.lastModifiedDate.toString(),
				start: true
			});

			var blob, reader = new FileReader();

			reader.onloadend = function (evt) {
				if (evt.target.readyState == FileReader.DONE) {
					addChunks(file.name, evt.target.result, function () {
						sliceId++;
						if ((sliceId + 1) * sliceSize < file.size) {
							blob = file.slice(sliceId * sliceSize, (sliceId + 1) * sliceSize);
							reader.readAsArrayBuffer(blob);
						} else if (sliceId * sliceSize < file.size) {
							blob = file.slice(sliceId * sliceSize, file.size);
							reader.readAsArrayBuffer(blob);
						} else {
							file.url = URL.createObjectURL(file);
							callback({
								currentPosition: currentPosition,
								uuid: file.uuid,
								maxChunks: maxChunks,
								size: file.size,
								name: file.name,
								lastModifiedDate: file.lastModifiedDate.toString(),
								url: URL.createObjectURL(file),
								type: file.type,
								end: true
							});
						}
					});
				}
			};

			currentPosition += 1;

			blob = file.slice(sliceId * sliceSize, (sliceId + 1) * sliceSize);
			reader.readAsArrayBuffer(blob);

			function addChunks(fileName, binarySlice, addChunkCallback) {
				numOfChunksInSlice = Math.ceil(binarySlice.byteLength / chunkSize);
				for (var i = 0; i < numOfChunksInSlice; i++) {
					var start = i * chunkSize;
					chunks[currentPosition] = binarySlice.slice(start, Math.min(start + chunkSize, binarySlice.byteLength));

					callback({
						uuid: file.uuid,
						buffer: chunks[currentPosition],
						currentPosition: currentPosition,
						maxChunks: maxChunks,

						size: file.size,
						name: file.name,
						lastModifiedDate: file.lastModifiedDate.toString(),
						type: file.type
					});

					currentPosition++;
				}

				if (currentPosition == maxChunks) {
					hasEntireFile = true;
				}

				addChunkCallback();
			}
		}
	}

	function FileSelector() {
		var selector = this;

		selector.selectSingleFile = selectFile;
		selector.selectMultipleFiles = function (callback) {
			selectFile(callback, true);
		};

		selector.accept = '*.*';

		function selectFile(callback, multiple) {
			var file = document.createElement('input');
			file.type = 'file';

			if (multiple) {
				file.multiple = true;
			}

			file.accept = selector.accept;

			file.onchange = function () {
				if (multiple) {
					if (!file.files.length) {
						console.error('No file selected.');
						return;
					}
					callback(file.files);
					return;
				}

				if (!file.files[0]) {
					console.error('No file selected.');
					return;
				}

				callback(file.files[0]);

				file.parentNode.removeChild(file);
			};
			file.style.display = 'none';
			(document.body || document.documentElement).appendChild(file);
			fireClickEvent(file);
		}

		function fireClickEvent(element) {
			var evt = new window.MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true,
				button: 0,
				buttons: 0,
				mozInputSource: 1
			});

			var fired = element.dispatchEvent(evt);
		}
	}

	function FileBufferReceiver(fbr) {
		var fbReceiver = this;

		fbReceiver.chunks = {};
		fbReceiver.chunksWaiters = {};

		function receive(chunk, callback) {
			if (!chunk.uuid) {
				fbr.convertToObject(chunk, function (object) {
					receive(object);
				});
				return;
			}

			if (chunk.start && !fbReceiver.chunks[chunk.uuid]) {
				fbReceiver.chunks[chunk.uuid] = {};
				if (fbr.onBegin) fbr.onBegin(chunk);
			}

			if (!chunk.end && chunk.buffer) {
				fbReceiver.chunks[chunk.uuid][chunk.currentPosition] = chunk.buffer;
			}

			if (chunk.end) {
				var chunksObject = fbReceiver.chunks[chunk.uuid];
				var chunksArray = [];
				Object.keys(chunksObject).forEach(function (item, idx) {
					chunksArray.push(chunksObject[item]);
				});

				var blob = new Blob(chunksArray, {
					type: chunk.type
				});
				blob = merge(blob, chunk);
				blob.url = URL.createObjectURL(blob);
				blob.uuid = chunk.uuid;

				if (!blob.size) console.error('Something went wrong. Blob Size is 0.');

				if (fbr.onEnd) fbr.onEnd(blob);

				// clear system memory
				delete fbReceiver.chunks[chunk.uuid];
				delete fbReceiver.chunksWaiters[chunk.uuid];
			}

			if (chunk.buffer && fbr.onProgress) fbr.onProgress(chunk);

			if (!chunk.end) {
				callback(chunk);

				fbReceiver.chunksWaiters[chunk.uuid] = function () {
					function looper() {
						if (!chunk.buffer) {
							return;
						}

						if (!fbReceiver.chunks[chunk.uuid]) {
							return;
						}

						if (chunk.currentPosition != chunk.maxChunks && !fbReceiver.chunks[chunk.uuid][chunk.currentPosition]) {
							callback(chunk);
							setTimeout(looper, 5000);
						}
					}
					setTimeout(looper, 5000);
				};

				fbReceiver.chunksWaiters[chunk.uuid]();
			}
		}

		fbReceiver.receive = receive;
	}

	var FileConverter = {
		ConvertToArrayBuffer: function (object, callback) {
			binarize.pack(object, function (dataView) {
				callback(dataView.buffer);
			});
		},
		ConvertToObject: function (buffer, callback) {
			binarize.unpack(buffer, callback);
		}
	};

	function merge(mergein, mergeto) {
		if (!mergein) mergein = {};
		if (!mergeto) return mergein;

		for (var item in mergeto) {
			try {
				mergein[item] = mergeto[item];
			} catch (e) { }
		}
		return mergein;
	}

	var debug = false;

	var BIG_ENDIAN = false,
        LITTLE_ENDIAN = true,
        TYPE_LENGTH = Uint8Array.BYTES_PER_ELEMENT,
        LENGTH_LENGTH = Uint16Array.BYTES_PER_ELEMENT,
        BYTES_LENGTH = Uint32Array.BYTES_PER_ELEMENT;

	var Types = {
		NULL: 0,
		UNDEFINED: 1,
		STRING: 2,
		NUMBER: 3,
		BOOLEAN: 4,
		ARRAY: 5,
		OBJECT: 6,
		INT8ARRAY: 7,
		INT16ARRAY: 8,
		INT32ARRAY: 9,
		UINT8ARRAY: 10,
		UINT16ARRAY: 11,
		UINT32ARRAY: 12,
		FLOAT32ARRAY: 13,
		FLOAT64ARRAY: 14,
		ARRAYBUFFER: 15,
		BLOB: 16,
		FILE: 16,
		BUFFER: 17 // Special type for node.js
	};

	if (debug) {
		var TypeNames = [
            'NULL',
            'UNDEFINED',
            'STRING',
            'NUMBER',
            'BOOLEAN',
            'ARRAY',
            'OBJECT',
            'INT8ARRAY',
            'INT16ARRAY',
            'INT32ARRAY',
            'UINT8ARRAY',
            'UINT16ARRAY',
            'UINT32ARRAY',
            'FLOAT32ARRAY',
            'FLOAT64ARRAY',
            'ARRAYBUFFER',
            'BLOB',
            'BUFFER'
		];
	}

	var Length = [
        null, // Types.NULL
        null, // Types.UNDEFINED
        'Uint16', // Types.STRING
        'Float64', // Types.NUMBER
        'Uint8', // Types.BOOLEAN
        null, // Types.ARRAY
        null, // Types.OBJECT
        'Int8', // Types.INT8ARRAY
        'Int16', // Types.INT16ARRAY
        'Int32', // Types.INT32ARRAY
        'Uint8', // Types.UINT8ARRAY
        'Uint16', // Types.UINT16ARRAY
        'Uint32', // Types.UINT32ARRAY
        'Float32', // Types.FLOAT32ARRAY
        'Float64', // Types.FLOAT64ARRAY
        'Uint8', // Types.ARRAYBUFFER
        'Uint8', // Types.BLOB, Types.FILE
        'Uint8' // Types.BUFFER
	];

	var binary_dump = function (view, start, length) {
		var table = [],
            endianness = BIG_ENDIAN,
            ROW_LENGTH = 40;
		table[0] = [];
		for (var i = 0; i < ROW_LENGTH; i++) {
			table[0][i] = i < 10 ? '0' + i.toString(10) : i.toString(10);
		}
		for (i = 0; i < length; i++) {
			var code = view.getUint8(start + i, endianness);
			var index = ~~(i / ROW_LENGTH) + 1;
			if (typeof table[index] === 'undefined') table[index] = [];
			table[index][i % ROW_LENGTH] = code < 16 ? '0' + code.toString(16) : code.toString(16);
		}
		console.log('%c' + table[0].join(' '), 'font-weight: bold;');
		for (i = 1; i < table.length; i++) {
			console.log(table[i].join(' '));
		}
	};

	var find_type = function (obj) {
		var type = undefined;

		if (obj === undefined) {
			type = Types.UNDEFINED;

		} else if (obj === null) {
			type = Types.NULL;

		} else {
			var const_name = obj.constructor.name;
			if (const_name !== undefined) {
				// return type by .constructor.name if possible
				type = Types[const_name.toUpperCase()];

			} else {
				// Work around when constructor.name is not defined
				switch (typeof obj) {
					case 'string':
						type = Types.STRING;
						break;

					case 'number':
						type = Types.NUMBER;
						break;

					case 'boolean':
						type = Types.BOOLEAN;
						break;

					case 'object':
						if (obj instanceof Array) {
							type = Types.ARRAY;

						} else if (obj instanceof Int8Array) {
							type = Types.INT8ARRAY;

						} else if (obj instanceof Int16Array) {
							type = Types.INT16ARRAY;

						} else if (obj instanceof Int32Array) {
							type = Types.INT32ARRAY;

						} else if (obj instanceof Uint8Array) {
							type = Types.UINT8ARRAY;

						} else if (obj instanceof Uint16Array) {
							type = Types.UINT16ARRAY;

						} else if (obj instanceof Uint32Array) {
							type = Types.UINT32ARRAY;

						} else if (obj instanceof Float32Array) {
							type = Types.FLOAT32ARRAY;

						} else if (obj instanceof Float64Array) {
							type = Types.FLOAT64ARRAY;

						} else if (obj instanceof ArrayBuffer) {
							type = Types.ARRAYBUFFER;

						} else if (obj instanceof Blob) { // including File
							type = Types.BLOB;

						} else if (obj instanceof Buffer) { // node.js only
							type = Types.BUFFER;

						} else if (obj instanceof Object) {
							type = Types.OBJECT;

						}
						break;

					default:
						break;
				}
			}
		}
		return type;
	};

	var utf16_utf8 = function (string) {
		return unescape(encodeURIComponent(string));
	};

	var utf8_utf16 = function (bytes) {
		return decodeURIComponent(escape(bytes));
	};

	/**
     * packs seriarized elements array into a packed ArrayBuffer
     * @param  {Array} serialized Serialized array of elements.
     * @return {DataView} view of packed binary
     */
	var pack = function (serialized) {
		var cursor = 0,
            i = 0,
            j = 0,
            endianness = BIG_ENDIAN;

		var ab = new ArrayBuffer(serialized[0].byte_length + serialized[0].header_size);
		var view = new DataView(ab);

		for (i = 0; i < serialized.length; i++) {
			var start = cursor,
                header_size = serialized[i].header_size,
                type = serialized[i].type,
                length = serialized[i].length,
                value = serialized[i].value,
                byte_length = serialized[i].byte_length,
                type_name = Length[type],
                unit = type_name === null ? 0 : window[type_name + 'Array'].BYTES_PER_ELEMENT;

			// Set type
			if (type === Types.BUFFER) {
				// on node.js Blob is emulated using Buffer type
				view.setUint8(cursor, Types.BLOB, endianness);
			} else {
				view.setUint8(cursor, type, endianness);
			}
			cursor += TYPE_LENGTH;

			if (debug) {
				console.info('Packing', type, TypeNames[type]);
			}

			// Set length if required
			if (type === Types.ARRAY || type === Types.OBJECT) {
				view.setUint16(cursor, length, endianness);
				cursor += LENGTH_LENGTH;

				if (debug) {
					console.info('Content Length', length);
				}
			}

			// Set byte length
			view.setUint32(cursor, byte_length, endianness);
			cursor += BYTES_LENGTH;

			if (debug) {
				console.info('Header Size', header_size, 'bytes');
				console.info('Byte Length', byte_length, 'bytes');
			}

			switch (type) {
				case Types.NULL:
				case Types.UNDEFINED:
					// NULL and UNDEFINED doesn't have any payload
					break;

				case Types.STRING:
					if (debug) {
						console.info('Actual Content %c"' + value + '"', 'font-weight:bold;');
					}
					for (j = 0; j < length; j++, cursor += unit) {
						view.setUint16(cursor, value.charCodeAt(j), endianness);
					}
					break;

				case Types.NUMBER:
				case Types.BOOLEAN:
					if (debug) {
						console.info('%c' + value.toString(), 'font-weight:bold;');
					}
					view['set' + type_name](cursor, value, endianness);
					cursor += unit;
					break;

				case Types.INT8ARRAY:
				case Types.INT16ARRAY:
				case Types.INT32ARRAY:
				case Types.UINT8ARRAY:
				case Types.UINT16ARRAY:
				case Types.UINT32ARRAY:
				case Types.FLOAT32ARRAY:
				case Types.FLOAT64ARRAY:
					var _view = new Uint8Array(view.buffer, cursor, byte_length);
					_view.set(new Uint8Array(value.buffer));
					cursor += byte_length;
					break;

				case Types.ARRAYBUFFER:
				case Types.BUFFER:
					var _view = new Uint8Array(view.buffer, cursor, byte_length);
					_view.set(new Uint8Array(value));
					cursor += byte_length;
					break;

				case Types.BLOB:
				case Types.ARRAY:
				case Types.OBJECT:
					break;

				default:
					throw 'TypeError: Unexpected type found.';
			}

			if (debug) {
				binary_dump(view, start, cursor - start);
			}
		}

		return view;
	};

	/**
     * Unpack binary data into an object with value and cursor
     * @param  {DataView} view [description]
     * @param  {Number} cursor [description]
     * @return {Object}
     */
	var unpack = function (view, cursor) {
		var i = 0,
            endianness = BIG_ENDIAN,
            start = cursor;
		var type, length, byte_length, value, elem;

		// Retrieve "type"
		type = view.getUint8(cursor, endianness);
		cursor += TYPE_LENGTH;

		if (debug) {
			console.info('Unpacking', type, TypeNames[type]);
		}

		// Retrieve "length"
		if (type === Types.ARRAY || type === Types.OBJECT) {
			length = view.getUint16(cursor, endianness);
			cursor += LENGTH_LENGTH;

			if (debug) {
				console.info('Content Length', length);
			}
		}

		// Retrieve "byte_length"
		byte_length = view.getUint32(cursor, endianness);
		cursor += BYTES_LENGTH;

		if (debug) {
			console.info('Byte Length', byte_length, 'bytes');
		}

		var type_name = Length[type];
		var unit = type_name === null ? 0 : window[type_name + 'Array'].BYTES_PER_ELEMENT;

		switch (type) {
			case Types.NULL:
			case Types.UNDEFINED:
				if (debug) {
					binary_dump(view, start, cursor - start);
				}
				// NULL and UNDEFINED doesn't have any octet
				value = null;
				break;

			case Types.STRING:
				length = byte_length / unit;
				var string = [];
				for (i = 0; i < length; i++) {
					var code = view.getUint16(cursor, endianness);
					cursor += unit;
					string.push(String.fromCharCode(code));
				}
				value = string.join('');
				if (debug) {
					console.info('Actual Content %c"' + value + '"', 'font-weight:bold;');
					binary_dump(view, start, cursor - start);
				}
				break;

			case Types.NUMBER:
				value = view.getFloat64(cursor, endianness);
				cursor += unit;
				if (debug) {
					console.info('Actual Content %c"' + value.toString() + '"', 'font-weight:bold;');
					binary_dump(view, start, cursor - start);
				}
				break;

			case Types.BOOLEAN:
				value = view.getUint8(cursor, endianness) === 1 ? true : false;
				cursor += unit;
				if (debug) {
					console.info('Actual Content %c"' + value.toString() + '"', 'font-weight:bold;');
					binary_dump(view, start, cursor - start);
				}
				break;

			case Types.INT8ARRAY:
			case Types.INT16ARRAY:
			case Types.INT32ARRAY:
			case Types.UINT8ARRAY:
			case Types.UINT16ARRAY:
			case Types.UINT32ARRAY:
			case Types.FLOAT32ARRAY:
			case Types.FLOAT64ARRAY:
			case Types.ARRAYBUFFER:
				elem = view.buffer.slice(cursor, cursor + byte_length);
				cursor += byte_length;

				// If ArrayBuffer
				if (type === Types.ARRAYBUFFER) {
					value = elem;

					// If other TypedArray
				} else {
					value = new window[type_name + 'Array'](elem);
				}

				if (debug) {
					binary_dump(view, start, cursor - start);
				}
				break;

			case Types.BLOB:
				if (debug) {
					binary_dump(view, start, cursor - start);
				}
				// If Blob is available (on browser)
				if (window.Blob) {
					var mime = unpack(view, cursor);
					var buffer = unpack(view, mime.cursor);
					cursor = buffer.cursor;
					value = new Blob([buffer.value], {
						type: mime.value
					});
				} else {
					// node.js implementation goes here
					elem = view.buffer.slice(cursor, cursor + byte_length);
					cursor += byte_length;
					// node.js implementatino uses Buffer to help Blob
					value = new Buffer(elem);
				}
				break;

			case Types.ARRAY:
				if (debug) {
					binary_dump(view, start, cursor - start);
				}
				value = [];
				for (i = 0; i < length; i++) {
					// Retrieve array element
					elem = unpack(view, cursor);
					cursor = elem.cursor;
					value.push(elem.value);
				}
				break;

			case Types.OBJECT:
				if (debug) {
					binary_dump(view, start, cursor - start);
				}
				value = {};
				for (i = 0; i < length; i++) {
					// Retrieve object key and value in sequence
					var key = unpack(view, cursor);
					var val = unpack(view, key.cursor);
					cursor = val.cursor;
					value[key.value] = val.value;
				}
				break;

			default:
				throw 'TypeError: Type not supported.';
		}
		return {
			value: value,
			cursor: cursor
		};
	};

	/**
     * deferred function to process multiple serialization in order
     * @param  {array}   array    [description]
     * @param  {Function} callback [description]
     * @return {void} no return value
     */
	var deferredSerialize = function (array, callback) {
		var length = array.length,
            results = [],
            count = 0,
            byte_length = 0;
		for (var i = 0; i < array.length; i++) {
			(function (index) {
				serialize(array[index], function (result) {
					// store results in order
					results[index] = result;
					// count byte length
					byte_length += result[0].header_size + result[0].byte_length;
					// when all results are on table
					if (++count === length) {
						// finally concatenate all reuslts into a single array in order
						var array = [];
						for (var j = 0; j < results.length; j++) {
							array = array.concat(results[j]);
						}
						callback(array, byte_length);
					}
				});
			})(i);
		}
	};

	/**
     * Serializes object and return byte_length
     * @param  {mixed} obj JavaScript object you want to serialize
     * @return {Array} Serialized array object
     */
	var serialize = function (obj, callback) {
		var subarray = [],
            unit = 1,
            header_size = TYPE_LENGTH + BYTES_LENGTH,
            type, byte_length = 0,
            length = 0,
            value = obj;

		type = find_type(obj);

		unit = Length[type] === undefined || Length[type] === null ? 0 :
            window[Length[type] + 'Array'].BYTES_PER_ELEMENT;

		switch (type) {
			case Types.UNDEFINED:
			case Types.NULL:
				break;

			case Types.NUMBER:
			case Types.BOOLEAN:
				byte_length = unit;
				break;

			case Types.STRING:
				length = obj.length;
				byte_length += length * unit;
				break;

			case Types.INT8ARRAY:
			case Types.INT16ARRAY:
			case Types.INT32ARRAY:
			case Types.UINT8ARRAY:
			case Types.UINT16ARRAY:
			case Types.UINT32ARRAY:
			case Types.FLOAT32ARRAY:
			case Types.FLOAT64ARRAY:
				length = obj.length;
				byte_length += length * unit;
				break;

			case Types.ARRAY:
				deferredSerialize(obj, function (subarray, byte_length) {
					callback([{
						type: type,
						length: obj.length,
						header_size: header_size + LENGTH_LENGTH,
						byte_length: byte_length,
						value: null
					}].concat(subarray));
				});
				return;

			case Types.OBJECT:
				var deferred = [];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						deferred.push(key);
						deferred.push(obj[key]);
						length++;
					}
				}
				deferredSerialize(deferred, function (subarray, byte_length) {
					callback([{
						type: type,
						length: length,
						header_size: header_size + LENGTH_LENGTH,
						byte_length: byte_length,
						value: null
					}].concat(subarray));
				});
				return;

			case Types.ARRAYBUFFER:
				byte_length += obj.byteLength;
				break;

			case Types.BLOB:
				var mime_type = obj.type;
				var reader = new FileReader();
				reader.onload = function (e) {
					deferredSerialize([mime_type, e.target.result], function (subarray, byte_length) {
						callback([{
							type: type,
							length: length,
							header_size: header_size,
							byte_length: byte_length,
							value: null
						}].concat(subarray));
					});
				};
				reader.onerror = function (e) {
					throw 'FileReader Error: ' + e;
				};
				reader.readAsArrayBuffer(obj);
				return;

			case Types.BUFFER:
				byte_length += obj.length;
				break;

			default:
				throw 'TypeError: Type "' + obj.constructor.name + '" not supported.';
		}

		callback([{
			type: type,
			length: length,
			header_size: header_size,
			byte_length: byte_length,
			value: value
		}].concat(subarray));
	};

	/**
     * Deserialize binary and return JavaScript object
     * @param  ArrayBuffer buffer ArrayBuffer you want to deserialize
     * @return mixed              Retrieved JavaScript object
     */
	var deserialize = function (buffer, callback) {
		var view = buffer instanceof DataView ? buffer : new DataView(buffer);
		var result = unpack(view, 0);
		return result.value;
	};

	if (debug) {
		window.Test = {
			BIG_ENDIAN: BIG_ENDIAN,
			LITTLE_ENDIAN: LITTLE_ENDIAN,
			Types: Types,
			pack: pack,
			unpack: unpack,
			serialize: serialize,
			deserialize: deserialize
		};
	}

	var binarize = {
		pack: function (obj, callback) {
			try {
				if (debug) console.info('%cPacking Start', 'font-weight: bold; color: red;', obj);
				serialize(obj, function (array) {
					if (debug) console.info('Serialized Object', array);
					callback(pack(array));
				});
			} catch (e) {
				throw e;
			}
		},
		unpack: function (buffer, callback) {
			try {
				if (debug) console.info('%cUnpacking Start', 'font-weight: bold; color: red;', buffer);
				var result = deserialize(buffer);
				if (debug) console.info('Deserialized Object', result);
				callback(result);
			} catch (e) {
				throw e;
			}
		}
	};

	window.FileConverter = FileConverter;
	window.FileSelector = FileSelector;
	window.FileBufferReader = FileBufferReader;
})();


//********************************************************************************************************************************************

// Last time updated: 2016-11-02 8:56:06 AM UTC

// Latest file can be found here: https://cdn.webrtc-experiment.com/DetectRTC.js

// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - github.com/muaz-khan/DetectRTC
// ____________
// DetectRTC.js

// DetectRTC.hasWebcam (has webcam device!)
// DetectRTC.hasMicrophone (has microphone device!)
// DetectRTC.hasSpeakers (has speakers!)

(function () {

    'use strict';

    var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

    (function (that) {
        if (typeof window !== 'undefined') {
            return;
        }

        if (typeof window === 'undefined' && typeof global !== 'undefined') {
            global.navigator = {
                userAgent: browserFakeUserAgent,
                getUserMedia: function () { }
            };

            /*global window:true */
            that.window = global;
        } else if (typeof window === 'undefined') {
            // window = this;
        }

        if (typeof document === 'undefined') {
            /*global document:true */
            that.document = {};

            document.createElement = document.captureStream = document.mozCaptureStream = function () {
                return {};
            };
        }

        if (typeof location === 'undefined') {
            /*global location:true */
            that.location = {
                protocol: 'file:',
                href: '',
                hash: ''
            };
        }

        if (typeof screen === 'undefined') {
            /*global screen:true */
            that.screen = {
                width: 0,
                height: 0
            };
        }
    })(typeof global !== 'undefined' ? global : window);

    /*global navigator:true */
    var navigator = window.navigator;

    if (typeof navigator !== 'undefined') {
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        if (typeof navigator.mozGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.mozGetUserMedia;
        }
    } else {
        navigator = {
            getUserMedia: function () { },
            userAgent: browserFakeUserAgent
        };
    }

    var isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));

    var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof window.InstallTrigger !== 'undefined';
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;
    var isIE = !!document.documentMode && !isEdge;

    // this one can also be used:
    // https://www.websocket.org/js/stuff.js (DetectBrowser.js)

    function getBrowserInfo() {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after 'Opera' or after 'Version'
        if (isOpera) {
            browserName = 'Opera';
            try {
                fullVersion = navigator.userAgent.split('OPR/')[1].split(' ')[0];
                majorVersion = fullVersion.split('.')[0];
            } catch (e) {
                fullVersion = '0.0.0.0';
                majorVersion = 0;
            }
        }
            // In MSIE, the true version is after 'MSIE' in userAgent
        else if (isIE) {
            verOffset = nAgt.indexOf('MSIE');
            browserName = 'IE';
            fullVersion = nAgt.substring(verOffset + 5);
        }
            // In Chrome, the true version is after 'Chrome' 
        else if (isChrome) {
            verOffset = nAgt.indexOf('Chrome');
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
            // In Safari, the true version is after 'Safari' or after 'Version' 
        else if (isSafari) {
            verOffset = nAgt.indexOf('Safari');
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);

            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
            // In Firefox, the true version is after 'Firefox' 
        else if (isFirefox) {
            verOffset = nAgt.indexOf('Firefox');
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }

            // In most other browsers, 'name/version' is at the end of userAgent 
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);

            if (browserName.toLowerCase() === browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }

        if (isEdge) {
            browserName = 'Edge';
            // fullVersion = navigator.userAgent.split('Edge/')[1];
            fullVersion = parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10).toString();
        }

        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        if ((ix = fullVersion.indexOf(' ')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);

        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        return {
            fullVersion: fullVersion,
            version: majorVersion,
            name: browserName,
            isPrivateBrowsing: false
        };
    }

    // via: https://gist.github.com/cou929/7973956

    function retry(isDone, next) {
        var currentTrial = 0,
            maxRetry = 50,
            interval = 10,
            isTimeout = false;
        var id = window.setInterval(
            function () {
                if (isDone()) {
                    window.clearInterval(id);
                    next(isTimeout);
                }
                if (currentTrial++ > maxRetry) {
                    window.clearInterval(id);
                    isTimeout = true;
                    next(isTimeout);
                }
            },
            10
        );
    }

    function isIE10OrLater(userAgent) {
        var ua = userAgent.toLowerCase();
        if (ua.indexOf('msie') === 0 && ua.indexOf('trident') === 0) {
            return false;
        }
        var match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
        if (match && parseInt(match[1], 10) >= 10) {
            return true;
        }
        return false;
    }

    function detectPrivateMode(callback) {
        var isPrivate;

        if (window.webkitRequestFileSystem) {
            window.webkitRequestFileSystem(
                window.TEMPORARY, 1,
                function () {
                    isPrivate = false;
                },
                function (e) {
                    isPrivate = true;
                }
            );
        } else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
            var db;
            try {
                db = window.indexedDB.open('test');
                db.onerror = function () {
                    return true;
                };
            } catch (e) {
                isPrivate = true;
            }

            if (typeof isPrivate === 'undefined') {
                retry(
                    function isDone() {
                        return db.readyState === 'done' ? true : false;
                    },
                    function next(isTimeout) {
                        if (!isTimeout) {
                            isPrivate = db.result ? false : true;
                        }
                    }
                );
            }
        } else if (isIE10OrLater(window.navigator.userAgent)) {
            isPrivate = false;
            try {
                if (!window.indexedDB) {
                    isPrivate = true;
                }
            } catch (e) {
                isPrivate = true;
            }
        } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
            try {
                window.localStorage.setItem('test', 1);
            } catch (e) {
                isPrivate = true;
            }

            if (typeof isPrivate === 'undefined') {
                isPrivate = false;
                window.localStorage.removeItem('test');
            }
        }

        retry(
            function isDone() {
                return typeof isPrivate !== 'undefined' ? true : false;
            },
            function next(isTimeout) {
                callback(isPrivate);
            }
        );
    }

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry|BB10/i);
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
        },
        getOsName: function () {
            var osName = 'Unknown OS';
            if (isMobile.Android()) {
                osName = 'Android';
            }

            if (isMobile.BlackBerry()) {
                osName = 'BlackBerry';
            }

            if (isMobile.iOS()) {
                osName = 'iOS';
            }

            if (isMobile.Opera()) {
                osName = 'Opera Mini';
            }

            if (isMobile.Windows()) {
                osName = 'Windows';
            }

            return osName;
        }
    };

    // via: http://jsfiddle.net/ChristianL/AVyND/
    function detectDesktopOS() {
        var unknown = '-';

        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;

        var os = unknown;
        var clientStrings = [{
            s: 'Windows 10',
            r: /(Windows 10.0|Windows NT 10.0)/
        }, {
            s: 'Windows 8.1',
            r: /(Windows 8.1|Windows NT 6.3)/
        }, {
            s: 'Windows 8',
            r: /(Windows 8|Windows NT 6.2)/
        }, {
            s: 'Windows 7',
            r: /(Windows 7|Windows NT 6.1)/
        }, {
            s: 'Windows Vista',
            r: /Windows NT 6.0/
        }, {
            s: 'Windows Server 2003',
            r: /Windows NT 5.2/
        }, {
            s: 'Windows XP',
            r: /(Windows NT 5.1|Windows XP)/
        }, {
            s: 'Windows 2000',
            r: /(Windows NT 5.0|Windows 2000)/
        }, {
            s: 'Windows ME',
            r: /(Win 9x 4.90|Windows ME)/
        }, {
            s: 'Windows 98',
            r: /(Windows 98|Win98)/
        }, {
            s: 'Windows 95',
            r: /(Windows 95|Win95|Windows_95)/
        }, {
            s: 'Windows NT 4.0',
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
        }, {
            s: 'Windows CE',
            r: /Windows CE/
        }, {
            s: 'Windows 3.11',
            r: /Win16/
        }, {
            s: 'Android',
            r: /Android/
        }, {
            s: 'Open BSD',
            r: /OpenBSD/
        }, {
            s: 'Sun OS',
            r: /SunOS/
        }, {
            s: 'Linux',
            r: /(Linux|X11)/
        }, {
            s: 'iOS',
            r: /(iPhone|iPad|iPod)/
        }, {
            s: 'Mac OS X',
            r: /Mac OS X/
        }, {
            s: 'Mac OS',
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        }, {
            s: 'QNX',
            r: /QNX/
        }, {
            s: 'UNIX',
            r: /UNIX/
        }, {
            s: 'BeOS',
            r: /BeOS/
        }, {
            s: 'OS/2',
            r: /OS\/2/
        }, {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            if (/Windows (.*)/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
            }
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                if (/Mac OS X (10[\.\_\d]+)/.test(nAgt)) {
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                }
                break;
            case 'Android':
                if (/Android ([\.\_\d]+)/.test(nAgt)) {
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                }
                break;
            case 'iOS':
                if (/OS (\d+)_(\d+)_?(\d+)?/.test(nAgt)) {
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                }
                break;
        }

        return {
            osName: os,
            osVersion: osVersion
        };
    }

    var osName = 'Unknown OS';
    var osVersion = 'Unknown OS Version';

    if (isMobile.any()) {
        osName = isMobile.getOsName();
    } else {
        var osInfo = detectDesktopOS();
        osName = osInfo.osName;
        osVersion = osInfo.osVersion;
    }

    var isCanvasSupportsStreamCapturing = false;
    var isVideoSupportsStreamCapturing = false;
    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function (item) {
        if (!isCanvasSupportsStreamCapturing && item in document.createElement('canvas')) {
            isCanvasSupportsStreamCapturing = true;
        }

        if (!isVideoSupportsStreamCapturing && item in document.createElement('video')) {
            isVideoSupportsStreamCapturing = true;
        }
    });

    // via: https://github.com/diafygi/webrtc-ips
    function DetectLocalIPAddress(callback) {
        if (!DetectRTC.isWebRTCSupported) {
            return;
        }

        if (DetectRTC.isORTCSupported) {
            return;
        }

        getIPs(function (ip) {
            //local IPs
            if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
                callback('Local: ' + ip);
            }

                //assume the rest are public IPs
            else {
                callback('Public: ' + ip);
            }
        });
    }

    //get the IP addresses associated with an account
    function getIPs(callback) {
        var ipDuplicates = {};

        //compatibility for firefox and chrome
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;

        // bypass naive webrtc blocking using an iframe
        if (!RTCPeerConnection) {
            var iframe = document.getElementById('iframe');
            if (!iframe) {
                //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
                throw 'NOTE: you need to have an iframe in the page right above the script tag.';
            }
            var win = iframe.contentWindow;
            RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
            useWebKit = !!win.webkitRTCPeerConnection;
        }

        // if still no RTCPeerConnection then it is not supported by the browser so just return
        if (!RTCPeerConnection) {
            return;
        }

        //minimal requirements for data connection
        var mediaConstraints = {
            optional: [{
                RtpDataChannels: true
            }]
        };

        //firefox already has a default stun server in about:config
        //    media.peerconnection.default_iceservers =
        //    [{"url": "stun:stun.services.mozilla.com"}]
        var servers;

        //add same stun server for chrome
        if (useWebKit) {
            servers = {
                iceServers: [{
                    urls: 'stun:stun.services.mozilla.com'
                }]
            };

            if (typeof DetectRTC !== 'undefined' && DetectRTC.browser.isFirefox && DetectRTC.browser.version <= 38) {
                servers[0] = {
                    url: servers[0].urls
                };
            }
        }

        //construct a new RTCPeerConnection
        var pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
            //match just the IP address
            var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
            var match = ipRegex.exec(candidate);
            if (!match) {
                console.warn('Could not match IP address in', candidate);
                return;
            }
            var ipAddress = match[1];

            //remove duplicates
            if (ipDuplicates[ipAddress] === undefined) {
                callback(ipAddress);
            }

            ipDuplicates[ipAddress] = true;
        }

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            //skip non-candidate events
            if (ice.candidate) {
                handleCandidate(ice.candidate.candidate);
            }
        };

        //create a bogus data channel
        pc.createDataChannel('');

        //create an offer sdp
        pc.createOffer(function (result) {

            //trigger the stun server request
            pc.setLocalDescription(result, function () { }, function () { });

        }, function () { });

        //wait for a while to let everything done
        setTimeout(function () {
            //read candidate info from local description
            var lines = pc.localDescription.sdp.split('\n');

            lines.forEach(function (line) {
                if (line.indexOf('a=candidate:') === 0) {
                    handleCandidate(line);
                }
            });
        }, 1000);
    }

    var MediaDevices = [];

    var audioInputDevices = [];
    var audioOutputDevices = [];
    var videoInputDevices = [];

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        // Firefox 38+ seems having support of enumerateDevices
        // Thanks @xdumaine/enumerateDevices
        navigator.enumerateDevices = function (callback) {
            navigator.mediaDevices.enumerateDevices().then(callback).catch(function () {
                callback([]);
            });
        };
    }

    // Media Devices detection
    var canEnumerate = false;

    /*global MediaStreamTrack:true */
    if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
        canEnumerate = true;
    } else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
        canEnumerate = true;
    }

    var hasMicrophone = false;
    var hasSpeakers = false;
    var hasWebcam = false;

    var isWebsiteHasMicrophonePermissions = false;
    var isWebsiteHasWebcamPermissions = false;

    // http://dev.w3.org/2011/webrtc/editor/getusermedia.html#mediadevices
    function checkDeviceSupport(callback) {
        if (!canEnumerate) {
            if (callback) {
                callback();
            }
            return;
        }

        if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
            navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
        }

        if (!navigator.enumerateDevices && navigator.enumerateDevices) {
            navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
        }

        if (!navigator.enumerateDevices) {
            if (callback) {
                callback();
            }
            return;
        }

        MediaDevices = [];

        audioInputDevices = [];
        audioOutputDevices = [];
        videoInputDevices = [];

        // to prevent duplication
        var alreadyUsedDevices = {};

        navigator.enumerateDevices(function (devices) {
            devices.forEach(function (_device) {
                var device = {};
                for (var d in _device) {
                    try {
                        if (typeof _device[d] !== 'function') {
                            device[d] = _device[d];
                        }
                    } catch (e) { }
                }

                if (alreadyUsedDevices[device.deviceId]) {
                    return;
                }

                // if it is MediaStreamTrack.getSources
                if (device.kind === 'audio') {
                    device.kind = 'audioinput';
                }

                if (device.kind === 'video') {
                    device.kind = 'videoinput';
                }

                if (!device.deviceId) {
                    device.deviceId = device.id;
                }

                if (!device.id) {
                    device.id = device.deviceId;
                }

                if (!device.label) {
                    device.label = 'Please invoke getUserMedia once.';
                    if (location.protocol !== 'https:') {
                        if (document.domain.search && document.domain.search(/localhost|127.0./g) === -1) {
                            device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                        }
                    }
                } else {
                    if (device.kind === 'videoinput' && !isWebsiteHasWebcamPermissions) {
                        isWebsiteHasWebcamPermissions = true;
                    }

                    if (device.kind === 'audioinput' && !isWebsiteHasMicrophonePermissions) {
                        isWebsiteHasMicrophonePermissions = true;
                    }
                }

                if (device.kind === 'audioinput') {
                    hasMicrophone = true;

                    if (audioInputDevices.indexOf(device) === -1) {
                        audioInputDevices.push(device);
                    }
                }

                if (device.kind === 'audiooutput') {
                    hasSpeakers = true;

                    if (audioOutputDevices.indexOf(device) === -1) {
                        audioOutputDevices.push(device);
                    }
                }

                if (device.kind === 'videoinput') {
                    hasWebcam = true;

                    if (videoInputDevices.indexOf(device) === -1) {
                        videoInputDevices.push(device);
                    }
                }

                // there is no 'videoouput' in the spec.
                MediaDevices.push(device);

                alreadyUsedDevices[device.deviceId] = device;
            });

            if (typeof DetectRTC !== 'undefined') {
                // to sync latest outputs
                DetectRTC.MediaDevices = MediaDevices;
                DetectRTC.hasMicrophone = hasMicrophone;
                DetectRTC.hasSpeakers = hasSpeakers;
                DetectRTC.hasWebcam = hasWebcam;

                DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions;
                DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions;

                DetectRTC.audioInputDevices = audioInputDevices;
                DetectRTC.audioOutputDevices = audioOutputDevices;
                DetectRTC.videoInputDevices = videoInputDevices;
            }

            if (callback) {
                callback();
            }
        });
    }

    // check for microphone/camera support!
    checkDeviceSupport();

    var DetectRTC = window.DetectRTC || {};

    // ----------
    // DetectRTC.browser.name || DetectRTC.browser.version || DetectRTC.browser.fullVersion
    DetectRTC.browser = getBrowserInfo();

    detectPrivateMode(function (isPrivateBrowsing) {
        DetectRTC.browser.isPrivateBrowsing = !!isPrivateBrowsing;
    });

    // DetectRTC.isChrome || DetectRTC.isFirefox || DetectRTC.isEdge
    DetectRTC.browser['is' + DetectRTC.browser.name] = true;

    var isNodeWebkit = !!(window.process && (typeof window.process === 'object') && window.process.versions && window.process.versions['node-webkit']);

    // --------- Detect if system supports WebRTC 1.0 or WebRTC 1.1.
    var isWebRTCSupported = false;
    ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function (item) {
        if (isWebRTCSupported) {
            return;
        }

        if (item in window) {
            isWebRTCSupported = true;
        }
    });
    DetectRTC.isWebRTCSupported = isWebRTCSupported;

    //-------
    DetectRTC.isORTCSupported = typeof RTCIceGatherer !== 'undefined';

    // --------- Detect if system supports screen capturing API
    var isScreenCapturingSupported = false;
    if (DetectRTC.browser.isChrome && DetectRTC.browser.version >= 35) {
        isScreenCapturingSupported = true;
    } else if (DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 34) {
        isScreenCapturingSupported = true;
    }

    if (location.protocol !== 'https:') {
        isScreenCapturingSupported = false;
    }
    DetectRTC.isScreenCapturingSupported = isScreenCapturingSupported;

    // --------- Detect if WebAudio API are supported
    var webAudio = {
        isSupported: false,
        isCreateMediaStreamSourceSupported: false
    };

    ['AudioContext', 'webkitAudioContext', 'mozAudioContext', 'msAudioContext'].forEach(function (item) {
        if (webAudio.isSupported) {
            return;
        }

        if (item in window) {
            webAudio.isSupported = true;

            if (window[item] && 'createMediaStreamSource' in window[item].prototype) {
                webAudio.isCreateMediaStreamSourceSupported = true;
            }
        }
    });
    DetectRTC.isAudioContextSupported = webAudio.isSupported;
    DetectRTC.isCreateMediaStreamSourceSupported = webAudio.isCreateMediaStreamSourceSupported;

    // ---------- Detect if SCTP/RTP channels are supported.

    var isRtpDataChannelsSupported = false;
    if (DetectRTC.browser.isChrome && DetectRTC.browser.version > 31) {
        isRtpDataChannelsSupported = true;
    }
    DetectRTC.isRtpDataChannelsSupported = isRtpDataChannelsSupported;

    var isSCTPSupportd = false;
    if (DetectRTC.browser.isFirefox && DetectRTC.browser.version > 28) {
        isSCTPSupportd = true;
    } else if (DetectRTC.browser.isChrome && DetectRTC.browser.version > 25) {
        isSCTPSupportd = true;
    } else if (DetectRTC.browser.isOpera && DetectRTC.browser.version >= 11) {
        isSCTPSupportd = true;
    }
    DetectRTC.isSctpDataChannelsSupported = isSCTPSupportd;

    // ---------

    DetectRTC.isMobileDevice = isMobileDevice; // "isMobileDevice" boolean is defined in "getBrowserInfo.js"

    // ------
    var isGetUserMediaSupported = false;
    if (navigator.getUserMedia) {
        isGetUserMediaSupported = true;
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        isGetUserMediaSupported = true;
    }
    if (DetectRTC.browser.isChrome && DetectRTC.browser.version >= 46 && location.protocol !== 'https:') {
        DetectRTC.isGetUserMediaSupported = 'Requires HTTPs';
    }
    DetectRTC.isGetUserMediaSupported = isGetUserMediaSupported;

    // -----------
    DetectRTC.osName = osName;
    DetectRTC.osVersion = osVersion;

    var displayResolution = '';
    if (screen.width) {
        var width = (screen.width) ? screen.width : '';
        var height = (screen.height) ? screen.height : '';
        displayResolution += '' + width + ' x ' + height;
    }
    DetectRTC.displayResolution = displayResolution;

    // ----------
    DetectRTC.isCanvasSupportsStreamCapturing = isCanvasSupportsStreamCapturing;
    DetectRTC.isVideoSupportsStreamCapturing = isVideoSupportsStreamCapturing;

    // ------
    DetectRTC.DetectLocalIPAddress = DetectLocalIPAddress;

    DetectRTC.isWebSocketsSupported = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;
    DetectRTC.isWebSocketsBlocked = !DetectRTC.isWebSocketsSupported;

    DetectRTC.checkWebSocketsSupport = function (callback) {
        callback = callback || function () { };
        try {
            var websocket = new WebSocket('wss://echo.websocket.org:443/');
            websocket.onopen = function () {
                DetectRTC.isWebSocketsBlocked = false;
                callback();
                websocket.close();
                websocket = null;
            };
            websocket.onerror = function () {
                DetectRTC.isWebSocketsBlocked = true;
                callback();
            };
        } catch (e) {
            DetectRTC.isWebSocketsBlocked = true;
            callback();
        }
    };

    // -------
    DetectRTC.load = function (callback) {
        callback = callback || function () { };
        checkDeviceSupport(callback);
    };

    DetectRTC.MediaDevices = MediaDevices;
    DetectRTC.hasMicrophone = hasMicrophone;
    DetectRTC.hasSpeakers = hasSpeakers;
    DetectRTC.hasWebcam = hasWebcam;

    DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions;
    DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions;

    DetectRTC.audioInputDevices = audioInputDevices;
    DetectRTC.audioOutputDevices = audioOutputDevices;
    DetectRTC.videoInputDevices = videoInputDevices;

    // ------
    var isSetSinkIdSupported = false;
    if ('setSinkId' in document.createElement('video')) {
        isSetSinkIdSupported = true;
    }
    DetectRTC.isSetSinkIdSupported = isSetSinkIdSupported;

    // -----
    var isRTPSenderReplaceTracksSupported = false;
    if (DetectRTC.browser.isFirefox && typeof mozRTCPeerConnection !== 'undefined' /*&& DetectRTC.browser.version > 39*/) {
        /*global mozRTCPeerConnection:true */
        if ('getSenders' in mozRTCPeerConnection.prototype) {
            isRTPSenderReplaceTracksSupported = true;
        }
    } else if (DetectRTC.browser.isChrome && typeof webkitRTCPeerConnection !== 'undefined') {
        /*global webkitRTCPeerConnection:true */
        if ('getSenders' in webkitRTCPeerConnection.prototype) {
            isRTPSenderReplaceTracksSupported = true;
        }
    }
    DetectRTC.isRTPSenderReplaceTracksSupported = isRTPSenderReplaceTracksSupported;

    //------
    var isRemoteStreamProcessingSupported = false;
    if (DetectRTC.browser.isFirefox && DetectRTC.browser.version > 38) {
        isRemoteStreamProcessingSupported = true;
    }
    DetectRTC.isRemoteStreamProcessingSupported = isRemoteStreamProcessingSupported;

    //-------
    var isApplyConstraintsSupported = false;

    /*global MediaStreamTrack:true */
    if (typeof MediaStreamTrack !== 'undefined' && 'applyConstraints' in MediaStreamTrack.prototype) {
        isApplyConstraintsSupported = true;
    }
    DetectRTC.isApplyConstraintsSupported = isApplyConstraintsSupported;

    //-------
    var isMultiMonitorScreenCapturingSupported = false;
    if (DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 43) {
        // version 43 merely supports platforms for multi-monitors
        // version 44 will support exact multi-monitor selection i.e. you can select any monitor for screen capturing.
        isMultiMonitorScreenCapturingSupported = true;
    }
    DetectRTC.isMultiMonitorScreenCapturingSupported = isMultiMonitorScreenCapturingSupported;

    DetectRTC.isPromisesSupported = !!('Promise' in window);

    if (typeof DetectRTC === 'undefined') {
        window.DetectRTC = {};
    }

    var MediaStream = window.MediaStream;

    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
        MediaStream = webkitMediaStream;
    }

    if (typeof MediaStream !== 'undefined') {
        DetectRTC.MediaStream = Object.keys(MediaStream.prototype);
    } else DetectRTC.MediaStream = false;

    if (typeof MediaStreamTrack !== 'undefined') {
        DetectRTC.MediaStreamTrack = Object.keys(MediaStreamTrack.prototype);
    } else DetectRTC.MediaStreamTrack = false;

    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    if (typeof RTCPeerConnection !== 'undefined') {
        DetectRTC.RTCPeerConnection = Object.keys(RTCPeerConnection.prototype);
    } else DetectRTC.RTCPeerConnection = false;

    window.DetectRTC = DetectRTC;

    if (typeof module !== 'undefined' /* && !!module.exports*/) {
        module.exports = DetectRTC;
    }

    if (typeof define === 'function' && define.amd) {
        define('DetectRTC', [], function () {
            return DetectRTC;
        });
    }
})();

//****************************************************************************************************************************************

// Last time updated at Sep 01, 2016, 08:32:23

// Latest file can be found here: https://cdn.webrtc-experiment.com/getScreenId.js

// Muaz Khan         - www.MuazKhan.com
// MIT License       - www.WebRTC-Experiment.com/licence
// Documentation     - https://github.com/muaz-khan/getScreenId.

// ______________
// getScreenId.js

/*
getScreenId(function (error, sourceId, screen_constraints) {
    // error    == null || 'PermissionDeniedError || 'not-installed' || 'installed-disabled' || 'not-chrome'
    // sourceId == null || 'string' || 'firefox'

    if(sourceId == 'firefox') {
        navigator.mozGetUserMedia(screen_constraints, onSuccess, onFailure);
    }
    else navigator.webkitGetUserMedia(screen_constraints, onSuccess, onFailure);
});
*/

(function () {
	window.getScreenId = function (callback) {
		// for Firefox:
		// sourceId == 'firefox'
		// screen_constraints = {...}
		if (!!navigator.mozGetUserMedia) {
			callback(null, 'firefox', {
				video: {
					mozMediaSource: 'window',
					mediaSource: 'window'
				}
			});
			return;
		}

		postMessage();

		window.addEventListener('message', onIFrameCallback);

		function onIFrameCallback(event) {
			if (!event.data) return;

			if (event.data.chromeMediaSourceId) {
				if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
					callback('PermissionDeniedError');
				} else callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId));
			}

			if (event.data.chromeExtensionStatus) {
				callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
			}

			// this event listener is no more needed
			window.removeEventListener('message', onIFrameCallback);
		}
	};

	function getScreenConstraints(error, sourceId) {
		var screen_constraints = {
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: error ? 'screen' : 'desktop',
					maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
					maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
				},
				optional: []
			}
		};

		if (sourceId) {
			screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
		}

		return screen_constraints;
	}

	function postMessage() {
		if (!iframe) {
			loadIFrame(postMessage);
			return;
		}

		if (!iframe.isLoaded) {
			setTimeout(postMessage, 100);
			return;
		}

		iframe.contentWindow.postMessage({
			captureSourceId: true
		}, '*');
	}

	function loadIFrame(loadCallback) {
		if (iframe) {
			loadCallback();
			return;
		}

		iframe = document.createElement('iframe');
		iframe.onload = function () {
			iframe.isLoaded = true;

			loadCallback();
		};
		iframe.src = document.location.origin + '/Resources/WebRTC/getScreenId.html'; //'https://www.webrtc-experiment.com/getSourceId/'; // https://wwww.yourdomain.com/getScreenId.html
		iframe.style.display = 'none';
		(document.body || document.documentElement).appendChild(iframe);
	}

	var iframe;

	// this function is used in v3.0
	window.getScreenConstraints = function (callback) {
		loadIFrame(function () {
			getScreenId(function (error, sourceId, screen_constraints) {
				callback(error, (screen_constraints || {}).video);
			});
		});
	};
})();

(function () {
	if (document.domain.indexOf('webrtc-experiment.com') === -1) {
		return;
	}

	window.getScreenId = function (callback) {
		// for Firefox:
		// sourceId == 'firefox'
		// screen_constraints = {...}
		if (!!navigator.mozGetUserMedia) {
			callback(null, 'firefox', {
				video: {
					mozMediaSource: 'window',
					mediaSource: 'window'
				}
			});
			return;
		}

		postMessage();

		window.addEventListener('message', onIFrameCallback);

		function onIFrameCallback(event) {
			if (!event.data) return;

			if (event.data.chromeMediaSourceId) {
				if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
					callback('permission-denied');
				} else callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId));
			}

			if (event.data.chromeExtensionStatus) {
				callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
			}

			// this event listener is no more needed
			window.removeEventListener('message', onIFrameCallback);
		}
	};

	function getScreenConstraints(error, sourceId) {
		var screen_constraints = {
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: error ? 'screen' : 'desktop',
					maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
					maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
				},
				optional: []
			}
		};

		if (sourceId) {
			screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
		}

		return screen_constraints;
	}

	function postMessage() {
		if (!iframe) {
			loadIFrame(postMessage);
			return;
		}

		if (!iframe.isLoaded) {
			setTimeout(postMessage, 100);
			return;
		}

		iframe.contentWindow.postMessage({
			captureSourceId: true
		}, '*');
	}

	function loadIFrame(loadCallback) {
		if (iframe) {
			loadCallback();
			return;
		}

		iframe = document.createElement('iframe');
		iframe.onload = function () {
			iframe.isLoaded = true;

			loadCallback();
		};
		iframe.src = document.location.origin + '/Resources/WebRTC/getScreenId.html'; //'https://www.webrtc-experiment.com/getSourceId/'; // https://wwww.yourdomain.com/getScreenId.html
		iframe.style.display = 'none';
		(document.body || document.documentElement).appendChild(iframe);
	}

	var iframe;

	// this function is used in v3.0
	window.getScreenConstraints = function (callback) {
		loadIFrame(function () {
			getScreenId(function (error, sourceId, screen_constraints) {
				callback(error, (screen_constraints || {}).video);
			});
		});
	};
})();

//****************************************************************************************************************************************

//#region RECORDRTC

'use strict';

// Last time updated: 2016-10-21 11:04:26 AM UTC

// Open-Sourced: https://github.com/muaz-khan/RecordRTC

//--------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
//--------------------------------------------------

// ____________
// RecordRTC.js

/**
 * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a JavaScript-based media-recording library for modern web-browsers (supporting WebRTC getUserMedia API). It is optimized for different devices and browsers to bring all client-side (pluginfree) recording solutions in single place.
 * @summary JavaScript audio/video recording library runs top over WebRTC getUserMedia API.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTC
 * @class
 * @example
 * var recordRTC = RecordRTC(mediaStream, {
 *     type: 'video' // audio or video or gif or canvas
 * });
 *
 * // or, you can also use the "new" keyword
 * var recordRTC = new RecordRTC(mediaStream[, config]);
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 */

function RecordRTC(mediaStream, config) {
    if (!mediaStream) {
        throw 'MediaStream is mandatory.';
    }

    config = config || {
        type: 'video'
    };

    config = new RecordRTCConfiguration(mediaStream, config);

    // a reference to user's recordRTC object
    var self = this;

    function startRecording() {
        if (!config.disableLogs) {
            console.debug('started recording ' + config.type + ' stream.');
        }

        if (mediaRecorder) {
            mediaRecorder.clearRecordedData();
            mediaRecorder.resume();

            if (self.recordingDuration) {
                handleRecordingDuration();
            }
            return self;
        }

        initRecorder(function () {
            if (self.recordingDuration) {
                handleRecordingDuration();
            }
        });

        return self;
    }

    function initRecorder(initCallback) {
        if (initCallback) {
            config.initCallback = function () {
                initCallback();
                initCallback = config.initCallback = null; // recordRTC.initRecorder should be call-backed once.
            };
        }

        var Recorder = new GetRecorderType(mediaStream, config);

        mediaRecorder = new Recorder(mediaStream, config);
        mediaRecorder.record();

        if (!config.disableLogs) {
            console.debug('Initialized recorderType:', mediaRecorder.constructor.name, 'for output-type:', config.type);
        }
    }

    function stopRecording(callback) {
        if (!mediaRecorder) {
            return console.warn(WARNING);
        }

        /*jshint validthis:true */
        var recordRTC = this;

        if (!config.disableLogs) {
            console.warn('Stopped recording ' + config.type + ' stream.');
        }

        if (config.type !== 'gif') {
            mediaRecorder.stop(_callback);
        } else {
            mediaRecorder.stop();
            _callback();
        }

        function _callback(__blob) {
            for (var item in mediaRecorder) {
                if (self) {
                    self[item] = mediaRecorder[item];
                }

                if (recordRTC) {
                    recordRTC[item] = mediaRecorder[item];
                }
            }

            var blob = mediaRecorder.blob;

            if (!blob) {
                if (__blob) {
                    mediaRecorder.blob = blob = __blob;
                } else {
                    throw 'Recording failed.';
                }
            }

            if (callback) {
                var url = URL.createObjectURL(blob);
                callback(url);
            }

            if (blob && !config.disableLogs) {
                console.debug(blob.type, '->', bytesToSize(blob.size));
            }

            if (!config.autoWriteToDisk) {
                return;
            }

            getDataURL(function (dataURL) {
                var parameter = {};
                parameter[config.type + 'Blob'] = dataURL;
                DiskStorage.Store(parameter);
            });
        }
    }

    function pauseRecording() {
        if (!mediaRecorder) {
            return console.warn(WARNING);
        }

        mediaRecorder.pause();

        if (!config.disableLogs) {
            console.debug('Paused recording.');
        }
    }

    function resumeRecording() {
        if (!mediaRecorder) {
            return console.warn(WARNING);
        }

        // not all libs have this method yet
        mediaRecorder.resume();

        if (!config.disableLogs) {
            console.debug('Resumed recording.');
        }
    }

    function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
    }

    function getDataURL(callback, _mediaRecorder) {
        if (!callback) {
            throw 'Pass a callback function over getDataURL.';
        }

        var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;

        if (!blob) {
            if (!config.disableLogs) {
                console.warn('Blob encoder did not finish its job yet.');
            }

            setTimeout(function () {
                getDataURL(callback, _mediaRecorder);
            }, 1000);
            return;
        }

        if (typeof Worker !== 'undefined' && !navigator.mozGetUserMedia) {
            var webWorker = processInWebWorker(readFile);

            webWorker.onmessage = function (event) {
                callback(event.data);
            };

            webWorker.postMessage(blob);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                callback(event.target.result);
            };
        }

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            URL.revokeObjectURL(blob);
            return worker;
        }
    }

    function handleRecordingDuration() {
        setTimeout(function () {
            stopRecording(self.onRecordingStopped);
        }, self.recordingDuration);
    }

    var WARNING = 'It seems that "startRecording" is not invoked for ' + config.type + ' recorder.';

    var mediaRecorder;

    var returnObject = {
        /**
         * This method starts recording. It doesn't take any arguments.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.startRecording();
         */
        startRecording: startRecording,

        /**
         * This method stops recording. It takes a single "callback" argument. It is suggested to get blob or URI in the callback to make sure all encoders finished their jobs.
         * @param {function} callback - This callback function is invoked after completion of all encoding jobs.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function(videoURL) {
         *     video.src = videoURL;
         *     recordRTC.blob; recordRTC.buffer;
         * });
         */
        stopRecording: stopRecording,

        /**
         * This method pauses the recording process.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.pauseRecording();
         */
        pauseRecording: pauseRecording,

        /**
         * This method resumes the recording process.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.resumeRecording();
         */
        resumeRecording: resumeRecording,

        /**
         * This method initializes the recording process.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.initRecorder();
         */
        initRecorder: initRecorder,

        /**
         * This method sets the recording duration.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.setRecordingDuration();
         */
        setRecordingDuration: function (milliseconds, callback) {
            if (typeof milliseconds === 'undefined') {
                throw 'milliseconds is required.';
            }

            if (typeof milliseconds !== 'number') {
                throw 'milliseconds must be a number.';
            }

            self.recordingDuration = milliseconds;
            self.onRecordingStopped = callback || function () { };

            return {
                onRecordingStopped: function (callback) {
                    self.onRecordingStopped = callback;
                }
            };
        },

        /**
         * This method can be used to clear/reset all the recorded data.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.clearRecordedData();
         */
        clearRecordedData: function () {
            if (!mediaRecorder) {
                return console.warn(WARNING);
            }

            mediaRecorder.clearRecordedData();

            if (!config.disableLogs) {
                console.debug('Cleared old recorded data.');
            }
        },

        /**
         * It is equivalent to <code class="str">"recordRTC.blob"</code> property.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var blob = recordRTC.getBlob();
         *
         *     // equivalent to: recordRTC.blob property
         *     var blob = recordRTC.blob;
         * });
         */
        getBlob: function () {
            if (!mediaRecorder) {
                return console.warn(WARNING);
            }

            return mediaRecorder.blob;
        },

        /**
         * This method returns the DataURL. It takes a single "callback" argument.
         * @param {function} callback - DataURL is passed back over this callback.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     recordRTC.getDataURL(function(dataURL) {
         *         video.src = dataURL;
         *     });
         * });
         */
        getDataURL: getDataURL,

        /**
         * This method returns the Virutal/Blob URL. It doesn't take any arguments.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     video.src = recordRTC.toURL();
         * });
         */
        toURL: function () {
            if (!mediaRecorder) {
                return console.warn(WARNING);
            }

            return URL.createObjectURL(mediaRecorder.blob);
        },

        /**
         * This method saves the blob/file to disk (by invoking save-as dialog). It takes a single (optional) argument i.e. FileName
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     recordRTC.save('file-name');
         * });
         */
        save: function (fileName) {
            if (!mediaRecorder) {
                return console.warn(WARNING);
            }

            invokeSaveAsDialog(mediaRecorder.blob, fileName);
        },

        /**
         * This method gets a blob from indexed-DB storage. It takes a single "callback" argument.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
         */
        getFromDisk: function (callback) {
            if (!mediaRecorder) {
                return console.warn(WARNING);
            }

            RecordRTC.getFromDisk(config.type, callback);
        },

        /**
         * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
         * @type {Array.<Array>}
         * @param {Array} arrayOfWebPImages - Array of webp images.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var arrayOfWebPImages = [];
         * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
         * recordRTC.setAdvertisementArray(arrayOfWebPImages);
         */
        setAdvertisementArray: function (arrayOfWebPImages) {
            config.advertisement = [];

            var length = arrayOfWebPImages.length;
            for (var i = 0; i < length; i++) {
                config.advertisement.push({
                    duration: i,
                    image: arrayOfWebPImages[i]
                });
            }
        },

        /**
         * It is equivalent to <code class="str">"recordRTC.getBlob()"</code> method.
         * @property {Blob} blob - Recorded Blob can be accessed using this property.
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var blob = recordRTC.blob;
         *
         *     // equivalent to: recordRTC.getBlob() method
         *     var blob = recordRTC.getBlob();
         * });
         */
        blob: null,

        /**
         * @todo Add descriptions.
         * @property {number} bufferSize - Either audio device's default buffer-size, or your custom value.
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var bufferSize = recordRTC.bufferSize;
         * });
         */
        bufferSize: 0,

        /**
         * @todo Add descriptions.
         * @property {number} sampleRate - Audio device's default sample rates.
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var sampleRate = recordRTC.sampleRate;
         * });
         */
        sampleRate: 0,

        /**
         * @todo Add descriptions.
         * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var buffer = recordRTC.buffer;
         * });
         */
        buffer: null,

        /**
         * @todo Add descriptions.
         * @property {DataView} view - Audio DataView, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @example
         * recordRTC.stopRecording(function() {
         *     var dataView = recordRTC.view;
         * });
         */
        view: null
    };

    if (!this) {
        self = returnObject;
        return returnObject;
    }

    // if someone wants to use RecordRTC with the "new" keyword.
    for (var prop in returnObject) {
        this[prop] = returnObject[prop];
    }

    self = this;

    return returnObject;
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
RecordRTC.getFromDisk = function (type, callback) {
    if (!callback) {
        throw 'callback is mandatory.';
    }

    console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
    DiskStorage.Fetch(function (dataURL, _type) {
        if (type !== 'all' && _type === type + 'Blob' && callback) {
            callback(dataURL);
        }

        if (type === 'all' && callback) {
            callback(dataURL, _type.replace('Blob', ''));
        }
    });
};

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
RecordRTC.writeToDisk = function (options) {
    console.log('Writing recorded blob(s) to disk!');
    options = options || {};
    if (options.audio && options.video && options.gif) {
        options.audio.getDataURL(function (audioDataURL) {
            options.video.getDataURL(function (videoDataURL) {
                options.gif.getDataURL(function (gifDataURL) {
                    DiskStorage.Store({
                        audioBlob: audioDataURL,
                        videoBlob: videoDataURL,
                        gifBlob: gifDataURL
                    });
                });
            });
        });
    } else if (options.audio && options.video) {
        options.audio.getDataURL(function (audioDataURL) {
            options.video.getDataURL(function (videoDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    videoBlob: videoDataURL
                });
            });
        });
    } else if (options.audio && options.gif) {
        options.audio.getDataURL(function (audioDataURL) {
            options.gif.getDataURL(function (gifDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.video && options.gif) {
        options.video.getDataURL(function (videoDataURL) {
            options.gif.getDataURL(function (gifDataURL) {
                DiskStorage.Store({
                    videoBlob: videoDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.audio) {
        options.audio.getDataURL(function (audioDataURL) {
            DiskStorage.Store({
                audioBlob: audioDataURL
            });
        });
    } else if (options.video) {
        options.video.getDataURL(function (videoDataURL) {
            DiskStorage.Store({
                videoBlob: videoDataURL
            });
        });
    } else if (options.gif) {
        options.gif.getDataURL(function (gifDataURL) {
            DiskStorage.Store({
                gifBlob: gifDataURL
            });
        });
    }
};

if (typeof module !== 'undefined' /* && !!module.exports*/) {
    module.exports = RecordRTC;
}

if (typeof define === 'function' && define.amd) {
    define('RecordRTC', [], function () {
        return RecordRTC;
    });
}

// __________________________
// RecordRTC-Configuration.js

/**
 * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
 * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTCConfiguration
 * @class
 * @example
 * var options = RecordRTCConfiguration(mediaStream, options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
 */

function RecordRTCConfiguration(mediaStream, config) {
    if (config.recorderType && !config.type) {
        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder) {
            config.type = 'video';
        } else if (config.recorderType === GifRecorder) {
            config.type = 'gif';
        } else if (config.recorderType === StereoAudioRecorder) {
            config.type = 'audio';
        } else if (config.recorderType === MediaStreamRecorder) {
            if (mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                config.type = 'video';
            } else if (mediaStream.getAudioTracks().length && !mediaStream.getVideoTracks().length) {
                config.type = 'audio';
            } else if (!mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                config.type = 'audio';
            } else {
                // config.type = 'UnKnown';
            }
        }
    }

    if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (!config.mimeType) {
            config.mimeType = 'video/webm';
        }

        if (!config.type) {
            config.type = config.mimeType.split('/')[0];
        }

        if (!config.bitsPerSecond) {
            // config.bitsPerSecond = 128000;
        }
    }

    // consider default type=audio
    if (!config.type) {
        if (config.mimeType) {
            config.type = config.mimeType.split('/')[0];
        }
        if (!config.type) {
            config.type = 'audio';
        }
    }

    return config;
}

// __________________
// GetRecorderType.js

/**
 * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
 * @summary It returns best recorder-type available for your browser.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef GetRecorderType
 * @class
 * @example
 * var RecorderType = GetRecorderType(options);
 * var recorder = new RecorderType(options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 */

function GetRecorderType(mediaStream, config) {
    var recorder;

    // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
    // todo: detect if it is Edge, then auto use: StereoAudioRecorder
    if (isChrome || isEdge || isOpera) {
        // Media Stream Recording API has not been implemented in chrome yet;
        // That's why using WebAudio API to record stereo audio in WAV format
        recorder = StereoAudioRecorder;
    }

    if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
        recorder = MediaStreamRecorder;
    }

    // video recorder (in WebM format)
    if (config.type === 'video' && (isChrome || isOpera)) {
        recorder = WhammyRecorder;
    }

    // video recorder (in Gif format)
    if (config.type === 'gif') {
        recorder = GifRecorder;
    }

    // html2canvas recording!
    if (config.type === 'canvas') {
        recorder = CanvasRecorder;
    }

    if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (mediaStream.getVideoTracks().length) {
            recorder = MediaStreamRecorder;
        }
    }

    if (config.recorderType) {
        recorder = config.recorderType;
    }

    if (!config.disableLogs && !!recorder && !!recorder.name) {
        console.debug('Using recorderType:', recorder.name || recorder.constructor.name);
    }

    return recorder;
}

// _____________
// MRecordRTC.js

/**
 * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
 * @summary MRecordRTC stands for "Multiple-RecordRTC".
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef MRecordRTC
 * @class
 * @example
 * var recorder = new MRecordRTC();
 * recorder.addStream(MediaStream);
 * recorder.mediaType = {
 *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
 *     video: true, // or WhammyRecorder or MediaStreamRecorder
 *     gif: true    // or GifRecorder
 * };
 * // mimeType is optional and should be set only in advance cases.
 * recorder.mimeType = {
 *     audio: 'audio/wav',
 *     video: 'video/webm',
 *     gif:   'image/gif'
 * };
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 */

function MRecordRTC(mediaStream) {

    /**
     * This method attaches MediaStream object to {@link MRecordRTC}.
     * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.addStream(MediaStream);
     */
    this.addStream = function (_mediaStream) {
        if (_mediaStream) {
            mediaStream = _mediaStream;
        }
    };

    /**
     * This property can be used to set the recording type e.g. audio, or video, or gif, or canvas.
     * @property {object} mediaType - {audio: true, video: true, gif: true}
     * @memberof MRecordRTC
     * @example
     * var recorder = new MRecordRTC();
     * recorder.mediaType = {
     *     audio: true, // TRUE or StereoAudioRecorder or MediaStreamRecorder
     *     video: true, // TRUE or WhammyRecorder or MediaStreamRecorder
     *     gif  : true  // TRUE or GifRecorder
     * };
     */
    this.mediaType = {
        audio: true,
        video: true
    };

    /**
     * This method starts recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.startRecording();
     */
    this.startRecording = function () {
        var mediaType = this.mediaType;
        var recorderType;
        var mimeType = this.mimeType || {
            audio: null,
            video: null,
            gif: null
        };

        if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && mediaStream.getAudioTracks && !mediaStream.getAudioTracks().length) {
            // Firefox supports both audio/video in single blob
            mediaType.audio = false;
        }

        if (typeof mediaType.video !== 'function' && isMediaRecorderCompatible() && mediaStream.getVideoTracks && !mediaStream.getVideoTracks().length) {
            // Firefox supports both audio/video in single blob
            mediaType.video = false;
        }

        if (!mediaType.audio && !mediaType.video) {
            throw 'MediaStream must have either audio or video tracks.';
        }

        if (!!mediaType.audio) {
            recorderType = null;
            if (typeof mediaType.audio === 'function') {
                recorderType = mediaType.audio;
            }

            this.audioRecorder = new RecordRTC(mediaStream, {
                type: 'audio',
                bufferSize: this.bufferSize,
                sampleRate: this.sampleRate,
                numberOfAudioChannels: this.numberOfAudioChannels || 2,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.audio
            });

            if (!mediaType.video) {
                this.audioRecorder.startRecording();
            }
        }

        if (!!mediaType.video) {
            recorderType = null;
            if (typeof mediaType.video === 'function') {
                recorderType = mediaType.video;
            }

            var newStream = mediaStream;

            if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === 'function') {
                var videoTrack = mediaStream.getVideoTracks()[0];

                if (!!navigator.mozGetUserMedia) {
                    newStream = new MediaStream();
                    newStream.addTrack(videoTrack);

                    if (recorderType && recorderType === WhammyRecorder) {
                        // Firefox does NOT support webp-encoding yet
                        recorderType = MediaStreamRecorder;
                    }
                } else {
                    newStream = new MediaStream([videoTrack]);
                }
            }

            this.videoRecorder = new RecordRTC(newStream, {
                type: 'video',
                video: this.video,
                canvas: this.canvas,
                frameInterval: this.frameInterval || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.video
            });

            if (!mediaType.audio) {
                this.videoRecorder.startRecording();
            }
        }

        if (!!mediaType.audio && !!mediaType.video) {
            var self = this;
            if (isMediaRecorderCompatible()) {
                self.audioRecorder = null;
                self.videoRecorder.startRecording();
            } else {
                self.videoRecorder.initRecorder(function () {
                    self.audioRecorder.initRecorder(function () {
                        // Both recorders are ready to record things accurately
                        self.videoRecorder.startRecording();
                        self.audioRecorder.startRecording();
                    });
                });
            }
        }

        if (!!mediaType.gif) {
            recorderType = null;
            if (typeof mediaType.gif === 'function') {
                recorderType = mediaType.gif;
            }
            this.gifRecorder = new RecordRTC(mediaStream, {
                type: 'gif',
                frameRate: this.frameRate || 200,
                quality: this.quality || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.gif
            });
            this.gifRecorder.startRecording();
        }
    };

    /**
     * This method stops recording.
     * @param {function} callback - Callback function is invoked when all encoders finished their jobs.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.stopRecording(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     */
    this.stopRecording = function (callback) {
        callback = callback || function () { };

        if (this.audioRecorder) {
            this.audioRecorder.stopRecording(function (blobURL) {
                callback(blobURL, 'audio');
            });
        }

        if (this.videoRecorder) {
            this.videoRecorder.stopRecording(function (blobURL) {
                callback(blobURL, 'video');
            });
        }

        if (this.gifRecorder) {
            this.gifRecorder.stopRecording(function (blobURL) {
                callback(blobURL, 'gif');
            });
        }
    };

    /**
     * This method pauses recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.pauseRecording();
     */
    this.pauseRecording = function () {
        if (this.audioRecorder) {
            this.audioRecorder.pauseRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.pauseRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.pauseRecording();
        }
    };

    /**
     * This method resumes recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.resumeRecording();
     */
    this.resumeRecording = function () {
        if (this.audioRecorder) {
            this.audioRecorder.resumeRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.resumeRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.resumeRecording();
        }
    };

    /**
     * This method can be used to manually get all recorded blobs.
     * @param {function} callback - All recorded blobs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getBlob(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     * // or
     * var audioBlob = recorder.getBlob().audio;
     * var videoBlob = recorder.getBlob().video;
     */
    this.getBlob = function (callback) {
        var output = {};

        if (this.audioRecorder) {
            output.audio = this.audioRecorder.getBlob();
        }

        if (this.videoRecorder) {
            output.video = this.videoRecorder.getBlob();
        }

        if (this.gifRecorder) {
            output.gif = this.gifRecorder.getBlob();
        }

        if (callback) {
            callback(output);
        }

        return output;
    };

    /**
     * This method can be used to manually get all recorded blobs' DataURLs.
     * @param {function} callback - All recorded blobs' DataURLs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getDataURL(function(recording){
     *     var audioDataURL = recording.audio;
     *     var videoDataURL = recording.video;
     *     var gifDataURL   = recording.gif;
     * });
     */
    this.getDataURL = function (callback) {
        this.getBlob(function (blob) {
            if (blob.audio && blob.video) {
                getDataURL(blob.audio, function (_audioDataURL) {
                    getDataURL(blob.video, function (_videoDataURL) {
                        callback({
                            audio: _audioDataURL,
                            video: _videoDataURL
                        });
                    });
                });
            }
            else if (blob.audio) {
                getDataURL(blob.audio, function (_audioDataURL) {
                    callback({
                        audio: _audioDataURL
                    });
                });
            }
            else if (blob.video) {
                getDataURL(blob.video, function (_videoDataURL) {
                    callback({
                        video: _videoDataURL
                    });
                });
            }
        });

        function getDataURL(blob, callback00) {
            if (typeof Worker !== 'undefined') {
                var webWorker = processInWebWorker(function readFile(_blob) {
                    postMessage(new FileReaderSync().readAsDataURL(_blob));
                });

                webWorker.onmessage = function (event) {
                    callback00(event.data);
                };

                webWorker.postMessage(blob);
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function (event) {
                    callback00(event.target.result);
                };
            }
        }

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            var url;
            if (typeof URL !== 'undefined') {
                url = URL;
            } else if (typeof webkitURL !== 'undefined') {
                url = webkitURL;
            } else {
                throw 'Neither URL nor webkitURL detected.';
            }
            url.revokeObjectURL(blob);
            return worker;
        }
    };

    /**
     * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.writeToDisk();
     */
    this.writeToDisk = function () {
        RecordRTC.writeToDisk({
            audio: this.audioRecorder,
            video: this.videoRecorder,
            gif: this.gifRecorder
        });
    };

    /**
     * This method can be used to invoke a save-as dialog for all recorded blobs.
     * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.save({
     *     audio: 'audio-file-name',
     *     video: 'video-file-name',
     *     gif  : 'gif-file-name'
     * });
     */
    this.save = function (args) {
        args = args || {
            audio: true,
            video: true,
            gif: true
        };

        if (!!args.audio && this.audioRecorder) {
            this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
        }

        if (!!args.video && this.videoRecorder) {
            this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
        }
        if (!!args.gif && this.gifRecorder) {
            this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
        }
    };
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
MRecordRTC.getFromDisk = RecordRTC.getFromDisk;

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MRecordRTC = MRecordRTC;
}

var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

(function (that) {
    if (!that) {
        return;
    }

    if (typeof window !== 'undefined') {
        return;
    }

    if (typeof global === 'undefined') {
        return;
    }

    global.navigator = {
        userAgent: browserFakeUserAgent,
        getUserMedia: function () { }
    };

    if (!global.console) {
        global.console = {};
    }

    if (typeof global.console.debug === 'undefined') {
        global.console.debug = global.console.info = global.console.error = global.console.log = global.console.log || function () {
            console.log(arguments);
        };
    }

    if (typeof document === 'undefined') {
        /*global document:true */
        that.document = {};

        document.createElement = document.captureStream = document.mozCaptureStream = function () {
            var obj = {
                getContext: function () {
                    return obj;
                },
                play: function () { },
                pause: function () { },
                drawImage: function () { },
                toDataURL: function () {
                    return '';
                }
            };
            return obj;
        };

        that.HTMLVideoElement = function () { };
    }

    if (typeof location === 'undefined') {
        /*global location:true */
        that.location = {
            protocol: 'file:',
            href: '',
            hash: ''
        };
    }

    if (typeof screen === 'undefined') {
        /*global screen:true */
        that.screen = {
            width: 0,
            height: 0
        };
    }

    if (typeof URL === 'undefined') {
        /*global screen:true */
        that.URL = {
            createObjectURL: function () {
                return '';
            },
            revokeObjectURL: function () {
                return '';
            }
        };
    }

    /*global window:true */
    that.window = global;
})(typeof global !== 'undefined' ? global : null);

// _____________________________
// Cross-Browser-Declarations.js

// animation-frame used in WebM recording

/*jshint -W079 */
var requestAnimationFrame = window.requestAnimationFrame;
if (typeof requestAnimationFrame === 'undefined') {
    if (typeof webkitRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = webkitRequestAnimationFrame;
    }

    if (typeof mozRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = mozRequestAnimationFrame;
    }
}

/*jshint -W079 */
var cancelAnimationFrame = window.cancelAnimationFrame;
if (typeof cancelAnimationFrame === 'undefined') {
    if (typeof webkitCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = webkitCancelAnimationFrame;
    }

    if (typeof mozCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = mozCancelAnimationFrame;
    }
}

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
    if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
    }

    if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
    }
}

/*jshint -W079 */
var URL = window.URL;

if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
    /*global URL:true */
    URL = webkitURL;
}

if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
    if (typeof navigator.webkitGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    if (typeof navigator.mozGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.mozGetUserMedia;
    }
}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia;

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
    MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined') {
    if (!('getVideoTracks' in MediaStream.prototype)) {
        MediaStream.prototype.getVideoTracks = function () {
            if (!this.getTracks) {
                return [];
            }

            var tracks = [];
            this.getTracks.forEach(function (track) {
                if (track.kind.toString().indexOf('video') !== -1) {
                    tracks.push(track);
                }
            });
            return tracks;
        };

        MediaStream.prototype.getAudioTracks = function () {
            if (!this.getTracks) {
                return [];
            }

            var tracks = [];
            this.getTracks.forEach(function (track) {
                if (track.kind.toString().indexOf('audio') !== -1) {
                    tracks.push(track);
                }
            });
            return tracks;
        };
    }

    if (!('stop' in MediaStream.prototype)) {
        MediaStream.prototype.stop = function () {
            this.getAudioTracks().forEach(function (track) {
                if (!!track.stop) {
                    track.stop();
                }
            });

            this.getVideoTracks().forEach(function (track) {
                if (!!track.stop) {
                    track.stop();
                }
            });
        };
    }
}

// below function via: http://goo.gl/B3ae8c
/**
 * @param {number} bytes - Pass bytes and get formafted string.
 * @returns {string} - formafted string
 * @example
 * bytesToSize(1024*1024*5) === '5 GB'
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '0 Bytes';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * @param {Blob} file - File or Blob object. This parameter is required.
 * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
 * @example
 * invokeSaveAsDialog(blob or file, [optional] fileName);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        try {
            file.type = 'video/webm';
        } catch (e) { }
    }

    var fileExtension = (file.type || 'video/webm').split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.target = '_blank';
    hyperlink.download = fileFullName;

    if (!!navigator.mozGetUserMedia) {
        hyperlink.onclick = function () {
            (document.body || document.documentElement).removeChild(hyperlink);
        };
        (document.body || document.documentElement).appendChild(hyperlink);
    }

    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(evt);

    if (!navigator.mozGetUserMedia) {
        URL.revokeObjectURL(hyperlink.href);
    }
}

// __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
// Storage.js

/**
 * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @example
 * Storage.AudioContext === webkitAudioContext
 * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Storage = {};

if (typeof AudioContext !== 'undefined') {
    Storage.AudioContext = AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
    Storage.AudioContext = webkitAudioContext;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Storage = Storage;
}

function isMediaRecorderCompatible() {
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;
    var isFirefox = typeof window.InstallTrigger !== 'undefined';

    if (isFirefox) {
        return true;
    }

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    if (isChrome || isOpera) {
        verOffset = nAgt.indexOf('Chrome');
        fullVersion = nAgt.substring(verOffset + 7);
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt('' + fullVersion, 10);

    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return majorVersion >= 49;
}

// ______________________
// MediaStreamRecorder.js

// todo: need to show alert boxes for incompatible cases
// encoder only supports 48k/16k mono audio channel

/*
 * Implementation of https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html
 * The MediaRecorder accepts a mediaStream as input source passed from UA. When recorder starts,
 * a MediaEncoder will be created and accept the mediaStream as input source.
 * Encoder will get the raw data by track data changes, encode it by selected MIME Type, then store the encoded in EncodedBufferCache object.
 * The encoded data will be extracted on every timeslice passed from Start function call or by RequestData function.
 * Thread model:
 * When the recorder starts, it creates a "Media Encoder" thread to read data from MediaEncoder object and store buffer in EncodedBufferCache object.
 * Also extract the encoded data and create blobs on every timeslice passed from start function or RequestData function called by UA.
 */

/**
 * MediaStreamRecorder is an abstraction layer for "MediaRecorder API". It is used by {@link RecordRTC} to record MediaStream(s) in Firefox.
 * @summary Runs top over MediaRecorder API.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef MediaStreamRecorder
 * @class
 * @example
 * var options = {
 *     mimeType: 'video/mp4', // audio/ogg or video/webm
 *     audioBitsPerSecond : 256 * 8 * 1024,
 *     videoBitsPerSecond : 256 * 8 * 1024,
 *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
 *     getNativeBlob: true // by default it is false
 * }
 * var recorder = new MediaStreamRecorder(MediaStream, options);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", onAudioProcessStarted: function}
 */

function MediaStreamRecorder(mediaStream, config) {
    var self = this;

    config = config || {
        // bitsPerSecond: 256 * 8 * 1024,
        mimeType: 'video/webm'
    };

    if (config.type === 'audio') {
        if (mediaStream.getVideoTracks().length && mediaStream.getAudioTracks().length) {
            var stream;
            if (!!navigator.mozGetUserMedia) {
                stream = new MediaStream();
                stream.addTrack(mediaStream.getAudioTracks()[0]);
            } else {
                // webkitMediaStream
                stream = new MediaStream(mediaStream.getAudioTracks());
            }
            mediaStream = stream;
        }

        if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf('audio') === -1) {
            config.mimeType = isChrome ? 'audio/webm' : 'audio/ogg';
        }

        if (config.mimeType && config.mimeType.toString().toLowerCase() !== 'audio/ogg' && !!navigator.mozGetUserMedia) {
            // forcing better codecs on Firefox (via #166)
            config.mimeType = 'audio/ogg';
        }
    }

    /**
     * This method records MediaStream.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.record();
     */
    this.record = function () {
        self.blob = null;

        var recorderHints = config;

        if (!config.disableLogs) {
            console.log('Passing following config over MediaRecorder API.', recorderHints);
        }

        if (mediaRecorder) {
            // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
            mediaRecorder = null;
        }

        if (isChrome && !isMediaRecorderCompatible()) {
            // to support video-only recording on stable
            recorderHints = 'video/vp8';
        }

        // http://dxr.mozilla.org/mozilla-central/source/content/media/MediaRecorder.cpp
        // https://wiki.mozilla.org/Gecko:MediaRecorder
        // https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html

        // starting a recording session; which will initiate "Reading Thread"
        // "Reading Thread" are used to prevent main-thread blocking scenarios
        try {
            mediaRecorder = new MediaRecorder(mediaStream, recorderHints);
        } catch (e) {
            mediaRecorder = new MediaRecorder(mediaStream);
        }

        if ('canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(config.mimeType) === false) {
            if (!config.disableLogs) {
                console.warn('MediaRecorder API seems unable to record mimeType:', config.mimeType);
            }
        }

        // i.e. stop recording when <video> is paused by the user; and auto restart recording 
        // when video is resumed. E.g. yourStream.getVideoTracks()[0].muted = true; // it will auto-stop recording.
        mediaRecorder.ignoreMutedMedia = config.ignoreMutedMedia || false;

        // Dispatching OnDataAvailable Handler
        mediaRecorder.ondataavailable = function (e) {
            if (self.dontFireOnDataAvailableEvent) {
                return;
            }

            if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
                return;
            }

            /**
             * @property {Blob} blob - Recorded frames in video/webm blob.
             * @memberof MediaStreamRecorder
             * @example
             * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
             */
            self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                type: config.mimeType || 'video/webm'
            });

            if (self.recordingCallback) {
                self.recordingCallback(self.blob);
                self.recordingCallback = null;
            }
        };

        mediaRecorder.onerror = function (error) {
            if (!config.disableLogs) {
                if (error.name === 'InvalidState') {
                    console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.');
                } else if (error.name === 'OutOfMemory') {
                    console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.');
                } else if (error.name === 'IllegalStreamModification') {
                    console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.');
                } else if (error.name === 'OtherRecordingError') {
                    console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.');
                } else if (error.name === 'GenericError') {
                    console.error('The UA cannot provide the codec or recording option that has been requested.', error);
                } else {
                    console.error('MediaRecorder Error', error);
                }
            }

            // When the stream is "ended" set recording to 'inactive' 
            // and stop gathering data. Callers should not rely on 
            // exactness of the timeSlice value, especially 
            // if the timeSlice value is small. Callers should 
            // consider timeSlice as a minimum value

            if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
                mediaRecorder.stop();
            }
        };

        // void start(optional long mTimeSlice)
        // The interval of passing encoded data from EncodedBufferCache to onDataAvailable
        // handler. "mTimeSlice < 0" means Session object does not push encoded data to
        // onDataAvailable, instead, it passive wait the client side pull encoded data
        // by calling requestData API.
        mediaRecorder.start(3.6e+6);

        // Start recording. If timeSlice has been provided, mediaRecorder will
        // raise a dataavailable event containing the Blob of collected data on every timeSlice milliseconds.
        // If timeSlice isn't provided, UA should call the RequestData to obtain the Blob data, also set the mTimeSlice to zero.

        if (config.onAudioProcessStarted) {
            config.onAudioProcessStarted();
        }

        if (config.initCallback) {
            config.initCallback();
        }
    };

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function (callback) {
        if (!mediaRecorder) {
            return;
        }

        this.recordingCallback = function (blob) {
            mediaRecorder = null;

            if (callback) {
                callback(blob);
            }
        };

        // mediaRecorder.state === 'recording' means that media recorder is associated with "session"
        // mediaRecorder.state === 'stopped' means that media recorder is detached from the "session" ... in this case; "session" will also be deleted.

        if (mediaRecorder.state === 'recording') {
            // "stop" method auto invokes "requestData"!
            // mediaRecorder.requestData();
            mediaRecorder.stop();
        }
    };

    /**
     * This method pauses the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function () {
        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function () {
        if (this.dontFireOnDataAvailableEvent) {
            this.dontFireOnDataAvailableEvent = false;

            var disableLogs = config.disableLogs;
            config.disableLogs = true;
            this.record();
            config.disableLogs = disableLogs;
            return;
        }

        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function () {
        if (!mediaRecorder) {
            return;
        }

        this.pause();

        this.dontFireOnDataAvailableEvent = true;
        this.stop();
    };

    // Reference to "MediaRecorder" object
    var mediaRecorder;

    function isMediaStreamActive() {
        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    var self = this;

    // this method checks if media stream is stopped
    // or any track is ended.
    (function looper() {
        if (!mediaRecorder) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            self.stop();
            return;
        }

        setTimeout(looper, 1000); // check every second
    })();
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
}

// source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
// https://github.com/mattdiamond/Recorderjs#license-mit
// ______________________
// StereoAudioRecorder.js

/**
 * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
 * @summary JavaScript standalone object for stereo audio recording.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef StereoAudioRecorder
 * @class
 * @example
 * var recorder = new StereoAudioRecorder(MediaStream, {
 *     sampleRate: 44100,
 *     bufferSize: 4096
 * });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
 */

function StereoAudioRecorder(mediaStream, config) {
    if (!mediaStream.getAudioTracks().length) {
        throw 'Your stream has no audio tracks.';
    }

    config = config || {};

    var self = this;

    // variables
    var leftchannel = [];
    var rightchannel = [];
    var recording = false;
    var recordingLength = 0;
    var jsAudioNode;

    var numberOfAudioChannels = 2;

    // backward compatibility
    if (config.leftChannel === true) {
        numberOfAudioChannels = 1;
    }

    if (config.numberOfAudioChannels === 1) {
        numberOfAudioChannels = 1;
    }

    if (!config.disableLogs) {
        console.debug('StereoAudioRecorder is set to record number of channels: ', numberOfAudioChannels);
    }

    function isMediaStreamActive() {
        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    /**
     * This method records MediaStream.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.record();
     */
    this.record = function () {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;

        if (audioInput) {
            audioInput.connect(jsAudioNode);
        }

        // to prevent self audio to be connected with speakers
        // jsAudioNode.connect(context.destination);

        isAudioProcessStarted = isPaused = false;
        recording = true;
    };

    function mergeLeftRightBuffers(config, callback) {
        function mergeAudioBuffers(config, cb) {
            var numberOfAudioChannels = config.numberOfAudioChannels;

            // todo: "slice(0)" --- is it causes loop? Should be removed?
            var leftBuffers = config.leftBuffers.slice(0);
            var rightBuffers = config.rightBuffers.slice(0);
            var sampleRate = config.sampleRate;
            var internalInterleavedLength = config.internalInterleavedLength;

            if (numberOfAudioChannels === 2) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
                rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
            }

            if (numberOfAudioChannels === 1) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
            }

            function mergeBuffers(channelBuffer, rLength) {
                var result = new Float64Array(rLength);
                var offset = 0;
                var lng = channelBuffer.length;

                for (var i = 0; i < lng; i++) {
                    var buffer = channelBuffer[i];
                    result.set(buffer, offset);
                    offset += buffer.length;
                }

                return result;
            }

            function interleave(leftChannel, rightChannel) {
                var length = leftChannel.length + rightChannel.length;

                var result = new Float64Array(length);

                var inputIndex = 0;

                for (var index = 0; index < length;) {
                    result[index++] = leftChannel[inputIndex];
                    result[index++] = rightChannel[inputIndex];
                    inputIndex++;
                }
                return result;
            }

            function writeUTFBytes(view, offset, string) {
                var lng = string.length;
                for (var i = 0; i < lng; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }

            // interleave both channels together
            var interleaved;

            if (numberOfAudioChannels === 2) {
                interleaved = interleave(leftBuffers, rightBuffers);
            }

            if (numberOfAudioChannels === 1) {
                interleaved = leftBuffers;
            }

            var interleavedLength = interleaved.length;

            // create wav file
            var resultingBufferLength = 44 + interleavedLength * 2;

            var buffer = new ArrayBuffer(resultingBufferLength);

            var view = new DataView(buffer);

            // RIFF chunk descriptor/identifier 
            writeUTFBytes(view, 0, 'RIFF');

            // RIFF chunk length
            view.setUint32(4, 44 + interleavedLength * 2, true);

            // RIFF type 
            writeUTFBytes(view, 8, 'WAVE');

            // format chunk identifier 
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');

            // format chunk length 
            view.setUint32(16, 16, true);

            // sample format (raw)
            view.setUint16(20, 1, true);

            // stereo (2 channels)
            view.setUint16(22, numberOfAudioChannels, true);

            // sample rate 
            view.setUint32(24, sampleRate, true);

            // byte rate (sample rate * block align)
            view.setUint32(28, sampleRate * 2, true);

            // block align (channel count * bytes per sample) 
            view.setUint16(32, numberOfAudioChannels * 2, true);

            // bits per sample 
            view.setUint16(34, 16, true);

            // data sub-chunk
            // data chunk identifier 
            writeUTFBytes(view, 36, 'data');

            // data chunk length 
            view.setUint32(40, interleavedLength * 2, true);

            // write the PCM samples
            var lng = interleavedLength;
            var index = 44;
            var volume = 1;
            for (var i = 0; i < lng; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

            if (cb) {
                return cb({
                    buffer: buffer,
                    view: view
                });
            }

            postMessage({
                buffer: buffer,
                view: view
            });
        }

        if (!isChrome) {
            // its Microsoft Edge
            mergeAudioBuffers(config, function (data) {
                callback(data.buffer, data.view);
            });
            return;
        }


        var webWorker = processInWebWorker(mergeAudioBuffers);

        webWorker.onmessage = function (event) {
            callback(event.data.buffer, event.data.view);

            // release memory
            URL.revokeObjectURL(webWorker.workerURL);
        };

        webWorker.postMessage(config);
    }

    function processInWebWorker(_function) {
        var workerURL = URL.createObjectURL(new Blob([_function.toString(),
            ';this.onmessage =  function (e) {' + _function.name + '(e.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(workerURL);
        worker.workerURL = workerURL;
        return worker;
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function (callback) {
        // stop recording
        recording = false;

        // to make sure onaudioprocess stops firing
        // audioInput.disconnect();

        mergeLeftRightBuffers({
            sampleRate: sampleRate,
            numberOfAudioChannels: numberOfAudioChannels,
            internalInterleavedLength: recordingLength,
            leftBuffers: leftchannel,
            rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel
        }, function (buffer, view) {
            /**
             * @property {Blob} blob - The recorded blob object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var blob = recorder.blob;
             * });
             */
            self.blob = new Blob([view], {
                type: 'audio/wav'
            });

            /**
             * @property {ArrayBuffer} buffer - The recorded buffer object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var buffer = recorder.buffer;
             * });
             */
            self.buffer = new ArrayBuffer(view.buffer.byteLength);

            /**
             * @property {DataView} view - The recorded data-view object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var view = recorder.view;
             * });
             */
            self.view = view;

            self.sampleRate = sampleRate;
            self.bufferSize = bufferSize;

            // recorded audio length
            self.length = recordingLength;

            if (callback) {
                callback();
            }

            isAudioProcessStarted = false;
        });
    };

    if (!Storage.AudioContextConstructor) {
        Storage.AudioContextConstructor = new Storage.AudioContext();
    }

    var context = Storage.AudioContextConstructor;

    // creates an audio node from the microphone incoming stream
    var audioInput = context.createMediaStreamSource(mediaStream);

    var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];

    /**
     * From the spec: This value controls how frequently the audioprocess event is
     * dispatched and how many sample-frames need to be processed each call.
     * Lower values for buffer size will result in a lower (better) latency.
     * Higher values will be necessary to avoid audio breakup and glitches
     * The size of the buffer (in sample-frames) which needs to
     * be processed each time onprocessaudio is called.
     * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
     * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     bufferSize: 4096
     * });
     */

    // "0" means, let chrome decide the most accurate buffer-size for current platform.
    var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

    if (legalBufferValues.indexOf(bufferSize) === -1) {
        if (!config.disableLogs) {
            console.warn('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
        }
    }

    if (context.createJavaScriptNode) {
        jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else if (context.createScriptProcessor) {
        jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else {
        throw 'WebAudio API has no support on this browser.';
    }

    // connect the stream to the gain node
    audioInput.connect(jsAudioNode);

    if (!config.bufferSize) {
        bufferSize = jsAudioNode.bufferSize; // device buffer-size
    }

    /**
     * The sample rate (in sample-frames per second) at which the
     * AudioContext handles audio. It is assumed that all AudioNodes
     * in the context run at this rate. In making this assumption,
     * sample-rate converters or "varispeed" processors are not supported
     * in real-time processing.
     * The sampleRate parameter describes the sample-rate of the
     * linear PCM audio data in the buffer in sample-frames per second.
     * An implementation must support sample-rates in at least
     * the range 22050 to 96000.
     * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     sampleRate: 44100
     * });
     */
    var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

    if (sampleRate < 22050 || sampleRate > 96000) {
        // Ref: http://stackoverflow.com/a/26303918/552182
        if (!config.disableLogs) {
            console.warn('sample-rate must be under range 22050 and 96000.');
        }
    }

    if (!config.disableLogs) {
        console.log('sample-rate', sampleRate);
        console.log('buffer-size', bufferSize);
    }

    var isPaused = false;
    /**
     * This method pauses the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function () {
        isPaused = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function () {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        if (!recording) {
            if (!config.disableLogs) {
                console.info('Seems recording has been restarted.');
            }
            this.record();
            return;
        }

        isPaused = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function () {
        this.pause();

        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
    };

    var isAudioProcessStarted = false;

    function onAudioProcessDataAvailable(e) {
        if (isPaused) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            jsAudioNode.disconnect();
            recording = false;
        }

        if (!recording) {
            audioInput.disconnect();
            return;
        }

        /**
         * This method is called on "onaudioprocess" event's first invocation.
         * @method {function} onAudioProcessStarted
         * @memberof StereoAudioRecorder
         * @example
         * recorder.onAudioProcessStarted: function() { };
         */
        if (!isAudioProcessStarted) {
            isAudioProcessStarted = true;
            if (config.onAudioProcessStarted) {
                config.onAudioProcessStarted();
            }

            if (config.initCallback) {
                config.initCallback();
            }
        }

        var left = e.inputBuffer.getChannelData(0);

        // we clone the samples
        leftchannel.push(new Float32Array(left));

        if (numberOfAudioChannels === 2) {
            var right = e.inputBuffer.getChannelData(1);
            rightchannel.push(new Float32Array(right));
        }

        recordingLength += bufferSize;
    }

    jsAudioNode.onaudioprocess = onAudioProcessDataAvailable;

    // to prevent self audio to be connected with speakers
    jsAudioNode.connect(context.destination);
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
}

// _________________
// CanvasRecorder.js

/**
 * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
 * @summary HTML2Canvas recording into video WebM.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef CanvasRecorder
 * @class
 * @example
 * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
 * @param {object} config - {disableLogs:true, initCallback: function}
 */

function CanvasRecorder(htmlElement, config) {
    if (typeof html2canvas === 'undefined' && htmlElement.nodeName.toLowerCase() !== 'canvas') {
        throw 'Please link: https://cdn.webrtc-experiment.com/screenshot.js';
    }

    config = config || {};
    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    // via DetectRTC.js
    var isCanvasSupportsStreamCapturing = false;
    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function (item) {
        if (item in document.createElement('canvas')) {
            isCanvasSupportsStreamCapturing = true;
        }
    });

    var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;

    var chromeVersion = 50;
    var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if (_isChrome && matchArray && matchArray[2]) {
        chromeVersion = parseInt(matchArray[2], 10);
    }

    if (_isChrome && chromeVersion < 52) {
        isCanvasSupportsStreamCapturing = false;
    }

    var globalCanvas, mediaStreamRecorder;

    if (isCanvasSupportsStreamCapturing) {
        if (!config.disableLogs) {
            console.debug('Your browser supports both MediRecorder API and canvas.captureStream!');
        }

        if (htmlElement instanceof HTMLCanvasElement) {
            globalCanvas = htmlElement;
        } else if (htmlElement instanceof CanvasRenderingContext2D) {
            globalCanvas = htmlElement.canvas;
        } else {
            throw 'Please pass either HTMLCanvasElement or CanvasRenderingContext2D.';
        }
    } else if (!!navigator.mozGetUserMedia) {
        if (!config.disableLogs) {
            console.error('Canvas recording is NOT supported in Firefox.');
        }
    }

    var isRecording;

    /**
     * This method records Canvas.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.record();
     */
    this.record = function () {
        isRecording = true;

        if (isCanvasSupportsStreamCapturing) {
            // CanvasCaptureMediaStream
            var canvasMediaStream;
            if ('captureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
            } else if ('mozCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.mozCaptureStream(25);
            } else if ('webkitCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.webkitCaptureStream(25);
            }

            try {
                var mdStream = new MediaStream();
                mdStream.addTrack(canvasMediaStream.getVideoTracks()[0]);
                canvasMediaStream = mdStream;
            } catch (e) { }

            if (!canvasMediaStream) {
                throw 'captureStream API are NOT available.';
            }

            // Note: Jan 18, 2016 status is that, 
            // Firefox MediaRecorder API can't record CanvasCaptureMediaStream object.
            mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
                mimeType: 'video/webm'
            });
            mediaStreamRecorder.record();
        } else {
            whammy.frames = [];
            lastTime = new Date().getTime();
            drawCanvasFrame();
        }

        if (config.initCallback) {
            config.initCallback();
        }
    };

    this.getWebPImages = function (callback) {
        if (htmlElement.nodeName.toLowerCase() !== 'canvas') {
            callback();
            return;
        }

        var framesLength = whammy.frames.length;
        whammy.frames.forEach(function (frame, idx) {
            var framesRemaining = framesLength - idx;
            if (!config.disableLogs) {
                console.debug(framesRemaining + '/' + framesLength + ' frames remaining');
            }

            if (config.onEncodingCallback) {
                config.onEncodingCallback(framesRemaining, framesLength);
            }

            var webp = frame.image.toDataURL('image/webp', 1);
            whammy.frames[idx].image = webp;
        });

        if (!config.disableLogs) {
            console.debug('Generating WebM');
        }

        callback();
    };

    /**
     * This method stops recording Canvas.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function (callback) {
        isRecording = false;

        var that = this;

        if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
            mediaStreamRecorder.stop(callback);
            return;
        }

        this.getWebPImages(function () {
            /**
             * @property {Blob} blob - Recorded frames in video/webm blob.
             * @memberof CanvasRecorder
             * @example
             * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
             */
            whammy.compile(function (blob) {
                if (!config.disableLogs) {
                    console.debug('Recording finished!');
                }

                that.blob = blob;

                if (that.blob.forEach) {
                    that.blob = new Blob([], {
                        type: 'video/webm'
                    });
                }

                if (callback) {
                    callback(that.blob);
                }

                whammy.frames = [];
            });
        });
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function () {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function () {
        isPausedRecording = false;

        if (!isRecording) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function () {
        this.pause();
        whammy.frames = [];
    };

    function cloneCanvas() {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = htmlElement.width;
        newCanvas.height = htmlElement.height;

        //apply the old canvas to the new one
        context.drawImage(htmlElement, 0, 0);

        //return the new canvas
        return newCanvas;
    }

    function drawCanvasFrame() {
        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawCanvasFrame, 500);
        }

        if (htmlElement.nodeName.toLowerCase() === 'canvas') {
            var duration = new Date().getTime() - lastTime;
            // via #206, by Jack i.e. @Seymourr
            lastTime = new Date().getTime();

            whammy.frames.push({
                image: cloneCanvas(),
                duration: duration
            });

            if (isRecording) {
                setTimeout(drawCanvasFrame, config.frameInterval);
            }
            return;
        }

        html2canvas(htmlElement, {
            grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
            onrendered: function (canvas) {
                var duration = new Date().getTime() - lastTime;
                if (!duration) {
                    return setTimeout(drawCanvasFrame, config.frameInterval);
                }

                // via #206, by Jack i.e. @Seymourr
                lastTime = new Date().getTime();

                whammy.frames.push({
                    image: canvas.toDataURL('image/webp', 1),
                    duration: duration
                });

                if (isRecording) {
                    setTimeout(drawCanvasFrame, config.frameInterval);
                }
            }
        });
    }

    var lastTime = new Date().getTime();

    var whammy = new Whammy.Video(100);
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.CanvasRecorder = CanvasRecorder;
}

// _________________
// WhammyRecorder.js

/**
 * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
 * @summary Video recording feature in Chrome.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef WhammyRecorder
 * @class
 * @example
 * var recorder = new WhammyRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
 */

function WhammyRecorder(mediaStream, config) {

    config = config || {};

    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    if (!config.disableLogs) {
        console.log('Using frames-interval:', config.frameInterval);
    }

    /**
     * This method records video.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.record();
     */
    this.record = function () {
        if (!config.width) {
            config.width = 320;
        }

        if (!config.height) {
            config.height = 240;
        }

        if (!config.video) {
            config.video = {
                width: config.width,
                height: config.height
            };
        }

        if (!config.canvas) {
            config.canvas = {
                width: config.width,
                height: config.height
            };
        }

        canvas.width = config.canvas.width;
        canvas.height = config.canvas.height;

        context = canvas.getContext('2d');

        // setting defaults
        if (config.video && config.video instanceof HTMLVideoElement) {
            video = config.video.cloneNode();

            if (config.initCallback) {
                config.initCallback();
            }
        } else {
            video = document.createElement('video');

            if (typeof video.srcObject !== 'undefined') {
                video.srcObject = mediaStream;
            } else {
                video.src = URL.createObjectURL(mediaStream);
            }

            video.onloadedmetadata = function () { // "onloadedmetadata" may NOT work in FF?
                if (config.initCallback) {
                    config.initCallback();
                }
            };

            video.width = config.video.width;
            video.height = config.video.height;
        }

        video.muted = true;
        video.play();

        lastTime = new Date().getTime();
        whammy = new Whammy.Video();

        if (!config.disableLogs) {
            console.log('canvas resolutions', canvas.width, '*', canvas.height);
            console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
        }

        drawFrames(config.frameInterval);
    };

    /**
     * Draw and push frames to Whammy
     * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
     */
    function drawFrames(frameInterval) {
        frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;

        var duration = new Date().getTime() - lastTime;
        if (!duration) {
            return setTimeout(drawFrames, frameInterval, frameInterval);
        }

        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawFrames, 100);
        }

        // via #206, by Jack i.e. @Seymourr
        lastTime = new Date().getTime();

        if (video.paused) {
            // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
            // Tweak for Android Chrome
            video.play();
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        whammy.frames.push({
            duration: duration,
            image: canvas.toDataURL('image/webp')
        });

        if (!isStopDrawing) {
            setTimeout(drawFrames, frameInterval, frameInterval);
        }
    }

    function asyncLoop(o) {
        var i = -1,
            length = o.length;

        var loop = function () {
            i++;
            if (i === length) {
                o.callback();
                return;
            }
            o.functionToLoop(loop, i);
        };
        loop(); //init
    }


    /**
     * remove black frames from the beginning to the specified frame
     * @param {Array} _frames - array of frames to be checked
     * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
     * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
     * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
     * @returns {Array} - array of frames
     */
    // pull#293 by @volodalexey
    function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
        var localCanvas = document.createElement('canvas');
        localCanvas.width = canvas.width;
        localCanvas.height = canvas.height;
        var context2d = localCanvas.getContext('2d');
        var resultFrames = [];

        var checkUntilNotBlack = _framesToCheck === -1;
        var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
            _framesToCheck : _frames.length;
        var sampleColor = {
            r: 0,
            g: 0,
            b: 0
        };
        var maxColorDifference = Math.sqrt(
            Math.pow(255, 2) +
            Math.pow(255, 2) +
            Math.pow(255, 2)
        );
        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
        var doNotCheckNext = false;

        asyncLoop({
            length: endCheckFrame,
            functionToLoop: function (loop, f) {
                var matchPixCount, endPixCheck, maxPixCount;

                var finishImage = function () {
                    if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
                    } else {
                        // console.log('frame is passed : ' + f);
                        if (checkUntilNotBlack) {
                            doNotCheckNext = true;
                        }
                        resultFrames.push(_frames[f]);
                    }
                    loop();
                };

                if (!doNotCheckNext) {
                    var image = new Image();
                    image.onload = function () {
                        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                        matchPixCount = 0;
                        endPixCheck = imageData.data.length;
                        maxPixCount = imageData.data.length / 4;

                        for (var pix = 0; pix < endPixCheck; pix += 4) {
                            var currentColor = {
                                r: imageData.data[pix],
                                g: imageData.data[pix + 1],
                                b: imageData.data[pix + 2]
                            };
                            var colorDifference = Math.sqrt(
                                Math.pow(currentColor.r - sampleColor.r, 2) +
                                Math.pow(currentColor.g - sampleColor.g, 2) +
                                Math.pow(currentColor.b - sampleColor.b, 2)
                            );
                            // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                            if (colorDifference <= maxColorDifference * pixTolerance) {
                                matchPixCount++;
                            }
                        }
                        finishImage();
                    };
                    image.src = _frames[f].image;
                } else {
                    finishImage();
                }
            },
            callback: function () {
                resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

                if (resultFrames.length <= 0) {
                    // at least one last frame should be available for next manipulation
                    // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
                    resultFrames.push(_frames[_frames.length - 1]);
                }
                callback(resultFrames);
            }
        });
    }

    var isStopDrawing = false;

    /**
     * This method stops recording video.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function (callback) {
        isStopDrawing = true;

        var _this = this;
        // analyse of all frames takes some time!
        setTimeout(function () {
            // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
            // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
            // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
            dropBlackFrames(whammy.frames, -1, null, null, function (frames) {
                whammy.frames = frames;

                // to display advertisement images!
                if (config.advertisement && config.advertisement.length) {
                    whammy.frames = config.advertisement.concat(whammy.frames);
                }

                /**
                 * @property {Blob} blob - Recorded frames in video/webm blob.
                 * @memberof WhammyRecorder
                 * @example
                 * recorder.stop(function() {
                 *     var blob = recorder.blob;
                 * });
                 */
                whammy.compile(function (blob) {
                    _this.blob = blob;

                    if (_this.blob.forEach) {
                        _this.blob = new Blob([], {
                            type: 'video/webm'
                        });
                    }

                    if (callback) {
                        callback(_this.blob);
                    }
                });
            });
        }, 10);
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function () {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function () {
        isPausedRecording = false;

        if (isStopDrawing) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function () {
        this.pause();
        whammy.frames = [];
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var video;
    var lastTime;
    var whammy;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.WhammyRecorder = WhammyRecorder;
}

// https://github.com/antimatter15/whammy/blob/master/LICENSE
// _________
// Whammy.js

// todo: Firefox now supports webp for webm containers!
// their MediaRecorder implementation works well!
// should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

/**
 * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
 * @summary A real time javascript webm encoder based on a canvas hack.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef Whammy
 * @class
 * @example
 * var recorder = new Whammy().Video(15);
 * recorder.add(context || canvas || dataURL);
 * var output = recorder.compile();
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Whammy = (function () {
    // a more abstract-ish API

    function WhammyVideo(duration) {
        this.frames = [];
        this.duration = duration || 1;
        this.quality = 0.8;
    }

    /**
     * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.add(canvas || context || 'image/webp');
     * @param {string} frame - Canvas || Context || image/webp
     * @param {number} duration - Stick a duration (in milliseconds)
     */
    WhammyVideo.prototype.add = function (frame, duration) {
        if ('canvas' in frame) { //CanvasRenderingContext2D
            frame = frame.canvas;
        }

        if ('toDataURL' in frame) {
            frame = frame.toDataURL('image/webp', this.quality);
        }

        if (!(/^data:image\/webp;base64,/ig).test(frame)) {
            throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
        }
        this.frames.push({
            image: frame,
            duration: duration || this.duration
        });
    };

    function processInWebWorker(_function) {
        var blob = URL.createObjectURL(new Blob([_function.toString(),
            'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
    }

    function whammyInWebWorker(frames) {
        function ArrayToWebM(frames) {
            var info = checkFrames(frames);
            if (!info) {
                return [];
            }

            var clusterMaxDuration = 30000;

            var EBML = [{
                'id': 0x1a45dfa3, // EBML
                'data': [{
                    'data': 1,
                    'id': 0x4286 // EBMLVersion
                }, {
                    'data': 1,
                    'id': 0x42f7 // EBMLReadVersion
                }, {
                    'data': 4,
                    'id': 0x42f2 // EBMLMaxIDLength
                }, {
                    'data': 8,
                    'id': 0x42f3 // EBMLMaxSizeLength
                }, {
                    'data': 'webm',
                    'id': 0x4282 // DocType
                }, {
                    'data': 2,
                    'id': 0x4287 // DocTypeVersion
                }, {
                    'data': 2,
                    'id': 0x4285 // DocTypeReadVersion
                }]
            }, {
                'id': 0x18538067, // Segment
                'data': [{
                    'id': 0x1549a966, // Info
                    'data': [{
                        'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
                        'id': 0x2ad7b1 // TimecodeScale
                    }, {
                        'data': 'whammy',
                        'id': 0x4d80 // MuxingApp
                    }, {
                        'data': 'whammy',
                        'id': 0x5741 // WritingApp
                    }, {
                        'data': doubleToString(info.duration),
                        'id': 0x4489 // Duration
                    }]
                }, {
                    'id': 0x1654ae6b, // Tracks
                    'data': [{
                        'id': 0xae, // TrackEntry
                        'data': [{
                            'data': 1,
                            'id': 0xd7 // TrackNumber
                        }, {
                            'data': 1,
                            'id': 0x73c5 // TrackUID
                        }, {
                            'data': 0,
                            'id': 0x9c // FlagLacing
                        }, {
                            'data': 'und',
                            'id': 0x22b59c // Language
                        }, {
                            'data': 'V_VP8',
                            'id': 0x86 // CodecID
                        }, {
                            'data': 'VP8',
                            'id': 0x258688 // CodecName
                        }, {
                            'data': 1,
                            'id': 0x83 // TrackType
                        }, {
                            'id': 0xe0, // Video
                            'data': [{
                                'data': info.width,
                                'id': 0xb0 // PixelWidth
                            }, {
                                'data': info.height,
                                'id': 0xba // PixelHeight
                            }]
                        }]
                    }]
                }]
            }];

            //Generate clusters (max duration)
            var frameNumber = 0;
            var clusterTimecode = 0;
            while (frameNumber < frames.length) {

                var clusterFrames = [];
                var clusterDuration = 0;
                do {
                    clusterFrames.push(frames[frameNumber]);
                    clusterDuration += frames[frameNumber].duration;
                    frameNumber++;
                } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

                var clusterCounter = 0;
                var cluster = {
                    'id': 0x1f43b675, // Cluster
                    'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
                }; //Add cluster to segment
                EBML[1].data.push(cluster);
                clusterTimecode += clusterDuration;
            }

            return generateEBML(EBML);
        }

        function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
            return [{
                'data': clusterTimecode,
                'id': 0xe7 // Timecode
            }].concat(clusterFrames.map(function (webp) {
                var block = makeSimpleBlock({
                    discardable: 0,
                    frame: webp.data.slice(4),
                    invisible: 0,
                    keyframe: 1,
                    lacing: 0,
                    trackNum: 1,
                    timecode: Math.round(clusterCounter)
                });
                clusterCounter += webp.duration;
                return {
                    data: block,
                    id: 0xa3
                };
            }));
        }

        // sums the lengths of all the frames and gets the duration

        function checkFrames(frames) {
            if (!frames[0]) {
                postMessage({
                    error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
                });
                return;
            }

            var width = frames[0].width,
                height = frames[0].height,
                duration = frames[0].duration;

            for (var i = 1; i < frames.length; i++) {
                duration += frames[i].duration;
            }
            return {
                duration: duration,
                width: width,
                height: height
            };
        }

        function numToBuffer(num) {
            var parts = [];
            while (num > 0) {
                parts.push(num & 0xff);
                num = num >> 8;
            }
            return new Uint8Array(parts.reverse());
        }

        function strToBuffer(str) {
            return new Uint8Array(str.split('').map(function (e) {
                return e.charCodeAt(0);
            }));
        }

        function bitsToBuffer(bits) {
            var data = [];
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data.push(parseInt(bits.substr(i, 8), 2));
            }
            return new Uint8Array(data);
        }

        function generateEBML(json) {
            var ebml = [];
            for (var i = 0; i < json.length; i++) {
                var data = json[i].data;

                if (typeof data === 'object') {
                    data = generateEBML(data);
                }

                if (typeof data === 'number') {
                    data = bitsToBuffer(data.toString(2));
                }

                if (typeof data === 'string') {
                    data = strToBuffer(data);
                }

                var len = data.size || data.byteLength || data.length;
                var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
                var sizeToString = len.toString(2);
                var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
                var size = (new Array(zeroes)).join('0') + '1' + padded;

                ebml.push(numToBuffer(json[i].id));
                ebml.push(bitsToBuffer(size));
                ebml.push(data);
            }

            return new Blob(ebml, {
                type: 'video/webm'
            });
        }

        function toBinStrOld(bits) {
            var data = '';
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
            }
            return data;
        }

        function makeSimpleBlock(data) {
            var flags = 0;

            if (data.keyframe) {
                flags |= 128;
            }

            if (data.invisible) {
                flags |= 8;
            }

            if (data.lacing) {
                flags |= (data.lacing << 1);
            }

            if (data.discardable) {
                flags |= 1;
            }

            if (data.trackNum > 127) {
                throw 'TrackNumber > 127 not supported';
            }

            var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function (e) {
                return String.fromCharCode(e);
            }).join('') + data.frame;

            return out;
        }

        function parseWebP(riff) {
            var VP8 = riff.RIFF[0].WEBP[0];

            var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
            for (var i = 0, c = []; i < 4; i++) {
                c[i] = VP8.charCodeAt(frameStart + 3 + i);
            }

            var width, height, tmp;

            //the code below is literally copied verbatim from the bitstream spec
            tmp = (c[1] << 8) | c[0];
            width = tmp & 0x3FFF;
            tmp = (c[3] << 8) | c[2];
            height = tmp & 0x3FFF;
            return {
                width: width,
                height: height,
                data: VP8,
                riff: riff
            };
        }

        function getStrLength(string, offset) {
            return parseInt(string.substr(offset + 4, 4).split('').map(function (i) {
                var unpadded = i.charCodeAt(0).toString(2);
                return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
            }).join(''), 2);
        }

        function parseRIFF(string) {
            var offset = 0;
            var chunks = {};

            while (offset < string.length) {
                var id = string.substr(offset, 4);
                var len = getStrLength(string, offset);
                var data = string.substr(offset + 4 + 4, len);
                offset += 4 + 4 + len;
                chunks[id] = chunks[id] || [];

                if (id === 'RIFF' || id === 'LIST') {
                    chunks[id].push(parseRIFF(data));
                } else {
                    chunks[id].push(data);
                }
            }
            return chunks;
        }

        function doubleToString(num) {
            return [].slice.call(
                new Uint8Array((new Float64Array([num])).buffer), 0).map(function (e) {
                    return String.fromCharCode(e);
                }).reverse().join('');
        }

        var webm = new ArrayToWebM(frames.map(function (frame) {
            var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
            webp.duration = frame.duration;
            return webp;
        }));

        postMessage(webm);
    }

    /**
     * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.compile(function(blob) {
     *    // blob.size - blob.type
     * });
     */
    WhammyVideo.prototype.compile = function (callback) {
        var webWorker = processInWebWorker(whammyInWebWorker);

        webWorker.onmessage = function (event) {
            if (event.data.error) {
                console.error(event.data.error);
                return;
            }
            callback(event.data);
        };

        webWorker.postMessage(this.frames);
    };

    return {
        /**
         * A more abstract-ish API.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * @param {?number} speed - 0.8
         * @param {?number} quality - 100
         */
        Video: WhammyVideo
    };
})();

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Whammy = Whammy;
}

// ______________ (indexed-db)
// DiskStorage.js

/**
 * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
 * @summary Writing blobs into IndexedDB.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @example
 * DiskStorage.Store({
 *     audioBlob: yourAudioBlob,
 *     videoBlob: yourVideoBlob,
 *     gifBlob  : yourGifBlob
 * });
 * DiskStorage.Fetch(function(dataURL, type) {
 *     if(type === 'audioBlob') { }
 *     if(type === 'videoBlob') { }
 *     if(type === 'gifBlob')   { }
 * });
 * // DiskStorage.dataStoreName = 'recordRTC';
 * // DiskStorage.onError = function(error) { };
 * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
 * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
 * @property {function} Store - This method stores blobs in IndexedDB.
 * @property {function} onError - This function is invoked for any known/unknown error.
 * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */


var DiskStorage = {
    /**
     * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.init();
     */
    init: function () {
        var self = this;

        if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
            console.error('IndexedDB API are not available in this browser.');
            return;
        }

        var dbVersion = 1;
        var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
            db;
        var request = indexedDB.open(dbName, dbVersion);

        function createObjectStore(dataBase) {
            dataBase.createObjectStore(self.dataStoreName);
        }

        function putInDB() {
            var transaction = db.transaction([self.dataStoreName], 'readwrite');

            if (self.videoBlob) {
                transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
            }

            if (self.gifBlob) {
                transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
            }

            if (self.audioBlob) {
                transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
            }

            function getFromStore(portionName) {
                transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function (event) {
                    if (self.callback) {
                        self.callback(event.target.result, portionName);
                    }
                };
            }

            getFromStore('audioBlob');
            getFromStore('videoBlob');
            getFromStore('gifBlob');
        }

        request.onerror = self.onError;

        request.onsuccess = function () {
            db = request.result;
            db.onerror = self.onError;

            if (db.setVersion) {
                if (db.version !== dbVersion) {
                    var setVersion = db.setVersion(dbVersion);
                    setVersion.onsuccess = function () {
                        createObjectStore(db);
                        putInDB();
                    };
                } else {
                    putInDB();
                }
            } else {
                putInDB();
            }
        };
        request.onupgradeneeded = function (event) {
            createObjectStore(event.target.result);
        };
    },
    /**
     * This method fetches stored blobs from IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Fetch(function(dataURL, type) {
     *     if(type === 'audioBlob') { }
     *     if(type === 'videoBlob') { }
     *     if(type === 'gifBlob')   { }
     * });
     */
    Fetch: function (callback) {
        this.callback = callback;
        this.init();

        return this;
    },
    /**
     * This method stores blobs in IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Store({
     *     audioBlob: yourAudioBlob,
     *     videoBlob: yourVideoBlob,
     *     gifBlob  : yourGifBlob
     * });
     */
    Store: function (config) {
        this.audioBlob = config.audioBlob;
        this.videoBlob = config.videoBlob;
        this.gifBlob = config.gifBlob;

        this.init();

        return this;
    },
    /**
     * This function is invoked for any known/unknown error.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.onError = function(error){
     *     alerot( JSON.stringify(error) );
     * };
     */
    onError: function (error) {
        console.error(JSON.stringify(error, null, '\t'));
    },

    /**
     * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.dataStoreName = 'recordRTC';
     */
    dataStoreName: 'recordRTC',
    dbName: null
};

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.DiskStorage = DiskStorage;
}

// ______________
// GifRecorder.js

/**
 * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef GifRecorder
 * @class
 * @example
 * var recorder = new GifRecorder(mediaStream || canvas || context, { width: 1280, height: 720, frameRate: 200, quality: 10 });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     img.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
 * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
 */

function GifRecorder(mediaStream, config) {
    if (typeof GIFEncoder === 'undefined') {
        throw 'Please link: https://cdn.webrtc-experiment.com/gif-recorder.js';
    }

    config = config || {};

    var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;

    /**
     * This method records MediaStream.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.record();
     */
    this.record = function () {
        if (!isHTMLObject) {
            if (!config.width) {
                config.width = video.offsetWidth || 320;
            }

            if (!this.height) {
                config.height = video.offsetHeight || 240;
            }

            if (!config.video) {
                config.video = {
                    width: config.width,
                    height: config.height
                };
            }

            if (!config.canvas) {
                config.canvas = {
                    width: config.width,
                    height: config.height
                };
            }

            canvas.width = config.canvas.width;
            canvas.height = config.canvas.height;

            video.width = config.video.width;
            video.height = config.video.height;
        }

        // external library to record as GIF images
        gifEncoder = new GIFEncoder();

        // void setRepeat(int iter) 
        // Sets the number of times the set of GIF frames should be played. 
        // Default is 1; 0 means play indefinitely.
        gifEncoder.setRepeat(0);

        // void setFrameRate(Number fps) 
        // Sets frame rate in frames per second. 
        // Equivalent to setDelay(1000/fps).
        // Using "setDelay" instead of "setFrameRate"
        gifEncoder.setDelay(config.frameRate || 200);

        // void setQuality(int quality) 
        // Sets quality of color quantization (conversion of images to the 
        // maximum 256 colors allowed by the GIF specification). 
        // Lower values (minimum = 1) produce better colors, 
        // but slow processing significantly. 10 is the default, 
        // and produces good color mapping at reasonable speeds. 
        // Values greater than 20 do not yield significant improvements in speed.
        gifEncoder.setQuality(config.quality || 10);

        // Boolean start() 
        // This writes the GIF Header and returns false if it fails.
        gifEncoder.start();

        startTime = Date.now();

        var self = this;

        function drawVideoFrame(time) {
            if (isPausedRecording) {
                return setTimeout(function () {
                    drawVideoFrame(time);
                }, 100);
            }

            lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

            if (typeof lastFrameTime === undefined) {
                lastFrameTime = time;
            }

            // ~10 fps
            if (time - lastFrameTime < 90) {
                return;
            }

            if (!isHTMLObject && video.paused) {
                // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
                // Tweak for Android Chrome
                video.play();
            }

            if (!isHTMLObject) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            if (config.onGifPreview) {
                config.onGifPreview(canvas.toDataURL('image/png'));
            }

            gifEncoder.addFrame(context);
            lastFrameTime = time;
        }

        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

        if (config.initCallback) {
            config.initCallback();
        }
    };

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.stop(function(blob) {
     *     img.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function () {
        if (lastAnimationFrame) {
            cancelAnimationFrame(lastAnimationFrame);
        }

        endTime = Date.now();

        /**
         * @property {Blob} blob - The recorded blob object.
         * @memberof GifRecorder
         * @example
         * recorder.stop(function(){
         *     var blob = recorder.blob;
         * });
         */
        this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
            type: 'image/gif'
        });

        // bug: find a way to clear old recorded blobs
        gifEncoder.stream().bin = [];
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function () {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function () {
        isPausedRecording = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function () {
        if (!gifEncoder) {
            return;
        }

        this.pause();

        gifEncoder.stream().bin = [];
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (isHTMLObject) {
        if (mediaStream instanceof CanvasRenderingContext2D) {
            context = mediaStream;
            canvas = context.canvas;
        } else if (mediaStream instanceof HTMLCanvasElement) {
            context = mediaStream.getContext('2d');
            canvas = mediaStream;
        }
    }

    if (!isHTMLObject) {
        var video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;

        if (typeof video.srcObject !== 'undefined') {
            video.srcObject = mediaStream;
        } else {
            video.src = URL.createObjectURL(mediaStream);
        }

        video.play();
    }

    var lastAnimationFrame = null;
    var startTime, endTime, lastFrameTime;

    var gifEncoder;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.GifRecorder = GifRecorder;
}

//#endregion RECORDRTC
//****************************************************************************************************************************************
