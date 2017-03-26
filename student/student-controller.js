var Student = require('./student');

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
      return res.status(422).send({error: "no students found"});
    }
  });
};


exports.getStudent = function (req, res, next) {
  var hbId = req.params.id;

  Student.findOne({hbId: hbId}, function (err, student) {
    if(err) {
      return next(err);
    }

    if (student) {
      // return user (without hashed password)
      res.json({student: student});
    } else {
      // user not found
      return res.status(422).send({error: "no student found"});
    }
  });
};

exports.deleteStudent = function (req, res, next) {
  var hbId = req.params.id;

  Student.findOne({hbId: hbId}, function (err, student) {
    if(err) {
      return next(err);
    }

    if (student) {
      student.remove(function (err, product) {
        if (err) return handleError(err);
        Student.findOne({hbId: hbId}, function (err, student) {
          if(student){
            return res.status(422).send({error: "student not deleted"});
          }
          return res.status(200).send({message: "student deleted"});
        })
      });
    } else {
      // user not found
      return res.status(422).send({error: "no student found"});
    }
  });
};

exports.createNewStudent = function (req, res, next) {
  console.log(req.body);

  var hbId = req.body.hbId;

  Student.findOne({hbId: hbId}, function (err, existingStudent) {
    if(err) {
      return next(err);
    }
    if(existingStudent){
      return res.status(422).send({error: "hbId is in use"});
    }

    var newStudent = new Student ();

    newStudent.name.firstname = req.body.name.firstname;
    newStudent.name.lastname = req.body.name.lastname;
    newStudent.hbId = req.body.hbId;
    newStudent.pinNumber = "0000";
    newStudent.grade = req.body.grade;
    newStudent.isAdmin = req.body.isAdmin;


    console.log("student", newStudent);

    newStudent.save(function(err) {
      console.log("err", err);
      if(err) {
        if(err.errors && err.errors.hbId) {
          return res.status(422).send({error: err.errors.hbId.message, body: newStudent});
        }
        return next(err);
      }

      res.json({ studentId: newStudent._id});
    });
  });
};

