import { Request, Response } from 'express'


export default async function getMe(req: Request, res: Response) {
    try {
     
        res.json({ id: req.body.id, nickname: req.body.nickname });

    } catch (err) {
        res.status(400);
    }
}