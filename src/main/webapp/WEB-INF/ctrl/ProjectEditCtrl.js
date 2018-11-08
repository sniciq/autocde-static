angular.module('myApp').controller('ProjectEditCtrl', function($rootScope, $scope, $location, $routeParams, $http, $mdDialog, MenuService) {
	$scope.looklikes = [
		 {id:4,name:'ExtJS 6',thum:ctx+'/resources/images/extjs6_thum.png', large:ctx+'/resources/images/extjs6_large.png'},
	     {id:3,name:'material',thum:ctx+'/resources/images/material_thum.png', large:ctx+'/resources/images/material_large.png'},
	     {id:2,name:'bootstrap', thum:ctx+'/resources/images/bootstrap_thum2.png', large:ctx+'/resources/images/bootstrap_large_2.png'},
	     {id:1,name:'ExtJS 3',thum:ctx+'/resources/images/extjs_thum.png', large:ctx+'/resources/images/extjs_large.png'}
	];
	
	$scope.getLooklikeStyle = function(item) {
		if($scope.project && item.id == $scope.project.lookLike) {
			return {"background-color": "rgb(234, 229, 44)"}
		}
	}
	$scope.showLargeImg = function(item) {
		var url = item.large;
		$mdDialog.show({
			template: '<md-dialog><md-toolbar><div class="md-toolbar-tools"><h2>样式查看</h2><span flex></span><md-button class="md-icon-button" ng-click="cancel()"><i class="material-icons">close</i></md-button></div></md-toolbar><md-dialog-content><img width="100%" height="100%" src="'+url+'"></md-dialog-content></md-dialog>',
			fullscreen: true,
			clickOutsideToClose:true,
			controller: function($scope, $mdDialog) {
				$scope.cancel = function() {
					$mdDialog.cancel();
				}
			}
		});
	}
	
	$scope.save = function() {
		$scope.promise = $http.post(ctx+'/basic/project/save', $scope.project).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'保存成功',timeOut:2000});
				$location.path('/home').search({});
				MenuService.reLoad();
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
	$scope.cancel = function() {
		$location.path('/home').search({});
	}
	
	if($routeParams.id) {//编辑
		myApp.navNames['/project_edit']='修改项目';
		$scope.promise = $http.post(ctx + '/basic/project/getInfo', {id:$routeParams.id}).success(function(data){
			$scope.project = data.data;
		});
	}
	else {//新建
		$scope.project = {lookLike:2,baseAuth:1};
	}
});