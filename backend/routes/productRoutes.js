const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyJwt = require("../middleware/verifyToken");
const { apiLimiter } = require("../middleware/rateLimiters");

// Create a new product - Admin only, with rate limiting and JWT verification
router.post("/", apiLimiter, verifyJwt, productController.createProduct);

// Get all products - Public route with rate limiting
router.get("/", apiLimiter, productController.getAllProducts);

// Get product by ID - Public route with rate limiting
router.get("/:id", apiLimiter, productController.getProductById);

module.exports = router;
