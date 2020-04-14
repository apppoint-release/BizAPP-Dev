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

var CKEDITOR_BASEPATH = BizAPP.UI.GetBasePath('resources/ckeditor/');
BizAPP.UI.TextEditor.Init = function (options) {
    $.cachedScript(BizAPP.UI.GetBasePath('resources/ckeditor/ckeditor.js?v=' + __bts_)).done(function (script, textStatus) {
        options = options || { ctrlId: '', isReadOnly: false, autoSize: false, showClipboardOptions: true, showFontOptions: true, showFormatOptions: true, showAlignmentOptions: true };

        CKEDITOR.config.readOnly = options.isReadOnly;
        CKEDITOR.config.extraAllowedContent = 'img[alt,!src]{width,height,float};style;*[id,rel](*){*}';
        //CKEDITOR.config.allowedContent = true;
        CKEDITOR.config.toolbar = [
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
            { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
            '/',
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
            '/',
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About'] }];

        CKEDITOR.config.removePlugins = 'forms';
        if (!options.showAlignmentOptions)
            CKEDITOR.config.removePlugins += ',justify';
        if (!options.showFontOptions)
            CKEDITOR.config.removePlugins += ',stylescombo,format,font,resize,colorbutton';
        if (!options.showFormatOptions) {
            CKEDITOR.config.removePlugins += ',basicstyles,list,justify,indentblock,indentlist,indent,blockquote,div,link,bidi,tabletools,table,horizontalrule,specialchar,pagebreak,removeformat';
        }
        CKEDITOR.config.removeButtons = 'Save,Iframe,Image,Smiley,Flash,About';

        var editor = CKEDITOR.replace('bbcode_field');
        var $textarea = $('.RichTextEx[bza-ctrlid="' + options.ctrlId + '"]').find('[name="bbcode_field"]');
        $textarea.attr('oldval', options.text);
        var $richtextInstance = CKEDITOR.instances["bbcode_field"];
        if (options.text)
            $richtextInstance.setData(options.text);
        if (!options.isReadOnly) {
            editor.on('blur', function (e) {
                BizAPP.UI.TextEditor.OnBlurHandler(e, options);
            });

            editor.on('focus', function (e) {
                var txt = e.editor.getData();
                if (txt.indexOf('bza-rte-watermark') > 0)
                    $richtextInstance.setData('');
            });

            editor.on('instanceReady', function (evt) {
                var $iframe = $('.bza_editor iframe');
                var $body = $iframe.contents().find('body');
                $body.css('min-height', $iframe.height() - 40);

                if (options.allowImageInsert && (!(isIE() && isIE() < 10))) {
                    var $target = $body;
                    $target.bind('paste', BizAPP.UI.TextEditor.PasteImage);
                    $target.attr('roid', '').attr('field', '');
                    BizAPP.UI.Upload.RegisterDragDrop($target, function (aid) {
                        var src = 'testresource.aspx?aid=' + aid;
                        var sel = CKEDITOR.instances["bbcode_field"].getSelection();
                        $(sel.getStartElement().$).append($('<div><br></div><img src="' + src + '"' + '/><div><br></div>'));
                    });
                }
            });
        }

        if ((!options.isReadOnly) && (options.text.toString().trim() == '') && options.watermark) {
            $richtextInstance.setData(BizAPP.UI.TextEditor.watermark.format(options.watermark));
        }
        if (options.callback)
            options.callback();
    });
}

BizAPP.UI.TextEditor.OnBlurHandler = function (e, options) {
    var text = e.editor.getData();
    var $richtextInstance = CKEDITOR.instances["bbcode_field"];
    var $textarea = $('.RichTextEx[bza-ctrlid="' + options.ctrlId + '"]').find('[name="bbcode_field"]');
    var roid = $textarea.attr('roid');
    var name = $textarea.attr('ctrlname');

    //Adds watermark if the text editor is empty
    if ((!options.isReadOnly) && (text.toString().trim() == '') && options.watermark) {
        $richtextInstance.setData(BizAPP.UI.TextEditor.watermark.format(options.watermark));
        text = $richtextInstance.getData();
    }

    if (text.indexOf('bza-rte-watermark') == -1) {
        if ($textarea.attr('oldval') !== text) {
            BizAPP.UI.TextEditor.SetFieldValue($textarea, roid, name, text);
        }
    }
}

BizAPP.UI.TextEditor.SetFieldValue = function (control, roid, fieldname, value) {
    BizAPP.UI.TextEditor.InternalSetFieldValue(control, roid, fieldname, value);
}

BizAPP.UI.TextEditor.InternalSetFieldValue = function (control, roid, fieldname, value) {
    BizAPP.RuntimeObject.SetFieldValue({
        roid: roid, fieldName: fieldname, fieldValue: value, addOrRemove: false, sync: true, callback: function () {
            control.attr('oldval', text);
        }
    });
}

BizAPP.UI.TextEditor.PasteImage = function (event) {
    var clipboardData, found;
    found = false;
    clipboardData = event.originalEvent.clipboardData;
    $.each(clipboardData.types, function (i, type) {
        var file, reader;
        if (found) {
            return;
        }
        if (clipboardData.items[i].type.indexOf("image") !== -1) {
            file = clipboardData.items[i].getAsFile();
            reader = new FileReader();
            var img = $('<img></img>');
            reader.onload = function (evt) {
                img.attr('src', evt.target.result);
            };
            reader.readAsDataURL(file);
            var sel = CKEDITOR.instances["bbcode_field"].getSelection();
            $(sel.getStartElement().$).append($('<div><br></div>')).append(img).append($('<div><br></div>'));
            return found = true;
        }
    });
}

function fireRichTextSave(sync) {
    if (typeof CKEDITOR != 'undefined' && typeof CKEDITOR.instances["bbcode_field"] != 'undefined') {
        var editor = CKEDITOR.instances["bbcode_field"];
        if (editor && editor.focusManager.hasFocus)
            editor.focusManager.blur(true);
    }
}