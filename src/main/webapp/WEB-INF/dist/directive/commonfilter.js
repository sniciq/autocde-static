angular.module("ac.util.commonfilter",[]).filter("urlencode",function(){return function(r){return encodeURI(encodeURI(r))}}).filter("xsTxtLimit",["$mdMedia",function(r){return function(n,e){if(r("gt-xs"))return n;if(null==n||void 0==n)return"";for(var t=0,i="",u=0;u<n.length;u++){if(t>=e){i+="...";break}t+=n.charCodeAt(u)>255?2:1,i+=n.charAt(u)}return i}}]);