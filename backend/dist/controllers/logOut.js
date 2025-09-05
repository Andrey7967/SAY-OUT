"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logOut;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const clientsDataFile_1 = require("../clientsDataFile");
async function logOut(req, res) {
    try {
        const token = req.cookies.jwt;
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
        const fakeToken = "lol, there aren't any tokens... but anyway, you are welcome!";
        if (clientsDataFile_1.clients.has(token)) {
            clientsDataFile_1.clients.get(token)?.close();
        }
        res.cookie("jwt", fakeToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 0,
        });
        res.send({ logged: false });
    }
    catch (err) {
        res
            .status(400)
            .send({ error: err instanceof Error ? err.message : "Ошибка выхода" });
    }
}
