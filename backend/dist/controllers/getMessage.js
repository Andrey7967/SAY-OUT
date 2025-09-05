"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMessage;
const db_1 = __importDefault(require("../config/db"));
async function getMessage(req, res) {
    try {
        const result = await db_1.default.query("SELECT messages.id, messages.content , users.nickname, users.id AS author_id  FROM messages   JOIN users ON messages.user_id = users.id  ORDER BY created_at DESC LIMIT 50 ");
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}
