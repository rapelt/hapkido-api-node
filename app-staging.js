'use strict';
const awsServerlessExpress = require('aws-serverless-express');
import {connectDB} from "./db/typeorm-connect";
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

// const server = awsServerlessExpress.createServer(apps);
// awsServerlessExpress.proxy(server, event, context);


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


//let counter = 0;

// counter++;
// console.log(counter)
// callback(null, { count: counter })
// context.callbackWaitsForEmptyEventLoop = false;



// const connectionManager = getConnectionManager();
//
// if(connectionManager.connections.length === 0){
//     createConnection().then(connection => {
//         console.log('TypeORM is connected: ', connection.isConnected);
//     }).catch((err) => {
//         console.log('Connection Error', err);
//     })
// } else {
//     connectionManager.getConnection(ormconfig).then(connection => {
//         console.log('TypeORM is connected: ', connection.isConnected);
//     });
//     console.log("connections", connectionManager.connections.length);
// }
