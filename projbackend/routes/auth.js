var express = require("express");
var router = express.Router();
const { check, body } = require("express-validator");
const {
  signup,
  signin,
  signout,
  genToken,
  verifyOtp
} = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");

router.param("userId", getUserbyId);

router.post(
  "/signup",
  [
    body("name", "Name should be at least 3 char").isLength({ min: 3 }),
    body("email", "Email is required").isEmail(),
    body("password", "Password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email", "Email is required").isEmail(),
    body("password", "Password field is required").isLength({ min: 1 })
  ],
  signin
);
router.post(
  "/verify/:userId",
  [body("otp", "OTP is required").isLength({ min: 1 })],
  verifyOtp
);

router.get("/signout", signout);
router.get("/reftoken", genToken);

module.exports = router;
