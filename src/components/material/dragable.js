'use strict';

angular.module('nodePainter')
  .directive('dragable', function ($document) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          event.stopPropagation();
        });

        function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;

          element.css({
            top: y + 'px',
            left: x + 'px'
          });
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
