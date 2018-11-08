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
			h1,h3 {
				font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-weight: normal;
				letter-spacing: -1px;
			}
			html {
				background: #214C6F url('${ctx}/resources/images/octicons-bg.png') center repeat;
			}
			body {
				background: transparent;
			}
		</style>

		<script type="text/javascript">
			var myApp = angular.module('myApp', ['ngMessages','cgBusy', 'ngMaterial','ac.util.commonfilter']);
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

			myApp.directive("compareTo", [function(){
				return {
					require: "ngModel",
			        scope: {
			            otherModelValue: "=compareTo"
			        },
			        link: function(scope, element, attributes, ngModel) {
			            ngModel.$validators.compareTo = function(modelValue) {
			                return modelValue == scope.otherModelValue;
			            };

			            scope.$watch("otherModelValue", function() {
			                ngModel.$validate();
			            });
			        }
				}
			}]);

			myApp.controller('SignUpCtrl', function($rootScope, $scope, $http, $location, $mdDialog) {
				$scope.doSignUp = function(ev) {
					$scope.promise = $http.post('${ctx}/sys/signUp', $scope.signUpForm).success(function(data){
						if(data.result == "success") {
							if(data.data && data.data.mailErr != '') {
								$mdDialog.show($mdDialog.alert().title('错误').textContent(data.data.mailErr).ok('确认'));
							}
							else {
								window.location.href = "${ctx}/signUpSuccess";
							}
						}
						else {
							$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认').targetEvent(ev));
						}
					});
				}
				$scope.toHome = function() {
					window.location.href='${ctx}/';
				}
				$scope.toLogin = function() {
					window.location.href='${ctx}/login';
				}
			});
		</script>
	</head>

	<body ng-controller="SignUpCtrl" layout="row" ng-cloak>
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
			<md-content layout="row" style="background-color: transparent;">
				<div layout-padding layout="column" layout-wrap flex-xs="100" flex-gt-xs="80" flex-gt-sm="60" flex-offset-gt-xs="10" flex-offset-gt-sm="20" style="color: #FFF;">
					<h1>加入AC平台</h1>
					<h3>特别提示：由于某些原因，可能会无法收到激活邮件，如果没有收到激活邮件，请用注册邮箱发信到autocoding@163.com</h3>
					<form role="form" novalidate name="myForm">
					<div layout-padding cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}" class="common-div-border-shadow" style="background-color: #f5f5f5">
						<md-input-container layout="row" class="md-block">
		  					<md-icon class="material-icons">person</md-icon>
							<input ng-model="signUpForm.name" name="name" type="text" placeholder="用户名" required>
							<div ng-messages="myForm.name.$error" role="alert" md-auto-hide="false">
					        	<div ng-message="required">该项必填</div>
					        </div>
					    </md-input-container>
					    <md-input-container class="md-block">
							<md-icon class="material-icons">email</md-icon>
							<input ng-model="signUpForm.email" name="email" type="email" placeholder="邮箱地址" required>
							<div ng-messages="myForm.email.$error" role="alert" multiple md-auto-hide="false">
					        	<div ng-message="required">该项必填</div>
					        	<div ng-message="email">邮件格式不正确</div>
					        </div>
					    </md-input-container>
					    <md-input-container md-no-float class="md-block">
							<md-icon class="material-icons">lock</md-icon>
							<input ng-model="signUpForm.password" name="password" type="password" placeholder="登录密码" ng-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,}$/" required>
							<div ng-messages="myForm.password.$error" role="alert" multiple md-auto-hide="false">
					        	<div ng-message="required">该项必填</div>
					        	<div ng-message="pattern">密码要求：长度必须超过6位、包含大写字母、小写字母和数字</div>
					        </div>
					    </md-input-container>
					    <md-input-container md-no-float class="md-block">
							<md-icon class="material-icons">lock</md-icon>
							<input ng-model="signUpForm.psw_confirm" name="psw_confirm" type="password" placeholder="确认密码" required compare-to="signUpForm.password">
							<div ng-messages="myForm.psw_confirm.$error" role="alert" multiple md-auto-hide="false">
					        	<div ng-message="required">该项必填</div>
					        	<div ng-message="compareTo">两次密码不一致</div>
					        </div>
					    </md-input-container>
					    <div flex layout="row" layout-align="center center">
		    				<md-button flex type="submit" class="md-raised md-accent" ng-disabled="myForm.$invalid" ng-click="doSignUp($event);">注册</md-button>
		    			</div>
				    </div>
				    </form>
				</div>
			</md-content>
		</div>
	</body>
</html>