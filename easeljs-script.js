function init() {
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    circle.x = 10;
    circle.y = 5;
    stage.addChild(circle);
    stage.update();


    for(var i=0;i<=10;i++){
        var x = Math.floor((Math.random() *200)+1)
        var y = Math.floor((Math.random() *200)+1);
        var radius = Math.floor((Math.random() * 5)+1);
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(x,y,radius);
        circle.x = x+50;
        circle.y= y+50;
        stage.addChild(circle);
        stage.update();   
    }


}

