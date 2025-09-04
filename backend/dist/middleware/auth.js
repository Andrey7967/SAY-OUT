"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ error: "Не удалось авторизоваться" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
        const user = await db_1.default.query("SELECT * FROM users WHERE id = $1", [
            decoded.userId,
        ]);
        if (!user.rows.length) {
            throw new Error("Пользователь не найден");
        }
        req.body = { ...req.body, ...user.rows[0] };
        next();
    }
    catch (err) {
        res
            .status(401)
            .json({
            error: err instanceof Error ? err.message : "Ошибка авторизации",
        });
        return;
    }
};
exports.default = authMiddleware;
