var expect = require('chai').expect;

var Student = require('../../student/student');

describe('Student model', function() {
    var student;

    beforeEach(function () {
        student = new Student();
    });

    it('Should be invalid if hbid is empty', function(done) {
        student.validate(function(err) {
            expect(err.errors.hbId).to.exist;
            expect(err.errors.hbId.message).to.equal("hbId is required.");
            done();
        });
    });

    it('Should be invalid if pin number is empty', function(done) {
        student.validate(function(err) {
            expect(err.errors.pinNumber).to.exist;
            expect(err.errors.pinNumber.message).to.equal("Pin Number is required.");
            done();
        });
    });

    it('Should be invalid if grade is empty', function(done) {
        student.validate(function(err) {
            expect(err.errors.grade).to.exist;
            expect(err.errors.grade.message).to.equal("A grade is required");
            done();
        });
    });

    it('Should be invalid if admin is empty', function(done) {
        student.validate(function(err) {
            expect(err.errors.isAdmin).to.exist;
            expect(err.errors.isAdmin.message).to.equal("Is Admin is required");
            done();
        });
    });
});