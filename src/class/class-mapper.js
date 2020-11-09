function seqClassMapper (seqClass) {
    return {
        classId: seqClass.getDataValue('class_id'),
        isGrading: seqClass.getDataValue('is_grading') === 1,
        date: seqClass.getDataValue('date'),
        classType: seqClass.getDataValue('class_type').class_type,
        attendance: seqClass.getDataValue('members').map((member) => {
            return member.hb_id;
        })
    }
};

module.exports = {
    seqClassMapper: seqClassMapper
};
