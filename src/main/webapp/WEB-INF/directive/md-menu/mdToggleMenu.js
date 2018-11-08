angular.module('ac.util.mdToggleMenu', [])
.directive("mdMenuLink",function() {
    return {
        scope: {
        	menu: "="
        },
        template: '\
        	<md-button ng-class="{\'active\' : isSelected()}" ng-click="focusSection()">\
        		<div flex layout="row" layout-align="center center">{{menu.name}}<span flex></span><i class="material-icons">{{menu.icon}}</i></div>\
		    </md-button>\
        ',
        link: function($scope, $element) {
			var controller = $element.parent().controller();
			$scope.isSelected = function() {
				return controller.isSelected($scope.menu);
			};
			$scope.focusSection = function() {
				controller.menuClick($scope.menu);
			};
	    }
    }
})
.directive('mdMenuToggle', [ '$timeout', function($timeout) {
    return {
        scope: {
        	menu: "="
        },
        template: '\
        	<md-button class="md-button-toggle" ng-click="toggle()">\
        		<div flex layout="row" layout-align="center center">\
	        		{{menu.name}}\
	        		<span flex></span>\
        	<i class="material-icons md-toggle-icon" ng-class="{\'toggled\' : isOpen()}">keyboard_arrow_down</i>\
	        	</div>\
	        </md-button>\
	        <ul class="menu-toggle-list">\
	        	<li ng-repeat="subMenu in menu.subMenus">\
	        		<md-menu-link menu="subMenu"></md-menu-link>\
	        	</li>\
	        </ul>\
        ',
        link: function($scope, $element) {
	      var controller = $element.parent().controller();
	
	      $scope.isOpen = function() {
	        return controller.isOpen($scope.menu);
	      };
	      $scope.toggle = function() {
	        controller.toggleOpen($scope.menu);
	      };
	      $scope.$watch(
	          function () {
	            return controller.isOpen($scope.menu);
	          },
	          function (open) {
	            var $ul = $element.find('ul');
	            var targetHeight = open ? getTargetHeight() : 0;
	            $timeout(function () {
	              $ul.css({ height: targetHeight + 'px' });
	            }, 0, false);
	
	            function getTargetHeight () {
	              var targetHeight;
	              $ul.addClass('no-transition');
	              $ul.css('height', '');
	              targetHeight = $ul.prop('clientHeight');
	              $ul.css('height', 0);
	              $ul.removeClass('no-transition');
	              return targetHeight;
	            }
	          }
	      );
	      var parentNode = $element[0].parentNode.parentNode.parentNode;
	      if(parentNode.classList.contains('parent-list-item')) {
	        var heading = parentNode.querySelector('h2');
	        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
	      }
	    }
    }
}]);