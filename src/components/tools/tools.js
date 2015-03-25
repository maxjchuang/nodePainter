'use strict';

angular.module('nodePainter')
  .factory('tools', function (line, straight) {
    return {
      'line': line,
      'straight': straight
    }
  });
