import { Router } from "express";

import adminDeleteUserMessage from "../controllers/adminDeleteUserMessage ";

const route = Router();

route.delete("/", adminDeleteUserMessage);

export default route;
