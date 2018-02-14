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

    var connected = connection.getconnection();

    connected.query('select * from class_type', (err, result) => {
        console.log(result);

        res.json(result);
    });
};