var express = require('express');
var http = require('http');
var router = require('./router');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

var app = express();

app.use(cors());

require('dns').resolve('www.google.com', function(err) { if (err) { console.log("No connection"); } else { console.log("Connected to the internet"); } });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/student", router);

if(process.env.LH === true) {
    var server = http.createServer(app);
    var port = process.env.PORT || 4000;
    var host = process.env.HOST || '127.0.0.1';
    console.log(port, host);

    server.listen(port, host);
}

module.exports = app;