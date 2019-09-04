var connection = require('../db/rdsconnect');
var pool = connection.getpool();
var _ = require('underscore');

function mapStudents(students, studentGrades, classTypes) {

    var newStudents = [];

    _.each(students, (student) => {

        var grades = _.filter(studentGrades, (studentGrade) => {
           return studentGrade.hb_id === student.hb_id;
        });

        var sortedGrades = _.sortBy(grades, (grade) => {
            return grade.grade_id;
        });

        var studentGrade = sortedGrades[sortedGrades.length - 1].grade_id;

        var newGrades = [];

        _.each(sortedGrades, (grade) => {
            newGrades.push({
                "date": grade.date,
                "grade": grade.grade_id
            });
        });

        var preferredClassType = _.find(classTypes, (type)=> {
            return type.class_type_id === student.preferred_class_type_id
        });

        var newStudent = {
            "preferredClass": preferredClassType.class_type,
            "isKumdoStudent": student.is_kumdo_student === 1,
            "isActive": student.is_active === 1,
            "isAdmin": false,
            "grade": studentGrade,
            "pinNumber": null,
            "email": student.email,
            "hbId": student.hb_id,
            "familyId": student.family_id,
            "gradingDates": newGrades,
            "name": {
                "lastname": student.last_name,
                "firstname": student.first_name
            }
        };


        newStudents.push(newStudent);

    });


    return newStudents;
};

module.exports = {
    mapStudents: mapStudents,
};
