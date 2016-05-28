'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:CourseService
 * @description
 * # CourseService
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .service('CourseService', ['$rootScope', '$http', function ($rootScope, $http) {
    var service = {
      //courseist
      courselist: {},
      getcourselist: function (params, data) {
        var url = Api.host + Api.course.getcourselist.u;
        $http({
          method: Api.course.getcourselist.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.courselist = data;
          //广播事件 - getcourselist.success
          $rootScope.$broadcast('getcourselist.success');
        }).error(function (param, data) {
          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //courseview
      courseview: {},
      getcourseview: function (params, data) {
        var url = Api.host + Api.course.getcourseview.u;
        $http({
          method: Api.course.getcourseview.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.courseview = data;
          //广播事件 - getcourseview.success
          $rootScope.$broadcast('getcourseview.success');
        }).error(function (param, data) {
          //广播事件 - getcourseview.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //chapterinfo
      chapterinfo: {},
      getchapterinfo: function (params, data) {
        var url = Api.host + Api.course.getchapterinfo.u;
        $http({
          method: Api.course.getchapterinfo.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.chapterinfo = data;
          //广播事件 - getchapterinfo.success
          $rootScope.$broadcast('getchapterinfo.success');
        }).error(function (param, data) {
          //广播事件 - getchapterinfo.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //learnchapter
      learnchapter: function (params, data) {
        var url = Api.host + Api.course.learnchapter.u;
        $http({
          method: Api.course.learnchapter.m,
          url: url,
          params: params,
          data: data
        });
      }
    }
    return service;
  }]);
