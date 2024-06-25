// NOTE that the API made here does not utilize try/catch block as some other API implementations,
// and thus, errors are handled differently than when using a try/catch block

import { asyncError } from "../middleware/error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // find the user based on the unique email together with the corresponding stored password
  const user = await User.findOne({ email }).select("+password"); // .select("+password") allows password to be fetched when select is set to 'false' in schema

  // Handle error (later...)

  if (!user) {
    return res.status(400).json({success: false, message: "Incorrect Email or Password"});
  }

  const isMatched = await user.comparePassword(password) // compare entered password with stored

  if(!isMatched) {
    return next(new ErrorHandler("Incorrect Email or Password", 400)); // we use ErrorHandler custom class (can handle two args; here, message and status code) instead of Error (can only handle one arg)
  } else {

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: `Welcome Back, ${user.name}`, token
    });
  }
});

export const signup = asyncError(async (req, res, next) => {

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
});