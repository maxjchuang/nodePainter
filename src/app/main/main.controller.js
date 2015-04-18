'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope, socket, globalConfig) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20
    };

    $scope.material = 'assets/images/angular.png';

    if (globalConfig.socket) {
      socket.on('socketData', function (msg) {
        $scope.socketData = msg;
      });
    }
  });
