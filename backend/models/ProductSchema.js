const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100, // Requirement says not over 100 characters
    },
    longDescription: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      default: "NOK",
      enum: ["NOK", "USD", "EUR"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
      enum: ["genser", "tskjorte"], // Only these two categories are allowed
      lowercase: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Adding an index on category for faster queries
ProductSchema.index({ category: 1 });

// Adding an index on createdAt for sorting by newest
ProductSchema.index({ createdAt: -1 });

// Adding indexes for product search and filtering
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ rating: -1 });

module.exports = mongoose.model("Product", ProductSchema);
