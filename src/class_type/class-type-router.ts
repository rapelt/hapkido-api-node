import ClassTypeController from "./class-type-controller";
var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var router = express.Router();

router.get('/all', TokenVerification.checkAuth, ClassTypeController.getAllClassTypes);
router.post('/create', TokenVerification.checkAuth, ClassTypeController.createClassType);


module.exports = router;
