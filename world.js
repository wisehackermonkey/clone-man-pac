
function Item(x,y){
  
  
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.w = 100;
  this.h = 100;
  this.contact = false;
  
  
  this.show = function(){
    push();//isolated the color from other items
      if(this.contact){
        fill(color("green"));
      }
      rect(this.pos.x, this.pos.y, this.w,this.h);
    pop();
  }
  
  this.force = function(){
    this.pos.add(this.vel);
  }
  
  this.colilide = function(box){
    var p = box.pos;
    var d = box;
    var result = collideRectRect(p.x,p.y,d.w,d.h,this.pos.x,this.pos.y,this.w,this.h);
    this.contact = result;
    return this;
  }
}

function World(){
  this.sprites = [];
  this.init = function(){
    for(var i = 0; i < 3; i+=1){
      this.sprites.push(new Item(width/2,i * 101));
    }
       for(var i = 0; i < 5; i+=1){
      this.sprites.push(new Item(width/2 + i* 101,i * 101));
    }
  }
  
  this.initRandom = function(){
    for(var i = 0; i < 1; i+=1){
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
  this.collisions = function(target){
    for(var i = 0; i < this.sprites.length; i+=1){
      this.sprites[i].colilide(target);
      if(this.sprites[i].contact){

        packman.direction.mult(-1);
        if(packman.direction.equals(1,0)){
          packman.direction.set(0,0);
        }else{
          packman.direction.set(0,0);
          packman.pos.set(packman.pos.x-1,packman.pos.y);
        }
      }
      
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
