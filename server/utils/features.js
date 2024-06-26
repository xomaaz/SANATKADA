export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // the cookie expires in 15 days (expressed in milliseconds)
    }).json({
      success: true,
      message: `Welcome Back, ${user.name}`,
  });
}