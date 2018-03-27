var connection = require('../db/rdsconnect');
var pool = connection.getpool();

function createClassType (id, classtype) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            connection.query('INSERT INTO class_type (class_type_id, class_type) VALUES(?, ?)', [id, classtype], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }
                resolve(results.insertId);
            });
        });
    });
};

function getClassTypeIdByName(classtype) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }

            connection.query('select class_type_id from class_type where class_type = ?', [classtype], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if (results.length === 1) {
                    resolve(results[0].class_type_id);
                } else if (results.length === 0) {
                    createClassType(0, classtype).then((results) => {
                        resolve(results);
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject("To many class types", results);
                }
            });
        });
    });
};

function getClassTypeById(id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                console.log(err);
                reject(err);
            } else {
                connection.query('select distinct class_type from class_type where class_type_id = ?', [id], function (error, results, fields) {
                    connection.release();

                    if (error) {
                        reject(error);
                    }

                    resolve(results[0]);
                });
            }
        });
    });
};

function getAllClassTypes() {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (!connection) {
                reject(err);
            }

            var query = 'select * from class_type;';

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
    getClassTypeIdByName: getClassTypeIdByName,
    createClassType: createClassType,
    getClassTypeById: getClassTypeById,
    getAllClassTypes: getAllClassTypes
};
