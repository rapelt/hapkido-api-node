"use strict";
var express = require('express');
var ClassTypeController = require('./class-type-controller');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();
router.get('/all', TokenVerification.checkAuth, ClassTypeController.getAllClassTypes);
router.post('/create', TokenVerification.checkAuth, ClassTypeController.createClassType);
module.exports = router;
