import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../env') });

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, String(process.env.JWT_SECRET), {
    expiresIn: '24h',
  });
};