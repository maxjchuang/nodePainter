'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope) {
    $scope.drawData = [
      {fillStyle: '#FF00FF'},
      {fillRect: [100, 300, 500, 10]}
    ]
  });
