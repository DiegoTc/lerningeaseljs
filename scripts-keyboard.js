var stage;
var spriteSheet;
var x = 100;
var grant;
var begin;
function init() {
    stage = new createjs.Stage("demoCanvas");
    spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": ["https://preview.ibb.co/eLKC7T/man2_rt1.gif","https://preview.ibb.co/ccR3E8/man2_rt2.gif"],
        "frames": {"regX": 82, "height": 32, "count": 2, "regY": 0, "width": 32},
        "animations": {
            "run": [0,1,"run",1],
            "stop": [0,"stop",0]
        }
    });
    grant = new createjs.Sprite(spriteSheet, "run");
    begin = new createjs.Sprite(spriteSheet,"stop");
    begin.x = 150;
    begin.y = 50;
    grant.x = 150;
    grant.y = 50;
    
    stage.addChild(begin);
    createjs.Ticker.addEventListener("tick", stage);

}

function reset(){
    stage.removeAllChildren();
    stage.update();
}

document.addEventListener('keydown' ,(event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowRight'){
        if(begin != null){
            stage.removeChild(begin);
            begin = null;
        }
        if(grant.x > stage.canvas.width){
            grant.x = 150;
        }
        stage.addChild(grant);
        createjs.Ticker.addEventListener("tick", stage);
        grant.x = grant.x+10;
 
    }
})