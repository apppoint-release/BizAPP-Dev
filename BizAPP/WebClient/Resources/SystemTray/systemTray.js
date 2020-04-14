/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass,
	addClass,
	removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

BizAPP.SystemTray = {
    Init: function () {
        $('body').on('click', '.bt-icon', function () {
            if (!$(this).hasClass('do-not-change')) {
                $('nav li i').removeClass('selected');
                $(this).addClass('selected');
                $(this).closest('#bt-menu').addClass('resetoverlay');
                BizAPP.SystemTray.ShowContent();
                //Replace content based on selected item
                //Use case statement later because more item has to be added
                var overlay = $('.bt-overlay'),
				title = $(this).attr('title');
                overlay.find('pre.content').remove();
                overlay.prepend('<pre class="content"></pre>');
                $('.bza_mainheader').text(title);
                if ($(this).hasClass('exception')) {
                    overlay.find('pre.content').html(exceptionStack);
                } else if ($(this).hasClass('message-board')) {
                    BizAPP.UI.LoadView({
                        url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystema4ae2&html.vcn=overlay&html.jar=true',
                        selector: $('.bt-overlay').find('pre.content')
                    });
                } else if ($(this).hasClass('bza_appcenter')) {
                    BizAPP.UI.LoadView({
                        url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystema6dc4&html.vcn=overlay&html.jar=true',
                        selector: $('.bt-overlay').find('pre.content')
                    }); //ESystema97b5
                } else if ($(this).hasClass('bza_broadcast')) {
                    BizAPP.UI.LoadView({
                        url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]EAppPoint1a0c9e&html.vcn=overlay&html.jar=true',
                        selector: $('.bt-overlay').find('pre.content')
                    });
                } else if ($(this).hasClass('bza_performance')) {
                    //overlay.find('pre.content').html($('#displayStatus .stat_txt').text());
                    overlay.find('pre.content').html($('#displayStatus .stat_txt').text());//networkTrafficInfo
                } else {
                    overlay.find('pre.content').html('Implementation required !');
                }
            }
        });
        $('body').on('click', '#bt-menu .fa', function () {
            $(this).parent().removeClass('st-highlight');
        });
        $(document).click(function (e) {
            if ($(e.target).find('li a.bt-icon').length) {
                $('.bt-menu ul:nth-of-type(2)').find('li input').hide();
                $('.bt-menu ul:nth-of-type(2)').find('li a').removeClass('hide');
            }
        });

        BizAPP.SystemTray.ConstructUI();
        $('.systemtray-container').show();
        setTimeout(function () { BizAPP.SystemTray.BlinkMenuOnLoad($('.bt-menu-trigger'), true) }, 4000); //Blink menu icon on start/load

        new bordermenu().init();
        //Show menu after based on specified seconds
        BizAPP.SystemTray.ShowMenuOnHover(2);

        /**/
        var menu = $('.bt-menu-close .bt-menu-trigger');
        menu.css('display', 'block');
        menu[0].onclick = function () {
            var m = $('#bt-menu');
            if (m.width() == '0' || m.hasClass('resetoverlay')) {
                m.removeClass('resetoverlay').removeClass('dark').addClass('light');
                m.find('.selected').removeClass('selected');
                return;
            }
            BizAPP.SystemTray.HideContent();
            m.css({
                'width': '0',
                'left': '-100px'
            });
        }
    },
    ShowMenuOnHover: function (seconds) {
        var coordinates = [0, 0];
        var hoverTimeOut;
        var box = 40;
        var fired = 0;
        // Selects the 'html' element
        $('html').on('mousemove', function (event) {
            coordinates = [event.pageX, event.pageY]; // Gets the mouse coordinates
            var d = new Date();
            x = coordinates[0];
            y = coordinates[1];

            var p1 = $('.bt-menu').hasClass('left') ? x > 45 : (window.innerWidth - x) > 45;
            var p2 = $('.bt-menu').hasClass('left') ? x < box : (window.innerWidth - x) < box;
            if (fired === 0) {
                if ((window.innerHeight - (y - window.pageYOffset)) < box || p2) {
                    if (fired === 0) {
                        hoverTimeOut = setTimeout(function () {
                            triggerHover(event);
                            fired = 1;
                        }, seconds * 1000); // Can be changed for hover timings
                    }
                }
            } else {
                fired = 0;
            }

            if (((p1) && ((window.innerHeight - (y - window.pageYOffset)) > 45)) && !$('.systemtray-container + .ui-autocomplete:visible, .systemtray-container + .ui-autocomplete + .ui-autocomplete:visible').length) {

                //if ( $('#bt-menu').css('visibility') != 'visible' ) {
                //	$('.bt-menu-open .bt-menu-trigger').css('display', 'none');
                //	var m = document.getElementById('bt-menu');
                //	classie.remove(m, 'bt-menu-open');
                //	classie.add(m, 'bt-menu-close');
                //}

                //$('.bt-menu-close').css('visibility', 'hidden');
                $('.bt-menu-close .bt-menu-trigger').hide();
            }
        });

        triggerHover = function (event) {
            if (fired === 0) {
                x = coordinates[0];
                y = coordinates[1];

                var p2 = $('.bt-menu').hasClass('left') ? x < box : (window.innerWidth - x) < box;
                if ((window.innerHeight - (y - window.pageYOffset)) < box || p2) {
                    if ($('.bt-menu.bt-menu-close').length > 0) {
                        $('.bt-menu').css('visibility', 'visible');
                        $('.bt-menu-trigger').show();
                    }
                }
            }
        }
    },
    CloseMenu: function () {
        if (!$('#bt-menu').hasClass('bt-menu-open')) return;
        var menu = $('.bt-menu-trigger');
        menu.length != 0 ? menu[0].click() : null,
        menu.hide();
    },
    OpenMenu: function () {
        if ($('#bt-menu').hasClass('bt-menu-open')) return;
        var menu = $('.bt-menu-trigger');
        menu.length != 0 ? menu[0].click() : null,
        menu.show();
    },
    _menu: '<style>.systemtray-container{position:fixed;z-index:10000}nav,nav:after,nav::before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.bt-overlay{background:#fff;color:initial}.bt-menu{position:fixed;top:0;left:0;width:100%;height:0;border-width:0;border-style:solid;border-color:#333;background-color:rgba(0,0,0,0);-webkit-backface-visibility:hidden;-webkit-transition:border-width 0.3s,background-color 0.3s,height 0 .3s;transition:border-width 0.3s,background-color 0.3s,height 0 .3s}.bt-menu.bt-menu-open{height:100%;border-width:45px;background-color:rgba(0,0,0,0.3);-webkit-transition:border-width 0.3s,background-color .3s;transition:border-width 0.3s,background-color .3s}.bt-overlay{position:absolute;width:100%}.bt-menu-open .bt-overlay{height:100%}.bt-menu-trigger{position:fixed;right:7px;bottom:7px;z-index:100;display:block;width:30px;height:30px;cursor:pointer}.bt-menu-trigger span{position:absolute;top:50%;left:0;display:block;width:100%;height:4px;background-color:#fff;font-size:0;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:background-color .3s;transition:background-color .3s}.bt-menu-open .bt-menu-trigger span{background-color:transparent}.bt-menu-trigger span:before,.bt-menu-trigger span:after{position:absolute;left:0;width:100%;height:100%;background:#fff;content:\'\';-webkit-transition:-webkit-transform .3s;transition:transform .3s}.bt-menu-trigger span:before{-webkit-transform:translateY(-250%);transform:translateY(-250%)}.bt-menu-trigger span:after{-webkit-transform:translateY(250%);transform:translateY(250%)}.bt-menu-open .bt-menu-trigger span:before{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}.bt-menu-open .bt-menu-trigger span:after{-webkit-transform:translateY(0) rotate(-45deg);transform:translateY(0) rotate(-45deg)}.bt-menu ul{position:fixed;margin:0;padding:0;list-style:none}.bt-menu ul:first-of-type{right:0;bottom:45px}.bt-menu ul:nth-of-type(2){right:45px;bottom:0}.bt-menu ul:first-of-type li,.bt-menu ul li a{display:block}.bt-menu ul:nth-of-type(2) li{display:inline-block;font-size:0;vertical-align:bottom;padding:0 7px}.bt-menu ul:nth-of-type(2) li:first-child{padding:0 0 0 7px}.bt-menu ul li{visibility:hidden;width:auto;height:45px;line-height:45px;opacity:0;-webkit-transition:-webkit-transform 0.3s,opacity 0.2s,visibility 0 .3s;transition:transform 0.3s,opacity 0.2s,visibility 0 .3s}.bt-menu ul:first-of-type li:first-child{-webkit-transform:translate3d(0,500%,0);transform:translate3d(0,500%,0)}.bt-menu ul:first-of-type li:nth-child(2){-webkit-transform:translate3d(0,400%,0);transform:translate3d(0,400%,0)}.bt-menu ul:first-of-type li:nth-child(3){-webkit-transform:translate3d(0,300%,0);transform:translate3d(0,300%,0)}.bt-menu ul:first-of-type li:nth-child(4){-webkit-transform:translate3d(0,200%,0);transform:translate3d(0,200%,0)}.bt-menu ul:first-of-type li:nth-child(5){-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.bt-menu ul:nth-of-type(2) li:first-child{-webkit-transform:translate3d(300%,0,0);transform:translate3d(300%,0,0)}.bt-menu ul:nth-of-type(2) li:nth-child(2){-webkit-transform:translate3d(200%,0,0);transform:translate3d(200%,0,0)}.bt-menu ul:nth-of-type(2) li:nth-child(3){-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.bt-menu.bt-menu-open ul:first-of-type li,.bt-menu.bt-menu-open ul:nth-of-type(2) li{visibility:visible;opacity:1;-webkit-transition:-webkit-transform 0.3s,opacity .3s .1s;transition:transform 0.3s,opacity .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.bt-menu ul li a{display:block;outline:none;color:transparent;text-align:center;text-decoration:none;font-size:0}.bt-menu ul li a:before{color:#fff;font-size:30px;opacity:.5;-webkit-transition:opacity .2s;transition:opacity .2s}.bt-menu ul li a:hover:before,.bt-menu ul li a:focus:before{opacity:1}@media screen and (max-height: 31.125em){.bt-menu ul li a:before{font-size:32px}.bt-menu ul:first-of-type li{height:60px;line-height:60px}.bt-menu ul:nth-of-type(2) li{width:60px}}.bt-menu ul,.bt-menu-close ul,.bt-menu-close .bt-overlay{display:none}.bt-menu-open ul,.bt-menu-open .bt-overlay{display:block}.text-only{box-sizing:border-box;color:#fff!important;cursor:auto;display:block;font-family:Lato,Arial,sans-serif;font-size:15px!important;font-weight:700;height:45px;line-height:45px;list-style-image:none;list-style-position:outside;list-style-type:none;outline-color:#2980b9;outline-style:none;outline-width:0;text-align:center;text-decoration:none solid #2980b9;transition-delay:0;transition-duration:.2s;transition-property:color;transition-timing-function:ease;white-space:nowrap;padding:.2rem}.text-only:hover{color:#2980b9!important}nav .selected{background-color:#6495ed}.bt-menu .bt-icon{height:45px}.bt-menu.bt-menu-open{z-index:2}.bt-menu-open .bt-overlay{overflow:auto}.bt-menu-open .bt-overlay .bza_mainheader{font-size:20px;color:#638EB5;border-bottom:solid 2px #638EB5;padding-bottom:5px;margin-bottom:10px}.bt-menu .bza_highlight,.bt-menu .bza_highlight:after,.bt-menu .bza_highlight:before{background-color:#123F76}.bt-menu-open .bza_highlight,.bt-menu-open .bza_highlight:after,.bt-menu-open .bza_highlight:before{background-color:#E2E2E2}.systemtray-container ul:nth-of-type(2) li{float:right}.poweredBy{color:#fff!important;white-space:nowrap;font-size:12px!important;vertical-align:top}.poweredBy:before{content:\'\';background-image:url(/favicon.ico);background-repeat:no-repeat;height:31px;width:31px;margin-top:3px}.text-only{line-height:normal;display:table-cell!important;vertical-align:middle}span.bza_mainheader{left:45px;top:10px;position:fixed;color:#fff;font-size:20px}.bza_impersonate,.bza_translate{display:inline!important}#impersonatetbox,#translatetbox{width:175px;display:none;vertical-align:middle;height: 30px;padding: .5rem;font-size: initial;} .hide{display:none!important}.bt-icon:before,.bt-icon-alt:before{font-style:normal;font-weight:400;font-variant:normal;text-transform:none!important;speak:none;display:inline-block;text-decoration:none;width:1em;line-height:inherit;-webkit-font-smoothing:antialiased}.bt-icon:not(.poweredBy):before{height:45px}.icon-diagnostic:before,.icon-sysadmin:before,.icon-bubble:before,.icon-logout:before,.icon-stacktrace:before,.icon-appcenter:before,.icon-performance:before,.icon-broadcast:before,.icon-msgboard:before,.icon-debug:before,.icon-translate:before,.icon-impersonate:before{background:url(resources/systemtray/system-tray.png) no-repeat}.icon-bubble:before,.icon-msgboard:before,.icon-impersonate:before {zoom: .80;margin-top: 5px;margin-left: 1px;}.dark .icon-bubble:before,.dark .icon-msgboard:before,.dark .icon-impersonate:before {margin-top: 10px;}.icon-diagnostic:before{background-position:-147px -51px}.icon-sysadmin:before{background-position:-552px -51px}.icon-bubble:before{background-position:-102px -57px}.icon-logout:before{background-position:-354px -55px}.icon-stacktrace:before{background-position:-499px -52px }.icon-appcenter:before{background-position:0 -51px }.icon-performance:before{background-position:-449px -54px}.icon-broadcast:before{background-position:-53px -50px}.icon-msgboard:before{background-position:-403px -51px}.icon-debug:before{background-position:-251px -52px}.icon-debug[title="Disable Debug"]:before{background-position:-199px -51px }.icon-translate:before{background-position:-593px -53px}.icon-impersonate:before{background-position:-302px -52px}.bza_poweredBy{bottom:0;left:45px;position:fixed;color:#fff;font-size:12px;display:none}.icon-poweredBy{background:url(/favicon.ico) no-repeat;background-size:25px;display:inline-block;height:35px;width:35px}.bza_poweredBy a{text-decoration:none}.bza_poweredBy .title{vertical-align:super;cursor:pointer;color:#fff}.bt-menu-open .bza_poweredBy{display:block;cursor:pointer}.bt-overlay .content #overlay{white-space:normal}.bt-menu.dark .icon-diagnostic:before{background-position:-150px -3px}.bt-menu.dark .icon-sysadmin:before{background-position:-547px 0}.bt-menu.dark .icon-bubble:before{background-position:-108px -10px}.bt-menu.dark .icon-logout:before{background-position:-350px -4px}.bt-menu.dark .icon-stacktrace:before{background-position:-499px -2px}.bt-menu.dark .icon-appcenter:before{background-position:-2px -2px}.bt-menu.dark .icon-performance:before{background-position:-450px -3px}.bt-menu.dark .icon-broadcast:before{background-position:-49px -3px }.bt-menu.dark .icon-msgboard:before{background-position:-407px -9px}.bt-menu.dark .icon-debug:before{background-position:-249px -2px}.bt-menu.dark .icon-debug[title="Disable Debug"]:before{background-position:-199px -3px}.bt-menu.dark .icon-translate:before{background-position:-593px 0}.bt-menu.dark .icon-impersonate:before{background-position:-307px -10px }.tbupper-container{display:none!important}#chat-panel{display:none}.bt-overlay{-webkit-transition: all 500ms;}.bt-menu.bt-menu-open .bza_poweredBy {display: block;cursor: pointer;visibility: visible;}.bt-menu.bt-menu-open .bza_poweredBy .title{color: black;}.bt-menu-open.dark .bza_poweredBy .title {color: #fff;}.icon-bubble{width:51px!important;margin-top:1px;}.bza_poweredBy .title{vertical-align:top;line-height: 30px;margin-left:-5px;}#displayStatus{display:none;} .bza_mainheader {display: none;} .bt-menu.left .bt-menu-trigger {left: 7px;right: inherit;}.bt-menu.left ul:first-of-type{left: 0;right: inherit;}.bt-menu.left ul:nth-of-type(2){left: 45px;right: inherit;}.bt-menu.left .bza_poweredBy {right: 45px;left: auto;}.systemtray-container .bt-menu.left ul:nth-of-type(2) li{float:left;} .resetoverlay {width:100%!important;left:auto!important;}.systemtray-container i{font-size:2rem;color:#ccc; padding: 9px 5px}.st-highlight i{color:orange}</style><div class="systemtray-container" style="display:none">\
									<nav id="bt-menu" class="bt-menu bza_highlight bt-menu-close {2}">\
										<a href="#" class="bt-menu-trigger blink" style="display:none;"><span class="bza_highlight" >Menu</span></a> \
										<ul>\
											<li><i class="fa fa-sign-out" title="Logout" onclick="signOutWithNoDirtyTransactionsCheck()"></i></li>\
											<li><i class="fa fa-eye " title="Enable Debug" onclick="BizAPP.SystemTray.ChangeDebugMode(this)"></i></li>\
											<li><i class="fa fa-comments" title="Chat" onclick="BizAPP.SystemTray.InitChat();"></i></li>\
											<li><i onclick="window.open(\'Enterpriseview.aspx?html.app=ESystema47d2\')" class="fa fa-adn" title="System Administration"></i></li>\
											<li><i onclick="window.open(\'system\/diagnostics.aspx\')" class="fa fa-cog" title="Diagnostic"></i></li>\
										</ul>\
										<ul>\
											<li><i class="fa fa-th-large bt-icon bza_appcenter" title="Application Center"></i></li>\
											<li><i class="fa fa-columns bt-icon bza_broadcast" title="Broadcast"></i></li>\
											<li><i class="fa fa-newspaper-o bt-icon message-board" title="Message Board"></i></li>\
											<li><i class="fa fa-desktop bt-icon bza_performance" title="Performance Indicator"></i></li>\
											<li><i class="fa fa-code bt-icon exception" title="Exception Stack"></i></li>\
											<li><input id="impersonatetbox" type="text" bza_qid="ESystemae76f" bza_fields="{3}" bza_valuefield="LoginID" placeholder="Impersonate..."><i class="fa fa-user" onclick="$(this).addClass(\'hide\');$(\'#impersonatetbox\').show(\'fast\').focus();" title="Impersonate"></i></li>\
											<li><input id="translatetbox" type="text" bza_qid="ESystem33135" bza_fields="Name"  placeholder="Translate..."><i class="fa fa-globe" onclick="$(this).addClass(\'hide\');$(\'#translatetbox\').show(\'fast\').focus();" title="Switch Language"></i></li>\
										</ul>\
										<span class="bza_mainheader">\
										</span>\
										<div class="bza_poweredBy">\
											<a href="{1}" target="_blank"> <div class="icon-poweredBy" /> <span class="title" > Powered By {0} </span></a>\
										</div>\
									</nav>\
								</div>',
    ConstructUI: function () {
        $('body').append($(BizAPP.SystemTray._menu.format(BizAPP.UI.brandName, BizAPP.UI.brandUrl, 'left', BizAPP.UI.impersonateField)));

        //Enable auto complete functionality on impersonate & translate text field
        var $imprCtrl = $('#impersonatetbox');
        BizAPP.UI.Textbox.EnhanceAutoComplete({
            value: $imprCtrl.attr('bza_fields'),
            selector: '#impersonatetbox',
            userStatus: 'false',
            selectCallback: function (a, b) {
                ajaxAsyncCall('ImpersonationControlEx', ['ImpersonateFromLoginId', b.item.addnData[$imprCtrl.attr('bza_valuefield')]], false, true);
            }
        });
        BizAPP.UI.Textbox.EnhanceAutoComplete({
            value: 'Name',
            selector: '#translatetbox',
            userStatus: 'false',
            selectCallback: function (a, b) {
                callObjectPickerCallBack('', b.item.identifier);
            }
        });

        //Hide diagnostics and system admin links for non sys admin users
        if (!g_hasSysAdminResp) {
			var $st = $('.systemtray-container');
            $st.find('.fa-cog').parent().hide();
            $st.find('.fa-adn').parent().hide();
            $st.find('.fa-columns').parent().hide();
            $st.find('.fa-desktop').parent().hide();
        }
    },
    BlinkMenuOnLoad: function (bmt, hide) {
        var i = 0;
        do {
            if (hide)
                bmt.fadeIn(300).fadeOut(300);
            else
                bmt.fadeOut(300).fadeIn(300);
            i++;
        } while (i < 5)
    },
    SelectTabNMore_M: function (itemToSelect) {
        setTimeout(itemToSelect.click(), 11);

        //Change debug text
        if (g_enableLog !== "0" && g_enableLog) {
            $('.bza_debug').html('Disable Debug');
            $('.bza_debug').attr('title', 'Disable Debug');
        }

        //Hide text field & display label
        $('.bt-menu ul:nth-of-type(2)').find('li input').hide();
        $('.bt-menu ul:nth-of-type(2)').find('li a').removeClass('hide');

        //Grant permission for desktop notification
        if (!isIE() && Notification.permission !== "granted") {
            Notification.requestPermission();
            addLog('Permission granted for notification');
        }
    },
    userListBlank: true,
    InitChat: function () {
        //Close system tray
        BizAPP.SystemTray.CloseMenu();

        //Show chat title section
        $('.chat-window-title').show();
        //Bring the chat into focus
        $('#chat-panel').css('display', 'block');
        var chatBubble = $('.balloon_blue');
        chatBubble.length != 0 ? chatBubble[0].click() : null;

        //TFix: Need to find root cause of the issue
        if (BizAPP.SystemTray.userListBlank && !$('.bza_chatuserlist').is(':visible')) {
            var b = chatBubble.length == 0 ? $('.balloon_white') : [];
            b.length != 0 ? b[0].click() : null;
            BizAPP.SystemTray.userListBlank = false;
        }

        if (!BizAPP.Collaboration._initContacts) {
            BizAPP.Collaboration.DisplayRecentContact(BizAPP.Collaboration.currentUserId);

            //It will refresh the contact list at 15 minutes (900000 ms) interval			
            var timer = setInterval(function () {
                BizAPP.Collaboration.DisplayRecentContact(BizAPP.Collaboration.currentUserId);
                addLog('Contact list updated at 15 minutes interval');
            }, 900000);

            BizAPP.Collaboration._initContacts = true;
        }
    },
    ChangeDebugMode: function (element) {
        var title = $(element).attr('title');
        if (title == 'Enable Debug') {
            //Call method to enable
            g_enableLog = true;
            addLog('Debug mode has been enabled!');
            $(element).html('Disable Debug');
            $(element).attr('title', 'Disable Debug');
            $(element).addClass('fa-eye-slash');
        } else {
            //Call method to enable
            g_enableLog = false;
            $(element).html('Enable Debug');
            $(element).attr('title', 'Enable Debug');
            $(element).removeClass('fa-eye-slash');
        }

        ajaxAsyncCall('ConfigControlEx', ['EnableDebug', null, 'True'], false, true);
        BizAPP.SystemTray.CloseMenu();
    },
    BlinkMenu: function () {
        var menu = $('.bt-menu-close .bt-menu-trigger.blink');
        menu.fadeOut("slow", function () {
            $(this).fadeIn("slow", function () {
                BizAPP.SystemTray.BlinkMenu();
            });
        });
    },
    StopBlinking: function () {
        var menu = $('.bt-menu-close .bt-menu-trigger');
        menu.removeClass('blink');
    },
    HideContent: function () {
        var m = document.getElementById('bt-menu');
        classie.remove(m, 'bt-menu-close');
        classie.add(m, 'bt-menu-open');
        $('.bt-overlay').hide();
        $('#bt-menu').css({
            'border-width': '0',
            'z-index': 'initial',
            /*'visibility' : 'hidden'*/
        });

        //Display light version of the image
        $('#bt-menu').removeClass('dark');
        $('#bt-menu .selected').removeClass('selected');
        BizAPP.SystemTray.Update();
    },
    ShowContent: function () {
        $('.bt-overlay').show();
        var w = "0 0 45px 0";
        $('#bt-menu').css({
            'border-width': w,
            'z-index': '2',
            'visibility': 'visible'
        });
        $('.bza_poweredBy').show();

        //Display dark version of the image
        $('#bt-menu').css('visibility') == 'visible' ? $('#bt-menu').addClass('dark') : null;
        BizAPP.SystemTray.Update();
    },
    Update: function () {
        if (g_enableLog !== "0" && g_enableLog) { //Change debug text
            $('.bza_debug').html('Disable Debug');
            $('.bza_debug').attr('title', 'Disable Debug');
        }

        //Hide text field & display label
        $('.bt-menu ul:nth-of-type(2)').find('li input').hide();
        $('.bt-menu ul:nth-of-type(2)').find('li a').removeClass('hide');

        if (!isIE() && Notification.permission !== "granted") { //Grant permission for desktop notification
            Notification.requestPermission();
            addLog('Permission granted for notification');
        }

        if (isIE() > 0) { //resize link for IE to make it visible
            setInterval(function () {
                $(".bt-menu ul li").height('46px');
            }, 1000);
        }

        setTimeout(BizAPP.SystemTray.Wait, 1000);

    },
    Wait: function () {
        //TO-DO
        if ($('.bt-menu-close').length) //Heading is visible in some cases then hide it
            $('#bt-menu').css({
                'border-width': '0',
                'z-index': 'initial',
                'visibility': 'hidden'
            });
    },
    AddMenu: function (options) {
        var $menu = $('[id="' + options.id + '"]');
        if (!$menu.length) {
            $menu = $('<li id="' + options.id + '">' + options.html + '</li>');
            $menu.insertAfter($('#bt-menu #translatetbox').parent());
            $menu.click(options.click);
        }
        return $menu;
    },
    Highlight: function ($menu, showCount) {
        $menu.addClass('st-highlight');
        if (showCount) {
            if (!$menu.find('.bza-countbubble').length)
                $menu.find('i').append('<div class="bza-countbubble">{0}</div>'.format('*'));

            $menu.find('.bza-countbubble').text('*');
        }
        BizAPP.SystemTray.OpenMenu();
        BizAPP.SystemTray.BlinkMenuOnLoad($menu, false);
    }
}

