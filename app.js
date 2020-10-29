'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);

var sequelize = require('./db/sequelize');
var sequelizeRelations = require('./db/setupSequelizeRealtions');

exports.handler = (event, context) => {
    sequelize.sync({alter: true}).then((result) => {
        console.log('Sequelize is working');
        // console.log(result)
        awsServerlessExpress.proxy(server, event, context);

    }).catch((err)=> {
        console.log(err);
    })
};
