<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

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
		<style type="text/css">
			body {
				background-image: url("${ctx}/resources/login_bootstrap/img/backgrounds/sc2.jpg");
				background-size: cover;
			}
			.top-content .container{
				-webkit-transition: all linear 0.6s;
				transition: all linear 0.6s;
			    margin-top: 30px;
			    opacity: 1;
			}
			
			.top-content .container.ng-hide-add {
				display: none !important; 
			}
			.top-content .container.ng-hide{
			    margin-top: -500px;
			    opacity: 0;
			}
		</style>

		<link rel="stylesheet" href="${ctx}/resources/css/MaterialIcons/material-icons.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/fontawesome/css/font-awesome.min.css?v=${sysVersion}">
		
		<link rel="stylesheet" href="${ctx}/resources/login_bootstrap/css/form-elements.css">
        <link rel="stylesheet" href="${ctx}/resources/login_bootstrap/css/style.css">
        
		<link rel="stylesheet" href="${ctx}/resources/css/bootstrap/css/bootstrap.min.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/js/angular/toaster/toaster.css?v=${sysVersion}"/>
		<link rel="stylesheet" href="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-busy/angular-busy.css&type=resource&nodeId=1&projectId=1">
	</head>
	<body ng-controller="LoginCtrl" ng-cloak>
        <div class="top-content" >
            <div class="inner-bg">
                <div class="container" ng-show="showLogin">
                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text">
                            <h1><strong>${projectName}</strong></h1>
                            <div class="description">
                            	<p>登录${projectName}!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box" cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3 style="font-weight: 400;">登录</h3>
                            		<p>输入用户名和密码:</p>
                        		</div>
                        		<div class="form-top-right">
                        			<i class="fa fa-lock"></i>
                        		</div>
                            </div>
                            <div class="form-bottom">
			                    <form class="form-horizontal login-form" role="form" novalidate name="myForm">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">Username</label>
			                        	<input type="text" required ng-model="loginForm.username" name="form-username" placeholder="用户名..." class="form-username form-control" id="form-username">
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">Password</label>
			                        	<input type="password" required ng-model="loginForm.password" name="form-password" placeholder="密码..." class="form-password form-control" id="form-password">
			                        </div>
			                        <button type="button" class="btn" ng-disabled="myForm.$invalid" ng-click="login()">登录</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <toaster-container toaster-options="{'time-out': 3000, 'close-button':true, 'position-class': 'toast-bottom-right'}"></toaster-container>
        
        <script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
        <script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/toaster/toaster.js?v=${sysVersion}"></script>
		<script src="${ctx}/preview/getGenFile?tplPath=template/bootstrap/&path=restpls/resources/js/angular/angular-busy/angular-busy.js&type=resource&nodeId=1&projectId=1"></script>
		
        <script type="text/javascript">
			var myApp = angular.module('myApp', ['toaster', 'cgBusy','ngAnimate']);
			
			myApp.controller('LoginCtrl', function($scope, $http, $location, $timeout, toaster) {
				$scope.loginForm = {username: 'test', password: 'test'};
				$scope.login = function() {
					window.location.href="bootstrap";
					/* $scope.promise = $http.post('${ctx}/sys/login', $scope.loginForm).success(function(data){
						if(data.result == "success") {
							window.location.href = "${ctx}/";
						}
						else {
							toaster.pop('error', '错误提示', data.info, 2000);
						}
					}); */
				}
				
				$timeout(function() {
					$scope.showLogin = true;
				}, 10)
				
				//$scope.showLogin = true;
			});
		</script>
	</body>
</html>