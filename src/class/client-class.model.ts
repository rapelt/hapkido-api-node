import moment, {Moment} from "moment";
import {Class} from "../entity/class";

export class ClientClass {
    classId!: number;
    classType!: string;
    attendance!: string[];
    isGrading!: boolean;
    date!: Moment;

    dbToClient(db: Class): ClientClass {
         const client = new ClientClass();

         client.classId = db.classId;
         client.classType = db.classType.classType;
         client.date = moment(db.date);
         client.isGrading = db.isGrading;
         client.attendance = [];

        return client;
    }

    clientToDB(aclass: ClientClass): Class {
        return new Class();
    }
}
