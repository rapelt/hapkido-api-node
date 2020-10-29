import {TechniqueModel} from "./technique-model";
import {TagModel} from "../tag/tag-model";

var mapper = require('./technique-mapper');

var Tag = require('../models/tag');
const Technique = require('../models/technique');
const TechniqueTag = require('../models/technique_tag');
const TechniqueSet = require('../models/technique_set');


exports.getAllTechniques = function (req: any, res: any, next: any) {
    console.log("Finding all techniques");

    Technique.findAll({
        include: [{
            model: Tag,
        }]
    }).then((result : any) => {
        result = result.map((technique: any, index: number) => {
            return mapper.mapTechniques(technique);
        });
        res.json(result);
    }).catch((err: any) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.getTechnique = function (req: any, res: any, next: any) {
    console.log("Finding all techniques");
    const id = req.body.id;

    Technique.findAll({
        where: {t_id: id},
        include: [{
            model: Tag,
        }]
    }).then((result : any) => {
        result = mapper.mapTechniques(result);
        res.json(result);
    }).catch((err: any) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.createNewTechnique = function (req: any, res: any, next:any) {
    console.log("Create Technique", req.body);

    const clientTags: Array<TagModel> = req.body.tags;

    let clientTechnique: TechniqueModel = {
        id: 0,
        title: req.body.title,
        description: req.body.description || '',
        grade: req.body.grade || 0,
        techniqueSet: req.body.techniqueSet,
    }

    const serverModel = mapper.mapTechniqueToDB(clientTechnique);

    console.log(serverModel);

    Technique.create(serverModel)
        .then((result1: any) => {
            console.log(result1);
            const serverTagModel = mapper.mapTagsToTechniqueTags(clientTags, result1.t_id);
            TechniqueTag.bulkCreate(serverTagModel).then((result: any) => {
                res.json(mapper.dbToTechnqiue(result1, result));
            }).catch((err: any) => {
                return res.status(422).json({error: err});
            });
            // clientTechnique.id = result;
        }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.getAllTechniqueSets = function (req: any, res: any, next:any) {
    console.log("Get Technique Sets");

    TechniqueSet.findAll().then((result: any) => {
        res.json(result);
    }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });

};

exports.addNewTechniqueSet = function (req: any, res: any, next:any) {
    console.log("Create Technique Set", req.body);
    var techniqueSetName = req.body.techniqueSet;

    TechniqueSet.create({
        id: 0,
        name: techniqueSetName
    }).then((result: any) => {
        res.json(result);
    }).catch((err:any) => {
        console.log(err);
        return res.status(422).json({error: err});
    });
};
//
// exports.updateTechnique = function (req: any, res: any, next:any) {
//     console.log("Update Technique", req.body);
//     const technique = req.body;
//
//     const promiseArry = [];
//
//     const techniquedb = mapper.mapTechniqueToDB(technique);
//
//     promiseArry.push(service.updateTechnique(techniquedb));
//
//     technique.tags.forEach((t: number) => {
//         promiseArry.push(service.updateTags(techniquedb.t_id, t))
//     });
//
//     if(technique.tags.length === 0) {
//         promiseArry.push(service.removeTags(techniquedb.t_id))
//     }
//
//     Promise.all(promiseArry).then((all) => {
//         res.json();
//
//     }).catch((err) => {
//         console.log(err);
//         return res.status(422).send({error: err});
//     });
// };
//
// exports.updateTechniqueSet = function (req: any, res: any, next:any) {
//     console.log("Update Technique Set", req.body);
//
//     Promise.all([service.updateTechniqueSet(req.body)]).then((all) => {
//         res.json();
//
//     }).catch((err) => {
//         console.log(err);
//         return res.status(422).send({error: err});
//     });
//
//
// };
//
// exports.deactivateTechniqueSet = function (req: any, res: any, next:any) {
//     console.log("Deactivate Technique Set", req.body.id);
//
//     Promise.all([service.deactivateTechniqueSet(req.body.id)]).then((all) => {
//         res.json();
//
//     }).catch((err) => {
//         console.log(err);
//         return res.status(422).send({error: err});
//     });
//
//
// };
