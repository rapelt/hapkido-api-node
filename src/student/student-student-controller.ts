import {NextFunction, Request, Response} from "express";
import {getConnection, getRepository, Repository} from "typeorm";

import {Member} from "../entity/member";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {AdminStudentClientModel} from "./admin-student-client.model";
import {ClassType} from "../entity/class-type";
import {UnwatchedTechniques} from "../entity/unwatched-techniques";
import {FavouriteTechniques} from "../entity/favourite-techniques";
import {StudentStudentClientModel} from "./student-student-client.model";
import {Class} from "../entity/class";

export default class StudentStudentController {

    @DefaultCatch(defaultErrorHandler)
    static async getStudent(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const classRepo: Repository<Class> =  await getRepository('Class');

        const student = await repository.findOneOrFail(hbId);
        const classIds = await student.attendance;

        const ids = classIds.map((aclass) => {
            return aclass.class_id;
        });

        const classes = await classRepo.findByIds(ids);

        const clientStudent = new StudentStudentClientModel().dbToClient(student, classes);

        res.json(clientStudent);


    };

    @DefaultCatch(defaultErrorHandler)
    static async updateStudent(req: Request, res: Response, next:NextFunction) {
    };

    @DefaultCatch(defaultErrorHandler)
    static async getStudentEmail(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const student = await repository.findOneOrFail(hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(student);
        res.json(clientStudent.email);
    };

    @DefaultCatch(defaultErrorHandler)
    static async addUnwatchedTechnique(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var techniqueId = req.body.techniqueId;
        const unwatchedRepo: Repository<UnwatchedTechniques> =  await getRepository('UnwatchedTechniques');

        const unwatchedTechnique = new UnwatchedTechniques();
        unwatchedTechnique.hb_id = hbId;
        unwatchedTechnique.t_id = techniqueId;
        await unwatchedRepo.insert(unwatchedTechnique);

        res.json({ studentId: hbId, techniqueId: techniqueId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeUnwatchedTechnique(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var techniqueId = req.body.techniqueId;
        const unwatchedRepo: Repository<UnwatchedTechniques> =  await getRepository('UnwatchedTechniques');

        const unwatchedTechnique = await unwatchedRepo.findOneOrFail({ hb_id: hbId, t_id: techniqueId});
        await unwatchedRepo.remove(unwatchedTechnique);

        res.json({ studentId: hbId, techniqueId: techniqueId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async addFavourite(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var techniqueId = req.body.techniqueId;
        const favouriteRepo: Repository<FavouriteTechniques> =  await getRepository('FavouriteTechniques');

        const unwatchedTechnique = new UnwatchedTechniques();
        unwatchedTechnique.hb_id = hbId;
        unwatchedTechnique.t_id = techniqueId;
        await favouriteRepo.insert(unwatchedTechnique);

        res.json({ studentId: hbId, techniqueId: techniqueId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeFavourite(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var techniqueId = req.body.techniqueId;
        const favouriteRepo: Repository<FavouriteTechniques> =  await getRepository('FavouriteTechniques');

        const favouriteTechnique = await favouriteRepo.findOneOrFail({ hb_id: hbId, t_id: techniqueId});
        await favouriteRepo.remove(favouriteTechnique);

        res.json({ studentId: hbId, techniqueId: techniqueId});
    }
}
