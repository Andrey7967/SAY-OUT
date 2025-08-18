import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "../config/db";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Не удалось авторизоваться" });
      return;
    }

    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      decoded.userId,
    ]);

    if (!user.rows.length) {
      throw new Error("Пользователь не найден");
    }

    req.body = { ...req.body, ...user.rows[0] };

    next();
  } catch (err) {
    res
      .status(401)
      .json({
        error: err instanceof Error ? err.message : "Ошибка авторизации",
      });
    return;
  }
};

export default authMiddleware;
