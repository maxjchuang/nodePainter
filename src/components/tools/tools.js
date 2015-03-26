'use strict';

angular.module('nodePainter')
  .factory('tools', function (line, straight, rect) {
    return {
      'line': line,
      'straight': straight,
      'rect': rect
    }
  });
