import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
import { getAllProducts, getProductDetails } from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.route("/single/:id").get(getProductDetails);

export default router;
