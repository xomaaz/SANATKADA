import { User } from "../models/userModel.js";

export const login = (req,res,next) => {
  res.send("Login")
};

export const signup = async(req,res,next) => {

  const {name, email, password, address, city, country, pinCode} = req.body;

  // Add Cloudinary here (later...)

  await User.create({
    name, 
    email, 
    password, 
    address, 
    city, 
    country, 
    pinCode,
  });
  res.status(201).json({
    success: true,
    message: "Registered Successfully"
  });
};
