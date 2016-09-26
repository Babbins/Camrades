app.factory('recursiveCircle', function(){


  var controls = [
    {
        label: 'levels',
        property: 'levels',
        min: 0,
        max: 10

    }, {
        label: 'speed',
        property: 'speed',
        min: -2,
        max: 2
    }
  ]

  return {
    on: function(state){
      function setup () {
        var myCanvas = createCanvas(windowWidth, windowHeight);
        myCanvas.parent('myContainer');
      } 
      var speed = 0
      function draw () {
        console.log("DRAW IS GETTING CALLED")
        if (!state.levels >= 1) state.levels = 1;
        if (!state.speed >= 1) state.speed = 1;
        speed++
        speed = speed * state.speed/3;
        background(state.levels, state.levels+40, state.levels+150)
        speed += random(-10,10)

        drawCircle(p.width / 2, speed*1.5, state.levels);
      }

      function drawCircle(x, radius, level) {
          var tt = 126 * level / 4.0;
          fill(tt, tt+state.levels, tt-200);
          ellipse(x, height / 2, radius * 2, radius * 2);
          if (level > 1) {
              level = level - 1;
              drawCircle(x - radius / 2, radius / 2, level);
              drawCircle(x + radius / 2, radius / 2, level);
          }
      }

    },
    controls: controls



  }

})
