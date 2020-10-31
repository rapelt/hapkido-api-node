"use strict";
let apps = require('./index');
let port = process.env.PORT || 8090;
import { createConnection } from "typeorm";

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



