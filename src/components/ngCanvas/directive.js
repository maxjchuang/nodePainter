'use strict';

angular.module('nodePainter')
  .directive('ngCanvas', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'components/ngCanvas/template.html',
      link: function (scope, elem, attr, ctrl) {
        var ctx = elem[0].getContext('2d');
        var key;

        scope.$watch('data', function (newVal, oldVal) {
          _.each(newVal, function (item, index) {
            /*
            if (attr.data == 'frontData') {
              console.log(newVal);
              debugger;
            }
            */

            key = Object.keys(item)[0];
            if (_.isArray(item[key])) {
              ctx[key].apply(ctx, item[key]);
            } else {
              ctx[key] = item[key];
            }
          });
        });

      }
    };
  });
