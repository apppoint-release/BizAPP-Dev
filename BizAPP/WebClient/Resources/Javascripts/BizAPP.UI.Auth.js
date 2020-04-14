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

/* BizAPP.UI.Auth.Create({'selector':'body', 'url':'http://localhost/login.aspx?html.rp=true','mode':'login/signup/forgotpassword','skipCustomization':'true'/'false', 'cssString':'body {background: #3498db!important;}',
  'extraInfo':{'firstname':'Abc','lastname':'Xyz','regemail':'abc@xyz.com','phone':'9876543210','fpemail':'abc@xyz.com'}}); */
var BizAPP = BizAPP || {};
BizAPP.UI = BizAPP.UI || {};
BizAPP.UI.Auth = {
    Create: function (options) {
        var url = '/auth.aspx';
        if (options.url)
            url = options.url;
        else {
            switch (options.mode) {
                case "signup":
                    url += '?html.su=true';
                    if (options.extraInfo) {
                        if (options.extraInfo.firstname)
                            url += '&html.fn=' + options.extraInfo.firstname;
                        if (options.extraInfo.lastname)
                            url += '&html.ln=' + options.extraInfo.lastname;
                        if (options.extraInfo.regemail)
                            url += '&html.regemail=' + options.extraInfo.regemail;
                        if (options.extraInfo.phone)
                            url += '&html.phn=' + options.extraInfo.phone;
                    }
                    break;
                case "forgotpassword":
                    url += '?html.rp=true';
                    if (options.extraInfo) {
                        if (options.extraInfo.fpemail)
                            url += '&html.un=' + options.extraInfo.fpemail;
                    }
                    break;
                default:
            }
            if (options.skipCustomization)
            	url += 'html.skipcust=' + options.skipCustomization;

            if (options.cssURL)
            	url += 'html.css=' + options.cssURL;
        }
        url += (url.indexOf('?') >= 0) ? location.search.replace('?', '&') : location.search;
        $(options.selector).append($('<iframe id="bza-login" style="display:none" src="' + url + '" seamless></iframe>'));
        if (options.cssString) {
        	$('iframe#bza-login').load(function () {
        		var $head = $('iframe#bza-login').contents().find('head');
        		$head.append('<style>' + options.cssString + '</style>');
        		$('iframe#bza-login').show();
        	});
        }
		else
        	$('iframe#bza-login').show();
    }
}