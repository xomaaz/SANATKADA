import express from "express";

const router = express.Router();

router.route("/me").get((req,res,next) => { //here router.route("/me") stands for http://localhost:5000/api/v1/user/me
  res.send("ME")
})
;

export default router;
