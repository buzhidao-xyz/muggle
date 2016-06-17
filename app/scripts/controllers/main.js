'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('MainCtrl', [
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

    //BaseCtrl
    var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

    $location.path('/courseview/courseid/' + Api.default_courseid);
  }]);
