import { Request, Response } from "express";

export default async function getMe(req: Request, res: Response) {
  try {
    res.json({
      id: req.body.id,
      nickname: req.body.nickname,
      email: req.body.email,
      role: req.body.role,
    });
  } catch (err) {
    res.status(400);
  }
}
