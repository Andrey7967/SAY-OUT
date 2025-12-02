import { Request, Response } from "express";
import pool from "../config/db";

export default async function deleteUserMessage(req: Request, res: Response) {
  try {
    const id = Number(req.query.id);
    console.log(id);
    console.log(req.body.id);
    const result = await pool.query(
      "DELETE FROM messages WHERE user_id = $1 AND  id = $2",
      [req.body.id, id]
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400);
  }
}
