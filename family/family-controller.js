var service = require('./family-service');


exports.getAllFamiles = function (req, res, next) {
    console.log("Finding all families");

    Promise.all([service.getAllFamilies()]).then((all) => {
        console.log(all);
        res.json(all[0]);

    }).catch((err) => {
        console.log(err);
    });
};
