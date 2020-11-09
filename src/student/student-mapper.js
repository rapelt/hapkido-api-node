function seqMapStudents(student) {
    var last_grade = 0;

    var gradingDates = student.grades.map((grade) => {
        if(last_grade < grade.getDataValue('member_grade').grade_id){
            last_grade = grade.getDataValue('member_grade').grade_id;
        }

        return {
            date: grade.getDataValue('member_grade').date,
            grade: grade.getDataValue('member_grade').grade_id,
        }
    });

    var newStudent =  {
        preferredClass: student.class_type ? student.class_type.class_type: 1,
        isKumdoStudent: student.is_kumdo_student === 1,
        isActive: student.is_active === 1,
        isAdmin: false,
        grade: last_grade,
        email: student.email,
        hbId: student.hb_id,
        familyId: student.family.family_id,
        gradingDates: gradingDates,
        name: {
            firstname: student.first_name,
            lastname: student.last_name
        }
    }
    return newStudent;
};

module.exports = {
    seqMapStudents: seqMapStudents
};
