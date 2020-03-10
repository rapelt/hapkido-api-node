var shortid = require('shortid');
var authService = require('../cognito/auth-service');

exports.createTestUser = function (req, res) {

    var id = shortid.generate();
    var email = 'rebekahapelt+' + id + '@gmail.com';

    //Not for Prod

    authService.createTestUser('testAdmin', email).then(() => {
        res.json('testAdmin', email, 'test01');
    }).catch((err) => {
        return res.status(422).send("Something went wrong", err);
    });
};

exports.deleteTestUser = function (req, res, next) {
    //Not for Prod

    authService.deleteTestUser('testAdmin').then(() => {
        res.json('testAdmin');
    }).catch((err) => {
        return res.status(422).send("Something went wrong", err);
    });
};

