<%@ page language="C#" autoeventwireup="true" inherits="DV, App_Web_dv.aspx.cdcab7d2" %>

<%@ Register TagPrefix="gt" Namespace="GleamTech.DocumentUltimate.AspNet.WebForms" Assembly="GleamTech.DocumentUltimate" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>BizAPP Document Viewer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <script>
        function documentViewerPageChange(sender, e) {
            BizAPP.UI.DocumentViewer.PageChange(sender, e);
        }
        function documentViewerError(sender, e) {
            BizAPP.UI.DocumentViewer.Error(sender, e);
        }
        function documentViewerLoad(sender, e) {
            BizAPP.UI.DocumentViewer.Loaded(sender, e);
        }
        function documentViewerPrintStart(sender, e) {
            BizAPP.UI.DocumentViewer.PrintStart(sender, e);
        }
        function documentViewerPrint(sender, e) {
            BizAPP.UI.DocumentViewer.Print(sender, e);
        }

        window.onmessage = function (msg) {
            if (msg.data.type == 'docViewer') {
                eval(msg.data.event)
            }
        }

        var BizAPP = { UI: {} };
        BizAPP.UI.DocumentViewer = {
            Loaded: function (sender, e) {
                try {
                    sessionStorage.removeItem('dvretry');
                    dv.setShowSideWindow(false);
                    dv.fitPage();
                    dv.instance.nPagesPerWrapper = 1;
                    try {
                        dv.setLayoutMode(PortableEngine.WebViewer.LayoutMode.Single);
                        var iframe = document.getElementsByTagName('iframe')[0];
                        var doc = iframe.contentDocument || iframe.contentWindow.document;
                        doc.getElementById('displaySingle').click()
                    } catch (e) { }
                    if (window != window.parent)
                        window.parent.BizAPP.UI.DocumentViewer.Loaded(sender, e);                    
                } catch (e) {
                    window.parent.postMessage({type:'docViewer', event:'Loaded'},'*')
                }
            },
            Error: function (sender, e) {
                setTimeout(function () {
                    var retryCount = parseInt(sessionStorage.getItem('dvretry'));
                    if (isNaN(retryCount))
                        retryCount = 0;
                    if (retryCount < 3) {
                        location.reload();
                        sessionStorage.setItem('dvretry', retryCount + 1);
                    }

                    console.error("An error has occured: " + e.message);
                }, 1500);
            },
            PageChange: function (sender, e) {
                try {
                    if (window != window.parent)
                        window.parent.BizAPP.UI.DocumentViewer.PageChange(sender, e);
                } catch (ex) {
                    window.parent.postMessage({type:'docViewer', event:'PageChange', pageNumber: e.pageNumber, pageCount: dv.getPageCount()},'*')
                }
            },
            LoadPage: function (pageNo) {
                var count = dv.getPageCount();
                if (pageNo <= 0 || pageNo > count)
                    throw 'invalid page no - ' + pageNo;

                dv.setCurrentPageNumber(pageNo);
            },
            GetTotalPageCount: function () {
                return dv.getPageCount();
            },
            SearchText: function (text){
                return dv.searchText(text);
            },

            printInfo:null,
            PrintStart: function (sender, e) {
                window.parent.BizAPP.UI.DocumentViewer.PrintStart(BizAPP.UI.DocumentViewer.printInfo);
            },
            Print: function (sender, e) {
                window.parent.BizAPP.UI.DocumentViewer.Print(BizAPP.UI.DocumentViewer.printInfo);
            }
        }
    </script>
    <div id="headerTextContainer" runat="server" visible="false">
        <h1>
            <asp:label id="headerText" runat="server"></asp:label>
        </h1>
        <hr />
    </div>
    <gt:DocumentViewerControl id="dv" runat="server"
        width="800"
        height="600"
        clienterror="documentViewerError"
        clientpagechange="documentViewerPageChange"
        clientdocumentload="documentViewerLoad"
        clientprintstart="documentViewerPrintStart"
        clientprint="documentViewerPrint"
        resizable="True">
	</gt:DocumentViewerControl>
</body>
</html>
