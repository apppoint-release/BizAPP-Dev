/*
* ig_htmleditor_moz.js
* Version 17.1.20171.1001
* Copyright(c) 2001-2017 Infragistics, Inc. All Rights Reserved.
*/


//vs 03/14/14
// NOTE: that file is not used. All its content was moved into ig_htmleditor.js
function iged_init(ids,p1,p2,p3,p4,p5)
{
	ids=ids.split("|");
	var id=ids[0];
	var elem=iged_el(ids[1]),ta=iged_el(id+"_t_a"),tb=iged_el(ids[3]);
	if(!ta)return;
	var o=new iged_new(id,ta,tb,p1,p2,p3,p4,p5);
	o._ids=[ids[4]+"_d",ids[4]+"_h"];
	o._elem=elem;
	o._cDoc=function(){return this._elem.contentDocument;}
	o._edit=function(edit)
	{
		if(this._elem.offsetWidth==0){this._zero=edit;return;}
		if(edit||this._zero)try{this._zero=false;this._cDoc().designMode="On";}catch(i){}
	}
	var doc=o._cDoc(),edit=o._prop[12];
	o._edit(edit>0);
	doc.open();
	var s=ta.value;
	doc.write(o._fixStr(s));
	doc.close();
	
	var i=(s.indexOf('%3Cbody')==0)?s.indexOf('%3E'):0,i1=s.lastIndexOf('%3C/body%3E');
	if(i>4&&i1>i)ta.value=s.substring(i+3,i1);
	o.getText=function()
	{
		var body=this._body();
		if(!this._html)return body.innerHTML;
		var html=body.ownerDocument.createRange();
		html.selectNodeContents(body);
		return html.toString();
	}
	o._win=function(){return this._elem.contentWindow;}
	o._doc=function(){return this._win().document;}
	o._sel=function(){return this._win().getSelection();}
	o._range=function()
	{
		var sel=this._sel();
		try{return sel.rangeCount?sel.getRangeAt(0):null;}catch(ex){}
	}
	o.print=function(){this._win().print();}
	o._onLink=function()
	{
		var s=prompt(this._cs(18)+"\n"+this._cs(19)+"\n"+this._cs(20), "http://");
		if(s)this._format("CreateLink",s,false);
	}
	
	o._inTbl=function(){return this._getTag(this._cont(),'TD','TH');}
	o._insBook=function(n)
	{
		var b=this._doc().createElement("A");
		b.setAttribute("name",n);
		b.innerHTML=this._bmTxt||'';
		iged_insNodeAtSel(b);
	}
	o._insRule=function(align,w,clr,size,noShad)
	{
		var t=this._doc().createElement("HR");
		if(align&&align!="default")t.setAttribute("align",align);
		if(w&&w!="")t.setAttribute("width",w);
		if(clr)t.setAttribute("color",clr);
		if(size&&size!="")t.setAttribute("size",size);
		iged_insNodeAtSel(t);
	}
	o.getSelectedText=function()
	{
		var range=this._range();
		return range?range.toString():'';
	}
	o._removeDummy=function(e)
	{
		var n = e ? e.nodeName : null;
		//Opera
		if(n == '#text' && !e.nodeValue)
		{
			e = e.nextSibling;
			n = e ? e.nodeName : null;
		}
		//SPAN-Firefox, DIV-Chrome, P-Opera
		var span = n == 'SPAN';
		if (!span && n != 'DIV' && n != 'P')
			return;
		var txt = e.innerHTML.replace(/\n/g, "").replace(/\r/g, "");
		//<br>:IE11, <p></p>:Opera
		if(txt && txt != ' ' && txt != '<br>' && txt != '<br/>' && txt != '<p></p>')
			return;
		if(span || (!span && !e.getAttribute('style')))
			e.parentNode.removeChild(e);
	}
	o._onApplyStyle=function(e)
	{
		var str=e.id,range=this._range();
		if(!range)
			return;
		if(!str || str.length < 2)
		{
			this._format("removeFormat");
			return this._afterSel(e);
		}
		var count, i = -1, n = document.createElement("SPAN");
		// all selected elements append to n
		try
		{
			var nodes = range.extractContents ? range.extractContents().childNodes : null;
			count = nodes ? nodes.length : 0;
			// same element was selected
			if(count == 1 && nodes[0].nodeName == "SPAN")
				n = nodes[0].cloneNode(true);
			else while(++i < count)
				n.appendChild(nodes[i].cloneNode(true));
		}
		catch(ex)
		{
			n = document.createElement("SPAN");
			n.innerHTML = iged_stripTags(this._range().toString());
			count = 0;
		}
		if(str.indexOf(":")>1)n.setAttribute("style",str);
		else n.className=str;
		iged_insNodeAtSel(n);
		//try to remove dummy elements
		if(count)
		{
			this._removeDummy(n.previousSibling);
			this._removeDummy(n.nextSibling);
			this._removeDummy(n.firstChild);
			this._removeDummy(n.lastChild);
		}
		this._afterSel(e);
	}
	o._popWin=function(cap,x,img,evt)
	{
		x=this._fixDlgS(x);
		var cont,id=x[0],h=x[14],w=x[15],flag=x[16];
		if(id.length<1)return;
		if(flag=="c")
		{
			if((cont=this._cont())==null)return;
			if((iged_all._curCell=this._inTbl())==null)return;
		}
		if(flag=="t")
		{
			if((cont=this._cont())==null)return;
			if((iged_all._curTable=this._getTag(cont,'TABLE'))==null)return;
		}
		this._bmTxt=(id=='iged_0_bm')?this.getSelectedText():'';
		iged_closePop();
		var elem=iged_el(id,1),pan=this._pan();
		if(!elem||!pan)return;
		this._choiceAct=this._itemStyle=null;
		if(!elem._igf){elem._igf=true;this._fixPop(elem);}
		if(x[1])pan.className=x[1];
		var s=pan.style;
		if(x[2])s.backgroundColor=x[2];if(x[3])s.borderColor=x[3];
		if(x[4])s.borderStyle=x[4];if(x[5])s.borderWidth=x[5];
		if(x[6])s.fontFamily=x[6];if(x[7])s.fontSize=x[7];if(x[8])s.color=x[8];
		if(h)s.height=h;if(w)s.width=w;
		var tbl=document.createElement("TABLE");
		tbl.cellSpacing=0;
		tbl.insertRow(0);tbl.insertRow(0);
		if(w)tbl.style.width=w;
		var r0=tbl.rows[0];
		r0.insertCell(0);tbl.rows[1].insertCell(0);
		var c0=r0.cells[0];var s0=c0.style;
		s0.width="100%";s0.cursor="pointer";
		c0.id="titleBar";
		if(x[10])s0.backgroundColor=x[10];
		var txt="<table border='0' cellpadding='1' cellspacing='0' width='100%'><tr><td id='titleBar' width='100%'>";
		if(img)txt+="<img id='titleBar' align='absmiddle' src='"+img+"'></img>";
		txt+="&nbsp;<b id='titleBar' style='";
		if(x[11])txt+="font-family:"+x[11]+";";
		if(x[12])txt+="font-size:"+x[12]+";";
		if(x[13])txt+="color:"+x[13]+";";
		txt+="'>"+cap+"</b></td><td>";
		if(x[9])txt+="<img onclick='iged_closePop(3)' align='absmiddle' src='"+x[9]+"'></img>";
		txt+="</td></tr></table>";
		c0.innerHTML=txt;
		tbl.rows[1].cells[0].innerHTML=elem.innerHTML;
		pan.innerHTML=iged_getOuterHtml(tbl);
		iged_all._pop=pan;
		iged_all._popID=this.ID;
		this._pos(evt,pan,9);
		this._delay();
		if(flag=="c")iged_loadCell();
		if(flag=="t")iged_loadTable();
		if(!pan._mde){this._addLsnr(pan,"mousedown",iged_dragEvt);pan._mde=true;}
	}
	o._showHtml=function(html)
	{
		var o=this,e=this._elem;
		if(e._html!=null)o._html=e._html;
		if(html!==true&&html!==false)html=o._html!=true;
		if(html==(o._html==true))return;
		e._html=html;
		var tb=o._tb?o._tb.rows:null,i=tb?tb.length:0,body=o._doc().body;
		o._swapS(iged_el(o._ids[html?0:1]),iged_el(o._ids[html?1:0]));
		while(i-- > 0)
			tb[i].style.visibility=html?"hidden":"visible";
		if(html)
		{
			o._html=true;
			html=body.innerHTML;
			body.innerHTML="";
			var lower=html?html.toLowerCase():"";
			if(lower&&lower!="<br>"&&lower!="<br/>"&&lower!="<div><br></div>"&&lower!="<div><br/></div>")
			{
				html=document.createTextNode(o._amp(html));
				body.appendChild(html); 
			}
			o.focus();
			return;
		}
		o._html=false;
		var html=body.ownerDocument.createRange();
		html.selectNodeContents(body);
		body.innerHTML=html.toString(); 
		o.focus();
	}
	o._cont=function(){var r=this._range();return r?r.startContainer:null;}
	o._getSelElem=function()
	{
		var cont=this._cont();
		return (cont.nodeType==1)?cont:null;
	}
	o._insTbl=function()
	{
		var iRows=iged_el("iged_tp_rr").value,iCols=iged_el("iged_tp_cc").value;
		var align=iged_el("iged_tp_al").value,cellPd=iged_el("iged_tp_cp").value;
		var cellSp=iged_el("iged_tp_cs").value,bdSize=iged_el("iged_tp_bds").value;
		var clrBg=iged_el("iged_tp_bk1").value,clrBd=iged_el("iged_tp_bd1").value,w=iged_el("iged_tp_w").value;
		var t,t0=iged_all._curTable;
		if(t0)t=t0;
		else
		{
			t=this._doc().createElement("TABLE");
			var i,tbody=this._doc().createElement("TBODY");
			t.appendChild(tbody);
			for(i=0;i<iRows;i++)
			{
				var r2=this._doc().createElement("TR");
				for(j=0;j<iCols;j++)
				{
					var c2=this._doc().createElement("TD");
					var br=this._doc().createElement("BR");
					c2.appendChild(br);
					r2.appendChild(c2);
				}
				tbody.appendChild(r2);
			}
		}
		if(align!="default")t.setAttribute("align",align);
		t.setAttribute("border",bdSize);
		t.setAttribute("cellpadding",cellPd);
		t.setAttribute("cellspacing",cellSp);
		t.setAttribute("bgcolor",clrBg);
		t.setAttribute("bordercolor",clrBd);
		t.setAttribute("width",w);
		iged_all._curTable=null;
		iged_closePop();
		iged_insNodeAtSel(t);
	}
	o._delCol=function()
	{
		var cont=this._cont();
		var i,c=this._inTbl(),t=this._getTag(cont,'TABLE');
		if(t&&c)for(i=0;i<t.rows.length;i++)t.rows[i].deleteCell(c.cellIndex);
		iged_closePop();
	}
	o._delRow=function()
	{
		var cont=this._cont();
		var r=this._getTag(cont,'TR'),t=this._getTag(cont,'TABLE');
		if(t&&r)t.deleteRow(r.rowIndex);
		iged_closePop();
	}
	o._insRow=function(act)
	{
		var cont=this._cont();
		var r=this._getTag(cont,'TR'),t=this._getTag(cont,'TABLE');
		iged_closePop();
		if(!t||!r)return;
		var i,r2=t.insertRow(r.rowIndex+((act=="below")?1:0));
		for(i=0;i<r.cells.length;i++)
		{
			var c2=r2.insertCell(i);
			if(c2)c2.appendChild(this._doc().createElement("BR"));
		}
	}
	o._insCol=function(act)
	{
		var cont=this._cont();
		var c=this._inTbl(),t=this._getTag(cont,'TABLE');
		iged_closePop();
		if(!t||!c)return;
		var i,ii=c.cellIndex+((act=="right")?1:0);
		for(i=0;i<t.rows.length;i++)
		{
			var c2=t.rows[i].insertCell(ii);
			if(c2)c2.appendChild(this._doc().createElement("BR"));
		}
	}
	o._colSpan=function(act)
	{
		var cont=this._cont();
		var c=this._inTbl(),t=this._getTag(cont,'TABLE'),r=this._getTag(cont,'TR');
		iged_closePop();
		if(!c||!r)return;
		if(act=="increase")
		{
			if(r.cells[c.cellIndex+1])
			{
				c.colSpan+=1;
				r.deleteCell(c.cellIndex+1);
			}
		}
		else if(c.colSpan>1) 
		{
			c.colSpan-=1;
			var c2=r.insertCell(c.cellIndex);
			if(c2)c2.appendChild(this._doc().createElement("BR"));
		}
	}
	o._rowSpan=function(act)
	{
		var r2=null,cont=this._cont();
		var c=this._inTbl(),t=this._getTag(cont,'TABLE'),r=this._getTag(cont,'TR');
		iged_closePop();
		if(!c||!r)return;
		if(t.rows.length>r.rowIndex)r2=t.rows[r.rowIndex+c.rowSpan];
		if(act=="increase")
		{
			if(!r2)return;
			c.rowSpan+=1;
			r2.deleteCell(c.cellIndex);
		}
		else
		{
			if(c.rowSpan==1)return;
			c.rowSpan-=1;
			r2=t.rows[r.rowIndex+c.rowSpan];
			var c2=r2.insertCell(c.cellIndex);
			if(c2)c2.appendChild(this._doc().createElement("BR"));
		}
	}
	o.getCaret=function()
	{
		var range=o._range();
		return range?range.endOffset:-1;
	}
//	o.setCaret=function(pos)
//	{
//		if(pos<0)return;
//		try
//		{
//			var sel=this._sel(),doc=this._cDoc(),cont=doc.body;
//			pos=Math.min(pos,cont.innerHTML.length);
//			if(this._saf)cont=sel.getRangeAt(0).startContainer;
//			var range=doc.createRange();
//			sel.removeAllRanges();
//			range.setStart(cont,pos);
//			range.setEnd(cont,pos);
//			sel.addRange(range);
//			this.focus();
//		}catch(ex){}
//	}
	o.insertAtCaret=function(o)
	{
		if(!o)return;
		if(typeof o=='string')iged_insText(o,null,null,null,this);
		else iged_insNodeAtSel(o,this);
	}
	
	o._find0=function(x)
	{
		var s=null,txt=iged_el('iged_f_fw').value,txt2=iged_el('iged_f_rw').value||'',
			mc=iged_el('iged_f_mc').checked,up=iged_el('iged_f_mw'),doc=this._cDoc(),win=this._win();
		
		if(!win.find){this._alert();return;}
		if(!txt||(x>1&&!doc))return;
		if(x==1)this._findOld=null;
		this._findNum=0;
		if(this._findEnd)
			up.checked=false;
		up=up.checked;
		
		if(x==3||this._findEnd) try
		{
			var sel=this._sel(),range=doc.createRange();
			sel.removeAllRanges();
			range.setStart(doc.body,0);
			range.setEnd(doc.body,0);
			sel.addRange(range);
			up=false;
		}catch(e){}
		delete this._findEnd;
		while(!s)
		{
			if(!this._findOld)
			{
				if(win.find(txt,mc,up))
					this._findOld=txt;
				else
				{
					s=14+x;
					if(x<3)txt='"'+txt+'"';
					else txt=this._findNum;
				}
			}
			if(x==1||!this._findOld||this._findOld!=txt)break;
			iged_insNodeAtSel(doc.createTextNode(txt2),this,1);
			this._findNum++;
			this._findOld=null;
			if(x==2&&win.find(txt,mc,up))
			{
				this._findOld=txt;
				break;
			}
		}
		if(s)alert(this._cs(s).replace('{0}',this._findEnd=txt));
	}
	
	o._htSet=function()
	{
		var e0=o._elem0,h=e0?e0.style.height:null,td=iged_el(id+"_td_"),val=iged_el(id+"_ts"),iframetw=iged_el(id+"_tw");
		if(td&&e0&&tb&&h&&h.indexOf('px')>0)try
		{
			var h0=e0.offsetHeight;
			if(!h0)
			{
				//first paint
				if(!o._tmr)o._tmr=setInterval(function(){o._htSet();},200);
				return;
			}
			delete o._htSet;
			val=val?val.offsetHeight:0;
			val+=tb?tb.offsetHeight:0;
			h=parseFloat(h);
			// N.I 2/19/2014 Bug:164051-The td and iframe heights are not getting set correctly for small 'px' values
			var newHt=h>val?h-val:2;
			if(val+td.offsetHeight>h)td.height=newHt+"px";
			if(val+iframetw.offsetHeight>h) iframetw.height=newHt+"px";
		}catch(ex){}
		if(o._tmr)clearInterval(o._tmr);
		delete o._tmr;
	}
	o._htSet();
	var d=o._doc();
	if(!elem._oldE)
	{
		elem._oldE=true;
		o._addLsnr(iged_el(id),"mousedown",iged_mainEvt);
		if(edit>0)
		{
		o._ed0=true;
		o._addLsnr(d,"mousedown",iged_mainEvt);
		o._addLsnr(d,"focus",iged_mainEvt);
		o._addLsnr(d,"blur",iged_mainEvt);
		// N.A. Bug #194425: Don't attach focus and blur as it is in IE
		//o._addLsnr(o._win(),"focus",iged_mainEvt);
		//o._addLsnr(o._win(),"blur",iged_mainEvt);
		o._addLsnr(d,"keydown",iged_mainEvt);
		o._addLsnr(d,"keypress",iged_mainEvt);
		o._addLsnr(d,"paste",iged_mainEvt);
		o._addMenu();
		}
	}
	d.id="ig_d_"+id;
	if(o._prop[10]==1)o._showHtml(true);
	else if((edit&4)!=0)o.focus();
	o._fire(0);
}
function iged_insNodeAtSel(insertNode,o,fr)
{
	
	if(!fr)iged_closePop(o?null:3);
	o=o||iged_all._cur;
	var sel=o._sel(),range=o._range();
	if(!fr)sel.removeAllRanges();
	if(range)try{range.deleteContents();}catch(e){}
	var src,afterNode,cont=range.startContainer,pos=range.startOffset;
	range=o._doc().createRange();
	try
	{
		if(cont.nodeType==3&&insertNode.nodeType==3)
		{
			cont.insertData(pos,insertNode.nodeValue);
			range.setEnd(cont,pos+insertNode.length);
			range.setStart(cont,pos+insertNode.length);
		}
		else
		{
			src=o._chrome&&insertNode.nodeName=="IMG"?insertNode.src:null;
			if(cont.nodeType==3)
			{
				var textNode=cont;
				cont=textNode.parentNode;
				var text=textNode.nodeValue;
				var textBefore=text.substr(0,pos),textAfter=text.substr(pos);
				var beforeNode=document.createTextNode(textBefore);
				var afterNode=document.createTextNode(textAfter);
				cont.insertBefore(afterNode,textNode);
				cont.insertBefore(insertNode,afterNode);
				cont.insertBefore(beforeNode,insertNode);
				cont.removeChild(textNode);
			}
			else
			{
				afterNode=cont.childNodes[pos];
				cont.insertBefore(insertNode,afterNode);
			}
			if(afterNode)
			{
				range.setEnd(afterNode,0);
				range.setStart(afterNode,0);
			}
		}
	}catch(e){}
	sel.addRange(range);
	o._mod=true;
	
	if(src)setTimeout(function(){try
	{
		insertNode.src='';
		insertNode.src=src;
	}catch(e){}},0);
}
function iged_insText(txt,strip,a2,a3,a4)
{
	iged_closePop(a4?null:"InsertText");
	if(strip)txt=iged_stripTags(txt);
	var o=a4?a4:iged_all._cur;
	if(o)if(o=o._cDoc())iged_insNodeAtSel(o.createTextNode(txt));
}
function iged_doImgUpdate(img)
{
	var range=iged_all._cur._range();
	if(range)range.extractContents();
	if(img)iged_insNodeAtSel(img);
	iged_all._curImg=null;
}
function iged_modal(url,h,w,evt)
{
	url=iged_replaceS(url,"&amp;","&");
	var str="";
	if(h)str+="Height="+h+",";
	if(w)str+="Width="+w+",";
	str+="scrollbars=no";
	url+=((url.indexOf("?")>-1)?"&num=":"?num=")+Math.round(Math.random()*100000000);
	url+="&parentId="+iged_all._cur._elem.id;
	return window.open(url,window,str);
}
function iged_getOuterHtml(n) 
{
	var i,html="";
	if(n.nodeType==Node.ELEMENT_NODE)
	{
		html+="<";
		html+= n.nodeName;
		if(n.nodeName!="TEXTAREA") 
		{
			for(i=0;i<n.attributes.length;i++)
				html+=" "+n.attributes[i].nodeName.toUpperCase()+"=\""+n.attributes[i].nodeValue+"\">";
			var s=n.nodeName;
			if(s!="HR"&&s!="BR"&&s!="IMG"&&s!="INPUT")
				html+=n.innerHTML+"<\/"+s+">";
		}
		else
		{
			var txt="";
			for(i=0;i<n.attributes.length;i++)
			{
				if(n.attributes[i].nodeName.toLowerCase()!="value")
					html+=" "+n.attributes[i].nodeName.toUpperCase()+"=\""+ n.attributes[i].nodeValue+"\"";
				else txt=n.attributes[i].nodeValue;
			}
			html+=">"+txt+"<\/"+n.nodeName+">";
		}
	}
	else if(n.nodeType==Node.TEXT_NODE)html+=n.nodeValue;
	else if(n.nodeType==Node.COMMENT_NODE)html+="<!--"+n.nodeValue+"-->";
	return html;
}
