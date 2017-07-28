var expect = require('chai').expect;

var AClass = require('../../class/class');

describe('Student model', function() {
    var aclass;

    beforeEach(function () {
        aclass = new AClass();
    });

    it('Should be invalid if classId is empty', function(done) {
        aclass.validate(function(err) {
            expect(err.errors.classId).to.exist;
            expect(err.errors.classId.message).to.equal("ClassId is required.");
            done();
        });
    });

    it('Should be invalid if pin number is empty', function(done) {
        aclass.validate(function(err) {
            expect(err.errors.isGrading).to.exist;
            expect(err.errors.isGrading.message).to.equal("Is grading is required");
            done();
        });
    });

    it('Should be invalid if grade is empty', function(done) {
        aclass.validate(function(err) {
            expect(err.errors.date).to.exist;
            expect(err.errors.date.message).to.equal("Date is required");
            done();
        });
    });

    it('Should be invalid if admin is empty', function(done) {
        aclass.validate(function(err) {
            expect(err.errors.startTime).to.exist;
            expect(err.errors.startTime.message).to.equal("Start time is required");
            done();
        });
    });
});