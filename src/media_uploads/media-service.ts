var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});

async function s3BucketUploadAuth(filename: string, filetype: string, folder: string, bucket: string): Promise<any> {
    aws.config.update({
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: 'ap-southeast-2',
        signatureVersion: 'v4',
    });

    const params = {
        Bucket: folder,
        Key: filename,
        Expires: 40 * 60,
        ContentType: filetype
    };

    const options = {
        signatureVersion: 'v4',
        region: 'ap-southeast-2',
        endpoint: new aws.Endpoint('http://'+ bucket +'.s3.amazonaws.com'),
        useAccelerateEndpoint: false,
        s3ForcePathStyle: true,
    }

    const client = new aws.S3(options);

    const form = await (new Promise((resolve, reject) => {
        client.getSignedUrl('putObject', params, (err: any, data: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    }));
    return {
        form: form
    };
};



module.exports = {
    s3BucketUploadAuth: s3BucketUploadAuth
};
