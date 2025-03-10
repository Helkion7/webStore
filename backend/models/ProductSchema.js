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
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["genser", "tskjorte"], // Only these two categories are allowed
      lowercase: true,
    },
    // Adding timestamp fields for "newest products" functionality
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

module.exports = mongoose.model("Product", ProductSchema);
