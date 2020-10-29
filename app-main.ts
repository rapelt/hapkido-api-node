"use strict";
let apps = require('./index');

let port = process.env.PORT || 8090;

var sequelize = require('./db/sequelize');
var sequelizeRelations = require('./db/setupSequelizeRealtions');

var app = apps.listen(port, () => {
    sequelize.sync({alter: true}).then((result: any) => {
        // console.log(result)
        console.log(`Application is running on port ${port}`);

    }).catch((err: any)=> {
        console.log(err);
    })

    const io = require('./src/io/io').init(app);

    io.on('connection', (socket: any) => {
        console.log('Client Connected');
    });

    io.emit('posts', {message: 'I am connected'});

    // io.connect(app, null).then(() => {
    //     console.log(`IO is connected`);
    // });
});


