var express = require('express');
var ClassController = require('./class-controller');

var router = express.Router();

router.post('/create', ClassController.createNewClasses);
router.get('/all', ClassController.getAllClasses);
router.post('/delete/:id', ClassController.deleteClass);
router.post('/addtoclass/:id', ClassController.addToClass);
router.post('/removefromclass/:id', ClassController.removeFromClass);


/*router.post('/update/:id', ClassController.updateStudent);
router.get('/:id', ClassController.getStudent);*/

module.exports = router;