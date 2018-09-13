
function Item(x,y){
  
  
  this.pos = createVector(x,y);
  this.vel =  createVector(0,0);
  this.w = 10;
  this.h = 10 ;
  
  
  
  this.show = function(){
    rect(this.pos.x, this.pos.y, this.w,this.h);
  }
  
  this.force = function(){
    this.pos.add(this.vel);
  }
}

function World(){
  this.sprites = [];
  this.init = function(){
    for(var i = 0; i < 300; i+=1){
      this.sprites.push(new Item(random(width),random(height)));
    }
  }
  this.show = function(){
    for(var i = 0; i< this.sprites.length; i+=1){
      this.sprites[i].show();
    }
  }
  this.applyFX = function(){
    for(var i = 0; i< this.sprites.length; i+=1){
      this.sprites[i].force();
    }
  }
  
  this.wallCheck = function(){
    for(var i = 0; i< this.sprites.length; i+=1){
      if(this.sprites[i].pos.x > width){
        this.sprites[i].pos.x = -10;
      }
      if(this.sprites[i].pos.x < 0){
        this.sprites[i].pos.x = width;
      }
    }
  }
}
