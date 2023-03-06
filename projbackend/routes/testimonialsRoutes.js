const express = require("express");
const router = express.Router();

const { getAllTestimonials } = require("../controllers/testimonialController");
const {isLoggedIn}= require("../middlewares/userMiddleware")

router.route("/testimonials").get(getAllTestimonials);

module.exports = router;