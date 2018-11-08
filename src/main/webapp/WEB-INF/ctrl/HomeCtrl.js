angular.module('myApp').controller('HomeCtrl', function($rootScope, $scope, $location, $mdToast,$http, $mdDialog, MenuService) {
	myApp.navNames['/home']='AutoCode 代码生成';
	
	$scope.demoProjects = [
	    {id:2,idCode:'ypOpJMTY=', name:'Bootstrap By Angular', recommend:5, lastUpdate: true, remark:'BootStrap By Angular', style: {'color': '#FFF','background-color': '#0288d1'}},
		{id:4,idCode:'ywRtwMjQ=', name:'ExtJS_6', recommend:4, remark:'ExtJS 6 示例', style: {'color': '#FFF','background-color': '#106cc1', 'background': '-webkit-linear-gradient(top, #106cc1, #4490d6)'}},
		{id:3, idCode:'yhWqrMjA=',name:'ExtJS_3', recommend:3, remark:'ExtJS 3 示例', style: {'background-color': '#dfe8f6'}},
		{id:1,idCode:'yinUhMTI=', name:'Material Design', recommend:2, remark:'Material By Angular', style: {'color': '#FFF','background-color': '#106cc1'}},
		{name:'Bootstrap By Jquery', remark:'敬请期待', style: {'color': '#FFF','background-color': '#0099cc'}}
	];
	
	$scope.range = function(n) {
		var arr = [];
		for(var i = 0; i < n; i++) {
			arr.push(i);
		}
        return arr;
    };
	
	$scope.newProject = function() {
		$location.path('/project_edit').search({});
	}
	$scope.openProject = function(idCode) {
		$location.path('/project').search({id:idCode});
	}
	$scope.editProject = function(idCode) {
		$location.path('/project_edit').search({id:idCode});
	}
	$scope.previewProjectCode = function(idCode) {
		$location.path('/project_code').search({id:idCode});
	}
	$scope.previewProject = function(idCode) {
		window.open(ctx + '/preview?id=' + idCode);
	}
	
	$scope.downloadProject = function(idCode) {
		window.open(ctx + '/dowload?id=' + idCode);
	}
	
	$scope.deleteProject = function(item) {
		var confirm = $mdDialog.confirm()
	        .title('确认')
	        .textContent('确认删除项目: ' + item.name + ' ?')
	        .ariaLabel('确认')
	        .ok('确认')
	        .cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx+'/basic/project/delete', {id:item.idCode}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					$scope.getProjectList();
					MenuService.reLoad();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			})
		});
	}
	$scope.getProjectList = function() {
		$scope.promise = $http.post(ctx + '/basic/project/search', {extLimit:{sort:'id', dir:'DESC', start:0, limit:50}}).success(function(data){
			$scope.projectList = data.data;
		});
	}
	
	$scope.getProjectList();
	
	if($rootScope.userEmail == 'test@qq.com') {
		$mdToast.show(
	      $mdToast.simple()
	        .textContent('测试帐号将在2016-11-01正式停用，请提前注册为正式用户，谢谢!')
	        .position("top left")
	        .hideDelay(5000)
	    );
	}
});