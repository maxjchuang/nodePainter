'use strict';

angular.module('nodePainter')
  .factory('erase', function () {
    var front = [], middle = [];
    var eraseWidth= 10;

    return {
      'mouseDown': function (scope, event) {
        eraseWidth = scope.data.strokeWidth * 10;

        scope.middleData = [{'clearRect': [event.offsetX, event.offsetY, eraseWidth, eraseWidth]}];
      },
      
      'mouseMove': function (scope, event) {
        front = [];
        front.push({'clearRect': [0, 0, 1024, 768]});
        front.push({'fillRect': [event.offsetX, event.offsetY, eraseWidth, eraseWidth]});

        if (scope.isDrawing) {
          scope.middleData = [{'clearRect': [event.offsetX, event.offsetY, eraseWidth, eraseWidth]}];
          middle.push({'clearRect': [event.offsetX, event.offsetY, eraseWidth, eraseWidth]});
        }

        return front;
      },

      'mouseUp': function (scope, event) {
        return middle;
      }
    }
  });
