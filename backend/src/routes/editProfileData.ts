import { Router } from "express";
import editProfileData from "../controllers/editProfileData";

const route = Router();

route.put("/", editProfileData);

export default route;
