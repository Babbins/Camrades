app.controller("MiladControl", function($scope, inputFactory){
  $(function(){

    //Making video mirrored
    $("#myVideo").css({
        "transform": "rotateY(180deg)",
        "position": "fixed",
        "right": "0",
        "top":"0"
    })
    $("#myContainer").css({
        "transform": "rotateY(180deg)",
        "position": "fixed",
        "left": "0",
        "top":"0"
    })

    //TESTING INTERPOLATE FUNCTION
    var input = new inputFactory.Input(0,300,0,300,0,300);

    //GETTING COLORS TO BE TRACKED
    // var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    var colors = new tracking.ColorTracker(['yellow', 'cyan']);


    //ASSIGNING LISTENERS FROM COLOR TRACK
    colors.on('track', function(event) {

      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
            input.setX(rect.x, null, 0, 400);
            input.setY(rect.y, null, 0, 400);
            input.setZ(rect.width, null, 0, 500);

             // console.log("input obj",input.getZ().value)
          // console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
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


    //P5 Testing

    /**************************************
    //LOADING AN IMAGE UP
    var img;
    var s = function( p ) {

      p.preload = function (){
        img = p.loadImage("dog.jpg");
      }

      p.setup = function() {
        p.createCanvas(700, 410);
      };

      p.draw = function() {
        p.image(img, 0, 0);
      };
    };
    ***************************************/
    //*************************************
    //rectangle Takes
    //x, y, width, height <--- x and y are both positive starting at top corner
    //background() for color of canvas == stroke() for color of line == fill() for inside.
    //ORDER OF OPERATIONS IMPORTANT
    //COLOR IS BY RGB - 0-255
    //COLOR GOES FIRST,
    //1 argument is black and white, 3 is RGB, 4 is RGBA
    //mouseX is where mouse is moved
    var img;

    var s = function( p ) {

      p.setup = function() {
        p.createCanvas(1000, 1000);
        p.background(255);
      };
      /////
      //Num1
      /////
      // p.draw = function() {
      //   p.background(-input.getZ().value,-input.getZ().value+100,input.getZ().value+100,input.getZ().value+20);
      //   p.fill(input.getZ().value,input.getZ().value+100,input.getZ().value+100,input.getZ().value+100)
      //   p.rect(input.getX().value, input.getY().value, 50, 50);
      //   p.rect(input.getX().value-10, input.getY().value-10, input.getZ().value, input.getZ().value);
      //   p.rect(input.getX().value+45, input.getY().value+15, input.getZ().value+50, input.getZ().value);
      //   p.rect(input.getX().value+90, input.getY().value-100, input.getZ().value+200, input.getZ().value+200);
      //   p.rect(input.getX().value, input.getY().value+40, input.getZ().value+100, input.getZ().value+100);
      // };
    //   function pMaker(num){
    //     var array = [];
    //     for (var i = 0; i < num; i++){
    //       array.push(p.rect(input.getX().value+num, input.getY().value+num, input.getZ().value+num, input.getZ().value+num));
    //     }
    //     return array
    //   }
    /////
    //Num2
    /////
    //   p.draw = function() {

    //     p.background(-input.getZ().value,-input.getZ().value+100,input.getZ().value+100,input.getZ().value+20);
    //     p.fill(input.getZ().value,input.getZ().value+100,input.getZ().value+100,input.getZ().value+100)
    //     pMaker(input.getX().value)
    //     pMaker(input.getY().value)
    //     pMaker(input.getZ().value)
    //   };
    // };
    /////
    //Num3
    /////
      // function pMaker(num){
      //   var array = [];
      //   for (var i = 0; i < 4; i++){
      //     array.push(p.rect(input.getX().value+num, input.getY().value+num, input.getZ().value+num, input.getZ().value+num));
      //   }
      //   return array
      // }
      // p.draw = function() {

      // p.background(-input.getZ().value,-input.getZ().value+100,input.getZ().value+100,15);
      //   p.fill(input.getZ().value,input.getZ().value+100,input.getZ().value+100,input.getZ().value+100)
      //   pMaker(input.getX().value)
      //   pMaker(input.getY().value)
      //   pMaker(input.getZ().value)
      //   pMaker(input.getX().value-200)
      //   pMaker(input.getY().value-200)
      //   pMaker(input.getZ().value-200)
      //   pMaker(input.getX().value+200)
      //   pMaker(input.getY().value+200)
      //   pMaker(input.getZ().value+200)
      //   pMaker(input.getX().value-400)
      //   pMaker(input.getY().value-400)
      //   pMaker(input.getZ().value-400)
      //   pMaker(input.getX().value+400)
      //   pMaker(input.getY().value+400)
      //   pMaker(input.getZ().value+400)
      // };
    /////
    //Num4
    /////
      // function pMaker(num){
      //   var array = [];
      //   for (var i = 0; i < 4; i++){
      //     array.push(p.rect(input.getX().value+num, input.getY().value+num, input.getZ().value+num, input.getZ().value+num));
      //   }
      //   return array
      // }
      // p.draw = function() {


      //   p.fill(input.getZ().value,input.getZ().value+100,input.getZ().value+100,input.getZ().value+100)
      //   pMaker(input.getX().value)
      //   pMaker(input.getY().value)
      //   pMaker(input.getZ().value)
      //   pMaker(input.getX().value-200)
      //   pMaker(input.getY().value-200)
      //   pMaker(input.getZ().value-200)
      //   pMaker(input.getX().value+200)
      //   pMaker(input.getY().value+200)
      //   pMaker(input.getZ().value+200)
      //   pMaker(input.getX().value-400)
      //   pMaker(input.getY().value-400)
      //   pMaker(input.getZ().value-400)
      //   pMaker(input.getX().value+400)
      //   pMaker(input.getY().value+400)
      //   pMaker(input.getZ().value+400)
      // };
    /////
    //Num6
    /////
    //   function pMaker(num){
    //     var array = [];
    //     for (var i = 0; i < 4; i++){
    //       array.push(p.rect(input.getX().value+num, input.getY().value+num, input.getZ().value+num, input.getZ().value+num));
    //     }
    //     return array
    //   }
    //   p.draw = function() {
    //     p.background(input.getZ().value+p.random(0,2));
    //     p.fill(input.getZ().value,input.getZ().value+100,input.getZ().value+100,input.getZ().value+100)
    //     pMaker(p.random(0,14))
    //   };
    };
   // **************************************/
    var myp5 = new p5(s, "myContainer");

    })

})







   //3JS
   /*
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

*/
