angular.module('myApp').controller('AcUserLogCtrl', function($scope, $http,$anchorScroll, $location,$timeout){
	$scope.pagination = {start: 0, limit: 10, sort:'id', dir:'desc', maxSize: 8, currentPage: 1, limitOptions:[10,20,50,100]};
	$scope.searchForm = {extLimit: $scope.pagination};
	$scope.isLoading = false;
	
	$scope.search = function() {
		$scope.isLoading = true;
		$anchorScroll('content');
		$http.post(ctx + '/acuserlog/AcUserLogCtrl/search', $scope.searchForm).success(function(data){
			$scope.dataList = data;
			$scope.isLoading = false;
		});
	};
	$scope.pageChanged = function() {
		$scope.pagination.start = ($scope.pagination.currentPage - 1) * $scope.pagination.limit;
		$scope.search()
		
	};
	
	$scope.clearSearch = function() {
		$scope.searchForm.searchParm = '';
		$scope.search();
	}
	
	$scope.search();
});
