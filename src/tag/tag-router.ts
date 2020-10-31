import TagController from "./tag-controller";

var express = require('express');
var TokenVerification = require('../cognito/token-verification');

var router = express.Router();

router.post('/create', TokenVerification.checkAuth, TagController.addNewTags);
router.get('/all', TokenVerification.checkAuth, TagController.getAllTags);

module.exports = router;
