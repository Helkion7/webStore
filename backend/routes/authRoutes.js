const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { authLimiter } = require("../middleware/rateLimiters");

router.post("/login", authLimiter, authController.login);
router.post("/register", authLimiter, authController.register);
router.post("/logout", authLimiter, authController.logout);

module.exports = router;
