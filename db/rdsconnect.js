var mysql = require('mysql2');
let connection_number = 0;

var poolconfig = {
    // connectionLimit : 10,
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.DATABASE
};

var pool  = mysql.createPool(poolconfig);

exports.mysqlconnect = function (callback, dbLocation) {
    return new Promise((resolve, reject) => {
        console.log('connecting to rds pool');

        var pool = this.getpool();

        pool.getConnection(function(err, connection) {
            connection.release();
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to MySQL.');
            resolve();
        });
    });
};

exports.getpool = function () {
    return pool;
};
