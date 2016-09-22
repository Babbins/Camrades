app.controller("MiladControl", function($scope){
  $(function(){

    //TESTING INTERPOLATE FUNCTION
    var milterpolate = d3.interpolate(1,2)

    //GETTING COLORS TO BE TRACKED
    // var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    var colors = new tracking.ColorTracker(['yellow']);

   //CREATING INPUT OBJECT TO SEND TO RENDER
    var input = {
        x: 0,
        y: 0
    };
    input.getX = function(){
        return this.x
    };
    input.setX = function(x){
        this.x = x
    };
    input.getY = function(){
        return this.x
    };
    input.setY = function(x){
        this.x = x
    };

    //ASSIGNING LISTENERS FROM COLOR TRACK
    colors.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
            input.setX(milterpolate(rect.x))

          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
      }
    });

    //PUTTING QUERY ON myVIDEO
    var video = document.querySelector("#myVideo");

    //TRACKING MY VIDEO
    tracking.track('#myVideo', colors)

    //STARTING VIDEO NOW
    if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function(){});
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

    //3JS
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        document.body.appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        var render = function () {
            requestAnimationFrame( render );
            console.log("input of input get x", input.getX())
            cube.position.x = input.getX();
            // cube.position.y = input.getX();


            renderer.render(scene, camera);
        };

        render();

    })

})
