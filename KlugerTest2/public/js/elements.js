"use strict"

const P_DRAW_FRAME = "Draw Every Frame";
const P_FRAME_RATE = "Frame Rate";

const paragraphs = [];

const C_CANVAS = "Canvas";
const canvases = [];

const settings = new (function () {

    this.frameRate = 0;

    this.generationSize = 255;


    this.startPoint = new Point(10, 240);


    this.cellSize = 40;
    this.cols = 0;
    this.rows = 0;


})();

let grid;//= new Grid();

function Point(x_, y_) {
    // this.x = x_;
    // this.y = y_;
    this.x = x_;
    this.y = y_;

    this.copy = () => {

        return new Point(this.x, this.y);
    }
}

function DNA(angle_) {
    this.angle = angle_;

    this.copy = () => {
        return angle;
    }

    this.calculateDirection = (oldAngle) => {

    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.color = {};
        this.text = "";
        this._angle = 0;
        this._direction = createVector(1, 0);
    }

    get x() {
        return this.col * (settings.cellSize);
    }

    get y() {
        return this.row * (settings.cellSize);
    }

    set angle(angle) {
        this._angle = angle;
        this._direction = p5.Vector.fromAngle(angle);
    }

    show() {

        let c = this.color;

        noFill()
        stroke(c.v1, c.v2, c.v3,64)
        rect(this.x, this.y, settings.cellSize - 1, settings.cellSize - 1)

        // noStroke();
        // fill(c.v1, c.v2, c.v3)
        // textAlign(CENTER, CENTER);
        // textSize(10);
        // text(this.text, this.x + settings.cellSize / 2, this.y + settings.cellSize / 2);


        let lmx = this.x + settings.cellSize /2;
        let lmy = this.y + settings.cellSize /2;
        let hcs = settings.cellSize / 4;

        line(lmx + (this._direction.x * hcs),
            lmy + (this._direction.y * hcs),
            lmx - (this._direction.x * hcs),
            lmy - (this._direction.y * hcs))

    }
}


class Grid {

    constructor() {
        this.data = [];
    }


    /** 
     * Ich tu allg. was
     * @description Ich tu was
     * @returns {Cell} 
     */
    getCell(rowOrIndex, col) {
        /// <summary>Liefert eine Zelle zurück, welche dem index entspricht oder der row, col Kombination sofern eine col angegeben wird</summary>  
        /// <returns type="Cell">The area.</returns>  
        let index = (!col && col !== 0) ? rowOrIndex : this.calculateIndex(rowOrIndex, col);
        return this.data[index];
    }

    setCell(row, col, data_) {
        let index = this.calculateIndex(row, col);
        this.data[index] = data_;
    }

    calculateIndex(row, col) {
        let index = col + (settings.cols) * row;
        return index;
    }

    *getIndexes() {
        for (let index in this.data) {
            yield index;
        }
    }

}