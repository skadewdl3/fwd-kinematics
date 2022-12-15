import { sketch } from "p5js-wrapper";
import Link from "./Link.js";

let links = [];

function setup() {
  createCanvas(800, 600);
  let link = new Link({ x: 10, y: 20 }, { x: 20, y: 10 }, 10, 20);
  links.push(link);
}

function draw() {
  background(100);
  fill(255, 0, 0);
  noStroke();
  rectMode(CENTER);
  rect(mouseX, mouseY, 50, 50);

  if (mouseIsPressed) links[0].logAngle();
}

sketch.setup = setup;
sketch.draw = draw;
