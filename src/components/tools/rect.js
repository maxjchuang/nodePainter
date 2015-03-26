'use strict';

angular.module('nodePainter')
  .factory('rect', function () {
    var front = [], middle = [];
    var init = {};

    return {
      'mouseDown': function (scope, event) {
        init.x = event.offsetX;
        init.y = event.offsetY;

        middle = [];
        middle.push({'beginPath': []});
      },
      
      'mouseMove': function (scope, event) {
        scope.x = event.offsetX;
        scope.y = event.offsetY;
        
        if (scope.isDrawing) {
          front = [];
          front.push({'clearRect': [0, 0, 1024, 768]});
          front.push({'beginPath': []});
          front.push({'rect': [init.x, init.y, event.offsetX - init.x, event.offsetY - init.y]});
          front.push({'stroke': []});
          front.push({'closePath': []});

          return front;
        }
      },

      'mouseUp': function (scope, event) {
        middle.push({'rect': [init.x, init.y, event.offsetX - init.x, event.offsetY - init.y]});
        middle.push({'stroke': []});
        middle.push({'closePath': []});

        return middle;
      }
    }
  });
