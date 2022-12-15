export default class Link {
  constructor(a, b, length, angle) {
    this.a = createVector(a.x, a.y);
    this.b = createVector(b.x, b.y);
    this.length = length;
    this.angle = angle;
  }
  logAngle() {
    console.log(this.angle);
  }
}
