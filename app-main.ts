"use strict";

let apps = require('./index');

const config = require('./config/config.dev');

let port = process.env.PORT || 8090;

var mysql = require('./db/rdsconnect');

apps.listen(port, () => {
    mysql.mysqlconnect().then(() => {
        console.log(`Application is running on port ${port}`);
    });

});
