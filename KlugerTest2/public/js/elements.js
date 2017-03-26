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


    this.cellSize = 10;
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

function Cell() {
    this.color = {};
    this.text = "";
}


class Grid {

    constructor() {
        this.data = [];
    }

    getCell(rowOrIndex, col) {
        let index = !col ? rowOrIndex : this.calculateIndex(rowOrIndex, col);
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
}