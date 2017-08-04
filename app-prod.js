'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
var db = require('./db/dbConnection');
const config = require('./config/config.prod');

exports.handler = (event, context) => {
    console.log("In handler - Rebekah");
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    awsServerlessExpress.proxy(server, event, context);
};