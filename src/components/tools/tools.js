'use strict';

angular.module('nodePainter')
  .factory('tools', function (line, straight, rect, oval, arrow, text) {
    return {
      'line': line,
      'straight': straight,
      'rect': rect,
      'oval': oval,
      'arrow': arrow,
      'text': text
    }
  });
