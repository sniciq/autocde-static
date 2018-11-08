<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="sysVersion" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html lang="zh-CN" ng-app="myApp">
	<head>
		<title>AC--Auto Coding 靠谱的代码自动生成</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/flow.png"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width">
		<link rel="stylesheet" href="${ctx}/resources/css/bootstrap/css/bootstrap.min.css?v=${sysVersion}"/>
		<link rel="stylesheet" href="${ctx}/resources/js/angular/ui-layout/ui-layout.css?v=${sysVersion}"/>
		
		<link rel="stylesheet" href="${ctx}/resources/css/app.css?v=${sysVersion}"/>
		<link rel="stylesheet" href="${ctx}/resources/css/grid.css?v=${sysVersion}"/>
		<link rel="stylesheet" href="${ctx}/resources/css/sticky-footer-navbar.css?v=${sysVersion}"/>

		<link rel="stylesheet" href="${ctx}/resources/js/angular/isteven-multi-select/isteven-multi-select.css?v=${sysVersion}"/>
		
		<link rel="stylesheet" href="${ctx}/resources/js/angular/tree-view/style.css?v=${sysVersion}"/>
		<script type="text/javascript">
			var ctx = '${ctx}';
			var sysVersion = '${sysVersion}';
		</script>
		
		<link rel="stylesheet" href="${ctx}/resources/js/angular/angular-busy/angular-busy.css?v=${sysVersion}"/>
		<link rel="stylesheet" href="${ctx}/resources/js/angular/toaster/toaster.css?v=${sysVersion}"/>
		
		<script src="${ctx}/resources/js/ace/ace.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/angular-route.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/ui-bootstrap-tpls-0.13.0.js"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-busy/angular-busy.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/tree-view/treeView.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/isteven-multi-select/isteven-multi-select.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/ui-ace/ui-ace.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/ui-layout/ui-layout.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/moment/moment.min.js?v=${sysVersion}"></script>
		
		<!-- jquery and bootstrap--> 
		<script src="${ctx}/resources/js/jquery/jquery-1.11.1.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/css/bootstrap/js/bootstrap.min.js?v=${sysVersion}"></script>
		
		
		<script src="${ctx}/resources/js/angular/confirmDialogs.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/fixedHeader.js?v=${sysVersion}"></script>
		
    	<script src="${ctx}/ctrl/app.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/MainCtrl.js?v=${sysVersion}"></script>
    	 
    	<script src="${ctx}/ctrl/HomeCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/ProjectCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/CodeCtrl.js?v=${sysVersion}"></script>
	</head>

	<body>
	</body>
</html>
