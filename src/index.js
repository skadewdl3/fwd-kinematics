import { sketch } from "p5js-wrapper";
import Link from "./Link.js";
import Graph from "./Graph.js";
import { HEIGHT, WIDTH, LINK_LENGTH } from "./config.js";
import { roundOff } from "./helpers.js";

let links = [];
let rotate = false;
let graph;

const removeLink = (index) => {
  links.forEach((l) => {
    l.controls.remove();
  });
  let updated = links.filter((_, i) => i !== index);
  let newLinks = updated.map((l, i) => {
    if (i !== 0) {
      l.setParent(updated[i - 1]);
    }
    l.setIndex(i);
    l.createControls();

    return l;
  });
  links = newLinks;
};

const predictPoint = () => {
  let x = 0,
    y = 0;
  links.forEach((l, i) => {
    x += l.length * cos(l.targetAngle ? l.targetAngle : 0);
    y += l.length * sin(l.targetAngle ? l.targetAngle : 0);
  });
  return { x, y };
};

const reset = () => {
  links.forEach((l) => l.controls.remove());
  links = [];
  let event = new Event("clearPrediction");
  document.dispatchEvent(event);
};

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);

  document.addEventListener("predictPoint", () => {
    graph.setPredictedPoint(predictPoint());
  });
  document.addEventListener("clearPrediction", () => {
    graph.clearPrediction();
  });

  // Creating Control Buttons
  let start = createButton("Start");
  let stop = createButton("Stop");
  let addLink = createButton("Add Link");
  let resetBtn = createButton("Reset");
  addLink.mousePressed(() => {
    let link = new Link(
      links.length === 0 ? { x: WIDTH / 2, y: HEIGHT / 2 } : null,
      LINK_LENGTH,
      0,
      links.length === 0 ? null : links[links.length - 1],
      links.length,
      removeLink
    );
    links.push(link);
  });
  start.mousePressed(() => (rotate = true));
  stop.mousePressed(() => (rotate = false));
  resetBtn.mousePressed(reset);

  // Creatng x-y plane graph
  graph = new Graph(WIDTH, HEIGHT, LINK_LENGTH);
}

function draw() {
  background(223, 230, 233);
  graph.render();

  if (rotate) links.forEach((link) => link.rotate());

  links.forEach((link) => {
    link.update();
  });
  links.forEach((link) => {
    link.show();
  });
}

sketch.setup = setup;
sketch.draw = draw;
