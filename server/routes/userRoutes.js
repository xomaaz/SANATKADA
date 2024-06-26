import express from "express";
import { changePassword, getMyProfile, logOut, login, signup, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

//router.route("/login").get(login) //here router.route("/me") stands for http://localhost:5000/api/v1/user/me

router.post("/login", login); 

router.post("/signup", signup);

router.get("/me", isAuthenticated, getMyProfile); // if next is used in isAuthenticated, only then getMyProfile will be invoked

router.get("/logout", isAuthenticated, logOut);


// Updating routes
router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/changepassword", isAuthenticated, changePassword);

export default router;
