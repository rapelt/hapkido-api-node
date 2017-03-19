var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  hbId: {
    type: String,
    required: 'hbId is required.',
    lowercase: true
  },
  firstname: {
    type: String,
    required: 'First name is required.',
    lowercase: true
  },
  lastname: {
    type: String,
    required: 'First name is required.',
    lowercase: true
  }
});

var Student = mongoose.model('student', studentSchema);

module.exports = Student;