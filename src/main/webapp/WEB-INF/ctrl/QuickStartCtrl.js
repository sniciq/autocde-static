angular.module('myApp').controller('QuickStartCtrl', function($rootScope, $scope, $location, $routeParams, $http, $anchorScroll) {
	prettyPrint();
	
	$scope.ngScrollTo = function(id) {
		$anchorScroll.yOffset = 50;
		$anchorScroll(id);
	}
	
});