var mongo = require('./mongo.js');
var _ = require('lodash');

var dataPush = function (array, data) {
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

  return array;
};

var findResult = [];
var socket = function (io) {

  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('socketData', function (msg) {
      socket.broadcast.emit('socketData', msg);
      console.log("==============socketData:===============");
      console.dir(msg);
      console.log("========================================");

      mongo.find('painter', {id: msg.id}, {}, function (docs) {
        findResult = docs[0];
        console.log(findResult);

        if (findResult && findResult.data) {
          var data = dataPush(findResult.data, msg.data);
        } else {
          var data = msg.data;
        }

        mongo.update('painter', {id: msg.id}, {id: msg.id, data: data}, function (docs) {
          console.log("==============mongo update:=============");
          console.dir(data);
          console.log("========================================");
        });

      });
    });

    socket.on('socketInit', function (msg) {
      mongo.find('painter', {id: msg}, {}, function (docs) {
        findResult = docs[0];
        
        socket.emit('socketInit', findResult);
        console.log(findResult);
      });
    });

  });

};

module.exports = socket;
