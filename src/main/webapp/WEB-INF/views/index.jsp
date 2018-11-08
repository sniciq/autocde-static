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
			h1,h2,h3,h4 {
				font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-weight: normal;
				letter-spacing: -1px;
			}
			.common-header-front-panel {
				color: #FFF;
				background: #214C6F url('${ctx}/resources/images/octicons-bg.png') center repeat;
			}
		</style>


		<script type="text/javascript">
			var myApp = angular.module('myApp', ['ngMessages','ngMaterial','ac.util.commonfilter', 'cgBusy']);
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

			myApp.controller('SignUpCtrl', function($rootScope, $scope, $http, $location,$mdDialog) {
				$scope.slides = [
	                {title: '系统主页',text:'人性化的系统配置', image:'${ctx}/resources/images/carousel/home.png'},
	                {title: '预览系统',text:'Angular + Bootstrap', image:'${ctx}/resources/images/carousel/preview_bootstrap.png'},
	                {title: '预览系统',text:'ExtJS', image:'${ctx}/resources/images/carousel/preview_extjs.png'},
	                {title: '代码查看',text:'实时代码查看', image:'${ctx}/resources/images/carousel/code_preview.png'}
				];

				$scope.doSignUp = function() {
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
							$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认'));
						}
					});
				}

				$scope.toSignUp = function() {
					window.location.href = "${ctx}/sign_up";
				}
				$scope.toLogin = function() {
					window.location.href = "${ctx}/login";
				}
				$scope.toHome = function() {
					window.location.href='${ctx}/';
				}
				$scope.mailToMe = function() {
					var link = "mailto:autocoding@163.com?subject=AC系统反馈&body=谢谢您的意见";
					window.location.href = link;
				}
			});
		</script>
	</head>

	<body ng-controller="SignUpCtrl" layout="row" ng-cloak>
		<div layout="column" tabIndex="-1" role="main" flex>
			<md-toolbar class="common-header-toole-bar">
				<div class="md-toolbar-tools">
					<div flex-offset-gt-md="10"></div>
					<span style="cursor: pointer;" ng-click="toHome()">{{'AutoCode 代码生成' | xsTxtLimit: 8}}</span>
					<span flex></span>
					<md-button class="md-button md-raised md-accent" aria-label="person_add" ng-click="toSignUp()">
						<md-icon class="material-icons">person_add</md-icon>&nbsp;注册
					</md-button>
					<md-button class="md-button md-raised md-default" aria-label="person" ng-click="toLogin()">
						<md-icon class="material-icons">person</md-icon>&nbsp;登录
					</md-button>
					<div flex-offset-gt-md="10"></div>
				</div>
			</md-toolbar>
			<md-content md-scroll-y layout-wrap style="background-color: transparent;">
				<div class="common-header-front-panel" >
				<div layout="row" layout-padding layout-wrap>
					<div flex-xs="100" flex-gt-xs="55" flex-offset-gt-md="10">
						<h1>AC (Auto Code)</h1>
						<h3>生成Spring MVC、Mybatis后台框架，生成material、bootstrap、angular js、ExtJS等主流前端框架页面。</h3>
						<h3>完美的在线预览功能，能实时预览功能模块。</h3>
						<h3>提供代码在线查看，可直接复制。</h3>
						<h3>代码包下载，基于maven，提供脚本一键安装。</h3>
						<h3>本网站基于Google material design 设计，响应式设计，手机、平板、PC等所有设备均可访问。</h3>
						<h3 layout="row" layout-align="start center">
							<i class="material-icons">email</i><span style="padding-left: 5px;cursor: pointer;" ng-click="mailToMe();">autocoding@163.com</span>
							<i class="fa fa-qq" aria-hidden="true" style="padding-left: 10px;"></i><span style="padding-left: 5px;">69206812</span>
						</h3>
					</div>
					<div flex-xs="100" layout-padding flex-gt-xs class="common-div-border-shadow" style="background-color: #F5F5F5;">
						<div cg-busy="{promise:promise,templateUrl:'',message:'正在提交...',backdrop:true,delay:0,minDuration:0}">
						<form role="form" novalidate name="myForm">
							<md-input-container class="md-block" md-no-float>
	    						<md-icon class="material-icons">person</md-icon>
								<input ng-model="signUpForm.name" name="name" type="text" placeholder="用户名" required>
								<div ng-messages="myForm.name.$error" role="alert" md-auto-hide="false">
						        	<div ng-message="required">该项必填</div>
						        </div>
						    </md-input-container>
						    <md-input-container class="md-block" md-no-float>
								<md-icon class="material-icons">email</md-icon>
								<input ng-model="signUpForm.email" name="email" type="email" placeholder="邮箱地址" required>
								<div ng-messages="myForm.email.$error" role="alert" multiple md-auto-hide="false">
						        	<div ng-message="required">该项必填</div>
						        	<div ng-message="email">邮件格式不正确</div>
						        </div>
						    </md-input-container>
						    <md-input-container class="md-block" md-no-float>
								<md-icon class="material-icons">lock</md-icon>
								<input ng-model="signUpForm.password" name="password" type="password" placeholder="登录密码" ng-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,}$/" required>
								<div ng-messages="myForm.password.$error" role="alert" multiple md-auto-hide="false">
						        	<div ng-message="required">该项必填</div>
						        	<div ng-message="pattern">密码要求：长度必须超过6位、包含大写字母、小写字母和数字</div>
						        </div>
						    </md-input-container>
						    <div layout="row" layout-align="center center">
						    	<md-button flex type="submit" class="md-raised md-accent" ng-disabled="myForm.$invalid" ng-click="doSignUp();">注册为会员</md-button>
						    </div>
						    <md-content style="background-color: transparent;">快速注册时请注意记住密码，如忘记密码，请在登录页面通过找回密码功能找回。</md-content>
						</form>
						</div>
					</div>
					<div hide-xs flex-gt-md="10"></div>
				</div>
				</div>

				<div layout="column" layout-padding layout-align="center center" style="background-image: linear-gradient(#D7D7D7, #FFFFFF);color: #333;">
					<h1 style="margin-bottom: 0px;">谁应该使用该系统</h1>
					<h2 style="margin-top: 5px;">程序员、产品设计、初学者（Java、Javascript、SpringMVC、Mybatis、ExtJS、Angular js等）</h2>
				</div>
				<div layout="column" layout-padding layout-align="center center">
					<h1 style="margin-bottom: 0px;">解决如下痛点</h1>
					<h2 style="margin-bottom: 0px;">前后台系统框架初始化、原型设计、需求说明、JS框架、繁琐的Mybatis sql文件、繁琐的增删改查等</h2>
					<h2 style="margin-bottom: 0px;">多留点时间给自己和家人！快乐工作、享受生活、追求梦想！</h2>
				</div>
				<div layout="row" layout-padding layout-wrap flex-xs="100" flex-gt-md="80" flex-xs="100" flex-offset-gt-md="10">
					<div flex=50 flex-xs=100 layout="column" layout-align="center center" class="step-msg">
						<div class="circle" layout layout-align="center center">
							<i class="material-icons">edit</i>
						</div>
						<h2>新建项目</h2>
						<p>项目基于maven结构，需要填写groupId、artifactId。<br/>提供Material、Bootstrap、ExtJs三种界面风格。</p>
					</div>
					<div flex=50 flex-xs=100 layout="column" layout-align="center center" class="step-msg">
						<div class="circle" layout layout-align="center center">
							<i class="material-icons">launch</i>
						</div>
						<h2>配置项目</h2>
						<p>新建/导入数据表，即对应的数据库表结构。<br/>新建功能模块，分单表增删改查、多表联合查询两种。</h3>
					</div>
					<div flex=50 flex-xs=100 layout="column" layout-align="center center" class="step-msg">
						<div class="circle" layout layout-align="center center">
							<i class="material-icons">visibility</i>
						</div>
						<h2>在线预览</h2>
						<p>通过预览功能实时在线查看项目配置情况。<br/> 实时调整。</p>
					</div>
					<div flex=50 flex-xs=100 layout="column" layout-align="center center" class="step-msg">
						<div class="circle" layout layout-align="center center">
							<i class="material-icons">code</i>
						</div>
						<h2>在线查看代码</h2>
						<p>强大的在线代码查看功能。<br/> 可直接复制粘贴。</p>
					</div>
					<div flex=50 flex-xs=100 layout="column" layout-align="center center" class="step-msg">
						<div class="circle" layout layout-align="center center">
							<i class="material-icons">file_download</i>
						</div>
						<h2>代码下载</h2>
						<p>下载配置项目的代码，maven格式。<br/>使用导入maven project功能，直接导入到项目中<br/>提供数据库文件及上线部署脚本，一键安装。</p>
					</div>
				</div>
				<div layout layout-align="center center" style="line-height: 45px;background-color: #2d2d2d;color: #D6D1DC;">京ICP备16001626号</div>
			</md-content>
		</div>
	</body>
</html>