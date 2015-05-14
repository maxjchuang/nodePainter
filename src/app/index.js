'use strict';

angular.module('nodePainter', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'colorpicker.module', 'ui-rangeSlider', 'ngPopover', 'btford.socket-io', 'angularLocalStorage', 'lr.upload'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('local', {
        url: '/',
        templateUrl: 'app/local/template.html',
        controller: 'localCtrl'
      })

      .state('remote', {
        url: '/remote/:painterId',
        templateUrl: 'app/remote/template.html',
        controller: 'remoteCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
