import {TechniqueModel} from "./technique-model";
import {TagModel, TechniqueTagServerModel} from "../tag/tag-model";

var service = require('./technique-service');
var techniqueTagService = require('../technique_tag/technique-tag-service');

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

    let clientTechnique: TechniqueModel = {
        id: 0,
        title: req.body.title,
        description: req.body.description || '',
        grade: req.body.grade || 0,
        techniqueSet: req.body.techniqueSet,
        tags: req.body.tags
    }

    const clientTags: Array<TagModel> = req.body.tags;

    const serverModel = mapper.mapTechniqueToDB(clientTechnique);



    service.createTechnique(serverModel)
        .then((result: any) => {
            console.log('Technique Id', result)
            clientTechnique.id = result;
            const serverTags: Array<TechniqueTagServerModel> = mapper.mapTagsToTechniqueTags(clientTags, result);

            techniqueTagService.addTagToNewTechnique(serverTags)
                .then((result: any) => {
                    console.log('Tag results', result);

                    clientTechnique.tags = result;
                    return res.status(200).json(clientTechnique);
                }).catch((err:any) => {
                console.log(err);
                return res.status(200).json({error: 'Technique created without Tags'});
            });
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
    var techniqueSetName = req.body.techniqueSet;

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

    if(technique.tags.length === 0) {
        promiseArry.push(service.removeTags(techniquedb.t_id))

    }

    Promise.all(promiseArry).then((all) => {
        res.json();

    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });


};

exports.updateTechniqueSet = function (req: any, res: any, next:any) {
    console.log("Update Technique Set", req.body);

    Promise.all([service.updateTechniqueSet(req.body)]).then((all) => {
        res.json();

    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });


};

exports.deactivateTechniqueSet = function (req: any, res: any, next:any) {
    console.log("Deactivate Technique Set", req.body.id);

    Promise.all([service.deactivateTechniqueSet(req.body.id)]).then((all) => {
        res.json();

    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });


};
