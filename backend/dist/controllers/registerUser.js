"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerUser;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../logic/generateToken");
const clientsDataFile_1 = require("../clientsDataFile");
async function registerUser(req, res) {
    try {
        const { nickname, email, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const result = await db_1.default.query("INSERT INTO users (nickname, email, password) VALUES ($1, $2,$3) RETURNING id, nickname, email", [nickname, email, hashedPassword]);
        const token = (0, generateToken_1.generateToken)(result.rows[0].id);
        const Previostoken = req.cookies.jwt;
        if (Previostoken) {
            if (clientsDataFile_1.clients.has(Previostoken)) {
                clientsDataFile_1.clients.get(Previostoken)?.close();
                clientsDataFile_1.clients.delete(Previostoken);
            }
        }
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
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
    }
    catch (err) {
        res.status(400).send({
            error: err instanceof Error ? err.message : "Ошибка регистрации",
        });
    }
}
