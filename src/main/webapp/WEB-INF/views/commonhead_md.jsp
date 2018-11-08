<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<title>AC(Auto Code)代码生成器, 靠谱!</title>
<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
<meta charset="utf-8">
<meta name="description" content="auto code.">
<meta name="title" content="AC(Auto Code)代码生成器, 靠谱!" />
<meta name="keywords" content="Auto Code, 代码生成器,基于material design设计, 生成Spring MVC、Mybatis后台框架，生成bootstrap、angular js、ExtJS等主流前端框架页面" />
<meta name="description" content="Auto Code, 代码生成器, 基于material design设计,生成Spring MVC、Mybatis后台框架，生成bootstrap、angular js、ExtJS等主流前端框架页面" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<link rel="stylesheet" href="${ctx}/resources/js/angular/angular-material/angular-material.min.css?v=${sysVersion}">
<link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css?v=${sysVersion}">
<link rel="stylesheet" href="${ctx}/resources/css/fontawesome/css/font-awesome.min.css?v=${sysVersion}">

<link rel="stylesheet" href="${ctx}/resources/css/app.css?v=${sysVersion}">
<link rel="stylesheet" href="${ctx}/directive/angular-busy/angular-busy.css?v=${sysVersion}"/>
<link rel="stylesheet" href="${ctx}/resources/js/angular/toaster/toaster.css?v=${sysVersion}"/>
<link rel="stylesheet" href="${ctx}/resources/js/angular/ui-layout/ui-layout.css?v=${sysVersion}"/>
<link rel="stylesheet" href="${ctx}/resources/js/angular/tree-view/style.css?v=${sysVersion}"/>

<script type="text/javascript">
	var ctx = '${ctx}';
	var sysVersion = '${sysVersion}';
</script>

<script src="${ctx}/resources/js/tinymce/tinymce.min.js?v=${sysVersion}"></script>

<script src="${ctx}/resources/js/moment/moment.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-aria.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-route.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-cookies.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-messages.min.js?v=${sysVersion}"></script>

<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/ui-ace/ui-ace.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/tinymce.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/js/angular/angular-material/angular-material.min.js?v=${sysVersion}"></script>

<script src="${ctx}/resources/js/ocLazyLoad/ocLazyLoad.min.js?v=${sysVersion}"></script>

<script src="${ctx}/directive/angular-busy/angular-busy.js?v=${sysVersion}"></script>
<script src="${ctx}/directive/pagination/pagination.js?v=${sysVersion}"></script>
<script src="${ctx}/directive/commonfilter.js?v=${sysVersion}"></script>
<script src="${ctx}/resources/actheme.js?v=${sysVersion}"></script>
