// const { analizeObjects, initialize } = require("./coco-ssd");
// const { analizeObjects, initialize } = require("./mobilenet");
const { analizeObjects, initialize } = require("./mobilenet_from_file");

const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

const path = require("path");

const { Image, createCanvas } = require("canvas");

async function run() {
  await initialize();

  const files = [0];
  for (const fileName of files) {
    console.log("--");
    const imgPath = path.join(__dirname, `./data/hole/${fileName}.jpg`);
    const predictions = await analizeObjects(imgPath);
    console.log(predictions);
  }
}

async function loadImage(buffer) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = buffer;
  });
}

// async function run() {
//   const mobileNet = new MobileNet();
//   await mobileNet.load();

//   const files = [1];
//   // const files = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   for (const fileName of files) {
//     console.log("--");

//     const imgPath = path.join(__dirname, `./data/hole/${fileName}.jpg`);

//     const img = await loadImage(imgPath);

//     // console.timeEnd("loadImage");
//     const canvas = createCanvas(img.width, img.height);
//     canvas.getContext("2d").drawImage(img, 0, 0);

//     const pixels = tf.browser.fromPixels(canvas);

//     // TODO: works, but the image must be resized!!
//     const smallImg = tf.image.resizeBilinear(pixels, [224, 224]);
//     // console.log(smallImg);
//     const resized = tf.cast(smallImg, "float32");
//     // console.log(resized);
//     const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1, 224, 224, 3]);

//     // console.log(t4d);

//     console.time("First prediction");
//     let result = mobileNet.predict(smallImg);
//     console.log(result);
//     console.log("--");

//     const topK = mobileNet.getTopKClasses(result, 5);
//     // console.log(topK);
//     console.log("--");
//     console.timeEnd("First prediction");

//     result.innerText = "";
//     topK.forEach((x) => {
//       result.innerText += `${x.value.toFixed(3)}: ${x.label}\n`;
//     });

//     console.time("Subsequent predictions");
//     result = mobileNet.predict(smallImg);
//     // console.log(result);
//     console.log("--");

//     console.log(mobileNet.getTopKClasses(result, 5));
//     console.timeEnd("Subsequent predictions");

//     mobileNet.dispose();
//   }
// }

run().catch(console.error);
