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
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>AC--Auto Coding 靠谱的代码自动生成</title>
	
	    <!-- Add to homescreen for Chrome on Android -->
	    <meta name="mobile-web-app-capable" content="yes">
	    <link rel="icon" sizes="192x192" href="images/android-desktop.png">
	
	    <!-- Add to homescreen for Safari on iOS -->
	    <meta name="apple-mobile-web-app-capable" content="yes">
	    <meta name="apple-mobile-web-app-status-bar-style" content="black">
	    <meta name="apple-mobile-web-app-title" content="Material Design Lite">
	    <link rel="apple-touch-icon-precomposed" href="images/ios-desktop.png">
	
	    <!-- Tile icon for Win8 (144x144 + tile color) -->
	    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
	    <meta name="msapplication-TileColor" content="#3372DF">
	    
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/app.css"> --%>
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/material.lime-red.min.css"> --%>
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/material.light_green-red.min.css"> --%>
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/material.amber-red.min.css"> --%>
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/material.grey-red.min.css"> --%>
	    
	    
	    <%-- <link rel="stylesheet" href="${ctx}/resources/css/mdl/material.min.css"> --%>
	    
	    <link rel="stylesheet" href="${ctx}/resources/css/app.css">
	    <link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css">
	    <link rel="stylesheet" href="${ctx}/resources/js/angular/angular-material/angular-material.min.css">
	    
	    <script type="text/javascript">
			var ctx = '${ctx}';
			var sysVersion = '${sysVersion}';
		</script>
		<!-- Angular Material Dependencies -->
		<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/angular-route.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-aria.min.js?v=${sysVersion}"></script>
    
		<script src="${ctx}/resources/js/angular/angular-busy/angular-busy.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/tree-view/treeView.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/isteven-multi-select/isteven-multi-select.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/ui-ace/ui-ace.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/tinymce.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/ui-layout/ui-layout.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/moment/moment.min.js?v=${sysVersion}"></script>
		
		
		<!-- Angular Material Javascript -->
		<script src="${ctx}/resources/js/angular/angular-material/angular-material.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/ctrl/app.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/MainCtrl.js?v=${sysVersion}"></script>
    	 
    	<script src="${ctx}/ctrl/HomeCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/ProjectCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/CodeCtrl.js?v=${sysVersion}"></script>
    	
    	<c:if test="${loginUserRoleId == 1}">
    	<script src="${ctx}/ctrl/admin/AcRoleCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/admin/AcUserCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/admin/AcUserLogCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/admin/ProjectAdminCtrl.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/admin/EmailNoticCtrl.js?v=${sysVersion}"></script>
    	</c:if>
	</head>
	<body ng-controller="MainCtrl">
		<md-content>
		    <md-toolbar>
		      <div class="md-toolbar-tools">
		        <md-button class="md-icon-button" ng-click="toggleLeftNav()">
		          <md-icon aria-label="menu" class="material-icons" ng-class="24">menu</md-icon>
		        </md-button>
		        <h3>
		          <span ng-click="toHome();" style="cursor: pointer;">Auto Coding 代码生成</span>
		        </h3>
		        <span flex></span>
		        <md-menu md-position-mode="target-right target" md-offset="0 50">
			        <md-button ng-click="openMenu($mdOpenMenu, $event)">
			        	<md-icon aria-label="menu" class="material-icons" ng-class="24">more_vert</md-icon>
			        	设置
			        </md-button>
			        <md-menu-content width="3">
				        <md-menu-item>
				          <md-button ng-click="ctrl.redial($event)">
				            <md-icon aria-label="menu" class="material-icons" ng-class="24">perm_identity</md-icon>
				            个人信息
				          </md-button>
				        </md-menu-item>
				        <md-menu-item>
				          <md-button ng-click="ctrl.checkVoicemail()">
				            <md-icon aria-label="menu" class="material-icons" ng-class="24">lock</md-icon>
				            修改密码
				          </md-button>
				        </md-menu-item>
				        <md-menu-divider></md-menu-divider>
				        <md-menu-item>
				          <md-button ng-click="ctrl.toggleNotifications()">
				            <md-icon aria-label="menu" class="material-icons" ng-class="24">power_settings_new</md-icon>
				            退出系统
				          </md-button>
				        </md-menu-item>
				    </md-menu-content>
		        </md-menu>
		      </div>
		   </md-toolbar>
	  </md-content>
		  
	  <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="leftNav">
	      <md-toolbar class="md-theme-light">
	      	<h1 class="md-toolbar-tools">管理菜单</h1>
	      </md-toolbar>
	      <md-content layout-padding>
	      	<c:if test="${loginUserRoleId == 1}">
	      	<md-list>
	      		<md-list-item ng-click="navigateTo('data usage', $event)">
	      			<p>项目管理</p>
				</md-list-item>
				<md-list-item ng-click="navigateTo('data usage', $event)">
	      			<p>用户管理</p>
				</md-list-item>
				<md-list-item ng-click="navigateTo('data usage', $event)">
	      			<p>日志查询</p>
				</md-list-item>
				<md-list-item ng-click="navigateTo('data usage', $event)">
	      			<p>角色管理</p>
				</md-list-item>
				<md-list-item ng-click="navigateTo('data usage', $event)">
	      			<p>邮件公告</p>
				</md-list-item>
	      	</md-list>
	      	</c:if>
	      </md-content>
     </md-sidenav>
     
     <md-content ng-view md-scroll-y="" class="layout-padding ng-scope flex"></md-content>
	</body>
</html>