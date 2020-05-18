// const { analizeObjects, initialize } = require("./coco-ssd");
// const { analizeObjects, initialize } = require("./coco-ssd_from_file");
// const { analizeObjects, initialize } = require("./mobilenet");
const { analizeObjects, initialize } = require("./mobilenet_from_file");
const resizeImages = require("./resizeImages");

const inputPath = "/home/alain/Desktop/lots_"; // ex. 35GB
const outputPath = "/home/alain/Desktop/out"; // ex. 300MB x10 smaller

async function run() {
  await initialize();

  const imagePaths = await recursivelyFindImages(outputPath); // ex. 2:13.706 (mm:ss.mmm)
  // const imagePaths = await recursivelyFindImages(outputPath); // ex. 42.397 (ss.mmm)

  console.time("analizeImages");
  for (let index in imagePaths) {
    console.log(await analizeObjects(imagePaths[index]));
  }
  console.timeEnd("analizeImages");

  console.time("resizeImages");
  // await resizeImages(imagePaths, outputPath);
  console.timeEnd("resizeImages");

  console.log("images: ", imagePaths.length);
}

const recursivelyFindImages = async (folderPath) => {
  console.time("findImages");
  const readdirp = require("readdirp");

  let imagePathsList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathsList.push(`${folderPath}/${path}`);
  }

  console.timeEnd("findImages");
  return imagePathsList;
};

run().catch(console.error);
