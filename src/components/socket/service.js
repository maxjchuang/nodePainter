'use strict';

angular.module('nodePainter')
  .factory('socket', function (socketFactory, globalConfig) {
    if (globalConfig.socket) {
      return socketFactory();
    } else {
      return null;
    }
  });
