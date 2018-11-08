<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<title>${projectName}</title>
		<link rel="shortcut icon" href="${ctx}/resources/images/ac.ico"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="title" content="${projectName}"/>
	    <meta name="application-name" content="${projectName}" />
	    
	    <link rel="stylesheet" type="text/css" href="${ctx}/resources/extjs/resources/css/ext-all-notheme.css"/>
	    <%-- <link rel="stylesheet" type="text/css" href="${ctx}/preview/getGenFile?tplPath=template/ExtJS/restpls/resources/&path=css/app.css&type=resource&nodeId=1&projectId=1"/> --%>
	    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/extPreview.css"/>
	    <link rel="stylesheet" type="text/css" title="blue" href="${ctx}/resources/extjs/resources/css/xtheme-blue.css"/>
	    <link rel="stylesheet" type="text/css" title="gray" href="${ctx}/resources/extjs/resources/css/xtheme-gray.css"/>
	    
	    <style type="text/css">
		    .x-selectable, .x-selectable * {  
		        -moz-user-select: text!important;  
		        -khtml-user-select: text!important;  
		        -webkit-user-select: text!important;
		    }  
		    
			div.panel_header_icon_title_left {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    width: 22px;
			    padding-right: 6px;
			}
			div.panel_header_main {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    line-height: 22px;
			    margin: auto;
			}
			
			div.panel_header_extra {
			    text-align: left;
			    float: right;
			    margin-right: 10px;
			}
			
			div.panel_header_icon1 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			div.panel_header_icon2 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			.userInfo {
				height: 35px;margin-top: 0px;float: right;margin-right: 10px;text-align: right;
				font-weight: bold; font-size: 14px; line-height: 35px;
			}
			.userInfo a{color: #f60;}
		</style>
	    
	    <script type="text/javascript">
			var globalCtx = '${ctx}';
		</script>
		
	    <script type="text/javascript" src="${ctx}/resources/extjs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/ext-all.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/src/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/resources/extjs/examples/ux/DataViewTransition.js"></script>
		<script type="text/javascript">
			Ext.onReady(function() {
				var loginForm = new Ext.form.FormPanel({
					frame: false,
					height: 105,
					bodyStyle : 'padding-top:8px',
					labelAlign: 'right',
					labelWidth: 80,
					labelPad : 0,
			        border : false,
					items: [
						 { xtype: 'textfield', name: 'username',allowBlank: false, fieldLabel: '用户名', allowBlank : false, anchor : '95%'},
						 { xtype: 'textfield',  name: 'password', inputType:'password', allowBlank: false, fieldLabel: '密&nbsp;&nbsp;&nbsp;码', allowBlank : false, anchor : '95%'}
					],
					buttons: [
						{
							text: '登录',
							id: 'loginBtn',
							iconCls: 'login',
							width: 70,
							handler: doLogin
						},
						{
							text: '重置',
							iconCls: 'reset',
							handler: function() {
								loginForm.getForm().reset();
							}
						}
					],
					keys:[
						{
							key: [13],
							fn: doLogin	
						}
					]
				});
				
				function doLogin() {
					window.location.href="extjs";
				}
				
				win = new Ext.Window({
					title:'用户登录',
	                applyTo:'center-div',
	                layout:'fit',
	                width: 350,
					height: 180,
					bodyStyle : 'background-color: white',
	                border : true,
					closable : false,
	                resizable : true,
	                closeAction:'hide',
	                plain: true,
	                layout : {
	                    type : 'vbox',
	                    align : 'stretch'
	                },
	                items: [
						{
						    xtype : 'panel',
						    border : false,
						    bodyStyle : 'padding-left:30px',
						    html : '<span style="font-size:25px;">${projectName}</span>',
						    height : 40
						},
	                    loginForm
	                ]
				});
				win.show();
			});
		</script>
	</head>
	<body>
		<div id="center-div"></div>
	</body>
</html>