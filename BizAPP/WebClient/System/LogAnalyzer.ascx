<%@ control language="C#" autoeventwireup="true" inherits="System_WebUserControl, App_Web_loganalyzer.ascx.79613827" %>
<asp:UpdatePanel ID="UpdatePanelMetaData" runat="server">
    <ContentTemplate>
        <!-- Log Analyzer -->
        <fieldset>
            <style type="text/css">
                #drop_zone
                {
                    border: 2px dashed #bbb;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    border-radius: 5px;
                    padding: 25px;
                    text-align: center;
                    font: 20pt bold,"Vollkorn";
                    color: #bbb;
                }
            </style>
            <legend>Log Analyzer</legend>
            <div style="margin: 10px; width: 900px">

                <table width="100%">
                    <tr>
                        <td width="60%">
                            <div id="drop_zone">
                                Drop Log files here
                        <span class="percent"></span>
                                <output id="list"></output>
                                <textarea id="input" rows="4" cols="100"></textarea>
                            </div>
                        </td>
                        <td style="padding: 10px;">Filter :
                    <textarea id="filter" rows="4" cols="25"></textarea><br />
                            Cleanup [] :
                    <input id="Radio1" type="radio" name="cleanup" value="None" />None
                    <input id="Radio2" type="radio" name="cleanup" value="2" />2
                    <input id="Radio3" type="radio" name="cleanup" value="3" checked="checked" />3
                    <input id="Radio4" type="radio" name="cleanup" value="4" />4
                    <input type="Button" value="Filter" onclick="applyFilter()" /></td>
                    </tr>
                </table>
                <br />
                <pre id="output" style=" font-size: 13px; font-family:monospace"></pre>

            </div>
            <script type="text/javascript">
                var s = document.createElement('script'); s.setAttribute('src', 'http://code.jquery.com/jquery.js'); document.getElementsByTagName('body')[0].appendChild(s); void (s);
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    var dropZone = document.getElementById('drop_zone');
                    dropZone.addEventListener('dragover', handleDragOver, false);
                    dropZone.addEventListener('drop', handleFileSelect, false);
                    function handleFileSelect(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        var files = evt.dataTransfer.files; // FileList object.
                        var reader = new FileReader();
                        reader.onerror = errorHandler;
                        reader.onprogress = updateProgress;
                        reader.onabort = function (e) {
                            alert('File read cancelled');
                        };
                        reader.onloadstart = function (e) {
                            document.getElementById('progress_bar').className = 'loading';
                        };
                        reader.onload = function (e) {
                            var progress = $('.percent')[0];
                            progress.style.width = '100%';
                            progress.textContent = '100%';
                            setTimeout("document.getElementById('progress_bar').className='';", 2000);
                            $('#input').html(reader.result);
                        }
                        reader.readAsText(files[0]);
                    }

                    function handleDragOver(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
                    }

                    function abortRead() {
                        reader.abort();
                    }

                    function errorHandler(evt) {
                        switch (evt.target.error.code) {
                            case evt.target.error.NOT_FOUND_ERR:
                                alert('File Not Found!');
                                break;
                            case evt.target.error.NOT_READABLE_ERR:
                                alert('File is not readable');
                                break;
                            case evt.target.error.ABORT_ERR:
                                break; // noop
                            default:
                                alert('An error occurred reading this file.');
                        };
                    }
                    function updateProgress(evt) {
                        if (evt.lengthComputable) {
                            var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                            if (percentLoaded < 100) {
                                var progress = $('.percent')[0];
                                progress.style.width = percentLoaded + '%';
                                progress.textContent = percentLoaded + '%';
                            }
                        }
                    }
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }

                function applyFilter() {
                    var filters = $('#filter').val().toLowerCase().split('\n');
                    var lines = $('#input').text().split('\n');
                    var remLines = [];
                    $.each(filters, function (j, filter) {
                        if (j == 0) {
                            $.each(lines, function (i, text) {
                                if (text.toLowerCase().indexOf(filter) == -1)
                                    remLines.push(i)
                            });
                        }
                        else {
                            var rl1 = [];
                            $.each(remLines, function (i, n) {
                                var text = lines[n];
                                if (text.toLowerCase().indexOf(filter) != -1)
                                    rl1.push(i);
                            });
                            $.each(rl1, function (i, n) {
                                remLines.splice((n - i), 1);
                            });
                        }
                    });
                    $.each(remLines, function (i, n) {
                        lines.splice((n - i), 1);
                    })

                    var cleanup = $('input:radio[name="cleanup"]:checked').val();
                    if (cleanup != 'None') {
                        cleanup = parseInt(cleanup);
                        $.each(lines, function (i, text) {
                            text = text.split(']');
                            text.splice(0, cleanup);
                            text = text.join(']');
                            lines[i] = text;
                        });
                    }
                    $('#output').html(lines.join('\n'));
                }
            </script>

        </fieldset>
    </ContentTemplate>
</asp:UpdatePanel>
