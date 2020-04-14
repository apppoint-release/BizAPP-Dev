//#region TINY BOX
function TINYBOX()
{
    var j, m, b, g, v, p = 0;
    return {
        tinner: function () { return p; },
        addCloseHandler: function (o) {
            var a = v.closejs;
            v.closejs = function () { a(); o(); };
        },
        show: function(o)
        {
            v = { opacity: 70, close: 1, animate: 1, fixed: 1, mask: 1, maskid: '', boxid: '', topsplit: 2, url: 0, post: 0, height: 0, width: 0, html: 0, iframe: 0, hideClose: false };
            var _isIE = isIE();
            if (_isIE > 0 && _isIE < 8) {
                v.fixed = 0;
            }
            v.animate = !BizAPP.UI.InlinePopup.DisableAnimate();
            for (s in o) { v[s] = o[s] }
            if (!p) {
                j = document.createElement('div'); j.className = 'tbox';
                p = document.createElement('div'); p.className = 'tinner';
                b = document.createElement('div'); b.className = 'tcontent';
                m = document.createElement('div'); m.className = 'tmask';
                g = document.createElement('div'); g.className = 'tclose'; g.v = 0;
                document.body.appendChild(m); document.body.appendChild(j); j.appendChild(p); p.appendChild(b);
                //m.onclick = 
                if (v.hideClose)
                    g.style.display = 'none'
                else
                    g.onclick = v.instance.hide; window.onresize = v.instance.resize
            } else {
                j.style.display = 'none'; clearTimeout(p.ah); if (g.v) { p.removeChild(g); g.v = 0 }
            }
            p.id = v.boxid; m.id = v.maskid; j.style.position = v.fixed ? 'fixed' : 'absolute';
            if (v.html && !v.animate) {
                p.style.backgroundImage = 'none'; b.innerHTML = v.html; b.style.display = '';
                p.style.width = v.width ? v.width + 'px' : 'auto'; p.style.height = v.height ? v.height + 'px' : 'auto'
            } else {
                b.style.display = 'none';
                if (!v.animate && v.width && v.height) {
                    p.style.width = v.width + 'px'; p.style.height = v.height + 'px'
                } else {
                    p.style.width = p.style.height = '100px'
                }
            }
            if (v.mask) { this.mask(); this.alpha(m, 1, v.opacity) } else { this.alpha(j, 1, 100) }
            if (v.autohide) { p.ah = setTimeout(v.instance.hide, 1000 * v.autohide) } else { document.onkeyup = v.instance.esc }
        },
        fill: function(c, u, k, a, w, h)
        {
            if (u)
            {
                if (v.image)
                {
                    var i = new Image(); i.onload = function() { w = w || i.width; h = h || i.height; v.instance.psh(i, a, w, h) }; i.src = v.image
                } else if (v.iframe)
                {
                    this.psh('<iframe src="' + v.iframe + '" width="' + v.width + '" frameborder="0" height="' + v.height + '"></iframe>', a, w, h)
                } else
                {
                    var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    x.onreadystatechange = function()
                    {
                        if (x.readyState == 4 && x.status == 200) { p.style.backgroundImage = ''; v.instance.psh(x.responseText, a, w, h) }
                    };
                    if (k)
                    {
                        x.open('POST', c, true); x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); x.send(k)
                    } else
                    {
                        x.open('GET', c, true); x.send(null)
                    }
                }
            } else
            {
                this.psh(c, a, w, h)
            }
        },
        psh: function(c, a, w, h)
        {
            if (typeof c == 'object') { b.appendChild(c) } else { b.innerHTML = c }
            var x = p.style.width, y = p.style.height;
            if (!w || !h)
            {
                p.style.width = w ? w + 'px' : ''; p.style.height = h ? h + 'px' : ''; b.style.display = '';
                if (!h) { h = parseInt(b.offsetHeight) }
                if (!w) { w = parseInt(b.offsetWidth) }
                b.style.display = 'none'
            }
            p.style.width = x; p.style.height = y;
            this.size(w, h, a)
        },
        esc: function (e) {
            e = e || window.event; if (!v.hideClose && e.keyCode == 27) {
                if ($('.bza-alrtDefaultBtn').length > 0)
                    $('.bza-alrtDefaultBtn').click();
                else
                    v.instance.hide();
            }
        },
        hide: function (event, a) {
            if (!a && $(p).find('.cancelstep').length == 1) {
                if ($(p).find('.cancelstep').parents('.linkcontrol').length == 1)
                    $(p).find('.cancelstep').parents('.linkcontrol').click();
                else
                    $(p).find('.cancelstep').click();
            }
            else if (!a && $(p).find('.form:not(.bza-noteditable)').length > 0) {
                if (confirm('Are you sure you want to close the form?')) {
                    v.instance.alpha(j, -1, 0, 3); document.onkeypress = null; if (v.closejs) { v.closejs() }
                }
            }
            else {
                v.instance.alpha(j, -1, 0, 3); document.onkeypress = null; if (v.closejs) { v.closejs() }
            }
        },
        remove: function(){ document.body.removeChild(j); document.body.removeChild(m); },
        resize: function() { v.instance.pos(); v.instance.mask() },
        mask: function() { m.style.height = this.total(1) + 'px'; m.style.width = this.total(0) + 'px' },
        pos: function()
        {
            var t;
            if (typeof v.top != 'undefined') { t = v.top } else { t = (this.height() / v.topsplit) - (j.offsetHeight / 2); t = t < 20 ? 20 : t }
            if (!v.fixed && !v.top) { t += this.top() }
            var scrollTop = isIE() ? document.documentElement.scrollTop : document.body.scrollTop;
            j.style.top = j.style.position == 'absolute' ? scrollTop + t + 'px' : t + 'px';
            j.style.left = typeof v.left != 'undefined' ? v.left + 'px' : (this.width() / 2) - (j.offsetWidth / 2) + 'px'
        },
        alpha: function(e, d, a)
        {
            clearInterval(e.ai);
            if (d) { e.style.opacity = 0; e.style.filter = 'alpha(opacity=0)'; e.style.display = 'block'; v.instance.pos(); }
            e.ai = setInterval(function() { v.instance.ta(e, a, d) }, d == -1 ? 0 : 20);
        },
        ta: function(e, a, d)
        {
            var o = Math.round(e.style.opacity * 100);
            if (o == a)
            {
                clearInterval(e.ai);
                if (d == -1)
                {
                    e.style.display = 'none';
                    e == j ? v.instance.alpha(m, -1, 0, 2) : b.innerHTML = p.style.backgroundImage = ''
                } else
                {
                    if (e == m)
                    {
                        this.alpha(j, 1, 100);
                    } else
                    {
                        j.style.filter = '';
                        v.instance.fill(v.html || v.url, v.url || v.iframe || v.image, v.post, v.animate, v.width, v.height)
                    }
                }
            } else
            {
                var n = v.animate ? a - Math.floor(Math.abs(a - o) * .5) * d : a;
                e.style.opacity = n / 100; e.style.filter = 'alpha(opacity=' + n + ')'
            }
        },
        size: function(w, h, a)
        {
            if (a)
            {
                clearInterval(p.si); var wd = parseInt(p.style.width) > w ? -1 : 1, hd = parseInt(p.style.height) > h ? -1 : 1;
                p.si = setInterval(function() { v.instance.ts(w, wd, h, hd) }, 20)
            } else
            {
                p.style.backgroundImage = 'none'; if (v.close) { p.appendChild(g); g.v = 1 }
                p.style.width = w + 'px'; p.style.height = h + 'px'; b.style.display = ''; this.pos();
                if (v.openjs) { v.openjs() }
            }
        },
        ts: function(w, wd, h, hd)
        {
            var cw = parseInt(p.style.width), ch = parseInt(p.style.height);
            if (cw == w && ch == h)
            {
                clearInterval(p.si); p.style.backgroundImage = 'none'; b.style.display = 'block'; if (v.close) { p.appendChild(g); g.v = 1 }
                if (v.openjs) { v.openjs() }
            } else
            {
                if (cw != w) { p.style.width = (w - Math.floor(Math.abs(w - cw) * .6) * wd) + 'px' }
                if (ch != h) { p.style.height = (h - Math.floor(Math.abs(h - ch) * .6) * hd) + 'px' }
                this.pos()
            }
        },
        top: function() { return document.documentElement.scrollTop || document.body.scrollTop },
        width: function() { return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth },
        height: function() { return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight },
        total: function(d)
        {
            var b = document.body, e = document.documentElement;
            return d ? Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight)) :
			Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth))
        }
    }
} 
//#endregion

