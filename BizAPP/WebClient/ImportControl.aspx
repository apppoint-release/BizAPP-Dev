<%@ page language="C#" autoeventwireup="true" inherits="ImportControl, App_Web_importcontrol.aspx.cdcab7d2" %>

<asp:Literal runat="server" id="doctype"></asp:Literal>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Import Control</title>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
	<script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>

	<script type="text/javascript">
		var importCopyExcelContext;
	</script>

    <style type="text/css">
        #rbUpload, #rbCopy {
            display: none;
        }

        input[type="checkbox"] {
            float: none !important;
        }

        label[for] {
            white-space: nowrap;
            display: inline !important;
        }
    </style>
</head>
<body>
	<form id="form1" runat="server">
	<asp:Panel runat="server" Style="vertical-align: middle" ID="pnlImportWizard" CssClass="swMain">
        <style>
            /*#region Smart Wizard 2.0 */
/*http://techlaboratory.net/products.php?product=smartwizard */
.swMain, .swMain .stepContainer {
	position: relative;
	display: block;
	margin: 0;
	padding: 0;
	border: 0px solid #CCC;
	overflow: visible;
	float: left;
}

	.swMain .stepContainer {
		overflow: hidden;
		clear: both;
		float: none;
	}

		.swMain .stepContainer div.content {
			display: block;
			margin: 0;
			padding: 5px;
			border: 1px solid #CCC;
			font: normal 12px Verdana, Arial, Helvetica, sans-serif;
			color: #5A5655;
			background-color: #F8F8F8;
			text-align: left;
			overflow: visible;
			z-index: 88;
			border-radius: 5px;
			clear: both;
			height: 230px;
		}

	.swMain div.actionBar {
		display: block;
		position: relative;
		clear: both;
		margin: 3px 0 0 0;
		border: 1px solid #CCC;
		padding: 0;
		color: #5A5655;
		background-color: #F8F8F8;
		height: 40px;
		text-align: left;
		overflow: auto;
		z-index: 88;
		border-radius: 5px;
		-moz-border-radius: 5px;
		left: 0;
	}

	.swMain .stepContainer .StepTitle {
		display: block;
		position: relative;
		margin: 0;
		border: 1px solid #E0E0E0;
		padding: 5px;
		font: bold 16px Verdana, Arial, Helvetica, sans-serif;
		color: #5A5655;
		background-color: #E0E0E0;
		clear: both;
		text-align: left;
		z-index: 88;
		border-radius: 5px;
		-moz-border-radius: 5px;
	}

	.swMain ul.anchor {
		position: relative;
		display: block;
		float: left;
		list-style: none;
		padding: 0px;
		margin: 10px 0;
		clear: both;
		border: 0px solid #CCCCCC;
		background: transparent; /*#EEEEEE */
	}

		.swMain ul.anchor li {
			position: relative;
			display: block;
			margin: 0;
			padding: 0;
			padding-left: 3px;
			padding-right: 3px;
			border: 0px solid #E0E0E0;
			float: left;
		}
			/* Anchor Element Style */
			.swMain ul.anchor li a {
				display: block;
				position: relative;
				float: left;
				margin: 0;
				padding: 3px;
				height: 60px;
				width: 230px;
				text-decoration: none;
				outline-style: none;
				-moz-border-radius: 5px;
				-webkit-border-radius: 5px;
				z-index: 99;
			}

				.swMain ul.anchor li a .stepNumber {
					position: relative;
					float: left;
					text-align: center;
					padding: 5px;
					padding-top: 0;
					font: bold 45px Verdana, Arial, Helvetica, sans-serif;
				}

				.swMain ul.anchor li a .stepDesc {
					position: relative;
					display: block;
					text-align: left;
					padding: 5px;
					font: bold 20px Verdana, Arial, Helvetica, sans-serif;
				}

					.swMain ul.anchor li a .stepDesc small, .swMain td {
						font: normal 12px Verdana, Arial, Helvetica, sans-serif;
					}

				.swMain ul.anchor li a.selected {
					color: #F8F8F8;
					background: #EA8511; /* EA8511 */
					border: 1px solid #EA8511;
					cursor: text;
					-moz-box-shadow: 5px 5px 8px #888;
					-webkit-box-shadow: 5px 5px 8px #888;
					box-shadow: 5px 5px 8px #888;
				}

					.swMain ul.anchor li a.selected:hover {
						color: #F8F8F8;
						background: #EA8511;
					}

				.swMain ul.anchor li a.done {
					position: relative;
					color: #FFF;
					background: #8CC63F;
					border: 1px solid #8CC63F;
					z-index: 99;
				}

					.swMain ul.anchor li a.done:hover {
						color: #5A5655;
						background: #8CC63F;
						border: 1px solid #5A5655;
					}

				.swMain ul.anchor li a.disabled {
					color: #CCCCCC !important;
					background: #F8F8F8;
					border: 1px solid #CCC;
					cursor: text;
				}

					.swMain ul.anchor li a.disabled:hover {
						color: #CCCCCC;
						background: #F8F8F8;
					}

				.swMain ul.anchor li a.error {
					color: #6c6c6c !important;
					background: #f08f75 !important;
					border: 1px solid #fb3500 !important;
				}

					.swMain ul.anchor li a.error:hover {
						color: #000 !important;
					}

	.swmain .bttn, .swMain .buttonNext, .swMain .buttonPrevious, .swMain .buttonFinish {
		display: block;
		margin: 5px 3px 0 3px;
		padding: 5px;
		text-decoration: none;
		text-align: center;
		font: bold 13px Verdana, Arial, Helvetica, sans-serif;
		width: 100px;
		color: #FFF;
		outline-style: none;
		background-color: #5A5655;
		border: 1px solid #5A5655;
		-moz-border-radius: 5px;
		border-radius: 5px;
		cursor: pointer;
	}

	.swMain .buttonNext, .swMain .buttonPrevious, .swMain .buttonFinish {
		float: right;
	}

	.swMain .buttonDisabled {
		color: #F8F8F8 !important;
		background-color: #CCCCCC !important;
		border: 1px solid #CCCCCC !important;
		cursor: text;
	}

