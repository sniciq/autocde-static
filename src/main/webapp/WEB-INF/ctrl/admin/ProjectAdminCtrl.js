angular.module('myApp').controller('ProjectAdminCtrl', function($scope, $http, $location,$mdDialog,$anchorScroll){
	$scope.pagination = {start: 0, limit: 10, sort:'id', dir:'desc', maxSize: 8, currentPage: 1, limitOptions:[10,20,50,100]};
	$scope.searchForm = {extLimit: $scope.pagination};
	$scope.isLoading = false;
	$scope.selectedItems = {};
	
	$scope.search = function() {
		$scope.isLoading = true;
		$anchorScroll('content');
		$http.post(ctx + '/admin/ProjectAdminCtrl/search', $scope.searchForm).success(function(data){
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
	
	$scope.openProject = function() {
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		$location.path('/project').search({id:item.idCode});
	}
	$scope.editProject = function() {
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		$location.path('/project_edit').search({id:item.idCode});
	}
	$scope.previewProjectCode = function() {
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		$location.path('/project_code').search({id:item.idCode});
	}
	$scope.previewProject = function() {
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		window.open(ctx + '/preview?id=' + item.idCode);
	}
	$scope.downloadProject = function() {
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		window.open(ctx + '/dowload?id=' + item.idCode);
	}
	
	$scope.deleteProject = function(item) {
		if(Object.keys($scope.selectedItems).length != 1) {
			$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:'请选中一个项目后再执行该操作！',timeOut:2000});
			return;
		}
		
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		var confirm = $mdDialog.confirm().title('确认').textContent('确认删除项目: ' + item.name + ' ?').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx+'/basic/project/delete', {id:item.idCode}).success(function(data){
				if(data.result == "success") {
					$scope.selectedItems = {};
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					$scope.search();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			})
		});
	}
	
	$scope.search();
});