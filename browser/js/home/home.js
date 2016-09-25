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
            magenta.setValue('z', rect.z);
          }
          if(rect.color === 'yellow'){
            yellow.setValue('x', rect.x);
            yellow.setValue('y', rect.y);
            yellow.setValue('z', rect.z);
          }

          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          socket.emit('input', Object.assign({},magenta.getProperties(),yellow.getProperties()));
        });
      }
    });

    //PUTTING QUERY ON aliVideo
    var video = document.querySelector("#homeVideo");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
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
    // player.start();
    var osc = new Tone.Oscillator('Ab3', 'sine').toMaster();
    $scope.start = function(){
      osc.start();
    }
    /*
    the register of
    [{
      label:
      property:
      min:
      max:
    }]
    */
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
    $scope.controls = [
      {
        label: "Frequency",
        property: "frequency",
        min: 0,
        max: 2000
      },
      {
        label: "Volume",
        property: "volume",
        min: 0,
        max: 20
      },
      {
        label: "Background Color",
        property: "backgroundColor",
        min: 0,
        max: 255
      },
      {
        label: "Number of Squares",
        property: "numOfSquares",
        min: 0,
        max: 100
      },
    ]
    $scope.setControl = function(property, color, axis, min, max){
      if(color === "magenta"){
        magenta.addControl(axis, property, min, max)
      } else{
        yellow.addControl(axis, property, min, max)
      }
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
        p.createCanvas(700, 700);
      };

      p.draw = function() {
        var bg = state.backgroundColor || 255;
        var num = state.numOfSquares || 0;
        console.log("num",num)
            p.background(bg,bg,bg);

            // p.rect(p.random(p.width, p.height), p.random(p.width, p.height), num, num);
            p.rect(num,50,num,50);


      };
    };

    var myp5 = new p5(s, "myContainer");

  })
});
