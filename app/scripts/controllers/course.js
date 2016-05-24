'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('CourseCtrl', [
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

  }]);
