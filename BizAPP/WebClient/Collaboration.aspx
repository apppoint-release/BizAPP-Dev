<%@ page language="C#" autoeventwireup="true" inherits="Collaboration, App_Web_collaboration.aspx.cdcab7d2" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="<%= Page.ResolveUrl( BizAPP.Web.UI.Renderer.RenderHelper.JQueryRefPath )%>"></script>
    <script type="text/javascript" language="javascript" src="<%= Page.ResolveUrl( "~/Resources/Javascripts/BizAPP.js?v=" + BizAPP.Web.UI.Renderer.RenderHelper.BuildTimeStamp ) %>"></script>
    <style>
        .chat-message img {
            height: 25px;
            width: 25px;
        }

        #chatContainer-tabs {
            width: 300px;
            /*height: 350px;*/
            height: 52%;
            position: fixed;
            right: 0px;
            float: right;
            bottom: 0;
        }

            #chatContainer-tabs .ui-tabs-nav {
                background: #123F76; /*#6D84B4*/
                height: 30px !important;
            }

        .chat-window-title {
            background: none repeat scroll 0 0 #123F76 !important;
        }

        #chatContainer-tabs .ui-tabs-nav li {
            height: 28px !important;
            width: 60px;
        }

            #chatContainer-tabs .ui-tabs-nav li a {
                height: 13px !important;
                cursor: pointer;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 58px;
                padding: .5em 0.1em;
                text-align: center;
            }

        #chatContainer-tabs .bza_chat {
            width: 285px;
            right: initial !important;
            /*bottom: initial!important;*/
            padding: 1em 1.4em;
            height: 290px;
        }

        #chatContainer-tabs .chat-window-inner-content {
            max-height: 260px;
        }

        #chatContainer-tabs .chat-window-content {
            height: 290px;
        }

        #chatContainer-tabs .chat-window-text-box-wrapper {
            bottom: 2px;
            position: fixed;
            width: 300px;
            right: 0;
        }

        .bza_chat.chat-window {
            height: 98% !important;
            width: 98% !important;
            right: 2px !important;
            bottom: 5px !important;
        }

        .chat-window-inner-content {
            height: 85% !important;
        }

        .chat-window-content {
            height: 100% !important;
        }

        .bza_chat.chat-window .popout {
            display: none;
        }

        div.chat-message:nth-child(even) {
            background: #F5F5F5 !important;
        }

        textarea {
            height: 52px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <%--<div id="chat-panel">
            <div id="chatContainer-tabs">
                <ul></ul>
            </div>
        </div>--%>
    </form>
</body>
</html>
