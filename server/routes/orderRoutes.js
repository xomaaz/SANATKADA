import express from "express";
import { createOrder, getAdminOrders, getMyOrders, getOrderDetails, processOrder } from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);

router.get("/my", isAuthenticated, getMyOrders);

router.get("/admin", isAuthenticated, isAdmin, getAdminOrders);

router.route("/single/:id").get(isAuthenticated, getOrderDetails).put(isAuthenticated, isAdmin, processOrder);

export default router;
