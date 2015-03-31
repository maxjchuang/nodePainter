'use strict';

angular.module('nodePainter')
  .factory('tools', function (line, straight, rect, oval, arrow) {
    return {
      'line': line,
      'straight': straight,
      'rect': rect,
      'oval': oval,
      'arrow': arrow
    }
  });
