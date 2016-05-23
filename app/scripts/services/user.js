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
		login: function (params, data){
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
		}
  	}
  	return service;
  }]);
