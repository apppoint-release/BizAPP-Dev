<%@ page language="C#" autoeventwireup="true" inherits="Misc_TestPharmaCode, App_Web_testpharmacode.aspx.3daed74e" %>
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<%
	float maxWidth = string.IsNullOrEmpty( Request[ "width" ] ) ? 300.0f : float.Parse( Request[ "width" ] );
	float defaultOneBar = maxWidth / 32;
	float defaultThinWidth = defaultOneBar;
	float defaultThickWidth = defaultOneBar * 2;
	int pharmaCode = string.IsNullOrEmpty( Request[ "pharmacode" ] ) ? 3 : int.Parse( Request[ "pharmacode" ] );
	string maxHeight = string.IsNullOrEmpty( Request[ "height" ] ) ? "100%" : Request[ "height" ];
	
	// Colors
	string bgColor = string.IsNullOrEmpty( Request[ "backgroundcolor" ] ) ? "ffffff" : Request[ "backgroundcolor" ];
	string thickColor = string.IsNullOrEmpty( Request[ "thickcolor" ] ) ? "000000" : Request[ "thickcolor" ];
	string thinColor = string.IsNullOrEmpty( Request[ "thincolor" ] ) ? "000000" : Request[ "thincolor" ];
	string gapColor = string.IsNullOrEmpty( Request[ "gapcolor" ] ) ? "ffffff" : Request[ "gapcolor" ];
%>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0"
	id="svg1901" width="<%= maxWidth %>" height="<%= maxHeight %>">
	<%
		int barIndex = 0;
		int barCount = 0;
		float x = 0f;
		System.Collections.Generic.IEnumerable<string> listOfBars = GetPharmaCode( pharmaCode, 0, "2", "1", out barCount );
	%>
	<rect
		width="100%"
		height="100%"
		x="0"
		y="0"
		style="opacity:1;fill:<%= bgColor %>;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
		id="rectmain" />
	<g
		transform="translate(<%= ( maxWidth - ( barCount * 2 * defaultOneBar ) ) /2 %>,0)"
		style="opacity:1;"
		id="barlayer">
		<%
			foreach ( string barType in listOfBars )
			{
				if ( barType == "2" )
				{
		%>
		<rect
			width="<%= defaultThickWidth %>"
			height="100%"
			x="<%= x %>"
			y="0"
			style="opacity:1;fill:<%= thickColor %>;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			id="rectthick<%= barIndex++ %>" />
		<%
			x += defaultThickWidth;
				}
				else
				{
		%>
		<rect
			width="<%= defaultThinWidth %>"
			height="100%"
			x="<%= x %>"
			y="0"
			style="opacity:1;fill:<%= thinColor %>;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			id="rectthin<%= barIndex++ %>" />
		<%
			x += defaultThinWidth;
				}
		%>
		<rect
			width="<%= defaultThinWidth %>"
			height="100%"
			x="<%= x %>"
			y="0"
			style="opacity:1;fill:<%= gapColor %>;fill-opacity:1;stroke:none;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			id="rectsep<%= barIndex++ %>" />
		<%
			x += defaultThinWidth;
			}
		%>
	</g>
</svg>