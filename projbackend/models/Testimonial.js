require("dotenv").config();
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const testimonialSchema=new Schema({
    image:{
        id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    name:{
        type:String,
    },
    course:{
        type:String,
    },
    content:{
        type:String,
    },
    type:{
        type:String,
        enum:['PG','UG']
    }

});

module.exports = new model("Testimonial", testimonialSchema);