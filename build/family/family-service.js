"use strict";
var connection = require('../db/rdsconnect');
var pool = connection.getpool();
var familyColumns = "family_id, name, contact_address_id";
function createFamily(family_id, name, contact_address_id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }
            var query = 'INSERT INTO family (' + familyColumns + ') VALUES(?, ?, ?);';
            connection.query(query, [family_id, name, contact_address_id], function (error, results, fields) {
                connection.release();
                if (error) {
                    reject(error);
                }
                resolve(results.insertId);
            });
        });
    });
}
function getFamilyByName(name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (!connection) {
                reject(err);
            }
            var query = 'select family_id from family where name = ?';
            connection.query(query, [name], function (error, results, fields) {
                connection.release();
                if (error) {
                    reject(error);
                }
                if (results.length === 1) {
                    resolve(results[0].family_id);
                }
                else if (results.length === 0) {
                    createFamily(0, name, null).then(function (result) {
                        resolve(result);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject("To many families", results);
                }
            });
        });
    });
}
function getAllFamilies(name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            var query = 'select * from family;';
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    });
}
module.exports = {
    createFamily: createFamily,
    getFamilyByName: getFamilyByName,
    getAllFamilies: getAllFamilies
};
