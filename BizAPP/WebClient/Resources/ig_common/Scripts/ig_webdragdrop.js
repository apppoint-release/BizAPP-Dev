/*
* ig_webdragdrop.js
* Version 17.1.20171.1001
* Copyright(c) 2001-2017 Infragistics, Inc. All Rights Reserved.
*/


//alert('ig_webdragdrop.js');
ig_ScheduleDragDrop = function(info)
{
	this._info = info;
	this.addView = function(view)
	{
//alert('view:'+view._clientID+':'+this._info._clientID);
	}
}
