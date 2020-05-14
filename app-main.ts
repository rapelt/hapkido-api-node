"use strict";

let apps = require('./index');

const config = require('./config/config.dev');

let port = process.env.PORT || 8090;

var mysql = require('./db/rdsconnect');


var app = apps.listen(port, () => {

    mysql.mysqlconnect().then(() => {
        console.log(`Application is running on port ${port}`);
    });

    const io = require('./io/io').init(app);

    io.on('connection', (socket: any) => {
        console.log('Client Connected');
    });

    io.emit('posts', {message: 'I am connected'});

    // io.connect(app, null).then(() => {
    //     console.log(`IO is connected`);
    // });
});


