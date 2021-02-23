import {Request, Response, NextFunction} from "express";
import {Between, getRepository, Repository} from "typeorm";

import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {Family} from "../entity/family";
import {Member} from "../entity/member";
import {AdminStudentClientModel} from "../student/admin-student-client.model";
import {Class} from "../entity/class";
import {ClientClass} from "../class/client-class.model";
import {GraphMapper} from "./graph-mapper";

export default class GraphController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllData(req: Request, res: Response, next:NextFunction) {
        const studentRepository: Repository<Member> =  await getRepository('Member');
        const classRepository: Repository<Class> = await getRepository('Class');

        const members = await studentRepository.find({ select: ['hbId', 'firstname', 'lastname'], relations: ['gradings', 'preferredClass']});
        const classes: Array<Class> = await classRepository.find( { select: ['classId', 'date'], relations: ['attendance', 'classType']});

        const clientStudents = members.map((student: Member) => {
            return new GraphMapper().mapStudentToGraph(student);
        })

        const clientClasses = classes.map((aclass: Class) => {
            return new GraphMapper().mapClassToGraph(aclass);
        })

        res.json({classes: clientClasses, students: clientStudents});
    };

    static async getDataBetweenDates(req: Request, res: Response, next:NextFunction) {
        const dates = req.body;
        const start = new Date(dates.start);
        const finish = new Date(dates.finish);
        console.log(start, finish)

        const studentRepository: Repository<Member> =  await getRepository('Member');
        const classRepository: Repository<Class> = await getRepository('Class');

        const members = await studentRepository.find({ select: ['hbId', 'firstname', 'lastname'], relations: ['gradings', 'preferredClass']});
        const classes: Array<Class> = await classRepository.find(
            {
                select: ['classId', 'date'], relations: ['attendance', 'classType'],
                where: [{'date': Between(start, finish)}]
            });

        const clientStudents = members.map((student: Member) => {
            return new GraphMapper().mapStudentToGraph(student);
        })

        const clientClasses = classes.map((aclass: Class) => {
            return new GraphMapper().mapClassToGraph(aclass);
        })

        res.json({classes: clientClasses, students: clientStudents});
    };
}

