/*
clone man pac

game clone of pac man using javascript and p5.js

wisemonkey
oranbusiness@gmail.com
20180903
github.com/wisehackermonkey

*/
// var pacman;
var game;

// var myAngle = 10;
var size;
//enums for directions
var gui;
var strength = 0.03;
var drag = 0.85;
var speed = 3;

var strengthMin = 0.01;
var strengthStep = 0.01;
var strengthMax = 1;

var dragMin = 0.1;
var dragMax = 0.99;
var dragStep = 0.01;


var stars;

// Helper functions

//https://stackoverflow.com/a/6000016/5460870
var isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

// transpose(matrix)
// https://stackoverflow.com/a/13241545/5460870
p5.prototype.transpose = function(a) {
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r) {
      return r[c];
    });
  });
}

function setup() {
  createCanvas(600, 600);
  background(50);
  size = 33;
  angleMode(DEGREES);
  noStroke();

  gui = createGui("pacman", 550, 10);
  gui.addGlobals('speed', 'drag', 'strength');

  strength = 0.03;
  drag = 0.85;

  game = new Game();
  game.init();

  stars = new World();
  stars.init();

}

function draw() {
  background(50);

  game.show();
  var event = game.collsions();
  if (isFunction(event)) {
    event(game.player);
  }
  var eventScren = game.screenwrap();
  if (isFunction(eventScren)) {
    eventScren(game.player);
  }
  game.player.move();
  game.player.show();
  
  stars.applyFX();
  stars.wallCheck();
  stars.show();
  
}

function Item(x, y) {
  var sp = random(-0.1, -0.5);

  this.pos = createVector(x, y);
  this.vel = createVector(sp * 3, 0);
  this.w = sp * 10;
  this.h = sp * 10;

  this.show = function() {
    push();
      fill(255,255,255,150);
      ellipse(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }

  this.force = function() {
    this.pos.add(this.vel);
  }
}

function World() {
  this.sprites = [];
  this.init = function() {
    for (var i = 0; i < 300; i += 1) {
      this.sprites.push(new Item(random(width), random(height)));
    }
  }
  this.show = function() {
    for (var i = 0; i < this.sprites.length; i += 1) {
      this.sprites[i].show();
    }
  }
  this.applyFX = function() {
    for (var i = 0; i < this.sprites.length; i += 1) {
      this.sprites[i].force();
    }
  }

  this.wallCheck = function() {
    for (var i = 0; i < this.sprites.length; i += 1) {
      if (this.sprites[i].pos.x > width) {
        this.sprites[i].pos.x = -10;
      }
      if (this.sprites[i].pos.x < 0) {
        this.sprites[i].pos.x = width;
      }
    }
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    game.player.moveDir('up');
  } else if (keyCode === DOWN_ARROW) {
    game.player.moveDir('down');
  } else if (keyCode === RIGHT_ARROW) {
    game.player.moveDir('right');
  } else if (keyCode === LEFT_ARROW) {
    game.player.moveDir('left');
  } else if (keyCode === 82) { //"r" = 82
    game.player.Reset(10, 100);
  }
}