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
      // context.clearRect(0, 0, canvas.width, canvas.height);
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

          // context.strokeStyle = rect.color;
          // context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // context.font = '11px Helvetica';
          // context.fillStyle = "#fff";
          socket.emit('input', Object.assign({},magenta.getProperties(),yellow.getProperties()));
        });
      }
    });

    // PUTTING QUERY ON aliVideo
    var video = document.querySelector("#homeVideo");
    // var canvas = document.getElementById('canvas');
    // var context = canvas.getContext('2d');
    // aliVideo
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
    $scope.buttonPressed = false;
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
      {
        label: "Position",
        property: "position1",
        min: 0,
        max: 1500
      },
      {
        label: "Position2",
        property: "position2",
        min: 0,
        max: 100
      }
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

      var img = [];
      var bugs = [];
      var counter = 0;
      p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (var x = 1; x < 7; x++){
           img.push(p.loadImage("/img/0"+ x +'.png'))
        }

        for (var i=0; i<50; i++) {
          bugs.push(new Jitter());
        }

      };

      p.draw = function() {
        p.background(p.random(0,state.position2));

        for (var i=0; i<bugs.length; i++) {
          bugs[i].move();
          bugs[i].updateSpeed(state.position2);
          bugs[i].display();
        }

      };
      function Jitter() {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.speed = 0;

        this.move = function() {
          this.x += p.random(-this.speed, this.speed);
          this.y += p.random(-this.speed, this.speed);
        };

        this.updateSpeed = function(newSpeed=1) {
          this.speed = newSpeed;
        }

        this.display = function() {


          // if ( counter > 6 || counter < 0) {
          //   counter = counter * -1;
          // }
          // counter = counter + counter
          p.image(img[1],this.x, this.y )
        };
      }
    };



//TO GO BACK AND FORTH BETWEEN A MAX AND MIN



    // var s = function( p ) {

    //   var video;
    //   var vScale = 8;

    //   p.setup = function() {
    //     p.createCanvas(600, 600);
    //     p.pixelDensity(1);
    //     video = p.createCapture(p.VIDEO);
    //     video.size(600,600);
    //     video.size(p.width/vScale,p.height/vScale);
    //   };

    //   p.draw = function() {
    //     p.background(40);
    //     video.loadPixels();
    //     p.loadPixels();

    //     for (var y = 0; y < video.height; y++){
    //       for (var x = 0; x < video.width; x++){
    //         var index = ( x+y * video.width) * 4;
    //         var r = video.pixels[index+0];
    //         var g = video.pixels[index+1];
    //         var b = video.pixels[index+2];
    //         var bright = (r+g+b)/3;

    //         p.noStroke();
    //         p.fill(bright+20);
    //         p.rectMode(p.CENTER);
    //         p.rect(x*vScale, y*vScale, vScale, vScale)
    //       }
    //     }
    //   };
    // };

    var myp5 = new p5(s, "myContainer");

  })
});
