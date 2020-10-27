import Seq from 'sequelize';

const options = require('./sequelize-options.json');

var poolconfig = {
    // connectionLimit : 10,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    database : process.env.DATABASE,
    options: {
        ...options,
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT
    }
};

const sequelize = new Seq(poolconfig.database, poolconfig.user, poolconfig.password, poolconfig.options);

module.exports = sequelize;


