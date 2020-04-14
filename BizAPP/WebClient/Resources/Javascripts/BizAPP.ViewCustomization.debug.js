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

var BizAPP = BizAPP || { UI: {} };

BizAPP.ViewCustomization = {
    Container: null,
    OriginalContainer: null,
    BlockHeadings: null,
    HelpUrl: '',
    PlaceholderText: '',
    ActionsHTML: null,
    MenuPopupHTML: null,
    redips: {},
    g_viewname: '',
    ListViewsHTML: '<div class="bza-bcv-menu-cont popup-container tbdd cem_child last bzapp" style="float:right" onclick="BizAPP.ViewCustomization.ListViews(event);"><table cellspacing="0" cellpadding="0"><tbody><tr><td><a class="tblink mslink" style="padding:0 2px;color:black;">Personalize</a></td><td><i class="fa fa-sort-desc" style="font:normal normal normal 16px/1 FontAwesome;position:relative;top:-2px;"></i></td></tr></tbody></table></div>',
    listViewTemplate: '<div class="list-views" style="line-height:20px;font-weight:normal;"><div class="fldiv edit" id = "edit" onmouseover="BizAPP.ViewCustomization.Highlight(event, true);" onmouseout="BizAPP.ViewCustomization.Highlight(event, false);" onclick="BizAPP.ViewCustomization.Edit(event, true, \'{1}\', \'{2}\');">Create New</div><div class="fldiv edit" id = "edit" onmouseover="BizAPP.ViewCustomization.Highlight(event, true);" onmouseout="BizAPP.ViewCustomization.Highlight(event, false);" onclick="BizAPP.ViewCustomization.LoadPersonalizedView(event, true);" style="padding-bottom:5px;">Switch to Default</div><div class="flsep" style="padding-bottom:5px;"></div><div class="fldiv" style="padding-bottom:5px;">Personalized Views</div><div class="bcv-views-cont" style="padding-left:10px;">{0}</div></div>',
    subItemTemplate: ' <option value="{0}"> {1} </option>',
    Init: function (options, html) {
        if (options.container.length) {
            BizAPP.ViewCustomization.OriginalContainer = $(options.container);
            BizAPP.ViewCustomization.Container = $(options.container).closest('[bizapp_context]');
            BizAPP.ViewCustomization.BlockHeadings = options.headings;
            BizAPP.ViewCustomization.HelpUrl = options.helpUrl;
            BizAPP.ViewCustomization.PlaceholderText = options.placeholderText;
            BizAPP.ViewCustomization.ActionsHTML = '<div class="ViewCustomAction" style="display: none">\
            <div style="display: inline">\
            <select class="formcombobox viewname" onchange="BizAPP.ViewCustomization.LoadPersonalizedView()" name="ddlPViews" style="width: 205px;display:none;"> {0} </select>\
             <input class="formtextbox" id="bza-vc-column" placeholder="no. of columns" type="number"  min="1" style="width:5rem"/>\
            <span class="stepcenternormal cancel fa fa-thumbs-up" id="cancel" onclick="BizAPP.UI.Packery.PackerySetup()" style="display:none;margin-left:2px;" title="Apply"></span>\
            <input class="formtextbox name" placeholder="Name"  id="tbPViewName" style="width:10rem;margin-left:2px;display:none" />\
            <label class="showtoall" style="display:none;font-size: 14px;vertical-align: middle;" for="chk-showtoall"> <input type="checkbox" id="chk-showtoall" class="showtoall" name="showtoall" style="display:none;margin-left:2px;margin-right: 6px;"/>Show to All</label>\
            <label class="bcv-is" style="display:none;font-size: 14px;vertical-align: middle;" for="chk-instancespecific"> <input type="checkbox" id="chk-instancespecific" class="bcv-is" name="instancespecific" style="display:none;margin-left:2px;margin-right: 6px;"/>Instance Specific</label>\
            <span class="stepcenternormal save fa fa-save" id = "save" onclick="BizAPP.ViewCustomization.Save();" style="display:none;margin-left:15px;" title="Save"></span>\
            <span class="stepcenternormal cancel fa fa-close" id="cancel" onclick="BizAPP.ViewCustomization.Cancel();" style="display:none;margin-left:2px;" title="Cancel"></span></div>\
            <span class="stepcenternormal cancel fa fa-refresh" id="cancel" onclick="$(\'.bza-vc-grid\').packery()" style="display:none;margin-left:2px;float:right" title="Relayout"></span><span class="available-ctrl-list popup-container tbdd cem_child last bzapp" style="float:right;display:none;padding: 5px!important;" onclick="BizAPP.ViewCustomization.ShowAvailableControls(event);"><table cellspacing="0" cellpadding="0"><tbody><tr><td><span style="padding:0 2px;color:black;">Available Controls</span></td><td><i class="fa fa-sort-desc" style="font:normal normal normal 16px/1 FontAwesome;position:relative;top:-2px;"></i></td></tr></tbody></table></span></div>';
            BizAPP.ViewCustomization.OriginalContainer.prepend(BizAPP.ViewCustomization.ListViewsHTML);
        }
    },
    ListViews: function (e) {
        BizAPP.ViewCustomization.LoadDependency(function () {
            var eid = BizAPP.ViewCustomization.Container.attr('bizapp_eid');
            var roid = BizAPP.ViewCustomization.Container.attr('bizapp_context');
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['GetPersonalisedViewNames', eid, roid], true,
               function (data, textStatus, jqXHR) {
                   var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                   var result = $.parseJSON(response[1]);
                   var listViewSubTemplate = '<div><table><tr><td style="width:{3};"><div class="fldiv" onclick="BizAPP.ViewCustomization.LoadPersonalizedView(event, false);">{0}</div></td>\
                    <td onclick="BizAPP.ViewCustomization.SetDefaultView(event);" ><i class="fa {1}" title="Default" style="font:normal normal normal 15px/1 FontAwesome;"></i></td>\
                    <td onclick="BizAPP.ViewCustomization.Edit(event, false, \'{4}\', \'{5}\', {7}, {8}, {9});" style="display:{2}"><i class="fa fa-edit" title="Edit" style="font:normal normal normal 15px/1 FontAwesome;"></i></td>\
                    <td  onclick="BizAPP.ViewCustomization.Remove(event);" style="display:{2}"><i class="fa fa-trash-o" bza_is="{6}" title="Remove" style="font:normal normal normal 15px/1 FontAwesome;"></i></td></tr></table></div>';
                   var listViewTemplate = '';
                   $.each(result, function (k, v) {
                       var key = k.split('[SEP]');
                       var showToAll = key[1] == "true";
                       var hasRight = (g_hasSysAdminResp || g_hasAppAdminResp) || !showToAll;
                       if (v)
                           listViewTemplate += listViewSubTemplate.format(key[0], 'fa-check-square-o', hasRight ? '' : 'none', hasRight ? '70%' : '68%', BizAPP.ViewCustomization.HelpUrl, BizAPP.ViewCustomization.PlaceholderText, key[2], key[2] == "true", v, showToAll);
                       else
                           listViewTemplate += listViewSubTemplate.format(key[0], 'fa-square-o', hasRight ? '' : 'none', hasRight ? '70%' : '68%', BizAPP.ViewCustomization.HelpUrl, BizAPP.ViewCustomization.PlaceholderText, key[2], key[2] == "true", v, showToAll);
                   });
                   BizAPP.ViewCustomization.MenuPopupHTML = BizAPP.ViewCustomization.listViewTemplate.format(listViewTemplate, BizAPP.ViewCustomization.HelpUrl, BizAPP.ViewCustomization.PlaceholderText);
                   var $target = $(e.target).closest('table');
                   BizAPP.MenuPopup.Create({ html: BizAPP.ViewCustomization.MenuPopupHTML, selector: $target, mode: 'open', position: 'bottom', callback: function () { e.stopPropagation(); $target.find('.dropdown-menu.bottom').css('margin', '0').show(); } });
               });
        });
    },
    ConstructHTML: function () {
        var listViewTemplate;
        $('.ViewControlEx:not(.ViewletControlEx)').each(function () {
            if ($(this).attr('bizapp_name'))
                listViewTemplate += BizAPP.ViewCustomization.listViewSubTemplate.format($(this).attr('bizapp_name'));
        });
        return BizAPP.ViewCustomization.listViewTemplate.format(listViewTemplate);
    },
    AddActions: function (defaultViewName) {
        if ($('.bza-bcv-menu-cont').length)
            $('.bza-bcv-menu-cont').remove();
        $('.ViewCustomAction').remove();
        if ($('.ViewCustomAction').length == 0) {
            BizAPP.ViewCustomization.Container.prepend(BizAPP.ViewCustomization.ActionsHTML);
            $('.bza-bcv-menu-cont.bzapp').next().css('clear', 'both');
        }
        if ($('.ViewCustomAction .viewname').has('option').length <= 0) {
            $('.ViewCustomAction .viewname').css('display', 'none');
            $('.ViewCustomAction .remove').css('display', 'none');
        }
        if (BizAPP.ViewCustomization.g_viewname)
            $('.ViewCustomAction .viewname').val(BizAPP.ViewCustomization.g_viewname);
        else
            $('.ViewCustomAction .viewname').val(defaultViewName);
    },
    Edit: function (e, isCreateNew, helpUrl, placeholderText, isInstanceSpecific, isDefault, showToAll) {
        BizAPP.ViewCustomization.LoadControlListAndTable(e, isCreateNew, false, helpUrl, placeholderText, isInstanceSpecific, isDefault, showToAll);
    },
    InitMenuBar: function (e, viewname, callback) {
        $('#myContainer1 .bza-vc-grid-item.w4').parent().remove();
        $('.ViewCustomAction .name').val(viewname);
        BizAPP.ViewCustomization.ShowOptions(e);
        BizAPP.ViewCustomization.LoadPersonizableControl();
        BizAPP.ViewCustomization.LoadWidgetList(callback);
    },
    Remove: function (e) {
        if (confirm('Are you sure you want to remove this Personalized View?')) {
            var $target = $(e.target), $view = $target.closest('[bizapp_name].ViewControlEx');
            var viewEnterpriseId = $view.attr('bizapp_eid');
            var viewControlName = $view.attr('bizappid');
            var roid = $view.attr('bizapp_context').split('\n')[0];
            var viewname = $target.closest('tr').find('.fldiv').text().trim();
            var selector = $view;
            var instanceSpecific = $target.attr('bza_is');
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['RemovePersonalisedViewByName', '', viewname, viewEnterpriseId, roid, instanceSpecific], true,
                function (data, textStatus, jqXHR) {
                    var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                    BizAPP.ViewCustomization.RefreshView(viewEnterpriseId, viewControlName, selector, '', roid);
                });
        }
    },
    Cancel: function () {
        var $view = $('.ViewCustomAction #save').closest('.ViewControlEx');
        var viewEnterpriseId = $view.attr('bizapp_eid');
        var viewControlName = $view.attr('bizappid');
        var viewName = $('.ViewCustomAction .name:last').val().trim();
        var roid = $view.attr('bizapp_context').split('\n')[0];
        BizAPP.ViewCustomization.RefreshView(viewEnterpriseId, viewControlName, $view, viewName, roid);
    },
    Save: function () {
        var $view = $('.ViewCustomAction #save').closest('.ViewControlEx');
        var viewEnterpriseId = $view.attr('bizapp_eid');
        var viewControlName = $view.attr('bizappid');
        var viewName = $('.ViewCustomAction .name:last').val().trim();
        var roid = $view.attr('bizapp_context').split('\n')[0];
        if (viewName) {
            BizAPP.ViewCustomization.g_viewname = viewName;
            var showToAll = $('#chk-showtoall:checked').length ? 'true' : 'false';
            var instanceSpecific = $('#chk-instancespecific:checked').length ? 'true' : 'false';
            var layout = BizAPP.ViewCustomization.GetLayout();
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['AddPersonalisedView', viewName, layout, viewEnterpriseId, viewControlName, showToAll, instanceSpecific, roid], true,
                function (data, textStatus, jqXHR) {
                    var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                    BizAPP.ViewCustomization.RefreshView(viewEnterpriseId, viewControlName, $view, viewName, roid);
                });
        }
        else {
            alert('Name is mandatory');
        }
    },
    SaveDynamicReportDesign: function () {
        var $view = $('#bza-custom-view').closest('[bizapp_name].ViewControlEx');
        var roid = $view.attr('bizapp_context').split('\n')[0];
        var layout = BizAPP.ViewCustomization.GetLayout(true);
        realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['UpdateDynamicReport', roid, layout], true,
            function (data, textStatus, jqXHR) {
                ProcessingStatus(false, true);
                BizAPP.UI.LoadView({
                    url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemb1e33[PMS]runtimeobjectid[NVS]' + BizAPP.ViewCustomization.DynamicReport._drilldownReport + '&html.jar=true&html.vcn=' + $view.parent().attr('id') + ':dummy',
                    selector: $($('[bizapp_name="View_DesignView"]').get(0)).parent()
                });
            });
    },
    GetLayout: function (isPreview) {
        var $table = $("#myContainer1 .bza-vc-grid").clone();
        $table.find('.bcv-icon,.bza-resize-menu-cont, .bza-menu-cont, .bcv-preview-cont').remove();
        var layout = $table[0].outerHTML;
        var controlsAdded = $table.find('[widid],[defeid]');
        $.each(controlsAdded, function () {
            var $this = $(this);
            if ($this.is('[defeid]')) {
                var text;
                if ($this.attr('widname'))
                    text = $this.attr('widname');
                else
                    text = $this.text().trim();
                layout = layout.replace(this.outerHTML, '<div title1="{0}" defeid="{1}" widtype="{2}"><!--{0}--></div>'.format(text, $this.attr('defeid'), $this.attr('widtype')));
            }
            else
                layout = layout.replace(this.outerHTML, '<div title1="{0}" widname="{0}" widid="{1}" widtype="{2}"><!--{1}--></div>'.format($this.attr('widname'), $this.attr('widid'), $this.attr('widtype')));
        });
        layout = layout.replace(/ui-draggable/g, '').replace(/ui-droppable/g, '');
        return layout;
    },
    ClearCell: function () {
        $('#mainTable').find('td').filter(function () {
            var color = $(this).css("background-color");
            return color === "#ADD8E6" || color === "rgb(173, 216, 230)";
        }).html('');
    },
    SetDefaultView: function (e) {
        $target = $(e.target);
        var isDefault = $target.hasClass('fa-square-o');
        var viewname = $target.closest('tr').find('.fldiv').text().trim();
        var viewEnterpriseId = BizAPP.ViewCustomization.Container.attr('bizapp_eid');
        realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['SetDefaultView', viewEnterpriseId, isDefault, viewname, "true"], true,
            function (data, textStatus, jqXHR) {
                var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                $target.closest('.list-views').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o');
                if (isDefault)
                    $target.removeClass('fa-square-o').addClass('fa-check-square-o');
            });
    },
    LoadPersonalizedView: function (e, isDefault) {
        var $target = $(e.target), $view = $target.closest('[bizapp_name].ViewControlEx');
        var viewEnterpriseId = $view.attr('bizapp_eid');
        var viewControlName = $view.attr('bizappid');
        var roid = $view.attr('bizapp_context').split('\n')[0];
        var viewname = "";
        if (!isDefault)
            viewname = $target.closest('tr').find('.fldiv').text().trim();
        var selector = $view;
        BizAPP.ViewCustomization.g_viewname = viewname;
        BizAPP.ViewCustomization.RefreshView(viewEnterpriseId, viewControlName, selector, viewname, roid);
    },
    Highlight: function (e, highlight) {
        var $target = $(e.target);
        if (highlight)
            $target.css("border-bottom", "2px dotted #456A90");
        else
            $target.css("border-bottom", "");
    },
    ShowOptions: function (e) {
        $('.ViewCustomAction .viewname').css('display', 'none');
        if (e && $(e.target).hasClass('fa-edit')) {
            $('.ViewCustomAction .remove').css('display', 'inline');
        }
        $('.ViewCustomAction .name').css('display', 'inline');
        if (g_hasSysAdminResp || g_hasAppAdminResp) {
            $('.ViewCustomAction .showtoall').css('display', 'inline-block');
        }
        $('.ViewCustomAction .bcv-is').css('display', 'inline-block');
        $('.ViewCustomAction .save').css('display', 'inline');
        $('.ViewCustomAction .cancel').css('display', 'inline');
        $('.ViewCustomAction .available-ctrl-list').css('display', 'inline');
    },
    LoadWidgetManager: function () {
        BizAPP.ViewCustomization.LoadWidgetView('.widget-manager-list', function () {
            $('.widget-manager-list').find('[bza_data]').show();
        });
    },
    LoadDesignView: function (event, helpUrl, placeholderText) {
        $('#bza-custom-view').remove();
        BizAPP.ViewCustomization.Container = $('#reportdesign');
        BizAPP.ViewCustomization.LoadDependency(function () {
            BizAPP.ViewCustomization.LoadControlListAndTable(event, true, true, helpUrl, placeholderText);
            $('.secondary').find('#vctab1').hide();
            BizAPP.ViewCustomization.LoadWidgetList(function () {
                $('.ViewCustomAction .fa-save,.ViewCustomAction .fa-close').hide();
                $('.ViewCustomAction .fa-thumbs-up,.ViewCustomAction .fa-refresh').show();
            });
        });
    },
    LoadWidgetList: function (callback) {
        BizAPP.ViewCustomization.LoadWidgets('.widget-list', function () {
            BizAPP.ViewCustomization.ToggleActiveTab('vctab2');
            if (!jQuery.ui) {
                $.getScript(BizAPP.UI.GetBasePath("Resources/Javascripts/JQuery/jquery-ui.js"));
            }
        });
        BizAPP.ViewCustomization.LoadGlobalWidgets('.globalwidget-list', function () {
        	$('.bcv-btn-group').append($('.ViewCustomAction').css('display', 'inline'));
        	if (callback) callback();
        	closeMenuPopup();
        });
        // BizAPP.ViewCustomization.LoadWidgetView('.widget-manager-list', function () {
        // $('.bcv-btn-group').append($('.ViewCustomAction').css('display', 'inline'));
        // if (!jQuery.ui) {
        // $.getScript(BizAPP.UI.GetBasePath("Resources/Javascripts/JQuery/jquery-ui.js"));
        // }
        // closeMenuPopup();
        // $('.widget-manager-list').find('[bza_data]').show();
        // if(callback)callback();
        // });
    },
    LoadControlListAndTable: function (e, isCreateNew, isReportDesign, helpUrl, placeholderText, isInstanceSpecific, isDefault, showToAll) {
        isReportDesign = isReportDesign || false;
        var viewLayout = '<div class="bza-vc-grid">\
			                                <style id="bza-vc-style">\
				                                .bza-vc-grid-item, .bzaw1 { width: 250px; }\
                                                .bzaw2 { width: calc((250px * 2) + 10px); }\
                                                 .bzaw3 { width: calc((250px * 3) + (10px * 2)); }\
                                        </style>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                        <div class="bza-vc-grid-item"><div class="bza-vc-boxed"></div></div>\
                                    </div>'
        var tableHTML = '<div id="bza-custom-view" style="clear: both;">\
                            <style>.pckry_container .bza-vc-grid-item:hover { cursor: move; }.pckry_container .bza-vc-boxed:hover { background: aliceblue; }</style>\
                            <ul class="tbar global"><li id="vctabLayout" page="vcpageLayout" class="tbn tbact" onclick="BizAPP.ViewCustomization.LoadWidgetList();BizAPP.ViewCustomization.ToggleActiveTab(this.id, true);">Layout</li><li id="vctabWidget" page="vcpageWidget" class="tbn" onclick="BizAPP.ViewCustomization.LoadWidgetManager();BizAPP.ViewCustomization.ToggleActiveTab(this.id, true);">Widget Manager</li></ul>\
		                    <div id="vcpageLayout" rettab="true" class="tp" style="display: block;"><table style="width:100%;"><tr ><td><div class="btn-toolbar">\
                                <div class="bcv-btn-group" style="padding: 5px;"></div>\
                            </div></td><td class="bza-help-link" style="text-align: center;"><span style="color:#123f76;font-weight:bold;">{1}</span></td><td></td></tr>\
		                    <tr><td style="width:99%" colspan="2"><div id="myContainer1">\
		                    	{0}\
		                    </div></td>\
	                      <td style="width:14%;vertical-align:top;display:none;">\
                            <ul class="tbar secondary">\
                            <li id="vctab2" page="vcpage2" class="tbn tbact" onclick="BizAPP.ViewCustomization.ToggleActiveTab(this.id);">Widgets</li>\
                            <li id="vctab3" page="vcpage3" class="tbn" onclick="BizAPP.ViewCustomization.ToggleActiveTab(this.id);">Widget Controls</li>\
                            <li id="vctab4" page="vcpage4" class="tbn" onclick="BizAPP.ViewCustomization.ToggleActiveTab(this.id);">Global Widgets</li>\
                            <li id="vctab1" page="vcpage1" class="tbn" onclick="BizAPP.ViewCustomization.ToggleActiveTab(this.id);">Controls</li></ul>\
                            <div id="vcpage1" rettab="true" class="tp"><div class="control-list-cont" style="float:right;height:430px;width:400px;margin-top:15px;overflow:auto">\
                            <div class="gridbox" hideindex="" subview="" processed="1" initcaption="1"><div class="grd"><div class="grid" >\
                            <table class="grid tablesaw-columntoggle" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">\
                            <tbody><tr valign="top" class="multiselect ui-draggable"><td><div class="fill">\
                            <table ecols="" cellspacing="0" cellpadding="0" class="gridcontrol tablesaw tablesaw-columntoggle"><thead>\
                            <tr class="bza_vdg_header"><th class="gridsortnone tablesaw-priority-2" sortid="Name" data-priority="2" style="padding-left: 20px;">Name</th>\
                            </tr></thead><tbody><tr class="gfr"><td >\
                            <div class="control-list"></div></td></tr></tbody></table></div></td></tr></tbody></table></div></div></div></div></div>\
                            <div id="vcpage2" rettab="true" class="tp"><div class="widget-list" style="float:right;height:430px;width:400px;margin-top:5px;overflow:auto"></div></div>\
                            <div id="vcpage3" rettab="true" class="tp"><div class="widgetcontrol-list-cont" style="float:right;height:430px;width:400px;margin-top:15px;overflow:auto">\
                            <div class="gridbox" hideindex="" subview="" processed="1" initcaption="1"><div class="grd"><div class="grid" >\
                            <table class="grid tablesaw-columntoggle" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">\
                            <tbody><tr valign="top" class="multiselect ui-draggable"><td><div class="fill">\
                            <table ecols="" cellspacing="0" cellpadding="0" class="gridcontrol tablesaw tablesaw-columntoggle"><thead>\
                            <tr class="bza_vdg_header"><th class="gridsortnone tablesaw-priority-2" sortid="Name" data-priority="2" style="padding-left: 20px;">Name</th>\
                            </tr></thead><tbody><tr class="gfr"><td >\
                            <div class="widgetcontrol-list"></div></td></tr></tbody></table></div></td></tr></tbody></table></div></div></div></div></div>\
                            <div id="vcpage4" rettab="true" class="tp"><div class="globalwidget-list" style="float:right;height:430px;width:400px;margin-top:15px;overflow:auto"></div></div>\
                            </td></tr></table></div>\
                        <div id="vcpageWidget" rettab="true" class="tp" style="display: none;">\
                            <table style="width: 100%;"><tr><td>\
                                <div id="WidgetDrilldownContainer" class="widget-manager-drilldown"></div></td>\
                                <td style="vertical-align: top;"><div class="widget-manager-list"></td></tr></table></div>\
                        <div id="vcpagePreview" rettab="true" class="tp" style="display: none;">\
                            <div class="preview-cust-view"></div>\
                        </div></div>';

        var exists = $('#reportdesign .bza-vc-grid').length > 0
        tableHTML = tableHTML.format(isCreateNew ? exists ? $('#reportdesign').html() : viewLayout : '', '');
        var parent_container = BizAPP.ViewCustomization.Container;
        parent_container.html($(tableHTML));
        BizAPP.ViewCustomization.AddActions('');

        if (helpUrl) {
            var helpLinkHtml = '<a tabindex="-1" target="_blank" href="{0}" style="font-size:1.1rem;padding-left: 10px;" title="Help"><i class="fa fa-question-circle"></i></a>'.format(helpUrl);
            parent_container.find('.bza-help-link').append(helpLinkHtml);
        }

        if (isReportDesign) {
            var $table = $('#reportlayout').find('table');
            if ($table.hasClass('customized-view')) {
                BizAPP.ViewCustomization.LoadWidgetsFromLayout($table);
                $('#mainTable').html($table.html());
            }
            if ($('.available-ctrl-list').length == 0)
                $('.lnksave').closest('tr').append('<td><span class="stepcenternormal cancel fa fa-refresh" id="cancel" onclick="$(\'.bza-vc-grid\').packery()" style="display:none;margin-left:2px;float:right" title="Relayout"></span><span class="available-ctrl-list popup-container tbdd cem_child last bzapp" style="float:right;width: 130px;padding: 5px!important;margin-top: 10px;" onclick="BizAPP.ViewCustomization.ShowAvailableControls(event);"><table cellspacing="0" cellpadding="0"><tbody><tr><td><span style="padding:0 2px;color:black;">Available Controls</span></td><td><i class="fa fa-sort-desc" style="font:normal normal normal 16px/1 FontAwesome;position:relative;top:-2px;"></i></td></tr></tbody></table></span></td>');
            else
                $('.available-ctrl-list').show();

            BizAPP.ViewCustomization.ToggleActiveTab('vctab2');
            BizAPP.UI.Packery.Init();
        }
        else {
            if (isCreateNew) {
                BizAPP.ViewCustomization.InitMenuBar(e, '', function () {
                    BizAPP.ViewCustomization.ToggleActiveTab('vctab2');
                    BizAPP.UI.Packery.Init();
                });
            }
            else {
                var viewEnterpriseId = BizAPP.ViewCustomization.Container.attr('bizapp_eid');
                var viewControlName = BizAPP.ViewCustomization.Container.attr('bizappid');
                var roid = BizAPP.ViewCustomization.Container.attr('bizapp_context').split('\n')[0];
                var viewname = $(e.target).closest('tr').find('.fldiv').text().trim();
                var selector = $('#myContainer1');
                $('#chk-defaultview').prop('checked', isDefault);
                $('#chk-showtoall').prop('checked', showToAll);
                $('#chk-instancespecific').prop('checked', isInstanceSpecific);
                $('.bcv-is').hide();
                BizAPP.ViewCustomization.RefreshView(viewEnterpriseId, viewControlName, selector, viewname, roid, function () {
                    setTimeout(function () {
                        BizAPP.ViewCustomization.InitMenuBar(e, viewname, function () {
                            BizAPP.UI.Packery.Init();
                        });
                    }, 1000);
                });
            }
        }
    },

    ShowAvailableControls: function (e) {
        var _title = '<span>{0}</span>'.format('Available Controls');
        var _body = '<div id="available-ctrls" class="available-ctrls" style="color: black;"><table><tr><td></td></tr></table></div>';
        var _steps = '<div><table cellspacing="0" cellpadding="0" align="Left" style="border-collapse:collapse;"><tbody><tr valign="top"><td valign="middle" style="padding:2px;"><div onmouseover="highlightstep(this);" onmouseout="normalizestep(this);" style="height:100%;width:100%;"><span accesskey="C" class="stepcenternormal cancelstep" onclick="zoomout();">Close</span></div></td></tr></tbody></table></div>';
        var options = { 'headline': _title, 'body': _body, 'steps': _steps };
        var _popupMarkup = BizAPP.UI.InlinePopup.GetMarkupWithTemplate(options);
        BizAPP.MenuPopup.Create({ html: _body, selector: $('.available-ctrl-list').find('span'), mode: 'open', position: 'bottom', callback: function () { e.stopPropagation(); BizAPP.ViewCustomization.PopulateAvailableControls(e); $('.available-ctrl-list').removeAttr('onclick'); } });
    },
    PopulateAvailableControls: function (e) {
        addLog('PopulateAvailableControls');
        if (!$('#available-ctrls').find('ul.secondary').length) {
            $('#available-ctrls td').append($('ul.secondary').closest('td').html());
        }
        $(e.target).find('.dropdown-menu.bottom').show();
        BizAPP.ViewCustomization.CleanUpGrid();
    },
    LoadWidgetsFromLayout: function ($table) {
        $table.removeClass('bcv-tbl');
        $table.find('tr').removeClass('bcv-tbl-row');
        $table.find('td').removeClass('bcv-tbl-col');
        var $containers = $table.find(".bcv-cont");
        if ($containers.length == 0)
            $containers = $table.find("td");
        $containers.each(function () {
            var $container = $(this);
            var $val = $($container.find('[widid],[defeid]'));
            $val.filter('*').contents().each(function () {
                if (this.nodeType == 8) {
                    $(this).remove()
                }
            });
            if ($val.is('[widname]'))
                $val.text($val.attr('widname'));
            else {
                var text = $val.attr('title1');
                if (!text)
                    text = $val.attr('title');
                $val.text(text);
            }
            if ($container.is('.bcv-cont'))
                $container = $container.closest('td');
            $container.html($val);
            $container.prepend(BizAPP.ViewCustomization.GetIconHtml($val.attr('widtype')));
        });
    },
    ToggleActiveTab: function (id, isGlobal) {
        var $activeTab = $('#bza-custom-view, .available-ctrls').find('.{0} .tbact'.format(isGlobal ? 'global' : 'secondary'));
        var pageToHide = $activeTab.attr('page');
        $('#bza-custom-view, .available-ctrls').find('#' + pageToHide).hide();
        $activeTab.removeClass('tbact');

        var pageName = $('#' + id).attr('page');
        $('#bza-custom-view, .available-ctrls').find('#' + pageName).show();
        $('#bza-custom-view, .available-ctrls').find('#' + id).addClass('tbact');
    },
    LoadPersonizableControl: function () {
        var eid = BizAPP.ViewCustomization.Container.attr('bizapp_eid');
        realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['GetPersonalizableControls', eid], true,
            function (data, textStatus, jqXHR) {
                var response = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                var result = $.parseJSON(response[1]);
                var array = Object.keys(result);
                for (i = 0; i < array.length; i++) {
                    var name = array[i].split('[SEP]')[0];
                    var type = array[i].split('[SEP]')[1];
                    var controlType = array[i].split('[SEP]')[2];
                    var icon = BizAPP.ViewCustomization.GetIconHtml(type);
                    if (controlType == 'Control') {
                        $('.control-list').append($('<div class="bvc-ctrl-nm">' + icon + '<span title1="' + name + '" defeid= "' + result[array[i]] + '" widtype= "' + type + '" style="white-space:nowrap;overflow: hidden;text-overflow:ellipsis;cursor:pointer;">' + name + '</span></div><hr style="margin-bottom:5px;margin-top:0px;"/>'));
                    }
                    else {
                        var displayName = controlType.split('[NS]')[1];
                        $('.widgetcontrol-list').append($('<div class="bvc-widget-nm">' + icon + '<span title1="' + displayName + '" defeid= "' + result[array[i]] + '" widtype= "' + type + '" widname= "' + name + '" style="white-space:nowrap;overflow: hidden;text-overflow:ellipsis;cursor:pointer;">' + displayName + '</span></div><hr style="margin-bottom:5px;margin-top:0px;"/>'));
                    }
                }
                if (!$('.control-list').html())
                    $('.secondary').find('#vctab1').hide();

                if (!$('.widgetcontrol-list').html())
                    $('.secondary').find('#vctab3').hide();
            });
    },
    LoadWidgets: function (selector, callback) {
        var viewName = $(selector).closest('[bizapp_name].ViewControlEx').attr('bizappid');
        var viewdef = 'ESystemaebec';//'ESystemaebf0';
        var ctrlName = 'viewDataGrid2';//'Query_Widget_All';//'TestWidget1';//
        var selectorToPass = $(selector);
        var options = { viewdef: viewdef, controlname: ctrlName, context: '', viewname: viewName, selector: selectorToPass, callback: callback };
        BizAPP.UI.LoadControl(options);
    },
    LoadGlobalWidgets: function (selector, callback) {
        var viewName = $(selector).closest('[bizapp_name].ViewControlEx').attr('bizappid');
        var viewdef = 'ESystemb3b79';//'ESystemaebf0';
        var ctrlName = 'vdg_allWidgets';//'Query_Widget_All';//'TestWidget1';//
        var selectorToPass = $(selector);
        var options = { viewdef: viewdef, controlname: ctrlName, context: '', viewname: '', selector: selectorToPass, callback: callback };
        BizAPP.UI.LoadControl(options);
    },
    LoadWidgetView: function (selector, callback) {
        BizAPP.UI.LoadView({
            url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemb217f&html.jar=true',
            selector: $(selector),
            callback: function () { callback(); }
        });
    },
    CleanUpGrid: function () {
        var grids = $('.bza-dropdown .widget-list div.grid, .bza-dropdown .globalwidget-list div.grid').not('.bza-vc-cleanupgrid');
        addLog('CleanUpGrid ' + grids.length);
        if (grids.length) {
            grids.addClass('bza-vc-cleanupgrid');
            grids.find('table.gpr').closest('tr').remove();
            $('.widget-list .gridcontrol tr[roid], .globalwidget-list .gridcontrol tr[roid]').each(function () {
                var isGlobalWidget = $(this).closest('.globalwidget-list').length;
                if (!isGlobalWidget) {
                    var a = $(this).find("td:eq(4)");
                    var b = a.text().split('.');
                    a.text(b[b.length - 1]);
                    $('.widget-list .gridcontrol th:eq(1)').text('');
                }

                var c, d;
                if (isGlobalWidget) {
                    c = $(this).find("td:eq(0)");
                    d = 'Custom';
                }
                else {
                    c = $(this).find("td:eq(1)");
                    d = c.text();
                }
                c.html(BizAPP.ViewCustomization.GetIconHtml(d));
            });

            BizAPP.ViewCustomization.EnableDragAndDrop();
        }
    },
    GetIconHtml: function (type) {
        var html = '';
        switch (type) {
            case "Grid":
                html = '<span class="bcv-icon fa-table" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin-right: 5px;" title="Grid"></span>';
                break;
            case "BizAPP.Modeler.FormDesigner.Controls.ViewDataGrid":
                html = '<span class="bcv-icon fa-table" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin: 4px 5px 0 0;" title="Grid"></span>';
                break;
            case "Advanced List":
                html = '<span class="bcv-icon fa-th-list" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin-right: 5px;" title="Advanced List"></span>';
                break;
            case "BizAPP.Modeler.FormDesigner.Controls.AdvancedListControl":
                html = '<span class="bcv-icon fa-th-list" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin: 4px 5px 0 0;" title="Advanced List"></span>';
                break;
            case "Chart":
                html = '<span title="Chart" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin-right: 5px;" class="bcv-icon fa-bar-chart"></span>';
                break;
            case "BizAPP.Modeler.FormDesigner.Controls.ChartControl":
                html = '<span title="Chart" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin: 4px 5px 0 0;" class="bcv-icon fa-bar-chart"></span>';
                break;
            case "Custom":
                html = '<span title="Custom" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin-right: 5px;" class="bcv-icon fa-cog"></span>';
                break;
            case "BizAPP.Modeler.FormDesigner.Controls.HTMLControl":
                html = '<span title="Custom" style="font: normal normal normal 14px/1 FontAwesome;float: left;margin: 4px 5px 0 0;" class="bcv-icon fa-cog"></span>';
                break;
        }
        return html;
    },
    LoadDependency: function (callback) {
        if (typeof REDIPS != "undefined") {
            if (callback) callback();
        }
        else {
            $.getCss(BizAPP.UI.GetBasePath("Resources/ViewCustomization/combined.132.css"));
            BizAPP.UI.TextEditor.LoadFontAwesomeCss();
            $.cachedScript(BizAPP.UI.GetBasePath("Resources/ViewCustomization/combined.132.js")).done(function () {
                if (callback) callback();
            });
        }
    },
    EnableDragAndDrop: function () {
        addLog('register dnd');
        $(".control-list div, .widgetcontrol-list div, .widget-list tr, .globalwidget-list tr").not('.ui-draggable').draggable({
            containment: $("#myContainer1 .bza-vc-grid"),
            opacity: 0.7,
            cursor: "move",
            cursorAt: { top: -5, left: -5 },
            zIndex: 10000,
            helper: 'clone',
            create: function () { addLog('dnd created') },
            start: function () {
                addLog('start dnd');
                var $container = $('.ui-draggable-dragging');
                $('body').append($container);

                var tooltipSpan = document.getElementById('tooltip-span');
                window.onmousemove = function (e) {
                    var x = e.clientX,
                        y = e.clientY;
                    $container.get(0).style.top = (y + 10) + 'px';
                    $container.get(0).style.left = (x + 10) + 'px';
                };
                if (isFirefox())
                    $('.available-ctrl-list .dropdown-menu.bottom').css('position', 'absolute').css('left', '1000px');
                else
                    closeMenuPopup();
            },
        });

        $('#myContainer1 .bza-vc-boxed').not('.ui-droppable').droppable({
            drop: function (event, ui) {
                addLog('stop dnd');
                var $this = $(this);
                if ($this.find('.bcv-preview-cont').length) {
                    if (confirm('Do you want to replace existing widget/control in this cell?'))
                        BizAPP.ViewCustomization.InternalDrop(event, ui, $this);
                }
                else {
                    BizAPP.ViewCustomization.InternalDrop(event, ui, $this);
                }
                if (isFirefox())
                    $('.available-ctrl-list .dropdown-menu.bottom').css('position', '').css('left', '');
            }
        });
    },
    InternalDrop: function (event, ui, $target) {
        if ($('.control-list, .widgetcontrol-list').is(":visible")) {
            $target.append($(ui.draggable).clone().html());
            // To show preview
            var $selector = $target.append('<div class="bcv-preview-cont"><div class="bcv-preview"></div><div class="bcv-overlay"></div></div>').find('.bcv-preview');
            var $this = $(this);
            var $dragItem = $(ui.draggable).find('[defeid]');
            var viewName = $('.stepcenternormal.save').closest('[bizapp_name].ViewControlEx').attr('bizappid');
            var viewdef = $dragItem.attr('defeid');

            var ctrlName;
            if ($('.widgetcontrol-list').is(":visible"))
                ctrlName = $dragItem.attr('widname');
            else
                ctrlName = $dragItem.attr('title1');

            var options = { viewdef: viewdef, controlname: ctrlName, context: $target.closest('[bizapp_context]').attr('bizapp_context').split('\n')[0], viewname: viewName, selector: $selector };
            BizAPP.UI.LoadControl(options);
        }
        else {
            var roid, text, title;
            if (ui.draggable.is('td')) {
                roid = ui.draggable.parent().attr('roid');
                text = ui.draggable.text().trim();
            }
            else {
                var ind = $(ui.draggable).closest('table').find('th:contains("Name")').index();
                var indStr = ind.toString();
                var isGlobalWidget = $('.globalwidget-list').is(":visible");
                roid = ui.draggable.attr('roid');
                text = ui.draggable.find('td:eq({0})'.format(indStr)).text().trim();
                if (isGlobalWidget)
                    title = ui.draggable.find('td:eq({0})'.format(ind + 1)).text();
                else
                    title = ui.draggable.find('td:eq({0})'.format(indStr)).find('[caption]').attr('caption');
            }
            var $iconEle = ui.draggable.find('td:eq({0})'.format(ind - 1));
            var widType;
            if ($iconEle.find('div').length)
                widType = $iconEle.find('div').attr('title1');
            else
                widType = $iconEle.find('span').attr('title');
            var widId;
            if (isGlobalWidget)
                widId = 'globalwidget:' + roid.split(':')[0];
            else
                widId = 'widget:' + roid.split(':')[0];

            $target.append('<div title1="{3}" widId="{1}" widName="{0}" widType="{2}">{0}</div>'.format(text, widId, widType, title ? title : ''));
            var vieweid;
            if (isGlobalWidget)
                vieweid = roid.split(':')[0];
            else
                vieweid = $('.stepcenternormal.save').closest('[bizapp_name].ViewControlEx').attr('bizapp_eid');

            var $selector = $target.prepend('<div class="bcv-preview-cont"><div class="bcv-preview" id="chartWidget' + roid.split(':')[0] + '"></div><div class="bcv-overlay"></div></div>').find('.bcv-preview');
            var $view = $('.stepcenternormal.save').closest('[bizapp_name].ViewControlEx');
            var options = { vieweid: vieweid, context: $view.attr('bizapp_context').split('\n')[0], vcn: $view.attr('bizappid'), selector: $selector, widget: roid.split(':')[0] };
            if (isGlobalWidget)
                BizAPP.UI.LoadGlobalWidget(options)
            else 
                BizAPP.UI.LoadWidget(options)
        }
        $target.children('span, div').not('.bcv-preview-cont').hide();
    },
    IsEligibleToMerge: function (opt) {
        var eligible2Merge = false;
        var $cell = opt.cell.view.dom;
        if (opt.colspan > 1) {
            var $currentCell = $cell;
            for (var i = 1; i < opt.colspan; i++) {
                $currentCell = $currentCell.next();
                if ($currentCell.find('[widId],[defeid]').length && $cell.find('[widId],[defeid]').length) {
                    eligible2Merge = confirm('Content will be lost') == true ? true : false;
                    break;
                } else if (opt.colspan == i + 1) {
                    eligible2Merge = !eligible2Merge ? true : false;
                }

                var content = $currentCell.find('[widId],[defeid]');
                if (eligible2Merge && content) {
                    $cell.append(content);
                }
            }
        } else if (opt.rowspan > 1) {
            var $currentCell = $cell;
            for (var i = 1; i < opt.rowspan; i++) {
                var nextRow = $cell.parent().next();
                $currentCell = nextRow.find('td:eq(' + $cell.index() + ')');
                if ($currentCell.find('[widId],[defeid]').length && $cell.find('[widId],[defeid]').length) {
                    eligible2Merge = confirm('Content will be lost') == true ? true : false;
                    break;
                } else if (opt.rowspan == i + 1) {
                    eligible2Merge = !eligible2Merge ? true : false;
                }

                var content = $currentCell.find('[widId],[defeid]');
                if (eligible2Merge && content) {
                    $cell.append(content);
                }
            }
        } else {
            eligible2Merge = true;
        }
        return eligible2Merge;
    },
    ClearSelectedControls: function () {
        var $selected = $('.selected');
        $selected.find('[widId],[defeid]').remove();
    },
    RefreshView: function (viewEnterpriseId, viewControlName, selector, personalizedViewName, runtimeObjectId, callback) {
        BizAPP.UI.LoadView({ url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]' + viewEnterpriseId + '[PMS]runtimeobjectid[NVS]' + runtimeObjectId + '[PMS]navigationcontrol.ignoreprocess[NVS]true&html.jar=true&html.vcn=' + viewControlName + '&html.personalizedviewname=' + personalizedViewName, selector: selector, inlinePopup: false, showprocessing: true, callback: callback });
    }
}

