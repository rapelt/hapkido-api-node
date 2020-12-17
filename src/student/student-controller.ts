import {NextFunction, Request, Response} from "express";
import {getConnection, getRepository, Repository} from "typeorm";

import {Member} from "../entity/member";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {AdminStudentClientModel} from "./admin-student-client.model";
import {MemberGrade} from "../entity/member-grade";
import {Grade} from "../entity/grade";
import {ClassType} from "../entity/class-type";
import {Family} from "../entity/family";
import {measure} from "../common/performance.decorator";
import {Technique} from "../entity/technique";
import {UnwatchedTechniques} from "../entity/unwatched-techniques";
var authService = require('../cognito/auth-service');

export default class StudentController {

    @DefaultCatch(defaultErrorHandler)
    @measure
    static async getAllStudents(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Member> =  await getRepository('Member');
        const members = await repository.find();

        const clientStudents = members.map((student: Member) => {
            return new AdminStudentClientModel().dbToClient(student);
        })

        res.json(clientStudents);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getStudent(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const student = await repository.findOneOrFail(hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async createNewStudent(req: Request, res: Response, next:NextFunction) {
        const student: AdminStudentClientModel = req.body;

        const repository: Repository<Member> =  await getRepository('Member');
        const classTypeRepository: Repository<ClassType> =  await getRepository('ClassType');
        const techniqueRepo: Repository<Technique> =  await getRepository('Technique');
        const unwatchedRepo: Repository<UnwatchedTechniques> =  await getRepository('UnwatchedTechniques');
        const memberGradeRepo: Repository<MemberGrade> =  await getRepository('MemberGrade');
        const familyRespository: Repository<Family> =  await getRepository('Family');

        const classTypes = await classTypeRepository.find();

        if(student.familyId === null){
            const family = await familyRespository.save({ name: student.name.lastname});
            student.familyId = family.family_id;
        }

        const newMember = new AdminStudentClientModel().clientToDB(student, classTypes);

        const newstudent = await repository.insert(newMember);

        if (student.gradingDates) {
            const {date, grade} = student.gradingDates[0];
            await memberGradeRepo.insert({
                hb_id: student.hbId,
                grade_id: grade,
                date: date
            });
        }

        let techniqueIDs: UnwatchedTechniques[] = [];

        const t_ids = await techniqueRepo.find( { t_grade: student.grade + 1});
        t_ids.forEach((t) => {
            let newUnwatchedTechnique = new UnwatchedTechniques();
            newUnwatchedTechnique.t_id = t.id;
            newUnwatchedTechnique.hb_id = student.hbId;
            techniqueIDs.push(newUnwatchedTechnique);
        })

        await unwatchedRepo.save(techniqueIDs);

        const dbstudent = await repository.findOneOrFail(student.hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(dbstudent);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async updateStudent(req: Request, res: Response, next:NextFunction) {
        const student: AdminStudentClientModel = req.body;
        const classTypeRespository: Repository<ClassType> =  await getRepository('ClassType');
        const classTypes = await classTypeRespository.find();
        const repository: Repository<Member> =  await getRepository('Member');
        const newMember = new AdminStudentClientModel().clientToDB(student, classTypes);
        await repository.update(student.hbId, newMember);

        const dbstudent = await repository.findOneOrFail(student.hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(dbstudent);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async getStudentEmail(req: Request, res: Response, next:NextFunction) {
        const hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const student = await repository.findOneOrFail(hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(student);
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

        next();
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

        next();
    };

    @DefaultCatch(defaultErrorHandler)
    static async addUnwatchedTechniques(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var clientGrades: Array<{hbId: string, grade: number, date: string}> = req.body;

        const memberRepository: Repository<Member> =  await getRepository('Member');
        const techniqueRepo: Repository<Technique> =  await getRepository('Technique');
        const unwatchedRepo: Repository<UnwatchedTechniques> =  await getRepository('UnwatchedTechniques');

        let techniqueIDs: UnwatchedTechniques[] = [];

        if(clientGrades.length >= 1) {
            const t_ids = await techniqueRepo.find( { t_grade: clientGrades[0].grade});
            t_ids.forEach((t) => {
                let newUnwatchedTechnique = new UnwatchedTechniques();
                newUnwatchedTechnique.t_id = t.id;
                newUnwatchedTechnique.hb_id = hbId;
                techniqueIDs.push(newUnwatchedTechnique);
            })
        }

        if(clientGrades.length >= 2) {
            const t_ids = await techniqueRepo.find( { t_grade: clientGrades[1].grade});
            t_ids.forEach((t) => {
                let newUnwatchedTechnique = new UnwatchedTechniques();
                newUnwatchedTechnique.t_id = t.id;
                newUnwatchedTechnique.hb_id = hbId;
                techniqueIDs.push(newUnwatchedTechnique);
            })
        }

        await unwatchedRepo.save(techniqueIDs);

        const student = await memberRepository.findOneOrFail(hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeUnwatchedTechniques(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        var clientGrades: Array<{hbId: string, grade: number, date: string}> = req.body;

        const memberRepository: Repository<Member> =  await getRepository('Member');
        const techniqueRepo: Repository<Technique> =  await getRepository('Technique');
        const unwatchedRepo: Repository<UnwatchedTechniques> =  await getRepository('UnwatchedTechniques');

        const all_t_ids: number[] = [];

        if(clientGrades.length >= 1) {
            const t_ids = await techniqueRepo.find( { t_grade: clientGrades[0].grade});
            t_ids.forEach((t) => {
                all_t_ids.push(t.id);
            })
        }

        if(clientGrades.length >= 2) {
            const t_ids = await techniqueRepo.find( { t_grade: clientGrades[1].grade});
            t_ids.forEach((t) => {
                all_t_ids.push(t.id);
            })
        }

        const uwTechniques = await StudentController.getUWTIds(all_t_ids, hbId);

        await unwatchedRepo.remove(uwTechniques);

        const student = await memberRepository.findOneOrFail(hbId);
        const clientStudent = new AdminStudentClientModel().dbToClient(student);
        res.json(clientStudent);
    };

    static async getUWTIds(ids: number[], hb_id: string) {
        return getRepository(UnwatchedTechniques)
            .createQueryBuilder()
            .where("hb_id = :id", { id: hb_id })
            .andWhere("t_id IN (:...ids)", { ids: ids }).getMany();
    }

    @DefaultCatch(defaultErrorHandler)
    static async deactivateStudent(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        const repository: Repository<Member> =  await getRepository('Member');
        const Members = await repository.update(hbId, { isActive: false});
        res.json({ studentId: hbId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async deactivateStudentFromCognito(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        authService.deactivateStudentAuth(hbId).then(() => {
            next();
        }).catch((err: any) => {
            return res.status(422).send({error: "Something went wrong with disabling student", err});
        })
    };

    @DefaultCatch(defaultErrorHandler)
    static async reactivateStudentFromCognito(req: Request, res: Response, next:NextFunction) {
        var hbId = req.params.id;
        authService.reActivateStudentAuth(hbId).then(() => {
            next();
        }).catch((err: any) => {
            return res.status(422).send({error: "Something went wrong with re-enabling student", err});
        })
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
                next();
            }).catch(() => {
                console.log('OMG something went wrong with the user sign up.');
                return res.status(422).send({error: "Something went wrong"});
            });
    };
}
