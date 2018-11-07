var AClass = require('./class');
var shortid = require('shortid');
var _ = require('underscore');
var moment = require('moment');

var service = require('./class-service');
var classTypeService = require('../class_type/class-type-service');
var attendanceService = require('../class_member/class-member-service');

var mapper = require('./class-mapper');


exports.getAllClasses = function (req, res, next) {
    console.log("Finding all classes");
    service.getAllClasses().then((classes) => {
        mapper.mapClasses(classes).then((newClasses) => {
            res.json(newClasses);
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.getNextClasses = function (req, res, next) {
    var numberOfClasses = req.body.numberOfClasses;
    console.log("Finding next classes");
    service.getNextClasses(numberOfClasses).then((classes) => {
        mapper.mapClasses(classes).then((newClasses) => {
            res.json(newClasses);
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.getClassesBetweenDates = function (req, res, next) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    console.log(req.body);
    console.log(`Finding classes between ${startDate} and ${endDate}`);

    service.getClassesBetweenDates(startDate, endDate).then((classes) => {
        mapper.mapClasses(classes).then((newClasses) => {
            res.json(newClasses);
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
};

/*exports.createNewClasses = function (req, res, next) {
    console.log("Create Classes", req.body);
    var newClassesToCreate = req.body.classes;

    var classesCreated = [];
    var errors = [];
    var classesNotCreated = [];

    var allclasses = 0;

    _.each(newClassesToCreate, (aclass) => {
        classTypeService.getClassTypeIdByName(aclass.classType).then((result) => {
            service.createClass(0, aclass.isGrading? 1 : 0, new Date(aclass.date), result).then((results) => {
                aclass.classId = results;
                classesCreated.push(aclass);
                allclasses++;

                console.log(newClassesToCreate.length, allclasses);

                if(newClassesToCreate.length === allclasses){
                    console.log({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
                    res.json({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
                }
            }).catch((err)=> {
                allclasses++;
                classesNotCreated.push(err);
                errors.push(err);
                console.log(err);

                console.log(newClassesToCreate.length, allclasses);
                if(newClassesToCreate.length === allclasses){
                    console.log({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
                    res.json({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
                }
            });
        }).catch((err)=> {
            allclasses++;
            classesNotCreated.push(err);
            errors.push(err);
        });
    });
};*/

exports.deleteClass = function (req, res, next) {
    var classId = req.params.id;
    console.log("Delete class", classId);

    service.deleteClass(classId).then((result) => {
        console.log(result);
        return res.status(200).send({classid: classId});
    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.addToClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("add to class", classId, hbId);

    attendanceService.addMemberToClass(hbId, classId).then((result) => {
        return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId, studentId: hbId});
    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.removeFromClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("remove from class", classId, hbId);

    attendanceService.removeMemberToClass(hbId, classId).then((result) => {
        return res.status(200).send({message: "Student " + hbId + " has been removed to class " + classId, studentId: hbId});
    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};

exports.makeClassAGrading = function (req, res, next) {
    var classId = req.params.id;
    console.log("Make class a grading", classId);

    service.makeClassAGrading(classId).then((result) => {
        console.log(result);
        return res.status(200).send({message: "Class " + classId + " has been made a grading "});
    }).catch((err) => {
        console.log(err);
        return res.status(422).send({error: err});
    });
};






var classesindex = 0;
var classesCreated = [];
var errors = [];
var classesNotCreated = [];


exports.createClasses = function (req, res, next) {
    classesindex = 0;
    classesCreated = [];
    errors = [];
    classesNotCreated = [];

    console.log("Create Classes", req.body);
    var classes = req.body.classes;

    if (classes) {
        createClassesLoop(classes, res);
    } else {
        return res.status(422).send({error: "no classes found"});
    }
};

function createClassesLoop(classes, res){
    if(classesindex < classes.length){
        classesCreation(classes[classesindex]).then((result) => {
            classes[classesindex].classId = result;
            classesCreated.push(classes[classesindex]);
            classesindex++;
            createClassesLoop(classes, res);
        }).catch((err) => {
            classesNotCreated.push(classes[classesindex]);
            errors.push(err);
            classesindex++;
            createClassesLoop(classes, res);
        });
    } else {
        res.status(200).send({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
    }
}

function classesCreation(aclass) {
    return new Promise((resolve, reject) => {
        Promise.all([classTypeService.getClassTypeIdByName(aclass.classType)]).then((results) => {
            service.createClass(0, aclass.isGrading, new Date(aclass.date), results[0]).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
};