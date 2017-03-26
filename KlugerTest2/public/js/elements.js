const P_DRAW_FRAME = "Draw Every Frame";
const P_FRAME_RATE = "Frame Rate";

const paragraphs = [];

const C_CANVAS = "Canvas";
const canvases = [];

const settings = new (function () {

    this.frameRate = 0;

    this.generationSize = 255;


    this.startPoint = new Point(10, 240);


    this.cellSize = 10;
    this.cols = 0;
    this.rows = 0;




})();

const cells = [];

function Point(x_, y_) {
    // this.x = x_;
    // this.y = y_;
    const x = x_;
    const y = y_;

    this.copy = () => {
        return new Point(this.x, this.y);
    }
}

function DNA(angle_) {
    const angle = angle_;

    this.copy = () => {
        return angle;
    }

    this.calculateDirection = (oldAngle) => {

    }
}

function Cell(row_, col_) {
    const col = col_;
    const row = row_;
}