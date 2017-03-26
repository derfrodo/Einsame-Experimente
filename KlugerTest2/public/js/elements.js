const P_DRAW_FRAME = "Draw Every Frame";
const P_FRAME_RATE = "Frame Rate";

const paragraphs = [];

const settings = new (function () {
    this.generationSize = 255;
    this.startPoint = new Point(10, 240);

})();


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
}