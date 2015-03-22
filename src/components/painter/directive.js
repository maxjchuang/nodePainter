'use strict';

angular.module('nodePainter')
  .directive('painter', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/painter/template.html',
      link: function (scope, elem, attr, ctrl) {
        var ctx = elem[0].getContext('2d');
        ctx.fillStyle='#FF0000';
        ctx.fillRect(0,0,80,100);
      }
    };
  });
