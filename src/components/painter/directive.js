'use strict';

angular.module('nodePainter')
  .directive('painter', function (tools, socket, globalConfig) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '=',
        socketdata: '='
      },
      templateUrl: 'components/painter/template.html',
      link: function (scope, elem, attr, ctrl) {
        scope.backData = [];
        scope.frontData = [];
        scope.middleData = [];
        scope.isDrawing = false;

        scope.$watch('data.bgColor', function (newVal, oldVal) {
          if (newVal == oldVal) return;

          scope.backData = [
            {'fillStyle': newVal},
            {'fillRect': [0, 0, 1024, 768]}
          ];

          var temp = [{'bgColor': newVal}];

          if (globalConfig.socket) {
            socket.emit('socketData', temp);
            scope.$emit('storagePush', temp);
          }
        });

        scope.$watch('data.strokeColor', function (newVal, oldVal) {
          if (newVal == oldVal) return;

          scope.frontData = [{'strokeStyle': newVal}];
          scope.middleData = [{'strokeStyle': newVal}];

          if (globalConfig.socket) {
            socket.emit('socketData', scope.middleData);
            scope.$emit('storagePush', scope.middleData);
          }
        });

        scope.$watch('data.strokeWidth', function (newVal, oldVal) {
          if (newVal == oldVal) return;

          scope.frontData = [{'lineWidth': newVal}];
          scope.middleData = [{'lineWidth': newVal}];

          if (globalConfig.socket) {
            socket.emit('socketData', scope.middleData);
            scope.$emit('storagePush', scope.middleData);
          }
        });

        scope.$watch('data.fontsize', function (newVal, oldVal) {
          if (newVal == oldVal) return;

          scope.frontData = [{'font': newVal + "px Arial"}];
          scope.middleData = [{'font': newVal + "px Arial"}];

          if (globalConfig.socket) {
            socket.emit('socketData', scope.middleData);
            scope.$emit('storagePush', scope.middleData);
          }
        });

        scope.$watch('data.clear', function (newVal, oldVal) {
          if (newVal == oldVal) return;

          scope.middleData = [{'clearRect': [0, 0, 1024, 768]}];
          scope.data.clear = false;

          if (globalConfig.socket) {
            socket.emit('socketData', scope.middleData);
          }
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

          if (globalConfig.socket) {
            socket.emit('socketData', scope.middleData);
            scope.$emit('storagePush', scope.middleData);
          }
        };

        if (globalConfig.socket) {
          var bgColorArr = [];
          scope.$on('socketData', function (event, msg) {
            if (!_.isUndefined(msg)) {
              var img;
              for (var i=0; i<msg.length; i++) {
                if (Object.keys(msg[i])[0] == 'bgColor') {
                  bgColorArr = [
                    {'fillStyle': msg[i]['bgColor']},
                    {'fillRect': [0, 0, 1024, 768]}
                  ];
                  msg.splice(i, 1);
                  i--;
                } else if(Object.keys(msg[i])[0] == 'drawImage') {
                  img = new Image();
                  img.src = msg[i]['drawImage'][0];
                  msg[i]['drawImage'][0] = img;
                }
              }

              if (bgColorArr.length) {
                scope.backData = bgColorArr;
              }

              scope.middleData = msg;
            }
          });
        }

        // 绘制图片
        scope.$watch('data.materialData', function (newVal, oldVal) {
          scope.middleData = newVal;
        });

      }
    };
  });
