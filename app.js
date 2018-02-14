'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
var db = require('./db/dbConnection');

const config = require('./config/config.dev');
var mysql = require('./db/rdsconnect');

exports.handler = (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    mysql.mysqlconnect();

    awsServerlessExpress.proxy(server, event, context);
};