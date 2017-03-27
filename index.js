var express = require('express');
var http = require('http');
var router = require('./router');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require("./config");
var cors = require('cors');

let username = config.dbusername;
let password = config.dbpassword;

mongoose.connect(`mongodb://${username}:${password}@ds135680.mlab.com:35680/hapkido`);

var app = express();

app.use(cors({origin: 'http://localhost:8100'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/v1', router);

var server = http.createServer(app);

var port = process.env.PORT || 4000;
var host = process.env.HOST || '127.0.0.1';

console.log(port, host);

server.listen(port, host);