﻿/*!@license
 * Infragistics.Web.ClientUI Tree Grid 17.1.20171.1012
 *
 * Copyright (c) 2011-2017 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.dataSource.js
 *	infragistics.ui.shared.js
 *	infragistics.ui.treegrid.js
 *	infragistics.util.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.grid.sorting.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.ui.treegrid","./infragistics.ui.grid.sorting"],factory)}else{factory(jQuery)}})(function($){$.widget("ui.igTreeGridSorting",$.ui.igGridSorting,{css:{},options:{fromLevel:0,toLevel:-1},_create:function(){this.element.data($.ui.igGridSorting.prototype.widgetName,this.element.data($.ui.igTreeGridSorting.prototype.widgetName));$.ui.igGridSorting.prototype._create.apply(this,arguments)},isColumnSorted:function(columnKey){var i,se=this.grid.dataSource.settings.sorting.expressions;if(!se||!columnKey||!se.length){return false}for(i=0;i<se.length;i++){if(se[i].fieldName===columnKey){return se[i].isSorting}}return false},destroy:function(){$.ui.igGridSorting.prototype.destroy.apply(this,arguments);this.element.removeData($.ui.igGridSorting.prototype.widgetName)},_injectGrid:function(gridInstance,isRebind){var ds;$.ui.igGridSorting.prototype._injectGrid.apply(this,arguments);ds=this.grid.dataSource;if(ds&&ds.settings&&ds.settings.treeDS){ds.settings.treeDS.sorting.fromLevel=this.options.fromLevel;ds.settings.treeDS.sorting.toLevel=this.options.toLevel}if(!isRebind&&!this._cellStyleSubscriberAdded){this._cellStyleSubscriberAdded=true;this.grid._cellStyleSubscribers.push($.proxy(this._applyActiveSortCellStyle,this))}}});$.extend($.ui.igTreeGridSorting,{version:"17.1.20171.1012"});return $.ui.igTreeGridSorting});