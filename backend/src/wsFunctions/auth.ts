import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
    return true;
  } catch (err) {
    console.log("кто такой?!");
    return false;
  }
}
