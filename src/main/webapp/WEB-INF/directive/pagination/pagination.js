angular.module('ac.util.Pagination', [])
.controller('PaginationController', ['$scope', '$mdMedia', '$attrs', '$parse', function ($scope, $mdMedia, $attrs, $parse) {
	
	var self = this,
    	ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
    	setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    	
    this.init = function(ngModelCtrl_, config) {
    	ngModelCtrl = ngModelCtrl_;
        this.config = config;
        
        ngModelCtrl.$render = function() {
            self.render();
        };
        
        if($attrs.itemsPerPage) {
        	$scope.$parent.$watch($parse($attrs.itemsPerPage), function(value){
        		self.itemsPerPage = parseInt(value, 10);
        		$scope.totalPages = self.calculateTotalPages();
        	});
        }
        else {
        	this.itemsPerPage = config.itemsPerPage;
        }
        
        $scope.$watch('totalItems', function() {
            $scope.totalPages = self.calculateTotalPages();
        });
        $scope.$watch('totalPages', function(value){
        	setNumPages($scope.$parent, value);
        	
        	if($scope.page > value) {
        		$scope.selectPage(value);
        	}
        	else {
        		ngModelCtrl.$render();
        	}
        })
    };
    
    this.calculateTotalPages = function() {
    	var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    	return Math.max(totalPages || 0, 1);
    }
    
    this.render = function() {
    	$scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
    }
    
    $scope.selectPage = function(page, evt) {
    	if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
    		if(evt && evt.target) {
    			evt.target.blur();
    		}
    		ngModelCtrl.$setViewValue(page);
    		ngModelCtrl.$render();
    	}
    }
    
    $scope.getText = function( key ) {
        return $scope[key + 'Text'] || self.config[key + 'Text'];
	};
	$scope.noPrevious = function() {
		return $scope.page === 1;
	};
	$scope.noNext = function() {
		return $scope.page === $scope.totalPages;
	};
}])
.constant('paginationConfig', {
	itemsPerPage: 10,
	boundaryLinks: false,
	directionLinks: true,
	firstText: '第一页',
	previousText: '上一页',
	nextText: '下一页',
	lastText: '最后一页',
	rotate: true
})
.directive('pagination', ['$parse', '$mdMedia', 'paginationConfig', function($parse, $mdMedia, paginationConfig) {
	return {
		restrict: 'EA',
	    scope: {
	      totalItems: '=',
	      itemsPerPage: '=',
	      firstText: '@',
	      previousText: '@',
	      nextText: '@',
	      lastText: '@'
	    },
	    require: ['pagination', '?ngModel'],
	    controller: 'PaginationController',
	    replace: true,
		template: '\
			<div layout="row" layout-align="end center" layout-padding>\
				<div hide show-gt-xs>显示：{{itemsPerPage}} 条，共 {{totalItems}} 条, 页码: {{page}} / {{totalPages}}</div>\
				<div hide show-xs>共{{totalItems}}条, 页码:{{page}}/{{totalPages}}</div>\
				<md-button ng-disabled="page<=1" class="md-primary" style="min-width: 30px;margin: 3px 3px;" ng-click="selectPage(page - 1, $event)">上一页</md-button>\
				<md-button hide show-gt-sm class="md-primary" ng-repeat="page in pages track by $index" ng-class="{\'md-raised\': page.active}" ng-click="selectPage(page.number, $event)" style="cursor: pointer;min-width: 30px;margin: 3px 3px;">{{page.text}}</md-button>\
				<md-button ng-disabled="page>=totalPages" class="md-primary" style="min-width: 30px;margin: 3px 3px;" ng-click="selectPage(page + 1, $event)">下一页</md-button>\
			</div>\
		',
		link: function(scope, element, attrs, ctrls) {
			var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
			if (!ngModelCtrl) {
		         return; // do nothing if no ng-model
			}
			
			var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize;
			var rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
			
			paginationCtrl.init(ngModelCtrl, paginationConfig);
			
			if (attrs.maxSize) {
				scope.$parent.$watch($parse(attrs.maxSize), function(value) {
					maxSize = parseInt(value, 10);
					paginationCtrl.render();
				});
			}
			
			function makePage(number, text, isActive) {
				return {
					number: number,
					text: text,
					active: isActive
				};
			}
			
			function getPages(currentPage, totalPages) {
				  var pages = [];
				  // Default page limits
				  var startPage = 1, endPage = totalPages;
				  var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

				  // recompute if maxSize
				  if ( isMaxSized ) {
				    if ( rotate ) {
				      // Current page is displayed in the middle of the visible ones
				      startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
				      endPage   = startPage + maxSize - 1;
				  
				      // Adjust if limit is exceeded
				      if (endPage > totalPages) {
				        endPage   = totalPages;
				        startPage = endPage - maxSize + 1;
				      }
				    } else {
				      // Visible pages are paginated with maxSize
				      startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;
				  
				      // Adjust last page if limit is exceeded
				      endPage = Math.min(startPage + maxSize - 1, totalPages);
				    }
				  }

				  // Add page number links
				  for (var number = startPage; number <= endPage; number++) {
				    var page = makePage(number, number, number === currentPage);
				    pages.push(page);
				  }
				  
				  // Add links to move between page sets
				  if ( isMaxSized && ! rotate ) {
				    if ( startPage > 1 ) {
				      var previousPageSet = makePage(startPage - 1, '...', false);
				      pages.unshift(previousPageSet);
				    }
				  
				    if ( endPage < totalPages ) {
				      var nextPageSet = makePage(endPage + 1, '...', false);
				      pages.push(nextPageSet);
				    }
				  }
				  
				  return pages;
			}
			
			var originalRender = paginationCtrl.render;
			paginationCtrl.render = function() {
			    originalRender();
			    if (scope.page > 0 && scope.page <= scope.totalPages) {
					scope.pages = getPages(scope.page, scope.totalPages);
			    }
			};
		}
	}
}]);
