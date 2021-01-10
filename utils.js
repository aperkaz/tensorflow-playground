const logFunctionPerf = (func, name ) => async (...args) => {
    const funcName = name ? name : func.name;
    
    console.time(funcName)
    const ret = await func(...args)
    console.timeEnd(funcName)

    return ret;
}

const recursivelyFindImages = async (folderPath) => {
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
  
    return imagePathsList;
  };

module.exports = {logFunctionPerf, recursivelyFindImages: logFunctionPerf(recursivelyFindImages)}