var socket = function (io) {

  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('socketData', function (msg) {
      socket.broadcast.emit('socketData', msg);
      console.log("==============socketData: " + msg + "==================");
    });

  });

};

module.exports = socket;
