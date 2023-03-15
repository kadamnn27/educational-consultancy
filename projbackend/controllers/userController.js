const BigPromise = require("../utils/BigPromise");
const customErr = require("../utils/customErr");
const User = require("../models/User");
const { eq } = require("lodash");
const cloudinary = require("cloudinary").v2;
const mailHelper = require("../utils/mailHelper");
const crypto = require("crypto");

//Register a user
exports.register = BigPromise(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    req.body.name == " " ||
    req.body.email == " " ||
    req.body.password == " "
  ) {
    return next(new customErr("Name,email and password are all required", 400));
  }
  //uploading images
  let imgResult;
  console.log(req.files);
  // console.log(req.body);
  if (req.files) {
    const image = req.files.image;
    console.log("Image is present");
    console.log(image);
    imgResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "users",
      crop: "scale",
    });
  }
  try {
    console.log("Creating user");
    req.body.neet=JSON.parse(req.body.neet);
    req.body.state=JSON.parse(req.body.state);
    req.body.occParent=JSON.parse(req.body.occParent);
    req.body.image={
      id: req.files ? imgResult.public_id : undefined,
      secure_url: req.files ? imgResult.secure_url : undefined,
    }
    // console.log(req.body);
    const user = await User.create(req.body);

    console.log("User created succesfully");
    console.log(user);

    const token = await user.generateAuthToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), //cookie expires in 1 hr(60 mins)
      sameSite: "none",
      httpOnly: true,
      secure: true,
      domain: "https://expertedu.com",
    });

    res.status(201).json({
      success: true,
      token,
      message: "user has been successfully created",
    });
  } catch (error) {
    console.log("Error occured while creating user");
    console.log(error);
    if (imgResult) {
      await cloudinary.uploader.destroy(imgResult.public_id);
    }
    next(error);
  }
});

//Login a user
exports.login = BigPromise(async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.password ||
    req.body.email == " " ||
    req.body.password == " "
  ) {
    return next(new customErr("email and password are all required", 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new customErr("Invalid credentials", 401));
  }

  const verifyPassword = await user.validatePassword(req.body.password);
  if (!verifyPassword) {
    return next(new customErr("Invalid credentials", 401));
  }
  // console.log(user);

  user.password = undefined;
  // console.log(user);

  const token = await user.generateAuthToken();

  // res.cookie("token", token, {
  //   expires: new Date(Date.now() + 60 * 60 * 1000), //cookie expires in 1 hr(60 mins)
  //   sameSite: "none",
  //   httpOnly: true,
  //   secure: true,
  //   domain: ["https://expertedu.com", "http://localhost:4679"],
  // });

  // res.status(201).json({
  //   success: true,
  //   message: "user has been successfully logged in",
  //   token,
  //   user,
  // });
  res.cookie("token", token, {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user has been logged in",
    token,
    user,
  });
});

//Logout a user
exports.logout = BigPromise(async (req, res, next) => {
  /*The main thing to remember is the these tokens are pretty much stateless. Once sent to the user,there is no way to overwrite the expiry time of the
   cookie. But what we can do is delete the token in the cookie.*/

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//youraccount
exports.yourAccount = BigPromise(async (req, res, next) => {
  user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//updatePassword
exports.updatePassword = BigPromise(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new customErr("Login verification failed,Please try again", 500)
    );
  }
  console.log(user);
  const verifyOldPassword = await user.validatePassword(req.body.oldPassword);
  if (!verifyOldPassword) {
    return next(
      new customErr("The original password entered is incorrect", 400)
    );
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(
      new customErr("New Password and confirm New Password dont match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.generateAuthToken();
  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Password changed successfully",
      token,
      user,
    });
});

//updateUserAccount
exports.updateAccount = BigPromise(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new customErr("Login verification failed,Please try again", 500)
    );
  }
  console.log(user);
  if (req.body.password) {
    return next(new customErr("Some error occured", 402));
  }
  if (
    (!req.body.name && !req.body.email) ||
    (req.body.name === " " && req.body.email === " ")
  ) {
    return next(new customErr("No new values found to update"));
  }
  let isModified = false;

  if (req.body.name && req.body.name !== " " && req.body.name !== user.name) {
    user.name = req.body.name;
    isModified = true;
  }
  if (
    req.body.email &&
    req.body.email !== " " &&
    req.body.email !== user.email
  ) {
    user.email = req.body.email;
    isModified = true;
  }

  if (
    req.body.quota &&
    req.body.quota !== " " &&
    req.body.quota !== user.quota
  ) {
    user.quota = req.body.quota;
    isModified = true;
  }
  if (
    req.body.feeBudget &&
    req.body.feeBudget !== " " &&
    req.body.feeBudget !== user.feeBudget
  ) {
    user.feeBudget = req.body.feeBudget;
    isModified = true;
  }
  if (req.files) {
    if (user.image.id) {
      const resp = await cloudinary.uploader.destroy(user.image.id);
    }
    const image = req.files.image;
    const imgResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "users",
      crop: "scale",
    });
    user.image.id = imgResult.public_id;
    user.image.secure_url = imgResult.secure_url;
    isModified = true;
  }

  if (isModified) {
    await user.save();
  }
  user.password = undefined;

  const token = user.generateAuthToken();
  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Updated user successfully",
      token,
      user,
    });
});

