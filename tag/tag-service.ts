var connection = require('../db/rdsconnect');
var pool = connection.getpool();

var tagColumns = "id, name";

function getAllTags() {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'select * from tag;';

            connection.query(query, function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function addTag(tagName: string) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO tag (' + tagColumns +  ') VALUES(?, ?);';

            connection.query(query, [0, tagName], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results){
                    resolve(results.insertId);

                }

                resolve(results);
            });
        });
    });
};

module.exports = {
    getAllTags: getAllTags,
    addTag: addTag
};
