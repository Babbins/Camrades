'use strict';
var socketio = require('socket.io');
var io = null;

var presets = {};
var state;
module.exports = function (server) {
    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
      console.log('A new client has connected. ID: ' + socket.id);

      //Emit current presets and state to newly connected user
      if (presets.audio) {
        socket.emit('newPresetAudio', presets.audio);
      }
      if (presets.video) {
        socket.emit('newPresetVideo', presets.video);
      }
      if (state) {
        socket.emit('state', state);
      }


      socket.on('disconnect', function(){
        console.log('Client ID: ' + socket.id + ' has disconnected');
      })

      socket.on('presetAudio', function(keyCode){
        presets.audio = keyCode;
        io.emit('newPresetAudio', presets.audio);
      });
      socket.on('presetVideo', function(keyCode){
        presets.video = keyCode;
        io.emit('newPresetVideo', presets.video);
      });

      socket.on('input', function(newState){
        state = newState;
        console.log(state);
        io.emit('state', state);
      })

    });
    return io;

};
