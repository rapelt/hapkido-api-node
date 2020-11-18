'use strict'
import {connectDB} from "./db/typeorm-connect";

const awsServerlessExpress = require('aws-serverless-express');
const apps = require('./index');
const server = awsServerlessExpress.createServer(apps);

exports.handler = (event, context, callback) => {
    const startServer = async () => {
        awsServerlessExpress.proxy(server, event, context);

        const io = require('./src/io/io').init(server);

        io.on('connection', (socket) => {
            console.log('Client Connected');

            io.emit('posts', {message: 'I am connected'});

        });

        io.on('connect_failed', function() {
            console.log("Sorry, there seems to be an issue with the connection!");
        })
    };

    (async () => {
        await connectDB();
        await startServer();
    })();

};
