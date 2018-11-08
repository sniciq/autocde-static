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
		<script src="${ctx}/resources/js/ace/src-min-noconflict/ace.js?v=${sysVersion}"></script>
		
		<link rel="stylesheet" href="${ctx}/resources/js/google-code-prettify/prettify.css?v=${sysVersion}">
		<script src="${ctx}/resources/js/google-code-prettify/prettify.js"></script>
		
	    <%@include file="commonhead_md.jsp" %>
		
		<script type="text/javascript">
			var routeList = eval('(' + '${routeList}' + ')');
			var userEmail = '${userEmail}';
		</script>
		
		<script src="${ctx}/directive/md-menu/mdToggleMenu.js?v=${sysVersion}"></script>
		<link rel="stylesheet" href="${ctx}/directive/ac-table/ac-table-directives.css?v=${sysVersion}">
		<script src="${ctx}/directive/ac-table/ac-table-directives.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/ctrl/app.js?v=${sysVersion}"></script>
		<script src="${ctx}/ctrl/MenuService.js?v=${sysVersion}"></script>
    	<script src="${ctx}/ctrl/MainCtrl.js?v=${sysVersion}"></script>
	</head>
	
	<body ng-controller="MainCtrl" layout="row">
		<md-sidenav style="background-color:#eee;" class="md-sidenav-left md-whiteframe-z2 ng-hide-quick" md-component-id="navLeft" md-is-locked-open="$mdMedia('gt-sm') && leftNavLock">
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
		<div layout="column" tabIndex="-1" role="main" flex  style="background-color:#EEEEEE">
			<md-toolbar>
				<div class="md-toolbar-tools">
					<md-button class="md-icon-button ng-hide-quick" aria-label="Settings" ng-mouseover="toggleNavLeft()" ng-show="!navLeftLocked()">
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
					<md-button class="md-icon-button" aria-label="reward" ng-click="reward()" >
						<md-tooltip md-direction="bottom">打赏AC</md-tooltip>
						<md-icon class="material-icons" style="color:gold;">attach_money</md-icon>
					</md-button>
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
								<div layout="row"><p flex>${userName}</p></div>
							</md-menu-item>
							<md-divider></md-divider>
							<md-menu-item>
					    		<md-button ng-click="showUpgradeLog();">
					    			<div flex layout="row">
										<span>升级日志</span>
										<span flex></span>
										<md-icon md-menu-align-target style="margin: auto 3px auto 0;" class="material-icons">system_update</md-icon>
					            	</div>
					    		</md-button>
					    	</md-menu-item>
					    	<md-menu-item>
					    		<md-button ng-click="mailToMe();">
					    			<div flex layout="row">
						               <p flex>意见反馈</p>
						               <md-icon md-menu-align-target style="margin: auto 3px auto 0;" class="material-icons">mail</md-icon>
					            	</div>
					    		</md-button>
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
				<!-- <md-progress-circular md-mode="indeterminate"></md-progress-circular>
				<md-progress-circular md-mode="indeterminate" md-diameter="100"></md-progress-circular>

				<md-progress-linear md-mode="indeterminate"></md-progress-linear> -->				
				<!-- <md-progress-linear class="md-primary" md-mode="determinate" value="100"></md-progress-linear> -->
			</div>
			
			<md-content ng-view layout="column" ng-cloak style="background-color:transparent"></md-content>
			
			<toaster-container toaster-options="{'time-out': 3000, 'close-button':true, 'position-class': 'toast-bottom-right'}"></toaster-container>
		</div>
	</body>
</html>
