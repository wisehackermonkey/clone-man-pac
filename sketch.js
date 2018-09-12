/*
clone man pac

game clone of pac man using javascript and p5.js

wisemonkey
oranbusiness@gmail.com
20180903
github.com/wisehackermonkey

*/
var packman;
var myAngle = 10;
var size;
//enums for directions
var gui;
var tileLayout;
var walls = [];
// Helper functions

// transpose(matrix)
// https://stackoverflow.com/a/13241545/5460870
p5.prototype.transpose = function (a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
}

function setup() {
  createCanvas(600,600);
  background(50);
  size = 33;
  angleMode(DEGREES);
  noStroke();
  
  // packman.w = size;
  // packman.h = size;
  
  gui = createGui("Packman", 550,10);
  gui.addGlobals('size');
  
  
  // tileLayout = [
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  //   [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  // ];
  
  tileLayout = [
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
 
  ];
 
  packman = new Character(1*size+30/2,1*size+30/2,tileLayout);
  tileLayout = transpose(tileLayout);
  var nbeginX  = 0;
  var nbeginY  = 0;
  var nwidth = tileLayout.length;
  var nheight = tileLayout[0].length;
  
  for (var i = nbeginX,x=0; i < nwidth * size; i += size,x++) {
    for (var j = nbeginY,y=0; j < nheight * size; j += size,y++) {
     if(tileLayout[x][y] === 1){
       noStroke();
      rect(i, j, size - 1, size - 1);
      stroke(1);
      walls.push(new Wall(i,j,size -1,size -1));

     }
    }
  }
}

function draw() {
    background(50);
  
  // var nwidth = 17;//width/size;
  // var nheight = 19;//height/size;
  for(var i = 0; i < walls.length; i+=1){
    if(packman.detectCircle(walls[i])){
      fill(color("red"));
      // packman.setDir("STOP");
      // if(packman.direction === "UP"){
      //   packman.direction = "STOP";
      // }
      // print(packman.pos)
    }
    walls[i].show();
    
  }
  
  // for(var i = nbeginX; i < nwidth * size; i+=size){
  //   for(var j = nbeginy; j < nheight * size; j+=size){
  //   	rect(i,j,size-1,size-1);
  //   }
  // }
  packman.key_input();
  packman.move();

  packman.show();
}


function Wall(x,y,w,h){
  this.pos = createVector(x,y);
  this.w = w;
  this.h = h;
  this.show = function(){
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}

function mousePressed(){
  
}
