import { Router } from "express";

import loginUser from "../controllers/loginUser";

const route = Router();

route.post('/', loginUser);

export default route;
