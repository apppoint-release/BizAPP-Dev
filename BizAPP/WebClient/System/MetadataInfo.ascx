<%@ control language="C#" autoeventwireup="true" inherits="System_WebUserControl, App_Web_metadatainfo.ascx.79613827" %>
<asp:UpdatePanel ID="UpdatePanelMetaData" runat="server">
    <ContentTemplate>
        <!-- UI Metadata Info -->
        <fieldset>
            <legend>UI Metadata Info</legend>
            <div style="margin: 10px;">
                <table>
                    <tr>
                        <td>Type :
							<asp:DropDownList ID="ddlMetaType" runat="server">
                                <asp:ListItem Text="Applications" Value="Applications"></asp:ListItem>
                                <asp:ListItem Text="Screens" Value="Screens"></asp:ListItem>
                                <asp:ListItem Text="ViewGroups" Value="View Groups"></asp:ListItem>
                                <asp:ListItem Text="MasterViews" Value="Master Views"></asp:ListItem>
                                <asp:ListItem Text="Views" Value="Views"></asp:ListItem>
                                <asp:ListItem Text="Forms" Value="Forms"></asp:ListItem>
                                <asp:ListItem Text="ViewDefs" Value="View Defs"></asp:ListItem>
                                <asp:ListItem Text="Charts" Value="Charts"></asp:ListItem>
                                <asp:ListItem Text="Reports" Value="Reports"></asp:ListItem>
                                <asp:ListItem Text="Queries" Value="Queries"></asp:ListItem>
                                <asp:ListItem Text="ControlTemplates" Value="Control Templates"></asp:ListItem>
                                <asp:ListItem Text="Base Step" Value="BaseStep"></asp:ListItem>
                                <asp:ListItem Text="Process Trace" Value="ProcessTrace"></asp:ListItem>
                                <asp:ListItem Text="Source Process Trace" Value="SourceProcessTrace"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>
                            <asp:CheckBox ID="cbMetaShowForm" runat="server" Text="Show Form Data" />
                        </td>
                    </tr>
                    <tr>
                        <td>Name / EnterpriseId / UniqueId :
							<asp:TextBox ID="tbMetaKey" runat="server"></asp:TextBox>
                        </td>
                        <td>ObjectType :
							<asp:TextBox ID="tbObjectType" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Control Name :
							<asp:TextBox ID="tbMetaControlName" runat="server"></asp:TextBox>
                        </td>
                        <td>Sub Control Type :
							<asp:TextBox ID="tbSubCtrlType" runat="server"></asp:TextBox>
                            Sub Control Name :
							<asp:TextBox ID="tbSubCtrlName" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <asp:Button ID="FetchFromMetadata" Text="Fetch From Metadata" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
                                OnClick="FetchFromMetadata_Click" />
                        </td>
                    </tr>
                </table>
                <br />
                <asp:Label ID="lblData" runat="server"></asp:Label>
                <style>.object>.value, .array>.value {color: #C7D5E0}</style>
                <asp:TextBox runat="server" ID="tbReport" CssClass="bza-mdstatus" style="height:auto"></asp:TextBox>
                <asp:GridView ID="GridViewMetaInfo" runat="server" CellPadding="4" ForeColor="#333333" AutoGenerateColumns="false">
                    <RowStyle BackColor="#EFF3FB" Height="18px" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <EditRowStyle BackColor="#2461BF" />
                    <AlternatingRowStyle BackColor="White" Height="18px" />
                    <Columns>
                        <asp:BoundField HtmlEncode="false" HeaderText="Name" DataField="Name" />
                        <asp:BoundField HtmlEncode="false" HeaderText="Value" DataField="Value" />
                    </Columns>
                </asp:GridView>
            </div>
            <script type="text/javascript">




                $(document).ready(function () {
                    BizAPP.UI.DiagDrill.getGetVar();
                });

            </script>
            <script type="text/javascript">
                /*Diagnostic Page Enchancement - Script to drill down, remove content from diag view*/
                /*S*/
                BizAPP.UI.DiagDrill = {
                    formatXml: function (xml) {
                        var formatted = '';
                        var reg = /(>)(<)(\/*)/g;
                        xml = xml.replace(reg, '$1\r\n$2$3');
                        var pad = 0;
                        jQuery.each(xml.split('\r\n'), function (index, node) {
                            var indent = 0;
                            if (node.match(/.+<\/\w[^>]*>$/)) {
                                indent = 0;
                            } else if (node.match(/^<\/\w/)) {
                                if (pad != 0) {
                                    pad -= 1;
                                }
                            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                                indent = 1;
                            } else {
                                indent = 0;
                            }

                            var padding = '';
                            for (var i = 0; i < pad; i++) {
                                padding += '  ';
                            }

                            formatted += padding + node + '\r\n';
                            pad += indent;
                        });

                        return formatted;
                    },
                    decode: function (encoded) {
                        if (encoded)
                            return decodeURIComponent(encoded.replace(/\+/g, " "));
                        else {
                            return "undefined";
                        }
                    },
                    getGetVar: function () {
                        var url = BizAPP.UI.DiagDrill.getUrlVars(),
                        type = url["Type"],
                        Eid = url["Id"];
                        ctrlName = url["ctrlName"];
                        objType = url["objType"];
                        showFormData = url["showFormData"];
                        subCtrlType = url["subCtrlType"];
                        subCtrlName = url["subCtrlName"];
                        if (type)
                            $('[id*=ddlMetaType]').val(BizAPP.UI.DiagDrill.decode(type));
                        if (Eid)
                            $('[id*=tbMetaKey]').val(Eid);
                        if (ctrlName)
                            $('[id*=tbMetaControlName]').val(ctrlName);
                        if (objType)
                            $('[id*=tbObjectType]').val(objType);
                        if (showFormData)
                            $('[id*=cbMetaShowForm]').val(showFormData);
                        if (subCtrlType)
                            $('[id*=tbSubCtrlType]').val(subCtrlType);
                        if (subCtrlName)
                            $('[id*=tbSubCtrlName]').val(subCtrlName);

                        $('[id*=FetchFromMetadata]').click();
                    },

                    getUrlVars: function () {
                        var vars = {};
                        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                            vars[key] = value;
                        });
                        return vars;
                    },

                    replaceWithAnchor: function (selector, url) { //Make things Clickable
                        $(selector).replaceWith(function () {
                            return $("<td></td>").append($("<a></a>").attr("href", url).append($(this).contents()));
                        });
                    },
                    drillSubControl: function (subControlType, subControlName) { //Drill down function for Subcontrols
                        $('[id*=tbSubCtrlType]').val(subControlType);
                        $('[id*=tbSubCtrlName]').val(subControlName);
                        $('[id*=cbMetaShowForm]').removeAttr('checked');
                        $('[id*=FetchFromMetadata]').click();
                    },
                    drillControl: function (controlName) { //Drill down function for controls
                        $('[id*=tbMetaControlName]').val(controlName);
                        $('[id*=cbMetaShowForm]').removeAttr('checked');
                        $('[id*=FetchFromMetadata]').click();
                    },
                    driller: function (type, value) { // Drill down function for Views, Master Views, View Defs & Query
                        $('[id*=ddlMetaType]').val(type);
                        $('[id*=tbMetaKey]').val(value);
                        $('[id*=FetchFromMetadata]').click();
                    },
                    removeTable: function (nodes) { //Function to remove controls from parent view.
                        var table = $('[id*=GridViewMetaInfo] tbody tr');
                        table.children('td').each(function (i, n) {
                            if (n.cellIndex == 0) {
                                for (x in nodes) {
                                    if (n.innerHTML == nodes[x].control) {
                                        $(n).parent().remove();
                                    }
                                }
                            }
                        });
                    },
                    LUT: [{
                        name: 'ViewDef', // Column name to Process.
                        type: 'View Defs'

                    }, {
                        name: 'Query',
                        type: 'Queries'

                    }, {
                        name: 'MasterView',
                        type: 'Master Views'

                    }, {
                        name: 'ControlTemplate',
                        type: 'Control Templates'

                    }, {
                        name: 'DefaultControlTemplate',
                        type: 'Control Templates'

                    }, {
                        control: 'AllControls' // Controls to process..
                    }, {
                        control: 'AllBOForms'
                    }, {
                        control: 'Children'
                    }, {
                        subcontrol: 'AdditionalLinkControls'
                    }, {
                        subcontrol: 'MultiSelectLinkControls'
                    }, {
                        subcontrol: 'LinkControls'
                    }, {
                        subcontrol: 'ContextMenuLinkControls'
                    }
                    ],
                    RMT: [{
                        control: 'ControlMap' // Contents to remove from page.
                    }, {
                        control: 'ControlTemplates'
                    }, {
                        control: 'DefaultControlTemplates'
                    }
                    ],
                    init: function () { // main funtion
                        var nodes = BizAPP.UI.DiagDrill.LUT;
                        var table = $('[id*=GridViewMetaInfo] tbody tr');
                        var next;
                        var arr;

                        table.children('td').each(function (i, n) {
                            if (n.cellIndex == 0) {
                                next = $(n).next();
                                for (x in nodes) {
                                    if (nodes[x].name) {
                                        if (nodes[x].name == n.innerHTML) {
                                            url = "diagnostics.aspx?ctl=MetadataInfo";
                                            url += "&Type=" + nodes[x].type;
                                            url += "&Id=" + next.html();
                                            BizAPP.UI.DiagDrill.replaceWithAnchor(next, url);
                                        }
                                    }
                                    else if (nodes[x].control) { //Control Handling
                                        if (nodes[x].control == n.innerHTML) {
                                            arr = next.html().split("<br>");
                                            for (i = 0; i < arr.length; i++) {
                                                url = "diagnostics.aspx?ctl=MetadataInfo";
                                                url += "&Type=" + $('[id*=ddlMetaType]').val();
                                                url += "&Id=" + $('[id*=tbMetaKey]').val();
                                                url += "&ctrlName=" + arr[i].split("-")[0].trim();
                                                arr[i] = $("<a></a>").attr("href", url).append(arr[i]);
                                                arr[i].append("<br />");
                                            }
                                            next.html("");
                                            for (i = 0; i < arr.length; i++) {
                                                next.append(arr[i]);
                                            }
                                        }
                                    } else if (nodes[x].subcontrol) { //SubControl Handling
                                        if (nodes[x].subcontrol == n.innerHTML) {
                                            var subctrl = next.html();
                                            url = "diagnostics.aspx?ctl=MetadataInfo";
                                            url += "&Type=" + $('[id*=ddlMetaType]').val();
                                            url += "&Id=" + $('[id*=tbMetaKey]').val();
                                            url += "&ctrlName=" + $('[id*=tbMetaControlName]').val();
                                            url += "&subCtrlName=" + subctrl.split("-")[0].trim();
                                            url += "&subCtrlType=" + n.innerHTML;
                                            subctrl = $("<a></a>").attr("href", url).append(subctrl);
                                            next.html("");
                                            next.append(subctrl);
                                        }
                                    }
                                }

                                if (n.innerHTML == "Definition") {
                                    var element = document.createElement("textarea");
                                    element.setAttribute("cols", 300);
                                    element.setAttribute("rows", 20);
                                    element.innerHTML = BizAPP.UI.DiagDrill.formatXml(next.html())
                                    next.html("");
                                    next.append(element);
                                }
                            }
                        });
                        var tblcss = $('[id*=GridViewMetaInfo] tr td a');
                        tblcss.css({
                            "color": "blue",
                            "text-decoration": "underline",
                            "cursor": "pointer"
                        });
                        nodes = BizAPP.UI.DiagDrill.RMT;
                        BizAPP.UI.DiagDrill.removeTable(nodes);
                    }
                };

            </script>
        </fieldset>
    </ContentTemplate>
</asp:UpdatePanel>
