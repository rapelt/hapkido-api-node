var mongoose = require('mongoose');
require('mongoose-moment')(mongoose);
var Schema = mongoose.Schema;

var classSchema = new Schema({
    classId: {
        type: String,
        required: [true, 'ClassId is required.'],
        lowercase: true,
        trim: true
    },
    classType: {
        type: String,
        required: [true, 'Class type is required.'],
    },
    attendance: [],
    isGrading: {
        type: Boolean,
        required: [true, 'Is grading is required'],
    },
    date: {
        type: 'Moment',
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    }
});

var AClass = mongoose.model('class', classSchema);

module.exports = AClass;