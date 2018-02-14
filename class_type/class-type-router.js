var express = require('express');
var ClassTypeController = require('./class-type-controller');

var router = express.Router();

router.get('/all', ClassTypeController.getAllClassTypes);

module.exports = router;