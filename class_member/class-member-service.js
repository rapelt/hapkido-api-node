var connection = require('../db/rdsconnect');
var memberClassFields = "hb_id, class_id";
var _ = require('underscore');


function addMemberToClass (hb_id, class_id) {
    var pool = connection.getpool();


    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO member_class (' + memberClassFields +  ') VALUES(?, ?);';

            console.log(hb_id, class_id);

            connection.query(query, [hb_id, class_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                console.log(results);

                resolve(results);
            });
        });
    });
}

function getMembersInClass (class_id) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {

        var query = 'select hb_id from member_class where class_id = ?';

        pool.query(query, [class_id], function (error, results, fields) {
            if (error) {
                reject(error);
            }

            var attendance = [];
            _.each(results, (attended) => {
                attendance.push(attended.hb_id);
            });

            resolve(attendance);
        });
    });
}

function removeMemberToClass (hb_id, class_id) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }

            var query = 'delete from member_class where hb_id = ? and class_id = ?;';

            connection.query(query, [hb_id, class_id], function (error, results, fields) {
                connection.release();

                if (error) {
                    reject(error);
                }

                console.log(results);

                resolve(results);
            });
        });
    });
}

module.exports = {
    addMemberToClass: addMemberToClass,
    getMembersInClass: getMembersInClass,
    removeMemberToClass: removeMemberToClass
};



