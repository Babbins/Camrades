app.controller("MiladControl", function($scope){
  $(function(){

    var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    colors.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
      }
    });

    var video = document.querySelector("#myVideo");

    tracking.track('#myVideo', colors)

    if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function(){});
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

    // var video = document.querySelector("#myVideo");


    // if (navigator.getUserMedia) {
    //     navigator.getUserMedia({video: true}, handleVideo, videoError);
    // }



    // function videoError(e) {
    //     // do something
    // }
    })

})
