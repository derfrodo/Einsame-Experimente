
let i;
let pResponse;
function setup() {

    createP("Wie ist dein Alter?")
    i = createInput();
    pResponse = createP("ANtwort..");
    console.log(i)
    i.input(doSomething);

    createCanvas(640, 480);
    console.log("Wurde geladen");

    frameRate(5);
}

function doSomething() {
    console.log(this.value())
    let val = this.value();

    let inpt =parseInt(val);

    if (val== 1.0) {
        pResponse.html("Du kannst doch noch gar nicht tippen...")

    }
    else {
        pResponse.html("Das habe ich nicht verstanden")

    }
    //pResponse
    console.log(val + 1);
    console.log(inpt +1);
    console.log("2");

}


function draw() {
    // console.log("zeichne")

    // background(floor(random(0,256)),floor(random(0,256)),floor(random(0,256)));



    noLoop();
}
