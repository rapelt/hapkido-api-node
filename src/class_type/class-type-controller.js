var shortid = require('shortid');

const ClassType = require('../models/class_type');

exports.getAllClassTypes = function (req, res, next) {

    ClassType.findAll().then((results) => {
        res.json(results);
    }).catch((error) => {
        return res.status(422).send("Query Error " + error)
    });
};

exports.createClassType = function (req, res, next) {
    var id = shortid.generate();
    var classtype = req.body.class_type;

    ClassType.create({
        class_type_id: id,
        class_type: classtype
    }).then((results) => {
        res.json(results);
    }).catch((error) => {
        return res.status(422).send("Query Error " + error)
    });

};
