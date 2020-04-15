// const { analizeObjects, initialize } = require("./coco-ssd");
// const { analizeObjects, initialize } = require("./coco-ssd_from_file");
// const { analizeObjects, initialize } = require("./mobilenet");
const { analizeObjects, initialize } = require("./mobilenet_from_file");

const path = require("path");

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

run().catch(console.error);
