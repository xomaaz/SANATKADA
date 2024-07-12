import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

export const app = express();

// Using Middleware
app.use(express.json()); // json body parser middleware
app.use(cookieParser()); // to parse cookies
app.use(cors({
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // methods allowed
  origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2] // websites/domains given access to the methods above
}))

app.get("/", (req, res, next) => {
  res.send("Working");
});

// Importing Routers
import user from "./routes/userRoutes.js";
import product from "./routes/productRoutes.js";
import order from "./routes/orderRoutes.js"

app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);

// Using Error Middleware
app.use(errorMiddleware)
