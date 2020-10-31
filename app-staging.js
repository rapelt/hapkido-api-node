'use strict';
import {createConnection} from "typeorm";
const awsServerlessExpress = require('aws-serverless-express');

exports.handler = (event, context) => {
    createConnection().then(connection => {
        console.log('TypeORM is connected: ', connection.isConnected);
        const apps = require('./index');
        const server = awsServerlessExpress.createServer(apps);
        awsServerlessExpress.proxy(server, event, context);

        //var app = apps.listen(port, () => {

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
        //});
    })
};
