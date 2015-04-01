'use strict';

angular.module('nodePainter')
  .factory('tools', function (pointer, line, straight, rect, oval, arrow, text, erase, clearRect) {
    return {
      'pointer': pointer,
      'line': line,
      'straight': straight,
      'rect': rect,
      'oval': oval,
      'arrow': arrow,
      'text': text,
      'erase': erase,
      'clearRect': clearRect
    }
  });
