let r;
function setup() {
    canvases[C_CANVAS] = createCanvas(480, 480);

console.log(390 %360);
console.log(-390 %360);

    noSmooth();
    background(0);

    settings.cols = ceil(width / (settings.cellSize));
    settings.rows = ceil(height / (settings.cellSize));
    settings.frameRate = 15;
    frameRate(settings.frameRate);

    grid = new Grid();
    // makeSomeStuff()

    for (let i = 0; i < settings.rows; i++) {
        for (let j = 0; j < settings.cols; j++) {
            let cell = new Cell(i, j);
            cell.color = {
                v1: rndByte(),
                v2: rndByte(),
                v3: rndByte(),
            };
            cell.text = "r" + i + "c" + j;

            cell.angle = (floor(random() * 8) / 8) * TWO_PI;

            grid.setCell(i, j, cell)
        }
    }
    r = new Rocket2(200,200,grid);
}

function draw() {
    background(0);

    let markRow = floor(settings.rows / 2);


    let md = (millis() % 1500) / 750;

    let markCol = floor((settings.cols-5) * md)+2;
    let markCol2 = ceil((settings.cols-5) * md)+2;

    if (md > 1) {
        markCol = floor((settings.cols-5) * (2 - md))+2;
        markCol2 = ceil((settings.cols-5) * (2 - md))+2;
    }


    let markIndex = grid.calculateIndex(markRow, markCol);
    let markIndex2 = grid.calculateIndex(markRow, markCol2);

    let iterator = grid.getIndexes();
    let item = iterator.next();
    do {
        // console.log(item)
        // console.log(iterator.value)
        // grid.getCell(iterator.value).isMarked = false;

        cell = grid.getCell(item.value);
        cell.isMarked = !(item.value != markIndex && item.value != markIndex2);
        item = iterator.next();
    } while (item != undefined && !item.done)

    makeSomeStuff();

    stroke(192)
    line(0, mouseY, width, mouseY)
    line(mouseX, 0, mouseX, width);

r.update();
r.show()

}

/** Liefert ein Integer wert zwischen [0,...,255] */
function rndByte() {
    return floor(random(0, 256))
}

function makeSomeStuff() {
    noStroke();

    for (let i = 0; i < settings.rows; i++) {
        for (let j = 0; j < settings.cols; j++) {
            let cell = grid.getCell(i, j);
            cell.show();

            // fill(cell.color.v1, cell.color.v2, cell.color.v3)
            // ellipse(x, y, settings.cellSize);

        }
    }
}



// // var oldGenerations = [];

// var rockets;
// var generationSize = 250;

// var startpoint = { x: 10, y: 240, }
// var target;
// var cellSize = 10;
// var cols;
// var rows;
// var cellCount;

// var frate = 0;
// var totalLifeSpan = 0;
// var lifespan = 0;
// var generation = 0;

// var pLife;
// var pGen;
// var pStats;
// var stats = [];

// var pfr;
// var pdm;
// var ptl;

// let motationProbability = 0.004;

// var fittestRocket = undefined;

// var sliderFrameRate;
// var sliderDrawMod;
// var sliderTotalLifespan;

// function createRandomVector(angles) {
//     var multiplicator = floor(random() * angles);

//     let data = p5.Vector.fromAngle(2 * PI * (multiplicator / angles));
//     return data;
// }

// function setup() {
//     let c = createCanvas(480, 480);
//     c.parent('fholder');
//     let p =createP('');
//     p.parent('fholder');
//     let b = createFullscreenButtonForDomElement(document.getElementById('fholder'));
//     b.parent('fholder')
//     pLife = createP('')
//     pGen = createP('')

//     pfr = createP('Frame Rate:');

//     sliderFrameRate = createSlider(1, 120, 120);
//     pdm = createP('Draw on Keyframe:');
//     sliderDrawMod = createSlider(1, 100, 1);

//     ptl = createP('Total Lifespan:');
//     sliderTotalLifespan = createSlider(1, 1000, 450);
//     pStats = createP('');

//     noSmooth();
//     background(155);

//     target = { pos: createVector(420, 240), r: 24, };


//     cols = width / cellSize;
//     rows = height / cellSize;
//     cellCount = rows * cols;

//     rockets = [];
//     for (let i = 0; i < generationSize; i++) {
//         let dna = [];

//         for (let j = 0; j < cellCount; j++) {
//             let data = createRandomVector(8);
//             dna.push(data);
//         }

//         let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
//         rockets.push(rocket);
//     }

//     lifespan = totalLifeSpan;
// };

// let drawMod = 0;

// function draw() {

//     if (frate != sliderFrameRate.value()) {
//         frate = sliderFrameRate.value();
//         pfr.html('Frame Rate: ' + frate);
//     }
//     if (drawMod != sliderDrawMod.value()) {

//         drawMod = sliderDrawMod.value();
//         pdm.html('Draw on Keyframe: ' + drawMod);
//     }

//     if (totalLifeSpan != sliderTotalLifespan.value()) {

//         totalLifeSpan = sliderTotalLifespan.value();
//         ptl.html('Total Lifespan: ' + totalLifeSpan);
//     }

//     frameRate(frate);

//     fittestRocket = undefined;
//     for (let i = 0; i < generationSize; i++) {
//         let rocket = rockets[i];
//         rocket.update();
//     }
//     if ((lifespan - 1) % drawMod === 0) {
//         background(155);


//         noStroke();

//         // fill(75);
//         //         rectMode(CENTER);
//         //         rect(0 + 10,height - 10, 16, 10);
//         fill(255);
//         textAlign(LEFT, TOP);
//         textSize(8);
//         text("Frame Rate: " + frameRate(), 2, height - 10);


