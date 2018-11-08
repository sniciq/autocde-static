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
		</style>
		
		<script type="text/javascript">
			var myApp = angular.module('myApp', ['ngMaterial', 'cgBusy', 'ac.util.commonfilter']);
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
			
			myApp.controller('LoginCtrl', function($rootScope, $scope, $http, $location, $mdDialog) {
				$scope.rstForm = {code:'${code}', idCode:'${idCode}'};
				
				$scope.toSignUp = function() {
					window.location.href = "${ctx}/sign_up";
				}
				$scope.toLogin = function() {
					window.location.href = "${ctx}/login";
				}
				$scope.toHome = function() {
					window.location.href='${ctx}/';
				}
				
				$scope.doOK = function(ev) {
					$scope.promise = $http.post('${ctx}/sys/rstpwd', $scope.rstForm).success(function(data){
						if(data.result == "success") {
							var al = $mdDialog.alert().clickOutsideToClose(true).title('成功').textContent("密码重置成功！").ok('确认').targetEvent(ev);
							$mdDialog.show(al).then(function() {
								window.location.href = "${ctx}/";
							});
						}
						else {
							$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认').targetEvent(ev));
						}
					});
				}
			});
		</script>
	</head>
	
	<body ng-controller="LoginCtrl" class="layout-row" ng-cloak>
		<div role="main" class="layout-column flex">
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
		    	<div layout-fill layout="column" layout-wrap flex-xs="100" flex-gt-xs="80" flex-offset-gt-xs="10" flex-gt-sm="60" flex-offset-gt-sm="20" style="color: #FFF;">
		    		<h1>重置密码</h1>
		    		<div layout-padding class="common-div-border-shadow" style="background-color: #f5f5f5">
	    			<form role="form" novalidate name="myForm">
					<div cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}">
						<md-input-container class="md-block">
							<md-icon class="material-icons">email</md-icon>
							<input ng-model="rstForm.email" name="email" type="email" placeholder="邮箱地址" required>
							<div class="hint" ng-if="myForm.email.$dirty && myForm.email.$invalid">
								<span ng-show="myForm.email.$error.required">邮箱地址必填</span>
								<span ng-show="myForm.email.$error.email">邮箱格式不正确</span>
							</div>
					    </md-input-container>
					    <md-input-container md-no-float class="md-block">
							<md-icon class="material-icons">lock</md-icon>
							<input ng-model="rstForm.passwordNew" name="passwordNew" type="password" placeholder="登录密码" ng-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,}$/" required>
							<div class="hint" ng-if="myForm.passwordNew.$dirty && myForm.passwordNew.$error">
								<span ng-show="myForm.passwordNew.$error.required">密码必填</span>
								<span ng-show="myForm.passwordNew.$error.pattern">长度必须超过6位，必须包含大写字母、小写字母和数字</span>
							</div>
					    </md-input-container>
					    <md-input-container md-no-float class="md-block">
							<md-icon class="material-icons">lock</md-icon>
							<input ng-model="rstForm.passwordConf" name="passwordConf" type="password" placeholder="确认密码" required compare-to="rstForm.passwordNew">
							<div class="hint" ng-if="myForm.passwordConf.$dirty && myForm.passwordConf.$error">
								<span ng-show="myForm.passwordConf.$error.required">密码必填</span>
								<span ng-show="myForm.passwordConf.$error.compareTo">确认密码不一致</span>
							</div>
					    </md-input-container>
					</md-content>
					<div flex layout="row" layout-align="center center">
						<md-button flex type="submit" class="md-raised md-accent" ng-disabled="myForm.$invalid" ng-click="doOK($event)">重置密码</md-button>
					</div>
					</div>
					</form>
		    		</div>
		    	</div>
		    </md-content>
			
			<!-- <md-content class="layout-padding">
				<div cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}"> 
				<form role="form" novalidate name="myForm">
					<div layout="row" layout-align="center center">
			    		<div class="md-whiteframe-24dp" flex-sm="100" flex-gt-sm="50"  flex-gt-md="50" flex-gt-lg="33">
			    			<md-toolbar class="md-primary">
								<div class="md-toolbar-tools">
									<h2 class="md-flex">修改密码</h2>
								</div>
							</md-toolbar>
							<md-content flex layout-padding>
								<md-input-container class="md-block">
									<md-icon class="material-icons">email</md-icon>
									<input ng-model="rstForm.email" name="email" type="email" placeholder="邮箱地址" required>
									<div ng-show="myForm.email.$dirty && myForm.email.$error">
										<span style="color:red">
											<span ng-show="myForm.email.$error.required">邮箱为必填项</span>
											<span ng-show="myForm.email.$error.email">邮箱格式不正确</span>
										</span>
									</div>
							    </md-input-container>
							    <md-input-container md-no-float class="md-block">
									<md-icon class="material-icons">lock</md-icon>
									<input ng-model="rstForm.passwordNew" name="passwordNew" type="password" placeholder="登录密码" ng-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,}$/" required>
									<div ng-show="myForm.passwordNew.$dirty && myForm.passwordNew.$error">
										<span style="color:red">
											<span ng-show="myForm.passwordNew.$error.required">密码必填</span>
											<span ng-show="myForm.passwordNew.$error.pattern">长度必须超过6位，必须包含大写字母、小写字母和数字</span>
										</span>
									</div>
							    </md-input-container>
							    <md-input-container md-no-float class="md-block">
									<md-icon class="material-icons">lock</md-icon>
									<input ng-model="rstForm.passwordConf" name="passwordConf" type="password" placeholder="确认密码" required compare-to="rstForm.passwordNew">
									<div ng-show="myForm.passwordConf.$dirty && myForm.passwordConf.$error">
										<span style="color:red">
											<span ng-show="myForm.passwordConf.$error.required">密码必填</span>
											<span ng-show="myForm.passwordConf.$error.compareTo">确认密码不一致</span>
										</span>
									</div>
							    </md-input-container>
							</md-content>
							<div flex layout="row" layout-align="center center">
								<md-button flex type="submit" class="md-raised md-primary" ng-disabled="myForm.$invalid" ng-click="doOK($event)">确认</md-button>
							</div>
			    		</div>
			    	</div>
			    </form>
			    </div>
			</md-content> -->
		</div>
	</body>
</html>