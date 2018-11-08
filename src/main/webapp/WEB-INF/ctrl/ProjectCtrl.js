angular.module('myApp').controller('ProjectCtrl', function($rootScope, $scope, $location, $routeParams, $http, $mdDialog, MenuService) {
	myApp.navNames['/project']='配置项目';
	
	$scope.previewProjectCode = function(idCode) {
		$location.path('/project_code').search({id:idCode});
	}
	$scope.previewProject = function(idCode) {
		window.open(ctx + '/preview?id=' + idCode);
	}
	
	$scope.downloadProject = function(idCode) {
		window.open(ctx + '/dowload?id=' + idCode);
	}
	
	$scope.parseDBSQL = function() {
		$mdDialog.show({
			templateUrl: 'templates/project/data_table_parse.html?v=' + sysVersion,
			controller: 'DataTableSQLParseCtrl',
			fullscreen: true,
			resolve : {
				data : function(){
					return {projectId:$routeParams.id}
				}
			}
		}).then(function (data) {
			$scope.loadDataTable();
		});
	}
	
	$scope.importDataTable = function() {
		$mdDialog.show({
			templateUrl: 'templates/project/data_table_import.html?v=' + sysVersion,
			controller: 'DataTableImportCtrl',
			fullscreen: true,
			resolve : {
				data : function(){
					return {projectId:$routeParams.id}
				}
			}
		}).then(function (data) {
			$scope.loadDataTable();
		});
	}
	
	$scope.editDataTable = function(dataTableId) {
		$mdDialog.show({
			templateUrl: 'templates/project/data_table.html?v=' + sysVersion,
			controller: 'DataTableCtrl',
			fullscreen: true,
			resolve : {
				data : function(){
					return {projectId:$scope.projectInfo.id,dataTableId:dataTableId}
				}
			}
		}).then(function (data) {
			$scope.loadDataTable();
		});
	}
	
	$scope.deleteDataTable = function(item) {
		var confirm = $mdDialog.confirm()
	        .title('确认')
	        .textContent('确认删除数据表: ' + item.name + ' ?')
	        .ariaLabel('确认')
	        .ok('确认')
	        .cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx+'/basic/DataTableCtrl/delete', {id:item.id}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					$scope.loadDataTable();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			})
	    });
	}
	
	$scope.loadProjectDetail = function() {
		$scope.promise = $http.post(ctx+'/basic/project/getProjectDetail', {id:$routeParams.id}).success(function(data){
			if(data.result == "success") {
				$scope.dataTableList = data.data.dataTableList;
				$scope.projectInfo = data.data.projectInfo;
				$scope.moduleMap = data.data.moduleMap;
				$scope.muduleNoGroupList = data.data.muduleNoGroupList;
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		})
	}
	
	$scope.loadDataTable = function() {
		$scope.promise = $http.post(ctx+'/basic/DataTableCtrl/search', {projectId:$scope.projectInfo.id}).success(function(responseData){
			$scope.dataTableList =  responseData.data;
		})
	}
	
	$scope.loadModules = function() {
		$scope.promise = $http.post(ctx+'/basic/ModuleCtrl/search', {projectId:$scope.projectInfo.id}).success(function(responseData){
			$scope.moduleMap = responseData.data.moduleMap;
			$scope.muduleNoGroupList = responseData.data.muduleNoGroupList;
		})
	}
	
	$scope.deleteModule = function(item) {
		var confirm = $mdDialog.confirm()
	        .title('确认')
	        .textContent('确认删除数据表: ' + item.name + ' ?')
	        .ariaLabel('确认')
	        .ok('确认')
	        .cancel('取消');
		$mdDialog.show(confirm).then(function() {
			$scope.promise = $http.post(ctx+'/basic/ModuleCtrl/delete', {id:item.id}).success(function(data){
				if(data.result == "success") {
					$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'删除成功',timeOut:2000});
					$scope.loadModules();
				}
				else {
					$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
				}
			})
	    });
	}
	
	$scope.editModule = function(moduleId) {
		$mdDialog.show({
			templateUrl: 'templates/project/module.html?v=' + sysVersion,
			controller: 'ModuleCtrl',
			escapeToClose: false,
			fullscreen: true,
			clickOutsideToClose: false,
			resolve : {
				data : function(){
					return {projectId:$scope.projectInfo.id,moduleId:moduleId}
				}
			}
		}).then(function (data) {
			$scope.loadModules();
		});
	}
	
	$scope.menus = [];
	$scope.newMenu = function() {
		$scope.menus.push({name:'',modules:[]})
	}
	
	$scope.loadProjectDetail();
});

