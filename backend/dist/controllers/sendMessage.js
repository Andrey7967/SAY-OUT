"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendMessage;
const db_1 = __importDefault(require("../config/db"));
async function sendMessage(req, res) {
    try {
        const { id, content } = req.body;
        await db_1.default.query("INSERT INTO messages (user_id,content)  VALUES ($1, $2);", [id, content]);
        res.status(201).send({ state: true });
    }
    catch (err) {
        res
            .status(400)
            .send({
            error: err instanceof Error ? err.message : "Ошибка регистрации",
        });
    }
}
