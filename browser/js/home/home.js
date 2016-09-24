app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, inputFactory, Socket, $rootScope){
  var state = {};
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

    var socket = Socket;
    socket.on('connect', function (){
      console.log('I have made a persistent tw-way connection to teh server.')
    });

    // var throttled = _.throttle(render, 1000)
    socket.on('state', function(ztate){
      Object.assign(state,ztate);
      console.log(state);
      render(state);
      // throttled(state)
    })


    tracking.ColorTracker.registerColor('green', function(r, g, b) {
      if (r > 100 && g < 100 && b < 100) {
        return true;
      }
      return false;
    });
    var colors = new tracking.ColorTracker(['yellow']);

    //CREATING INPUT OBJECT TO SEND TO RENDER
    var input = new inputFactory.Input(0,300,0,300,0,300  );
    //ASSIGNING LISTENERS FROM COLOR TRACK
    colors.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
            if(input.x.type === 'detune'){
              input.setX(rect.x, null, -1200, 1200);
            }
            if(input.y.type === 'playbackRate'){
              input.setY(rect.y, null, 0.5, 2);
            }
            if(input.z.type === 'drift'){
              input.setZ(rect.width, null, 0, 5);
            }
            if(input.x.type === 'frequency'){
              input.setX(rect.x, null, 20, 1000);
            }
            if(input.x.type === 'ellipseX'){
              input.setX(rect.x, null, 0, 500);
            }
            if(input.y.type === 'ellipseY'){
              input.setY(rect.y, null, 0, 500);
            }
            if(input.z.type === 'width'){
              input.setZ(rect.width, null, 0, 150)
            }
            if(input.y.type === 'position'){
              input.setY(rect.y, null, 0, 400);
            }
            if(input.y.type === 'volume'){
              input.setY(rect.y, null, -50, 15);
            }
            socket.emit('input', input.getX(), input.getY(), input.getZ());
        });
      }
    });

    //PUTTING QUERY ON aliVideo
    var video = document.querySelector("#homeVideo");

    //aliVideo
    tracking.track('#homeVideo', colors);

    if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function(){});
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }




    //Tone JS
    var player = new Tone.GrainPlayer('/signals.mp3').toMaster();
    player.start();
    var osc = new Tone.Oscillator('Ab3', 'sine').toMaster();
    $scope.start = function(){
      osc.start();
    }
    $scope.frequencyX = function(){
      input.setX(null, 'frequency');
    }
    $scope.volumeY = function(){
      input.setY(null, 'volume');
    }

    $scope.ellipseX = function(){
      input.setX(null, 'ellipseX');
    }

    $scope.ellipseY = function(){
      input.setY(null, 'ellipseY');
    }

    $scope.detune =  function(){
      input.setX(null, 'detune');
    }

    $scope.width = function(){
      input.setZ(null, 'width');
    }
    $scope.playbackRate =  function(){
      input.setY(null, 'playbackRate');
    }
    $scope.drift =  function(){
      input.setZ(null, 'drift');
    }

    var render = function(state){
      if (state.frequency) {
        osc.frequency.value = state.frequency;
      }
      if (state.volume) {
        osc.volume.value = state.volume;
      }
      if (state.detune){
        player.detune = state.detune;
      }
      if (state.playbackRate){
        player.playbackRate = state.playbackRate;
      }
      if (state.drift){
        player.drift = state.drift;
      }
    }


    //P5 JS

    var s = function( p ) {

      var x = 100;
      var y = 100;

      p.setup = function() {
        p.createCanvas(700, 410);
      };

      p.draw = function() {
        if(state){
            p.ellipse(500-state.ellipseX, state.ellipseY, state.width, state.width);
        }

      };
    };


    var myp5 = new p5(s, "myContainer");

  })
});
