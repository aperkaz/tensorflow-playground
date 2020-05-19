const path = require("path");
const sharp = require("sharp");
// fixes memmory leak, using tiny queue
sharp.cache(false);
sharp.concurrency(1);

const asyncPool = require("tiny-async-pool");

const resizeImages = async (imageList, outputPath) => {
  const resizeImagePromise = resizeImagePromiseIterator(outputPath);
  await asyncPool(4, imageList, resizeImagePromise);
};

const resizeImagePromiseIterator = (outputPath) => async (sourcePath) => {
  const fileName = path.parse(sourcePath).base;

  // resize image

  // failOnError: fixes Samsung corrupted pictures
  return sharp(sourcePath, { failOnError: false })
    .resize(1980, 1080, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(`${outputPath}/${fileName}-128x128.jpg`);
};

module.exports = resizeImages;
