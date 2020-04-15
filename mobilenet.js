const fetch = require("node-fetch");
global.fetch = fetch;

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const mobilenet = require("@tensorflow-models/mobilenet");

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
  net = await mobilenet.load();
  console.timeEnd("loadModel");
}

async function analizeObjects(imgPath) {
  console.time("loadImage");
  const img = await loadImage(imgPath);
  console.timeEnd("loadImage");
  const canvas = createCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);

  // Since the model is trained in 224 pixels, reduce the image size to speed up processing x10
  const pixels = tf.browser.fromPixels(canvas);
  const smallImg = tf.image.resizeBilinear(pixels, [224, 224]);

  console.time("detect" + imgPath);
  // Pass the small image instead of canvas (full size of image)
  // const predictions = await net.classify(canvas);
  const predictions = await net.classify(smallImg);

  console.timeEnd("detect" + imgPath);
  return predictions;
}

module.exports = { initialize, analizeObjects };
