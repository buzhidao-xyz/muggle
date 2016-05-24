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
      courselist: {},
      getcourselist: function (param, data) {
        var url = Api.host + Api.course.getcourselist.u;
        $http({
          merthod: Api.course.getcourselist.m,
          url: url,
          param: param,
          data: data
        }).success(function (data, status) {
          service.courselist = data;
          //广播事件 - courselist.success
          $rootScope.$broadcast('courselist.success');
        }).error(function (param, data) {
          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      }
    }
    return service;
  }]);