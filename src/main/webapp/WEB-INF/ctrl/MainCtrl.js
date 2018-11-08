angular.module('myApp').controller('MainCtrl', function($rootScope, $mdTheming,$scope, $cookies, $http, $location, toaster, $mdDialog, $mdSidenav, $mdMedia, $timeout){
	$rootScope.userEmail = userEmail;
	$rootScope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	
	var leftNavLock =  myApp.getCookie('leftNavLock');
	
	if(leftNavLock === 'false') {
		$scope.leftNavLock = false;
	}
	else {
		$scope.leftNavLock = true;
	}
	
	//$rootScope.isRouteLoading = true;
	$scope.themes = ["default","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"];
	$scope.changeTheme = function(item) {
		$cookies.put('utheme', item, {expires:new Date(new Date().getTime() + 30*24*60*60*1000)});
		window.location.href = ctx+'/';
	} 
	
	$scope.getNavName = function() {
		var navPath = $location.path();
		if(myApp.navNames[navPath]) {
			return myApp.navNames[navPath];
		}
	};
	
	$scope.isNavActive = function(path) {
		return $location.path().indexOf(path) == 0;
	};
	
	$scope.toHome = function() {
		$location.path('/home').search({});
	}
	$scope.mailToMe = function() {
		var link = "mailto:autocoding@163.com?subject=AC系统反馈&body=谢谢您的意见"; 
		window.location.href = link;
	}
	$scope.showUpgradeLog = function() {
		$mdDialog.show({
			templateUrl: 'templates/upgradeLog.html?v=' + sysVersion,
			fullscreen: true,
			controller: function($scope, $mdDialog) {
				$scope.cancel = function() {
					$mdDialog.cancel();
				}
			}
		});
	}
	$scope.reward = function() {
		$mdDialog.show({
			templateUrl: 'templates/reward.html?v=' + sysVersion,
			fullscreen: true,
			controller: function($scope, $mdDialog) {
				$scope.images = [ctx+'/resources/images/qrcode_alipay.png', ctx+'/resources/images/qrcode_weixin.png'];
				$scope.cancel = function() {
					$mdDialog.cancel();
				}
			}
		});
	}
	$scope.toChangePswd = function() {
		$location.path('/changePwd').search({});
	}
	
	$scope.logout = function(ev) {
		var confirm = $mdDialog.confirm().title('确认').textContent('确认退出系统?').targetEvent(ev).ok('确认').cancel('取消');
		$mdDialog.show(confirm).then(function() {
			window.location.href = ctx + '/sys/logout'
		}, function() {
		});
	}
	
	$scope.navLeftLocked = function() {
		return $mdSidenav("navLeft").isLockedOpen();
	}
	
	$scope.toggleNavLeft = function() {
		$mdSidenav("navLeft").toggle().then(function () {});
	}
	
	$scope.toggleNavLeftLock = function(ev) {
		if(!$scope.leftNavLock) {
			$mdSidenav("navLeft").toggle().then(function () {
				$scope.leftNavLock = !$scope.leftNavLock;
				$cookies.put('leftNavLock', $scope.leftNavLock);
			});
		}
		else {
			$scope.leftNavLock = !$scope.leftNavLock;
			$cookies.put('leftNavLock', $scope.leftNavLock);
			$mdSidenav("navLeft").close().then(function () {});
		}
	}
	
	$scope.$on('notify', function(event, toastData) {
		toaster.pop(toastData.type, toastData.title, toastData.info, toastData.timeOut);
	});
	
//	$scope.notify = function() {
////toaster.pop('success', "title", 'Its address is https://google.com.', 15000, 'trustedHtml', 'goToLink');
//toaster.pop('success', "title", 'success', 2000, 'trustedHtml');
//toaster.pop('error', "error", 'error', null, 'trustedHtml');
////toaster.pop('wait', "title", null, null, 'template');
//toaster.pop('warning', "warning", "warning", null);
//toaster.pop('note', "note", "note");
//}
	
	$rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
		$rootScope.isRouteLoading = true;
	});
    $rootScope.$on('$routeChangeSuccess', function() {
    	$timeout(function() {
    		$rootScope.isRouteLoading = false;
    	}, 50)
    });
	
});

angular.module('myApp').controller('LeftNavCtrl', function($rootScope, $scope, $http, $location, toaster, $timeout,$mdDialog, $mdSidenav, MenuService){
	$scope.menu = MenuService;
	
	$scope.close = function() {
		$mdSidenav("navLeft").close();
	}
	$scope.isNavSelected = function (path) {
		return $location.path().indexOf(path, $location.path().length - path.length) !== -1;
	}
	
	this.menuClick = function(menu) {
		if($mdSidenav("navLeft").isLockedOpen()) {
			if(!menu.params) {
				menu.params = {};
			}
			$location.path(menu.path).search(menu.params);
		}
		else {
			$rootScope.isRouteLoading = true;
			$mdSidenav("navLeft").close().then(function(){
				$rootScope.isRouteLoading = false;
				if(!menu.params) {
					menu.params = {};
				}
				$location.path(menu.path).search(menu.params);
			});
			
//			$rootScope.isRouteLoading = true;
//			$mdSidenav("navLeft").close();
//			$timeout(function(){
//				$rootScope.isRouteLoading = false;
//				if(!menu.params) {
//					menu.params = {};
//				}
//				$location.path(menu.url).search(menu.params);
//			}, 1000)
		}
	}
	
	this.isOpen = function(menu) {
		return MenuService.isMenuSelected(menu)
 	}
	this.toggleOpen = function(menu) {
		MenuService.toggleSelectMenu(menu);
	}
	this.isSelected = function(menu) {
		return MenuService.isSelected(menu);
	}
	$rootScope.$on('$locationChangeSuccess', function(){
	});
});

