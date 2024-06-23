import express from "express";
import { login, signup } from "../controllers/userController.js";

const router = express.Router();

//router.route("/login").get(login) //here router.route("/me") stands for http://localhost:5000/api/v1/user/me

router.post("/login", login); 

router.post("/signup", signup);

export default router;
