import { Router } from "express";

import adminDeleteUsers from "../controllers/adminDeleteUsers";

const route = Router();

route.delete("/", adminDeleteUsers);

export default route;
