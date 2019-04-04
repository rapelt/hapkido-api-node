'use strict';
var awsServerlessExpress = require('aws-serverless-express');
var app = require('./index');
var server = awsServerlessExpress.createServer(app);
var db = require('./db/dbConnection');
var config = require('./config/config.staging');
var mysql = require('./db/rdsconnect');
exports.handler = function (event, context) {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);
    mysql.mysqlconnect().then(function () {
        awsServerlessExpress.proxy(server, event, context);
    });
};
