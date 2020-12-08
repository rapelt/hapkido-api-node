import MediaController from "./media-controller";
var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();

router.post('/create', TokenVerification.checkAuth, MediaController.createMedia);
router.post('/authenticateUploadMedia', TokenVerification.checkAuth, MediaController.authenticateUploadMedia);
router.post('/update/:id', TokenVerification.checkAuth, MediaController.updateMedia);
router.get('/all', TokenVerification.checkAuth, MediaController.getAllMedias);
router.post('/update-views/:id', TokenVerification.checkAuth, MediaController.updateViews);
router.get('/:id', TokenVerification.checkAuth, MediaController.getMedia);


module.exports = router;
