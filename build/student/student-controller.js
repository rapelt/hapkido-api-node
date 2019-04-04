"use strict";
var _ = require('underscore');
var moment = require('moment');
var service = require('./student-service');
var mapper = require('./student-mapper');
var memberGradesService = require('../member_grades/member-grades-service');
var classTypeService = require('../class_type/class-type-service');
var familyService = require('../family/family-service');
var authService = require('../cognito/auth-service');
var controller = require('./student-controller');
exports.getAllStudents = function (req, res, next) {
    console.log("Finding all students");
    Promise.all([service.getAllStudents(), memberGradesService.getAllGrades(), classTypeService.getAllClassTypes()]).then(function (all) {
        res.json(mapper.mapStudents(all[0], all[1], all[2]));
    }).catch(function (err) {
        console.log(err);
        return res.status(422).send({ error: err });
    });
};
exports.getStudent = function (req, res, next) {
    var hbId = req.params.id;
    console.log("get Student", hbId);
    Promise.all([service.getStudent(hbId), memberGradesService.getStudentGrades(hbId), classTypeService.getAllClassTypes()]).then(function (all) {
        if (all[0].length !== 1) {
            return res.status(422).send({ error: "no student found" });
        }
        res.json(mapper.mapStudents(all[0], all[1], all[2])[0]);
    }).catch(function (err) {
        console.log(err);
    });
};
exports.getStudentEmail = function (req, res, next) {
    var hbId = req.params.id;
    console.log("get Student", hbId);
    service.getStudentEmail(hbId).then(function (email) {
        if (email.length !== 1) {
            return res.status(422).send({ error: "No student found" });
        }
        res.send(email[0].email);
    }).catch(function (err) {
        console.log("-----error-----", err);
        return res.status(422).send({ error: "Something went wrong" });
    });
};
exports.createNewStudent = function (req, res, next) {
    console.log("Create Student", req.body);
    var student = req.body;
    var promises = [];
    promises.push(classTypeService.getClassTypeIdByName(student.preferredClass));
    if (student.familyId === null) {
        promises.push(familyService.getFamilyByName(student.name.lastname));
    }
    Promise.all(promises).then(function (results) {
        var id = student.hbId;
        var firstname = student.name.firstname;
        var lastname = student.name.lastname;
        var dob = null;
        var occupation = null;
        var is_active = student.isActive;
        var is_kumdo_student = student.isKumdoStudent ? student.isKumdoStudent : false;
        var previous_experience = null;
        var injury_illness = null;
        var is_verified = false;
        var email = student.email;
        var preferred_class_type_id = results[0];
        var emergency_contactid = null;
        var family_id = student.familyId ? student.familyId : results[1];
        var joiningDate = student.gradingDates[0].date;
        service.createStudent(id, firstname, lastname, dob, occupation, is_active, is_kumdo_student, previous_experience, injury_illness, is_verified, email, preferred_class_type_id, emergency_contactid, family_id)
            .then(function (result) {
            memberGradesService.addStudentGrade(student.hbId, student.grade, null, new Date(joiningDate)).then(function () {
                authService.createStudentAuth(id, email).then(function () {
                    req.params = { id: student.hbId };
                    controller.getStudent(req, res, next);
                }).catch(function () {
                });
            }).catch(function (err) {
                return res.status(422).json({ error: err });
            });
        }).catch(function (err) {
            console.log(err);
            return res.status(422).json({ error: err });
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    });
};
exports.updateStudent = function (req, res, next) {
    console.log("Update Student", req.body);
    var student = req.body;
    classTypeService.getClassTypeIdByName(student.preferredClass).then(function (result) {
        console.log(result);
        service.updatedStudent(student.hbId, student.name.firstname, student.name.lastname, null, null, student.isActive, student.isKumdoStudent, null, null, false, student.email, result).then(function (result) {
            controller.getStudent(req, res, next);
        }).catch(function (err) {
            console.log("-----error-----", err);
            return res.status(422).send({ error: "Something went wrong" });
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    });
};
exports.deactivateStudent = function (req, res, next) {
    var hbId = req.params.id;
    console.log("Deactivate Student", hbId);
    service.setIsActiveToFalse(hbId).then(function (result) {
        authService.deactivateStudentAuth(hbId);
        res.json({ studentId: hbId });
    }).catch(function (err) {
        console.log("-----error-----", err);
        return res.status(422).send({ error: "Something went wrong" });
    });
};
exports.reactivateStudent = function (req, res, next) {
    var hbId = req.params.id;
    console.log("Reactivate Student", hbId);
    service.setIsActiveToTrue(hbId).then(function (result) {
        authService.reActivateStudentAuth(hbId);
        res.json({ studentId: hbId });
    }).catch(function (err) {
        console.log("-----error-----", err);
        return res.status(422).send({ error: "Something went wrong ", err: err });
    });
};
exports.removeGrading = function (req, res, next) {
    console.log(" Remove Grading from Student", req.body, req.params.id);
    var grades = req.body;
    var hbId = req.params.id;
    var gradePromises = [];
    _.each(grades, function (grade) {
        if (grade.grade !== 0) {
            gradePromises.push(memberGradesService.removeStudentGrade(hbId, grade.grade));
        }
    });
    Promise.all(gradePromises).then(function () {
        controller.getStudent(req, res, next);
    }).catch(function (err) {
        return res.status(422).send({ error: "Something went wrong ", err: err });
    });
};
exports.addGrading = function (req, res, next) {
    console.log(" Add Grading to Student", req.body);
    var grades = req.body;
    var hbId = req.params.id;
    var gradePromises = [];
    _.each(grades, function (grade) {
        gradePromises.push(memberGradesService.addStudentGrade(hbId, grade.grade, null, new Date(grade.date)));
    });
    Promise.all(gradePromises).then(function () {
        controller.getStudent(req, res, next);
    }).catch(function (err) {
        return res.status(422).send({ error: "Something went wrong ", err: err });
    });
};
exports.addToNewApp = function (req, res, next) {
    console.log("Add Student to new app", req.body);
    var student = req.body;
    authService.createStudentAuth(student.hbId, student.email).then(function () {
        req.params = { id: student.hbId };
        controller.getStudent(req, res, next);
    }).catch(function () {
        console.log('OMG something went wrong with the user sign up.');
        return res.status(422).send({ error: "Something went wrong" });
    });
};
