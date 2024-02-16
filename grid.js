
var scaleGrid = 40;
// var worldstart;
// var worldWidth = cols * scaleGrid;
// var worldHeight = rows * scaleGrid;


class Level {
    constructor(plan) {

        this.plan = plan;

        this.cell = [];

        this.cols = this.numberOfcols();
        this.rows = this.numberOfrows();

        this.cell = make2DArray(this.cols, this.rows);

        //console.log(this.rows + "   " + this.cols);
        // console.log(this.cell);

        for (var x = 0; x < this.cols; x++) {
            for (var y = 0; y < this.rows; y++) {
                this.cell[x][y] = {
                    x: x * scaleGrid,
                    y: y * scaleGrid,
                    width: scaleGrid,
                    height: scaleGrid,
                    block: 0
                }
            }
        }

        //console.log(this.cell[6][0]);

        var currentX = 0;
        var currentY = 0;
        for (var a = 0; a < this.plan.length; a++) {

            if (this.plan.charAt(a) == " ") {

            } else {

                if (this.plan.charAt(a) == "/") {
                    currentY++;
                    currentX = 0;

                } else if (this.plan.charAt(a) == "=") {
                    this.cell[currentX][currentY].block = 1;
                    currentX++;

                } else if (this.plan.charAt(a) == ".") {
                    this.cell[currentX][currentY].block = 0;

                    currentX++;
                }
            }

        }

    }


    render() {
        for (var x = 0; x < this.cols; x++) {
            for (var y = 0; y < this.rows; y++) {

                push();

                if (this.cell[x][y].block == 1) {
                    translate(this.cell[x][y].x, this.cell[x][y].y)
                    strokeWeight(2);
                    fill(51);


                    if (player.col.bottom_cell.x == x && player.col.bottom_cell.y == y) {
                        fill(255,0,0);
                    } else if (player.col.top_cell.x == x && player.col.top_cell.y == y) {
                        fill(255,0,0);
                    } else if (player.col.right_cell.x == x && player.col.right_cell.y == y) {
                        fill(255,0,0);
                    } else if (player.col.left_cell.x == x && player.col.left_cell.y == y) {
                        fill(255,0,0);
                    }

                    stroke(0);
                    var a = x * scaleGrid - player.pos.x;
                    var b = y * scaleGrid - player.pos.y;
                    var distence = Math.sqrt( a*a + b*b );

                    var precent = map(distence, 300, 400, 1, 0.00);
                    precent = constrain(precent, 0, 1)

                    if (precent > 0.01) {
                        rect(0, 0, this.cell[x][y].width * precent, this.cell[x][y].height * precent);
                    }
                }

                pop();
            }
        }
    }

    numberOfrows() {

        var c = 0;
        for (var a = 0; a < this.plan.length; a++) {
            if (this.plan.charAt(a) == "/") {
                c++;
            }
        }
        return c;


    }

    numberOfcols() {
        var b = 0;
        for (var a = 0; a < this.plan.length; a++) {
            if (this.plan.charAt(a) == " ") {
                b++;
            }

            if (this.plan.charAt(a) == "/") {
                return a - b;
            }
        }
    }


}

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}