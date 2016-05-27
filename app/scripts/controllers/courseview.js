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

      //courseid
      var courseid = $location.search().courseid;
      //chapterid
      var chapterid = $location.search().chapterid;

      //课程-节信息
      $scope.chapterinfo = {}

      //获取课程详情
      $scope.doCourseView = function () {
        var data = {
          id: courseid
        }
        var data = BaseCtrl.apiRequestData(data);
        //getcourseview
        $CourseService.getcourseview({}, data);

        //监听 - getcourseview.success
        $scope.$on('getcourseview.success', function (event, d) {
          $scope.$courseview = BaseCtrl.apiResult($CourseService.courseview);

          //遍历课程的章节信息
          var ai = 1;
          for (var k in $scope.$courseview.chapterIs) {
            var chapterIid = $scope.$courseview.chapterIs[k].chapterid;
            var lll = $scope.$courseview.chapterIIs[chapterIid].length;
            $scope.$courseview.chapterIs[k].jienum = lll;

            $scope.$courseview.chapterIs[k].expandclass = "";
            if (ai==1) $scope.$courseview.chapterIs[k].expandclass = "expand";

            //遍历节信息
            var i = 1;
            for (var j in $scope.$courseview.chapterIIs[chapterIid]) {
              if (ai==1 && i==1) $scope.chapterinfo = $scope.$courseview.chapterIIs[chapterIid][j];

              var classn = "";
              if (i==1) classn = "first";
              if (i==lll) classn = "last";
              if (lll==1) classn = "first last";
              $scope.$courseview.chapterIIs[chapterIid][j].classn = classn;
              i++;
            }

            ai++;
          }

          //获取课程-节信息
          $scope.chapterid = $scope.chapterinfo.chapterid;
          console.log($scope.chapterid);
        })
      }
      $scope.doCourseView();

      //视频播放
      $scope.videoViewClass = function () {
        var player = polyvObject('#videoview').videoPlayer({
          'width':'815',
          'height':'458',
          'vid' : '93d816c8ccec0d19784cf4f277d9b4fa_9'
        });
      }
      $scope.videoViewClass();

    }]);
