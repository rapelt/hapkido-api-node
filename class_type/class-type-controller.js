var shortid = require('shortid');
var _ = require('underscore');
var moment = require('moment');

var connection = require('../db/rdsconnect');

exports.getAllClassTypes = function (req, res, next) {
    /*AClass.find({}, function (err, classes) {
        console.log("Finding all classes");
        if(err) {
            return next(err);
        }

        if (classes) {
            res.json(classes);
        } else {
            return res.status(422).send({error: "no classes found"});
        }
    });*/

    console.log(connection);

    var pool = connection.getpool();

    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('select * from class_type', function (error, results, fields) {
            // And done with the connection.

            // Handle error after the release.
            if (error) throw res.status(422).send(error);

            console.log(results);

            res.json(results);

            connection.release();
        });
    });
};