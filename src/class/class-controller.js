var mapper = require('./class-mapper');

const Class = require('../models/class');
const ClassType = require('../models/class_type');
const Member = require('../models/member');

exports.getAllClasses = function (req, res, next) {
    console.log("get all classes");

    Class.findAll({
        include: [{
            model: Member,
            attributes: ['hb_id'],
        }, {
            model: ClassType,
        }]
    }).then((result) => {
        result = result.map((aclass) => {
            return mapper.seqClassMapper(aclass);
        });

        res.json(result);
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.deleteClass = function (req, res, next) {
    var classId = req.params.id;
    console.log("Delete class", classId);

    Class.findByPk(classId).then((aclass) => {
        aclass.destroy().then(() => {
            return res.status(200).send({classid: classId});
        })
            .catch((err) => {
            return res.status(422).send({error: err});
        });;
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.addToClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("add to class", classId, hbId);

    Class.findByPk(classId).then((aclass) => {
        console.log(aclass);

        Member.findByPk(hbId).then((member) => {
            aclass.addMember(member);
            return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId, studentId: hbId});
        }).catch((err) => {
            return res.status(422).send({error: err});
        });
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.removeFromClass = function (req, res, next) {
    var classId = req.params.id;
    var hbId = req.body.studentId;
    console.log("remove from class", classId, hbId);

    Class.findByPk(classId).then((aclass) => {
        console.log(aclass);

        Member.findByPk(hbId).then((member) => {
            aclass.removeMember(member);
            return res.status(200).send({message: "Student " + hbId + " has been removed to class " + classId, studentId: hbId});
        }).catch((err) => {
            return res.status(422).send({error: err});
        });
    }).catch((err) => {
        return res.status(422).send({error: err});
    });
};

exports.makeClassAGrading = function (req, res, next) {
    var classId = req.params.id;
    console.log("Make class a grading", classId);

    Class.findByPk(classId).then((aclass) => {
        aclass.update({
            is_grading: true
        }).then(() => {
                return res.status(200).send({message: "Class " + classId + " has been made a grading "});
        })
            .catch((err) => {
                return res.status(422).send({error: err});
            });;
    }).catch((err) => {
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
        ClassType.findAll({
            where: {
                class_type: aclass.classType
            }
        }).then((results) => {
            Class.create({
                is_grading: aclass.isGrading,
                date: new Date(aclass.date),
                class_type_id: results[0].getDataValue('class_type_id')
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};

