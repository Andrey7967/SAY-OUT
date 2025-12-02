import { Router } from "express";

import adminGetUsers from "../controllers/admingetUsers";

const route = Router();

route.get("/", adminGetUsers);

export default route;
