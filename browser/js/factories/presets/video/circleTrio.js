app.factory('circleTrio', function(videoControlFactory, stateFactory){
    var controls = [
      {
        label: "moving",
        property: "moving",
        min: 0,
        max: 2000
      },
    ]
    return function(sketch){
      var diameter;
      var angle = 0;
      console.log("here")
      sketch.setup = function() {
        videoControlFactory.setVideoControl(controls);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.background(100);
        diameter = sketch.height - 10;
        sketch.noStroke();
        sketch.fill(255, 204, 0);
      }
      var moving = stateFactory.getState().moving || 10;


      sketch.draw = function() {

      sketch.background(0);
        var d1 = 10 + (sketch.sin(angle) * sketch.diameter/2) + sketch.diameter/2;
        var d2 = 10 + (sketch.sin(angle + sketch.PI/2) * sketch.diameter/2) + sketch.diameter/2;
        var d3 = 10 + (sketch.sin(angle + sketch.PI) * sketch.diameter/2) + sketch.diameter/2;

        sketch.ellipse(0, sketch.height/2, d1, d1);
        sketch.ellipse(sketch.width/2, sketch.height/2, d2, d2);
        sketch.ellipse(sketch.width, sketch.height/2, d3, d3);

        angle += 0.02;

    }
  }
});




