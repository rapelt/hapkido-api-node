import {PhotoDataModel, VideoDataModel} from "./media-model";
import {EnvironmentCredentials} from "aws-sdk";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";

var connection = require('../db/rdsconnect');

var photoColumns = "id, file_name, file_type, original_file_name, folder, size, url";
var videoColumns = "id, file_name, file_type, original_file_name, folder, url";

var technique_photo = "t_id, p_id";
var technique_video = "t_id, v_id";

var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});

function createVideo(video: VideoDataModel) {

    var query = 'INSERT INTO video (' + videoColumns +  ') VALUES(?, ?, ?, ?, ?, ?);';
    return runQuery(query, [0, video.file_name , video.file_type, video.original_file_name, video.folder, video.url]);
};

function createPhoto(photo: PhotoDataModel): Promise<any> {
    var query = 'INSERT INTO photo (' + photoColumns +  ') VALUES(?, ?, ?, ?, ?, ?);';
    return runQuery(query, [0, photo.file_name , photo.file_type, photo.original_file_name, photo.folder, photo.size ,photo.url]);
};

function updateVideo(video: VideoDataModel) {
    var query = `update video set 
            file_name = ?,
            file_type = ?,
            original_file_name = ?,
            folder = ?,
            url = ?
            where id = ?;`;

    return runQuery(query, [video.file_name , video.file_type, video.original_file_name, video.folder, video.url, video.id]);
};

function updatePhoto(photo: PhotoDataModel): Promise<any> {
    var query = `update photo set 
            file_name = ?,
            file_type = ?,
            original_file_name = ?,
            folder = ?,
            size = ?,
            url = ?
            where id = ?;`;

    return runQuery(query, [photo.file_name , photo.file_type, photo.original_file_name, photo.folder, photo.size, photo.url, photo.id]);
};

function addVideoToTechnique(t_id: any, v_id: any): Promise<any> {
    var query = 'INSERT INTO technique_video (t_id, v_id) VALUES(?, ?);';
    return runQuery(query, [t_id, v_id]);
};

function addPhotoToTechnique(t_id: any, p_id: any): Promise<any> {
    var query = 'INSERT INTO technique_photo (t_id, p_id) VALUES(?, ?);';
    return runQuery(query, [t_id, p_id]);
};

function getPhoto(p_id: any): Promise<any> {
    var query = 'select * from photo where id = ?;';
    return runQuery(query, [p_id]);
};

function getVideo(v_id: any): Promise<any> {
    var query = 'select * from video where id = ?;';
    return runQuery(query, [v_id]);
};

function getTechniquePhotoIds(t_id: any): Promise<any> {
    var query = 'select * from technique_photo where t_id = ?;';
    return runQuery(query, [t_id]);
};

function getTechniqueVideoIds(t_id: any): Promise<any> {
    var query = 'select * from technique_video where t_id = ?;';
    return runQuery(query, [t_id]);
};

function getAllPhotos(t_id: any): Promise<any> {
    var query = 'select * from photo;';
    return runQuery(query, []);
};

function getAllVideos(t_id: any): Promise<any> {
    var query = 'select * from video;';
    return runQuery(query, []);
};

function uploadPhoto(photo: any): Promise<any> {
    var query = 'select * from photo;';
    return runQuery(query, []);
};

function uploadVideo(file: any, t_name: string, v_type: string): ManagedUpload {
    //TODO Store keys
    aws.config.accessKeyId = process.env.AWS_KEY;
    aws.config.secretAccessKey = process.env.AWS_SECRET;

    const bucket = new aws.S3({
        params: { Bucket: 'hapkido-uploaded-videos' },
    });

    const params = {
        Key:
            'inputs/' +
            t_name.replace(/\s/g, '-') +
            '.' +
            v_type.split('/')[1],
        Body: file,
    };

    // console.log(params);



     return bucket.upload(params, null, (err: any, res: any) => {
            // console.log('error', err);
            // console.log('response', res);
        });



        // var request =  bucket.putObject(params).toPromise();



};


module.exports = {
    createPhoto: createPhoto,
    createVideo: createVideo,
    updatePhoto: updatePhoto,
    updateVideo: updateVideo,
    addVideoToTechnique: addVideoToTechnique,
    addPhotoToTechnique: addPhotoToTechnique,
    getPhoto: getPhoto,
    getVideo: getVideo,
    getTechniqueVideoIds: getTechniqueVideoIds,
    getTechniquePhotoIds: getTechniquePhotoIds,
    uploadVideo: uploadVideo,
    // uploadPhoto: uploadPhoto,
    getAllVideos: getAllVideos,
    getAllPhotos: getAllPhotos
};

function runQuery(query: string, values: any) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {

            pool.query(query, values, function (error: any, results: any, fields: any) {

                if (error) {
                    reject(error);
                }

                if(results){
                    resolve(results);
                }

                resolve(results);
            });
        });
};
