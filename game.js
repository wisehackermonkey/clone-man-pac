

// transpose(matrix)
// https://stackoverflow.com/a/13241545/5460870
p5.prototype.transpose = function(a) {
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r) {
      return r[c];
    });
  });
}

//https://github.com/bmoren/p5.collide2D
var detectRect = function(a, b) {
  var ax = a.pos.x;
  var ay = a.pos.y;
  var aw = a.w;
  var ah = a.h;

  var bx = b.pos.x;
  var by = b.pos.y;
  var bw = b.w;
  var bh = b.h;

  return collideRectRect(ax, ay, aw, ah, bx, by, bw, bh);
}


function Wall(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);

  this.w = 30;
  this.h = 30;
  this.clr = color("black");

  this.show = function() {
    push();
      // strokeWeight(2);
      fill(this.clr);
      rect(this.pos.x, this.pos.y, this.w+1, this.h+1);
    pop();
  }
  this.move = function() {
    this.pos.add(this.vel);
  }
}

//game class
//init creates game map based on 1,0 values from "grid"
//and makes map seen in game

//grid is made up of walls that the player cant pass through

function Game() {
  this.walls = [];
  this.player;
  
  this.initTest = function(){
    this.walls.push(new Wall(100, 100));
    this.walls.push(new Wall(100, 250));
    this.walls.push(new Wall(0 * 100, 0 * 100));
    this.walls.push(new Wall(0 * 100, 0 * 100));
    this.player = new Character(31, 31);
  }
  
  this.init = function() {

    var grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    grid = transpose(grid);
    size = 31;
    
    var nbeginX = 0;
    var nbeginY = 0;
    var nwidth = grid.length;
    var nheight = grid[0].length;

    for (var i = nbeginX, x = 0; i < nwidth * size; i += size, x++) {
      for (var j = nbeginY, y = 0; j < nheight * size; j += size, y++) {
        if (grid[x][y] === 1) {
          this.walls.push(new Wall(i, j));
        }
      }
    }
    
    this.player = new Character(31, 31);
  }
  this.show = function() {
    for (var i = 0; i < this.walls.length; i += 1) {
      this.walls[i].show();
    }
  }
  
  var event = function(player) {
    
    var prev = player.pos.copy();
    var dir = player.vel.copy();
    //dont move
    dir.mult(-1);
    
    //stop player's movement
    player.vel.set(0, 0); 
    
    // move 1 pixel in the opsite direction as sprite came
    player.pos.set(prev.x + dir.x, prev.y + dir.y);
  }
  this.collsions = function() {

    for (var i = 0; i < this.walls.length; i += 1) {
      if (detectRect(this.walls[i], this.player)) {
        this.player.clr = color('green');
        this.walls[i].clr = color("red");
        return event;
      }
    }
  }
  this.screenwrap = function(){
    return function(item){
      if(item.pos.x > width){
        item.pos.set(0,item.pos.y);
      }
      
      if(item.pos.x < 0){
        item.pos.set(width,item.pos.y);
      }
      
    }
  }
}