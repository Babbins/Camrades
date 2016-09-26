app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});


app.controller('HomeCtrl', function($scope, playAlong, inputFactory, AudioFactory, Socket, $rootScope){
  var audioPreset, videoPreset;
  var presetMap = {
    1: playAlong
  }
  var state = {audio: 1};
  $(function(){
    $("#homeVideo").css({
        "transform": "rotateY(180deg)",
        "position": "fixed",
        "right": "0",
        "top":"0"
    })
    $("#myContainer canvas").css({
        "transform": "rotateY(180deg)",
        "position": "fixed",
        "right": "0",
        "top":"0"
    })
    $('body').keydown(function(event){
      if(event.which > 47 && event.which < 59){
        socket.emit('presetChange', event.which);
        $scope.clearControls();
      }
    });

    var socket = Socket;
    socket.on('connect', function (){
      console.log('I have made a persistent tw-way connection to teh server.');
    });

    // var throttled = _.throttle(render, 1000)
    socket.on('state', function(ztate){
      Object.assign(state,ztate);
      render(state);
      // throttled(state)
    })

    socket.on('newPreset', function(presets){
      console.log('presets', presets);
      if(audioPreset){
        audioPreset.off();
      }
      audioPreset = presetMap[presets.audio];
      audioPreset.setup();
      audioPreset.on();
      $scope.controls = audioPreset.controls;
      //same for video
    });


    // tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
    //   if (r > 225 && g > 125 && b < 70) {
    //     return true;
    //   }
    //   return false;
    // });

    var colors = new tracking.ColorTracker(['magenta', 'yellow']);
    colors.minDimension = 35;

    //CREATING INPUT OBJECT TO SEND TO RENDER
    var magenta = new inputFactory.Input('magenta',0,300);
    var yellow = new inputFactory.Input('yellow',0,300)
    //ASSIGNING LISTENERS FROM COLOR TRACK
    colors.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
          if(rect.color === 'magenta'){
            magenta.setValue('x', rect.x);
            magenta.setValue('y', rect.y);
            magenta.setValue('z', rect.width);
          }
          if(rect.color === 'yellow'){
            yellow.setValue('x', rect.x);
            yellow.setValue('y', rect.y);
            yellow.setValue('z', rect.width);

          }

          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // context.font = '11px Helvetica';
          // context.fillStyle = "#fff";
          socket.emit('input', Object.assign({},magenta.getProperties(),yellow.getProperties()));
        });
      }
    });

    // PUTTING QUERY ON aliVideo
    var video = document.querySelector("#homeVideo");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // aliVideo
    tracking.track('#homeVideo', colors);

    if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function(){});
        }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }
    $scope.clearControls = function(){
      yellow.clearControls();
      magenta.clearControls();
    }
    $scope.magenta = magenta;
    $scope.yellow = yellow;
    $scope.buttonPressed = false;
    $scope.currentSetButton = null;
    $scope.colorActive = 0;
    $scope.axisActive = 0;
    $scope.buttonOptions = {
      color: ["magenta","yellow"][$scope.colorActive],
      axis:  ["x","y","z"][$scope.axisActive]
    }
    $scope.showOptions = function(control){
      $scope.currentSetButton = control;
    }
    $scope.setControl = function(property, color, axis, min, max){
      if(color === "magenta"){
        magenta.addControl(axis, property, min, max)
      } else{
        yellow.addControl(axis, property, min, max)
      }
    }

    var render = function(state){
      if(audioPreset){
        audioPreset.render(state);
      }
    }

  });
});
