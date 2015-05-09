'use strict';

angular.module('nodePainter')
  .directive('materialList', function ($document) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/material/list.html',
      link: function (scope, element, attr) {
        scope.materials = [
          {src: 'assets/images/angular.png'}, 
          {src: 'assets/images/gulp.png'}, 
          {src: 'assets/images/yeoman.png'},
          {src: 'assets/images/karma.png'},
          {src: 'assets/images/jquery.jpg'},
          {src: 'assets/images/less.png'}
        ];

        scope.materialSelect = function (item) {
          scope.$emit('materialSelect', item.src);
        };

        scope.onSuccess= function (response) {
          scope.$emit('materialSelect', response.data.src);
        };
      }
    };
  });
