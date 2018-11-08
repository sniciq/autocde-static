angular.module('ac.util.commonfilter',[])
.filter('urlencode', function() {
	return function(v) {
		return encodeURI(encodeURI(v));
	}
})
.filter('xsTxtLimit', ['$mdMedia', function($mdMedia) {
	return function(v, limit) {
		if($mdMedia('gt-xs')) {
			return v;
		}
		if(v == null || v == undefined) {
			return '';
		}
		var len = 0;
		var temp = '';
		for (var i = 0; i < v.length; i++) {
			if(len >= limit) {
				temp += '...';
				break;
			}
			if(v.charCodeAt(i)>255) {
				len += 2;
			}
			else {
				len += 1;
			}
			temp += v.charAt(i);
		}
		return temp;
	}
}])
;