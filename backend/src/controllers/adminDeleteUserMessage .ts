import { Request, Response } from "express";
import pool from "../config/db";

export default async function adminDeleteUserMessage(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.query.id);
    if (req.body.role !== "admin") {
      res.status(400).json({ status: "forbidden" });
    }
    console.log(req.body.role, "hi");
    const result = await pool.query("DELETE FROM messages WHERE    id = $1", [
      id,
    ]);

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400);
  }
}
