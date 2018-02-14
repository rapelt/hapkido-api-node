var mysql = require('mysql');

exports.mysqlconnect = function (callback, dbLocation) {
    console.log('blarh');

    var connection = this.getconnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }

        console.log('Connected to database.');
    });
};

exports.getconnection = function () {
    return mysql.createConnection({
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        database : process.env.DATABASE
    });
};
