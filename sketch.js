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
var chompspeed = 45;
var world;
var gui ;
//enums for directions

function setup() {
  createCanvas(600,600);
  background(50);
  noStroke();
  ellipseMode(CENTER);
 gui = createGui("Settings");
  gui.addGlobals("chompspeed");
  world = new World();
  world.init();

  packman = new Character(0,300);
  angleMode(DEGREES);
}

function draw() {
  background(50);
  text("WASD to move, colide with blocks",30, height-20);
  // world.applyFX();
  // world.wallCheck();
  
  world.collisions(packman);
  world.show();
  
  
  packman.key_input();
  packman.move();

  packman.show();
}

