
var testNumbersStart = 1;
var testNumbersEnd = 14;

/*
1 = 1
2 = 2 * 1
3 = 3 * 1
4 = 2 * 2
5 = 5
6 = 3 * 2
7 = 7
8 = 2 * 2 * 2
9 = 3 * 3
10 = 5 * 2
11 = 11
12 = 2 * 2 * 3
13 = 13 
14 = 2 * 7

// 1 * 2 * 2 * 2 * 3 * 3 * 5 * 7 * 11 * 13
*/

var step = 2 * 3 * 5 * 7 * 11 * 13;
var currentNumber = step;

function setup() {
    createCanvas(640, 480);

    frameRate(60);
}

function draw() {
    background(0);

    textSize(32);
    fill(255);

    let valid = true;

    for (let i = testNumbersStart; i <= testNumbersEnd; i++) {
        let divResult = currentNumber / i;
        if (divResult !== floor(divResult)) {
            console.log("Hat nicht geklappt: " + currentNumber + " fuer " + i);
            valid = false;
        }
        else {
            console.log("Hat geklappt: " + currentNumber + " fuer " + i);
        }
    }

    if (!valid) {
        //2, 7
        currentNumber += step;
    }

    text("Aufgabe: Teilbar von " + testNumbersStart + " bis " + testNumbersEnd + " ohne Rest", 10, 82);

    fill(valid ? 0 : 255, valid ? 255 : 0, 0);
    text("Augenblickliche Nummer: " + currentNumber, 10, 42);


}

