// character movement and drawing class
function Character(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.target = createVector(0, 0);
  

  this.w = 25;
  this.h = 25;
  this.clr = color("purple");

  this.show = function() {
    push();
      noStroke();
      fill(this.clr);
      noStroke();
      rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }

  this.moveDir = function(dir) {
    if (dir === 'up') {
      this.vel.set(0, -speed);
    }
    if (dir === "down") {
      this.vel.set(0, speed);
    }
    if (dir === "right") {
      this.vel.set(speed, 0);
    }
    if (dir === "left") {
      this.vel.set(-speed, 0);
    }
  }
  this.Reset = function(x, y) {
    this.pos.set(x, y);
    this.vel.set(0, 0);
  }
  this.appyForce = function(){
    var force = p5.Vector.sub(this.target, this.pos);
    force.mult(strength);
    this.vel.mult(drag);
    this.vel.add(force);
  }
  this.move = function() {
    //this.appyForce();
    this.pos.add(this.vel);
  }
}