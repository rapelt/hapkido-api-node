var service = require('./media-service');
var ioConnection = require('../io/io');

exports.createMedia = function (req: any, res: any, next: any) {
    console.log("Create Media");
    res.json({});
    //upload media
    //save media to db
    //return id
};

exports.uploadMedia = () => {
    return function(req: any, res: any, next: any) {
        console.log('send message');
        var io = ioConnection.getIo();

        io.emit('posts', {'message': 'I am a message'});
        io.emit('posts', {'message': 'Event 1'});
        io.emit('posts', {'message': 'Event 2'});
        io.emit('posts', {'message': 'Event 3'});

        console.log("Upload Media");
        console.log('req', req.files);
        const file = req.files[0];


        res.json({});

    // const request = service.uploadMedia(file.buffer, file.originalname, file.mimetype);
    //
    // request.on('httpUploadProgress', function (progress: any) {
    //     console.log( "Key: " + progress.key, "Upload Progress " + progress.loaded + " of " + progress.total + " bytes");
    //     io.emit("posts", {message: "Key: " + progress.key + " - " + progress.loaded + " of " + progress.total + " bytes"});
    //
    //
    //     if(progress.loaded === progress.total){
    //         res.json({});
    //     }
    // });

    // request.


    //service.uploadMedia()

    //upload media
    //save media to db
    //return id
}};

exports.updateMedia = function (req: any, res: any, next: any) {
    console.log("Update Media");
    res.json({});
};

exports.getAllMedias = function (req: any, res: any, next: any) {
    console.log("Get all medias");
    res.json({});
};

exports.getMedia = function (req: any, res: any, next: any) {
    console.log("Get Media");
    res.json({});

};
