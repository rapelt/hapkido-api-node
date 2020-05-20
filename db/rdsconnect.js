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

// pool.on('release', function (connection) {
//     console.log('Connection %d released', connection.threadId);
// });
//
// pool.on('connection', function (connection) {
//     console.log('Connected %d', connection.threadId);
// });
//
// pool.on('enqueue', function () {
//     console.log('Waiting for available connection slot');
// });

exports.getpool = function () {
    return pool;
};
