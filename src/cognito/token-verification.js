var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.checkAuth = function (req, res, next) {
    if(process.env.USE_COGNITO === 'false'){
        console.log("No Cognito");
        next();
        return;
    }

    console.log("Using Cognito");

    if(req.headers.authorization == null){
        console.log('Unauthorized');

        res.status('401');
        res.send('Unauthorized');
        return;
    }

    let auth = req.headers.authorization.split('Bearer ')[1];
    let decodedJWT = jwt.decode(auth);
    if(decodedJWT !== null){
        let expiry = moment(decodedJWT.exp, 'X');
        if(decodedJWT.client_id === process.env.APP_CLIENT && expiry.isAfter(moment())){
            next();
        } else {
            res.status('401');
            res.send();
        }
    } else {
        res.status('401');
        res.send();
    }
};

exports.checkStudentAuth = function (req, res, next) {
    if(process.env.USE_COGNITO === 'false'){
        console.log("No Cognito");
        next();
        return;
    }

    console.log("Using Cognito");

    if(req.headers.authorization == null){
        console.log('Unauthorized');

        res.status('401');
        res.send('Unauthorized');
        return;
    }

    let auth = req.headers.authorization.split('Bearer ')[1];
    let decodedJWT = jwt.decode(auth);
    if(decodedJWT !== null){
        let expiry = moment(decodedJWT.exp, 'X');
        if(decodedJWT.client_id === process.env.APP_CLIENT && expiry.isAfter(moment())){
            next();
        } else {
            res.status('401');
            res.send();
        }
    } else {
        res.status('401');
        res.send();
    }
};
