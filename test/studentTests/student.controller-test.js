var expect = require('chai').expect;
var sinon = require('sinon');

var studentController = require('../../student/student-controller');
var Student = require('../../student/student');

describe('routes', function() {

    
    const existingStudent = new Student({
        hbId: 'hb030',
        name: {
            firstname: 'rebekah',
            lastname: 'apelt'
        },
        pinNumber: '2222',
        grade: '3',
        isAdmin: false
    });
    
    it('should get all Students', function() {
        sinon.stub(Student, 'find');

        var a = { name: 'a' };
        var b = { name: 'b' };
        var expectedModels = {students: [a, b]};
        Student.find.yields(null, expectedModels);
        var req = { params: { } };
        var res = {
            send: sinon.stub(),
            json: sinon.stub()
        };

        studentController.getAllStudents(req, res);

        sinon.assert.calledWith(res.json, expectedModels);

        Student.find.restore();
    });

    it('should get 1 Student', function() {
        sinon.stub(Student, 'findOne');

        var a = { name: 'a', hbid: 'hb040' };
        var b = { name: 'b', hbid: 'hb030' };
        var expectedModels = {students: [a, b]};
        Student.findOne.yields(null, expectedModels);
        var req = { params: { id: 'hb030'} };
        var res = {
            send: sinon.stub(),
            json: sinon.stub()
        };

        studentController.getStudent(req, res);

        sinon.assert.calledWith(res.json, expectedModels);

        Student.findOne.restore();
    });
});