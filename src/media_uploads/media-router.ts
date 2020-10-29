

var express = require('express');
var MediaController = require('./media-controller');
var TokenVerification = require('../cognito/token-verification');

var router = express.Router();

router.post('/video/create', TokenVerification.checkAuth, MediaController.createVideo);
router.post('/photo/create', TokenVerification.checkAuth, MediaController.createPhoto);

router.post('/video/upload', TokenVerification.checkAuth, MediaController.uploadVideo());
router.post('/photo/upload', TokenVerification.checkAuth, MediaController.uploadPhoto);

router.post('/video/update/:id', TokenVerification.checkAuth, MediaController.updateVideo);
router.post('/photo/update/:id', TokenVerification.checkAuth, MediaController.updatePhoto);

router.get('/video/all', TokenVerification.checkAuth, MediaController.getAllVideos);
router.get('/photo/all', TokenVerification.checkAuth, MediaController.getAllPhotos);

router.get('/video/:id', TokenVerification.checkAuth, MediaController.getVideo);
router.get('/photo/:id', TokenVerification.checkAuth, MediaController.getPhoto);

module.exports = router;



//     addVideoToTechnique: addVideoToTechnique,
//     addPhotoToTechnique: addPhotoToTechnique,
//     getTechniqueVideoIds: getTechniqueVideoIds,
//     getTechniquePhotoIds: getTechniquePhotoIds,
