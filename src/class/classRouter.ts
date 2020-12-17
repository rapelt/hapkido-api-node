var express = require('express');
var TokenVerification = require('../cognito/token-verification');
import ClassController from "./class-controller";
var router = express.Router();

router.post('/create', TokenVerification.checkAuth, ClassController.createClasses);
router.get('/all', TokenVerification.checkAuth, ClassController.getAllClasses);
router.post('/delete/:id', TokenVerification.checkAuth, ClassController.deleteClass);
router.post('/addtoclass/:id', ClassController.addToClass);
router.post('/removefromclass/:id', ClassController.removeFromClass);
router.post('/makeclassagrading/:id', TokenVerification.checkAuth, ClassController.makeClassAGrading);
router.get('/getnextclasses', ClassController.getNextClasses);



/*
router.get('/todaysclasses', ClassController.getTodaysClasses);
router.post('/getclassesbetweendates', ClassController.getClassesBetweenDates);
*/

module.exports = router;
