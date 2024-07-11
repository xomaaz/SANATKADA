import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);

export default router;
