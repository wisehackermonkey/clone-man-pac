
// character movement and drawing class
function Character(x,y){
  this.pos = createVector(x,y);
  this.posPrev = createVector(0,0);
  this.w = 100;
  this.h = 100;
  // this.dirs = {"UP":createVector(0,-1),"DOWN":createVector(0,1),"RIGHT":createVector(1,0),"LEFT":createVector(-1,0),"STOP":createVector(0,0)};
  this.direction = createVector(0,0);
  
  
  this.show = function(){
    push();//isolated the color from other items
      fill(color("yellow"));
    // rect(this.pos.x, this.pos.y, this.w,this.h);
    // arc(this.pos.x, this.pos.y, this.w,this.h, QUARTER_PI, -QUARTER_PI, PIE);
    arc(this.pos.x+this.w/2, this.pos.y+this.h/2, this.w,this.h, frameCount %chompspeed, 360 - frameCount %chompspeed, PIE);
    pop();
  }
  
  this.position = function(position){
    this.pos.add(position);
  }
  
  
  this.applyForce = function(target){
    this.pos.add(target);
  }
  this.key_input = function(){
    if(keyIsDown(RIGHT_ARROW)){
      
      this.direction = createVector(1,0);
    }
    if(keyIsDown(LEFT_ARROW)){
      this.direction = createVector(-1,0);
    }
    if(keyIsDown(UP_ARROW)){
      this.direction = createVector(0,-1);
    }
    if(keyIsDown(DOWN_ARROW)){
      
      this.direction = createVector(0,1);
    }
  }

  this.move = function(){
    this.position(this.direction);
  }
  
  this.movePtAtoB = function(){
    
  } 
}