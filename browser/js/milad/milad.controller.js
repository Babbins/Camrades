app.controller("MiladControl", function($scope){
  $(function(){

    var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    var inputObj = {};
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


        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

                    var renderer = new THREE.WebGLRenderer();
                    renderer.setSize( window.innerWidth/3, window.innerHeight/3 );
                    document.body.appendChild( renderer.domElement );

                    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
                    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                    var cube = new THREE.Mesh( geometry, material );
                    scene.add( cube );

                    camera.position.z = 5;

                    var render = function () {
                        requestAnimationFrame( render );

                        cube.rotation.x += 0.1;
                        cube.rotation.y += 0.1;

                        renderer.render(scene, camera);
                    };

                    render();
    // var video = document.querySelector("#myVideo");


    // if (navigator.getUserMedia) {
    //     navigator.getUserMedia({video: true}, handleVideo, videoError);
    // }



    // function videoError(e) {
    //     // do something
    // }
    })

})
