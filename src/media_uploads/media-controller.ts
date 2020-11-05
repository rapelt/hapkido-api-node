import {Media} from "../entity/media";

var service = require('./media-service');
var ioConnection = require('../io/io');
import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {MediaClientModel} from "./media-client.model";
import {Technique} from "../entity/technique";

export default class MediaController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllMedias(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Media> =  await getRepository('Media');
        const media = await repository.find();
        res.json(media);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createMedia(req: Request, res: Response, next:NextFunction) {
        res.json({});
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateMedia(req: Request, res: Response, next:NextFunction) {
        res.json({});
    };

    @DefaultCatch(defaultErrorHandler)
    static async getMedia(req: Request, res: Response, next:NextFunction) {
        res.json({});
    };

    @DefaultCatch(defaultErrorHandler)
    static async uploadMedia(req: any, res: Response, next:NextFunction) {
        const file = req.files[0];
        console.log(file);
        const mediaType = MediaController.getMediaType(file.mimetype);

        if(mediaType === 'none'){
            res.status(422).send({error: 'Unsupported Media Type'});
        }

        const split = file.originalname.split('#');
        const techniqueSetId = Number.parseInt(split[0]);
        const techniqueId = Number.parseInt(split[1]);
        const filename = split[2];
        const folderPath = `${techniqueSetId}/${techniqueId}/${mediaType}/`

        const media = new MediaClientModel().clientToNewDB(filename, file.mimeType, folderPath, file.size)

        const techniqueRepo: Repository<Technique> =  await getRepository('Technique');
        const mediaRepo: Repository<Media> =  await getRepository('Media');

        const technique = await techniqueRepo.findOneOrFail({ id: techniqueId});
        const newMedia = await mediaRepo.save(media);
        if(technique.media === undefined) {
            technique.media = [newMedia];
        } else {
            technique.media.push(newMedia);
        }
        await techniqueRepo.save(technique);
        console.log(newMedia);

        var io = ioConnection.getIo();
        io.emit('posts', {'message': 'I am uploading some media'});
        console.log("Upload Media");
        console.log('req', req.files);

        if(mediaType === 'photos'){
            const request = service.uploadPhoto(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res);
        }

        if(mediaType === 'videos'){
            const request = service.uploadVideo(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res);
        }

        if(mediaType === 'documents'){
            const request = service.uploadDocument(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res);
        }
    };

    static getMediaType(mimeType: string){
        console.log(mimeType);
        switch (mimeType.split('/')[1]) {
            case 'jpg':
            case 'gif':
            case 'jpeg':
            case 'png':
            case 'pjpeg':
                return 'photos'
            case 'avi':
            case 'mpeg':
            case 'mp4':
                return 'videos'
            case 'pdf':
            case 'msword':
            case 'doc':
                return 'documents'
            default:
                return 'none'
        }
    }

    static async uploader(request:any, newMedia: Media, res: Response) {
        request.on('httpUploadProgress', async function (progress: any) {
            console.log( "Key: " + progress.key, "Upload Progress " + progress.loaded + " of " + progress.total + " bytes");
            var io = ioConnection.getIo();

            io.emit('posts', {message: "Key: " + progress.key + " - " + progress.loaded + " of " + progress.total + " bytes", mediaId: newMedia.id});

            if(progress.loaded === progress.total){
                await MediaController.updateDb(newMedia, 'Uploaded');
                console.log('Done');
                res.json({});
            } else {
                await MediaController.updateDb(newMedia, (progress.loaded / progress.total) * 100 + '%');
            }
        });
    }

    static async updateDb(newMedia: Media, value: string){
        const mediaRepo: Repository<Media> =  await getRepository('Media');
        newMedia.uploadStatus = value;
        console.log('updating');
        await mediaRepo.save(newMedia);
    }
}




// exports.uploadMedia = () => {
//     return function(req: any, res: any, next: any) {
//         console.log('send message');
//         var io = ioConnection.getIo();
//         console.log(req.body);
//
//         io.emit('posts', {'message': 'I am uploading some media'});
//         // io.emit('posts', {'message': 'Event 1'});
//         // io.emit('posts', {'message': 'Event 2'});
//         // io.emit('posts', {'message': 'Event 3'});
//
//         console.log("Upload Media");
//         console.log('req', req.files);
//         const file = req.files[0];
//
//
//         res.json({});
//
//     // const request = service.uploadMedia(file.buffer, file.originalname, file.mimetype);
//     //
//     // request.on('httpUploadProgress', function (progress: any) {
//     //     console.log( "Key: " + progress.key, "Upload Progress " + progress.loaded + " of " + progress.total + " bytes");
//     //     io.emit("posts", {message: "Key: " + progress.key + " - " + progress.loaded + " of " + progress.total + " bytes"});
//     //
//     //
//     //     if(progress.loaded === progress.total){
//     //         res.json({});
//     //     }
//     // });
//
//     // request.
//
//
//     //service.uploadMedia()
//
//     //upload media
//     //save media to db
//     //return id
// }};
