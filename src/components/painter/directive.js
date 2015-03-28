'use strict';

angular.module('nodePainter')
  .directive('painter', function (tools) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '=',
      },
      templateUrl: 'components/painter/template.html',
      link: function (scope, elem, attr, ctrl) {
        scope.backData = [];
        scope.frontData = [];
        scope.middleData = [];
        scope.isDrawing = false;

        scope.$watch('data.bgColor', function (newVal, oldVal) {
          scope.backData = [
            {'fillStyle': newVal},
            {'fillRect': [0, 0, 1024, 768]}
          ];
        });

        scope.$watch('data.strokeColor', function (newVal, oldVal) {
          scope.frontData = [{'strokeStyle': newVal}];
          scope.middleData = [{'strokeStyle': newVal}];
        });

        scope.mouseDown = function (event) {
          scope.isDrawing = true;
          tools[scope.data.tool]['mouseDown'](scope, event);
        };

        scope.mouseMove = function (event) {
          scope.frontData = tools[scope.data.tool]['mouseMove'](scope, event);
        };

        scope.mouseUp = function (event) {
          scope.frontData = [{'clearRect': [0, 0, 1024, 768]}];

          scope.isDrawing = false;
          scope.middleData = tools[scope.data.tool]['mouseUp'](scope, event);
        };

      }
    };
  });
