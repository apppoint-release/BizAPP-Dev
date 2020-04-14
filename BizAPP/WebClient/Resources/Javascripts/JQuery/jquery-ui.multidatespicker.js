(function(c){c.extend(c.ui,{multiDatesPicker:{version:"1.6.4"}});c.fn.multiDatesPicker=function(e){var m=arguments;var n=this;var k=new Date();var f=new Date(0);var l={};function i(q,s){if(!s){s="picked"}q=o.call(this,q);for(var r=0;r<this.multiDatesPicker.dates[s].length;r++){if(!j.compareDates(this.multiDatesPicker.dates[s][r],q)){return this.multiDatesPicker.dates[s].splice(r,1).pop()}}}function g(q,r){if(!r){r="picked"}return this.multiDatesPicker.dates[r].splice(q,1).pop()}function h(q,s,r){if(!s){s="picked"}q=o.call(this,q);q.setHours(0);q.setMinutes(0);q.setSeconds(0);q.setMilliseconds(0);if(j.gotDate.call(this,q,s)===false){this.multiDatesPicker.dates[s].push(q);if(!r){this.multiDatesPicker.dates[s].sort(j.compareDates)}}}function p(q){if(!q){q="picked"}this.multiDatesPicker.dates[q].sort(j.compareDates)}function o(q,r,s){if(!r){r="object"}return j.dateConvert.call(this,q,r,s)}var j={init:function(r){var u=c(this);this.multiDatesPicker.changed=false;var v={beforeShow:function(w,x){this.multiDatesPicker.changed=false;if(this.multiDatesPicker.originalBeforeShow){this.multiDatesPicker.originalBeforeShow.call(this,w,x)}},onSelect:function(C,A){var B=c(this);this.multiDatesPicker.changed=true;if(C){B.multiDatesPicker("toggleDate",C);this.multiDatesPicker.changed=true}if(this.multiDatesPicker.mode=="normal"&&this.multiDatesPicker.pickableRange){if(this.multiDatesPicker.dates.picked.length>0){var y=this.multiDatesPicker.dates.picked[0],z=new Date(y.getTime());j.sumDays(z,this.multiDatesPicker.pickableRange-1);if(this.multiDatesPicker.adjustRangeToDisabled){var D,x=this.multiDatesPicker.dates.disabled.slice(0);do{D=0;for(var w=0;w<x.length;w++){if(x[w].getTime()<=z.getTime()){if((y.getTime()<=x[w].getTime())&&(x[w].getTime()<=z.getTime())){D++}x.splice(w,1);w--}}z.setDate(z.getDate()+D)}while(D!=0)}if(this.multiDatesPicker.maxDate&&(z>this.multiDatesPicker.maxDate)){z=this.multiDatesPicker.maxDate}B.datepicker("option","minDate",y).datepicker("option","maxDate",z)}else{B.datepicker("option","minDate",this.multiDatesPicker.minDate).datepicker("option","maxDate",this.multiDatesPicker.maxDate)}}if(this.multiDatesPicker.originalOnSelect&&C){this.multiDatesPicker.originalOnSelect.call(this,C,A)}},beforeShowDay:function(x){var B=c(this),y=B.multiDatesPicker("gotDate",x)!==false,z=B.datepicker("option","disabled"),A=B.multiDatesPicker("gotDate",x,"disabled")!==false,w=this.multiDatesPicker.maxPicks<=this.multiDatesPicker.dates.picked.length;var C=[true,"",null];if(this.multiDatesPicker.originalBeforeShowDay){C=this.multiDatesPicker.originalBeforeShowDay.call(this,x)}C[1]=y?"ui-state-highlight "+C[1]:C[1];C[0]=C[0]&&!(z||A||(w&&!C[1]));return C}};if(u.val()){var q=u.val()}if(r){if(r.separator){this.multiDatesPicker.separator=r.separator}if(!this.multiDatesPicker.separator){this.multiDatesPicker.separator=", "}this.multiDatesPicker.originalBeforeShow=r.beforeShow;this.multiDatesPicker.originalOnSelect=r.onSelect;this.multiDatesPicker.originalBeforeShowDay=r.beforeShowDay;this.multiDatesPicker.originalOnClose=r.onClose;u.datepicker(r);this.multiDatesPicker.minDate=c.datepicker._determineDate(this,r.minDate,null);this.multiDatesPicker.maxDate=c.datepicker._determineDate(this,r.maxDate,null);if(r.addDates){j.addDates.call(this,r.addDates)}if(r.addDisabledDates){j.addDates.call(this,r.addDisabledDates,"disabled")}j.setMode.call(this,r)}else{u.datepicker()}u.datepicker("option",v);if(q){u.multiDatesPicker("value",q)}var t=u.multiDatesPicker("value");u.val(t);var s=u.datepicker("option","altField");if(s){c(s).val(t)}u.datepicker("refresh")},compareDates:function(s,q){s=o.call(this,s);q=o.call(this,q);var r=s.getFullYear()-q.getFullYear();if(!r){r=s.getMonth()-q.getMonth();if(!r){r=s.getDate()-q.getDate()}}return r},sumDays:function(q,s){var r=typeof q;obj_date=o.call(this,q);obj_date.setDate(obj_date.getDate()+s);return o.call(this,obj_date,r)},dateConvert:function(s,r,q){var w=typeof s;var v=c(this);if(w==r){if(w=="object"){try{s.getTime()}catch(u){c.error("Received date is in a non supported format!");return false}}return s}if(typeof s=="undefined"){s=new Date(0)}if(r!="string"&&r!="object"&&r!="number"){c.error('Date format "'+r+'" not supported!')}if(!q){var t=v.datepicker("option","dateFormat");if(t){q=t}else{q=c.datepicker._defaults.dateFormat}}switch(w){case"object":break;case"string":s=c.datepicker.parseDate(q,s);break;case"number":s=new Date(s);break;default:c.error('Conversion from "'+r+'" format not allowed on jQuery.multiDatesPicker')}switch(r){case"object":return s;case"string":return c.datepicker.formatDate(q,s);case"number":return s.getTime();default:c.error('Conversion to "'+r+'" format not allowed on jQuery.multiDatesPicker')}return false},gotDate:function(q,s){if(!s){s="picked"}for(var r=0;r<this.multiDatesPicker.dates[s].length;r++){if(j.compareDates.call(this,this.multiDatesPicker.dates[s][r],q)===0){return r}}return false},value:function(q){if(q&&typeof q=="string"){j.addDates.call(this,q.split(this.multiDatesPicker.separator))}else{var r=j.getDates.call(this,"string");return r.length?r.join(this.multiDatesPicker.separator):""}},getDates:function(s,r){if(!s){s="string"}if(!r){r="picked"}switch(s){case"object":return this.multiDatesPicker.dates[r];case"string":case"number":var t=new Array();for(var q in this.multiDatesPicker.dates[r]){t.push(o.call(this,this.multiDatesPicker.dates[r][q],s))}return t;default:c.error('Format "'+s+'" not supported!')}},addDates:function(s,r){if(s.length>0){if(!r){r="picked"}switch(typeof s){case"object":case"array":if(s.length){for(var q=0;q<s.length;q++){h.call(this,s[q],r,true)}p.call(this,r);break}case"string":case"number":h.call(this,s,r);break;default:c.error('Date format "'+typeof s+'" not allowed on jQuery.multiDatesPicker')}}else{c.error("Empty array of dates received.")}},removeDates:function(t,r){if(!r){r="picked"}var s=[];if(Object.prototype.toString.call(t)==="[object Array]"){for(var q in t.sort(function(v,u){return u-v})){s.push(i.call(this,t[q],r))}}else{s.push(i.call(this,t,r))}return s},removeIndexes:function(q,s){if(!s){s="picked"}var t=[];if(Object.prototype.toString.call(q)==="[object Array]"){for(var r in q.sort(function(v,u){return u-v})){t.push(g.call(this,q[r],s))}}else{t.push(g.call(this,q,s))}return t},resetDates:function(q){if(!q){q="picked"}this.multiDatesPicker.dates[q]=[]},toggleDate:function(r,u){if(!u){u="picked"}switch(this.multiDatesPicker.mode){case"daysRange":this.multiDatesPicker.dates[u]=[];var q=this.multiDatesPicker.autoselectRange[1];var t=this.multiDatesPicker.autoselectRange[0];if(q<t){q=this.multiDatesPicker.autoselectRange[0];t=this.multiDatesPicker.autoselectRange[1]}for(var s=t;s<q;s++){j.addDates.call(this,j.sumDays.call(this,r,s),u)}break;default:if(j.gotDate.call(this,r)===false){j.addDates.call(this,r,u)}else{j.removeDates.call(this,r,u)}break}},setMode:function(q){var s=c(this);if(q.mode){this.multiDatesPicker.mode=q.mode}switch(this.multiDatesPicker.mode){case"normal":for(option in q){switch(option){case"maxPicks":case"minPicks":case"pickableRange":case"adjustRangeToDisabled":this.multiDatesPicker[option]=q[option];break}}break;case"daysRange":case"weeksRange":var r=1;for(option in q){switch(option){case"autoselectRange":r--;case"pickableRange":case"adjustRangeToDisabled":this.multiDatesPicker[option]=q[option];break}}if(r>0){c.error("Some mandatory options not specified!")}break}if(l.onSelect){l.onSelect()}},destroy:function(){this.multiDatesPicker=null;c(this).datepicker("destroy")}};this.each(function(){var s=c(this);if(!this.multiDatesPicker){this.multiDatesPicker={dates:{picked:[],disabled:[]},mode:"normal",adjustRangeToDisabled:true}}if(j[e]){var q=j[e].apply(this,Array.prototype.slice.call(m,1));switch(e){case"removeDates":case"removeIndexes":case"resetDates":case"toggleDate":case"addDates":var r=s.datepicker("option","altField");var t=j.value.call(this);if(r!==undefined&&r!=""){c(r).val(t)}s.val(t);c.datepicker._refreshDatepicker(this)}switch(e){case"removeDates":case"getDates":case"gotDate":case"sumDays":case"compareDates":case"dateConvert":case"value":n=q}return q}else{if(typeof e==="object"||!e){return j.init.apply(this,m)}else{c.error("Method "+e+" does not exist on jQuery.multiDatesPicker")}}return false});return n};var d="multiDatesPicker";var b=new Date().getTime();var a;if(!c.multiDatesPicker){c.multiDatesPicker={version:false};c.multiDatesPicker.initialized=false;c.multiDatesPicker.uuid=new Date().getTime();c.multiDatesPicker.version=c.ui.multiDatesPicker.version;c.multiDatesPicker._hideDatepicker=c.datepicker._hideDatepicker;c.datepicker._hideDatepicker=function(){var f=this._curInst.input[0];var e=f.multiDatesPicker;if(!e||(this._curInst.inline===false&&!e.changed)){return c.multiDatesPicker._hideDatepicker.apply(this,arguments)}else{e.changed=false;c.datepicker._refreshDatepicker(f);return}}}window["DP_jQuery_"+b]=c})(jQuery);