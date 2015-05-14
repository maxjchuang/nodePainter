'use strict';

angular.module('nodePainter')
  .factory('remoteStorage', function (storage) {
    var storageData = {};

    return {
      init: function (id, data) {
        var obj = storage.get('remoteData')
        if (obj == null) {
          obj = {};
        }

        obj[id] = {data: data};
        storage.set('remoteData', obj);
      },

      get: function (id) {
        var obj = storage.get('remoteData');
        if (obj == null || _.isUndefined(obj[id])) 
          return undefined;
        else
          return obj[id]['data'];
      },

      push: function (id, data) {
        storageData = storage.get('remoteData');
        var array = storageData[id]['data'];

        var key, lastItem, lastKey;
        _.each(data, function (item, index) {
          key = Object.keys(item)[0];

          if (array.length) {
            lastItem = array[array.length - 1],
            lastKey = Object.keys(lastItem)[0];

            if ((key == 'strokeStyle' || key == 'lineWidth' || key == 'font' || key == 'bgColor') && (key == lastKey)) 
            {
              array[array.length - 1] = item;
            } else {
              array.push(item);
            }
          } else {
            array.push(item);
          }
        });

        storageData[id]['data'] = array;
        storage.set('remoteData', storageData);
      },

      clear: function (id) {
        if (storage.get('remoteData') !== null) {
          storageData = storage.get('remoteData');
          storageData[id]['data'] = [];
          storage.set('remoteData', storageData);
        }
      }
    };
  });
