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
    '$location', 
    '$cookies', function ($scope, $rootScope, $controller, $CourseService, $route, $routeParams, $location, $cookies) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //BaseCtrl
      var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

      if ($rootScope.locationflag) return true;

      //courseid
      $scope.courseid = $routeParams.courseid;
      //chapterid
      $scope.chapterid = $routeParams.chapterid;
      var $chapterid = $scope.GSChapterid($scope.courseid);
      if ($chapterid) $scope.chapterid = $chapterid;

      //课程-节信息
      $scope.$chapterinfo = {}

      //获取课程详情 - 目录章节信息
      $scope.doCourseView = function () {
        //章节菜单栏左右-收起/展开
        $scope.menuExpand = function (e) {
          var menuObj = $('#menu');
          var viewObj = $('#view');

          if (menuObj.css("display") == "block") {
            menuObj.animate({
              width: '0px'
            }, function () {
              menuObj.hide();
            });
            viewObj.animate({
              width: '1200px'
            });

            if ('videoid' in $scope.$chapterinfo) $(".videoview object").animate({height: "639px"});
          } else {
            menuObj.show();
            menuObj.animate({
              width: '300px'
            });
            viewObj.animate({
              width: '900px'
            });

            if ('videoid' in $scope.$chapterinfo) $(".videoview object").animate({height: "470px"});
          }
        }

        //章节菜单栏上下-收起/展开
        $scope.menuToggle = function (e) {
          var menuObj = $('#menu');

          if (menuObj.css("display") == "block") {
            menuObj.slideUp();
          } else {
            menuObj.slideDown();
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

        //menu滚动条模拟
        $scope.menuScroll = function () {
          setTimeout(function () {
            $("#menubox").mCustomScrollbar({
              axis: "y",
              theme: "minimal-dark",
              scrollbarPosition: "outside",
              scrollInertia: 0,
              scrollSpeed: 200,
              scrollAmount: 25,
              mouseWheelPixels: 25,
              mouseWheel:{ preventDefault: true }
            });
          }, 100);
        }

        //view滚动条模拟
        $scope.viewScroll = function () {
          setTimeout(function () {
            $("#cview").mCustomScrollbar({
              axis: "y",
              theme: "minimal-dark",
              scrollbarPosition: "outside",
              scrollInertia: 0,
              scrollSpeed: 200,
              scrollAmount: 25,
              mouseWheelPixels: 25
            });
          }, 100);
        }

        //课程视频初始化
        $scope.polyvInit = function (vid, w, h) {
          if (!vid) return false;
          $('#videoview').html(null);

          var w = w ? w : '100%';
          var h = h ? h : '0';
          setTimeout(function () {
            var player = polyvObject('#videoview').videoPlayer({
              'width': w,
              'height': h,
              'vid' : vid,
              'flashParams':{'wmode':'window','setScreen':'100','allowScriptAccess':'always','allowFullScreen':'true'}
            });
          }, 10);
        }

        //获取七牛markdown-html
        $scope.getqnmd = function (url) {
          $CourseService.getqnmd(url);
        }
        $scope.$on('getqnmd.success', function (event, d) {
          $scope.$chapterinfo.markdowncontent = $CourseService.qnmdhtml;
        });

        //获取课程-节信息
        $scope.getChapterInfo = function () {
          var data = {
            courseid: $scope.courseid,
            chapterid: $scope.chapterid
          }
          var data = BaseCtrl.apiRequestData(data);
          $CourseService.getchapterinfo({}, data);
        }
        //监听 - getchapterinfo.success
        $scope.$on('getchapterinfo.success', function (event, d) {
          $scope.$chapterinfo = BaseCtrl.apiResult($CourseService.chapterinfo);

          //上报已学习状态
          $scope.learnChapter();

          if ($scope.$chapterinfo.ty==1 || $scope.$chapterinfo==3) {
            $scope.getqnmd($scope.$chapterinfo.markdownurl);
          } else if ($scope.$chapterinfo.ty==2) {
            //课程视频初始化
            if (window.innerWidth >= 1200) {
              $scope.polyvInit($scope.$chapterinfo.videoid, '100%', '470');
            } else {
              $scope.polyvInit($scope.$chapterinfo.videoid, '100%', '0');
            }
          }
        });

        //上报已学习状态
        $scope.learnChapter = function () {
          var data = {
            courseid: $scope.courseid,
            chapterid: $scope.chapterid
          }
          var data = BaseCtrl.apiRequestData(data);
          $CourseService.learnchapter({}, data);
        }

        //章节内容浏览
        $scope.chapterview = function (e, courseid, chapterid) {
          var $this = $(e.target);

          if (!courseid || !chapterid) return false;

          $scope.GSChapterid(courseid, chapterid);
          $scope.courseid = courseid;
          $scope.chapterid = chapterid;

          if (window.innerWidth < 1200) {
            $scope.menuToggle();
          }

          $scope.getCourseInfo();
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
        //监听 - getcourseview.success
        $scope.$on('getcourseview.success', function (event, d) {
          $scope.$courseview = BaseCtrl.apiResult($CourseService.courseview);
          $scope.menuScroll();

          //遍历课程的章节信息
          var ai = 1;
          for (var k in $scope.$courseview.chapterIs) {
            var chapterIid = $scope.$courseview.chapterIs[k].chapterid;
            var lll = $scope.$courseview.chapterIIs[chapterIid].length;
            $scope.$courseview.chapterIs[k].jienum = lll;

            $scope.$courseview.chapterIs[k].expandclass = "";

            $scope.$courseview.chapterIs[k].zhangaclass = "learned";

            //遍历节信息
            var i = 1;
            for (var j in $scope.$courseview.chapterIIs[chapterIid]) {
              if ($scope.chapterid==$scope.$courseview.chapterIIs[chapterIid][j].chapterid || (!$scope.chapterid && ai==1 && i==1)) {
                $scope.$courseview.chapterIs[k].expandclass = "expand";
              }

              var classn = "";
              if (i==1) classn = "first";
              if (i==lll) classn = "last";
              if (lll==1) classn = "first last";
              $scope.$courseview.chapterIIs[chapterIid][j].classn = classn;
              i++;

              if ($scope.$courseview.chapterIIs[chapterIid][j].study==0) $scope.$courseview.chapterIs[k].zhangaclass = "";
            }

            ai++;
          }

          //章节ID
          if (!$scope.chapterid) {
            $scope.chapterid = $scope.$chapterinfo.chapterid;
            $scope.GSChapterid($scope.courseid, $scope.$chapterinfo.chapterid);
          }

          //页面location
          // if ($rootScope.path !== '/courseview/courseid/:courseid/chapterid/:chapterid') {
          //   $location.path('/courseview/courseid/'+$scope.courseid+'/chapterid/'+$scope.chapterid);
          //   return false;
          // }

          //获取课程-章节信息
          $scope.getChapterInfo();
        })

        $scope.getCourseInfo();
      }
      $scope.doCourseView();
    }]);
