var express = require('express');
//var AuthController = require('./controllers/auth-controller');
var StudentController = require('./student-controller');
var TokenVerification = require('../cognito/token-verification');
var testUserController = require('../cognito/generate-test-user');


var router = express.Router();

router.post('/create', TokenVerification.checkAuth, StudentController.createNewStudent);
router.get('/all', TokenVerification.checkAuth, StudentController.getAllStudents);
router.post('/update/:id', TokenVerification.checkAuth, StudentController.updateStudent);
router.get('/:id', TokenVerification.checkAuth, StudentController.getStudent);
router.get('/getemail/:id', TokenVerification.checkAuth, StudentController.getStudentEmail);

router.post('/removegrading/:id', TokenVerification.checkAuth, StudentController.removeGrading);
router.post('/addgrading/:id', TokenVerification.checkAuth, StudentController.addGrading);

router.post('/addtonewapp/:id', TokenVerification.checkAuth, StudentController.addToNewApp);


router.post('/deactivate/:id', TokenVerification.checkAuth, StudentController.deactivateStudent);
router.post('/reactivate/:id', TokenVerification.checkAuth, StudentController.reactivateStudent);

router.post('/createtestuser', testUserController.createTestUser);
router.post('/deletetestuser', testUserController.deleteTestUser);



module.exports = router;
