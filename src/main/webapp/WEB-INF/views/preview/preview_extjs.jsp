<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<title>${projectName}</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="title" content="${projectName}"/>
	    <meta name="application-name" content="${projectName}" />
	    
	    <link rel="stylesheet" type="text/css" href="${ctx}/resources/extjs/resources/css/ext-all-notheme.css"/>
	    <%-- <link rel="stylesheet" type="text/css" href="${ctx}/preview/getGenFile?tplPath=template/ExtJS/restpls/resources/&path=css/app.css&type=resource&nodeId=1&projectId=1"/> --%>
	    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/extPreview.css"/>
	    <link rel="stylesheet" type="text/css" title="blue" href="${ctx}/resources/extjs/resources/css/xtheme-blue.css"/>
	    <link rel="stylesheet" type="text/css" title="gray" href="${ctx}/resources/extjs/resources/css/xtheme-gray.css"/>
	    
	    <style type="text/css">
		    .x-selectable, .x-selectable * {  
		        -moz-user-select: text!important;  
		        -khtml-user-select: text!important;  
		        -webkit-user-select: text!important;
		    }  
		    
			div.panel_header_icon_title_left {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    width: 22px;
			    padding-right: 6px;
			}
			div.panel_header_main {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    line-height: 22px;
			    margin: auto;
			}
			
			div.panel_header_extra {
			    text-align: left;
			    float: right;
			    margin-right: 10px;
			}
			
			div.panel_header_icon1 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			div.panel_header_icon2 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			.userInfo {
				height: 35px;margin-top: 0px;float: right;margin-right: 10px;text-align: right;
				font-weight: bold; font-size: 14px; line-height: 35px;
			}
			.userInfo a{color: #f60;}
		</style>
	    
	    <script type="text/javascript">
			var globalCtx = '${ctx}';
			var menuList = eval('(' + '${menuList}' + ')');
			var projectName = '${projectName}';
		</script>
		
	    <script type="text/javascript" src="${ctx}/resources/extjs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/ext-all.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/src/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/examples/ux/DataViewTransition.js"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/ExtJS/restpls/&path=app/TabCloseMenu.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/ExtJS/restpls/&path=app/JSLoader.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/ExtJS/restpls/&path=app/app.js&type=resource&nodeId=1&projectId=1"></script>
		
	</head>
	<body>
	
	</body>
</html>