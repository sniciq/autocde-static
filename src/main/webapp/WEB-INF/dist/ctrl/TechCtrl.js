angular.module("myApp").controller("TechCtrl",["$rootScope","$scope","$location","$routeParams","$http","$anchorScroll",function(a,l,n,r,t,u){l.techs={left:[{id:1,createType:1,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""},{id:2,createType:0,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""}],right:[{id:3,createType:1,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""},{id:4,createType:0,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""},{id:5,createType:1,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""},{id:6,createType:0,title:"Angular js动态加载",content:"Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载Angular js动态加载,Angular js动态加载,Angular js动态加载",detailPath:""}]},l.showDetail=function(){n.path("/tech_detail").search({})}}]),angular.module("myApp").controller("TechDetailCtrl",["$rootScope","$scope","$location","$routeParams","$http","$anchorScroll",function(a,l,n,r,t,u){console.log(12)}]);