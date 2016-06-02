'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:AuthService
 * @description
 * # AuthService
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .service('AuthService', ['$rootScope', '$http', function ($rootScope, $http) {
    var service = {
      //API - authlogin
      userinfo: {},
      authlogin: function (params, data) {
        var url = Api.host + Api.user.authlogin.u;
        $http({
          method: Api.user.authlogin.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.userinfo = data;

          //广播事件 - authlogin.success
          $rootScope.$broadcast('authlogin.success');
        }).error(function (data, status) {
          service.userinfo = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      }
    }
    return service;
  }]);
