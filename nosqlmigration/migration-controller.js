var _ = require('underscore');

var studentService = require('../student/student-service');
var classTypeService = require('../class_type/class-type-service');
var familyService = require('../family/family-service');
var classService = require('../class/class-service');
var classMemberService = require('../class_member/class-member-service');
var gradeService = require('../grade/grade-service');
var memberGradesService = require('../member_grades/member-grades-service');

var Student = require('../student/student');
var Class = require('../class/class');

exports.migratestudents = function (req, res, next) {
    Student.find({}, function (err, students) {
        if(err) { return res.status(422).send({error: err})}
        if (students) {
            createStudentLoop(students, res, next);
        } else {
            return res.status(422).send({error: "no students found"});
        }
    });
};

index = 0;

function createStudentLoop(students, res, next){
    if(index < students.length){
        studentCreation(students[index]).then((result) => {
            console.log('then', result);
            index++;
            createStudentLoop(students, res, next);
        }).catch((err) => {
            console.log(err);
            return res.status(422).send({error: err});
        });
    } else {
        return next();
/*
        res.status(200).send('yay');
*/
    }
}

function studentCreation(student) {
    return new Promise((resolve, reject) => {
        Promise.all([classTypeService.getClassTypeIdByName(student.preferredClass), familyService.getFamilyByName(student.name.lastname)]).then((results) => {
            var id = student.hbId;
            var firstname = student.name.firstname;
            var lastname = student.name.lastname;
            var dob = null;
            var occupation = null;
            var is_active = student.isActive;
            var is_kumdo_student = student.isKumdoStudent;
            var previous_experience = null;
            var injury_illness = null;
            var is_verified = false;
            var email = student.email;
            var preferred_class_type_id = results[0];
            var emergency_contactid = null;
            var family_id = results[1];


            studentService.createStudent(id, firstname, lastname, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id, emergency_contactid, family_id).then((result) => {
                console.log(result);
                resolve();
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
};


exports.migrateclasses = function (req, res, next) {
    Class.find({}, function (err, classes) {
        if(err) { return next(err);}
        if (classes) {
            createClassesLoop(classes, res, next);
        } else {
            return res.status(422).send({error: "no classes found"});
        }
    });
};


classesindex = 0;

function createClassesLoop(classes, res, next){
    if(classesindex < classes.length){
        classesCreation(classes[classesindex]).then((result) => {
            classesindex++;
            createClassesLoop(classes, res, next);
        }).catch((err) => {
            console.log(err);
            return res.status(422).send({error: err});

        });
    } else {
        return next();
/*
        res.status(200).send('yay');
*/
    }
}

function classesCreation(aclass) {
    return new Promise((resolve, reject) => {
        Promise.all([classTypeService.getClassTypeIdByName(aclass.classType)]).then((results) => {

            classService.createClass(0, aclass.isGrading, aclass.date.toDate(), results[0]).then((result) => {
                _.each(aclass.attendance, (student) => {
                    if(student){
                        classMemberService.addMemberToClass(student, result);
                    }

                });
                resolve();
            }).catch((err) => {
                console.log(err);
                reject(err);
            });

            resolve();
        }).catch((err) => {
            console.log(err);
        });
    });
};


exports.migrategrades = function (req, res, next) {

    gradeService.createAllGrades().then(() => {
/*
        res.send('yay');
*/
        return next();
    }).catch((err) => {
        return res.status(422).send({error: err});

    });
};

exports.migratestudentgrades = function (req, res, next) {

    Student.find({}, function (err, students) {
        if(err) { return next(err);}
        if (students) {

            _.each(students, (student)=> {
                var hbid = student.hbId;

                _.each(student.gradingDates, (grading)=> {
                    memberGradesService.addStudentGrade(hbid, grading.grade, null, new Date(grading.date));
                });
            });

            return res.send('yay');

        } else {
            return res.status(422).send({error: "no students found"});
        }
    });
};

