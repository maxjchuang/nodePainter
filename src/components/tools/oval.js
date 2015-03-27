'use strict';

angular.module('nodePainter')
  .factory('oval', function () {
    var front = [], middle = [];
    var init = {};

    //椭圆
    var oval = function  (data, x, y, width, height) {
      var k = (width/0.75)/2,
        w = width/2,
        h = height/2;
      data.push({'moveTo': [x, y-h]});
      data.push({'bezierCurveTo': [x+k, y-h, x+k, y+h, x, y+h]});
      data.push({'bezierCurveTo': [x-k, y+h, x-k, y-h, x, y-h]});
    }

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
          oval(front, init.x + (event.offsetX - init.x) / 2, init.y + (event.offsetY - init.y) / 2, event.offsetX - init.x, event.offsetY - init.y);
          front.push({'stroke': []});
          front.push({'closePath': []});

          return front;
        }
      },

      'mouseUp': function (scope, event) {
        oval(middle, init.x + (event.offsetX - init.x) / 2, init.y + (event.offsetY - init.y) / 2, event.offsetX - init.x, event.offsetY - init.y);
        middle.push({'stroke': []});
        middle.push({'closePath': []});

        return middle;
      }
    }
  });