//forgotPassword
exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customErr("email is not registered", 400));
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  const forgotToken = await user.generateForgotPasswordToken();

  await user.save({
    validateBeforeSave: false,
  }); /*When we want to save forgotPasswordToken we are not going to be able to pass all the other validation in the
  schema therefor we use this validateBeforeSave: false so that it saves without the validation*/

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;

  const message = `Copy Paste this URL in your browser and hit enter \n \n ${url}`;

  /*emailing can fail more often than we would anticipate so we need to try catch it here, because if any error occurs then we need to clear out
  forgot password token and its expiry because user might send another request upon failiure and if we're not clearing these fields then we may clog up the
  server with unhandled requests.*/

  try {
    //Sending the mail
    await mailHelper({
      email: user.email,
      subject: "Forgot Password Request",
      text: message,
    });

    res.status(200).json({
      success: "true",
      message: "Check Your email for further instructions",
    });
  } catch (error) {
    console.log(error);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new customErr(error.message, 500));
  }
});

//reset password
exports.resetPassword = BigPromise(async (req, res, next) => {
  const forgotToken = req.params.token;
  console.log(`The Token is ${forgotToken}`);
  //  The token saved in the database is encrypted so we need it encrypted here in the same way.
  const encryToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  console.log(encryToken);

  //Now we need to find the user by this token. Also we have to simultaneously check if the token in the databse has expired or not.
  const user = await User.findOne({
    forgotPasswordToken: encryToken,
    forgotPasswordExpiry: { $gt: Date.now() },
    //This is basically a query that finds a user that matches both conditions
    //Condition one: forgotpasswordtoke is same as the encry token
    //Condition two: fogotpassword expiry is greater than Date.now() i.e. token hasnt expired yet.
  });
  console.log(user);

  if (!user) {
    return next(new customErr("Token invalid or expired, Please retry", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new customErr("Password and Confirm Password do not match", 400)
    );
  }
  // console.log(req.password);
  user.password = req.body.password;

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  const token = await user.generateAuthToken();
  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: "true",
      token,
      user,
    });
});

//Admin only route- Getting a single user
exports.getSingleUser = BigPromise(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(customErr("User not found", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = BigPromise(async (req, res, next) => {
  const users = await User.find(); //This Query returns alll the documents of this schema i.e All the users.

  res.status(200).json({
    success: true,
    users,
  });
});

//Admin only route- Update a user
exports.adminUpdateUser = BigPromise(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(
      new customErr("Login verification failed,Please try again", 500)
    );
  }
  console.log(user);
  if (req.body.password) {
    return next(new customErr("Some error occured", 402));
  }
  if (
    (!req.body.name && !req.body.email) ||
    (req.body.name === " " && req.body.email === " ")
  ) {
    return next(new customErr("No new values found to update"));
  }
  let isModified = false;

  if (req.body.name && req.body.name !== " " && req.body.name !== user.name) {
    user.name = req.body.name;
    isModified = true;
  }
  if (
    req.body.email &&
    req.body.email !== " " &&
    req.body.email !== user.email
  ) {
    user.email = req.body.email;
    isModified = true;
  }
  if (req.body.city && req.body.city !== " " && req.body.city !== user.city) {
    user.city = req.body.city;
    isModified = true;
  }
  if (
    req.body.course &&
    req.body.course !== " " &&
    req.body.course !== user.course
  ) {
    user.course = req.body.course;
    isModified = true;
  }
  if (
    req.body.course &&
    req.body.course !== " " &&
    req.body.course !== user.course
  ) {
    user.course = req.body.course;
    isModified = true;
  }
  if (
    req.body.quota &&
    req.body.quota !== " " &&
    req.body.quota !== user.quota
  ) {
    user.quota = req.body.quota;
    isModified = true;
  }
  if (
    req.body.feeBudget &&
    req.body.feeBudget !== " " &&
    req.body.feeBudget !== user.feeBudget
  ) {
    user.feeBudget = req.body.feeBudget;
    isModified = true;
  }
  if (req.files) {
    if (user.photo.id) {
      const resp = await cloudinary.uploader.destroy(user.photo.id);
    }
    const photo = req.files.photo;
    const imgResult = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "users",
      crop: "scale",
    });
    user.photo.id = imgResult.public_id;
    user.photo.secure_url = imgResult.secure_url;
    isModified = true;
  }

  if (isModified) {
    await user.save();
  }
  user.password = undefined;

  const token = user.generateAuthToken();
  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Updated user successfully",
      token,
      user,
    });
});

//Admin only route- Delete a user
exports.deleteUser = BigPromise(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(new customErr("User not found", 401));
  }

  if (user.photo.id) {
    const resp = await cloudinary.uploader.destroy(user.photo.id);
  }

  const deletedUser = await user.remove();

  console.log(deletedUser);

  //Deleted user immediately gets logged out
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User deleted successfuly",
  });
});
