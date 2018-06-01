var express = require('express');

module.exports = (app)=> {

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.use('/', express.static(appConfig.app.publicDirectoryPath));
    
};