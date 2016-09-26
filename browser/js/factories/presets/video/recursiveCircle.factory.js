app.factory('recursiveCircle', function(stateFactory, videoControlFactory){
  var controls = [
    {
        label: 'levels',
        property: 'levels',
        min: 0,
        max: 10

    },
    {
        label: 'speed',
        property: 'speed',
        min: -10,
        max: 10
    }
  ]
  return function(sketch){
      sketch.setup = function() {
        videoControlFactory.setVideoControl(controls);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      }
      var speed = 0
      sketch.draw = function() {
        if (!stateFactory.getState().levels >= 1) stateFactory.getState().levels = 1;
        if (!stateFactory.getState().speed >= 1) stateFactory.getState().speed = 1;
        speed++
        speed = speed * stateFactory.getState().speed/3;
        sketch.background(stateFactory.getState().levels, stateFactory.getState().levels+40, stateFactory.getState().levels+150)
        speed += sketch.random(-10,10)

        drawCircle(sketch.width / 2, speed*1.5, stateFactory.getState().levels);
      }

      function drawCircle(x, radius, level) {
          var tt = 126 * level / 4.0;
          sketch.fill(tt, tt+stateFactory.getState().levels, tt-200);
          sketch.ellipse(x, sketch.height / 2, radius * 2, radius * 2);
          if (level > 1) {
              level = level - 1;
              drawCircle(x - radius / 2, radius / 2, level);
              drawCircle(x + radius / 2, radius / 2, level);
          }
      }
    }
});
