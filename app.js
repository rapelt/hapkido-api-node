'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app);
var mysql = require('./db/rdsconnect');

var sequelize = require('./db/sequelize');

var Class = require('./models/class');
var ClassType = require('./models/class_type');
var Member = require('./models/member');
var MemberClass = require('./models/member_class');
var MemberGrade = require('./models/member_grade');
var Grade = require('./models/grade');


Class.belongsTo(ClassType, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'class_type_id'})
ClassType.hasMany(Class, { foreignKey: 'class_type_id'});

Class.belongsToMany(Member, { through: MemberClass, foreignKey: 'class_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Member.belongsToMany(Class, { through: MemberClass, foreignKey: 'hb_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

Grade.belongsToMany(Member, { through: MemberGrade, foreignKey: 'hb_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Member.belongsToMany(Grade, { through: MemberGrade, foreignKey: 'grade_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Class.belongsToMany(Grade, { through: MemberGrade, foreignKey: 'class_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

exports.handler = (event, context) => {
    mysql.mysqlconnect(null, null).then(() => {
        awsServerlessExpress.proxy(server, event, context);
    });

    sequelize.sync().then((result) => {
        console.log('Sequelize is working');
        // console.log(result)
    }).catch((err)=> {
        console.log(err);
    })
};
