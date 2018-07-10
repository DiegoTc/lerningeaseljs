var stage,circle;
var spriteSheet;
var x = 100;
var grant;
var x = Math.floor((Math.random() * 500) + 1);
var y = Math.floor((Math.random() * 500) + 1);
function init() {
    stage = new createjs.Stage("demoCanvas");
    circle = new createjs.Shape();
    spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": ["man2_rt1.gif","man2_rt2.gif","man2_Up_rt1.gif","man2_Up_rt2.gif","man2_Down_rt1.gif","man2_Down_rt2.gif"],
        //Changing regX to 16, original value was 82.
        //Still need to understand why
        "frames": {"regX": 16, "height": 32, "count": 6, "regY": 0, "width": 32},
        "animations": {
            /*Changing the way this is done, Using option number for for non-consecutive frames
            "run": [0,1,"run",1],
            "stop": [0,"stop",0]
            */
           "runRight":{
               frames: [1,0],
               next: "runRight",
               speed: 1
           },
           "runUp":{
                frames: [3,2],
                next: "runUp",
                speed: 1
           },
           "runDown":{
            frames: [5,4],
            next: "runDown",
            speed: 1
       },
           "stopRight": [0,"stopRight",0],
           "stopUp": [2,"stopUp",2],
           "stopDown": [4,"stopUp",4]
        }
    });

    /*With one sprite I can manage everything*/
    grant = new createjs.Sprite(spriteSheet, "stopRight");
    grant.x = 50;
    grant.y = 50;

    circle.graphics.beginFill("black").drawCircle(x,y,10);

    stage.addChild(grant);
    stage.addChild(circle);
    createjs.Ticker.addEventListener("tick", tickFn);
    createjs.Ticker.on('tick',tick);
    createjs.Ticker.setFPS(15);
    stage.update();

}

function reset(){
    stage.removeAllChildren();
    stage.update();
}

/*Instead of moving the sprites when pressing the keyboard, I trigger a loop for the
animation*/
var moving = false, dir = 0, mw = false,position = "0";;
document.addEventListener('keydown' ,(event) =>{
    const keyName = event.key;
    var wasMoving = moving; 
    switch(keyName){
        case 'ArrowRight':
            moving = true;
            grant.scaleX = 1;
            dir = 1;
            position = "X";
            break;
        case 'ArrowLeft':
            moving = true;
            grant.scaleX = -1;
            dir = -1;
            position = "X";
            break;
        case 'ArrowUp':
            moving = true;
            dir = -1;
            position = "Y";
            break;
        case 'ArrowDown':
            moving = true;
            dir = 1;
            position = "YDown";
            break;
    }

    if (moving != wasMoving){
        if(position === "X"){
            grant.gotoAndPlay("runRight");
        }
        else if(position === "Y"){
            grant.gotoAndPlay("runUp");
        }
        else if(position === "YDown"){
            grant.gotoAndPlay("runDown");
        }
    }
    event.preventDefault();
});

document.addEventListener('keyup',e=>{
    const keyName = event.key;
    if(keyName === "ArrowRight" || keyName === "ArrowLeft" ){
        moving = false;
        grant.gotoAndStop("stopRight");        
        position = "0";
    }
    else if(keyName === "ArrowUp"){
        moving = false;
        grant.gotoAndStop("stopUp");
        position = "0";
    }
    else if(keyName === "ArrowDown"){
        moving = false;
        grant.gotoAndStop("stopDown");
        position = "0";
    }
    event.preventDefault();
});

function tickFn(event) {
    if (moving) {
      if(grant.x > stage.canvas.width){
        grant.x = 50;
      }
      else if (grant.x < 0) {
        grant.x = stage.canvas.width;
      }
      else if (grant.y < 0){
        grant.y = stage.canvas.height;
      }
      else if(grant.y > stage.canvas.height){
        grant.y = 50;
      }
      if(position === "X"){
        grant.x += 10*dir;
      }
      else if(position === "Y" || position === "YDown"){
          grant.y += 10*dir;
      }
    }
    stage.update(event);
  };

  function tick(){
    
    //circle.x = circle.x + 5;
    if(circle.x > stage.canvas.width){
        circle.x = x;
    }
    else if(circle.x<0){
        circle.x = stage.canvas.width;
    }
    else if(circle.y < 0){
        circle.y = stage.canvas.height;
    }
    else if(circle.y > stage.canvas.height){
        circle.y = y;
    }
    circle.x = circle.x + 10;
    circle.y = circle.y + 10;
    stage.update();
};