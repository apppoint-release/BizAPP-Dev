<%@ page language="C#" autoeventwireup="true" inherits="Auth, App_Web_auth.aspx.cdcab7d2" enableviewstate="true" viewstatemode="Disabled" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
    <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
    <link rel="stylesheet" href="<%= Page.ResolveUrl( "~/Resources/crm/crm.css?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp )%>" />
    <link rel="stylesheet" href="<%= Page.ResolveUrl( "~/Resources/crm/common.css?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp )%>" />
    <link rel="stylesheet" href="<%= Page.ResolveUrl( "~/Resources/TextEditor/font-awesome.min.css?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp )%>" />
    <style>
        body {
            background: #222D3A;
            display: none;
        }

        body, select, textarea, td, th, ul, input, pre, code, button {
            font-family: Calibri;
            font-size: .9rem;
        }

        .loginContainer {
            background: #3498db;
            margin-top: 80px;
            padding: 20px;
            border-radius: 2px;
            color: #FFF;
        }

            .loginContainer a {
                color: #fff;
                margin: 0 auto;
                display: block;
                text-align: center;
                text-decoration: none;
            }

                .loginContainer a a {
                    display: inline;
                }

                .loginContainer a#passwordLink, .loginContainer a#signupLink, .loginContainer a#loginLink {
                    margin-bottom: 10px;
                    text-decoration: underline;
                }

            .loginContainer input[type=text], .loginContainer input[type=password], .loginContainer input[type=email], .loginContainer input[type=tel], .loginContainer select, .loginContainer span {
                display: block;
                width: 70%;
                border: 0;
                border-radius: 2px;
                margin: 0 40px 10px;
            }

            .loginContainer input[type=checkbox] {
                float: none;
            }

            .loginContainer select, .loginContainer input[type=text], .loginContainer input[type=email], .loginContainer input[type=tel], .loginContainer input[type=password] {
                color: #6c6c6c;
                padding: 8px;
            }

            .loginContainer select, .loginContainer span {
                width: 75%;
                line-height: 34px;
                line-height: 2.3rem;
            }

            .loginContainer input[type=submit], .loginContainer button {
                padding: 8px 12px;
                color: #2980b9;
                float: right;
                text-transform: uppercase;
                background-color: white;
                -webkit-transition: all .5s ease-in-out;
                -moz-transition: all .5s ease-in-out;
                -o-transition: all .5s ease-in-out;
                transition: all .5s ease-in-out;
                border: 0;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
                margin: 0 .1rem;
            }

                .loginContainer input[type=submit].canBtn, .loginContainer .canBtn {
                    color: white;
                    background-color: #2980b9;
                }

            .loginContainer .logo div {
                background: url('resources/images/applogo.png') no-repeat center;
                height: 90px;
            }

            .loginContainer .logo {
                text-align: center;
                display: block;
            }

            .loginContainer hr {
                margin: 10px auto 20px;
                width: 70%;
                border-top: 1px solid rgba(0, 0, 0, 0.13);
                border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            }

            .loginContainer .realperson-challenge {
                color: #FFF !important;
                padding-top: 10px;
                padding-bottom: 10px;
            }

            .loginContainer .realperson-text {
                letter-spacing: 0px;
                word-spacing: normal;
                line-height: 5px;
                font-family: "Courier New",monospace;
                font-size: 6px;
                font-weight: bold;
                padding: 10px;
            }

        .containersize {
            max-width: 25em;
            margin: 0 auto;
        }

        .loginContainer #loginBtn {
            width: 120px;
        }

        .loginContainer .lcicon, .loginContainer .lcicon div {
            height: 80px;
            width: 80px;
            border-radius: 40px;
        }

        .tb-invalid-code {
            border: red 1px solid!important;
        }

        .msg-invalid-code {
            color: red!important;
            margin-top: -15px!important;
        }

        .bza-mfa-cont {
            text-align: center;
        }

        input#btnSubmitToken, input#btnFPWCanToken {
            float: inherit;
        }

        @media only screen and (max-width: 479px) {
            .containersize {
                max-width: 20em;
            }

            .loginContainer #loginBtn {
                width: 65px;
            }

            .loginContainer .logo div {
                height: 43px;
            }
        }

        @media only screen and (max-height: 500px) {
            .loginContainer input[type=text], .loginContainer input[type=password], .loginContainer input[type=email], .loginContainer input[type=tel], .loginContainer select, .loginContainer span {
                margin: 0 30px 10px;
            }
        }
		.lc {
            text-align:center
        }
		.lc-pw input[type=password]{
			width: calc(100% - 88px);
			display: inline;
			margin: 0;
		}
		.loginContainer #loginBtn {
			width: 65px;
			height: 35px;
			margin-left: 5px;
		}
    </style>
    <script>
        $(document).ready(function () {
            var hasCss = false;
            var qs = window.location.search.substring(1);
            qs.split('?');
            if (qs) {
                qs1 = qs.split('html.css=');
                if (qs1.length > 1) {
                    qs2 = qs.split('rbc=');
                    if (qs2.length > 1) {
                        $('head link[rel="stylesheet"]').remove()
                    }

                    qs1 = qs1[1].split('&')[0];
                    $('body').append('<link id="lecss" rel="stylesheet" href=""/>');
                    $('#lecss').attr('href', decodeURIComponent(qs1));
                    hasCss = true;
                }
            }

            setTimeout(function () {
                $('body').append('<div id="Processing" class="processingmaskdiv processingimage" bizappid="Processing" style="display:none;left: 0px; top: 0px; position: fixed;"></div>');
                $('body').css('display', 'block');
                if ($(window).width() < '480')
                    $('body').append('<style>.bza-alrtContent {width: 80vw;max-width: 80vw;}</style>')
            }, hasCss ? 500 : 0);            

            BizAPP.UI.PrefetchResources();

            var fpdmn = $('.fp #fpdmn');
            if (fpdmn.length && fpdmn.val()) fpdmn.hide();
        });
        function InitLoginPanel() {
            try {
                if (loginusingbizappoauth.toLowerCase() == 'true') {
                    $('.loginContainer').hide();
                    BizAPP.UI.OAuth.StartPrefetch(oAuthHostUrl);
                }

                var ent = getPersistedValue('bzaAuthPage', 'ent'),
                    pro = getPersistedValue('bzaAuthPage', 'pro'),
                    un = getPersistedValue('bzaAuthPage', 'un'),
                    dmn = getPersistedValue('bzaAuthPage', 'dmn');

                //if (ent || pro || un)
                //$('input[type="checkbox"]').prop('checked', true);

                //$("input").keyup(function (event) {
                //    if (event.keyCode == 13) {
                //        $("#loginBtn").click();
                //    }
                //});

                $.each(auth_pro.split(','), function () {
                    $('#pro').append('<option value="' + this + '">' + this + '</option>');
                })
                var entfound=0;
                $.each(auth_ent.split(','), function () {
                    $('#ent').append('<option value="' + this + '">' + this + '</option>');
                    if (this == ent)
                        entfound = 1;
                })

                if (!entfound) {
                    ent = pro = un = dmn = '';
                }

                if (auth_dmn) {
                    if (auth_dmn != 'default')
                        dmn = auth_dmn;

                    $('#dmn').hide();
                }

                if ($('#tb_TSU_Domain').length) {
                    var $contents = $('#tb_TSU_Domain').parent().contents().filter(function () {
                        return this.nodeType == 3;
                    });
                    $contents[0].nodeValue = dmn_prefix;
                    $contents[1].nodeValue = dmn_suffix;
                }
                else {
                    $('#spn_tsu_dmn').hide();
                }
				
				if (!$('#dob').length)
					$('#spn_tsu_phone').hide();

                $('select').each(function () {
                    if ($(this).find('option').length < 2) $(this).hide();
                });

                if (ent) $('#ent').val(ent); 
                if (!$('#un').val() && un) $('#un').val(un);
                if (dmn) $('#dmn').val(dmn);
                if (pro) $('#pro').val(pro);
                else if ($('#pro option').length > 1) $('#pro').prepend('<option value="" default selected>Choose Provider</option>');

                $('[placeholder]:visible').each(function () {
                    $(this).attr('title', $(this).attr('placeholder'));
                });

                if (document.createElement("input").placeholder == undefined) {
                    // Placeholder is not supported
                    $('input[placeholder]:visible').each(function () {
                        this.onblur = textBoxBlur;
                        this.onfocus = textBoxFocus;
                        textBoxBlur(this);
                    });
                }
            }
            catch (Error) {
                logError('init error:', Error);
            }
        }
        function login() {
            var ent = $('#ent').val(),
                pro = $('#pro').val(),
                un = $('#un').val(),
                pw = $('#pw').val(),
                dmn = $('#dmn').val();

            if (!pro) {
                alert('Please select a provider.');
                return false;
            }
            if (!un) {
                alert('Please specify User name.');
                return false;
            }
            if (!pw) {
                alert('Please specify password.');
                return false;
            }

            $('#loginBtn').attr('disabled', 'disabled');
            $('#Processing').show();

            if ($('input[type="checkbox"]')[0].checked) {
                persistValue('bzaAuthPage', 'ent', ent);
                persistValue('bzaAuthPage', 'pro', pro);
                persistValue('bzaAuthPage', 'un', un);
                persistValue('bzaAuthPage', 'dmn', dmn);
            }

            // force logout to load the right login page
            if (dmn_logouturl)
                loginUrl = dmn_logouturl;
            else 
                loginUrl = BizAPP.UI.User.GetLoginUrl(true);

            var navurl = BizAPP.UI.User.GetNavUrl(loginUrl);

            g_callBacks.push(function () {
                $('#loginBtn').removeAttr('disabled');
                $('#Processing').hide();
            });

            var args = { registry: $('#loc').val(), enterprise: ent, provider: pro, UserName: un, Password: pw, logouturl: navurl, domain: dmn };
            if (loginusingbizappoauth.toLowerCase() == 'true')
                BizAPP.UI.OAuth.Login(oAuthHostUrl, 'login', args);
            else
                callLoginWithParams(args);
        }
        function realperson(text) {
            var ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var DOTS = [
                    ['   *   ', '  * *  ', '  * *  ', ' *   * ', ' ***** ', '*     *', '*     *'],
                    ['****** ', '*     *', '*     *', '****** ', '*     *', '*     *', '****** '],
                    [' ***** ', '*     *', '*      ', '*      ', '*      ', '*     *', ' ***** '],
                    ['****** ', '*     *', '*     *', '*     *', '*     *', '*     *', '****** '],
                    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*******'],
                    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*      '],
                    [' ***** ', '*     *', '*      ', '*      ', '*   ***', '*     *', ' ***** '],
                    ['*     *', '*     *', '*     *', '*******', '*     *', '*     *', '*     *'],
                    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '*******'],
                    ['      *', '      *', '      *', '      *', '      *', '*     *', ' ***** '],
                    ['*     *', '*   ** ', '* **   ', '**     ', '* **   ', '*   ** ', '*     *'],
                    ['*      ', '*      ', '*      ', '*      ', '*      ', '*      ', '*******'],
                    ['*     *', '**   **', '* * * *', '*  *  *', '*     *', '*     *', '*     *'],
                    ['*     *', '**    *', '* *   *', '*  *  *', '*   * *', '*    **', '*     *'],
                    [' ***** ', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
                    ['****** ', '*     *', '*     *', '****** ', '*      ', '*      ', '*      '],
                    [' ***** ', '*     *', '*     *', '*     *', '*   * *', '*    * ', ' **** *'],
                    ['****** ', '*     *', '*     *', '****** ', '*   *  ', '*    * ', '*     *'],
                    [' ***** ', '*     *', '*      ', ' ***** ', '      *', '*     *', ' ***** '],
                    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '   *   '],
                    ['*     *', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
                    ['*     *', '*     *', ' *   * ', ' *   * ', '  * *  ', '  * *  ', '   *   '],
                    ['*     *', '*     *', '*     *', '*  *  *', '* * * *', '**   **', '*     *'],
                    ['*     *', ' *   * ', '  * *  ', '   *   ', '  * *  ', ' *   * ', '*     *'],
                    ['*     *', ' *   * ', '  * *  ', '   *   ', '   *   ', '   *   ', '   *   '],
                    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*******'],
                    ['  ***  ', ' *   * ', '*   * *', '*  *  *', '* *   *', ' *   * ', '  ***  '],
                    ['   *   ', '  **   ', ' * *   ', '   *   ', '   *   ', '   *   ', '*******'],
                    [' ***** ', '*     *', '      *', '     * ', '   **  ', ' **    ', '*******'],
                    [' ***** ', '*     *', '      *', '    ** ', '      *', '*     *', ' ***** '],
                    ['    *  ', '   **  ', '  * *  ', ' *  *  ', '*******', '    *  ', '    *  '],
                    ['*******', '*      ', '****** ', '      *', '      *', '*     *', ' ***** '],
                    ['  **** ', ' *     ', '*      ', '****** ', '*     *', '*     *', ' ***** '],
                    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*      '],
                    [' ***** ', '*     *', '*     *', ' ***** ', '*     *', '*     *', ' ***** '],
                    [' ***** ', '*     *', '*     *', ' ******', '      *', '     * ', ' ****  ']];
            var html = ''
            for (var i = 0; i < DOTS[0].length; i++) {
                for (var j = 0; j < text.length; j++) {
                    html += DOTS[ALPHANUMERIC.indexOf(text.charAt(j))][i].
						replace(/ /g, '&nbsp;').replace(/\*/g, '*') +
						'&nbsp;&nbsp;';
                }
                html += '<br>';
            }
            $('.realperson-text').html(html);
        }
        function displayMsg(msg, header) {
            $(document).ready(function () {
                showDlg('fpw');
                BizAPP.UI.InlinePopup.Alert({ title: '', header: header, errorMessage: msg, btnOk: true, txtOk: 'OK', type: 'info', addnInfo: '', hideAddnBtns: true });
            });
        }
        function displayError(msg, addnInfo) {
            showDlg('fpw');
            BizAPP.UI.InlinePopup.Alert({ title: '', errorMessage: msg, btnOk: true, txtOk: 'OK', addnInfo: '<div id="err_tech" class="err-tech"><hr>' + addnInfo + '</div>' });
        }
        function CustomizeLogin(content) {
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                if (options.dataType == 'script' || originalOptions.dataType == 'script') {
                    options.cache = true;
                }
            });

            var login = $('#UpdatePanel1').html();
            content = $(content);
            $('#UpdatePanel1').html(content);
            var a = BizAPP.UI.Control._getCommentNodes($('#UpdatePanel1')).filter(function () { return this.nodeValue != 'login' });
            if (a.length != 1) {
                a = $('.bza-login-dialog');
                if (a.length != 1) {
                    addLog('', 'login dialog init failed - ' + a.length);
                }
                else
                    $(a[0]).replaceWith($(login));
            }
            else
                $(a[0]).replaceWith($(login));
        }
        function showDlg(mode) {

        }
        function ToggleSignUpPanel(showProcessing) {
        	if (showProcessing) {
                $('#pnlSignUp').hide();
                $('#pnlProcessing').show();
            }
            else {
                $('#pnlProcessing').hide();
                $('#pnlSignUp').show();
            }
        }
        function ToggleValidationPanel(showProcessing) {
            var hide = $('#fpcode').hasClass('bza-from-fp')
            if (!hide) {
                if (showProcessing) {
                    $('.fp-confirm').hide();
                    $('#pnlRegProcessing').show();
                }
                else {
                    $('#pnlRegProcessing').hide();
                    $('.fp-confirm').show();
                }
            }
        }
        function ValidateConfirmPwd() {
            if (!($("#pwreset").val() === $("#pwconfirm").val())) {
                $('#pnlProvisionProcessing').hide();
                $('#pnlReset').show();
                alert('Password mismatch. Please make sure that the passwords are identical.');
                return false;
            }
            return true;
        }
        function ShowMfaPanel() {
            $('.lc').hide();
            BizAPP.UI.MFA.Init('.mfa');
            $('.mfa').show();
        }
        
        function showPasswordHint(e) {
            var htmlStr = '<span style="max-width: 275px; color: black;font-family: Calibri;font-size: .9rem;line-height: 1.5;text-align: left;">{0}</span>'.format($('#lblPwHint').html());
            BizAPP.MenuPopup.Create({ html: htmlStr, selector: $('#pwreset').get(0), mode: 'open', position: 'bottom', callback: function () { e.stopPropagation(); } });
        }
    </script>
