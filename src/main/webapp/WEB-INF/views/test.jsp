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
		<link rel="stylesheet" href="${ctx}/resources/css/fontawesome/css/font-awesome.min.css?v=${sysVersion}">
		<link rel="stylesheet" href="${ctx}/resources/css/bootstrap/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="${ctx}/resources/js/angular/angular-busy/angular-busy.css?v=${sysVersion}"/>
		
		<style type="text/css">
			.pagination_select {vertical-align:middle;overflow:hidden;display:inline-block;*display:inline;*zoom:1;padding:3px 5px 5px 5px;_padding:2px 2px 6px 5px; height:20px;margin:0;background:#fff;border:1px solid #999;border-radius:2px;width: 55px;padding: 0px;}
			.pagination_select select {width:100px;border:none;font-size:14px;color:#555;width: 50px;}
			.pagination_select select option{padding:0 5px 0 3px;line-height:24px;font-size:14px;color:#555;}
		</style>
		
		<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/i18n/angular-locale_zh-cn.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-animate.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-aria.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-route.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-cookies.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-sanitize.min.js?v=${sysVersion}"></script>
		<script src="${ctx}/resources/js/angular/angular-messages.min.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/angular-busy/angular-busy.js?v=${sysVersion}"></script>
		
		<script src="${ctx}/resources/js/angular/ui-bootstrap-tpls-1.2.0.min.js"></script>
		
		<script src="${ctx}/directive/nggrid/nggrid.js?v=${sysVersion}"></script>
		
	    
	    <script type="text/javascript">
	    	var ctx = '${ctx}';
	    	var myApp = angular.module('myApp', 
	    		['ngCookies','ngRoute', 'ngSanitize','ngAnimate','ngMessages',
	    		 'cgBusy', 'ui.bootstrap',
	    	    'ac.util.ngGrid'
	    	    ]
	    	);
	    	myApp.controller('TestCtrl', function($scope) {
	    		$scope.url = ctx + '/acuserlog/AcUserLogCtrl/search';
	    		$scope.load = {};
	    		$scope.$on('on-grid-edit', function(row) {
	    			console.log(row)
	    		});
	    		$scope.$on('on-grid-del', function(row) {
	    			console.log(row)
	    		});
	    		
	    		//$scope.load();
	    		
	    	})
	    </script>
	</head>
	
	<body ng-controller="TestCtrl">
		<grid-screen resource="{{url}}" load="load" limit="20">
			<grid-columns>
				<grid-column title="ID" field="id"></grid-column>
				<grid-column title="用户名" field="name"></grid-column>
				<grid-column title="email" field="email"></grid-column>
				<grid-column title="logDate" field="logDate"></grid-column>
				<grid-column title="logType" field="logType"></grid-column>
				<grid-op-column title="编辑" command="edit" icon-cls="glyphicon glyphicon-pencil"></grid-op-column>
				<grid-op-column title="删除" command="del" icon-cls="glyphicon glyphicon-trash"></grid-op-column>
			</grid-columns>
			<grid></grid>
		</grid-screen>
		
		<grid-screen resource="{{url}}" load="load" limit="20">
			<grid-columns>
				<grid-column title="ID" field="id"></grid-column>
				<grid-column title="用户名" field="name"></grid-column>
				<grid-column title="email" field="email"></grid-column>
				<grid-column title="logDate" field="logDate"></grid-column>
				<grid-column title="logType" field="logType"></grid-column>
				<grid-op-column title="编辑" command="edit" icon-cls="glyphicon glyphicon-pencil"></grid-op-column>
				<grid-op-column title="删除" command="del" icon-cls="glyphicon glyphicon-trash"></grid-op-column>
			</grid-columns>
			<grid></grid>
		</grid-screen>
	</body>
</html>
