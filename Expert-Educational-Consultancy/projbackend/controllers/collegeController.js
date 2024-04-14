const BigPromise = require("../utils/BigPromise");
const College = require("../models/College");
const whereClause = require("../utils/whereClause");

//Get the list of colleges
exports.getColleges = BigPromise(async (req, res, next) => {
  let colleges = new whereClause(College.find(), req.query).search().filter(); //Getting a whereClause object to work with with the Product model.
  // console.log(await products);

  // console.log(products);
  colleges = await colleges.base.select("-__v");

  const countFilteredColleges = colleges.length;
  console.log(colleges.length);
  console.log(colleges);

  res.status(200).json({
    success: true,
    colleges,
    countFilteredColleges,
  });
});
