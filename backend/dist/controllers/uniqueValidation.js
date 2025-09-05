"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateOriginal;
const db_1 = __importDefault(require("../config/db"));
async function validateOriginal(req, res) {
    try {
        const { name, value } = req.params;
        const result = await db_1.default.query(`
    SELECT NOT EXISTS(
    SELECT 1 FROM users WHERE ${name} = $1 
 ) AS result;
 `, [value]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}
