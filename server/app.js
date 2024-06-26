import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";

config({
  path: "./data/config.env",
});

export const app = express();

// Using Middleware
app.use(express.json()); // json body parser middleware
app.use(cookieParser()); // to parse cookies

app.get("/", (req, res, next) => {
  res.send("Working");
});

// Importing Routers
import user from "./routes/userRoutes.js";

app.use("/api/v1/user", user);

// Using Error Middleware
app.use(errorMiddleware)
