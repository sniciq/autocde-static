angular.module('ac.util.AcTable', [])
.filter('isEmpty', [function() {
	return function(object) {
		return angular.equals({}, object);
	}
}])
.filter('keyCountInObject', [function() {
	return function(object) {
		return Object.keys(object).length;
	}
}])
.directive("acTable", function() {
	return {
	    restrict: 'E',
	    require: 'acTable',
	    scope: {
	    },
	    controller: function() {
	    	var cols = [];
	        this.addColumn = function(col) {
	          cols.push(col);
	        };
	        this.getColumns = function() {
	          return cols;
	        };
	    },
	    link: function(scope, element, attributes, acTableCtrl) {
	    }
	}
})
.directive("acTableColumn", function() {
	return {
	    restrict: 'E',
	    require: '^acTable',
	    link: function(scope, element, attributes, acTableCtrl) {
	    	acTableCtrl.addColumn({
	            header: attributes.header,
	            field: attributes.field,
	            style: attributes.style,
	            sortable: attributes.sortable
	    	});
	    }
	}
})
.run(function($templateCache) {
	var template = '\
    	<div class="actable">\
			<div class="row header grey">\
				<div ng-show="selectable" class="cell checkbox"></div>\
				<div ng-repeat="col in cols" class="cell" ng-class="{\'sort\': col.sortable}" ng-click="toggleSort(col.sortable,col.field)" style="{{col.style}}">\
					<span>{{col.header}}</span><i ng-if="col.sortable==\'true\'" class="material-icons sort-toggle-icon" ng-class="getSortDir(col.sortable,col.field)">arrow_downward</i>\
				</div>\
			</div>\
			<div class="row" ng-repeat="item in items.data" ng-click="toggleSelectItems(item,$event)">\
				<div ng-show="selectable" class="cell checkbox">\
					<md-checkbox ng-checked="isItemSelected(item)" ng-click="toggleSelectItems(item, $event)" aria-label="Checkbox"></md-checkbox>\
				</div>\
				<div ng-repeat="col in cols" class="cell" style="{{col.style}}">{{item[col.field]}}</div>\
			</div>\
		</div>\
		';
	$templateCache.put('ac-table-directives', template)
})
.directive("acTableGrid",['$compile','$templateCache', function($compile,$templateCache) {
	return {
	    restrict: 'E',
	    transclude: true,
	    require: '^acTable',
	    scope: {
	    	items: '=', 
	    	selectable: '=',
	    	multiple: '=',
	    	selectedItems: '=',//选中的项目idField数组
	    	idField: '@',//用于
	    	paging: '=',
	    	onSortChange: '&'
	    },
	    template: $templateCache.get('ac-table-directives'),
	    link: function(scope, element, attributes, acTableCtrl) {
	    	scope.cols = acTableCtrl.getColumns();
	    	
	    	scope.$watch('items', function () {
	    		var data = $templateCache.get('ac-table-directives');
	    		element.html(data);
                $compile(element.contents())(scope);
	    	});
	    	scope.colCanSort = function(item) {
	    		return item;
	    	};
	    	scope.getSortDir = function(sortable, sort) {
	    		if(sortable != 'true') {
	    			return 'none';
	    		}
	    		else if(scope.paging && scope.paging.sort == sort) {
					return scope.paging.dir;
				}
				else {
					return 'none';
				}
	    	};
	    	scope.toggleSort = function(sortable,sort) {
	    		if(sortable != 'true') {
	    			return;
	    		}
	    		
	    		scope.paging.sort = sort;
				if(scope.paging.dir == 'asc') {
					scope.paging.dir = 'desc';
				}
				else {
					scope.paging.dir = 'asc';
				}
	    		scope.onSortChange();
	    	};
	    	
	    	scope.isItemSelected = function(item) {
	    		if(!scope.selectable) {
	    			return false;
	    		}
	    		if(scope.selectedItems[item[scope.idField]]) {
	    			return true;
	    		}
	    		else {
	    			return false;
	    		}
	    	};
	    	scope.toggleSelectItems = function(item, event) {
	    		if(!scope.selectable) {
	    			return;
	    		}
	    		
				if (scope.selectedItems[item[scope.idField]]) {
					delete scope.selectedItems[item[scope.idField]];
			    }
			    else {
			    	if(scope.multiple) {//多选
			    		scope.selectedItems[item[scope.idField]] = item;
			    	}
			    	else {//单选
			    		scope.selectedItems = {};
			    		scope.selectedItems[item[scope.idField]] = item;
			    	}
			    }
				event.stopPropagation();
	    	}
	    }
	}
}]);
