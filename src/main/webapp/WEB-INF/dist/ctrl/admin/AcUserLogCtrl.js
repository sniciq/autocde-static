angular.module("myApp").controller("AcUserLogCtrl",["$scope","$http","$anchorScroll","$location","$timeout",function(a,t,i,n,r){a.pagination={start:0,limit:10,sort:"id",dir:"desc",maxSize:8,currentPage:1,limitOptions:[10,20,50,100]},a.searchForm={extLimit:a.pagination},a.isLoading=!1,a.search=function(){a.isLoading=!0,i("content"),t.post(ctx+"/acuserlog/AcUserLogCtrl/search",a.searchForm).success(function(t){a.dataList=t,a.isLoading=!1})},a.pageChanged=function(){a.pagination.start=(a.pagination.currentPage-1)*a.pagination.limit,a.search()},a.clearSearch=function(){a.searchForm.searchParm="",a.search()},a.search()}]);