/*
clone man pac

game clone of pac man using javascript and p5.js

wisemonkey
oranbusiness@gmail.com
20180903
github.com/wisehackermonkey

*/
var packman;
var myAngle = 30;

//enums for directions

function setup() {
  createCanvas(600,600);
  background(50);
  packman = new Character(0,300);
  angleMode(DEGREES);
}

function draw() {
    background(50);

  packman.key_input();
  packman.move();

  packman.show();
}


// character movement and drawing class
function Character(x,y){
  this.pos = createVector(x,y);
  
  this.w = 100;
  this.h = 100;
  this.dirs = {"UP":createVector(0,-1),"DOWN":createVector(0,1),"RIGHT":createVector(1,0),"LEFT":createVector(-1,0),"STOP":createVector(0,0)};
  this.direction = "";
  
  
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
      this.direction = "UP";
    }
    if(keyIsDown(DOWN_ARROW)){
      this.direction = "DOWN";
    }
  }

  this.move = function(){
    this.position(this.dirs[this.direction]);
  }
  
  this.movePtAtoB = function(){
    
  } 
}