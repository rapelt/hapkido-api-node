var service = require('./tag-service');

exports.getAllTags = function (req: any, res: any, next:any) {
    console.log("Get Tags");

    service.getAllTags()
        .then((result: any) => {
            console.log(result);
            res.json(result);
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.addNewTags = function (req: any, res: any, next:any) {
    console.log("Create Tag", req.body);
    var tagName = req.body.name;

    service.addTag(tagName)
        .then((result: any) => {
            console.log(result);
            return res.status(200).json({id: result, name: tagName});
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};
