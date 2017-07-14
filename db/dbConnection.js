var mongoose = require('mongoose');

exports.dbconnect = function (callback) {
    //Mongo DB
    var options = {
        server: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 30000, connectTimeoutMS : 30000 } }
    };

    var mongodbUri = 'mongodb://' + process.env.USER + ':' + process.env.PW + '@ds135680.mlab.com:35680/hapkido';

    mongoose.connect(mongodbUri, options);
    var conn = mongoose.connection;

    conn.on('error', function(err) {
        console.log("This is my error for mongo db", err);
    });

    conn.once('open', function() {
        // Wait for the database connection to establish, then start the app.
        console.log("Mongo Connected");
        callback();
    });

    //End Mongo Db
};

exports.dbdisconnect = function () {
    mongoose.disconnect();
    //End Mongo Db
};


