var connection = require('../db/rdsconnect');
var pool = connection.getpool();
var familyColumns = "family_id, name, contact_address_id";


function createFamily (family_id, name, contact_address_id) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO family (' + familyColumns +  ') VALUES(?, ?, ?);';

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

function getFamilyByName  (name) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'select family_id from family where name = ?';

            connection.query(query, [name], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results.length === 1){
                    resolve(results[0].family_id);
                } else if(results.length === 0) {
                    createFamily(0, name, null).then((result) =>{
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject("To many families", results);
                }
            });
        });
    });
}

module.exports = {
    createFamily: createFamily,
    getFamilyByName: getFamilyByName
};



