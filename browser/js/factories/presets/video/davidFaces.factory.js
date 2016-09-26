app.factory('davidFaces', function(){
      var s = function( p ) {

      var img = [];
      var bugs = [];
      var asc = true;
      var counter = 0;
      p.preload = function() {
        for (var x = 1; x < 7; x++){
           img.push(p.loadImage("/img/0"+ x +'.png'))
        }
      }

      p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (var i=0; i<15; i++) {
          bugs.push(new Jitter());
        }



      };

      p.draw = function() {
          p.background(0);



        for (var i=0; i<bugs.length; i++) {
          bugs[i].move();
          bugs[i].updateSpeed(state.position2);
          bugs[i].display();
        }
      };
      function Jitter() {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.speed = 1;

        this.move = function() {
          this.x += p.random(-this.speed, this.speed)
          this.y += p.random(-this.speed, this.speed)
        };

        this.updateSpeed = function(newSpeed=1) {
          this.speed = newSpeed/3;
        }
        this.display = function(){
          counter = Math.round(state.counter) || 0
            // if(asc){
            //   counter++;
            //   if(counter === 5){
            //     asc = false;
            //   }
            // }
            // else{
            //   counter--;
            //   if (counter === 1){
            //     asc = true;
            //   }
            // }


          // if ( counter > 6 || counter < 0) {
          //   counter = counter * -1;
          // }
          // counter = counter + counter
          //
          var newx = ((state.position1)-this.x)
          var newy = ((state.position1)-this.y)
          if (newx > p.Width) newx = Math.abs(newx/2)
            if (newy > p.Height) newy = Math.abs(newy/2)
          p.image(img[counter], newx, newy )
        };
      }
    }

  var controls = [
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
          max: 1000
        },
        {
          label: "counter",
          property: "counter",
          min: 0,
          max: 5
        }
  ]

  return {
    on: function(){
    var myp5 = new p5(s, "myContainer");
    },
    controls: controls



  }

})
