var express = require('express');
var AuthController = require('./controllers/auth-controller');
var StudentController = require('./controllers/student-controller');


var router = express.Router();

router.route('/signup').post(AuthController.signup);


//router.route('/createNewStudent').post(StudentController.createNewStudent);
//router.route('/:id/update').post(StudentController.updateStudent);
//router.route('/:id/delete').post(StudentController.deleteStudent);
router.route('/student/all').get(StudentController.getAllStudents);
//router.route('/student/:id').get(StudentController.getStudent);

module.exports = router;