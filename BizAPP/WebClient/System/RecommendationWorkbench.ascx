<%@ control language="C#" autoeventwireup="true" inherits="System_RecommendationWorkbench, App_Web_recommendationworkbench.ascx.79613827" %>
<%@ register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="ajaxToolkit" %>
<asp:updatepanel id="UpdatePanelQuery" runat="server" updatemode="Conditional">
	<ContentTemplate>
		<fieldset>
			<legend>Recommendation Workbench</legend>
			<style>
				table, td {
					vertical-align: top;
				}
			</style>
			<p>
				<asp:Button ID="btnUserRecommender" runat="server" Text="User Recommendations" OnClick="btnUserRecommender_Click"
					CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
				<asp:Button ID="btnItemRecommender" runat="server" Text="Item Recommendations" OnClick="btnItemRecommender_Click"
					CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" />
			</p>
			<p ID="userRecommenderSection" runat="server"  visible="false">
				<h2>User Recommendation</h2>
				<table style="width: 100%;">
					<tr>
						<td>Name :
						</td>
					</tr>
					<tr>
						<td>
							<asp:TextBox ClientIDMode="Static" ID="TextUserRecommenderName" runat="server" Style="width: 100%;"></asp:TextBox>
							<!--<asp:RequiredFieldValidator runat="server" id="TextUserRecommenderNameValidator" controltovalidate="TextUserRecommenderName" errormessage="Recommender name is required" />-->
						</td>
					</tr>
					<tr>
						<td>Training Data :
						</td>
					</tr>
					<tr>
						<td>
							<table style="width: 100%;">
								<tr>
									<td>User/Item Preferences :
									</td>
								</tr>
								<tr>
									<td>
										<asp:TextBox ClientIDMode="Static" ID="TextTestUserData" runat="server" TextMode="MultiLine" Height="175px" Width="350px">
										</asp:TextBox>
									</td>
									<td>
										Sample Data - User to Item preferences. Each row indicates user preference.<br />
										<table style="width: 100%;">
											<tr><td>user1,</td><td>item101,</td><td>5.0</td></tr>
											<tr><td>user1,</td><td>item102,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item103,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item104,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item105,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item106,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item107,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item108,</td><td>3.0</td></tr>
											<tr><td>user2,</td><td>item101,</td><td>5.0</td></tr>
											<tr><td>user2,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item103,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item104,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item105,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item106,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item107,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item101,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item103,</td><td>1.5</td></tr>
											<tr><td>user3,</td><td>item104,</td><td>1.5</td></tr>
											<tr><td>user3,</td><td>item110,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item101,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item103,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item109,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item110,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item111,</td><td>4.5</td></tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<asp:Button ID="btnUserTrain" runat="server" Text="Train"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClick="btnUserTrain_Click" />

							<asp:Label ID="txtUserTrainResults" runat="server">

							</asp:Label>
							<asp:Label ID="txtUserTrainResultsError" runat="server" ForeColor="#FF0000" Visible="False">

							</asp:Label>
						</td>
					</tr>
					<tr>
						<td><hr style="width:100%" /></td>
					</tr>
					<tr>
						<td>Testing Data (Enter User Id to see recommendations):
						</td>
					</tr>
					<tr>
						<td><asp:TextBox ClientIDMode="Static" ID="TextTestDataUserId" runat="server" Style="width: 100%;"></asp:TextBox>
						</td>
					</tr>
					<tr>
						<td>
							<asp:Button ID="btnUserRecommend" runat="server" Text="Recommend"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClick="btnUserRecommend_Click" />

							<asp:Label ID="txtUserRecommendations" runat="server">

							</asp:Label>
							<asp:Label ID="txtUserRecommendationsError" runat="server" ForeColor="#FF0000" Visible="False">

							</asp:Label>

						</td>
					</tr>
				</table>
			</p>

			<p ID="itemRecommenderSection" runat="server" visible="false">
				<h2>Item Recommendation</h2>
				<table style="width: 100%;">
					<tr>
						<td>Name :
						</td>
					</tr>
					<tr>
						<td><asp:TextBox ClientIDMode="Static" ID="TextItemRecommenderName" runat="server" Style="width: 100%"></asp:TextBox>
							<!--<asp:RequiredFieldValidator runat="server" id="RequiredFieldValidator1" controltovalidate="TextItemRecommenderName" errormessage="Recommender name is required" />-->
						</td>
					</tr>
					<tr>
						<td>Training Data :
						</td>
					</tr>
					<tr>
						<td>
							<table style="width: 100%;">
								<tr>
									<td>User/Item Preferences :
									</td>
								</tr>
								<tr>
									<td>
										<asp:TextBox ClientIDMode="Static" ID="TextTestItemData" runat="server" TextMode="MultiLine" Height="175px" Width="350px">
										</asp:TextBox>
									</td>
									<td>
										Sample Data - User to Item preferences. Each row indicates user/item preference.<br />
										<table style="width: 100%;">
											<tr><td>user1,</td><td>item101,</td><td>5.0</td></tr>
											<tr><td>user1,</td><td>item102,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item103,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item104,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item105,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item106,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item107,</td><td>3.0</td></tr>
											<tr><td>user1,</td><td>item108,</td><td>3.0</td></tr>
											<tr><td>user2,</td><td>item101,</td><td>5.0</td></tr>
											<tr><td>user2,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item103,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item104,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item105,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item106,</td><td>4.5</td></tr>
											<tr><td>user2,</td><td>item107,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item101,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user3,</td><td>item103,</td><td>1.5</td></tr>
											<tr><td>user3,</td><td>item104,</td><td>1.5</td></tr>
											<tr><td>user3,</td><td>item110,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item101,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item102,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item103,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item109,</td><td>1.5</td></tr>
											<tr><td>user4,</td><td>item110,</td><td>4.5</td></tr>
											<tr><td>user4,</td><td>item111,</td><td>4.5</td></tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<asp:Button ID="btnItemTrain" runat="server" Text="Train"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClick="btnItemTrain_Click" />

							<asp:Label ID="txtItemTrainResults" runat="server">

							</asp:Label>
							<asp:Label ID="txtItemTrainResultsError" runat="server" ForeColor="#FF0000" Visible="False">

							</asp:Label>
						</td>
					</tr>
					<tr>
						<td><hr style="width:100%" /></td>
					</tr>
					<tr>
						<td>Testing Data (Enter User Id to see recommendations):
						</td>
					</tr>
					<tr>
						<td><asp:TextBox ClientIDMode="Static" ID="TextTestDataItemId" runat="server" Style="width: 100%;"></asp:TextBox>
						</td>
					</tr>
					<tr>
						<td>
							<asp:Button ID="btnItemRecommend" runat="server" Text="Recommend"
								CssClass="ui-state-default ui-corner-all curPointer ui-button ui-widget" OnClick="btnItemRecommend_Click" />

							<asp:Label ID="txtItemRecommendations" runat="server">

							</asp:Label>
							<asp:Label ID="txtItemRecommendationsError" runat="server" ForeColor="#FF0000" Visible="False">

							</asp:Label>
						</td>
					</tr>
				</table>
			</p>
			
		</fieldset>
	</ContentTemplate>
	<Triggers>
		<asp:PostBackTrigger ControlID="btnUserRecommender" />
		<asp:PostBackTrigger ControlID="btnItemRecommender" />
		<asp:PostBackTrigger ControlID="btnUserTrain" />
		<asp:PostBackTrigger ControlID="btnUserRecommend" />
		<asp:PostBackTrigger ControlID="btnItemTrain" />
		<asp:PostBackTrigger ControlID="btnItemRecommend" />
	</Triggers>
</asp:updatepanel>
