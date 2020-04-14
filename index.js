const { analizeObjects, initialize } = require("./coco-ssd");
const path = require("path");

async function run() {
  await initialize();

  const files = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (const fileName of files) {
    console.log("//");
    const imgPath = path.join(__dirname, `./data/hole/${fileName}.jpg`);
    const predictions = await analizeObjects(imgPath);
    // console.log(`${fileName}) ${JSON.stringify(predictions, null, 2)}`);
    // console.log(`${fileName}) ${exists ? "yes" : "no"}`);
  }
}

run().catch(console.error);
