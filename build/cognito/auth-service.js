"use strict";
var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});
function createStudentAuth(username, email) {
    return new Promise(function (resolve, reject) {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        cognitoidentityserviceprovider.updateUserPool();
        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
            DesiredDeliveryMediums: [
                'EMAIL'
            ],
            ForceAliasCreation: false,
            TemporaryPassword: 'tempPassword1',
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                }
            ]
        };
        cognitoidentityserviceprovider.adminCreateUser(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                addUserToGroup(username);
                console.log(data);
                resolve();
            }
        });
    });
}
function addUserToGroup(username) {
    var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
    var params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        GroupName: 'student'
    };
    cognitoidentityserviceprovider.adminAddUserToGroup(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
        }
    });
}
function deactivateStudentAuth(username) {
    return new Promise(function (resolve, reject) {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
        };
        cognitoidentityserviceprovider.adminDisableUser(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                console.log(data);
                resolve();
            }
        });
    });
}
function reActivateStudentAuth(username) {
    return new Promise(function (resolve, reject) {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
        };
        cognitoidentityserviceprovider.adminEnableUser(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                console.log(data);
                resolve();
            }
        });
    });
}
function createTestUser(username, email) {
    return new Promise(function (resolve, reject) {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        cognitoidentityserviceprovider.updateUserPool();
        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
            DesiredDeliveryMediums: [
                'EMAIL'
            ],
            ForceAliasCreation: false,
            TemporaryPassword: 'test01',
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                }
            ]
        };
        cognitoidentityserviceprovider.adminCreateUser(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                addTestUserToGroup(username, 'admin');
                console.log(data);
                resolve();
            }
        });
    });
}
function addTestUserToGroup(username, group) {
    var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
    var params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        GroupName: group
    };
    cognitoidentityserviceprovider.adminAddUserToGroup(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
        }
    });
}
function deleteTestUser(username) {
    return new Promise(function (resolve, reject) {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        cognitoidentityserviceprovider.updateUserPool();
        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username
        };
        cognitoidentityserviceprovider.adminDeleteUser(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                console.log(data);
                resolve();
            }
        });
    });
}
function isUserAuthenticated(username, token) {
}
module.exports = {
    createStudentAuth: createStudentAuth,
    deactivateStudentAuth: deactivateStudentAuth,
    reActivateStudentAuth: reActivateStudentAuth,
    createTestUser: createTestUser,
    deleteTestUser: deleteTestUser
};