</head>
<body onkeydown="ProcessKey( event );" onkeypress="ProcessKey( event );">
    <form runat="server" id="form1" defaultfocus="un" onclick="closeMenuPopup(event);BizAPP.MenuPopup.HideOrRemovePopup();">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <div style="display: none">
            <asp:LinkButton ID="lbLogin" runat="server" OnClick="lbLogin_Click">Login</asp:LinkButton>
            <asp:LinkButton ID="lbSignUp" runat="server" OnClick="signupLink_Click">Sign-up</asp:LinkButton>
            <asp:LinkButton ID="lbFP" runat="server" OnClick="passwordLink_Click">FP</asp:LinkButton>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div class="containersize" id="bza-log-container">
                    <div class="loginContainer">
                        <asp:HyperLink ID="logo" runat="server"  target="_blank" class="logo" NavigateUrl="http://apppoint.com/">
                    <div></div>
                        </asp:HyperLink>
                        <hr />
                        <asp:MultiView ID="MultiView1" runat="server" ActiveViewIndex="0" EnableViewState="true" ViewStateMode="Disabled">
                            <asp:View ID="Tab1" runat="server">
                                <div class="lc">                               
                                    <span style="text-align:left">Login as</span>     
                                    <asp:HiddenField ID="loc" runat="server" Value="tcp://localhost:9000/RegistryS" />
                                    <select id="ent" placeholder="Enterprise"></select>
                                    <select id="pro" placeholder="Provider"></select>

                                    <input type="text" id="dmn" placeholder="Domain" />
                                    <asp:TextBox ID="un" runat="server" placeholder="User name"></asp:TextBox>
                                    <span class="lc-pw">
										<input type="password" id="pw" placeholder="Password" />
										<button id="loginBtn" onclick="login();return false;">LOGIN</button>
									</span>
                                    <span>
                                        <asp:LinkButton ID="passwordLink" runat="server" OnClick="passwordLink_Click" style="display: inline; padding-right: 5px">Forgot password?</asp:LinkButton>
                                        <input type="checkbox" />Remember Me       
                                    </span>
                                    <span id="spnSocial" runat="server" style="text-align: center;">Login using 
                                        <asp:Button ID="btnMicrosoft" runat="server" ToolTip="Login using Windows" class="socialwindows" Text="&#xf17a;" CommandArgument="microsoft" formnovalidate></asp:Button>
                                        <asp:Button ID="btnFacebook" runat="server" ToolTip="Login using Facebook" class="socialfacebook" Text="&#xf09a;" CommandArgument="facebook" formnovalidate></asp:Button>
                                        <asp:Button ID="btnGoogle" runat="server" ToolTip="Login using Google" class="socialgoogle" Text="&#xf1a0;" CommandArgument="google" formnovalidate></asp:Button>
                                        <asp:Button ID="btnLinkedIn" runat="server" ToolTip="Login using LinkedIn" class="sociallinkedin" Text="&#xf0e1;" CommandArgument="linkedIn" formnovalidate></asp:Button>
                                        <asp:Button ID="btnTwitter" runat="server" ToolTip="Login using Twitter" class="socialtwitter" Text="&#xf099;" CommandArgument="twitter" formnovalidate></asp:Button>
                                        <asp:Button ID="btnYahoo" runat="server" ToolTip="Login using Yahoo" class="socialyahoo" Text="&#xf19e;" CommandArgument="yahoo" formnovalidate></asp:Button>
                                    </span>
                                    <asp:Panel runat="server" ID="forgotPW">
                                        <asp:HyperLink ID="forgotPasswordPage" runat="server" Visible="false" NavigateUrl="forgotpasswordpage.aspx">Forgot password?</asp:HyperLink>
                                    </asp:Panel>
                                    <asp:Panel runat="server" ID="signup">
                                        DONT HAVE AN ACCOUNT ?
                                        <asp:LinkButton ID="signupLink" runat="server" OnClick="signupLink_Click" Text="Sign-up for new account"></asp:LinkButton>
                                    </asp:Panel>
                                    <%--<asp:Panel runat="server" ID="regUser">
                                                <asp:HyperLink ID="registerLink" runat="server" NavigateUrl="registerpage.aspx">Don't have an account? <strong>Sign Up</strong></asp:HyperLink>
                                            </asp:Panel>--%>
                                </div>
                                <div class="mfa" style="display: none;"></div>
                            </asp:View>
                            <asp:View ID="Tab2" runat="server">
                                <div class="fp" style="text-align: center;">
                                    <asp:TextBox ID="fpdmn" runat="server" ToolTip="Domain" placeholder="Domain"></asp:TextBox>
                                    <asp:TextBox ID="fpemail" runat="server" required ToolTip="Username/E-mail" placeholder="Username/E-mail"></asp:TextBox>
                                    <div class="realperson-text"></div>
                                    <input type="text" id="defaultReal" name="defaultReal" placeholder="Enter the letters displayed above" />
                                    <asp:HiddenField ID="defaultRealHash" runat="server" />
                                    <asp:Button ID="btnSubmit" runat="server" Text="Submit" Style="float: inherit" class="btn-submit" OnClientClick="$('#Processing').show();" OnClick="btnSubmit_Click" />
                                    <asp:Button ID="btnFPWCan" runat="server" Text="Cancel" Style="float: inherit" class="btn-submit canBtn" formnovalidate OnClientClick="$('#Processing').show();" OnClick="btnFPWCan_Click" />
                                </div>
                            </asp:View>
                            <asp:View ID="Tab3" runat="server">
                                <div class="fp-msg" style="text-align: center;">
                                    <asp:Label ID="lblMessage" CssClass="fp-msg-txt" runat="server" />
                                    <asp:Button ID="btnFPWBack" runat="server" Text="Back" Style="float: inherit" class="btn-submit" OnClientClick="$('#Processing').show();" OnClick="btnFPWCan_Click" />
                                </div>
                            </asp:View>
                            <asp:View ID="Tab4" runat="server">
                                <style>
                                    .fp-confirm .fp-msg-text {
                                        line-height: 1.7rem;
                                    }

                                    .fp-confirm a {
                                        text-decoration: underline;
                                        cursor: pointer;
                                        padding-top: 10px;
                                    }

                                    .fp-resend {
                                        text-align: center;
                                        display: none;
                                        min-height: 268px;
                                    }

                                        .fp-resend a {
                                            text-decoration: underline;
                                            cursor: pointer;
                                            padding-top: 10px;
                                        }

                                    
                                </style>
                                <div class="fp-confirm" style="text-align: center;">
                                    The code(valid for 30 minutes) has been sent to
                                    <br />
                                    <asp:Label ID="lblPromptMsg" CssClass="fp-msg-text" runat="server" />
                                    <asp:Label ID="lblConfirmEmailId" CssClass="fp-msg-mailid" runat="server" />
                                    <br />
                                    Please enter the code below to continue
                                    <br />
                                    <br />
                                    <asp:TextBox ID="fpcode" runat="server" placeholder="Confirmation Code" title="Confirmation Code" required="true" oninvalid="ToggleValidationPanel(false);" />
                                    <asp:Panel ID="pnlInvalidCode" runat="server" class="invalid-code" Visible="false">
                                        <i class="fa fa-warning" style="float: left;margin-top: 10px;margin-left: 70px;color: red;"></i>
                                        <asp:Label ID="lblInvalidCode" CssClass="msg-invalid-code" runat="server" />
                                    </asp:Panel>
                                    
                                    <asp:TextBox runat="server" ID="tb_TSU_Company" Visible="false" placeholder="Company" title="Company" required="true" oninvalid="ToggleSignUpPanel(false);" />
                                    <span id="spn_tsu_dmn" style="background-color: white; color: black;">https://
                                        <asp:TextBox runat="server" ID="tb_TSU_Domain" Visible="false" Style="border: 0; margin: 0; width: 80px; display: inline-block;" placeholder="Domain" title="Domain" required="true" oninvalid="ToggleSignUpPanel(false);" />
                                        .bartsuite.com</span>                                    
                                    <br />
                                    <asp:Button runat="server" Text="Continue" ID="btnFPWConfirm" CssClass="btn-submit" Style="float: inherit" OnClientClick="ToggleValidationPanel(true);" OnClick="btnFPWConfirm_Click" />
                                    <asp:Button runat="server" Text="Cancel" ID="btnFPWCancelConfirm" CssClass="btn-submit canBtn" Style="float: inherit;" formnovalidate OnClientClick="ToggleValidationPanel(false);" OnClick="btnFPWCan_Click" />
                                    <a id="lnkResend" onclick="$('.fp-confirm').hide();$('.fp-resend').show();">Resend Confirmation Code</a>
                                </div>
                                <div id="pnlRegProcessing" style="display: none; text-align: center; height: 150px; padding-top: 20px;">
                                    <i class="fa fa-cog fa-spin fa-3x"></i>
                                    <br />
                                    <br />
                                    Your account is being created.<br />
                                    This may take a few minutes.
                                </div>
                                <div class="fp-resend">
                                    <br />
                                    Enter your E-mail ID to continue
                                            <br />
                                    <br />
                                    <asp:TextBox ID="rsemail" runat="server" required ToolTip="Confirm E-mail" placeholder="Confirm E-mail"></asp:TextBox>
                                    <br />
                                    <asp:Button ID="btnResend" runat="server" Text="Resend" Style="float: inherit" class="btn-resend" formnovalidate OnClientClick="$('#Processing').show();" OnClick="btnResend_Click" />
                                    <button class="btn-submit canBtn" style="float: inherit" onclick="$('.fp-resend').hide();$('.fp-confirm').show();">Back</button>
                                </div>
                            </asp:View>
                            <asp:View ID="Tab5" runat="server">
                                <div id="pnlReset" class="fp-reset" style="text-align: center;">
                                    <asp:Label ID="lblPwMsg" CssClass="fp-msg-text" runat="server" Text="Choose a strong password which is a combination of letters and punctuation mark"/>
                                    <asp:Label ID="lblPwHint" Style="display: none" CssClass="fp-msg-text" runat="server" Text="Choose a strong password which is a combination of letters and punctuation mark" />
                                    <div id="wrapper">
                                        <asp:TextBox runat="server" TextMode="Password" autocomplete="off" ID="pwreset" placeholder="New Password" title="New Password" required="true" oninvalid="$('#Processing').hide();" />
                                        <i class="fa fa-info-circle fa-lg" style="float: right; color: white; margin-top: -33px;" onclick="showPasswordHint(event);"></i>
                                    </div>
                                    <asp:TextBox runat="server" TextMode="Password" ID="pwconfirm" autocomplete="off" placeholder="Confirm Password" title="Confirm Password" required="true" oninvalid="$('#Processing').hide();" />
                                    <asp:Button runat="server" Text="Continue" ID="btnFPWReset" CssClass="btn-submit" Style="float: inherit" OnClientClick="$('#pnlReset').hide();$('#pnlProvisionProcessing').show();return ValidateConfirmPwd();" OnClick="btnFPWReset_Click" />
                                    <asp:Button runat="server" Text="Cancel" ID="btnFPWCancelReset" CssClass="btn-submit canBtn" Style="float: inherit; background: #2980b9; color: white;" formnovalidate OnClientClick="$('#Processing').show();" OnClick="btnFPWCan_Click" />
                                </div>
                                <div id="pnlProvisionProcessing" style="display: none; text-align: center; height: 150px; padding-top: 20px;">
                                    <i class="fa fa-cog fa-spin fa-3x"></i>
                                    <br />
                                    <br />
                                    <asp:Label ID="waitMsg" runat="server" style="margin: 0 40px 10px;" Text="Processing..."></asp:Label>
                                </div>
                            </asp:View>
                            <asp:View ID="Tab6" runat="server">
                                <asp:Panel ID="pnlSignUp" runat="server" class="lc" Style="text-align: center;">    
                                    <span style="text-align:left">Signup</span>                                
                                    <asp:TextBox ID="spDmn" runat="server" ToolTip="Domain" placeholder="Domain"></asp:TextBox>
                                    <asp:TextBox runat="server" TextMode="Email" ID="regemail" placeholder="Email" title="Email" required="true" oninvalid="ToggleSignUpPanel(false);" />
                                    <asp:TextBox runat="server" ID="fn" placeholder="Name" title="Name" required="true" oninvalid="ToggleSignUpPanel(false);"/>
                                    <asp:TextBox runat="server" ID="ln" placeholder="Last Name" title="Last Name" style="display:none" />
                                    <span id="spn_tsu_phone" style="background: white;color: black;">
										<i class="fa fa-mobile" style="margin: 0 .1rem;"></i>
										<asp:TextBox runat="server" TextMode="Phone" ID="dob" bizappid="reg_user_dob" placeholder="Phone Number" pattern="^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$" oninvalid="ToggleSignUpPanel(false);" style="width: calc(100% - 3rem);display: inline-block;margin: 0;"/>
									</span>
                                    <div class="realperson-text"></div>
                                    <input type="text" id="defaultReal" name="defaultReal" placeholder="Enter the letters displayed above" />
                                    <asp:HiddenField ID="HiddenField1" runat="server" />
                                    <div>
                                        <asp:Button ID="btnRegSubmit" runat="server" Text="Create Account" Style="float: inherit; margin-bottom: 10px;" OnClientClick="ToggleSignUpPanel(true);" CssClass="btn-submit" OnClick="btnRegSubmit_Click" />
                                    </div>
                                    <span id="spnRegSocial" runat="server">Signup using 
                                        <asp:Button ID="regMicrosoft" runat="server" ToolTip="Sign-up using Windows" class="socialwindows" Text="&#xf17a;" CommandArgument="microsoft" formnovalidate></asp:Button>
                                        <asp:Button ID="regFacebook" runat="server" ToolTip="Sign-up using Facebook" class="socialfacebook" Text="&#xf09a;" CommandArgument="facebook" formnovalidate></asp:Button>
                                        <asp:Button ID="regGoogle" runat="server" ToolTip="Sign-up using Google" class="socialgoogle" Text="&#xf1a0;" CommandArgument="google" formnovalidate></asp:Button>
                                        <asp:Button ID="regLinkedIn" runat="server" ToolTip="Sign-up using LinkedIn" class="sociallinkedin" Text="&#xf0e1;" CommandArgument="linkedIn" formnovalidate></asp:Button>
                                        <asp:Button ID="regTwitter" runat="server" ToolTip="Sign-up using Twitter" class="socialtwitter" Text="&#xf099;" CommandArgument="twitter" formnovalidate></asp:Button>
                                        <asp:Button ID="regYahoo" runat="server" ToolTip="Sign-up using Yahoo" class="socialyahoo" Text="&#xf19e;" CommandArgument="yahoo" formnovalidate></asp:Button>
                                    </span>
                                    <asp:Panel runat="server" ID="login">
                                        Already have an account?<br />
                                        <asp:LinkButton ID="loginLink" runat="server" OnClick="lbLogin_Click" Text="Login using existing account"></asp:LinkButton>
                                    </asp:Panel>
                                </asp:Panel>
                                <div id="pnlProcessing" style="display: none; text-align: center; height: 150px; padding-top: 20px;">
                                    <i class="fa fa-cog fa-spin fa-3x"></i>
                                    <br />
                                    <br />
                                    Your account is being created.<br />
                                    This may take a few minutes.
                                </div>
                            </asp:View>
                            <asp:View ID="Tab7" runat="server">
                                <div class="fp-confirm" style="text-align: center;">
                                    <asp:Panel ID="plnLoginCode" runat="server" class="pnl-lc">
										The access code(valid for 30 minutes) has been sent to
                                        <br />
                                        <asp:Label ID="lblMfaPromptMsg" CssClass="fp-msg-text" runat="server" />
                                        Please enter the code below to continue
		                                <br /><br />
                                        <asp:TextBox ID="mfacode" runat="server" CssClass="bza-mfa-token" placeholder="Security Code" title="Confirmation Code" oninvalid="ToggleValidationPanel(false);" />
                                        <asp:Panel ID="pnlInvalidMfaCode" runat="server" class="invalid-code" Visible="false">
                                            <i class="fa fa-warning" style="float: left; margin-top: 10px; margin-left: 70px; color: red;"></i>
                                            <asp:Label ID="lblInvalidMfaCode" CssClass="msg-invalid-code" runat="server" />
                                        </asp:Panel>
                                        <asp:Button runat="server" Text="Continue" ID="btnMFAConfirm" CssClass="btn-submit" Style="float: inherit" OnClientClick="ProcessingStatus(true, true);" OnClick="btnMFAConfirm_Click" />
                                        <asp:Button runat="server" Text="Cancel" ID="btnMFACancelConfirm" CssClass="btn-submit canBtn" Style="float: inherit;" formnovalidate OnClick="btnFPWCan_Click" />
		                                <br /><br />
										<button style="float:none" onclick="$('#pnlProviderList').show();$('#plnLoginCode').hide();return false;">Resend Code</button>
                                    </asp:Panel>
                                    <asp:Panel ID="pnlProviderList" runat="server" class="pnl-pl" style="display:none">
                                        How would you like to receive your code?
		                                <br />
                                        <asp:RadioButtonList ID="rdoProviders" runat="server" align="center" Style="text-align: left;" EnableViewState="true" ViewStateMode="Enabled">
                                        </asp:RadioButtonList>
                                        <br />
                                        <asp:Button runat="server" Text="Resend Code" ID="btnMFASelectProvider" CssClass="btn-submit" Style="float: inherit" OnClick="btnMFASelectProvider_Click" />
                                    </asp:Panel>
                                </div>
                            </asp:View>
                        </asp:MultiView>
                        <hr style="margin-bottom: 5px" />
                        <asp:HyperLink ID="branding" runat="server" target="_blank" NavigateUrl="http://apppoint.com/" Style="font-size: small; color: #ccc;"></asp:HyperLink>
                    </div>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:PostBackTrigger ControlID="btnFPWCan" />
                <asp:PostBackTrigger ControlID="btnFPWBack" />
                <asp:PostBackTrigger ControlID="btnFPWCancelConfirm" />
                <asp:PostBackTrigger ControlID="btnFPWCancelReset" />
                <asp:PostBackTrigger ControlID="btnFPWReset" />
                <asp:PostBackTrigger ControlID="btnRegSubmit" />
                <asp:PostBackTrigger ControlID="loginLink" />
                <asp:PostBackTrigger ControlID="signupLink" />
                <asp:PostBackTrigger ControlID="regMicrosoft" />
                <asp:PostBackTrigger ControlID="regFacebook" />
                <asp:PostBackTrigger ControlID="regGoogle" />
                <asp:PostBackTrigger ControlID="regTwitter" />
                <asp:PostBackTrigger ControlID="regYahoo" />
                <asp:PostBackTrigger ControlID="regLinkedIn" />
                <asp:PostBackTrigger ControlID="btnMicrosoft" />
                <asp:PostBackTrigger ControlID="btnFacebook" />
                <asp:PostBackTrigger ControlID="btnGoogle" />
                <asp:PostBackTrigger ControlID="btnLinkedIn" />
                <asp:PostBackTrigger ControlID="btnTwitter" />
                <asp:PostBackTrigger ControlID="btnYahoo" />
                <asp:PostBackTrigger ControlID="passwordLink" />
                <asp:PostBackTrigger ControlID="btnFPWConfirm" />
                <asp:PostBackTrigger ControlID="btnSubmit" />
                <asp:PostBackTrigger ControlID="btnMFASelectProvider" />
            </Triggers>
        </asp:UpdatePanel>
    </form>
</body>
</html>
