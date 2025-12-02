import { Request, Response } from "express";
import pool from "../config/db";

export default async function adminDeleteUsers(req: Request, res: Response) {
  try {
    const id = Number(req.query.id);
    if (req.body.role !== "admin") {
      res.status(400).json({ status: "forbidden" });
    }
    console.log(req.query.id, "hidsf");
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Пользователь не найден");
    }

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400);
  }
}
