'use strict';
var socketio = require('socket.io');
var io = null;

var KEYCODES = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  48: 0
}

var presets = {};
module.exports = function (server) {
    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
      console.log('A new client has connected. ID: ' + socket.id);

      socket.on('disconnect', function(){
        console.log('Client ID: ' + socket.id + ' has disconnected');
      })

      socket.on('presetChange', function(keyCode){
        //Audio preset switch
        if(keyCode < 54 && keyCode > 48){
          presets.audio = KEYCODES[keyCode];
        }
        //Else Video preset switch
        else{
          presets.video = KEYCODES[keyCode];
        }
        console.log(presets);
      })
      socket.on('input', function(state){
        io.emit('state', Object.assign(state, presets));
      })

    });
    return io;

};
