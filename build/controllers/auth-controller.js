"use strict";
var Student = require('../student/student');
var jwt = require('jwt-simple');
function tokenForUser(student) {
    return jwt.encode({
        sub: student._id,
        iat: new Date().getTime()
    }, process.env.PW);
}
exports.signup = function (req, res, next) {
    console.log(req.body);
    var firstname = req.body.name.firstname;
    var lastname = req.body.name.lastname;
    var hbId = req.body.hbId;
    if (!firstname || !lastname || !hbId) {
        return res.status(422).send({ error: "You must provide a first and last name and a Hapkido Brisbane Id Number" });
    }
    Student.findOne({ hbId: hbId }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({ error: "hbId is in use" });
        }
        var newStudent = new Student({
            hbId: hbId,
            firstname: firstname,
            lastname: lastname
        });
        newStudent.save(function (err) {
            if (err) {
                if (err.errors && err.errors.hbId) {
                    return res.status(422).send({ error: err.errors.hbId.message });
                }
                return next(err);
            }
            res.json({ token: tokenForUser(newStudent), studentId: newStudent._id });
        });
    });
};
