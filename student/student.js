var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateHbId = hbId => (/hb+\d{3}$/).test(hbId);

var validatePinNumber = pinNumber => (/^[0-9]{4}$/).test(pinNumber);

var studentSchema = new Schema({
  name : {
    firstname: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true
    }
  },
  hbId: {
    type: String,
    required: [true, 'hbId is required.'],
    lowercase: true,
    validate: [validateHbId, 'Hapkido Brisbane Id must start with a hb and end in a 3 digit number'],
    trim: true
  },
  pinNumber: {
    type: String,
    required: [true, 'Pin Number is required.'],
    validate: [validatePinNumber, 'A pin number must be 4 numbers'],
  },
  grade: {
    type: Number,
    required: [true, 'A grade is required'],
    trim: true,
    lowercase: true
  },
  isAdmin: {
    type: Boolean,
    required: [true, 'Is Admin is required'],
  },
  gradingDates: [],
  feedback: []

});

var Student = mongoose.model('student', studentSchema);

module.exports = Student;