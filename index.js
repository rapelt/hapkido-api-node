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

/*app.use('/!*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});*/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.options('/*', function(request, response){
  response.sendStatus(200);
});

app.use('/v1', router);

var server = http.createServer(app);

var port = process.env.PORT || 4000;
var host = process.env.HOST || '127.0.0.1';

console.log(port, host);

server.listen(port, host);