var express = require('express');
var TechniqueController = require('./technique-controller');
var TokenVerification = require('../cognito/token-verification');

var router = express.Router();

router.post('/create', TokenVerification.checkAuth, TechniqueController.createNewTechnique);
router.get('/all', TokenVerification.checkAuth, TechniqueController.getAllTechniques);

router.post('/set/create', TokenVerification.checkAuth, TechniqueController.addNewTechniqueSet);
router.get('/set/all', TokenVerification.checkAuth, TechniqueController.getAllTechniqueSets);

router.post('/update/:id', TokenVerification.checkAuth, TechniqueController.updateTechnique);
router.post('/set/update/:id', TokenVerification.checkAuth, TechniqueController.updateTechniqueSet);
router.post('/set/deactivate/:id', TokenVerification.checkAuth, TechniqueController.deactivateTechniqueSet);



module.exports = router;
