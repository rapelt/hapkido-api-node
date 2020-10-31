"use strict";
let apps = require('./index');
let port = process.env.PORT || 8090;
import {createConnection, getConnectionManager} from "typeorm";


if(getConnectionManager().connections.length === 0) {
    createConnection().then(connection => {
        console.log('TypeORM is connected: ', connection.isConnected);
        var app = apps.listen(port, () => {

            const io = require('./src/io/io').init(app);

            io.on('connection', (socket: any) => {
                console.log('Client Connected');
            });

            io.emit('posts', {message: 'I am connected'});

            // io.connect(app, null).then(() => {
            //     console.log(`IO is connected`);
            // });
        });
    })
} else {
    console.log(getConnectionManager().connections.length);
    console.log('TypeORM is connected: ', getConnectionManager().connections.length);

}




