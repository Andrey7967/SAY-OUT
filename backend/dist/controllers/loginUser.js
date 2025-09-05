"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loginUser;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../logic/generateToken");
const clientsDataFile_1 = require("../clientsDataFile");
async function loginUser(req, res) {
    try {
        const Previostoken = req.cookies.jwt;
        const { email, password } = req.body;
        const user = await db_1.default.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (!user.rows.length) {
            throw new Error("Uncorrect email or password");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.rows[0].password);
        if (!isMatch) {
            throw new Error("Uncorrect email or password");
        }
        if (Previostoken) {
            if (clientsDataFile_1.clients.has(Previostoken)) {
                clientsDataFile_1.clients.get(Previostoken)?.close();
                clientsDataFile_1.clients.delete(Previostoken);
            }
        }
        const token = (0, generateToken_1.generateToken)(user.rows[0].id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
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
    }
    catch (err) {
        res
            .status(400)
            .send({ error: err instanceof Error ? err.message : "Access Error" });
    }
}
