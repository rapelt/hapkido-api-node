import GraphController from "./graph-controller";
var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();

router.get('/all', TokenVerification.checkAuth, GraphController.getAllData);
router.post('/dates', TokenVerification.checkAuth, GraphController.getDataBetweenDates);

module.exports = router;
