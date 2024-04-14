const BigPromise = require("../utils/BigPromise");
const User = require("../models/User");
const customErr = require("../utils/customErr");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  let token = req.cookies.token || req.body.token;

  console.log(token);
  if (!token) {
    if (req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "");
    } else {
      return next(
        new customErr(
          "Login verification failed, Please try to login again",
          401
        )
      );
    }
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); //Getting the token payload via verification with the secret
  //Remember our payload was just the id
  console.log(decoded);
  //   req.userID = decoded.id; //Injecting the userID that we found into the req to grab it later
  //This is injecting info via middleware

  req.user = await User.findOne({ _id: decoded.id }).select("+password"); //For future rojects use this code instead of above one
  //This helps avoiding weird small bugs.
  console.log(req.user);
  next();
});
