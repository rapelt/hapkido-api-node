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
import {Grade} from "../entity/grade";
import {measure} from "../common/performance.decorator";

export default class TechniqueController {

    @measure
    @DefaultCatch(defaultErrorHandler)
    static async getAllTechniques(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Technique> =  await getRepository('Technique');
        const techniques = await repository.find();

        const clientTechniques = techniques.map((technique: Technique) => {
            return new TechniqueClientModel().dbToClient(technique);
        })

        res.json(clientTechniques);
    };

    @measure
    @DefaultCatch(defaultErrorHandler)
    static async getAllTechniqueSets(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<TechniqueSet> = await getRepository('TechniqueSet');
        const techniqueSets = await repository.find();
        res.json(techniqueSets);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createNewTechnique(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Technique> =  await getRepository('Technique');

        const clientTags: Array<TagModel> = req.body.tags || [];

        const tagRepository: Repository<Tag> =  await getRepository('Tag');

        console.log(req.body);

        const technique = new TechniqueClientModel().clientToDB(req.body);

        if(clientTags.length > 0) {
            technique.tags = await tagRepository.findByIds(clientTags);
        }

        const techniqueResult = await repository.save(technique);
        const dbtechnique = await repository.findOneOrFail(techniqueResult.id);
        const clientTechnique = new TechniqueClientModel().dbToClient(dbtechnique);

        res.json(clientTechnique);
    };

    @DefaultCatch(defaultErrorHandler)
    static async addNewTechniqueSet(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<TechniqueSet> =  await getRepository('TechniqueSet');
        const newTehcniqueSet = new TechniqueSet();
        newTehcniqueSet.name = req.body.techniqueSet
        newTehcniqueSet.isActive = true;
        console.log(newTehcniqueSet);
        const techniqueResult = await repository.save(newTehcniqueSet);
        res.json(techniqueResult);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateTechniqueSet(req: Request, res: Response, next:NextFunction) {
        console.log("Update TechniqueSet Set", req.body);
        const repository: Repository<TechniqueSet> =  await getRepository('TechniqueSet');

        const dbtechniqueSet = await repository.findOneOrFail(req.body.id);
        dbtechniqueSet.name = req.body.name;

        const techniqueResult = await repository.save(dbtechniqueSet);
        res.json(techniqueResult);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateTechnique(req: Request, res: Response, next:NextFunction) {
        console.log("Update TechniqueSet", req.body);
        const clientTechnique: TechniqueClientModel = req.body;
        const repository: Repository<Technique> =  await getRepository('Technique');
        const tagRepository: Repository<Tag> =  await getRepository('Tag');
        const gradeRepo: Repository<Grade> =  await getRepository('Grade');

        const dbTechnique = await repository.findOneOrFail(req.body.id);

        dbTechnique.description = clientTechnique.description;
        dbTechnique.t_grade = clientTechnique.grade;
        dbTechnique.title = clientTechnique.title;
        dbTechnique.tags = await tagRepository.findByIds(clientTechnique.tags);
        dbTechnique.grade = await gradeRepo.findOneOrFail(clientTechnique.grade);

        console.log('dbtechnique', dbTechnique);

        const techniqueResult = await repository.save(dbTechnique);

        console.log('result', techniqueResult);

        const dbtechnique = await repository.findOneOrFail(techniqueResult.id);
        const newClientTechnique = new TechniqueClientModel().dbToClient(dbtechnique);
        console.log(newClientTechnique);
        res.json(newClientTechnique);
    };

    @DefaultCatch(defaultErrorHandler)
    static async deactivateTechniqueSet(req: Request, res: Response, next:NextFunction) {
        console.log("Update TechniqueSet Set", req.body);
        const repository: Repository<TechniqueSet> =  await getRepository('TechniqueSet');

        const dbtechniqueSet = await repository.findOneOrFail(req.body.id);
        dbtechniqueSet.isActive = false;

        const techniqueResult = await repository.save(dbtechniqueSet);
        res.json(techniqueResult);
    };
}











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
