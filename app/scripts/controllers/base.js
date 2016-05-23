'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('BaseCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    '$route',
    '$routeParams',
    '$location', function ($scope, $rootScope, $controller, $route, $routeParams, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //监听事件 - apiRequest.failed
		$scope.$on('apiRequest.failed', function (event, d){
			var msg = '网络错误 请求失败！';
			alert(msg);
		});

    //登录验证
    $scope.checkLogin = function () {
      if(!$rootScope.$userinfo || !("id" in $rootScope.$userinfo) || !$rootScope.$userinfo.id) {
        $location.path('/login');
      }
    }
  }]);
