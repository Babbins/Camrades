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
    $('body').keydown(function(event){
      socket.emit('presetChange', event.which);
      $scope.clearControls();
      //'1' key pressed
      if(event.which == 49){
        AudioFactory.preset1();
      }
      if(event.which == 50){
        AudioFactory.preset2();
      }
      if(event.which == 51){
        AudioFactory.preset3();
      }
      if(event.which == 52){
        AudioFactory.preset4();
      }
      if(event.which == 53){
        AudioFactory.preset5();
      }
      if(event.which == 54){
        VideoFactory.preset6();
      }
      if(event.which == 55){
        VideoFactory.preset7();
      }
      if(event.which == 56){
        VideoFactory.preset8();
      }
      if(event.which == 57){
        VideoFactory.preset9();
      }
      if(event.which == 48){
        VideoFactory.preset0();
      }
    });

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
        min: -35,
        max: 20
      },
      {
        label: 'Vibrato Amount',
        property: 'vibratoAmount',
        min: 0,
        max: 2

      },
      {
        label: 'Set Note',
        property: 'setNote',
        min: 0,
        // max: synthNotes.length - 1
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
        synth.volume.value = state.volume;
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
      if (state.setNote){
        console.log(Math.round(state.setNote));
        var note = synthNotes[Math.round(state.setNote)];
        if(note !== lastSynthNote){
          synth.triggerAttack(note);
        }
        lastSynthNote = note;
      }    }


    //P5 JS

    // var s = function( p ) {
    //
    //   var img = [];
    //   var bugs = [];
    //   var asc = true;
    //   var counter = 0;
    //   p.setup = function() {
    //     p.createCanvas(p.windowWidth, p.windowHeight);
    //     for (var x = 1; x < 7; x++){
    //        img.push(p.loadImage("/img/0"+ x +'.png'))
    //     }
    //
    //     for (var i=0; i<50; i++) {
    //       bugs.push(new Jitter());
    //     }
    //
    //   };
    //
    //   p.draw = function() {
    //
    //     p.background(p.random(0,state.position2));
    //
    //     for (var i=0; i<bugs.length; i++) {
    //       bugs[i].move();
    //       bugs[i].updateSpeed(state.position2);
    //       bugs[i].display();
    //     }
    //
    //   };
    //   function Jitter() {
    //     this.x = p.random(p.width);
    //     this.y = p.random(p.height);
    //     this.speed = 0;
    //
    //     this.move = function() {
    //       this.x += p.random(-this.speed, this.speed);
    //       this.y += p.random(-this.speed, this.speed);
    //     };
    //
    //     this.updateSpeed = function(newSpeed=1) {
    //       this.speed = newSpeed;
    //     }
    //
    //     this.display = function() {
    //
    //          console.log("counter",counter)
    //         if(asc){
    //           counter++;
    //           if(counter === 6){
    //             asc = false;
    //           }
    //         }
    //         else{
    //           counter--;
    //           if (counter === 1){
    //             asc = true;
    //           }
    //         }
    //
    //
    //       // if ( counter > 6 || counter < 0) {
    //       //   counter = counter * -1;
    //       // }
    //       // counter = counter + counter
    //       p.image(img[counter],this.x, this.y )
    //     };
    //   }
    // }
    // var myp5 = new p5(s, "myContainer");

  });
});
