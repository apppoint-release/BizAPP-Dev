<%@ page language="C#" autoeventwireup="true" inherits="InRichTextPage, App_Web_inrichtextpage.aspx.cdcab7d2" %>

<%--<%@ Register Assembly="Infragistics.WebUI.WebSpellChecker, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.WebUI.WebSpellChecker" TagPrefix="ig_spell" %>--%>
<%@ Register Assembly="Infragistics.WebUI.WebHtmlEditor, Version=17.1.20171.1001, Culture=neutral, PublicKeyToken=7dd5c3163f2cd0cb"
	Namespace="Infragistics.WebUI.WebHtmlEditor" TagPrefix="ighedit" %>
<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>BizAPP RichText</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<style type="text/css">
		body, form
		{
			margin: 0;
		}
	</style>
</head>
<body>
	<form id="form1" runat="server">
	<div>
		<ighedit:WebHtmlEditor ID="DefaultWebHtmlEditor" runat="server"
			FontFormattingList="Heading 1=&lt;h1&gt;&amp;Heading 2=&lt;h2&gt;&amp;Heading 3=&lt;h3&gt;&amp;Heading 4=&lt;h4&gt;&amp;Heading 5=&lt;h5&gt;&amp;Normal=&lt;p&gt;"
			FontNameList="Arial,Verdana,Tahoma,Courier New,Georgia" FontSizeList="1,2,3,4,5,6,7"
			FontStyleList="Blue Underline=color:blue;text-decoration:underline;&amp;Red Bold=color:red;font-weight:bold;&amp;ALL CAPS=text-transform:uppercase;&amp;all lowercase=text-transform:lowercase;&amp;Reset="
			SpecialCharacterList="&amp;#937;,&amp;#931;,&amp;#916;,&amp;#934;,&amp;#915;,&amp;#936;,&amp;#928;,&amp;#920;,&amp;#926;,&amp;#923;,&amp;#958;,&amp;#956;,&amp;#951;,&amp;#966;,&amp;#969;,&amp;#949;,&amp;#952;,&amp;#948;,&amp;#950;,&amp;#968;,&amp;#946;,&amp;#960;,&amp;#963;,&amp;szlig;,&amp;thorn;,&amp;THORN;,&amp;#402,&amp;#1046;,&amp;#1064;,&amp;#1070;,&amp;#1071;,&amp;#1078;,&amp;#1092;,&amp;#1096;,&amp;#1102;,&amp;#1103;,&amp;#12362;,&amp;#12354;,&amp;#32117;,&amp;AElig;,&amp;Aring;,&amp;Ccedil;,&amp;ETH;,&amp;Ntilde;,&amp;Ouml;,&amp;aelig;,&amp;aring;,&amp;atilde;,&amp;ccedil;,&amp;eth;,&amp;euml;,&amp;ntilde;,&amp;cent;,&amp;pound;,&amp;curren;,&amp;yen;,&amp;#8470;,&amp;#153;,&amp;copy;,&amp;reg;,&amp;#151;,@,&amp;#149;,&amp;iexcl;,&amp;#14;,&amp;#8592;,&amp;#8593;,&amp;#8594;,&amp;#8595;,&amp;#8596;,&amp;#8597;,&amp;#8598;,&amp;#8599;,&amp;#8600;,&amp;#8601;,&amp;#18;,&amp;brvbar;,&amp;sect;,&amp;uml;,&amp;ordf;,&amp;not;,&amp;macr;,&amp;para;,&amp;deg;,&amp;plusmn;,&amp;laquo;,&amp;raquo;,&amp;middot;,&amp;cedil;,&amp;ordm;,&amp;sup1;,&amp;sup2;,&amp;sup3;,&amp;frac14;,&amp;frac12;,&amp;frac34;,&amp;iquest;,&amp;times;,&amp;divide;">
			<DownlevelLabel ClientIDMode="Predictable"></DownlevelLabel>
			<DownlevelTextArea ClientIDMode="Predictable"></DownlevelTextArea>
			<TabStrip ClientIDMode="Predictable"></TabStrip>
			<Toolbar>
				<ighedit:ToolbarImage runat="server" Type="DoubleSeparator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="Bold" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Italic" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Underline" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Strikethrough" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="Subscript" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Superscript" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="Cut" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Copy" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Paste" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="Undo" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Redo" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="JustifyLeft" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="JustifyCenter" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="JustifyRight" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="JustifyFull" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="Indent" ClientIDMode="Predictable"></ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="Outdent" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="UnorderedList" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="OrderedList" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarDialogButton runat="server" Type="InsertRule" ClientIDMode="Predictable">
					<Dialog InternalDialogType="InsertRule" ClientIDMode="Predictable"></Dialog>
				</ighedit:ToolbarDialogButton>
				<ighedit:ToolbarImage runat="server" Type="RowSeparator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarImage runat="server" Type="DoubleSeparator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarDialogButton runat="server" Type="FontColor" ClientIDMode="Predictable">
					<Dialog ClientIDMode="Predictable" />
				</ighedit:ToolbarDialogButton>
				<ighedit:ToolbarDialogButton runat="server" Type="FontHighlight" ClientIDMode="Predictable">
					<Dialog ClientIDMode="Predictable" />
				</ighedit:ToolbarDialogButton>
				<ighedit:ToolbarDialogButton runat="server" Type="SpecialCharacter" ClientIDMode="Predictable">
					<Dialog InternalDialogType="SpecialCharacterPicker" Type="InternalWindow" ClientIDMode="Predictable">
					</Dialog>
				</ighedit:ToolbarDialogButton>
				<ighedit:ToolbarMenuButton runat="server" Type="InsertTable" ClientIDMode="Predictable">
					<Menu ClientIDMode="Predictable">
						<ighedit:HtmlBoxMenuItem runat="server" Act="TableProperties" ClientIDMode="Predictable">
							<Dialog InternalDialogType="InsertTable" ClientIDMode="Predictable"></Dialog>
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="InsertColumnRight" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="InsertColumnLeft" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="InsertRowAbove" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="InsertRowBelow" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="DeleteRow" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="DeleteColumn" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="IncreaseColspan" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="DecreaseColspan" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="IncreaseRowspan" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="DecreaseRowspan" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="CellProperties" ClientIDMode="Predictable">
							<Dialog InternalDialogType="CellProperties" ClientIDMode="Predictable"></Dialog>
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="TableProperties" ClientIDMode="Predictable">
							<Dialog InternalDialogType="ModifyTable" ClientIDMode="Predictable"></Dialog>
						</ighedit:HtmlBoxMenuItem>
					</Menu>
				</ighedit:ToolbarMenuButton>
				<ighedit:ToolbarButton runat="server" Type="ToggleBorders" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarButton runat="server" Type="InsertLink" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="RemoveLink" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<%--<ighedit:ToolbarButton runat="server" Type="Save" RaisePostback="True" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarUploadButton runat="server" Type="Open" ClientIDMode="Predictable">
					<Upload Mode="File" Filter="*.htm,*.html,*.asp,*.aspx" Height="350px" Width="500px"
						ClientIDMode="Predictable"></Upload>
				</ighedit:ToolbarUploadButton>--%>
				<ighedit:ToolbarButton runat="server" Type="Preview" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarImage runat="server" Type="Separator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarDialogButton runat="server" Type="FindReplace" ClientIDMode="Predictable">
					<Dialog InternalDialogType="FindReplace" ClientIDMode="Predictable"></Dialog>
				</ighedit:ToolbarDialogButton>
				<ighedit:ToolbarDialogButton runat="server" Type="InsertBookmark" ClientIDMode="Predictable">
					<Dialog InternalDialogType="InsertBookmark" ClientIDMode="Predictable"></Dialog>
				</ighedit:ToolbarDialogButton>
				<%--<ighedit:ToolbarUploadButton runat="server" Type="InsertImage" ClientIDMode="Predictable">
					<Upload Height="420px" Width="500px" ClientIDMode="Predictable"></Upload>
				</ighedit:ToolbarUploadButton>
				<ighedit:ToolbarUploadButton runat="server" Type="InsertFlash" ClientIDMode="Predictable">
					<Upload Mode="Flash" Filter="*.swf" Height="440px" Width="500px" ClientIDMode="Predictable">
					</Upload>
				</ighedit:ToolbarUploadButton>
				<ighedit:ToolbarUploadButton runat="server" Type="InsertWindowsMedia" ClientIDMode="Predictable">
					<Upload Mode="WindowsMedia" Filter="*.asf,*.wma,*.wmv,*.wm,*.avi,*.mpg,*.mpeg,*.m1v,*.mp2,*.mp3,*.mpa,*.mpe,*.mpv2,*.m3u,*.mid,*.midi,*.rmi,*.aif,*.aifc,*.aiff,*.au,*.snd,*.wav,*.cda,*.ivf"
						Height="400px" Width="500px" ClientIDMode="Predictable"></Upload>
				</ighedit:ToolbarUploadButton>
				<ighedit:ToolbarDialogButton runat="server" Type="Help" ClientIDMode="Predictable">
					<Dialog InternalDialogType="Text" ClientIDMode="Predictable"></Dialog>
				</ighedit:ToolbarDialogButton>--%>
				<ighedit:ToolbarButton runat="server" Type="CleanWord" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="WordCount" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
