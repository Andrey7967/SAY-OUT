import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clients } from "../clientsDataFile";

export default async function logOut(req: Request, res: Response) {
  try {
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    const fakeToken =
      "lol, there aren't any tokens... but anyway, you are welcome!";

    if (clients.has(token)) {
      clients.get(token)?.close();
    }
    res.cookie("jwt", fakeToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    res.send({ logged: false });
  } catch (err) {
    res
      .status(400)
      .send({ error: err instanceof Error ? err.message : "Ошибка выхода" });
  }
}
