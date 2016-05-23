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
  .config(function ($routeProvider) {
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
        controller: 'LessonCtrl',
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

  });
