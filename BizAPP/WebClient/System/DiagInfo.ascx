<%@ control language="C#" autoeventwireup="true" inherits="System_Metadata_Info, App_Web_diaginfo.ascx.79613827" %>
<asp:updatepanel id="UpdatePanelMetaDataInfoContainer" runat="server" style="padding-top: 50px;">
    <contenttemplate>
		<!--Auto-update action status-->
        <asp:Panel runat="server" ID="pnlReload" Width="800px" Height ="440px" Style="margin:10px">
		    <fieldset>
			    <legend>Auto-update action status</legend>
			    <div style="margin: 10px;">
				    <asp:Literal runat="server" ID="AutoupdateStatus" />
			    </div>
		    </fieldset>
		    <!--UI Reload options-->
		    <fieldset>
			    <legend>Metadata Reload Options</legend>
                <asp:Panel runat="server" ID="PanelReloadAll">
                </asp:Panel>
			    <div style="margin: 10px;display:none">
				    <asp:Button ID="Reload" Text="Reload" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClientClick="callChangedReload();return false;" />
				    (Reload ui and process metadata changed since last load time)
				    <br />
				    <asp:Button ID="UpdateMetadata" Text="Update MetaData" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClientClick="callUpdateMetaDataSync();return false;" />
				    <br />
				    <asp:Button ID="ReloadMetaData" Text="Reload MetaData" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClientClick="callReloadMetaDataSync();return false;" />
				    (Reload full ui and process metadata irrespective of when the changes were last loaded)
			    </div>
		    </fieldset>
		    <!--Additional Reload Options-->
		    <fieldset>
			    <legend>Additional Reload Options</legend>
			    <style type="text/css">
			        input[type="checkbox"] {
			            float: none;
			        }
			    </style>
			    <div style="margin: 10px;">
				    Current Store Path : <asp:TextBox ID="StorePath" Text="" ReadOnly="true" runat="server" Columns="108" />
				    <br />
				    <asp:Button ID="ReloadLocalStore" Text="Reload Local Store" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="ReloadLocalStore_Click" />
				    (Clears all cached metadata in store)
				    <asp:Button ID="RefreshStoreHash" Text="Refresh Store Hash" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="RefreshStoreHash_Click" />
				    (Refreshes all metadata store hashes)
				    <br />
				    <%--<asp:Button ID="RefreshCache" Text="Reload Objects" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="RefreshCache_Click" />
				    (Clears cached runtime objects)
				    <br />
				    <asp:Button ID="RefreshSession" Text="Reload Session" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="RefreshSession_Click" />
				    (Clears session variables)
				    <br />--%>
				    <asp:Button ID="RefreshResources" Text="Reload Resources" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="RefreshResources_Click" />
				    <asp:CheckBox ID="EnableResourceTesting" Text="Test Localization" runat="server"
					    OnCheckedChanged="EnableResourceTesting_OnCheckedChanged" AutoPostBack="true" />
				    <br />

				    <%--<asp:Button ID="ReloadAllInstances" Text="Reload All Instances" runat="server" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget"
					    OnClick="ReloadAllInstances_Click" />
			        <br />--%>
                    <asp:DropDownList ID="ddlCacheServiceType" runat="server">
                    </asp:DropDownList>
                    <asp:Button ID="btnCacheServiceReload" runat="server" Text="Reload" CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClientClick="callReloadSpecificType();return false;"/>
			    </div>
		    </fieldset>
        </asp:Panel>        
        <script type="text/javascript">
            $(document).ready(function () {
                var groups = {};
                $("select option[OptionGroup]").each(function () {
                    groups[$.trim($(this).attr("OptionGroup"))] = true;
                });
                $.each(groups, function (c) {
                    $("select option[OptionGroup='" + c + "']").wrapAll('<optgroup label="' + c + '">');
                });
                $('[name="ctl01$ddlCacheServiceType"] optgroup').each(function () {
                    $(this).prepend('<option value="all" optiongroup="{0}">All</option>'.format($(this).attr('label')))
                });
            });
        </script>
	</contenttemplate>
</asp:updatepanel>
