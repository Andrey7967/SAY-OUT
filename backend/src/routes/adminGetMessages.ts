import { Router } from "express";
import adminGetUserMessages from "../controllers/admingetUserMessages";

const route = Router();

route.get("/", adminGetUserMessages);

export default route;
