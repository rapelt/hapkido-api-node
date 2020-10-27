"use strict";
let apps = require('./index');

let port = process.env.PORT || 8090;

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


var app = apps.listen(port, () => {
    console.log(`Application is running on port ${port}`);

    mysql.mysqlconnect().then(() => {
        console.log(`Application is running on port ${port}`);
    });

    sequelize.sync({alter: true}).then((result: any) => {
        // console.log(result)
    }).catch((err: any)=> {
        console.log(err);
    })

    const io = require('./io/io').init(app);

    io.on('connection', (socket: any) => {
        console.log('Client Connected');
    });

    io.emit('posts', {message: 'I am connected'});

    // io.connect(app, null).then(() => {
    //     console.log(`IO is connected`);
    // });
});


