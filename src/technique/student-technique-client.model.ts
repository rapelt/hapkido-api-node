import {Technique} from "../entity/technique";
import {TechniqueSet} from "../entity/technique-set";
import {Media} from "../entity/media";
import {MediaClientModel} from "../media_uploads/media-client.model";
import {QuestionsClientModel} from "../question/questions-client.model";
import {Questions} from "../entity/questions";

export class StudentTechniqueClientModel {
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
    isUnwatched!: boolean;
    isAvailable!: boolean;
    isFavourite!: boolean;
    questions!: QuestionsClientModel[];
    createdAt!: Date;
    updatedAt!: Date;


    dbToClient(db: Technique, unwatchedTechniques: any[],  favourites: any[],  grade: number, questions: Questions[]): StudentTechniqueClientModel {
        const technique = new StudentTechniqueClientModel();

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

        technique.isUnwatched = unwatchedTechniques.findIndex((uqt: any) => {
            return uqt.t_id.id === technique.id;
        }) > -1;

        technique.isFavourite = favourites.findIndex((f: any) => {
            return f.t_id.id === technique.id;
        }) > -1;

        technique.isAvailable = technique.grade <= grade + 1;
        technique.createdAt = db.createdAt;
        technique.updatedAt = db.updatedAt;

        technique.questions = questions.filter((q) => {
            return q.t_id === db.id
        }).map((q) => {
            return new QuestionsClientModel().dbToClient(q);
        });

        return technique;
    }
}