/**
 * borderMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var bordermenu = function () {
    return {
        init: function () {

            var menu = document.getElementById('bt-menu'),
			trigger = menu.querySelector('a.bt-menu-trigger'),
			// triggerPlay only for demo 6
			triggerPlay = document.querySelector('a.bt-menu-trigger-out'),
			// event type (if mobile use touch events)
			eventtype = this.mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function () {
			    classie.remove(menu, 'bt-menu-open');
			    classie.add(menu, 'bt-menu-close');
			    $('.bt-overlay').find('pre.content').remove();
			},
			closeClickFn = function (ev) {
			    //resetMenu();
			    //overlay.removeEventListener( eventtype, closeClickFn );
			};

            var overlay = document.createElement('div');
            overlay.className = 'bt-overlay';
            menu.appendChild(overlay);

            trigger.addEventListener(eventtype, function (ev) {
                ev.stopPropagation();
                ev.preventDefault();

                if (classie.has(menu, 'bt-menu-open')) {
                    resetMenu();
                } else {
                    classie.remove(menu, 'bt-menu-close');
                    classie.add(menu, 'bt-menu-open');
                    overlay.addEventListener(eventtype, closeClickFn);
                    BizAPP.UI.TextEditor.LoadFontAwesomeCss();
                }
            });

            if (triggerPlay) {
                triggerPlay.addEventListener(eventtype, function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();

                    classie.remove(menu, 'bt-menu-close');
                    classie.add(menu, 'bt-menu-open');
                    overlay.addEventListener(eventtype, closeClickFn);
                });
            }

        },
        mobilecheck: function () {
            var check = false;
            (function (a) {
                if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }
    }
    // http://stackoverflow.com/a/11381730/989439

}
