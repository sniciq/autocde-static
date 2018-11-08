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
		<title>${projectName}</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		<meta charset="utf-8">
		<meta name="description" content="${projectName}">
		<meta name="title" content="${projectName}" />
		<meta name="keywords" content="${projectName}" />
		<meta name="description" content="${projectName}" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		
		<script type="text/javascript">
			var ctx = '${ctx}';
			var sysVersion = '${sysVersion}';
		</script>
		
		
		<link rel="stylesheet" href="${ctx}/resources/js/angular/angular-material/angular-material.min.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/app.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/directive/angular-busy/angular-busy.css?v=${sysVersion}"/>
		
		<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-aria.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-route.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-cookies.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-messages.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-material/angular-material.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/ocLazyLoad/ocLazyLoad.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/directive/pagination/pagination.js?v=${sysVersion}"></script>
		<script src="${ctx}/directive/md-menu/mdToggleMenu.js?v=${sysVersion}"></script>
		<link rel="stylesheet" href="${ctx}/directive/ac-table/ac-table-directives.css?v=${sysVersion}">
		<script src="${ctx}/directive/ac-table/ac-table-directives.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/directive/angular-busy/angular-busy.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/directive/commonfilter.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/actheme.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/preview/getGenFile?tplPath=template/material/&path=app.js&type=material_ng_AppJS&nodeId=1&projectId=${projectId}"></script>
		
		<script type="text/javascript">
			var projectName = '${projectName}';						
			myApp.config(['$routeProvider',
	        	function($routeProvider,$routeParams) {
	          		$routeProvider.
	          		when('/home', {
		          		templateUrl: ctx + '/templates/preview/material_home.html?v=' + sysVersion,
		          		controller: 'HomeCtrl'
	         		})
	         }]);
	        myApp.navNames['/home']='首页';
	        myApp.controller('HomeCtrl', function(){});
		</script>
		
	</head>
	<body ng-controller="MainCtrl" layout="row">
		<md-sidenav style="background-color:#eee;" class="md-sidenav-left md-whiteframe-z2 " md-component-id="navLeft" md-is-locked-open="$mdMedia('gt-sm') && leftNavLock">
	      <md-toolbar class="md-theme-light">
	      	<div class="md-toolbar-tools">
		        <span>管理菜单</span>
		        <span flex></span>
		        <md-button class="md-icon-button" ng-click="toggleNavLeftLock($event)">
					<md-icon class="material-icons">{{leftNavLock ? 'lock' : 'lock_open'}}</md-icon>
				</md-button>
	        </div>
	      </md-toolbar>
	      <md-content ng-controller="LeftNavCtrl">
		      <ul class="docs-menu" style="margin-top: 0px;margin-bottom:0px;background-color:#eee;">
				<li ng-repeat="menu in menu.menus" ng-class="{'childActive' : isSectionSelected(menu)}">
		      		 <md-menu-link menu="menu" ng-if="menu.type === 'link'"></md-menu-link>
		             <md-menu-toggle menu="menu" ng-if="menu.type === 'toggle'"></md-menu-toggle>
		      	</li>
		      </ul>
	      </md-content>
	    </md-sidenav>
	    
	    <div layout="column" tabIndex="-1" role="main" flex style="background-color:#F1F1F1">
	    	<md-toolbar>
				<div class="md-toolbar-tools">
					<md-button class="md-icon-button" aria-label="Settings" ng-mouseover="toggleNavLeft()" ng-clickBBBBB="toggleNavLeft()" ng-show="!navLeftLocked()">
						<md-tooltip md-direction="bottom">菜单</md-tooltip>
						<md-icon class="material-icons">menu</md-icon>
					</md-button>
					<md-button class="md-icon-button" aria-label="Settings" ng-click="toHome()">
						<md-tooltip md-direction="bottom">返回首页</md-tooltip>
						<md-icon class="material-icons">home</md-icon>
					</md-button>
					<span flex></span>
					<p>{{getNavName() | xsTxtLimit: 10}}</p>
					<span flex></span>
					<md-menu md-position-mode="target-right target" >
				  		<md-button aria-label="" class="md-icon-button" ng-click="$mdOpenMenu($event)">
				  			<md-tooltip md-direction="bottom">更换主题</md-tooltip>
							<md-icon class="material-icons">color_lens</md-icon>
						</md-button>
						<md-menu-content width="3">
							<md-menu-item ng-repeat="item in themes">
								<md-button ng-click="changeTheme(item)">{{item}}</md-button>
							</md-menu-item>
						</md-menu-content>
					</md-menu>
					<md-menu md-position-mode="target-right target" >
						<md-button aria-label="" class="md-icon-button" ng-click="$mdOpenMenu($event)">
							<md-tooltip md-direction="bottom">个人设置</md-tooltip>
							<md-icon class="material-icons">person_outline</md-icon>
						</md-button>
						<md-menu-content width="3" >
							<md-menu-item>
								<div layout="row"><p flex>用户名</p></div>
							</md-menu-item>
							<md-divider></md-divider>
					    	<md-menu-item>
					    		<md-button ng-click="toChangePswd();">
					    			<div flex layout="row">
						               <p flex>修改密码</p>
						               <md-icon md-menu-align-target style="margin: auto 3px auto 0;" class="material-icons">lock</md-icon>
					            	</div>
					    		</md-button>
					    	</md-menu-item>
					    	<md-menu-item>
					    		<md-button ng-click="logout($event);">
					    			<div flex layout="row">
						               <p flex>退出系统</p>
						               <md-icon md-menu-align-target style="margin: auto 3px auto 0;" class="material-icons"><i class="material-icons">directions_run</i></md-icon>
					            	</div>
					    		</md-button>
					    	</md-menu-item>
						</md-menu-content>
					</md-menu>
				</div>
			</md-toolbar>
			
			<div layout layout-align="center top" class="routeChangeDiv routeChangeDiv-show-hide" ng-show="$root.isRouteLoading">
			</div>
			<md-content ng-view md-scroll-y layout="column" ng-cloak style="background-color:transparent"></md-content>
			<toaster-container toaster-options="{'time-out': 3000, 'close-button':true, 'position-class': 'toast-bottom-right'}"></toaster-container>
	    </div>
	</body>
</html>