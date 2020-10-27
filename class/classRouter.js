var express = require('express');
var ClassController = require('./class-controller');
var TokenVerification = require('../cognito/token-verification');


var router = express.Router();

router.get('/releaseAllConnection', ClassController.releaseAllConnections);


router.post('/create', TokenVerification.checkAuth, ClassController.createClasses);
router.get('/all', TokenVerification.checkAuth, ClassController.getAllClasses);
router.post('/delete/:id', TokenVerification.checkAuth, ClassController.deleteClass);
router.post('/addtoclass/:id', ClassController.addToClass);
router.post('/removefromclass/:id', ClassController.removeFromClass);
router.post('/makeclassagrading/:id', TokenVerification.checkAuth, ClassController.makeClassAGrading);
router.post('/getnextclasses', ClassController.getNextClasses);
router.post('/getclassesbetweendates', ClassController.getClassesBetweenDates);


/*
router.get('/todaysclasses', ClassController.getTodaysClasses);
*/

module.exports = router;
