require("dotenv").config();
const app = require("./app");
const dbConn = require("./config/dbConn");
const _ = require("lodash");
const PORT = process.env.PORT || 4679;
const cloudinary = require("cloudinary").v2;
dbConn();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
