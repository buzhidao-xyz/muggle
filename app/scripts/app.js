'use strict';

/**
 * @ngdoc overview
 * @name muggleApp
 * @description
 * # muggleApp
 *
 * Main module of the application.
 */
angular
  .module('muggleApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .factory('UserInterceptor', ["$q","$rootScope",function ($q, $rootScope) {
    return {
      request: function (config) {
        return config;
      },
      response: function (response) {
        return response;
      },
      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      responseError: function (rejection) {
        return $q.reject(rejection);
      }
    }
  }])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/tutorial', {
        templateUrl: 'views/tutorial.html',
        controller: 'TutorialCtrl',
        controllerAs: 'tutorial'
      })
      .when('/course', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        controllerAs: 'course'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $httpProvider.interceptors.push('UserInterceptor');
  }).run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {
    //监听事件 - 路由切换开始
    $rootScope.$on('$routeChangeStart', function (){
      
    });
    //监听事件 - 路由切换成功
    $rootScope.$on('$routeChangeSuccess', function (){
      
    });
  }]);
