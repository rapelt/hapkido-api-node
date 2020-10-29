var _ = require('underscore');

var mapper = require('./student-mapper');


var authService = require('../cognito/auth-service');
var controller = require('./student-controller');

var Member = require('../models/member');
var Grade = require('../models/grade');
var ClassType = require('../models/class_type');
var Family = require('../models/family');
var MemberGrade = require('../models/member_grade');


exports.getAllStudents = function (req, res, next) {
    console.log("Finding all students");

    Member.findAll({
        include: [{
            model: ClassType,
            attributes: ['class_type'],
        }, {
            model: Grade,
        }, {
            model: Family,
            attributes: ['family_id'],
        }]
    }).then((result) => {
        result = result.map((student, index) => {
            return mapper.seqMapStudents(student);
        });

        res.json(result);


    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.getStudent = function (req, res, next) {
    var hbId = req.params.id;
    console.log("get Student",hbId);

    Member.findByPk(hbId,{
        include: [{
            model: ClassType,
            attributes: ['class_type'],
        }, {
            model: Grade,
        }, {
            model: Family,
            attributes: ['family_id'],
        }]
    }).then((result) => {
        res.json(mapper.seqMapStudents(result));
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.getStudentEmail = function (req, res, next) {
    var hbId = req.params.id;
    console.log("get Student email",hbId);

    Member.findByPk(hbId).then((result) => {
        res.json(result.getDataValue('email'));
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.createNewStudent = function (req, res, next) {
  console.log("Create Student", req.body);
  var student = req.body;
    ClassType.findAll({
        where: {
            class_type: student.preferredClass
        }
    }).then((result1) => {
        Member.create({
            hb_id: student.hbId,
            first_name: student.name.firstname,
            last_name: student.name.lastname,
            dob: null,
            occupation: null,
            is_active: true,
            is_kumdo_student: student.isKumdoStudent ? student.isKumdoStudent : false,
            previous_experience: null,
            injury_illness: null,
            is_verified: false,
            email: student.email,
            emergency_contact_id: null,
            family_id: student.familyId ? student.familyId : null,
            preferred_class_type_id: result1[0].getDataValue('class_type_id')
        }).then((result2) => {
            MemberGrade.create({ hb_id: student.hbId, grade_id: student.gradingDates[0].grade, date: student.gradingDates[0].date }).then((result) => {
                if(process.env.USE_COGNITO !== 'false'){
                    authService.createStudentAuth(id, email).then(() => {
                        req.params = { id: student.hbId};
                        controller.getStudent(req, res, next);
                    }).catch(() => {
                    });
                } else {
                    req.params = { id: student.hbId};
                    controller.getStudent(req, res, next);
                }

            }).catch((err) => {

                return res.status(422).send({error: err});
            });


        }).catch((err) => {
            return res.status(422).send({error: err});
        });

    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.updateStudent = function (req, res, next) {
    console.log("Update Student", req.body);
    var student = req.body;

    ClassType.findAll({
        where: {
            class_type: student.preferredClass
        }}).then((result) => {

        Member.update(
            {
                first_name: student.name.firstname,
                last_name: student.name.lastname,
                is_kumdo_student: student.isKumdoStudent ? student.isKumdoStudent : false,
                is_verified: false,
                is_active: student.isActive,
                email: student.email,
                family_id: student.familyId ? student.familyId : null,
                preferred_class_type_id: result[0].getDataValue('class_type_id')
            },
            {
                where: {
                    hb_id: student.hbId
                }
            }
        ).then((result) => {
            if(process.env.USE_COGNITO !== 'false'){
                authService.editStudentEmail(student.hbId, student.email).then(() => {
                    req.params = { id: student.hbId};
                    controller.getStudent(req, res, next);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                req.params = { id: student.hbId};
                controller.getStudent(req, res, next);
            }
         }).catch((err) => {
            console.log("-----error-----", err);
            return res.status(422).send({error: "Something went wrong"});
        });
    }).catch((err) => {
        console.log(err);
        return res.status(422).json({error: err});
    });
};

exports.deactivateStudent = function (req, res, next) {
    var hbId = req.params.id;

    console.log("Deactivate Student", hbId);

    Member.update(
        {is_active: false,},
        {where: {hb_id: hbId}}
    ).then((result) => {
        authService.deactivateStudentAuth(hbId);
        res.json({ studentId: hbId});
    }).catch((err) => {
        console.log("-----error-----", err);
        return res.status(422).send({error: "Something went wrong"});
    });

};

exports.reactivateStudent = function (req, res, next) {
    var hbId = req.params.id;

    console.log("Reactivate Student", hbId);

    Member.update(
        {is_active: true,},
        {where: {hb_id: hbId}}
    ).then((result) => {
        authService.reActivateStudentAuth(hbId);
        res.json({ studentId: hbId});
    }).catch((err) => {
        console.log("-----error-----", err);
        return res.status(422).send({error: "Something went wrong"});
    });
};

exports.removeGrading = function(req, res, next){
    console.log(" Remove Grading from Student", req.body, req.params.id);
    var grades = req.body;
    var hbId = req.params.id;
    var gradePromises = [];

    grades.map((grade)=> {
    return {
                hb_id: hbId,
                grade_id: grade.grade
            }
    });

    MemberGrade.destroy({
        where: gradePromises
    }).then(() => {
        controller.getStudent(req, res, next);
    }).catch((err) => {
        return res.status(422).send({error: "Something went wrong ", err});
    });
};

exports.addGrading = function(req, res, next){
    console.log(" Add Grading to Student", req.body, req.params.id);
    var grades = req.body;
    var hbId = req.params.id;
    var gradePromises = [];


    gradePromises = grades.map((grade) => {
        return {
            hb_id: hbId,
            grade_id: grade.grade,
            class_id: null,
            date: new Date(grade.date)
        };
    });

    MemberGrade.bulkCreate(gradePromises).then(() => {
        controller.getStudent(req, res, next);
    }).catch((err) => {
        return res.status(422).send({error: "Something went wrong ", err});
    });
};



exports.addToNewApp = function (req, res, next) {
    console.log("Add Student to new app", req.body);
    var student = req.body;

    authService.createStudentAuth(student.hbId, student.email).then(() => {
        req.params = { id: student.hbId};
        controller.getStudent(req, res, next);
    }).catch(() => {
        console.log('OMG something went wrong with the user sign up.');
        return res.status(422).send({error: "Something went wrong"});
    });
};
