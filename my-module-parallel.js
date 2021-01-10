(async () => {
  const nonModule = require("./my-module");

  const WorkerNodes = require("worker-nodes");
  const myModuleWorkerNodes = new WorkerNodes(
    "/Users/alain/src/tensorflow-playground/my-module.js",
    { autoStart: true }
  );

  console.log(myModuleWorkerNodes.getUsedWorkers().length);

  await myModuleWorkerNodes.ready();

  console.time("1");
  nonModule("hi");
  console.timeEnd("1");
  
  console.time("1");
  const res = await myModuleWorkerNodes.call("hi");
  console.timeEnd("1");

  console.time("parallel 4");
  await Promise.all([
    myModuleWorkerNodes.call("1"),
    myModuleWorkerNodes.call("2"),
    myModuleWorkerNodes.call("3"),
    myModuleWorkerNodes.call("4"),
  ]);
  console.timeEnd("parallel 4");

  myModuleWorkerNodes.terminate();

  console.time("non module 4");
  nonModule("1");
  nonModule("2");
  nonModule("3");
  nonModule("4");
  console.timeEnd("non module 4");
})();
