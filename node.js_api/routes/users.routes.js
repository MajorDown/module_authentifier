const express = require("express");
const {
  checkSiteAuthorization,
} = require("../middlewares/checkSiteAuthorization");
const { emailChecker } = require("../middlewares/emailChecker");
const {
  passwordCrypter,
  newPasswordCrypter,
} = require("../middlewares/passwordCrypter");
const {
  createUser,
  connectUser,
  editUserPassword,
} = require("../controllers/user.controller");
const router = express.Router();

router.post(
  "/signup",
  checkSiteAuthorization,
  emailChecker,
  passwordCrypter,
  createUser
);

router.post("/login", checkSiteAuthorization, connectUser);

router.post(
  "/editUserPassword",
  checkSiteAuthorization,
  newPasswordCrypter,
  editUserPassword
);

module.exports = router;
