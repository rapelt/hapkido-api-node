var connection = require('../db/rdsconnect');
var pool = connection.getpool();
var _ = require('underscore');

var gradeColumns = "grade_id, hb_id, class_id, date";

function addStudentGrade(hb_id, grade_id, class_id, date) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var q = "insert into member_grade ("+ gradeColumns  +") values (?, ?, ?, ?);";

            connection.query(q, [grade_id, hb_id, class_id, date], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results !== undefined && results.affectedRows === 0){
                    reject('Student Grade already exists');
                }

                resolve(results);
            });
        });
    });
}

function removeStudentGrade(hb_id, grade_id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            var q = `delete from member_grade where hb_id = ? and  grade_id = ?;`;

            connection.query(q, [hb_id, grade_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
}

function getAllGrades() {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = 'select * from member_grade;';

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

function getStudentGrades(hbid) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = 'select * from member_grade where hb_id = ?;';

            connection.query(query, [hbid], function (error, results, fields) {
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
    addStudentGrade: addStudentGrade,
    getAllGrades: getAllGrades,
    getStudentGrades: getStudentGrades,
    removeStudentGrade: removeStudentGrade
};
