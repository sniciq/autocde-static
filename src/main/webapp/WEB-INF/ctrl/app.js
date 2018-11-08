var myApp = angular.module('myApp', 
	['ngCookies','ngRoute', 'ngSanitize','ngAnimate','ngMessages','cgBusy', 'toaster', 'ui.tinymce','ac.util.commonfilter',
    'ui.ace','ngMaterial','ac.util.Pagination','ac.util.mdToggleMenu','ac.util.AcTable','oc.lazyLoad'
    ]
);

myApp.getCookie = function(name) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))  {
		return unescape(arr[2]);
	}
	else {
		return null;
	}
}

myApp.config(function($mdThemingProvider) {
	var utheme = myApp.getCookie('utheme');
	if(utheme && utheme != 'default') {
		$mdThemingProvider.theme('default').primaryPalette(utheme);
	}
	else {
		$mdThemingProvider.definePalette('amazingAccentPaletteName', acThemeAccentPalette);
		var myMap = $mdThemingProvider.extendPalette('red', {'500': '106CC1'});
		$mdThemingProvider.definePalette('myMap', myMap);
		$mdThemingProvider.theme('default').primaryPalette('myMap').accentPalette('amazingAccentPaletteName');

//		$mdThemingProvider.theme('default')
//		.primaryPalette('blue', {
//			'default': '700', // by default use shade 400 from the pink palette for primary intentions
//			'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
//			'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
//			'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
//		})
//		.accentPalette('purple', {
//			'default': '200' // use shade 200 for default, and keep all other shades the same
//		});
	}
	
	$mdThemingProvider.theme('altTheme').primaryPalette('grey').dark();
});

myApp.factory('timeoutInterceptor', function($location) {
	var interceptor = {
		request: function(config) {
			config.headers['Request-By'] = 'AgHttp';
            return config;
        },	
        response: function (response) {
        	if(response.data && response.data.success == true) {
        		if(response.data.result == "timeout") {
        			window.location.href = ctx + '/sessionout';
        			return response;
        		}
        		else if(response.data.result == "noAuth") {
        			window.location.href = ctx + '/noauth';
        			return response;
        		}
        		else {
            		return response;
            	}
        	}
        	else {
        		return response;
        	}
        },
        responseError: function (rejection) {
            if(rejection.status === 401) {
                location.reload();
            }
            return $q.reject(rejection);
        }
	}
	return interceptor;
});

myApp.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('timeoutInterceptor');
}]);

myApp.navNames = {'/home':'首页'};
myApp.factory('formDataObject', function() {//用于form file upload
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			fd.append(key, value);
		});
		return fd;
	};
});

myApp.directive('datepickerLocaldate', ['$parse', function ($parse) {
    var directive = {
        restrict: 'A',
        require: ['ngModel'],
        link: link
    };
    return directive;

    function link(scope, element, attr, ctrls) {
        var ngModelController = ctrls[0];

        // called with a JavaScript Date object when picked from the datepicker
        ngModelController.$parsers.push(function (viewValue) {
            // undo the timezone adjustment we did during the formatting
            viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
            // we just want a local date in ISO format
            return viewValue.toISOString().substring(0, 10);
        });

        // called with a 'yyyy-mm-dd' string to format
        ngModelController.$formatters.push(function (modelValue) {
            if (!modelValue) {
                return undefined;
            }
            // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
            var dt = new Date(modelValue);
            // 'undo' the timezone offset again (so we end up on the original date again)
            dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
            return dt;
        });
    }
}]);

myApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}]);

myApp.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element, attributes) {
            $timeout(function(){
                _element[0].focus();
            }, 800);
        }
    };
});

myApp.getRouteAttrByPath = function(path) {
	for(var i = 0; i < routeList.length; i++) {
		if(routeList[i].path == path) {
			return routeList[i];
		}
	}
	return null;
}

myApp.config(['$routeProvider', function($routeProvider,$routeParams) {
	$routeProvider.otherwise({
		redirectTo: '/home'
  	});
	
	for(var i = 0; i < routeList.length; i++) {
		var attr = routeList[i];
		myApp.navNames[attr.path] = attr.name;
		$routeProvider.when(attr.path, {
			templateUrl: attr.templateUrl,
			controller: attr.ctrl,
			resolve: {
				loadMyFiles:function($ocLazyLoad, $route) {
					var path = $route.current.$$route.originalPath;
					var attr = myApp.getRouteAttrByPath(path);
					if(!attr) {
						return;
					}
					
					if(!attr.files) {
						return;
					}
					
					return $ocLazyLoad.load({
						name: attr.ctrl,
						files: attr.files
					})
				}
			}
		});
	}
}]);
