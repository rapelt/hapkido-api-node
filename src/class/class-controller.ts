import {Request, Response, NextFunction} from "express";
import {getRepository, Repository} from "typeorm";

import {Class} from "../entity/class";
import {DefaultCatch} from 'catch-decorator-ts'
import {defaultErrorHandler} from '../common/error-handler';
import {ClientClass} from "./client-class.model";
import {Member} from "../entity/member";

export default class ClassController {

    @DefaultCatch(defaultErrorHandler)
    static async getAllClasses(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Class> = await getRepository('Class');
        const classes: Array<Class> = await repository.find();

        const clientClasses = classes.map((aclass: Class) => {
            return new ClientClass().dbToClient(aclass);
        })

        res.json(clientClasses);
    };

    @DefaultCatch(defaultErrorHandler)
    static async deleteClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        const repository: Repository<Class> =  await getRepository('Class');
        await repository.softDelete(classId);
        return res.status(200).send({classid: classId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async addToClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        var hbId = req.body.studentId;
        const repository: Repository<Class> =  await getRepository('Class');
        const studentRepository: Repository<Member> =  await getRepository('Member');
        const student: Member = await studentRepository.findOneOrFail(hbId);
        await repository.update(classId, {attendance: [student]})

        return res.status(200).send({classid: classId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeFromClass(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        var hbId = req.body.studentId;
        const repository: Repository<Class> =  await getRepository('Class');
        const aclass = await repository.findOneOrFail(classId);

        aclass.attendance = aclass.attendance.filter(member => member.hbId !== hbId)

        await repository.save(aclass);

        return res.status(200).send({classid: classId});
    };

    @DefaultCatch(defaultErrorHandler)
    static async makeClassAGrading(req: Request, res: Response, next:NextFunction) {
        var classId = req.params.id;
        const repository: Repository<Class> =  await getRepository('Class');
        await repository.update({ classId: classId }, { isGrading: true });
        return res.status(200).send({message: "Class " + classId + " has been made a grading "});
    };

    @DefaultCatch(defaultErrorHandler)
    static async createClasses(req: Request, res: Response, next:NextFunction) {
        const repository: Repository<Class> =  await getRepository('Class');
        // const tags = await repository.find();
        // res.json(tags);

        var classes = req.body.classes;
        console.log(classes);

        if(classes.length === 0){
            return res.status(422).send({error: "no classes found"});
        }

        const dbClasses = classes.map((aclass: ClientClass) => {
            return new ClientClass().clientToDB(aclass);
        });

        await repository.insert(dbClasses);

        res.status(200).send({errors: 'errors', classes: 'classesCreated', classesNotCreated: 'classesNotCreated'});
    };
}



//
// exports.addToClass = function (req, res, next) {
//     var classId = req.params.id;
//     var hbId = req.body.studentId;
//     console.log("add to class", classId, hbId);
//
//     Class.findByPk(classId).then((aclass) => {
//         console.log(aclass);
//
//         Member.findByPk(hbId).then((member) => {
//             aclass.addMember(member);
//             return res.status(200).send({message: "Student " + hbId + " has been added to class " + classId, studentId: hbId});
//         }).catch((err) => {
//             return res.status(422).send({error: err});
//         });
//     }).catch((err) => {
//         return res.status(422).send({error: err});
//     });
// };
//
// exports.removeFromClass = function (req, res, next) {
//     var classId = req.params.id;
//     var hbId = req.body.studentId;
//     console.log("remove from class", classId, hbId);
//
//     Class.findByPk(classId).then((aclass) => {
//         console.log(aclass);
//
//         Member.findByPk(hbId).then((member) => {
//             aclass.removeMember(member);
//             return res.status(200).send({message: "Student " + hbId + " has been removed to class " + classId, studentId: hbId});
//         }).catch((err) => {
//             return res.status(422).send({error: err});
//         });
//     }).catch((err) => {
//         return res.status(422).send({error: err});
//     });
// };
//
// exports.makeClassAGrading = function (req, res, next) {
//     var classId = req.params.id;
//     console.log("Make class a grading", classId);
//
//     Class.findByPk(classId).then((aclass) => {
//         aclass.update({
//             is_grading: true
//         }).then(() => {
//                 return res.status(200).send({message: "Class " + classId + " has been made a grading "});
//         })
//             .catch((err) => {
//                 return res.status(422).send({error: err});
//             });;
//     }).catch((err) => {
//         return res.status(422).send({error: err});
//     });
// };
//
//
//
//
//
//
// var classesindex = 0;
// var classesCreated = [];
// var errors = [];
// var classesNotCreated = [];
//
//
// exports.createClasses = function (req, res, next) {
//     classesindex = 0;
//     classesCreated = [];
//     errors = [];
//     classesNotCreated = [];
//
//     console.log("Create Classes", req.body);
//     var classes = req.body.classes;
//
//     if (classes) {
//         createClassesLoop(classes, res);
//     } else {
//         return res.status(422).send({error: "no classes found"});
//     }
// };
//
// function createClassesLoop(classes, res){
//     if(classesindex < classes.length){
//         classesCreation(classes[classesindex]).then((result) => {
//             classes[classesindex].classId = result;
//             classesCreated.push(classes[classesindex]);
//             classesindex++;
//             createClassesLoop(classes, res);
//         }).catch((err) => {
//             classesNotCreated.push(classes[classesindex]);
//             errors.push(err);
//             classesindex++;
//             createClassesLoop(classes, res);
//         });
//     } else {
//         res.status(200).send({errors: errors, classes: classesCreated, classesNotCreated: classesNotCreated});
//     }
// }
//
// function classesCreation(aclass) {
//     return new Promise((resolve, reject) => {
//         ClassType.findAll({
//             where: {
//                 class_type: aclass.classType
//             }
//         }).then((results) => {
//             Class.create({
//                 is_grading: aclass.isGrading,
//                 date: new Date(aclass.date),
//                 class_type_id: results[0].getDataValue('class_type_id')
//             }).then((result) => {
//                 resolve(result);
//             }).catch((err) => {
//                 console.log(err);
//                 reject(err);
//             });
//         }).catch((err) => {
//             console.log(err);
//             reject(err);
//         });
//     });
// };
//
