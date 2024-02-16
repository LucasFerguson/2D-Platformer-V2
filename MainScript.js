
var player;
var level1;

var levels = [];

var textfield;
var submit;


var curentLevel = 0;

function newlevel() {
    levels[levels.length] = new Level(textfield.value());
    curentLevel++;
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    //player = new Player(0, 0, playerwidth, playerheight); 
    player = new Player2D();

    submit = select("#submit");
    textfield = select("#textfield");
    textfield.value(`
        =....................................................................................../
        =....................................................................................../
        =.....====......====....====....=====....====...=======......=====...................../
        =....................................................................................../
        =..................................................................................... /
        =...................====....====.....====....===.......===.......===.......===....=./
        =.....====....==....====....==.........==....===.......===.......===.......===....=./
        ==========....==....====....==.........==....===.......===.......===.......===....=./
        =.............==....====...................................................===....=./
        =.................................................................................=./
        =..==.............................................................................=./
        =...................====....==.........==....===.......===.......===.......===....=./
        ==========....==....====....==...==....==....===.......===.......===.......===....=./
        `);
    submit.mousePressed(newlevel);

    textfield.position(70,10);
    submit.position(10,10);

    var simpleLevelPlan =
        `
        =....................................................................................../
        =....................................................................................../
        =.....====......====....====....=====....====...=======......=====...................../
        =....................................................................................../
        =..................................................................................... /
        =...................====....====.....====....===.......===.......===.......===....=./
        =.....====....==....====....==.........==....===.......===.......===.......===....=./
        ==========....==....====....==.........==....===.......===.......===.......===....=./
        =.............==....====...................................................===....=./
        =.................................................................................=./
        =..==.............................................................................=./
        =...................====....==.........==....===.......===.......===.......===....=./
        ==========....==....====....==...==....==....===.......===.......===.......===....=./
        `;

    // . - state 0 empty block
    // = - state 1 full block
    // / - new line
    
    levels[0] = new Level(simpleLevelPlan1);




    // for (var x = 0; x < cols; x++) {
    //     grid[x][8].block = 1;
    // }

    console.log(`
    . - state 0 empty block
    = - state 1 full block
    / - new row
    
    newlevel()
    `);

}



function draw() {
    background(150);
    translate(
        -player.pos.x + (width / 2) - (player.width / 2), // X
        -player.pos.y + (height / 2) - (player.height / 2) // Y
    );
    //translate(width / 2, height / 2);
    //translate(0, 190);

    /// Don't Draw anything above this ///
    
    levels[curentLevel].render();


    push();
    strokeWeight(10);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    point(0, 0);
    pop();


    var gravity = createVector(0, 0.4);
    player.applyForce(gravity);

    player.update();
    player.render();



    // push();
    // translate(player.pos.x, player.pos.y - player.vel.y);
    // stroke(0, 255, 0);
    // fill(0, 255, 0);
    // strokeWeight(0.5);
    // text(" pos   x " + Math.round(player.pos.x) + "  y " + player.pos.y, 0, 0 - 100);
    // text(" vel   x " + Math.round(player.vel.x) + "  y " + player.vel.y, 0, 0 - 80);
    // //text(player.onGround, player.pos.x, player.pos.y - 80);
    // text("" + fps, 0, 0 - 60);

    // text("top       " + player.col.top, 0, 0 - 110);
    // text("bottom    " + player.col.bottom, 0, 0 - 120);
    // text("left      " + player.col.left, 0, 0 - 130);
    // text("right     " + player.col.right, 0, 0 - 140);

    // text("jumping " + player.jumping, 0, 0 - 180);


    // pop();


}





function colCheck(shapeA, shapeB) {

    // get the vectors to check against
    var vX = (shapeA.pos.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.pos.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2);

    var colDir = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);

        if (oX >= oY) {
            if (vY > 0) {
                colDir.top = true;
                shapeA.pos.y += oY;
                shapeA.vel.y = 0;

            } else {
                colDir.bottom = true;
                shapeA.pos.y -= oY;
                shapeA.vel.y = 0;
            }

        } else {
            if (vX > 0) {
                colDir.left = true;
                shapeA.pos.x += oX;
                shapeA.vel.x = 0;

            } else {
                colDir.right = true;
                shapeA.pos.x -= oX;
                shapeA.vel.x = 0;
            }
        }
    }


    return colDir;
}













const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        //console.log(fps);
        refreshLoop();
    });
}

refreshLoop();