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
    }

    get x() {
        return this.col * (settings.cellSize);
    }

    get y() {
        return this.row * (settings.cellSize);
    }

    show() {

        let c = this.color;
        noFill()
        stroke(c.v1, c.v2, c.v3)
        rect(this.x, this.y, settings.cellSize - 1, settings.cellSize - 1)

        noStroke();
        fill(c.v1, c.v2, c.v3)
        textAlign(CENTER, CENTER);
        textSize(10);
        text(this.text, this.x + settings.cellSize / 2, this.y + settings.cellSize / 2);
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