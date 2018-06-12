var aws = require('aws-sdk');
aws.config.update({
    region: 'ap-southeast-2'
});

function createStudentAuth (username, email) {
    return new Promise((resolve, reject) => {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
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
                    Name: 'email', /* required */
                    Value: email
                }
            ]
        };

        cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            } else {
                addUserToGroup(username);
                console.log(data);
                resolve();
            }
        });
    });
}

function addUserToGroup(username) {
    var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

    var params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        GroupName: 'student'
    };

    cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });
}

function deactivateStudentAuth (username) {
    return new Promise((resolve, reject) => {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
        };

        cognitoidentityserviceprovider.adminDisableUser(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            } else {
                console.log(data);
                resolve();
            }
        });
    });

}

function reActivateStudentAuth (username) {
    return new Promise((resolve, reject) => {
        var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

        var params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: username,
        };

        cognitoidentityserviceprovider.adminEnableUser(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            } else {
                console.log(data);
                resolve();
            }
        });
    });

}

function isUserAuthenticated (username, token) {



}

module.exports = {
    createStudentAuth: createStudentAuth,
    deactivateStudentAuth: deactivateStudentAuth,
    reActivateStudentAuth: reActivateStudentAuth
};
