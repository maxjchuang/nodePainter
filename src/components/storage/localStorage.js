'use strict';

angular.module('nodePainter')
  .factory('localStorage', function (storage) {
    var storageData = [];

    return {
      get: function (target) {
        return storage.get(target);
      },

      push: function (target, data) {
        if (storage.get(target) !== null) {
          storageData = storage.get(target);
        }

        var key, lastItem, lastKey;
        _.each(data, function (item, index) {
          key = Object.keys(item)[0];

          if (storageData.length) {
            lastItem = storageData[storageData.length - 1],
            lastKey = Object.keys(lastItem)[0];

            if ((key == 'strokeStyle' || key == 'lineWidth' || key == 'font' || key == 'bgColor') && (key == lastKey)) 
            {
              storageData[storageData.length - 1] = item;
            } else {
              storageData.push(item);
            }
          } else {
            storageData.push(item);
          }
        });

        storage.set(target, storageData);
      },

      clear: function (target) {
        storage.set(target, []);
      }
    };
  });
