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

var poolClosed = false;

var pool = setPools();

function getPools () {
    if(!pool){
        setPools();
    }
    return pool;
};

function setPools () {
    pool = mysql.createPool(poolconfig);
    poolClosed = false;
};

function mysqlconnection(callback, dbLocation) {
    return new Promise((resolve, reject) => {
        console.log('connecting to rds pool');
        if(poolClosed) {
            setPools();
            console.log('new pools');
        }
        var pool = getPools();

        console.log(pool, poolClosed);


        pool.getConnection(function(err, connection) {
            if(connection){
                connection.release();
            }
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to MySQL.');
            resolve();
        });
    });
};

exports.releaseAllConnections = function () {
    pool = getPools();

    pool.end(function (err) {
        poolClosed = true;
        // all connections in the pool have ended
        console.log('All Connections have ended');
        mysqlconnection().then(() => {});

    });

    return;

}

exports.getpool = getPools;
exports.mysqlconnect = mysqlconnection;
