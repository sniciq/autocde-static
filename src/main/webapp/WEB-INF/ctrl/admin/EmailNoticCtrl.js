angular.module('myApp').controller('EmailNoticListCtrl', function($rootScope,$scope, $mdDialog, $http, $location,$anchorScroll) {
	$scope.pagination = {start: 0, limit: 10, sort:'id', dir:'desc', maxSize: 8, currentPage: 1, limitOptions:[10,20,50,100]};
	$scope.searchForm = {extLimit: $scope.pagination};
	
	$scope.isLoading = false;
	$scope.selectedItems = {};
	$scope.search = function() {
		$scope.isLoading = true;
		$anchorScroll('content');
		$http.post(ctx + '/admin/EmailNoticCtrl/search', $scope.searchForm).success(function(data){
			$scope.dataList = data;
			$scope.isLoading = false;
		});
	};
	$scope.pageChanged = function() {
		$scope.pagination.start = ($scope.pagination.currentPage - 1) * $scope.pagination.limit;
		$scope.search();
	};
	
	$scope.clearSearch = function() {
		$scope.searchForm.searchParm = '';
		$scope.search();
	}
	
	$scope.showSend = function() {
		if(Object.keys($scope.selectedItems).length != 1) {
			return false;
		}
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		return item.status == 0;
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
			templateUrl: 'templates/admin/EmailNoticEditTpl.html?v=' + sysVersion,
			controller: 'EmailNoticEditCtrl',
			clickOutsideToClose:true,
			fullscreen: $rootScope.customFullscreen,
			resolve : {
				noticId : function(){
					return id;
				}
			}
		}).then(function (data) {
			if(data == 'success') {
				$scope.search();
				$scope.selectedItems = {};
			}
		});
	}
	
	$scope.send = function(item) {
		if(Object.keys($scope.selectedItems).length != 1) {
			$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:'请选中一个项目后再执行该操作！',timeOut:2000});
			return;
		}
		
		var id = Object.keys($scope.selectedItems)[0];
		var item = $scope.selectedItems[id];
		var confirm = $mdDialog.confirm().title('确认').textContent('确认发布: ' + item.title + ' ?').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx + '/admin/EmailNoticCtrl/sendEmail', {id:item.id}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'邮件公告发布成功！',timeOut:2000});
					$scope.selectedItems = {};
					$scope.search();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			});
		});
	}
	$scope.search();
});

angular.module('myApp').controller('EmailNoticEditCtrl', function($scope, $rootScope, $http, $mdDialog, noticId){
	$scope.tinymceOptions = {
	    onChange: function(e) {
	    },
	    inline: false,
//	    imageupload_url:  ctx+'/help/imgUpload.sdo',
//	    imageNavUrl: ctx + '/help/imgList.sdo',
//	    plugins : 'advlist autolink link image lists charmap print preview imageupload',
//	    toolbar1: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
//	    toolbar2: "| link unlink anchor | image media imageupload | forecolor backcolor  | print preview code ",
	    skin: 'lightgray',
	    theme : 'modern'
	};
	
	$scope.updateHtml = function() {}
	$scope.showRcvSelector = false;
	$scope.showCustomerSelector = function() {
		$scope.rcvSearch();
		$scope.selectedUsers = angular.copy($scope.inputForm.rcvList);
		$scope.showRcvSelector = true;
	}
	
	$scope.selectedUsers={};
	$scope.rcvPagination = {start: 0, limit: 10, maxSize: 8, currentPage: 1, limitOptions:[10,20,50,100]};
	$scope.searchForm = {extLimit: $scope.rcvPagination};
	$scope.rcvSearch = function() {
		$scope.promise = $http.post(ctx + '/admin/AcUserCtrl/search', $scope.searchForm).success(function(data){
			$scope.rcvDataList = data;
			var allChecked = true;
			for(var i = 0; i < $scope.rcvDataList.data.length; i++) {
				var item = $scope.rcvDataList.data[i];
				if($scope.selectedUsers[item.id]) {
					item.checked = true;
				}
				else {
					allChecked = false;
				}
			}
			$scope.allSelect = allChecked;
		});
	};
	$scope.rcvPageChanged = function() {
		$scope.rcvPagination.start = ($scope.rcvPagination.currentPage - 1) * $scope.rcvPagination.limit;
		$scope.rcvSearch();
	};
	$scope.toggleSelectAll = function () {
		for(var i = 0; i < $scope.rcvDataList.data.length; i++) {
			var item = $scope.rcvDataList.data[i];
			item.checked = $scope.allSelect;
			delete $scope.selectedUsers[item.id];
			
			if($scope.allSelect == true) {
				$scope.selectedUsers[item.id] = {userId:item.id,name:item.name,email:item.email};
			}
		}
	}
	
	$scope.toggleSelectUser = function(item) {
		if(!item.checked) {
			delete $scope.selectedUsers[item.id];
			$scope.allSelect = false;
		}
		else {
			$scope.selectedUsers[item.id] = {userId:item.id,name:item.name,email:item.email};
		}
	}
	$scope.selectRcvOK = function() {
		$scope.inputForm.rcvList = angular.copy($scope.selectedUsers);
		$scope.showRcvSelector = false;
	}
	$scope.selectRcvCancel = function() {
		$scope.showRcvSelector = false;
	}

	$scope.removeRcv = function(id) {
		delete $scope.inputForm.rcvList[id];
	}
	$scope.clearRcvs = function() {
		$scope.inputForm.rcvList = {};
	}
	
	$scope.save = function() {
		$scope.promise = $http.post(ctx + '/admin/EmailNoticCtrl/save',$scope.inputForm).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'操作成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				$mdDialog.hide('success');
			}
		});
		
	}
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	
	if(noticId != undefined) {
		$scope.promise = $http.post(ctx + '/admin/EmailNoticCtrl/getDetailInfo',{id:noticId}).success(function(data){
			$scope.inputForm = {id:data.data.id,title:data.data.title,content:data.data.content,rcvList:data.data.rcvList}
			$scope.noticMailStatus = data.data.status;
			
			if($scope.noticMailStatus != 0 && Object.keys($scope.inputForm.rcvList).length == 0) {
				$scope.showAll = true;
			}
		});
	}
	else {
		$scope.inputForm = {rcvList:{}};
		$scope.noticMailStatus = 0;
	}
});
