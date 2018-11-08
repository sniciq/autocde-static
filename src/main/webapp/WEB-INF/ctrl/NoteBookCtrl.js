angular.module('myApp').controller('NoteBookCtrl', function($rootScope, $cookies,$scope, $location, $window,$routeParams, $http, $anchorScroll, $mdDialog) {
	$scope.searchForm = {pIdCode:$routeParams.pIdCode};
	$scope.notes = [];
	$scope.folderPath = [];
	$scope.folders = [];
	
	var cookieViewType = $cookies.get('ACNoteViewType');
	if(cookieViewType) {
		$scope.viewType = cookieViewType;
		if($scope.viewType == 'view_list') {
			$scope.viewTypeTip = '切换到列表视图';
		}
		else {
			$scope.viewTypeTip = '切换到模块视图';
		}
	}
	else {
		$scope.viewType = 'view_list';//module
		$scope.viewTypeTip = '切换到列表视图';
	}
	
	$scope.toggleView = function() {
		if($scope.viewType == 'view_list') {
			$scope.viewType = 'view_module';
			$scope.viewTypeTip = '切换到模块视图';
		}
		else {
			$scope.viewType = 'view_list';
			$scope.viewTypeTip = '切换到列表视图';
		}
		$cookies.put('ACNoteViewType', $scope.viewType, {expires:new Date(new Date().getTime() + 30*24*60*60*1000)});
	}
	
	$scope.selectItem = function(item, event) {
		$scope.selectedItem = item;
		$window.onclick = function (event) {
			$scope.selectedItem = null;
			$window.onclick = null;
			$scope.$apply();
		}
		event.stopPropagation();
	}
	$scope.isSelectedItem = function(item, type) {
		if(!$scope.selectedItem) {
			return false;
		}
		if(type == 'file') {
			if($scope.selectedItem.type && $scope.selectedItem.type == 'file') {
				return $scope.selectedItem.idCode == item.idCode;
			}
			else {
				return false;
			}
		}
		else {
			if($scope.selectedItem.type && $scope.selectedItem.type == 'file') {
				return false;
			}
			else {
				return $scope.selectedItem.idCode == item.idCode;
			}
		}
	}
	
	$scope.clearSearch = function() {
		$scope.filter.show=false;
		if($scope.searchForm.title && $scope.searchForm.title != '') {
			$scope.searchForm.title = '';
			$scope.search(false);
		}
	}
	
	$scope.search = function(loadMore) {
		$scope.promise = $http.post(ctx + '/notebook/search', $scope.searchForm).success(function(data){
			if(data.result == "success") {
				$scope.notes = data.data.notes;
				$scope.folders = data.data.folders;
				$scope.folderPath = data.data.folderPath;
				
				
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
	
	$scope.newNote = function(event) {
		event.stopPropagation();
		$location.path('/notebookNew').search({idCode:'',pIdCode:$scope.searchForm.pIdCode});
	}
	
	$scope.uploadNote = function(event) {
		$mdDialog.show({
			templateUrl: 'templates/notebook/upload.html?v=' + sysVersion,
			controller: 'NotebookUploadCtrl',
			fullscreen: true,
			resolve : {
				data : function(){
					return {pIdCode:$scope.searchForm.pIdCode}
				}
			}
		}).then(function (data) {
			$scope.search();
		});
	}
	
	$scope.toEdit = function(event) {
		event.stopPropagation();
		if($scope.selectedItem.type == 'file') {
			$location.path('/notebookNew').search({pIdCode:$scope.searchForm.pIdCode,idCode:$scope.selectedItem.idCode});
		}
		else {
			$scope.newFolder({idCode:$scope.selectedItem.idCode, name:$scope.selectedItem.name});
		}
	}
	
	$scope.del = function(event) {
		var item = $scope.selectedItem;
		event.stopPropagation();
		
		if($scope.selectedItem.type == 'file') {
			$scope.delNote(item);
		}
		else {
			$scope.delFolder(item);
		}
	}
	
	$scope.delNote = function(item) {
		var confirm = $mdDialog.confirm().title('确认删除笔记: ' + item.title + ' ?').textContent('删除后不可恢复').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx + '/notebook/delete', {idCode:item.idCode}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					var index = $scope.notes.indexOf(item);
					if(index > -1) {
						$scope.notes.splice(index, 1);
					}
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			});
		});
	}
	$scope.delFolder = function(item) {
		var confirm = $mdDialog.confirm().title('确认删除文件夹: ' + item.name + ' ?').textContent('删除后不可恢复').ariaLabel('确认').ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx + '/notebook/deleteFolder', {idCode:item.idCode}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					var index = $scope.folders.indexOf(item);
					if(index > -1) {
						$scope.folders.splice(index, 1);
					}
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			});
		});
	}
	
	$scope.toFolder = function(idCode) {
		$location.path('/notebook').search({pIdCode:idCode});
	}
	
	$scope.openFolder = function(event) {
		var item = $scope.selectedItem;
		event.stopPropagation();
		$location.path('/notebook').search({pIdCode:item.idCode});
	}
	
	$scope.newFolder = function(folderParam) {
		if(!folderParam) {
			folderParam = {}
		}
		folderParam.pIdCode = $scope.searchForm.pIdCode;
		
		$mdDialog.show({
			templateUrl: 'templates/notebook/newFolder.html?v=' + sysVersion,
			resolve: {folderParam: function() {return folderParam;}},
			controller: 'NoteBookFolderCtrl'
		}).then(function (data) {
			if(data == 'success') {
				$scope.search();
			}
		});
	}
	
	$scope.search();
});

