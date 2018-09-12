
// character movement and drawing class
function Character(x,y,tiles){
  this.pos = createVector(x,y);
  this.tiles = tiles;
  
  this.w = 30;
  this.h = 30;
  this.r = this.w;
  this.dirs = {"UP":createVector(0,-1),"DOWN":createVector(0,1),"RIGHT":createVector(1,0),"LEFT":createVector(-1,0),"STOP":createVector(0,0)};
  this.direction = "";
  
  this.curTile = createVector(1,1);
  
  this.show = function(){
    // rect(this.pos.x, this.pos.y, this.w,this.h);
    // arc(this.pos.x, this.pos.y, this.w,this.h, QUARTER_PI, -QUARTER_PI, PIE);
    arc(this.pos.x, this.pos.y, this.w,this.h, myAngle/2, 360 - myAngle/2, PIE);
  }
  
  this.position = function(position){
    this.pos.add(position);
  }
  
  this.key_input = function(){
    if(keyIsDown(RIGHT_ARROW)){
      this.direction = "RIGHT";
    }
    if(keyIsDown(LEFT_ARROW)){
      this.direction = "LEFT";
    }
    if(keyIsDown(UP_ARROW)){
      var c = this.curTile.copy();
      this.direction = "UP";
      this.calcCurrentTile();
      if( this.tiles[c.x][c.y - 1] === 0){
        this.direction = "STOP";
        fill(color("green"));
      }
    }
    if(keyIsDown(DOWN_ARROW)){
      this.direction = "DOWN";
    }
  }

  this.move = function(){
    this.position(this.dirs[this.direction]);
  }
  this.setDir = function(dir){
    this.direction = dir;
  }
  //https://github.com/bmoren/p5.collide2D#colliderectcircle
  this.detectCircle = function(box){
    var w = box.w;
    var h = box.h;
    var x = box.pos.x;
    var y = box.pos.y;
    var result = collideRectCircle(x,y,w,h, this.pos.x,this.pos.y,this.r);
    return result;
  }
  
  this.movePtAtoB = function(){
    
  } 
  this.calcCurrentTile= function(){
    this.curTile
  }
  
}