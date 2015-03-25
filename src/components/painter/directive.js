'use strict';

angular.module('nodePainter')
  .directive('painter', function (tools) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '=',
        tool: '@'
      },
      templateUrl: 'components/painter/template.html',
      link: function (scope, elem, attr, ctrl) {
        scope.backData = [
          {fillStyle: '#FF00FF'},
          {fillRect: [100, 300, 500, 10]}
        ];
        scope.frontData = [];
        scope.middleData = [];
        scope.isDrawing = false;

        scope.mouseDown = function (event) {
          scope.isDrawing = true;
          tools[scope.tool]['mouseDown'](scope, event);
        };

        scope.mouseMove = function (event) {
          scope.frontData = tools[scope.tool]['mouseMove'](scope, event);
        };

        scope.mouseUp = function (event) {
          scope.frontData = [{'clearRect': [0, 0, 1024, 768]}];

          scope.isDrawing = false;
          scope.middleData = tools[scope.tool]['mouseUp'](scope, event);
        };

      }
    };
  });
