var express = require('express');
//var AuthController = require('./controllers/auth-controller');
var StudentController = require('./student-controller');

var router = express.Router();

router.post('/create', StudentController.createNewStudent);
router.get('/all', StudentController.getAllStudents);
router.post('/update/:id', StudentController.updateStudent);
router.post('/delete/:id', StudentController.deleteStudent);
router.get('/:id', StudentController.getStudent);

module.exports = router;