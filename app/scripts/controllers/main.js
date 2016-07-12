'use strict';

/**
 * @ngdoc function
 * @name muggleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muggleApp
 */
angular.module('muggleApp')
  .controller('MainCtrl', [
  	'$scope',
  	'$rootScope',
  	'$controller',
  	'$route',
  	'$routeParams',
  	'$location', function ($scope, $rootScope, $controller, $route, $routeParams, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //BaseCtrl
    var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

    //初始化fullpage
    $scope.fullpageInit = function () {
      $('#CourseContainer').fullpage({
        'verticalCentered': false,
        'css3': true,
        'sectionsColor': ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#F5F5F5'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': [],

        'afterLoad': function(anchorLink, index){
          if (index==1) {
            $("#fp-nav ul li a").attr('href', 'javascript:;');
            $("#CourseContainer .section .next").unbind('click');
            $("#CourseContainer .section .next").click(function (){
              $.fn.fullpage.moveSectionDown();
            });
          }

          var loadedSection = $(this);

          //第三屏动画效果
          if (index == 3) {
            loadedSection.find("img.classsectionpic_img_hover").fadeIn();
            loadedSection.find(".classsectionbox").on('mouseover', function () {
              loadedSection.find(".classsectionword").fadeIn();
            });
          }

          //第四屏动画效果
          if (index == 4) {
            loadedSection.find("img.classsectionpic_img_hover").fadeIn();
            loadedSection.find(".functionsectionbox").on('mouseover', function () {
              loadedSection.find(".functionsectionword").fadeIn();
            });
          }

          //第五屏动画效果
          if (index == 5) {
            loadedSection.find("img.classsectionpic_img_hover").fadeIn();
            loadedSection.find(".execsectionbox").on('mouseover', function () {
              loadedSection.find(".execsectionword").fadeIn();
            });
          }

          //第六屏动画
          if (index == 6) {
            loadedSection.find(".personbox").hover(function () {
              $(this).addClass('personboxactive');
            }, function () {
              $(this).removeClass('personboxactive');
            });
          }

          //第七屏
          if (index == 7) {
          }
        },

        'onLeave': function(index, nextIndex, direction) {
          var sectionHeight = parseInt($("#CourseContainer .section").css("height"));

          //PYTHON文字滑动
          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('active', !(index == 1 && direction == 'down') && !(index >= 2 && nextIndex != 2 && direction == 'up'));

          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('moveDown', index == 1 && direction == 'down');

          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('moveUp', index >= 2 && direction == 'up');

          //JS控制滑动效果
          var baseSectionHeight = 979, baseMarginTop = 1000;
          var basePtranslateP = 930, basePtranslateY = 795, basePtranslateT = 945, basePtranslateH = 422, basePtranslateO = 722, basePtranslateN = 475;
          var offsetHeight = sectionHeight-baseSectionHeight;
          //active
          if (!(index == 1 && direction == 'down') && !(index >= 2 && nextIndex != 2 && direction == 'up')) {
            $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N').css({
              "margin-top": (baseMarginTop+offsetHeight)+"px"
            });
          } else {
            $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N').css({
              "margin-top": ""
            });
          }
          //下滑
          if (index == 1 && direction == 'down') {
            $('.pythonimgbox img.pythonimg_P').css({
              "-webkit-transform": "translate(-119px, "+(basePtranslateP+offsetHeight)+"px)",
              "-ms-transform": "translate(-119px, "+(basePtranslateP+offsetHeight)+"px)",
              "transform": "translate(-119px, "+(basePtranslateP+offsetHeight)+"px)"
            });
            $('.pythonimgbox img.pythonimg_Y').css({
              "-webkit-transform": "translate(-360px, "+(basePtranslateY+offsetHeight)+"px)",
              "-ms-transform": "translate(-360px, "+(basePtranslateY+offsetHeight)+"px)",
              "transform": "translate(-360px, "+(basePtranslateY+offsetHeight)+"px)"
            });
            $('.pythonimgbox img.pythonimg_T').css({
              "-webkit-transform": "translate(-630px, "+(basePtranslateT+offsetHeight)+"px)",
              "-ms-transform": "translate(-630px, "+(basePtranslateT+offsetHeight)+"px)",
              "transform": "translate(-630px, "+(basePtranslateT+offsetHeight)+"px)"
            });
            $('.pythonimgbox img.pythonimg_H').css({
              "-webkit-transform": "translate(7px, "+(basePtranslateH+offsetHeight)+"px)",
              "-ms-transform": "translate(7px, "+(basePtranslateH+offsetHeight)+"px)",
              "transform": "translate(7px, "+(basePtranslateH+offsetHeight)+"px)"
            });
            $('.pythonimgbox img.pythonimg_O').css({
              "-webkit-transform": "translate(-635px, "+(basePtranslateO+offsetHeight)+"px)",
              "-ms-transform": "translate(-635px, "+(basePtranslateO+offsetHeight)+"px)",
              "transform": "translate(-635px, "+(basePtranslateO+offsetHeight)+"px)"
            });
            $('.pythonimgbox img.pythonimg_N').css({
              "-webkit-transform": "translate(-265px, "+(basePtranslateN+offsetHeight)+"px)",
              "-ms-transform": "translate(-265px, "+(basePtranslateN+offsetHeight)+"px)",
              "transform": "translate(-265px, "+(basePtranslateN+offsetHeight)+"px)"
            });
          } else {
            $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N').css({
              "-webkit-transform": "",
              "-ms-transform": "",
              "transform": ""
            });
          }
        }
      });
      $("#fp-nav ul li").each(function () {
        if ($(this).index()>=7) $(this).remove();
      });
      $("#fp-nav").css({
        "margin-top": "-73.5px"
      });
    }();
  }]);
