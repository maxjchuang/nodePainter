'use strict';

angular.module('nodePainter')
  .controller('localCtrl', function ($scope, $timeout, $document, localStorage, upload, globalConfig) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20,
      materialData: []
    };

    $scope.$on('storagePush', function (event, data) {
      localStorage.push('localData', data);
    });

    $scope.$on('clearStorage', function (event, data) {
      localStorage.clear('localData');
    });

    $timeout(function () {
      if (localStorage.get('localData') !== null) {
        $scope.$broadcast('socketData', localStorage.get('localData'));
      }

      $document.on('paste', function (event) {
        var clipboard = event.originalEvent.clipboardData;
        for(var i=0,len=clipboard.items.length; i<len; i++) {
          if(clipboard.items[i].kind == 'file' || clipboard.items[i].type.indexOf('image') > -1) {
            var imageFile = clipboard.items[i].getAsFile();

            upload({
              url: '/upload',
              method: 'POST',
              data: {
                image: imageFile
              }
            }).then(
              function (response) {
                $scope.material = response.data.src;
              }
            );

          }
        }
      });
    });

    $scope.material = false;

    $scope.$on('material', function (event, data) {
      var arr = [];
      arr.push({'drawImage': [data.img, data.x, data.y, data.width, data.height]});
      $scope.drawData.materialData = arr;
      $scope.$apply();
      arr[0]['drawImage'][0] = data.img.src;

      localStorage.push('localData', arr);
    });


    $scope.$on('materialSelect', function (event, data) {
      $scope.material = data;
    });

    $scope.$on('closeMaterial', function (event, data) {
      $scope.material = false;
      $scope.$apply();
    });

    $scope.$watch('drawData.tool', function (newVal, oldVal) {
      $scope.material = false;
    });

  });
