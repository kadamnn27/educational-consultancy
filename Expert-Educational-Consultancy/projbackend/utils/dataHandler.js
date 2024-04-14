const data = require("../CollegeList.json");
const College = require("../models/College");
const BigPromise = require("../utils/BigPromise");
const dbConn = require("../config/dbConn");

dbConn();
const collegeUpload = BigPromise(async (next) => {
  // console.log(data[3]);
  // const college = await College.create(data[3]);
  // console.log(college);

  data.forEach(async (e) => {
    console.log(e);
    const college = await College.create(e);
    // console.log(college);
  });
});
collegeUpload();
