'use strict';

angular.module('nodePainter')
  .factory('text', function () {
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
        
        front = [];
        front.push({'clearRect': [0, 0, 1024, 768]});
        front.push({'fillStyle': scope.data.strokeColor});
        front.push({'fillText': [scope.data.text, event.offsetX, event.offsetY]});

        return front;
      },

      'mouseUp': function (scope, event) {
        middle.push({'fillStyle': scope.data.strokeColor});
        middle.push({'fillText': [scope.data.text, event.offsetX, event.offsetY]});

        return middle;
      }
    }
  });
