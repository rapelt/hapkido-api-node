"use strict";
var mysql = require('mysql');
var poolconfig = {
    connectionLimit: 10,
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.DATABASE
};
var pool = mysql.createPool(poolconfig);
exports.mysqlconnect = function (callback, dbLocation) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        console.log('connecting to rds pool');
        var pool = _this.getpool();
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            connection.release();
            console.log('Connected to MySQL.');
            resolve();
        });
    });
};
exports.getpool = function () {
    return pool;
};
