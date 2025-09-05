import { Response, Request } from "express";
import pool from "../config/db";

import bcrypt from "bcrypt";
import { generateToken } from "../logic/generateToken";
import { clients } from "../clientsDataFile";

export default async function registerUser(req: Request, res: Response) {
  try {
    const { nickname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (nickname, email, password) VALUES ($1, $2,$3) RETURNING id, nickname, email",
      [nickname, email, hashedPassword]
    );

    const token = generateToken(result.rows[0].id);

    const Previostoken = req.cookies.jwt;
    if (Previostoken) {
      if (clients.has(Previostoken)) {
        clients.get(Previostoken)?.close();
        clients.delete(Previostoken);
      }
    }
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
      path: "/",
    });
    res.status(201).send({
      user: {
        id: result.rows[0].id,
        nickname: result.rows[0].nickname,
        email: result.rows[0].email,
      },
    });
  } catch (err) {
    res.status(400).send({
      error: err instanceof Error ? err.message : "Ошибка регистрации",
    });
  }
}
