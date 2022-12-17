import { SPEED } from "./config";

export default class Link {
  constructor(a, length, angle, parent, index, removeLink) {
    this.length = length;
    this.parent = parent;
    this.removeLink = removeLink;
    this.angle = -1 * angle;
    console.log(`link ${index}: ${angle} deg`);
    if (this.parent) {
      this.angle += this.parent.angle;
    }
    this.index = index;
    this.a = this.parent
      ? createVector(this.parent.b.x, this.parent.b.y)
      : createVector(a.x, a.y);
    this.calculateB();
    this.createControls();
  }

  setParent(parent) {
    this.parent = parent;
    this.calculateA();
    this.angle = this.targetAngle;
    // this.targetAngle = this.parent.angle + -1 * this.angleSlider.value();
    this.calculateB();
  }

  setIndex(i) {
    this.index = i;
  }

  calculateB() {
    this.b = createVector(
      this.a.x + this.length * cos(this.angle),
      this.a.y + this.length * sin(this.angle)
    );
  }

  calculateA() {
    if (!this.parent) return;
    this.a = createVector(this.parent.b.x, this.parent.b.y);
  }

  rotate() {
    if (this.angle > this.targetAngle) this.angle -= SPEED;
    if (this.angle < this.targetAngle) this.angle += SPEED;
    this.calculateA();
    this.calculateB();
  }

  update() {
    this.calculateA();
    this.calculateB();
  }

  setAngle(e) {
    this.targetAngle =
      (this.parent ? this.parent.targetAngle : 0) +
      -1 * this.angleSlider.value();
    this.angleText.html(`${this.angleSlider.value()}`);
    let event = new Event("predictPoint");
    document.dispatchEvent(event);
  }

  createControls() {
    this.controls = createDiv();
    this.controls.id = `link-${this.index}`;
    this.button = createButton(`Remove Link ${this.index}`);
    this.button.mousePressed(() => this.removeLink(this.index));
    this.controls.child(this.button);
    this.angleDiv = createDiv();
    this.angleDiv.id(`angle-${this.index}`);
    this.angleText = createP(`Angle: ${-1 * this.angle}`);
    this.angleText.style("margin", "0");
    this.angleSlider = createSlider(0, 360, -1 * this.angle, 1);
    this.angleSlider.id(`slider-${this.index}`);
    this.angleSlider.input(() => {
      this.setAngle();
    });
    this.angleDiv.child(this.angleSlider);
    this.angleDiv.child(this.angleText);
    this.controls.child(this.angleDiv);
  }

  show() {
    let lineColor = color(45, 52, 54);
    lineColor.setAlpha(100);
    stroke(lineColor);
    strokeWeight(5);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    noStroke();
  }
}
