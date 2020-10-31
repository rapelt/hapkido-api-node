import moment, {Moment} from "moment";
import {Class} from "../entity/class";
import {Member} from "../entity/member";
import {Family} from "../entity/family";
import {ClassType} from "../entity/class-type";
import {MemberGrade} from "../entity/member-grade";

export class StudentClientModel {
    name!: {
        firstname: string,
        lastname: string
    };
    hbId!: string;
    email!: string;
    grade!: number;
    isAdmin!: boolean;
    gradingDates?: {date: Moment, grade: number}[];
    isActive!: boolean;
    preferredClass!: string;
    familyId!: number;
    paymentType?: string;

    dbToClient(db: Member): StudentClientModel {

        // console.log(db);

        const student = new StudentClientModel();

        student.email = db.email;
        student.name = {
            firstname: db.firstname,
            lastname: db.lastname
        };
        student.hbId = db.hbId;
        student.isAdmin = false;
        student.isActive = db.isActive;
        student.preferredClass = db.preferredClass.classType;
        student.familyId = db.family_id;

        student.grade = 0;

        student.gradingDates = db.gradings.map((dbGrading: MemberGrade) => {
            console.log(dbGrading);

            if(student.grade < dbGrading.grade_id) {
                student.grade = dbGrading.grade_id;
            }

            return {
                date: moment(dbGrading.date),
                grade: dbGrading.grade_id
            }
        })

        return student;
    }

    clientToDB(student: StudentClientModel, classTypes: ClassType[]): Member {
        const dbStudent = new Member();


        const classType = classTypes.find((aclassType) => student.preferredClass === aclassType.classType);

        dbStudent.email = student.email;
        dbStudent.firstname = student.name.firstname;
        dbStudent.lastname = student.name.lastname;
        dbStudent.hbId = student.hbId;
        dbStudent.isActive = student.isActive;
        dbStudent.family_id = student.familyId;
        dbStudent.preferred_class_type_id = classType ? classType.id : 0;

        return dbStudent;
    }
}
