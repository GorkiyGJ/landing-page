var workerManager = require('throng');
global.appRoot = require('path').resolve(__dirname);
var config = global.appConfig = require("./config/index");

class Main {
    constructor(){
        workerManager(this.onMasterStart, {
            workers: config.workersCount,
            workerExec: `${appRoot}/${config.worker.workerExec}`,
            lifetime: Infinity,
            grace: config.worker.grace,
            silent:false
        });
    }

    onMasterStart(processId) {
        console.log("http service started. process pid = " + process.pid);
    }

}

new Main();