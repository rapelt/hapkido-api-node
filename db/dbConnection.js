var mongoose = require('mongoose');

exports.dbconnect = function (callback) {
    //Mongo DB
    this.dbdisconnect();
    console.log("Mongoose ready State 1", mongoose.connection.readyState);
    console.log("I got to DB Connect");

    var mongodbUri = 'mongodb://' + process.env.USER + ':' + process.env.PW + '@ds135680.mlab.com:35680/hapkido';

    var conn = mongoose.connection;
    console.log("Mongoose ready State 1", mongoose.connection.readyState);
    console.log("Ready for connections");

    mongoose.connect(mongodbUri, function(err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
            callback();
        }
    });

    //End Mongo Db
};

exports.dbdisconnect = function () {
    mongoose.disconnect();
    //End Mongo Db
};