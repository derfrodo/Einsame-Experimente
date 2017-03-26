
function Rocket(x_, y_, angle_, dna_) {
    this.pos = createVector(x_, y_);
    this.angle = angle_;

    this.dna = dna_;
    this.fitness = 0;
    this.fitnesses = [];

    this.blocked = false;
    this.done = false;  

    this.copy = () => {
        return new Rocket(x_, y_, angle_, dna_);
    }

    this.update = () => {

        this.calculateBlocked();
        this.calculateDone();
        this.calculateFitness();

        if (!this.blocked && !this.done) {

            let direction = this.dna[floor(this.pos.x / cellSize) + floor(this.pos.y / cellSize) * cols]

            let lastDirection = p5.Vector.fromAngle(this.angle);
            if (p5.Vector.angleBetween(lastDirection, direction) > PI * (2 / 4)) {
                direction = direction.copy();
                direction.mult(-1);
            }

            // console.log(direction)
            this.pos.add(direction.x, direction.y);
            this.angle = direction.heading();
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

    this.calculateDone = () => {
        this.done = !this.blocked && (this.done ||
            this.getDistance() <= 0
        )
    }


    this.show = () => {

        let v1 = p5.Vector.fromAngle(this.angle);
        v1.setMag(16);
        let v2 = v1.copy();
        v1.rotate(0.1 * PI);
        v2.rotate(-0.1 * PI);

        push();
        stroke(0);
        strokeWeight(1);
        if (fittestRocket === this) {
            fill(255, 100, 100);


        }
        else {
            fill(255);
            // line(this.pos.x, this.pos.y, this.pos.x - v1.x, this.pos.y - v1.y)
            // line(this.pos.x, this.pos.y, this.pos.x - v2.x, this.pos.y - v2.y)
            // line(this.pos.x - v1.x, this.pos.y - v1.y, this.pos.x - v2.x, this.pos.y - v2.y)
        }

        beginShape()
        vertex(this.pos.x, this.pos.y);
        vertex(this.pos.x - v1.x, this.pos.y - v1.y);
        vertex(this.pos.x - v2.x, this.pos.y - v2.y);
        endShape(CLOSE);
        pop();

    }

    this.calculateFitness = () => {

        this.fitness = 0;
        let f = 1 / (1 + this.getDistance());
        if (this.blocked) {
            f /= 4;
        }

        if (this.done) {
            f *= 4;
        }
        this.fitnesses.push(f);
        let fSum = 0;

        for (let i = 0; i < this.fitnesses.length; i++) {
            this.fitness += (this.fitnesses[i] * i + 1);
            fSum += (i + 1);
        }
        this.fitness /= fSum;

        if (this.done) {
            this.fitness *= 4;
        }

        if (!fittestRocket || fittestRocket.fitness < this.fitness) {
            fittestRocket = this;
        }

        return this.fitness;
    }

    this.distance;
    this.getDistance = () => {
        let f = this.pos.dist(target.pos) - (target.r / 2);
        this.distance = f > 0 ? f : 0;
        return this.distance;
    }
}