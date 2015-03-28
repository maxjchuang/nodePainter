'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope) {
    $scope.drawData = {
      tool: 'line',
      bgColor: '#fff',
      strokeColor: '#000'
    }
  });
