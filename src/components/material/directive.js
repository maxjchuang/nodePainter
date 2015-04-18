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
      }
    };
  });
