'use strict';

angular.module('nodePainter')
  .directive('closeBtn', function ($document) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.on('click', function(event) {
          scope.$emit('closeMaterial');
          event.stopPropagation();
        });
      }
    };
  });
