import {Technique} from "../entity/technique";
import {TechniqueSet} from "../entity/technique-set";
import {Media} from "../entity/media";
import {MediaClientModel} from "../media_uploads/media-client.model";

export class TechniqueClientModel {
    title!: string;
    id!: number;
    description!: string;
    grade!: number;
    techniqueSet!: {
        name: string,
        id: number
    };

    videos!: [];
    photos!: [];
    tags!: number[];
    media!: MediaClientModel[];


    dbToClient(db: Technique): TechniqueClientModel {
        const technique = new TechniqueClientModel();

        technique.id = db.id;
        technique.description = db.description;
        technique.grade = db.grade.id;
        technique.title = db.title;
        technique.techniqueSet = {
            id: db.techniqueSet.id,
            name: db.techniqueSet.name
        }

        technique.tags = db.tags.map((tag) => tag.id);
        technique.media = db.media.map((m) => {
            return new MediaClientModel().dbToClient(m);
        });

        return technique;
    }

    clientToDB(client: TechniqueClientModel): Technique {
        const technique = new Technique();

        technique.title = client.title;
        technique.description = client.description;
        technique.t_grade = client.grade;
        technique.t_set = client.techniqueSet.id;
        technique.id = client.id;

        //Tags

        return technique;
    }
}
