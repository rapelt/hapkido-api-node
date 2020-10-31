import {Technique} from "../entity/technique";

export class TechniqueClientModel {
    title!: string;
    id!: number;
    description!: string;
    grade!: number;
    techniqueSet!: number;

    videos!: [];
    photos!: [];
    tags!: number[];

    dbToClient(db: Technique): TechniqueClientModel {
        const technique = new TechniqueClientModel();

        technique.id = db.id;
        technique.description = db.description;
        technique.grade = db.grade.id;
        technique.title = db.title;
        technique.techniqueSet = db.techniqueSet.id;

        technique.tags = db.tags.map((tag) => tag.id);

        return technique;
    }

    clientToDB(client: TechniqueClientModel): Technique {
        const technique = new Technique();

        technique.title = client.title;
        technique.description = client.description;
        technique.t_grade = client.grade;
        technique.t_set = client.techniqueSet;
        technique.id = client.id;

        //Tags

        return technique;
    }
}
