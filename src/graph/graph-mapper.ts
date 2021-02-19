import {Member} from "../entity/member";
import {Class} from "../entity/class";
import {MemberGrade} from "../entity/member-grade";
import moment from "moment";

export class GraphMapper {
    mapStudentToGraph(student: Partial<Member>) {
        const newStudent = {
            hbId: student.hbId,
            grade: 0,
            name: student.firstname + ' ' + student.lastname,
            classType: student.preferredClass ? student.preferredClass.classType : ''
        };

        if(student.gradings) {
            student.gradings.map((dbGrading: MemberGrade) => {
                if(newStudent.grade < dbGrading.grade_id) {
                    newStudent.grade = dbGrading.grade_id;
                }
            })
        }

        return newStudent;
    }

    mapClassToGraph(aclass: Partial<Class>) {

        const newClass = {
            classId: aclass.classId,
            date: aclass.date ? new Date(aclass.date) : '',
            attendance: [] as String [],
            classType: aclass.classType ? aclass.classType.classType : ''
        }

        if(aclass.attendance){
            aclass.attendance.map((student) => {
                newClass.attendance.push(student.hb_id);
            });

        }

        return newClass;
    }
}
