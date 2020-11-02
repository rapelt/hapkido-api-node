import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {Member} from "../entity/member";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {StudentClientModel} from "./client-student.model";
import {MemberGrade} from "../entity/member-grade";
import {Grade} from "../entity/grade";
import {ClassType} from "../entity/class-type";
import {Family} from "../entity/family";
import {measure} from "../common/performance.decorator";
var authService = require('../cognito/auth-service');

export default class StudentController {

    @DefaultCatch(defaultErrorHandler)
    @measure
    static async getAllStudents(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Member> =  await getRepository('Member');
        const members = await repository.find();

        const clientStudents = members.map((student: Member) => {
            return new StudentClientModel().dbToClient(student);
        })

        res.json(clientStudents);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getStudent(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const student = await repository.findOneOrFail(hbId);
        const clientStudent = new StudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createNewStudent(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Member> =  await getRepository('Member');
        const student: StudentClientModel = req.body;
        const classTypeRespository: Repository<ClassType> =  await getRepository('ClassType');
        const classTypes = await classTypeRespository.find();

        const familyRespository: Repository<Family> =  await getRepository('Family');

        if(student.familyId === null){
            const family = await familyRespository.save({ name: student.name.lastname});
            console.log(family);
            student.familyId = family.family_id;
        }

        const newMember = new StudentClientModel().clientToDB(student, classTypes);
        await repository.insert(newMember);

        const dbstudent = await repository.findOneOrFail(student.hbId);
        const clientStudent = new StudentClientModel().dbToClient(dbstudent);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateStudent(req: Request, res: Response, next:NextFunction) {
        console.log(req.body);
        const student: StudentClientModel = req.body;
        const classTypeRespository: Repository<ClassType> =  await getRepository('ClassType');
        const classTypes = await classTypeRespository.find();
        const repository: Repository<Member> =  await getRepository('Member');
        const newMember = new StudentClientModel().clientToDB(student, classTypes);
        await repository.update(student.hbId, newMember);

        const dbstudent = await repository.findOneOrFail(student.hbId);
        const clientStudent = new StudentClientModel().dbToClient(dbstudent);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getStudentEmail(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const student = await repository.findOneOrFail(hbId);
        const clientStudent = new StudentClientModel().dbToClient(student);
        res.json(clientStudent.email);
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeGrading(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<MemberGrade> =  await getRepository('MemberGrade');
        const memberRepository: Repository<Member> =  await getRepository('Member');
        var clientGrades = req.body;
        var hbId = req.params.id;

        if(clientGrades.length >= 1) {
            const grade1 = await repository.findOneOrFail({ hb_id: hbId, grade_id: clientGrades[0].grade});
            await repository.remove(grade1);
        }

        if(clientGrades.length >= 2) {
            const grade2 = await repository.findOneOrFail({ hb_id: hbId, grade_id: clientGrades[1].grade});
            await repository.remove(grade2);
        }

        const student = await memberRepository.findOneOrFail(hbId);
        const clientStudent = new StudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async addGrading(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<MemberGrade> =  await getRepository('MemberGrade');
        const memberRepository: Repository<Member> =  await getRepository('Member');
        const gradeRepository: Repository<Grade> =  await getRepository('Grade');

        var clientGrades: Array<{hbId: string, grade: number, date: string}> = req.body;
        var hbId = req.params.id;

        let student = await memberRepository.findOneOrFail(hbId);

        const grades: Array<MemberGrade> = [];

        if(clientGrades.length >= 1) {
            const grade1 = await gradeRepository.findOneOrFail(clientGrades[0].grade);
            const memberGrade1 = new MemberGrade()
            memberGrade1.hb_id = student.hbId;
            memberGrade1.grade_id = grade1.id;
            memberGrade1.date = new Date(clientGrades[0].date)

            grades.push(memberGrade1);
        }

        if(clientGrades.length >= 2) {
            const grade2 = await gradeRepository.findOneOrFail(clientGrades[1].grade);
            const memberGrade2 = new MemberGrade()
            memberGrade2.hb_id = student.hbId;
            memberGrade2.grade_id = grade2.id
            memberGrade2.date = new Date(clientGrades[1].date)
            grades.push(memberGrade2);
        }

        await repository.save(grades);

        student = await memberRepository.findOneOrFail(hbId);
        const clientStudent = new StudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async deactivateStudent(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const Members = await repository.update(hbId, { isActive: false});
        res.json({ studentId: hbId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async reactivateStudent(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const Members = await repository.update(hbId, { isActive: true});
        res.json({ studentId: hbId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async addToNewApp(req: Request, res: Response, next:NextFunction) {
            console.log("Add Student to new app", req.body);
            var student = req.body;

            authService.createStudentAuth(student.hbId, student.email).then(() => {
                req.params = { id: student.hbId};
                this.getStudent(req, res, next);
            }).catch(() => {
                console.log('OMG something went wrong with the user sign up.');
                return res.status(422).send({error: "Something went wrong"});
            });
    };
}





//
// exports.removeGrading = function(req, res, next){
//     console.log(" Remove Grading from Student", req.body, req.params.id);
//     var grades = req.body;
//     var hbId = req.params.id;
//     var gradePromises = [];
//
//     grades.map((grade)=> {
//     return {
//                 hb_id: hbId,
//                 grade_id: grade.grade
//             }
//     });
//
//     MemberGrade.destroy({
//         where: gradePromises
//     }).then(() => {
//         controller.getStudent(req, res, next);
//     }).catch((err) => {
//         return res.status(422).send({error: "Something went wrong ", err});
//     });
// };
//
// exports.addGrading = function(req, res, next){
//     console.log(" Add Grading to Student", req.body, req.params.id);
//     var grades = req.body;
//     var hbId = req.params.id;
//     var gradePromises = [];
//
//
//     gradePromises = grades.map((grade) => {
//         return {
//             hb_id: hbId,
//             grade_id: grade.grade,
//             class_id: null,
//             date: new Date(grade.date)
//         };
//     });
//
//     MemberGrade.bulkCreate(gradePromises).then(() => {
//         controller.getStudent(req, res, next);
//     }).catch((err) => {
//         return res.status(422).send({error: "Something went wrong ", err});
//     });
// };
//

