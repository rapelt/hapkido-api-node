import * as path from "path";

var express = require('express');
var http = require('http');

var studentRouter = require('./src/student/studentRouter');
var classRouter = require('./src/class/classRouter');
var familyRouter = require('./src/family/family-router');
var classTypeRouter = require('./src/class_type/class-type-router');
var techniqueRouter = require('./src/technique/technique-router');
var mediaRouter = require('./src/media_uploads/media-router');
var tagRouter = require('./src/tag/tag-router');

var multer = require('multer');
var bodyParser = require('body-parser');
var cors = require('cors');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
// const io = require('./src/io/io')

let app = express();
// let socketIO = require('socket.io');


var whitelist = [
    'http://localhost:4200',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://hapkido-admin-staging.s3-website-ap-southeast-2.amazonaws.com',
    'http://hapkido-admin-site.s3-website-ap-southeast-2.amazonaws.com'
];
var corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
            // console.log('Allowed');
            callback(null, true)
        } else {
            // console.log('Blocked');
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(multer().any('media'));

app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/student", studentRouter);
app.use("/class", classRouter);
app.use("/family", familyRouter);
app.use("/classtype", classTypeRouter);
app.use("/technique", techniqueRouter);
app.use("/tag", tagRouter);
app.use("/media", mediaRouter);

app.use(express.static(path.join(__dirname, '/')))

if(process.env.LH === 'true') {
    var server = http.createServer(app);
    let port = process.env.PORT || 8090;
    var host = process.env.HOST || '127.0.0.1';
    console.log(port, host);
    server.listen(port, host);
}




module.exports = app;

