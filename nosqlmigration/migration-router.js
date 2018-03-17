var express = require('express');
var MigrationController = require('./migration-controller');

var router = express.Router();

/*router.get('/gostudents', MigrationController.migratestudents);
router.get('/goclasses', MigrationController.migrateclasses);
router.get('/gogrades', MigrationController.migrategrades);
router.get('/gostudentgrades', MigrationController.migratestudentgrades);*/

router.get('/', MigrationController.migrategrades, MigrationController.migratestudents, MigrationController.migrateclasses, MigrationController.migratestudentgrades);




module.exports = router;