//         for (let i = 0; i < stats.length; i++) {
//             let stat = stats[i];
//             let fittestR = stat.fittestRocket;
//             if (fittestR) {
//                 noStroke();
//                 fill(75)
//                 rectMode(CENTER);
//                 rect(fittestR.pos.x, fittestR.pos.y, 16, 10);
//                 fill(255);
//                 // stroke(100,100,255);
//                 textAlign(CENTER, CENTER);
//                 textSize(8);
//                 text(stat.generation, fittestR.pos.x, fittestR.pos.y);
//             }
//         }


//         stroke(100);
//         fill(0);
//         ellipse(target.pos.x, target.pos.y, target.r);

//         for (let i = 0; i < generationSize; i++) {
//             let rocket = rockets[i];
//             if (rocket !== fittestRocket) {
//                 rocket.show();

//             }
//         }

//         if (fittestRocket) {
//             fill(0);
//             stroke(0);
//             strokeWeight(1);
//             line(fittestRocket.pos.x, fittestRocket.pos.y, target.pos.x, target.pos.y);

//             noFill();
//             stroke(90);
//             strokeWeight(1);
//             ellipse(target.pos.x, target.pos.y, 2 * (fittestRocket.distance) + target.r);

//             fittestRocket.show();
//         }

//         pLife.html('Lifespan: ' + lifespan);
//         pGen.html('Generation: ' + generation);
//     }

//     lifespan--;
//     if (lifespan <= 0) {
//         createNextGeneration();
//     }

// };


// /** http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript */
// function sFact(num) {
//     var rval = 1;
//     for (var i = 2; i <= num; i++)
//         rval = rval * i;
//     return rval;
// }

// function numSum(num) {
//     var rval = 0;
//     for (var i = 0; i <= num; i++)
//         rval += i;
//     return rval
// }

// function createNextGeneration() {

//     if (generation == 0) {
//         lifespan = totalLifeSpan;
//         generation++;
//         return;
//     }

//     stats.push({
//         generation: generation,
//         fittestRocket: fittestRocket,
//         fitness: fittestRocket.fitness,
//         distance: fittestRocket.getDistance(),
//     });

//     var shtml = "";
//     for (let i = 0; i < stats.length; i++) {
//         let stat = stats[i];
//         let str = `Generation: ${stat.generation}; Best Fitness: ${stat.fitness}; Distance: ${stat.distance}`;
//         if (i + 1 == stats.length) {
//             console.log(str);

//         }
//         shtml += str + "<br />";

//     }
//     pStats.html(shtml);


//     let sortedRockets = rockets.slice().sort((a, b) => {
//         return a.fitness < b.fitness ? -1 :
//             (a.fitness > b.fitness ? 1 : 0);
//     })

//     addWeights(sortedRockets);
//     // oldGenerations.push(sortedRockets.slice());

//     rockets = [];

//     // addWeights(sortedRockets.reverse());

//     // let deleted = 0;
//     // let max_delete = ceil(generationSize * (2 / 4));
//     // while (deleted < max_delete) {
//     //     let rocket = getRandomRocket(sortedRockets)
//     //     if (rocket) {
//     //         let i = sortedRockets.indexOf(rocket);
//     //         sortedRockets.splice(i, 1);
//     //         deleted++;
//     //     }
//     // }
//     // console.log(sortedRockets);

//     // addWeights(sortedRockets.reverse());

//     // rockets = [];
//     //     for (let i = 0; i < sortedRockets.length; i++) {
//     //         rockets.push(sortedRockets[i].copy());
//     //     }

//     let nextDnaCount = 0
//     let mutations = 0
//     while (rockets.length < generationSize) {

//         let father = getRandomRocket(sortedRockets);
//         let mother = getRandomRocket(sortedRockets);
//         while (mother != father) {
//             mother = getRandomRocket(sortedRockets);
//         }

//         let dna = [];
//         for (let j = 0; j < cellCount; j++) {
//             let data = random() > 0.5 ? father.dna[j].copy() : mother.dna[j].copy();

//             if (random() > 1 - motationProbability) {
//                 data = createRandomVector(8); //p5.Vector.fromAngle(random(2 * PI));
//                 mutations++;
//             }
//             nextDnaCount++;
//             dna.push(data);
//         }

//         let rocket = new Rocket(startpoint.x, startpoint.y, random(2 * PI), dna);
//         rockets.push(rocket);
//     }
//     console.log(mutations + " Mutationen bei " + nextDnaCount + " neuen DNA Zuweisungen. (" + round(100 * (mutations / nextDnaCount) * 100) / 100 + "%)");
//     generation++;

//     lifespan = totalLifeSpan;
// }

// function addWeights(sortedRockets) {
//     let lastWeight = 0;
//     let sumSum = numSum(sortedRockets.length);

//     //https://en.wikipedia.org/wiki/Fitness_proportionate_selection
//     for (let i = 0; i < sortedRockets.length; i++) {
//         let rocket = sortedRockets[i];

//         let propab = ((i + 1) / sumSum);

//         let nextWeight = lastWeight + propab;

//         rocket.minProp = lastWeight;
//         rocket.maxProp = nextWeight;

//         lastWeight = nextWeight;
//     }

//     return sortedRockets;
// }

// function getRandomRocket(sortedRockets) {
//     let value = random();
//     for (let i = 0; i < sortedRockets.length; i++) {
//         let rocket = sortedRockets[i];
//         if (!rocket) {
//             continue;
//         }
//         if (rocket.minProp > value) {
//             return null;
//         }

//         if (rocket.minProp <= value && rocket.maxProp > value) {
//             return rocket;
//         }
//     }
// }
