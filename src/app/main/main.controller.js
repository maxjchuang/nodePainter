'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope, socket) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20
    };

    socket.on('socketData', function (msg) {
      $scope.socketData = msg;
    });
  });
