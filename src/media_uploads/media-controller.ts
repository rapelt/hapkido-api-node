import {Media} from "../entity/media";

var service = require('./media-service');
var ioConnection = require('../io/io');
import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {Technique} from "../entity/technique";
import {MediaClientModel} from "./media-client.model";
import {Tag} from "../entity/tag";

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
        media.tags = await tagRepository.findByIds(mediaToUpdate.tags);
        const savedMedia = await repository.save(media);
        console.log(savedMedia);
        const clientMedia = new MediaClientModel().dbToClient(savedMedia);

        res.json(clientMedia);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getMedia(req: Request, res: Response, next:NextFunction) {
        res.json({});
    };

    @DefaultCatch(defaultErrorHandler)
    static async uploadMedia(req: any, res: Response, next:NextFunction) {
        console.log('Upload Media');
        const file = req.files[0];
        const mime = file.mimetype.split('/')[1];
        const mediaType = MediaController.getMediaType(mime);
        const baseUrl = 'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/';

        if(mediaType === 'none'){
            res.status(422).send({error: 'Unsupported Media Type'});
            return;
        }

        const split = file.originalname.split('#');
        const techniqueSetId = Number.parseInt(split[0]);
        const techniqueId = Number.parseInt(split[1]);
        const filename = split[2];
        const folderPath = `${techniqueSetId}/${techniqueId}/${mediaType}/`

        const media = new MediaClientModel().clientToNewDB(filename, mime, folderPath, file.size)

        if(mediaType === 'videos'){
            media.url = baseUrl + folderPath + filename + '/Default/';
        }

        if(mediaType === 'photos' || mediaType === 'documents'){
            media.url = baseUrl + folderPath + filename + '.' + mime;
        }

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

        var io = ioConnection.getIo();
        io.emit('posts', {'message': 'I am uploading some media'});

        if(mediaType === 'photos'){
            const request = service.uploadPhoto(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res, techniqueId);
        }

        if(mediaType === 'videos'){
            const request = service.uploadVideo(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res, techniqueId);
        }

        if(mediaType === 'documents'){
            const request = service.uploadDocument(file.buffer, folderPath, filename, file.mimetype);
            await MediaController.uploader(request, newMedia, res, techniqueId);
        }

        if(mediaType === 'none'){
            await MediaController.updateDb(newMedia, 'Error');
            res.status(422).send({error: 'Unsupported Media Type'});
            return;
        }
    };

    static getMediaType(mimeType: string){
        let filetype ;
        switch (mimeType) {
            case 'jpg':
            case 'gif':
            case 'jpeg':
            case 'png':
            case 'pjpeg':
                filetype = 'photos'
                break;
            case 'avi':
            case 'mpeg':
            case 'mp4':
                filetype = 'videos'
                break;
            case 'pdf':
            case 'msword':
            case 'doc':
                filetype =  'documents'
                break;
            default:
                filetype =  'none'
                break;
        }

        return filetype;
    }

    static async uploader(request:any, newMedia: Media, res: Response, techniqueId: number) {
        request.on('httpUploadProgress', async function (progress: any) {
            // console.log( "Key: " + progress.key, "Upload Progress " + progress.loaded + " of " + progress.total + " bytes");
            var io = ioConnection.getIo();

            io.emit('uploadProgress', {
                message: "Key: " + progress.key + " - " + progress.loaded + " of " + progress.total + " bytes",
                mediaId: newMedia.id,
                techniqueId: techniqueId,
                progress: ((progress.loaded / progress.total) * 100)
            });

            if(progress.loaded === progress.total){
                const updatedb = await MediaController.updateDb(newMedia, 'Uploaded');
                res.json(updatedb);
                return;
            } else {
                await MediaController.updateDb(newMedia, (progress.loaded / progress.total) * 100 + '%');
            }
        });
    }

    static async updateDb(newMedia: Media, value: string){
        const mediaRepo: Repository<Media> =  await getRepository('Media');
        await mediaRepo.update({id: newMedia.id}, {uploadStatus: value});
        return await mediaRepo.findOneOrFail(newMedia.id);
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
