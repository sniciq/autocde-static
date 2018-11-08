<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="sysVersion" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html ng-app="x">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width">

  <title>UI.Layout : holy grail demo</title>

	<link rel="stylesheet" href="${ctx}/resources/css/bootstrap/css/bootstrap.min.css?v=${sysVersion}"/>
	<link rel="stylesheet" href="${ctx}/resources/js/angular/ui-layout/ui-layout.css?v=${sysVersion}"/>
	
	<script src="${ctx}/resources/js/angular/angular.js?v=${sysVersion}"></script>
	<script src="${ctx}/resources/js/angular/ui-layout/ui-layout.js?v=${sysVersion}"></script>
	<style type="text/css">
		.html-back{
		  background : #eee url("http://placehold.it/400x300/eee/666&text=HTML") no-repeat center;
		}
		.css-back{
		  background : #eee url("http://placehold.it/400x300/eee/666&text=CSS") no-repeat center;
		
		}
		.js-back{
		  background : #eee url("http://placehold.it/400x300/eee/666&text=JS") no-repeat center;
		}
		
		.glyphicon-chevron-left,
		.glyphicon-chevron-right,
		.glyphicon-chevron-up,
		.glyphicon-chevron-down{
		  color: #aaa;
		}
	</style>
</head>

<body>

    <div ui-layout  >
      <div ui-layout-container class=" html-back" ></div>
      <div ui-layout-container> 
        <div ui-layout="{flow : 'column'}" >
          <div ui-layout-container class=" html-back" ></div>
          <div ui-layout-container class=" js-back" ></div>
          <div ui-layout-container class=" css-back" ></div>
        </div>
      </div>
      <div ui-layout-container class=" css-back" ></div>
    </div>
    
  <script>
    angular.module('x', ['ui.layout']);
  </script>
</body>

</html>