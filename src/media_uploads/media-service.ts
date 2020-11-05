import {EnvironmentCredentials} from "aws-sdk";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";

var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});

function uploadVideo(file: any, folder: string, filename: string, v_type: string): ManagedUpload {
    aws.config.accessKeyId = process.env.AWS_KEY;
    aws.config.secretAccessKey = process.env.AWS_SECRET;

    const bucket = new aws.S3({
        params: { Bucket: 'hapkido-uploaded-videos' },
    });

    const params = {
        Key:
            'inputs/' + folder +
            filename.replace(/\s/g, '-') +
            '.' +
            v_type.split('/')[1],
        Body: file,
    };

    console.log(params);

     return bucket.upload(params, null, (err: any, res: any) => {
            // console.log('error', err);
            // console.log('response', res);
        });

        // var request =  bucket.putObject(params).toPromise();
};

function uploadPhoto(file: any, folder: string, filename: string, v_type: string): ManagedUpload {
    aws.config.accessKeyId = process.env.AWS_KEY;
    aws.config.secretAccessKey = process.env.AWS_SECRET;

    const bucket = new aws.S3({
        params: { Bucket: 'hapkido-convert-videos' },
    });

    const params = {
        Key:
            folder +
            filename.replace(/\s/g, '-') +
            '.' +
            v_type.split('/')[1],
        Body: file,
    };

    console.log(params);

    return bucket.upload(params, null, (err: any, res: any) => {
        // console.log('error', err);
        // console.log('response', res);
    });

    // var request =  bucket.putObject(params).toPromise();
};

function uploadDocument(file: any, folder: string, filename: string, v_type: string): ManagedUpload {
    aws.config.accessKeyId = process.env.AWS_KEY;
    aws.config.secretAccessKey = process.env.AWS_SECRET;

    const bucket = new aws.S3({
        params: { Bucket: 'hapkido-convert-videos' },
    });

    const params = {
        Key:
            folder +
            filename.replace(/\s/g, '-') +
            '.' +
            v_type.split('/')[1],
        Body: file,
    };

    console.log(params);

    return bucket.upload(params, null, (err: any, res: any) => {
        // console.log('error', err);
        // console.log('response', res);
    });

    // var request =  bucket.putObject(params).toPromise();
};

module.exports = {
    uploadVideo: uploadVideo,
    uploadPhoto: uploadPhoto,
    uploadDocument: uploadDocument,

};
