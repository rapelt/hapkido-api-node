"use strict";
/*//central all the routing in this file
//any file named routes.js will automatically be included
var express = require('express');
var router = express.Router(({ mergeParams: true }));
var glob = require('glob');
var path = require('path');
var routes;

//require all routes files
glob.sync('./!**!/routes.js').forEach(function (file) {
    routes = require(path.resolve(file));
    router.use(routes);
});

module.exports = router;*/
