var rockets;
var generationSize = 100;

var startpoint = { x: 10, y: 50, }
var target;
var cellSize = 10;
var cols;
var rows;
var cellCount;

var frate = 60;
var totalLifeSpan = 750;
var lifespan = 0;
var generation = 0;

var pLife;
var pGen;
var pStats;
var stats = [];

let motationProbability = 0.01;

var fittestRocket = undefined;

function createRandomVector(angles) {
    var multiplicator = floor(random() * angles);

    let data = p5.Vector.fromAngle(2 * PI * (multiplicator / angles));
    return data;
}

function setup() {
    frameRate(frate);
    createCanvas(640, 480);
    pLife = createP('')
    pGen = createP('')
    pStats = createP('');

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
            let data = createRandomVector(8);
            dna.push(data);
        }

        let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
        rockets.push(rocket);
    }

    lifespan = totalLifeSpan;
};

function draw() {
    background(155);
    stroke(100);
    fill(0);
    ellipse(target.pos.x, target.pos.y, target.r);

    fittestRocket = undefined;
    for (let i = 0; i < generationSize; i++) {
        let rocket = rockets[i];
        rocket.update();
    }

    for (let i = 0; i < generationSize; i++) {
        let rocket = rockets[i];
        if (rocket !== fittestRocket) {
            rocket.show();

        }
    }

    fittestRocket.show();

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
    stats.push({
        generation: generation,
        fittestRocket: fittestRocket,
        fitness: fittestRocket.fitness,
        distance: fittestRocket.getDistance(),
    });

    var shtml = "";
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i];
        shtml += `Generation: ${stat.generation}; Best Fitness: ${stat.fitness}; Distance: ${stat.distance} <br />`;
    }

    pStats.html(shtml);

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
    // console.log(sortedRockets);

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
                data = createRandomVector(8); //p5.Vector.fromAngle(random(2 * PI));
            }

            dna.push(data);
        }

        let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
        rockets.push(rocket);
    }
    lifespan = totalLifeSpan;
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
