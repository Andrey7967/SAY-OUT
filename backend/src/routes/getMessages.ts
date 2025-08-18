import { Router } from "express";

import getMessage from "../controllers/getMessage";

const route = Router();

route.get("/", getMessage);

export default route;
