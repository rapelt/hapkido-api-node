import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {Tag} from "../entity/tag";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';

export default class TagController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllTags(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Tag> =  await getRepository('Tag');
        const tags = await repository.find();
        res.json(tags);
    };

    @DefaultCatch(defaultErrorHandler)
    static async addNewTags(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Tag> =  await getRepository('Tag');
        const newTag = new Tag()
        newTag.name = req.body.name;
        const tags = await repository.insert(newTag);
        res.json(tags.generatedMaps);
    };
}



