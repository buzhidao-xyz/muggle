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

      //获取全部课程列表
      $scope.getCourseList = function () {
        var data = {
          page: 0,
          size: 0
        }
        var data = BaseCtrl.apiRequestData(data);
        $CourseService.getcourselist({}, data);

        $scope.$on('getcourselist.success', function (event, d) {
          $scope.$courseList = BaseCtrl.apiResult($CourseService.courselist);
        })
      }

      //获取我的课程列表
      $scope.getMyCourseList = function () {
        var data = {
          page: 0,
          size: 0,
          ty: 1
        }
        var data = BaseCtrl.apiRequestData(data);
        $CourseService.getmycourselist({}, data);
        //console.log('mycourse');
        $scope.$on('getmycourselist.success', function (event, d) {
          $scope.$mycourseList = BaseCtrl.apiResult($CourseService.mycourselist);
        })
      }

      //页面逻辑
      var path = ('current' in $route) ? $route.current.$$route.originalPath : '';
      switch (path) {
        case '/course':
          $scope.getCourseList();
          break;
        case '/mycourse':
          $scope.getMyCourseList();
          break;
        default:
          break;
      }
    }]);
