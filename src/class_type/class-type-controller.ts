import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {ClassType} from "../entity/class-type";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';

export default class ClassTypeController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllClassTypes(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<ClassType> = getRepository('ClassType');
        const classTypes = await repository.find();
        res.json(classTypes);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createClassType(req: Request, res: Response, next:NextFunction) {
        var classtypeName = req.body.class_type;
        const repository: Repository<ClassType> = getRepository('ClassType');
        const newClassType = new ClassType()
        newClassType.classType = classtypeName;
        const classTypes = await repository.insert(newClassType);
        res.json(classTypes.generatedMaps);
    };
}
