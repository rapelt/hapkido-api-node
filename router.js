var express = require('express');
//var AuthController = require('./controllers/auth-controller');
var StudentController = require('./student/student-controller');

var router = express.Router();

/*router.post('/signup', AuthController.signup);
//students
router.post('/student/add', StudentController.createNewStudent);
router.post('/student/:id/delete', StudentController.deleteStudent);
router.get('/all', StudentController.getAllStudents);*/
router.get('/:id', function(req, res, next){
    console.log("req BLARG", req);
    res.send({"Blarg": "Blarg"});
});

//router.get('/:id', StudentController.getStudent);

module.exports = router;