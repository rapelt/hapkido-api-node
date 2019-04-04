"use strict";
var express = require('express');
var http = require('http');
var studentRouter = require('./student/studentRouter');
var classRouter = require('./class/classRouter');
var familyRouter = require('./family/family-router');
var classTypeRouter = require('./class_type/class-type-router');
var bodyParser = require('body-parser');
var cors = require('cors');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/student", studentRouter);
app.use("/class", classRouter);
app.use("/family", familyRouter);
app.use("/classtype", classTypeRouter);
if (process.env.LH === 'true') {
    var server = http.createServer(app);
    var port_1 = process.env.PORT || 4000;
    var host = process.env.HOST || '127.0.0.1';
    console.log(port_1, host);
    server.listen(port_1, host);
}
module.exports = app;
