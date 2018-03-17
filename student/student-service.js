var connection = require('../db/rdsconnect');
var pool = connection.getpool();

var studentColumns = "hb_id, first_name, last_name, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id, emergency_contact_id, family_id";

function createStudent(hb_id, first_name, last_name, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id, emergency_contact_id, family_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO member (' + studentColumns +  ') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

            connection.query(query, [hb_id, first_name, last_name, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id, emergency_contact_id, family_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function getAllStudents() {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'select * from member;';

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

function getStudent(hbid) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'select * from member where hb_id = ?;';

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

function getStudentEmail(hbid) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'select email from member where hb_id = ?;';

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

function updatedStudent(hb_id, first_name, last_name, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = `update member set 
            first_name = ?,
            last_name = ?,
            dob = ?,
            occupation = ?,
            is_active = ?,
            is_kumdo_student = ?,
            previous_experience = ?,
            injury_illness = ?,
            is_verified = ?,
            email = ?,
            preferred_class_type_id = ?
            where hb_id = ?;`;

            connection.query(query, [first_name, last_name, dob, occupation, is_active? 1 : 0, is_kumdo_student? 1 : 0, previous_experience, injury_illness, is_verified? 1 : 0, email, preferred_class_type_id, hb_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function setIsActiveToFalse(hb_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = `update member set 
            is_active = 0
            where hb_id = "${hb_id}";`;

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

function setIsActiveToTrue(hb_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = `update member set 
            is_active = 1
            where hb_id = "${hb_id}";`;

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
    createStudent: createStudent,
    getAllStudents: getAllStudents,
    getStudent: getStudent,
    getStudentEmail: getStudentEmail,
    updatedStudent: updatedStudent,
    setIsActiveToFalse: setIsActiveToFalse,
    setIsActiveToTrue: setIsActiveToTrue
};