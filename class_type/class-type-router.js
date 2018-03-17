var express = require('express');
var ClassTypeController = require('./class-type-controller');

var router = express.Router();

router.get('/all', ClassTypeController.getAllClassTypes);
router.post('/create', ClassTypeController.createClassType);


module.exports = router;