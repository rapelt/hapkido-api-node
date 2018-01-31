var mongoose = require('mongoose');

exports.dbconnect = function (callback, dbLocation) {
    if(mongoose.connection.readyState === 0){
        var mongodbUri = 'mongodb://' + process.env.USER + ':' + process.env.PW + dbLocation;

        mongoose.connect(mongodbUri, function(err, db) {
            if (err) {
                console.log('Unable to connect to the server. Please start the server. Error:', err);
            } else {
                console.log('Connected to Server successfully!');
                callback();
            }
        });
    }
};

exports.dbdisconnect = function () {
    mongoose.disconnect();
    console.log("Mongo DB Disconnected");
};