const fetch = require("node-fetch");
global.fetch = fetch;

const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const mobilenet = require("@tensorflow-models/mobilenet");

const { Image, createCanvas } = require("canvas");

const {logFunctionPerf} = require('../utils')

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

  const MODEL_URL = "file://models/mobilenet/model.json";

  net = await mobilenet.load({
    modelUrl: MODEL_URL,
    version: 1,
    alpha: 1,
    // fix the default of [-1,1]
    inputRange: [0, 1],
  });

}

async function analizeObjects(imgPath) {

  // console.time("loadImage");
  let img = await loadImage(imgPath);
  // console.timeEnd("loadImage");
  // console.time("createCanvas");
  let canvas = createCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);
  // console.timeEnd("createCanvas");

  // Since the model is trained in 224 pixels, reduce the image size to speed up processing x10
  // console.time("create tensors");
  let pixels = tf.browser.fromPixels(canvas);
  let smallImg = tf.image.resizeBilinear(pixels, [224, 224]);
  // console.timeEnd("create tensors");

  // console.time("detect" + imgPath);
  const predictions = await net.classify(smallImg);
  // console.timeEnd("detect" + imgPath);

  // clean up to avoid memory issues
  img = null;
  canvas = null;
  pixels.dispose();
  pixels = null;
  smallImg.dispose();
  smallImg = null;

  return predictions;
}

module.exports = { initialize: logFunctionPerf(initialize), analizeObjects: logFunctionPerf(analizeObjects) };
