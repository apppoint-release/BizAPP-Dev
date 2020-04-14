/*
* ResizingScript.js
* Version 17.1.20171.1001
* Copyright(c) 2001-2017 Infragistics, Inc. All Rights Reserved.
*/


//VS 02/13/2007
Type.registerNamespace('Infragistics.UI');
Infragistics.UI.WebResizingExtender = function (element)
{
	Infragistics.UI.WebResizingExtender.initializeBase(this, [element]);
	



















	this._props = ['', '', '', 0, 0, 10000, 10000, 0, 0, 0, 0, 0, '', '', '', '', '', ''];
}
Infragistics.UI.WebResizingExtender.prototype =
{
	get_handleClass: function () { return this._get_(0); },
	set_handleClass: function (val)
	{
		this._set_(0, val);
		if (this._hand) this._hand.className = val;
	},
	
	get_handleImage: function () { return this._get_(1); },
	set_handleImage: function (val)
	{
		this._set_(1, val);
		if (this._hand) this._hand.src = val;
	},
	
	get_resizeBorder: function () { return this._get_(2); },
	set_resizeBorder: function (val)
	{
		this._set_(2, val);
		this._border = this._isEmpty(val) ? null : parseInt(val.substring(0, 1));
	},
	
	get_minimumWidth: function () { return this._get_(3); },
	set_minimumWidth: function (val) { this._set_(3, val); },
	
	get_minimumHeight: function () { return this._get_(4); },
	set_minimumHeight: function (val) { this._set_(4, val); },
	
	get_maximumWidth: function () { return this._get_(5); },
	set_maximumWidth: function (val) { this._set_(5, val); },
	
	get_maximumHeight: function () { return this._get_(6); },
	set_maximumHeight: function (val) { this._set_(6, val); },
	
	get_offsetLeft: function () { return this._get_(7); },
	set_offsetLeft: function (val) { this._set_(7, val); },
	
	get_offsetTop: function () { return this._get_(8); },
	set_offsetTop: function (val) { this._set_(8, val); },
	
	get_offsetRight: function () { return this._get_(9); },
	set_offsetRight: function (val) { this._set_(9, val); },
	
	get_offsetBottom: function () { return this._get_(10); },
	set_offsetBottom: function (val) { this._set_(10, val); },
	
	get_parentType: function () { return this._get_(11); },
	set_parentType: function (val) { this._set_(11, val); },
	
	get_toolTip: function () { return this._get_(12); },
	set_toolTip: function (val, v)
	{
		if (!v) this._set_(12, val);
		v = this._hand;
		if (v) v.alt = v.title = val;
	},
	
	get_resize: function () { return this._get_(13); },
	set_resize: function (val) { this._set_(13, val, 'resize'); },
	add_resize: function (handler) { this._addEvt('resize', handler); },
	remove_resize: function (handler) { this._removeEvt('resize', handler); },
	
	get_resizing: function () { return this._get_(14); },
	set_resizing: function (val) { this._set_(14, val, 'resizing'); },
	add_resizing: function (handler) { this._addEvt('resizing', handler); },
	remove_resizing: function (handler) { this._removeEvt('resizing', handler); },
	
	get_mouseover: function () { return this._get_(15); },
	set_mouseover: function (val) { this._set_(15, val, 'mouseover'); },
	add_mouseover: function (handler) { this._addEvt('mouseover', handler); },
	remove_mouseover: function (handler) { this._removeEvt('mouseover', handler); },
	
	get_mouseout: function () { return this._get_(16); },
	set_mouseout: function (val) { this._set_(16, val, 'mouseout'); },
	add_mouseout: function (handler) { this._addEvt('mouseout', handler); },
	remove_mouseout: function (handler) { this._removeEvt('mouseout', handler); },
	
	get_initialize: function () { return this._get_(17); },
	set_initialize: function (val) { this._set_(17, val, 'initialize'); },
	
	getFrameElement: function () { return this._handDad; },
	getHandleElement: function () { return this._hand; },
	initialize: function ()
	{
		Infragistics.UI.WebResizingExtender.callBaseMethod(this, 'initialize');
		this._target = this.getTargetElement();
		if (!this._target)
		{
			throw 'Target element for WebResizingExtender not found';
			return;
		}
		if (this._onTimer(true))
			delete this._onTimer;
		else
			ig_ui_timer(this);
	},
	_shift: function ()
	{
		this._s.marginLeft = (this._shiftX + this._divX - this._bdr) + 'px';
		this._s.marginTop = (this._shiftY + this._divY - this._bdr) + 'px';
	},
	_onTimer: function (init)
	{
		if (this._width)
			return true;
		var elem = this._target;
		var val = elem.offsetWidth;
		if (!val || val == 0)
			return false;
		this._width = val;
		this._height = elem.offsetHeight;
		var tag = elem.nodeName;
		
		this._bdr = this._divX = this._divY = 0;
		val = this.get_parentType();
		
		this._div = (val == 2) || !(tag == 'DIV' || tag == 'SPAN');
		var td = (tag == 'TABLE' && val != 2) ? elem.rows[0] : null;
		if (td) td = td.cells[0];
		else if (val == 1) this._div = false;
		if (tag == 'TD') td = elem;
		
		var zi = 0, style = this._runStyle(elem);
		if (this._div && !td)
		{
			val = this._getStyleValue(style, 'position');
			if (elem.type == 'hidden')
				alert('Can not attach resizer to a hidden element ' + elem.id);
		}
		if (val == 'absolute' || val == 'relative')
		{
			zi = this._getStyleValue(style, 'zIndex');
			if (!zi || zi < 1) zi = 99999;
		}
		
		this._shiftX = this._intPX(style, 'borderLeftWidth') + this._intPX(style, 'paddingLeft');
		this._shiftY = this._intPX(style, 'borderTopWidth') + this._intPX(style, 'paddingTop');
		val = this._intPX(style, 'borderRightWidth', 0) + this._intPX(style, 'paddingRight');
		this._widthFix = this._shiftX + val;
		val = this._intPX(style, 'borderBottomWidth') + this._intPX(style, 'paddingBottom');
		this._heightFix = this._shiftY + val;
		
		val = this.get_offsetLeft();
		this._shiftX = -this._shiftX + val;
		this._shiftWidth = val - this.get_offsetRight();
		val = this.get_offsetTop();
		this._shiftY = -this._shiftY + val;
		this._shiftHeight = val - this.get_offsetBottom();
		val = this.get_stateValue();
		if (val)
		{
			val = val.split(',');
			if (!this._isEmpty(val[0]))
				this._width = this._int(val[0]);
			if (!this._isEmpty(val[1]))
				this._height = this._int(val[1]);
		}
		
		this._handDad = document.createElement('DIV');
		this._s = style = this._handDad.style;
		
		if (td)
			elem = td;
		if (!td && this._div)
		{
			td = elem;
			elem = elem.parentNode;
			if (zi > 0) style.zIndex = zi + 1;
		}
		else
			td = elem.firstChild;
		
		style.width = style.height = '0px';
		this._shift();
		style.position = 'absolute';
		elem.insertBefore(this._handDad, td);
		
		val = this.get_handleImage();
		if (val && val.length > 0)
		{
			this._im = elem = document.createElement('IMG');
			elem.src = val;
			elem._me = this;
			$addHandlers(elem, { 'readystatechange': this._resize, 'load': this._resize }, this);
		}
		else
			elem = document.createElement('DIV');
		elem.className = this.get_handleClass();
		elem.style.position = 'absolute';
		elem.unselectable = 'on';
		
		this._hand = elem;
		this.set_toolTip(this.get_toolTip(), true);
		this._handDad.appendChild(elem);
		val = this._getStyleValue(null, 'cursor', elem);
		if (!val || val == 'auto')
			elem.style.cursor = val = 'SE-resize';
		this._s.cursor = val;
		
		var events = { 'mousedown': this._onMouseDown, 'mouseover': this._onMouseOver, 'mouseout': this._onMouseOut };
		if (window.navigator.pointerEnabled && window.navigator.maxTouchPoints)
		{
			events.pointerdown = this._onMouseDown;
			this._hand.style.touchAction = "none";
		}
		else if (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints)
		{
			events.MSPointerDown = this._onMouseDown;
			this._hand.style.msTouchAction = "none";
		}
		else
			events.touchstart = this._onMouseDown;
		$addHandlers(this._hand, events, this);
		this._onMouseMoveFn = Function.createDelegate(this, this._onMouseMove);
		this._onMouseUpFn = Function.createDelegate(this, this._onMouseUp);
		this._onSelectFn = Function.createDelegate(this, this._onSelectStart);
		this._resize();
		this._raiseEvt('initialize');
		return true;
	},
	_resize: function (e)
	{
		var im = this._im, hand = this._hand, elem = this._target;
		if (!hand)
			return;
		if (im && (im.complete || im.readyState == 'complete'))
			e = this._im = null;
		var width = this._width, height = this._height;
		if (e)
		{
			var b = e.button;
			if (b == 0 && e.rawEvent)
				b = e.rawEvent.button;
			if (b == 1)
				this._but = 1;
			if (this._but == 1 && this._drag && b != 1)
			{
				this._onMouseUp(e);
				return;
			}
			
			if (!e.type || (e.type.indexOf('m') != 0 && e.type.indexOf('pointer') != 0 && e.type.indexOf('touch') != 0))
				return;
			var x = e.clientX, y = e.clientY;
			if (e.type.indexOf('touch') == 0)
			{
				var coords = this._getTouchCoords(e.rawEvent);
				if (x == undefined)
					x = coords.x;
				if (y == undefined)
					y = coords.y;
			}
			if (this._x == null)
			{
				this._x = x;
				this._y = y;
				this._width0 = width;
				this._height0 = height;
			}
			x -= this._x;
			y -= this._y;
			if (x == 0 && y == 0)
				return;
			width = this._width0 + x;
			height = this._height0 + y;
			
			if (this._raiseEvt('resizing', 'Resize', e, width, height, this._width0, this._height0))
				return;
		}
		else if (this._im)
			return;
		var handWidth = hand.offsetWidth, handHeight = hand.offsetHeight;
		width = Math.min(Math.max(width, Math.max(this.get_minimumWidth(), handWidth) + this._widthFix), this.get_maximumWidth());
		height = Math.min(Math.max(height, Math.max(this.get_minimumHeight(), handHeight) + this._heightFix), this.get_maximumHeight());
		var style = elem.style;
		var width0 = width - this._widthFix, height0 = height - this._heightFix;
		style.width = width0 + 'px';
		style.height = height0 + 'px';
		width0 = elem.offsetWidth;
		height0 = elem.offsetHeight;
		if (width0 > width)
		{
			width = width0;
			style.width = (width - this._widthFix) + 'px';
		}
		if (height0 > height)
		{
			height = height0;
			style.height = (height - this._heightFix) + 'px';
		}
		this._width = width;
		this._height = height;
		
		if (this._div)
		{
			var p0 = this._getPos(elem), p1 = this._getPos(this._handDad);
			this._divY -= (p1.y - p0.y + this._bdr - this.get_offsetTop());
			this._divX -= (p1.x - p0.x + this._bdr - this.get_offsetLeft());
			if (!this._drag)
				this._shift();
		}
		if (this._drag)
			this._onMouseOver(e, true);
		hand.style.left = (elem.offsetWidth - handWidth - this._shiftWidth) + 'px';
		hand.style.top = (elem.offsetHeight - handHeight - this._shiftHeight) + 'px';
	},
	setSize: function (width, height)
	{
		this._width = width;
		this._height = height;
		this._resize();
		this.set_stateValue(this._width + ',' + this._height, true);
	},
	dispose: function ()
	{
		if (this._hand)
			$clearHandlers(this._hand);
		this._onMouseUp();
		Infragistics.UI.WebResizingExtender.callBaseMethod(this, 'dispose');
	},
	_onMouseOver: function (e, noEvt)
	{
		if (e && noEvt !== true)
			this._mouseIn = true;
		if (this._drag && noEvt !== true)
			return;
		var elem = this._handDad;
		var width = this._target.offsetWidth - this._shiftWidth, height = this._target.offsetHeight - this._shiftHeight;
		this._s.width = ((width > 0) ? width : 0) + 'px';
		this._s.height = ((height > 0) ? height : 0) + 'px';
		if (this._drag && this._div)
		{
			this._shift();
			return;
		}
		if (noEvt === true)
			return;
		this._raiseEvt('mouseover', null, e);
		if (!this._border)
			return;
		this._s.border = this.get_resizeBorder();
		this._bdr = this._border;
		this._shift();
	},
	_onMouseOut: function (e, noEvt)
	{
		if (e && noEvt !== true)
			this._mouseIn = false;
		if (this._drag)
			return;
		this._raiseEvt('mouseout', null, e);
		this._s.border = this._s.width = this._s.height = '0px';
		this._bdr = 0;
		if (!this._border)
			return;
		this._shift();
	},
	_onMouseDown: function (e)
	{
		this._x = null;
		if (!e) if ((e = window.event) == null)
			return;
		this._drag = true;
		this._cancelEvt(e);
		$addHandler(document, 'mousemove', this._onMouseMoveFn);
		$addHandler(document, 'mouseup', this._onMouseUpFn);
		
		if (window.navigator.pointerEnabled && window.navigator.maxTouchPoints)
		{
			$addHandler(document, 'pointermove', this._onMouseMoveFn);
			$addHandler(document, 'pointerup', this._onMouseUpFn);
		}
		else if (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints)
		{
			$addHandler(document, 'MSPointerMove', this._onMouseMoveFn);
			$addHandler(document, 'MSPointerUp', this._onMouseUpFn);
		}
		else
		{
			$addHandler(document, 'touchmove', this._onMouseMoveFn);
			$addHandler(document, 'touchend', this._onMouseUpFn);
		}
		if (Sys.Browser.agent === Sys.Browser.Safari)
			document.onselectstart = this._onSelectFn;
		else
			$addHandler(document, 'selectstart', this._onSelectFn);
	},
	_onMouseMove: function (e)
	{
		if (this._drag)
			this._resize(e ? e : window.event);
	},
	_onMouseUp: function (e)
	{
		this._x = null;
		if (!this._drag)
			return;
		var v, fix = null;
		
		if (this._raiseEvt('resize', 'Resize', e, this._width, this._height, this._width0, this._height0))
		{
			fix = this._width = this._width0;
			this._height = this._height0;
		}
		if (this._args)
		{
			if ((v = this._args._width) != null)
				fix = this._width = v;
			if ((v = this._args._height) != null)
				fix = this._height = v;
		}
		this._drag = false;
		if (fix != null || this._div)
			this._resize();
		this.set_stateValue(this._width + ',' + this._height, true);
		$removeHandler(document, 'mousemove', this._onMouseMoveFn);
		$removeHandler(document, 'mouseup', this._onMouseUpFn);
		
		if (window.navigator.pointerEnabled && window.navigator.maxTouchPoints)
		{
			$removeHandler(document, 'pointermove', this._onMouseMoveFn);
			$removeHandler(document, 'pointerup', this._onMouseUpFn);
		}
		else if (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints)
		{
			$removeHandler(document, 'MSPointerMove', this._onMouseMoveFn);
			$removeHandler(document, 'MSPointerUp', this._onMouseUpFn);
		}
		else
		{
			$removeHandler(document, 'touchmove', this._onMouseMoveFn);
			$removeHandler(document, 'touchend', this._onMouseUpFn);
		}
		if (Sys.Browser.agent === Sys.Browser.Safari)
			document.onselectstart = null;
		else
			$removeHandler(document, 'selectstart', this._onSelectFn);
		if (!this._mouseIn)
			this._onMouseOut(e, true);
	},
	_onSelectStart: function (e)
	{
		return this._drag ? this._cancelEvt(e) : true;
	},
	_getTouchCoords: function (touchEvent)
	{
		
		var coords = { x: 0, y: 0 };
		if (touchEvent.targetTouches && touchEvent.targetTouches.length)
		{
			
			var thisTouch = touchEvent.targetTouches[0];
			coords.x = thisTouch.clientX;
			coords.y = thisTouch.clientY;
		}
		else
		{
			
			coords.x = touchEvent.clientX;
			coords.y = touchEvent.clientY;
		}
		return coords;
	}
}
Infragistics.UI.WebResizingExtender.registerClass('Infragistics.UI.WebResizingExtender', Infragistics.UI.ExtenderBase);
Infragistics.UI.WebResizingExtender.descriptor =
{
	properties:
	[
		{ name: 'handleClass', type: String },
		{ name: 'resizeBorder', type: String },
		{ name: 'minimumWidth', type: Number },
		{ name: 'minimumHeight', type: Number },
		{ name: 'maximumWidth', type: Number },
		{ name: 'maximumHeight', type: Number },
		{ name: 'offsetLeft', type: Number },
		{ name: 'offsetTop', type: Number },
		{ name: 'offsetRight', type: Number },
		{ name: 'offsetBottom', type: Number },
		{ name: 'parentType', type: Number },
		{ name: 'toolTip', type: String },
		{ name: 'resize', type: String },
		{ name: 'resizing', type: String },
		{ name: 'mouseover', type: String },
		{ name: 'mouseout', type: String },
		{ name: 'initialize', type: String }
	],
	events:
	[
		{ name: 'mouseover' },
		{ name: 'mouseout' },
		{ name: 'resize' },
		{ name: 'resizing' }
	]
}
Infragistics.UI.ResizeEventArgs = function ()
{
	Infragistics.UI.ResizeEventArgs.initializeBase(this);
}
Infragistics.UI.ResizeEventArgs.prototype =
{
	
	getWidth: function () { return this._props[1]; },
	getHeight: function () { return this._props[2]; },
	getOldWidth: function () { return this._props[3]; },
	getOldHeight: function () { return this._props[4]; },
	setWidth: function (val) { this._props[1] = this._width = val; },
	setHeight: function (val) { this._props[2] = this._height = val; }
}
Infragistics.UI.ResizeEventArgs.registerClass('Infragistics.UI.ResizeEventArgs', Infragistics.UI.CancelEventArgs);
