import moment, {Moment} from "moment";
import {Class} from "../entity/class";
import {ClassType} from "../entity/class-type";

export class ClientClass {
    classId!: number;
    classType!: string;
    attendance!: string[];
    isGrading!: boolean;
    date!: string;

    dbToClient(db: Class): ClientClass {
         const client = new ClientClass();

         client.classId = db.classId;
         client.classType = db.classType.classType;
         client.date = db.date.toISOString();
         client.isGrading = db.isGrading;
         client.attendance = db.attendance.map((member) => member.hb_id.toLowerCase());

        return client;
    }

    clientToDB(aclass: ClientClass, classType: ClassType): Class {
        const newAClass =  new Class();

        newAClass.classType = classType;
        newAClass.attendance = [];
        newAClass.isGrading = aclass.isGrading;
        newAClass.date = new Date(aclass.date);

        return newAClass;
    }
}
