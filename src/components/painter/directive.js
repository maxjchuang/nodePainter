'use strict';

angular.module('nodePainter')
  .directive('painter', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
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
        var tempFront = [], tempMiddle = [];
        var line = {};

        scope.mouseMove = function (event) {
          scope.x = event.offsetX;
          scope.y = event.offsetY;
          
          if (scope.isDrawing) {
            tempFront = [];
            tempFront.push({'beginPath': []});
            tempFront.push({'moveTo': [line.x, line.y]});
            tempFront.push({'lineTo': [event.offsetX, event.offsetY]});
            tempFront.push({'stroke': []});
            tempFront.push({'closePath': []});
            scope.frontData = tempFront;
            line.x = event.offsetX;
            line.y = event.offsetY;

            tempMiddle.push({'lineTo': [event.offsetX, event.offsetY]});
          }
        };

        scope.mouseDown = function (event) {
          scope.isDrawing = true;
          line.x = event.offsetX;
          line.y = event.offsetY;

          tempMiddle = [];
          tempMiddle.push({'beginPath': []});
          tempMiddle.push({'moveTo': [event.offsetX, event.offsetY]});
        };

        scope.mouseUp = function (event) {
          scope.isDrawing = false;

          tempMiddle.push({'stroke': []});
          tempMiddle.push({'closePath': []});
          scope.middleData = tempMiddle;
        };

      }
    };
  });
