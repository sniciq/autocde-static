<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${projectName}--By ExtJS6</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		<link rel="stylesheet" href="${ctx}/resources/extjs6/build/classic/theme-ac-default/resources/theme-ac-default-all.css?v=1.1">
		<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/app.css?v=6.2.0">
		<script src="${ctx}/resources/extjs6/build/ext-all.js?v=6.2.0"></script>
		<script src="${ctx}/resources/extjs6/build/classic/locale/locale-zh_CN.js?v=6.2.0"></script>
		<script type="text/javascript">
			var ctx = '${ctx}';
			Ext.onReady(function(){
				var loginForm = Ext.create('Ext.form.Panel', {
					title: '登录',
					bodyStyle : 'padding-top:8px',
					width: 400,
					height: 230,
					border: false,
					frame: true,
					defaults: {
					    labelAlign: 'right',
					    labelWidth: 80,
					    msgTarget: 'side',
					    xtype: 'textfield',
					    allowBlank : true,
					    anchor : '95%'
					},
					items:[
						{xtype:'component', padding : '10 35', html: '<span style="font-size:25px;">ExtJS 6 示例</span>'},
						{fieldLabel: '用户名',name: 'username'},
						{fieldLabel: '密&nbsp;&nbsp;&nbsp;码', name: 'password', inputType:'password'}
					],
					keyMap:{
						ENTER:doLogin
					},
					buttons: [{
						text: '登录',handler:doLogin
					},{
						text: '重置',handler: function() {loginForm.getForm().reset();}
					}]
				});
				
				function doLogin() {
					Ext.getBody().mask('正在提交，请等待...');
					window.location.href="extjs6";
		    		/* Ext.Ajax.request({
		    		     url: ctx + '/login_action',
		    		     method: 'post',
		    		     params: loginForm.getForm().getValues(),
		    		     success: function(response, opts) {
		    		    	 Ext.getBody().unmask();
		    		         var obj = Ext.decode(response.responseText);
		    		         if(obj.result == 'success') {
		    		        	 loginForm.hide();
		    		        	 window.location.href = '${ctx}/';
		    		         }
		    		         else {
		    		        	 Ext.MessageBox.show({title: '登录错误',msg: '<font color="red">' + obj.info + '</font>',buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.ERROR});
		    		         }
		    		     }
		    		}); */
				}
				
				var viewport = Ext.create('Ext.container.Viewport', {
				    layout: 'center',
				    items: [loginForm]
				 });
			});
		</script>
	</head>
	<body>
	</body>
</html>