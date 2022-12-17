export default class Graph {
  constructor(width, height, unitLength) {
    this.unitLength = unitLength;
    this.width = width;
    this.height = height;
    this.rowCount = Math.round(height / unitLength) - 1;
    this.colCount = Math.round(width / unitLength) - 1;
    this.predictedPoint = null;
  }
  render() {
    strokeWeight(0.3);
    stroke(45, 52, 54);

    for (let i = 1; i <= this.rowCount; i++) {
      line(this.unitLength * i, 0, this.unitLength * i, this.height);
    }
    for (let i = 1; i <= this.colCount; i++) {
      line(0, this.unitLength * i, this.width, this.unitLength * i);
    }
    if (this.predictedPoint !== null) {
      stroke(255, 0, 0);
      strokeWeight(5);
      this.point = point(
        this.predictedPoint.x + this.width / 2,
        this.predictedPoint.y + this.height / 2
      );
      noStroke();
      textSize(16);
      this.temp = text(
        `Prediction: (x, y) = (${this.predictedPoint.x}, ${
          -1 * this.predictedPoint.y
        })`,
        10,
        26
      );
      console.log(this.temp.textWidth());
      this.container = rect(7, 7, 250, 30);
      this.text = text(
        `Prediction: (x, y) = (${this.predictedPoint.x}, ${
          -1 * this.predictedPoint.y
        })`,
        10,
        26
      );
    }
    noStroke();
  }
  clearPrediction() {
    if (this.point && this.text && this.container) {
      this.predictedPoint = null;
    }
  }
  setPredictedPoint(point) {
    console.log(point);
    this.predictedPoint = point;
  }
}
