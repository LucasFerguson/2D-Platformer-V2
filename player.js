class Player2D {
    constructor() {

        this.pos = createVector(100, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.mass = 2;

        this.height = 10;
        this.width = 10;

        this.jumping = false;
        this.jumpTime = 0;
        this.canJumpAgain = true;

        this.col = {
            top: false,
            top_cell: 0,

            bottom: false,
            bottom_cell: 0,

            left: false,
            left_cell: 0,

            right: false,
            right_cell: 0
        };

        this.keybindings = {
            up: 87,
            down: 83,
            left: 65,
            right: 68,
            shoot: 71,
            shoot2: 72,
            shoot3: 74
        }

    }

    update() {
        this.movementControls();

        this.vel.add(this.acc);

        // var av = this.vel;
        // av = av.mult(0.5);
        // this.pos.add(av );
        // this.pos.add(av );
        // this.pos.add(this.vel.mult(0.5) );

        this.pos.x += this.vel.x ;
        this.pos.y += this.vel.y ;

        this.checkEdges();

        this.acc.mult(0);

        if (this.col.bottom) {
            this.vel.x *= 0.85;
        } else {
            this.vel.x *= 0.94;
        }

        // if (this.col.left || this.col.right) {
        //     this.vel.y *= 0.85;
        // }

        if (this.pos.y > 2000) {
            this.pos = createVector(100, -600)
        }

    }

    checkEdges() {
        this.col.bottom_cell = false;
        this.col.top_cell = false;
        this.col.left_cell = false;
        this.col.right_cell = false;

        this.col.bottom = false;
        this.col.top = false;
        this.col.left = false;
        this.col.right = false;

        for (var x = 0; x < levels[curentLevel].cols; x++) {
            for (var y = 0; y < levels[curentLevel].rows; y++) {

                var distence = Math.sqrt( 
                    Math.pow(x * scaleGrid - this.pos.x, 2) 
                    + 
                    Math.pow(y * scaleGrid - this.pos.y, 2) 
                );

                if (levels[curentLevel].cell[x][y].block == 1 && distence < 300) {
                    var collison = colCheck(player, levels[curentLevel].cell[x][y]);

                    if (collison.bottom == true) {
                        this.col.bottom_cell = createVector(x, y)
                        this.col.bottom = true;
                    }

                    if (collison.top == true) {
                        this.col.top_cell = createVector(x, y)
                        this.col.top = true;
                    }

                    if (collison.left == true) {
                        this.col.left_cell = createVector(x, y)
                        this.col.left = true;
                    }

                    if (collison.right == true) {
                        this.col.right_cell = createVector(x, y)
                        this.col.right = true;
                    }
                }


            

                

            }
        }


    }

    render() {
        push();
        noFill();
        stroke(0, 255, 0);
        point(this.pos.x, this.pos.y);
        //rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.width, this.height);

        fill(0, 255, 0);
        //text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y - 30);

        noFill();
        //ellipse(this.pos.x, this.pos.y, 500, 500);

        pop();
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    movementControls() {
        if (keyIsDown(this.keybindings.left) && Math.abs(this.vel.x) < 4) {
            this.applyForce(createVector(-5, 0));
        }

        if (keyIsDown(this.keybindings.right) && Math.abs(this.vel.x) < 4) {
            this.applyForce(createVector(5, 0));
        }

        if ( keyIsDown(16) ) {
            if (Math.abs(this.vel.x) > 1 && this.col.bottom) {
                this.vel.x *= 0.5 ;
            }
            if (Math.abs(this.vel.y) > 1 && (this.col.right || this.col.left) ) {
                this.vel.y *= 0.3 ;
            }
        }
        
        if (this.col.right || this.col.left) {
            this.vel.y *= 0.9 ;
        }

        this.jumping = false;
        var canJump = false;
        
        if (this.col.bottom == true || this.col.right == true || this.col.left == true) {
            canJump = true;
        }

        if (keyIsDown(this.keybindings.up) && canJump && !this.pastUpArrow) { //this.col.bottom == true

            this.applyForce(createVector(0, -10));
            this.jumping = true;
            this.jumpTime = 0;

            if (this.col.right == true) {
                this.applyForce( createVector(-25, -3) );
            }

            if (this.col.left == true ) {
                this.applyForce( createVector(25, -3) );
            }

        } else if (keyIsDown(this.keybindings.up) && !(this.jumpTime > 40)) {
            this.jumpTime++;
            this.applyForce( createVector(0, -0.2) );
            this.jumping = true;
            //console.log("adding" );
        } else {
            this.jumping = false;
        }

        this.canJumpAgain = false;
        if ( !keyIsDown(this.keybindings.up) && this.pastUpArrow ) {
            this.canJumpAgain = true;
        }

        this.pastUpArrow = keyIsDown(this.keybindings.up);

        
    }
}