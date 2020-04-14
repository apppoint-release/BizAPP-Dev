<%@ control language="C#" autoeventwireup="true" inherits="AttachmentControl, App_Web_attachmentcontrol.ascx.cdcab7d2" %>
<asp:Panel ID="AttachementShell" runat="server" EnableTheming="true">
    <asp:Panel runat="server" ID="title" CssClass="bza-paper-clip">
        <div style="line-height:50px;padding-left:50px;font-size: 25px;width:200px">Attachment</div>
    </asp:Panel>
    <table style="width: 100%" cellpadding="1" cellspacing="1">
        <tr>
            <td colspan="4">
                <asp:RadioButton GroupName="type" ID="rbLocalFile" Text="Local File" CssClass="formcheckbox"
                    AutoPostBack="True" runat="server" Checked="true" />
                <asp:RadioButton GroupName="type" ID="rbExternalLink" Text="External Link" CssClass="formcheckbox"
                    AutoPostBack="True" runat="server" />
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <asp:Label ID="lblShortName" Text="Short Name" runat="server" CssClass="formlabel"/>
                <asp:TextBox ID="tbShortName" CssClass="formtextbox" runat="server" style="width:80%;"/>
            </td>
        </tr>
        <tr>
            <td style="width: 100%" colspan="2">
                <asp:Table CellPadding="0" CellSpacing="0" runat="server" Width="100%">
                    <asp:TableRow>
                        <asp:TableCell ID="uploaderContainer" Width="100%" runat="server">
                            <asp:FileUpload ID="uploader" runat="server" Height="20px" Width="100%" BizAPPid="AttachmentFileUpload"
                                CssClass="formtextbox" />
                        </asp:TableCell>
                        <asp:TableCell ID="txtExternalLinkContainer" Width="100%" runat="server">
                            <asp:TextBox ID="txtExternalLink" runat="server" Height="20px" Width="100%" CssClass="formtextbox"></asp:TextBox>
                        </asp:TableCell>
                    </asp:TableRow>
                </asp:Table>
            </td>
            <td>
                <asp:Button ID="Attach" Text="Attach" runat="server" Height="20px" EnableTheming="true"
                    CssClass="formbutton" />
            </td>
            <td>
                <asp:Button ID="BtnOptions" Text="..." runat="server" Height="20px" EnableTheming="true"
                    CssClass="formbutton" />
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <asp:CheckBox ID="ReferenceOnly" runat="server" Height="20px" AutoPostBack="true" Text="Reference Only"
                    CssClass="formcheckbox" />
                <asp:CheckBox ID="cbViewOnly" runat="server" Height="20px" AutoPostBack="false" Text="View Only"
                    CssClass="formcheckbox" />
            </td>
        </tr>
        <tr>
            <td style="width: 100%">
                <asp:Label ID="link" runat="server" Height="20px" Width="100%" Visible="false" class="formtextbox"></asp:Label>
            </td>
            <td>
                <asp:Button ID="Remove" Text="Remove" runat="server" Visible="false" Height="20px"
                    EnableTheming="true" CssClass="formbutton" />
            </td>
            <td>
                <asp:Button ID="Reupload" Text="Reupload" runat="server" Visible="false" Height="20px"
                    EnableTheming="true" CssClass="formbutton" />
            </td>
            <td>
                <asp:Button ID="BtnOptions1" Text="..." runat="server" Height="20px" EnableTheming="true"
                    CssClass="formbutton" />
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <asp:Table ID="SortContainer" CellSpacing="0" CellPadding="0" Border="0" Width="100%" runat="server">
                    <asp:TableRow>
                        <asp:TableCell>
                            <asp:Label ID="LblSortNo" runat="server" class="formlabel" Text="Sort No"></asp:Label>
                        </asp:TableCell>
                        <asp:TableCell Style="width: 80%;">
                            <asp:TextBox ID="TxtSortNo" Height="20px" Width="100%" CssClass="formtextbox" runat="server" TextMode="Number"></asp:TextBox>
                        </asp:TableCell>
                    </asp:TableRow>
                </asp:Table>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <asp:Label ID="lblDescription" Text="Description" CssClass="formlabel" runat="server"></asp:Label>
            </td>
        </tr>
        <tr>
            <td colspan="4" width="100%">
                <asp:TextBox ID="txtDescription" TextMode="MultiLine" Height="70px" Width="100%"
                    CssClass="formtextbox" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td colspan="4" style="text-align: right;">
                <asp:Button ID="SaveChanges" Text="Save" runat="server" Height="20px" EnableTheming="true"
                    CssClass="formbutton" />
            </td>
        </tr>
    </table>
</asp:Panel>
