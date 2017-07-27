var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    classId: {
        type: String,
        required: [true, 'ID is required.'],
        lowercase: true,
        trim: true
    },
    classType: {
        type: String,
        required: [true, 'Class type is required.'],
    },
    attendance: [{
        studentId: {
            type: String,
        }
    }],
    isGrading: {
        type: Boolean,
        required: [true, 'Is grading is required'],
    },
    date: {
        type: Object,
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    }
});

var AClass = mongoose.model('class', classSchema);

module.exports = AClass;