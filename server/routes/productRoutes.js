import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
import { addCategory, addProductImage, createProduct, deleteCategory, deleteProductImage, getAllCategories, getAllProducts, getProductDetails, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.route("/single/:id").get(getProductDetails).put(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProductImage); // TODO: send delete request to product route

router.post("/new", isAuthenticated, singleUpload, createProduct);

router.route("/images/:id").post(isAuthenticated, singleUpload, addProductImage);

router.post("/category", isAuthenticated, addCategory);

router.get("/categories", getAllCategories);

router.delete("/category/:id", isAuthenticated, deleteCategory);

export default router;
