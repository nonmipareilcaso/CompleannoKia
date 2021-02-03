let confetti = [];
let scaling;

let myFont;

function preload() {
  myFont = loadFont('bromello.ttf');
}

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  myCanvas.position(0, 0);

  if (width < height)
    scaling = width;
  else
    scaling = height;
  textSize(scaling / 6);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (width < height)
    scaling = width;
  else
    scaling = height;
}

function draw() {
  background(119, 60, 70);
  push();
  fill(255);
  text("Tanti Auguri!", 0, 0);
  pop();
  if (confetti.length > 0) {
    for (let i = confetti.length - 1; i >= 0; i--) {
      confetti[i].display();
      if (confetti[i].dead)
        confetti.splice(i, 1);
    }
  }
  
}

function mousePressed() {
  for (let i = 0; i < 30; i++) {
    confetto = new Confetto(mouseX - width / 2, mouseY - height / 2, random(-3, 3), random(-15, -5));
    confetti.push(confetto);
  }
}

function deviceShaken() {
  for(let i = 0; i < 100; i++){
    confetto = new Confetto(((width / 99.0) * i) - (width/2), random(-3 * height, -height - 20), 0, 0);
    confetti.push(confetto);
  }
}

class Confetto {
  constructor(_x, _y, _vx, _vy) {
    this.x = _x;
    this.y = _y;
    this.vx = _vx;
    this.vy = _vy;
    this.ay = 0.3;
    this.dead = false;
    this.maxvy = 7;
    this.r = random(200, 255);
    this.g = random(200, 255);
    this.b = random(200, 255);
    this.dim = 20;
    this.rotX = random(PI);
    this.rotY = random(PI);
    if (this.vx < 0)
      this.segno = -1;
    else
      this.segno = 1;
  }

  display() {
    push();
    fill(this.r, this.g, this.b);
    this.vy += this.ay;
    if (this.vy > this.maxvy)
      this.vy = this.maxvy;
    this.y += this.vy;
    this.x += this.vx;
    this.rotX += 0.2;
    this.rotY += this.segno * 0.07;

    if (this.y > height + 10)
      this.dead = true;

    translate(this.x, this.y, 0);
    rotateX(this.rotX);
    rotateY(this.rotY);
    circle(0, 0, this.dim);
    rotateY(-1 * this.rotY);
    rotateX(-1 * this.rotX);
    pop();
  }
}
