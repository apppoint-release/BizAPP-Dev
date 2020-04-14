<%@ page language="C#" autoeventwireup="true" inherits="System_Diagnostics, App_Web_diagnostics.aspx.79613827" validaterequest="false" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Diagnostics</title>
    <asp:Literal runat="server" ID="favIcon"></asp:Literal>
    <%--<link rel="SHORTCUT ICON" href="../favicon.ico" />--%>
    <style type="text/css">
        .treecolumn, .overflow {
            overflow: auto;
        }

        .treecolumn {
            max-height: 420px;
            width: 300px;
            max-width: 300px;
        }

        .data, .data td {
            border: solid 1px #CCC;
        }

        .hide {
            display: none;
        }

        .CodeMirror {
            width: 100%;
            height: 100%;
            border: 1px solid #eee;
            height: auto;
        }

        .CodeMirror-scroll {
            overflow-y: hidden;
            overflow-x: auto;
        }
    </style>
    <asp:PlaceHolder ID="PlaceHolder1" runat="server">
        <script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
        <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/jquery/jquery-ui.js" ) %>"></script>
        <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
        <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
        <link rel="Stylesheet" href="../Resources/CRM/JQuery/jquery-ui.css" />
    </asp:PlaceHolder>
    <!-- Sample CSS -->
    <style type="text/css">
        .gridviewpagenumber {
            height: 15px;
            width: 15px;
            font-weight: bold;
            text-align: center;
            background-color: #f5f5f5;
            color: #969696;
            border: 1px solid #969696;
            margin: 1px;
        }


            .gridviewpagenumber a {
                text-align: center;
                color: #6D5F5F;
            }

                .gridviewpagenumber a:hover {
                    color: #ffffff;
                    background-color: #56458C;
                }

                .gridviewpagenumber a:active {
                    color: #ffffff;
                    background: #56458C;
                }

                .gridviewpagenumber a.current {
                    color: #ffffff;
                    background: #56458C;
                }

        #eventTypes td {
            white-space: nowrap;
        }

        .match {
            color: red !important;
        }

        input[type="button"]:hover {
            border: 1px solid #999;
        }

        label:hover {
            color: blue;
        }

        .expandCollapse:hover {
            color: red;
        }

        .details td {
            line-height: 1.6em;
            padding: 4px;
            width: 50%;
            /*white-space: nowrap;*/
        }

        #eventTypes td {
            /*line-height: 1.6em;*/
        }

        .details td:nth-child(odd) {
            text-align: right;
        }

        .details tr:nth-child(odd) {
            background-color: #F7F7F7;
        }

        .eventType {
            color: rgb(67, 224, 67) !important;
            display: block;
        }

        .ui-widget {
            font-size: 12px;
            font-family: sans-serif;
        }

        .noParentEvent {
            color: rgb(243, 151, 143) !important;
            display: block;
        }

        .containerTree {
            overflow: auto;
            width: 100%;
        }

        #left {
            display: inline;
            float: left;
        }

        #right {
            width: 300px;
            float: left;
            margin-left: 100px;
        }

        #igTable td {
            width: 50%;
        }
    </style>
    <style type="text/css">
        body, select, textarea, td, th, ul, input, pre, code, button {
            font-family: Segoe UI;
            font-size: 12px;
        }

        .m-act a {
            font-weight: bold;
            padding: 15px;
        }

        .ui-accordion a {
            display: block;
            line-height: 20px;
            white-space: nowrap;
        }
    </style>
    <script>
        //#region JSON Report
        /**
         * Created by demis.bellot@gmail.com
         * Open Source under the New BSD Licence: https://github.com/AjaxStack/AjaxStack/blob/master/LICENSE
         */
        var JSONREPORT_cssText;
        function JSONREPORT_initializeCSS() {
            if (!JSONREPORT_cssText) {
                JSONREPORT_cssText =
                    "#expResults table {border-collapse: collapse;}\
#expResults dt  {font-size: 1.4em; font-weight: bold; width: 15em; float:left; clear: left;}\
#expResults dl {clear: left;}\
#expResults dd {margin: .5em 1em; float: left;}\
#expResults thead {text-align: left; font-size: 1.2em;}\
#expResults th {padding: .5em .8em; cursor: pointer; white-space: nowrap;}\
#expResults table dt {font-size: 1.2em;}\
#expResults td {vertical-align: top; padding: 0.8em;}\
#expResults th b { display:block; float:right; margin: 0 0 0 5px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #ccc; border-bottom: none; }\
#expResults .asc b { border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #333; border-bottom: none; }\
#expResults .desc b { border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid #333; border-top: none; }";

                var fileref = document.createElement('style');
                fileref.setAttribute('type', 'text/css');
                document.body.appendChild(fileref);
                fileref.innerHTML = JSONREPORT_cssText;
            }
        }

        var JSONREPORT = (function () {
            var root = this, doc = document,
                $ = function (id) { return doc.getElementById(id); },
                $$ = function (sel) { return doc.getElementsByTagName(sel); },
                $each = function (fn) { for (var i = 0, len = this.length; i < len; i++) fn(i, this[i], this); },
                isIE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);

            $.each = function (arr, fn) { $each.call(arr, fn); };

            var splitCase = function (t) { return typeof t != 'string' ? t : t.replace(/([A-Z]|[0-9]+)/g, ' $1').replace('_', ' '); },
                uniqueKeys = function (m) { var h = {}; for (var i = 0, len = m.length; i < len; i++) for (var k in m[i]) h[k] = k; return h; },
                keys = function (o) { var a = []; for (var k in o) a.push(k); return a; }
            var tbls = [];

            function val(m) {
                if (m == null) return '';
                if (typeof m == 'number') return num(m);
                if (typeof m == 'string') return str(m);
                if (typeof m == 'boolean') return m.toString();
                return (m.length || m.length >= 0) ? arr(m) : obj(m);
            }
            function num(m) { return m; }
            function str(m) {
                return m.substr(0, 6) == '/Date(' ? dfmt(date(m)) : m;
            }
            function date(s) { return new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1])); }
            function pad(d) { return d < 10 ? '0' + d : d; }
            function dfmt(d) { return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()); }
            function obj(m) {
                var sb = '<dl class="ui-helper-reset">';
                for (var k in m) sb += '<dt class="ib">' + splitCase(k) + '</dt><dd>' + val(m[k]) + '</dd>';
                sb += '</dl>';
                return sb;
            }
            function arr(m) {
                if (typeof m[0] == 'string' || typeof m[0] == 'number') return m.join(', ');
                var id = tbls.length, h = uniqueKeys(m);
                var sb = '<table class="ui-widget-content" id="tbl-' + id + '"><caption></caption><thead class="ui-widget-header"><tr>';
                tbls.push(m);
                var i = 0;
                for (var k in h) sb += '<th id="h-' + id + '-' + (i++) + '"><b></b>' + splitCase(k) + '</th>';
                sb += '</tr></thead><tbody>' + makeRows(h, m) + '</tbody></table>';
                return sb;
            }

            function makeRows(h, m) {
                var sb = '';
                for (var r = 0, len = m.length; r < len; r++) {
                    sb += '<tr class="ui-widget-content">';
                    var row = m[r];
                    for (var k in h) sb += '<td>' + val(row[k]) + '</td>';
                    sb += '</tr>';
                }
                return sb;
            }

            function setTableBody(tbody, html) {
                if (!isIE) { tbody.innerHTML = html; return; }
                var temp = tbody.ownerDocument.createElement('div');
                temp.innerHTML = '<table>' + html + '</table>';
                tbody.parentNode.replaceChild(temp.firstChild.firstChild, tbody);
            }

            function clearSel() {
                if (doc.selection && doc.selection.empty) doc.selection.empty();
                else if (root.getSelection) {
                    var sel = root.getSelection();
                    if (sel && sel.removeAllRanges) sel.removeAllRanges();
                }
            }

            function cmp(v1, v2) {
                var f1, f2, f1 = parseFloat(v1), f2 = parseFloat(v2);
                if (!isNaN(f1) && !isNaN(f2)) v1 = f1, v2 = f2;
                if (typeof v1 == 'string' && v1.substr(0, 6) == '/Date(') v1 = date(v1), v2 = date(v2);
                if (v1 == v2) return 0;
                return v1 > v2 ? 1 : -1;
            }

            function enc(html) {
                if (typeof html != 'string') return html;
                return html.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            }

            function addEvent(obj, type, fn) {
                if (obj.attachEvent) {
                    obj['e' + type + fn] = fn;
                    obj[type + fn] = function () { obj['e' + type + fn](root.event); }
                    obj.attachEvent('on' + type, obj[type + fn]);
                } else
                    obj.addEventListener(type, fn, false);
            }

            addEvent(doc, 'click', function (e) {
                e = e || root.event, el = e.target || e.srcElement, cls = el.className;
                if (el.tagName == 'B') el = el.parentNode;
                if (el.tagName != 'TH') return;
                el.className = cls == 'asc' ? 'desc' : (cls == 'desc' ? null : 'asc');
                $.each($$('TH'), function (i, th) { if (th == el) return; th.className = null; });
                clearSel();
                var ids = el.id.split('-'), tId = ids[1], cId = ids[2];
                var tbl = tbls[tId].slice(0), h = uniqueKeys(tbl), col = keys(h)[cId], tbody = el.parentNode.parentNode.nextSibling;
                if (!el.className) { setTableBody(tbody, makeRows(h, tbls[tId])); return; }
                var d = el.className == 'asc' ? 1 : -1;
                tbl.sort(function (a, b) { return cmp(a[col], b[col]) * d; });
                setTableBody(tbody, makeRows(h, tbl));
            });

            return function (json) {
                JSONREPORT_initializeCSS();
                var model = JSON.parse(json);
                return val(model);
            };
        })();
        //#endregion
        function callReloadServer(e, ip) {
            $('[id*="pnlSpin' + ip + '"]').find('i').addClass('fa-spin');
            var url = $('input[id="tb' + ip + '"]').val();
            realAjaxAsyncCall('HelperEx', getNextRequestId(), ['ReloadServer', url, ip], true,
                    function (data, textStatus, jqXHR) {
                        updateReloadStatus(data);
                    });
        }

        function callRestartApplication(e, ip) {
            if (!g_hasSysAdminResp) return;
            $('[id*="pnlSpin' + ip + '"]').find('i').addClass('fa-spin');
            var baseUrl = $('input[id="tb' + ip + '"]').val();
            realAjaxAsyncCall('HelperEx', getNextRequestId(), ['CallRestartApplication', baseUrl, ip], true,
                    function (data, textStatus, jqXHR) {
                        updateReloadStatus(data);
                    });
        }

        function updateReloadStatus(data) {
            var ip = data.value[1].split('[sep]')[0];
            $('<span style="font-weight:bold">Status:</span>').insertBefore($('span[id="span' + ip + '"]'));
            $('span[id="span' + ip + '"]').text(data.value[1].split('[sep]')[1])
            $('[id*="pnlSpin' + ip + '"]').find('i').removeClass('fa-spin');
        }

        function callReloadAllServer(e) {
            var servers = [];
            $(e.target).closest('div').next().find('input[type="submit"]').each(function () {
                var $this = $(this);
                var ip = $this.attr('name').split('Button')[1];
                servers.push(ip)
            });

            makeReloadServerCall(servers.reverse())
        }

        function makeReloadServerCall(servers) {
            if (servers.length) {
                var server = servers.pop();
                $('[id*="pnlSpin' + server + '"]').find('i').addClass('fa-spin');
                var url = $('input[id="tb' + server + '"]').val();
                realAjaxAsyncCall('HelperEx', getNextRequestId(), ['ReloadServer', url, server], true,
                    function (data, textStatus, jqXHR, ip) {
                        updateReloadStatus(data);
                        makeReloadServerCall(servers);
                    });
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager runat="Server" ID="ScriptManager1">
        </asp:ScriptManager>
        <asp:Literal runat="server" ID="TopBanner"></asp:Literal>
        <asp:Panel runat="server" ID="Container">
            <table class="fill">
                <tr>
                    <td class="lmenu" valign="top">
                        <div id="accordion">
                            <h3>
                                <a href="#">Basic Options</a></h3>
                            <div>
                                <asp:HyperLink ID="HyperLink13" runat="server" NavigateUrl="?ctl=DiagInfo&h=Diagnostic Information"
                                    Text="Home" />
                                <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="?ctl=MetadataInfo&h=Metadata Information"
                                    Text="Metadata Information" />
                                <asp:HyperLink ID="HyperLink10" runat="server" NavigateUrl="?ctl=ExpressionWorkbench&h=Expression Workbench"
                                    Text="Expression Workbench" />
                                <asp:HyperLink ID="HyperLink2" runat="server" NavigateUrl="?ctl=QueryWorkbench&h=Query Workbench"
                                    Text="Query Workbench" />
                                <asp:HyperLink ID="HyperLink18" runat="server" NavigateUrl="?ctl=ReportWorkbench&h=Report Workbench"
                                    Text="Report Workbench" />
                                <asp:HyperLink ID="HyperLink19" runat="server" NavigateUrl="?ctl=LogAnalyzer&h=Log file Analyzer"
                                    Text="Log Analyzer" />
                                <asp:HyperLink ID="HyperLink20" runat="server" NavigateUrl="?ctl=BSqlWorkbench&h=BSQL Workbench"
                                    Text="BSQL" />
                                <asp:HyperLink ID="HyperLink3" runat="server" NavigateUrl="?ctl=TraceSettings&h=Trace Settings"
                                    Text="Trace Settings" />
                                <asp:HyperLink ID="HyperLink4" runat="server" NavigateUrl="?ctl=AppConfig&h=BizAPP Settings"
                                    Text="BizAPP Settings" />
                            </div>
                            <h3>
                                <a href="#">Advanced Options</a></h3>
                            <div>
                                <asp:HyperLink ID="HyperLink5" runat="server" NavigateUrl="?ctl=DbAnalyser&h=Database Analyser"
                                    Text="Database Analyser" />
                                <asp:HyperLink ID="HyperLink6" runat="server" NavigateUrl="?ctl=SysInfo&h=System Information"
                                    Text="System Information" />
                                <asp:HyperLink ID="HyperLink7" runat="server" NavigateUrl="?ctl=UploadFiles&h=Upload Files"
                                    Text="Upload Files" />
                                <asp:HyperLink ID="HyperLink8" runat="server" NavigateUrl="?ctl=AllTypes&h=ASMX/WCF EndPoints"
                                    Text="ASMX/WCF EndPoints" />
                                <asp:HyperLink ID="HyperLink12" runat="server" NavigateUrl="?ctl=PowerShell&h=PowerShell Workbench"
                                    Text="PowerShell Workbench" />
                                <asp:HyperLink ID="HyperLink14" runat="server" NavigateUrl="?ctl=ContentSearch&h=Content Search"
                                    Text="Content Search" />
                                <asp:HyperLink ID="HyperLink15" runat="server" NavigateUrl="?ctl=Profiler&h=Profiler Information"
                                    Text="Profiler Information" />
                                <asp:HyperLink ID="HyperLinkRecommendation" runat="server" NavigateUrl="?ctl=RecommendationWorkbench&h=Recommendation Workbench"
                                    Text="Recommendations(Experimental)" />
                            </div>
                            <h3>
                                <a href="#">License Information</a></h3>
                            <div id="Div1">
                                <asp:HyperLink ID="HyperLink16" runat="server" NavigateUrl="?ctl=RuntimeLicenses&c=users&h=Active Users"
                                    Text="Usage" />
                                <asp:HyperLink ID="HyperLink17" runat="server" NavigateUrl="?ctl=AnalyzeLicenses&h=Analysis"
                                    Text="Analysis" />
                            </div>
                        </div>
                    </td>
                    <span id="collapser" onclick="bz_collapser();" title="Collapse" style="display: block; position: absolute; left: 150px; top: 230px; z-index: 99">&lt;&gt;</span>
                    <span id="expander" onclick="bz_expander();" title="Expand" style="display: none; position: absolute; top: 230px; z-index: 99">&gt;&gt;</span>
                    <td>
                        <asp:PlaceHolder ID="UserControlPlaceHolder" runat="server"></asp:PlaceHolder>
                    </td>
                </tr>
            </table>
        </asp:Panel>
        <script type="text/javascript">
            function scrollTextArea(textAreaId) {
                var textArea = document.getElementById(textAreaId);
                if (textArea != null) {
                    textArea.scrollTop = textArea.scrollHeight;
                }
            }
            function callReloadMetaDataSync() {
                ajaxSyncCall('HelperEx', ['ReloadMetaData']);
            }
            function callReloadSpecificType() {
                var $selection = $('select[id *= "ddlCacheServiceType"] option:selected');
                var subType = $selection.attr('value');
                var type = $selection.closest('optgroup').attr('label');
                ajaxSyncCall('HelperEx', ['ReloadSpecificType', type, subType]);
            }
            function callUpdateMetaDataSync() {
                ajaxSyncCall('HelperEx', ['ConstructMetadata']);
            }
            $(function () {
                $("#accordion").accordion({ heightStyle: "content" });
                $('body').on('click', 'input[type="submit"]:not([onclick])', function () {
                    $('<i class="fa fa-spinner fa-spin"></i>').insertAfter($(this));
                    $(this).hide();
                });
            });

            function executeQuery() {
                $('[id*="queryResults"]').html('');
                var retVal = true;

                try {
                    var queryEid = $('[id*="tbQueryEid"]').val();
                    if (queryEid) {
                        retVal = false;
                        var result = BizAPP.Session.ExecuteQuery(
                        {
                            queryEid: queryEid,
                            contexts: $('[id*="tbContext"]').val(),
                            pageSize: parseInt($('[id*="tbPageSize"]').val()),
                            pageNo: parseInt($('[id*="tbPageNo"]').val()),
                            handleResponse: false
                        });
                        $('[id*="queryResults"]').html(JSONREPORT(JSON.stringify(result)));
                    }
                }
                catch (Error) { logError('failed to pass query params on client.', Error); }

                return retVal;
            }
            function evaluateExpression() {
                $('[id*="expResults"]').html('');
                var exp = $('[id*="tbExpression"]').val();
                if (exp) {
                    var result = BizAPP.Session.EvaluateExpression(
                    {
                        expression: exp,
                        compute: $('[id*="cbCompute"]').prop('checked'),
                        htmlFriendly: $('[id*="cbHtml"]').prop('checked'),
                        contexts: $('[id*="tbContextIds"]').val(),
                        callback: function (result) {
                            if (result != undefined)
                                $('[id*="expResults"]').html(JSONREPORT(JSON.stringify(result)));
                        },
                        excpAsResp: true
                    });
                }
            }

            function ConstructCategoryFilter() {
                var items = [];
                $('.dg-name').each(function () {
                    //add item to array
                    items.push($(this).text().split('.')[0]);
                });
                //restrict array to unique items
                var items = $.grep(items, function (el, index) {
                    return index === $.inArray(el, items);
                });

                $('<div class="dg-catgry" style="padding-bottom: 10px"><a style="cursor:pointer;text-decoration:underline;padding: 0 10px;" onclick="ShowAllCategory();">All</a></div>').insertAfter($('#ctl01_addNewSection'));
                $.each(items, function (index, element) {
                    $('.dg-catgry').append('<a style="cursor:pointer;text-decoration:underline;padding: 0 10px;" onclick="FilterCategory(\'' + element + '\');">' + element + '</a>');
                });
            }

            function FilterCategory(name) {
                $('.dg-name').each(function () {
                    if ($(this).text().split('.')[0] == name)
                        $(this).closest('tr').show();
                    else
                        $(this).closest('tr').hide();
                });
            }

            function ShowAllCategory() {
                $('.dg-catgry').next().find('tr').show();
            }

            function beautifyJSON(selector) {
                $.each($(selector), function () {
                    $(this).css('white-space', 'pre')
                    var a = $(this).text();
                    $(this).text(JSON.stringify(JSON.parse(a), null, '\t'))
                });
            }
        </script>
    </form>
</body>
</html>
