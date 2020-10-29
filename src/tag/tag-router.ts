var express = require('express');
var tagController = require('./tag-controller');
var TokenVerification = require('../cognito/token-verification');

var router = express.Router();

router.post('/create', TokenVerification.checkAuth, tagController.addNewTags);
router.get('/all', TokenVerification.checkAuth, tagController.getAllTags);

module.exports = router;
