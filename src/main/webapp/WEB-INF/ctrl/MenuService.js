myApp.factory('MenuService', ['$location','$rootScope','$http','$window',function($location, $rootScope, $http, $window) {
	var menus = [];
	var self;
	//请求菜单
	$http.post(ctx+"/getAppMenu").success(function(data) {
		for(var i = 0; i < data.length; i++) {
			menus.push(data[i]);
		}
    });
	
	return self = {
	    menus: menus,
	    toggleSelectMenu: function(menu) {
	    	self.openedMenu = (self.openedMenu === menu ? null : menu);
	    },
	    selectMenu: function(menu) {
	    	self.openedMenu = menu;
	    },
	    isMenuSelected: function(menu) {
	    	return self.openedMenu === menu;
	    },
	    isSelected: function(menu) {
	    	var path = menu.path;
	    	if(angular.isUndefined(menu.params) || menu.params === null) {
	    		return $location.path().indexOf(path, $location.path().length - path.length) !== -1;
	    	}
	    	else {
	    		var urlEq = $location.path().indexOf(path, $location.path().length - path.length) !== -1;
	    		var paramEq = angular.equals(menu.params, $location.$$search);
	    		return urlEq && paramEq;
	    	}
	    },
	    reLoad: function() {
	    	$http.post(ctx+"/getAppMenu").success(function(data) {
	    		self.menus = [];
	    		for(var i = 0; i < data.length; i++) {
	    			self.menus.push(data[i]);
	    		}
	        });
	    }
	}
}])