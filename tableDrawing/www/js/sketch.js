//das image

let img;
let c;
let pt;
let p;

let tableRows = 100;
let tableCols = 100;

let cellWidth = undefined;
let cellHeight = undefined;

let showTable = false;

function preload() {
    img = loadImage("assets/moe-573293_960_720.png");
}

function setup() {
    frameRate(10);


    cellWidth = img.width / tableCols;
    cellHeight = img.height / tableRows;

    let b = createButton("clickMe");
    b.mousePressed(() => { showTable = !showTable; });

    p = createP('');
    pt = createP('');
    c = createCanvas(img.width, img.height);
}
let tblCells = [];
let gi = 0;
let ginterval = 1;

function createTableCells() {

    let r = 0, g = 0, b = 0, a = 0;

    let max = gi + ginterval;
    max = max
        > tableRows ? tableRows : max;

    for (let i = gi; i < max; i++) {
        let rowCells = [];
        for (let j = 0; j < tableCols; j++) {

            let cell = getColorForImgRect(floor(j * cellWidth), floor(i * cellHeight), cellWidth, cellHeight);
            rowCells.push(cell);
        }
        tblCells.push(rowCells);
    }
    gi += ginterval;
}

function getColorForImgRect(x, y, wdth, hght) {
    img.loadPixels();
    let pixels = img.pixels;

    let ox = floor(x);
    let oy = floor(y);

    let ow = floor(wdth);
    let oh = floor(hght);

    let r = 0, g = 0, b = 0, a = 0;

    for (var i = ox; i < ox + ow; i++) {
        for (var j = oy; j < oy + oh; j++) {
            // loop over
            const idx = 4 * (j * img.width + i);
            // console.log(pixels[idx]);

            r += (pixels[idx]);
            g += (pixels[idx + 1]);
            b += (pixels[idx + 2]);
            a += (pixels[idx + 3]);
        }
    }

    let pxCnt = ow * oh;

    return { r: floor(r / pxCnt), g: floor(g / pxCnt), b: floor(b / pxCnt), a: a / pxCnt };
}

function draw() {
    p.html(img.width + "; " + img.height + "(" + showTable + ")");

    createTableCells();

    let max = gi;
    max = max
        > tableRows ? tableRows : max;

    let tbl = `<table width="${img.width}" height="${img.height * (max / tableRows)}">`;
    for (let i = 0; i < max; i++) {
        tbl += "<tr>";
        for (let j = 0; j < tableCols; j++) {
            try {
                let value = "" + hex(tblCells[i][j].r, 2) + hex(tblCells[i][j].g, 2) + hex(tblCells[i][j].b, 2);
                tbl += `<td bgcolor="${value}"></td>`;

            }
            catch (e) {
                console.log(e)
                console.log(i)
                console.log(j)
            }
        }
        tbl += "</tr>";
    }
    tbl += `</table>`;

    pt.html(tbl);
    image(img, 0, 0, img.width, img.height);
    if (showTable) {
        pt.show();
        c.hide();

    }
    else {
        pt.hide();
        c.show();
    }
}
var input;

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = createImg(file.data);
        img.hide();
    }
}


    // let tbl = "<table width=640 height=480><tr height=40><td bgcolor=\"000000\"></td><td bgcolor=\"FF00FF\"></td></tr><tr></tr></table>"
