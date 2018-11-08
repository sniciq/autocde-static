angular.module('myApp').controller('ChangePwdCtrl', function($rootScope, $scope, $location, $routeParams, $mdDialog, $http) {
	$scope.doOK = function(ev) {
		$scope.promise = $http.post(ctx+'/setting/changePwd', $scope.rstForm).success(function(data){
			if(data.result == "success") {
				var al = $mdDialog.alert().clickOutsideToClose(true).title('成功').textContent("密码修改成功，请重新登录！").ok('确认').targetEvent(ev);
				$mdDialog.show(al).then(function() {
					window.location.href = ctx+"/";
				});
			}
			else {
				$mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('错误').textContent(data.info).ok('确认').targetEvent(ev));
			}
		});
	}
});