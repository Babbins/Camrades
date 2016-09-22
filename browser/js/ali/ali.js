app.config(function ($stateProvider) {
    $stateProvider.state('ali', {
        url: '/ali',
        templateUrl: 'js/ali/ali.html',
        controller: 'aliCtrl'
    });
});

app.controller('aliCtrl', function($scope, inputFactory){
  var colors = new tracking.ColorTracker(['yellow']);

  //CREATING INPUT OBJECT TO SEND TO RENDER
  var input = new inputFactory.Input(0,300,0,300);

  //ASSIGNING LISTENERS FROM COLOR TRACK
  colors.on('track', function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
          input.setX(rect.x);
          input.setY(rect.y);
         //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
      });
    }
  });

  //PUTTING QUERY ON aliVideo
  var video = document.querySelector("#aliVideo");

  //aliVideo
  tracking.track('#aliVideo', colors);

  if (navigator.getUserMedia) {
          navigator.getUserMedia({video: true}, handleVideo, function(){});
      }

      function handleVideo(stream) {
          video.src = window.URL.createObjectURL(stream);
      }

  //Tone JS
  var fmOsc = new Tone.Oscillator('Ab3', 'sine').toMaster();
  $scope.start = function(){
    console.log('starting');
    fmOsc.start();
  }



  var render = function(){
    fmOsc.frequency.value = input.getX(20, 1000);
    fmOsc.volume.value = input.getY(-50, 0);
    console.log(fmOsc.frequency.value, fmOsc.volume.value);
  }

  setInterval(render, 5);
})
