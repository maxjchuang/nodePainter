'use strict';

angular.module('nodePainter')
  .factory('arrow', function () {
    var front = [], middle = [];
    var init = {};

    /**
     * 椭圆
     * @param data 绘图数据
     * @param b 箭头夹角（度数）
     * @param r 半径
     **/
    var arrow = function  (data, p1, p2, b, r) {
      r = p1.x > p2.x ? r : -r;
      var angle = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) * 180 / Math.PI,
          p3 = {
            x: Math.cos((angle - b) * Math.PI / 180) * r + p2.x,
            y: Math.sin((angle - b) * Math.PI / 180) * r + p2.y
          },
          p4 = {
            x: Math.cos((angle + b) * Math.PI / 180) * r + p2.x,
            y: Math.sin((angle + b) * Math.PI / 180) * r + p2.y
          };

      data.push({'moveTo': [p1.x, p1.y]});
      data.push({'lineTo': [p2.x, p2.y]});

      data.push({'moveTo': [p2.x, p2.y]});
      data.push({'lineTo': [p3.x, p3.y]});

      data.push({'moveTo': [p2.x, p2.y]});
      data.push({'lineTo': [p4.x, p4.y]});
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
          arrow(front, {x: init.x, y:init.y}, {x: event.offsetX, y: event.offsetY}, 30, 10 * scope.data.strokeWidth);
          front.push({'stroke': []});
          front.push({'closePath': []});

          return front;
        }
      },

      'mouseUp': function (scope, event) {
        arrow(middle, {x: init.x, y:init.y}, {x: event.offsetX, y: event.offsetY}, 30, 10 * scope.data.strokeWidth);
        middle.push({'stroke': []});
        middle.push({'closePath': []});

        return middle;
      }
    }
  });
