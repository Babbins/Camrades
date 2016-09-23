app.controller("MiladControl", function($scope, inputFactory){
  $(function(){

    $("#myVideo").css({
        "transform": "rotateY(180deg)"
    })



    //TESTING INTERPOLATE FUNCTION
    var input = new inputFactory.Input(0,300,0,300,0,300);
    //GETTING COLORS TO BE TRACKED
    // var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    var colors = new tracking.ColorTracker(['yellow']);

    //ASSIGNING LISTENERS FROM COLOR TRACK
    colors.on('track', function(event) {

      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
            input.setX(rect.x)
            input.setY(rect.y)
            input.setZ(rect.width)

          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
      }
    });

    //PUTTING QUERY ON myVIDEO
    var video = document.querySelector("#myVideo");
    var myCubes = document.querySelector("#myCubes");

    //TRACKING MY VIDEO
    tracking.track('#myVideo', colors, { camera: true })

    //STARTING VIDEO NOW
    if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function(){});
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

    //3JS
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth)/(window.innerHeight), 0.1, 1000 );

        console.log("innerWidth",window.innerWidth)
        console.log("innerHeight",window.innerHeight)

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        myCubes.appendChild( renderer.domElement );


        $("#myCubes canvas").css({
            "transform": "rotateY(180deg)"
        })

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 15;

        var render = function () {
            requestAnimationFrame( render );
            console.log("input of input get x", input.getX(-25,25))
            cube.position.x = input.getX(-20,20);
            cube.position.y = -input.getY(-20,20);
            cube.position.z = input.getZ(-20,100);
            // cube.position.y = input.getX();


            renderer.render(scene, camera);
        };

        render();

    })

})