angular.module('myApp').controller('DataTableCtrl', function($rootScope, $scope, $http,$mdDialog,$mdToast,data){
	if(data.dataTableId != null && data.dataTableId > 0) {
		$scope.promise = $http.post(ctx+'/basic/DataTableCtrl/getDetail', {dataTableId: data.dataTableId}).success(function(data){
			$scope.dataTable = data.data.dataTable;
			$scope.dataTable.columns = data.data.columns;
		});
	}
	else {
		$scope.dataTable = {projectId:data.projectId,columns:[{name: ''}]};
	}
	
	$scope.addColumn = function() {
		$scope.dataTable.columns.push({name:'',type: ''});
	}
	$scope.deleteColumn = function(index) {
		$scope.dataTable.columns.splice(index, 1);
	}
	
	$scope.save = function() {
		var pkCount = 0;
		for(var i = 0; i < $scope.dataTable.columns.length; i++) {
			if($scope.dataTable.columns[i].isPK) {
			    if($scope.dataTable.columns[i].type != 'BIGINT') {
                    $scope.$root.$broadcast('notify', {type:'error',title:'主键必须为BIGINT。',info:data.info,timeOut:2000});
                    return;
                }
				pkCount ++;
			}
		}
		if(pkCount != 1) {
			$scope.$root.$broadcast('notify', {type:'error',title:'请选择一个主键。',info:data.info,timeOut:2000});
			return;
		}
		
		$scope.promise = $http.post(ctx+'/basic/DataTableCtrl/save', $scope.dataTable).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'保存成功',timeOut:2000});
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

angular.module('myApp').controller('DataTableSQLParseCtrl', function($rootScope, $scope, $http, $mdDialog, $window, data){
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	$scope.save = function() {
		$scope.promise = $http.post(ctx+'/basic/DataTableCtrl/parseSql', {idCode:data.projectId,sql:$scope.sql}).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'导入成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		});
	}
});

angular.module('myApp').controller('DataTableImportCtrl', function($rootScope, $scope, $http, $mdDialog, formDataObject, data){
	$scope.tableImport = {projectIdCode:data.projectId,type:2};
	$scope.import = function() {
		
		if($scope.tableImport.type == 2 && !$scope.tableImport.sqlFile) {
			$scope.$root.$broadcast('notify', {type:'error',title:'请先SQL选择文件。',info:data.info,timeOut:2000});
			return;
		}
		
		if($scope.tableImport.type == 2 && $scope.tableImport.sqlFile.size > 1024 * 1000) {
			$scope.$root.$broadcast('notify', {type:'error',title:'文件大小必须在1M以内。',info:data.info,timeOut:2000});
			return;
		}
		
		data.formJsonData = angular.toJson($scope.tableImport);
		data.sqlFile = $scope.tableImport.sqlFile;
		var req = {
			method: 'POST',
			url: ctx + '/basic/DataTableCtrl/importDB',
			headers: {'Content-Type': undefined},
			data: data,
			transformRequest: formDataObject
		}
		
		$scope.promise = $http(req).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'导入成功',timeOut:2000});
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
angular.module('myApp').controller('ModuleCtrl', function($rootScope, $scope, $http, $mdDialog,data){
	$scope.tableList = [];
	$scope.selectColumns = [];
	$scope.gridColumns = [];
	
	$scope.moduleTypeChange = function() {//清空数据
		$scope.tableList = [];
		$scope.selectColumns = [];
		$scope.gridColumns = [];
		
		$scope.module.tables = [];
		$scope.module.selectColumns = [];
		$scope.module.gridColumns = [];
		$scope.module.relations = [];
		
		$scope.loadDatatables();
	}
	
	$http.post(ctx+'/basic/ModuleCtrl/getModuleGroup', {projectId:data.projectId}).success(function(responseData){
		$scope.menuList = responseData.data;
	});
	
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(item) {
			return (item.name.indexOf(lowercaseQuery) === 0);
		};
    }
	
	$scope.loadDatatables = function() {
		$http.post(ctx+'/basic/DataTableCtrl/search', {projectId:data.projectId}).success(function(responseData){
			$scope.tableList = [];
			for(var i = 0; i < responseData.data.length; i++) {
				var item = responseData.data[i];
				
				//check is selected
				var selected = false;
				for(var k = 0; k < $scope.module.tables.length; k++) {
					if($scope.module.tables[k] == item.id) {
						selected = true;
						break;
					}
				}
				$scope.tableList.push({id:item.id,name:item.name,remark:item.remark, selected:selected});
			}
			
			var tableIds = '';
			for(var k = 0; k < $scope.module.tables.length; k++) {
				tableIds += $scope.module.tables[k] + ',';
			}
			$scope.loadColumsList(tableIds);
		})
	}
	
	$scope.loadColumsList = function(tableIds) {
		$http.post(ctx+'/basic/DataTableCtrl/getTableColumns', {tableIds: tableIds}).success(function(data){
			if($scope.module.type == 1) {
				$scope.selectColumns = data.data.columns;
				$scope.gridColumns = angular.copy(data.data.columns);
			}
			else if($scope.module.type == 2) {
				for(var i = 0; i < data.data.columns.length; i++) {
					var aCol = angular.copy(data.data.columns[i]);
					var aaCol = angular.copy(data.data.columns[i]);
					$scope.selectColumns.push(aCol);
					$scope.gridColumns.push(aaCol);
				}
			}
			
			//设置回显列表
			for(var i = 0; i < $scope.selectColumns.length; i++) {
				for(var j = 0; j < $scope.module.selectColumns.length; j++) {
					if($scope.selectColumns[i].id == $scope.module.selectColumns[j]) {
						$scope.selectColumns[i].selected = true;
						break;
					}
				}
			}
			
			for(var i = 0; i < $scope.gridColumns.length; i++) {
				for(var j = 0; j < $scope.module.gridColumns.length; j++) {
					if($scope.gridColumns[i].id == $scope.module.gridColumns[j]) {
						$scope.gridColumns[i].selected = true;
						break;
					}
				}
			}
			
			$scope.optionAllSelectColumnsToggled();
			$scope.optionAllGridColumnsToggled();
		});
	}
	
	$scope.tableItemClick = function(table) {
		if($scope.module.type == 1) {//只能选择一个
			$scope.selectColumns = [];
			if(table.selected) {//取消其它
				for(var i = 0; i < $scope.tableList.length; i++) {
					if($scope.tableList[i].id != table.id) {
						$scope.tableList[i].selected = false;
						$scope.deleteCols(table.id);
					}
				}
			}
		}
		if($scope.module.type == 2 && !table.selected) {
			$scope.deleteCols(table.id);
		}
		
		if(table.selected) {//取消选中时，需要删除
			$scope.loadColumsList(table.id);//加载数据
		}
	}
	
	$scope.tableItemDelete = function(item) {
		item.selected=false;
		$scope.deleteCols(item.id);
	}
	
	//删除selectColumns 和 gridColumns
	$scope.deleteCols = function(tableId) {
		$scope.module.selectColumns = [];
		$scope.module.gridColumns = [];
		$scope.module.tables = [];
		
		var i = $scope.selectColumns.length;
		while (i--) {
			if($scope.selectColumns[i].datatableId == tableId) {
				$scope.selectColumns.splice(i, 1);
			}
			if($scope.gridColumns[i].datatableId == tableId) {
				$scope.gridColumns.splice(i, 1);
			}
		}
	}
	
	$scope.onModuleTypeChange = function() {
		$scope.selectColumns = [];
		$scope.gridColumns = [];
		$scope.module.relations = [];
		$scope.module.selectColumns = [];
		$scope.module.gridColumns = [];
		$scope.module.tables = [];
		for(var i = 0; i < $scope.tableList.length; i++) {
			$scope.tableList[i].selected = false;
			$scope.deleteCols($scope.tableList[i].id);
		}
	}
	
	$scope.toggleAllSelectColumnsCheck = function(checked) {
		for(var i = 0; i < $scope.selectColumns.length; i++) {
			$scope.selectColumns[i].selected = checked;
		}
	}
	$scope.optionAllSelectColumnsToggled = function() {
		$scope.isChkAllSelectColumns = $scope.selectColumns.every(function(itm){ return itm.selected; })
	}
	
	$scope.toggleAllGridColumnsCheck = function(checked) {
		for(var i = 0; i < $scope.gridColumns.length; i++) {
			$scope.gridColumns[i].selected = checked;
		}
	}
	$scope.optionAllGridColumnsToggled = function() {
		$scope.isChkAllGridColumns = $scope.gridColumns.every(function(itm){ return itm.selected; })
	}
	
	$scope.save = function() {
		//取到选中的内容
		//1. selectColumns
		$scope.module.selectColumns = [];
		for(var i = 0; i < $scope.selectColumns.length; i++) {
			if($scope.selectColumns[i].selected) {
				$scope.module.selectColumns.push($scope.selectColumns[i].id);
			}
		}
		//2.gridColumns
		$scope.module.gridColumns = [];
		for(var i = 0; i < $scope.gridColumns.length; i++) {
			if($scope.gridColumns[i].selected) {
				$scope.module.gridColumns.push($scope.gridColumns[i].id);
			}
		}
		//3. $scope.tableList
		$scope.module.tables = [];
		for(var i = 0; i < $scope.tableList.length; i++) {
			if($scope.tableList[i].selected) {
				$scope.module.tables.push($scope.tableList[i].id);
			}
		}
		
		if ($scope.module.tables.length == 0) {
			$scope.$root.$broadcast('notify', {type:'error',title:'数据表 必填。',info:data.info,timeOut:2000});
			return;
		}
		if ($scope.module.selectColumns.length == 0) {
			$scope.$root.$broadcast('notify', {type:'error',title:'查询项 必填。',info:data.info,timeOut:2000});
			return;
		}
		if ($scope.module.gridColumns.length == 0) {
			$scope.$root.$broadcast('notify', {type:'error',title:'显示项  必填。',info:data.info,timeOut:2000});
			return;
		}
		
		$scope.promise = $http.post(ctx+'/basic/ModuleCtrl/save', $scope.module).success(function(data){
			if(data.result == "success") {
				$scope.$root.$broadcast('notify', {type:'success',title:'提示',info:'保存成功',timeOut:2000});
				$mdDialog.hide('success');
			}
			else {
				$scope.$root.$broadcast('notify', {type:'error',title:'错误',info:data.info,timeOut:2000});
			}
		})
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
	
	$scope.addRelationColumn = function() {
		$scope.module.relations.push({});
	}
	$scope.deleteRelationColumn = function(i) {
		$scope.module.relations.splice(i, 1);
	}
	
	if(data.moduleId != null && data.moduleId > 0) {
		$scope.promise = $http.post(ctx+'/basic/ModuleCtrl/getDetail', {id:data.moduleId}).success(function(responseData){
			$scope.module = responseData.data;
			$scope.loadDatatables();
		});
	}
	else {
		$scope.module = {projectId:data.projectId,type:1,hasAdd:1,hasDelete:1,
			tables:[],selectColumns:[],gridColumns:[],relations:[]
		};
		$scope.loadDatatables();
	}
});