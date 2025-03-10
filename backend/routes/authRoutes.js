const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { authLimiter } = require("../middleware/rateLimiters");
const verifyJwt = require("../middleware/verifyToken");

router.post("/login", authLimiter, authController.login);
router.post("/register", authLimiter, authController.register);
router.post("/logout", authLimiter, authController.logout);
router.post("/promote-to-admin", verifyJwt, authController.promoteToAdmin);
router.get("/me", verifyJwt, authController.getUserInfo);

module.exports = router;
