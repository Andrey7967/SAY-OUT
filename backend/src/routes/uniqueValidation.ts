import { Router } from "express";

import validateOriginal from "../controllers/uniqueValidation";

const route = Router();

route.get("/:name/:value", validateOriginal);

export default route;
