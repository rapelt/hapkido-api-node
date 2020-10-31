import {PhotoDataModel, VideoDataModel} from "./media-model";
import {EnvironmentCredentials} from "aws-sdk";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";

var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});

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
    uploadVideo: uploadVideo,
    // uploadPhoto: uploadPhoto,
};
