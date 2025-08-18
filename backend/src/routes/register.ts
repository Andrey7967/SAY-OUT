import { Router } from "express";
import registerUser from "../controllers/registerUser";

const route = Router();

route.post('/', registerUser);

export default route;
