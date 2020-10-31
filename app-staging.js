'use strict';
import {createConnection} from "typeorm";
const awsServerlessExpress = require('aws-serverless-express');

exports.handler = (event, context) => {
    // if (error.constructor === AlreadyHasActiveConnectionError) {
    //     return findConnection();
    // }
    // function findConnections
    // try {
    //     const connection = await getConnection();
    //     setConnection(connection);
    // } catch (error) {
    //     console.log(error);
    // }
    const apps = require('./index');
    const server = awsServerlessExpress.createServer(apps);
    apps.use(async (req, res, next) => {
        const connection = await getConnection();

        if(connection === undefined){
                createConnection().then(connection => {
                    console.log('TypeORM is connected: ', connection.isConnected);
                }).catch((err) => {
                    console.log('Connection Error', err);
                })
            }
    });


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
