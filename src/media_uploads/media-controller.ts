import {Media} from "../entity/media";

var service = require('./media-service');
import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {Technique} from "../entity/technique";
import {MediaClientModel} from "./media-client.model";
import {Tag} from "../entity/tag";
import {measure} from "../common/performance.decorator";

export default class MediaController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllMedias(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Media> =  await getRepository('Media');
        const media = await repository.find();
        res.json(media);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createMedia(req: Request, res: Response, next:NextFunction) {
        console.log('Create media', req.body);
        const mediaToUpdate: MediaClientModel = req.body;
        const repository: Repository<Media> =  await getRepository('Media');
        const media = await repository.findOneOrFail({file_name: mediaToUpdate.file_name});

        media.original_file_name = mediaToUpdate.original_file_name;
        const savedMedia = await repository.update({id: media.id}, {
                original_file_name: mediaToUpdate.original_file_name,
            });
        const clientMedia = new MediaClientModel().dbToClient(media);

        res.json(clientMedia);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateMedia(req: Request, res: Response, next:NextFunction) {
        console.log('Update media', req.body);
        const mediaToUpdate: MediaClientModel = req.body;
        const repository: Repository<Media> =  await getRepository('Media');
        const media = await repository.findOneOrFail({id: mediaToUpdate.id});
        const tagRepository: Repository<Tag> =  await getRepository('Tag');

        media.original_file_name = mediaToUpdate.original_file_name;
        media.publishedStatus = mediaToUpdate.publishedStatus;
        media.uploadStatus = mediaToUpdate.uploadStatus;
        media.tags = await tagRepository.findByIds(mediaToUpdate.tags);
        const savedMedia = await repository.save(media);
        console.log(savedMedia);
        const clientMedia = new MediaClientModel().dbToClient(savedMedia);

        res.json(clientMedia);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateViews(req: Request, res: Response, next:NextFunction) {
        console.log('Update media', req.body);
        var mediaId = req.params.id;
        const repository: Repository<Media> =  await getRepository('Media');
        const media = await repository.findOneOrFail({id: mediaId});

        media.views = media.views + 1;

        const savedMedia = await repository.save(media);
        const clientMedia = new MediaClientModel().dbToClient(savedMedia);

        res.json(clientMedia);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getMedia(req: Request, res: Response, next:NextFunction) {
        res.json({});
    };

    @DefaultCatch(defaultErrorHandler)
    @measure
    static async authenticateUploadMedia(req: Request, res: Response, next:NextFunction) {
        console.log(req.body);
        const mediaData: Media = req.body.media;

        const techniqueRepo: Repository<Technique> =  await getRepository('Technique');
        const mediaRepo: Repository<Media> =  await getRepository('Media');

        const split = mediaData.folder.split('/');
        const techniqueId = Number.parseInt(split[1]);

        const technique = await techniqueRepo.findOneOrFail({ id: techniqueId});
        const newMedia = await mediaRepo.save(mediaData);
        if(technique.media === undefined) {
            technique.media = [newMedia];
        } else {
            technique.media.push(newMedia);
        }
        await techniqueRepo.save(technique);
        newMedia.tags = [];

        const result = await service.s3BucketUploadAuth(req.body.filename, req.body.filetype, req.body.folder, req.body.bucket);
        console.log('Upload Authentication Results', req.body.filename, result);
        res.json({result: result, media: newMedia});
    };
}
