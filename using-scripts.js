var stage;
function init() {
    stage = new createjs.Stage("demoCanvas");

    var spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": ["man2_rt1.gif","man2_rt2.gif"],
        "frames": {"regX": 82, "height": 32, "count": 2, "regY": 0, "width": 32},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "run": [0, 1, "run", 1],
            "jump": [26, 63, "run"]
        }
    });

    var grant = new createjs.Sprite(spriteSheet, "run");
	grant.x = stage.canvas.width / 2;
	grant.y = 22;

	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(grant);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);

}
