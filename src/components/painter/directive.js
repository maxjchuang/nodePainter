'use strict';

angular.module('nodePainter')
  .directive('painter', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'components/painter/template.html',
      link: function (scope, elem, attr, ctrl) {
        var ctx = elem[0].getContext('2d');
        var key;

        _.each(scope.data, function (item, index) {
          key = Object.keys(item)[0];
          if (_.isArray(item[key])) {
            ctx[key].apply(ctx, item[key]);
          } else {
            ctx[key] = item[key];
          }
        });

      }
    };
  });
