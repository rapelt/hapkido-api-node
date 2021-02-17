"use strict";

let apps = require('./index');
const config = require('./config/config.dev');
let port = process.env.PORT || 8090;
import {connectDB} from "./db/typeorm-connect";



const startServer = async () => {
    var app = apps.listen(port, () => {
        console.log(`Application is running on port ${port}`);

        const io = require('./src/io/io').init(app);

        io.on('connection', (socket: any) => {
            console.log('Client Connected');

            io.emit('posts', {message: 'I am connected'});

        });

        io.on('connect_failed', function() {
            console.log("Sorry, there seems to be an issue with the connection!");
        })

    });


};


(async () => {
    await connectDB();
    await startServer();
})();

// const io = require('./src/io/io').init(apps);
//
// io.on('connection', (socket: any) => {
//     console.log('Io Client Connected');
// });
//
// io.emit('posts', {message: 'I am connected'});
//
// io.connect(apps, null).then(() => {
//     console.log(`IO is connected`);
// });



