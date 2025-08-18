import { Router } from "express";
import sendMessage from "../controllers/sendMessage";

const route = Router();

route.post('/', sendMessage);

export default route;
