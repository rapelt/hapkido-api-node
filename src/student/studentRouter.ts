import StudentController from "./student-controller";
import StudentStudentController from "./student-student-controller";

var express = require('express');
var TokenVerification = require('../cognito/token-verification');
var testUserController = require('../cognito/generate-test-user');


var router = express.Router();


//Admin App
router.post('/create', TokenVerification.checkAuth, StudentController.createNewStudent);
router.get('/all', TokenVerification.checkAuth, StudentController.getAllStudents);
router.post('/update/:id', TokenVerification.checkAuth, StudentController.updateStudent);
router.get('/:id', TokenVerification.checkAuth, StudentController.getStudent);
router.get('/getemail/:id', TokenVerification.checkAuth, StudentController.getStudentEmail);

router.post('/removegrading/:id', TokenVerification.checkAuth, StudentController.removeGrading, StudentController.removeUnwatchedTechniques);
router.post('/addgrading/:id', TokenVerification.checkAuth, StudentController.addGrading, StudentController.addUnwatchedTechniques);


router.post('/updateEmail/:id', TokenVerification.checkAuth, StudentController.updateEmailInCognito, StudentController.updateEmail);

router.post('/addtonewapp/:id', TokenVerification.checkAuth, StudentController.addToNewApp, StudentController.saveHasLogin);
router.post('/deactivatefromapp/:id', TokenVerification.checkAuth, StudentController.deactivateStudentFromCognito, StudentController.saveAppDeactivation);
router.post('/reactivateonapp/:id', TokenVerification.checkAuth, StudentController.reactivateStudentFromCognito, StudentController.saveAppReactivation);

router.post('/deactivate/:id', TokenVerification.checkAuth, StudentController.deactivateStudent);
router.post('/reactivate/:id', TokenVerification.checkAuth, StudentController.reactivateStudent);

router.post('/createtestuser', testUserController.createTestUser);
router.post('/deletetestuser', testUserController.deleteTestUser);



// Student App
router.post('/unwatchedTechnique/add/:id', TokenVerification.checkStudentAuth, StudentStudentController.addUnwatchedTechnique);
router.post('/unwatchedTechnique/remove/:id', TokenVerification.checkStudentAuth, StudentStudentController.removeUnwatchedTechnique);

router.post('/favourite/add/:id', TokenVerification.checkStudentAuth, StudentStudentController.addFavourite);
router.post('/favourite/remove/:id', TokenVerification.checkStudentAuth, StudentStudentController.removeFavourite);

router.get('/sa/:id', TokenVerification.checkStudentAuth, StudentStudentController.getStudent);



module.exports = router;
