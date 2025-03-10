const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJWT = require("../utils/createJWT");
const createCookie = require("../utils/createCookie.js");

// Number of salt rounds for password hashing
const saltRounds = parseInt(process.env.SALT);

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Basic validation - ensure required fields are present
      if (!email || !password) {
        return res.status(400).json({
          msg: "Email and password are required",
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          msg: "Invalid email format",
        });
      }

      // Find user and include password (which is excluded by default in schema)
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        // Security best practice: don't specify whether user exists or password is wrong
        return res.status(401).json({
          msg: "Invalid credentials",
        });
      }

      // Compare provided password with stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          msg: "Invalid credentials",
        });
      }

      // Create JWT token and set as cookie
      const jwtToken = await createJWT(email, user.role);
      createCookie(res, jwtToken);

      // Remove password from user object before sending response
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.status(201).json({
        msg: "Login successful. Redirecting to Account...",
        success: true,
      });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({
        msg: "Error during login",
        error: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, repeatPassword } = req.body;

      // Validate required fields
      if (!email || !password || !repeatPassword) {
        return res.status(400).json({
          msg: "All fields are required",
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          msg: "Invalid email format",
        });
      }

      // Password length validation
      if (password.length < 8) {
        return res.status(400).json({
          msg: "Password must be at least 8 characters long",
        });
      }

      // Password match validation
      if (password !== repeatPassword) {
        return res.status(400).json({
          msg: "Passwords do not match",
        });
      }

      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          msg: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user with all details
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });

      // Save user to database
      await user.save();

      return res.status(201).json({
        msg: "Registration successful. Redirecting to login...",
        success: true,
      });
    } catch (error) {
      console.error("Error in register:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          msg: "Validation error",
          error: error.message,
        });
      }
      return res.status(500).json({
        msg: "Error during registration",
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      // Clear the JWT cookie by setting an expired date
      res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        expires: new Date(0), // Set expiration to epoch time (1970-01-01), effectively removing the cookie
      });

      return res.status(200).json({
        msg: "Logout successful",
        success: true,
      });
    } catch (error) {
      console.error("Error in logout:", error);
      return res.status(500).json({
        msg: "Error during logout",
        error: error.message,
      });
    }
  },
};

module.exports = authController;
