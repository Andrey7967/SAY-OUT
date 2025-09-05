"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uniqueValidation_1 = __importDefault(require("../controllers/uniqueValidation"));
const route = (0, express_1.Router)();
route.get("/:name/:value", uniqueValidation_1.default);
exports.default = route;