BizAPP.ViewCustomization.DynamicReport = {
    _valueSet: '',
    Template: '',
    SubTemplate: '',
    currentParams: '',
    StringTemplate: '<td><span class="formfieldlabel" title="{2}">{0}</span></br><input type="text" class="dynamic-ctrl formtextbox" title="{2}" name="{0}" value="{1}"/></td>',
    DateTimeTemplate: '<td><span class="formfieldlabel" title="{3}">{0}</span></br><input type="text" id="{1}" class="dynamic-ctrl" title="{3}" bizappid="{1}" name="{0}" value="{2}"/></td>',
    AllowedValueSingleSelectionTemplate: '<td><span class="formfieldlabel" title="{3}">{0}</span></br><select  class="dynamic-ctrl formcombobox" title="{3}" bizappid="{1}" name="{0}"><option value="">&nbsp;</option>{2}</select></td>',
    AllowedValueMultiSelectionTemplate: '<td><span class="formfieldlabel" title="{3}">{0}</span></br><div class="dynamic-chkbox-list dynamic-ctrl" name="{0}"><table><tr>{2}</tr></table></div></td>',
    QueryTemplate: '<td><span class="formfieldlabel" title="{2}">{0}</span></br><input type="text" title="{2}" class="dynamic-ctrl formtextbox {6}" style="margin-bottom: 0px;" name="{0}" bza_qid="{4}" bza_fields="{3}" bza_valuefield="{5}" bza_value="" value="{1}" autocomplete="off" placeholder="type for suggestions"/></td>',
    _drilldownReport: '',
    Execute: function (e) {
        if (BizAPP.ViewCustomization.DynamicReport._designmode) {
            $('.linkAddToMyFavourites, .linkRemoveFromFavourites').hide();
            if ($('.lnksave').length == 0)
                $('<td><div class="stepcenternormal save lnkbtn lnksave" onclick="BizAPP.ViewCustomization.SaveDynamicReportDesign(true);"><div>Save</div></div></td>').insertBefore($('.linkBack').closest('td'));
        }

        BizAPP.ViewCustomization.DynamicReport.Template = "<style>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                .report-parms td {";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    padding: 0 10px;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                }";
        BizAPP.ViewCustomization.DynamicReport.Template += "";
        BizAPP.ViewCustomization.DynamicReport.Template += "                select.formcombobox {";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    min-width: 214px;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                }";
        BizAPP.ViewCustomization.DynamicReport.Template += "";
        BizAPP.ViewCustomization.DynamicReport.Template += "                .report-options .lnkbtn {";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    margin: 0 30px;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                }";
        BizAPP.ViewCustomization.DynamicReport.Template += "                .dynamic-report-params td {vertical-align: top;}";
        BizAPP.ViewCustomization.DynamicReport.Template += "                .stepcontainer {";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    border-top: solid 2px black;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    margin: 5px;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    padding-top: 5px;";
        BizAPP.ViewCustomization.DynamicReport.Template += "                }";
        BizAPP.ViewCustomization.DynamicReport.Template += "            <\/style>";
        BizAPP.ViewCustomization.DynamicReport.Template += "            <div class=\"report-parms\" style=\"width: 550px;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                <div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                        <tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                            <td width=\"100%\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                <table style=\"width: 100%;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                    <tbody>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                        <tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                            <td><span class=\"pq_title\" locstring=\"\">Parameters<\/span><\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                            <td style=\"vertical-align: bottom;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <div style=\"float: right;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <select class=\"formcombobox dr-saved-params\" onchange=\"BizAPP.ViewCustomization.DynamicReport.PopulateSavedParams();\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                        ";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <\/select>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                            <\/td><td valign=\"middle\" style=\"padding: 2px;width: 20%;\"><table><tr><td style=\"padding: 2px;\"><div onmouseover=\"highlightstep(this);\" onmouseout=\"normalizestep(this);\" style=\"height: 100%; width: 100%;\"><span accesskey=\"C\" class=\"stepcenternormal cancelstep\" onclick=\"BizAPP.ViewCustomization.DynamicReport.UpdateReportParameter();\">Update</span></div></td><td style=\"padding: 2px;\"><div onmouseover=\"highlightstep(this);\" onmouseout=\"normalizestep(this);\" style=\"height: 100%; width: 100%; padding-right: 10px;\"><span accesskey=\"C\" class=\"stepcenternormal cancelstep\" onclick=\"BizAPP.ViewCustomization.DynamicReport.RemoveReportParameter();\">Remove</span></div></td></tr></table></td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                        <\/tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                    <\/tbody>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                <\/table>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                <span class=\"pq_groupborder\"><\/span><\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                        <\/tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <\/table>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                {1}<div class=\"dynamic-report-params\" style=\"max-height: 350px; overflow: auto;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <table style=\"padding: 0 20px;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                        <tr>{0}<\/tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <\/table>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                <div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                        <tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                            <td style=\"padding-top: 20px;\"><span class=\"pq_groupborder\"><\/span>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                <div style=\"float: right\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                    <table cellspacing=\"0\" cellpadding=\"0\" align=\"Left\" style=\"border-collapse: collapse;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                        <tbody>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                            <tr valign=\"top\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <td valign=\"middle\" style=\"padding: 2px;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <div style=\"height: 100%; width: 100%;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                        <input type=\"text\" class=\"report-param-name\" placeholder=\" Name\" style=\"width: 200px; margin-top: 8px;\"><\/input>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <td valign=\"middle\" style=\"padding: 2px;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <div onmouseover=\"highlightstep(this);\" onmouseout=\"normalizestep(this);\" style=\"height: 100%; width: 100%; padding-right: 10px;\"><span accesskey=\"C\" class=\"stepcenternormal cancelstep\" onclick=\"BizAPP.ViewCustomization.DynamicReport.SaveReportParameters();\">Save<\/span><\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <td valign=\"middle\" style=\"padding: 2px;\">";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                    <div onmouseover=\"highlightstep(this);\" onmouseout=\"normalizestep(this);\" style=\"height: 100%; width: 100%;\"><span accesskey=\"S\" class=\"stepcenternormal\" onclick=\"BizAPP.ViewCustomization.DynamicReport.RunReport();\" prevstate=\"normal\">Run Report<\/span><\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                                <\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                            <\/tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                    <\/table>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                                <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                            <\/td>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                        <\/tr>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                    <\/table>";
        BizAPP.ViewCustomization.DynamicReport.Template += "                <\/div>";
        BizAPP.ViewCustomization.DynamicReport.Template += "            <\/div>";

        BizAPP.ViewCustomization.DynamicReport.SubTemplate = '';
        var $frm = $('[bizapp_name="View_DynamicReportDetails_Drilldown"]');
        if (!BizAPP.ViewCustomization.DynamicReport._valueSet)
            BizAPP.ViewCustomization.DynamicReport._drilldownReport = $frm.attr('bizapp_context').split('\n')[0];
        var qry = BizAPP.Session.ExecuteQuery({ queryEid: 'ESystemb228f', contexts: $frm.attr('bizapp_context'), pageSize: 20, pageNo: 0, identifiersOnly: false, handleResponse: true });
        if (qry.length) {
            var dateCtrlIds = new Array();
            $.each(qry, function (i, v) {
                var rowStr = ''
                if (i % 2 == 0) {
                    rowStr = '</tr><tr>';
                }
                var $this = v;
                var type = $this["Value Type"];
                switch (type) {
                    case "String":
                        BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.StringTemplate.format($this.Name, $this["String Value"] ? $this["String Value"] : '', $this.Description ? $this.Description : '');
                        break;
                    case "Date Time":
                        var id = 'datepicker' + $this.Name.replace(' ', '');
                        dateCtrlIds.push(id + '[SEP]' + type);
                        BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.DateTimeTemplate.format($this.Name, id, $this["Date Time Value"] ? $this["Date Time Value"] : '', $this.Description ? $this.Description : '');
                        break;
                    case "Allowed Values":
                        var optionStr = '';
                        var id = 'select' + $this.Name.replace(' ', '');
                        var isSingleSelection = $this["Is Single Selection"];
                        if (isSingleSelection) {
                            $.each($this["Allowed Values"].split(','), function (index, value) {
                                optionStr += '<option value="{0}">{0}</option>'.format(value);
                            });
                            BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.AllowedValueSingleSelectionTemplate.format($this.Name, id, optionStr, $this.Description ? $this.Description : '');
                        }
                        else {
                            $.each($this["Allowed Values"].split(','), function (index, value) {
                                var rowStr = ''
                                if (index % 2 == 0) {
                                    rowStr = '</tr><tr>';
                                }
                                optionStr += '{2}<td><div><label><input type="checkbox" name="{1}" value="{0}">{0}</label></div></td>'.format(value, id, rowStr);
                            });
                            BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.AllowedValueMultiSelectionTemplate.format($this.Name, id, optionStr, $this.Description ? $this.Description : '');
                        }
                        break;
                    case "Query":
                        var isSingleSelection = $this["Is Single Selection"];
                        if (isSingleSelection) {
                            var queryId = $this["Query Id UniqueID"] ? $this["Query Id UniqueID"] : ($this["Dynamic Query Id UniqueID"] ? $this["Dynamic Query Id UniqueID"] : '');
                            BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.QueryTemplate.format($this.Name, $this["Query Value"] ? $this["Query Value"] : '', $this.Description ? $this.Description : '', $this["Query Display Value Column"] ? $this["Query Display Value Column"] : '', queryId, $this["Query Value Column"] ? $this["Query Value Column"] : '', 'ui-autocomplete-input');
                        }
                        else {
                            var queryId = $this["Query Id UniqueID"] ? $this["Query Id UniqueID"] : ($this["Dynamic Query Id UniqueID"] ? $this["Dynamic Query Id UniqueID"] : '');
                            BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.QueryTemplate.format($this.Name, $this["Query Value"] ? $this["Query Value"] : '', $this.Description ? $this.Description : '', $this["Query Display Value Column"] ? $this["Query Display Value Column"] : '', queryId, $this["Query Value Column"] ? $this["Query Value Column"] : '', 'ui-tageditor-input');
                        }
                        break;
                    case "Date":
                        var id = 'datepicker' + $this.Name.replace(' ', '');
                        dateCtrlIds.push(id + '[SEP]' + type);
                        BizAPP.ViewCustomization.DynamicReport.SubTemplate += rowStr + BizAPP.ViewCustomization.DynamicReport.DateTimeTemplate.format($this.Name, id, $this["Date Time Value"] ? $this["Date Time Value"] : '', $this.Description ? $this.Description : '');
                        break;
                }

            });
            var parentParams = '<div class="parent-value-set" valueset="{0}"><table style="padding: 0 20px;"><tr><td><span class="formfieldlabel" title="Parent Report Parameters" style="margin: 10px 0;white-space: normal;">{1}</span></td></tr></table></div>'.format(BizAPP.ViewCustomization.DynamicReport._valueSet, BizAPP.ViewCustomization.DynamicReport._valueSet.replace(/\[VPNVS]/g, ':<i>').replace(/\[VPPMS]/g, '</i> | '));
            BizAPP.ViewCustomization.DynamicReport.Template = BizAPP.ViewCustomization.DynamicReport.Template.format(BizAPP.ViewCustomization.DynamicReport.SubTemplate, parentParams);
            BizAPP.ViewCustomization.DynamicReport.ListSavedParameters(function () {
                var $target = $('.linkActualExecute');
                BizAPP.MenuPopup.Create({
                    html: BizAPP.ViewCustomization.DynamicReport.Template, selector: $target, mode: 'open', position: 'top', autodeleteonclose: true, callback: function () {
                        $.each(dateCtrlIds, function (i, v) {
                            var dateType = v.split('[SEP]');
                            var mode = dateType[1] == "Date" ? 'DatePicker' : 'ShowTimePicker';
                            BizAPP.UI.DateTime.Init(dateType[0], '', mode, 30, '{"maxDate":"","minDate":""}');
                        });
                        BizAPP.ViewCustomization.DynamicReport._valueSet = '';
                        BizAPP.ViewCustomization.DynamicReport.RegisterAutoComplete();
                        BizAPP.ViewCustomization.DynamicReport.TagEditorInit();
                        if (BizAPP.ViewCustomization.DynamicReport.currentParams) {
                            BizAPP.ViewCustomization.DynamicReport.PopulateSavedParams(BizAPP.ViewCustomization.DynamicReport.currentParams);
                            BizAPP.ViewCustomization.DynamicReport.currentParams = '';
                        }
                        e.stopPropagation();
                    }
                });
            });
        }
        else {
            if (BizAPP.ViewCustomization.DynamicReport._valueSet)
                $('.linkActualExecute').parent().hide()
            BizAPP.ViewCustomization.DynamicReport.RunReport();
        }
        $('.dr-saved-reports').hide();
    },
    RegisterAutoComplete: function () {
        $.each($(".dynamic-ctrl.ui-autocomplete-input"), function () {
            BizAPP.UI.Textbox.EnhanceAutoComplete({
                value: $(this).attr('bza_fields'),
                selector: $(this),
                selectCallback: function (event, ui) {
                    $(event.target).val(ui.item.label);
                    var valFld = $(event.target).attr('bza_valuefield');
                    $(event.target).attr('bza_value', JSON.stringify([{ label: ui.item.label, value: ui.item.addnData[$(event.target).attr('bza_valuefield')] }]));

                    event.stopPropagation();
                    BizAPP.ViewCustomization.DynamicReport.RegisterAutoComplete();
                },
                passValueSet: true
            });
        });
    },
    ListSavedParameters: function (callback) {
        var report = $('[bizapp_name="View_DynamicReportDetails_Drilldown"]').attr('bizapp_context').split(':')[0];
        realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['GetSavedDynamicReportParameters', report], false, function (data, textStatus, jqXHR) {
            var data = JSON.parse(data.value[1]);
            var optionStr = '<option value="" disabled="" selected="" hidden="">{0}</option>';
            $('.dr-saved-reports, .dr-saved-params').find('option').remove();
            $.each(data, function (i, v) {
                optionStr += '<option value="{0}" uid="{2}" valueset=\'{1}\'>{0}</option>'.format(v.Name, v.ValueSet, v.uniqueid);
            });
            $('.dr-saved-reports').append(optionStr.format('Saved Reports..'));
            if ($('.dr-saved-params').length)
                $('.dr-saved-params').append(optionStr.format('Saved Parameters..'));
            else {
                var transformedHtml = '';
                var $html = $(BizAPP.ViewCustomization.DynamicReport.Template);
                $html.find('.dr-saved-params').append(optionStr.format('Saved Parameters..'));
                $html.each(function (i, v) {
                    if (v && v.outerHTML)
                        transformedHtml += v.outerHTML;
                });
                BizAPP.ViewCustomization.DynamicReport.Template = transformedHtml;
            }
            callback()
        });
    },
    SaveReportParameters: function () {
        var name = $('.report-param-name').val().trim();
        if (name) {
            var report = $('[bizapp_name="View_DynamicReportDetails_Drilldown"]').attr('bizapp_context').split(':')[0];
            var valueSet = BizAPP.ViewCustomization.DynamicReport.ConstructValueSet();
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['SaveDynamicReportParameter', name, report, valueSet], true, function (data, textStatus, jqXHR) {
                BizAPP.ViewCustomization.DynamicReport.ListSavedParameters(function () {
                    ProcessingStatus(false, true);
                    $('.dr-saved-params').val(name);
                    $('.report-param-name').val('');
                });
            });
        }
        else alert('Name is mandatory');
    },
    RemoveReportParameter: function () {
        var uniqueId = $('.dr-saved-params').find('option:selected').attr('uid');
        if (uniqueId) {
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['RemoveDynamicReportParameter', uniqueId], true, function (data, textStatus, jqXHR) {
                BizAPP.ViewCustomization.DynamicReport.ListSavedParameters(function () {
                    ProcessingStatus(false, true);
                    $('.report-param-name').val('');
                    $('.dynamic-ctrl').each(function () {
                        var $this = $(this);
                        $this.val('');
                        if ($this.hasClass('ui-autocomplete-input') || $this.hasClass('ui-tageditor-input')) {
                            $this.attr('bza_value', '').attr('value', '');
                        }
                        if ($this.hasClass('dynamic-chkbox-list')) {
                            $this.find('input[type="checkbox"]:checked').each(function () {
                                $(this).prop('checked', false);
                            });
                        }
                    });
                });
            });
        }
    },
    UpdateReportParameter: function () {
        var uniqueId = $('.dr-saved-params').find('option:selected').attr('uid');
        if (uniqueId) {
            var valueSet = BizAPP.ViewCustomization.DynamicReport.ConstructValueSet();
            realAjaxAsyncCall('ViewCustomizerEx', getNextRequestId(), ['UpdateDynamicReportParameter', uniqueId, valueSet], true, function (data, textStatus, jqXHR) {
                BizAPP.ViewCustomization.DynamicReport.ListSavedParameters(function () {
                    ProcessingStatus(false, true);
                    $('.dr-saved-params').val($('.dr-saved-params').find('option[uid="{0}"]'.format(uniqueId)).val());
                });
            });
        }
    },
    ConstructValueSet: function () {
        var params = new Array();
        var valueSet = '';
        $('.dynamic-ctrl').each(function () {
            var $this = $(this);
            var value = $this.val();
            if (value && $this.attr('bza_value') && $this.hasClass('ui-autocomplete-input'))
                value = $this.attr('bza_value');
            if ($this.hasClass('ui-tageditor-input') && $this.attr('bza_value'))
                value = $this.attr('bza_value');

            if ($this.hasClass('dynamic-chkbox-list')) {
                value = '';
                $this.find('input[type="checkbox"]:checked').each(function () {
                    value = value ? value + ',' + $(this).val() : $(this).val();
                });
            }
            params.push($this.attr('name') + '[VPNVS]' + value);
        });

        if (params.length)
            valueSet = params.join('[VPPMS]');

        var parentReportParams = $('.parent-value-set').attr('valueset');
        if (!parentReportParams && BizAPP.ViewCustomization.DynamicReport._valueSet)
            parentReportParams = BizAPP.ViewCustomization.DynamicReport._valueSet;

        parentReportParams = parentReportParams ? parentReportParams + '[VPPMS]' : ''

        return parentReportParams + valueSet;
    },
    PopulateSavedParams: function (valueSet) {
        if (!valueSet)
            valueSet = $('.dr-saved-params').find('option:selected').attr('valueset');
        $.each(valueSet.split('[VPPMS]'), function (i, v) {
            var $ctrl = $('.dynamic-ctrl[name="{0}"]'.format(v.split('[VPNVS]')[0]));
            var val = v.split('[VPNVS]')[1];
            if ($ctrl.hasClass('ui-tageditor-input')) {
                //remove all tags
                var tags = $ctrl.tagEditor('getTags')[0].tags;
                for (i = 0; i < tags.length; i++) { $ctrl.tagEditor('removeTag', tags[i]); }

                if (val.indexOf('{') != -1) {
                    $ctrl.attr('bza_value', val);
                    val = JSON.parse(val);
                    $.each(val, function () {
                        $ctrl.tagEditor('addTag', this.label);
                    })
                }
            }
            else if ($ctrl.hasClass('ui-autocomplete-input')) {
                if (val.indexOf('{') != -1) {
                    $ctrl.attr('bza_value', val);
                    val = JSON.parse(val)[0].label;
                }
            }
            $ctrl.val(val);
        });
    },
    RunReport: function () {
        var $target = $('[bizapp_name="View_DynamicReportDetails_Drilldown"]'), $view = $target.closest('[bizapp_name].ViewControlEx');
        var viewEnterpriseId = $view.attr('bizapp_eid');
        var viewControlName = $view.attr('bizappid') + ':dynamicreport';
        var roid = $view.attr('bizapp_context').split('\n')[0];
        var reportId = $target.attr('bizapp_context').split('\n')[0];
        var valueSet = BizAPP.ViewCustomization.DynamicReport.ConstructValueSet();
        BizAPP.ViewCustomization.DynamicReport.currentParams = valueSet;
        var htmlArgs = 'runtimeviewenterpriseid[NVS]' + viewEnterpriseId + '[PMS]runtimeobjectid[NVS]' + roid + '[PMS]navigationcontrol.ignoreprocess[NVS]true';
        realAjaxAsyncCall('ViewNavigationEx', getNextRequestId(), ['PreviewView', htmlArgs, viewControlName, 'true', '', 'false', '', reportId, valueSet, 'false'], true,
            function (data, textStatus, jqXHR) {
                var options = { selector: $('.report-data') };
                BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options)
                BizAPP.ViewCustomization.DynamicReport._valueSet = '';
                closeMenuPopup();
                if (BizAPP.ViewCustomization.DynamicReport._designmode) {
                    if ($('.report-empty-layout').length > 0) {
                        $('.report-empty-layout').attr('id', 'reportdesign');
                        BizAPP.ViewCustomization.LoadDesignView(null, '', '');
                    }
                    else {
                        $('.bza-vc-grid').wrap('<div id="reportdesign"></div>')
                        BizAPP.ViewCustomization.LoadDesignView(null, '', '');
                    }
                }
            });
    },
    LoadDrilldownView: function (execute) {
        var $selector = '';
        if (execute) {
            $selector = $('.linkActualExecute').closest('.ViewControlEx').parent();
        }
        else {
            $selector = $($('[bizapp_name="View_DesignView"]').get(0)).parent();
        }
        BizAPP.UI.LoadView({
            url: 'uiview.asmx?html.args=runtimeviewenterpriseid[NVS]ESystemb1e33[PMS]runtimeobjectid[NVS]' + BizAPP.ViewCustomization.DynamicReport._drilldownReport + '&html.jar=true&html.vcn=' + $selector.attr('id') + ':dummy',
            selector: $selector
        });
    },
    PopulateParentReportParameters: function (valueset) {
        BizAPP.ViewCustomization.DynamicReport._valueSet = valueset;
    },
    //BizAPP.ViewCustomization.DynamicReport.DrillDownReport({ report:'IPMSUf7af1', target: 'vd_so:viewControl1:vm1:vc1', selector: null/'[id="vd_so:viewControl1:vm1:vc1"]:first', additionalparams: {"Param1": "Val1", "Param2": "Val2"} });
    DrillDownReport: function (options) {
        options.additionalparams = options.additionalparams || {};
        var parentvalueset = ''
        var params = new Array();
        $.each(options.additionalparams, function (i, v) {
            params.push(i + '[VPNVS]' + v);
        });
        if (params.length)
            parentvalueset = params.join('[VPPMS]');

        valueset = BizAPP.ViewCustomization.DynamicReport.ConstructValueSet();

        if (parentvalueset)
            valueset = parentvalueset + '[VPPMS]' + valueset;

        options.selector = options.selector || '[id="{0}"]:first'.format(options.target);
        var $selector = $(options.selector);
        var roid = options.report + ':EIPMS8a7ec:-1';
        var htmlArgs = 'runtimeviewenterpriseid[NVS]ESystemb1f4c[PMS]runtimeobjectid[NVS]' + roid + '[PMS]navigationcontrol.ignoreprocess[NVS]true';
        realAjaxAsyncCall('ViewNavigationEx', getNextRequestId(), ['PreviewView', htmlArgs, options.target, 'true', '', 'false', '', '', valueset, 'true'], true,
            function (data, textStatus, jqXHR) {
                var options = { selector: $selector };
                BizAPP.UI._handleSuccessResponse(data, textStatus, jqXHR, options)
                closeMenuPopup();
            });
    },
    TagEditorInit: function () {
        $.each($(".dynamic-ctrl.ui-tageditor-input"), function () {
            var $control = $(this);
            if ($control.next('.tag-editor').length < 1) {
                $control.css('display', 'block').removeData('options').next('.tag-editor').remove();
                BizAPP.UI.TagEditor.LoadDependency(function () {
                    $control.attr('bza-tag', '{}')
                    $control.tagEditor({
                        initialTags: [],
                        autocomplete: {
                            minLength: 0,
                            source: function (request, response) {
                                var ctrl = $control;
                                var fields = ctrl.attr('bza_fields'), args;
                                if (ctrl.attr('bza_qid')) {
                                    args = ['GetAutoCompleteSugestions', ctrl.attr('bza_qid'), request.term, fields, null, ctrl.attr('bizapp_context'), BizAPP.ViewCustomization.DynamicReport.ConstructValueSet()];
                                }
                                else if (ctrl.attr('bizapp_context'))
                                    args = ['GetAutoCompleteResults', ctrl.attr('bizapp_context'), request.term, '', fields, ctrl.attr('bza_basefield')];
                                else {
                                    displayMessage('query or context is mandatory');
                                    return;
                                }

                                realAjaxAsyncCall('HelperEx', getNextRequestId(), args, false,
                                function (data, textStatus, jqXHR) {
                                    data = BizAPP.UI._handleEventsAndExceptions(data, textStatus, jqXHR);
                                    fields = fields.split(',');

                                    var a = null;

                                    if (ctrl.attr('bza_qid'))
                                        a = $.map(JSON.parse(data[1]), function (item) {
                                            var value = '';
                                            if (fields.length == 1)
                                                value = item[fields[0]];
                                            else
                                                $.each(fields, function () {
                                                    if (value) value += ', ';
                                                    value += this + ' : ' + item[this];
                                                });

                                            var valFld = ctrl.attr('bza_valuefield'), args;
                                            return { 'value': valFld ? item[valFld] : item.uniqueid, 'label': value, status: item['Status'], identifier: item.uniqueid + ':' + item.objecttype + ':-1' };

                                        });
                                    else
                                        a = $.map(JSON.parse(data[1]), function (item) {
                                            return { value: item.label || item.value || item.Value, label: item.autocompletelabel || item.label || item.value || item.Value, identifier: item.value || item.Value };
                                        });

                                    response(a);
                                });
                            },
                            position: { collision: "flip" },
                            select: function (event, ui) {
                                addLog(ui.item);
                                $(event.target).val(ui.item.label);
                                var val;
                                if ($control.attr('bza_value')) {
                                    val = JSON.parse($control.attr('bza_value'));
                                    val.push(ui.item);
                                    val = JSON.stringify(val);
                                }
                                else
                                    val = JSON.stringify([ui.item]);

                                $control.attr('bza_value', val);
                                $control.attr('value', $control.attr('bza_value'));
                                $(event.target).blur();
                                $(event.target).closest('ul').blur();
                                event.stopPropagation();
                            }
                        },
                        forceLowercase: false,
                        onChange: function (field, editor, tags, tag_ids, delId) {
                            $control.val(tags.toString());
                            if (!tags.toString())
                                $control.attr('bza_value', '').attr('value', '');
                        },
                        beforeTagSave: function (field, editor, tags, tag, val) {
                        },
                        beforeTagDelete: function (field, editor, tags, val) {
                        }
                    });
                    if (g_activeCtrl) {
                        $('[bizappid="' + g_activeCtrl + '"]').next().click();
                        g_activeCtrl = null;
                    }
                    $('.tag-editor').attr('style', $control.attr('style')).show().addClass('formtextbox');
                    $('.tag-editor').css('min-width', $control.css('width')).css('width', 'auto').css('overflow', 'auto');
                });
            }
            else {
                $control.hide();
            }
        });
    },
    LoadTagEditorDependency: function (callback) {
        $.cachedScript(BizAPP.UI.GetBasePath('Resources/TagEditor/jquery.tag-editor.js')).done(function (script, textStatus) {
            $.getCss(BizAPP.UI.GetBasePath('Resources/TagEditor/jquery.tag-editor.css'));
            setTimeout(callback, 10);
        });
    }
}

