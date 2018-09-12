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

