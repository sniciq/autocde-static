angular.module('myApp').controller('AcUserCtrl', function($scope, $rootScope, $http, $mdDialog,$location,$anchorScroll){
	$scope.pagination = {start: 0, limit: 10, sort:'id', dir:'desc', maxSize: 8, currentPage: 1, limitOptions:[10,20,50,100]};
	$scope.searchForm = {extLimit: $scope.pagination};
	$scope.isLoading = false;
	$scope.selectedItems = {};
	
	$scope.search = function() {
		$scope.isLoading = true;
		$anchorScroll('content');
		$http.post(ctx + '/admin/AcUserCtrl/search', $scope.searchForm).success(function(data){
			$scope.dataList = data;
			$scope.isLoading = false;
		});
	};
	$scope.pageChanged = function() {
		$scope.pagination.start = ($scope.pagination.currentPage - 1) * $scope.pagination.limit;
		$scope.search();
	};
	
	$scope.clearSearch = function() {
		$scope.searchForm = {extLimit: $scope.pagination};
		$scope.search();
	}
	
	$scope.edit = function() {
		var id;
		if(Object.keys($scope.selectedItems).length == 0) {//新建
		}
		else if(Object.keys($scope.selectedItems).length == 1) {//编辑
			id = Object.keys($scope.selectedItems)[0];
		}
		else {
			$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:'请选中一个项目后再执行该操作！',timeOut:2000});
			return;
		}
		
		$mdDialog.show({
			templateUrl: ctx + '/templates/admin/AcUserEditTpl.html?v=',
			controller: 'AcUserEditCtrl',
			clickOutsideToClose:true,
			fullscreen: $rootScope.customFullscreen,
			resolve: {
				id: function() {return id;}
			}
		}).then(function (data) {
			if(data == 'success') {
				$scope.search();
				$scope.selectedItems = {};
			}
		});
	};
	
	$scope.del = function(item) {
		if(Object.keys($scope.selectedItems).length != 1) {
			$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:'请选中一个项目后再执行该操作！',timeOut:2000});
			return;
		}
		
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		var confirm = $mdDialog.confirm().title('确认').textContent('确认删除: ' + item.name + ' ?').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.get(ctx + '/admin/AcUserCtrl/delete?id='+item.id).success(function(data){
				if(data.result == "success") {
					$scope.selectedItems = {};
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					$scope.search();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			});
		});
	};
	
	$scope.search();
});
myApp.controller('AcUserEditCtrl', function($scope, $http,$mdDialog,id){
	$scope.editForm = {};
	$scope.editForm.id = id;
	if(id && id > 0) {
		$scope.title = '编辑';
		$scope.promise = $http.get(ctx + '/admin/AcUserCtrl/getDetailInfo?id='+id).success(function(data){
			$scope.editForm = data.data;
		});
	}
	else {
		$scope.title = '新增';
	}

	$scope.save = function() {
		$scope.promise = $http.post(ctx + '/admin/AcUserCtrl/save', $scope.editForm).success(function(data){
			if(data.result == 'success') {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'保存成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
});
