import FamilyController from "./family-controller";
var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();

router.get('/all', TokenVerification.checkAuth, FamilyController.getAllFamiles);

module.exports = router;
