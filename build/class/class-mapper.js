"use strict";
var connection = require('../db/rdsconnect');
var classTypeService = require('../class_type/class-type-service');
var classMemberService = require('../class_member/class-member-service');
var _ = require('underscore');
function mapClass(aclass) {
    return new Promise(function (resolve, reject) {
        var newclass = {};
        newclass.classId = aclass.class_id;
        newclass.startTime = "";
        newclass.date = aclass.date;
        newclass.isGrading = aclass.is_grading === 1 ? true : false;
        Promise.all([classTypeService.getClassTypeById(aclass.class_type_id), classMemberService.getMembersInClass(newclass.classId)]).then(function (results) {
            newclass.classType = results[0].class_type;
            newclass.attendance = results[1];
            resolve(newclass);
        }).catch(function (err) {
            reject(err);
        });
        return newclass;
    });
}
;
function mapClasses(classes) {
    return new Promise(function (resolve, reject) {
        var newClassesPromise = [];
        _.each(classes, function (aclass) {
            newClassesPromise.push(mapClass(aclass));
        });
        Promise.all(newClassesPromise).then(function (results) {
            resolve(results);
        }).catch(function (err) {
            reject(err);
        });
    });
}
;
module.exports = {
    mapClass: mapClass,
    mapClasses: mapClasses
};
