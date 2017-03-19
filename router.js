var express = require('express');
var AuthController = require('./controllers/auth-controller');
var StudentController = require('./student/student-controller');


var router = express.Router();

router.route('/signup').post(AuthController.signup);

//students
router.route('/student/add').post(StudentController.createNewStudent);
router.route('/student/:id/delete').post(StudentController.deleteStudent);
router.route('/student/all').get(StudentController.getAllStudents);
router.route('/student/:id').get(StudentController.getStudent);

module.exports = router;