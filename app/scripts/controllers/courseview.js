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
      $scope.courseid = $routeParams.courseid;
      //chapterid
      $scope.chapterid = $routeParams.chapterid;

      //课程-节信息
      $scope.$chapterinfo = {}

      //获取课程详情 - 目录章节信息
      $scope.doCourseView = function () {
        //章节菜单栏左右-收起/展开
        $scope.menuExpand = function (e) {
          var menuObj = $('#menu');
          var viewObj = $('#view');

          if (menuObj.css("display") == "block") {
            menuObj.hide();
            viewObj.removeClass('col-lg-9').addClass('col-lg-12');
          } else {
            menuObj.show();
            viewObj.removeClass('col-lg-12').addClass('col-lg-9');
          }
        }

        //章节菜单栏上下-收起/展开
        $scope.menuToggle = function (e) {
          var menuObj = $('#menu');
          var viewObj = $('#view');

          if (menuObj.css("display") == "block") {
            menuObj.slideUp();
            viewObj.removeClass('col-lg-9').addClass('col-lg-12');
          } else {
            menuObj.slideDown();
            viewObj.removeClass('col-lg-12').addClass('col-lg-9');
          }
        }

        //章节展开收缩
        $scope.zhangExpand = function (e) {
          var zhangObj = $(e.target).parents('.zhangbox');
          if (zhangObj.hasClass('expand')) {
            zhangObj.removeClass('expand');
          } else {
            zhangObj.addClass('expand');
          }
        }

        //view滚动条模拟
        $scope.viewScroll = function () {
          setTimeout(function () {
            $("#menubox").mCustomScrollbar({
              axis: "y",
              theme: "minimal-dark",
              scrollbarPosition: "outside",
              mouseWheel:{ scrollAmount: 650 },
              scrollButtons:{ scrollAmount: 650 }
            });

            $("#cview").mCustomScrollbar({
              axis: "y",
              theme: "minimal-dark",
              scrollbarPosition: "outside",
              mouseWheel:{ scrollAmount: 650 },
              scrollButtons:{ scrollAmount: 650 }
            });
          }, 100);
        }

        //获取课程信息
        $scope.getCourseInfo = function () {
          //getcourseview
          var data = {
            courseid: $scope.courseid
          }
          var data = BaseCtrl.apiRequestData(data);
          $CourseService.getcourseview({}, data);
        }

        //获取课程-节信息
        $scope.getChapterInfo = function () {
          var data = {
            courseid: $scope.courseid,
            chapterid: $scope.chapterid
          }
          var data = BaseCtrl.apiRequestData(data);
          $CourseService.getchapterinfo({}, data);

          //监听 - getchapterinfo.success
          $scope.$on('getchapterinfo.success', function (event, d) {
            $scope.$chapterinfo = BaseCtrl.apiResult($CourseService.chapterinfo);

            if ($scope.$chapterinfo.ty==1 || $scope.$chapterinfo==3) {
              // $scope.$chapterinfo.markdowncontent = unescape($scope.$chapterinfo.markdowncontent);
              
            } else if ($scope.$chapterinfo.ty==2) {
              //课程视频初始化
              var vid = $scope.$chapterinfo.videoid;
              var player = polyvObject('#videoview').videoPlayer({
                'width':'100%',
                'height':'0',
                'vid' : vid,
                'flashParams':{'wmode':'window','setScreen':'100','allowScriptAccess':'always','allowFullScreen':'true'}
              });
            }

            $scope.viewScroll();
          });
        }

        //上报已学习状态
        $scope.learnChapter = function () {
          var data = {
            courseid: $scope.courseid,
            chapterid: $scope.chapterid
          }
          var data = BaseCtrl.apiRequestData(data);
          $CourseService.learnchapter({}, data);
        }

        //获取课程信息
        $scope.getCourseInfo();

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

            //遍历节信息
            var i = 1;
            for (var j in $scope.$courseview.chapterIIs[chapterIid]) {
              if ((!$scope.chapterid && ai==1 && i==1) || ($scope.chapterid && $scope.$courseview.chapterIIs[chapterIid][j].chapterid==$scope.chapterid)) {
                $scope.$chapterinfo = $scope.$courseview.chapterIIs[chapterIid][j];
              }

              if ($scope.$chapterinfo.chapterid==$scope.$courseview.chapterIIs[chapterIid][j].chapterid) $scope.$courseview.chapterIs[k].expandclass = "expand";

              var classn = "";
              if (i==1) classn = "first";
              if (i==lll) classn = "last";
              if (lll==1) classn = "first last";
              $scope.$courseview.chapterIIs[chapterIid][j].classn = classn;
              i++;
            }

            ai++;
          }

          //章节ID
          $scope.chapterid = $scope.chapterid ? $scope.chapterid : $scope.$chapterinfo.chapterid;

          //获取课程-章节信息
          $scope.getChapterInfo();

          //上报已学习状态
          if ($scope.$chapterinfo.study==0) $scope.learnChapter();
        })
      }
      $scope.doCourseView();

      //视频播放器对象
      $scope.videoViewClass = function () {

      }
      $scope.videoViewClass();

    }]);
