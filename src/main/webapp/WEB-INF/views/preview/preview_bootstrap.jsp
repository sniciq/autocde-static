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
		<title>代码生成器-web版</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" href="${ctx}/resources/css/bootstrap/css/bootstrap.min.css?v=${sysVersion}"/>
		
		<link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/fontawesome/css/font-awesome.min.css?v=${sysVersion}">
		
		<script type="text/javascript">
			var ctx = '${ctx}';
			var sysVersion = '${sysVersion}';
		</script>
		
		<link rel="stylesheet" href="${ctx}/resources/js/angular/toaster/toaster.css?v=${sysVersion}"/>
		
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/togglemenu_boot/togglemenu.css&type=resource&nodeId=1&projectId=1">
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-aside/css/angular-aside.min.css&type=resource&nodeId=1&projectId=1">
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/css/app.css&type=resource&nodeId=1&projectId=1">
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-busy/angular-busy.css&type=resource&nodeId=1&projectId=1">
		
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/directive/ac-table/ac-table.css&type=resource&nodeId=1&projectId=1">
		
		<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/angular-route.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/ui-bootstrap-tpls-2.4.0.min.js"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/moment/moment.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/togglemenu_boot/togglemenu.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-aside/js/angular-aside.min.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-busy/angular-busy.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/ocLazyLoad/ocLazyLoad.min.js&type=resource&nodeId=1&projectId=1"></script>
		
		<script src="${ctx}/directive/pagination/pagination.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=confirmDialogs.js&type=resource&nodeId=1&projectId=1"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/directive/ac-table/ac-table.js&type=resource&nodeId=1&projectId=1"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/directive/ac-table/pagination.js&type=resource&nodeId=1&projectId=1"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=app.js&type=bootstrap_ng_AppJS&nodeId=1&projectId=${projectId}"></script>
		
		
		<script type="text/javascript">
			var projectName = '${projectName}';						
			myApp.config(['$routeProvider',
	        	function($routeProvider,$routeParams) {
	          		$routeProvider.
	          		when('/home', {
		          		templateUrl: ctx + '/templates/preview/bootstrap_home.html?v=' + sysVersion,
		          		controller: 'HomeCtrl'
	         		})
	         }]);
	        myApp.navNames['/home']='首页';
	        myApp.controller('HomeCtrl', function($rootScope, $scope, $http, $location, $uibModal, toaster, confirmDialogs){});
		</script>
	</head>

	<body ng-controller="MainCtrl">
		<!-- <div class="navtogglediv navtogglediv-show-hide" ng-show="$root.isRouteLoading" ng-cloak>
			<div style="font-size:25px;" class="fa fa-cog fa-spin"></div>
		</div> -->
		<div style="min-height: 100%;position: relative;overflow: hidden;">
			<header class="main-header">
				<nav class="navbar navbar-ac " role="navigation">
					<div class="navbar-header">
						<span class="navSilderShowSpan pull-left leftNavMenuToggle" ng-show="leftNavLock && isLeftNavShow()" ng-click="toggleLeftNavLock()"><i class="fa fa-outdent" aria-hidden="true"></i></span>
						<span class="navSilderShowSpan pull-left leftNavMenuToggle" ng-show="!leftNavLock || !isLeftNavShow()" ng-click="openAside()"><i class="fa fa-bars" aria-hidden="true"></i></span>
						<a role="button" class="navbar-brand" href="${ctx}${baseUrl}/#/home">${projectName}</a>
					</div>
					<nav class="collapse navbar-collapse bs-navbar-collapse" style="margin-right: 10px;">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="#"><i class="fa fa-envelope-o"></i><span class="label label-success">4</span></a></li>
							<li><a href="#"><i class="fa fa-bell-o"></i><span class="label label-warning">8</span></a></li>
							<li><a href="#"><i class="fa fa-flag-o"></i><span class="label label-danger">6</span></a></li>
							
				            <li class="dropdown" uib-dropdown="">
			                    <a role="button" class="dropdown-toggle" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false">
			                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> 设置 <b class="caret"></b>
			                    </a>
			                    <ul class="dropdown-menu">
			                    	<li><a href="#accordion">无我仙人 你好</a></li>
			                    	<li role="separator" class="divider"></li>
			                        <li><a href="#">帮助</a></li>
			                        <li><a href="#">反馈</a></li>
			                        <li><a href="#">其它</a></li>
			                    </ul>
			                </li>
				            <li><a ng-click="logout('${ctx}/preview/${projectIdCode}/bootstraplogin')" tooltip-placement="bottom" uib-tooltip="退出"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> 退出</a></li>
				       </ul>
					</nav>
				</nav>
			</header>
			<aside ng-show="isLeftNavShow()" class="main-sidebar" ng-class="{'leftNavMin':isToggleNavMin,'leftNavLockDiv':!isToggleNavMin}" ng-style="sideBodyStyle" >
				<div class="user-panel">
					<div class="pull-left image">
						<img alt="" class="img-circle" src="${ctx}/resources/images/ac.ico">
					</div>
					<div class="pull-left info">
						<p>无我仙人</p>
						<p>autocoding@163.com</p>
					</div>
				</div>
				<div ng-style="sideMenuStyle" style="overflow-y: auto;overflow-x: hidden">
					<ul class="docs-menu">
						<li style="cursor: pointer;" ng-repeat="menu in menu.menus" ng-class="{'childActive' : isSectionSelected(menu)}">
				      		 <menu-link menu="menu" ng-if="menu.type === 'link'"></menu-link>
				             <menu-toggle menu="menu" ng-if="menu.type === 'toggle'"></menu-toggle>
				      	</li>
					</ul>
				</div>
				<div class="sidebar-footer" ng-click="toggleNavMin();">
					<div class="pull-right">
						<i class="toggleNavMin fa fa-angle-left" aria-hidden="true" ng-class="{'toggled' : isToggleNavMin}"></i>
					</div>
				</div>
			</aside>
			<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;margin: 6px;background-color: #eee;overflow: auto;" ng-style="pageContentStyle">
				<div style="padding: 10px 0px 0px 15px;">
					<span><a style="color: #3a3a3a;" role="button" href="${ctx}${baseUrl}/#/home"><i class="fa fa-home"></i>主页</a></span>
					<span>></span> 
					{{getNavName()}}
				</div>
				<div ng-view></div>
			</div>
			<toaster-container toaster-options="{'time-out': 3000, 'close-button':true, 'position-class': 'toast-bottom-right'}"></toaster-container>
		</div>
	</body>
</html>
