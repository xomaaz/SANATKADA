// NOTE that the API made here does not utilize try/catch block as some other API implementations,
// and thus, errors are handled differently than when using a try/catch block

import { asyncError } from "../middleware/error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { cookieOptions, sendToken } from "../utils/features.js";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // find the user based on the unique email together with the corresponding stored password
  const user = await User.findOne({ email }).select("+password"); // .select("+password") allows password to be fetched when select is set to 'false' in schema

  // Handle error (later...)

  if (!user) {
    return res.status(400).json({success: false, message: "Incorrect Email or Password"});
  }

  const isMatched = await user.comparePassword(password); // compare entered password with stored

  if(!isMatched) {
    return next(new ErrorHandler("Incorrect Email or Password", 400)); // we use ErrorHandler custom class (can handle two args; here, message and status code) instead of Error (can only handle one arg)
  } else {
    sendToken(user, res, `Welcome Back, ${user.name}`, 200);
  }
});

export const signup = asyncError(async (req, res, next) => {

  const {name, email, password, address, city, country, pinCode} = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exists", 400)); // if user already exists based on email

  // Add Cloudinary here (later...)

  user = await User.create({ // if user doesn't exist
    name, 
    email, 
    password, 
    address, 
    city, 
    country, 
    pinCode,
  });

  sendToken(user, res, `Registered Successfully`, 201);

});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id); // as user was stored in req.user in the previous handler isAuthenticated
  
  res.status(200).json({
    success: true,
    user, // displays user profile
  });

});

export const logOut = asyncError(async (req, res, next) => {
  
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
  });

});

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
  });

});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  const isMatched = await user.comparePassword(oldPassword); // compare entered password with stored

  if(!isMatched) {
    return next(new ErrorHandler("Incorrect Old Password"));
  } else {
    user.password = newPassword;
    await user.save(); // we don't need to rehash the password again as the hashing function will be automatically called before saving. Remember, "pre-save" schema.
  }

  res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
  });

});
