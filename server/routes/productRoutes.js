import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
import { addProductImage, createProduct, deleteProductImage, getAllProducts, getProductDetails, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.route("/single/:id").get(getProductDetails).put(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProductImage);

router.post("/new", isAuthenticated, singleUpload, createProduct);

router.route("/images/:id").post(isAuthenticated, singleUpload, addProductImage);

export default router;
