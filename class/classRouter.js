var express = require('express');
var ClassController = require('./class-controller');

var router = express.Router();

router.post('/create', ClassController.createNewClasses);
router.get('/all', ClassController.getAllClasses);
/*router.post('/update/:id', ClassController.updateStudent);
router.post('/delete/:id', ClassController.deleteStudent);
router.get('/:id', ClassController.getStudent);*/

module.exports = router;