const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/userMiddleware");

const {
  register,
  login,
  logout,
  yourAccount,
  updatePassword,
  updateAccount,
  forgotPassword,
  resetPassword,
  getAllUsers,
} = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router
  .route("/youraccount")
  .get(isLoggedIn, yourAccount)
  .put(isLoggedIn, updateAccount);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/password/forgot").post(isLoggedIn, forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/admin/users").get(getAllUsers);

module.exports = router;
