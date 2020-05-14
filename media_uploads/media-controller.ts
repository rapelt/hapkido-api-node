var service = require('./media-service');
var mapper = require('./media-mapper');
var ioConnection = require('../io/io');

exports.createVideo = function (req: any, res: any, next: any) {
    console.log("Create Video");

    //upload video
    //save video to db
    //return id
};


exports.createPhoto = function (req: any, res: any, next: any) {
    console.log("Create photo");
};

exports.uploadPhoto = function (req: any, res: any, next: any) {
    console.log("Upload photo");
};

exports.uploadVideo = () => {
    return function(req: any, res: any, next: any) {
        console.log('send message');
    var io = ioConnection.getIo();

    io.emit('posts', {'message': 'I am a message'});

    console.log("Upload Video");
    // console.log('req', req.files);
    const file = req.files[0];
    //
    // io.emit({ id: 'message', message: 'I am emitting an event'});
    // io.emit({ id: 'message', message: 'I am emitting an event 2'});
    // io.emit({ id: 'message', message: 'I am emitting an event 3'});

    // res.json({});

    const request = service.uploadVideo(file.buffer, file.originalname, file.mimetype);

    request.on('httpUploadProgress', function (progress: any) {
        console.log( "Key: " + progress.key, "Upload Progress " + progress.loaded + " of " + progress.total + " bytes");
        io.emit("posts", {message: "Key: " + progress.key + " - " + progress.loaded + " of " + progress.total + " bytes"});


        if(progress.loaded === progress.total){
            res.json({});
        }
    });

    // request.


    //service.uploadVideo()

    //upload video
    //save video to db
    //return id
}};

exports.updateVideo = function (req: any, res: any, next: any) {
    console.log("Update Video");
};

exports.updatePhoto = function (req: any, res: any, next: any) {
    console.log("Update Photo");
};

exports.getAllVideos = function (req: any, res: any, next: any) {
    console.log("Get all videos");
};

exports.getAllPhotos = function (req: any, res: any, next: any) {
    console.log("Get all photos");
};

exports.getVideo = function (req: any, res: any, next: any) {
    console.log("Get Video");
};

exports.getPhoto = function (req: any, res: any, next: any) {
    console.log("Get photo");
};