/* Form Styles */

.txtBox {
	border: 1px solid #CCCCCC;
	color: #5A5655;
	font: 13px Verdana,Arial,Helvetica,sans-serif;
	padding: 2px;
	width: 250px;
}

	.txtBox:focus {
		border: 1px solid #EA8511;
	}

.swMain .loader {
	position: relative;
	display: none;
	float: left;
	margin: 2px 0 0 2px;
	padding: 8px 10px 8px 40px;
	border: 1px solid #FFD700;
	font: bold 13px Verdana, Arial, Helvetica, sans-serif;
	color: #5A5655;
	background: #FFF url(loader.gif) no-repeat 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	z-index: 998;
}

.swMain .msgBox {
	position: relative;
	display: none;
	float: left;
	margin: 4px 0 0 5px;
	padding: 5px;
	border: 1px solid #FFD700;
	background-color: #FFFFDD;
	font: normal 12px Verdana, Arial, Helvetica, sans-serif;
	color: #5A5655;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	z-index: 999;
	min-width: 200px;
}

	.swMain .msgBox .content {
		font: normal 12px Verdana,Arial,Helvetica,sans-serif;
		padding: 0px;
		float: left;
	}

	.swMain .msgBox .close {
		border: 1px solid #CCC;
		border-radius: 3px;
		color: #CCC;
		display: block;
		float: right;
		margin: 0 0 0 5px;
		outline-style: none;
		padding: 0 2px 0 2px;
		position: relative;
		text-align: center;
		text-decoration: none;
	}

		.swMain .msgBox .close:hover {
			color: #EA8511;
			border: 1px solid #EA8511;
		}

.CopyPaste {
	background-position: 0px 0px;
}

.CopyPasteImages, .CopyPasteImage:hover {
	background-position: -172px 0px;
}

.uploadimage {
	background-position: 0px -78px;
}

	.uploadimages, .uploadimage:hover {
		background-position: -172px -78px;
	}

	.CopyPasteImage, .CopyPasteImages, .CopyPasteImage:hover, .uploadimage, .uploadimages, .uploadimage:hover {
		background-image: url('resources/images/common/importWiz.png');
		height: 78px;
		width: 172px;
		display: block;
		margin: 0 auto;
		cursor: pointer;
	}

.uploadimage, .CopyPasteImage {
	border: 1px solid #CCCCCC;
	border-radius: 5px;
}

	.uploadimages, .uploadimage:hover, .CopyPasteImages, .CopyPasteImage:hover {
		border: 4px solid #EA8511;
		-webkit-box-shadow: 0 0 5px #000;
		-moz-box-shadow: 0 0 5px #000;
		box-shadow: 0 0 5px #000;
	}
/*#endregion*/
/*import column mapping*/
.saveMap, .canMap {
	display: none;
}

.saveMap, .edtMap {
	border-right: solid 1px red;
}

#mapTable th a {
	padding: 0px 8px;
	color: #ED5D3B;
}

.headerMap {
	color: #555555;
	text-align: center;
	font-size: 16px;
	white-space: nowrap;
}

#mapTable th a:hover {
	color: #555;
	padding: 0 8px;
}

#mapTable th {
	text-align: center;
	vertical-align: middle;
	border: 0;
	border-right: 1px solid #DDD;
	box-shadow: 0 0 3px #000000;
	background: #FAFAFA none;
	padding: 15px;
}

.headings {
	border-bottom: 1px solid #DDD;
	height: 150px;
}

#mapTable .active {
	border: 0;
	border: 1px solid #46BCD2 !important;
	border-bottom: 0px solid #46BCD2 !important;
	background: #D1EBF1 !important;
}

.ignore {
	background: #FBE3E4 !important;
}

#mapTable th select {
	width: 175px;
	border-width: 1px;
	border-style: solid;
	border-color: #B4B4B4 #FEFEFE #FEFEFE #B4B4B4;
	background-color: #F0F0F0;
	border-radius: 3px;
	color: #555555;
}

