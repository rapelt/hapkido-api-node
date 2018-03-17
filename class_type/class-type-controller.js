var shortid = require('shortid');

var service = require('./class-type-service');

var connection = require('../db/rdsconnect');

var pool = connection.getpool();

exports.getAllClassTypes = function (req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) {
            throw res.status(422).send("Connection error " + error);
        }

        connection.query('select * from class_type', function (error, results, fields) {
            connection.release();
            if (error) throw res.status(422).send("Query Error " + error);
            res.json(results);
        });
    });
};

exports.createClassType = function (req, res, next) {

    var classtype = req.body.class_type;
    var id = shortid.generate();
    service.createClassType(id, classtype).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(422).send("Query Error " + error);
    });


};