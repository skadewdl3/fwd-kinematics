import { roundOff } from "./helpers";
import { LINK_LENGTH } from "./config";

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
    for (let i = 1; i <= this.rowCount; i++) {
      if (i === Math.ceil(this.rowCount / 2)) {
        strokeWeight(0.7);
        stroke(0, 0, 0);
      } else {
        strokeWeight(0.3);
        stroke(45, 52, 54);
      }
      line(this.unitLength * i, 0, this.unitLength * i, this.height);
      noStroke();
    }
    for (let i = 1; i <= this.colCount; i++) {
      if (i === Math.ceil(this.colCount / 2)) {
        strokeWeight(0.7);
        stroke(0, 0, 0);
      } else {
        strokeWeight(0.3);
        stroke(45, 52, 54);
      }
      line(0, this.unitLength * i, this.width, this.unitLength * i);
      noStroke();
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
      let textContent = `End-effector Position: (x, y) = (${roundOff(
        this.predictedPoint.x / LINK_LENGTH,
        2
      )}, ${roundOff((-1 * this.predictedPoint.y) / LINK_LENGTH, 2)})`;
      this.container = rect(7, 7, textWidth(textContent) + 10, 30);
      this.text = text(textContent, 10, 26);
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