.mapTableContainer {
	width: 678px;
	overflow: auto;
	height: 110px;
	padding: 5px 0 25px 2px;
}
/*import column mapping*/
        </style>
		<asp:HiddenField ID="hfMode" runat="server" />
		<asp:HiddenField ID="hfCurrentStep" runat="server" />
		<ul class="anchor">
			<li><a href="#step-1" class="selected" isdone="1" rel="1">
				<label class="stepNumber">
					1</label>
				<span class="stepDesc">Select Source<br>
					<small>Select Data Source</small> </span></a></li>
			<li><a href="#step-2" class="disabled" isdone="0" rel="2">
				<label class="stepNumber">
					2</label>
				<span class="stepDesc">Data<br>
					<small>Input Data</small> </span></a></li>
			<li><a href="#step-3" class="disabled" isdone="0" rel="3">
				<label class="stepNumber">
					3</label>
				<span class="stepDesc">Map Columns<br>
					<small>Map Columns</small> </span></a></li>
		</ul>
		<div id="step-1" class="content" style="display: block; left: 0px;">
			<h2 class="StepTitle">
				Step 1: Upload Or Copy</h2>
			<table cellspacing="0" cellpadding="0" style="width: 100%; height: 80%; text-align: center;">
				<tr>
					<td>
						<asp:RadioButton ID="rbUpload" GroupName="importType" runat="server" onclick="$('#hfMode').val('upload');$('#pnlImportWizard').find('.buttonNext').click();" />
						<span class="uploadimage" id="y" onclick="this.className='uploadimages';$('#x').attr('class','CopyPasteImage');$('#rbUpload').click();">
						</span>
					</td>
					<td>
						<asp:RadioButton ID="rbCopy" GroupName="importType" runat="server" onclick="$('#hfMode').val('pasteContent');$('#pnlImportWizard').find('.buttonNext').click();" />
						<span class="CopyPasteImage" id="x" onclick="this.className='CopyPasteImages';$('#y').attr('class','uploadimage');$('#rbCopy').click();">
						</span>
					</td>
				</tr>
			</table>
		</div>
		<div id="step-2" class="content" style="display: none;">
			<h2 class="StepTitle">
				Step 2: Data</h2>
			<table cellspacing="0" cellpadding="0" style="width: 100%; height: 80%; text-align: center;">
				<tr>
					<td>
						<div id="Load">
							<table style="margin: 0 auto;">
								<tr>
									<td>
										Upload
									</td>
									<td>
										<asp:FileUpload ID="CSVFileUpoad" runat="server" BizAPPid="ImportFileUpload" Height="20px"
											Width="100%" />
									</td>
									<td>
										<small>(Choose the data file to import data from)</small>
									</td>
								</tr>
								<tr>
									<td>
										Delimiter
									</td>
									<td>
										<asp:TextBox ID="tbDelimiter" runat="server" CssClass="fill" Height="20px" Text=","></asp:TextBox>
									</td>
									<td>
										<small>(Specify the separator used in the data file)</small>
									</td>
								</tr>
								<tr>
									<td colspan="3" align="right" style="padding-top: 15px;">
										<asp:CheckBox ID="cbInsertOnly" runat="server" Text="Insert Only"></asp:CheckBox>
										<asp:CheckBox ID="RunAsJob" runat="server" Text="Run As Job" Checked="true"></asp:CheckBox>
										<asp:Button ID="btnUpload" runat="server" Text="Upload" CssClass="bttn" Style="display: inline;" OnClientClick="return validateSteps(2);"/>
									</td>
								</tr>
							</table>
						</div>
						<div id="paste">
							<table>
								<tr>
									<td>
										Content
									</td>
									<td class="fill">
										<textarea class="fill" id="excelTxt" style="height: 150px"></textarea>
									</td>
								</tr>
								<tr>
									<td>
										Delimiter
									</td>
									<td>
										<asp:TextBox ID="tbCPDelimiter" runat="server" CssClass="fill" Height="20px" Text="\t"></asp:TextBox>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div id="step-3" class="content" style="display: none;">
			<h2 class="StepTitle">
				Step 3: Map Columns</h2>
			<table cellspacing="0" cellpadding="0" style="width: 100%; height: 80%; text-align: center;">
				<tr>
					<td>
						<asp:Panel ID="litMapTable" runat="server">
						</asp:Panel>
					</td>
				</tr>
			</table>
	</div> 
	</asp:Panel>
	<asp:Panel ID="pnlResourceImport" runat="server" Style="vertical-align: middle">
		<table style="width: 100%; height: 20px" cellpadding="0" cellspacing="0">
			<tr>
				<td style="width: 100%;">
					<asp:FileUpload ID="resUploader" Height="20px" Width="100%" BizAPPid="ImportFileUpload"
						CssClass="formtextbox" runat="server" />
				</td>
			</tr>
			<tr>
				<td align="right">
					<asp:Button ID="btnImport" Text="Import" runat="server" CssClass="formbutton" PostBackUrl="#" />
					<asp:Button ID="btnCancel" Text="Cancel" runat="server" CssClass="formbutton" PostBackUrl="#" />
				</td>
			</tr>
		</table>
	</asp:Panel>
	</form>
</body>
</html>