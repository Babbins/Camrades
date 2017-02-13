app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, stateFactory, videoControlFactory, arpeg, theremin, grainPlayer, playAlong, inputFactory, Socket, $rootScope){
  var audioPreset, videoPreset, activeAudio, activeVideo;
  var presetMap = {
    1: playAlong,
    2: grainPlayer,
    3: arpeg,
    4: theremin,
    5: "squareMaze",
    6: "recursiveCircle",
    7: "particleFactory",
    8: "stringCheese",
    9: "davidFaces"
  };

  var state = {};
  $scope.state = state;
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
      var numKey = event.which - 48;
      if (1 <= numKey && numKey <= 4 ) {
        console.log(numKey);
        $scope.clearControls();
        socket.emit('presetAudio', numKey);
      } else if (5 <= numKey && numKey <= 9) {
        $scope.clearControls();
        socket.emit('presetVideo', numKey);
      }
    });
    $scope.emitVideo = function(num) {
      console.log('ok');
      socket.emit('presetVideo', num);
    }
    $scope.emitAudio = function(num) {
      socket.emit('presetAudio', num);
    }
    // $scope.audioPresetClick
    var socket = Socket;

    socket.on('connect', function (){
      console.log('I have made a persistent tw-way connection to teh server.', this.id);
    });

    // var throttled = _.throttle(render, 1000)
    socket.on('state', function(newState){
      Object.assign(state, newState);
      stateFactory.setState(state);
      render(state);
      // throttled(state)
    })

    socket.on('newPresetAudio', function(audio){
      console.log('audio', audio);
      if (audioPreset){
        audioPreset.off();
        console.log('activeAudio', activeAudio);
        console.log('audioPresets', $scope.audioPresets[activeAudio]);
        if (typeof activeAudio === 'number') {
          $scope.audioPresets[activeAudio].active = false;
        }
      }
      for (var i = 0; i < $scope.audioPresets.length; i++) {
        if ($scope.audioPresets[i].key === audio) {
          if(i === activeAudio){
            activeAudio = null;
            return $scope.$digest();
          }
          activeAudio = i;
          $scope.audioPresets[i].active = true;
          $scope.$digest();
          break;
        }
      }
      audioPreset = presetMap[audio];
      console.log(audioPreset);
      audioPreset.setup();
      audioPreset.on();
      $scope.audioControls = audioPreset.controls;
      $scope.$digest();
    });

    socket.on('newPresetVideo', function(video){
      console.log('video', video);
      if (typeof activeVideo === 'number') {
        console.log(activeVideo);
        $scope.videoPresets[activeVideo].active = false;
        $scope.mySketch = null;
      }

      for (var i = 0; i < $scope.videoPresets.length; i++) {
        if ($scope.videoPresets[i].key === video) {
          if(i === activeVideo){
            activeVideo = null;
            return $scope.$digest();
          }
          activeVideo = i;
          $scope.videoPresets[i].active = true;
          $scope.$digest();
          console.log($scope.videoPresets[i]);
          break;
        }
      }
      videoPreset = presetMap[video];
      $scope.mySketch = videoPreset;
      $scope.videoControls = videoControlFactory.getVideoControl();
      $scope.$digest();
      console.log('videocontrols', $scope.videoControls);
    });

    // tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
    //   if (r > 225 && g > 125 && b < 70) {
    //     return true;
    //   }
    //   return false;
    // });

    var colors = new tracking.ColorTracker(['magenta', 'yellow']);
    colors.minDimension = 10;

    //CREATING INPUT OBJECT TO SEND TO RENDER
    var magenta = new inputFactory.Input('magenta',0,300);
    var yellow = new inputFactory.Input('yellow',0,300)
    $scope.magenta = magenta;
    $scope.yellow = yellow;
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
    $scope.buttonPressedVideo = false;
    $scope.buttonPressedAudio = false;
    $scope.currentSetButton = null;
    // $scope.colorActive = 0;
    // $scope.axisActive = 0;
    $scope.buttonOptions = {
      color: ["magenta","yellow"][$scope.colorActive],
      axis:  ["x","y","z"][$scope.axisActive]
    }

    $scope.showOptions = function(control){
      $scope.currentSetButton = control;
    };

    $scope.setControl = function(property, color, axis, min, max){
      if(color === "magenta"){
        magenta.addControl(axis, property, min, max)
        console.log("magenta", magenta)
      } else{
        yellow.addControl(axis, property, min, max)
        console.log("yellow", yellow )
      }
    };

    var render = function(state){
      if(audioPreset){
        audioPreset.render(state);
      }
    };

    $scope.ali = false;
    $scope.audioPresets = [
      {
        key: 1,
        title: 'Play Along',
        description: 'Play along with Signals by D.R.A.M'
      },
      {
        key: 2,
        title: 'Manipulate Song',
        description: 'Speed up and detune Better Off Alone by Alice Deejay'
      },
      {
        key: 3,
        title: 'Arpeggio Chord Progression',
        description: 'Arpeggiate through a chord progression'
      },
      {
        key: 4,
        title: 'Japanese Scale',
        description: 'Play the notes of japanese scale'
      }
    ];
    $scope.videoPresets = [
      {
        key: 5,
        title: 'Squares',
        description: 'Squares!!!!'
      },
      {
        key: 6,
        title: 'Circles',
        description: 'Circles!!!!'
      },
      {
        key: 7,
        title: 'Raining Particles',
        description: 'Raaaaaaiiiiinnnn!'
      },
      {
        key: 8,
        title: 'Cat Toast',
        description: 'EL-OH-EL!'
      },
      {
        key: 9,
        title: 'Fullstack Staff',
        description: 'We love you guys!'
      }
    ];
  });

});
