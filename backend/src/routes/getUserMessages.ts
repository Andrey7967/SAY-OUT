import { Router } from "express";
import getUserMessages from "../controllers/getUserMessages";

const route = Router();

route.get('/', getUserMessages);

export default route;
