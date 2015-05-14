'use strict';

angular.module('nodePainter')
  .controller('remoteCtrl', function ($scope, $state, $timeout, $document, storage, socket, upload, globalConfig, $stateParams) {
    $scope.drawData = {
      tool: 'pointer',
      bgColor: '#fff',
      strokeColor: '#000',
      strokeWidth: 1,
      text: '',
      fontsize: 20,
      materialData: []
    };
    

    if ($stateParams.painterId) {
      var painterId = $stateParams.painterId;

      if (storage.get('remoteData')) {
        var painterArr = storage.get('remoteData');
      } else {
        var painterArr = [];
      }
      if (_.indexOf(painterArr, painterId) == -1) {
        painterArr.push(painterId);
        storage.set('remoteData', painterArr);
      }

      socket.emit('socketInit', painterId);
      socket.on('socketInit', function (msg) {
        if (msg && msg.id == painterId) {
          $scope.$broadcast('socketData', msg.data);
        }
      });
    } else {
      $state.go('local');
    }

    $timeout(function () {
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


    socket.on('socketData', function (msg) {
      if (msg.id == painterId) {
        $scope.$broadcast('socketData', msg.data);
      }
    });

    $scope.$on('emitData', function (event, data) {
      var msg = {
        id: painterId,
        data: data
      };
      socket.emit('socketData', msg);
    });


    $scope.material = false;
    $scope.$on('material', function (event, data) {
      var arr = [];
      arr.push({'drawImage': [data.img, data.x, data.y, data.width, data.height]});
      $scope.drawData.materialData = arr;
      $scope.$apply();
      arr[0]['drawImage'][0] = data.img.src;

      var msg = {
        id: painterId,
        data: arr
      };
      socket.emit('socketData', msg);
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
