import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {Technique} from "../entity/technique";
import {TechniqueSet} from "../entity/technique-set";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {TagModel} from "../tag/tag-model";
import {TechniqueModel} from "./technique-model";
import {TechniqueClientModel} from "./technique-client.model";
import {Member} from "../entity/member";
import {StudentClientModel} from "../student/client-student.model";
import {Tag} from "../entity/tag";

export default class TechniqueController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllTechniques(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Technique> =  await getRepository('Technique');
        const techniques = await repository.find();

        const clientTechniques = techniques.map((technique: Technique) => {
            return new TechniqueClientModel().dbToClient(technique);
        })

        res.json(clientTechniques);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getAllTechniqueSets(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<TechniqueSet> = await getRepository('TechniqueSet');
        const techniqueSets = await repository.find();
        res.json(techniqueSets);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createNewTechnique(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Technique> =  await getRepository('Technique');

        const clientTags: Array<TagModel> = req.body.tags;

        const tagRepository: Repository<Tag> =  await getRepository('Tag');

        const technique = new TechniqueClientModel().clientToDB(req.body);
        technique.tags = await tagRepository.findByIds(clientTags);

        const techniqueResult = await repository.insert(technique);

        res.json(techniqueResult.generatedMaps);
    };

    @DefaultCatch(defaultErrorHandler)
    static async addNewTechniqueSet(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<TechniqueSet> =  await getRepository('TechniqueSet');
        const techniqueResult = await repository.insert({ name: req.body.techniqueSet});
        res.json(techniqueResult.generatedMaps);
    };
}











//
// exports.createNewTechnique = function (req: any, res: any, next:any) {
//     console.log("Create TechniqueSet", req.body);
//
//     const clientTags: Array<TagModel> = req.body.tags;
//
//     let clientTechnique: TechniqueModel = {
//         id: 0,
//         title: req.body.title,
//         description: req.body.description || '',
//         grade: req.body.grade || 0,
//         techniqueSet: req.body.techniqueSet,
//     }
//
//     const serverModel = mapper.mapTechniqueToDB(clientTechnique);
//
//     console.log(serverModel);
//
//     Technique.create(serverModel)
//         .then((result1: any) => {
//             console.log(result1);
//             const serverTagModel = mapper.mapTagsToTechniqueTags(clientTags, result1.t_id);
//             TechniqueTag.bulkCreate(serverTagModel).then((result: any) => {
//                 res.json(mapper.dbToTechnqiue(result1, result));
//             }).catch((err: any) => {
//                 return res.status(422).json({error: err});
//             });
//             // clientTechnique.id = result;
//         }).catch((err:any) => {
//         console.log(err);
//         return res.status(422).json({error: err});
//     });
//
// };
//
// exports.getAllTechniqueSets = function (req: any, res: any, next:any) {
//     console.log("Get TechniqueSet Sets");
//
//     TechniqueSet.findAll().then((result: any) => {
//         res.json(result);
//     }).catch((err:any) => {
//         console.log(err);
//         return res.status(422).json({error: err});
//     });
//
// };
//
// exports.addNewTechniqueSet = function (req: any, res: any, next:any) {
//     console.log("Create TechniqueSet Set", req.body);
//     var techniqueSetName = req.body.techniqueSet;
//
//     TechniqueSet.create({
//         id: 0,
//         name: techniqueSetName
//     }).then((result: any) => {
//         res.json(result);
//     }).catch((err:any) => {
//         console.log(err);
//         return res.status(422).json({error: err});
//     });
// };
// //
// // exports.updateTechnique = function (req: any, res: any, next:any) {
// //     console.log("Update TechniqueSet", req.body);
// //     const technique = req.body;
// //
// //     const promiseArry = [];
// //
// //     const techniquedb = mapper.mapTechniqueToDB(technique);
// //
// //     promiseArry.push(service.updateTechnique(techniquedb));
// //
// //     technique.tags.forEach((t: number) => {
// //         promiseArry.push(service.updateTags(techniquedb.t_id, t))
// //     });
// //
// //     if(technique.tags.length === 0) {
// //         promiseArry.push(service.removeTags(techniquedb.t_id))
// //     }
// //
// //     Promise.all(promiseArry).then((all) => {
// //         res.json();
// //
// //     }).catch((err) => {
// //         console.log(err);
// //         return res.status(422).send({error: err});
// //     });
// // };
// //
// // exports.updateTechniqueSet = function (req: any, res: any, next:any) {
// //     console.log("Update TechniqueSet Set", req.body);
// //
// //     Promise.all([service.updateTechniqueSet(req.body)]).then((all) => {
// //         res.json();
// //
// //     }).catch((err) => {
// //         console.log(err);
// //         return res.status(422).send({error: err});
// //     });
// //
// //
// // };
// //
// // exports.deactivateTechniqueSet = function (req: any, res: any, next:any) {
// //     console.log("Deactivate TechniqueSet Set", req.body.id);
// //
// //     Promise.all([service.deactivateTechniqueSet(req.body.id)]).then((all) => {
// //         res.json();
// //
// //     }).catch((err) => {
// //         console.log(err);
// //         return res.status(422).send({error: err});
// //     });
// //
// //
// // };
