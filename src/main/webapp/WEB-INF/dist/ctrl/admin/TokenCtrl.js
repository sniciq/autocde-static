angular.module("myApp").controller("TokenCtrl",["$scope","$rootScope","$http","$mdDialog","$location","$anchorScroll",function(e,t,o,s,n,c){e.selectedItems={},e.isLoading=!1,e.search=function(){e.isLoading=!0,c("content"),o.post(ctx+"/admin/TokenCtrl/search",e.searchForm).success(function(t){e.dataList=t,e.isLoading=!1})},e.del=function(){if(1!=Object.keys(e.selectedItems).length)return void e.$root.$broadcast("notify",{type:"error",title:"错误",info:"请选中一个项目后再执行该操作！",timeOut:2e3});var t=Object.keys(e.selectedItems)[0],n=e.selectedItems[t],c=s.confirm().title("确认").textContent("确认删除: "+n.token+" ?").ariaLabel("确认").ok("确认").cancel("取消");s.show(c).then(function(){e.promise=o.post(ctx+"/admin/TokenCtrl/delete?sessionId="+n.authSessionId).success(function(t){"success"==t.result?(e.selectedItems={},e.$root.$broadcast("notify",{type:"success",title:"提示",info:"删除成功",timeOut:2e3}),e.search()):e.$root.$broadcast("notify",{type:"error",title:"错误",info:t.info,timeOut:2e3})})})},e.search()}]);