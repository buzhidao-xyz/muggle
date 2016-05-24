'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('UserCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    'UserService',
    '$route',
    '$routeParams',
    '$location', function ($scope, $rootScope, $controller, $UserService, $route, $routeParams, $location) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //BaseCtrl
      var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

      //doLogin
      $scope.doLogin = function () {
        //点击事件 - login
        $scope.login = function () {
          var phone = $("form[name=loginform] input[name=phone]").val();
          var password = $("form[name=loginform] input[name=password]").val();
          var data = {
            phone: phone,
            password: password
          }
          $UserService.login({}, data);
        }
        //事件监听 - login.success
        $scope.$on('login.success', function (event, d) {
          //API返回数据统一处理
          $scope.$userinfo = BaseCtrl.apiResult($UserService.userinfo);
          //记录用户信息-cookie
          BaseCtrl.gsuserinfo($scope.$userinfo);
        });
      }
      $scope.doLogin();

        $scope.logout2 = function () {
          alert(1111);
        }
    }]);
