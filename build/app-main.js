"use strict";
var apps = require('./index');
var config = require('./config/config.dev');
var port = process.env.PORT || 8080;
var db = require('./db/dbConnection');
var mysql = require('./db/rdsconnect');
apps.listen(port, function () {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);
    mysql.mysqlconnect().then(function () {
        console.log("Application is running on port " + port);
    });
});
