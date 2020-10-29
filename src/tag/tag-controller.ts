const Tag = require('../models/tag');

exports.getAllTags = function (req: any, res: any, next:any) {
    console.log("Get Tags");
    Tag.findAll().then((result: any) => {
        res.json(result);
    }).catch((err: any) => {
        return res.status(422).json({error: err});
    });
};

exports.addNewTags = function (req: any, res: any, next:any) {
    console.log("Create Tag", req.body);
    var tagName = req.body.name;

    Tag.findOrCreate({name: tagName}).then((result: any) => {
        res.json(result);
    }).catch((err: any) => {
        return res.status(422).json({error: err});
    });

};
