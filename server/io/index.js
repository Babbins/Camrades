'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {
    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
      console.log('A new client has connected. ID: ' + socket.id);

      socket.on('disconnect', function(){
        console.log('Client ID: ' + socket.id + ' has disconnected');
      })

      socket.on('input', function(state){
        io.emit('state', state);
      })

    });
    return io;

};
