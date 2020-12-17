import {Technique} from "../entity/technique";
import {Questions} from "../entity/questions";
import {LikedQuestions} from "../entity/question-likes";

export class QuestionsClientModel {
    id!: number;
    t_id!: number;
    hb_id!: string;
    student!: string;
    replay_id!: number | null;
    question_text!: string;
    createdAt!: Date;
    likes!: string[];

    dbToClient(db: Questions): QuestionsClientModel {
        const q = new QuestionsClientModel();
        q.hb_id = db.hb_id;
        q.id = db.id;
        q.t_id = db.t_id;
        q.student = db.hbId.firstname;
        q.replay_id = db.reply_id;
        q.question_text = db.question_text;
        q.createdAt = db.createdAt;

        q.likes = db.likes.map((l: LikedQuestions) => {
            return l.hb_id;
        });

        return q;
    }

    clientToDB(client: QuestionsClientModel): Questions {
        const question = new Questions();

        question.question_text = client.question_text;
        question.reply_id = client.replay_id;
        question.hb_id = client.hb_id;
        question.t_id = client.t_id;

        return question;
    }
}
