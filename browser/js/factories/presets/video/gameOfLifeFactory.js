app.factory('gameOfLife', function(videoControlFactory, stateFactory){
  var controls = [
    {
      label: "fill",
      property: "fill",
      min: 0,
      max:255
    },
    {
      label: "rect",
      property: "rect",
      min: 0,
      max:1000
    },
  ]

  var w = 10;
  // An array of 0s and 1s
  var cells;

  // We arbitrarily start with just the middle cell having a state of "1"
  var generation = 0;

  // An array to store the ruleset, for example {0,1,1,0,1,1,0,1}
  var ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
  return function(sketch){
    sketch.setup = function() {
      videoControlFactory.setVideoControl(controls);
      sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      sketch.background(0);

      cells = Array(sketch.floor(sketch.width/w));
      for (var i = 0; i < cells.length; i++) {
        cells[i] = 0;
      }
      cells[cells.length/2] = 1;
    }

    sketch.draw = function() {
      var param = stateFactory.getState().state || 0
      var fill = stateFactory.getState().state || 10
      var rect = stateFactory.getState().state || 10

      for (var i = 0; i < cells.length; i++) {
        if (cells[i] === 1) {
          sketch.fill(fill,fill+30,fill+40);
        } else {
          sketch.fill(51);
          sketch.noStroke();
          sketch.rect(i*w*rect, generation*w, w*rect, w);
        }
      }
      if (generation < sketch.height/w) {
        generate();
      }
    }
    // The process of creating the new generation
    function generate() {
      // First we create an empty array for the new values
      var nextgen = Array(cells.length);
      // For every spot, determine new state by examing current state, and neighbor states
      // Ignore edges that only have one neighor
      for (var i = 1; i < cells.length-1; i++) {
        var left   = cells[i-1];   // Left neighbor state
        var me     = cells[i];     // Current state
        var right  = cells[i+1];   // Right neighbor state
        nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
      }
      // The current generation is the new generation
      cells = nextgen;
      generation++;
    }

    function rules(a, b, c) {
      if (a == 1 && b == 1 && c == 1) return ruleset[0];
      if (a == 1 && b == 1 && c == 0) return ruleset[1];
      if (a == 1 && b == 0 && c == 1) return ruleset[2];
      if (a == 1 && b == 0 && c == 0) return ruleset[3];
      if (a == 0 && b == 1 && c == 1) return ruleset[4];
      if (a == 0 && b == 1 && c == 0) return ruleset[5];
      if (a == 0 && b == 0 && c == 1) return ruleset[6];
      if (a == 0 && b == 0 && c == 0) return ruleset[7];
      return 0;
    }


  }
})

