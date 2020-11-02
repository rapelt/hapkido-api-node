import moment, {Moment} from "moment";
import {Class} from "../entity/class";
import {ClassType} from "../entity/class-type";
import {ClientClass} from "./client-class.model";

export class classCreaterVariables {
    classesindex = 0;
    classesCreated: ClientClass[] = [];
    errors: Error[] = [];
    classesNotCreated: ClientClass[] = [];
}
