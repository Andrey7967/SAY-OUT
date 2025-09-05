import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../logic/generateToken";
import { clients } from "../clientsDataFile";

export default async function loginUser(req: Request, res: Response) {
  try {
    const Previostoken = req.cookies.jwt;
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows.length) {
      throw new Error("Uncorrect email or password");
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      throw new Error("Uncorrect email or password");
    }

    if (Previostoken) {
      if (clients.has(Previostoken)) {
        clients.get(Previostoken)?.close();
        clients.delete(Previostoken);
      }
    }
    const token = generateToken(user.rows[0].id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 3600000,

      path: "/",
    });

    res.send({
      user: {
        id: user.rows[0].id,
        nickname: user.rows[0].nickname,
        isLogged: true,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    res
      .status(400)
      .send({ error: err instanceof Error ? err.message : "Access Error" });
  }
}
