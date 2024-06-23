import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false, // prevents password from being included in a fetch request
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: String,
    url: String,
  },
  otp: Number,
  otp_expire: Date,
});

schema.pre("save", async function () { // before saving the schema, this arrow function will be called
  this.password = await bcrypt.hash(this.password, 10); // hash password and overwrite using it
});

export const User = mongoose.model("User", schema);
