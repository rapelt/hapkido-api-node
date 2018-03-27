var connection = require('../db/rdsconnect');
var pool = connection.getpool();

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

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = "select * from class";

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



module.exports = {
    createClass: createClass,
    getAllClasses: getAllClasses,
    deleteClass: deleteClass,
    makeClassAGrading: makeClassAGrading
};
