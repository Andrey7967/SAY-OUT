import { Response, Request } from "express";
import pool from "../config/db";

export default async function sendMessage(req: Request, res: Response) {
  try {
    const { id, content } = req.body;

    await pool.query(
      "INSERT INTO messages (user_id,content)  VALUES ($1, $2);",
      [id, content]
    );

    res.status(201).send({ state: true });
  } catch (err) {
    res
      .status(400)
      .send({
        error: err instanceof Error ? err.message : "Ошибка регистрации",
      });
  }
}
