const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyJwt = require("../middleware/verifyToken");
const { apiLimiter } = require("../middleware/rateLimiters");

// Create a new product - Admin only, with rate limiting and JWT verification
router.post("/", apiLimiter, verifyJwt, productController.createProduct);

// Get all products - Public route with rate limiting
router.get("/", apiLimiter, productController.getAllProducts);

// Get newest products - Public route with rate limiting
router.get("/newest", apiLimiter, productController.getNewestProducts);

// Get featured products - Public route with rate limiting
router.get("/featured", apiLimiter, productController.getFeaturedProducts);

// Get products by category - Public route with rate limiting
router.get(
  "/category/:category",
  apiLimiter,
  productController.getProductsByCategory
);

// Get product by ID - Public route with rate limiting
router.get("/:id", apiLimiter, productController.getProductById);

// Update product stock - Admin only with JWT verification
router.patch(
  "/:id/stock",
  apiLimiter,
  verifyJwt,
  productController.updateStock
);

module.exports = router;
