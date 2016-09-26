app.factory('squareMaze', function(videoControlFactory, stateFactory){
    var controls = [
      {
        label: "x",
        property: "x",
        min: 0,
        max: 2000
      },
      {
        label: "y",
        property: "y",
        min: 0,
        max: 2000
      },
      {
        label: "square",
        property: "square",
        min: 0,
        max: 1000
      },
    ]
    return function(sketch){

      sketch.setup = function() {
        videoControlFactory.setVideoControl(controls);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      }

      sketch.draw = function() {
        var square = stateFactory.getState().square || 1
        var y = stateFactory.getState().y || 1
        var z =stateFactory.getState().z || 1
            sketch.background(square,square+100,square+31,square/2-10);
            sketch.fill(square,square+1,square+3,square+7)
            sketch.rotate(square);
            pMaker(y/2)
            pMaker(z/2)
            pMaker(square/2)

            function pMaker(num){
              var array = [];
              for (var i = 0; i < 4; i++){
                array.push(sketch.rect(num, num, square+num, num));
              }
              return array
            }
    }
  }
});




