function setup() {
    createCanvas(640, 480);
    noSmooth();
    background(155);

    rocket = new Rocket(50, 50, 0);

};

function draw() {
    stroke(100);
    fill(0);
    ellipse(target.x, target.y, target.r);

    rocket.show();
};

var rocket;
var poolSize = 100;

var startpoint = {
    x: 10,
    y: 50,
}

var target = {
    x: 580,
    y: 240,
    r: 24,
};

function Rocket(x_, y_, angle_, dna_) {
    this.pos = createVector(x_, y_);
    this.angle = angle_;

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
    
}