'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('HeaderCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    'UserService',
    '$route',
    '$routeParams',
    '$location',
    function ($scope, $rootScope, $controller, $UserService, $route, $routeParams, $location) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //BaseCtrl
      var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});
      
      $scope.doLogout = function () {
        $scope.logout = function () {
          var data = BaseCtrl.apiRequestData({});
          $UserService.logout({},data);
          BaseCtrl.ususerinfo();

           $location.path('/login');
          location.reload();
        }
      }
      $scope.doLogout();
    }]);
