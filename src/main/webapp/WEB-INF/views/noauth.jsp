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
		<%@include file="commonhead_md.jsp" %>
		<style type="text/css">
			html {
				background: #214C6F url('${ctx}/resources/images/octicons-bg.png') center repeat;
			}
			body {
				background: transparent;
			}
			h1,h2,h3 {
				font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-weight: normal;
				letter-spacing: -1px;
				color:#FFF;
			}
		</style>
		<script type="text/javascript">
			var myApp = angular.module('myApp', ['cgBusy', 'ngMaterial', 'ac.util.commonfilter']);
			myApp.config(function($mdThemingProvider) {
				$mdThemingProvider.definePalette('amazingPaletteName', acThemePrimaryPalette);
				$mdThemingProvider.definePalette('amazingAccentPaletteName', acThemeAccentPalette);
				$mdThemingProvider.theme('default').primaryPalette('amazingPaletteName').accentPalette('amazingAccentPaletteName');
			});
			
			myApp.controller('MyCtrl', function($rootScope, $scope){
				$scope.toSignUp = function() {
					window.location.href = "${ctx}/sign_up";
				}
				$scope.toLogin = function() {
					window.location.href = "${ctx}/login";
				}
				$scope.toHome = function() {
					window.location.href='${ctx}/';
				}
			});
		</script>
	</head>
	
	<body ng-controller="MyCtrl" layout="row">
		<div role="main" flex>
			<md-toolbar class="common-header-toole-bar">
				<div class="md-toolbar-tools">
					<div flex-offset-gt-xs="10"></div>
		        	<span style="cursor: pointer;" ng-click="toHome()">{{'AutoCode 代码生成' | xsTxtLimit: 8}}</span>
					<span flex></span>
			        <md-button class="md-button md-raised md-accent" aria-label="person_add" ng-click="toSignUp()">
						<md-icon class="material-icons">person_add</md-icon>&nbsp;注册
					</md-button>
					<md-button class="md-button md-raised md-default" aria-label="person" ng-click="toLogin()">
						<md-icon class="material-icons">person</md-icon>&nbsp;登录
					</md-button>
					<div flex-offset-gt-xs="10"></div>
				</div>
			</md-toolbar>
			<md-content layout="row" layout-padding layout-wrap style="background-color: transparent;">
				<div flex-xs="80" flex-gt-xs="60" flex-gt-sm="50" flex-offset-xs="10" flex-offset-gt-xs="20" flex-offset-gt-sm="25">
					<h2>对不起，无操作权限，请重新登录！</h2>
				</div>
			</md-content>
		</div>
	</body>
</html>