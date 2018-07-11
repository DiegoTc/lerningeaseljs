var stage, circle, spriteSheet, grant, output_txt, circle;
var tick = 0;
var xP = 50;
var yP = 50;
var xT = 200;
var yT = 200;
var dirX = 1;
var dirY = 1;
function init() {
    stage = new createjs.Stage("demoCanvas");
    circle = new createjs.Shape();

    spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": ["man2_rt1.gif", "man2_rt2.gif", "man2_Up_rt1.gif", "man2_Up_rt2.gif", "man2_Down_rt1.gif", "man2_Down_rt2.gif"],
        //Changing regX to 16, original value was 82.
        //Still need to understand why
        "frames": { "regX": 16, "height": 32, "count": 6, "regY": 0, "width": 32 },
        "animations": {
            /*Changing the way this is done, Using option number for for non-consecutive frames
            "run": [0,1,"run",1],
            "stop": [0,"stop",0]
            */
            "runRight": {
                frames: [1, 0],
                next: "runRight",
                speed: 1
            },
            "runUp": {
                frames: [3, 2],
                next: "runUp",
                speed: 1
            },
            "runDown": {
                frames: [5, 4],
                next: "runDown",
                speed: 1
            },
            "stopRight": [0, "stopRight", 0],
            "stopUp": [2, "stopUp", 2],
            "stopDown": [4, "stopUp", 4]
        }
    });

    /*With one sprite I can manage everything*/
    grant = new createjs.Sprite(spriteSheet, "stopRight");
    grant.x = 300;
    grant.y = 350;
    stage.addChild(grant);

    circle.graphics.beginFill("DeepSkyBlue").drawCircle(50, 34, 10);
    circle.x = 50;
    circle.y = 50;
    stage.addChild(circle);

    createjs.Ticker.addEventListener("tick", tickFn);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(25);

    output_txt = new createjs.Text("xT:" + xT + ",yT:" + yT, "15px Arial", "#ff7700");
    output_txt = new createjs.Text("xT:" + xT + ",yT:" + yT, "15px Arial", "#ff7700");
    output_txt.x = 20;
    output_txt.y = 20;
    output_txt.textBaseline = "alphabetic";
    stage.addChild(output_txt);

    stage.update();

}

function reset() {
    stage.removeAllChildren();
    stage.update();
}

/*Instead of moving the sprites when pressing the keyboard, I trigger a loop for the
animation*/
var moving = false, dir = 0, mw = false, position = "0";;
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    var wasMoving = moving;
    switch (keyName) {
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

    if (moving != wasMoving) {
        if (position === "X") {
            grant.gotoAndPlay("runRight");
        }
        else if (position === "Y") {
            grant.gotoAndPlay("runUp");
        }
        else if (position === "YDown") {
            grant.gotoAndPlay("runDown");
        }
    }
    event.preventDefault();
});

document.addEventListener('keyup', e => {
    const keyName = event.key;
    if (keyName === "ArrowRight" || keyName === "ArrowLeft") {
        moving = false;
        grant.gotoAndStop("stopRight");
        position = "0";
    }
    else if (keyName === "ArrowUp") {
        moving = false;
        grant.gotoAndStop("stopUp");
        position = "0";
    }
    else if (keyName === "ArrowDown") {
        moving = false;
        grant.gotoAndStop("stopDown");
        position = "0";
    }
    event.preventDefault();
});

function tickFn(event) {
    if (moving) {
        if (grant.x > stage.canvas.width) {
            grant.x = 50;
        }
        else if (grant.x < 0) {
            grant.x = stage.canvas.width;
        }
        else if (grant.y < 0) {
            grant.y = stage.canvas.height;
        }
        else if (grant.y > stage.canvas.height) {
            grant.y = 50;
        }
        if (position === "X") {
            grant.x += 10 * dir;
        }
        else if (position === "Y" || position === "YDown") {
            grant.y += 10 * dir;
        }
    }
    stage.update(event);
};



function handleTick() {
    if (tick > 100) {
        xT = Math.ceil(Math.random() * 500) + 100;
        yT = Math.ceil(Math.random() * 500) + 100;
        output_txt.text = "xT:" + xT + ",yT:" + yT;
        tick = 0;
    }
    if(circle.x>stage.canvas.width){
        circle.x = circle.x -150;
    }
    else if(circle.x < 0){
        circle.x = circle.x + 150
    }
    if (circle.y > stage.canvas.height){
        circle.y = circle.y -150;
    }
    else if(circle.y < 0){
        circle.y = circle.y + 150;
    }
    tick++;

    xP += (xT - xP) / 15;
    yP += (yT - yP) / 15

    circle.x += ((xP - circle.x) / 60);
    circle.y += ((yP - circle.y) / 60);
    //*/
    stage.update();


};