//#region SMART WIZARD
/*
Smart Wizard 2.0
http://techlaboratory.net/products.php?product=smartwizard
*/
(function(a)
{
    a.fn.smartWizard = function(k)
    {
        var c = a.extend({}, a.fn.smartWizard.defaults, k), u = arguments; return this.each(function()
        {
            function z()
            {
                var d = b.children("div");
                b.children("ul").addClass("anchor");
                d.addClass("content");
                l = a("<div>Loading</div>").addClass("loader");
                i = a("<div></div>").addClass("actionBar");
                m = a("<div></div>").addClass("stepContainer");
                n = a("<a>" + c.labelNext + "</a>").attr("href", "#").addClass("buttonNext");
                o = a("<a>" + c.labelPrevious + "</a>").attr("href", "#").addClass("buttonPrevious");

                p = a("<a>" + c.labelFinish + "</a>").attr("href", "#").addClass("buttonFinish");
                c.errorSteps && c.errorSteps.length > 0 && a.each(c.errorSteps, function(a, b) { v(b, !0) });
                m.append(d);
                i.append(l);
                b.append(m);
                b.append(i);
                i.append(p).append(n).append(o);
                w = m.width();
                //next click handler
                a(n).click(function()
                {
                    x();
                    return !1
                });
                //previous click handler
                a(o).click(function()
                {
                    y();
                    return !1
                });
                //finish click handler
                a(p).click(function()
                {
                    if (!a(this).hasClass("buttonDisabled")) if (a.isFunction(c.onFinish)) c.onFinish.call(this, a(f));
                    else
                    {
                        var d = b.parents("form");
                        d && d.length && d.submit()
                    } return !1
                });

                c.headerDrilldown && a(f).bind("click", function()
                {
                    if (f.index(this) == h) return !1;
                    var a = f.index(this);
                    f.eq(a).attr("isDone") - 0 == 1 && q(a);
                    return !1
                });
                c.keyNavigation && a(document).keyup(function(a) { a.which == 39 ? x() : a.which == 37 && y() });
                A();
                q(h);
            }
            function A()
            {
                c.enableAllSteps ? (a(f, b).removeClass("selected").removeClass("disabled").addClass("done"), a(f, b).attr("isDone", 1)) : (a(f, b).removeClass("selected").removeClass("done").addClass("disabled"), a(f, b).attr("isDone", 0));
                a(f, b).each(function(d)
                {
                    a(a(this).attr("href"), b).hide();
                    a(this).attr("rel", d + 1)
                });
            }
            function q(d)
            {
                var e = f.eq(d), g = c.contentURL, h = e.data("hasContent");
                stepNum = d + 1;
                g && g.length > 0 ? c.contentCache && h ? t(d) : a.ajax({ url: g, type: "POST", data: { step_number: stepNum }, dataType: "text", beforeSend: function() { l.show() }, error: function() { l.hide() }, success: function(c)
                {
                    l.hide();
                    c && c.length > 0 && (e.data("hasContent", !0), a(a(e, b).attr("href"), b).html(c), t(d))
                }
                }) : t(d)
            }
            function t(d)
            {
                var e = f.eq(d), g = f.eq(h);
                if (d != h && a.isFunction(c.onLeaveStep) && !c.onLeaveStep.call(this, a(g))) return !1;
                m.height(a(a(e, b).attr("href"), b).outerHeight());
                if (c.transitionEffect == "slide") a(a(g, b).attr("href"), b).slideUp("fast", function()
                {
                    a(a(e, b).attr("href"), b).slideDown("fast");
                    h = d;
                    r(g, e)
                });
                else if (c.transitionEffect == "fade") a(a(g, b).attr("href"), b).fadeOut("fast", function()
                {
                    a(a(e, b).attr("href"), b).fadeIn("fast");
                    h = d;
                    r(g, e)
                });
                else if (c.transitionEffect == "slideleft")
                {
                    var i = 0;
                    d > h ? (nextElmLeft1 = w + 10, nextElmLeft2 = 0, i = 0 - a(a(g, b).attr("href"), b).outerWidth()) : (nextElmLeft1 = 0 - a(a(e, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, i = 10 +
a(a(g, b).attr("href"), b).outerWidth());
                    d == h ? (nextElmLeft1 = a(a(e, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, i = 0 - a(a(g, b).attr("href"), b).outerWidth()) : a(a(g, b).attr("href"), b).animate({ left: i }, "fast", function() { a(a(g, b).attr("href"), b).hide() });
                    a(a(e, b).attr("href"), b).css("left", nextElmLeft1);
                    a(a(e, b).attr("href"), b).show();
                    a(a(e, b).attr("href"), b).animate({ left: nextElmLeft2 }, "fast", function()
                    {
                        h = d;
                        r(g, e)
                    })
                }
                else a(a(g, b).attr("href"), b).hide(), a(a(e, b).attr("href"), b).show(), h = d, r(g, e);
                return !0
            }
            function r(d, e)
            {
                a(d, b).removeClass("selected");
                a(d, b).addClass("done");
                a(e, b).removeClass("disabled");
                a(e, b).removeClass("done");
                a(e, b).addClass("selected");
                a(e, b).attr("isDone", 1);
                c.cycleSteps || (0 >= h ? a(o).addClass("buttonDisabled") : a(o).removeClass("buttonDisabled"), f.length - 1 <= h ? a(n).addClass("buttonDisabled") : a(n).removeClass("buttonDisabled"));
                !f.hasClass("disabled") || c.enableFinishButton ? a(p).removeClass("buttonDisabled") : a(p).addClass("buttonDisabled");
                if (a.isFunction(c.onShowStep) && !c.onShowStep.call(this, a(e)))
                    return !1;
            }
            function x()
            {
                var a = h + 1;
                if (f.length <= a)
                {
                    if (!c.cycleSteps) return !1;
                    a = 0
                } q(a)
            }
            function y()
            {
                var a = h - 1;
                if (0 > a)
                {
                    if (!c.cycleSteps) return !1;
                    a = f.length - 1
                } q(a)
            }
            function B(b)
            {
                a(".content", j).html(b);
                j.show()
            }
            function v(d, c)
            {
                c ? a(f.eq(d - 1), b).addClass("error") : a(f.eq(d - 1), b).removeClass("error")
            }
            var b = a(this), h = c.selected, f = a("ul > li > a", b), w = 0, l, j, i, m, n, o, p;
            i = a(".actionBar", b);
            i.length == 0 && (i = a("<div></div>").addClass("actionBar"));
            j = a(".msgBox", b);
            j.length == 0 && (j = a('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>'), i.append(j));
            a(".close", j).click(function()
            {
                j.fadeOut("normal");
                return !1
            });
            if (!k || k === "init" || typeof k === "object") z();
            else if (k === "showMessage")
            {
                var s = Array.prototype.slice.call(u, 1);
                B(s[0]);
                return !0
            }
            else if (k === "hideMessage")
            {
                j.hide();
                return !0
            }
            else if (k === "reinit")
            {
                var s = Array.prototype.slice.call(u, 1);
                var e = f.eq(s[0].stepNum);
                $('.stepContainer').height(a(a(e, b).attr("href"), b).outerHeight());
            }
            else if (k === "setError")
                return s = Array.prototype.slice.call(u, 1), v(s[0].stepnum, s[0].iserror), !0;
            else
                a.error("Method " + k + " does not exist");
        });
    };
    a.fn.smartWizard.defaults =
    {
        selected: 0,
        keyNavigation: !0,
        enableAllSteps: !1,
        transitionEffect: "fade",
        contentURL: null,
        contentCache: !0,
        cycleSteps: !1,
        enableFinishButton: !1,
        errorSteps: [],
        labelNext: "Next",
        labelPrevious: "Previous",
        labelFinish: "Finish",
        onLeaveStep: null,
        onShowStep: null,
        onFinish: null,
        headerDrilldown: 0
    }
})(jQuery);
//#endregion

//#region TIMEAGO
/*
 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: true,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
} (jQuery));
//#endregion

//#region IDLE TIMER
/*!
* jQuery idleTimer plugin
* version 0.9.100511
* by Paul Irish.
* http://github.com/paulirish/yui-misc/tree/
* MIT license

* adapted from YUI idle timer by nzakas:
* http://github.com/nzakas/yui-misc/
*/
/*
* Copyright (c) 2009 Nicholas C. Zakas
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/* updated to fix Chrome setTimeout issue by Zaid Zawaideh */

 // API available in <= v0.8
 /*******************************

// idleTimer() takes an optional argument that defines the idle timeout
// timeout is in milliseconds; defaults to 30000
$.idleTimer(10000);


$(document).bind("idle.idleTimer", function(){
// function you want to fire when the user goes idle
});


$(document).bind("active.idleTimer", function(){
// function you want to fire when the user becomes active again
});

// pass the string 'destroy' to stop the timer
$.idleTimer('destroy');

// you can query if the user is idle or not with data()
$.data(document,'idleTimer'); // 'idle' or 'active'

// you can get time elapsed since user when idle/active
$.idleTimer('getElapsedTime'); // time since state change in ms

********/



 // API available in >= v0.9
 /*************************

// bind to specific elements, allows for multiple timer instances
$(elem).idleTimer(timeout|'destroy'|'getElapsedTime');
$.data(elem,'idleTimer'); // 'idle' or 'active'

// if you're using the old $.idleTimer api, you should not do $(document).idleTimer(...)

// element bound timers will only watch for events inside of them.
// you may just want page-level activity, in which case you may set up
// your timers on document, document.documentElement, and document.body


********/

(function($){

$.idleTimer = function(newTimeout, elem){

    // defaults that are to be stored as instance props on the elem

    var idle = false, //indicates if the user is idle
        enabled = true, //indicates if the idle timer is enabled
        timeout = 30000, //the amount of time (ms) before the user is considered idle
        events = 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove'; // activity is one of these events


    elem = elem || document;



    /* (intentionally not documented)
* Toggles the idle state and fires an appropriate event.
* @return {void}
*/
    var toggleIdleState = function(myelem){

        // curse you, mozilla setTimeout lateness bug!
        if (typeof myelem === 'number'){
            myelem = undefined;
        }

        var obj = $.data(myelem || elem,'idleTimerObj');

        //toggle the state
        obj.idle = !obj.idle;

        // reset timeout
        var elapsed = (+new Date()) - obj.olddate;
        obj.olddate = +new Date();

        // handle Chrome always triggering idle after js alert or comfirm popup
        if (obj.idle && (elapsed < timeout)) {
                obj.idle = false;
                clearTimeout($.idleTimer.tId);
                if (enabled)
                  $.idleTimer.tId = setTimeout(toggleIdleState, timeout);
                return;
        }
        
        //fire appropriate event

        // create a custom event, but first, store the new state on the element
        // and then append that string to a namespace
        var event = jQuery.Event( $.data(elem,'idleTimer', obj.idle ? "idle" : "active" ) + '.idleTimer' );

        // we do want this to bubble, at least as a temporary fix for jQuery 1.7
        // event.stopPropagation();
        $(elem).trigger(event);
    },

    /**
* Stops the idle timer. This removes appropriate event handlers
* and cancels any pending timeouts.
* @return {void}
* @method stop
* @static
*/
    stop = function(elem){

        var obj = $.data(elem,'idleTimerObj');

        //set to disabled
        obj.enabled = false;

        //clear any pending timeouts
        clearTimeout(obj.tId);

        //detach the event handlers
        $(elem).unbind('.idleTimer');
    },

    /* (intentionally not documented)
* Handles a user event indicating that the user isn't idle.
* @param {Event} event A DOM2-normalized event object.
* @return {void}
*/
    handleUserEvent = function(){

        var obj = $.data(this,'idleTimerObj');

        //clear any existing timeout
        clearTimeout(obj.tId);

        //if the idle timer is enabled
        if (obj.enabled){

            //if it's idle, that means the user is no longer idle
            if (obj.idle){
                toggleIdleState(this);
            }

            //set a new timeout
            obj.tId = setTimeout(toggleIdleState, obj.timeout);

        }
     };

    /**
* Starts the idle timer. This adds appropriate event handlers
* and starts the first timeout.
* @param {int} newTimeout (Optional) A new value for the timeout period in ms.
* @return {void}
* @method $.idleTimer
* @static
*/

    var obj = $.data(elem,'idleTimerObj') || {};

    obj.olddate = obj.olddate || +new Date();

    //assign a new timeout if necessary
    if (typeof newTimeout === "number"){
        timeout = newTimeout;
    } else if (newTimeout === 'destroy') {
        stop(elem);
        return this;
    } else if (newTimeout === 'getElapsedTime'){
        return (+new Date()) - obj.olddate;
    }

    //assign appropriate event handlers
    $(elem).bind($.trim((events+' ').split(' ').join('.idleTimer ')),handleUserEvent);

    obj.idle = idle;
    obj.enabled = enabled;
    obj.timeout = timeout;

    //set a timeout to toggle state
    obj.tId = setTimeout(toggleIdleState, obj.timeout);

    // assume the user is active for the first x seconds.
    $.data(elem,'idleTimer',"active");

    // store our instance on the object
    $.data(elem,'idleTimerObj',obj);

}; // end of $.idleTimer()

// v0.9 API for defining multiple timers.
$.fn.idleTimer = function(newTimeout){
    if(this[0]){
        $.idleTimer(newTimeout,this[0]);
    }

    return this;
};

})(jQuery);
//#endregion

//#region jquery filedownload
// https://github.com/johnculviner/jquery.fileDownload - v1.4.2
(function(e,t){var n=/[<>&\r\n"']/gm;var r={"<":"lt;",">":"gt;","&":"amp;","\r":"#13;","\n":"#10;",'"':"quot;","'":"apos;"};e.extend({fileDownload:function(i,s){function E(){if(document.cookie.indexOf(o.cookieName+"="+o.cookieValue)!=-1){d.onSuccess(i);document.cookie=o.cookieName+"=; expires="+(new Date(1e3)).toUTCString()+"; path="+o.cookiePath;x(false);return}if(m||v){try{var t=m?m.document:S(v);if(t&&t.body!=null&&t.body.innerHTML.length){var n=true;if(y&&y.length){var r=e(t.body).contents().first();if(r.length&&r[0]===y[0]){n=false}}if(n){d.onFail(t.body.innerHTML,i);x(true);return}}}catch(s){d.onFail("",i);x(true);return}}setTimeout(E,o.checkInterval)}function S(e){var t=e[0].contentWindow||e[0].contentDocument;if(t.document){t=t.document}return t}function x(e){setTimeout(function(){if(m){if(l){m.close()}if(f){if(m.focus){m.focus();if(e){m.close()}}}}},0)}function T(e){return e.replace(n,function(e){return"&"+r[e]})}var o=e.extend({preparingMessageHtml:null,failMessageHtml:null,androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",dialogOptions:{modal:true},prepareCallback:function(e){},successCallback:function(e){},failCallback:function(e,t){},httpMethod:"GET",data:null,checkInterval:100,cookieName:"fileDownload",cookieValue:"true",cookiePath:"/",popupWindowTitle:"Initiating file download...",encodeHTMLEntities:true},s);var u=new e.Deferred;var a=(navigator.userAgent||navigator.vendor||t.opera).toLowerCase();var f;var l;var c;if(/ip(ad|hone|od)/.test(a)){f=true}else if(a.indexOf("android")!==-1){l=true}else{c=/avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))}var h=o.httpMethod.toUpperCase();if(l&&h!=="GET"){if(e().dialog){e("<div>").html(o.androidPostUnsupportedMessageHtml).dialog(o.dialogOptions)}else{alert(o.androidPostUnsupportedMessageHtml)}return u.reject()}var p=null;var d={onPrepare:function(t){if(o.preparingMessageHtml){p=e("<div>").html(o.preparingMessageHtml).dialog(o.dialogOptions)}else if(o.prepareCallback){o.prepareCallback(t)}},onSuccess:function(e){if(p){p.dialog("close")}o.successCallback(e);u.resolve(e)},onFail:function(t,n){if(p){p.dialog("close")}if(o.failMessageHtml){e("<div>").html(o.failMessageHtml).dialog(o.dialogOptions)}o.failCallback(t,n);u.reject(t,n)}};d.onPrepare(i);if(o.data!==null&&typeof o.data!=="string"){o.data=e.param(o.data)}var v,m,g,y;if(h==="GET"){if(o.data!==null){var b=i.indexOf("?");if(b!==-1){if(i.substring(i.length-1)!=="&"){i=i+"&"}}else{i=i+"?"}i=i+o.data}if(f||l){m=t.open(i);m.document.title=o.popupWindowTitle;t.focus()}else if(c){t.location(i)}else{v=e("<iframe>").hide().prop("src",i).appendTo("body")}}else{var w="";if(o.data!==null){e.each(o.data.replace(/\+/g," ").split("&"),function(){var e=this.split("=");var t=o.encodeHTMLEntities?T(decodeURIComponent(e[0])):decodeURIComponent(e[0]);if(t){var n=o.encodeHTMLEntities?T(decodeURIComponent(e[1])):decodeURIComponent(e[1]);w+='<input type="hidden" name="'+t+'" value="'+n+'" />'}})}if(c){y=e("<form>").appendTo("body");y.hide().prop("method",o.httpMethod).prop("action",i).html(w)}else{if(f){m=t.open("about:blank");m.document.title=o.popupWindowTitle;g=m.document;t.focus()}else{v=e("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body");g=S(v)}g.write("<html><head></head><body><form method='"+o.httpMethod+"' action='"+i+"'>"+w+"</form>"+o.popupWindowTitle+"</body></html>");y=e(g).find("form")}y.submit()}setTimeout(E,o.checkInterval);return u.promise()}})})(jQuery,this)
//#endregion