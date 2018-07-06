var x = 0 , y = 10;
var width = 15;
var height = 15;
var stage;
var square;
function init() {
    stage = new createjs.Stage("demoCanvas");
    square = new createjs.Shape();
    square.graphics.beginFill("red").rect(x,y,width,height);
    stage.addChild(square);
    stage.update();
}

document.addEventListener('keydown' ,(event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowRight'){
        x = x + 5;
        square.x = x; 
        stage.update();
    }
    if (keyName === 'ArrowLeft'){
        x =  x - 5;
        square.x = x;
        stage.update();
    }
})