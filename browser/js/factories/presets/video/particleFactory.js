app.factory('particleFactory', function(videoControlFactory, stateFactory){
    var controls = [
      {
        label: "weight",
        property: "weight",
        min: 0,
        max: 2000
      },
      {
        label: "x",
        property: "x",
        min: 77,
        max: 2000
      },
      {
        label: "y",
        property: "y",
        min: 0,
        max: 2000
      },
    ]

    var system;
    return function(sketch){
      sketch.setup = function() {
        videoControlFactory.setVideoControl(controls);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.background(0);
        system = new ParticleSystem(sketch.createVector(0,50));
      }

      sketch.draw = function() {

        var x = stateFactory.getState().x || 3
        var y = stateFactory.getState().y || 3
        sketch.background(x,y,y,x);
        sketch.scale(1.5);
        system.addParticle();
        system.run();

    }
    var weight = stateFactory.getState().weight || 3


    // A simple Particle class
    var Particle = function(position) {
      this.acceleration = sketch.createVector(0, 0.05);
      this.velocity = sketch.createVector(sketch.random(-1, 1), sketch.random(-1, 0));
      this.position = position.copy();
      this.lifespan = 400.0;
    };

    Particle.prototype.run = function() {
      this.update();
      this.display();
    };

    // Method to update position
    Particle.prototype.update = function(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
    };

    // Method to display
    Particle.prototype.display = function() {
      var x = stateFactory.getState().x || 0
      var y = stateFactory.getState().y || 0
      sketch.stroke(weight, this.lifespan);
      sketch.strokeWeight(weight);
      sketch.fill(127, this.lifespan);
      sketch.ellipse(this.position.x+x, this.position.y+y, 12, 12);
    };

    // Is the particle still useful?
    Particle.prototype.isDead = function(){
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    };

    var ParticleSystem = function(position) {
      this.origin = position.copy();
      this.particles = [];
    };

    ParticleSystem.prototype.addParticle = function() {
      this.particles.push(new Particle(this.origin));
    };

    ParticleSystem.prototype.run = function() {
      for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    };
  }
});



