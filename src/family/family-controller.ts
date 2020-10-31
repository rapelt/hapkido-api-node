import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {Family} from "../entity/family";

export default class FamilyController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllFamiles(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Family> = getRepository('Family');
        const families = await repository.find();
        res.json(families);
    };
}

