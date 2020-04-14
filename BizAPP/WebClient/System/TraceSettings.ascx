<%@ control language="C#" autoeventwireup="true" inherits="System_Trace_Settings, App_Web_tracesettings.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdatePanelTraces" runat="server">
    <ContentTemplate>
        <div>
            <asp:TextBox ID="tbNamespace" runat="server"></asp:TextBox>
            <asp:RadioButton ID="chOff" runat="server" Text="Off" GroupName="Trace"/>
            <asp:RadioButton ID="chDebug" runat="server" Text="Debug" GroupName="Trace"/>
            <asp:RadioButton ID="chInformation" runat="server" Text="Information" GroupName="Trace"/>
            <asp:RadioButton ID="chWarning" runat="server" Text="Warning" GroupName="Trace"/>
            <asp:RadioButton ID="chError" runat="server" Text="Error" GroupName="Trace"/>
            <asp:CheckBox ID="chFilter" runat="server" Text="Filter Current ASP.NET Session" />
            <asp:Button ID="btUpdateTrace" runat="server" Text="Update" OnClick="btUpdateTrace_Click" />
            <br />
            <br />
        </div>
        <asp:DataGrid ID="GridViewTraces" runat="server" CellPadding="4"
            AutoGenerateColumns="false" OnCancelCommand="GridViewTraces_Cancel" OnUpdateCommand="GridViewTraces_Updating"
            OnEditCommand="GridViewTraces_Edit" Height="100%" Width="100%" Enabled="true"
            EnableViewState="true">
            <HeaderStyle CssClass="viewheader" />
            <Columns>
                <asp:EditCommandColumn EditText="Edit" CancelText="Cancel" UpdateText="Update" />
                <asp:BoundColumn DataField="Name" HeaderText="Namespace" SortExpression="Name" />
                <asp:TemplateColumn HeaderText="Off">
                    <ItemTemplate>
                        <%# DataBinder.Eval( Container.DataItem, "Off" )%>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:RadioButton ID="cbOff" runat="server" GroupName="Trace2" Checked='<%# DataBinder.Eval( Container.DataItem, "Off" ).ToString() == "True" ? true : false %>' />
                    </EditItemTemplate>
                </asp:TemplateColumn>
                <asp:TemplateColumn HeaderText="Debug">
                    <ItemTemplate>
                        <%# DataBinder.Eval( Container.DataItem, "Debug" )%>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:RadioButton ID="cbDebug" runat="server" GroupName="Trace2" Checked='<%# DataBinder.Eval( Container.DataItem, "Debug" ).ToString() == "True" ? true : false %>' />
                    </EditItemTemplate>
                </asp:TemplateColumn>
                <asp:TemplateColumn HeaderText="Information">
                    <ItemTemplate>
                        <%# DataBinder.Eval( Container.DataItem, "Information" )%>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:RadioButton ID="cbInformation" runat="server" GroupName="Trace2" Checked='<%# DataBinder.Eval( Container.DataItem, "Information" ).ToString() == "True" ? true : false %>' />
                    </EditItemTemplate>
                </asp:TemplateColumn>
                <asp:TemplateColumn HeaderText="Warning">
                    <ItemTemplate>
                        <%# DataBinder.Eval( Container.DataItem, "Warning" )%>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:RadioButton ID="cbWarning" runat="server" GroupName="Trace2" Checked='<%# DataBinder.Eval( Container.DataItem, "Warning" ).ToString() == "True" ? true : false %>' />
                    </EditItemTemplate>
                </asp:TemplateColumn>
                <asp:TemplateColumn HeaderText="Error">
                    <ItemTemplate>
                        <%# DataBinder.Eval( Container.DataItem, "Error" )%>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:RadioButton ID="cbError" runat="server" GroupName="Trace2" Checked='<%# DataBinder.Eval( Container.DataItem, "Error" ).ToString() == "True" ? true : false %>' />
                    </EditItemTemplate>
                </asp:TemplateColumn>
            </Columns>
        </asp:DataGrid>
    </ContentTemplate>
</asp:UpdatePanel>
