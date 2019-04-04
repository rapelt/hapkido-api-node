"use strict";

let apps = require('./index');

const config = require('./config/config.dev');

let port = process.env.PORT || 8080;

var db = require('./db/dbConnection');
var mysql = require('./db/rdsconnect');



apps.listen(port, () => {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    mysql.mysqlconnect().then(() => {
        console.log(`Application is running on port ${port}`);
    });

});
