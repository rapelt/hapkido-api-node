import {DefaultCatch} from "catch-decorator-ts";
import {defaultErrorHandler} from "../common/error-handler";
import {getRepository, Repository} from "typeorm";
import {Questions} from "../entity/questions";
import {NextFunction, Request, Response} from "express";
import {QuestionsClientModel} from "./questions-client.model";
import {LikedQuestions} from "../entity/question-likes";


export default class QuestionController {
    @DefaultCatch(defaultErrorHandler)
    static async addQuestion(req: Request, res: Response, next:NextFunction) {
        console.log(req.body.question);
        const question: QuestionsClientModel = req.body.question;
        const questionsRepo: Repository<Questions> =  await getRepository('Questions');

        const dbQuestion: Questions = new QuestionsClientModel().clientToDB(question);

        const questions = await questionsRepo.save(dbQuestion);

        const newQuestion = await questionsRepo.findOneOrFail(questions.id);

        const clientQuestion: QuestionsClientModel = new QuestionsClientModel().dbToClient(newQuestion);

        res.json(clientQuestion);
    };

    @DefaultCatch(defaultErrorHandler)
    static async likeQuestion(req: Request, res: Response, next:NextFunction) {
        console.log(req.params.id);
        console.log(req.body);

        const questionId = req.params.id;
        const hb_id = req.body.hb_id;

        const likedQuestionsRepo: Repository<LikedQuestions> =  await getRepository('LikedQuestions');

        const liked = new LikedQuestions();
        liked.question_id = questionId;
        liked.hb_id = hb_id;
        const likedQuestion = await likedQuestionsRepo.save(liked);

        res.json(likedQuestion);
    };

    @DefaultCatch(defaultErrorHandler)
    static async removeLikedQuestion(req: Request, res: Response, next:NextFunction) {
        console.log(req.params.id);
        console.log(req.body);

        const questionId = req.params.id;
        const hb_id = req.body.hb_id;

        const likedQuestionsRepo: Repository<LikedQuestions> =  await getRepository('LikedQuestions');
        const remove = await likedQuestionsRepo.findOneOrFail({ question_id: questionId, hb_id: hb_id});
        const removedQuestion = await likedQuestionsRepo.remove(remove);

        res.json(removedQuestion);
    };
}

