app.factory('davidFaces', function(videoControlFactory, stateFactory){
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

    return function(sketch){

      var img = [];
      var bugs = [];
      var asc = true;
      var counter = 0;
      sketch.preload = function() {
        for (var x = 1; x < 7; x++){
           img.push(sketch.loadImage("/img/0"+ x +'.png'))
        }
      }

      sketch.setup = function() {
        videoControlFactory.setVideoControl(controls);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        for (var i=0; i<15; i++) {
          bugs.push(new Jitter());
        }
      };

      sketch.draw = function() {
          sketch.background(0);

        for (var i=0; i<bugs.length; i++) {
          bugs[i].move();
          bugs[i].updateSpeed(stateFactory.getState().position2);
          bugs[i].display();
        }
      };
      function Jitter() {
        this.x = sketch.random(sketch.width);
        this.y = sketch.random(sketch.height);
        this.speed = 1;

        this.move = function() {
          this.x += sketch.random(-this.speed, this.speed)
          this.y += sketch.random(-this.speed, this.speed)
        };

        this.updateSpeed = function(newSpeed=1) {
          this.speed = newSpeed/3;
        }
        this.display = function(){
          counter = Math.round(stateFactory.getState().counter) || 0
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
          var newx = ((stateFactory.getState().position1)-this.x)
          var newy = ((stateFactory.getState().position1)-this.y)
          if (newx > sketch.Width) newx = Math.abs(newx/2)
            if (newy > sketch.Height) newy = Math.abs(newy/2)
          sketch.image(img[counter], newx, newy )
        };
      }
    }
})
