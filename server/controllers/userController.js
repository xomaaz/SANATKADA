// NOTE that the API made here does not utilize try/catch block as some other API implementations,
// and thus, errors are handled differently than when using a try/catch block

import { asyncError } from "../middleware/error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { cookieOptions, getDataUri, sendEmail, sendToken } from "../utils/features.js";
import cloudinary from "cloudinary";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // find the user based on the unique email together with the corresponding stored password
  const user = await User.findOne({ email }).select("+password"); // .select("+password") allows password to be fetched when select is set to 'false' in schema

  // Handle error
  if (!user) {
    return next(new ErrorHandler("Incorrect Email or Password", 400));
  }

  if (!password) {
    return next(new ErrorHandler("Please Enter Password", 400));
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

  let avatar = undefined;

  if (req.file) { // if the request includes a file
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  user = await User.create({ // if user doesn't exist
    avatar,
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

  if (!oldPassword || !newPassword) return next(new ErrorHandler("Please Enter Both Old & New Password", 400));

  const isMatched = await user.comparePassword(oldPassword); // compare entered password with stored

  if(!isMatched) {
    return next(new ErrorHandler("Incorrect Old Password", 400));
  } else {
    user.password = newPassword;
    await user.save(); // we don't need to rehash the password again as the hashing function will be automatically called before saving. Remember, "pre-save" schema.
  }

  res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
  });
});


export const updatePic = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id); // as user was stored in req.user in the previous handler isAuthenticated
  
    const file = getDataUri(req.file); // get the buffer data from image
    await cloudinary.v2.uploader.destroy(user.avatar.public_id); // delete previously-stored avatar in Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(file.content); // upload new avatar image
    user.avatar = { // store avatar details as an object in database
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    await user.save(); // save user data

  res.status(200).json({
    success: true,
    message: "Avatar Updated Successfully", // displays user profile
  });
});


export const forgetPassword = asyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({email}); // finding the user based on email

  if (!user) return next(new ErrorHandler("Incorrect Email", 404)); // if user doesn't exist
  
  // if user does exist:

  // if min = 200 & max = 10000
  // to get random, formula: math.random()*(max-mix) +  min
  const randomNumber = Math.random() * (999999 - 100000) + 100000; // random 6-digit number
  const otp = Math.floor(randomNumber);
  const otp_expire = 1000 * 60 * 15; // 15-minute expiry time for OTP

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);

  await user.save();
  console.log(otp);
  
  const message = `Your OTP for resetting password is ${otp}.\nPlease ignore if you weren't the one requesting this.`;

  try {
    // this mails to mailtrap.io email testing inbox; use a paid email service to send actual emails
    await sendEmail("OTP For Reseting Password", user.email, message);
  } catch (error) {
    user.otp = null;
    user.otp_expire = null;
    await user.save();
    return next(error);
  }
  
  res.status(200).json({
    success: true,
    message: `Email Sent To ${user.email}`, // displays user profile
  });
});


export const resetPassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id); // as user was stored in req.user in the previous handler isAuthenticated
  
  res.status(200).json({
    success: true,
    user, // displays user profile
  });
});

