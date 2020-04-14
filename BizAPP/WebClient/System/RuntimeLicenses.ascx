<%@ control language="C#" autoeventwireup="true" inherits="RuntimeLicenses, App_Web_runtimelicenses.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:UpdatePanel ID="UpdateRuntimeLicenses" runat="server" UpdateMode="Conditional">
    <ContentTemplate>
        <fieldset>
            
            <legend>
                <asp:Label ID="lblHeader" runat="server" Text="Label"></asp:Label>
            </legend>
        </fieldset>
        <p>
            <asp:Label ID="lblLicensesHeader" runat="server" Text="Label" BorderStyle="None" Width="100%" BackColor="#E6E6E6"></asp:Label></legend>
        </p>
        <p style="grid-row-align: end">
            <table style="width: 100%">
                <tr>
                    <td> 
                            <asp:Label ID="lblLicenseTypeText" runat="server" Text="License Type"></asp:Label>
                            <asp:DropDownList ID="ddlLicenseType" runat="server"  AutoPostBack="true" OnSelectedIndexChanged="ddlLicenseType_SelectedIndexChanged">
                                <asp:ListItem Text="Active Users" Value="users"></asp:ListItem>
                                <asp:ListItem Text="All Licenses" Value="all"></asp:ListItem>
                                <asp:ListItem Text="Client Licenses" Value="webclient"></asp:ListItem>
                                <asp:ListItem Text="Service Licenses" Value="service"></asp:ListItem>
                            </asp:DropDownList>
                    </td>
                    <td style="text-align:right">
                        <asp:Button ID="btnRefresh" runat="server" Text="Refresh" OnClick="btnRefresh_Click"
                            CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
                    </td>
               </tr>
           </table>
        </p>
        <p>
            <%--<asp:ObjectDataSource ID="licensesDataSource"
                runat="server" TypeName="LicensesDAL"
                SortParameterName="sortExp"
                SelectMethod="GetLicenses" EnablePaging="True"
                SelectCountMethod="TotalNumberOfLicenses"></asp:ObjectDataSource>--%>
            <asp:GridView ID="gvData" runat="server" CellPadding="4" Height="100%" Width="100%"
                CssClass="table table-striped table-bordered table-condensed" ForeColor="#333333" GridLines="Both">
                <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                <EditRowStyle BackColor="#999999" />
                <FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
                <HeaderStyle BackColor="#56458C" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
                <RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
                <SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
                <SortedAscendingCellStyle BackColor="#E9E7E2" />
                <SortedAscendingHeaderStyle BackColor="#506C8C" />
                <SortedDescendingCellStyle BackColor="#FFFDF8" />
                <SortedDescendingHeaderStyle BackColor="#6F8DAE" />
            </asp:GridView>
            
                     <div style="margin-top:2px">
                        <asp:Repeater ID="rptPager" runat="server">
                            <ItemTemplate>
                                        <span class="gridviewpagenumber">
                                        <asp:LinkButton ID="lnkPage"  runat="server" Text='<%#Eval("Text") %>' CommandArgument='<%# Eval("Value") %>' Enabled='<%# Eval("Enabled") %>' 
                                        OnClick="Page_Changed"></asp:LinkButton>
                                        </span>
                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
        </p>
    </ContentTemplate>
</asp:UpdatePanel>
