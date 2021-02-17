import QuestionController from "./question-controller";

var express = require('express');
var TokenVerification = require('../cognito/token-verification');


var router = express.Router();

router.post('/add', TokenVerification.checkAuth, QuestionController.addQuestion);
router.post('/like/:id', TokenVerification.checkAuth, QuestionController.likeQuestion);
router.post('/remove-like/:id', TokenVerification.checkAuth, QuestionController.removeLikedQuestion);


module.exports = router;
