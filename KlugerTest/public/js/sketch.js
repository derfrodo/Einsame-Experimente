var rockets;
var generationSize = 10;

var startpoint = { x: 10, y: 50, }
var target;
var cellSize = 10;
var cols;
var rows;
var cellCount;

var lifespan = 0;
var generation = 0;

var pLife;
var pGen;

function setup() {
    frameRate(10);
    createCanvas(640, 480);
    pLife = createP('')
    pGen = createP('')

    noSmooth();
    background(155);

    target = { pos: createVector(580, 240), r: 24, };


    cols = width / cellSize;
    rows = height / cellSize;
    cellCount = rows * cols;

    rockets = [];
    for (let i = 0; i < generationSize; i++) {
        let dna = [];

        for (let j = 0; j < cellCount; j++) {
            let data = p5.Vector.fromAngle(random(2 * PI));
            dna.push(data);
        }

        let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
        rockets.push(rocket);
    }

    lifespan = 100;
};

function draw() {
    background(155);
    stroke(100);
    fill(0);
    ellipse(target.pos.x, target.pos.y, target.r);
    for (let i = 0; i < generationSize; i++) {
        let rocket = rockets[i];
        rocket.show();
        rocket.update();
    }

    lifespan--;
    if (lifespan <= 0) {
        createNextGeneration();
    }
    pLife.html('Lifespan: ' + lifespan);
    pGen.html('Generation: ' + generation);

};

function createNextGeneration() {
    generation++;

    rockets = [];
    for (let i = 0; i < generationSize; i++) {
        let dna = [];

        for (let j = 0; j < cellCount; j++) {
            let data = p5.Vector.fromAngle(random(2 * PI));
            dna.push(data);
        }

        let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
        rockets.push(rocket);
    }
    lifespan = 100;
}

function Rocket(x_, y_, angle_, dna_) {
    this.pos = createVector(x_, y_);
    this.angle = angle_;

    this.dna = dna_;

    this.update = () => {
        let direction = this.dna[floor(this.pos.x / cellSize) + floor(this.pos.y / cellSize) * cols]
        // console.log(direction)
        this.pos.add(direction.x, direction.y);
        this.angle = direction.heading();
    }

    this.show = () => {

        push();
        stroke(0);
        strokeWeight(1);
        fill(255);

        let v1 = p5.Vector.fromAngle(this.angle);
        v1.setMag(16);
        let v2 = v1.copy();
        v1.rotate(0.1 * PI);
        v2.rotate(-0.1 * PI);

        beginShape()
        vertex(this.pos.x, this.pos.y);
        vertex(this.pos.x - v1.x, this.pos.y - v1.y);
        vertex(this.pos.x - v2.x, this.pos.y - v2.y);
        endShape(CLOSE);
        pop();
    }


    this.calculateFitness = () => {
        return this.pos.dist()
    }
}