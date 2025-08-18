import { Request, Response } from "express";
import pool from "../config/db";

export default async function validateOriginal(req: Request, res: Response) {
  try {
    const { name, value } = req.params;

    const result = await pool.query(
      `
    SELECT NOT EXISTS(
    SELECT 1 FROM users WHERE ${name} = $1 
 ) AS result;
 `,
      [value]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
}
