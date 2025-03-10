const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Import route modules
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Initialize Express app
const app = express();

app.use(helmet());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

let corsOptions = {
  origin: process.env.ORIGIN, // Allowed origin from environment variables
  methods: "GET,PUT,POST,DELETE",
  credentials: true, // Allow cookies in CORS requests
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

// Apply global rate limiter to all requests
app.use(limiter);

// Apply CORS configuration
app.use(cors(corsOptions));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send(`Server running on port ${process.env.PORT}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
