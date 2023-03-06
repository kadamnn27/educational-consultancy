const BigPromise = require("../utils/BigPromise");
const Testimonial = require("../models/Testimonial");
const whereClause = require("../utils/whereClause");

exports.getAllTestimonials = BigPromise(async (req, res, next) => {
    const testimonials = await Testimonial.find(); //This Query returns alll the documents of this schema i.e All the users.
  
    res.status(200).json({
      success: true,
      testimonials,
    });
  });