'use strict';

angular.module('nodePainter')
  .factory('clearRect', function () {
    var front = [], middle = [];
    var init = {};

    return {
      'mouseDown': function (scope, event) {
        init.x = event.offsetX;
        init.y = event.offsetY;

        middle = [];
      },
      
      'mouseMove': function (scope, event) {
        scope.x = event.offsetX;
        scope.y = event.offsetY;
        
        if (scope.isDrawing) {
          front = [];
          front.push({'clearRect': [0, 0, 1024, 768]});
          front.push({'lineWidth': '1'});
          front.push({'beginPath': []});
          front.push({'rect': [init.x, init.y, event.offsetX - init.x, event.offsetY - init.y]});
          front.push({'stroke': []});
          front.push({'closePath': []});

          return front;
        }
      },

      'mouseUp': function (scope, event) {
        scope.frontData.push({'lineWidth': scope.data.strokeWidth});
        middle.push({'clearRect': [init.x, init.y, event.offsetX - init.x, event.offsetY - init.y]});

        return middle;
      }
    }
  });
