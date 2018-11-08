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
		
		<link rel="stylesheet" href="${ctx}/resources/js/angular/angular-material/angular-material.min.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/app.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/directive/angular-busy/angular-busy.css?v=${sysVersion}"/>
		
		<script src="${ctx}/resources/js/angular/angular.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-aria.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-route.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-cookies.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-messages.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-material/angular-material.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/directive/angular-busy/angular-busy.js?v=${sysVersion}"></script>
		<script src="${ctx}/directive/commonfilter.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/actheme.js?v=${sysVersion}"></script>
		
		<style type="text/css">
			html {
				background: #214C6F;
			}
			body {
				background: transparent;
			}
			h1,h2,h3 {
				font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-weight: normal;
				letter-spacing: -1px;
			}
		</style>
		
		<script type="text/javascript">
			var myApp = angular.module('myApp', ['cgBusy', 'ngMaterial', 'ac.util.commonfilter']);
			myApp.getCookie = function(name) {
				var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))  {
					return unescape(arr[2]);
				}
				else {
					return null;
				}
			}

			myApp.config(function($mdThemingProvider) {
				var utheme = myApp.getCookie('utheme');
				if(utheme && utheme != 'default') {
					$mdThemingProvider.theme('default').primaryPalette(utheme);
				}
				else {
					$mdThemingProvider.definePalette('amazingPaletteName', acThemePrimaryPalette);
					$mdThemingProvider.definePalette('amazingAccentPaletteName', acThemeAccentPalette);
					$mdThemingProvider.theme('default').primaryPalette('amazingPaletteName').accentPalette('amazingAccentPaletteName');
				}
			});
			myApp.controller('LoginCtrl', function($rootScope, $scope, $http, $location, $mdDialog) {
				$scope.doLogin = function(ev) {
					window.location.href = "material";
					/* $scope.promise = $http.post('${ctx}/sys/login', $scope.loginForm).success(function(data){
						if(data.result == "success") {
							window.location.href = "${ctx}/";
						}
						else {
							$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认').targetEvent(ev));
						}
					}); */
				}
			});
		</script>
	</head>
	<body ng-controller="LoginCtrl" layout="row" ng-cloak>
		<div role="main" flex>
			<md-toolbar class="common-header-toole-bar">
		      <div class="md-toolbar-tools">
		      	<div flex-offset-gt-xs="10"></div>
		        <span style="cursor: pointer;" ng-click="toHome()">{{'${projectName}' | xsTxtLimit: 8}}</span>
		        <span flex></span>
		      </div>
		    </md-toolbar>
		    <md-content layout="row" class="layout-padding" style="background-color: transparent;">
		    	<div layout-fill layout="column" layout-wrap flex-xs="90" flex-gt-xs="60" flex-gt-sm="40" flex-offset-xs="5" flex-offset-gt-xs="20" flex-offset-gt-sm="30" style="color: #FFF;">
		    		<h1>登录</h1>
			    	<div layout-padding class="common-div-border-shadow" style="background-color: #f5f5f5">
						<form role="form" novalidate name="myForm">
						<div cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}">
							<md-input-container md-no-float class="md-block">
								<md-icon class="material-icons">email</md-icon>
								<input ng-model="loginForm.email" name="email" type="email" placeholder="注册邮箱" ng-required="true">
								<div class="hint" ng-if="myForm.email.$dirty && myForm.email.$invalid">
									<span ng-show="myForm.email.$error.required">邮箱地址必填</span>
									<span ng-show="myForm.email.$error.email">邮箱格式不正确</span>
								</div>
						    </md-input-container>
						    <md-input-container md-no-float class="md-block">
								<md-icon class="material-icons">lock</md-icon>
								<input ng-model="loginForm.psw" name="psw" type="password" placeholder="登录密码" ng-required="true">
								<div class="hint" ng-if="myForm.psw.$dirty && myForm.psw.$error">
									<span ng-show="myForm.psw.$error.required">密码必填</span>
								</div>
						    </md-input-container>
							<div flex layout="row" layout-align="center center">
								<md-button flex type="submit" class="md-raised md-accent" ng-click="doLogin($event);">登录</md-button>
							</div>
						</div>
						</form>
					</div>
				</div>
		    </md-content>
		</div>
	</body>
</html>