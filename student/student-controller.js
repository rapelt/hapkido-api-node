var Student = require('./student');

exports.getAllStudents = function (req, res, next) {
    Student.find({}, function (err, students) {
        console.log("Finding all students");
        if(err) {
            return next(err);
        }

        if (students) {
            res.json(students);
        } else {
            return res.status(422).send({error: "no students found"});
        }
    });
};

exports.getStudent = function (req, res, next) {
    var hbId = req.params.id;
    console.log("get Student",hbId);

    Student.findOne({hbId: hbId}, function (err, student) {
        if(err) {
          console.log("-----error-----", err);
          return next(err);
        }

        if (student) {
          res.json(student);
        } else {
          return res.status(422).send({error: "no student found"});
        }
    });
};

exports.deleteStudent = function (req, res, next) {
  var hbId = req.params.id;
  console.log("Delete student", hbId);

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
  console.log("Create Student", req.body);
  var hbId = req.body.hbId;

  Student.findOne({hbId: hbId}, function (err, existingStudent) {
    if(err) {
      console.log(err);
      return next(err);
    }
    if(existingStudent){
      return res.status(422).send({error: "hbId is in use"});
    }

    var newStudent = new Student ();
    console.log("Add new Student Body", req.body);

    newStudent.name.firstname = req.body.name.firstname;
    newStudent.name.lastname = req.body.name.lastname;
    newStudent.hbId = req.body.hbId;
    newStudent.pinNumber = "0000";
    newStudent.grade = req.body.grade;
    newStudent.isAdmin = req.body.isAdmin;

    console.log("student", newStudent);

    newStudent.save(function(err) {
      if(err) {
          console.log("err", err);
          if(err.errors && err.errors.hbId) {
          return res.status(422).send({error: err.errors.hbId.message, body: newStudent});
        }
        return next(err);
      }

      res.json({ studentId: newStudent._id});
    });
  });
};

exports.updateStudent = function (req, res, next) {
    console.log("Update Student", req.body);
    var hbId = req.body.hbId;

    Student.findOne({hbId: hbId}, function (err, existingStudent) {
        if(err) {
            console.log(err);
            return next(err);
        }
        if(existingStudent){
            if(existingStudent.name.firstname !== req.body.name.firstname){
                existingStudent.name.firstname = req.body.name.firstname;
            }

            if(existingStudent.name.lastname !== req.body.name.lastname){
                existingStudent.name.lastname = req.body.name.lastname;
            }

            if(existingStudent.pinNumber !== req.body.pinNumber){
                existingStudent.pinNumber = req.body.pinNumber;
            }

            if(existingStudent.grade !== req.body.grade){
                existingStudent.grade = req.body.grade;
            }

            existingStudent.save(function(err) {
                if(err) {
                    console.log("err", err);
                    if(err.errors && err.errors.hbId) {
                        return res.status(422).send({error: err.errors.message, body: existingStudent});
                    }
                    return next(err);
                }

                res.json({ studentId: existingStudent._id});
            });
        }
    });
};

exports.addToClass = function (req, res, next) {
    var hbId = req.params.id;
    var classId = req.body.classId;
    console.log("add to class", classId, hbId);

    Student.findOne({hbId: hbId}, function (err, student) {
        if(err) {
            return next(err);
        }

        if(student.classes.length > 0){
            var studentAlreadyAttended = false;
            student.classes.forEach((aclass)=>{
                if(classId === aclass){
                    studentAlreadyAttended = true;
                }
            });

            if(studentAlreadyAttended){
                return res.status(422).send({error: "Student is already in attendance"});
            } else {
                student.classes.push(hbId);
            }

        } else {
            student.classes.push(classId);
        }

        student.save(function (err) {
            if (err) {
                return res.status(422).send({error: err});
            }
            return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId});
        });
    });
};


exports.removeFromClass = function (req, res, next) {
    var hbId = req.params.id;
    var classId = req.body.classId;
    console.log("remove from class", classId, hbId);

    Student.findOne({hbId: hbId}, function (err, student) {
        if(err) {
            return next(err);
        }

        if(student.classes.length > 0){
            var studentAlreadyAttended = false;
            var index = null;
            student.classes.forEach((aclassId, i)=>{
                if(aclassId === classId){
                    studentAlreadyAttended = true;
                    index = i;
                }
            });

            if(studentAlreadyAttended){
                student.classes.splice(index, 1);
            } else {
                return res.status(422).send({error: "Student is not in attendance"});
            }

        } else {
            return res.status(422).send({error: "Student is not in attendance"});
        }

        student.save(function (err) {
            if (err) {
                return res.status(422).send({error: err});
            }
            return res.status(200).send({message: "Student " + hbId + " has been removed from class " + classId});
        });
    });
};



