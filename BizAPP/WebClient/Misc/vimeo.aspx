<%@ page language="C#" %>

<!DOCTYPE html>

<script runat="server">
	protected void Page_Load( object sender, EventArgs e )
    {
		BizAPP.Web.UI.Common.Context context = new BizAPP.Web.UI.Common.Context( );
		BizAPP.Web.UI.Common.HtmlHelper.IncludeJavaScripts( context, Page );
		BizAPP.Web.UI.View.Control.PersonalizationEnablerEx Personalize = new BizAPP.Web.UI.View.Control.PersonalizationEnablerEx( Page );
		context.ControlName = "Personalize";
		Personalize.Initialize( context );
		Page.ClientScript.RegisterClientScriptBlock( this.GetType( ), "basePathSetup", BizAPP.Web.UI.Common.Helper.InteropCallHelper.ConstructSetEnterpriseName( context.RuntimeSession, context ), true );
	}
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Vimeo</title>
	<meta name="viewport" content="width=device-width,shrink-to-fit=no,user-scalable=no,initial-scale=1,minimum-scale=1,minimal-ui">
	<script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath ) %>"></script>
    <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/json/json.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
    <script src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
</head>
<body>
	<form id="form1" runat="server">
		<div class="container1" style="display:none">
			<div>
				<div">
					<div class="form-group">
						<input type="text" name="name" id="videoName" class="formtextbox" placeholder="Name" value=""></input>
					</div>
					<div class="form-group">
						<textarea type="text" name="description" id="videoDescription" class="formtextbox" placeholder="Description" value=""></textarea>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" id="upgrade_to_1080" name="upgrade_to_1080"> Upgrade to 1080 </input>
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" id="make_private" name="make_private"> Make Private </input>
						</label>
					</div>
				</div>
				<div>
					<div id="drop_zone">Drop Files Here</div>
					<br />
					<label class="btn btn-block btn-info">
						Browse&hellip;
						<input id="browse" type="file" style="display: none;">
					</label>
					<br />
					<br />
					<p></p>
					<br />
					<progress value="0" max="100" style="width 100%; display: none"></progress>
				</div>
			</div>
		</div>      
		<style>
		html {
			position: relative;
			min-height: 100%;
			background:transparent;
		}

		body {
			color: #505662;
			background:transparent;
			overflow-x:hidden;
		}

		/* Custom page CSS */

		.container1 {
			width: auto;
			padding: 0 15px;
		}

			.container1 .text-muted {
				margin: 20px 0;
			}

		#drop_zone {
			border: 2px dashed #bbb;
			border-radius: 5px;
			padding-top: 60px;
			text-align: center;
			font: 20pt bold 'Helvetica';
			color: #bbb;
			height: 80px;
		}

		#video-data {
			margin-top: 1em;
			font-size: 1.1em;
			font-weight: 500;
		}

		.btn-block {
			display: block;
			width: 100%;
		}

		.btn-info {
			color: #fff;
			background-color: #5bc0de;
			border-color: #46b8da;
		}

		.btn {
			display: inline-block;
			padding: 6px 12px;
			margin-bottom: 0;
			font-size: 14px;
			font-weight: 400;
			line-height: 1.42857143;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			-ms-touch-action: manipulation;
			touch-action: manipulation;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			background-image: none;
			border: 1px solid transparent;
			border-radius: 4px;
		}

		input[type=text], textarea, progress {
			width: 100%;
			margin-bottom: .5rem;
			padding: .5rem;
		}

		.checkbox, #displayStatus {
			display: none
		}
			p[data-value]:after {
				content: attr(data-value) '%';
				position: absolute;
				right: 0;
			}
	</style>
		<script type="text/javascript">
			/*
	 | Vimeo-Upload: Upload videos to your Vimeo account directly from a
	 |               browser or a Node.js app
	 |
	 |  _    ___
	 | | |  / (_)___ ___  ___  ____
	 | | | / / / __ `__ \/ _ \/ __ \   ┌───────────────────────────┐
	 | | |/ / / / / / / /  __/ /_/ /   | ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  %75    |
	 | |___/_/_/ /_/ /_/\___/\____/    └───────────────────────────┘
	 |                      Upload
	 |
	 |
	 | This project was released under Apache 2.0" license.
	 |
	 | @link      http://websemantics.ca
	 | @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
	 | @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
	 | @credits   Built on cors-upload-sample, https://github.com/googledrive/cors-upload-sample
	 */

			;
			(function (root, factory) {
				if (typeof define === 'function' && define.amd) {
					define([], function () {
						return (root.VimeoUpload = factory())
					})
				} else if (typeof module === 'object' && module.exports) {
					module.exports = factory()
				} else {
					root.VimeoUpload = factory()
				}
			}(this, function () {

				// -------------------------------------------------------------------------
				// RetryHandler Class

				/**
				 * Helper for implementing retries with backoff. Initial retry
				 * delay is 1 second, increasing by 2x (+jitter) for subsequent retries
				 *
				 * @constructor
				 */
				var RetryHandler = function () {
					this.interval = 1000 // Start at one second
					this.maxInterval = 60 * 1000; // Don't wait longer than a minute
				}

				/**
				 * Invoke the function after waiting
				 *
				 * @param {function} fn Function to invoke
				 */
				RetryHandler.prototype.retry = function (fn) {
					setTimeout(fn, this.interval)
					this.interval = this.nextInterval_()
				}

				/**
				 * Reset the counter (e.g. after successful request)
				 */
				RetryHandler.prototype.reset = function () {
					this.interval = 1000
				}

				/**
				 * Calculate the next wait time.
				 * @return {number} Next wait interval, in milliseconds
				 *
				 * @private
				 */
				RetryHandler.prototype.nextInterval_ = function () {
					var interval = this.interval * 2 + this.getRandomInt_(0, 1000)
					return Math.min(interval, this.maxInterval)
				}

				/**
				 * Get a random int in the range of min to max. Used to add jitter to wait times.
				 *
				 * @param {number} min Lower bounds
				 * @param {number} max Upper bounds
				 * @private
				 */
				RetryHandler.prototype.getRandomInt_ = function (min, max) {
					return Math.floor(Math.random() * (max - min + 1) + min)
				}

				// -------------------------------------------------------------------------
				// Private data

				/* Library defaults, can be changed using the 'defaults' member method,
			
				- api_url (string), vimeo api url
				- name (string), default video name
				- description (string), default video description
				- contentType (string), video content type
				- token (string), vimeo api token
				- file (object), video file
				- metadata (array), data to associate with the video
				- upgrade_to_1080 (boolean), set video resolution to high definition
				- offset (int),
				- chunkSize (int),
				- retryHandler (RetryHandler), hanlder class
				- onComplete (function), handler for onComplete event
				- onProgress (function), handler for onProgress event
				- onError (function), handler for onError event
			
				*/

				var defaults = {
					api_url: 'https://api.vimeo.com',
					name: 'Default name',
					description: 'Default description',
					contentType: 'application/octet-stream',
					file: {},
					metadata: [],
					upgrade_to_1080: false,
					offset: 0,
					chunkSize: 0,
					retryHandler: new RetryHandler(),
					onComplete: function () { },
					onProgress: function () { },
					onError: function () { }
				}

				/**
				 * Helper class for resumable uploads using XHR/CORS. Can upload any Blob-like item, whether
				 * files or in-memory constructs.
				 *
				 * @example
				 * var content = new Blob(["Hello world"], {"type": "text/plain"})
				 * var uploader = new VimeoUpload({
				 *   file: content,
				 *   token: accessToken,
				 *   onComplete: function(data) { ... }
				 *   onError: function(data) { ... }
				 * })
				 * uploader.upload()
				 *
				 * @constructor
				 * @param {object} options Hash of options
				 * @param {string} options.token Access token
				 * @param {blob} options.file Blob-like item to upload
				 * @param {string} [options.fileId] ID of file if replacing
				 * @param {object} [options.params] Additional query parameters
				 * @param {string} [options.contentType] Content-type, if overriding the type of the blob.
				 * @param {object} [options.metadata] File metadata
				 * @param {function} [options.onComplete] Callback for when upload is complete
				 * @param {function} [options.onProgress] Callback for status for the in-progress upload
				 * @param {function} [options.onError] Callback if upload fails
				 */
				var me = function (opts) {

					/* copy user options or use default values */
					for (var i in defaults) {
						this[i] = (opts[i] !== undefined) ? opts[i] : defaults[i]
					}

					this.contentType = opts.contentType || this.file.type || defaults.contentType
					this.httpMethod = opts.fileId ? 'PUT' : 'POST'

					this.videoData = {
						name: (opts.name > '') ? opts.name : defaults.name,
						description: (opts.description > '') ? opts.description : defaults.description,
						'privacy.view': opts.private ? 'unlisted' : 'anybody'
					}

					if (!(this.url = opts.url)) {
						var params = opts.params || {} /*  TODO params.uploadType = 'resumable' */
						this.url = this.buildUrl_(opts.fileId, params, opts.baseUrl)
					}
				}

				// -------------------------------------------------------------------------
				// Public methods

				/*
				  Override class defaults
			
					Parameters:
					- opts (object): name value pairs
			
				*/

				me.prototype.defaults = function (opts) {
					return defaults /* TODO $.extend(true, defaults, opts) */
				}

				/**
				 * Initiate the upload (Get vimeo ticket number and upload url)
				 */
				me.prototype.upload = function () {
					vimeoHelper = this;
					BizAPP.UI.Upload.GetVimeoUploadParams(function (vData) {
						vData = JSON.parse(vData[1]);
						vimeoHelper.url = vData.upload_link_secure
						vimeoHelper.user = vData.user
						vimeoHelper.ticket_id = vData.ticket_id
						vimeoHelper.complete_url = defaults.api_url + vData.complete_uri
						vimeoHelper.sendFile_()
					});
				}

				// -------------------------------------------------------------------------
				// Private methods

				/**
				 * Send the actual file content.
				 *
				 * @private
				 */
				me.prototype.sendFile_ = function () {
					var content = this.file
					var end = this.file.size

					if (this.offset || this.chunkSize) {
						// Only bother to slice the file if we're either resuming or uploading in chunks
						if (this.chunkSize) {
							end = Math.min(this.offset + this.chunkSize, this.file.size)
						}
						content = content.slice(this.offset, end)
					}

					var xhr = new XMLHttpRequest()
					xhr.open('PUT', this.url, true)
					xhr.setRequestHeader('Content-Type', this.contentType)
					// xhr.setRequestHeader('Content-Length', this.file.size)
					xhr.setRequestHeader('Content-Range', 'bytes ' + this.offset + '-' + (end - 1) + '/' + this.file.size)

					if (xhr.upload) {
						xhr.upload.addEventListener('progress', this.onProgress)
					}
					xhr.onload = this.onContentUploadSuccess_.bind(this)
					xhr.onerror = this.onContentUploadError_.bind(this)
					xhr.send(content)
				}

				/**
				 * Query for the state of the file for resumption.
				 *
				 * @private
				 */
				me.prototype.resume_ = function () {
					var xhr = new XMLHttpRequest()
					xhr.open('PUT', this.url, true)
					xhr.setRequestHeader('Content-Range', 'bytes */' + this.file.size)
					xhr.setRequestHeader('X-Upload-Content-Type', this.file.type)
					if (xhr.upload) {
						xhr.upload.addEventListener('progress', this.onProgress)
					}
					xhr.onload = this.onContentUploadSuccess_.bind(this)
					xhr.onerror = this.onContentUploadError_.bind(this)
					xhr.send()
				}

				/**
				 * Extract the last saved range if available in the request.
				 *
				 * @param {XMLHttpRequest} xhr Request object
				 */
				me.prototype.extractRange_ = function (xhr) {
					var range = xhr.getResponseHeader('Range')
					if (range) {
						this.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1
					}
				}

				/**
				 * The final step is to call vimeo.videos.upload.complete to queue up
				 * the video for transcoding.
				 *
				 * If successful call 'onUpdateVideoData_'
				 *
				 * @private
				 */
				me.prototype.complete_ = function (xhr) {
					vimeoHelper = this;
					BizAPP.UI.Upload.CompleteVimeoUpload({ complete_url: this.complete_url, name: $('#videoName').val(), description: $('#videoDescription').val() }, function (vData) {
						if (vData[3]) return;
						vData = vData[1];
						var video_id = vData.split('/').pop();
						vimeoHelper.onComplete(video_id, 1);
					});
				}

				/**
				 * Update the Video Data and add the metadata to the upload object
				 *
				 * @private
				 * @param {string} [id] Video Id
				 */
				me.prototype.onUpdateVideoData_ = function (video_id) {
					var url = this.buildUrl_(video_id, [], defaults.api_url + '/videos/')
					var httpMethod = 'PATCH'
					var xhr = new XMLHttpRequest()

					xhr.open(httpMethod, url, true)
					xhr.setRequestHeader('Authorization', 'Bearer ' + this.token)
					xhr.onload = function (e) {
						// add the metadata
						this.onGetMetadata_(e, video_id)
					}.bind(this)
					xhr.send(this.buildQuery_(this.videoData))
				}

				/**
				 * Retrieve the metadata from a successful onUpdateVideoData_ response
				 * This is is useful when uploading unlisted videos as the URI has changed.
				 *
				 * If successful call 'onUpdateVideoData_'
				 *
				 * @private
				 * @param {object} e XHR event
				 * @param {string} [id] Video Id
				 */
				me.prototype.onGetMetadata_ = function (e, video_id) {
					// Get the video location (videoId)
					if (e.target.status < 400) {
						if (e.target.response) {
							// add the returned metadata to the metadata array
							var meta = JSON.parse(e.target.response)
							// get the new index of the item
							var index = this.metadata.push(meta) - 1
							// call the complete method
							this.onComplete(video_id, index)
						} else {
							this.onCompleteError_(e)
						}
					}
				}

				/**
				 * Handle successful responses for uploads. Depending on the context,
				 * may continue with uploading the next chunk of the file or, if complete,
				 * invokes vimeo complete service.
				 *
				 * @private
				 * @param {object} e XHR event
				 */
				me.prototype.onContentUploadSuccess_ = function (e) {
					if (e.target.status == 200 || e.target.status == 201) {
						this.complete_()
					} else if (e.target.status == 308) {
						this.extractRange_(e.target)
						this.retryHandler.reset()
						this.sendFile_()
					}
				}

				/**
				 * Handles errors for uploads. Either retries or aborts depending
				 * on the error.
				 *
				 * @private
				 * @param {object} e XHR event
				 */
				me.prototype.onContentUploadError_ = function (e) {
					if (e.target.status && e.target.status < 500) {
						this.onError(e.target.response)
					} else {
						this.retryHandler.retry(this.resume_())
					}
				}

				/**
				 * Handles errors for the complete request.
				 *
				 * @private
				 * @param {object} e XHR event
				 */
				me.prototype.onCompleteError_ = function (e) {
					this.onError(e.target.response); // TODO - Retries for initial upload
				}

				/**
				 * Handles errors for the initial request.
				 *
				 * @private
				 * @param {object} e XHR event
				 */
				me.prototype.onUploadError_ = function (e) {
					this.onError(e.target.response); // TODO - Retries for initial upload
				}

				/**
				 * Construct a query string from a hash/object
				 *
				 * @private
				 * @param {object} [params] Key/value pairs for query string
				 * @return {string} query string
				 */
				me.prototype.buildQuery_ = function (params) {
					params = params || {}
					return Object.keys(params).map(function (key) {
						return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
					}).join('&')
				}

				/**
				 * Build the drive upload URL
				 *
				 * @private
				 * @param {string} [id] File ID if replacing
				 * @param {object} [params] Query parameters
				 * @return {string} URL
				 */
				me.prototype.buildUrl_ = function (id, params, baseUrl) {
					var url = baseUrl || defaults.api_url + '/me/videos'
					if (id) {
						url += id
					}
					var query = this.buildQuery_(params)
					if (query) {
						url += '?' + query
					}
					return url
				}

				return me
			}))
	</script>
		<script type="text/javascript">
			var f1 = BizAPP.UI.LoadThemes;
			BizAPP.UI.LoadThemes = function (options, i, handler) {
				handler = "$('.container1').show()";
				f1(options, i, handler);
			}
			/**
			 * Called when files are dropped on to the drop target or selected by the browse button.
			 * For each file, uploads the content to Drive & displays the results when complete.
			 */
			function handleFileSelect(evt) {
				evt.stopPropagation()
				evt.preventDefault()

				var files = evt.dataTransfer ? evt.dataTransfer.files : $(this).get(0).files

				/* Rest the progress bar and show it */
				updateProgress(0)
				/* Instantiate Vimeo Uploader */
				; (new VimeoUpload({
					name: document.getElementById('videoName').value,
					description: document.getElementById('videoDescription').value,
					private: document.getElementById('make_private').checked,
					file: files[0],
					upgrade_to_1080: document.getElementById('upgrade_to_1080').checked,
					onError: function (data) {
						showMessage('<strong>Error</strong>: ' + JSON.parse(data).error, 'danger')
					},
					onProgress: function (data) {
						updateProgress(data.loaded / data.total)
					},
					onComplete: function (videoId, index) {
						window.parent.BizAPP.UI.Upload.SaveVimeo({ url: 'https://player.vimeo.com/video/' + videoId, name: $('#videoName').val(), description: $('#videoDescription').val() });
					}
				})).upload()

				/* local function: show a user message */
				function showMessage(html, type) {
					/* hide progress bar */
					document.getElementById('progress-container').style.display = 'none'

					/* display alert message */
					var element = document.createElement('div')
					element.setAttribute('class', 'alert alert-' + (type || 'success'))
					element.innerHTML = html
					results.appendChild(element)
				}
			}

			/**
			 * Dragover handler to set the drop effect.
			 */
			function handleDragOver(evt) {
				evt.stopPropagation()
				evt.preventDefault()
				evt.dataTransfer.dropEffect = 'copy'
			}

			/**
			 * Updat progress bar.
			 */
			function updateProgress(progress) {
				if (progress == 0) progress = .01;
				else if (progress == 1) progress = .99;
				progress = Math.floor(progress * 100)
				//var element = document.getElementById('progress')
				//element.setAttribute('style', 'width:' + progress + '%')
				//element.innerHTML = '&nbsp;' + progress + '%'
				$('progress').show();
				$('progress').val(progress);
				$('progress').prev().prev().css('width', progress + '%').attr('data-value', progress);
			}
			/**
			 * Wire up drag & drop listeners once page loads
			 */
			document.addEventListener('DOMContentLoaded', function () {
				var dropZone = document.getElementById('drop_zone')
				var browse = document.getElementById('browse')
				dropZone.addEventListener('dragover', handleDragOver, false)
				dropZone.addEventListener('drop', handleFileSelect, false)
				browse.addEventListener('change', handleFileSelect, false)
			})
		</script>
	</form>
</body>
</html>
