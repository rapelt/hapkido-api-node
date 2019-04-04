"use strict";
var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('../config/config.dev');
exports.checkAuth = function (req, res, next) {
    if (!config.cognito) {
        console.log("No Cognito");
        next();
        return;
    }
    if (!config.env === 'prod') {
        console.log(config.env);
        next();
    }
    console.log("Using Cognito");
    console.log("New");
    if (req.headers.authorization == null) {
        res.status('401');
        res.send('Unauthorized');
        console.log('Unauthorized');
        return;
    }
    var auth = req.headers.authorization.split('Bearer ')[1];
    var decodedJWT = jwt.decode(auth);
    if (decodedJWT !== null) {
        var expiry = moment(decodedJWT.exp, 'X');
        if (decodedJWT.client_id === process.env.APP_CLIENT && expiry.isAfter(moment())) {
            next();
        }
        else {
            res.status('401');
            res.send();
        }
    }
    else {
        res.status('401');
        res.send();
    }
};
