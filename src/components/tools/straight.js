'use strict';

angular.module('nodePainter')
  .factory('straight', function () {
    var front = [], middle = [];
    var line = {};

    return {
      'mouseDown': function (scope, event) {
        line.x = event.offsetX;
        line.y = event.offsetY;

        middle = [];
        middle.push({'beginPath': []});
        middle.push({'moveTo': [event.offsetX, event.offsetY]});
      },
      
      'mouseMove': function (scope, event) {
        scope.x = event.offsetX;
        scope.y = event.offsetY;
        
        if (scope.isDrawing) {
          front = [];
          front.push({'clearRect': [0, 0, 1024, 768]});
          front.push({'beginPath': []});
          front.push({'moveTo': [line.x, line.y]});
          front.push({'lineTo': [event.offsetX, event.offsetY]});
          front.push({'stroke': []});
          front.push({'closePath': []});

          return front;
        }
      },

      'mouseUp': function (scope, event) {
        middle.push({'lineTo': [event.offsetX, event.offsetY]});
        middle.push({'stroke': []});
        middle.push({'closePath': []});

        return middle;
      }
    }
  });
