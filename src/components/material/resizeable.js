'use strict';

angular.module('nodePainter')
  .directive('resizeable', function ($document) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        var startX = 0, x = 0, firstFlag = true;

        element.on('mousedown', function(event) {
          if (firstFlag) {
            x = element.offset().left - element.parent().offset().left;
            firstFlag = false;
          }

          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);

          event.stopPropagation();
        });

        function mousemove(event) {
          x = event.pageX - startX;

          var width = x;
          scope.$emit('resize', {width: width});

          event.stopPropagation();
        }

        function mouseup(event) {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);

          event.stopPropagation();
        }
      }
    };
  });
