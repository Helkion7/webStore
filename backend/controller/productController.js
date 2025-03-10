const Product = require("../models/ProductSchema.js");
const verifyJwt = require("../middleware/verifyToken.js");

const productController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { title, description, imageUrl, category } = req.body;

      // Basic validation
      if (!title || !description || !imageUrl || !category) {
        return res.status(400).json({
          msg: "All fields are required (title, description, imageUrl, category)",
        });
      }

      // Validate description length
      if (description.length > 100) {
        return res.status(400).json({
          msg: "Description cannot exceed 100 characters",
        });
      }

      // Validate category
      if (!["genser", "tskjorte"].includes(category.toLowerCase())) {
        return res.status(400).json({
          msg: "Category must be either 'genser' or 'tskjorte'",
        });
      }

      // Create new product
      const product = new Product({
        title: title.trim(),
        description: description.trim(),
        imageUrl,
        category: category.toLowerCase(),
      });

      // Save product to database
      await product.save();

      return res.status(201).json({
        msg: "Product created successfully",
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error in createProduct:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          msg: "Validation error",
          error: error.message,
        });
      }
      return res.status(500).json({
        msg: "Error creating product",
        error: error.message,
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      return res.status(500).json({
        msg: "Error fetching products",
        error: error.message,
      });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error in getProductById:", error);
      return res.status(500).json({
        msg: "Error fetching product",
        error: error.message,
      });
    }
  },
};

module.exports = productController;
