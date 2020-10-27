var connection = require('../db/rdsconnect');
var classTypeService = require('../class_type/class-type-service');
var classMemberService = require('../class_member/class-member-service');
var _ = require('underscore');


function mapClass (aclass) {
    return new Promise((resolve, reject) => {
        var newclass = {};
        newclass.classId = aclass.class_id;
        newclass.startTime = "";
        newclass.date = aclass.date;
        newclass.isGrading = aclass.is_grading === 1? true: false;

        Promise.all([classTypeService.getClassTypeById(aclass.class_type_id), classMemberService.getMembersInClass(newclass.classId)]).then((results) => {
            newclass.classType = results[0].class_type;
            newclass.attendance = results[1];
            resolve(newclass);
        }).catch((err) => {
            reject(err);
        });

        return newclass;
    });
};

function mapClasses (classes) {
    return new Promise((resolve, reject)=> {
        var newClassesPromise = [];

        _.each(classes, (aclass) => {
            newClassesPromise.push(mapClass(aclass));
        });

        Promise.all(newClassesPromise).then((results) => {
            resolve(results);
        }).catch((err)=> {
            reject(err);
        });
    });
};

function seqClassMapper (seqClass) {
    return {
        classId: seqClass.getDataValue('class_id'),
        isGrading: seqClass.getDataValue('is_grading') === 1,
        date: seqClass.getDataValue('date'),
        classType: seqClass.getDataValue('class_type').class_type,
        attendance: seqClass.getDataValue('members').map((member) => {
            return member.hb_id;
        })
    }
};

module.exports = {
    mapClass: mapClass,
    mapClasses: mapClasses,
    seqClassMapper: seqClassMapper
};
