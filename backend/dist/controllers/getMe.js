"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMe;
async function getMe(req, res) {
    try {
        res.json({ id: req.body.id, nickname: req.body.nickname });
    }
    catch (err) {
        res.status(400);
    }
}
