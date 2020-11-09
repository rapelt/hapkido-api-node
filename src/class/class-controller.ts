import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {Class} from "../entity/class";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {ClientClass} from "./client-class.model";
import {MemberClass} from "../entity/member-class";
import {ClassType} from "../entity/class-type";
import {classCreaterVariables} from "./class.service";
import {measure} from "../common/performance.decorator";


export default class ClassController {

    @DefaultCatch(defaultErrorHandler)
    @measure
    static async getAllClasses(req: Request, res: Response, next:NextFunction) {
        console.log("get all classes");
        const repository: Repository<Class> = await getRepository('Class');
        const classes: Array<Class> = await repository.find();
        const clientClasses = classes.map((aclass: Class) => {
            return new ClientClass().dbToClient(aclass);
        })

        res.json(clientClasses);
    };

    @DefaultCatch(defaultErrorHandler)
    static async deleteClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        const repository: Repository<Class> =  await getRepository('Class');
        await repository.softDelete(classId);
        return res.status(200).send({classid: classId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async addToClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        var hbId = req.body.studentId;

        const memberClassRepo: Repository<MemberClass> =  await getRepository('MemberClass');
        await memberClassRepo.insert({class_id: classId, hb_id: hbId})

        return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId, studentId: hbId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeFromClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        var hbId = req.body.studentId;

        const memberClassRepo: Repository<MemberClass> =  await getRepository('MemberClass');
        await memberClassRepo.remove({class_id: classId, hb_id: hbId})

        return res.status(200).send({message: "Student " + hbId + " has been removed to class " + classId, studentId: hbId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async makeClassAGrading(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        const repository: Repository<Class> =  await getRepository('Class');
        await repository.update({ classId: classId }, { isGrading: true });
        return res.status(200).send({message: "Class " + classId + " has been made a grading "});
    };

    @DefaultCatch(defaultErrorHandler)
     static async createClasses(req: Request, res: Response, next:NextFunction) {

        let classCreatorVariables = new classCreaterVariables();
        var classes = req.body.classes;

        if (classes) {
            await ClassController.createClassesLoop(classes, res, classCreatorVariables);
        } else {
            return res.status(422).send({error: "no classes found"});
        }
    };

    static async createClassesLoop(classes: ClientClass[], res: any, ccv: classCreaterVariables){
        console.log(ccv.classesindex);
        if(ccv.classesindex < classes.length) {
            try {
                const created_class = await ClassController.classesCreation(classes[ccv.classesindex]);
                classes[ccv.classesindex].classId = created_class;
                ccv.classesCreated.push(classes[ccv.classesindex]);
                ccv.classesindex++;
                await ClassController.createClassesLoop(classes, res, ccv);
            } catch (err){
                ccv.classesNotCreated.push(classes[ccv.classesindex]);
                ccv.errors.push(err);
                ccv.classesindex++;
                await ClassController.createClassesLoop(classes, res, ccv);
            }
        } else {
            res.status(200).send({errors: ccv.errors, classes: ccv.classesCreated, classesNotCreated: ccv.classesNotCreated});
        }
    }


    static async classesCreation(aclass: ClientClass): Promise<number> {
        try {
            const repository: Repository<Class> =  await getRepository('Class');
            const classTypeRepo: Repository<ClassType> =  await getRepository('ClassType');
            const classType = await classTypeRepo.findOneOrFail({classType: aclass.classType});

            const dbClass = new ClientClass().clientToDB(aclass, classType);

            const newClass = await repository.insert(dbClass);

            return newClass.raw.insertId;

        } catch (err) {
            throw new Error(err);
        }
    };

}
