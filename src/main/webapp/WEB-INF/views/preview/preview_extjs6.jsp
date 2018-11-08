<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${projectName}系统</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		
		<script type="text/javascript">
			var appTheme = '${theme}';
			var projectName = '${projectName}';
			var ctx = '${ctx}';
			var menuList = eval('(' + '${menuList}' + ')');
		</script>

		<c:if test="${theme=='theme_default'}">
			<link rel="stylesheet" href="${ctx}/resources/extjs6/build/classic/theme-ac-default/resources/theme-ac-default-all.css?v=1.1">
	 		<link rel="stylesheet" type="text/css" href="${ctx}/preview/getGenFile?tplPath=template/ExtJS6/restpls/&path=resources/css/app-theme-ac-default.css&type=resource&nodeId=1&projectId=1">
		</c:if>
		
		<c:if test="${theme=='theme_classic'}">
			<link rel="stylesheet" href="${ctx}/resources/css/fontawesome/css/font-awesome.css?v=1.1">
			<link rel="stylesheet" href="${ctx}/resources/extjs6/build/classic/theme-ac-classic/resources/theme-ac-classic-all.css?v=1.1">
			<link rel="stylesheet" type="text/css" href="${ctx}/preview/getGenFile?tplPath=template/ExtJS6/restpls/&path=resources/css/app-theme-ac-classic.css&type=resource&nodeId=1&projectId=1">
		</c:if>
 
		<link rel="stylesheet" type="text/css" href="${ctx}/preview/getGenFile?tplPath=template/ExtJS6/restpls/&path=resources/css/app.css&type=resource&nodeId=1&projectId=1">
		
		<script src="${ctx}/resources/extjs6/build/ext-all.js?v=6.2.0"></script>
		<script src="${ctx}/resources/extjs6/build/classic/locale/locale-zh_CN.js?v=6.2.0"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/ExtJS6/restpls/&path=app/app.js&type=resource&nodeId=1&projectId=1"></script>
	</head>
	<body>
	</body>
</html>