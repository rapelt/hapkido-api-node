var AClass = require('./class');
var shortid = require('shortid');
var _ = require('underscore');

exports.getAllClasses = function (req, res, next) {
    AClass.find({}, function (err, classes) {
        console.log("Finding all classes");
        if(err) {
            return next(err);
        }

        if (classes) {
            res.json(classes);
        } else {
            return res.status(422).send({error: "no classes found"});
        }
    });
};

exports.getTodaysClasses = function(req, res, next){
    console.log("Get todays Classes", req.body);
    var morning = new Date();
    morning.setHours(0);
    morning.setMinutes(0);
    morning.setSeconds(0);
    console.log('morning', morning, morning.valueOf());


    var night = new Date();
    night.setHours(23);
    night.setMinutes(59);
    night.setSeconds(59);
    console.log('night', night, night.valueOf());


    AClass.find({date : { $gte: morning.valueOf(), $lt: night.valueOf() }}, function (err, classes) {
        console.log("Finding Todays Classes");
        if(err) {
            return next(err);
        }

        if (classes) {
            res.json(classes);
        } else {
            return res.status(422).send({error: "no classes found"});
        }
    });

};

exports.createNewClasses = function (req, res, next) {
    console.log("Create Classes", req.body);

    var newClassesToCreate = req.body.classes;

    var uniqueList = _.uniq(newClassesToCreate, function(item, key, a) {
        return item.date;
    });

    var classesToCreate = [];

    var errors = [];

    var existingClasses = [];

    var classesCreated = [];

    var promise = new Promise((fulfill, reject) => {
        newClassesToCreate.forEach((aclass, index)=>{
            AClass.findOne({date: aclass.date, classType: aclass.classType}, function (err, existingClass) {
                if(err) {
                    errors.push(err);
                }
                if(!existingClass) {
                    var newClass = new AClass();
                    newClass.classId = shortid.generate();
                    newClass.classType = aclass.classType;
                    newClass.attendance = [];
                    newClass.isGrading = aclass.isGrading;
                    newClass.date = aclass.date;
                    newClass.startTime = aclass.startTime;

                    console.log("class", newClass);

                    classesToCreate.push(newClass);

                } else {
                    existingClasses.push(existingClass);
                }

                if(newClassesToCreate.length - 1 === index){
                    fulfill();
                }
            });
        });
    });

    promise.then(()=>{
        var promiseSave = new Promise((fulfill, reject) => {
            classesToCreate.forEach((aclass, index) => {
                aclass.save(function (err) {
                    if (err) {
                        errors.push(err);

                    } else {
                        classesCreated.push(aclass);
                    }

                    if(classesToCreate.length - 1 === index){
                        fulfill();
                    }

                });
            });
        });

        promiseSave.then(() =>{
            var classesNotCreated = newClassesToCreate.length - classesCreated.length;

            if(classesCreated.length === 0){
                return res.status(422).send({error: errors});
            }

            res.json({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
        });

    });
};

exports.deleteClass = function (req, res, next) {
    var classId = req.params.id;
    console.log("Delete class", classId);

    AClass.findOne({classId: classId}, function (err, aclass) {
        if(err) {
            return next(err);
        }

        if (aclass) {
            if(aclass.attendance.length > 0){
                console.log("students in attendance");
                return res.status(422).send({error: "Can not delete class if class has attendance"});
            } else {
                aclass.remove(function (err, product) {
                    if (err) return handleError(err);
                    AClass.findOne({classId: classId}, function (err, aclass) {
                        if(aclass){
                            return res.status(422).send({error: "Class not deleted"});
                        }
                        return res.status(200).send({message: "Class deleted"});
                    })
                });
            }
        } else {
            // user not found
            return res.status(422).send({error: "No class found"});
        }
    });
};

exports.addToClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("add to class", classId, hbId);

    AClass.findOne({classId: classId}, function (err, aclass) {
        if(err) {
            return next(err);
        }

        if(aclass.attendance.length > 0){
            var studentAlreadyAttended = false;
            aclass.attendance.forEach((studentId)=>{
                if(studentId === hbId){
                    studentAlreadyAttended = true;
                }
            });

            if(studentAlreadyAttended){
                return res.status(422).send({error: "Student is already in attendance"});
            } else {
                aclass.attendance.push(hbId);
            }

        } else {
            aclass.attendance.push(hbId);
        }

        aclass.save(function (err) {
            if (err) {
                return res.status(422).send({error: err});
            }
            return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId});
        });
    });
};

exports.removeFromClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("remove from class", classId, hbId);

    AClass.findOne({classId: classId}, function (err, aclass) {
        if(err) {
            return next(err);
        }

        if(aclass.attendance.length > 0){
            var studentAlreadyAttended = false;
            var index = null;
            aclass.attendance.forEach((studentId, i)=>{
                if(studentId === hbId){
                    studentAlreadyAttended = true;
                    index = i;
                }
            });

            if(studentAlreadyAttended){
                aclass.attendance.splice(index, 1);
            } else {
                return res.status(422).send({error: "Student is not in attendance"});
            }

        } else {
            return res.status(422).send({error: "Student is not in attendance"});
        }

        aclass.save(function (err) {
            if (err) {
                return res.status(422).send({error: err});
            }
            return res.status(200).send({message: "Student " + hbId + " has been removed from class " + classId});
        });
    });
};

