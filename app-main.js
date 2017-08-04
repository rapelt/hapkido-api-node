"use strict";

const app = require('./index');
const config = require('./config/config.dev');

const port = process.env.PORT || 8080;

var db = require('./db/dbConnection');


app.listen(port, () => {
    db.dbconnect(function () {
        console.log("Connected to Db");
    }, config.dbLocation);

    console.log(`Application is running on port ${port}`);
});