BizAPP.UI.Packery = {
    LoadDependency: function (callback) {
        var jsUrl = 'Script.asmx?csn=bizapp&cn=packery&v=' + __bts_;
        $.cachedScript(BizAPP.UI.GetBasePath(jsUrl)).done(function (script, textStatus) {
            if (callback)
                callback();
        });
    },
    Init: function (width, gutter) {
        BizAPP.UI.Packery.LoadDependency(function () {
            $('#myContainer1 .bza-vc-grid .bza-vc-boxed').each(function () {
                var $this = $(this);
                if ($this.find('.bza-menu-cont').length == 0) {
                    BizAPP.UI.Packery._addCellOptions($this);
                }
            });

            if (!width) {
                width = parseFloat($('#bza-vc-style').attr('width'));
                if (!width) width = 250;
            }
            if (!gutter) gutter = 10;
            $('#bza-vc-style').replaceWith(BizAPP.UI.AdvList._render('<style id="bza-vc-style" width="{{n}}">\
				.bza-vc-grid-item,.bzaw1{width:{{n}}px}\
				.bzaw2{width:calc(({{n}}px * 2) + {{i}}px)}\
				.bzaw3{width:calc(({{n}}px * 3) + ({{i}}px * 2))}\
				.bzaw4{width:calc(({{n}}px * 4) + ({{i}}px * 3))}\
				.bzaw5{width:calc(({{n}}px * 5) + ({{i}}px * 4))}\
				.bzaw6{width:calc(({{n}}px * 6) + ({{i}}px * 5))}\
			</style>', [{ n: width, i: gutter }]));

            $('.bza-vc-grid').packery({
                // options
                itemSelector: '.bza-vc-grid-item',
                gutter: gutter,
                columnWidth: width
            });
            var $items = $('.bza-vc-grid').find('.bza-vc-grid-item').draggable();
            $('.bza-vc-grid').packery('bindUIDraggableEvents', $items);

            $("#myContainer1 .bza-vc-grid-item").hover(function () {
                $(this).find('.bza-menu-cont').show();
            }, function () {
                $(this).find('.bza-menu-cont').hide();
            });
        });
    },
    PackerySetup: function () {
        if ($('#bza-vc-column').val()) {
            $('.bza-vc-grid').packery('destroy');
            BizAPP.UI.Packery.Init(($('.bza-vc-grid').width() - 50) / $('#bza-vc-column').val());
        }
        else
            $('.bza-vc-grid').packery();
    },
    _addCellOptions: function ($cell) {
        $cell.append('<div class="bza-menu-cont" style="display: none">\
							<span class="bza-hover-menu fa fa-star-o" onclick="BizAPP.UI.Packery.AddNewItem();" title="create cell"/>\
							<span class="bza-hover-menu fa fa-trash-o" onclick="BizAPP.UI.Packery.Remove(event);" title="delete cell"/>\
							<span class="bza-hover-menu fa fa-minus fa-caret-up fa-minus-square-o" onclick="BizAPP.UI.Packery.DecreaseRow(event);" title="decrease height"/>\
							<span class="bza-hover-menu fa fa-plus fa-caret-down fa-plus-square-o" onclick="BizAPP.UI.Packery.IncreaseRow(event);" title="increase height"/>\
							<span class="bza-hover-menu fa fa-plus fa-caret-right fa-plus-square-o" onclick="BizAPP.UI.Packery.IncreaseColumn(event);" title="increase width"/>\
							<span class="bza-hover-menu fa fa-minus fa-caret-left fa-minus-square-o" onclick="BizAPP.UI.Packery.DecreaseColumn(event);" title="decrease width"/>\
						</div>\
						<div class="bza-resize-menu-cont" style="display: none">\
							Rows:<select class="bza-pckry-row" onchange="">\
								<option value="1">1</option>\
								<option value="2">2</option>\
								<option value="3">3</option>\
								<option value="4">4</option>\
							</select>\
							Columns:<select class="bza-pckry-col" onchange="">\
								<option value="1">1</option>\
								<option value="2">2</option>\
								<option value="3">3</option>\
								<option value="4">4</option></select>\
							<span class="stepcenternormal bza-pckry-rz" onclick="BizAPP.UI.Packery.Resize(event);" >OK</span>\
							<span class="stepcenternormal bza-pckry-rz-cancel" onclick="BizAPP.UI.Packery.CancelResize(event);">Cancel</span>\
						</div>');
    },
    GetRowValue: function ($item) {
        if ($item.hasClass('bzaw2'))
            return 2;
        else if ($item.hasClass('bzaw3'))
            return 3;
        else if ($item.hasClass('bzaw4'))
            return 4;
        else
            return 1;
    },
    GetColumnValue: function ($item) {
        if ($item.hasClass('bzah2'))
            return 2;
        else if ($item.hasClass('bzah3'))
            return 3;
        else if ($item.hasClass('bzah4'))
            return 4;
        else
            return 1;
    },
    ShowResizeDialog: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');

        $cont.find('.bza-pckry-col').val(BizAPP.UI.Packery.GetRowValue($cont));
        $cont.find('.bza-pckry-row').val(BizAPP.UI.Packery.GetColumnValue($cont.find('.bza-vc-boxed')));

        $cont.find('.bza-menu-cont').hide();
        $cont.find('.bza-resize-menu-cont').show();
    },
    CancelResize: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        $cont.find('.bza-resize-menu-cont').hide();
        $cont.find('.bza-menu-cont').show();
    },
    IncreaseColumn: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        var val = BizAPP.UI.Packery.GetRowValue($cont);
        $cont.removeClass('bzaw1 bzaw2 bzaw3 bzaw4');
        $cont.addClass('bzaw' + (val + 1).toString());
        setTimeout(BizAPP.UI.Packery.PackerySetup, 500);
    },
    IncreaseRow: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        var val = BizAPP.UI.Packery.GetColumnValue($cont);
        $cont.removeClass('bzah1 bzah2 bzah3 bzah4');
        $cont.addClass('bzah' + (val + 1).toString());

        setTimeout(BizAPP.UI.Packery.PackerySetup, 500);
    },
    DecreaseColumn: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        var val = BizAPP.UI.Packery.GetRowValue($cont);
        if (val == 1) return;
        $cont.removeClass('bzaw1 bzaw2 bzaw3 bzaw4');
        $cont.addClass('bzaw' + (val - 1).toString());

        setTimeout(BizAPP.UI.Packery.PackerySetup, 500);
    },
    DecreaseRow: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        var val = BizAPP.UI.Packery.GetColumnValue($cont);
        if (val == 1) return;
        $cont.removeClass('bzah1 bzah2 bzah3 bzah4');
        $cont.addClass('bzah' + (val - 1).toString());

        setTimeout(BizAPP.UI.Packery.PackerySetup, 500);
    },
    Resize: function (e) {
        var $cont = $(e.target).closest('.bza-vc-grid-item');
        $cont.removeClass('bzaw1 bzaw2 bzaw3 bzaw4');
        $cont.addClass('bzaw' + $cont.find('.bza-pckry-col').val());

        $cont.removeClass('bzah1 bzah2 bzah3 bzah4');
        $cont.addClass('bzah' + $cont.find('.bza-pckry-row').val());

        BizAPP.UI.Packery.CancelResize(e);
        setTimeout(BizAPP.UI.Packery.PackerySetup, 500);
    },
    Remove: function (e) {
        var $grid = $('#myContainer1 .bza-vc-grid')
        $grid.packery('remove', $(e.target).closest('.bza-vc-grid-item'))
        // shiftLayout remaining item elements
        $grid.packery('shiftLayout');
    },
    AddNewItem: function () {
        var $item = $('<div class="bza-vc-grid-item"><div class="bza-vc-boxed bzah1"></div></div>');
        var $grid = $('.bza-vc-grid');
        $grid.append($item).packery('appended', $item);
        $item.draggable();
        $grid.packery('bindUIDraggableEvents', $item);
        $item.hover(function () {
            if (!$('.bza-resize-menu-cont').is(':visible'))
                $(this).find('.bza-menu-cont').show();
        }, function () {
            $(this).find('.bza-menu-cont').hide();
        });

        BizAPP.UI.Packery._addCellOptions($item.find('.bza-vc-boxed'));

    }
}