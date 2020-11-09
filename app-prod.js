'use strict'
import {connectDB} from "./db/typeorm-connect";

const awsServerlessExpress = require('aws-serverless-express');
const apps = require('./index');
const server = awsServerlessExpress.createServer(apps);

exports.handler = (event, context, callback) => {
    const startServer = async () => {
        awsServerlessExpress.proxy(server, event, context);
    };

    (async () => {
        await connectDB();
        await startServer();
    })();

};
