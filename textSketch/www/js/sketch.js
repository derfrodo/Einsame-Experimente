var img;

var c;

var input;
function setup() {
    input = createFileInput(handleFile);
    createP('');
    c = createCanvas(1920, 1080);
    createP('');
 
    img = createImg('');

    currentNumber = minNumber;
    var b = createButton("save");
    b.mousePressed(saveImg);
}

let minNumber = 1;
let maxNumber = 5;
let currentNumber;

function draw() {
    strokeWeight(10);

    //stroke(255,0,255);
    stroke(255, 149, 0);
    fill(255);
    background(0)

    if (img) {
        let imgHeigt = width / (img.width / img.height);
        image(img, 0, (height - imgHeigt) / 2, width, imgHeigt);
    }

    // let txt = "Teil 1:\r\n*p5js\r\n*socket.io\r\n";
    let txtSize = 296;

    let txt = "*socket.io\r\n*p5js\r\n";
    textAlign(RIGHT, TOP);
    textSize(txtSize);
    text(txt, width - 40, 40);

    let txtNr = `Teil ${currentNumber}`;
    textAlign(LEFT, TOP);
    textSize(txtSize);
    text(txtNr, 40, height - (txtSize + 40));
}

function saveImg(){
    save(c, `img${currentNumber}.png`);
    currentNumber++;
    if(currentNumber > maxNumber){
        currentNumber = minNumber;
    }
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = createImg(file.data);
        img.hide();
    }
}