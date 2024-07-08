import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
import { createProduct, getAllProducts, getProductDetails } from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.route("/single/:id").get(getProductDetails);

router.post("/new", isAuthenticated, singleUpload, createProduct);

export default router;
