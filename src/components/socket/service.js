'use strict';

angular.module('nodePainter')
  .factory('socket', function (socketFactory) {
    return socketFactory();
  });
