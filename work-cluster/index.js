const { analizeObjects, initialize } = require("./mobilenet_from_file");
const resizeImages = require("../resizeImages");

const inputPath =
  "/Users/alain/Dropbox/ALAIN/pictures/_Vaxjo 2016-2017/bbq 2017";
// const inputPath = "./data"; // ex. 35GB
const outputPath = "./output"; // ex. 300MB x10 smaller

const { recursivelyFindImages } = require("../utils");

// const throng = require('throng')

// throng({ master, worker, count: 4 })



async function run() {
  await initialize();

  const imagePaths = await recursivelyFindImages(inputPath); // ex. 2:13.706 (mm:ss.mmm)

  console.time("Analize All");
  // for (let index in imagePaths) {
  //   const result = await analizeObjects(imagePaths[index]);
  // }
  const processInParallel = require('./throng-cluster')
  await processInParallel(imagePaths, analizeObjects)
  console.timeEnd("Analize All")

  // await resizeImages(imagePaths, outputPath);
  // console.log("images: ", imagePaths.length);
}

run().catch(console.error);
