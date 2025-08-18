import { Router } from "express";

import logOut from "../controllers/logOut";

const route = Router();

route.post('/', logOut);

export default route;
