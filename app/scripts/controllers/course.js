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
    'CourseService',
    '$route',
    '$routeParams',
    '$location', function ($scope, $rootScope, $controller, $CourseService, $route, $routeParams, $location) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //BaseCtrl
      var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

      $scope.doCourseList = function () {
        var data = {
          page: 0,
          size: 0
        }
        $CourseService.getcourselist({}, data);
      }

      $scope.$on('courses.success', function (event, d) {
        $scope.courseList = BaseCtrl.apiResult($CourseService.courselist);
      })
      $scope.doCourseList();
    }]);
