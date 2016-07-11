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
            // loadedSection.on('mouseover', function () {
              loadedSection.find("img.classsectionpic_img").hide();
              loadedSection.find("img.classsectionpic_img_hover").show();
              loadedSection.find(".classsectionword").fadeIn();
            // });
          }

          //第四屏动画效果
          if (index == 4) {
            // loadedSection.on('mouseover', function () {
              loadedSection.find("img.classsectionpic_img").hide();
              loadedSection.find("img.classsectionpic_img_hover").show();
              loadedSection.find(".functionsectionword").fadeIn();
            // });
          }

          //第五屏动画效果
          if (index == 5) {
            // loadedSection.on('mouseover', function () {
              loadedSection.find("img.classsectionpic_img").hide();
              loadedSection.find("img.classsectionpic_img_hover").show();
              loadedSection.find(".execsectionword").fadeIn();
            // });
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
          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('active', !(index == 1 && direction == 'down') && !(index >= 2 && nextIndex != 2 && direction == 'up'));

          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('moveDown', index == 1 && direction == 'down');

          $('.pythonimgbox img.pythonimg_P, .pythonimgbox img.pythonimg_Y, .pythonimgbox img.pythonimg_T, .pythonimgbox img.pythonimg_H, .pythonimgbox img.pythonimg_O, .pythonimgbox img.pythonimg_N')
          .toggleClass('moveUp', index >= 2 && direction == 'up');

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
