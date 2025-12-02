import { Request, Response } from "express";
import pool from "../config/db";

export default async function adminGetUsers(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT id, nickname, email FROM users  ORDER BY nickname DESC "
    );

    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
}
