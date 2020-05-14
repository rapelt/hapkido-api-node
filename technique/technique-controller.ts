var service = require('./technique-service');
var mapper = require('./technique-mapper');

exports.getAllTechniques = function (req: any, res: any, next: any) {
    console.log("Finding all techniques");

    Promise.all([service.getAllTechniques(), service.getTechniqueTags()]).then((all) => {
        res.json(mapper.mapTechniques(all[0], all[1]));
    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.createNewTechnique = function (req: any, res: any, next:any) {
    console.log("Create Technique", req.body);
    var techniqueName = req.body.name;

    service.createTechnique(techniqueName)
        .then((result: any) => {
            return res.status(200).json({techniqueId: result, title: techniqueName});
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.getAllTechniqueSets = function (req: any, res: any, next:any) {
    console.log("Get Technique Sets");

    service.getAllTechniqueSets()
        .then((result: any) => {
            res.json(result);
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.addNewTechniqueSet = function (req: any, res: any, next:any) {
    console.log("Create Technique Set", req.body);
    var techniqueSetName = req.body.name;

    service.addTechniqueSet(techniqueSetName)
        .then((result: any) => {
            return res.status(200).json({id: result, name: techniqueSetName});
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.updateTechnique = function (req: any, res: any, next:any) {
    console.log("Update Technique", req.body);
    const technique = req.body;

    const promiseArry = [];

    const techniquedb = mapper.mapTechniqueToDB(technique);

    promiseArry.push(service.updateTechnique(techniquedb));

    technique.tags.forEach((t: number) => {
        promiseArry.push(service.updateTags(techniquedb.t_id, t))
    });

    Promise.all(promiseArry).then((all) => {
        res.json();

    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });


};
