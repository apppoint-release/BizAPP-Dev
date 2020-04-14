<%@ control language="C#" autoeventwireup="true" inherits="AnalyzeLicenses, App_Web_analyzelicenses.ascx.79613827" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<asp:UpdatePanel ID="LicenseAnalysis" runat="server" UpdateMode="Conditional">
    <ContentTemplate>
        <fieldset>
            
            <legend>
                <asp:Label ID="lblHeader" runat="server" Text="Analysis"></asp:Label>
            </legend>
        </fieldset>
        <p>
            <table style="width: 100%">
                <tr>
                    <td style="text-align:right; width: 85%"> Period
                        <asp:DropDownList ID="ddlDateRange" runat="server"  AutoPostBack="true" OnSelectedIndexChanged="ddlDateRange_SelectedIndexChanged">
                                <asp:ListItem Text="Today" Value="Today"></asp:ListItem>
                                <asp:ListItem Text="Current Week" Value="CurrentWeek"></asp:ListItem>
                                <asp:ListItem Text="Last Week" Value="LastWeek"></asp:ListItem>
                                <asp:ListItem Text="Current Month" Value="CurrentMonth"></asp:ListItem>
                                <asp:ListItem Text="Last Month" Value="LastMonth"></asp:ListItem>
                                <asp:ListItem Text="Date Range" Value="DateRange"></asp:ListItem>
                            </asp:DropDownList>
                    </td>
                    <td style="text-align:right; width: 15%">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div id="divDateRange" runat="server" style="display:none">
                            <table style="width: 100%">
                                <tr>
                                    <td style="text-align:right;width:80%"> Start Date
                                        <asp:TextBox ID="txtStartDate" runat="server"></asp:TextBox>
                                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtStartDate" Format="dd-MM-yyyy"></ajaxToolkit:CalendarExtender>
                                    </td>
                                    <td> End Date
                                        <asp:TextBox ID="txtEndDate" runat="server"></asp:TextBox>
                                        <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtEndDate" Format="dd-MM-yyyy"></ajaxToolkit:CalendarExtender>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td style="text-align:right; width: 80%">
                                            
                                    </td>
                                    <td style="width: 20%">
                                        <asp:Button ID="btnSubmit" runat="server" Text="Submit" OnClick="btnSubmit_Click"
                                                            CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" Width="140" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                
                <tr>
                    <td style="text-align: center; width: 85%">
                        <table style="width:100%">
                            <tr>
                                <asp:Chart ID="Chart1" runat="server" Width="650" Height="250">
                                    <ChartAreas>
                                        <asp:ChartArea Name="ChartArea1">
                                        </asp:ChartArea>
                                    </ChartAreas>
                                    <Legends>
                                        <asp:Legend Name="Legend1">
                                        </asp:Legend>
                                    </Legends>
                                </asp:Chart>
                            </tr>
                            <tr>
                                <asp:Chart ID="Chart2" runat="server" Width="650" Height="250">
                                    <ChartAreas>
                                        <asp:ChartArea Name="ChartArea1">
                                        </asp:ChartArea>
                                    </ChartAreas>
                                    <Legends>
                                        <asp:Legend Name="Legend1">
                                        </asp:Legend>
                                    </Legends>
                                </asp:Chart>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </p>
    </ContentTemplate>
</asp:UpdatePanel>
