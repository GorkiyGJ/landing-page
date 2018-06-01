global.appRoot = require('path').resolve(__dirname);
var config = global.appConfig = require("./config/index");
var cluster = require('cluster');
var https = require('https');
var http = require('http');
var express = require('express');
var routes = require(`${appRoot}/api/routes`);

class WebService {
    constructor(){
        var app = express();
        routes(app);
        http.createServer(app).listen(config.webService.httpPort);
        if(config.webService.runSecureHttp)
            https.createServer({}, app).listen(config.webService.httpsPort);

        console.log("worker id =" + cluster.worker.id + ", process pid =" + process.pid + " started");
    }
};

new WebService();



