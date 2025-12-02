import { Request, Response } from "express";
import pool from "../config/db";

export default async function editProfileData(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const { EditNickname, EditEmail } = req.body;

    console.log(id);

    console.log(EditNickname);
    console.log(EditEmail);

    const result = await pool.query(
      `UPDATE users
SET nickname = $1,
 email = $2

WHERE id = $3;`,

      [EditNickname, EditEmail, id]
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400);
  }
}
