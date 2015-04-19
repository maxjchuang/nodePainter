'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope, socket, globalConfig) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20,
      materialData: []
    };

    $scope.material = 'assets/images/angular.png';

    if (globalConfig.socket) {
      socket.on('socketData', function (msg) {
        $scope.socketData = msg;
      });
    }

    $scope.$on('material', function (event, data) {
      var arr = [];
      arr.push({'drawImage': [data.img, data.x, data.y, data.width, data.height]});
      $scope.drawData.materialData = arr;
      $scope.$apply();
    });

  });
