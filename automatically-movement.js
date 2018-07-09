var stage, circle;
function init(){
    stage = new createjs.Stage("demoCanvas");
    circle = new createjs.Shape();
    circle.x = 10;
    circle.y = 10;
    circle.graphics.beginFill("black").drawCircle(10,10,10);
    stage.addChild(circle);
    stage.update();

    createjs.Ticker.on('tick',tick);

    createjs.Ticker.setFPS(100);
    
}

function tick(){
    circle.x = circle.x + 5;
    if(circle.x > stage.canvas.width){
        circle.x = 0;
    }

    stage.update();
};