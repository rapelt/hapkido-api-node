'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
console.log("App.js");

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};