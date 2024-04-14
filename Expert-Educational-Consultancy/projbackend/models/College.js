require("dotenv").config();
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const collegeSchema = new Schema({
  COLLEGE_NAME: {
    type: String,
    // required: true
  },
  UNIVERSITY_NAME: {
    type: String,
    // required:true
  },
  STATE: {
    type: String,
    // required: true
  },
  ESTD: {
    type: String,
    // required:true
  },
  INTAKE: {
    type: String,
    // required:true
  },
  STATUS: {
    type: String,
    // required: true
  },
  FEE: {
    type: String,
    // required: true
  },
  CATEGORY: {
    type: String,
    enum: ["Government", "Private", "Deemed"],
    // required: true
  },
  GRAD: {
    type: String,
  },
});

module.exports = new model("College", collegeSchema);
