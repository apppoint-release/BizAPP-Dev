var deployJava={debug:null,firefoxJavaVersion:null,myInterval:null,preInstallJREList:null,returnPage:null,brand:null,locale:null,installType:null,EAInstallEnabled:false,EarlyAccessURL:null,getJavaURL:"http://java.sun.com/webapps/getjava/BrowserRedirect?host=java.com",appleRedirectPage:"http://www.apple.com/support/downloads/",oldMimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",mimeType:"application/java-deployment-toolkit",launchButtonPNG:"http://java.sun.com/products/jfc/tsc/articles/swing2d/webstart.png",browserName:null,browserName2:null,getJREs:function(){var e=new Array();if(deployJava.isPluginInstalled()){var d=deployJava.getPlugin();var a=d.jvms;for(var c=0;c<a.getLength();c++){e[c]=a.get(c).version}}else{var b=deployJava.getBrowser();if(b=="MSIE"){if(deployJava.testUsingActiveX("1.7.0")){e[0]="1.7.0"}else{if(deployJava.testUsingActiveX("1.6.0")){e[0]="1.6.0"}else{if(deployJava.testUsingActiveX("1.5.0")){e[0]="1.5.0"}else{if(deployJava.testUsingActiveX("1.4.2")){e[0]="1.4.2"}else{if(deployJava.testForMSVM()){e[0]="1.1"}}}}}}else{if(b=="Netscape Family"){deployJava.getJPIVersionUsingMimeType();if(deployJava.firefoxJavaVersion!=null){e[0]=deployJava.firefoxJavaVersion}else{if(deployJava.testUsingMimeTypes("1.7")){e[0]="1.7.0"}else{if(deployJava.testUsingMimeTypes("1.6")){e[0]="1.6.0"}else{if(deployJava.testUsingMimeTypes("1.5")){e[0]="1.5.0"}else{if(deployJava.testUsingMimeTypes("1.4.2")){e[0]="1.4.2"}else{if(deployJava.browserName2=="Safari"){if(deployJava.testUsingPluginsArray("1.7.0")){e[0]="1.7.0"}else{if(deployJava.testUsingPluginsArray("1.6")){e[0]="1.6.0"}else{if(deployJava.testUsingPluginsArray("1.5")){e[0]="1.5.0"}else{if(deployJava.testUsingPluginsArray("1.4.2")){e[0]="1.4.2"}}}}}}}}}}}}}if(deployJava.debug){for(var c=0;c<e.length;++c){alert("We claim to have detected Java SE "+e[c])}}return e},installJRE:function(b){var a=false;if(deployJava.isPluginInstalled()){if(deployJava.getPlugin().installJRE(b)){deployJava.refresh();if(deployJava.returnPage!=null){document.location=deployJava.returnPage}return true}else{return false}}else{return deployJava.installLatestJRE()}},installLatestJRE:function(){if(deployJava.isPluginInstalled()){if(deployJava.getPlugin().installLatestJRE()){deployJava.refresh();if(deployJava.returnPage!=null){document.location=deployJava.returnPage}return true}else{return false}}else{var b=deployJava.getBrowser();var a=navigator.platform.toLowerCase();if((deployJava.EAInstallEnabled=="true")&&(a.indexOf("win")!=-1)&&(deployJava.EarlyAccessURL!=null)){deployJava.preInstallJREList=deployJava.getJREs();if(deployJava.returnPage!=null){deployJava.myInterval=setInterval("deployJava.poll()",3000)}location.href=deployJava.EarlyAccessURL;return false}else{if(b=="MSIE"){return deployJava.IEInstall()}else{if((b=="Netscape Family")&&(a.indexOf("win32")!=-1)){return deployJava.FFInstall()}else{location.href=deployJava.getJavaURL+((deployJava.returnPage!=null)?("&returnPage="+deployJava.returnPage):"")+((deployJava.locale!=null)?("&locale="+deployJava.locale):"")+((deployJava.brand!=null)?("&brand="+deployJava.brand):"")}}return false}}},runApplet:function(b,f,d){if(d=="undefined"||d==null){d="1.1"}var e="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var a=d.match(e);if(deployJava.returnPage==null){deployJava.returnPage=document.location}if(a!=null){var c=deployJava.getBrowser();if((c!="?")&&("Safari"!=deployJava.browserName2)){if(deployJava.versionCheck(d+"+")){deployJava.writeAppletTag(b,f)}else{if(deployJava.installJRE(d+"+")){deployJava.refresh();location.href=document.location;deployJava.writeAppletTag(b,f)}}}else{deployJava.writeAppletTag(b,f)}}else{if(deployJava.debug){alert("Invalid minimumVersion argument to runApplet():"+d)}}},writeAppletTag:function(a,f){var d="<applet ";var c=false;for(var e in a){d+=(" "+e+'="'+a[e]+'"');if(e=="code"){c=true}}if(!c){d+=(' code="dummy"')}d+=">";document.write(d);if(f!="undefined"&&f!=null){var b=false;for(var g in f){if(g=="codebase_lookup"){b=true}d='<param name="'+g+'" value="'+f[g]+'">';document.write(d)}if(!b){document.write('<param name="codebase_lookup" value="false">')}}document.write("</applet>")},versionCheck:function(h){var c=0;var f="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$";var a=h.match(f);if(a!=null){var e=true;var b=new Array();for(var d=1;d<a.length;++d){if((typeof a[d]=="string")&&(a[d]!="")){b[c]=a[d];c++}}if(b[b.length-1]=="+"){e=false;b.length--}else{if(b[b.length-1]=="*"){b.length--}}var g=deployJava.getJREs();for(var d=0;d<g.length;++d){if(deployJava.compareVersionToPattern(g[d],b,e)){return true}}return false}else{alert("Invalid versionPattern passed to versionCheck: "+h);return false}},isWebStartInstalled:function(d){var c=deployJava.getBrowser();if((c=="?")||("Safari"==deployJava.browserName2)){return true}if(d=="undefined"||d==null){d="1.4.2"}var b=false;var e="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var a=d.match(e);if(a!=null){b=deployJava.versionCheck(d+"+")}else{if(deployJava.debug){alert("Invalid minimumVersion argument to isWebStartInstalled(): "+d)}b=deployJava.versionCheck("1.4.2+")}return b},getJPIVersionUsingMimeType:function(){for(var b=0;b<navigator.mimeTypes.length;++b){var c=navigator.mimeTypes[b].type;var a=c.match(/^application\/x-java-applet;jpi-version=(.*)$/);if(a!=null){deployJava.firefoxJavaVersion=a[1];if("Opera"!=deployJava.browserName2){break}}}},launchWebStartApplication:function(a){return false},createWebStartLaunchButtonEx:function(c,b){if(deployJava.returnPage==null){deployJava.returnPage=c}var a="javascript:deployJava.launchWebStartApplication('"+c+"');";document.write('<a href="'+a+'" onMouseOver="window.status=\'\'; return true;"><img src="'+deployJava.launchButtonPNG+'" border="0" /></a>')},createWebStartLaunchButton:function(c,b){if(deployJava.returnPage==null){deployJava.returnPage=c}var a="javascript:if (!deployJava.isWebStartInstalled(&quot;"+b+"&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;"+c+"&quot;)) {}}} else {if (deployJava.launch(&quot;"+c+"&quot;)) {}}";document.write('<a href="'+a+'" onMouseOver="window.status=\'\'; return true;"><img src="'+deployJava.launchButtonPNG+'" border="0" /></a>')},launch:function(a){document.location=a;return true},isPluginInstalled:function(){var a=deployJava.getPlugin();if(a&&a.jvms){return true}else{return false}},isAutoUpdateEnabled:function(){if(deployJava.isPluginInstalled()){return deployJava.getPlugin().isAutoUpdateEnabled()}return false},setAutoUpdateEnabled:function(){if(deployJava.isPluginInstalled()){return deployJava.getPlugin().setAutoUpdateEnabled()}return false},setInstallerType:function(a){deployJava.installType=a;if(deployJava.isPluginInstalled()){return deployJava.getPlugin().setInstallerType(a)}return false},setAdditionalPackages:function(a){if(deployJava.isPluginInstalled()){return deployJava.getPlugin().setAdditionalPackages(a)}return false},setEarlyAccess:function(a){deployJava.EAInstallEnabled=a},isPlugin2:function(){if(deployJava.isPluginInstalled()){if(deployJava.versionCheck("1.6.0_10+")){try{return deployJava.getPlugin().isPlugin2()}catch(a){}}}return false},allowPlugin:function(){deployJava.getBrowser();var a=("Safari"!=deployJava.browserName2&&"Opera"!=deployJava.browserName2);return a},getPlugin:function(){deployJava.refresh();var a=null;if(deployJava.allowPlugin()){a=document.getElementById("deployJavaPlugin")}return a},compareVersionToPattern:function(f,b,c){var g="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var h=f.match(g);if(h!=null){var e=0;var j=new Array();for(var d=1;d<h.length;++d){if((typeof h[d]=="string")&&(h[d]!="")){j[e]=h[d];e++}}var a=Math.min(j.length,b.length);if(c){for(var d=0;d<a;++d){if(j[d]!=b[d]){return false}}return true}else{for(var d=0;d<a;++d){if(j[d]<b[d]){return false}else{if(j[d]>b[d]){return true}}}return true}}else{return false}},getBrowser:function(){if(deployJava.browserName==null){var a=navigator.userAgent.toLowerCase();if(deployJava.debug){alert("userAgent -> "+a)}if(a.indexOf("msie")!=-1){deployJava.browserName="MSIE";deployJava.browserName2="MSIE"}else{if(a.indexOf("firefox")!=-1){deployJava.browserName="Netscape Family";deployJava.browserName2="Firefox"}else{if(a.indexOf("chrome")!=-1){deployJava.browserName="Netscape Family";deployJava.browserName2="Chrome"}else{if(a.indexOf("safari")!=-1){deployJava.browserName="Netscape Family";deployJava.browserName2="Safari"}else{if(a.indexOf("mozilla")!=-1){deployJava.browserName="Netscape Family";deployJava.browserName2="Other"}else{if(a.indexOf("opera")!=-1){deployJava.browserName="Netscape Family";deployJava.browserName2="Opera"}else{deployJava.browserName="?";deployJava.browserName2="unknown"}}}}}}if(deployJava.debug){alert("Detected browser name:"+deployJava.browserName+", "+deployJava.browserName2)}}return deployJava.browserName},testUsingActiveX:function(a){var c="JavaWebStart.isInstalled."+a+".0";if(!ActiveXObject){if(deployJava.debug){alert("Browser claims to be IE, but no ActiveXObject object?")}return false}try{return(new ActiveXObject(c)!=null)}catch(b){return false}},testForMSVM:function(){var b="{08B0E5C0-4FCB-11CF-AAA5-00401C608500}";if(typeof oClientCaps!="undefined"){var a=oClientCaps.getComponentVersion(b,"ComponentID");if((a=="")||(a=="5,0,5000,0")){return false}else{return true}}else{return false}},testUsingMimeTypes:function(b){if(!navigator.mimeTypes){if(deployJava.debug){alert("Browser claims to be Netscape family, but no mimeTypes[] array?")}return false}for(var c=0;c<navigator.mimeTypes.length;++c){s=navigator.mimeTypes[c].type;var a=s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);if(a!=null){if(deployJava.compareVersions(a[1],b)){return true}}}return false},testUsingPluginsArray:function(b){if((!navigator.plugins)||(!navigator.plugins.length)){return false}var a=navigator.platform.toLowerCase();for(var c=0;c<navigator.plugins.length;++c){s=navigator.plugins[c].description;if(s.search(/^Java Switchable Plug-in (Cocoa)/)!=-1){if(deployJava.compareVersions("1.5.0",b)){return true}}else{if(s.search(/^Java/)!=-1){if(a.indexOf("win")!=-1){if(deployJava.compareVersions("1.5.0",b)||deployJava.compareVersions("1.6.0",b)){return true}}}}}if(deployJava.compareVersions("1.5.0",b)){return true}return false},IEInstall:function(){location.href=deployJava.getJavaURL+((deployJava.returnPage!=null)?("&returnPage="+deployJava.returnPage):"")+((deployJava.locale!=null)?("&locale="+deployJava.locale):"")+((deployJava.brand!=null)?("&brand="+deployJava.brand):"")+((deployJava.installType!=null)?("&type="+deployJava.installType):"");return false},done:function(b,a){},FFInstall:function(){location.href=deployJava.getJavaURL+((deployJava.returnPage!=null)?("&returnPage="+deployJava.returnPage):"")+((deployJava.locale!=null)?("&locale="+deployJava.locale):"")+((deployJava.brand!=null)?("&brand="+deployJava.brand):"")+((deployJava.installType!=null)?("&type="+deployJava.installType):"");return false},compareVersions:function(f,g){var d=f.split(".");var c=g.split(".");for(var e=0;e<d.length;++e){d[e]=Number(d[e])}for(var e=0;e<c.length;++e){c[e]=Number(c[e])}if(d.length==2){d[2]=0}if(d[0]>c[0]){return true}if(d[0]<c[0]){return false}if(d[1]>c[1]){return true}if(d[1]<c[1]){return false}if(d[2]>c[2]){return true}if(d[2]<c[2]){return false}return true},enableAlerts:function(){deployJava.browserName=null;deployJava.debug=true},poll:function(){deployJava.refresh();var a=deployJava.getJREs();if((deployJava.preInstallJREList.length==0)&&(a.length!=0)){clearInterval(deployJava.myInterval);if(deployJava.returnPage!=null){location.href=deployJava.returnPage}}if((deployJava.preInstallJREList.length!=0)&&(a.length!=0)&&(deployJava.preInstallJREList[0]!=a[0])){clearInterval(deployJava.myInterval);if(deployJava.returnPage!=null){location.href=deployJava.returnPage}}},writePluginTag:function(){var a=deployJava.getBrowser();if(a=="MSIE"){document.write('<object classid="clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA" id="deployJavaPlugin" width="0" height="0"></object>')}else{if(a=="Netscape Family"&&deployJava.allowPlugin()){deployJava.writeEmbedTag()}}},refresh:function(){navigator.plugins.refresh(false);var a=deployJava.getBrowser();if(a=="Netscape Family"&&deployJava.allowPlugin()){var b=document.getElementById("deployJavaPlugin");if(b==null){deployJava.writeEmbedTag()}}},writeEmbedTag:function(){var a=false;if(navigator.mimeTypes!=null){for(var b=0;b<navigator.mimeTypes.length;b++){if(navigator.mimeTypes[b].type==deployJava.mimeType){if(navigator.mimeTypes[b].enabledPlugin){document.write('<embed id="deployJavaPlugin" type="'+deployJava.mimeType+'" hidden="true" />');a=true}}}if(!a){for(var b=0;b<navigator.mimeTypes.length;b++){if(navigator.mimeTypes[b].type==deployJava.oldMimeType){if(navigator.mimeTypes[b].enabledPlugin){document.write('<embed id="deployJavaPlugin" type="'+deployJava.oldMimeType+'" hidden="true" />')}}}}}},do_initialize:function(){deployJava.writePluginTag();if(deployJava.locale==null){var b=null;if(b==null){try{b=navigator.userLanguage}catch(a){}}if(b==null){try{b=navigator.systemLanguage}catch(a){}}if(b==null){try{b=navigator.language}catch(a){}}if(b!=null){b.replace("-","_");deployJava.locale=b}}}};deployJava.do_initialize();