'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
var db = require('./db/dbConnection');
const config = require('./config/config.staging');

exports.handler = (event, context) => {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    awsServerlessExpress.proxy(server, event, context);
};