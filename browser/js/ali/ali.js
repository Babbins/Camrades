app.config(function ($stateProvider) {
    $stateProvider.state('ali', {
        url: '/ali',
        templateUrl: 'js/ali/ali.html',
        controller: 'aliCtrl'
    });
});


app.controller('aliCtrl', function($scope, inputFactory, Socket, $rootScope){
  var otherInput = {};
  var socket = Socket;
  socket.on('connect', function (){
    console.log('I have made a persistent tw-way connection to teh server.')
  });
  $scope.$on('input', function(event, x, y, z){
    socket.emit('input', x, y, z);
  });

  // var throttled = _.throttle(render, 1000)
  socket.on('state', function(state){
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
  var input = new inputFactory.Input(0,300,0,300);

  //ASSIGNING LISTENERS FROM COLOR TRACK
  colors.on('track', function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
          if(input.x.type === 'frequency'){
            input.setX(rect.x, null, 20, 1000);
          }
          if(input.y.type === 'volume'){
            input.setY(rect.y, null, -50, 15);
          }
        $rootScope.$broadcast('input', input.getX(), input.getY(), input.z)
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
  var osc = new Tone.Oscillator('Ab3', 'sine').toMaster();
  $scope.start = function(){
    console.log('starting');
    osc.start();
  }
  $scope.frequencyX = function(){
    input.setX(null, 'frequency');
  }
  $scope.volumeY = function(){
    input.setY(null, 'volume');
  }

  var render = function(state){
    if (state.frequency) {
      osc.frequency.value = state.frequency;
    }
    if (state.volume) {
      osc.volume.value = state.volume;
    }
  }
});
