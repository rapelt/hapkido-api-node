var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.DATABASE
});

exports.mysqlconnect = function (callback, dbLocation) {
    console.log('blarh');

    var pool = this.getpool();

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        connection.release();

        console.log('Connected to database.');
    });
};

exports.getpool = function () {
    return pool;
};
