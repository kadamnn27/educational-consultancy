require("dotenv").config();
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  email: {
    type: String,
    unique: [true, "The provided email already exists"],
    required: [true, "Email must be provided"],
    validate: [validator.isEmail, "This is not a valid email"],
  },
  //TODO: Currently Phone number has no role in signup. Make it optional to sign in with either Email or Phone.No.
  //TODO: Make More intensive Validation for email and phone number
  phoneno: {
    type: String,
    unique: [true, "The Provided number already exists"],
  }, //TODO: OTP  validation of mobile number
  course: {
    type: String,
    enum: ["MBBS", "BAMS", "BHMS", "BDS", "MD/MS", "DNB", "FCPS/CPS"],
    required: [true, "Course must be provided"],
  },
  city: {
    type: String,
  },
  image: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  password: {
    type: String,
    minlength: [4, "Password is not long enough"],
    required: [true, "password must be provided"],
    select: false,
  },
  forgotPasswordToken: {
    type: String,
    select: false,
  },
  forgotPasswordExpiry: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "bronze", "silver", "gold", "platinum"],
  },
  gender: {
    type: String,
    required: [true, "Gener must be provied"],
  },
  dob: {
    type: String,
    required: [true, "Date of Birth must be provided"],
  },
  neet: {
    score: {
      type: String,
      // required: [true, "NEET Score must be provided"],
    },
    airRank: {
      type: String,
    },
    categoryRank: {
      type: String,
    },
  }, //ASK
  category: {
    type: String,
    required: [true, "Category must be provided"],
    enum: ["state", "central"],
  }, //ASK
  state: {
    domicile: {
      type: String,
      required: [true, "Domicile state must be provided"],
    },
    passedGrad:{
      type: String,
      required: [true, "State of passing MBBS must be provided"],
    },
    passedTenth: {
      type: String,
      required: [true, "State of passing 10th must be provided"],
    },
    passedEleventh: {
      type: String,
      required: [true, "State of passing 11th must be provided"],
    },
    passedTwelfth: {
      type: String,
      required: [true, "State of passing 12th must be provided"],
    },
  },
  isPwd: {
    type: Boolean,
    required: [true, "PWD must be provided"],
  },
  occParent: {
    motherOccupation:{
      type: String,
      required: [true, "Occupation of Parent must be provided"],
    },
    fatherOccupation:{
      type: String,
      required: [true, "Occupation of Parent must be provided"],
    }
  },
  quota: {
    type: String,
  }, //ASK: about this
  feeBudget: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Password encryption
//Remeber. Cant use arrow function here due to problems it creates with this keyword.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Providing some schema methods
//Password validation for login
userSchema.method("validatePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

//Generating login tokens
userSchema.method("generateAuthToken", function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
});

//Generating forgotpassword tokens
//Remeber that these arent actually 'tokens' rather just ransom strings
userSchema.method("generateForgotPasswordToken", async function () {
  const forgotToken = crypto.randomBytes(15).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;

  return forgotToken;
});

module.exports = new model("User", userSchema);
