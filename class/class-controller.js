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

    newClassesToCreate.forEach((aclass)=>{
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
        });
    });

    classesToCreate.forEach((aclass)=> {

        aclass.save(function (err) {
            if (err) {
                errors.push(err);
            }

            classesCreated.push(aclass);

        });
    });

    var classesNotCreated = newClassesToCreate.length - classesCreated.length;

    if(classesCreated.length === 0){
        return res.status(422).send({error: errors});
    }

    res.json({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});

};
