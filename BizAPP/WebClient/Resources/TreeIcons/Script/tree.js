var ob_noedit='';
var ob_ShowCellUnderRoot='False';
var ob_KeepLastExpanded=0;
var ob_KeepLastCollapsed=0;
var sNoSelect='';
var ob_eventFlags={"OnSomeEvent":true};

var ob_tree_id="tree1";verdadero=true;falso=false;wahr=true;falsch=false;vrai=true;faux=false;
var ob_icons="Resources/TreeIcons/Icons";
var ob_style="Resources/TreeIcons/Styles/xpBlue";
ob_tree_dnd_enable=false;
ob_tree_editnode_enable=false;
ob_tree_keynav_enable=false;
ob_tree_multiselect_enable=false;
ob_expand_single=false;

function getStyle(oElm,strCssRule)
{
    var strValue="";
    
    if(document.defaultView && document.defaultView.getComputedStyle)
    {
        strValue=document.defaultView.getComputedStyle(oElm,"").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle)
    {
        try
        {
            strCssRule=strCssRule.replace(/\-(\w)/g, function (strMatch,p1){return p1.toUpperCase();});
            strValue=oElm.currentStyle[strCssRule];
        }
        catch(ex)
        {
        }
    }
    return strValue;
};

//function ob_RootNode()
//{
//    var td=document.getElementById(ob_tree_id);
//    var rt=td.firstChild.firstChild.firstChild;
//    var ct=rt.nextSibling;
//    var it=rt.firstChild.firstChild.firstChild;
//    
//    if(ct!=null&&(getStyle(rt,"display")=="none"||getStyle(it,"display")=="none"))
//    {
//        ct.firstChild.firstChild.firstChild.style.display="none";
//    }
//    else if(ct!=null&&(getStyle(rt,"display")=="block"||getStyle(it,"display")=="block"))
//    {
//        ct.firstChild.firstChild.firstChild.firstChild.style.width="16px";
//        ct.firstChild.firstChild.firstChild.style.display="block";
//    }
//}
//    
//ob_RootNode();
