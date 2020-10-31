'use strict';
import {createConnection} from "typeorm";
const awsServerlessExpress = require('aws-serverless-express');
const apps = require('./index');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    createConnection().then(connection => {
        console.log('TypeORM is connected: ', connection.isConnected);
        var app = apps.listen(port, () => {
            awsServerlessExpress.proxy(server, event, context);

            // const io = require('./src/io/io').init(app);
            //
            // io.on('connection', (socket: any) => {
            //     console.log('Client Connected');
            // });
            //
            // io.emit('posts', {message: 'I am connected'});

            // io.connect(app, null).then(() => {
            //     console.log(`IO is connected`);
            // });
        });
    })
};
