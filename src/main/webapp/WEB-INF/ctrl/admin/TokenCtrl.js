angular.module('myApp').controller('TokenCtrl', function($scope, $rootScope, $http, $mdDialog,$location,$anchorScroll){
	$scope.selectedItems = {};
	$scope.isLoading = false;
	
	$scope.search = function() {
		$scope.isLoading = true;
		$anchorScroll('content');
		$http.post(ctx + '/admin/TokenCtrl/search', $scope.searchForm).success(function(data){
			$scope.dataList = data;
			$scope.isLoading = false;
		});
	};
	
	$scope.del = function() {
		if(Object.keys($scope.selectedItems).length != 1) {
			$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:'请选中一个项目后再执行该操作！',timeOut:2000});
			return;
		}
		
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		
		var confirm = $mdDialog.confirm().title('确认').textContent('确认删除: ' + item.token + ' ?').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx + '/admin/TokenCtrl/delete?sessionId='+item.authSessionId).success(function(data){
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