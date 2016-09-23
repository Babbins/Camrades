'use strict';
var socketio = require('socket.io');
var stateFuncs = require('./state');
var io = null;

module.exports = function (server) {
    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
      console.log('A new client has connected. ID: ' + socket.id);

      socket.on('disconnect', function(){
        console.log('Client ID: ' + socket.id + ' has disconnected');
      })

      socket.on('input', function(x, y, z){
        // console.log(x,y,z);
        var state = stateFuncs.makeState(x, y, z);
        console.log(state);
        io.emit('state', state);
      })

    });
    return io;

};
