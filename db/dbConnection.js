var mongoose = require('mongoose');

exports.dbconnect = function (callback) {
    //Mongo DB
    this.dbdisconnect();
    console.log("Mongoose ready State 1", mongoose.connection.readyState);
    console.log("I got to DB Connect");
    var options = {
        /*server: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 30000, connectTimeoutMS : 30000 } }*/
    };

    var mongodbUri = 'mongodb://' + process.env.USER + ':' + process.env.PW + '@ds135680.mlab.com:35680/hapkido';

    var conn = mongoose.connection;
    console.log("Mongoose ready State 1", mongoose.connection.readyState);
    console.log("Ready for connections");


/*
    var promise = new Promise(function(resolve, reject) {
        console.log("I am in the promsie");
        mongoose.connect(mongodbUri);

        conn.on('error', function(err) {
            console.log("This is my error for mongo db", err);
            reject(err);
        });

        conn.once('open', function() {
            // Wait for the database connection to establish, then start the app.
            console.log("Mongo Connected");
            resolve("Done");
        });
    });

    promise.then(function( message ) {
            console.log("I am in the promsie 2");
            console.log( message );
            callback();
        },
        function( err ) {
            console.log( err );
        });*/
/*

    mongoose.connect(mongodbUri, function(err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
            callback();
        }
    });
*/




    //End Mongo Db
};

exports.dbdisconnect = function () {
    mongoose.disconnect();
    //End Mongo Db
};


