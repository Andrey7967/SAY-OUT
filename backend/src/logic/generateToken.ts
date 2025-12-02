import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../env") });

export const generateToken = (userId: number, role: "admin" | "user") => {
  return jwt.sign({ userId, role }, String(process.env.JWT_SECRET), {
    expiresIn: "24h",
  });
};
