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
    '$location',
    '$cookies', function ($scope, $rootScope, $controller, $route, $routeParams, $location, $cookies) {
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

    //写入cookie-userinfo
    $scope.gsuserinfo = function ($userinfo) {
      if ($userinfo && ("id" in $userinfo) && $userinfo.id) {
        $cookies.putObject('userinfo', $userinfo);
      }

      $userinfo = $cookies.getObject('userinfo');

      return $userinfo;
    }

    //销毁cookie-userinfo
    $scope.ususerinfo = function () {
      $cookies.putObject('userinfo', {});
    }

    //登录验证
    $scope.checkLogin = function () {
      //获取userinfo
      $rootScope.$userinfo = $scope.gsuserinfo();

      if(!$rootScope.$userinfo || !("id" in $rootScope.$userinfo) || !$rootScope.$userinfo.id) {
        $location.path('/login');
      }
    }();

    //统一API返回数据处理方法
    $scope.apiResult = function (data, params) {
      return data.data;
    }

    return {
      gsuserinfo: $scope.gsuserinfo,
      ususerinfo: $scope.ususerinfo,
      apiResult: $scope.apiResult
    }
  }]);
