import { Request, Response } from "express";
import pool from "../config/db";

export default async function adminGetUserMessages(
  req: Request,
  res: Response
) {
  try {
    const result = await pool.query(
      `SELECT 
  messages.id, 
  messages.content,

  COALESCE(users.nickname, 'deleted user') as nickname,
  COALESCE(users.email, 'deleted user') as email,
  users.id as author_id
FROM messages  
LEFT JOIN users ON messages.user_id = users.id
ORDER BY messages.created_at DESC 
`
    );

    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
}
