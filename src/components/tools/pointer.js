'use strict';

angular.module('nodePainter')
  .factory('pointer', function () {

    return {
      'mouseDown': function (scope, event) {
      },
      
      'mouseMove': function (scope, event) {
        return [];
      },

      'mouseUp': function (scope, event) {
        return [];
      }
    }
  });
