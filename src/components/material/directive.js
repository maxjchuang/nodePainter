'use strict';

angular.module('nodePainter')
  .directive('material', function ($document) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        img: '='
      },
      templateUrl: 'components/material/template.html',
      link: function (scope, element, attr) {
        element.find('img').on('load', function (event) {
          element.find('.resize').css({
            left: element.find('img').width() - 5 + 'px',
            top: element.find('img').height() - 5 + 'px'
          });
        });

        scope.$on('resize', function (event, data) {
          element.find('img').css({
            width: data.width + 'px'
          });

          element.find('.resize').css({
            left: element.find('img').width() - 5 + 'px',
            top: element.find('img').height() - 5 + 'px'
          });
        });

        // 双击绘制图片到画板
        element.on('dblclick', function (event) {
          var ele = element.find('img'),
              img = new Image();
          img.src = ele.attr('src');

          var data = {
                img: img,
                x: element.offset().left - element.parent().offset().left,
                y: element.offset().top - element.parent().offset().top,
                width: ele.width(),
                height: ele.height()
              };
          debugger;
          scope.$emit('material', data);
        });
      }
    };
  });
