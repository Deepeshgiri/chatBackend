const express = require("express");
const { login, signUp, logOut } = require("../controller/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.post("/logout", logOut);

module.exports = router;
