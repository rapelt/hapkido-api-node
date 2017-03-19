var Student = require('../models/student');

exports.getAllStudents = function (req, res, next) {

  Student.find({}, function (err, students) {
    if(err) {
      return next(err);
    }

    if (students) {
      // return user (without hashed password)
      res.json({students: students});
    } else {
      // user not found
      res.json({students: "no students found"});
    }
  });
};