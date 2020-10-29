const Family = require('../models/family');

exports.getAllFamiles = function (req, res, next) {
    console.log("Finding all families");

    Family.findAll().then((results) => {
        res.json(results);
    }).catch((error) => {
        return res.status(422).send("Query Error " + error)
    });
};