<%--				<ighedit:ToolbarButton runat="server" ClientIDMode="Predictable" Type="SpellCheck" />--%>
				<%--<ighedit:ToolbarButton runat="server" Type="PasteHtml" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarMenuButton runat="server" Type="Zoom" ClientIDMode="Predictable">
					<Menu ClientIDMode="Predictable">
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom25" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom50" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom75" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom100" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom200" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom300" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom400" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom500" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
						<ighedit:HtmlBoxMenuItem runat="server" Act="Zoom600" ClientIDMode="Predictable">
						</ighedit:HtmlBoxMenuItem>
					</Menu>
				</ighedit:ToolbarMenuButton>
				<ighedit:ToolbarButton runat="server" Type="TogglePositioning" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="BringForward" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>
				<ighedit:ToolbarButton runat="server" Type="SendBackward" ClientIDMode="Predictable">
				</ighedit:ToolbarButton>--%>
				<ighedit:ToolbarImage runat="server" Type="RowSeparator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarImage runat="server" Type="DoubleSeparator" ClientIDMode="Predictable">
				</ighedit:ToolbarImage>
				<ighedit:ToolbarDropDown runat="server" Type="FontName" ClientIDMode="Predictable">
				</ighedit:ToolbarDropDown>
				<ighedit:ToolbarDropDown runat="server" Type="FontSize" ClientIDMode="Predictable">
				</ighedit:ToolbarDropDown>
				<ighedit:ToolbarDropDown runat="server" Type="FontFormatting" ClientIDMode="Predictable">
				</ighedit:ToolbarDropDown>
				<ighedit:ToolbarDropDown runat="server" Type="FontStyle" ClientIDMode="Predictable">
				</ighedit:ToolbarDropDown>
				<ighedit:ToolbarDropDown runat="server" Type="Insert" ClientIDMode="Predictable">
					<Items>
						<ighedit:ToolbarDropDownItem runat="server" Act="Greeting" ClientIDMode="Predictable">
						</ighedit:ToolbarDropDownItem>
						<ighedit:ToolbarDropDownItem runat="server" Act="Signature" ClientIDMode="Predictable">
						</ighedit:ToolbarDropDownItem>
					</Items>
				</ighedit:ToolbarDropDown>
			</Toolbar>
			<ProgressBar ClientIDMode="Predictable"></ProgressBar>
			<TextWindow ClientIDMode="Predictable"></TextWindow>
		</ighedit:WebHtmlEditor>
<%--		<ig_spell:WebSpellChecker ID="DefaultWebSpellChecker" runat="server" StyleSetName=""
			StyleSetPath="" StyleSheetDirectory="" TextComponentId="DefaultWebHtmlEditor">
			<DialogOptions Modal="True" ShowNoErrorsMessage="True" />
		</ig_spell:WebSpellChecker>--%>
	</div>
	</form>
</body>
</html>
