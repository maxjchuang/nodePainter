'use strict';

angular.module('nodePainter')
  .controller('MainCtrl', function ($scope, $timeout, socket, storage, globalConfig) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20,
      materialData: []
    };

    var storageData = [];
    var bgColor = '#fff';

    var storagePush =  function (data) {

      if (storage.get('storageData') !== null) {
        storageData = storage.get('storageData');
      }

      _.each(data, function (item, index) {
        var key = Object.keys(item)[0];

        if (storageData.length) {
          var lastItem = storageData[storageData.length - 1],
              lastKey = Object.keys(lastItem)[0];

          if ((key == 'strokeStyle' || key == 'lineWidth' || key == 'font' || key == 'bgColor')               && (key == lastKey)) 
          {
            storageData[storageData.length - 1] = item;
          } else {
            storageData.push(item);
          }
        } else {
          storageData.push(item);
        }
      });

      storage.set('storageData', storageData);
    };

    $scope.$on('storagePush', function (event, data) {
      storagePush(data);
    });

    $scope.clearStorage = function () {
      storage.set('storageData', []);
    };

    $timeout(function () {
      if (storage.get('storageData') !== null) {
        $scope.$broadcast('socketData', storage.get('storageData'));
      }
    }, 100);

    $scope.material = false;

    if (globalConfig.socket) {
      socket.on('socketData', function (msg) {
        $scope.$broadcast('socketData', msg);
      });
    }

    $scope.$on('material', function (event, data) {
      var arr = [];
      arr.push({'drawImage': [data.img, data.x, data.y, data.width, data.height]});
      $scope.drawData.materialData = arr;
      $scope.$apply();
      arr[0]['drawImage'][0] = data.img.src;

      if (globalConfig.socket) {
        socket.emit('socketData', arr);
      }

      storagePush(arr);
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
