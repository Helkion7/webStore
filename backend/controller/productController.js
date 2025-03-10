const Product = require("../models/ProductSchema.js");
const verifyJwt = require("../middleware/verifyToken.js");

const productController = {
  // Create a new product - only for admins
  createProduct: async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== "admin") {
        return res.status(403).json({
          msg: "Unauthorized. Only admin users can create products",
        });
      }

      const {
        title,
        description,
        longDescription,
        price,
        discountPrice,
        currency,
        imageUrl,
        additionalImages,
        category,
        stock,
        sizes,
        colors,
        featured,
      } = req.body;

      // Basic validation
      if (
        !title ||
        !description ||
        !imageUrl ||
        !category ||
        price === undefined
      ) {
        return res.status(400).json({
          msg: "Required fields: title, description, imageUrl, category, price",
        });
      }

      // Validate description length
      if (description.length > 100) {
        return res.status(400).json({
          msg: "Description cannot exceed 100 characters",
        });
      }

      // Validate long description if provided
      if (longDescription && longDescription.length > 1000) {
        return res.status(400).json({
          msg: "Long description cannot exceed 1000 characters",
        });
      }

      // Validate price
      if (price < 0) {
        return res.status(400).json({
          msg: "Price cannot be negative",
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
        longDescription: longDescription?.trim(),
        price,
        discountPrice,
        currency: currency || "NOK",
        imageUrl,
        additionalImages: additionalImages || [],
        category: category.toLowerCase(),
        stock: stock || 0,
        sizes: sizes || ["S", "M", "L", "XL"],
        colors: colors || [],
        featured: featured || false,
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

  // Get all products with optional filtering
  getAllProducts: async (req, res) => {
    try {
      const {
        sort,
        limit = 20,
        page = 1,
        featured,
        minPrice,
        maxPrice,
        category,
      } = req.query;

      // Build filter object
      let filter = {};

      if (featured) {
        filter.featured = featured === "true";
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      if (category) {
        filter.category = category.toLowerCase();
      }

      // Build sort object
      let sortOption = { createdAt: -1 }; // Default sort by newest

      if (sort === "price-asc") {
        sortOption = { price: 1 };
      } else if (sort === "price-desc") {
        sortOption = { price: -1 };
      } else if (sort === "rating") {
        sortOption = { rating: -1 };
      }

      // Calculate pagination
      const skip = (Number(page) - 1) * Number(limit);

      // Execute query with pagination
      const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

      // Get total count for pagination info
      const total = await Product.countDocuments(filter);

      return res.status(200).json({
        success: true,
        products,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      return res.status(500).json({
        msg: "Error fetching products",
        error: error.message,
      });
    }
  },

  // Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const { sort, limit = 20, page = 1 } = req.query;

      // Validate category
      if (!["genser", "tskjorte"].includes(category.toLowerCase())) {
        return res.status(400).json({
          msg: "Invalid category. Must be either 'genser' or 'tskjorte'",
        });
      }

      // Build sort object
      let sortOption = { createdAt: -1 }; // Default sort by newest

      if (sort === "price-asc") {
        sortOption = { price: 1 };
      } else if (sort === "price-desc") {
        sortOption = { price: -1 };
      } else if (sort === "rating") {
        sortOption = { rating: -1 };
      }

      // Calculate pagination
      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find({
        category: category.toLowerCase(),
      })
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

      // Get total count for pagination info
      const total = await Product.countDocuments({
        category: category.toLowerCase(),
      });

      return res.status(200).json({
        success: true,
        category,
        products,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Error in getProductsByCategory:", error);
      return res.status(500).json({
        msg: "Error fetching products by category",
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

  // Get newest products
  getNewestProducts: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit);

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Error in getNewestProducts:", error);
      return res.status(500).json({
        msg: "Error fetching newest products",
        error: error.message,
      });
    }
  },

  // Get featured products
  getFeaturedProducts: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const products = await Product.find({ featured: true })
        .sort({ createdAt: -1 })
        .limit(limit);

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Error in getFeaturedProducts:", error);
      return res.status(500).json({
        msg: "Error fetching featured products",
        error: error.message,
      });
    }
  },

  // Update product stock
  updateStock: async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== "admin") {
        return res.status(403).json({
          msg: "Unauthorized. Only admin users can update product stock",
        });
      }

      const { id } = req.params;
      const { stock } = req.body;

      if (stock === undefined || stock < 0) {
        return res.status(400).json({
          msg: "Valid stock quantity required",
        });
      }

      const product = await Product.findByIdAndUpdate(
        id,
        { stock },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Stock updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error in updateStock:", error);
      return res.status(500).json({
        msg: "Error updating product stock",
        error: error.message,
      });
    }
  },
};

module.exports = productController;
