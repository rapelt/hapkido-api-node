'use strict';
export {};

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
const mysql = require('./db/rdsconnect');

exports.handler = (event: any, context: any) => {
    mysql.mysqlconnect().then(() => {
        awsServerlessExpress.proxy(server, event, context);
    });
};
