import { Router } from "express";
import getMe from "../controllers/getMe";

const route = Router();

route.get('/', getMe);

export default route;
