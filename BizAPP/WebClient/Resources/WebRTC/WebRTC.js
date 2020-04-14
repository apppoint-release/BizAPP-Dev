//***** WebRTC Version 2 *************************************************************************************************************************
(function () {
    function g(a) { throw a; } var j = void 0, k = !0, l = null, o = !1; function aa(a) { return function () { return this[a] } } function p(a) { return function () { return a } } var r, ba = this; function ca(a, b) { var c = a.split("."), d = ba; !(c[0] in d) && d.execScript && d.execScript("var " + c[0]); for (var e; c.length && (e = c.shift()) ;) !c.length && s(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {} } function da() { }
function ea(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function s(a){return a!==j}function fa(a){var b=ea(a);return"array"==b||"object"==b&&"number"==typeof a.length}function t(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){var b=typeof a;return"object"==b&&a!=l||"function"==b}Math.floor(2147483648*Math.random()).toString(36);function ia(a,b,c){return a.call.apply(a.bind,arguments)}
function ja(a,b,c){a||g(Error());if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function u(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return u.apply(l,arguments)}function ka(a,b){function c(){}c.prototype=b.prototype;a.Jd=b.prototype;a.prototype=new c};function la(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}g(Error("Invalid JSON string: "+a))}function ma(){this.Xb=j}
function na(a,b,c){switch(typeof b){case "string":oa(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==l){c.push("null");break}if("array"==ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],na(a,a.Xb?a.Xb.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),
oa(f,c),c.push(":"),na(a,a.Xb?a.Xb.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:g(Error("Unknown type: "+typeof b))}}var pa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},qa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function oa(a,b){b.push('"',a.replace(qa,function(a){if(a in pa)return pa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return pa[a]=e+b.toString(16)}),'"')};function y(a){if("undefined"!==typeof JSON&&s(JSON.stringify))a=JSON.stringify(a);else{var b=[];na(new ma,a,b);a=b.join("")}return a};function ra(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,z(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};function A(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);e&&g(Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+"."))}function B(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:sa.assert(o,"errorPrefix_ called with argumentNumber > 4.  Need to update it?")}return a+" failed: "+(d+" argument ")}
function C(a,b,c,d){(!d||s(c))&&"function"!=ea(c)&&g(Error(B(a,b,d)+"must be a valid function."))}function ta(a,b,c){s(c)&&(!ha(c)||c===l)&&g(Error(B(a,b,k)+"must be a valid context object."))};function D(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function ua(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]};var va={},sa={},wa=/[\[\].#$\/]/,xa=/[\[\].#$]/;function ya(a){return t(a)&&0!==a.length&&!wa.test(a)}function za(a,b,c){(!c||s(b))&&Aa(B(a,1,c),b)}
function Aa(a,b,c,d){c||(c=0);d||(d=[]);s(b)||g(Error(a+"contains undefined"+Ba(d)));"function"==ea(b)&&g(Error(a+"contains a function"+Ba(d)));Ca(b)&&g(Error(a+"contains "+b.toString()+Ba(d)));1E3<c&&g(new TypeError(a+"contains a cyclic object value ("+d.slice(0,100).join(".")+"...)"));t(b)&&(b.length>10485760/3&&10485760<va.Kd.Id(b).length)&&g(Error(a+"contains a string greater than 10485760 utf8 bytes"+Ba(d)+" ('"+b.substring(0,50)+"...')"));if(ha(b))for(var e in b)D(b,e)&&(".priority"!==e&&(".value"!==
e&&!ya(e))&&g(Error(a+"contains an invalid key ("+e+")"+Ba(d)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')),d.push(e),Aa(a,b[e],c+1,d),d.pop())}function Ba(a){return 0==a.length?"":" in property "+a.join(".")}function Da(a,b){ha(b)||g(Error(B(a,1,o)+" must be an object containing the children to replace."));za(a,b,o)}function Ea(a,b,c,d){(!d||s(c))&&(c!==l&&!ga(c)&&!t(c))&&g(Error(B(a,b,d)+"must be a valid firebase priority (null or a string.)"))}
function Fa(a,b,c){if(!c||s(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:g(Error(B(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".'))}}function Ga(a,b){s(b)&&!ya(b)&&g(Error(B(a,2,k)+'must be a valid firebase key (non-empty string, not containing ".", "#", "$", "/", "[", or "]").'))}
function Ha(a,b){(!t(b)||0===b.length||xa.test(b))&&g(Error(B(a,1,o)+'must be a non-empty string and can\'t contain ".", "#", "$", "[", or "]".'))}function E(a,b){".info"===F(b)&&g(Error(a+" failed: Can't modify data under /.info/"))};function G(a,b,c,d,e,f,h){this.o=a;this.path=b;this.ta=c;this.Z=d;this.la=e;this.ra=f;this.Pa=h;s(this.Z)&&(s(this.ra)&&s(this.ta))&&g("Query: Can't combine startAt(), endAt(), and limit().")}G.prototype.oc=function(a,b){A("Query.on",2,4,arguments.length);Fa("Query.on",a,o);C("Query.on",2,b,o);var c=Ia("Query.on",arguments[2],arguments[3]);this.o.Bb(this,a,b,c.cancel,c.W);return b};G.prototype.on=G.prototype.oc;
G.prototype.Ib=function(a,b,c){A("Query.off",0,3,arguments.length);Fa("Query.off",a,k);C("Query.off",2,b,k);ta("Query.off",3,c);this.o.Wb(this,a,b,c)};G.prototype.off=G.prototype.Ib;G.prototype.vd=function(a,b){function c(h){f&&(f=o,e.Ib(a,c),b.call(d.W,h))}A("Query.once",2,4,arguments.length);Fa("Query.once",a,o);C("Query.once",2,b,o);var d=Ia("Query.once",arguments[2],arguments[3]),e=this,f=k;this.oc(a,c,function(){e.Ib(a,c);d.cancel&&d.cancel.call(d.W)})};G.prototype.once=G.prototype.vd;
G.prototype.rd=function(a){A("Query.limit",1,1,arguments.length);(!ga(a)||Math.floor(a)!==a||0>=a)&&g("Query.limit: First argument must be a positive integer.");return new G(this.o,this.path,a,this.Z,this.la,this.ra,this.Pa)};G.prototype.limit=G.prototype.rd;G.prototype.Ed=function(a,b){A("Query.startAt",0,2,arguments.length);Ea("Query.startAt",1,a,k);Ga("Query.startAt",b);s(a)||(b=a=l);return new G(this.o,this.path,this.ta,a,b,this.ra,this.Pa)};G.prototype.startAt=G.prototype.Ed;
G.prototype.ld=function(a,b){A("Query.endAt",0,2,arguments.length);Ea("Query.endAt",1,a,k);Ga("Query.endAt",b);return new G(this.o,this.path,this.ta,this.Z,this.la,a,b)};G.prototype.endAt=G.prototype.ld;function Ja(a){var b={};s(a.Z)&&(b.sp=a.Z);s(a.la)&&(b.sn=a.la);s(a.ra)&&(b.ep=a.ra);s(a.Pa)&&(b.en=a.Pa);s(a.ta)&&(b.l=a.ta);s(a.Z)&&(s(a.la)&&a.Z===l&&a.la===l)&&(b.vf="l");return b}G.prototype.Ia=function(){var a=Ka(Ja(this));return"{}"===a?"default":a};
function Ia(a,b,c){var d={};b&&c?(d.cancel=b,C(a,3,d.cancel,k),d.W=c,ta(a,4,d.W)):b&&("object"===typeof b&&b!==l?d.W=b:"function"===typeof b?d.cancel=b:g(Error(B(a,3,k)+"must either be a cancel callback or a context object.")));return d};function I(a){if(a instanceof I)return a;if(1==arguments.length){this.m=a.split("/");for(var b=0,c=0;c<this.m.length;c++)0<this.m[c].length&&(this.m[b]=this.m[c],b++);this.m.length=b;this.X=0}else this.m=arguments[0],this.X=arguments[1]}function F(a){return a.X>=a.m.length?l:a.m[a.X]}function La(a){var b=a.X;b<a.m.length&&b++;return new I(a.m,b)}function Ma(a){return a.X<a.m.length?a.m[a.m.length-1]:l}r=I.prototype;
r.toString=function(){for(var a="",b=this.X;b<this.m.length;b++)""!==this.m[b]&&(a+="/"+this.m[b]);return a||"/"};r.parent=function(){if(this.X>=this.m.length)return l;for(var a=[],b=this.X;b<this.m.length-1;b++)a.push(this.m[b]);return new I(a,0)};r.C=function(a){for(var b=[],c=this.X;c<this.m.length;c++)b.push(this.m[c]);if(a instanceof I)for(c=a.X;c<a.m.length;c++)b.push(a.m[c]);else{a=a.split("/");for(c=0;c<a.length;c++)0<a[c].length&&b.push(a[c])}return new I(b,0)};
r.f=function(){return this.X>=this.m.length};function Na(a,b){var c=F(a);if(c===l)return b;if(c===F(b))return Na(La(a),La(b));g("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")")}r.contains=function(a){var b=0;if(this.m.length>a.m.length)return o;for(;b<this.m.length;){if(this.m[b]!==a.m[b])return o;++b}return k};function Oa(){this.children={};this.hc=0;this.value=l}function Ra(a,b,c){this.ua=a?a:"";this.ob=b?b:l;this.u=c?c:new Oa}function J(a,b){for(var c=b instanceof I?b:new I(b),d=a,e;(e=F(c))!==l;)d=new Ra(e,d,ua(d.u.children,e)||new Oa),c=La(c);return d}r=Ra.prototype;r.j=function(){return this.u.value};function M(a,b){z("undefined"!==typeof b);a.u.value=b;Sa(a)}r.Eb=function(){return 0<this.u.hc};r.f=function(){return this.j()===l&&!this.Eb()};
r.B=function(a){for(var b in this.u.children)a(new Ra(b,this,this.u.children[b]))};function Ta(a,b,c,d){c&&!d&&b(a);a.B(function(a){Ta(a,b,k,d)});c&&d&&b(a)}function Ua(a,b,c){for(a=c?a:a.parent();a!==l;){if(b(a))return k;a=a.parent()}return o}r.path=function(){return new I(this.ob===l?this.ua:this.ob.path()+"/"+this.ua)};r.name=aa("ua");r.parent=aa("ob");
function Sa(a){if(a.ob!==l){var b=a.ob,c=a.ua,d=a.f(),e=D(b.u.children,c);d&&e?(delete b.u.children[c],b.u.hc--,Sa(b)):!d&&!e&&(b.u.children[c]=a.u,b.u.hc++,Sa(b))}};function Va(a,b){this.Ma=a?a:Wa;this.Y=b?b:Xa}function Wa(a,b){return a<b?-1:a>b?1:0}r=Va.prototype;r.ia=function(a,b){return new Va(this.Ma,this.Y.ia(a,b,this.Ma).copy(l,l,o,l,l))};r.remove=function(a){return new Va(this.Ma,this.Y.remove(a,this.Ma).copy(l,l,o,l,l))};r.get=function(a){for(var b,c=this.Y;!c.f();){b=this.Ma(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return l};
function Ya(a,b){for(var c,d=a.Y,e=l;!d.f();){c=a.Ma(b,d.key);if(0===c){if(d.left.f())return e?e.key:l;for(d=d.left;!d.right.f();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}g(Error("Attempted to find predecessor key for a nonexistent key.  What gives?"))}r.f=function(){return this.Y.f()};r.count=function(){return this.Y.count()};r.ib=function(){return this.Y.ib()};r.Sa=function(){return this.Y.Sa()};r.sa=function(a){return this.Y.sa(a)};r.Ja=function(a){return this.Y.Ja(a)};
r.Qa=function(a){return new Za(this.Y,a)};function Za(a,b){this.Wc=b;for(this.Gb=[];!a.f();)this.Gb.push(a),a=a.left}function $a(a){if(0===a.Gb.length)return l;var b=a.Gb.pop(),c;c=a.Wc?a.Wc(b.key,b.value):{key:b.key,value:b.value};for(b=b.right;!b.f();)a.Gb.push(b),b=b.left;return c}function ab(a,b,c,d,e){this.key=a;this.value=b;this.color=c!=l?c:k;this.left=d!=l?d:Xa;this.right=e!=l?e:Xa}r=ab.prototype;
r.copy=function(a,b,c,d,e){return new ab(a!=l?a:this.key,b!=l?b:this.value,c!=l?c:this.color,d!=l?d:this.left,e!=l?e:this.right)};r.count=function(){return this.left.count()+1+this.right.count()};r.f=p(o);r.sa=function(a){return this.left.sa(a)||a(this.key,this.value)||this.right.sa(a)};r.Ja=function(a){return this.right.Ja(a)||a(this.key,this.value)||this.left.Ja(a)};function bb(a){return a.left.f()?a:bb(a.left)}r.ib=function(){return bb(this).key};
r.Sa=function(){return this.right.f()?this.key:this.right.Sa()};r.ia=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.copy(l,l,l,e.left.ia(a,b,c),l):0===d?e.copy(l,b,l,l,l):e.copy(l,l,l,l,e.right.ia(a,b,c));return cb(e)};function db(a){if(a.left.f())return Xa;!a.left.H()&&!a.left.left.H()&&(a=eb(a));a=a.copy(l,l,l,db(a.left),l);return cb(a)}
r.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))!c.left.f()&&(!c.left.H()&&!c.left.left.H())&&(c=eb(c)),c=c.copy(l,l,l,c.left.remove(a,b),l);else{c.left.H()&&(c=gb(c));!c.right.f()&&(!c.right.H()&&!c.right.left.H())&&(c=hb(c),c.left.left.H()&&(c=gb(c),c=hb(c)));if(0===b(a,c.key)){if(c.right.f())return Xa;d=bb(c.right);c=c.copy(d.key,d.value,l,l,db(c.right))}c=c.copy(l,l,l,l,c.right.remove(a,b))}return cb(c)};r.H=aa("color");
function cb(a){a.right.H()&&!a.left.H()&&(a=ib(a));a.left.H()&&a.left.left.H()&&(a=gb(a));a.left.H()&&a.right.H()&&(a=hb(a));return a}function eb(a){a=hb(a);a.right.left.H()&&(a=a.copy(l,l,l,l,gb(a.right)),a=ib(a),a=hb(a));return a}function ib(a){var b;b=a.copy(l,l,k,l,a.right.left);return a.right.copy(l,l,a.color,b,l)}function gb(a){var b;b=a.copy(l,l,k,a.left.right,l);return a.left.copy(l,l,a.color,l,b)}
function hb(a){var b,c;b=a.left.copy(l,l,!a.left.color,l,l);c=a.right.copy(l,l,!a.right.color,l,l);return a.copy(l,l,!a.color,b,c)}function jb(){}r=jb.prototype;r.copy=function(){return this};r.ia=function(a,b){return new ab(a,b,j,j,j)};r.remove=function(){return this};r.get=p(l);r.count=p(0);r.f=p(k);r.sa=p(o);r.Ja=p(o);r.ib=p(l);r.Sa=p(l);r.H=p(o);var Xa=new jb;var kb=Array.prototype,lb=kb.forEach?function(a,b,c){kb.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=t(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},mb=kb.map?function(a,b,c){return kb.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=t(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e};function nb(){};function ob(){this.z=[];this.gc=[];this.hd=[];this.Ob=[];this.Ob[0]=128;for(var a=1;64>a;++a)this.Ob[a]=0;this.reset()}ka(ob,nb);ob.prototype.reset=function(){this.z[0]=1732584193;this.z[1]=4023233417;this.z[2]=2562383102;this.z[3]=271733878;this.z[4]=3285377520;this.Ac=this.eb=0};
function pb(a,b){var c;c||(c=0);for(var d=a.hd,e=c;e<c+64;e+=4)d[e/4]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3];for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}c=a.z[0];for(var h=a.z[1],i=a.z[2],m=a.z[3],n=a.z[4],q,e=0;80>e;e++)40>e?20>e?(f=m^h&(i^m),q=1518500249):(f=h^i^m,q=1859775393):60>e?(f=h&i|m&(h|i),q=2400959708):(f=h^i^m,q=3395469782),f=(c<<5|c>>>27)+f+n+q+d[e]&4294967295,n=m,m=i,i=(h<<30|h>>>2)&4294967295,h=c,c=f;a.z[0]=a.z[0]+c&4294967295;a.z[1]=a.z[1]+h&
4294967295;a.z[2]=a.z[2]+i&4294967295;a.z[3]=a.z[3]+m&4294967295;a.z[4]=a.z[4]+n&4294967295}ob.prototype.update=function(a,b){s(b)||(b=a.length);var c=this.gc,d=this.eb,e=0;if(t(a))for(;e<b;)c[d++]=a.charCodeAt(e++),64==d&&(pb(this,c),d=0);else for(;e<b;)c[d++]=a[e++],64==d&&(pb(this,c),d=0);this.eb=d;this.Ac+=b};function qb(){this.La={};this.length=0}qb.prototype.setItem=function(a,b){D(this.La,a)||(this.length+=1);this.La[a]=b};qb.prototype.getItem=function(a){return D(this.La,a)?this.La[a]:l};qb.prototype.removeItem=function(a){D(this.La,a)&&(this.length-=1,delete this.La[a])};var N=l;if("undefined"!==typeof sessionStorage)try{sessionStorage.setItem("firebase-sentinel","cache"),sessionStorage.removeItem("firebase-sentinel"),N=sessionStorage}catch(rb){N=new qb}else N=new qb;function sb(a,b,c,d){this.host=a;this.Yb=b;this.jb=c;this.aa=d||N.getItem(a)||this.host}function tb(a,b){b!==a.aa&&(a.aa=b,"s-"===a.aa.substr(0,2)&&N.setItem(a.host,a.aa))}sb.prototype.toString=function(){return(this.Yb?"https://":"http://")+this.host};var ub,vb,wb,xb;function yb(){return ba.navigator?ba.navigator.userAgent:l}xb=wb=vb=ub=o;var zb;if(zb=yb()){var Ab=ba.navigator;ub=0==zb.indexOf("Opera");vb=!ub&&-1!=zb.indexOf("MSIE");wb=!ub&&-1!=zb.indexOf("WebKit");xb=!ub&&!wb&&"Gecko"==Ab.product}var Bb=vb,Cb=xb,Db=wb;var Eb;if(ub&&ba.opera){var Fb=ba.opera.version;"function"==typeof Fb&&Fb()}else Cb?Eb=/rv\:([^\);]+)(\)|;)/:Bb?Eb=/MSIE\s+([^\);]+)(\)|;)/:Db&&(Eb=/WebKit\/(\S+)/),Eb&&Eb.exec(yb());var Gb=l,Hb=l;
function Ib(a,b){fa(a)||g(Error("encodeByteArray takes an array as a parameter"));if(!Gb){Gb={};Hb={};for(var c=0;65>c;c++)Gb[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c),Hb[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c)}for(var c=b?Hb:Gb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,i=h?a[e+1]:0,m=e+2<a.length,n=m?a[e+2]:0,q=f>>2,f=(f&3)<<4|i>>4,i=(i&15)<<2|n>>6,n=n&63;m||(n=64,h||(i=64));d.push(c[q],c[f],c[i],c[n])}return d.join("")}
;var Jb,Kb=1;Jb=function(){return Kb++};function z(a,b){a||g(Error("Firebase INTERNAL ASSERT FAILED:"+b))}function Lb(a){var b=ra(a),a=new ob;a.update(b);var b=[],c=8*a.Ac;56>a.eb?a.update(a.Ob,56-a.eb):a.update(a.Ob,64-(a.eb-56));for(var d=63;56<=d;d--)a.gc[d]=c&255,c/=256;pb(a,a.gc);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c++]=a.z[d]>>e&255;return Ib(b)}
function Mb(){for(var a="",b=0;b<arguments.length;b++)a=fa(arguments[b])?a+Mb.apply(l,arguments[b]):"object"===typeof arguments[b]?a+y(arguments[b]):a+arguments[b],a+=" ";return a}var Nb=l,Ob=k;function Pb(){Ob===k&&(Ob=o,Nb===l&&"true"===N.getItem("logging_enabled")&&Qb(k));if(Nb){var a=Mb.apply(l,arguments);Nb(a)}}function Sb(a){return function(){Pb(a,arguments)}}
function Tb(){if("undefined"!==typeof console){var a="FIREBASE INTERNAL ERROR: "+Mb.apply(l,arguments);"undefined"!==typeof console.error?console.error(a):console.log(a)}}function Ub(){var a=Mb.apply(l,arguments);g(Error("FIREBASE FATAL ERROR: "+a))}function Vb(){if("undefined"!==typeof console){var a="FIREBASE WARNING: "+Mb.apply(l,arguments);"undefined"!==typeof console.warn?console.warn(a):console.log(a)}}
function Ca(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}function Wb(a,b){return a!==b?a===l?-1:b===l?1:typeof a!==typeof b?"number"===typeof a?-1:1:a>b?1:-1:0}function Xb(a,b){if(b&&a in b)return b[a];g(Error("Missing required key ("+a+") in object: "+y(b)))}var Yb=0;function Ka(a){if("object"!==typeof a||a===l)return y(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=y(b[d]),c+=":",c+=Ka(a[b[d]]);return c+"}"}
function Zb(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}
function $b(a){z(!Ca(a));var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;a-=1)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;a-=1)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&(d="0"+d),c+=d;
return c.toLowerCase()};function ac(a,b){this.oa=a;z(this.oa!==l,"LeafNode shouldn't be created with null value.");this.Ua="undefined"!==typeof b?b:l}r=ac.prototype;r.J=p(k);r.k=aa("Ua");r.ec=function(a){return new ac(this.oa,a)};r.N=function(){return O};r.F=function(a){return F(a)===l?this:O};r.T=p(l);r.D=function(a,b){return(new P(new Va,this.Ua)).D(a,b)};r.Ya=function(a,b){var c=F(a);return c===l?b:this.D(c,O.Ya(La(a),b))};r.f=p(o);r.Hb=p(0);
r.P=function(a){return a&&this.k()!==l?{".value":this.j(),".priority":this.k()}:this.j()};r.hash=function(){var a="";this.k()!==l&&(a+="priority:"+bc(this.k())+":");var b=typeof this.oa,a=a+(b+":"),a="number"===b?a+$b(this.oa):a+this.oa;return Lb(a)};r.j=aa("oa");r.toString=function(){return"string"===typeof this.oa?'"'+this.oa+'"':this.oa};function P(a,b){this.R=a||new Va;this.Ua="undefined"!==typeof b?b:l}r=P.prototype;r.J=p(o);r.k=aa("Ua");r.ec=function(a){return new P(this.R,a)};r.D=function(a,b){var c=this.R.remove(a);b&&b.f()&&(b=l);b!==l&&(c=c.ia(a,b));return b&&b.k()!==l?new cc(c,l,this.Ua):new P(c,this.Ua)};r.Ya=function(a,b){var c=F(a);if(c===l)return b;var d=this.N(c).Ya(La(a),b);return this.D(c,d)};r.f=function(){return this.R.f()};r.Hb=function(){return this.R.count()};var dc=/^\d+$/;r=P.prototype;
r.P=function(a){if(this.f())return l;var b={},c=0,d=0,e=k;this.B(function(f,h){b[f]=h.P(a);c++;e&&dc.test(f)?d=Math.max(d,Number(f)):e=o});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&this.k()!==l&&(b[".priority"]=this.k());return b};r.hash=function(){var a="";this.k()!==l&&(a+="priority:"+bc(this.k())+":");this.B(function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});return""===a?"":Lb(a)};r.N=function(a){a=this.R.get(a);return a===l?O:a};
r.F=function(a){var b=F(a);return b===l?this:this.N(b).F(La(a))};r.T=function(a){return Ya(this.R,a)};r.Kc=function(){return this.R.ib()};r.Lc=function(){return this.R.Sa()};r.B=function(a){return this.R.sa(a)};r.lc=function(a){return this.R.Ja(a)};r.Qa=function(){return this.R.Qa()};r.toString=function(){var a="{",b=k;this.B(function(c,d){b?b=o:a+=", ";a+='"'+c+'" : '+d.toString()});return a+="}"};var O=new P(new Va);function cc(a,b,c){P.call(this,a,c);b===l&&(b=new Va(ec),a.sa(function(a,c){b=b.ia({name:a,wa:c.k()},c)}));this.ka=b}ka(cc,P);r=cc.prototype;r.D=function(a,b){var c=this.N(a),d=this.R,e=this.ka;c!==l&&(d=d.remove(a),e=e.remove({name:a,wa:c.k()}));b&&b.f()&&(b=l);b!==l&&(d=d.ia(a,b),e=e.ia({name:a,wa:b.k()},b));return new cc(d,e,this.k())};r.T=function(a,b){var c=Ya(this.ka,{name:a,wa:b.k()});return c?c.name:l};r.B=function(a){return this.ka.sa(function(b,c){return a(b.name,c)})};
r.lc=function(a){return this.ka.Ja(function(b,c){return a(b.name,c)})};r.Qa=function(){return this.ka.Qa(function(a,b){return{key:a.name,value:b}})};r.Kc=function(){return this.ka.f()?l:this.ka.ib().name};r.Lc=function(){return this.ka.f()?l:this.ka.Sa().name};function Q(a,b){if("object"!==typeof a)return new ac(a,b);if(a===l)return O;var c=l;".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);z(c===l||"string"===typeof c||"number"===typeof c);if(".value"in a&&a[".value"]!==l)return new ac(a[".value"],c);var c=new P(new Va,c),d;for(d in a)if(D(a,d)&&"."!==d.substring(0,1)){var e=Q(a[d]);if(e.J()||!e.f())c=c.D(d,e)}return c}function ec(a,b){return Wb(a.wa,b.wa)||(a.name!==b.name?a.name<b.name?-1:1:0)}
function bc(a){return"number"===typeof a?"number:"+$b(a):"string:"+a};function R(a,b){this.u=a;this.Vb=b}R.prototype.P=function(){A("Firebase.DataSnapshot.val",0,0,arguments.length);return this.u.P()};R.prototype.val=R.prototype.P;R.prototype.md=function(){A("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.u.P(k)};R.prototype.exportVal=R.prototype.md;R.prototype.C=function(a){A("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Ha("Firebase.DataSnapshot.child",a);var b=new I(a),c=this.Vb.C(b);return new R(this.u.F(b),c)};
R.prototype.child=R.prototype.C;R.prototype.mc=function(a){A("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Ha("Firebase.DataSnapshot.hasChild",a);var b=new I(a);return!this.u.F(b).f()};R.prototype.hasChild=R.prototype.mc;R.prototype.k=function(){A("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.u.k()};R.prototype.getPriority=R.prototype.k;
R.prototype.forEach=function(a){A("Firebase.DataSnapshot.forEach",1,1,arguments.length);C("Firebase.DataSnapshot.forEach",1,a,o);if(this.u.J())return o;var b=this;return this.u.B(function(c,d){return a(new R(d,b.Vb.C(c)))})};R.prototype.forEach=R.prototype.forEach;R.prototype.Eb=function(){A("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.u.J()?o:!this.u.f()};R.prototype.hasChildren=R.prototype.Eb;
R.prototype.name=function(){A("Firebase.DataSnapshot.name",0,0,arguments.length);return this.Vb.name()};R.prototype.name=R.prototype.name;R.prototype.Hb=function(){A("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.u.Hb()};R.prototype.numChildren=R.prototype.Hb;R.prototype.wd=function(){A("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.Vb};R.prototype.ref=R.prototype.wd;function fc(a){this.sc=a;this.Qb=[];this.Oa=0;this.ic=-1;this.Ga=l};function S(a,b){for(var c in a)b.call(j,a[c],c,a)}function gc(a){var b={},c;for(c in a)b[c]=a[c];return b};function hc(){this.$a={}}function ic(a,b,c){s(c)||(c=1);D(a.$a,b)||(a.$a[b]=0);a.$a[b]+=c}hc.prototype.get=function(){return gc(this.$a)};function jc(a){this.jd=a;this.Fb=l}jc.prototype.get=function(){var a=this.jd.get(),b=gc(a);if(this.Fb)for(var c in this.Fb)b[c]-=this.Fb[c];this.Fb=a;return b};function kc(a,b){this.ad={};this.$b=new jc(a);this.n=b;setTimeout(u(this.Uc,this),10+6E4*Math.random())}kc.prototype.Uc=function(){var a=this.$b.get(),b={},c=o,d;for(d in a)0<a[d]&&D(this.ad,d)&&(b[d]=a[d],c=k);c&&(a=this.n,a.S&&(b={c:b},a.e("reportStats",b),a.ya("s",b)));setTimeout(u(this.Uc,this),6E5*Math.random())};var lc={},mc={};function nc(a){a=a.toString();lc[a]||(lc[a]=new hc);return lc[a]};var oc=l;"undefined"!==typeof MozWebSocket?oc=MozWebSocket:"undefined"!==typeof WebSocket&&(oc=WebSocket);function pc(a,b,c){this.jc=a;this.e=Sb(this.jc);this.frames=this.gb=l;this.zc=0;this.$=nc(b);this.Na=(b.Yb?"wss://":"ws://")+b.aa+"/.ws?v=5";b.host!==b.aa&&(this.Na=this.Na+"&ns="+b.jb);c&&(this.Na=this.Na+"&s="+c)}var qc;
pc.prototype.open=function(a,b){this.da=b;this.Mb=a;this.e("websocket connecting to "+this.Na);this.U=new oc(this.Na);this.ab=o;var c=this;this.U.onopen=function(){c.e("Websocket connected.");c.ab=k};this.U.onclose=function(){c.e("Websocket connection was disconnected.");c.U=l;c.Ha()};this.U.onmessage=function(a){if(c.U!==l)if(a=a.data,ic(c.$,"bytes_received",a.length),rc(c),c.frames!==l)sc(c,a);else{a:{z(c.frames===l,"We already have a frame buffer");if(4>=a.length){var b=Number(a);if(!isNaN(b)){c.zc=
b;c.frames=[];a=l;break a}}c.zc=1;c.frames=[]}a!==l&&sc(c,a)}};this.U.onerror=function(){c.e("WebSocket error.  Closing connection.");c.Ha()}};pc.prototype.start=function(){};pc.isAvailable=function(){return!("undefined"!==typeof navigator&&"Opera"===navigator.appName)&&oc!==l&&!qc};function sc(a,b){a.frames.push(b);if(a.frames.length==a.zc){var c=a.frames.join("");a.frames=l;c="undefined"!==typeof JSON&&s(JSON.parse)?JSON.parse(c):la(c);a.Mb(c)}}
pc.prototype.send=function(a){rc(this);a=y(a);ic(this.$,"bytes_sent",a.length);a=Zb(a,16384);1<a.length&&this.U.send(String(a.length));for(var b=0;b<a.length;b++)this.U.send(a[b])};pc.prototype.xb=function(){this.Ea=k;this.gb&&(clearTimeout(this.gb),this.gb=l);this.U&&(this.U.close(),this.U=l)};pc.prototype.Ha=function(){this.Ea||(this.e("WebSocket is closing itself"),this.xb(),this.da&&(this.da(this.ab),this.da=l))};pc.prototype.close=function(){this.Ea||(this.e("WebSocket is being closed"),this.xb())};
function rc(a){clearTimeout(a.gb);a.gb=setInterval(function(){a.U.send("0");rc(a)},45E3)};function tc(){this.set={}}r=tc.prototype;r.add=function(a,b){this.set[a]=b!==l?b:k};r.contains=function(a){return D(this.set,a)};r.get=function(a){return this.set[a]};r.remove=function(a){delete this.set[a]};r.f=function(){var a;a:{for(a in this.set){a=o;break a}a=k}return a};r.count=function(){var a=0,b;for(b in this.set)a++;return a};r.keys=function(){var a=[],b;for(b in this.set)D(this.set,b)&&a.push(b);return a};var uc="pLPCommand",vc="pRTLPCB";function wc(a,b,c){this.jc=a;this.e=Sb(a);this.Hd=b;this.$=nc(b);this.Zb=c;this.ab=o;this.Ab=function(a){b.host!==b.aa&&(a.ns=b.jb);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.Yb?"https://":"http://")+b.aa+"/.lp?"+c.join("&")}}var xc,yc;
wc.prototype.open=function(a,b){function c(){if(!d.Ea){d.ea=new zc(function(a,b,c,e,f){ic(d.$,"bytes_received",y(arguments).length);if(d.ea)if(d.Ba&&(clearTimeout(d.Ba),d.Ba=l),d.ab=k,"start"==a)d.id=b,d.Tc=c;else if("close"===a)if(b){d.ea.Zc=o;var h=d.Pc;h.ic=b;h.Ga=function(){d.Ha()};h.ic<h.Oa&&(h.Ga(),h.Ga=l)}else d.Ha();else g(Error("Unrecognized command received: "+a))},function(a,b){ic(d.$,"bytes_received",y(arguments).length);var c=d.Pc;for(c.Qb[a]=b;c.Qb[c.Oa];){var e=c.Qb[c.Oa];delete c.Qb[c.Oa];
for(var f=0;f<e.length;++f)e[f]&&c.sc(e[f]);if(c.Oa===c.ic){c.Ga&&(clearTimeout(c.Ga),c.Ga(),c.Ga=l);break}c.Oa++}},function(){d.Ha()},d.Ab);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());d.ea.cc&&(a.cb=d.ea.cc);a.v="5";d.Zb&&(a.s=d.Zb);a=d.Ab(a);d.e("Connecting via long-poll to "+a);Ac(d.ea,a,function(){})}}this.Ec=0;this.va=b;this.Pc=new fc(a);this.Ea=o;var d=this;this.Ba=setTimeout(function(){d.e("Timed out trying to connect.");d.Ha();d.Ba=l},3E4);if("complete"===document.readyState)c();
else{var e=o,f=function(){document.body?e||(e=k,c()):setTimeout(f,10)};document.addEventListener?(document.addEventListener("DOMContentLoaded",f,o),window.addEventListener("load",f,o)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&f()},o),window.attachEvent("onload",f,o))}};
wc.prototype.start=function(){var a=this.ea,b=this.Tc;a.td=this.id;a.ud=b;for(a.fc=k;Bc(a););a=this.id;b=this.Tc;this.Ta=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;a=this.Ab(c);this.Ta.src=a;this.Ta.style.display="none";document.body.appendChild(this.Ta)};wc.isAvailable=function(){return!yc&&(xc||k)};wc.prototype.xb=function(){this.Ea=k;this.ea&&(this.ea.close(),this.ea=l);this.Ta&&(document.body.removeChild(this.Ta),this.Ta=l);this.Ba&&(clearTimeout(this.Ba),this.Ba=l)};
wc.prototype.Ha=function(){this.Ea||(this.e("Longpoll is closing itself"),this.xb(),this.va&&(this.va(this.ab),this.va=l))};wc.prototype.close=function(){this.Ea||(this.e("Longpoll is being closed."),this.xb())};wc.prototype.send=function(a){a=y(a);ic(this.$,"bytes_sent",a.length);for(var a=ra(a),a=Ib(a,k),a=Zb(a,1840),b=0;b<a.length;b++){var c=this.ea;c.qb.push({Ad:this.Ec,Gd:a.length,Fc:a[b]});c.fc&&Bc(c);this.Ec++}};
function zc(a,b,c,d){this.Ab=d;this.da=c;this.tc=new tc;this.qb=[];this.kc=Math.floor(1E8*Math.random());this.Zc=k;this.cc=Jb();window[uc+this.cc]=a;window[vc+this.cc]=b;a=document.createElement("iframe");a.style.display="none";document.body?document.body.appendChild(a):g("Document body has not initialized. Wait to initialize Firebase until after the document is ready.");a.contentDocument?a.qa=a.contentDocument:a.contentWindow?a.qa=a.contentWindow.document:a.document&&(a.qa=a.document);this.ca=a;
try{this.ca.qa.open(),this.ca.qa.write("<html><body></body></html>"),this.ca.qa.close()}catch(e){Pb("frame writing exception"),e.stack&&Pb(e.stack),Pb(e)}}zc.prototype.close=function(){this.fc=o;if(this.ca){this.ca.qa.body.innerHTML="";var a=this;setTimeout(function(){a.ca!==l&&(document.body.removeChild(a.ca),a.ca=l)},0)}var b=this.da;b&&(this.da=l,b())};
function Bc(a){if(a.fc&&a.Zc&&a.tc.count()<(0<a.qb.length?2:1)){a.kc++;var b={};b.id=a.td;b.pw=a.ud;b.ser=a.kc;for(var b=a.Ab(b),c="",d=0;0<a.qb.length;)if(1870>=a.qb[0].Fc.length+30+c.length){var e=a.qb.shift(),c=c+"&seg"+d+"="+e.Ad+"&ts"+d+"="+e.Gd+"&d"+d+"="+e.Fc;d++}else break;var b=b+c,f=a.kc;a.tc.add(f);var h=function(){a.tc.remove(f);Bc(a)},i=setTimeout(h,25E3);Ac(a,b,function(){clearTimeout(i);h()});return k}return o}
function Ac(a,b,c){setTimeout(function(){try{var d=a.ca.qa.createElement("script");d.type="text/javascript";d.async=k;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;if(!a||"loaded"===a||"complete"===a)d.onload=d.onreadystatechange=l,d.parentNode&&d.parentNode.removeChild(d),c()};d.onerror=function(){Pb("Long-poll script failed to load.");a.close()};a.ca.qa.body.appendChild(d)}catch(e){}},1)};function Cc(){function a(a,c){c&&c.isAvailable()&&b.push(c)}var b=[],c=Dc;if("array"==ea(c))for(var d=0;d<c.length;++d)a(0,c[d]);else S(c,a);this.bc=b}var Dc=[wc,{isAvailable:p(o)},pc];function Ec(a,b,c,d,e,f){this.id=a;this.e=Sb("c:"+this.id+":");this.sc=c;this.mb=d;this.va=e;this.rc=f;this.M=b;this.Pb=[];this.Dc=0;this.Bc=new Cc;this.ma=0;this.e("Connection created");Fc(this)}function Fc(a){var b;var c=a.Bc;0<c.bc.length?b=c.bc[0]:g(Error("No transports available"));a.G=new b("c:"+a.id+":"+a.Dc++,a.M);var d=Gc(a,a.G),e=Hc(a,a.G);a.yb=a.G;a.vb=a.G;a.w=l;setTimeout(function(){a.G&&a.G.open(d,e)},0)}
function Hc(a,b){return function(c){b===a.G?(a.G=l,!c&&0===a.ma?(a.e("Realtime connection failed."),"s-"===a.M.aa.substr(0,2)&&(N.removeItem(a.M.jb),a.M.aa=a.M.host)):1===a.ma&&a.e("Realtime connection lost."),a.close()):b===a.w?(c=a.w,a.w=l,(a.yb===c||a.vb===c)&&a.close()):a.e("closing an old connection")}}
function Gc(a,b){return function(c){if(2!=a.ma)if(b===a.vb){var d=Xb("t",c),c=Xb("d",c);if("c"==d){if(d=Xb("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Zb=c.s;tb(a.M,f);if(0==a.ma&&(a.G.start(),c=a.G,a.e("Realtime connection established."),a.G=c,a.ma=1,a.mb&&(a.mb(d),a.mb=l),"5"!==e&&Vb("Protocol version mismatch detected"),c=1<a.Bc.bc.length?a.Bc.bc[1]:l))a.w=new c("c:"+a.id+":"+a.Dc++,a.M,a.Zb),a.w.open(Gc(a,a.w),Hc(a,a.w))}else if("n"===d){a.e("recvd end transmission on primary");
a.vb=a.w;for(c=0;c<a.Pb.length;++c)a.Kb(a.Pb[c]);a.Pb=[];Ic(a)}else"s"===d?(a.e("Connection shutdown command received. Shutting down..."),a.rc&&(a.rc(c),a.rc=l),a.va=l,a.close()):"r"===d?(a.e("Reset packet received.  New host: "+c),tb(a.M,c),1===a.ma?a.close():(Jc(a),Fc(a))):Tb("Unknown control packet command: "+d)}else"d"==d&&a.Kb(c)}else b===a.w?(d=Xb("t",c),c=Xb("d",c),"c"==d?"t"in c&&(c=c.t,"a"===c?(a.w.start(),a.e("sending client ack on secondary"),a.w.send({t:"c",d:{t:"a",d:{}}}),a.e("Ending transmission on primary"),
a.G.send({t:"c",d:{t:"n",d:{}}}),a.yb=a.w,Ic(a)):"r"===c&&(a.e("Got a reset on secondary, closing it"),a.w.close(),(a.yb===a.w||a.vb===a.w)&&a.close())):"d"==d?a.Pb.push(c):g(Error("Unknown protocol layer: "+d))):a.e("message on old connection")}}Ec.prototype.wc=function(a){a={t:"d",d:a};1!==this.ma&&g("Connection is not connected");this.yb.send(a)};function Ic(a){a.yb===a.w&&a.vb===a.w&&(a.e("cleaning up and promoting a connection: "+a.w.jc),a.G=a.w,a.w=l)}Ec.prototype.Kb=function(a){this.sc(a)};
Ec.prototype.close=function(){2!==this.ma&&(this.e("Closing realtime connection."),this.ma=2,Jc(this),this.va&&(this.va(),this.va=l))};function Jc(a){a.e("Shutting down all connections");a.G&&(a.G.close(),a.G=l);a.w&&(a.w.close(),a.w=l)};function Kc(a,b,c,d){this.id=Lc++;this.e=Sb("p:"+this.id+":");this.wb=k;this.ba={};this.O=[];this.nb=0;this.lb=[];this.S=o;this.Ub=1E3;this.Lb=b||da;this.Jb=c||da;this.kb=d||da;this.M=a;this.vc=l;this.Rb=[];this.xa={};this.zd=0;this.hb=this.Oc=l;setTimeout(u(this.Gc,this),0)}var Lc=0,Mc=0;r=Kc.prototype;
r.ya=function(a,b,c,d){var e=++this.zd,a={r:e,a:a,b:b};this.e(y(a));this.S?this.sb.wc(a):this.Rb.push(a);var f=this,a=setTimeout(function(){var a=f.xa[e];a&&(delete f.xa[e],a.ha&&a.ha.Nb&&a.ha.Nb())},45E3);this.xa[e]={ha:{Mb:c,Nb:d},bd:a}};function Nc(a,b,c,d,e){a.e("Listen on "+b+" for "+c);var f={p:b},d=mb(d,function(a){return Ja(a)});"{}"!==c&&(f.q=d);a.ya("l",f,function(d){a.e("listen response",d);d=d.s;"ok"!==d&&Oc(a,b,c);e&&e(d)},function(){a.e("timed out on listen...")})}
r.Za=function(a,b,c){this.Ca={kd:a,Ic:o,fa:b,Cb:c};this.e("Authenticating using credential: "+this.Ca);Pc(this)};r.zb=function(){delete this.Ca;this.kb(o);this.S&&this.ya("unauth",{},function(){},function(){})};function Pc(a){var b=a.Ca;a.S&&b&&a.ya("auth",{cred:b.kd},function(c){var d=c.s,c=c.d||"error";"ok"!==d&&a.Ca===b&&delete a.Ca;b.Ic?"ok"!==d&&b.Cb&&b.Cb(d,c):(b.Ic=k,b.fa&&b.fa(d,c));a.kb("ok"===d)},function(){a.e("timed out on auth...")})}
r.dd=function(a,b,c){a=a.toString();if(Oc(this,a,b)&&this.S){this.e("Unlisten on "+a+" for "+b);var d=this,a={p:a},c=mb(c,function(a){return Ja(a)});"{}"!==b&&(a.q=c);this.ya("u",a,l,function(){d.e("timed out on unlisten...")})}};function Qc(a,b,c,d){a.S?Rc(a,"o",b,c,d):a.lb.push({uc:b,action:"o",data:c,A:d})}r.qc=function(a,b){this.S?Rc(this,"oc",a,l,b):this.lb.push({uc:a,action:"oc",data:l,A:b})};
function Rc(a,b,c,d,e){c={p:c,d:d};a.e("onDisconnect "+b,c);a.ya(b,c,function(a){e&&setTimeout(function(){e(a.s)},0)},function(){a.e("timed out on onDisconnect...")})}r.put=function(a,b,c,d){Sc(this,"p",a,b,c,d)};function Sc(a,b,c,d,e,f){c={p:c,d:d};s(f)&&(c.h=f);a.O.push({action:b,Vc:c,A:e});a.nb++;b=a.O.length-1;a.S&&Tc(a,b)}
function Tc(a,b){var c=a.O[b].action,d=a.O[b].A;a.ya(c,a.O[b].Vc,function(e){a.e(c+" response",e);delete a.O[b];a.nb--;0===a.nb&&(a.O=[]);d&&d(e.s)},function(){a.e("timed out on put...")})}
r.Kb=function(a){if("r"in a){this.e("from server: "+y(a));var b=a.r,c=this.xa[b];c&&(delete this.xa[b],clearTimeout(c.bd),c.ha&&c.ha.Mb&&c.ha.Mb(a.b))}else"error"in a&&g("A server-side error has occurred: "+a.error),"a"in a&&(b=a.a,a=a.b,this.e("handleServerMessage",b,a),"d"===b?this.Lb(a.p,a.d):"m"===b?this.Lb(a.p,a.d,k):"c"===b?(b=a.p,a=(a=a.q)?mb(a,function(a){return Ka(a)}).join("$"):"{}",(a=Oc(this,b,a))&&a.A&&a.A("permission_denied")):"ac"===b?(b=a.s,a=a.d,c=this.Ca,delete this.Ca,c&&c.Cb&&
c.Cb(b,a),this.kb(o)):"sd"===b?this.vc?this.vc(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Tb("Unrecognized action received from server: "+y(b)+"\nAre you using the latest client?"))};
r.mb=function(a){this.e("connection ready");this.S=k;this.hb=(new Date).getTime();Yb=a-(new Date).getTime();for(a=0;a<this.Rb.length;a++)this.sb.wc(this.Rb[a]);this.Rb=[];Pc(this);for(a=0;a<this.O.length;a++)this.O[a]&&Tc(this,a);for(var b in this.ba)for(var c in this.ba[b])a=this.ba[b][c],Nc(this,b,c,a.Va,a.A);for(;this.lb.length;)b=this.lb.shift(),Rc(this,b.action,b.uc,b.data,b.A);this.Jb(k)};
r.Rc=function(){this.S=o;this.e("data client disconnected");var a=u(function(){this.Gc()},this);if(this.wb){this.hb&&(3E4<(new Date).getTime()-this.hb&&(this.Ub=1E3),this.hb=l);var b=Math.max(0,this.Ub-((new Date).getTime()-this.Oc)),b=Math.random()*b;this.e("Trying to reconnect in "+b+"ms");setTimeout(a,b);this.Ub=Math.min(3E5,1.5*this.Ub)}else{for(var c=0;c<this.O.length;c++){var d=this.O[c];d&&"h"in d.Vc&&(d.A&&d.A("disconnect"),delete this.O[c],this.nb--)}0===this.nb&&(this.O=[]);for(b in this.xa)c=
this.xa[b],delete this.xa[b],c!==l&&(c.ha&&c.ha.Nb&&c.ha.Nb(),clearTimeout(c.bd));this.Xc=function(){setTimeout(a,0)}}this.Jb(o)};r.Gc=function(){if(this.wb){this.e("Making a connection attempt");this.Oc=(new Date).getTime();this.hb=l;var a=u(this.Kb,this),b=u(this.mb,this),c=u(this.Rc,this),d=this.id+":"+Mc++,e=this;this.sb=new Ec(d,this.M,a,b,c,function(a){e.wb=o;g(Error(a))})}};r.Ra=function(){this.wb=o;this.sb?this.sb.close():this.Rc()};r.ub=function(){this.wb=k;this.Xc();this.Xc=j};
function Oc(a,b,c){b=(new I(b)).toString();c||(c="{}");var d=a.ba[b][c];delete a.ba[b][c];return d};function Uc(){this.Ka=O}function T(a,b){return a.Ka.F(b)}function U(a,b,c){a.Ka=a.Ka.Ya(b,c)}Uc.prototype.toString=function(){return this.Ka.toString()};function Vc(){this.za=new Uc;this.K=new Uc;this.Aa=new Uc;this.pb=new Ra}function Wc(a,b){for(var c=T(a.za,b),d=T(a.K,b),e=J(a.pb,b),f=o,h=e;h!==l;){if(h.j()!==l){f=k;break}h=h.parent()}if(f)return o;c=Xc(c,d,e);return c!==d?(U(a.K,b,c),k):o}function Xc(a,b,c){if(c.f())return a;if(c.j()!==l)return b;a=a||O;c.B(function(d){var d=d.name(),e=a.N(d),f=b.N(d),h=J(c,d),e=Xc(e,f,h);a=a.D(d,e)});return a}
Vc.prototype.set=function(a,b){var c=this,d=[];lb(b,function(a){var b=a.path,a=a.Fa,h=Jb();M(J(c.pb,b),h);U(c.K,b,a);d.push({path:b,Bd:h})});return d};function Yc(a,b){lb(b,function(b){var d=b.Bd,b=J(a.pb,b.path),e=b.j();z(e!==l,"pendingPut should not be null.");e===d&&M(b,l)})};function Zc(){this.Da=[]}function $c(a,b){if(0!==b.length){a.Da.push.apply(a.Da,b);for(var c=0;c<a.Da.length;c++)if(a.Da[c]){var d=a.Da[c];a.Da[c]=l;var e=d.fa;e(d.$c,d.rb)}a.Da=[]}};function V(a,b,c,d){this.type=a;this.ja=b;this.V=c;this.rb=d};function ad(a){this.I=a;this.ga=[];this.Hc=new Zc}function bd(a,b,c,d,e){a.ga.push({type:b,fa:c,cancel:d,W:e});var d=[],f=cd(a.g);a.fb&&f.push(new V("value",a.g));for(var h=0;h<f.length;h++)if(f[h].type===b){var i=new W(a.I.o,a.I.path);f[h].V&&(i=i.C(f[h].V));d.push({fa:e?u(c,e):c,$c:new R(f[h].ja,i),rb:f[h].rb})}$c(a.Hc,d)}ad.prototype.Sb=function(a,b){b=this.Tb(a,b);b!=l&&fd(this,b)};
function fd(a,b){for(var c=[],d=0;d<b.length;d++){var e=b[d],f=e.type,h=new W(a.I.o,a.I.path);b[d].V&&(h=h.C(b[d].V));h=new R(b[d].ja,h);"value"===e.type&&!h.Eb()?f+="("+h.P()+")":"value"!==e.type&&(f+=" "+h.name());Pb(a.I.o.n.id+": event:"+a.I.path+":"+a.I.Ia()+":"+f);for(f=0;f<a.ga.length;f++){var i=a.ga[f];b[d].type===i.type&&c.push({fa:i.W?u(i.fa,i.W):i.fa,$c:h,rb:e.rb})}}$c(a.Hc,c)}
function cd(a){var b=[];if(!a.J()){var c=l;a.B(function(a,e){b.push(new V("child_added",e,a,c));c=a})}return b}function gd(a){a.fb||(a.fb=k,fd(a,[new V("value",a.g)]))};function hd(a,b){ad.call(this,a);this.g=b}ka(hd,ad);hd.prototype.Tb=function(a,b){this.g=a;this.fb&&b!=l&&b.push(new V("value",this.g));return b};hd.prototype.bb=function(){return{}};function id(a,b){this.Db=a;this.pc=b}
function jd(a,b,c,d,e){var f=a.F(c),h=b.F(c),d=new id(d,e),e=kd(d,c,f,h),i=o;if(!f.f()&&!h.f()&&f.k()!==h.k())var i=a.F(c.parent()),m=b.F(c.parent()),n=Ma(c),i=i.T(n,f)!=m.T(n,h);if(e||i){f=c;c=e;for(h=i;f.parent()!==l;){var q=a.F(f),e=b.F(f),i=f.parent();if(!d.Db||J(d.Db,i).j())m=b.F(i),n=[],f=Ma(f),q.f()?(q=m.T(f,e),n.push(new V("child_added",e,f,q))):e.f()?n.push(new V("child_removed",q,f)):(q=m.T(f,e),h&&n.push(new V("child_moved",e,f,q)),c&&n.push(new V("child_changed",e,f,q))),d.pc(i,m,n);h&&
(h=o,c=k);f=i}}}function kd(a,b,c,d){var e,f=[];c===d?e=o:c.J()&&d.J()?e=c.j()!==d.j():c.J()?(ld(a,b,O,d,f),e=k):d.J()?(ld(a,b,c,O,f),e=k):e=ld(a,b,c,d,f);e?a.pc(b,d,f):c.k()!==d.k()&&a.pc(b,d,l);return e}
function ld(a,b,c,d,e){var f=o,h=!a.Db||!J(a.Db,b).f(),i=[],m=[],n=[],q=[],x={},v={},w,L,K,H;w=c.Qa();K=$a(w);L=d.Qa();for(H=$a(L);K!==l||H!==l;){c=K===l?1:H===l?-1:K.key===H.key?0:ec({name:K.key,wa:K.value.k()},{name:H.key,wa:H.value.k()});if(0>c)f=ua(x,K.key),s(f)?(n.push({Jc:K,cd:i[f]}),i[f]=l):(v[K.key]=m.length,m.push(K)),f=k,K=$a(w);else{if(0<c)f=ua(v,H.key),s(f)?(n.push({Jc:m[f],cd:H}),m[f]=l):(x[H.key]=i.length,i.push(H)),f=k;else{c=b.C(H.key);if(c=kd(a,c,K.value,H.value))q.push(H),f=k;K=
$a(w)}H=$a(L)}if(!h&&f)return k}for(h=0;h<m.length;h++)if(x=m[h])c=b.C(x.key),kd(a,c,x.value,O),e.push(new V("child_removed",x.value,x.key));for(h=0;h<i.length;h++)if(x=i[h])c=b.C(x.key),m=d.T(x.key,x.value),kd(a,c,O,x.value),e.push(new V("child_added",x.value,x.key,m));for(h=0;h<n.length;h++)x=n[h].Jc,i=n[h].cd,c=b.C(i.key),m=d.T(i.key,i.value),e.push(new V("child_moved",i.value,i.key,m)),(c=kd(a,c,x.value,i.value))&&q.push(i);for(h=0;h<q.length;h++)a=q[h],m=d.T(a.key,a.value),e.push(new V("child_changed",
a.value,a.key,m));return f};function md(){this.L=this.na=l;this.set={}}ka(md,tc);r=md.prototype;r.setActive=function(a){this.na=a};function nd(a){return a.contains("default")}function od(a){return a.na!=l&&nd(a)}r.defaultView=function(){return nd(this)?this.get("default"):l};r.path=aa("L");r.toString=function(){return mb(this.keys(),function(a){return"default"===a?"{}":a}).join("$")};r.Va=function(){var a=[];S(this.set,function(b){a.push(b.I)});return a};function pd(a,b){ad.call(this,a);this.g=O;this.Tb(b,cd(b))}ka(pd,ad);
pd.prototype.Tb=function(a,b){if(b===l)return b;var c=[],d=this.I;s(d.Z)&&(s(d.la)&&d.la!=l?c.push(function(a,b){var c=Wb(b,d.Z);return 0<c||0===c&&a>=d.la}):c.push(function(a,b){return 0<=Wb(b,d.Z)}));s(d.ra)&&(s(d.Pa)?c.push(function(a,b){var c=Wb(b,d.ra);return 0>c||0===c&&a<=d.Pa}):c.push(function(a,b){return 0>=Wb(b,d.ra)}));var e=l,f=l;if(s(this.I.ta))if(s(this.I.Z)){if(e=qd(a,c,this.I.ta,o)){var h=a.N(e).k();c.push(function(a,b){var c=Wb(b,h);return 0>c||0===c&&a<=e})}}else if(f=qd(a,c,this.I.ta,
k)){var i=a.N(f).k();c.push(function(a,b){var c=Wb(b,i);return 0<c||0===c&&a>=f})}for(var m=[],n=[],q=[],x=[],v=0;v<b.length;v++){var w=b[v].V,L=b[v].ja;switch(b[v].type){case "child_added":rd(c,w,L)&&(this.g=this.g.D(w,L),n.push(b[v]));break;case "child_removed":this.g.N(w).f()||(this.g=this.g.D(w,l),m.push(b[v]));break;case "child_changed":!this.g.N(w).f()&&rd(c,w,L)&&(this.g=this.g.D(w,L),x.push(b[v]));break;case "child_moved":var K=!this.g.N(w).f(),H=rd(c,w,L);K?H?(this.g=this.g.D(w,L),q.push(b[v])):
(m.push(new V("child_removed",this.g.N(w),w)),this.g=this.g.D(w,l)):H&&(this.g=this.g.D(w,L),n.push(b[v]))}}var dd=e||f;if(dd){var ed=(v=f!==l)?this.g.Kc():this.g.Lc(),Rb=o,Pa=o,Qa=this;(v?a.lc:a.B).call(a,function(a,b){!Pa&&ed===l&&(Pa=k);if(Pa&&Rb)return k;Rb?(m.push(new V("child_removed",Qa.g.N(a),a)),Qa.g=Qa.g.D(a,l)):Pa&&(n.push(new V("child_added",b,a)),Qa.g=Qa.g.D(a,b));ed===a&&(Pa=k);a===dd&&(Rb=k)})}for(v=0;v<n.length;v++)c=n[v],w=this.g.T(c.V,c.ja),m.push(new V("child_added",c.ja,c.V,w));
for(v=0;v<q.length;v++)c=q[v],w=this.g.T(c.V,c.ja),m.push(new V("child_moved",c.ja,c.V,w));for(v=0;v<x.length;v++)c=x[v],w=this.g.T(c.V,c.ja),m.push(new V("child_changed",c.ja,c.V,w));this.fb&&0<m.length&&m.push(new V("value",this.g));return m};function qd(a,b,c,d){if(a.J())return l;var e=l;(d?a.lc:a.B).call(a,function(a,d){if(rd(b,a,d)&&(e=a,c--,0===c))return k});return e}function rd(a,b,c){for(var d=0;d<a.length;d++)if(!a[d](b,c.k()))return o;return k}
pd.prototype.mc=function(a){return this.g.N(a)!==O};pd.prototype.bb=function(a,b,c){var d={};this.g.J()||this.g.B(function(a){d[a]=k});var e=this.g,c=T(c,new I("")),f=new Ra;M(J(f,this.I.path),k);var h=O.Ya(a,b),i=[];jd(c,h,a,f,function(a,b,c){c!==l&&(i=i.concat(c))});this.Tb(b,i);this.g.J()||this.g.B(function(a){d[a]=k});this.g=e;return d};function sd(a,b){this.n=a;this.i=b;this.Qc=b.Ka;this.pa=new Ra}
sd.prototype.Bb=function(a,b,c,d,e){var f=a.path,h=J(this.pa,f),i=h.j();i===l?(i=new md,M(h,i)):z(!i.f(),"We shouldn't be storing empty QueryMaps");var m=a.Ia();if(i.contains(m))bd(i.get(m),b,c,d,e);else{var n=this.i.Ka.F(f),a="default"===a.Ia()?new hd(a,n):new pd(a,n);if(od(i)||td(h))i.add(m,a),i.L||(i.L=a.I.path);else{var q,x;i.f()||(q=i.toString(),x=i.Va());i.add(m,a);i.L||(i.L=a.I.path);i.setActive(ud(this,i));q&&x&&this.n.dd(i.path(),q,x)}od(i)&&Ta(h,function(a){if(a=a.j()){a.na&&a.na();a.na=
l}});bd(a,b,c,d,e);(b=(b=Ua(J(this.pa,f),function(a){var b;if(b=a.j())if(b=a.j().defaultView())b=a.j().defaultView().fb;if(b)return k},k))||this.n===l)&&gd(a)}};function vd(a,b,c,d,e){for(var f=a.get(b),h=o,i=f.ga.length-1;0<=i;i--){var m=f.ga[i];if((!c||m.type===c)&&(!d||m.fa===d)&&(!e||m.W===e))if(f.ga.splice(i,1),h=k,c&&d)break}(c=h&&!(0<f.ga.length))&&a.remove(b);return c}sd.prototype.Wb=function(a,b,c,d){var e=J(this.pa,a.path).j();return e===l?l:wd(this,e,a,b,c,d)};
function wd(a,b,c,d,e,f){var h=b.path(),h=J(a.pa,h),c=c?c.Ia():l,i=[];c&&"default"!==c?vd(b,c,d,e,f)&&i.push(c):lb(b.keys(),function(a){vd(b,a,d,e,f)&&i.push(a)});b.f()&&M(h,l);c=td(h);if(0<i.length&&!c){for(var m=h,n=h.parent(),c=o;!c&&n;){var q=n.j();if(q){z(!od(q));var x=m.name(),v=o;S(q.set,function(a){v=a.mc(x)||v});v&&(c=k)}m=n;n=n.parent()}m=l;if(!od(b)){n=b.na;b.na=l;var w=[],L=function(b){var c=b.j();c&&nd(c)?(w.push(c.path()),c.na==l&&c.setActive(ud(a,c))):(c&&c.na==l&&c.setActive(ud(a,
c)),b.B(L))};L(h);m=w;n&&n()}return c?l:m}return l}function xd(a,b,c){Ta(J(a.pa,b),function(a){(a=a.j())&&S(a.set,function(a){gd(a)})},c,k)}function yd(a,b,c){function d(a){for(var b=0;b<c.length;++b)if(c[b].contains(a))return k;return o}var e=a.Qc,f=a.i.Ka;a.Qc=f;jd(e,f,b,a.pa,function(c,e,f){if(b.contains(c)){var n=d(c);n&&xd(a,c,o);a.Sb(c,e,f);n&&xd(a,c,k)}else a.Sb(c,e,f)});d(b)&&xd(a,b,k)}sd.prototype.Sb=function(a,b,c){a=J(this.pa,a).j();a!==l&&S(a.set,function(a){a.Sb(b,c)})};
function td(a){return Ua(a,function(a){return a.j()&&od(a.j())})}
function ud(a,b){if(a.n){var c=b.keys(),d=a.n,e=function(d){"ok"!==d?(Vb("on() or once() for "+b.path().toString()+" failed: "+d),b&&S(b.set,function(a){for(var b=0;b<a.ga.length;b++){var c=a.ga[b];c.cancel&&(c.W?u(c.cancel,c.W):c.cancel)()}}),wd(a,b)):lb(c,function(a){(a=b.get(a))&&gd(a)})},f=b.toString(),h=b.path().toString();d.ba[h]=d.ba[h]||{};z(!d.ba[h][f],"listen() called twice for same path/queryId.");d.ba[h][f]={Va:b.Va(),A:e};d.S&&Nc(d,h,f,b.Va(),e);return u(a.n.dd,a.n,b.path(),b.toString(),
b.Va())}return da}sd.prototype.bb=function(a,b,c,d){var e={};S(b.set,function(b){b=b.bb(a,c,d);S(b,function(a,b){e[b]=a?k:ua(e,b)||o})});c.J()||c.B(function(a){D(e,a)||(e[a]=o)});return e};
function zd(a,b,c,d,e,f){var h=b.path();if(f!==l){var i=[];d.J()||d.B(function(a,b){i.push({path:h.C(a),Fa:b});delete f[a]});S(f,function(a,b){i.push({path:h.C(b),Fa:O})});return i}var b=a.bb(h,b,d,e),m=O,n=[];S(b,function(b,f){var h=new I(f);b?m=m.D(f,d.F(h)):n=n.concat(Ad(a,d.F(h),J(c,h),e))});return[{path:h,Fa:m}].concat(n)}
function Bd(a,b,c,d,e){for(var f=J(a.pa,b),h=f.parent(),i=o;!i&&h!==l;){var m=h.j();m!==l&&(nd(m)?i=k:(m=a.bb(b,m,c,d),f=f.name(),ua(m,f)&&(i=k)));f=h;h=h.parent()}if(i)return[{path:b,Fa:c}];h=J(a.pa,b);i=h.j();return i!==l?nd(i)?[{path:b,Fa:c}]:zd(a,i,h,c,d,e):Ad(a,c,h,d)}function Ad(a,b,c,d){var e=c.j();if(e!==l)return nd(e)?[{path:c.path(),Fa:b}]:zd(a,e,c,b,d,l);if(b.J())return[];var f=[];b.B(function(b,e){var m=new I(b);f=f.concat(Ad(a,e,J(c,m),d))});return f};function Cd(a){this.M=a;this.$=nc(a);this.n=new Kc(this.M,u(this.Lb,this),u(this.Jb,this),u(this.kb,this));var b=u(function(){return new kc(this.$,this.n)},this),a=a.toString();mc[a]||(mc[a]=b());this.Fd=mc[a];this.ac=new Ra;this.i=new Vc;this.Q=new sd(this.n,this.i.Aa);this.Mc=new Uc;this.nc=new sd(l,this.Mc);Dd(this,"connected",o);Dd(this,"authenticated",o)}r=Cd.prototype;r.toString=function(){return(this.M.Yb?"https://":"http://")+this.M.host};r.name=function(){return this.M.jb};
r.Lb=function(a,b,c){var d=[],e=l;if(9<=a.length&&a.lastIndexOf(".priority")===a.length-9)a=new I(a.substring(0,a.length-9)),c=T(this.i.za,a).ec(b),d.push(a);else if(c){var e=b,a=new I(a),c=T(this.i.za,a),f;for(f in b){var h=Q(b[f]),c=c.D(f,h);d.push(a.C(f))}}else a=new I(a),c=Q(b),d.push(a);b=Bd(this.Q,a,c,this.i.K,e);e=o;for(f=0;f<b.length;++f){var c=b[f],h=this.i,i=c.path;U(h.za,i,c.Fa);e=Wc(h,i)||e}e&&(a=Ed(this,a),Fd(this,a),a=a.path());yd(this.Q,a,d)};r.Jb=function(a){Dd(this,"connected",a)};
r.kb=function(a){Dd(this,"authenticated",a)};function Dd(a,b,c){b=new I("/.info/"+b);U(a.Mc,b,Q(c));yd(a.nc,b,[b])}r.Za=function(a,b,c){this.n.Za(a,function(a,c){X(b,a,c)},function(a,b){Vb("auth() was canceled: "+b);if(c){var f=Error(b);f.code=a.toUpperCase();c(f)}})};r.zb=function(){this.n.zb()};
r.Xa=function(a,b,c,d){this.e("set",{path:a.toString(),value:b});var b=Q(b,c),c=Bd(this.Q,a,b,this.i.K,l),e=this.i.set(a,c),f=this;this.n.put(a.toString(),b.P(k),function(b){var c="ok"===b;Yc(f.i,e);c||(Vb("set at "+a+" failed: "+b),Wc(f.i,a),c=Ed(f,a),Fd(f,c),yd(f.Q,c.path(),[]));X(d,b)});b=Ed(this,a);Gd(this,a);Fd(this,b);yd(this.Q,b.path(),[a])};
r.update=function(a,b,c){this.e("update",{path:a.toString(),value:b});var d=T(this.i.Aa,a),e=k,f=[],h;for(h in b){var e=o,i=Q(b[h]),d=d.D(h,i);f.push(a.C(h))}if(e)Pb("update() called with empty data.  Don't do anything."),X(c,"ok");else{var d=Bd(this.Q,a,d,this.i.K,b),m=this.i.set(a,d),n=this;Sc(this.n,"m",a.toString(),b,function(b){z("ok"===b||"permission_denied"===b,"merge at "+a+" failed.");Yc(n.i,m);X(c,b)},j);b=Ed(this,a);Gd(this,a);Fd(this,b);yd(this.Q,b.path(),f)}};
r.xc=function(a,b,c){this.e("setPriority",{path:a.toString(),wa:b});var d=T(this.i.K,a).ec(b),d=Bd(this.Q,a,d,this.i.K,l),e=this.i.set(a,d),f=this;this.n.put(a.toString()+"/.priority",b,function(a){Yc(f.i,e);X(c,a)});a=Ed(this,a);Fd(this,a);yd(this.Q,a.path(),[])};r.qc=function(a,b){this.n.qc(a.toString(),function(a){X(b,a)})};function Hd(a,b,c,d){c=Q(c);Qc(a.n,b.toString(),c.P(k),function(a){X(d,a)})}function Id(a){ic(a.$,"deprecated_on_disconnect");a.Fd.ad.deprecated_on_disconnect=k}
r.Bb=function(a,b,c,d,e){".info"===F(a.path)?this.nc.Bb(a,b,c,d,e):this.Q.Bb(a,b,c,d,e)};r.Wb=function(a,b,c,d){if(".info"===F(a.path))this.nc.Wb(a,b,c,d);else if(b=this.Q.Wb(a,b,c,d),b!==l){for(var c=this.i,a=a.path,d=[],e=0;e<b.length;++e)d[e]=T(c.za,b[e]);U(c.za,a,O);for(e=0;e<b.length;++e)U(c.za,b[e],d[e])}};r.Ra=function(){this.n.Ra()};r.ub=function(){this.n.ub()};
r.yc=function(a){if("undefined"!==typeof console){a?(this.$b||(this.$b=new jc(this.$)),a=this.$b.get()):a=this.$.get();var b=a,c=[],d=0,e;for(e in b)c[d++]=e;var f=function(a,b){return Math.max(b.length,a)};if(c.reduce)e=c.reduce(f,0);else{var h=0;lb(c,function(a){h=f.call(j,h,a)});e=h}for(var i in a){b=a[i];for(c=i.length;c<e+2;c++)i+=" ";console.log(i+b)}}};r.e=function(){Pb("r:"+this.n.id+":",arguments)};function Jd(a,b){var c=new W(a,b);return new R(T(a.i.Aa,b),c)}
function X(a,b,c){if(a)if("ok"==b)a(l,c);else{var d=b=(b||"error").toUpperCase();c&&(d+=": "+c);c=Error(d);c.code=b;a(c)}};function Gd(a,b){var c=J(a.ac,b);Ua(c,function(b){Kd(a,b)});Kd(a,c);Ta(c,function(b){Kd(a,b)})}function Kd(a,b){var c=b.j();if(c!==l){for(var d=-1,e=[],f=0;f<c.length;f++)if(2===c[f].status)z(d===f-1,"All SENT items should be at beginning of queue."),d=f,c[f].status=4,c[f].Cc="set";else if(c[f].dc(),c[f].A){var h=Jd(a,b.path());e.push(u(c[f].A,l,Error("set"),o,h))}-1===d?M(b,l):c.length=d+1;for(f=0;f<e.length;f++)e[f]()}}
function Ld(a,b){var c=b||a.ac;b||Md(a,c);if(!c.f())if(c.j()!==l){var d=Nd(a,c);if(0!==d.length){var e=c.path();if(2!==d[0].status&&4!==d[0].status){for(var f=0;f<d.length;f++)z(1===d[f].status,"tryToSendTransactionForNode_: items in queue should all be run."),d[f].status=2,d[f].Yc++;var h=T(a.i.K,e).hash();U(a.i.K,e,T(a.i.Aa,e));var i=T(a.i.K,e).P(k),m=Jb();M(J(a.i.pb,e),m);a.n.put(e.toString(),i,function(b){a.e("transaction put response",{path:e.toString(),status:b});var h=J(a.i.pb,e),i=h.j();z(i!==
l,"tryToSendTransactionsForNode_: pendingPut should not be null.");i===m&&(M(h,l),U(a.i.K,e,T(a.i.za,e)));if("ok"===b){b=[];for(f=0;f<d.length;f++)d[f].status=3,d[f].A&&(h=Jd(a,d[f].path),b.push(u(d[f].A,l,l,k,h))),d[f].dc();Md(a,c);Ld(a);for(f=0;f<b.length;f++)b[f]()}else{if("datastale"===b)for(f=0;f<d.length;f++)d[f].status=4===d[f].status?5:1;else{Vb("transaction at "+e+" failed: "+b);for(f=0;f<d.length;f++)d[f].status=5,d[f].Cc=b}b=Ed(a,e);Fd(a,b);yd(a.Q,b.path(),[e])}},h)}}}else c.B(function(b){Ld(a,
b)})}
function Fd(a,b){var c=b.path();U(a.i.Aa,c,T(a.i.K,c));var d=Nd(a,b);if(0!==d.length){for(var e=T(a.i.Aa,c),f=[],h=0;h<d.length;h++){var i=Na(c,d[h].path),m=o,n;z(i!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===d[h].status)m=k,n=d[h].Cc;else if(1===d[h].status)if(25<=d[h].Yc)m=k,n="maxretry";else{var q=d[h].update(e.F(i).P());s(q)?(Aa("transaction failed: Data returned ",q),e=e.Ya(i,Q(q))):(m=k,n="nodata")}m&&(d[h].dc(),d[h].status=3,d[h].A&&(m=new W(a,d[h].path),i=new R(e.F(i),
m),"nodata"===n?f.push(u(d[h].A,l,l,o,i)):f.push(u(d[h].A,l,Error(n),o,i))))}d=T(a.i.K,c).k();U(a.i.Aa,c,e.ec(d));Ld(a);for(h=0;h<f.length;h++)f[h]()}}function Ed(a,b){for(var c,d=a.ac;(c=F(b))!==l&&d.j()===l;)d=J(d,c),b=La(b);return d}function Nd(a,b){var c=[];Od(a,b,c);c.sort(function(a,b){return a.Sc-b.Sc});return c}function Od(a,b,c){var d=b.j();if(d!==l)for(var e=0;e<d.length;e++)c.push(d[e]);b.B(function(b){Od(a,b,c)})}
function Md(a,b){var c=b.j();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;M(b,0<c.length?c:l)}b.B(function(b){Md(a,b)})};function Y(){this.Wa={}}Y.pd=function(){return Y.Nc?Y.Nc:Y.Nc=new Y};Y.prototype.Ra=function(){for(var a in this.Wa)this.Wa[a].Ra()};Y.prototype.interrupt=Y.prototype.Ra;Y.prototype.ub=function(){for(var a in this.Wa)this.Wa[a].ub()};Y.prototype.resume=Y.prototype.ub;var Z={qd:function(a){var b=P.prototype.hash;P.prototype.hash=a;return function(){P.prototype.hash=b}}};Z.hijackHash=Z.qd;Z.Ia=function(a){return a.Ia()};Z.queryIdentifier=Z.Ia;Z.sd=function(a){return a.o.n.ba};Z.listens=Z.sd;Z.xd=function(a){return a.o.n.sb};Z.refConnection=Z.xd;Z.fd=Kc;Z.DataConnection=Z.fd;Kc.prototype.sendRequest=Kc.prototype.ya;Kc.prototype.interrupt=Kc.prototype.Ra;Z.gd=Ec;Z.RealTimeConnection=Z.gd;Ec.prototype.sendRequest=Ec.prototype.wc;Ec.prototype.close=Ec.prototype.close;
Z.ed=sb;Z.ConnectionTarget=Z.ed;Z.nd=function(){xc=qc=k};Z.forceLongPolling=Z.nd;Z.od=function(){yc=k};Z.forceWebSockets=Z.od;Z.Dd=function(a,b){a.o.n.vc=b};Z.setSecurityDebugCallback=Z.Dd;Z.yc=function(a,b){a.o.yc(b)};Z.stats=Z.yc;function $(a,b,c){this.tb=a;this.L=b;this.ua=c}ca("fb.api.onDisconnect",$);$.prototype.cancel=function(a){A("Firebase.onDisconnect().cancel",0,1,arguments.length);C("Firebase.onDisconnect().cancel",1,a,k);this.tb.qc(this.L,a)};$.prototype.cancel=$.prototype.cancel;$.prototype.remove=function(a){A("Firebase.onDisconnect().remove",0,1,arguments.length);E("Firebase.onDisconnect().remove",this.L);C("Firebase.onDisconnect().remove",1,a,k);Hd(this.tb,this.L,l,a)};$.prototype.remove=$.prototype.remove;
$.prototype.set=function(a,b){A("Firebase.onDisconnect().set",1,2,arguments.length);E("Firebase.onDisconnect().set",this.L);za("Firebase.onDisconnect().set",a,o);C("Firebase.onDisconnect().set",2,b,k);Hd(this.tb,this.L,a,b)};$.prototype.set=$.prototype.set;
$.prototype.Xa=function(a,b,c){A("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);E("Firebase.onDisconnect().setWithPriority",this.L);za("Firebase.onDisconnect().setWithPriority",a,o);Ea("Firebase.onDisconnect().setWithPriority",2,b,o);C("Firebase.onDisconnect().setWithPriority",3,c,k);(".length"===this.ua||".keys"===this.ua)&&g("Firebase.onDisconnect().setWithPriority failed: "+this.ua+" is a read-only object.");var d=this.tb,e=this.L,f=Q(a,b);Qc(d.n,e.toString(),f.P(k),function(a){X(c,
a)})};$.prototype.setWithPriority=$.prototype.Xa;$.prototype.update=function(a,b){A("Firebase.onDisconnect().update",1,2,arguments.length);E("Firebase.onDisconnect().update",this.L);Da("Firebase.onDisconnect().update",a);C("Firebase.onDisconnect().update",2,b,k);var c=this.tb,d=this.L,e=k,f;for(f in a)e=o;e?(Pb("onDisconnect().update() called with empty data.  Don't do anything."),X(b,k)):(c=c.n,d=d.toString(),e=function(a){X(b,a)},c.S?Rc(c,"om",d,a,e):c.lb.push({uc:d,action:"om",data:a,A:e}))};
$.prototype.update=$.prototype.update;var Pd,Qd=0,Rd=[];Pd=function(){var a=(new Date).getTime()+Yb,b=a===Qd;Qd=a;for(var c=Array(8),d=7;0<=d;d--)c[d]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(a%64),a=Math.floor(a/64);z(0===a);a=c.join("");if(b){for(d=11;0<=d&&63===Rd[d];d--)Rd[d]=0;Rd[d]++}else for(d=0;12>d;d++)Rd[d]=Math.floor(64*Math.random());for(d=0;12>d;d++)a+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(Rd[d]);z(20===a.length,"NextPushId: Length should be 20.");return a};function W(){var a,b,c;if(arguments[0]instanceof Cd)c=arguments[0],a=arguments[1];else{A("new Firebase",1,2,arguments.length);var d=arguments[0];b=a="";var e=k,f="";if(t(d)){var h=d.indexOf("//");if(0<=h)var i=d.substring(0,h-1),d=d.substring(h+2);h=d.indexOf("/");-1===h&&(h=d.length);a=d.substring(0,h);var d=d.substring(h+1),m=a.split(".");if(3==m.length){h=m[2].indexOf(":");e=0<=h?"https"===i:k;if("firebase"===m[1])Ub(a+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
else{b=m[0];f="";d=("/"+d).split("/");for(i=0;i<d.length;i++)if(0<d[i].length){h=d[i];try{h=decodeURIComponent(h.replace(/\+/g," "))}catch(n){}f+="/"+h}}b=b.toLowerCase()}else b=l}e||"undefined"!==typeof window&&(window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:"))&&Vb("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");a=new sb(a,e,b);b=new I(f);e=b.toString();if(!(d=!t(a.host)))if(!(d=0===a.host.length))if(!(d=!ya(a.jb)))if(d=
0!==e.length)e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),d=!(t(e)&&0!==e.length&&!xa.test(e));d&&g(Error(B("new Firebase",1,o)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'));arguments[1]?arguments[1]instanceof Y?c=arguments[1]:g(Error("Expected a valid Firebase.Context for second argument to new Firebase()")):c=Y.pd();e=a.toString();d=ua(c.Wa,e);d||(d=new Cd(a),c.Wa[e]=d);c=d;a=b}G.call(this,c,a)}ka(W,G);ca("Firebase",W);
W.prototype.name=function(){A("Firebase.name",0,0,arguments.length);return this.path.f()?l:Ma(this.path)};W.prototype.name=W.prototype.name;W.prototype.C=function(a){A("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof I))if(F(this.path)===l){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Ha("Firebase.child",b)}else Ha("Firebase.child",a);return new W(this.o,this.path.C(a))};W.prototype.child=W.prototype.C;
W.prototype.parent=function(){A("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return a===l?l:new W(this.o,a)};W.prototype.parent=W.prototype.parent;W.prototype.toString=function(){A("Firebase.toString",0,0,arguments.length);var a;if(this.parent()===l)a=this.o.toString();else{a=this.parent().toString()+"/";var b=this.name();a+=encodeURIComponent(String(b))}return a};W.prototype.toString=W.prototype.toString;
W.prototype.set=function(a,b){A("Firebase.set",1,2,arguments.length);E("Firebase.set",this.path);za("Firebase.set",a,o);C("Firebase.set",2,b,k);return this.o.Xa(this.path,a,l,b)};W.prototype.set=W.prototype.set;W.prototype.update=function(a,b){A("Firebase.update",1,2,arguments.length);E("Firebase.update",this.path);Da("Firebase.update",a);C("Firebase.update",2,b,k);return this.o.update(this.path,a,b)};W.prototype.update=W.prototype.update;
W.prototype.Xa=function(a,b,c){A("Firebase.setWithPriority",2,3,arguments.length);E("Firebase.setWithPriority",this.path);za("Firebase.setWithPriority",a,o);Ea("Firebase.setWithPriority",2,b,o);C("Firebase.setWithPriority",3,c,k);(".length"===this.name()||".keys"===this.name())&&g("Firebase.setWithPriority failed: "+this.name()+" is a read-only object.");return this.o.Xa(this.path,a,b,c)};W.prototype.setWithPriority=W.prototype.Xa;
W.prototype.remove=function(a){A("Firebase.remove",0,1,arguments.length);E("Firebase.remove",this.path);C("Firebase.remove",1,a,k);this.set(l,a)};W.prototype.remove=W.prototype.remove;
W.prototype.transaction=function(a,b){function c(){}A("Firebase.transaction",1,2,arguments.length);E("Firebase.transaction",this.path);C("Firebase.transaction",1,a,o);C("Firebase.transaction",2,b,k);(".length"===this.name()||".keys"===this.name())&&g("Firebase.transaction failed: "+this.name()+" is a read-only object.");var d=this.o,e=this.path;d.e("transaction on "+e);var f=new W(d,e);f.oc("value",c);var h={path:e,update:a,A:b,Sc:Jb(),Yc:0,dc:function(){f.Ib("value",c)}},i=d.i.Aa,m=h.update(T(i,
e).P());if(s(m)){Aa("transaction failed: Data returned ",m);var n=T(d.i.K,e).k();U(i,e,Q(m,n));yd(d.Q,e,[e]);h.status=1;e=J(d.ac,e);i=e.j()||[];i.push(h);M(e,i);Ld(d)}else h.dc(),h.A&&(d=Jd(d,e),h.A(l,o,d))};W.prototype.transaction=W.prototype.transaction;W.prototype.xc=function(a,b){A("Firebase.setPriority",1,2,arguments.length);E("Firebase.setPriority",this.path);Ea("Firebase.setPriority",1,a,o);C("Firebase.setPriority",2,b,k);this.o.xc(this.path,a,b)};W.prototype.setPriority=W.prototype.xc;
W.prototype.push=function(a,b){A("Firebase.push",0,2,arguments.length);E("Firebase.push",this.path);za("Firebase.push",a,k);C("Firebase.push",2,b,k);var c=Pd(),c=this.C(c);"undefined"!==typeof a&&a!==l&&c.set(a,b);return c};W.prototype.push=W.prototype.push;W.prototype.da=function(){return new $(this.o,this.path,this.name())};W.prototype.onDisconnect=W.prototype.da;
W.prototype.yd=function(){Vb("FirebaseRef.removeOnDisconnect() being deprecated. Please use FirebaseRef.onDisconnect().remove() instead.");this.da().remove();Id(this.o)};W.prototype.removeOnDisconnect=W.prototype.yd;W.prototype.Cd=function(a){Vb("FirebaseRef.setOnDisconnect(value) being deprecated. Please use FirebaseRef.onDisconnect().set(value) instead.");this.da().set(a);Id(this.o)};W.prototype.setOnDisconnect=W.prototype.Cd;
W.prototype.Za=function(a,b,c){A("Firebase.auth",1,3,arguments.length);t(a)||g(Error(B("Firebase.auth",1,o)+"must be a valid credential (a string)."));C("Firebase.auth",2,b,k);C("Firebase.auth",3,b,k);this.o.Za(a,b,c)};W.prototype.auth=W.prototype.Za;W.prototype.zb=function(){this.o.zb()};W.prototype.unauth=W.prototype.zb;
function Qb(a,b){z(!b||a===k||a===o,"Can't turn on custom loggers persistently.");a===k?("undefined"!==typeof console&&("function"===typeof console.log?Nb=u(console.log,console):"object"===typeof console.log&&(Nb=function(a){console.log(a)})),b&&N.setItem("logging_enabled","true")):a?Nb=a:(Nb=l,N.removeItem("logging_enabled"))}W.enableLogging=Qb;W.INTERNAL=Z;W.Context=Y;})();

// Last time updated at August 19, 2014, 14:46:23

// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - github.com/muaz-khan/WebRTC-Experiment/tree/master/getMediaElement

// Demo          - www.WebRTC-Experiment.com/getMediaElement

//document.write('<link rel="stylesheet" href="https://cdn.WebRTC-Experiment.com/getMediaElement.css">');

// __________________
// getMediaElement.js

function getMediaElement(mediaElement, config) {
    config = config || { };

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

    mediaElement.controls = false;

    var buttons = config.buttons || ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop'];
    buttons.has = function(element) {
        return buttons.indexOf(element) !== -1;
    };

    config.toggle = config.toggle || [];
    config.toggle.has = function(element) {
        return config.toggle.indexOf(element) !== -1;
    };

    var mediaElementContainer = document.createElement('div');
    mediaElementContainer.className = 'media-container';

    var mediaControls = document.createElement('div');
    mediaControls.className = 'media-controls';
    mediaElementContainer.appendChild(mediaControls);

	if (buttons.has('mute-video')) {
        var muteVideo = document.createElement('div');
        muteVideo.className = 'control ' + (config.toggle.has('mute-video') ? 'unmute-video selected' : 'mute-video');
        mediaControls.appendChild(muteVideo);

        muteVideo.onclick = function() {
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
	
    if (buttons.has('mute-audio')) {
        var muteAudio = document.createElement('div');
        muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
        mediaControls.appendChild(muteAudio);

        muteAudio.onclick = function() {
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

    if (buttons.has('take-snapshot')) {
        var takeSnapshot = document.createElement('div');
        takeSnapshot.className = 'control take-snapshot';
        mediaControls.appendChild(takeSnapshot);

        takeSnapshot.onclick = function() {
            if (config.onTakeSnapshot) config.onTakeSnapshot();
        };
    }

    if (buttons.has('stop')) {
        var stop = document.createElement('div');
        stop.className = 'control stop';
        mediaControls.appendChild(stop);

        stop.onclick = function() {
            mediaElementContainer.style.opacity = 0;
            setTimeout(function() {
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

        recordAudio.onclick = function() {
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

        recordVideo.onclick = function() {
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
        slider.onchange = function() {
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

        zoom.onclick = function() {
			if (zoom.className.indexOf('zoom-out') != -1) {
                zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
                exitFullScreen();
				$(zoom).closest('.media-container').css('width', 'auto');
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

            mediaElementContainer.style.width = (isFullScreeMode ? (window.innerWidth - 20) + 'px' : 'auto');
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
		volumeControl.style.marginLeft = (mediaElementContainer.clientWidth - volumeControl.clientWidth - 2) + 'px';

        if (slider) {
            slider.style.width = (mediaElementContainer.clientWidth / 3) + 'px';
		}
        mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - (mediaControls.clientWidth + volumeControl.clientWidth + 2) ) + 'px';
		
		volumeControl.style.marginTop = mediaControls.style.marginTop;

        if (times < 10) {
            times++;
            setTimeout(adjustControls, 1000);
        } else times = 0;
    }

    if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
        mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function() {
            adjustControls();
            mediaControls.style.opacity = 1;
            volumeControl.style.opacity = 1;
        };

        mediaElementContainer.onmouseleave = function() {
            mediaControls.style.opacity = 0;
            volumeControl.style.opacity = 0;
        };
    } else {
        setTimeout(function() {
            adjustControls();
            setTimeout(function() {
                mediaControls.style.opacity = 1;
                volumeControl.style.opacity = 1;
            }, 300);
        }, 700);
    }

    adjustControls();

    mediaElementContainer.toggle = function(clasName) {
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
    config = config || { };

    if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
        var mediaStream = mediaElement;
        mediaElement = document.createElement('audio');
        mediaElement[!!navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !!navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
    }

    config.toggle = config.toggle || [];
    config.toggle.has = function(element) {
        return config.toggle.indexOf(element) !== -1;
    };

    mediaElement.controls = false;
    mediaElement.play();

    var mediaElementContainer = document.createElement('div');
    mediaElementContainer.className = 'media-container';

    var mediaControls = document.createElement('div');
    mediaControls.className = 'media-controls';
    mediaElementContainer.appendChild(mediaControls);

    var muteAudio = document.createElement('div');
    muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
    mediaControls.appendChild(muteAudio);

    muteAudio.onclick = function() {
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

        recordAudio.onclick = function() {
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
    slider.onchange = function() {
        mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
    };
    volumeSlider.appendChild(slider);

    var stop = document.createElement('div');
    stop.className = 'control stop';
    mediaControls.appendChild(stop);

    stop.onclick = function() {
        mediaElementContainer.style.opacity = 0;
        setTimeout(function() {
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
    mediaBox.style.height = '90px';

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
        mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function() {
            adjustControls();
            mediaControls.style.opacity = 1;
        };

        mediaElementContainer.onmouseleave = function() {
            mediaControls.style.opacity = 0;
        };
    } else {
        setTimeout(function() {
            adjustControls();
            setTimeout(function() {
                mediaControls.style.opacity = 1;
            }, 300);
        }, 700);
    }

    adjustControls();

    mediaElementContainer.toggle = function(clasName) {
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


// Last time updated at Dec 09, 2014, 08:32:23

// Quick-Demo for newbies: http://jsfiddle.net/c46de0L8/
// Another simple demo: http://jsfiddle.net/zar6fg60/

// Latest file can be found here: https://cdn.webrtc-experiment.com/RTCMultiConnection.js

// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - www.RTCMultiConnection.org/docs
// FAQ           - www.RTCMultiConnection.org/FAQ
// Changes log   - www.RTCMultiConnection.org/changes-log/
// Demos         - www.WebRTC-Experiment.com/RTCMultiConnection

// _________________________
// RTCMultiConnection-v2.2.4
/* issues/features need to be fixed & implemented:

-. v2.0.* changes-log here: http://www.rtcmulticonnection.org/changes-log/#v2.2
-. trello: https://trello.com/b/8bhi1G6n/rtcmulticonnection 

--. screen capturing improved & some bugs fixed.
--. connection.stopMediaStream improved.
--. fixed: audio-only stream & crash.
--. added: connection.attachExternalStream(MediaStream, isScreen);
--. connection.candidates={relay:true} fixed. (a=candidate is removed).
--. connection.numberOfConnectedUsers is fixed.
--. hark.js updated. "onspeaking" is disabled for remote streams. Check "Coding Tricks" wiki page for further details.
--. Now, stream object is having "pause" and "resume" methods to pause/resume hark.js instances.

--. connection.rtcConfiguration
--. takeSnapshot now returns "blob" as second argument.
--. Renegotiation is fixed for Firefox. Removing old stream and using new one.
--. Fixed: If stream is having no audio or video tracks but session=audio:true,video:true
--. Fixed: onstatechange isn't firing "request-accepted".

NEW/Breaking changes:
--. RTCMultiSession is renamed to "SignalingHandler"
--. "PeerConnection" is renamed to "RTCPeerConnectionHandler"
--. MultiSockets concept has been removed. Now there is always single socket.
*/

'use strict';

(function() {
    // RMC === RTCMultiConnection
    // usually page-URL is used as channel-id
    // you can always override it!
    // www.RTCMultiConnection.org/docs/channel-id/
    window.RMCDefaultChannel = location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('');

    // www.RTCMultiConnection.org/docs/constructor/
    window.RTCMultiConnection = function(channel) {
        // an instance of constructor
        var connection = this;

        // a reference to SignalingHandler
        var signalingHandler;

        // setting default channel or channel passed through constructor
        connection.channel = channel || RMCDefaultChannel;

        // to allow single user to join multiple rooms;
        // you can change this property at runtime!
        connection.isAcceptNewSession = true;

        // www.RTCMultiConnection.org/docs/open/
        connection.open = function(args) {
            connection.isAcceptNewSession = false;

            // www.RTCMultiConnection.org/docs/session-initiator/
            // you can always use this property to determine room owner!
            connection.isInitiator = true;

            var dontTransmit = false;

            // a channel can contain multiple rooms i.e. sessions
            if (args) {
                if (isString(args)) {
                    connection.sessionid = args;
                } else {
                    if (!isNull(args.transmitRoomOnce)) {
                        connection.transmitRoomOnce = args.transmitRoomOnce;
                    }

                    if (!isNull(args.dontTransmit)) {
                        dontTransmit = args.dontTransmit;
                    }

                    if (!isNull(args.sessionid)) {
                        connection.sessionid = args.sessionid;
                    }
                }
            }

            // if firebase && if session initiator
            if (connection.socket && connection.socket.remove) {
                connection.socket.remove();
            }

            if (!connection.sessionid) {
                connection.sessionid = connection.channel;
            }

            connection.sessionDescription = {
                sessionid: connection.sessionid,
                userid: connection.userid,
                session: connection.session,
                extra: connection.extra
            };

            if (!connection.sessionDescriptions[connection.sessionDescription.sessionid]) {
                connection.numberOfSessions++;
                connection.sessionDescriptions[connection.sessionDescription.sessionid] = connection.sessionDescription;
            }

            // connect with signaling channel
            initSignalingHandler(function() {
                // "captureUserMediaOnDemand" is disabled by default.
                // invoke "getUserMedia" only when first participant found.
                signalingHandler.captureUserMediaOnDemand = args ? !!args.captureUserMediaOnDemand : false;

                if (args && args.onMediaCaptured) {
                    connection.onMediaCaptured = args.onMediaCaptured;
                }

                // for session-initiator, user-media is captured as soon as "open" is invoked.
                if (!signalingHandler.captureUserMediaOnDemand) {
                    captureUserMedia(function() {
                        signalingHandler.initSession({
                            sessionDescription: connection.sessionDescription,
                            dontTransmit: dontTransmit
                        });

                        invokeMediaCaptured(connection);
                    });
                }

                if (signalingHandler.captureUserMediaOnDemand) {
                    signalingHandler.initSession({
                        sessionDescription: connection.sessionDescription,
                        dontTransmit: dontTransmit
                    });
                }
            });
            return connection.sessionDescription;
        };

        // www.RTCMultiConnection.org/docs/connect/
        connection.connect = function(sessionid) {
            // a channel can contain multiple rooms i.e. sessions
            if (sessionid) {
                connection.sessionid = sessionid;
            }

            // connect with signaling channel
            initSignalingHandler(function() {
                log('Signaling channel is ready.');
            });

            return this;
        };

        // www.RTCMultiConnection.org/docs/join/
        connection.join = joinSession;

        // www.RTCMultiConnection.org/docs/send/
        connection.send = function(data, _channel) {
            if (connection.numberOfConnectedUsers <= 0) {
                // no connections
                setTimeout(function() {
                    // try again
                    connection.send(data, _channel);
                }, 1000);
                return;
            }

            // send file/data or /text
            if (!data) {
                throw 'No file, data or text message to share.';
            }

            // connection.send([file1, file2, file3])
            // you can share multiple files, strings or data objects using "send" method!
            if (data instanceof Array && !isNull(data[0].size) && !isNull(data[0].type)) {
                // this mechanism can cause failure for subsequent packets/data 
                // on Firefox especially; and on chrome as well!
                // todo: need to use setTimeout instead.
                for (var i = 0; i < data.length; i++) {
                    if (data[i].size && data[i].type) {
                        connection.send(data[i], _channel);
                    }
                }
                return;
            }

            // File or Blob object MUST have "type" and "size" properties
            if (!isNull(data.size) && !isNull(data.type)) {
                if (!connection.enableFileSharing) {
                    throw '"enableFileSharing" boolean MUST be "true" to support file sharing.';
                }

                if (!signalingHandler.fileBufferReader) {
                    initFileBufferReader(connection, function(fbr) {
                        signalingHandler.fileBufferReader = fbr;
                        connection.send(data, _channel);
                    });
                    return;
                }

                var extra = merge({
                    userid: connection.userid
                }, data.extra || connection.extra);

                signalingHandler.fileBufferReader.readAsArrayBuffer(data, function(uuid) {
                    signalingHandler.fileBufferReader.getNextChunk(uuid, function(nextChunk) {
                        if (_channel) {
                            _channel.send(nextChunk);
                        } else {
                            signalingHandler.send(nextChunk);
                        }
                    });
                }, extra);
            } else {
                // to allow longest string messages
                // and largest data objects
                // or anything of any size!
                // to send multiple data objects concurrently!

                TextSender.send({
                    text: data,
                    channel: signalingHandler,
                    _channel: _channel,
                    connection: connection
                });
            }
        };

        function initSignalingHandler(onSignalingReady) {
            if (screenFrame) {
                loadScreenFrame();
            }

            // SignalingHandler is the backbone object;
            // this object MUST be initialized once!
            if (signalingHandler) {
                return onSignalingReady();
            }

            // your everything is passed over SignalingHandler constructor!
            signalingHandler = new SignalingHandler(connection, onSignalingReady);
        }

        connection.disconnect = function() {
            if (signalingHandler) {
                signalingHandler.disconnect();
            }
            signalingHandler = null;
        };

        function joinSession(session, joinAs) {
            if (isString(session)) {
                connection.skipOnNewSession = true;
            }

            if (!signalingHandler) {
                log('Signaling channel is not ready. Connecting...');
                // connect with signaling channel
                initSignalingHandler(function() {
                    log('Signaling channel is connected. Joining the session again...');
                    setTimeout(function() {
                        joinSession(session, joinAs);
                    }, 1000);
                });
                return;
            }

            // connection.join('sessionid');
            if (isString(session)) {
                if (connection.sessionDescriptions[session]) {
                    session = connection.sessionDescriptions[session];
                } else {
                    return setTimeout(function() {
                        log('Session-Descriptions not found. Rechecking..');
                        joinSession(session, joinAs);
                    }, 1000);
                }
            }

            // connection.join('sessionid', { audio: true });
            if (joinAs) {
                return captureUserMedia(function() {
                    session.oneway = true;
                    joinSession(session);
                }, joinAs);
            }

            if (!session || !session.userid || !session.sessionid) {
                error('missing arguments', arguments);

                var err = 'Invalid data passed over "connection.join" method.';
                connection.onstatechange({
                    userid: 'browser',
                    extra: {},
                    name: 'Unexpected data detected.',
                    reason: err
                });

                throw err;
            }

            if (!connection.dontOverrideSession) {
                connection.session = session.session;
            }

            var extra = connection.extra || session.extra || {};

            // todo: need to verify that if-block statement works as expected.
            // expectations: if it is oneway streaming; or if it is data-only connection
            // then, it shouldn't capture user-media on participant's side.
            if (session.oneway || isData(session)) {
                signalingHandler.joinSession(session, extra);
            } else {
                captureUserMedia(function() {
                    signalingHandler.joinSession(session, extra);
                });
            }
        }

        var isFirstSession = true;

        // www.RTCMultiConnection.org/docs/captureUserMedia/

        function captureUserMedia(callback, _session, dontCheckChromExtension) {
            // capture user's media resources
            var session = _session || connection.session;

            if (isEmpty(session)) {
                if (callback) {
                    callback();
                }
                return;
            }

            // you can force to skip media capturing!
            if (connection.dontCaptureUserMedia) {
                return callback();
            }

            // if it is data-only connection
            // if it is one-way connection and current user is participant
            if (isData(session) || (!connection.isInitiator && session.oneway)) {
                // www.RTCMultiConnection.org/docs/attachStreams/
                connection.attachStreams = [];
                return callback();
            }

            var constraints = {
                audio: !!session.audio ? {
                    mandatory: {},
                    optional: [{
                        chromeRenderToAssociatedSink: true
                    }]
                } : false,
                video: !!session.video
            };

            // if custom audio device is selected
            if (connection._mediaSources.audio) {
                constraints.audio.optional.push({
                    sourceId: connection._mediaSources.audio
                });
            }
            if (connection._mediaSources.audiooutput) {
                constraints.audio.optional.push({
                    sourceId: connection._mediaSources.audiooutput
                });
            }
            if (connection._mediaSources.audioinput) {
                constraints.audio.optional.push({
                    sourceId: connection._mediaSources.audioinput
                });
            }

            // if custom video device is selected
            if (connection._mediaSources.video) {
                constraints.video = {
                    optional: [{
                        sourceId: connection._mediaSources.video
                    }]
                };
            }
            if (connection._mediaSources.videoinput) {
                constraints.video = {
                    optional: [{
                        sourceId: connection._mediaSources.videoinput
                    }]
                };
            }

            // for connection.session = {};
            if (!session.screen && !constraints.audio && !constraints.video) {
                return callback();
            }

            var screenConstraints = {
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: DetectRTC.screen.chromeMediaSource,
                        maxWidth: screen.width > 1920 ? screen.width : 1920,
                        maxHeight: screen.height > 1080 ? screen.height : 1080
                    },
                    optional: []
                }
            };

            function onIFrameCallback(event) {
                if (event.data && event.data.chromeMediaSourceId) {
                    // this event listener is no more needed
                    window.removeEventListener('message', onIFrameCallback);

                    var sourceId = event.data.chromeMediaSourceId;

                    DetectRTC.screen.sourceId = sourceId;
                    DetectRTC.screen.chromeMediaSource = 'desktop';

                    if (sourceId === 'PermissionDeniedError') {
                        var mediaStreamError = {
                            message: location.protocol === 'https:' ? 'User denied to share content of his screen.' : SCREEN_COMMON_FAILURE,
                            name: 'PermissionDeniedError',
                            constraintName: screenConstraints,
                            session: session
                        };
                        currentUserMediaRequest.mutex = false;
                        DetectRTC.screen.sourceId = null;
                        return connection.onMediaError(mediaStreamError);
                    }

                    captureUserMedia(callback, _session);
                }

                if (event.data && event.data.chromeExtensionStatus) {
                    warn('Screen capturing extension status is:', event.data.chromeExtensionStatus);
                    DetectRTC.screen.chromeMediaSource = 'screen';
                    captureUserMedia(callback, _session, true);
                }
            }

            if (isFirefox && session.screen) {
                if (location.protocol !== 'https:') {
                    return error(SCREEN_COMMON_FAILURE);
                }
                warn(firefoxScreenCapturingWarning);

                screenConstraints.video = merge(screenConstraints.video.mandatory, {
                    mozMediaSource: 'window', // mozMediaSource is redundant here
                    mediaSource: 'window' // 'screen' || 'window'
                });

                // Firefox is supporting audio+screen from single getUserMedia request
                // audio+video+screen will become audio+screen for Firefox
                // because Firefox isn't supporting multi-streams feature
                if (constraints.audio /* && !session.video */ ) {
                    screenConstraints.audio = true;
                    constraints = {};
                }

                delete screenConstraints.video.chromeMediaSource;
            }

            // if screen is prompted
            if (session.screen) {
                if (isChrome && DetectRTC.screen.extensionid !== ReservedExtensionID) {
                    useCustomChromeExtensionForScreenCapturing = true;
                }

                if (isChrome && !useCustomChromeExtensionForScreenCapturing && !dontCheckChromExtension && !DetectRTC.screen.sourceId) {
                    listenEventHandler('message', onIFrameCallback);

                    if (!screenFrame) {
                        loadScreenFrame();
                    }

                    screenFrame.postMessage();
                    return;
                }

                // check if screen capturing extension is installed.
                if (isChrome && useCustomChromeExtensionForScreenCapturing && !dontCheckChromExtension && DetectRTC.screen.chromeMediaSource === 'screen' && DetectRTC.screen.extensionid) {
                    if (DetectRTC.screen.extensionid === ReservedExtensionID && document.domain.indexOf('webrtc-experiment.com') === -1) {
                        return captureUserMedia(callback, _session, true);
                    }

                    log('checking if chrome extension is installed.');
                    DetectRTC.screen.getChromeExtensionStatus(function(status) {
                        if (status === 'installed-enabled') {
                            DetectRTC.screen.chromeMediaSource = 'desktop';
                        }

                        captureUserMedia(callback, _session, true);
                        log('chrome extension is installed?', DetectRTC.screen.chromeMediaSource === 'desktop');
                    });
                    return;
                }

                if (isChrome && useCustomChromeExtensionForScreenCapturing && DetectRTC.screen.chromeMediaSource === 'desktop' && !DetectRTC.screen.sourceId) {
                    DetectRTC.screen.getSourceId(function(sourceId) {
                        if (sourceId === 'PermissionDeniedError') {
                            var mediaStreamError = {
                                message: 'User denied to share content of his screen.',
                                name: 'PermissionDeniedError',
                                constraintName: screenConstraints,
                                session: session
                            };
                            currentUserMediaRequest.mutex = false;
                            DetectRTC.screen.chromeMediaSource = 'desktop';
                            return connection.onMediaError(mediaStreamError);
                        }

                        if (sourceId === 'No-Response') {
                            error('Chrome extension seems not available. Make sure that manifest.json#L16 has valid content-script matches pointing to your URL.');
                            DetectRTC.screen.chromeMediaSource = 'screen';
                            return captureUserMedia(callback, _session, true);
                        }

                        captureUserMedia(callback, _session, true);
                    });
                    return;
                }

                if (isChrome && DetectRTC.screen.chromeMediaSource === 'desktop') {
                    screenConstraints.video.mandatory.chromeMediaSourceId = DetectRTC.screen.sourceId;
                }

                var _isFirstSession = isFirstSession;

                _captureUserMedia(screenConstraints, constraints.audio || constraints.video ? function() {

                    if (_isFirstSession) {
                        isFirstSession = true;
                    }

                    _captureUserMedia(constraints, callback);
                } : callback);
            } else {
                _captureUserMedia(constraints, callback, session.audio && !session.video);
            }

            function _captureUserMedia(forcedConstraints, forcedCallback, isRemoveVideoTracks, dontPreventSSLAutoAllowed) {
                connection.onstatechange({
                    userid: 'browser',
                    extra: {},
                    name: 'fetching-usermedia',
                    reason: 'About to capture user-media with constraints: ' + toStr(forcedConstraints)
                });


                if (connection.preventSSLAutoAllowed && !dontPreventSSLAutoAllowed && isChrome) {
                    // if navigator.customGetUserMediaBar.js is missing
                    if (!navigator.customGetUserMediaBar) {
                        loadScript(connection.resources.customGetUserMediaBar, function() {
                            _captureUserMedia(forcedConstraints, forcedCallback, isRemoveVideoTracks, dontPreventSSLAutoAllowed);
                        });
                        return;
                    }

                    navigator.customGetUserMediaBar(forcedConstraints, function() {
                        _captureUserMedia(forcedConstraints, forcedCallback, isRemoveVideoTracks, true);
                    }, function() {
                        connection.onMediaError({
                            name: 'PermissionDeniedError',
                            message: 'User denied permission.',
                            constraintName: forcedConstraints,
                            session: session
                        });
                    });
                    return;
                }

                var mediaConfig = {
                    onsuccess: function(stream, returnBack, idInstance, streamid) {
                        onStreamSuccessCallback(stream, returnBack, idInstance, streamid, forcedConstraints, forcedCallback, isRemoveVideoTracks, screenConstraints, constraints, session);
                    },
                    onerror: function(e, constraintUsed) {
                        var mediaStreamError;

                        // http://goo.gl/hrwF1a
                        if (isFirefox) {
                            if (e === 'PERMISSION_DENIED') {
                                e = {
                                    message: '',
                                    name: 'PermissionDeniedError',
                                    constraintName: constraintUsed,
                                    session: session
                                };
                            }
                        }

                        if (isFirefox && constraintUsed.video && constraintUsed.video.mozMediaSource) {
                            mediaStreamError = {
                                message: firefoxScreenCapturingWarning,
                                name: e.name || 'PermissionDeniedError',
                                constraintName: constraintUsed,
                                session: session
                            };

                            connection.onMediaError(mediaStreamError);
                            return;
                        }

                        if (isString(e)) {
                            return connection.onMediaError({
                                message: 'Unknown Error',
                                name: e,
                                constraintName: constraintUsed,
                                session: session
                            });
                        }

                        // it seems that chrome 35+ throws "DevicesNotFoundError" exception 
                        // when any of the requested media is either denied or absent
                        if (e.name && (e.name === 'PermissionDeniedError' || e.name === 'DevicesNotFoundError')) {
                            mediaStreamError = 'Either: ';
                            mediaStreamError += '\n Media resolutions are not permitted.';
                            mediaStreamError += '\n Another application is using same media device.';
                            mediaStreamError += '\n Media device is not attached or drivers not installed.';
                            mediaStreamError += '\n You denied access once and it is still denied.';

                            if (e.message && e.message.length) {
                                mediaStreamError += '\n ' + e.message;
                            }

                            mediaStreamError = {
                                message: mediaStreamError,
                                name: e.name,
                                constraintName: constraintUsed,
                                session: session
                            };

                            connection.onMediaError(mediaStreamError);

                            if (isChrome && (session.audio || session.video)) {
                                // todo: this snippet fails if user has two or more 
                                // microphone/webcam attached.
                                DetectRTC.load(function() {
                                    // it is possible to check presence of the microphone before using it!
                                    if (session.audio && !DetectRTC.hasMicrophone) {
                                        warn('It seems that you have no microphone attached to your device/system.');
                                        session.audio = session.audio = false;

                                        // if (!session.video) {
                                            // alert('It seems that you are capturing microphone and there is no device available or access is denied. Reloading...');
                                            // location.reload();
                                        // }
                                    }

                                    // it is possible to check presence of the webcam before using it!
                                    if (session.video && !DetectRTC.hasWebcam) {
                                        warn('It seems that you have no webcam attached to your device/system.');
                                        session.video = session.video = false;

                                        // if (!session.audio) {
                                            // alert('It seems that you are capturing webcam and there is no device available or access is denied. Reloading...');
                                            // location.reload();
                                        // }
                                    }

                                    if (!DetectRTC.hasMicrophone && !DetectRTC.hasWebcam) {
                                        // alert('It seems that either both microphone/webcam are not available or access is denied. Reloading...');
                                        // location.reload();
                                    } else if (!connection.getUserMediaPromptedOnce) {
                                        // make maximum two tries!
                                        connection.getUserMediaPromptedOnce = true;
                                        //captureUserMedia(callback, session);
                                    }
									captureUserMedia(callback, session);
                                });
                            }
                        }

                        if (e.name && e.name === 'ConstraintNotSatisfiedError') {
                            mediaStreamError = 'Either: ';
                            mediaStreamError += '\n You are prompting unknown media resolutions.';
                            mediaStreamError += '\n You are using invalid media constraints.';

                            if (e.message && e.message.length) {
                                mediaStreamError += '\n ' + e.message;
                            }

                            mediaStreamError = {
                                message: mediaStreamError,
                                name: e.name,
                                constraintName: constraintUsed,
                                session: session
                            };

                            connection.onMediaError(mediaStreamError);
                        }

                        if (session.screen) {
                            if (isFirefox) {
                                error(firefoxScreenCapturingWarning);
                            } else if (location.protocol !== 'https:') {
                                if (!isNodeWebkit && (location.protocol === 'file:' || location.protocol === 'http:')) {
                                    error('You cannot use HTTP or file protocol for screen capturing. You must either use HTTPs or chrome extension page or Node-Webkit page.');
                                }
                            } else {
                                error('Unable to detect actual issue. Maybe "deprecated" screen capturing flag was not set using command line or maybe you clicked "No" button or maybe chrome extension returned invalid "sourceId". Please install chrome-extension: http://bit.ly/webrtc-screen-extension');
                            }
                        }

                        currentUserMediaRequest.mutex = false;

                        // to make sure same stream can be captured again!
                        var idInstance = JSON.stringify(constraintUsed);
                        if (currentUserMediaRequest.streams[idInstance]) {
                            delete currentUserMediaRequest.streams[idInstance];
                        }
                    },
                    mediaConstraints: connection.mediaConstraints || {}
                };

                mediaConfig.constraints = forcedConstraints || constraints;
                mediaConfig.connection = connection;
                getUserMedia(mediaConfig);
            }
        }

        function onStreamSuccessCallback(stream, returnBack, idInstance, streamid, forcedConstraints, forcedCallback, isRemoveVideoTracks, screenConstraints, constraints, session) {
            if (!streamid) {
                streamid = getRandomString();
            }

            connection.onstatechange({
                userid: 'browser',
                extra: {},
                name: 'usermedia-fetched',
                reason: 'Captured user media using constraints: ' + toStr(forcedConstraints)
            });

            if (isRemoveVideoTracks) {
                stream = convertToAudioStream(stream);
            }

            connection.localStreamids.push(streamid);
            stream.onended = function() {
                if (streamedObject.mediaElement && !streamedObject.mediaElement.parentNode && document.getElementById(stream.streamid)) {
                    streamedObject.mediaElement = document.getElementById(stream.streamid);
                }

                // when a stream is stopped; it must be removed from "attachStreams" array
                connection.attachStreams.forEach(function(_stream, index) {
                    if (_stream === stream) {
                        delete connection.attachStreams[index];
                        connection.attachStreams = swap(connection.attachStreams);
                    }
                });

                onStreamEndedHandler(streamedObject, connection);

                if (connection.streams[streamid]) {
                    connection.removeStream(streamid);
                }

                // if user clicks "stop" button to close screen sharing
                var _stream = connection.streams[streamid];
                if (_stream && _stream.sockets.length) {
                    _stream.sockets.forEach(function(socket) {
                        socket.send2({
                            streamid: _stream.streamid,
                            stopped: true
                        });
                    });
                }

                currentUserMediaRequest.mutex = false;
                // to make sure same stream can be captured again!
                if (currentUserMediaRequest.streams[idInstance]) {
                    delete currentUserMediaRequest.streams[idInstance];
                }

                // to allow re-capturing of the screen
                DetectRTC.screen.sourceId = null;

                if (harker) {
                    harker.stop();
                }
            };

            if (!isIE) {
                stream.streamid = streamid;
                stream.isScreen = forcedConstraints === screenConstraints;
                stream.isVideo = forcedConstraints === constraints && !!constraints.video;
                stream.isAudio = forcedConstraints === constraints && !!constraints.audio && !constraints.video;

                // if muted stream is negotiated
                stream.preMuted = {
                    audio: stream.getAudioTracks().length && !stream.getAudioTracks()[0].enabled,
                    video: stream.getVideoTracks().length && !stream.getVideoTracks()[0].enabled
                };
            }

            var mediaElement = createMediaElement(stream, session);
            mediaElement.muted = true;

            var streamedObject = {
                stream: stream,
                streamid: streamid,
                mediaElement: mediaElement,
                blobURL: mediaElement.mozSrcObject ? URL.createObjectURL(stream) : mediaElement.src,
                type: 'local',
                userid: connection.userid,
                extra: connection.extra,
                session: session,
                isVideo: !!stream.isVideo,
                isAudio: !!stream.isAudio,
                isScreen: !!stream.isScreen,
                isInitiator: !!connection.isInitiator,
                rtcMultiConnection: connection
            };

            if (isFirstSession) {
                connection.attachStreams.push(stream);
            }
            isFirstSession = false;

            connection.streams[streamid] = connection._getStream(streamedObject);

            if (!returnBack) {
                connection.onstream(streamedObject);
            }

            if (connection.setDefaultEventsForMediaElement) {
                connection.setDefaultEventsForMediaElement(mediaElement, streamid);
            }

            if (forcedCallback) {
                forcedCallback(stream, streamedObject);
            }

            var harker;
            if (connection.onspeaking) {
                initHark({
                    stream: stream,
                    streamedObject: streamedObject,
                    connection: connection
                }, function(_harker) {
                    harker = _harker;
                });
            }
        }

        // www.RTCMultiConnection.org/docs/captureUserMedia/
        connection.captureUserMedia = captureUserMedia;

        // www.RTCMultiConnection.org/docs/leave/
        connection.leave = function(userid) {
            if (!signalingHandler) {
                return;
            }

            isFirstSession = true;

            if (userid) {
                connection.eject(userid);
                return;
            }

            signalingHandler.leave();
        };

        // www.RTCMultiConnection.org/docs/eject/
        connection.eject = function(userid) {
            if (!connection.isInitiator) {
                throw 'Only session-initiator can eject a user.';
            }

            if (!connection.peers[userid]) {
                throw 'You ejected invalid user.';
            }

            connection.peers[userid].sendCustomMessage({
                ejected: true
            });
        };

        // www.RTCMultiConnection.org/docs/close/
        connection.close = function() {
            // close entire session
            connection.autoCloseEntireSession = true;
            connection.leave();
        };

        // www.RTCMultiConnection.org/docs/renegotiate/
        connection.renegotiate = function(stream, session) {
            if (connection.numberOfConnectedUsers <= 0) {
                // no connections
                setTimeout(function() {
                    // try again
                    connection.renegotiate(stream, session);
                }, 1000);
                return;
            }

            signalingHandler.addStream({
                renegotiate: session || merge({
                    oneway: true
                }, connection.session),
                stream: stream
            });
        };

        connection.attachExternalStream = function(stream, isScreen) {
            var constraints = {};
            if (stream.getAudioTracks && stream.getAudioTracks().length) {
                constraints.audio = true;
            }
            if (stream.getVideoTracks && stream.getVideoTracks().length) {
                constraints.video = true;
            }

            var screenConstraints = {
                video: {
                    chromeMediaSource: 'external-stream'
                }
            };
            var forcedConstraints = isScreen ? screenConstraints : constraints;
            onStreamSuccessCallback(stream, false, '', null, forcedConstraints, false, false, screenConstraints, constraints, constraints);
        };

        // www.RTCMultiConnection.org/docs/addStream/
        connection.addStream = function(session, socket) {
            // www.RTCMultiConnection.org/docs/renegotiation/

            if (connection.numberOfConnectedUsers <= 0) {
                // no connections
                setTimeout(function() {
                    // try again
                    connection.addStream(session, socket);
                }, 1000);
                return;
            }

            // renegotiate new media stream
            if (session) {
                var isOneWayStreamFromParticipant;
                if (!connection.isInitiator && session.oneway) {
                    session.oneway = false;
                    isOneWayStreamFromParticipant = true;
                }

                captureUserMedia(function(stream) {
                    if (isOneWayStreamFromParticipant) {
                        session.oneway = true;
                    }
                    addStream(stream);
                }, session);
            } else {
                addStream();
            }

            function addStream(stream) {
                signalingHandler.addStream({
                    stream: stream,
                    renegotiate: session || connection.session,
                    socket: socket
                });
            }
        };

        // www.RTCMultiConnection.org/docs/removeStream/
        connection.removeStream = function(streamid, dontRenegotiate) {
            if (connection.numberOfConnectedUsers <= 0) {
                // no connections
                setTimeout(function() {
                    // try again
                    connection.removeStream(streamid, dontRenegotiate);
                }, 1000);
                return;
            }

            function _detachStream(_stream, config) {
                if (config.local && _stream.type !== 'local') {
                    return;
                }

                if (config.remote && _stream.type !== 'remote') {
                    return;
                }

                // connection.removeStream({screen:true});
                if (config.screen && !!_stream.isScreen) {
                    connection.detachStreams.push(_stream.streamid);
                }

                // connection.removeStream({audio:true});
                if (config.audio && !!_stream.isAudio) {
                    connection.detachStreams.push(_stream.streamid);
                }

                // connection.removeStream({video:true});
                if (config.video && !!_stream.isVideo) {
                    connection.detachStreams.push(_stream.streamid);
                }

                // connection.removeStream({});
                if (!config.audio && !config.video && !config.screen) {
                    connection.detachStreams.push(_stream.streamid);
                }

                if (connection.detachStreams.indexOf(_stream.streamid) !== -1) {
                    log('removing stream', _stream.streamid);
                    onStreamEndedHandler(_stream, connection);

                    if (config.stop) {
                        connection.stopMediaStream(_stream.stream);
                    }
                }
            }

            if (!streamid) {
                streamid = 'all';
            }

            var stream;
            if (!isString(streamid) || streamid.search(/all|audio|video|screen/gi) !== -1) {
                for (stream in connection.streams) {
                    if (connection._skip.indexOf(stream) === -1) {
                        var _stream = connection.streams[stream];

                        if (streamid === 'all') {
                            _detachStream(_stream, {
                                audio: true,
                                video: true,
                                screen: true
                            });
                        } else if (isString(streamid)) {
                            // connection.removeStream('screen');
                            var config = {};
                            config[streamid] = true;
                            _detachStream(_stream, config);
                        } else {
                            _detachStream(_stream, streamid);
                        }
                    }
                }

                if (!dontRenegotiate && connection.detachStreams.length) {
                    connection.renegotiate();
                }
                return;
            }

            stream = connection.streams[streamid];

            // detach pre-attached streams
            if (!stream) {
                return warn('No such stream exists. Stream-id:', streamid);
            }

            // www.RTCMultiConnection.org/docs/detachStreams/
            connection.detachStreams.push(stream.streamid);

            log('removing stream', stream.streamid);
            onStreamEndedHandler(stream, connection);

            // todo: how to allow "stop" function?
            // connection.stopMediaStream(stream.stream)

            if (!dontRenegotiate) {
                connection.renegotiate();
            }
        };

        connection.switchStream = function(session) {
            if (connection.numberOfConnectedUsers <= 0) {
                // no connections
                setTimeout(function() {
                    // try again
                    connection.switchStream(session);
                }, 1000);
                return;
            }

            connection.removeStream('all', true);
            connection.addStream(session);
        };

        // www.RTCMultiConnection.org/docs/sendCustomMessage/
        connection.sendCustomMessage = function(message) {
            if (!connection.socket) {
                return setTimeout(function() {
                    connection.sendCustomMessage(message);
                }, 1000);
            }

            connection.socket.send({
                customMessage: true,
                message: message
            });
        };

        // www.RTCMultiConnection.org/docs/userid/
        //connection.userid = getRandomString();
		connection.userid = $.connection.hub.id;

        // www.RTCMultiConnection.org/docs/session/
        connection.session = {
            audio: true,
            video: true
        };

        // www.RTCMultiConnection.org/docs/maxParticipantsAllowed/
        connection.maxParticipantsAllowed = 256;

        // www.RTCMultiConnection.org/docs/direction/
        // 'many-to-many' / 'one-to-many' / 'one-to-one' / 'one-way'
        connection.direction = 'many-to-many';

        // www.RTCMultiConnection.org/docs/mediaConstraints/
        connection.mediaConstraints = {
            mandatory: {}, // kept for backward compatibility
            optional: [], // kept for backward compatibility
            audio: {
                mandatory: {},
                optional: []
            },
            video: {
                mandatory: {},
                optional: []
            }
        };

        // www.RTCMultiConnection.org/docs/candidates/
        connection.candidates = {
            host: true,
            stun: true,
            turn: true
        };

        connection.sdpConstraints = {};

        // as @serhanters proposed in #225
        // it will auto fix "all" renegotiation scenarios
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

        connection.privileges = {
            canStopRemoteStream: false, // user can stop remote streams
            canMuteRemoteStream: false // user can mute remote streams
        };

        connection.iceProtocols = {
            tcp: true,
            udp: true
        };

        // www.RTCMultiConnection.org/docs/preferSCTP/
        connection.preferSCTP = isFirefox || chromeVersion >= 32 ? true : false;
        connection.chunkInterval = isFirefox || chromeVersion >= 32 ? 100 : 500; // 500ms for RTP and 100ms for SCTP
        connection.chunkSize = isFirefox || chromeVersion >= 32 ? 13 * 1000 : 1000; // 1000 chars for RTP and 13000 chars for SCTP

        // www.RTCMultiConnection.org/docs/fakeDataChannels/
        connection.fakeDataChannels = false;

        connection.waitUntilRemoteStreamStartsFlowing = null; // NULL === true

        // auto leave on page unload
        connection.leaveOnPageUnload = true;

        // get ICE-servers from XirSys
        //connection.getExternalIceServers = isChrome;
		connection.getExternalIceServers = false;

        // www.RTCMultiConnection.org/docs/UA/
        connection.UA = {
            isFirefox: isFirefox,
            isChrome: isChrome,
            isMobileDevice: isMobileDevice,
            version: isChrome ? chromeVersion : firefoxVersion,
            isNodeWebkit: isNodeWebkit,
            isSafari: isSafari,
            isIE: isIE,
            isOpera: isOpera
        };

        // file queue: to store previous file objects in memory;
        // and stream over newly connected peers
        // www.RTCMultiConnection.org/docs/fileQueue/
        connection.fileQueue = {};

        // this array is aimed to store all renegotiated streams' session-types
        connection.renegotiatedSessions = {};

        // www.RTCMultiConnection.org/docs/channels/
        connection.channels = {};

        // www.RTCMultiConnection.org/docs/extra/
        connection.extra = {};

        // www.RTCMultiConnection.org/docs/bandwidth/
        connection.bandwidth = {
            screen: 300 // 300kbps (dirty workaround)
        };

        // www.RTCMultiConnection.org/docs/caniuse/
        connection.caniuse = {
            RTCPeerConnection: DetectRTC.isWebRTCSupported,
            getUserMedia: !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia,
            AudioContext: DetectRTC.isAudioContextSupported,

            // there is no way to check whether "getUserMedia" flag is enabled or not!
            ScreenSharing: DetectRTC.isScreenCapturingSupported,
            RtpDataChannels: DetectRTC.isRtpDataChannelsSupported,
            SctpDataChannels: DetectRTC.isSctpDataChannelsSupported
        };

        // www.RTCMultiConnection.org/docs/snapshots/
        connection.snapshots = {};

        // www.WebRTC-Experiment.com/demos/MediaStreamTrack.getSources.html
        connection._mediaSources = {};

        // www.RTCMultiConnection.org/docs/devices/
        connection.devices = {};

        // www.RTCMultiConnection.org/docs/language/ (to see list of all supported languages)
        connection.language = 'en';

        // www.RTCMultiConnection.org/docs/autoTranslateText/
        connection.autoTranslateText = false;

        // please use your own Google Translate API key
        // Google Translate is a paid service.
        connection.googKey = 'AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE';

        connection.localStreamids = [];
        connection.localStreams = {};

        // this object stores pre-recorded media streaming uids
        // multiple pre-recorded media files can be streamed concurrently.
        connection.preRecordedMedias = {};

        // www.RTCMultiConnection.org/docs/attachStreams/
        connection.attachStreams = [];

        // www.RTCMultiConnection.org/docs/detachStreams/
        connection.detachStreams = [];

        connection.optionalArgument = {
            optional: [{
                DtlsSrtpKeyAgreement: true
            }, {
                googImprovedWifiBwe: true
            }, {
                googScreencastMinBitrate: 300
            }],
            mandatory: {}
        };

        connection.dataChannelDict = {};

        // www.RTCMultiConnection.org/docs/dontAttachStream/
        connection.dontAttachStream = false;

        // www.RTCMultiConnection.org/docs/dontCaptureUserMedia/
        connection.dontCaptureUserMedia = false;

        // this feature added to keep users privacy and 
        // make sure HTTPs pages NEVER auto capture users media
        // isChrome && location.protocol === 'https:'
        connection.preventSSLAutoAllowed = false;

        connection.autoReDialOnFailure = true;
        connection.isInitiator = false;

        // access DetectRTC.js features directly!
        connection.DetectRTC = DetectRTC;

        // you can falsify it to merge all ICE in SDP and share only SDP!
        // such mechanism is useful for SIP/XMPP and XMLHttpRequest signaling
        // bug: renegotiation fails if "trickleIce" is false
        connection.trickleIce = true;

        // this object stores list of all sessions in current channel
        connection.sessionDescriptions = {};

        // this object stores current user's session-description
        // it is set only for initiator
        // it is set as soon as "open" method is invoked.
        connection.sessionDescription = null;

        // resources used in RTCMultiConnection
        connection.resources = {
            RecordRTC: 'https://cdn.webrtc-experiment.com/RecordRTC.js',
            PreRecordedMediaStreamer: 'https://cdn.webrtc-experiment.com/PreRecordedMediaStreamer.js',
            customGetUserMediaBar: 'https://cdn.webrtc-experiment.com/navigator.customGetUserMediaBar.js',
            html2canvas: 'https://cdn.webrtc-experiment.com/screenshot.js',
            hark: 'https://cdn.webrtc-experiment.com/hark.js',
            firebase: 'https://cdn.webrtc-experiment.com/firebase.js',
            firebaseio: 'https://webrtc-signaling.firebaseio.com/',
            muted: 'https://cdn.webrtc-experiment.com/images/muted.png',
            getConnectionStats: 'https://cdn.webrtc-experiment.com/getConnectionStats.js',
            FileBufferReader: 'https://cdn.webrtc-experiment.com/FileBufferReader.js'
        };

        // www.RTCMultiConnection.org/docs/body/
        connection.body = document.body || document.documentElement;

        // www.RTCMultiConnection.org/docs/peers/
        connection.peers = {};

        // www.RTCMultiConnection.org/docs/firebase/
        connection.firebase = 'chat';

        connection.numberOfSessions = 0;
        connection.numberOfConnectedUsers = 0;

        // by default, data-connections will always be getting
        // FileBufferReader.js if absent.
        connection.enableFileSharing = true;

        // www.RTCMultiConnection.org/docs/autoSaveToDisk/
        // to make sure file-saver dialog is not invoked.
        connection.autoSaveToDisk = false;

        connection.processSdp = function(sdp) {
            // process sdp here
            return sdp;
        };

        // www.RTCMultiConnection.org/docs/onmessage/
        connection.onmessage = function(e) {
            log('onmessage', toStr(e));
        };

        // www.RTCMultiConnection.org/docs/onopen/
        connection.onopen = function(e) {
            log('Data connection is opened between you and', e.userid);
        };

        // www.RTCMultiConnection.org/docs/onerror/
        connection.onerror = function(e) {
            error(onerror, toStr(e));
        };

        // www.RTCMultiConnection.org/docs/onclose/
        connection.onclose = function(e) {
            warn('onclose', toStr(e));

            // todo: should we use "stop" or "remove"?
            // BTW, it is remote user!
            connection.streams.remove({
                userid: e.userid
            });
        };

        var progressHelper = {};

        // www.RTCMultiConnection.org/docs/onFileStart/
        connection.onFileStart = function(file) {
            var div = document.createElement('div');
            div.title = file.name;
            div.innerHTML = '<label>0%</label> <progress></progress>';
            connection.body.insertBefore(div, connection.body.firstChild);
            progressHelper[file.uuid] = {
                div: div,
                progress: div.querySelector('progress'),
                label: div.querySelector('label')
            };
            progressHelper[file.uuid].progress.max = file.maxChunks;
        };

        // www.RTCMultiConnection.org/docs/onFileProgress/
        connection.onFileProgress = function(chunk) {
            var helper = progressHelper[chunk.uuid];
            if (!helper) {
                return;
            }
            helper.progress.value = chunk.currentPosition || chunk.maxChunks || helper.progress.max;
            updateLabel(helper.progress, helper.label);
        };

        // www.RTCMultiConnection.org/docs/onFileEnd/
        connection.onFileEnd = function(file) {
            if (progressHelper[file.uuid]) {
                progressHelper[file.uuid].div.innerHTML = '<a href="' + file.url + '" target="_blank" download="' + file.name + '">' + file.name + '</a>';
            }

            // for backward compatibility
            if (connection.onFileSent || connection.onFileReceived) {
                if (connection.onFileSent) {
                    connection.onFileSent(file, file.uuid);
                }

                if (connection.onFileReceived) {
                    connection.onFileReceived(file.name, file);
                }
            }
        };

        function updateLabel(progress, label) {
            if (progress.position === -1) {
                return;
            }

            var position = +progress.position.toFixed(2).split('.')[1] || 100;
            label.innerHTML = position + '%';
        }

        // www.RTCMultiConnection.org/docs/onstream/
        connection.onstream = function(e) {
            connection.body.insertBefore(e.mediaElement, connection.body.firstChild);
        };

        // www.RTCMultiConnection.org/docs/onStreamEndedHandler/
        connection.onstreamended = function(e) {
            log('onStreamEndedHandler:', e);

            if (!e.mediaElement) {
                return warn('Event.mediaElement is undefined', e);
            }
            if (!e.mediaElement.parentNode) {
                e.mediaElement = document.getElementById(e.streamid);

                if (!e.mediaElement) {
                    return warn('Event.mediaElement is undefined', e);
                }

                if (!e.mediaElement.parentNode) {
                    return warn('Event.mediElement.parentNode is null.', e);
                }
            }

            e.mediaElement.parentNode.removeChild(e.mediaElement);
        };

        // todo: need to write documentation link
        connection.onSessionClosed = function(session) {
            if (session.isEjected) {
                warn(session.userid, 'ejected you.');
            } else {
                warn('Session has been closed.', session);
            }
        };

        // www.RTCMultiConnection.org/docs/onmute/
        connection.onmute = function(e) {
            if (e.isVideo && e.mediaElement) {
                e.mediaElement.pause();
                e.mediaElement.setAttribute('poster', e.snapshot || connection.resources.muted);
            }
            if (e.isAudio && e.mediaElement) {
                e.mediaElement.muted = true;
            }
        };

        // www.RTCMultiConnection.org/docs/onunmute/
        connection.onunmute = function(e) {
            if (e.isVideo && e.mediaElement) {
                e.mediaElement.play();
                e.mediaElement.removeAttribute('poster');
            }
            if (e.isAudio && e.mediaElement) {
                e.mediaElement.muted = false;
            }
        };

        // www.RTCMultiConnection.org/docs/onleave/
        connection.onleave = function(e) {
            log('onleave', toStr(e));
        };

        connection.token = getRandomString;

        connection.peers[connection.userid] = {
            drop: function() {
                connection.drop();
            },
            renegotiate: function() {},
            addStream: function() {},
            hold: function() {},
            unhold: function() {},
            changeBandwidth: function() {},
            sharePartOfScreen: function() {}
        };

        connection._skip = ['stop', 'mute', 'unmute', '_private', '_selectStreams', 'selectFirst', 'selectAll', 'remove'];

        // www.RTCMultiConnection.org/docs/streams/
        connection.streams = {
            mute: function(session) {
                this._private(session, true);
            },
            unmute: function(session) {
                this._private(session, false);
            },
            _private: function(session, enabled) {
                function _muteOrUnMute(stream, session, isMute) {
                    if (session.local && stream.type !== 'local') {
                        return;
                    }
                    if (session.remote && stream.type !== 'remote') {
                        return;
                    }

                    if (session.screen && !stream.isScreen) {
                        return;
                    }

                    // stream.getAudioTracks().length ?
                    if (session.audio && !stream.isAudio) {
                        return;
                    }

                    if (session.video && !stream.isVideo) {
                        return;
                    }

                    if (isMute) {
                        stream.mute(session);
                    } else {
                        stream.unmute(session);
                    }
                }

                var stream;

                if (session && !isString(session)) {
                    for (stream in this) {
                        if (connection._skip.indexOf(stream) === -1) {
                            _muteOrUnMute(this[stream], session, enabled);
                        }
                    }
                    return;
                }

                // implementation from #68
                for (stream in this) {
                    if (connection._skip.indexOf(stream) === -1) {
                        this[stream]._private(session, enabled);
                    }
                }
            },
            stop: function(type) {
                var _stream;
                for (var stream in this) {
                    if (connection._skip.indexOf(stream) === -1) {
                        _stream = this[stream];

                        if (!type) {
                            _stream.stop();
                        } else if (isString(type)) {
                            // connection.streams.stop('screen');
                            var config = {};
                            config[type] = true;
                            _stopStream(_stream, config);
                        } else {
                            _stopStream(_stream, type);
                        }
                    }
                }

                function _stopStream(_stream, config) {
                    // connection.streams.stop({ remote: true, userid: 'remote-userid' });
                    if (config.userid && _stream.userid !== config.userid) {
                        return;
                    }

                    if (config.local && _stream.type !== 'local') {
                        return;
                    }
                    if (config.remote && _stream.type !== 'remote') {
                        return;
                    }

                    if (config.screen && !!_stream.isScreen) {
                        _stream.stop();
                    }

                    if (config.audio && !!_stream.isAudio) {
                        _stream.stop();
                    }

                    if (config.video && !!_stream.isVideo) {
                        _stream.stop();
                    }

                    // connection.streams.stop('local');
                    if (!config.audio && !config.video && !config.screen) {
                        _stream.stop();
                    }
                }
            },
            remove: function(type) {
                var _stream;
                for (var stream in this) {
                    if (connection._skip.indexOf(stream) === -1) {
                        _stream = this[stream];

                        if (!type) {
                            _stopAndRemoveStream(_stream, {
                                local: true,
                                remote: true
                            });
                        } else if (isString(type)) {
                            // connection.streams.stop('screen');
                            var config = {};
                            config[type] = true;
                            _stopAndRemoveStream(_stream, config);
                        } else {
                            _stopAndRemoveStream(_stream, type);
                        }
                    }
                }

                function _stopAndRemoveStream(_stream, config) {
                    // connection.streams.remove({ remote: true, userid: 'remote-userid' });
                    if (config.userid && _stream.userid !== config.userid) {
                        return;
                    }

                    if (config.local && _stream.type !== 'local') {
                        return;
                    }
                    if (config.remote && _stream.type !== 'remote') {
                        return;
                    }

                    if (config.screen && !!_stream.isScreen) {
                        endStream(_stream);
                    }

                    if (config.audio && !!_stream.isAudio) {
                        endStream(_stream);
                    }

                    if (config.video && !!_stream.isVideo) {
                        endStream(_stream);
                    }

                    // connection.streams.remove('local');
                    if (!config.audio && !config.video && !config.screen) {
                        endStream(_stream);
                    }
                }

                function endStream(_stream) {
                    onStreamEndedHandler(_stream, connection);
                    delete connection.streams[_stream.streamid];
                }
            },
            selectFirst: function(args) {
                return this._selectStreams(args, false);
            },
            selectAll: function(args) {
                return this._selectStreams(args, true);
            },
            _selectStreams: function(args, all) {
                if (!args || isString(args) || isEmpty(args)) {
                    throw 'Invalid arguments.';
                }

                // if userid is used then both local/remote shouldn't be auto-set
                if (isNull(args.local) && isNull(args.remote) && isNull(args.userid)) {
                    args.local = args.remote = true;
                }

                if (!args.isAudio && !args.isVideo && !args.isScreen) {
                    args.isAudio = args.isVideo = args.isScreen = true;
                }

                var selectedStreams = [];
                for (var stream in this) {
                    if (connection._skip.indexOf(stream) === -1 && (stream = this[stream]) && ((args.local && stream.type === 'local') || (args.remote && stream.type === 'remote') || (args.userid && stream.userid === args.userid))) {
                        if (args.isVideo && stream.isVideo) {
                            selectedStreams.push(stream);
                        }

                        if (args.isAudio && stream.isAudio) {
                            selectedStreams.push(stream);
                        }

                        if (args.isScreen && stream.isScreen) {
                            selectedStreams.push(stream);
                        }
                    }
                }

                return !!all ? selectedStreams : selectedStreams[0];
            }
        };

        var iceServers = [];

        iceServers.push({
            url: 'stun:stun.l.google.com:19302'
        });

        iceServers.push({
            url: 'stun:stun.anyfirewall.com:3478'
        });

        iceServers.push({
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        });

        iceServers.push({
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        });

        connection.iceServers = iceServers;

        connection.rtcConfiguration = {
            iceServers: null,
            iceTransports: 'all', // none || relay || all - ref: http://goo.gl/40I39K
            peerIdentity: false
        };

        // www.RTCMultiConnection.org/docs/media/
        connection.media = {
            min: function(width, height) {
                if (!connection.mediaConstraints.video) {
                    return;
                }

                if (!connection.mediaConstraints.video.mandatory) {
                    connection.mediaConstraints.video.mandatory = {};
                }
                connection.mediaConstraints.video.mandatory.minWidth = width;
                connection.mediaConstraints.video.mandatory.minHeight = height;
            },
            max: function(width, height) {
                if (!connection.mediaConstraints.video) {
                    return;
                }

                if (!connection.mediaConstraints.video.mandatory) {
                    connection.mediaConstraints.video.mandatory = {};
                }

                connection.mediaConstraints.video.mandatory.maxWidth = width;
                connection.mediaConstraints.video.mandatory.maxHeight = height;
            }
        };

        connection._getStream = function(event) {
            var resultingObject = merge({
                sockets: event.socket ? [event.socket] : []
            }, event);

            resultingObject.stop = function() {
                var self = this;

                self.sockets.forEach(function(socket) {
                    if (self.type === 'local') {
                        socket.send2({
                            streamid: self.streamid,
                            stopped: true
                        });
                    }

                    if (self.type === 'remote') {
                        socket.send2({
                            promptStreamStop: true,
                            streamid: self.streamid
                        });
                    }
                });

                if (self.type === 'remote') {
                    return;
                }

                var stream = self.stream;
                if (stream) {
                    self.rtcMultiConnection.stopMediaStream(stream);
                }
            };

            resultingObject.mute = function(session) {
                this.muted = true;
                this._private(session, true);
            };

            resultingObject.unmute = function(session) {
                this.muted = false;
                this._private(session, false);
            };

            function muteOrUnmuteLocally(isPause, mediaElement) {
                if (!mediaElement) {
                    return;
                }

                var lastPauseState = mediaElement.onpause;
                var lastPlayState = mediaElement.onplay;
                mediaElement.onpause = mediaElement.onplay = function() {};

                if (isPause) {
                    mediaElement.pause();
                } else {
                    mediaElement.play();
                }

                mediaElement.onpause = lastPauseState;
                mediaElement.onplay = lastPlayState;
            }

            resultingObject._private = function(session, enabled) {
                if (session && !isNull(session.sync) && session.sync === false) {
                    muteOrUnmuteLocally(enabled, this.mediaElement);
                    return;
                }

                muteOrUnmute({
                    root: this,
                    session: session,
                    enabled: enabled,
                    stream: this.stream
                });
            };

            resultingObject.startRecording = function(session) {
                var self = this;

                if (!session) {
                    session = {
                        audio: true,
                        video: true
                    };
                }

                if (isString(session)) {
                    session = {
                        audio: session === 'audio',
                        video: session === 'video'
                    };
                }

                if (!window.RecordRTC) {
                    return loadScript(self.rtcMultiConnection.resources.RecordRTC, function() {
                        self.startRecording(session);
                    });
                }

                log('started recording session', session);

                self.videoRecorder = self.audioRecorder = null;

                if (isFirefox) {
                    // firefox supports both audio/video recording in single webm file
                    if (session.video) {
                        self.videoRecorder = new window.RecordRTC(self.stream, {
                            type: 'video'
                        });
                    } else if (session.audio) {
                        self.audioRecorder = new window.RecordRTC(self.stream, {
                            type: 'audio'
                        });
                    }
                } else if (isChrome) {
                    // chrome supports recording in two separate files: WAV and WebM
                    if (session.video) {
                        self.videoRecorder = new window.RecordRTC(self.stream, {
                            type: 'video'
                        });
                    }

                    if (session.audio) {
                        self.audioRecorder = new window.RecordRTC(self.stream, {
                            type: 'audio'
                        });
                    }
                }

                if (self.audioRecorder) {
                    self.audioRecorder.startRecording();
                }

                if (self.videoRecorder) {
                    self.videoRecorder.startRecording();
                }
            };

            resultingObject.stopRecording = function(callback, session) {
                if (!session) {
                    session = {
                        audio: true,
                        video: true
                    };
                }

                if (isString(session)) {
                    session = {
                        audio: session === 'audio',
                        video: session === 'video'
                    };
                }

                log('stopped recording session', session);

                var self = this;

                if (session.audio && self.audioRecorder) {
                    self.audioRecorder.stopRecording(function() {
                        if (session.video && self.videoRecorder) {
                            self.videoRecorder.stopRecording(function() {
                                callback({
                                    audio: self.audioRecorder.getBlob(),
                                    video: self.videoRecorder.getBlob()
                                });
                            });
                        } else {
                            callback({
                                audio: self.audioRecorder.getBlob()
                            });
                        }
                    });
                } else if (session.video && self.videoRecorder) {
                    self.videoRecorder.stopRecording(function() {
                        callback({
                            video: self.videoRecorder.getBlob()
                        });
                    });
                }
            };

            resultingObject.takeSnapshot = function(callback) {
                takeSnapshot({
                    mediaElement: this.mediaElement,
                    userid: this.userid,
                    connection: connection,
                    callback: callback
                });
            };

            // redundant: kept only for backward compatibility
            resultingObject.streamObject = resultingObject;

            return resultingObject;
        };

        // new RTCMultiConnection().set({properties}).connect()
        connection.set = function(properties) {
            for (var property in properties) {
                this[property] = properties[property];
            }
            return this;
        };

        // www.RTCMultiConnection.org/docs/onMediaError/
        connection.onMediaError = function(event) {
            error('name', event.name);
            error('constraintName', toStr(event.constraintName));
            error('message', event.message);
            error('original session', event.session);
        };

        // www.RTCMultiConnection.org/docs/takeSnapshot/
        connection.takeSnapshot = function(userid, callback) {
            takeSnapshot({
                userid: userid,
                connection: connection,
                callback: callback
            });
        };

        connection.saveToDisk = function(blob, fileName) {
            if (blob.size && blob.type) {
                FileSaver.SaveToDisk(URL.createObjectURL(blob), fileName || blob.name || blob.type.replace('/', '-') + blob.type.split('/')[1]);
            } else {
                FileSaver.SaveToDisk(blob, fileName);
            }
        };

        // www.RTCMultiConnection.org/docs/selectDevices/
        connection.selectDevices = function(device1, device2) {
            if (device1) {
                select(this.devices[device1]);
            }

            if (device2) {
                select(this.devices[device2]);
            }

            function select(device) {
                if (!device) {
                    return;
                }
                connection._mediaSources[device.kind] = device.id;
            }
        };

        // www.RTCMultiConnection.org/docs/getDevices/
        connection.getDevices = function(callback) {
            // if, not yet fetched.
            if (!DetectRTC.MediaDevices.length) {
                return setTimeout(function() {
                    connection.getDevices(callback);
                }, 1000);
            }

            // loop over all audio/video input/output devices
            DetectRTC.MediaDevices.forEach(function(device) {
                connection.devices[device.deviceId] = device;
            });

            if (callback) {
                callback(connection.devices);
            }
        };

        connection.getMediaDevices = connection.enumerateDevices = function(callback) {
            if (!callback) {
                throw 'callback is mandatory.';
            }
            connection.getDevices(function() {
                callback(connection.DetectRTC.MediaDevices);
            });
        };

        // www.RTCMultiConnection.org/docs/onCustomMessage/
        connection.onCustomMessage = function(message) {
            log('Custom message', message);
        };

        // www.RTCMultiConnection.org/docs/ondrop/
        connection.ondrop = function(droppedBy) {
            log('Media connection is dropped by ' + droppedBy);
        };

        // www.RTCMultiConnection.org/docs/drop/
        connection.drop = function(config) {
            config = config || {};
            connection.attachStreams = [];

            // "drop" should detach all local streams
            for (var stream in connection.streams) {
                if (connection._skip.indexOf(stream) === -1) {
                    stream = connection.streams[stream];
                    if (stream.type === 'local') {
                        connection.detachStreams.push(stream.streamid);
                        onStreamEndedHandler(stream, connection);
                    } else {
                        onStreamEndedHandler(stream, connection);
                    }
                }
            }

            // www.RTCMultiConnection.org/docs/sendCustomMessage/
            connection.sendCustomMessage({
                drop: true,
                dontRenegotiate: isNull(config.renegotiate) ? true : config.renegotiate
            });
        };

        // www.RTCMultiConnection.org/docs/Translator/
        connection.Translator = {
            TranslateText: function(text, callback) {
                // if(location.protocol === 'https:') return callback(text);

                var newScript = document.createElement('script');
                newScript.type = 'text/javascript';

                var sourceText = encodeURIComponent(text); // escape

                var randomNumber = 'method' + connection.token();
                window[randomNumber] = function(response) {
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

        // you can easily override it by setting it NULL!
        connection.setDefaultEventsForMediaElement = function(mediaElement, streamid) {
            mediaElement.onpause = function() {
                if (connection.streams[streamid] && !connection.streams[streamid].muted) {
                    connection.streams[streamid].mute();
                }
            };

            // todo: need to make sure that "onplay" EVENT doesn't play self-voice!
            mediaElement.onplay = function() {
                if (connection.streams[streamid] && connection.streams[streamid].muted) {
                    connection.streams[streamid].unmute();
                }
            };

            var volumeChangeEventFired = false;
            mediaElement.onvolumechange = function() {
                if (!!volumeChangeEventFired) {
                    return;
                }

                volumeChangeEventFired = true;

                if (!connection.streams[streamid]) {
                    return;
                }

                setTimeout(function() {
                    var root = connection.streams[streamid];
                    connection.streams[streamid].sockets.forEach(function(socket) {
                        socket.send2({
                            streamid: root.streamid,
                            isVolumeChanged: true,
                            volume: mediaElement.volume
                        });
                    });
                    volumeChangeEventFired = false;
                }, 2000);
            };
        };

        // www.RTCMultiConnection.org/docs/onMediaFile/
        connection.onMediaFile = function(e) {
            log('onMediaFile', e);
            connection.body.appendChild(e.mediaElement);
        };

        // www.RTCMultiConnection.org/docs/shareMediaFile/
        // this method handles pre-recorded media streaming
        connection.shareMediaFile = function(file, video, streamerid) {
            streamerid = streamerid || connection.token();

            if (!window.PreRecordedMediaStreamer) {
                loadScript(connection.resources.PreRecordedMediaStreamer, function() {
                    connection.shareMediaFile(file, video, streamerid);
                });
                return streamerid;
            }

            return window.PreRecordedMediaStreamer.shareMediaFile({
                file: file,
                video: video,
                streamerid: streamerid,
                connection: connection
            });
        };

        // www.RTCMultiConnection.org/docs/onpartofscreen/
        connection.onpartofscreen = function(e) {
            var image = document.createElement('img');
            image.src = e.screenshot;
            connection.body.appendChild(image);
        };

        connection.skipLogs = function() {
            log = error = warn = function() {};
        };

        // www.RTCMultiConnection.org/docs/hold/
        connection.hold = function(mLine) {
            for (var peer in connection.peers) {
                connection.peers[peer].hold(mLine);
            }
        };

        // www.RTCMultiConnection.org/docs/onhold/
        connection.onhold = function(track) {
            log('onhold', track);

            if (track.kind !== 'audio') {
                track.mediaElement.pause();
                track.mediaElement.setAttribute('poster', track.screenshot || connection.resources.muted);
            }
            if (track.kind === 'audio') {
                track.mediaElement.muted = true;
            }
        };

        // www.RTCMultiConnection.org/docs/unhold/
        connection.unhold = function(mLine) {
            for (var peer in connection.peers) {
                connection.peers[peer].unhold(mLine);
            }
        };

        // www.RTCMultiConnection.org/docs/onunhold/
        connection.onunhold = function(track) {
            log('onunhold', track);

            if (track.kind !== 'audio') {
                track.mediaElement.play();
                track.mediaElement.removeAttribute('poster');
            }
            if (track.kind !== 'audio') {
                track.mediaElement.muted = false;
            }
        };

        connection.sharePartOfScreen = function(args) {
            var lastScreenshot = '';

            function partOfScreenCapturer() {
                // if stopped
                if (connection.partOfScreen && !connection.partOfScreen.sharing) {
                    return;
                }

                capturePartOfScreen({
                    element: args.element,
                    connection: connection,
                    callback: function(screenshot) {
                        // don't share repeated content
                        if (screenshot !== lastScreenshot) {
                            lastScreenshot = screenshot;

                            for (var channel in connection.channels) {
                                connection.channels[channel].send({
                                    screenshot: screenshot,
                                    isPartOfScreen: true
                                });
                            }
                        }

                        // "once" can be used to share single screenshot
                        if (!!args.once) {
                            return;
                        }
                        setTimeout(partOfScreenCapturer, args.interval || 200);
                    }
                });
            }

            partOfScreenCapturer();

            connection.partOfScreen = merge({
                sharing: true
            }, args);
        };

        connection.pausePartOfScreenSharing = function() {
            for (var peer in connection.peers) {
                connection.peers[peer].pausePartOfScreenSharing = true;
            }

            if (connection.partOfScreen) {
                connection.partOfScreen.sharing = false;
            }
        };

        connection.resumePartOfScreenSharing = function() {
            for (var peer in connection.peers) {
                connection.peers[peer].pausePartOfScreenSharing = false;
            }

            if (connection.partOfScreen) {
                connection.partOfScreen.sharing = true;
            }
        };

        connection.stopPartOfScreenSharing = function() {
            for (var peer in connection.peers) {
                connection.peers[peer].stopPartOfScreenSharing = true;
            }

            if (connection.partOfScreen) {
                connection.partOfScreen.sharing = false;
            }
        };

        connection.takeScreenshot = function(element, callback) {
            if (!element || !callback) {
                throw 'Invalid number of arguments.';
            }

            if (!window.html2canvas) {
                return loadScript(connection.resources.html2canvas, function() {
                    connection.takeScreenshot(element);
                });
            }

            if (isString(element)) {
                element = document.querySelector(element);
                if (!element) {
                    element = document.getElementById(element);
                }
            }
            if (!element) {
                throw 'HTML Element is inaccessible!';
            }

            // html2canvas.js is used to take screenshots
            window.html2canvas(element, {
                onrendered: function(canvas) {
                    callback(canvas.toDataURL());
                }
            });
        };

        // this event is fired when RTCMultiConnection detects that chrome extension
        // for screen capturing is installed and available
        connection.onScreenCapturingExtensionAvailable = function() {
            log('It seems that screen capturing extension is installed and available on your system!');
        };

        if (!isPluginRTC && DetectRTC.screen.onScreenCapturingExtensionAvailable) {
            DetectRTC.screen.onScreenCapturingExtensionAvailable = function() {
                connection.onScreenCapturingExtensionAvailable();
            };
        }

        connection.changeBandwidth = function(bandwidth) {
            for (var peer in connection.peers) {
                connection.peers[peer].changeBandwidth(bandwidth);
            }
        };

        connection.convertToAudioStream = function(mediaStream) {
            convertToAudioStream(mediaStream);
        };

        connection.onstatechange = function(state) {
            log('on:state:change (' + state.userid + '):', state.name + ':', state.reason || '');
        };

        connection.onfailed = function(event) {
            if (!event.peer.numOfRetries) {
                event.peer.numOfRetries = 0;
            }

            event.peer.numOfRetries++;

            if (event.peer.numOfRetries > 2) {
                event.peer.numOfRetries = 0;
                return;
            }

            if (isFirefox || event.targetuser.browser === 'firefox') {
                error('ICE connectivity check is failed. Re-establishing peer connection.');
                event.peer.redial();
            } else {
                error('ICE connectivity check is failed. Renegotiating peer connection.');
                event.peer.renegotiate();
            }
        };

        connection.onconnected = function(event) {
            // event.peer.addStream || event.peer.getConnectionStats
            log('Peer connection has been established between you and', event.userid);
        };

        connection.ondisconnected = function(event) {
            error('Peer connection seems has been disconnected between you and', event.userid);

            if (isEmpty(connection.channels)) {
                return;
            }
            if (!connection.channels[event.userid]) {
                return;
            }

            // use WebRTC data channels to detect user's presence
            connection.channels[event.userid].send({
                checkingPresence: true
            });

            // wait 5 seconds, if target peer didn't response, simply disconnect
            setTimeout(function() {
                // iceConnectionState === 'disconnected' occurred out of low-bandwidth
                // or internet connectivity issues
                if (connection.peers[event.userid].connected) {
                    delete connection.peers[event.userid].connected;
                    return;
                }

                // to make sure this user's all remote streams are removed.
                connection.streams.remove({
                    remote: true,
                    userid: event.userid
                });

                connection.remove(event.userid);
            }, 3000);
        };

        connection.onstreamid = function(event) {
            // event.isScreen || event.isVideo || event.isAudio
            log('got remote streamid', event.streamid, 'from', event.userid);
        };

        connection.stopMediaStream = function(mediaStream) {
            if (!mediaStream) {
                throw 'MediaStream argument is mandatory.';
            }

            if (connection.keepStreamsOpened) {
                if (mediaStream.onended) {
                    mediaStream.onended();
                }
                return;
            }

            // remove stream from "localStreams" object
            // when native-stop method invoked.
            if (connection.localStreams[mediaStream.streamid]) {
                delete connection.localStreams[mediaStream.streamid];
            }

            if (isFirefox) {
                // Firefox don't yet support onended for any stream (remote/local)
                if (mediaStream.onended) {
                    mediaStream.onended();
                }
            }

            // Latest firefox does support mediaStream.getAudioTrack but doesn't support stop on MediaStreamTrack
            var checkForMediaStreamTrackStop = Boolean(
                (mediaStream.getAudioTracks || mediaStream.getVideoTracks) && (
                    (mediaStream.getAudioTracks()[0] && !mediaStream.getAudioTracks()[0].stop) ||
                    (mediaStream.getVideoTracks()[0] && !mediaStream.getVideoTracks()[0].stop)
                )
            );

            if (!mediaStream.getAudioTracks || checkForMediaStreamTrackStop) {
                if (mediaStream.stop) {
                    mediaStream.stop();
                }
                return;
            }

            if (mediaStream.getAudioTracks().length && mediaStream.getAudioTracks()[0].stop) {
                mediaStream.getAudioTracks().forEach(function(track) {
                    track.stop();
                });
            }

            if (mediaStream.getVideoTracks().length && mediaStream.getVideoTracks()[0].stop) {
                mediaStream.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
            }
        };

        connection.changeBandwidth = function(bandwidth) {
            if (!bandwidth || isString(bandwidth) || isEmpty(bandwidth)) {
                throw 'Invalid "bandwidth" arguments.';
            }

            forEach(connection.peers, function(peer) {
                peer.peer.bandwidth = bandwidth;
            });

            connection.renegotiate();
        };

        // www.RTCMultiConnection.org/docs/openSignalingChannel/
        // http://goo.gl/uvoIcZ
        connection.openSignalingChannel = function(config) {
            // make sure firebase.js is loaded
            if (!window.Firebase) {
                return loadScript(connection.resources.firebase, function() {
                    connection.openSignalingChannel(config);
                });
            }

            var channel = config.channel || connection.channel;

            if (connection.firebase) {
                // for custom firebase instances
                connection.resources.firebaseio = connection.resources.firebaseio.replace('//chat.', '//' + connection.firebase + '.');
            }

            var firebase = new window.Firebase(connection.resources.firebaseio + channel);
            firebase.channel = channel;
            firebase.on('child_added', function(data) {
                config.onmessage(data.val());
            });

            firebase.send = function(data) {
                // a quick dirty workaround to make sure firebase
                // shouldn't fail for NULL values.
                for (var prop in data) {
                    if (isNull(data[prop]) || typeof data[prop] === 'function') {
                        data[prop] = false;
                    }
                }

                this.push(data);
            };

            if (!connection.socket) {
                connection.socket = firebase;
            }

            firebase.onDisconnect().remove();

            setTimeout(function() {
                config.callback(firebase);
            }, 1);
        };

        connection.Plugin = Plugin;
    };

    function SignalingHandler(connection, callbackForSignalingReady) {
        var signalingHandler = this;
        var participants = {};

        if (!signalingHandler.fileBufferReader && connection.session.data && connection.enableFileSharing) {
            initFileBufferReader(connection, function(fbr) {
                signalingHandler.fileBufferReader = fbr;
            });
        }

        var textReceiver = new TextReceiver(connection);

        function onDataChannelMessage(e) {
            if (e.data.checkingPresence && connection.channels[e.userid]) {
                connection.channels[e.userid].send({
                    presenceDetected: true
                });
                return;
            }

            if (e.data.presenceDetected && connection.peers[e.userid]) {
                connection.peers[e.userid].connected = true;
                return;
            }

            if (e.data.type === 'text') {
                textReceiver.receive(e.data, e.userid, e.extra);
            } else {
                if (connection.autoTranslateText) {
                    e.original = e.data;
                    connection.Translator.TranslateText(e.data, function(translatedText) {
                        e.data = translatedText;
                        connection.onmessage(e);
                    });
                } else {
                    connection.onmessage(e);
                }
            }
        }

        function onNewSession(session) {
            if (connection.skipOnNewSession) {
                return;
            }

            if (!session.session) {
                session.session = {};
            }

            if (!session.extra) {
                session.extra = {};
            }

            // todo: make sure this works as expected.
            // i.e. "onNewSession" should be fired only for 
            // sessionid that is passed over "connect" method.
            if (connection.sessionid && session.sessionid !== connection.sessionid) {
                return;
            }

            if (connection.onNewSession) {
                session.join = function(forceSession) {
                    if (!forceSession) {
                        return connection.join(session);
                    }

                    for (var f in forceSession) {
                        session.session[f] = forceSession[f];
                    }

                    // keeping previous state
                    var isDontCaptureUserMedia = connection.dontCaptureUserMedia;

                    connection.dontCaptureUserMedia = false;
                    connection.captureUserMedia(function() {
                        connection.dontCaptureUserMedia = true;
                        connection.join(session);

                        // returning back previous state
                        connection.dontCaptureUserMedia = isDontCaptureUserMedia;
                    }, forceSession);
                };

                if (!session.extra) {
                    session.extra = {};
                }

                return connection.onNewSession(session);
            }

            connection.join(session);
        }

        function updateSocketForLocalStreams(socket) {
            for (var i = 0; i < connection.localStreamids.length; i++) {
                var streamid = connection.localStreamids[i];
                if (connection.streams[streamid]) {
                    // using "sockets" array to keep references of all sockets using 
                    // this media stream; so we can fire "onStreamEndedHandler" among all users.
                    connection.streams[streamid].sockets.push(socket);
                }
            }
        }

        var peerNegotiationHandler = {};

        function handlePeersNegotiation(_config) {
            var socket = connection.socket;
            socket.send2 = function(message) {
                message.channel = _config.channel;
				message.messageFor = _config.userid;
                socket.send(message);
            };

            peerNegotiationHandler[_config.channel] = socketResponse;

            var isCreateOffer = _config.isCreateOffer,
                peer;

            var peerConfig = {
                onopen: onChannelOpened,
                onicecandidate: function(candidate) {
                    if (!connection.candidates) {
                        throw 'ICE candidates are mandatory.';
                    }

                    if (!connection.iceProtocols) {
                        throw 'At least one must be true; UDP or TCP.';
                    }

                    var iceCandidates = connection.candidates;

                    var stun = iceCandidates.stun;
                    var turn = iceCandidates.turn;

                    if (!isNull(iceCandidates.reflexive)) {
                        stun = iceCandidates.reflexive;
                    }

                    if (!isNull(iceCandidates.relay)) {
                        turn = iceCandidates.relay;
                    }

                    if (!iceCandidates.host && !!candidate.candidate.match(/typ host/g)) {
                        return;
                    }

                    if (!turn && !!candidate.candidate.match(/typ relay/g)) {
                        return;
                    }

                    if (!stun && !!candidate.candidate.match(/typ srflx/g)) {
                        return;
                    }

                    var protocol = connection.iceProtocols;

                    if (!protocol.udp && !!candidate.candidate.match(/ udp /g)) {
                        return;
                    }

                    if (!protocol.tcp && !!candidate.candidate.match(/ tcp /g)) {
                        return;
                    }

                    if (!window.selfNPObject) {
                        window.selfNPObject = candidate;
                    }

                    if (!socket) {
                        return;
                    }

                    socket.send2({
                        candidate: JSON.stringify({
                            candidate: candidate.candidate,
                            sdpMid: candidate.sdpMid,
                            sdpMLineIndex: candidate.sdpMLineIndex
                        })
                    });
                },
                onmessage: function(data) {
                    if (!data) {
                        return;
                    }
					var abToStr = ab2str(data);
                    if (abToStr.indexOf('"userid":') !== -1) {
                        abToStr = JSON.parse(abToStr);
                        onDataChannelMessage(abToStr);
                    } else if (data instanceof ArrayBuffer || data instanceof DataView) {
                        if (!connection.enableFileSharing) {
                            throw 'It seems that receiving data is either "Blob" or "File" but file sharing is disabled.';
                        }

                        if (!signalingHandler.fileBufferReader) {
                            var that = this;
                            initFileBufferReader(connection, function(fbr) {
                                signalingHandler.fileBufferReader = fbr;
                                that.onmessage(data);
                            });
                            return;
                        }

                        var fileBufferReader = signalingHandler.fileBufferReader;

                        fileBufferReader.convertToObject(data, function(chunk) {
                            if (chunk.maxChunks || chunk.readyForNextChunk) {
                                // if target peer requested next chunk
                                if (chunk.readyForNextChunk) {
                                    fileBufferReader.getNextChunk(chunk.uuid, function(nextChunk) {
                                        signalingHandler.send(nextChunk);
                                    });
                                    return;
                                }

                                // if chunk is received
                                fileBufferReader.addChunk(chunk, function(promptNextChunk) {
                                    // request next chunk
                                    signalingHandler.send(promptNextChunk);
                                });
                                return;
                            }

                            connection.onmessage({
                                data: chunk,
                                userid: _config.userid,
                                extra: _config.extra
                            });
                        });
                        return;
                    }
                },
                onaddstream: function(stream, session) {
                    session = session || _config.renegotiate || connection.session;

                    // if it is Firefox; then return.
                    if (isData(session)) {
                        return;
                    }

                    if (session.screen && (session.audio || session.video)) {
                        if (!_config.gotAudioOrVideo) {
                            // audio/video are fired earlier than screen
                            _config.gotAudioOrVideo = true;
                            session.screen = false;
                        } else {
                            // screen stream is always fired later
                            session.audio = false;
                            session.video = false;
                        }
                    }

                    var preMuted = {};

                    function eventListener() {
                        setTimeout(function() {
                            mediaElement.muted = false;
                            afterRemoteStreamStartedFlowing({
                                mediaElement: mediaElement,
                                session: session,
                                stream: stream,
                                preMuted: preMuted
                            });
                        }, 3000);

                        mediaElement.removeEventListener('play', eventListener);
                    }

                    if (_config.streaminfo) {
                        var streaminfo = _config.streaminfo.split('----');
                        var strInfo = JSON.parse(streaminfo[streaminfo.length - 1]);

                        if (!isIE) {
                            stream.streamid = strInfo.streamid;
                            stream.isScreen = !!strInfo.isScreen;
                            stream.isVideo = !!strInfo.isVideo;
                            stream.isAudio = !!strInfo.isAudio;
                            preMuted = strInfo.preMuted;
                        }

                        streaminfo.pop();
                        _config.streaminfo = streaminfo.join('----');
                    }

                    var mediaElement = createMediaElement(stream, merge({
                        remote: true
                    }, session));

                    if (connection.setDefaultEventsForMediaElement) {
                        connection.setDefaultEventsForMediaElement(mediaElement, stream.streamid);
                    }

                    if (!isPluginRTC && !stream.getVideoTracks().length) {
                        return mediaElement.addEventListener('play', eventListener, false);
                    }

                    waitUntilRemoteStreamStartsFlowing({
                        mediaElement: mediaElement,
                        session: session,
                        stream: stream,
                        preMuted: preMuted
                    });
                },

                onremovestream: function(stream) {
                    if (stream && stream.streamid) {
                        stream = connection.streams[stream.streamid];
                        if (stream) {
                            log('on:stream:ended via on:remove:stream', stream);
                            onStreamEndedHandler(stream, connection);
                        }
                    } else {
                        log('on:remove:stream', stream);
                    }
                },

                onclose: function(e) {
                    e.extra = _config.extra;
                    e.userid = _config.userid;
                    connection.onclose(e);

                    // suggested in #71 by "efaj"
                    if (connection.channels[e.userid]) {
                        delete connection.channels[e.userid];
                    }
                },
                onerror: function(e) {
                    e.extra = _config.extra;
                    e.userid = _config.userid;
                    connection.onerror(e);
                },

                oniceconnectionstatechange: function(event) {
                    log('oniceconnectionstatechange', toStr(event));

                    if (peer.connection && peer.connection.iceConnectionState === 'connected' && peer.connection.iceGatheringState === 'complete' && peer.connection.signalingState === 'stable' && connection.numberOfConnectedUsers === 1) {
                        connection.onconnected({
                            userid: _config.userid,
                            extra: _config.extra,
                            peer: connection.peers[_config.userid],
                            targetuser: _config.userinfo
                        });
                    }

                    if (!connection.isInitiator && peer.connection && peer.connection.iceConnectionState === 'connected' && peer.connection.iceGatheringState === 'complete' && peer.connection.signalingState === 'stable' && connection.numberOfConnectedUsers === 1) {
                        connection.onstatechange({
                            userid: _config.userid,
                            extra: _config.extra,
                            name: 'connected-with-initiator',
                            reason: 'ICE connection state seems connected; gathering state is completed; and signaling state is stable.'
                        });
                    }

                    if (connection.peers[_config.userid] && connection.peers[_config.userid].oniceconnectionstatechange) {
                        connection.peers[_config.userid].oniceconnectionstatechange(event);
                    }

                    // if ICE connectivity check is failed; renegotiate or redial
                    if (connection.peers[_config.userid] && connection.peers[_config.userid].peer && connection.peers[_config.userid].peer.connection.iceConnectionState === 'failed') {
                        connection.onfailed({
                            userid: _config.userid,
                            extra: _config.extra,
                            peer: connection.peers[_config.userid],
                            targetuser: _config.userinfo
                        });
                    }

                    if (connection.peers[_config.userid] && connection.peers[_config.userid].peer.connection.iceConnectionState === 'disconnected') {
                        if (!peer.connection.renegotiate) {
                            connection.ondisconnected({
                                userid: _config.userid,
                                extra: _config.extra,
                                peer: connection.peers[_config.userid],
                                targetuser: _config.userinfo
                            });
                        }
                        peer.connection.renegotiate = false;
                    }

                    if (!connection.autoReDialOnFailure) {
                        return;
                    }

                    if (connection.peers[_config.userid]) {
                        if (connection.peers[_config.userid].peer.connection.iceConnectionState !== 'disconnected') {
                            _config.redialing = false;
                        }

                        if (connection.peers[_config.userid].peer.connection.iceConnectionState === 'disconnected' && !_config.redialing) {
                            _config.redialing = true;
                            warn('Peer connection is closed.', toStr(connection.peers[_config.userid].peer.connection), 'ReDialing..');
                            connection.peers[_config.userid].socket.send2({
                                redial: true
                            });

                            // to make sure all old "remote" streams are also removed!
                            connection.streams.remove({
                                remote: true,
                                userid: _config.userid
                            });
                        }
                    }
                },

                onsignalingstatechange: function(event) {
                    log('onsignalingstatechange', toStr(event));
                },

                attachStreams: connection.dontAttachStream ? [] : connection.attachStreams,
                iceServers: connection.iceServers,
                rtcConfiguration: connection.rtcConfiguration,
                bandwidth: connection.bandwidth,
                sdpConstraints: connection.sdpConstraints,
                optionalArgument: connection.optionalArgument,
                disableDtlsSrtp: connection.disableDtlsSrtp,
                dataChannelDict: connection.dataChannelDict,
                preferSCTP: connection.preferSCTP,

                onSessionDescription: function(sessionDescription, streaminfo) {
                    sendsdp({
                        sdp: sessionDescription,
                        socket: socket,
                        streaminfo: streaminfo
                    });
                },
                trickleIce: connection.trickleIce,
                processSdp: connection.processSdp,
                sendStreamId: function(stream) {
                    if (!socket) {
                        return;
                    }

                    socket.send2({
                        streamid: stream.streamid,
                        isScreen: !!stream.isScreen,
                        isAudio: !!stream.isAudio,
                        isVideo: !!stream.isVideo
                    });
                },
                rtcMultiConnection: connection
            };

            function waitUntilRemoteStreamStartsFlowing(args) {
                // chrome for android may have some features missing
                if (isMobileDevice || isPluginRTC || (!isNull(connection.waitUntilRemoteStreamStartsFlowing) && connection.waitUntilRemoteStreamStartsFlowing === false)) {
                    return afterRemoteStreamStartedFlowing(args);
                }

                if (!args.numberOfTimes) {
                    args.numberOfTimes = 0;
                }

                args.numberOfTimes++;

                if (!(args.mediaElement.readyState <= window.HTMLMediaElement.HAVE_CURRENT_DATA || args.mediaElement.paused || args.mediaElement.currentTime <= 0)) {
                    return afterRemoteStreamStartedFlowing(args);
                }

                if (args.numberOfTimes >= 60) { // wait 60 seconds while video is delivered!
                    return socket.send2({
                        failedToReceiveRemoteVideo: true,
                        streamid: args.stream.streamid
                    });
                }

                setTimeout(function() {
                    log('Waiting for incoming remote stream to be started flowing: ' + args.numberOfTimes + ' seconds.');
                    waitUntilRemoteStreamStartsFlowing(args);
                }, 900);
            }

            function initFakeChannel() {
                if (!connection.fakeDataChannels || connection.channels[_config.userid]) {
                    return;
                }

                // for non-data connections; allow fake data sender!
                if (!connection.session.data) {
                    var fakeChannel = {
                        send: function(data) {
                            socket.send2({
                                fakeData: data
                            });
                        },
                        readyState: 'open'
                    };
                    // connection.channels['user-id'].send(data);
                    connection.channels[_config.userid] = {
                        channel: fakeChannel,
                        send: function(data) {
                            this.channel.send(data);
                        }
                    };
                    peerConfig.onopen(fakeChannel);
                }
            }

            function afterRemoteStreamStartedFlowing(args) {
                var mediaElement = args.mediaElement;
                var session = args.session;
                var stream = args.stream;

                stream.onended = function() {
                    if (streamedObject.mediaElement && !streamedObject.mediaElement.parentNode && document.getElementById(stream.streamid)) {
                        streamedObject.mediaElement = document.getElementById(stream.streamid);
                    }

                    onStreamEndedHandler(streamedObject, connection);

                    if (harker) {
                        harker.stop();
                    }
                };

                var streamedObject = {
                    mediaElement: mediaElement,

                    stream: stream,
                    streamid: stream.streamid,
                    session: session || connection.session,

                    blobURL: isPluginRTC ? '' : mediaElement.mozSrcObject ? URL.createObjectURL(stream) : mediaElement.src,
                    type: 'remote',

                    extra: _config.extra,
                    userid: _config.userid,

                    isVideo: isPluginRTC ? !!session.video : !!stream.isVideo,
                    isAudio: isPluginRTC ? !!session.audio && !session.video : !!stream.isAudio,
                    isScreen: !!stream.isScreen,
                    isInitiator: !!_config.isInitiator,

                    rtcMultiConnection: connection,
                    socket: socket
                };

                // connection.streams['stream-id'].mute({audio:true})
                connection.streams[stream.streamid] = connection._getStream(streamedObject);
                connection.onstream(streamedObject);

                if (!isEmpty(args.preMuted) && (args.preMuted.audio || args.preMuted.video)) {
                    var fakeObject = merge({}, streamedObject);
                    fakeObject.session = merge(fakeObject.session, args.preMuted);

                    fakeObject.isAudio = !!fakeObject.session.audio && !fakeObject.session.video;
                    fakeObject.isVideo = !!fakeObject.session.video;
                    fakeObject.isScreen = false;

                    connection.onmute(fakeObject);
                }

                log('on:add:stream', streamedObject);

                onSessionOpened();

                var harker;
                if (connection.onspeaking && false) { // temporarily disabled
                    initHark({
                        stream: stream,
                        streamedObject: streamedObject,
                        connection: connection
                    }, function(_harker) {
                        harker = _harker;
                    });
                }
            }

            function onChannelOpened(channel) {
                _config.datachannel = channel;

                // connection.channels['user-id'].send(data);
                connection.channels[_config.userid] = {
                    channel: _config.datachannel,
                    send: function(data) {
                        connection.send(data, this.channel);
                    }
                };

                connection.onopen({
                    extra: _config.extra,
                    userid: _config.userid,
                    channel: channel
                });

                // fetch files from file-queue
                for (var q in connection.fileQueue) {
                    connection.send(connection.fileQueue[q], channel);
                }

                if (isData(connection.session)) {
                    onSessionOpened();
                }

                if (connection.partOfScreen && connection.partOfScreen.sharing) {
                    connection.peers[_config.userid].sharePartOfScreen(connection.partOfScreen);
                }
            }

            function updateSocket() {
                // todo: need to check following {if-block} MUST not affect "redial" process
                if (socket.userid === _config.userid) {
                    return;
                }

                socket.userid = _config.userid;

                connection.numberOfConnectedUsers++;
                // connection.peers['user-id'].addStream({audio:true})
                connection.peers[_config.userid] = {
                    socket: socket,
                    peer: peer,
                    userid: _config.userid,
                    extra: _config.extra,
                    userinfo: _config.userinfo,
                    addStream: function(session00) {
                        // connection.peers['user-id'].addStream({audio: true, video: true);

                        connection.addStream(session00, this.socket);
                    },
                    removeStream: function(streamid) {
                        if (!connection.streams[streamid]) {
                            return warn('No such stream exists. Stream-id:', streamid);
                        }

                        this.peer.connection.removeStream(connection.streams[streamid].stream);
                        this.renegotiate();
                    },
                    renegotiate: function(stream, session) {
                        // connection.peers['user-id'].renegotiate();

                        connection.renegotiate(stream, session);
                    },
                    changeBandwidth: function(bandwidth) {
                        // connection.peers['user-id'].changeBandwidth();

                        if (!bandwidth) {
                            throw 'You MUST pass bandwidth object.';
                        }

                        if (isString(bandwidth)) {
                            throw 'Pass object for bandwidth instead of string; e.g. {audio:10, video:20}';
                        }

                        // set bandwidth for self
                        this.peer.bandwidth = bandwidth;

                        // ask remote user to synchronize bandwidth
                        this.socket.send2({
                            changeBandwidth: true,
                            bandwidth: bandwidth
                        });
                    },
                    sendCustomMessage: function(message) {
                        // connection.peers['user-id'].sendCustomMessage();

                        this.socket.send2({
                            customMessage: true,
                            message: message
                        });
                    },
                    onCustomMessage: function(message) {
                        log('Received "private" message from', this.userid,
                            isString(message) ? message : toStr(message));
                    },
                    drop: function(dontSendMessage) {
                        // connection.peers['user-id'].drop();

                        for (var stream in connection.streams) {
                            if (connection._skip.indexOf(stream) === -1) {
                                stream = connection.streams[stream];

                                if (stream.userid === connection.userid && stream.type === 'local') {
                                    this.peer.connection.removeStream(stream.stream);
                                    onStreamEndedHandler(stream, connection);
                                }

                                if (stream.type === 'remote' && stream.userid === this.userid) {
                                    onStreamEndedHandler(stream, connection);
                                }
                            }
                        }

                        if (!!dontSendMessage) {
                            return;
                        }

                        this.socket.send2({
                            drop: true
                        });
                    },
                    hold: function(holdMLine) {
                        // connection.peers['user-id'].hold();

                        if (peer.prevCreateType === 'answer') {
                            this.socket.send2({
                                unhold: true,
                                holdMLine: holdMLine || 'both',
                                takeAction: true
                            });
                            return;
                        }

                        this.socket.send2({
                            hold: true,
                            holdMLine: holdMLine || 'both'
                        });

                        this.peer.hold = true;
                        this.fireHoldUnHoldEvents({
                            kind: holdMLine,
                            isHold: true,
                            userid: connection.userid,
                            remoteUser: this.userid
                        });
                    },
                    unhold: function(holdMLine) {
                        // connection.peers['user-id'].unhold();

                        if (peer.prevCreateType === 'answer') {
                            this.socket.send2({
                                unhold: true,
                                holdMLine: holdMLine || 'both',
                                takeAction: true
                            });
                            return;
                        }

                        this.socket.send2({
                            unhold: true,
                            holdMLine: holdMLine || 'both'
                        });

                        this.peer.hold = false;
                        this.fireHoldUnHoldEvents({
                            kind: holdMLine,
                            isHold: false,
                            userid: connection.userid,
                            remoteUser: this.userid
                        });
                    },
                    fireHoldUnHoldEvents: function(e) {
                        // this method is for inner usages only!

                        var isHold = e.isHold;
                        var kind = e.kind;
                        var userid = e.remoteUser || e.userid;

                        // hold means inactive a specific media line!
                        // a media line can contain multiple synced sources (ssrc)
                        // i.e. a media line can reference multiple tracks!
                        // that's why hold will affect all relevant tracks in a specific media line!
                        for (var stream in connection.streams) {
                            if (connection._skip.indexOf(stream) === -1) {
                                stream = connection.streams[stream];

                                if (stream.userid === userid) {
                                    // www.RTCMultiConnection.org/docs/onhold/
                                    if (isHold) {
                                        connection.onhold(merge({
                                            kind: kind
                                        }, stream));
                                    }

                                    // www.RTCMultiConnection.org/docs/onunhold/
                                    if (!isHold) {
                                        connection.onunhold(merge({
                                            kind: kind
                                        }, stream));
                                    }
                                }
                            }
                        }
                    },
                    redial: function() {
                        // connection.peers['user-id'].redial();

                        // 1st of all; remove all relevant remote media streams
                        for (var stream in connection.streams) {
                            if (connection._skip.indexOf(stream) === -1) {
                                stream = connection.streams[stream];

                                if (stream.userid === this.userid && stream.type === 'remote') {
                                    onStreamEndedHandler(stream, connection);
                                }
                            }
                        }

                        log('ReDialing...');

                        socket.send2({
                            recreatePeer: true
                        });

                        peerConfig.attachStreams = connection.attachStreams;
                        peer = new RTCPeerConnectionHandler();
                        peer.create('offer', peerConfig);
                    },
                    sharePartOfScreen: function(args) {
                        // www.RTCMultiConnection.org/docs/onpartofscreen/
                        var that = this;
                        var lastScreenshot = '';

                        function partOfScreenCapturer() {
                            // if stopped
                            if (that.stopPartOfScreenSharing) {
                                that.stopPartOfScreenSharing = false;

                                if (connection.onpartofscreenstopped) {
                                    connection.onpartofscreenstopped();
                                }
                                return;
                            }

                            // if paused
                            if (that.pausePartOfScreenSharing) {
                                if (connection.onpartofscreenpaused) {
                                    connection.onpartofscreenpaused();
                                }

                                return setTimeout(partOfScreenCapturer, args.interval || 200);
                            }

                            capturePartOfScreen({
                                element: args.element,
                                connection: connection,
                                callback: function(screenshot) {
                                    if (!connection.channels[that.userid]) {
                                        throw 'No such data channel exists.';
                                    }

                                    // don't share repeated content
                                    if (screenshot !== lastScreenshot) {
                                        lastScreenshot = screenshot;
                                        connection.channels[that.userid].send({
                                            screenshot: screenshot,
                                            isPartOfScreen: true
                                        });
                                    }

                                    // "once" can be used to share single screenshot
                                    if (!!args.once) {
                                        return;
                                    }

                                    setTimeout(partOfScreenCapturer, args.interval || 200);
                                }
                            });
                        }

                        partOfScreenCapturer();
                    },
                    getConnectionStats: function(callback, interval) {
                        if (!callback) {
                            throw 'callback is mandatory.';
                        }

                        if (!window.getConnectionStats) {
                            loadScript(connection.resources.getConnectionStats, invoker);
                        } else {
                            invoker();
                        }

                        function invoker() {
                            RTCPeerConnection.prototype.getConnectionStats = window.getConnectionStats;
                            if (!peer.connection) {
                                return;
                            }
                            peer.connection.getConnectionStats(callback, interval);
                        }
                    },
                    takeSnapshot: function(callback) {
                        takeSnapshot({
                            userid: this.userid,
                            connection: connection,
                            callback: callback
                        });
                    }
                };
            }

            function onSessionOpened() {
                // original conferencing infrastructure!
                if (connection.isInitiator && getLength(participants) && getLength(participants) <= connection.maxParticipantsAllowed) {
                    if (!connection.session.oneway && !connection.session.broadcast) {
                        connection.socket.send({
                            sessionid: connection.sessionid,
                            newParticipant: _config.userid || socket.channel,
                            userData: {
                                userid: _config.userid || socket.channel,
                                extra: _config.extra
                            }
                        });
                    }
                }

                // 1st: renegotiation is supported only on chrome
                // 2nd: must not renegotiate same media multiple times
                // 3rd: todo: make sure that target-user has no such "renegotiated" media.
                if (_config.userinfo.browser === 'chrome' && !_config.renegotiatedOnce) {
                    // this code snippet is added to make sure that "previously-renegotiated" streams are also 
                    // renegotiated to this new user
                    for (var rSession in connection.renegotiatedSessions) {
                        _config.renegotiatedOnce = true;

                        if (connection.renegotiatedSessions[rSession] && connection.renegotiatedSessions[rSession].stream) {
                            connection.peers[_config.userid].renegotiate(connection.renegotiatedSessions[rSession].stream, connection.renegotiatedSessions[rSession].session);
                        }
                    }
                }
            }

            if (isCreateOffer && !peer) {
                peerConfig.session = connection.session;
                if (!peer) {
                    peer = new RTCPeerConnectionHandler();
                }

                peer.create('offer', peerConfig);
            }

            updateSocketForLocalStreams(socket);

            function socketResponse(response) {
                if (isSignalingHandlerDeleted) {
                    return;
                }

                if (response.userid === connection.userid) {
                    return;
                }

                if (response.sdp) {
                    _config.userid = response.userid;
                    _config.extra = response.extra || {};
                    _config.renegotiate = response.renegotiate;
                    _config.streaminfo = response.streaminfo;
                    _config.isInitiator = response.isInitiator;
                    _config.userinfo = response.userinfo;

                    var sdp = JSON.parse(response.sdp);

                    if (sdp.type === 'offer') {
                        // to synchronize SCTP or RTP
                        peerConfig.preferSCTP = !!response.preferSCTP;
                        connection.fakeDataChannels = !!response.fakeDataChannels;
                    }

                    // initializing fake channel
                    initFakeChannel();

                    sdpInvoker(sdp, response.labels);
                }

                if (response.candidate && peer) {
                    peer.addIceCandidate(JSON.parse(response.candidate));
                }

                if (response.streamid) {
                    if (!signalingHandler.streamids) {
                        signalingHandler.streamids = {};
                    }
                    if (!signalingHandler.streamids[response.streamid]) {
                        signalingHandler.streamids[response.streamid] = response.streamid;
                        connection.onstreamid(response);
                    }
                }

                if (response.mute || response.unmute) {
                    if (response.promptMuteUnmute) {
                        if (!connection.privileges.canMuteRemoteStream) {
                            connection.onstatechange({
                                userid: response.userid,
                                extra: response.extra,
                                name: 'mute-request-denied',
                                reason: response.userid + ' tried to mute your stream; however "privileges.canMuteRemoteStream" is "false".'
                            });
                            return;
                        }

                        if (connection.streams[response.streamid]) {
                            if (response.mute && !connection.streams[response.streamid].muted) {
                                connection.streams[response.streamid].mute(response.session);
                            }
                            if (response.unmute && connection.streams[response.streamid].muted) {
                                connection.streams[response.streamid].unmute(response.session);
                            }
                        }
                    } else {
                        var streamObject = {};
                        if (connection.streams[response.streamid]) {
                            streamObject = connection.streams[response.streamid];
                        }

                        var session = response.session;
                        var fakeObject = merge({}, streamObject);
                        fakeObject.session = session;

                        fakeObject.isAudio = !!fakeObject.session.audio && !fakeObject.session.video;
                        fakeObject.isVideo = !!fakeObject.session.video;
                        fakeObject.isScreen = !!fakeObject.session.screen;

                        if (response.mute) {
                            connection.onmute(fakeObject || response);
                        }

                        if (response.unmute) {
                            connection.onunmute(fakeObject || response);
                        }
                    }
                }

                if (response.isVolumeChanged) {
                    log('Volume of stream: ' + response.streamid + ' has changed to: ' + response.volume);
                    if (connection.streams[response.streamid]) {
                        var mediaElement = connection.streams[response.streamid].mediaElement;
                        if (mediaElement) {
                            mediaElement.volume = response.volume;
                        }
                    }
                }

                // to stop local stream
                if (response.stopped) {
                    if (connection.streams[response.streamid]) {
                        onStreamEndedHandler(connection.streams[response.streamid], connection);
                    }
                }

                // to stop remote stream
                if (response.promptStreamStop /* && !connection.isInitiator */ ) {
                    if (!connection.privileges.canStopRemoteStream) {
                        connection.onstatechange({
                            userid: response.userid,
                            extra: response.extra,
                            name: 'stop-request-denied',
                            reason: response.userid + ' tried to stop your stream; however "privileges.canStopRemoteStream" is "false".'
                        });
                        return;
                    }
                    warn('Remote stream has been manually stopped!');
                    if (connection.streams[response.streamid]) {
                        connection.streams[response.streamid].stop();
                    }
                }

                if (response.left) {
                    // firefox is unable to stop remote streams
                    // firefox doesn't auto stop streams when peer.close() is called.
                    if (isFirefox) {
                        var userLeft = response.userid;
                        for (var stream in connection.streams) {
                            stream = connection.streams[stream];
                            if (stream.userid === userLeft) {
                                connection.stopMediaStream(stream);
                                onStreamEndedHandler(stream, connection);
                            }
                        }
                    }

                    if (peer && peer.connection) {
                        // todo: verify if-block's 2nd condition
                        if (peer.connection.signalingState !== 'closed' && peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                            peer.connection.close();
                        }
                        peer.connection = null;
                    }

                    if (participants[response.userid]) {
                        delete participants[response.userid];
                    }

                    if (response.closeEntireSession) {
                        connection.onSessionClosed(response);
                        connection.leave();
                        return;
                    }

                    connection.remove(response.userid);

                    onLeaveHandler({
                        userid: response.userid,
                        extra: response.extra || {},
                        entireSessionClosed: !!response.closeEntireSession
                    }, connection);

                    if (peerNegotiationHandler[_config.channel]) {
                        delete peerNegotiationHandler[_config.channel];
                    }
                }

                if (response.changeBandwidth) {
                    if (!connection.peers[response.userid]) {
                        throw 'No such peer exists.';
                    }

                    // synchronize bandwidth
                    connection.peers[response.userid].peer.bandwidth = response.bandwidth;

                    // renegotiate to apply bandwidth
                    connection.peers[response.userid].renegotiate();
                }

                if (response.customMessage) {
                    if (!connection.peers[response.userid]) {
                        throw 'No such peer exists.';
                    }

                    if (response.message.ejected) {
                        if (connection.sessionDescriptions[connection.sessionid].userid !== response.userid) {
                            throw 'only initiator can eject a user.';
                        }
                        // initiator ejected this user
                        connection.leave();

                        connection.onSessionClosed({
                            userid: response.userid,
                            extra: response.extra || _config.extra,
                            isEjected: true
                        });
                    } else {
                        connection.peers[response.userid].onCustomMessage(response.message);
                    }
                }

                if (response.drop) {
                    if (!connection.peers[response.userid]) {
                        throw 'No such peer exists.';
                    }

                    connection.peers[response.userid].drop(true);
                    connection.peers[response.userid].renegotiate();

                    connection.ondrop(response.userid);
                }

                if (response.hold || response.unhold) {
                    if (!connection.peers[response.userid]) {
                        throw 'No such peer exists.';
                    }

                    if (response.takeAction) {
                        connection.peers[response.userid][!!response.hold ? 'hold' : 'unhold'](response.holdMLine);
                        return;
                    }

                    connection.peers[response.userid].peer.hold = !!response.hold;
                    connection.peers[response.userid].peer.holdMLine = response.holdMLine;

                    socket.send2({
                        isRenegotiate: true
                    });

                    connection.peers[response.userid].fireHoldUnHoldEvents({
                        kind: response.holdMLine,
                        isHold: !!response.hold,
                        userid: response.userid
                    });
                }

                if (response.isRenegotiate) {
                    connection.peers[response.userid].renegotiate(null, connection.peers[response.userid].peer.session);
                }

                // fake data channels!
                if (response.fakeData) {
                    peerConfig.onmessage(response.fakeData);
                }

                // sometimes we don't need to renegotiate e.g. when peers are disconnected
                // or if it is Firefox
                if (response.recreatePeer) {
                    if (peer && peer.connection) {
                        peer.connection.close();
                    }
                    peerConfig.attachStreams = connection.attachStreams;
                    peer = new RTCPeerConnectionHandler();
                }

                // remote video failed either out of ICE gathering process or ICE connectivity check-up
                // or IceAgent was unable to locate valid candidates/ports.
                if (response.failedToReceiveRemoteVideo) {
                    log('Remote peer hasn\'t received stream: ' + response.streamid + '. Renegotiating...');
                    if (connection.peers[response.userid]) {
                        connection.peers[response.userid].renegotiate();
                    }
                }

                if (response.redial) {
                    if (connection.peers[response.userid]) {
                        if (connection.peers[response.userid].peer.connection.iceConnectionState !== 'disconnected') {
                            _config.redialing = false;
                        }

                        if (connection.peers[response.userid].peer.connection.iceConnectionState === 'disconnected' && !_config.redialing) {
                            _config.redialing = true;

                            warn('Peer connection is closed. ReDialing..');
                            connection.peers[response.userid].redial();
                        }
                    }
                }
            }

            function sdpInvoker(sdp, labels) {
                if (sdp.type === 'answer') {
                    peer.setRemoteDescription(sdp);
                    updateSocket();
                    return;
                }
                if (!_config.renegotiate && sdp.type === 'offer') {
                    peerConfig.offerDescription = sdp;

                    peerConfig.session = connection.session;

                    if (!peer) {
                        peerConfig.attachStreams = connection.attachStreams;
                        peer = new RTCPeerConnectionHandler();
                    }

                    peer.create('answer', peerConfig);

                    updateSocket();
                    return;
                }

                var session = _config.renegotiate;
                // detach streams
                detachMediaStream(labels, peer.connection);

                if (session.oneway || isData(session)) {
                    createAnswer();
                    delete _config.renegotiate;
                } else {
                    if (_config.capturing) {
                        return;
                    }

                    _config.capturing = true;

                    connection.captureUserMedia(function(stream) {
                        _config.capturing = false;

                        if (isChrome || (isFirefox && !peer.connection.getLocalStreams().length)) {
                            peer.addStream(stream);
                        }

                        connection.renegotiatedSessions[JSON.stringify(_config.renegotiate)] = {
                            session: _config.renegotiate,
                            stream: stream
                        };

                        delete _config.renegotiate;

                        createAnswer();
                    }, _config.renegotiate);
                }

                function createAnswer() {
                    // because Firefox has no support of renegotiation yet;
                    // so both chrome and firefox should redial instead of renegotiate!
                    if (isFirefox || _config.userinfo.browser === 'firefox') {
                        if (connection.peers[_config.userid]) {
                            connection.peers[_config.userid].redial();
                        }
                        return;
                    }

                    peer.recreateAnswer(sdp, session, function(_sdp, streaminfo) {
                        sendsdp({
                            sdp: _sdp,
                            socket: socket,
                            streaminfo: streaminfo
                        });
                        connection.detachStreams = [];
                    });
                }
            }
        }

        connection.playRoleOfInitiator = function() {
            connection.dontCaptureUserMedia = true;
            connection.open();
            connection.dontCaptureUserMedia = false;
        };

        connection.askToShareParticipants = function() {
            if (!connection.socket) {
                return;
            }

            connection.socket.send({
                askToShareParticipants: true
            });
        };

        connection.shareParticipants = function(args) {
            var message = {
                joinUsers: participants,
                userid: connection.userid,
                extra: connection.extra
            };

            if (args) {
                if (args.dontShareWith) {
                    message.dontShareWith = args.dontShareWith;
                }

                if (args.shareWith) {
                    message.shareWith = args.shareWith;
                }
            }

            connection.socket.send(message);
        };



        function detachMediaStream(labels, peer) {
            if (!labels || isFirefox) {
                return;
            }

            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                if (connection.streams[label]) {
                    peer.removeStream(connection.streams[label].stream);
                }
            }
        }

        function sendsdp(e) {
            e.socket.send2({
                sdp: JSON.stringify({
                    sdp: e.sdp.sdp,
                    type: e.sdp.type
                }),
                renegotiate: !!e.renegotiate ? e.renegotiate : false,
                streaminfo: e.streaminfo || '',
                labels: e.labels || [],
                preferSCTP: !!connection.preferSCTP,
                fakeDataChannels: !!connection.fakeDataChannels,
                isInitiator: !!connection.isInitiator,
                userinfo: {
                    browser: isFirefox ? 'firefox' : 'chrome'
                }
            });
        }

        // sharing new user with existing participants

        function onNewParticipant(response) {
            var channel = response.newParticipant;

            if (!channel || !!participants[channel] || channel === connection.userid) {
                return;
            }

            var newChannel = connection.token();
            handlePeersNegotiation({
                channel: newChannel,
                extra: response.userData ? response.userData.extra : response.extra,
                userid: response.userData ? response.userData.userid : response.userid
            });

            connection.socket.send({
                participant: true,
                targetUser: channel,
                channel: newChannel
            });
        }

        // if a user leaves

        function clearSession() {
            var alertMessage = {
                left: true,
                extra: connection.extra || {},
                userid: connection.userid,
                sessionid: connection.sessionid
            };

            if (connection.isInitiator) {
                // if initiator wants to close entire session
                if (connection.autoCloseEntireSession) {
                    alertMessage.closeEntireSession = true;
                } else {
                    var firstPeer;
                    for (var peer in connection.peers) {
                        if (peer !== connection.userid) {
                            firstPeer = connection.peers[peer];
                            continue;
                        }
                    }
                    if (firstPeer) {
                        // shift initiation control to another user
                        firstPeer.socket.send2({
                            isPlayRoleOfInitiator: true,
                            messageFor: firstPeer.userid,
                            userid: connection.userid,
                            extra: connection.extra,
                            participants: participants
                        });
                    }
                }
            }

            connection.socket.send(alertMessage);

            connection.refresh();

            webAudioMediaStreamSources.forEach(function(mediaStreamSource) {
                // if source is connected; then chrome will crash on unload.
                mediaStreamSource.disconnect();
            });

            webAudioMediaStreamSources = [];
        }

        // www.RTCMultiConnection.org/docs/remove/
        connection.remove = function(userid) {
            if (signalingHandler.requestsFrom && signalingHandler.requestsFrom[userid]) {
                delete signalingHandler.requestsFrom[userid];
            }

            if (connection.peers[userid]) {
                if (connection.peers[userid].peer && connection.peers[userid].peer.connection) {
                    if (connection.peers[userid].peer.connection.signalingState !== 'closed') {
                        connection.peers[userid].peer.connection.close();
                    }
                    connection.peers[userid].peer.connection = null;
                }
                delete connection.peers[userid];
            }
            if (participants[userid]) {
                delete participants[userid];
            }

            for (var streamid in connection.streams) {
                var stream = connection.streams[streamid];
                if (stream.userid === userid) {
                    onStreamEndedHandler(stream, connection);
                    delete connection.streams[streamid];
                }
            }
        };

        // www.RTCMultiConnection.org/docs/refresh/
        connection.refresh = function() {
            // if firebase; remove data from firebase servers
            if (connection.isInitiator && !!connection.socket && !!connection.socket.remove) {
                connection.socket.remove();
            }

            participants = {};

            // to stop/remove self streams
            for (var i = 0; i < connection.attachStreams.length; i++) {
                connection.stopMediaStream(connection.attachStreams[i]);
            }

            // to allow capturing of identical streams
            currentUserMediaRequest = {
                streams: [],
                mutex: false,
                queueRequests: []
            };

            signalingHandler.isOwnerLeaving = true;

            connection.isInitiator = false;
            connection.isAcceptNewSession = true;
            connection.attachMediaStreams = [];
            connection.sessionDescription = null;
            connection.sessionDescriptions = {};
            connection.localStreamids = [];
            connection.preRecordedMedias = {};
            connection.snapshots = {};

            connection.numberOfConnectedUsers = 0;
            connection.numberOfSessions = 0;

            connection.attachStreams = [];
            connection.detachStreams = [];
            connection.fileQueue = {};
            connection.channels = {};
            connection.renegotiatedSessions = {};

            for (var peer in connection.peers) {
                if (peer !== connection.userid) {
                    delete connection.peers[peer];
                }
            }

            // to make sure remote streams are also removed!
            for (var stream in connection.streams) {
                if (connection._skip.indexOf(stream) === -1) {
                    onStreamEndedHandler(connection.streams[stream], connection);
                    delete connection.streams[stream];
                }
            }

            participants = {};
        };

        // www.RTCMultiConnection.org/docs/reject/
        connection.reject = function(userid) {
            if (!isString(userid)) {
                userid = userid.userid;
            }

            connection.socket.send({
                rejectedRequestOf: userid
            });

            // remove relevant data to allow him join again
            connection.remove(userid);
        };

        signalingHandler.leaveHandler = function(e) {
            if (!connection.leaveOnPageUnload) {
                return;
            }

            if (isNull(e.keyCode)) {
                return clearSession();
            }

            if (e.keyCode === 116) {
                clearSession();
            }
        };

        listenEventHandler('beforeunload', signalingHandler.leaveHandler);
        listenEventHandler('keyup', signalingHandler.leaveHandler);

        function onSignalingReady() {
            if (signalingHandler.signalingReady) {
                return;
            }

            signalingHandler.signalingReady = true;
            setTimeout(callbackForSignalingReady, 1000);
        }

        function joinParticipants(joinUsers) {
            for (var user in joinUsers) {
                if (!participants[joinUsers[user]]) {
                    onNewParticipant({
                        sessionid: connection.sessionid,
                        newParticipant: joinUsers[user],
                        userid: connection.userid,
                        extra: connection.extra
                    });
                }
            }
        }

        // default-socket is a common socket shared among all users in a specific channel;
        // to share participation requests; room descriptions; and other stuff.
        connection.socket = connection.openSignalingChannel({
            onmessage: function (response) {
				//console.log( "recieved: " + connection.isInitiator.toString() + "-" + JSON.stringify(response));
                if (peerNegotiationHandler[response.channel]) {
                    return peerNegotiationHandler[response.channel](response);
                }

                // if message is sent by same user
                if (response.userid === connection.userid) {
                    return;
                }

                if (isSignalingHandlerDeleted) {
                    return;
                }

                if (response.sessionid && response.userid) {
                    if (!connection.sessionDescriptions[response.sessionid]) {
                        connection.numberOfSessions++;
                        connection.sessionDescriptions[response.sessionid] = response;

                        // fire "onNewSession" only if:
                        // 1) "isAcceptNewSession" boolean is true
                        // 2) "sessionDescriptions" object isn't having same session i.e. to prevent duplicate invocations
                        if (connection.isAcceptNewSession) {

                            if (!connection.dontOverrideSession) {
                                connection.session = response.session;
                            }

                            onNewSession(response);
                        }
                    }
                }

                if (response.newParticipant && !connection.isAcceptNewSession && signalingHandler.broadcasterid === response.userid) {
                    if (response.newParticipant !== connection.userid) {
                        onNewParticipant(response);
                    }
                }

                if (getLength(participants) < connection.maxParticipantsAllowed && response.targetUser === connection.userid && response.participant) {
                    if (connection.peers[response.userid] && !connection.peers[response.userid].peer) {
                        delete participants[response.userid];
                        delete connection.peers[response.userid];
                        connection.isAcceptNewSession = true;
                        return acceptRequest(response);
                    }

                    if (!participants[response.userid]) {
                        acceptRequest(response);
                    }
                }

                if (response.acceptedRequestOf === connection.userid) {
                    connection.onstatechange({
                        userid: response.userid,
                        extra: response.extra,
                        name: 'request-accepted',
                        reason: response.userid + ' accepted your participation request.'
                    });
                }

                if (response.rejectedRequestOf === connection.userid) {
                    connection.onstatechange({
                        userid: response.userid,
                        extra: response.extra,
                        name: 'request-rejected',
                        reason: response.userid + ' rejected your participation request.'
                    });
                }

                if (response.customMessage) {
                    if (response.message.drop) {
                        connection.ondrop(response.userid);

                        connection.attachStreams = [];
                        // "drop" should detach all local streams
                        for (var stream in connection.streams) {
                            if (connection._skip.indexOf(stream) === -1) {
                                stream = connection.streams[stream];
                                if (stream.type === 'local') {
                                    connection.detachStreams.push(stream.streamid);
                                    onStreamEndedHandler(stream, connection);
                                } else {
                                    onStreamEndedHandler(stream, connection);
                                }
                            }
                        }

                        if (response.message.renegotiate) {
                            // renegotiate; so "peer.removeStream" happens.
                            connection.renegotiate();
                        }
                    } else if (connection.onCustomMessage) {
                        connection.onCustomMessage(response.message);
                    }
                }

                if (response.sessionDescription && response.responseFor === connection.userid) {
                    var sessionDescription = response.sessionDescription;
                    if (!connection.sessionDescriptions[sessionDescription.sessionid]) {
                        connection.numberOfSessions++;
                        connection.sessionDescriptions[sessionDescription.sessionid] = sessionDescription;
                    }
                }

                if (connection.isInitiator && response.askToShareParticipants && connection.socket) {
                    connection.shareParticipants({
                        shareWith: response.userid
                    });
                }

                // participants are shared with single user
                if (response.shareWith === connection.userid && response.dontShareWith !== connection.userid && response.joinUsers) {
                    joinParticipants(response.joinUsers);
                }

                // participants are shared with all users
                if (!response.shareWith && response.joinUsers) {
                    if (response.dontShareWith) {
                        if (connection.userid !== response.dontShareWith) {
                            joinParticipants(response.joinUsers);
                        }
                    } else {
                        joinParticipants(response.joinUsers);
                    }
                }

                if (response.messageFor === connection.userid && response.presenceState) {
                    if (response.presenceState === 'checking') {
                        connection.socket.send({
                            messageFor: response.userid,
                            presenceState: 'available',
                            _config: response._config
                        });
                        log('participant asked for availability');
                    }

                    if (response.presenceState === 'available') {
                        signalingHandler.presenceState = 'available';

                        connection.onstatechange({
                            userid: 'browser',
                            extra: {},
                            name: 'room-available',
                            reason: 'Initiator is available and room is active.'
                        });

                        joinSession(response._config);
                    }
                }

                if (response.donotJoin && response.messageFor === connection.userid) {
                    log(response.userid, 'is not joining your room.');
                }

                // if initiator disconnects sockets, participants should also disconnect
                if (response.isDisconnectSockets) {
                    log('Disconnecting your sockets because initiator also disconnected his sockets.');
                    connection.disconnect();
                }

                // keeping session active even if initiator leaves
                if (response.isPlayRoleOfInitiator && response.messageFor === connection.userid) {
                    if (response.extra) {
                        // clone extra-data from initial moderator
                        connection.extra = merge(connection.extra, response.extra);
                    }
                    if (response.participants) {
                        participants = response.participants;

                        // make sure that if 2nd initiator leaves; control is shifted to 3rd person.
                        if (participants[connection.userid]) {
                            delete participants[connection.userid];
                        }
                    }

                    setTimeout(connection.playRoleOfInitiator, 2000);
                }
            },
            callback: function(socket) {
				if (!socket) {
                    return;
                }

                this.onopen(socket);
            },
            onopen: function(socket) {
				if (socket) {
                    connection.socket = socket;
                }

                if (onSignalingReady) {
                    onSignalingReady();
                }

                if (!connection.socket.__push) {
                    connection.socket.__push = connection.socket.send;
                    connection.socket.send = function(message) {
                        message.userid = message.userid || connection.userid;
                        message.extra = message.extra || connection.extra || {};

                        connection.socket.__push(message);
                    };
                }
            }
        });

        if (connection.socket && onSignalingReady) {
            setTimeout(onSignalingReady, 2000);
        }

        if (connection.session.screen) {
            loadScreenFrame();
        }

        if (connection.getExternalIceServers) {
            loadIceFrame(function(iceServers) {
                connection.iceServers = connection.iceServers.concat(iceServers);
            });
        }

        if (connection.log === false) {
            connection.skipLogs();
        }

        if (connection.onlog) {
            log = warn = error = function() {
                var log = {};
                var index = 0;
                Array.prototype.slice.call(arguments).forEach(function(argument) {
                    log[index++] = toStr(argument);
                });
                toStr = function(str) {
                    return str;
                };
                connection.onlog(log);
            };
        }

        function setDirections() {
            var userMaxParticipantsAllowed = 0;

            // if user has set a custom max participant setting, remember it
            if (connection.maxParticipantsAllowed !== 256) {
                userMaxParticipantsAllowed = connection.maxParticipantsAllowed;
            }

            if (connection.direction === 'one-way') {
                connection.session.oneway = true;
            }

            if (connection.direction === 'one-to-one') {
                connection.maxParticipantsAllowed = 1;
            }

            if (connection.direction === 'one-to-many') {
                connection.session.broadcast = true;
            }

            if (connection.direction === 'many-to-many') {
                if (!connection.maxParticipantsAllowed || connection.maxParticipantsAllowed === 1) {
                    connection.maxParticipantsAllowed = 256;
                }
            }

            // if user has set a custom max participant setting, set it back
            if (userMaxParticipantsAllowed && connection.maxParticipantsAllowed !== 1) {
                connection.maxParticipantsAllowed = userMaxParticipantsAllowed;
            }
        }

        // open new session
        this.initSession = function(args) {
			signalingHandler.isOwnerLeaving = false;

            setDirections();
            participants = {};

            signalingHandler.isOwnerLeaving = false;

            if (!isNull(args.transmitRoomOnce)) {
                connection.transmitRoomOnce = args.transmitRoomOnce;
            }

            function transmit() {
                if (connection.socket && getLength(participants) < connection.maxParticipantsAllowed && !signalingHandler.isOwnerLeaving) {
					var webRtcHub = $.connection.webRtcHub;
					webRtcHub.server.setSessionDetails($.connection.hub.qs.sessionid, connection.sessionid, JSON.stringify(connection.sessionDescription));
					if (BizAPP.UI.Collaboration.reconnect) {
					    //var reconnectMsg = '{"message":{"messageFor":"' + BizAPP.UI.Collaboration.participantsToReconnect + '","reconnected":"true"}}';
					    var reconnectMsg = '{"message":{"messageFor":"' + BizAPP.UI.Collaboration.allAttendees + '","reconnected":"true"}}';
					    webRtcHub.server.sendReconnectedMsg(reconnectMsg);
					}

                    connection.socket.send(connection.sessionDescription);
                }

				connection.transmitRoomOnce = true;
                if (!connection.transmitRoomOnce && !signalingHandler.isOwnerLeaving) {
                    setTimeout(transmit, connection.interval || 3000);
                }
            }

            // todo: test and fix next line.
            if (!args.dontTransmit /* || connection.transmitRoomOnce */ ) {
				transmit();
            }
        };

        function joinSession(_config) {
			if (signalingHandler.donotJoin && signalingHandler.donotJoin === _config.sessionid) {
                return;
            }

            // dontOverrideSession allows you force RTCMultiConnection
            // to not override default session for participants;
            // by default, session is always overridden and set to the session coming from initiator!
            if (!connection.dontOverrideSession) {
                connection.session = _config.session || {};
            }

            // make sure that inappropriate users shouldn't receive onNewSession event
            signalingHandler.broadcasterid = _config.userid;

            if (_config.sessionid) {
                // used later to prevent external rooms messages to be used by this user!
                connection.sessionid = _config.sessionid;
            }

            connection.isAcceptNewSession = false;

            var channel = getRandomString();
            handlePeersNegotiation({
                channel: channel,
                extra: _config.extra || {},
                userid: _config.userid
            });

            var offers = {};
            if (connection.attachStreams.length) {
                var stream = connection.attachStreams[connection.attachStreams.length - 1];
                if (!!stream.getAudioTracks && stream.getAudioTracks().length) {
                    offers.audio = true;
                }
                if (stream.getVideoTracks().length) {
                    offers.video = true;
                }
            }

            if (!isEmpty(offers)) {
                log(toStr(offers));
            } else {
                log('Seems data-only connection.');
            }

            connection.onstatechange({
                userid: _config.userid,
                extra: {},
                name: 'connecting-with-initiator',
                reason: 'Checking presence of the initiator; and the room.'
            });

            connection.socket.send({
                participant: true,
                channel: channel,
                targetUser: _config.userid,
                session: connection.session,
                offers: {
                    audio: !!offers.audio,
                    video: !!offers.video
                }
            });

            connection.skipOnNewSession = false;
            invokeMediaCaptured(connection);
        }

        // join existing session
        this.joinSession = function(_config) {
			if (!connection.socket) {
                return setTimeout(function() {
                    warn('Default-Socket is not yet initialized.');
                    signalingHandler.joinSession(_config);
                }, 1000);
            }

            _config = _config || {};
            participants = {};

            signalingHandler.presenceState = 'checking';

            connection.onstatechange({
                userid: _config.userid,
                extra: _config.extra || {},
                name: 'detecting-room-presence',
                reason: 'Checking presence of the room.'
            });

            function contactInitiator() {
                connection.socket.send({
                    messageFor: _config.userid,
                    presenceState: signalingHandler.presenceState,
                    _config: {
                        userid: _config.userid,
                        extra: _config.extra || {},
                        sessionid: _config.sessionid,
                        session: _config.session || false
                    }
                });
            }
            contactInitiator();

            function checker() {
                if (signalingHandler.presenceState === 'checking') {
                    warn('Unable to reach initiator. Trying again...');
                    contactInitiator();
                    setTimeout(function() {
                        if (signalingHandler.presenceState === 'checking') {
                            connection.onstatechange({
                                userid: _config.userid,
                                extra: _config.extra || {},
                                name: 'room-not-available',
                                reason: 'Initiator seems absent. Waiting for someone to open the room.'
                            });
                            if (!BizAPP.UI.Collaboration.sessionNotStartedMsgShown && !$('.bza-alrtCont.bza-alrtCont-info').length) {
                                BizAPP.UI.Collaboration.sessionNotStartedMsgShown = true;
                                debug("Session has not started. \nPlease wait for the host to arrive.[type]info", "exception");
                            }

                            connection.isAcceptNewSession = true;
                            setTimeout(checker, 2000);
                        }
                    }, 2000);
                }
            }

            setTimeout(checker, 3000);
        };

        connection.donotJoin = function(sessionid) {
            signalingHandler.donotJoin = sessionid;

            var session = connection.sessionDescriptions[sessionid];
            if (!session) {
                return;
            }

            connection.socket.send({
                donotJoin: true,
                messageFor: session.userid,
                sessionid: sessionid
            });

            participants = {};
            connection.isAcceptNewSession = true;
            connection.sessionid = null;
        };

        // send file/data or text message
        this.send = function(message, _channel) {
            if (!(message instanceof ArrayBuffer || message instanceof DataView)) {
                message = str2ab({
                    extra: connection.extra,
                    userid: connection.userid,
                    data: message
                });
            }

            if (_channel) {
                if (_channel.readyState === 'open') {
                    _channel.send(message);
                }
                return;
            }

            for (var dataChannel in connection.channels) {
                var channel = connection.channels[dataChannel].channel;
                if (channel.readyState === 'open') {
                    channel.send(message);
                }
            }
        };

        // leave session
        this.leave = function() {
            clearSession();
        };

        // renegotiate new stream
        this.addStream = function(e) {
            var session = e.renegotiate;

            if (!connection.renegotiatedSessions[JSON.stringify(e.renegotiate)]) {
                connection.renegotiatedSessions[JSON.stringify(e.renegotiate)] = {
                    session: e.renegotiate,
                    stream: e.stream
                };
            }

            if (e.socket) {
                if (e.socket.userid !== connection.userid) {
                    addStream(connection.peers[e.socket.userid]);
                }
            } else {
                for (var peer in connection.peers) {
                    if (peer !== connection.userid) {
                        addStream(connection.peers[peer]);
                    }
                }
            }

            function addStream(_peer) {
                var socket = _peer.socket;

                if (!socket) {
                    warn(_peer, 'doesn\'t has socket.');
                    return;
                }

                updateSocketForLocalStreams(socket);

                if (!_peer || !_peer.peer) {
                    throw 'No peer to renegotiate.';
                }

                var peer = _peer.peer;

                if (e.stream) {
                    peer.attachStreams = [e.stream];
                }

                // detaching old streams
                detachMediaStream(connection.detachStreams, peer.connection);

                if (e.stream && (session.audio || session.video || session.screen)) {
                    // removeStream is not yet implemented in Firefox
                    // if(isFirefox) peer.connection.removeStream(e.stream);

                    if (isChrome || (isFirefox && !peer.connection.getLocalStreams().length)) {
                        peer.addStream(e.stream);
                    }
                }

                // because Firefox has no support of renegotiation yet;
                // so both chrome and firefox should redial instead of renegotiate!
                if (isFirefox || _peer.userinfo.browser === 'firefox') {
                    if (connection.attachStreams[0] && connection.attachStreams[0] !== e.stream) {
                        connection.stopMediaStream(connection.attachStreams[0]);
                    }

                    connection.attachStreams = [e.stream].concat(connection.attachStreams);
                    if (_peer.connection) {
                        _peer.connection.close();
                    }
                    return _peer.redial();
                }

                peer.recreateOffer(session, function(sdp, streaminfo) {
                    sendsdp({
                        sdp: sdp,
                        socket: socket,
                        renegotiate: session,
                        labels: connection.detachStreams,
                        streaminfo: streaminfo
                    });
                    connection.detachStreams = [];
                });
            }
        };

        function acceptRequest(response) {
            if (!signalingHandler.requestsFrom) {
                signalingHandler.requestsFrom = {};
            }

            if (signalingHandler.requestsFrom[response.userid]) {
                return;
            }

            var obj = {
                userid: response.userid,
                extra: response.extra,
                channel: response.channel || response.userid,
                session: response.session || connection.session
            };

            // check how participant is willing to join
            if (response.offers) {
                if (response.offers.audio && response.offers.video) {
                    log('target user has both audio/video streams.');
                } else if (response.offers.audio && !response.offers.video) {
                    log('target user has only audio stream.');
                } else if (!response.offers.audio && response.offers.video) {
                    log('target user has only video stream.');
                } else {
                    log('target user has no stream; it seems one-way streaming or data-only connection.');
                }

                var mandatory = connection.sdpConstraints.mandatory;
                if (isNull(mandatory.OfferToReceiveAudio)) {
                    connection.sdpConstraints.mandatory.OfferToReceiveAudio = !!response.offers.audio;
                }
                if (isNull(mandatory.OfferToReceiveVideo)) {
                    connection.sdpConstraints.mandatory.OfferToReceiveVideo = !!response.offers.video;
                }

                log('target user\'s SDP has?', toStr(connection.sdpConstraints.mandatory));
            }

            signalingHandler.requestsFrom[response.userid] = obj;

            // www.RTCMultiConnection.org/docs/onRequest/
            if (connection.onRequest && connection.isInitiator) {
                connection.onRequest(obj);
            } else {
                _accept(obj);
            }
        }

        function _accept(e) {
            if (signalingHandler.captureUserMediaOnDemand) {
                signalingHandler.captureUserMediaOnDemand = false;
                connection.captureUserMedia(function() {
                    _accept(e);

                    invokeMediaCaptured(connection);
                });
                return;
            }

            log('accepting request from', e.userid);

            participants[e.userid] = e.userid;
            handlePeersNegotiation({
                isCreateOffer: true,
                userid: e.userid,
                channel: e.channel,
                extra: e.extra || {},
                session: e.session || connection.session
            });

            connection.socket.send({
                acceptedRequestOf: e.userid
            });
        }

        // www.RTCMultiConnection.org/docs/accept/
        connection.accept = function(e) {
            // for backward compatibility
            if (arguments.length > 1 && isString(arguments[0])) {
                e = {};
                if (arguments[0]) {
                    e.userid = arguments[0];
                }
                if (arguments[1]) {
                    e.extra = arguments[1];
                }
                if (arguments[2]) {
                    e.channel = arguments[2];
                }
            }

            connection.captureUserMedia(function() {
                _accept(e);
            });
        };

        var isSignalingHandlerDeleted = false;
        this.disconnect = function() {
            this.isOwnerLeaving = true;

            if (!connection.keepStreamsOpened) {
                for (var streamid in connection.localStreams) {
                    connection.localStreams[streamid].stop();
                }
                connection.localStreams = {};

                currentUserMediaRequest = {
                    streams: [],
                    mutex: false,
                    queueRequests: []
                };
            }

            if (connection.isInitiator) {
                connection.socket.send({
                    isDisconnectSockets: true
                });
            }

            connection.refresh();

            connection.socket = null;
            isSignalingHandlerDeleted = true;

            connection.ondisconnected({
                userid: connection.userid,
                extra: connection.extra,
                peer: connection.peers[connection.userid],
                isSocketsDisconnected: true
            });

            // if there is any peer still opened; close it.
            connection.close();

            window.removeEventListener('beforeunload', signalingHandler.leaveHandler);
            window.removeEventListener('keyup', signalingHandler.leaveHandler);

            log('Disconnected your sockets, peers, streams and everything except RTCMultiConnection object.');
        };
    }
    var webAudioMediaStreamSources = [];

    function convertToAudioStream(mediaStream) {
        if (!mediaStream) {
            throw 'MediaStream is mandatory.';
        }

        if (mediaStream.getVideoTracks && !mediaStream.getVideoTracks().length) {
            return mediaStream;
        }

        var context = new AudioContext();
        var mediaStreamSource = context.createMediaStreamSource(mediaStream);

        var destination = context.createMediaStreamDestination();
        mediaStreamSource.connect(destination);

        webAudioMediaStreamSources.push(mediaStreamSource);

        return destination.stream;
    }

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof window.InstallTrigger !== 'undefined';
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;
    var isIE = !!document.documentMode;

    var isPluginRTC = isSafari || isIE;

    var isMobileDevice = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

    // detect node-webkit
    var isNodeWebkit = !!(window.process && (typeof window.process === 'object') && window.process.versions && window.process.versions['node-webkit']);

    window.MediaStream = window.MediaStream || window.webkitMediaStream;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    function getRandomString() {
        // suggested by @rvulpescu from #154
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

    function isData(session) {
        return !session.audio && !session.video && !session.screen && session.data;
    }

    function isNull(obj) {
        return typeof obj === 'undefined';
    }

    function isString(obj) {
        return typeof obj === 'string';
    }

    function isEmpty(session) {
        var stringified = JSON.stringify(session);
        if (stringified === '{}' || !stringified.split(',').length) {
            return true;
        }
        return false;
    }

    // this method converts array-buffer into string
    function ab2str(buf) {
        var result = '';
        try {
            result = String.fromCharCode.apply(null, new Uint16Array(buf));
        } catch (e) {}
        return result;
    }

    // this method converts string into array-buffer
    function str2ab(str) {
        if (!isString(str)) {
            str = JSON.stringify(str);
        }

        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    function swap(arr) {
        var swapped = [],
            length = arr.length;
        for (var i = 0; i < length; i++) {
            if (arr[i] && arr[i] !== true) {
                swapped.push(arr[i]);
            }
        }
        return swapped;
    }

    function forEach(obj, callback) {
        for (var item in obj) {
            callback(obj[item], item);
        }
    }

    var console = window.console || {
        log: function() {},
        error: function() {},
        warn: function() {}
    };

    var log = function() {
        console.log(arguments);
    };

    var error = function() {
        console.error(arguments);
    };

    var warn = function() {
        console.warn(arguments);
    };

    if (isChrome || isFirefox || isSafari) {
        log = console.log.bind(console);
        error = console.error.bind(console);
        warn = console.warn.bind(console);
    }

    function toStr(obj) {
        return JSON.stringify(obj, function(key, value) {
            key = key;
            if (value && value.sdp && value.sdp.type) {
                log(value.sdp.type, '\t', value.sdp.sdp);
                return '';
            } else {
                return value;
            }
        }, '\t');
    }

    function getLength(obj) {
        if (typeof obj !== 'object') {
            throw 'Invalid data-type: ' + (typeof obj) + '; expected: object';
        }

        var stringified = JSON.stringify(obj);
        if (stringified === '{}' || !stringified.split(',').length) {
            return 0;
        }
        return stringified.split(',').length;
    }

    // Get HTMLAudioElement/HTMLVideoElement accordingly

    function createMediaElement(stream, session) {
        if (!stream.isAudio && stream.getVideoTracks && !stream.getVideoTracks().length) {
            stream.isAudio = true;
            session.video = session.screen = stream.isVideo = stream.isScreen = false;
        }

        if (stream.isAudio && stream.getAudioTracks && !stream.getAudioTracks().length) {
            session.audio = stream.isAudio = false;

            if (!stream.isScreen) {
                stream.isVideo = true;
            }
        }

        var mediaElement = document.createElement(stream.isAudio ? 'audio' : 'video');
        mediaElement.id = stream.streamid;

        if (isPluginRTC) {
            var body = (document.body || document.documentElement);
            body.insertBefore(mediaElement, body.firstChild);

            setTimeout(function() {
                Plugin.attachMediaStream(mediaElement, stream);
            }, 1000);

            return Plugin.attachMediaStream(mediaElement, stream);
        }

        // "mozSrcObject" is always preferred over "src"!!
        mediaElement[isFirefox ? 'mozSrcObject' : 'src'] = isFirefox ? stream : window.webkitURL.createObjectURL(stream);

        mediaElement.controls = true;
        mediaElement.autoplay = !!session.remote;
        mediaElement.muted = session.remote ? false : true;

        // http://goo.gl/WZ5nFl
        // Firefox don't yet support onended for any stream (remote/local)
        if (isFirefox) {
            mediaElement.addEventListener('ended', function() {
                stream.onended();
            }, false);
        }

        mediaElement.play();

        return mediaElement;
    }

    var onStreamEndedHandlerFiredFor = {};

    function onStreamEndedHandler(streamedObject, connection) {
        if (streamedObject.mediaElement && !streamedObject.mediaElement.parentNode) {
            return;
        }

        if (onStreamEndedHandlerFiredFor[streamedObject.streamid]) {
            return;
        }
        onStreamEndedHandlerFiredFor[streamedObject.streamid] = streamedObject;
        connection.onstreamended(streamedObject);
    }

    var onLeaveHandlerFiredFor = {};

    function onLeaveHandler(event, connection) {
        if (onLeaveHandlerFiredFor[event.userid]) {
            return;
        }
        onLeaveHandlerFiredFor[event.userid] = event;
        connection.onleave(event);

        connection.numberOfConnectedUsers--;
    }

    function takeSnapshot(args) {
        var userid = args.userid;
        var connection = args.connection;

        function dataURItoBlob(dataURI, dataTYPE) {
            var binary = atob(dataURI.split(',')[1]),
                array = [];

            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }

            return new Blob([new Uint8Array(array)], {
                type: dataTYPE
            });
        }

        function _takeSnapshot(video) {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || video.clientWidth;
            canvas.height = video.videoHeight || video.clientHeight;

            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            connection.snapshots[userid] = canvas.toDataURL('image/png');

            if (!args.callback) {
                return;
            }

            var blob = dataURItoBlob(connection.snapshots[userid], 'image/png');
            args.callback(connection.snapshots[userid], blob);
        }

        if (args.mediaElement) {
            return _takeSnapshot(args.mediaElement);
        }

        for (var stream in connection.streams) {
            stream = connection.streams[stream];
            if (stream.userid === userid && stream.stream && stream.stream.getVideoTracks && stream.stream.getVideoTracks().length) {
                _takeSnapshot(stream.mediaElement);
                continue;
            }
        }
    }

    function invokeMediaCaptured(connection) {
        // to let user know that media resource has been captured
        // now, he can share "sessionDescription" using sockets
        if (connection.onMediaCaptured) {
            connection.onMediaCaptured();
            delete connection.onMediaCaptured;
        }
    }

    function merge(mergein, mergeto) {
        if (!mergein) {
            mergein = {};
        }

        if (!mergeto) {
            return mergein;
        }

        for (var item in mergeto) {
            mergein[item] = mergeto[item];
        }
        return mergein;
    }

    function loadScript(src, onload) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            log('loaded resource:', src);
            if (onload) {
                onload();
            }
        };
        document.documentElement.appendChild(script);
    }

    function capturePartOfScreen(args) {
        var connection = args.connection;
        var element = args.element;

        if (!window.html2canvas) {
            return loadScript(connection.resources.html2canvas, function() {
                capturePartOfScreen(args);
            });
        }

        if (isString(element)) {
            element = document.querySelector(element);
            if (!element) {
                element = document.getElementById(element);
            }
        }
        if (!element) {
            throw 'HTML DOM Element is not accessible!';
        }

        // todo: store DOM element somewhere to minimize DOM querying issues

        // html2canvas.js is used to take screenshots
        window.html2canvas(element, {
            onrendered: function(canvas) {
                args.callback(canvas.toDataURL());
            }
        });
    }

    function initFileBufferReader(connection, callback) {
        if (!window.FileBufferReader) {
            loadScript(connection.resources.FileBufferReader, function() {
                initFileBufferReader(connection, callback);
            });
            return;
        }

        function _private(chunk) {
            chunk.userid = chunk.extra.userid;
            return chunk;
        }

        var fileBufferReader = new window.FileBufferReader();
        fileBufferReader.onProgress = function(chunk) {
            connection.onFileProgress(_private(chunk), chunk.uuid);
        };

        fileBufferReader.onBegin = function(file) {
            connection.onFileStart(_private(file));
        };

        fileBufferReader.onEnd = function(file) {
            connection.onFileEnd(_private(file));
        };

        callback(fileBufferReader);
    }

    var screenFrame, loadedScreenFrame;

    function loadScreenFrame(skip) {
        if (DetectRTC.screen.extensionid !== ReservedExtensionID) {
            return;
        }

        if (loadedScreenFrame) {
            return;
        }

        if (!skip) {
            return loadScreenFrame(true);
        }

        loadedScreenFrame = true;

        var iframe = document.createElement('iframe');
        iframe.onload = function() {
            iframe.isLoaded = true;
            log('Screen Capturing frame is loaded.');
        };
        iframe.src = document.location.origin + '/Resources/WebRTC/getScreenId.html'; //'https://www.webrtc-experiment.com/getSourceId/';
		//iframe.src = 'https://192.168.2.162/bizapp/resources/webrtc/getSourceId.html';
        iframe.style.display = 'none';
        (document.body || document.documentElement).appendChild(iframe);

        screenFrame = {
            postMessage: function() {
                if (!iframe.isLoaded) {
                    setTimeout(screenFrame.postMessage, 100);
                    return;
                }
                iframe.contentWindow.postMessage({
                    captureSourceId: true
                }, '*');
            }
        };
    }

    var loadedIceFrame;

    function loadIceFrame(callback, skip) {
        if (loadedIceFrame) {
            return;
        }
        if (!skip) {
            return loadIceFrame(callback, true);
        }

        loadedIceFrame = true;

        var iframe = document.createElement('iframe');
        iframe.onload = function() {
            iframe.isLoaded = true;

            listenEventHandler('message', iFrameLoaderCallback);

            function iFrameLoaderCallback(event) {
                if (!event.data || !event.data.iceServers) {
                    return;
                }
                callback(event.data.iceServers);

                // this event listener is no more needed
                window.removeEventListener('message', iFrameLoaderCallback);
            }

            iframe.contentWindow.postMessage('get-ice-servers', '*');
        };
        iframe.src = 'https://cdn.webrtc-experiment.com/getIceServers/';
        iframe.style.display = 'none';
        (document.body || document.documentElement).appendChild(iframe);
    }

    function muteOrUnmute(e) {
        var stream = e.stream,
            root = e.root,
            session = e.session || {},
            enabled = e.enabled;

        if (!session.audio && !session.video) {
            if (!isString(session)) {
                session = merge(session, {
                    audio: true,
                    video: true
                });
            } else {
                session = {
                    audio: true,
                    video: true
                };
            }
        }

        // implementation from #68
        if (session.type) {
            if (session.type === 'remote' && root.type !== 'remote') {
                return;
            }
            if (session.type === 'local' && root.type !== 'local') {
                return;
            }
        }

        log(enabled ? 'Muting' : 'UnMuting', 'session', toStr(session));

        // enable/disable audio/video tracks

        if (root.type === 'local' && session.audio && !!stream.getAudioTracks) {
            var audioTracks = stream.getAudioTracks()[0];
            if (audioTracks) {
                audioTracks.enabled = !enabled;
            }
        }

        if (root.type === 'local' && (session.video || session.screen) && !!stream.getVideoTracks) {
            var videoTracks = stream.getVideoTracks()[0];
            if (videoTracks) {
                videoTracks.enabled = !enabled;
            }
        }

        root.sockets.forEach(function(socket) {
            if (root.type === 'local') {
                socket.send2({
                    streamid: root.streamid,
                    mute: !!enabled,
                    unmute: !enabled,
                    session: session
                });
            }

            if (root.type === 'remote') {
                socket.send2({
                    promptMuteUnmute: true,
                    streamid: root.streamid,
                    mute: !!enabled,
                    unmute: !enabled,
                    session: session
                });
            }
        });

        if (root.type === 'remote') {
            return;
        }

        // According to issue #135, onmute/onumute must be fired for self
        // "fakeObject" is used because we need to keep session for renegotiated streams; 
        // and MUST pass exact session over onStreamEndedHandler/onmute/onhold/etc. events.
        var fakeObject = merge({}, root);
        fakeObject.session = session;

        fakeObject.isAudio = !!fakeObject.session.audio && !fakeObject.session.video;
        fakeObject.isVideo = !!fakeObject.session.video;
        fakeObject.isScreen = !!fakeObject.session.screen;

        if (!!enabled) {
            // if muted stream is negotiated
            stream.preMuted = {
                audio: stream.getAudioTracks().length && !stream.getAudioTracks()[0].enabled,
                video: stream.getVideoTracks().length && !stream.getVideoTracks()[0].enabled
            };
            root.rtcMultiConnection.onmute(fakeObject);
        }

        if (!enabled) {
            stream.preMuted = {};
            root.rtcMultiConnection.onunmute(fakeObject);
        }
    }

    var firefoxScreenCapturingWarning = 'Make sure that you are using Firefox Nightly and you enabled: media.getusermedia.screensharing.enabled flag from about:config page. You also need to add your domain in "media.getusermedia.screensharing.allowed_domains" flag. If you are using WinXP then also enable "media.getusermedia.screensharing.allow_on_old_platforms" flag. NEVER forget to use "only" HTTPs for screen capturing!';
    var SCREEN_COMMON_FAILURE = 'HTTPs i.e. SSL-based URI is mandatory to use screen capturing.';
    var ReservedExtensionID = 'ajhifddimkapgcifgcodmmfdlknahffk';

    // if application-developer deployed his own extension on Google App Store
    var useCustomChromeExtensionForScreenCapturing = document.domain.indexOf('webrtc-experiment.com') !== -1;

    var MediaStreamTrack = window.MediaStreamTrack;

    // if IE
    if (!window.addEventListener) {
        window.addEventListener = function(el, eventName, eventHandler) {
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

    function initHark(args, callback) {
        if (!window.hark) {
            loadScript(args.connection.resources.hark, function() {
                initHark(args);
            });
            return;
        }

        var connection = args.connection;

        callback(window.hark(args.stream, {
            onspeaking: function() {
                if (!connection.onspeaking) {
                    return;
                }
                connection.onspeaking(args.streamedObject);
            },
            onsilence: function() {
                if (!connection.onsilence) {
                    return;
                }
                connection.onsilence(args.streamedObject);
            },
            onvolumechange: function(volume, threshold) {
                if (!connection.onvolumechange) {
                    return;
                }
                connection.onvolumechange(merge({
                    volume: volume,
                    threshold: threshold
                }, args.streamedObject));
            }
        }));
    }

    window.attachEventListener = function(video, type, listener, useCapture) {
        video.addEventListener(type, listener, useCapture);
    };

    var Plugin = window.PluginRTC || {};
    window.onPluginRTCInitialized = function(pluginRTCObject) {
        Plugin = pluginRTCObject;
        MediaStreamTrack = Plugin.MediaStreamTrack;
        RTCPeerConnection = Plugin.RTCPeerConnection;
        RTCIceCandidate = Plugin.RTCIceCandidate;
        RTCSessionDescription = Plugin.RTCSessionDescription;

        log(isPluginRTC ? 'Java-Applet' : 'ActiveX', 'plugin has been loaded.');
    };
    if (!isEmpty(Plugin)) {
        window.onPluginRTCInitialized(Plugin);
    }

    // if IE or Safari
    if (isPluginRTC) {
        loadScript('https://cdn.webrtc-experiment.com/Plugin.EveryWhere.js');
        // loadScript('https://cdn.webrtc-experiment.com/Plugin.Temasys.js');
    }
    var defaultConstraints = {
        mandatory: {},
        optional: []
    };

    /* by @FreCap pull request #41 */
    var currentUserMediaRequest = {
        streams: [],
        mutex: false,
        queueRequests: []
    };

    function getUserMedia(options) {
        if (isPluginRTC) {
            if (!Plugin.getUserMedia) {
                setTimeout(function() {
                    getUserMedia(options);
                }, 1000);
                return;
            }

            return Plugin.getUserMedia(options.constraints || {
                audio: true,
                video: true
            }, options.onsuccess, options.onerror);
        }

        if (currentUserMediaRequest.mutex === true) {
            currentUserMediaRequest.queueRequests.push(options);
            return;
        }
        currentUserMediaRequest.mutex = true;

        var connection = options.connection;

        // tools.ietf.org/html/draft-alvestrand-constraints-resolution-00
        var mediaConstraints = options.mediaConstraints || {};
        var videoConstraints = typeof mediaConstraints.video === 'boolean' ? mediaConstraints.video : mediaConstraints.video || mediaConstraints;
        var audioConstraints = typeof mediaConstraints.audio === 'boolean' ? mediaConstraints.audio : mediaConstraints.audio || defaultConstraints;

        var n = navigator;
        var hints = options.constraints || {
            audio: defaultConstraints,
            video: defaultConstraints
        };

        if (hints.video && hints.video.mozMediaSource) {
            // "mozMediaSource" is redundant
            // need to check "mediaSource" instead.
            videoConstraints = {};
        }

        if (hints.video === true) {
            hints.video = defaultConstraints;
        }

        if (hints.audio === true) {
            hints.audio = defaultConstraints;
        }

        // connection.mediaConstraints.audio = false;
        if (typeof audioConstraints === 'boolean' && hints.audio) {
            hints.audio = audioConstraints;
        }

        // connection.mediaConstraints.video = false;
        if (typeof videoConstraints === 'boolean' && hints.video) {
            hints.video = videoConstraints;
        }

        // connection.mediaConstraints.audio.mandatory = {prop:true};
        var audioMandatoryConstraints = audioConstraints.mandatory;
        if (!isEmpty(audioMandatoryConstraints)) {
            hints.audio.mandatory = merge(hints.audio.mandatory, audioMandatoryConstraints);
        }

        if (hints.video !== false) {
            // connection.media.min(320,180);
            // connection.media.max(1920,1080);
            var videoMandatoryConstraints = videoConstraints.mandatory;
            if (videoMandatoryConstraints) {
                var mandatory = {};

                if (videoMandatoryConstraints.minWidth) {
                    mandatory.minWidth = videoMandatoryConstraints.minWidth;
                }

                if (videoMandatoryConstraints.minHeight) {
                    mandatory.minHeight = videoMandatoryConstraints.minHeight;
                }

                if (videoMandatoryConstraints.maxWidth) {
                    mandatory.maxWidth = videoMandatoryConstraints.maxWidth;
                }

                if (videoMandatoryConstraints.maxHeight) {
                    mandatory.maxHeight = videoMandatoryConstraints.maxHeight;
                }

                if (videoMandatoryConstraints.minAspectRatio) {
                    mandatory.minAspectRatio = videoMandatoryConstraints.minAspectRatio;
                }

                if (videoMandatoryConstraints.maxFrameRate) {
                    mandatory.maxFrameRate = videoMandatoryConstraints.maxFrameRate;
                }

                if (videoMandatoryConstraints.minFrameRate) {
                    mandatory.minFrameRate = videoMandatoryConstraints.minFrameRate;
                }

                if (mandatory.minWidth && mandatory.minHeight) {
                    // http://goo.gl/IZVYsj
                    var allowed = ['1920:1080', '1280:720', '960:720', '640:360', '640:480', '320:240', '320:180'];

                    if (allowed.indexOf(mandatory.minWidth + ':' + mandatory.minHeight) === -1 ||
                        allowed.indexOf(mandatory.maxWidth + ':' + mandatory.maxHeight) === -1) {
                        error('The min/max width/height constraints you passed "seems" NOT supported.', toStr(mandatory));
                    }

                    if (mandatory.minWidth > mandatory.maxWidth || mandatory.minHeight > mandatory.maxHeight) {
                        error('Minimum value must not exceed maximum value.', toStr(mandatory));
                    }

                    if (mandatory.minWidth >= 1280 && mandatory.minHeight >= 720) {
                        warn('Enjoy HD video! min/' + mandatory.minWidth + ':' + mandatory.minHeight + ', max/' + mandatory.maxWidth + ':' + mandatory.maxHeight);
                    }
                }

                hints.video.mandatory = merge(hints.video.mandatory, mandatory);
            }

            if (videoMandatoryConstraints) {
                hints.video.mandatory = merge(hints.video.mandatory, videoMandatoryConstraints);
            }

            // videoConstraints.optional = [{prop:true}];
            if (videoConstraints.optional && videoConstraints.optional instanceof Array && videoConstraints.optional.length) {
                hints.video.optional = hints.video.optional ? hints.video.optional.concat(videoConstraints.optional) : videoConstraints.optional;
            }

            if (hints.video.mandatory && !isEmpty(hints.video.mandatory) && connection._mediaSources.video) {
                hints.video.optional.forEach(function(video, index) {
                    if (video.sourceId === connection._mediaSources.video) {
                        delete hints.video.optional[index];
                    }
                });

                hints.video.optional = swap(hints.video.optional);

                hints.video.optional.push({
                    sourceId: connection._mediaSources.video
                });
            }

            if (hints.video && !hints.video.mozMediaSource && hints.video.optional && hints.video.mandatory) {
                if (!hints.video.optional.length && isEmpty(hints.video.mandatory)) {
                    hints.video = true;
                }
            }
        }

        // audioConstraints.optional = [{prop:true}];
        if (audioConstraints.optional && audioConstraints.optional instanceof Array && audioConstraints.optional.length) {
            hints.audio.optional = hints.audio.optional ? hints.audio.optional.concat(audioConstraints.optional) : audioConstraints.optional;
        }

        if (hints.audio.mandatory && !isEmpty(hints.audio.mandatory) && connection._mediaSources.audio) {
            hints.audio.optional.forEach(function(audio, index) {
                if (audio.sourceId === connection._mediaSources.audio) {
                    delete hints.audio.optional[index];
                }
            });

            hints.audio.optional = swap(hints.audio.optional);

            hints.audio.optional.push({
                sourceId: connection._mediaSources.audio
            });
        }

        if (isMobileDevice) {
            // Android fails for some constraints
            // so need to force {audio:true,video:true}
            hints = {
                audio: !!hints.audio,
                video: !!hints.video
            };
        }

        // connection.mediaConstraints always overrides constraints
        // passed from "captureUserMedia" function.
        // todo: need to verify all possible situations
        log('invoked getUserMedia with constraints:', toStr(hints));

        // easy way to match 
        var idInstance = JSON.stringify(hints);

        function streaming(stream, returnBack, streamid) {
            if (!streamid) {
                streamid = getRandomString();
            }

            // localStreams object will store stream
            // until it is removed using native-stop method.
            connection.localStreams[streamid] = stream;

            var video = options.video;
            if (video) {
                video[isFirefox ? 'mozSrcObject' : 'src'] = isFirefox ? stream : window.webkitURL.createObjectURL(stream);
                video.play();
            }

            options.onsuccess(stream, returnBack, idInstance, streamid);
            currentUserMediaRequest.streams[idInstance] = {
                stream: stream,
                streamid: streamid
            };
            currentUserMediaRequest.mutex = false;

            if (currentUserMediaRequest.queueRequests.length) {
                getUserMedia(currentUserMediaRequest.queueRequests.shift());
            }
        }

        if (currentUserMediaRequest.streams[idInstance]) {
            streaming(currentUserMediaRequest.streams[idInstance].stream, true, currentUserMediaRequest.streams[idInstance].streamid);
        } else {
            n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia;

            // http://goo.gl/eETIK4
            n.getMedia(hints, streaming, function(error) {
                options.onerror(error, hints);
            });
        }
    }
    var RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
    var RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;

    function RTCPeerConnectionHandler() {
        return {
            create: function(type, options) {
                merge(this, options);

                var self = this;

                this.type = type;
                this.init();
                this.attachMediaStreams();

                if (isFirefox && this.session.data) {
                    if (this.session.data && type === 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.session.data && type === 'answer') {
                        this.createDataChannel();
                    }
                } else {
                    self.getLocalDescription(type);
                }

                return this;
            },
            getLocalDescription: function(createType) {
                log('(getLocalDescription) peer createType is', createType);

                if (this.session.inactive && isNull(this.rtcMultiConnection.waitUntilRemoteStreamStartsFlowing)) {
                    // inactive session returns blank-stream
                    this.rtcMultiConnection.waitUntilRemoteStreamStartsFlowing = false;
                }

                var self = this;

                if (createType === 'answer') {
                    this.setRemoteDescription(this.offerDescription, createDescription);
                } else {
                    createDescription();
                }

                function createDescription() {
                    self.connection[createType === 'offer' ? 'createOffer' : 'createAnswer'](function(sessionDescription) {
                        sessionDescription.sdp = self.serializeSdp(sessionDescription.sdp, createType);
                        self.connection.setLocalDescription(sessionDescription);

                        if (self.trickleIce) {
                            self.onSessionDescription(sessionDescription, self.streaminfo);
                        }

                        if (sessionDescription.type === 'offer') {
                            log('offer sdp', sessionDescription.sdp);
                        }

                        self.prevCreateType = createType;
                    }, self.onSdpError, self.constraints);
                }
            },
            serializeSdp: function(sdp, createType) {
                // it is "connection.processSdp=function(sdp){return sdp;}"
                sdp = this.processSdp(sdp);

                if (isFirefox) {
                    return sdp;
                }

                if (this.session.inactive && !this.holdMLine) {
                    this.hold = true;
                    if ((this.session.screen || this.session.video) && this.session.audio) {
                        this.holdMLine = 'both';
                    } else if (this.session.screen || this.session.video) {
                        this.holdMLine = 'video';
                    } else if (this.session.audio) {
                        this.holdMLine = 'audio';
                    }
                }

                sdp = this.setBandwidth(sdp);
                if (this.holdMLine === 'both') {
                    if (this.hold) {
                        this.prevSDP = sdp;
                        sdp = sdp.replace(/a=sendonly|a=recvonly|a=sendrecv/g, 'a=inactive');
                    } else if (this.prevSDP) {
                        if (!this.session.inactive) {
                            // it means that DTSL key exchange already happened for single or multiple media lines.
                            // this block checks, key-exchange must be happened for all media lines.
                            sdp = this.prevSDP;

                            // todo: test it: makes sense?
                            if (chromeVersion <= 35) {
                                return sdp;
                            }
                        }
                    }
                } else if (this.holdMLine === 'audio' || this.holdMLine === 'video') {
                    sdp = sdp.split('m=');

                    var audio = '';
                    var video = '';

                    if (sdp[1] && sdp[1].indexOf('audio') === 0) {
                        audio = 'm=' + sdp[1];
                    }
                    if (sdp[2] && sdp[2].indexOf('audio') === 0) {
                        audio = 'm=' + sdp[2];
                    }

                    if (sdp[1] && sdp[1].indexOf('video') === 0) {
                        video = 'm=' + sdp[1];
                    }
                    if (sdp[2] && sdp[2].indexOf('video') === 0) {
                        video = 'm=' + sdp[2];
                    }

                    if (this.holdMLine === 'audio') {
                        if (this.hold) {
                            this.prevSDP = sdp[0] + audio + video;
                            sdp = sdp[0] + audio.replace(/a=sendonly|a=recvonly|a=sendrecv/g, 'a=inactive') + video;
                        } else if (this.prevSDP) {
                            sdp = this.prevSDP;
                        }
                    }

                    if (this.holdMLine === 'video') {
                        if (this.hold) {
                            this.prevSDP = sdp[0] + audio + video;
                            sdp = sdp[0] + audio + video.replace(/a=sendonly|a=recvonly|a=sendrecv/g, 'a=inactive');
                        } else if (this.prevSDP) {
                            sdp = this.prevSDP;
                        }
                    }
                }

                if (!this.hold && this.session.inactive) {
                    // transport.cc&l=852 - http://goo.gl/0FxxqG
                    // dtlstransport.h&l=234 - http://goo.gl/7E4sYF
                    // http://tools.ietf.org/html/rfc4340

                    // From RFC 4145, SDP setup attribute values.
                    // http://goo.gl/xETJEp && http://goo.gl/3Wgcau
                    if (createType === 'offer') {
                        sdp = sdp.replace(/a=setup:passive|a=setup:active|a=setup:holdconn/g, 'a=setup:actpass');
                    } else {
                        sdp = sdp.replace(/a=setup:actpass|a=setup:passive|a=setup:holdconn/g, 'a=setup:active');
                    }

                    // whilst doing handshake, either media lines were "inactive"
                    // or no media lines were present
                    sdp = sdp.replace(/a=inactive/g, 'a=sendrecv');
                }
                // this.session.inactive = false;
                return sdp;
            },
            init: function() {
                this.setConstraints();
                this.connection = new RTCPeerConnection(this.rtcConfiguration, this.optionalArgument);

                if (this.session.data) {
                    log('invoked: createDataChannel');
                    this.createDataChannel();
                }

                this.connection.onicecandidate = function(event) {
                    if (!event.candidate) {
                        if (!self.trickleIce) {
                            returnSDP();
                        }

                        return;
                    }

                    if (!self.trickleIce) {
                        return;
                    }

                    self.onicecandidate(event.candidate);
                };

                function returnSDP() {
                    if (self.returnedSDP) {
                        self.returnedSDP = false;
                        return;
                    }
                    self.returnedSDP = true;

                    self.onSessionDescription(self.connection.localDescription, self.streaminfo);
                }

                this.connection.onaddstream = function(e) {
                    log('onaddstream', isPluginRTC ? e.stream : toStr(e.stream));

                    self.onaddstream(e.stream, self.session);
                };

                this.connection.onremovestream = function(e) {
                    self.onremovestream(e.stream);
                };

                this.connection.onsignalingstatechange = function() {
                    if (!self.connection) {
                        return;
                    }
                    self.oniceconnectionstatechange({
                        iceConnectionState: self.connection.iceConnectionState,
                        iceGatheringState: self.connection.iceGatheringState,
                        signalingState: self.connection.signalingState
                    });
                };

                this.connection.oniceconnectionstatechange = function() {
                    if (!self.connection) {
                        return;
                    }
                    self.oniceconnectionstatechange({
                        iceConnectionState: self.connection.iceConnectionState,
                        iceGatheringState: self.connection.iceGatheringState,
                        signalingState: self.connection.signalingState
                    });

                    if (self.trickleIce) {
                        return;
                    }

                    if (self.connection.iceGatheringState === 'complete') {
                        log('iceGatheringState', self.connection.iceGatheringState);
                        returnSDP();
                    }
                };

                var self = this;
            },
            setBandwidth: function(sdp) {
                if (isMobileDevice || isFirefox || !this.bandwidth) {
                    return sdp;
                }

                var bandwidth = this.bandwidth;

                if (this.session.screen) {
                    if (!bandwidth.screen) {
                        warn('It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.');
                    } else if (bandwidth.screen < 300) {
                        warn('It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.');
                    }
                }

                // if screen; must use at least 300kbs
                if (bandwidth.screen && this.session.screen) {
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
                    sdp = sdp.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + (this.session.screen ? bandwidth.screen : bandwidth.video) + '\r\n');
                }

                if (bandwidth.data && !this.preferSCTP) {
                    sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:' + bandwidth.data + '\r\n');
                }

                return sdp;
            },
            setConstraints: function() {
                this.constraints = {
                    optional: this.sdpConstraints.optional || isChrome ? [{
                        VoiceActivityDetection: false
                    }] : [],
                    mandatory: this.sdpConstraints.mandatory || {
                        OfferToReceiveAudio: !!this.session.audio,
                        OfferToReceiveVideo: !!this.session.video || !!this.session.screen
                    }
                };

                log('sdp-constraints', toStr(this.constraints));

                this.optionalArgument = {
                    optional: this.optionalArgument.optional || [],
                    mandatory: this.optionalArgument.mandatory || {}
                };

                if (!this.preferSCTP) {
                    this.optionalArgument.optional.push({
                        RtpDataChannels: true
                    });
                }

                log('optional-argument', toStr(this.optionalArgument));

                if (!isNull(this.rtcConfiguration) && !isNull(this.iceServers)) {
                    var iceCandidates = this.rtcMultiConnection.candidates;

                    var stun = iceCandidates.stun;
                    var turn = iceCandidates.turn;
                    var host = iceCandidates.host;

                    if (!isNull(iceCandidates.reflexive)) {
                        stun = iceCandidates.reflexive;
                    }
                    if (!isNull(iceCandidates.relay)) {
                        turn = iceCandidates.relay;
                    }

                    if (!host && !stun && turn) {
                        this.rtcConfiguration.iceTransports = 'relay';
                    } else if (!host && !stun && !turn) {
                        this.rtcConfiguration.iceTransports = 'none';
                    }

                    this.rtcConfiguration = {
                        iceServers: this.iceServers,
                        iceTransports: this.rtcConfiguration.iceTransports
                    };
                } else {
                    this.rtcConfiguration = null;
                }

                log('rtc-configuration', toStr(this.rtcConfiguration));
            },
            onSdpError: function(e) {
                var message = toStr(e);

                if (message && message.indexOf('RTP/SAVPF Expects at least 4 fields') !== -1) {
                    message = 'It seems that you are trying to interop RTP-datachannels with SCTP. It is not supported!';
                }
                error('onSdpError:', message);
            },
            onSdpSuccess: function() {
                log('sdp success');
            },
            onMediaError: function(err) {
                error(toStr(err));
            },
            setRemoteDescription: function(sessionDescription, onSdpSuccess) {
                if (!sessionDescription) {
                    throw 'Remote session description should NOT be NULL.';
                }

                if (!this.connection) {
                    return;
                }

                log('setting remote description', sessionDescription.type, sessionDescription.sdp);

                var self = this;
                this.connection.setRemoteDescription(
                    new RTCSessionDescription(sessionDescription),
                    onSdpSuccess || this.onSdpSuccess,
                    function(error) {
                        if (error.search(/STATE_SENTINITIATE|STATE_INPROGRESS/gi) === -1) {
                            self.onSdpError(error);
                        }
                    }
                );
            },
            addIceCandidate: function(candidate) {
                var self = this;
                if (isPluginRTC) {
                    new RTCIceCandidate(candidate, function(iceCandidate) {
                        onAddIceCandidate(iceCandidate);
                    });
                } else {
                    onAddIceCandidate(new RTCIceCandidate(candidate));
                }

                function onAddIceCandidate(iceCandidate) {
                    if (!self.connection) {
                        return;
                    }

                    self.connection.addIceCandidate(iceCandidate, function() {
                        log('added:', candidate.sdpMid, candidate.candidate);
                    }, function() {
                        error('onIceFailure', arguments, candidate.candidate);
                    });
                }
            },
            createDataChannel: function(channelIdentifier) {
                // skip 2nd invocation of createDataChannel
                if (this.channels && this.channels.length) {
                    return;
                }

                var self = this;

                if (!this.channels) {
                    this.channels = [];
                }

                // protocol: 'text/chat', preset: true, stream: 16
                // maxRetransmits:0 && ordered:false && outOfOrderAllowed: false
                var dataChannelDict = {};

                if (this.dataChannelDict) {
                    dataChannelDict = this.dataChannelDict;
                }

                if (isChrome && !this.preferSCTP) {
                    dataChannelDict.reliable = false; // Deprecated!
                }

                log('dataChannelDict', toStr(dataChannelDict));

                if (this.type === 'answer' || isFirefox) {
                    this.connection.ondatachannel = function(event) {
                        self.setChannelEvents(event.channel);
                    };
                }

                if ((isChrome && this.type === 'offer') || isFirefox) {
                    this.setChannelEvents(
                        this.connection.createDataChannel(channelIdentifier || 'channel', dataChannelDict)
                    );
                }
            },
            setChannelEvents: function(channel) {
                var self = this;

                channel.binaryType = 'arraybuffer';

                if (this.dataChannelDict.binaryType) {
                    channel.binaryType = this.dataChannelDict.binaryType;
                }

                channel.onmessage = function(event) {
                    self.onmessage(event.data);
                };

                var numberOfTimes = 0;
                channel.onopen = function() {
                    channel.push = channel.send;
                    channel.send = function(data) {
                        if (self.connection.iceConnectionState === 'disconnected') {
                            return;
                        }

                        if (channel.readyState.search(/closing|closed/g) !== -1) {
                            return;
                        }

                        if (channel.readyState.search(/connecting|open/g) === -1) {
                            return;
                        }

                        if (channel.readyState === 'connecting') {
                            numberOfTimes++;
                            return setTimeout(function() {
                                if (numberOfTimes < 20) {
                                    channel.send(data);
                                } else {
                                    throw 'Number of times exceeded to wait for WebRTC data connection to be opened.';
                                }
                            }, 1000);
                        }
                        try {
                            channel.push(data);
                        } catch (e) {
                            numberOfTimes++;
                            warn('Data transmission failed. Re-transmitting..', numberOfTimes, toStr(e));
                            if (numberOfTimes >= 20) {
                                throw 'Number of times exceeded to resend data packets over WebRTC data channels.';
                            }
                            setTimeout(function() {
                                channel.send(data);
                            }, 100);
                        }
                    };
                    self.onopen(channel);
                };

                channel.onerror = function(event) {
                    self.onerror(event);
                };

                channel.onclose = function(event) {
                    self.onclose(event);
                };

                this.channels.push(channel);
            },
            addStream: function(stream) {
                if (!stream.streamid && !isIE) {
                    stream.streamid = getRandomString();
                }

                // todo: maybe need to add isAudio/isVideo/isScreen if missing?

                log('attaching stream:', stream.streamid, isPluginRTC ? stream : toStr(stream));

                this.connection.addStream(stream);

                this.sendStreamId(stream);
                this.getStreamInfo();
            },
            attachMediaStreams: function() {
                var streams = this.attachStreams;

                if (isFirefox) {
                    if (streams[0]) {
                        this.addStream(streams[0]);
                    }
                    return;
                }

                for (var i = 0; i < streams.length; i++) {
                    this.addStream(streams[i]);
                }
            },
            getStreamInfo: function() {
                this.streaminfo = '';
                var streams = this.connection.getLocalStreams();
                for (var i = 0; i < streams.length; i++) {
                    if (i === 0) {
                        this.streaminfo = JSON.stringify({
                            streamid: streams[i].streamid || '',
                            isScreen: !!streams[i].isScreen,
                            isAudio: !!streams[i].isAudio,
                            isVideo: !!streams[i].isVideo,
                            preMuted: streams[i].preMuted || {}
                        });
                    } else {
                        this.streaminfo += '----' + JSON.stringify({
                            streamid: streams[i].streamid || '',
                            isScreen: !!streams[i].isScreen,
                            isAudio: !!streams[i].isAudio,
                            isVideo: !!streams[i].isVideo,
                            preMuted: streams[i].preMuted || {}
                        });
                    }
                }
            },
            recreateOffer: function(renegotiate, callback) {
                // if(isFirefox) this.create(this.type, this);

                log('recreating offer');

                this.type = 'offer';
                this.renegotiate = true;
                this.session = renegotiate;

                // todo: make sure this doesn't affect renegotiation scenarios
                // this.setConstraints();

                this.onSessionDescription = callback;
                this.getStreamInfo();

                // one can renegotiate data connection in existing audio/video/screen connection!
                if (this.session.data) {
                    this.createDataChannel();
                }

                this.getLocalDescription('offer');
            },
            recreateAnswer: function(sdp, session, callback) {
                // if(isFirefox) this.create(this.type, this);

                log('recreating answer');

                this.type = 'answer';
                this.renegotiate = true;
                this.session = session;

                // todo: make sure this doesn't affect renegotiation scenarios
                // this.setConstraints();

                this.onSessionDescription = callback;
                this.offerDescription = sdp;
                this.getStreamInfo();

                // one can renegotiate data connection in existing audio/video/screen connection!
                if (this.session.data) {
                    this.createDataChannel();
                }

                this.getLocalDescription('answer');
            }
        };
    }
    var FileSaver = {
        SaveToDisk: function(fileUrl, fileName) {
            var hyperlink = document.createElement('a');
            hyperlink.href = fileUrl;
            hyperlink.target = '_blank';
            hyperlink.download = fileName || fileUrl;

            var mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            hyperlink.dispatchEvent(mouseEvent);

            // (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
        }
    };

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

                if (message.preRecordedMediaChunk) {
                    if (!connection.preRecordedMedias[message.streamerid]) {
                        connection.shareMediaFile(null, null, message.streamerid);
                    }
                    connection.preRecordedMedias[message.streamerid].onData(message.chunk);
                } else if (connection.autoTranslateText) {
                    e.original = e.data;
                    connection.Translator.TranslateText(e.data, function(translatedText) {
                        e.data = translatedText;
                        connection.onmessage(e);
                    });
                } else if (message.isPartOfScreen) {
                    connection.onpartofscreen(message);
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
    var TextSender = {
        send: function(config) {
            var connection = config.connection;

            if (config.text instanceof ArrayBuffer || config.text instanceof DataView) {
                return config.channel.send(config.text, config._channel);
            }

            var channel = config.channel,
                _channel = config._channel,
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

                channel.send(data, _channel);

                textToTransfer = text.slice(data.message.length);

                if (textToTransfer.length) {
                    setTimeout(function() {
                        sendText(null, textToTransfer);
                    }, connection.chunkInterval || 100);
                }
            }
        }
    };
    // http://goo.gl/6ScAV9
    var DetectRTC = {};

    (function() {

        DetectRTC.hasMicrophone = false;
        DetectRTC.hasSpeakers = false;
        DetectRTC.hasWebcam = false;

        DetectRTC.MediaDevices = [];

        // http://goo.gl/UVQRKk
        // todo: switch to enumerateDevices when landed in canary.
        function CheckDeviceSupport(callback) {
            // This method is useful only for Chrome!

            // Firefox seems having no support of enumerateDevices feature yet.
            if ((isPluginRTC || isFirefox) && callback) {
                callback();
                return;
            }

            // if "getSources" is available; prefer it over "getMediaDevices"
            if (MediaStreamTrack && MediaStreamTrack.getSources) {
                navigator.getMediaDevices = MediaStreamTrack.getSources.bind(MediaStreamTrack);
            }

            // if still no "getMediaDevices"; it MUST be Firefox!
            if (!navigator.getMediaDevices) {
                log('navigator.getMediaDevices is undefined.');
                // assuming that it is older chrome or chromium implementation
                if (isChrome) {
                    DetectRTC.hasMicrophone = true;
                    DetectRTC.hasSpeakers = true;
                    DetectRTC.hasWebcam = true;
                }

                if (callback) {
                    callback();
                }
                return;
            }

            navigator.getMediaDevices(function(devices) {
                DetectRTC.MediaDevices = [];
                devices.forEach(function(device) {
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

                    DetectRTC.MediaDevices.push(device);

                    if (device.kind === 'audioinput' || device.kind === 'audio') {
                        DetectRTC.hasMicrophone = true;
                    }

                    if (device.kind === 'audiooutput') {
                        DetectRTC.hasSpeakers = true;
                    }

                    if (device.kind === 'videoinput' || device.kind === 'video') {
                        DetectRTC.hasWebcam = true;
                    }

                    // there is no "videoouput" in the spec.
                });

                if (callback) {
                    callback();
                }
            });
        }

        DetectRTC.isWebRTCSupported = !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection;
        DetectRTC.isAudioContextSupported = (!!window.AudioContext || !!window.webkitAudioContext) && !!AudioContext.prototype.createMediaStreamSource;
        DetectRTC.isScreenCapturingSupported = (isFirefox && firefoxVersion >= 33 && location.protocol === 'https:') || (isChrome && chromeVersion >= 26 && (isNodeWebkit ? true : location.protocol === 'https:'));

        DetectRTC.isSctpDataChannelsSupported = !!navigator.mozGetUserMedia || (isChrome && chromeVersion >= 25);
        DetectRTC.isRtpDataChannelsSupported = isChrome && chromeVersion >= 31;

        // check for microphone/camera support!
        new CheckDeviceSupport();
        DetectRTC.load = CheckDeviceSupport;

        var screenCallback;

        DetectRTC.screen = {
            chromeMediaSource: 'screen',
            extensionid: ReservedExtensionID,
            getSourceId: function(callback) {
                if (!callback) {
                    throw '"callback" parameter is mandatory.';
                }

                // make sure that chrome extension is installed.
                if (!!DetectRTC.screen.status) {
                    onstatus(DetectRTC.screen.status);
                } else {
                    DetectRTC.screen.getChromeExtensionStatus(onstatus);
                }

                function onstatus(status) {
                    if (status === 'installed-enabled') {
                        screenCallback = callback;
                        window.postMessage('get-sourceId', '*');
                        return;
                    }

                    DetectRTC.screen.chromeMediaSource = 'screen';
                    callback('No-Response'); // chrome extension isn't available
                }
            },
            onMessageCallback: function(data) {
                if (!(isString(data) || !!data.sourceId)) {
                    return;
                }

                log('chrome message', data);

                // "cancel" button is clicked
                if (data === 'PermissionDeniedError') {
                    DetectRTC.screen.chromeMediaSource = 'PermissionDeniedError';
                    if (screenCallback) {
                        return screenCallback('PermissionDeniedError');
                    } else {
                        throw new Error('PermissionDeniedError');
                    }
                }

                // extension notified his presence
                if (data === 'rtcmulticonnection-extension-loaded') {
                    DetectRTC.screen.chromeMediaSource = 'desktop';
                    if (DetectRTC.screen.onScreenCapturingExtensionAvailable) {
                        DetectRTC.screen.onScreenCapturingExtensionAvailable();

                        // make sure that this event isn't fired multiple times
                        DetectRTC.screen.onScreenCapturingExtensionAvailable = null;
                    }
                }

                // extension shared temp sourceId
                if (data.sourceId) {
                    DetectRTC.screen.sourceId = data.sourceId;
                    if (screenCallback) {
                        screenCallback(DetectRTC.screen.sourceId);
                    }
                }
            },
            getChromeExtensionStatus: function(extensionid, callback) {
                function _callback(status) {
                    DetectRTC.screen.status = status;
                    callback(status);
                }

                if (isFirefox) {
                    return _callback('not-chrome');
                }

                if (arguments.length !== 2) {
                    callback = extensionid;
                    extensionid = this.extensionid;
                }

                var image = document.createElement('img');
                image.src = 'chrome-extension://' + extensionid + '/icon.png';
                image.onload = function() {
                    DetectRTC.screen.chromeMediaSource = 'screen';
                    window.postMessage('are-you-there', '*');
                    setTimeout(function() {
                        if (DetectRTC.screen.chromeMediaSource === 'screen') {
                            _callback(
                                DetectRTC.screen.chromeMediaSource === 'desktop' ? 'installed-enabled' : 'installed-disabled' /* if chrome extension isn't permitted for current domain, then it will be installed-disabled all the time even if extension is enabled. */
                            );
                        } else {
                            _callback('installed-enabled');
                        }
                    }, 2000);
                };
                image.onerror = function() {
                    _callback('not-installed');
                };
            }
        };
    })();

    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) {
            return;
        }

        DetectRTC.screen.onMessageCallback(event.data);
    });
})();
