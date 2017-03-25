var rockets;
var generationSize = 100;

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

let motationProbability = 0.1;

function setup() {
    frameRate(25);
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

/** http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript */
function sFact(num) {
    var rval = 1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function numSum(num) {
    var rval = 0;
    for (var i = 0; i <= num; i++)
        rval += i;
    return rval
}

function createNextGeneration() {
    generation++;

    let sortedRockets = rockets.slice().sort((a, b) => {
        return a.fitness < b.fitness ? -1 :
            (a.fitness > b.fitness ? 1 : 0);
    })

    addWeights(sortedRockets.reverse());

    let deleted = 0;
    let max_delete = ceil(generationSize / 4);
    while (deleted < max_delete) {
        let rocket = getRandomRocket(sortedRockets)
        if (rocket) {
            let i = sortedRockets.indexOf(rocket);
            sortedRockets.splice(i, 1);
            deleted++;
        }
    }
    console.log(sortedRockets);

    addWeights(sortedRockets.reverse());

    rockets = [];
    for (let i = 0; i < generationSize; i++) {
        let father = getRandomRocket(sortedRockets);
        let mother = getRandomRocket(sortedRockets);
        while (mother != father) {
            mother = getRandomRocket(sortedRockets);
        }

        let dna = [];
        for (let j = 0; j < cellCount; j++) {
            let data = random() > 0.5 ? father.dna[j].copy() : mother.dna[j].copy();

            if (random() > 1 - motationProbability) {
                data = p5.Vector.fromAngle(random(2 * PI));
            }

            dna.push(data);
        }

        let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
        rockets.push(rocket);
    }
    lifespan = 100;
}

function addWeights(sortedRockets) {
    let lastWeight = 0;
    let sumSum = numSum(sortedRockets.length);

    //https://en.wikipedia.org/wiki/Fitness_proportionate_selection
    for (let i = 0; i < sortedRockets.length; i++) {
        let rocket = sortedRockets[i];

        let propab = ((i + 1) / sumSum);

        let nextWeight = lastWeight + propab;

        rocket.minProp = lastWeight;
        rocket.maxProp = nextWeight;

        lastWeight = nextWeight;
    }

    return sortedRockets;
}

function getRandomRocket(sortedRockets) {
    let value = random();
    for (let i = 0; i < sortedRockets.length; i++) {
        let rocket = sortedRockets[i];
        if (!rocket) {
            continue;
        }
        if (rocket.minProp > value) {
            return null;
        }

        if (rocket.minProp <= value && rocket.maxProp > value) {
            return rocket;
        }
    }
}

function Rocket(x_, y_, angle_, dna_) {
    this.pos = createVector(x_, y_);
    this.angle = angle_;

    this.dna = dna_;
    this.fitness = 0;

    this.blocked = false;

    this.update = () => {
        if (!this.calculateBlocked()) {

            let direction = this.dna[floor(this.pos.x / cellSize) + floor(this.pos.y / cellSize) * cols]
            // console.log(direction)
            this.pos.add(direction.x, direction.y);
            this.angle = direction.heading();
            this.calculateFitness();
        }
    }

    this.calculateBlocked = () => {
        this.blocked = (this.blocked ||
            this.pos.x < 0 ||
            this.pos.x > width ||
            this.pos.y < 0 ||
            this.pos.y > height);
        return this.blocked;
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
        this.fitness = 1 / (1 + this.pos.dist(target.pos));
        return this.fitness;
    }
}