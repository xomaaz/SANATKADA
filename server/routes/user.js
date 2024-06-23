import express from "express";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.route("/me").get(getMyProfile) //here router.route("/me") stands for http://localhost:5000/api/v1/user/me
;
 
export default router;
