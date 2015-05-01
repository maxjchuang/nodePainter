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

    $scope.material = false;

    if (globalConfig.socket) {
      socket.on('socketData', function (msg) {
        $scope.$broadcast('socketData', msg);
      });
    }

    $scope.$on('material', function (event, data) {
      var arr = [];
      arr.push({'drawImage': [data.img, data.x, data.y, data.width, data.height]});
      $scope.drawData.materialData = arr;
      $scope.$apply();
      arr[0]['drawImage'][0] = data.img.src;
      socket.emit('socketData', arr);
    });


    $scope.$on('materialSelect', function (event, data) {
      $scope.material = data;
    });

    $scope.$on('closeMaterial', function (event, data) {
      $scope.material = false;
      $scope.$apply();
    });

    $scope.$watch('drawData.tool', function (newVal, oldVal) {
      $scope.material = false;
    });

  });
