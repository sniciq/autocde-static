angular.module('myApp').controller('CodeCtrl', function($rootScope, $scope, $location, $routeParams, $http, $window) {
    var h = $window.innerHeight - 115;
	$scope.aceheight = {'height': h + 'px'};
	
	$scope.aceEditorOptions = {
		mode: 'scheme',
		onLoad: function (_editor) {
            _editor.$blockScrolling = Infinity;
            _editor.setReadOnly(true);
        }
	}
	
	$scope.nodePath = [];
	$scope.promise = $http.post(ctx + '/basic/CodePreviewCtrl/navigator', {id:$routeParams.id}).success(function(data){
		$scope.projectName = data.data.fileName;
		$scope.showNode = data.data.children[0];
		$scope.nodePath.push($scope.showNode);
		$scope.navView = "fileList";
	});
	
	$scope.navTreeClick = function(item, pNode) {
		if(item.leaf) {
			$scope.viewFile = true;
			$scope.navView = "fileContent";
			$scope.showFile(item);
		}
		else {
			$scope.viewFile = false;
			$scope.navView = "fileList";
			$scope.showNode = item;
		}
		
		$scope.nodePath.push(item);
	}
	$scope.navTreeParent = function() {
		$scope.viewFile = false;
		$scope.navView = "fileList";
		$scope.showNode = $scope.nodePath.pop();
	}
	
	$scope.navTreeParentNode = function(node, index) {
		$scope.showNode = node;
		$scope.viewFile = false;
		$scope.navView = "fileList";
		
		$scope.nodePath = $scope.nodePath.slice(0, index + 1);
	}
	
	$scope.tabs = [],
	$scope.selectedIndex = 0;
	selected = null,
	previous = null;
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	$scope.showFile = function(node) {
		if(node.leaf) {
			var data = {
				path:node.filePath,
				tplPath:node.tplPath,
				type:node.type,
				nodeId:node.nodeId,
				projectId:$routeParams.id
			}
			$scope.promise = $http.post(ctx + '/basic/CodePreviewCtrl/getFileContent', data).success(function(data){
				$scope.aceEditorOptions.mode = 'scheme';
				if(endsWith(node.fileName, '.js')) {
					$scope.aceEditorOptions.mode = 'javascript';
				}
				else if(endsWith(node.fileName, '.xml')) {
					$scope.aceEditorOptions.mode = 'xml';
				}
				else if(endsWith(node.fileName, '.java')) {
					$scope.aceEditorOptions.mode = 'java';
				}
				else if(endsWith(node.fileName, '.sql')) {
					$scope.aceEditorOptions.mode = 'sql';
				}
				else if(endsWith(node.fileName, '.html')) {
					$scope.aceEditorOptions.mode = 'html';
				}
				else if(endsWith(node.fileName, '.jsp')) {
					$scope.aceEditorOptions.mode = 'jsp';
				}
				$scope.vieFileContent = data.data;
			});
		}
	}
	
	$scope.openProject = function() {
		$location.path('/project').search({id:$routeParams.id});
	}
	$scope.previewProject = function() {
		window.open(ctx + '/preview?id=' + $routeParams.id);
	}
	$scope.downloadProject = function() {
		window.open(ctx + '/dowload?id=' + $routeParams.id);
	}
	
});