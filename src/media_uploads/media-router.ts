import MediaController from "./media-controller";
var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();

router.post('/create', TokenVerification.checkAuth, MediaController.createMedia);
router.post('/upload', TokenVerification.checkAuth, MediaController.uploadMedia);
router.post('/update/:id', TokenVerification.checkAuth, MediaController.updateMedia);
router.get('/all', TokenVerification.checkAuth, MediaController.getAllMedias);
router.get('/:id', TokenVerification.checkAuth, MediaController.getMedia);

module.exports = router;
