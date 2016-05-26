'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:CourseViewCtrl
 * @description
 * # CourseViewCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('CourseViewCtrl', [
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

      //获取课程详情
      $scope.doCourseView = function () {
        //courseid
        var courseid = $location.search().courseid;

        var data = {
          courseid: courseid
        }
        //getcourseview
        $CourseService.getcourseview({}, data);

        //监听-coursesview.success
        $scope.$on('coursesview.success', function (event, d) {
          $scope.$courseview = BaseCtrl.apiResult($CourseService.courseview);
        })
      }
      $scope.doCourseView();

    }]);
