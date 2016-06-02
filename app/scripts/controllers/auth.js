'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('AuthCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    'AuthService',
    '$route',
    '$routeParams',
    '$location',
    function ($scope, $rootScope, $controller, $AuthService, $route, $routeParams, $location) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //BaseCtrl
      var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

      //location:courseview
      $scope.courseview = function () {
        $location.path('/courseview/courseid/' + $scope.courseid);
      }

      //doAuthLogin
      $scope.doAuthLogin = function () {
        $scope.token = ('token' in $routeParams) ? $routeParams.token : '';
        $scope.courseid = ('courseid' in $routeParams) ? $routeParams.courseid : '';

        if (!$scope.token || !$scope.courseid) return false;

        $scope.authlogin = function () {
          var data = {
            token: $scope.token
          }
          var data = BaseCtrl.apiRequestData(data);
          $AuthService.authlogin({}, data);
        }();

        //事件监听 - authlogin.success
        $scope.$on('authlogin.success', function (event, d) {
          //API返回数据统一处理
          $scope.$userinfo = BaseCtrl.apiResult($AuthService.userinfo);

          //记录用户信息-cookie
          BaseCtrl.gsuserinfo($scope.$userinfo);

          //如果有courseid
          if ($scope.courseid) $scope.courseview();
        });
      }
      $scope.doAuthLogin();
    }]);
