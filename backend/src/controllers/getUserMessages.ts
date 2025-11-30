

import { Request, Response } from "express";
import pool from "../config/db";

export default async function getUserMessages(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT messages.id, messages.content  FROM messages   JOIN users ON messages.user_id = users.id  ORDER BY created_at DESC "
    ,[req.body.id]);

    res.json({messages: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
}
