var express = require('express');
var AuthController = require('./controllers/auth-controller');

var router = express.Router();

router.route('/signup').post(AuthController.signup);

module.exports = router;