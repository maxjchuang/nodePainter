'use strict';

angular.module('nodePainter')
  .controller('navCtrl', function ($scope, storage) {
    $scope.date = new Date();

    $scope.navs = storage.get('remoteData');
  });
