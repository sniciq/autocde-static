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
			}
		</style>
		<script type="text/javascript">
			var myApp = angular.module('myApp', ['cgBusy', 'ngMaterial','ac.util.commonfilter']);
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
				$scope.toSignUp = function() {
					window.location.href = "${ctx}/sign_up";
				}
				$scope.toLogin = function() {
					window.location.href = "${ctx}/login";
				}
				$scope.toHome = function() {
					window.location.href='${ctx}/';
				}

				$scope.doLogin = function(ev) {
					$scope.promise = $http.post('${ctx}/sys/login', $scope.loginForm).success(function(data){
						if(data.result == "success") {
							window.location.href = "${ctx}/";
						}
						else {
							$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认').targetEvent(ev));
						}
					});
				}
			});
		</script>
	</head>
	<body ng-controller="LoginCtrl" layout="row" ng-cloak>
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
								<p style="text-align: end;"><a style="margin-left: 30px;padding-right: 15px;" href="${ctx}/psw_forget">找回密码</a></p>
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