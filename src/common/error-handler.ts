import {Handler} from "catch-decorator-ts";
import {Request, Response, NextFunction} from "express";

export const defaultErrorHandler: Handler = ((err: Error, ctx, req: Request, res: Response, next: NextFunction, id) => {
    console.log(err, ctx);
    res.status(422).send({error: err.message});
})
