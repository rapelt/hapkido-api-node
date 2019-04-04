"use strict";
var express = require('express');
//var AuthController = require('./controllers/auth-controller');
var FamilyController = require('./family-controller');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();
router.get('/all', TokenVerification.checkAuth, FamilyController.getAllFamiles);
module.exports = router;
