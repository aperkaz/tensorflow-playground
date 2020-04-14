const fetch = require("node-fetch");
global.fetch = fetch;

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const cocoSsd = require("@tensorflow-models/coco-ssd");

const { Image, createCanvas } = require("canvas");

async function loadImage(buffer) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = buffer;
  });
}

let net;

async function initialize() {
  console.time("loadModel");
  net = await cocoSsd.load("lite_mobilenet_v2");
  console.timeEnd("loadModel");
}

async function analizeObjects(imgPath) {
  console.time("loadImage");
  const img = await loadImage(imgPath);
  console.timeEnd("loadImage");
  const canvas = createCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);

  console.time("detect" + imgPath);
  const predictions = await net.detect(canvas);
  console.timeEnd("detect" + imgPath);
  return predictions;
}

module.exports = { initialize, analizeObjects };
