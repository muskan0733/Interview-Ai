const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS Configuration - Allows Frontend requests smoothly
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Request Logger (Terminal me dekhega ki request aayi ya nahi)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use(userRoutes);
app.use("/interview", interviewRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running properly!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server successfully running on http://localhost:${PORT}`);
});