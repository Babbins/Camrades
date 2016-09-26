app.factory('stringCheese', function(videoControlFactory, stateFactory){
  var controls = [
    {
      label: "PositionX",
      property: "positionX",
      min: 0,
      max: $(window).width()
    },
    {
      label: "PositionY",
      property: "positionY",
      min: 0,
      max: $(window).height()
    },
    {
      label: "Resize",
      property: "resize",
      min: 0,
      max: 5
    },
    {
      label: "Rotate",
      property: "rotate",
      min: 0,
      max: 100
    },
  ]
  return function(sketch){
    var x = [],
      y = [],
      segNum = 400,
      segLength = 10;

    for (var i = 0; i < segNum; i++) {
      x[i] = 0;
      y[i] = 0;
    }
    var img;
    sketch.preload = function() {
      img = sketch.loadImage("/img/200_s.gif")
    }

    sketch.setup = function() {
      console.log("IN STRING CHEESE")
      videoControlFactory.setVideoControl(controls);
      sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      sketch.background(0);
      sketch.strokeWeight(300);
      sketch.stroke(255, 100);

    }

    sketch.draw = function() {

        var posX = stateFactory.getState().positionX || sketch.width/2
        var posY = stateFactory.getState().positionY || sketch.height/2
        var resize = stateFactory.getState().resize || 1
        var rotate = stateFactory.getState().rotate || 1
        sketch.background(posX,resize,rotate,23);
        for (var x = 0;x < sketch.random(1,70); x++){
            sketch.scale(resize);
            sketch.rotate(rotate);
            sketch.image(img, posX+20, posY+20);

        }

        dragSegment(0, posX, posY);
        for( var i=0; i<x.length-1; i++) {
          dragSegment(i+1, x[i], y[i]);
        }
      }

      function dragSegment(i, xin, yin) {
        var dx = xin - x[i];
        var dy = yin - y[i];
        var angle = sketch.atan2(dy, dx);
        x[i] = xin - sketch.cos(angle) * segLength;
        y[i] = yin - sketch.sin(angle) * segLength;
        segment(x[i], y[i], angle);
      }

      function segment(x, y, a) {
        sketch.push();
        sketch.translate(x, y);
        sketch.rotate(a);
        sketch.line(0, 0, segLength, 0);
        sketch.pop();
      }
    }
});

