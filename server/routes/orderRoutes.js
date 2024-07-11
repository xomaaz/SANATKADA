import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);

router.get("/my", isAuthenticated, getMyOrders);

export default router;
