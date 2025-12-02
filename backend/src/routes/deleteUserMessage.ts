import { Router } from "express";
import deleteUserMessage from "../controllers/deleteUserMessage";

const route = Router();

route.delete("/", deleteUserMessage);

export default route;
