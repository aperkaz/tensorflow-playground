const throng = require("throng");
const cluster = require("cluster");

function messageHandler(msg) {
  console.log("master got message: ", msg);
}

async function processInParallel(items, processFunc) {
  // This will only be called once
  function master() {
    console.log("Started master");

    setTimeout(() => {
      for (const id in cluster.workers) {
        cluster.workers[id].on("message", messageHandler);
      }

      // TODONOW: send items to workers
      // cluster.workers["1"].send("hi");
    }, 2000);
  }

  // This will be called four times
  function worker(id, disconnect) {
    let exited = false;

    console.log(`Started worker ${id}`);

    for(var i = 0; i < 5000000000; i++);


    process.on("message",async  (arg) => {
      console.log("worker got message: ", await processFunc(arg));
      process.send("hello form the workers: ",await  processFunc(arg));
    });

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    async function shutdown() {
      if (exited) return;
      exited = true;

      console.log(`Worker ${id} cleanup done.`);
      disconnect();
    }
  }

  throng({ master, worker });
}

module.exports = processInParallel;
