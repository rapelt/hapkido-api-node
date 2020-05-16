var connection = require('../db/rdsconnect');
var pool = connection.getpool();

var moment = require('moment');
var classColumns = "class_id, is_grading, date, class_type_id";


function createClass (class_id, is_grading, date, class_type_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var q = "insert into class ("+ classColumns  +") select ?, ?, ?, ? from dual where not exists (select date, class_type_id from class where date = ? and class_type_id = ?);";

            connection.query(q, [class_id, is_grading, date, class_type_id, date, class_type_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results !== undefined && results.affectedRows === 0){
                    reject('Class already exists');
                }

                if(results !== undefined && results.insertId !== undefined){
                    resolve(results.insertId);
                }

                resolve(0);

            });
        });
    });
};

function getAllClasses () {
    console.log("Finding all classes 3");


    return new Promise((resolve, reject) => {
        console.log("Finding all classes 4");

        pool.getConnection(function (err, connection) {
            console.log("Finding all classes 5");

            if (!connection) {
                console.log("Finding all classes ERROR 3 - No Connection");

                reject(err);
            }

            var query = "select * from class";

            connection.query(query, function (error, results, fields) {
                console.log("Finding all classes 6");

                connection.release();

                if (error) {
                    console.log("Finding all classes ERROR 4 - Query Error");

                    reject(error);
                }
                console.log("Finding all classes 7");

                resolve(results);
            });
        });
    });
};

function deleteClass (classid) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = "delete from class where class_id = ?";

            connection.query(query, [classid], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results !== undefined && results.affectedRows === 0){
                    reject('Class didn\'t exists');
                }

                resolve(results);
            });
        });
    });
};


function makeClassAGrading (classid) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = "update class set is_grading = 1 where class_id = ?;";

            connection.query(query, [classid], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results !== undefined && results.affectedRows === 0){
                    reject('Class didn\'t exists');
                }

                resolve(results);
            });
        });
    });
};

//date year-month-day
function getNextClasses (numberOfClasses = 5, date = moment().format('YYYY-MM-DD')) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }
            var query = `select * from class where date > '${date}' order by date limit ${numberOfClasses};`;

            connection.query(query, function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    });
};

function getClassesBetweenDates (startDate, endDate) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }
            console.log(`select * from class where date > '${moment(startDate).format('YYYY-MM-DD')}' and date < '${moment(endDate).format('YYYY-MM-DD')}' order by date;`);

            var query = `select * from class where date > '${moment(startDate).format('YYYY-MM-DD')}' and date < '${moment(endDate).format('YYYY-MM-DD')}' order by date;`;

            connection.query(query, function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    });
};





module.exports = {
    createClass: createClass,
    getAllClasses: getAllClasses,
    deleteClass: deleteClass,
    makeClassAGrading: makeClassAGrading,
    getNextClasses: getNextClasses,
    getClassesBetweenDates: getClassesBetweenDates
};
