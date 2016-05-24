'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .service('UserService', ['$rootScope', '$http', function ($rootScope, $http) {
    var service = {
      //API - login
      userinfo: {},
      login: function (params, data) {
        var url = Api.host + Api.user.login.u;
        $http({
          method: Api.user.login.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.userinfo = data;

          //广播事件 - login.success
          $rootScope.$broadcast('login.success');
        }).error(function (data, status) {
          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      coursesinfo: {},
      courseList: function (param, data) {
        var url = Api.host + Api.courses.u;
        $http({
          merthod: Api.courses.m,
          url: url,
          param: param,
          data: data
        }).success(function (data, status) {
          service.coursesinfo = data;
          //广播事件 - login.success
          $rootScope.$broadcast('courses.success');
        }).error(function (param, data) {
          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      logout: function (param, data) {
        var url = Api.host + Api.user.logout.u;
        $http({
          merthod: Api.user.logout.m,
          url: url,
          param: param,
          data: data
        }).success(function (data, status) {
          //广播事件 - logout.success
          $rootScope.$broadcast('logout.success');
        }).error(function (data, status) {
          $rootScope.$broadcast('apiRequest.failed');
        });
      }
    }
    return service;
  }]);