angular.module('myApp').controller('NoteBookNewCtrl', function($rootScope, $window, $scope, $location, $routeParams, $http, $anchorScroll) {
	var h = $window.innerHeight - 130;
	$scope.aceheight = {'height': h + 'px'};
	
	angular.element($window).bind('resize', function(){
		if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
        	onWindowSizeChanged();
        }, 50);
	});
	function onWindowSizeChanged() {
		var h = $window.innerHeight - 130;
		$scope.aceheight = {'height': h + 'px'};
	    $scope.$apply();
	}
	
	$scope.editForm = {pIdCode:$routeParams.pIdCode};
	$scope.aceEditorOptions = {
		mode: 'scheme',
		onLoad: function (_editor) {
            _editor.$blockScrolling = Infinity;
            _editor.setReadOnly(false);
            _editor.setFontSize(15);
            $scope.aceSession = _editor.getSession();
        }
	}
	
	$scope.save = function() {
		$scope.promise = $http.post(ctx + '/notebook/save', $scope.editForm).success(function(data) {
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'保存成功',timeOut:2000});
				$location.path('/notebook').search({pIdCode:$routeParams.pIdCode});
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
	
	$scope.back = function() {
		$location.path('/notebook').search({pIdCode:$routeParams.pIdCode});
	}
	
	if($routeParams.idCode) {
		$scope.promise = $http.post(ctx + '/notebook/getDetailInfo', {idCode:$routeParams.idCode}).success(function(data) {
			$scope.editForm = data.data;
		})
	}
});

angular.module('myApp').controller('NoteBookFolderCtrl', function($mdDialog, $scope, $http, folderParam) {
	$scope.editForm = {pIdCode: folderParam.pIdCode, name:folderParam.name, idCode:folderParam.idCode};
	$scope.dialogName = '新文件夹';
	if(folderParam.idCode && folderParam.idCode != '') {
		$scope.dialogName = '重命名';
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	$scope.save = function() {
		$scope.promise = $http.post(ctx + '/notebook/saveFolder', $scope.editForm).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'创建成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
});

angular.module('myApp').controller('NotebookUploadCtrl', function($rootScope, $scope, $http, $mdDialog, formDataObject, data){
	$scope.uploadInfo = {};
	$scope.upload = function() {
		if(!$scope.uploadInfo.txtFile) {
			$scope.$root.$broadcast('notify', {type:'error',title:'请先选择文件。',info:data.info,timeOut:2000});
			return;
		}
		
		if($scope.uploadInfo.txtFile.size > 1024 * 1000) {
			$scope.$root.$broadcast('notify', {type:'error',title:'文件大小必须在1M以内。',info:data.info,timeOut:2000});
			return;
		}
		
		var upData = {};
		upData.pIdCode = data.pIdCode;
		upData.txtFile = $scope.uploadInfo.txtFile;
		var req = {
			method: 'POST',
			url: ctx + '/notebook/upload',
			headers: {'Content-Type': undefined},
			data: upData,
			transformRequest: formDataObject
		}
		
		$scope.promise = $http(req).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'上传成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
});
