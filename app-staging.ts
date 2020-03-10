'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
const db = require('./db/dbConnection');
const config = require('./config/config.staging');
const mysql = require('./db/rdsconnect');

exports.handler = (event, context) => {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    mysql.mysqlconnect().then(() => {
        awsServerlessExpress.proxy(server, event, context);
    });};
