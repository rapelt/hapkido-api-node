"use strict";

const app = require('./index');

const port = process.env.PORT || 8080;

var db = require('./db/dbConnection');


app.listen(port, () => {
    db.dbconnect(function () {
        console.log("Connected to Db");
    });

    console.log(`Application is running on port ${port}`);
});