'use strict';
import {createConnection, getConnectionManager} from "typeorm";
const awsServerlessExpress = require('aws-serverless-express');

const connectionManager = getConnectionManager();

if(connectionManager.connections.length === 0){
    createConnection().then(connection => {
        console.log('TypeORM is connected: ', connection.isConnected);
    }).catch((err) => {
        console.log('Connection Error', err);
    })
} else {
    console.log("connections", connectionManager.connections.length);
}

let counter = 0;

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const apps = require('./index');
    const server = awsServerlessExpress.createServer(apps);
    awsServerlessExpress.proxy(server, event, context);

    counter++
    console.log(counter)
    callback(null, { count: counter })

    // createConnection().then(connection => {
    //
    //     awsServerlessExpress.proxy(server, event, context);
    //
    //     //var app = apps.listen(port, () => {
    //
    //         // const io = require('./src/io/io').init(app);
    //         //
    //         // io.on('connection', (socket: any) => {
    //         //     console.log('Client Connected');
    //         // });
    //         //
    //         // io.emit('posts', {message: 'I am connected'});
    //
    //         // io.connect(app, null).then(() => {
    //         //     console.log(`IO is connected`);
    //         // });
    //     //});


};
