var AClass = require('./class');
var shortid = require('shortid');

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

exports.createNewClasses = function (req, res, next) {
    console.log("Create Classes", req.body);

    var newClassesToCreate = req.body.classes;

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

