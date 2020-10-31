"use strict";

let apps = require('./index');
const config = require('./config/config.dev');
let port = process.env.PORT || 8090;
import {connectDB} from "./db/typeorm-connect";


const startServer = async () => {
    var app = apps.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
};


(async () => {
    await connectDB();
    await startServer();
})();


// const io = require('./io/io').init(app);
//
// io.on('connection', (socket: any) => {
//     console.log('Client Connected');
// });
//
// io.emit('posts', {message: 'I am connected'});
//
// // io.connect(app, null).then(() => {
// //     console.log(`IO is connected`);
// // });




