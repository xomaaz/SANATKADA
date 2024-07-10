import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(
  async (req, res, next) => {

    // console.log(req.cookies.token); // method 1 to parse stored token
    const { token } = req.cookies; // method 2 to parse stored token: destructuring
    // console.log(token);
  
    // if token is not present, invoke ErrorHandler
    if (!token) return next(new ErrorHandler("Not Logged In", 401));
  
    // if token is present, find and save user by ID, and invoke getMyProfile
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decodedData._id);
    req.user = user; // we can access req.user throughout the API
  
    next(); // invoking getMyProfile
  }
);

export const isAdmin = asyncError(async (req, res, next) => {
    if (req.user.role != "admin") return next(new ErrorHandler("Only Admin allowed", 401));
    next();
  }
);
